"""Where buses have center or median lanes, from OpenStreetMap (decision 9; docs/DECISIONS.md).

Agencies say which corridors are BRT, but not all of them say where the dedicated lanes start and end.
OSM's surveyed lane tags do. This module fetches the ways carrying a bus-lane or busway tag around a
route from Overpass (ODbL), caches the response in data/raw/osm/, and picks the ways whose bus lane is
the innermost one:

- `highway=busway`: a road for buses only.
- `bus:lanes:forward` / `:backward` (and `psv:`) on a two-way way: lanes are listed left to right in
  each direction of travel, so the first entry is the lane next to the centre line.
- `bus:lanes` (or `psv:`) on a one-way way: the first entry is the leftmost lane. That is the median
  lane only on one half of a divided road, so it counts only when an opposite-direction half carrying
  bus-lane tags runs within DIVIDED_M; a one-way street's left lane is a curb lane.
- `busway:left=lane` on one half of a divided road counts by the same rule.

Curb lanes (`busway=lane`, `busway:right=lane`, `busway:both=lane`) never count. A way whose tags don't
say where its bus lane is (`lanes:bus=1`, a two-way way's plain `bus:lanes`) is returned for review,
never guessed.
"""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

from shapely.geometry import LineString

from .common import RAW, USER_AGENT, write_json

OVERPASS = "https://overpass-api.de/api/interpreter"
RETRIES = 4
CACHE = RAW / "osm"
DIVIDED_M = 40.0  # the two halves of a divided road run this close; a one-way couplet doesn't
LANE_LISTS = ("bus:lanes", "psv:lanes")
OVERPASS_LICENSE = "Open Database License (ODbL) 1.0: https://www.openstreetmap.org/copyright"


class OverpassUnavailable(RuntimeError):
    pass


@dataclass
class Way:
    id: int
    tags: dict
    line: LineString  # lon/lat


def query(bbox: tuple[float, float, float, float]) -> str:
    """Every way around the route that carries a busway or bus-lane tag, with its geometry."""
    area = _area(bbox)
    keys = "^(busway|bus:lanes|psv:lanes|lanes:bus|lanes:psv)(:.*)?$"
    return (f'[out:json][timeout:120];(way["highway"="busway"]{area};way[~"{keys}"~"."]{area};);'
            "out tags geom;")


def _area(bbox: tuple[float, float, float, float]) -> str:
    w, s, e, n = bbox
    return f"({s:.5f},{w:.5f},{n:.5f},{e:.5f})"


def street_query(bbox: tuple[float, float, float, float], pattern: str) -> str:
    """Every road in the bbox whose name matches pattern (the cross streets an agency names)."""
    return f'[out:json][timeout:60];way["highway"]["name"~"{pattern}"]{_area(bbox)};out tags geom;'


def _fetch(name: str, bbox: tuple[float, float, float, float], q: str, refresh: bool,
           endpoint: str = OVERPASS, cache: Path = CACHE) -> dict:
    """An Overpass response, cached as <cache>/<name>.json (data/raw/osm/ by default) and reused while
    the cached query is the same and its bbox covers this one. OpenHistoricalMap's Overpass server
    (ohm.py) is the same API at another endpoint."""
    path = cache / f"{name}.json"
    if path.exists() and not refresh:
        cached = json.loads(path.read_text())
        cw, cs, ce, cn = cached["bbox"]
        w, s, e, n = bbox
        same = cached.get("query", "").replace(_area(tuple(cached["bbox"])), "") == q.replace(_area(bbox), "")
        if same and cw <= w and cs <= s and ce >= e and cn >= n:
            return cached["response"]
    body = urllib.parse.urlencode({"data": q}).encode()
    req = urllib.request.Request(endpoint, data=body, headers={"User-Agent": USER_AGENT})
    for attempt in range(RETRIES):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                response = json.loads(r.read())
            break
        except OSError as e:
            busy = not isinstance(e, urllib.error.HTTPError) or e.code in (429, 502, 503, 504)
            if not busy or attempt == RETRIES - 1:
                raise OverpassUnavailable(f"{endpoint} unreachable ({e.__class__.__name__}: {e})") from e
            time.sleep(15 * (attempt + 1))  # Overpass is a shared server: back off and try again
    write_json(path, {"bbox": list(bbox), "query": q, "response": response})
    return response


def fetch(name: str, bbox: tuple[float, float, float, float], refresh: bool = False) -> dict:
    """The busway and bus-lane ways in a bbox."""
    return _fetch(name, bbox, query(bbox), refresh)


def streets(name: str, bbox: tuple[float, float, float, float], pattern: str, refresh: bool = False) -> list[Way]:
    """The roads in a bbox whose name matches pattern."""
    return ways(_fetch(name, bbox, street_query(bbox, pattern), refresh))


def osm_base(response: dict) -> str:
    """The OSM data timestamp the response reflects."""
    return response.get("osm3s", {}).get("timestamp_osm_base", "")


def ways(response: dict) -> list[Way]:
    out = []
    for el in response.get("elements", []):
        if el.get("type") == "way" and len(el.get("geometry", [])) >= 2:
            coords = [(p["lon"], p["lat"]) for p in el["geometry"]]
            tags = el.get("tags", {})
            if tags.get("oneway") == "-1":
                coords.reverse()
            out.append(Way(el["id"], tags, LineString(coords)))
    return out


BUS_KEY = re.compile(r"^(busway|bus:lanes|psv:lanes|lanes:bus|lanes:psv)(:.*)?$")
CURB = ("lane", "opposite_lane")


def _first(lanes: str | None) -> str | None:
    return lanes.split("|")[0].strip() if lanes else None


def _oneway(tags: dict) -> bool:
    return tags.get("oneway") in ("yes", "1", "-1") or tags.get("junction") == "roundabout"


def _has_bus_lane(tags: dict) -> bool:
    """Whether any tag says the way has a bus lane (rather than `busway=no` and the like)."""
    if tags.get("highway") == "busway":
        return True
    for k, v in tags.items():
        if not BUS_KEY.match(k):
            continue
        if k.startswith(("lanes:bus", "lanes:psv")):
            if v.strip() not in ("", "0", "no"):
                return True
        elif any(x.strip() in ("designated", *CURB) for x in v.split("|")):
            return True
    return False


def classify(tags: dict) -> str:
    """'median' (a center or median bus lane, or a busway), 'divided-left' (the left lane of a one-way
    way, which is a median lane only on half of a divided road), 'curb', 'none' (no bus lane), or
    'unknown' (the tags don't say where the bus lane is; for review)."""
    if not _has_bus_lane(tags):
        return "none"
    if tags.get("highway") == "busway":
        return "median"
    directional = [tags.get(f"{k}:{d}") for k in LANE_LISTS for d in ("forward", "backward")]
    if any(_first(v) == "designated" for v in directional):
        return "median"
    plain = [tags.get(k) for k in LANE_LISTS]
    if _oneway(tags):
        if any(_first(v) == "designated" for v in plain) or tags.get("busway:left") in CURB:
            return "divided-left"
        if any(v and "designated" in v.split("|") for v in plain) or tags.get("busway") in CURB or tags.get("busway:right") in CURB:
            return "curb"
        return "unknown"
    if any(tags.get(k) in CURB for k in ("busway", "busway:both", "busway:right", "busway:left")):
        return "curb"
    if any(v and "designated" in v.split("|") for v in directional):
        return "curb"  # listed, but not innermost
    return "unknown"  # e.g. lanes:bus=2, or a two-way way's plain bus:lanes


def median_ways(response: dict, to_metres) -> tuple[list[tuple[Way, LineString]], list[Way]]:
    """The ways with a center or median bus lane (each with its metre geometry), and the ways whose
    tags don't say where the bus lane is, for review."""
    all_ways = ways(response)
    metres = {w.id: to_metres(w.line) for w in all_ways}
    kinds = {w.id: classify(w.tags) for w in all_ways}
    one_way = [w for w in all_ways if _oneway(w.tags) and kinds[w.id] not in ("none", "unknown")]
    median, review = [], []
    for w in all_ways:
        kind = kinds[w.id]
        if kind == "divided-left":
            kind = "median" if any(o.id != w.id and _opposite(metres[w.id], metres[o.id]) for o in one_way) else "curb"
        if kind == "median":
            median.append((w, metres[w.id]))
        elif kind == "unknown":
            review.append(w)
    return median, review


def _opposite(a: LineString, b: LineString) -> bool:
    """Whether b runs alongside a (at least 50 m of it within DIVIDED_M) in the opposite direction,
    as the other half of a divided road does. Both are in metres, drawn in their direction of travel
    (a `oneway=-1` way is reversed first)."""
    near = b.intersection(a.buffer(DIVIDED_M))
    parts = [p for p in getattr(near, "geoms", [near]) if isinstance(p, LineString) and p.length >= 50]
    if not parts:
        return False
    part = max(parts, key=lambda p: p.length)
    start, end = part.interpolate(0.1, normalized=True), part.interpolate(0.9, normalized=True)
    return a.project(end) < a.project(start)
