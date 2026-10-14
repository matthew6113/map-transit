"""Ferry routes over water, for past ferries whose sources give only their terminals (Phase 2b).

A historic ferry's course is rarely recorded, but its terminals are. Its line is drawn as the
shortest path over today's open water between them, kept off the shore where the water allows, and
marked approximate (dashed): a reproducible schematic, not a claim about the course steered.

Land is Overture's base theme: its coastline-derived land polygons, less its water polygons (so the
Petaluma and Napa rivers stay open), both OpenStreetMap data (ODbL), rasterized at CELL_M. Shores
filled since the 1850s are land today, so a terminal on fill is reached straight from the nearest
water.

    uv run --directory pipeline python -m transit_pipeline.water route -122.3935,37.7955 -122.4785,37.8590
"""

from __future__ import annotations

import argparse
import heapq
import math
from functools import cache

import numpy as np
import pyarrow.compute as pc
import pyarrow.dataset as ds
import pyarrow.parquet as pq
import shapely
from rasterio import features
from rasterio.transform import from_origin
from shapely.geometry import LineString, Point

from .common import RAW, SOURCES, merge_registry, round_coords
from .gtfs import to_degrees, to_metres
from .streets import BUCKET, OVERTURE_RELEASE, _filesystem

# The bay, San Pablo and Suisun bays, and the Petaluma and Napa rivers up to their towns.
AREA = (-122.66, 37.45, -121.85, 38.33)
CACHE_DIR = RAW / "overture" / OVERTURE_RELEASE
CELL_M = 40.0
SHORE_M = 120.0  # water this close to land costs SHORE_COST times as much, keeping routes mid-channel
SHORE_COST = 4.0
SOURCE_ID = "overture-base-2026-09-23-1"


def _fetch(kind: str, subtypes: list[str]):
    cache_file = CACHE_DIR / f"bay-{kind}.parquet"
    if not cache_file.exists():
        x0, y0, x1, y1 = AREA
        dataset = ds.dataset(f"{BUCKET}/release/{OVERTURE_RELEASE}/theme=base/type={kind}/",
                             filesystem=_filesystem(), format="parquet")
        filt = ((pc.field("bbox", "xmin") < x1) & (pc.field("bbox", "xmax") > x0)
                & (pc.field("bbox", "ymin") < y1) & (pc.field("bbox", "ymax") > y0)
                & pc.field("subtype").isin(subtypes))
        table = dataset.to_table(columns=["id", "geometry", "subtype", "class"], filter=filt)
        cache_file.parent.mkdir(parents=True, exist_ok=True)
        pq.write_table(table, cache_file, compression="zstd")
    return [shapely.from_wkb(g) for g in pq.read_table(cache_file).column("geometry").to_pylist()]


@cache
def grid():
    """(cost grid, transform, origin) in metres: inf on land, SHORE_COST near it, 1 in open water."""
    lo = to_metres(Point(AREA[0], AREA[1]))
    hi = to_metres(Point(AREA[2], AREA[3]))
    w = int(math.ceil((hi.x - lo.x) / CELL_M))
    h = int(math.ceil((hi.y - lo.y) / CELL_M))
    transform = from_origin(lo.x, hi.y, CELL_M, CELL_M)
    land = [to_metres(g) for g in _fetch("land", ["land"])]
    water = [to_metres(g) for g in _fetch("water", ["ocean", "river", "water", "canal", "lake"])]

    def burn(geoms, buffer_m=0.0):
        shapes = [(g.buffer(buffer_m) if buffer_m else g, 1) for g in geoms if not g.is_empty]
        return features.rasterize(shapes, out_shape=(h, w), transform=transform, fill=0, dtype="uint8") if shapes else np.zeros((h, w), "uint8")

    open_water = burn(water)
    is_land = (burn(land) == 1) & (open_water == 0)
    near = (burn(land, SHORE_M) == 1) & (open_water == 0) | (burn([g.boundary for g in land], SHORE_M) == 1)
    cost = np.where(is_land, np.inf, np.where(near, SHORE_COST, 1.0))
    return cost, transform, (lo.x, hi.y)


def _cell(p: Point, origin) -> tuple[int, int]:
    return int((origin[1] - p.y) // CELL_M), int((p.x - origin[0]) // CELL_M)


def _centre(rc, origin) -> tuple[float, float]:
    return origin[0] + (rc[1] + 0.5) * CELL_M, origin[1] - (rc[0] + 0.5) * CELL_M


def _nearest_water(cost, rc, limit: int = 200) -> tuple[int, int]:
    """The nearest water cell to a terminal that may stand on land (a pier, or fill)."""
    h, w = cost.shape
    for r in range(limit):
        ring = [(rc[0] + dr, rc[1] + dc) for dr in range(-r, r + 1) for dc in range(-r, r + 1) if max(abs(dr), abs(dc)) == r]
        hits = [(abs(a - rc[0]) + abs(b - rc[1]), (a, b)) for a, b in ring if 0 <= a < h and 0 <= b < w and np.isfinite(cost[a, b])]
        if hits:
            return min(hits)[1]
    raise SystemExit(f"[water] no water within {limit * CELL_M:.0f} m of a terminal")


def route(a: tuple[float, float], b: tuple[float, float]) -> tuple[list[list[float]], float]:
    """The path over water between two terminals (lon/lat), and its length in metres."""
    cost, _, origin = grid()
    pa, pb = to_metres(Point(a)), to_metres(Point(b))
    s, t = _nearest_water(cost, _cell(pa, origin)), _nearest_water(cost, _cell(pb, origin))
    h, w = cost.shape
    steps = [(-1, 0, 1.0), (1, 0, 1.0), (0, -1, 1.0), (0, 1, 1.0),
             (-1, -1, math.sqrt(2)), (-1, 1, math.sqrt(2)), (1, -1, math.sqrt(2)), (1, 1, math.sqrt(2))]
    heur = lambda rc: math.hypot(rc[0] - t[0], rc[1] - t[1])
    dist = {s: 0.0}
    prev = {}
    queue = [(heur(s), s)]
    while queue:
        _, u = heapq.heappop(queue)
        if u == t:
            break
        du = dist[u]
        for dr, dc, step in steps:
            v = (u[0] + dr, u[1] + dc)
            if not (0 <= v[0] < h and 0 <= v[1] < w):
                continue
            c = cost[v]
            if not np.isfinite(c):
                continue
            nd = du + step * c
            if nd < dist.get(v, math.inf):
                dist[v], prev[v] = nd, u
                heapq.heappush(queue, (nd + heur(v), v))
    if t not in dist:
        raise SystemExit("[water] the terminals aren't joined by water")
    cells, v = [t], t
    while v != s:
        v = prev[v]
        cells.append(v)
    cells.reverse()
    line = LineString([(pa.x, pa.y), *[_centre(c, origin) for c in cells], (pb.x, pb.y)]).simplify(CELL_M)
    line = _smooth(line)
    return round_coords([list(c) for c in to_degrees(line).coords]), line.length


def _smooth(line: LineString, rounds: int = 2) -> LineString:
    """Chaikin's corner cutting, ends kept: a course rather than a staircase."""
    pts = list(line.coords)
    for _ in range(rounds):
        out = [pts[0]]
        for p, q in zip(pts, pts[1:]):
            out += [(0.75 * p[0] + 0.25 * q[0], 0.75 * p[1] + 0.25 * q[1]), (0.25 * p[0] + 0.75 * q[0], 0.25 * p[1] + 0.75 * q[1])]
        out.append(pts[-1])
        pts = out
    return LineString(pts)


def register() -> None:
    merge_registry(SOURCES, "sources", "overture-base-", [{
        "id": SOURCE_ID,
        "title": f"Overture Maps Foundation, base theme (land and water), release {OVERTURE_RELEASE}",
        "publisher": "Overture Maps Foundation",
        "url": "https://docs.overturemaps.org/guides/base/",
        "type": "dataset",
        "license": "ODbL 1.0: © OpenStreetMap contributors, Overture Maps Foundation",
        "notes": f"Land (coastline-derived) and water polygons in {AREA}, read from s3://{BUCKET}/release/{OVERTURE_RELEASE}/theme=base/. "
                 "Today's shores, used to draw past ferry routes as the shortest path over water between their sourced terminals.",
    }])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("route")
    r.add_argument("start", help="LON,LAT")
    r.add_argument("end", help="LON,LAT")
    sub.add_parser("register", help="cache the land and water and record the dataset in data/sources.json")
    a = ap.parse_args()
    if a.cmd == "register":
        cost, _, _ = grid()
        print(f"[water] grid {cost.shape[1]} x {cost.shape[0]} cells of {CELL_M:.0f} m, {np.isfinite(cost).mean():.0%} water")
        register()
        return
    parse = lambda v: tuple(float(x) for x in v.split(","))
    coords, length = route(parse(a.start), parse(a.end))
    print(f"[water] {length:.0f} m, {len(coords)} vertices: {coords[:3]} ... {coords[-2:]}")


if __name__ == "__main__":
    main()
