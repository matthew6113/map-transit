"""OpenHistoricalMap's dated railways: the first rung of the past era's geometry ladder.

OpenHistoricalMap (OHM, https://www.openhistoricalmap.org) maps railways that are gone, as ways with
`start_date` and `end_date`, under CC0. This step reads every railway way and ferry route in the
map's pan limits, and the route relations among them, from OHM's Overpass server (the same API as
OpenStreetMap's, `osm_lanes.py`), caches the response in data/raw/ohm/ and records it in
data/sources.json as `ohm-<date>`.

OHM is used for geometry only. Its dates are crowd-sourced, so they are pointers, like Wikipedia's:
a segment drawn from OHM takes its dates from the cited histories, and where OHM disagrees with a
primary source, the primary source wins and the record carries `conflicting_sources` (`survey` lists
the disagreements).

A trace recipe (past.py) draws from OHM with a part `{"ohm": [way ids]}`: the ways are chained in
order, each reversed as needed, cut at `"from"` and `"to"` ([lon, lat]) where the first or last way
runs on past the segment, and cut where they leave the Bay Area with the recipe's `"clip":
"county"` (decision 16). Every way id is named in the segment's geometry_method. `route` finds the
ways between two points.

The hand-kept data/past/ohm.json says how OHM's ways map onto this map:
- `operators`: OHM's `operator` (or `name`) values -> this map's system and mode;
- `duplicates`: ways that draw track already traced here -> our segment id, or the ids of the
  segments they span. They aren't drawn, but `survey` measures how far apart the two are, as a
  check on both;
- `skip`: ways left out, and why (outside the nine counties, a heritage railway, today's track).

    uv run --directory pipeline python -m transit_pipeline.ohm fetch [--refresh]
    uv run --directory pipeline python -m transit_pipeline.ohm show WAY_ID ...
    uv run --directory pipeline python -m transit_pipeline.ohm route LON,LAT LON,LAT [--match SN]
    uv run --directory pipeline python -m transit_pipeline.ohm survey     # docs/checks/ohm.md
"""

from __future__ import annotations

import argparse
import json
from collections import defaultdict
from functools import cache

from shapely.geometry import LineString, Point

from .common import DATA, RAW, ROOT, SOURCES, merge_registry
from .gtfs import to_metres
from .osm_lanes import _fetch

ENDPOINT = "https://overpass-api.openhistoricalmap.org/api/interpreter"
CACHE = RAW / "ohm"
OVERRIDES = DATA / "past" / "ohm.json"
REPORT = ROOT / "docs" / "checks" / "ohm.md"
REGION = json.loads((ROOT / "src" / "basemap" / "region.json").read_text())
LICENSE = "CC0 1.0 (public domain dedication): https://www.openhistoricalmap.org/copyright"


def query(bbox) -> str:
    w, s, e, n = bbox
    area = f"({s},{w},{n},{e})"
    return (f'[out:json][timeout:240];(way["railway"]{area};way["route"="ferry"]{area};'
            f'rel["type"="route"]{area};);out tags geom;')


@cache
def response(refresh: bool = False) -> dict:
    bbox = tuple(REGION["maxBounds"])
    return _fetch("region", bbox, query(bbox), refresh, endpoint=ENDPOINT, cache=CACHE)


def as_of() -> str:
    """The OHM data timestamp the cached response reflects."""
    return response().get("osm3s", {}).get("timestamp_osm_base", "")


def source_id() -> str:
    return f"ohm-{as_of()[:10]}"


@cache
def ways() -> dict[int, dict]:
    return {el["id"]: el for el in response()["elements"] if el["type"] == "way" and len(el.get("geometry", [])) >= 2}


@cache
def relations() -> dict[int, dict]:
    return {el["id"]: el for el in response()["elements"] if el["type"] == "relation"}


def coords(way_id: int) -> list[list[float]]:
    if way_id not in ways():
        raise SystemExit(f"[ohm] way {way_id} isn't in the cached response (ohm fetch --refresh?)")
    return [[p["lon"], p["lat"]] for p in ways()[way_id]["geometry"]]


TOUCH_M = 2.0  # a way that starts this close to another's vertex joins it there


def chain(way_ids: list[int]) -> list[list[float]]:
    """The ways end to end, in the order given, each turned round to run on from the one before.
    Where a way branches off part-way along the line so far (OHM splits ways at some junctions and
    not others), the line is cut back to the junction first."""
    from .past import join
    out = list(coords(way_ids[0]))
    for w in way_ids[1:]:
        nxt = coords(w)
        line = to_metres(LineString(out))
        ends = [to_metres(Point(nxt[0])), to_metres(Point(nxt[-1]))]
        tail = to_metres(Point(out[-1])), to_metres(Point(out[0]))
        if min(e.distance(t) for e in ends for t in tail) > TOUCH_M:
            # Branches off mid-line: cut back to the vertex it starts from.
            for e in ends:
                if line.distance(e) <= TOUCH_M:
                    i = min(range(len(out)), key=lambda k: to_metres(Point(out[k])).distance(e))
                    out = out[: i + 1]
                    break
        out = join([out, nxt], f"ohm ways {way_ids[0]}…")
    return out


def cut(line: list[list[float]], start=None, end=None) -> list[list[float]]:
    """The chained ways between the points nearest `start` and `end` ([lon, lat]), for a recipe whose
    first or last way runs on past where the segment ends."""
    from shapely.ops import substring
    from .gtfs import to_degrees
    m = to_metres(LineString(line))
    a = m.project(to_metres(Point(start))) if start else 0.0
    b = m.project(to_metres(Point(end))) if end else m.length
    piece = substring(m, min(a, b), max(a, b))
    out = [list(c) for c in to_degrees(piece).coords]
    return out if a <= b else out[::-1]


def route(start: tuple[float, float], end: tuple[float, float], match: str = "") -> list[int]:
    """The OHM ways along the shortest path over the ways' vertices between two points, in order:
    for writing a recipe's `ohm` part. `match` keeps to ways whose tags contain it (an operator)."""
    import heapq
    from .gtfs import to_metres as m
    graph: dict[tuple, list[tuple[float, tuple, int]]] = defaultdict(list)
    for wid, w in ways().items():
        if match and match.lower() not in json.dumps(w["tags"]).lower():
            continue
        cs = [tuple(round(x, 7) for x in c) for c in coords(wid)]
        for a, b in zip(cs, cs[1:]):
            d = m(LineString([a, b])).length
            graph[a].append((d, b, wid))
            graph[b].append((d, a, wid))
    near = lambda p: min(graph, key=lambda n: (n[0] - p[0]) ** 2 + (n[1] - p[1]) ** 2)
    src, dst = near(start), near(end)
    dist, prev, heap = {src: 0.0}, {}, [(0.0, src)]
    while heap:
        d, n = heapq.heappop(heap)
        if n == dst:
            break
        if d > dist.get(n, float("inf")):
            continue
        for w, nb, wid in graph[n]:
            if d + w < dist.get(nb, float("inf")):
                dist[nb], prev[nb] = d + w, (n, wid)
                heapq.heappush(heap, (d + w, nb))
    if dst not in prev and dst != src:
        raise SystemExit("[ohm] no path between those points over the matching ways")
    out, n = [], dst
    while n != src:
        n, wid = prev[n]
        if not out or out[-1] != wid:
            out.append(wid)
    return out[::-1]


def describe(way_ids: list[int]) -> str:
    """How a part drawn from OHM was made, naming every way and what its mapper drew it from."""
    mapped_from = sorted({ways()[w]["tags"].get("source", "").strip() for w in way_ids} - {""})
    ids = ", ".join(str(w) for w in way_ids)
    text = f"OpenHistoricalMap way{'s' if len(way_ids) > 1 else ''} {ids} (CC0, as of {as_of()[:10]})"
    if mapped_from:
        text += f", which OHM's mappers drew from {'; '.join(mapped_from)}"
    return text


def register() -> None:
    merge_registry(SOURCES, "sources", "ohm-", [{
        "id": source_id(),
        "title": f"OpenHistoricalMap, railways and ferry routes in the map's area, as of {as_of()}",
        "publisher": "OpenHistoricalMap contributors",
        "url": "https://www.openhistoricalmap.org/",
        "type": "dataset",
        "license": LICENSE,
        "accessed": as_of()[:10],
        "notes": (f"Read from {ENDPOINT} (Overpass; timestamp_osm_base {as_of()}): every way tagged railway, every "
                  "ferry route and the route relations in the pan limits, cached in data/raw/ohm/region.json. Used "
                  "for geometry only; each segment drawn from it names its way ids, and OHM's dates are pointers."),
    }])


def overrides() -> dict:
    return json.loads(OVERRIDES.read_text()) if OVERRIDES.exists() else {"operators": {}, "duplicates": {}, "skip": {}}


def operator(tags: dict) -> str:
    return tags.get("operator") or tags.get("name") or ""


def used_ways() -> dict[int, str]:
    """Way id -> the segment of ours drawn from it (every past trace recipe's "ohm" parts)."""
    used = {}
    for trace in (DATA / "past").glob("*/trace.json"):
        for sid, recipe in json.loads(trace.read_text()).get("segments", {}).items():
            for part in recipe.get("parts", []):
                for w in part.get("ohm", []):
                    used[w] = sid
    return used


def _our_segments(eras=("past", "present")) -> dict[str, list[list[float]]]:
    out = {}
    for era in eras:
        for path in (DATA / era).glob("*/segments.geojson"):
            for f in json.loads(path.read_text())["features"]:
                g = f.get("geometry") or {}
                if g.get("type") == "LineString":
                    out[f["properties"]["id"]] = g["coordinates"]
                elif g.get("type") == "MultiLineString":
                    out[f["properties"]["id"]] = [c for part in g["coordinates"] for c in part]
    return out


def distance_m(way_id: int, ours: list[list[list[float]]]) -> tuple[float, float]:
    """(median, max) distance in metres from points along the OHM way to our segments."""
    from shapely.ops import unary_union
    mine = unary_union([to_metres(LineString(c)) for c in ours])
    line = to_metres(LineString(coords(way_id)))
    d = sorted(mine.distance(line.interpolate(i / 20, normalized=True)) for i in range(21))
    return d[len(d) // 2], d[-1]


ON_TRACK_M = 30.0  # an OHM way this close to today's network along most of its length is today's track


def classify() -> dict[int, str]:
    """Each way's place here: drawn, duplicate, today's track, outside the nine counties, skipped or unused."""
    from shapely.strtree import STRtree
    from .counties import region
    o = overrides()
    used, dup, skip = used_ways(), {int(k) for k in o.get("duplicates", {})}, o.get("skip", {})
    present = [to_metres(LineString(c)) for c in _our_segments(("present",)).values()]
    tree = STRtree(present)
    bay = region()
    out = {}
    for wid, w in ways().items():
        line = to_metres(LineString(coords(wid)))
        if wid in used:
            out[wid] = "drawn"
        elif wid in dup:
            out[wid] = "duplicate"
        elif str(wid) in skip or operator(w["tags"]) in skip:
            out[wid] = "skipped"
        elif not line.intersects(bay):
            out[wid] = "outside"
        else:
            pts = [line.interpolate(i / 10, normalized=True) for i in range(11)]
            near = [present[j] for j in tree.query(line.buffer(ON_TRACK_M))]
            close = sum(1 for p in pts if any(g.distance(p) < ON_TRACK_M for g in near))
            out[wid] = "today" if close >= 8 else "unused"
    return out


def survey() -> None:
    """docs/checks/ohm.md: every OHM way by operator, as drawn here, a duplicate of ours (with the
    distance between them), on today's track, outside the nine counties, skipped, or not used yet."""
    o = overrides()
    dup = {int(k): v for k, v in o.get("duplicates", {}).items()}
    skip = o.get("skip", {})
    ours = _our_segments()
    kinds = classify()
    groups: dict[str, list[int]] = defaultdict(list)
    for wid, w in ways().items():
        groups[operator(w["tags"])].append(wid)
    cols = ("drawn", "duplicate", "today", "outside", "skipped", "unused")
    rows = []
    for op, ids in sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0])):
        mapped = o.get("operators", {}).get(op, {})
        n = {k: sum(1 for w in ids if kinds[w] == k) for k in cols}
        km_left = sum(to_metres(LineString(coords(w))).length for w in ids if kinds[w] == "unused") / 1000
        rows.append(f"| {op or '(no operator or name)'} | {mapped.get('system', '')} | {len(ids)} | "
                    + " | ".join(str(n[k]) for k in cols) + f" | {km_left:.0f} | {skip.get(op, '')} |")
    # What the unnamed ways left over were drawn from, as a guide to what they are.
    unnamed = defaultdict(lambda: [0, 0.0])
    for wid, w in ways().items():
        if kinds[wid] == "unused" and not operator(w["tags"]):
            key = w["tags"].get("source", "").strip()[:80] or "(no source tag)"
            unnamed[key][0] += 1
            unnamed[key][1] += to_metres(LineString(coords(wid))).length / 1000
    checks = []
    for wid, sids in sorted(dup.items()):
        sids = [sids] if isinstance(sids, str) else sids
        names = ", ".join(f"`{x}`" for x in sids)
        if any(x not in ours for x in sids):
            checks.append(f"| {wid} | {names} | — | — | a segment of ours is missing |")
            continue
        med, mx = distance_m(wid, [ours[x] for x in sids])
        checks.append(f"| {wid} | {names} | {med:.0f} | {mx:.0f} | {ways()[wid]['tags'].get('source', '')[:60]} |")
    total = {k: sum(1 for v in kinds.values() if v == k) for k in cols}
    REPORT.write_text("\n".join([
        "# OpenHistoricalMap: what's used and what's left",
        "",
        "Generated by `python -m transit_pipeline.ohm survey` from the cached OHM response and",
        "`data/past/ohm.json`; don't edit by hand.",
        "",
        f"OHM data as of {as_of()}: {len(ways())} ways and {len(relations())} route relations in the pan limits. "
        + ", ".join(f"{total[k]} {k}" for k in cols) + ".",
        "",
        "- **drawn**: a past segment here is drawn from it (a trace recipe's `ohm` part);",
        "- **duplicate**: it draws track already traced here (`data/past/ohm.json`), and is compared below;",
        f"- **today**: it lies within {ON_TRACK_M:.0f} m of today's network along most of its length, so the",
        "  present era draws it, and past lines use that track (decision 13);",
        "- **outside**: it lies wholly outside the nine counties (decision 16);",
        "- **skipped**: left out on purpose (`data/past/ohm.json`);",
        "- **unused**: not drawn yet.",
        "",
        "## By operator",
        "",
        "Ways are grouped by their `operator` tag, or their `name` where there is none.",
        "",
        "| OHM operator or name | System here | Ways | Drawn | Duplicate | Today | Outside | Skipped | Unused | Unused km | Why skipped |",
        "|---|---|---|---|---|---|---|---|---|---|---|",
        *rows,
        "",
        "## Unused ways with no operator or name, by what their mappers drew them from",
        "",
        "| Mapped from | Ways | km |",
        "|---|---|---|",
        *(f"| {k} | {n} | {km:.0f} |" for k, (n, km) in sorted(unnamed.items(), key=lambda kv: -kv[1][1])),
        "",
        "## Duplicates: OHM against our own traces",
        "",
        "Each OHM way that draws track already traced here, and how far 21 points along it lie from our",
        "segments. A large median means one of the two is off (the review image of our segment says which);",
        "a large maximum alone usually means the OHM way runs on past where ours stops.",
        "",
        "| OHM way | Our segments | Median m | Max m | OHM's mapper drew it from |",
        "|---|---|---|---|---|",
        *checks,
        "",
    ]))
    print(f"[ohm] {REPORT.relative_to(ROOT)}: " + ", ".join(f"{total[k]} {k}" for k in cols))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    f = sub.add_parser("fetch", help="cache the region's OHM railways and record the source")
    f.add_argument("--refresh", action="store_true")
    s = sub.add_parser("show", help="print ways' tags and ends")
    s.add_argument("ids", nargs="+", type=int)
    r = sub.add_parser("route", help="the ways between two points, in order, for a recipe")
    r.add_argument("start", help="LON,LAT")
    r.add_argument("end", help="LON,LAT")
    r.add_argument("--match", default="", help="keep to ways whose tags contain this (an operator)")
    sub.add_parser("survey", help="write docs/checks/ohm.md")
    a = ap.parse_args()
    if a.cmd == "fetch":
        response(a.refresh)
        register()
        print(f"[ohm] {len(ways())} ways and {len(relations())} relations as of {as_of()}")
    elif a.cmd == "route":
        pt = lambda v: tuple(float(x) for x in v.split(","))
        ids = route(pt(a.start), pt(a.end), a.match)
        line = chain(ids)
        print(json.dumps(ids))
        print(f"{len(ids)} ways, {to_metres(LineString(line)).length / 1000:.1f} km, from {line[0]} to {line[-1]}")
    elif a.cmd == "show":
        for w in a.ids:
            c = coords(w)
            print(w, json.dumps(ways()[w]["tags"]), f"from {c[0]} to {c[-1]}, {len(c)} nodes")
    else:
        survey()


if __name__ == "__main__":
    main()
