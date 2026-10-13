"""Present-era lines from GTFS. Phase 0 preview: BART's public feed only (no API key needed).

Phase 1 replaces the feed list with 511.org's regional feed (operator RG) plus Amtrak; the steps stay:
keep the rail, ferry and cable route types; group each agency's routes into lines; draw each line from
the shape that most of its trips run (the full pattern, not a short turn); simplify to about 3 m;
take parent stations and the lines that call at them.

Writes data/present/<agency>/{lines.json, segments.geojson, points.geojson} and data/present/feeds.json,
plus this step's entries in data/sources.json and data/systems.json. Opening dates aren't in GTFS: they
stay null and flagged until Phase 2 sources them (decision 4).

    uv run --directory pipeline python -m transit_pipeline.gtfs
"""

from __future__ import annotations

import csv
import io
import json
import zipfile
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

import numpy as np
import shapely
from pyproj import Transformer
from shapely.geometry import LineString, mapping

from .common import DATA, RAW, SOURCES, SYSTEMS, fetch, merge_registry, round_coords, sha256, write_geojson, write_json

TODAY = date.today().isoformat()
SIMPLIFY_M = 3.0
_TO_M = Transformer.from_crs("EPSG:4326", "EPSG:32610", always_xy=True)
_TO_DEG = Transformer.from_crs("EPSG:32610", "EPSG:4326", always_xy=True)


def to_metres(g):
    """Project lon/lat geometry to UTM zone 10N (metres)."""
    return shapely.transform(g, lambda c: np.column_stack(_TO_M.transform(c[:, 0], c[:, 1])))


def to_degrees(g):
    return shapely.transform(g, lambda c: np.column_stack(_TO_DEG.transform(c[:, 0], c[:, 1])))

# route_type values this map draws: tram, subway, rail, ferry, cable tram, funicular, monorail.
RAIL_FERRY_TYPES = {"0", "1", "2", "4", "5", "7", "12"}

FEEDS = {
    "bart": {
        "url": "https://www.bart.gov/dev/schedules/google_transit.zip",
        "system": ("bart", "Bay Area Rapid Transit", "BART"),
        "license": "BART Developer License Agreement: https://www.bart.gov/schedules/developers/developer-license-agreement",
        "terms_url": "https://www.bart.gov/schedules/developers/developer-license-agreement",
        # BART publishes one route per direction (Yellow-N, Yellow-S): group them by color name.
        "line_key": lambda r: r["route_short_name"].split("-")[0],
        "line": {
            "Yellow": ("bart-yellow", "Yellow line", "rapid_transit"),
            "Orange": ("bart-orange", "Orange line", "rapid_transit"),
            "Green": ("bart-green", "Green line", "rapid_transit"),
            "Red": ("bart-red", "Red line", "rapid_transit"),
            "Blue": ("bart-blue", "Blue line", "rapid_transit"),
            "Grey": ("bart-oakland-airport", "Oakland Airport line", "people_mover"),
        },
    },
}


def read_table(z: zipfile.ZipFile, name: str) -> list[dict]:
    with z.open(name) as f:
        return list(csv.DictReader(io.TextIOWrapper(f, encoding="utf-8-sig")))


def simplify(coords: list[tuple[float, float]]) -> list[list[float]]:
    line = to_metres(LineString(coords)).simplify(SIMPLIFY_M, preserve_topology=False)
    return round_coords(mapping(to_degrees(line))["coordinates"])


def build(agency: str, cfg: dict) -> dict:
    zpath = fetch(cfg["url"], RAW / "gtfs" / agency / "google_transit.zip")
    digest = sha256(zpath)
    z = zipfile.ZipFile(zpath)
    info = (read_table(z, "feed_info.txt") or [{}])[0] if "feed_info.txt" in z.namelist() else {}
    routes = [r for r in read_table(z, "routes.txt") if r["route_type"] in RAIL_FERRY_TYPES]
    route_line = {r["route_id"]: cfg["line"][cfg["line_key"](r)] for r in routes}
    trips = [t for t in read_table(z, "trips.txt") if t["route_id"] in route_line]
    trip_line = {t["trip_id"]: route_line[t["route_id"]][0] for t in trips}

    shapes: dict[str, list[tuple[int, float, float]]] = defaultdict(list)
    for s in read_table(z, "shapes.txt"):
        shapes[s["shape_id"]].append((int(s["shape_pt_sequence"]), float(s["shape_pt_lon"]), float(s["shape_pt_lat"])))

    source_id = f"gtfs-{agency}"
    system_id, system_name, system_short = cfg["system"]
    lines, segments = [], []
    for line_id, name, mode in sorted(set(route_line.values())):
        counts = Counter(t["shape_id"] for t in trips if trip_line[t["trip_id"]] == line_id and t.get("shape_id"))
        # The full pattern: among shapes run by at least a fifth as many trips as the busiest, the longest.
        top = counts.most_common(1)[0][1]
        candidates = [sid for sid, n in counts.items() if n >= top / 5]
        best = max(candidates, key=lambda sid: to_metres(LineString([(x, y) for _, x, y in sorted(shapes[sid])])).length)
        coords = [(x, y) for _, x, y in sorted(shapes[best])]
        seg_id = f"{line_id}-gtfs"
        segments.append({
            "type": "Feature",
            "properties": {
                "id": seg_id,
                "system": system_id,
                "name": f"{name}, as run in GTFS",
                "opened": None,
                "closed": None,
                "geometry_confidence": "surveyed",
                "geometry_method": f"GTFS shapes.txt, shape {best} (run by {counts[best]} of {sum(counts.values())} trips), simplified to {SIMPLIFY_M:g} m",
                "sources": [{"source": source_id, "supports": ["geometry"]}],
                "flags": ["opened_unsourced"],
                "notes": "One stroke per line until the present network is split into dated segments (Phase 2), so lines sharing track overlap.",
            },
            "geometry": {"type": "LineString", "coordinates": simplify(coords)},
        })
        lines.append({
            "id": line_id,
            "name": name,
            "system": system_id,
            "operators": [{"name": system_name}],
            "mode": mode,
            "era": "present",
            "opened": None,
            "closed": None,
            "status": "active",
            "route": [{"segment": seg_id}],
            "sources": [{"source": source_id, "supports": ["geometry", "route", "stations", "name"]}],
            "flags": ["opened_unsourced"],
        })

    stops = {s["stop_id"]: s for s in read_table(z, "stops.txt")}
    stop_lines: dict[str, set[str]] = defaultdict(set)
    for st in read_table(z, "stop_times.txt"):
        line_id = trip_line.get(st["trip_id"])
        if not line_id:
            continue
        s = stops[st["stop_id"]]
        stop_lines[s.get("parent_station") or s["stop_id"]].add(line_id)
    points = []
    for sid, ids in sorted(stop_lines.items()):
        s = stops[sid]
        points.append({
            "type": "Feature",
            "properties": {
                "id": f"{agency}-{sid.lower().replace('_', '-')}",
                "kind": "station",
                "name": s["stop_name"],
                "system": system_id,
                "line_ids": sorted(ids),
                "opened": None,
                "closed": None,
                "geometry_confidence": "surveyed",
                "geometry_method": f"GTFS stops.txt, stop {sid}",
                "sources": [{"source": source_id, "supports": ["stations"]}],
                "flags": ["opened_unsourced"],
            },
            "geometry": {"type": "Point", "coordinates": round_coords([float(s["stop_lon"]), float(s["stop_lat"])])},
        })

    out = DATA / "present" / agency
    note = f"Generated by transit_pipeline.gtfs from {cfg['url']} (SHA-256 {digest[:12]}). Don't edit by hand; rerun."
    write_json(out / "lines.json", {"$comment": note, "lines": lines})
    write_geojson(out / "segments.geojson", segments, comment=note)
    write_geojson(out / "points.geojson", points, comment=note)
    version = info.get("feed_version", "")
    merge_registry(SOURCES, "sources", source_id, [{
        "id": source_id,
        "title": f"{system_name} GTFS feed" + (f", version {version}" if version else ""),
        "publisher": system_name,
        "url": cfg["url"],
        "type": "dataset",
        "license": cfg["license"],
        "accessed": TODAY,
        "notes": f"feed_info dates {info.get('feed_start_date', '?')} to {info.get('feed_end_date', '?')}; file SHA-256 {digest}.",
    }])
    systems = json.loads(SYSTEMS.read_text())
    if system_id not in {s["id"] for s in systems["systems"]}:
        systems["systems"].append({"id": system_id, "name": system_name, "short_name": system_short})
        systems["systems"].sort(key=lambda s: s["id"])
        write_json(SYSTEMS, systems)
    print(f"[gtfs] {agency}: {len(lines)} lines, {len(points)} stations")
    return {"agency": agency, "url": cfg["url"], "sha256": digest, "fetched": TODAY,
            "feed_version": version, "feed_start_date": info.get("feed_start_date"),
            "feed_end_date": info.get("feed_end_date"), "license": cfg["license"]}


def main() -> None:
    feeds = [build(agency, cfg) for agency, cfg in FEEDS.items()]
    write_json(DATA / "present" / "feeds.json", {"feeds": feeds})


if __name__ == "__main__":
    main()
