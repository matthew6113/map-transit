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
from shapely.ops import linemerge, nearest_points, unary_union

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
        name = long or short
        return (f"muni-cable-{slug(name)}", f"{name} cable car", "cable")
    if r["route_type"] == "0" and short in MUNI_METRO:
        return (f"muni-{short.lower()}", f"{short} {long}".strip(), "light_rail")
    if r["route_type"] == "0" and short in {"F", "E"}:
        return (f"muni-{short.lower()}", f"{short} {long}".strip(), "streetcar")
    return None  # shuttles (S), substitutions and anything else


def vta_line(r: dict) -> LineDef | None:
    if r["route_type"] != "0":
        return None
    text = f"{r['route_short_name']} {r['route_long_name']}"
    for color in ("Blue", "Green", "Orange"):
        if color.lower() in text.lower():
            return (f"vta-{color.lower()}", f"{color} line", "light_rail")
    return (f"vta-{slug(text)}", text.strip(), "light_rail")


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
        name = r["route_long_name"].strip() or r["route_short_name"].strip()
        return (f"{agency_slug}-{slug(name)}", name, "ferry")
    return rule


@dataclass
class Agency:
    slug: str
    system: tuple[str, str, str]  # id, name, short name
    feed: str
    match: str  # regex on agency_name in agency.txt
    line: Callable[[dict], LineDef | None]
    stations: str = "all"  # "all" stops (collapsed to their stations), or only stops with a "parent" station
    point_kind: str = "station"


AGENCIES = [
    Agency("bart", ("bart", "Bay Area Rapid Transit", "BART"), "511", r"Bay Area Rapid Transit|\bBART\b", bart_line),
    Agency("muni", ("muni", "San Francisco Municipal Railway", "Muni"), "511", r"San Francisco Municipal|SFMTA|\bMuni\b",
           muni_line, stations="parent"),
    Agency("caltrain", ("caltrain", "Caltrain", "Caltrain"), "511", r"Caltrain|Peninsula Corridor",
           single(("caltrain", "Caltrain", "commuter_rail"))),
    Agency("vta", ("vta", "Santa Clara Valley Transportation Authority", "VTA"), "511", r"\bVTA\b|Santa Clara Valley Transportation",
           vta_line),
    Agency("smart", ("smart", "Sonoma-Marin Area Rail Transit", "SMART"), "511", r"\bSMART\b|Sonoma.?Marin",
           single(("smart", "SMART", "commuter_rail"))),
    Agency("ace", ("ace", "Altamont Corridor Express", "ACE"), "511", r"Altamont|\bACE\b",
           single(("ace", "Altamont Corridor Express", "commuter_rail"))),
    Agency("gold-runner", ("gold-runner", "Gold Runner (formerly the San Joaquins)", "Gold Runner"), "511", r"Gold Runner|San Joaquin",
           single(("gold-runner", "Gold Runner", "intercity_rail"))),
    Agency("amtrak", ("amtrak", "Amtrak", "Amtrak"), "amtrak", r"^Amtrak$",
           lambda r: AMTRAK_LINES.get(r["route_long_name"].strip()) if r["route_type"] == "2" else None),
]
# Agencies in the 511 feed that Amtrak's feed already covers: skipped there, so nothing is drawn twice.
SKIP_511 = r"Capitol Corridor|^Amtrak"
# Every other agency in the 511 feed that runs ferries counts (decision 5): matched by route type.
FERRY_FEED = "511"


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

    def station_of(stop_id: str) -> str | None:
        s = stops.get(stop_id)
        if not s:
            return None
        parent = s.get("parent_station")
        if parent and parent in stops:
            return parent
        return None if agency.stations == "parent" else stop_id

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
        s = stops[sid]
        pt = Point(float(s["stop_lon"]), float(s["stop_lat"]))
        if not ids or not BOUNDS.contains(pt):
            continue
        points_out.append({
            "type": "Feature",
            "properties": {
                "id": f"{agency.slug}-{slug(sid)}",
                "kind": "ferry_terminal" if all(l["mode"] == "ferry" for l in lines_out if l["id"] in ids) else agency.point_kind,
                "name": s["stop_name"].strip(),
                "system": agency.system[0],
                "line_ids": sorted(ids),
                "opened": None,
                "closed": None,
                "geometry_confidence": "surveyed",
                "geometry_method": f"GTFS stops.txt, stop {sid}",
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
        "notes": f"feed_info dates {info.get('feed_start_date', '?')} to {info.get('feed_end_date', '?')}; file SHA-256 {digest}.",
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

    systems = []
    for feed_id in sorted({f for _, f in plan}):
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
        merge_registry(SOURCES, "sources", source_id, [feed_source(feed, info, digest)])
        feed_log[feed_id] = {
            "id": feed_id, "title": feed.title, "url": feed.url.replace("api_key={key}&", ""), "sha256": digest,
            "fetched": TODAY, "feed_version": info.get("feed_version", ""), "feed_start_date": info.get("feed_start_date"),
            "feed_end_date": info.get("feed_end_date"), "license": feed.license, "agencies": sorted(used),
        }
    ensure_systems(systems)
    write_json(feeds_json, {"feeds": [feed_log[k] for k in sorted(feed_log)]})


if __name__ == "__main__":
    main()
