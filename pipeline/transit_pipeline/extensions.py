"""Today's network, dated: data/present/extensions.json applied at build time (Phase 2b).

The present era comes from GTFS (gtfs.py) as one undated segment per line. extensions.json says
where today's lines were opened in stages, station to station, with official sources. Here each
stretch is cut out of the line's GTFS geometry once, and becomes a shared, dated segment: BART's
colors that run over the same track share one segment, so it opens once on the year slider.

    "systems": {"bart": {
        "segments": [{"id": "bart-macarthur-fremont", "name": "MacArthur to Fremont",
                      "from": "MacArthur", "to": "Fremont", "line": "bart-orange",  # line optional
                      "opened": "1972-09-11", "sources": [...]}],
        "lines": {"bart-orange": {"opened": "1972-09-11", "sources": [...]}},
        "stations": {"Some Station": [lon, lat]}}}                                 # optional

A stretch is cut from the first of the system's lines (or the named one) that passes within
STATION_M of both stations. Each line's route is then rebuilt: the dated segments that lie along it,
in order, plus whatever is left over as an undated part. The GTFS segment is dropped once nothing
uses it. This runs in build.py, so it needs no feed key and is the same on every machine.
"""

from __future__ import annotations

import json
from pathlib import Path

from shapely.geometry import LineString, MultiLineString, Point
from shapely.ops import linemerge, substring, unary_union

from .common import DATA, round_coords
from .gtfs import to_degrees, to_metres

SPEC = DATA / "present" / "extensions.json"
STATION_M = 120.0  # a station this close to a line is on it (platform centroids sit off the track)
ALONG_M = 25.0  # a dated segment lies along a line if this much of it is within this distance
ALONG_SHARE = 0.9
REST_MIN_M = 150.0  # leftovers shorter than this are slivers between dated stretches


def _lines_of(g) -> list[LineString]:
    if isinstance(g, LineString):
        return [g] if not g.is_empty else []
    return [p for p in getattr(g, "geoms", []) if isinstance(p, LineString) and not p.is_empty]


def _geom(feature: dict):
    g = feature["geometry"]
    parts = [g["coordinates"]] if g["type"] == "LineString" else g["coordinates"]
    return to_metres(MultiLineString([p for p in parts if len(p) >= 2]))


def _to_geojson(g) -> dict:
    parts = [round_coords([list(c) for c in to_degrees(p).coords]) for p in _lines_of(g)]
    if len(parts) == 1:
        return {"type": "LineString", "coordinates": parts[0]}
    return {"type": "MultiLineString", "coordinates": parts}


def _cut(line_geom, a: Point, b: Point) -> LineString | None:
    """The stretch of a line between two points, from the one part that passes both."""
    for part in _lines_of(linemerge(line_geom)):
        if part.distance(a) <= STATION_M and part.distance(b) <= STATION_M:
            x, y = sorted((part.project(a), part.project(b)))
            if y - x > 1:
                return substring(part, x, y)
    return None


def _along(seg, line_geom) -> bool:
    near = seg.intersection(line_geom.buffer(ALONG_M))
    return near.length >= ALONG_SHARE * seg.length


def _position(seg, line_geom) -> tuple[int, float]:
    """Where a piece sits along a line: (part index, distance along it), for ordering a route."""
    mid = seg.interpolate(0.5, normalized=True)
    parts = _lines_of(linemerge(line_geom))
    i = min(range(len(parts)), key=lambda k: parts[k].distance(mid))
    return i, parts[i].project(mid)


def apply(lines: list[dict], segments: dict[str, dict], points: list[dict], spec_path: Path = SPEC) -> dict:
    """Rewrite the present era in place from extensions.json. Returns a summary per system."""
    if not spec_path.exists():
        return {}
    spec = json.loads(spec_path.read_text())
    summary = {}
    for sys_id, sysspec in spec.get("systems", {}).items():
        sys_lines = [l for l in lines if l["system"] == sys_id]
        if not sys_lines:
            raise SystemExit(f"[extensions] no present lines for system {sys_id}")
        stations = {p["properties"]["name"].lower(): to_metres(Point(p["geometry"]["coordinates"]))
                    for p in points if p["properties"]["system"] == sys_id}
        stations.update({k.lower(): to_metres(Point(v)) for k, v in sysspec.get("stations", {}).items()})
        geom = {l["id"]: unary_union([_geom(segments[r["segment"]]) for r in l["route"]]) for l in sys_lines}
        base = {l["id"]: segments[l["route"][0]["segment"]]["properties"] for l in sys_lines}

        dated: dict[str, tuple[LineString, dict]] = {}
        for d in sysspec.get("segments", []):
            try:
                a, b = stations[d["from"].lower()], stations[d["to"].lower()]
            except KeyError as e:
                raise SystemExit(f"[extensions] {d['id']}: no station {e} in {sys_id}'s stations") from None
            order = [d["line"]] if d.get("line") else [l["id"] for l in sys_lines]
            cut, src = None, None
            for lid in order:
                cut = _cut(geom[lid], a, b)
                if cut is not None:
                    src = lid
                    break
            if cut is None:
                raise SystemExit(f"[extensions] {d['id']}: no {sys_id} line passes both {d['from']} and {d['to']}")
            b0 = base[src]
            props = {
                "id": d["id"], "system": sys_id, "name": d["name"],
                "opened": d.get("opened"), "closed": d.get("closed"),
                **({"structure": d["structure"]} if d.get("structure") else {}),
                "geometry_confidence": b0["geometry_confidence"],
                "geometry_method": f"{b0['geometry_method']}; the stretch between {d['from']} and {d['to']} "
                                   f"(data/present/extensions.json)",
                "sources": [s for s in b0["sources"] if "geometry" in s.get("supports", [])] + d.get("sources", []),
                "flags": list(d.get("flags", [])) + ([] if d.get("opened") else ["opened_unsourced"]),
                **({"notes": d["notes"]} if d.get("notes") else {}),
            }
            dated[d["id"]] = (cut, props)

        used: set[str] = set()
        for line in sys_lines:
            g = geom[line["id"]]
            pieces = [(sid, s) for sid, (s, _) in dated.items() if _along(s, g)]
            covered = unary_union([s for _, s in pieces]).buffer(ALONG_M) if pieces else None
            rest = [p for p in _lines_of(g.difference(covered) if covered else g) if p.length >= REST_MIN_M]
            route = []
            for sid, s in pieces:
                route.append((_position(s, g), {"segment": sid}))
            for i, p in enumerate(rest, start=1):
                rid = f"{line['id']}-undated-{i}"
                b0 = base[line["id"]]
                segments[rid] = {"type": "Feature", "geometry": _to_geojson(p), "properties": {
                    "id": rid, "system": sys_id, "name": f"{line['name']}, part not yet dated",
                    "opened": None, "closed": None, "geometry_confidence": b0["geometry_confidence"],
                    "geometry_method": f"{b0['geometry_method']}; the part not covered by a dated stretch",
                    "sources": b0["sources"], "flags": ["opened_unsourced"]}}
                route.append((_position(p, g), {"segment": rid}))
            old = [r["segment"] for r in line["route"]]
            line["route"] = [r for _, r in sorted(route, key=lambda x: x[0])]
            used.update(old)
            spec_line = sysspec.get("lines", {}).get(line["id"], {})
            if spec_line.get("opened"):
                line["opened"] = spec_line["opened"]
                line["flags"] = [f for f in line["flags"] if f != "opened_unsourced"]
            line["sources"] = line["sources"] + spec_line.get("sources", [])
            if spec_line.get("notes"):
                line["notes"] = (line.get("notes", "") + " " + spec_line["notes"]).strip()
        for sid, (s, props) in dated.items():
            segments[sid] = {"type": "Feature", "geometry": _to_geojson(s), "properties": props}
        still = {r["segment"] for l in lines for r in l["route"]}
        for sid in used - still:
            segments.pop(sid, None)
        summary[sys_id] = {"dated": len(dated), "undated_parts": sum(1 for s in segments if s.startswith(tuple(
            l["id"] + "-undated-" for l in sys_lines)))}
    return summary
