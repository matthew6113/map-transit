"""Street centerlines from Overture Maps, for past lines that a source places on named streets
(decision 12).

A streetcar or interurban that ran "on Shattuck Avenue from Dwight Way to Vine Street" is drawn along
that street's surveyed centerline between those cross streets, then checked against the USGS map of
its period (usgs_topo.py). Today's centerlines stand in for the old ones, so a street that has moved
since (a freeway cut, a widening) must be traced from the map instead.

Overture's roads are OpenStreetMap data (ODbL). Read anonymously from S3 for each box in AREAS and
cached in data/raw/overture/.

    uv run --directory pipeline python -m transit_pipeline.streets route "Shattuck Avenue" \\
        --from "Dwight Way" --to "Vine Street" [--out F.geojson]
    uv run --directory pipeline python -m transit_pipeline.streets cross "Taraval Street" "33rd Avenue"
"""

from __future__ import annotations

import argparse
import heapq
import json
import os
import re
from functools import cache
from pathlib import Path

import pyarrow.compute as pc
import pyarrow.dataset as ds
import pyarrow.fs as pafs
import pyarrow.parquet as pq
import shapely
from shapely.geometry import LineString, MultiLineString, Point
from shapely.ops import nearest_points, substring, unary_union

from .common import RAW, SOURCES, merge_registry, round_coords
from .gtfs import to_degrees, to_metres

OVERTURE_RELEASE = "2026-09-23.1"  # the same release as BAM's basemap
BUCKET = "overturemaps-us-west-2"
AREAS = {
    "eastbay": (-122.36, 37.70, -122.15, 37.93),  # Richmond to San Leandro, the bay shore to the hills
    "sf": (-122.52, 37.70, -122.355, 37.835),  # San Francisco, to the county line
    "southbay": (-121.98, 37.33, -121.83, 37.45),  # Milpitas and north San José (VTA's Tasman and Capitol lines)
}
CACHE_DIR = RAW / "overture" / OVERTURE_RELEASE
SOURCE_ID = "overture-roads-2026-09-23-1"
SNAP_M = 30.0  # a cross street that stops short of the route still names the corner
BRIDGE_M = 30.0  # dead ends this close to another node of the same streets are joined

SUFFIX = {"avenue": "ave", "street": "st", "boulevard": "blvd", "road": "rd", "drive": "dr", "place": "pl",
          "court": "ct", "lane": "ln", "terrace": "ter", "highway": "hwy", "parkway": "pkwy", "way": "way",
          "north": "n", "south": "s", "east": "e", "west": "w"}


def norm(name: str) -> str:
    """'Shattuck Avenue' and 'Shattuck Ave.' alike."""
    words = re.sub(r"[^a-z0-9 ]", "", name.lower()).split()
    return " ".join(SUFFIX.get(w, w) for w in words)


def _filesystem() -> pafs.S3FileSystem:
    # Overture is a public bucket; injected placeholder AWS credentials make S3 refuse anonymous reads.
    for key in ("AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN"):
        os.environ.pop(key, None)
    return pafs.S3FileSystem(anonymous=True, region="us-west-2")


def _area(name: str) -> Path:
    cache = CACHE_DIR / f"{name}-roads.parquet"
    if not cache.exists():
        x0, y0, x1, y1 = AREAS[name]
        dataset = ds.dataset(f"{BUCKET}/release/{OVERTURE_RELEASE}/theme=transportation/type=segment/",
                             filesystem=_filesystem(), format="parquet")
        filt = ((pc.field("bbox", "xmin") < x1) & (pc.field("bbox", "xmax") > x0)
                & (pc.field("bbox", "ymin") < y1) & (pc.field("bbox", "ymax") > y0) & (pc.field("subtype") == "road"))
        table = dataset.to_table(columns=["id", "geometry", "class", "names"], filter=filt)
        cache.parent.mkdir(parents=True, exist_ok=True)
        pq.write_table(table, cache, compression="zstd")
    return cache


@cache
def roads() -> list[tuple[str, str, LineString, str]]:
    """(id, normalized name, geometry in metres, box) for every named road in the boxes."""
    out, seen = [], set()
    for area in AREAS:
        for r in pq.read_table(_area(area)).to_pylist():
            name = (r["names"] or {}).get("primary")
            if name and r["id"] not in seen:  # the boxes overlap a little
                seen.add(r["id"])
                out.append((r["id"], norm(name), to_metres(shapely.from_wkb(r["geometry"])), area))
    return out


def street(names: list[str], area: str | None = None):
    """Today's roads with these names, in one box (Oakland has a Market St too) or in all."""
    want = {norm(n) for n in names}
    found = [g for _, n, g, a in roads() if n in want and (area is None or a == area)]
    if not found:
        raise SystemExit(f"[streets] no road named {names} in Overture's {area or ', '.join(AREAS)} box")
    return unary_union(found)


def corner(route, cross: str | tuple[float, float], area: str | None = None) -> Point:
    """Where the route meets a cross street (the middle of the crossing points, for a divided
    road), or a lon/lat point snapped onto the route."""
    if isinstance(cross, tuple):
        return nearest_points(route, to_metres(Point(cross)))[0]
    other = street([cross], area)
    hit = route.intersection(other)
    pts = [p for p in getattr(hit, "geoms", [hit]) if isinstance(p, Point)]
    if pts:
        c = unary_union(pts).centroid
        return nearest_points(route, c)[0]
    a, b = nearest_points(route, other)
    if a.distance(b) > SNAP_M:
        raise SystemExit(f"[streets] {cross} comes no closer than {a.distance(b):.0f} m to the route")
    return a


def crossing(a: str, b: str, area: str | None = None) -> tuple[float, float]:
    """Where two of today's streets cross (the middle of the crossing points, for divided roads), as
    lon/lat."""
    p = corner(street([a], area), b, area)
    q = to_degrees(p)
    return (round(q.x, 6), round(q.y, 6))


def route(names: list[str], start: str | tuple[float, float], end: str | tuple[float, float],
          bridge_m: float = 0.0, area: str | None = None) -> tuple[list[list[float]], float]:
    """The centerline along the named streets from one corner to another, as lon/lat, and its length
    in metres. Divided roads come out along one carriageway; the test is the USGS check."""
    net = street(names, area)
    a, b = corner(net, start, area), corner(net, end, area)
    noded = unary_union([*_lines(net), *_cut_lines(net, [a, b])])
    graph: dict[tuple, list[tuple[tuple, float, LineString]]] = {}

    def key(p) -> tuple:
        return (round(p[0], 1), round(p[1], 1))

    for piece in _lines(noded):
        u, v = key(piece.coords[0]), key(piece.coords[-1])
        graph.setdefault(u, []).append((v, piece.length, piece))
        graph.setdefault(v, []).append((u, piece.length, piece))
    # A divided road's carriageways, and a street interrupted by an unnamed link, leave dead ends a few
    # metres from the rest: bridge each dead end to the nearest node within BRIDGE_M.
    nodes = list(graph)
    reach = max(BRIDGE_M, bridge_m)  # a recipe may allow longer gaps, where a freeway cut the street
    for u in [n for n in nodes if len(graph[n]) == 1]:
        best = min((Point(u).distance(Point(v)), v) for v in nodes if v != u and v not in {w for w, _, _ in graph[u]})
        if best[0] <= reach:
            link = LineString([u, best[1]])
            graph[u].append((best[1], link.length, link))
            graph[best[1]].append((u, link.length, link))
    src = min(graph, key=lambda k: Point(k).distance(a))
    dst = min(graph, key=lambda k: Point(k).distance(b))
    dist, prev = {src: 0.0}, {}
    queue = [(0.0, src)]
    while queue:
        d, u = heapq.heappop(queue)
        if u == dst:
            break
        if d > dist.get(u, float("inf")):
            continue
        for v, w, piece in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v], prev[v] = d + w, (u, piece)
                heapq.heappush(queue, (d + w, v))
    if dst not in dist:
        raise SystemExit(f"[streets] {names} don't connect {start} to {end}")
    pieces = []
    v = dst
    while v != src:
        u, piece = prev[v]
        cs = list(piece.coords)
        if key(cs[0]) != u:
            cs.reverse()  # run it from u to v
        pieces.append(cs)
        v = u
    pieces.reverse()
    coords = pieces[0] + [c for cs in pieces[1:] for c in cs[1:]]
    line = LineString(coords).simplify(0.5)
    return round_coords([list(c) for c in to_degrees(line).coords]), line.length


def _lines(g) -> list[LineString]:
    if isinstance(g, LineString):
        return [g]
    if isinstance(g, MultiLineString):
        return list(g.geoms)
    return [p for p in getattr(g, "geoms", []) if isinstance(p, LineString)]


def _cut_lines(net, points: list[Point]) -> list[LineString]:
    """Tiny crossing ticks at each corner, so noding splits the street there."""
    out = []
    for p in points:
        for line in _lines(net):
            if line.distance(p) < 0.5:
                t = line.project(p)
                q0, q1 = line.interpolate(max(0, t - 1)), line.interpolate(min(line.length, t + 1))
                dx, dy = q1.x - q0.x, q1.y - q0.y
                n = (dx * dx + dy * dy) ** 0.5 or 1
                out.append(LineString([(p.x - dy / n * 0.2, p.y + dx / n * 0.2), (p.x + dy / n * 0.2, p.y - dx / n * 0.2)]))
    return out


def register() -> None:
    merge_registry(SOURCES, "sources", "overture-roads-", [{
        "id": SOURCE_ID,
        "title": f"Overture Maps Foundation, transportation theme (roads), release {OVERTURE_RELEASE}",
        "publisher": "Overture Maps Foundation",
        "url": "https://docs.overturemaps.org/guides/transportation/",
        "type": "dataset",
        "license": "ODbL 1.0: © OpenStreetMap contributors, Overture Maps Foundation",
        "notes": f"Named road segments in the boxes {', '.join(f'{k} {v}' for k, v in AREAS.items())}, read from s3://{BUCKET}/release/{OVERTURE_RELEASE}/theme=transportation/type=segment/. "
                 "Today's centerlines, used where a source places a past line on a named street (decision 12).",
    }])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("route")
    r.add_argument("names", nargs="+")
    r.add_argument("--from", dest="start", required=True, help="a cross street, or LON,LAT (write --from=LON,LAT)")
    r.add_argument("--to", dest="end", required=True, help="a cross street, or LON,LAT")
    r.add_argument("--out", type=Path)
    sub.add_parser("names").add_argument("pattern")
    c = sub.add_parser("cross", help="where two of today's streets cross, as lon/lat")
    c.add_argument("a")
    c.add_argument("b")
    c.add_argument("--area", choices=list(AREAS))
    sub.add_parser("register", help="cache the roads and record the dataset in data/sources.json")
    a = ap.parse_args()
    if a.cmd == "register":
        print(f"[streets] {len(roads())} named road segments in {', '.join(AREAS)}")
        register()
        return
    if a.cmd == "cross":
        print(crossing(a.a, a.b, a.area))
        return
    if a.cmd == "names":
        print("\n".join(sorted({n for _, n, _, _ in roads() if re.search(a.pattern, n)})))
        return
    def place(v: str):
        m = re.fullmatch(r"\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*", v)
        return (float(m[1]), float(m[2])) if m else v

    coords, length = route(a.names, place(a.start), place(a.end))
    print(f"[streets] {' / '.join(a.names)} from {a.start} to {a.end}: {length:.0f} m, {len(coords)} vertices")
    if a.out:
        a.out.write_text(json.dumps({"type": "FeatureCollection", "features": [
            {"type": "Feature", "properties": {"id": "route"}, "geometry": {"type": "LineString", "coordinates": coords}}]}) + "\n")


if __name__ == "__main__":
    main()
