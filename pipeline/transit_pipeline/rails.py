"""Today's railroad centerlines from Overture Maps, for past lines whose track is still in place
(decision 12).

A railroad that ran on track still there today (the Napa Valley line, which carries freight and the
Wine Train) is drawn along today's rail between two points, rather than from a coarse old map. The
path is the shortest one over the rail network in the box; the check is the USGS sheet of the line's
years. Overture's rail is OpenStreetMap data (ODbL), read anonymously from S3 for each box in AREAS
and cached in data/raw/overture/.

    uv run --directory pipeline python -m transit_pipeline.rails route napa \\
        --from=-122.25,38.18 --to=-122.28,38.30 [--out F.geojson]
"""

from __future__ import annotations

import argparse
import heapq
import json
from functools import cache
from pathlib import Path

import pyarrow.compute as pc
import pyarrow.dataset as ds
import pyarrow.parquet as pq
import shapely
from shapely.geometry import LineString, Point
from shapely.ops import nearest_points, unary_union

from .common import SOURCES, merge_registry, round_coords
from .gtfs import to_degrees, to_metres
from .streets import BUCKET, CACHE_DIR, OVERTURE_RELEASE, _cut_lines, _filesystem, _lines

AREAS = {
    "napa": (-122.62, 38.06, -122.03, 38.60),  # Vallejo by Napa to Calistoga, and Napa Junction to Suisun
    "sonoma": (-122.92, 38.22, -122.62, 38.50),  # Petaluma to Sebastopol, Santa Rosa and Forestville
    "santafe": (-122.42, 37.82, -121.55, 38.07),  # the Santa Fe from Oakland and Ferry Point to the county line at Old River
}
SOURCE_ID = "overture-rail-2026-09-23-1"
SNAP_M = 150.0  # an end this close to today's track is on it
BRIDGE_M = 30.0  # dead ends this close to another node are joined (switches, crossings)


def _area(name: str) -> Path:
    cache_path = CACHE_DIR / f"{name}-rail.parquet"
    if not cache_path.exists():
        x0, y0, x1, y1 = AREAS[name]
        dataset = ds.dataset(f"{BUCKET}/release/{OVERTURE_RELEASE}/theme=transportation/type=segment/",
                             filesystem=_filesystem(), format="parquet")
        filt = ((pc.field("bbox", "xmin") < x1) & (pc.field("bbox", "xmax") > x0)
                & (pc.field("bbox", "ymin") < y1) & (pc.field("bbox", "ymax") > y0) & (pc.field("subtype") == "rail"))
        table = dataset.to_table(columns=["id", "geometry", "class", "names"], filter=filt)
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        pq.write_table(table, cache_path, compression="zstd")
    return cache_path


@cache
def rail(area: str, names: tuple[str, ...] = ()):
    """Today's track in the box, in metres, unioned and noded; only the ways with these names, if
    any are given (an abandoned line OpenStreetMap still maps, kept apart from the live track)."""
    rows = pq.read_table(_area(area)).to_pylist()
    lines = [to_metres(shapely.from_wkb(r["geometry"])) for r in rows
             if not names or ((r["names"] or {}).get("primary") in names)]
    if not lines:
        raise SystemExit(f"[rails] no track in Overture's {area} box" + (f" named {names}" if names else ""))
    return unary_union(lines)


def route(start: tuple[float, float], end: tuple[float, float], area: str,
          names: tuple[str, ...] = ()) -> tuple[list[list[float]], float]:
    """Today's track from one point to another (each snapped onto it), as lon/lat, and its length in
    metres: the shortest path over the rail network in the box (or over the ways with these names)."""
    net = rail(area, tuple(names))
    ends = []
    for p in (start, end):
        q = to_metres(Point(p))
        on = nearest_points(net, q)[0]
        if on.distance(q) > SNAP_M:
            raise SystemExit(f"[rails] {p} is {on.distance(q):.0f} m from today's track in the {area} box")
        ends.append(on)
    a, b = ends
    noded = unary_union([*_lines(net), *_cut_lines(net, [a, b])])
    graph: dict[tuple, list[tuple[tuple, float, LineString]]] = {}

    def key(p) -> tuple:
        return (round(p[0], 1), round(p[1], 1))

    for piece in _lines(noded):
        u, v = key(piece.coords[0]), key(piece.coords[-1])
        graph.setdefault(u, []).append((v, piece.length, piece))
        graph.setdefault(v, []).append((u, piece.length, piece))
    nodes = list(graph)
    for u in [n for n in nodes if len(graph[n]) == 1]:
        best = min(((Point(u).distance(Point(v)), v) for v in nodes if v != u and v not in {w for w, _, _ in graph[u]}),
                   default=(BRIDGE_M + 1, None))
        if best[0] <= BRIDGE_M:
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
        raise SystemExit(f"[rails] today's track doesn't connect {start} to {end}")
    pieces = []
    v = dst
    while v != src:
        u, piece = prev[v]
        cs = list(piece.coords)
        if key(cs[0]) != u:
            cs.reverse()
        pieces.append(cs)
        v = u
    pieces.reverse()
    coords = pieces[0] + [c for cs in pieces[1:] for c in cs[1:]]
    line = LineString(coords).simplify(0.5)
    return round_coords([list(c) for c in to_degrees(line).coords]), line.length


def register() -> None:
    merge_registry(SOURCES, "sources", "overture-rail-", [{
        "id": SOURCE_ID,
        "title": f"Overture Maps Foundation, transportation theme (rail), release {OVERTURE_RELEASE}",
        "publisher": "Overture Maps Foundation",
        "url": "https://docs.overturemaps.org/guides/transportation/",
        "type": "dataset",
        "license": "ODbL 1.0: © OpenStreetMap contributors, Overture Maps Foundation",
        "notes": f"Rail segments in the boxes {', '.join(f'{k} {v}' for k, v in AREAS.items())}, read from s3://{BUCKET}/release/{OVERTURE_RELEASE}/theme=transportation/type=segment/. "
                 "Today's track, used where a past line ran on track still in place (decision 12).",
    }])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("register", help="cache the track and record the dataset in data/sources.json")
    r = sub.add_parser("route")
    r.add_argument("area", choices=sorted(AREAS))
    r.add_argument("--from", dest="start", required=True, help="lon,lat")
    r.add_argument("--to", dest="end", required=True, help="lon,lat")
    r.add_argument("--out", type=Path)
    args = ap.parse_args()
    if args.cmd == "register":
        for area in AREAS:
            rail(area)
        register()
        print(f"[rails] track cached for {', '.join(AREAS)}")
        return
    pt = lambda s: tuple(float(x) for x in s.split(","))
    coords, length = route(pt(args.start), pt(args.end), args.area)
    print(f"[rails] {length:.0f} m, {len(coords)} points")
    if args.out:
        args.out.write_text(json.dumps({"type": "Feature", "properties": {}, "geometry": {"type": "LineString", "coordinates": coords}}))


if __name__ == "__main__":
    main()
