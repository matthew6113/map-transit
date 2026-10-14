"""The present era from GTFS (Phase 1; docs/SPEC.md).

Feeds:
- 511.org's regional feed (operator RG), for every Bay Area agency. Needs TRANSIT_511_API_KEY in the
  environment or the repo's .env (never committed, never logged).
- Amtrak's national feed, for the Capitol Corridor, California Zephyr and Coast Starlight (one source
  for Amtrak-run trains, so none is drawn twice).
- BART's own feed, as a fallback for BART when there's no 511 key.

For each agency, its routes are grouped into lines (AGENCIES). A line's geometry covers every shape its
trips run, longest first, keeping only the parts more than COVER_M from what's already kept, so branches
(Caltrain to Gilroy) survive while each direction's near-identical shape collapses into one. A route
with no published shape is drawn through its stops and marked approximate. Lines are clipped at the
map's pan limits; a line that runs beyond them says where to (`continues_beyond`).

BRT (decisions 3 and 9) is drawn only where its buses run in center or median lanes: each route's
coverage is kept where it lies along OpenStreetMap ways with such a lane (osm_lanes.py), and written to
data/present/brt/.

Writes data/present/<agency>/{lines.json, segments.geojson, points.geojson}, data/present/feeds.json,
and this step's entries in data/sources.json and data/systems.json. GTFS has no opening dates: they
stay null and flagged until Phase 2 sources them (decision 4).

    uv run --directory pipeline python -m transit_pipeline.gtfs
"""

from __future__ import annotations

import csv
import io
import json
import os
import re
import sys
import zipfile
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import date
from typing import Callable

import numpy as np
import shapely
from pyproj import Transformer
from shapely.geometry import LineString, MultiLineString, Point, box, mapping
from shapely.ops import linemerge, nearest_points, substring, unary_union

from . import osm_lanes
from .common import (DATA, RAW, ROOT, SOURCES, ensure_systems, fetch, load_env, merge_registry,
                     round_coords, sha256, write_geojson, write_json)

TODAY = date.today().isoformat()
SIMPLIFY_M = 3.0
COVER_M = 25.0  # a shape within this distance of kept geometry is the same track
SLIVER_M = 200.0  # uncovered pieces shorter than this are dropped
SNAP_M = 40.0  # a kept piece's end this close to earlier geometry is joined to it

REGION = json.loads((ROOT / "src" / "basemap" / "region.json").read_text())
BOUNDS = box(*REGION["maxBounds"])

# route_type values this map draws: tram, subway, rail, ferry, cable tram, funicular, monorail.
RAIL_FERRY_TYPES = {"0", "1", "2", "4", "5", "7", "12"}

_TO_M = Transformer.from_crs("EPSG:4326", "EPSG:32610", always_xy=True)
_TO_DEG = Transformer.from_crs("EPSG:32610", "EPSG:4326", always_xy=True)


def to_metres(g):
    """Project lon/lat geometry to UTM zone 10N (metres)."""
    return shapely.transform(g, lambda c: np.column_stack(_TO_M.transform(c[:, 0], c[:, 1])))


def to_degrees(g):
    return shapely.transform(g, lambda c: np.column_stack(_TO_DEG.transform(c[:, 0], c[:, 1])))


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def tidy(name: str) -> str:
    """A feed's name in the map's style: a name in capitals gets its words capitalized
    ("POWELL-HYDE" to "Powell-Hyde", "14TH" to "14th"), and a spaced hyphen becomes an en dash."""
    name = name.strip()
    if name.isupper():
        name = re.sub(r"\b[a-z][a-z']*", lambda m: m.group(0).title(), name.lower())
    return re.sub(r"\s+-\s+", "\u2013", name)


# ------------------------------------------------------------------------------------------ feeds

@dataclass
class Feed:
    id: str
    title: str
    publisher: str
    url: str
    license: str
    needs_key: bool = False
    license_unclear: bool = False

    def download_url(self) -> str:
        return self.url.replace("{key}", os.environ.get("TRANSIT_511_API_KEY", ""))


FEEDS = {
    "511": Feed(
        "511", "511 SF Bay regional GTFS feed (operator RG)", "Metropolitan Transportation Commission (511.org)",
        "https://api.511.org/transit/datafeeds?api_key={key}&operator_id=RG",
        "511 SF Bay Open Data Data Agreement: https://511.org/sites/default/files/pdfs/511_Data_Agreement_Final.pdf",
        needs_key=True,
    ),
    "amtrak": Feed(
        "amtrak", "Amtrak GTFS feed", "Amtrak", "https://content.amtrak.com/content/gtfs/GTFS.zip",
        "Published by Amtrak for public use; no license stated in the feed or found on Amtrak's site (see DATA_LOG.md).",
        license_unclear=True,
    ),
    # The Gold Runner (the San Joaquins) is in neither 511's feed nor Amtrak's. Its own feed, published
    # by Trillium for Amtrak San Joaquins, is read from the Mobility Database's mirror (feed mdb-2295):
    # the producer's host, data.trilliumtransit.com, isn't reachable from the build environment.
    "gold-runner": Feed(
        "gold-runner", "Amtrak San Joaquins (Gold Runner) GTFS feed, Mobility Database mirror (mdb-2295)",
        "Trillium Solutions for Amtrak San Joaquins",
        "https://storage.googleapis.com/storage/v1/b/mdb-latest/o/us-california-amtrak-san-joaquins-gtfs-2295.zip?alt=media",
        "No license in the feed (feed_license is empty), and no terms found from the agency (see DATA_LOG.md).",
        license_unclear=True,
    ),
    "bart": Feed(
        "bart", "Bay Area Rapid Transit GTFS feed", "Bay Area Rapid Transit",
        "https://www.bart.gov/dev/schedules/google_transit.zip",
        "BART Developer License Agreement: https://www.bart.gov/schedules/developers/developer-license-agreement",
    ),
}

# ------------------------------------------------------------------------------------------ lines

LineDef = tuple[str, str, str]  # (line id, name, mode)

BART_LINES = {
    "yellow": ("bart-yellow", "Yellow line", "rapid_transit"),
    "orange": ("bart-orange", "Orange line", "rapid_transit"),
    "green": ("bart-green", "Green line", "rapid_transit"),
    "red": ("bart-red", "Red line", "rapid_transit"),
    "blue": ("bart-blue", "Blue line", "rapid_transit"),
    "grey": ("bart-oakland-airport", "Oakland Airport line", "people_mover"),
}
BART_COLORS = {"FFFF33": "yellow", "FF9933": "orange", "339933": "green", "FF0000": "red", "0099CC": "blue", "B0BEC7": "grey"}


def bart_line(r: dict) -> LineDef | None:
    text = f"{r['route_short_name']} {r['route_long_name']}".lower()
    for color, line in BART_LINES.items():
        if color in text or (color == "grey" and "gray" in text):
            return line
    color = BART_COLORS.get(r.get("route_color", "").upper())
    return BART_LINES[color] if color else None


MUNI_METRO = {"J", "K", "L", "M", "N", "T"}


def muni_line(r: dict) -> LineDef | None:
    short = r["route_short_name"].strip().upper()
    long = r["route_long_name"].strip()
    if r["route_type"] == "5":
        name = re.sub(r"\s+cable car$", "", tidy(long or short), flags=re.I)
        return (f"muni-cable-{slug(name)}", f"{name} cable car", "cable")
    if r["route_type"] == "0" and short in MUNI_METRO:
        return (f"muni-{short.lower()}", f"{short} {tidy(long)}".strip(), "light_rail")
    if r["route_type"] == "0" and short in {"F", "E"}:
        return (f"muni-{short.lower()}", f"{short} {tidy(long)}".strip(), "streetcar")
    return None  # shuttles (S), substitutions and anything else


def vta_line(r: dict) -> LineDef | None:
    if r["route_type"] != "0" or r["route_short_name"].strip().lower().startswith("event"):
        return None  # special-event services run over the same track
    text = f"{r['route_short_name']} {r['route_long_name']}"
    for color in ("Blue", "Green", "Orange"):
        if color.lower() in text.lower():
            return (f"vta-{color.lower()}", f"{color} line", "light_rail")
    print(f"[gtfs] note: VTA light rail route {text.strip()!r} has no rule; skipped")
    return None


AMTRAK_LINES = {
    "Capitol Corridor": ("capitol-corridor", "Capitol Corridor", "intercity_rail"),
    "California Zephyr": ("amtrak-california-zephyr", "California Zephyr", "intercity_rail"),
    "Coast Starlight": ("amtrak-coast-starlight", "Coast Starlight", "intercity_rail"),
}


def single(line: LineDef) -> Callable[[dict], LineDef | None]:
    """Every rail route of the agency is one line (its patterns run on the same track)."""
    return lambda r: line if r["route_type"] in RAIL_FERRY_TYPES - {"4"} else None


def ferry_line(agency_slug: str) -> Callable[[dict], LineDef | None]:
    def rule(r: dict) -> LineDef | None:
        if r["route_type"] != "4":
            return None
        name = re.sub(r"\s+ferry$", "", tidy(r["route_long_name"] or r["route_short_name"]), flags=re.I)
        name = re.sub(r"\s*\u2013\s*", "\u2013", name)
        return (f"{agency_slug}-{slug(name)}", name, "ferry")
    return rule


@dataclass
class Agency:
    slug: str
    system: tuple[str, str, str]  # id, name, short name
    feed: str
    match: str  # regex on agency_name in agency.txt
    line: Callable[[dict], LineDef | None]
    stations: str = "all"  # "all" stops (collapsed to their stations); "named": only stops named as a station
    point_kind: str = "station"


AGENCIES = [
    Agency("bart", ("bart", "Bay Area Rapid Transit", "BART"), "511", r"Bay Area Rapid Transit|\bBART\b", bart_line),
    Agency("muni", ("muni", "San Francisco Municipal Railway", "Muni"), "511", r"San Francisco Municipal|SFMTA|\bMuni\b",
           muni_line, stations="named"),
    Agency("caltrain", ("caltrain", "Caltrain", "Caltrain"), "511", r"Caltrain|Peninsula Corridor",
           single(("caltrain", "Caltrain", "commuter_rail"))),
    Agency("vta", ("vta", "Santa Clara Valley Transportation Authority", "VTA"), "511", r"\bVTA\b|Santa Clara Valley Transportation",
           vta_line),
    Agency("smart", ("smart", "Sonoma-Marin Area Rail Transit", "SMART"), "511", r"\bSMART\b|Sonoma.?Marin",
           single(("smart", "SMART", "commuter_rail"))),
    Agency("ace", ("ace", "Altamont Corridor Express", "ACE"), "511", r"Altamont|\bACE\b",
           single(("ace", "Altamont Corridor Express", "commuter_rail"))),
    Agency("gold-runner", ("gold-runner", "Gold Runner (formerly the San Joaquins)", "Gold Runner"), "gold-runner", r"Gold Runner|San Joaquins",
           single(("gold-runner", "Gold Runner", "intercity_rail"))),
    Agency("sfo-airtrain", ("sfo-airtrain", "SFO AirTrain", "AirTrain"), "511", r"^SFO Airport$",
           single(("sfo-airtrain", "SFO AirTrain", "people_mover"))),
    Agency("amtrak", ("amtrak", "Amtrak", "Amtrak"), "amtrak", r"^Amtrak$",
           lambda r: AMTRAK_LINES.get(r["route_long_name"].strip()) if r["route_type"] == "2" else None),
]
# Agencies in the 511 feed that Amtrak's feed already covers: skipped there, so nothing is drawn twice.
SKIP_511 = r"Capitol Corridor|^Amtrak"
# Every other agency in the 511 feed that runs ferries counts (decision 5): matched by route type.
FERRY_FEED = "511"


STATION_DIRECTION = re.compile(r"\s*/?\s*\b(Downtown|Downtn|Outbound|Outbd|Inbound|Northbound|Southbound)$", re.I)


def station_name(name: str) -> str:
    """A station's name from one of its platform stops: "Metro Castro Station/Outbound" is "Castro"."""
    name = STATION_DIRECTION.sub("", re.sub(r"^Metro\s+", "", name.strip()))
    return tidy(re.sub(r"\s+Station$", "", name))


# ------------------------------------------------------------------------------------------ geometry

def cover(shapes_m: list[LineString]) -> list[LineString]:
    """The track a line runs: every shape, longest first, keeping only what isn't already covered."""
    kept: list[LineString] = []
    covered = None
    for shape in sorted(shapes_m, key=lambda s: s.length, reverse=True):
        rest = shape if covered is None else shape.difference(covered.buffer(COVER_M))
        parts = [p for p in getattr(rest, "geoms", [rest]) if isinstance(p, LineString) and p.length >= SLIVER_M]
        for p in parts:
            if covered is not None:
                p = snap_ends(p, covered)
            kept.append(p)
        if parts:
            covered = unary_union(kept)
    merged = linemerge(kept) if kept else MultiLineString()
    return list(getattr(merged, "geoms", [merged])) if not merged.is_empty else []


def snap_ends(piece: LineString, covered) -> LineString:
    """Join a branch to the track it leaves, closing the small gap the coverage buffer leaves."""
    coords = list(piece.coords)
    for i in (0, -1):
        end = Point(coords[i])
        if end.distance(covered) <= SNAP_M:
            near = nearest_points(end, covered)[1]
            if i == 0:
                coords.insert(0, (near.x, near.y))
            else:
                coords.append((near.x, near.y))
    return LineString(coords)


def finish(lines_m: list[LineString]) -> list[list[list[float]]]:
    """Simplify, clip to the map's bounds, and return lon/lat parts."""
    parts = []
    for line in lines_m:
        deg = to_degrees(line.simplify(SIMPLIFY_M, preserve_topology=False)).intersection(BOUNDS)
        for p in getattr(deg, "geoms", [deg]):
            if isinstance(p, LineString) and not p.is_empty and len(p.coords) >= 2:
                parts.append(round_coords([list(c) for c in p.coords]))
    return parts


# ------------------------------------------------------------------------------------------ BRT

LANE_M = 15.0  # route geometry this close to a median-lane way runs in that lane
LANE_GAP_M = 120.0  # gaps shorter than this are closed (lane tags lapse across intersections)
STOP_M = 30.0  # a route's stops this close to the kept corridor are its stations
END_CHECK_M = 200.0  # how far the kept corridor may end from a cross street the agency names as a lane limit
BRT_ACCESSED = "2026-10-13"


@dataclass
class Brt:
    """A BRT corridor (decision 3): the agency's route, drawn where it runs in center or median lanes."""
    corridor: str
    agency: str  # regex on agency_name
    system: tuple[str, str, str]
    route: str  # regex on route_short_name
    source: dict  # the agency's own description of the corridor (official)
    ends: tuple[tuple[str, str], ...] = ()  # lane limits the agency names: (as it says it, OSM name pattern)


BRT = [
    Brt("Van Ness BRT", r"San Francisco Municipal|SFMTA|\bMuni\b", ("muni", "San Francisco Municipal Railway", "Muni"), r"^49$", {
        "id": "brt-sfmta-van-ness", "title": "Van Ness Improvement Project",
        "publisher": "San Francisco Municipal Transportation Agency", "type": "official",
        "url": "https://www.sfmta.com/projects/van-ness-improvement-project", "accessed": BRT_ACCESSED,
        "notes": "Center-running bus lanes on Van Ness Ave from Mission St to Lombard St; BRT service began in April 2022.",
    }, ends=(("Mission St", "^Mission Street$"), ("Lombard St", "^Lombard Street$"))),
    Brt("Tempo", r"(?i)AC Transit|Alameda.?Contra Costa", ("ac-transit", "Alameda-Contra Costa Transit District", "AC Transit"), r"^1T$", {
        "id": "brt-actransit-tempo", "title": "AC Transit press release on Tempo's launch", "publisher": "AC Transit",
        "date": "2020-08-07", "type": "official", "url": "https://www.actransit.org/node/688", "accessed": BRT_ACCESSED,
        "notes": ("Tempo runs from Uptown Oakland to San Leandro BART along International Blvd and East 14th St, on a "
                  "'nearly 10-mile network of dedicated and painted bus-only lanes'. It doesn't say where the center lanes "
                  "start and end, so OSM's lane tags do (decision 9)."),
    }),
    Brt("Alum Rock BRT", r"\bVTA\b|Santa Clara Valley Transportation", ("vta", "Santa Clara Valley Transportation Authority", "VTA"), r"(^|\s)522$", {
        "id": "brt-vta-rapid-522", "title": "Route 522: Rapid 522, Palo Alto TC to Eastridge (schedule)",
        "publisher": "Santa Clara Valley Transportation Authority", "type": "official",
        "url": "https://www.vta.org/sites/default/files/route_schedule_pdfs/current/route_522/route_522_schedule.pdf",
        "accessed": BRT_ACCESSED,
        "notes": ("Directions: on Alum Rock Ave buses 'Merge Left into Bus Only lane', stop at the 'median BRT stops at Alum Rock & "
                  "Jackson and Alum Rock & King', and 'Merge Right into regular traffic lane after 34th' (westbound) or 'after "
                  "Muirfield' (eastbound)."),
    }, ends=(("34th St", "^(North |N )?34th Street$"), ("Muirfield", "^Muirfield"))),
]
OSM_SOURCE = "osm-overpass-brt"


def clip_to_lanes(route_m: list[LineString], lanes_m) -> list[LineString]:
    """The parts of a route that run along a median-lane way: within LANE_M of one, with gaps under
    LANE_GAP_M closed and pieces under SLIVER_M dropped."""
    zone = lanes_m.buffer(LANE_M)
    kept = []
    for line in route_m:
        inside = line.intersection(zone)
        spans = sorted(tuple(sorted((line.project(Point(p.coords[0])), line.project(Point(p.coords[-1])))))
                       for p in getattr(inside, "geoms", [inside]) if isinstance(p, LineString) and not p.is_empty)
        merged: list[list[float]] = []
        for a, b in spans:
            if merged and a - merged[-1][1] < LANE_GAP_M:
                merged[-1][1] = max(merged[-1][1], b)
            else:
                merged.append([a, b])
        kept += [substring(line, a, b) for a, b in merged if b - a >= SLIVER_M]
    return kept


def build_brt(g: "GtfsZip", source_id: str, digest: str, refresh: bool) -> list[tuple[str, str, str]]:
    """Every BRT corridor, into data/present/brt/. Returns the systems it used. Without Overpass (and
    no cached response), it says so and leaves the folder as it is."""
    agencies = g.table("agency.txt")
    routes = g.table("routes.txt")
    stops = {s["stop_id"]: s for s in g.table("stops.txt")}
    lines_out, segments_out, points_out, systems, bases = [], [], [], [], set()
    for c in BRT:
        aids = {a.get("agency_id", "") for a in agencies if re.search(c.agency, a["agency_name"])}
        matched = [r for r in routes if r.get("agency_id", "") in aids and re.search(c.route, r["route_short_name"].strip())]
        if len(matched) != 1:
            print(f"[brt] {c.corridor}: expected one route matching {c.route!r}, found {[r['route_short_name'] for r in matched]}; skipped")
            continue
        r = matched[0]
        trips = [t for t in g.table("trips.txt") if t["route_id"] == r["route_id"]]
        counts = Counter(t.get("shape_id") for t in trips if t.get("shape_id"))
        shaped = {sid for sid, n in counts.items() if n >= 2 or len(counts) == 1}
        pts: dict[str, list] = defaultdict(list)
        for row in g.table("shapes.txt"):
            if row["shape_id"] in shaped:
                pts[row["shape_id"]].append((int(row["shape_pt_sequence"]), float(row["shape_pt_lon"]), float(row["shape_pt_lat"])))
        shapes_deg = [LineString([(x, y) for _, x, y in sorted(p)]) for p in pts.values() if len(p) >= 2]
        if not shapes_deg:
            print(f"[brt] {c.corridor}: route {r['route_short_name']} has no shapes; skipped")
            continue
        x0, y0, x1, y1 = unary_union(shapes_deg).bounds
        line_id = f"{c.system[0]}-{slug(re.sub(r'^Rapid\s+', '', r['route_short_name'].strip()))}"
        try:
            response = osm_lanes.fetch(f"brt-{line_id}", (x0 - 0.0012, y0 - 0.001, x1 + 0.0012, y1 + 0.001), refresh=refresh)
        except osm_lanes.OverpassUnavailable as e:
            print(f"[brt] {e}. Allow overpass-api.de (docs/DECISIONS.md, decision 9); BRT kept as it is.")
            return []
        bases.add(osm_lanes.osm_base(response))
        median, review = osm_lanes.median_ways(response, to_metres)
        route_m = unary_union(cover([to_metres(s) for s in shapes_deg]))
        along = route_m.buffer(LANE_M)
        for w in review:
            w_m = to_metres(w.line)
            if w_m.intersection(along).length < 50.0:
                continue  # crosses the route, or doesn't touch it
            lane_tags = {k: v for k, v in w.tags.items() if osm_lanes.BUS_KEY.match(k) or k in ("oneway", "highway", "name")}
            print(f"[brt] {c.corridor}: review way {w.id} (its tags don't say where the bus lane is): {lane_tags}")
        if not median:
            print(f"[brt] {c.corridor}: no center or median bus lanes in OSM along route {r['route_short_name']}; skipped")
            continue
        kept = clip_to_lanes(list(getattr(route_m, "geoms", [route_m])), unary_union([m for _, m in median]))
        parts = finish(kept)
        if not parts:
            print(f"[brt] {c.corridor}: route {r['route_short_name']} doesn't run along the median lanes; skipped")
            continue
        used_ways = sorted(w.id for w, m in median if any(k.distance(m) <= LANE_M for k in kept))
        kept_m = unary_union(kept)

        # Stations: the route's stops along the kept corridor, one per name.
        trip_ids = {t["trip_id"] for t in trips}
        route_stops = {st["stop_id"] for st in g.table("stop_times.txt") if st["trip_id"] in trip_ids}
        stations: dict[str, dict] = {}
        for sid in sorted(route_stops):
            s = stops.get(sid)
            if s and to_metres(Point(float(s["stop_lon"]), float(s["stop_lat"]))).distance(kept_m) <= STOP_M:
                stations.setdefault(s["stop_name"].strip(), s)

        # The lane limits the agency names, checked against where OSM's lanes end.
        flags = ["opened_unsourced"]
        notes = []
        ends = [Point(p.coords[i]) for p in kept for i in (0, -1)]
        bbox = (x0 - 0.0012, y0 - 0.001, x1 + 0.0012, y1 + 0.001)
        for said, pattern in c.ends:
            try:
                streets = osm_lanes.streets(f"brt-{line_id}-{slug(said)}", bbox, pattern, refresh=refresh)
            except osm_lanes.OverpassUnavailable as e:
                notes.append(f"Can't check the limit at {said}: {e}.")
                continue
            # Roads by that name near the route (a side street may end short of it, as Muirfield Dr does).
            near = [to_metres(w.line) for w in streets if to_metres(w.line).distance(route_m) <= END_CHECK_M]
            if not near:
                notes.append(f"Can't check the limit at {said}: OSM has no road by that name near the route.")
                continue
            gap = min(e.distance(n) for e in ends for n in near)
            if gap > END_CHECK_M:
                flags.append("conflicting_sources")
                notes.append(f"The agency puts a lane limit at {said}, but OSM's lanes end {gap:.0f} m from it.")
            else:
                print(f"[brt] {c.corridor}: OSM's lanes end {gap:.0f} m from {said}, where the agency puts a limit")
        for n in notes:
            print(f"[brt] {c.corridor}: {n}")

        short = re.sub(r"^Rapid\s+", "", r["route_short_name"].strip())
        long = r["route_long_name"].strip()
        if r["route_short_name"].strip().startswith("Rapid"):
            long = re.sub(r"\s+Rapid$", "", long)  # "Rapid 522 Palo Alto TC - Eastridge Rapid"
        name = tidy(f"{r['route_short_name'].strip()} {long}")
        seg_id = f"{line_id}-brt-lanes"
        agency_ref = {"source": c.source["id"], "supports": ["general"] + (["route"] if c.ends else [])}
        segments_out.append({
            "type": "Feature",
            "properties": {
                "id": seg_id, "system": c.system[0], "name": f"{c.corridor}, center or median lanes",
                "opened": None, "closed": None,
                "geometry_confidence": "surveyed",
                "geometry_method": (f"GTFS shapes.txt ({len(shapes_deg)} shape{'' if len(shapes_deg) == 1 else 's'} of route {r['route_short_name']}), kept within {LANE_M:g} m "
                                    f"of OSM ways with a center or median bus lane (gaps under {LANE_GAP_M:g} m closed), simplified "
                                    f"to {SIMPLIFY_M:g} m. OSM ways {', '.join(map(str, used_ways))}; Overpass data as of "
                                    f"{osm_lanes.osm_base(response)}."),
                "sources": [{"source": OSM_SOURCE, "supports": ["geometry", "route"]}, {"source": source_id, "supports": ["geometry"]}, agency_ref],
                "flags": flags,
                **({"notes": " ".join(notes)} if notes else {}),
            },
            "geometry": {"type": "LineString", "coordinates": parts[0]} if len(parts) == 1 else {"type": "MultiLineString", "coordinates": parts},
        })
        lines_out.append({
            "id": line_id, "name": name, "short_name": short, "system": c.system[0],
            "operators": [{"name": operator if not (operator := next(a["agency_name"] for a in agencies
                                                                   if a.get("agency_id", "") == r.get("agency_id", ""))).isupper()
                           else c.system[2]}],  # "AC TRANSIT" in the feed reads "AC Transit"
            "mode": "brt", "era": "present", "opened": None, "closed": None, "status": "active",
            "summary": f"Drawn only along {c.corridor}, where it runs in center or median bus lanes (the rest of the route runs in traffic).",
            "route": [{"segment": seg_id}],
            "sources": [{"source": source_id, "supports": ["route", "stations", "name", "operator"]}, agency_ref],
            "flags": flags,
        })
        for sname, s in sorted(stations.items()):
            points_out.append({
                "type": "Feature",
                "properties": {
                    "id": f"{line_id}-{slug(sname)}", "kind": "station", "name": sname, "system": c.system[0],
                    "line_ids": [line_id], "opened": None, "closed": None,
                    "geometry_confidence": "surveyed", "geometry_method": f"GTFS stops.txt, stop {s['stop_id']}",
                    "sources": [{"source": source_id, "supports": ["stations"]}], "flags": ["opened_unsourced"],
                },
                "geometry": {"type": "Point", "coordinates": round_coords([float(s["stop_lon"]), float(s["stop_lat"])])},
            })
        systems.append(c.system)
        print(f"[brt] {c.corridor}: route {r['route_short_name']}, {sum(p.length for p in kept) / 1000:.1f} km on "
              f"{len(used_ways)} OSM ways, {len(stations)} stations")

    if not lines_out:
        return []
    base = ", ".join(sorted(b for b in bases if b))
    merge_registry(SOURCES, "sources", "brt-", [c.source for c in BRT])
    merge_registry(SOURCES, "sources", OSM_SOURCE, [{
        "id": OSM_SOURCE, "title": "OpenStreetMap bus-lane and busway tags along the BRT routes, via Overpass",
        "publisher": "OpenStreetMap contributors", "url": osm_lanes.OVERPASS, "type": "dataset",
        "license": osm_lanes.OVERPASS_LICENSE, "accessed": TODAY,
        "notes": f"Overpass data as of {base}. The queries are cached with their responses in data/raw/osm/.",
    }])
    note = (f"Generated by transit_pipeline.gtfs (BRT) from the 511 feed (SHA-256 {digest[:12]}) and OpenStreetMap "
            f"via Overpass ({base}). Don't edit by hand; rerun.")
    out = DATA / "present" / "brt"
    write_json(out / "lines.json", {"$comment": note, "lines": lines_out})
    write_geojson(out / "segments.geojson", segments_out, comment=note)
    write_geojson(out / "points.geojson", points_out, comment=note)
    return systems


# ------------------------------------------------------------------------------------------ build

class GtfsZip:
    def __init__(self, path):
        self.z = zipfile.ZipFile(path)
        self.names = set(self.z.namelist())

    def table(self, name: str) -> list[dict]:
        if name not in self.names:
            return []
        with self.z.open(name) as f:
            return list(csv.DictReader(io.TextIOWrapper(f, encoding="utf-8-sig")))


@dataclass
class LineBuild:
    line: LineDef
    agency_name: str
    trips: list[dict] = field(default_factory=list)


def build_agency(agency: Agency, g: GtfsZip, feed: Feed, agency_ids: set[str], source_id: str, digest: str) -> dict:
    routes = [r for r in g.table("routes.txt") if r.get("agency_id", "") in agency_ids or (not r.get("agency_id") and len(agency_ids) == 1)]
    agency_names = {a.get("agency_id", ""): a["agency_name"] for a in g.table("agency.txt")}
    builds: dict[str, LineBuild] = {}
    route_line: dict[str, str] = {}
    for r in routes:
        if r["route_type"] not in RAIL_FERRY_TYPES:
            continue
        line = agency.line(r)
        if not line:
            continue
        builds.setdefault(line[0], LineBuild(line, agency_names.get(r.get("agency_id", ""), agency.system[1])))
        route_line[r["route_id"]] = line[0]
    if not builds:
        return {}

    trips = [t for t in g.table("trips.txt") if t["route_id"] in route_line]
    trip_line = {t["trip_id"]: route_line[t["route_id"]] for t in trips}
    for t in trips:
        builds[trip_line[t["trip_id"]]].trips.append(t)

    shape_ids = {t.get("shape_id") for t in trips if t.get("shape_id")}
    shapes: dict[str, list[tuple[int, float, float]]] = defaultdict(list)
    for s in g.table("shapes.txt"):
        if s["shape_id"] in shape_ids:
            shapes[s["shape_id"]].append((int(s["shape_pt_sequence"]), float(s["shape_pt_lon"]), float(s["shape_pt_lat"])))

    stops = {s["stop_id"]: s for s in g.table("stops.txt")}
    trip_stops: dict[str, list[tuple[int, str]]] = defaultdict(list)
    for st in g.table("stop_times.txt"):
        if st["trip_id"] in trip_line:
            trip_stops[st["trip_id"]].append((int(st["stop_sequence"]), st["stop_id"]))

    groups: dict[str, set[str]] = defaultdict(set)  # a "named" station's platform stops

    def station_of(stop_id: str) -> str | None:
        s = stops.get(stop_id)
        if not s:
            return None
        if agency.stations == "named":
            # Muni's stops in the regional feed have no parent stations of their own (only those shared
            # with BART do), so a station is every stop named as one, both directions together.
            if not re.search(r"\bStation\b", s["stop_name"]):
                return None
            key = "name:" + station_name(s["stop_name"])
            groups[key].add(stop_id)
            return key
        parent = s.get("parent_station")
        return parent if parent and parent in stops else stop_id

    flags = ["opened_unsourced"] + (["license_unclear"] if feed.license_unclear else [])
    lines_out, segments_out = [], []
    station_lines: dict[str, set[str]] = defaultdict(set)
    for line_id, b in sorted(builds.items()):
        counts = Counter(t.get("shape_id") for t in b.trips if t.get("shape_id"))
        shaped = [sid for sid, n in counts.items() if n >= 2 or len(counts) == 1]
        method = ""
        confidence = "surveyed"
        if shaped:
            geoms = [to_metres(LineString([(x, y) for _, x, y in sorted(shapes[sid])])) for sid in shaped if len(shapes[sid]) >= 2]
            parts = finish(cover(geoms))
            method = (f"GTFS shapes.txt: {len(shaped)} shapes run by {sum(counts[s] for s in shaped)} trips, merged "
                      f"(kept where more than {COVER_M:g} m from track already drawn), simplified to {SIMPLIFY_M:g} m")
        else:
            # No published shape: draw through the stops, and say so (dashed on the map).
            seqs = {tuple(sid for _, sid in sorted(trip_stops[t["trip_id"]])) for t in b.trips}
            geoms = [to_metres(LineString([(float(stops[s]["stop_lon"]), float(stops[s]["stop_lat"])) for s in seq]))
                     for seq in seqs if len(seq) >= 2]
            parts = finish(cover(geoms))
            confidence = "approximate"
            method = "No shapes in the feed: straight lines between the stops of each stop pattern (GTFS stop_times.txt)"
        if not parts:
            print(f"[gtfs] {line_id}: nothing inside the map's bounds; skipped")
            continue

        # Terminals beyond the map: where the line continues to.
        beyond = set()
        for t in b.trips:
            seq = sorted(trip_stops[t["trip_id"]])
            for _, sid in (seq[:1] + seq[-1:]):
                s = stops.get(sid)
                if s and not BOUNDS.contains(Point(float(s["stop_lon"]), float(s["stop_lat"]))):
                    beyond.add(s["stop_name"].strip())
        for t in b.trips:
            for _, sid in trip_stops[t["trip_id"]]:
                st = station_of(sid)
                if st:
                    station_lines[st].add(line_id)

        line_name, mode = b.line[1], b.line[2]
        seg_id = f"{line_id}-gtfs"
        segments_out.append({
            "type": "Feature",
            "properties": {
                "id": seg_id,
                "system": agency.system[0],
                "name": f"{line_name}, as run in GTFS",
                "opened": None,
                "closed": None,
                "geometry_confidence": confidence,
                "geometry_method": method,
                "sources": [{"source": source_id, "supports": ["geometry"]}],
                "flags": flags,
                "notes": "One segment per line until Phase 2 splits today's network into dated segments, so lines sharing track overlap.",
            },
            "geometry": {"type": "LineString", "coordinates": parts[0]} if len(parts) == 1 else {"type": "MultiLineString", "coordinates": parts},
        })
        record = {
            "id": line_id,
            "name": line_name,
            "system": agency.system[0],
            "operators": [{"name": b.agency_name}],
            "mode": mode,
            "era": "present",
            "opened": None,
            "closed": None,
            "status": "active",
            "route": [{"segment": seg_id}],
            "sources": [{"source": source_id, "supports": ["geometry", "route", "stations", "name", "operator"]}],
            "flags": flags,
        }
        if beyond:
            record["continues_beyond"] = " and ".join(sorted(beyond))
        lines_out.append(record)

    kept_lines = {l["id"] for l in lines_out}
    points_out = []
    for sid, ids in sorted(station_lines.items()):
        ids &= kept_lines
        members = sorted(groups[sid]) if sid in groups else [sid]
        lons = [float(stops[m]["stop_lon"]) for m in members]
        lats = [float(stops[m]["stop_lat"]) for m in members]
        pt = Point(sum(lons) / len(lons), sum(lats) / len(lats))
        if not ids or not BOUNDS.contains(pt):
            continue
        named = sid.startswith("name:")
        name = sid[5:] if named else stops[sid]["stop_name"].strip()
        method = (f"GTFS stops.txt: the mean of stops {', '.join(members)} (its platforms)" if named
                  else f"GTFS stops.txt, stop {sid}")
        points_out.append({
            "type": "Feature",
            "properties": {
                "id": f"{agency.slug}-{slug(name if named else sid)}",
                "kind": "ferry_terminal" if all(l["mode"] == "ferry" for l in lines_out if l["id"] in ids) else agency.point_kind,
                "name": name,
                "system": agency.system[0],
                "line_ids": sorted(ids),
                "opened": None,
                "closed": None,
                "geometry_confidence": "surveyed",
                "geometry_method": method,
                "sources": [{"source": source_id, "supports": ["stations"]}],
                "flags": flags,
            },
            "geometry": {"type": "Point", "coordinates": round_coords([pt.x, pt.y])},
        })

    out = DATA / "present" / agency.slug
    note = f"Generated by transit_pipeline.gtfs from the {feed.title} (SHA-256 {digest[:12]}). Don't edit by hand; rerun."
    write_json(out / "lines.json", {"$comment": note, "lines": lines_out})
    write_geojson(out / "segments.geojson", segments_out, comment=note)
    write_geojson(out / "points.geojson", points_out, comment=note)
    print(f"[gtfs] {agency.slug}: {len(lines_out)} lines, {len(points_out)} stations (from {feed.id})")
    return {"agency": agency.slug, "system": agency.system, "lines": len(lines_out)}


def feed_source(feed: Feed, info: dict, digest: str) -> dict:
    version = info.get("feed_version", "")
    return {
        "id": f"gtfs-{feed.id}",
        "title": feed.title + (f", version {version}" if version else ""),
        "publisher": feed.publisher,
        "url": feed.url.replace("api_key={key}&", ""),
        "type": "dataset",
        "license": feed.license,
        "accessed": TODAY,
        "notes": (f"feed_info dates {info['feed_start_date']} to {info['feed_end_date']}; " if info.get("feed_start_date") and info.get("feed_end_date")
                  else "feed_info gives no dates; ") + f"file SHA-256 {digest}.",
    }


def generated_from(agency_slug: str) -> str | None:
    """Which feed an agency's committed files came from (by their cited source)."""
    path = DATA / "present" / agency_slug / "lines.json"
    if not path.exists():
        return None
    lines = json.loads(path.read_text())["lines"]
    return lines[0]["sources"][0]["source"].removeprefix("gtfs-") if lines else None


def main() -> None:
    load_env()
    have_key = bool(os.environ.get("TRANSIT_511_API_KEY"))
    feeds_json = DATA / "present" / "feeds.json"
    feed_log = {f["id"]: f for f in json.loads(feeds_json.read_text()).get("feeds", []) if "id" in f} if feeds_json.exists() else {}
    refresh = "--refresh" in sys.argv

    plan = []  # (agency, feed id)
    for agency in AGENCIES:
        if agency.feed == "511" and not have_key:
            if agency.slug == "bart" and generated_from("bart") in (None, "bart"):
                plan.append((agency, "bart"))
            else:
                print(f"[gtfs] {agency.slug}: needs TRANSIT_511_API_KEY; kept as it is")
            continue
        plan.append((agency, agency.feed))
    if have_key:
        plan.append((None, FERRY_FEED))
    else:
        print("[gtfs] ferries and brt: need TRANSIT_511_API_KEY (BRT also needs overpass-api.de); kept as they are")

    systems = []
    plan_feeds = sorted({f for _, f in plan})
    for feed_id in plan_feeds:
        feed = FEEDS[feed_id]
        zpath = fetch(feed.download_url(), RAW / "gtfs" / feed_id / "feed.zip", refresh=refresh)
        digest = sha256(zpath)
        g = GtfsZip(zpath)
        info = (g.table("feed_info.txt") or [{}])[0]
        source_id = f"gtfs-{feed.id}"
        agencies = g.table("agency.txt")
        used = []
        claimed: set[str] = set()
        for agency, fid in plan:
            if fid != feed_id or agency is None:
                continue
            ids = {a.get("agency_id", "") for a in agencies if re.search(agency.match, a["agency_name"])}
            if feed_id == "511":
                ids = {i for i in ids if not re.search(SKIP_511, next(a["agency_name"] for a in agencies if a.get("agency_id", "") == i))}
            if feed_id == "bart":
                ids = {a.get("agency_id", "") for a in agencies}
            claimed |= ids
            result = build_agency(agency, g, feed, ids, source_id, digest)
            if result:
                used.append(result["agency"])
                systems.append({"id": agency.system[0], "name": agency.system[1], "short_name": agency.system[2]})
        if feed_id == FERRY_FEED and any(a is None and f == feed_id for a, f in plan):
            # Every other operator with ferry routes (decision 5).
            ferry_types = defaultdict(set)
            for r in g.table("routes.txt"):
                ferry_types[r.get("agency_id", "")].add(r["route_type"])
            for a in agencies:
                aid = a.get("agency_id", "")
                if aid in claimed or "4" not in ferry_types[aid] or re.search(SKIP_511, a["agency_name"]):
                    continue
                s = slug(a["agency_name"])
                ferry = Agency(s, (s, a["agency_name"], a["agency_name"]), feed_id, re.escape(a["agency_name"]), ferry_line(s))
                result = build_agency(ferry, g, feed, {aid}, source_id, digest)
                if result:
                    used.append(result["agency"])
                    systems.append({"id": s, "name": a["agency_name"], "short_name": a["agency_name"]})
            # Rail operators nobody claimed: listed for review, never drawn silently.
            for a in agencies:
                aid = a.get("agency_id", "")
                if aid not in claimed and ferry_types[aid] & (RAIL_FERRY_TYPES - {"4"}) and not re.search(SKIP_511, a["agency_name"]):
                    print(f"[gtfs] note: {a['agency_name']} ({aid}) runs rail routes but has no rule in AGENCIES")
            # BRT, on its center or median lanes only (decisions 3 and 9).
            for sys_id, name, short in build_brt(g, source_id, digest, refresh):
                used.append(f"{sys_id} (BRT)")
                systems.append({"id": sys_id, "name": name, "short_name": short})
        merge_registry(SOURCES, "sources", source_id, [feed_source(feed, info, digest)])
        feed_log[feed_id] = {
            "id": feed_id, "title": feed.title, "url": feed.url.replace("api_key={key}&", ""), "sha256": digest,
            "fetched": TODAY, "feed_version": info.get("feed_version", ""), "feed_start_date": info.get("feed_start_date"),
            "feed_end_date": info.get("feed_end_date"), "license": feed.license, "agencies": sorted(used),
        }
    # A feed no agency comes from any more (BART's own, once 511's key arrives) leaves the records.
    produced = {a for f in plan_feeds for a in feed_log[f]["agencies"]}
    for fid in [f for f in feed_log if f not in plan_feeds]:
        feed_log[fid]["agencies"] = [a for a in feed_log[fid]["agencies"] if a not in produced]
        if not feed_log[fid]["agencies"]:
            del feed_log[fid]
            merge_registry(SOURCES, "sources", f"gtfs-{fid}", [])
    ensure_systems(systems)
    write_json(feeds_json, {"feeds": [feed_log[k] for k in sorted(feed_log)]})


if __name__ == "__main__":
    main()
