"""Build the files the app reads (data/app/) from the authoring data (data/<era>/<group>/).

The authoring data is two-level: segments are physical rights-of-way with their own dates; lines are
named services that use segments over time (docs/SCHEMA.md). The app gets flat files per era:

- <era>-draw.geojson    one feature per segment piece: the visible strokes. Overlapping lines of one
                        mode share one stroke, so translucent fades and the ghost overlay never
                        double up.
- <era>-lines.geojson   one feature per line x segment piece, in route order: hit-testing, hover and
                        selection highlights, and the selected line drawing itself.

A segment is cut into pieces where it runs alongside another mode, and each piece carries `off`, its
slot across the path, so different modes are drawn side by side close in (side_by_side.py, decision
10). The past era waits for Phase 2, where the slots need to know who ran when; there `off` is 0.
- <era>-points.geojson  stations, piers, terminals, carbarns.
- catalog.json          every line with its resolved sources, for the panel and the list.

Dates: a segment's own dates win. When one is null, the display borrows the earliest sourced opening
and the latest sourced closing of the lines that used it, marked `borrowed` (decision 4). The source
data keeps the null and its *_unsourced flag. Nothing sourced: `undated`, off the year slider.

Validation lives in one place, the Vitest suite (npm test); this step only builds.

    uv run --directory pipeline python -m transit_pipeline.build
"""

from __future__ import annotations

import json
import math
from collections import defaultdict
from datetime import date
from pathlib import Path

from .common import APP, DATA, MODE_GROUP, ROOT, SOURCES, SYSTEMS, VOCAB, write_geojson, write_json
from .side_by_side import Paths

ERAS = ("past", "present", "future")
OPEN_ENDED = 9999.0  # still running (or not yet open): no closing year
NOT_YET = 9000.0  # future lines: never on the year slider



def line_sources(line: dict, segments: dict) -> list[dict]:
    """The line's own sources, then its segments' (so the panel credits who drew the geometry too).
    A source cited by both is listed once, with what each citation supports."""
    merged: dict[str, dict] = {}
    refs = list(line["sources"]) + [s for r in line["route"] for s in segments[r["segment"]]["properties"]["sources"]]
    for ref in refs:
        m = merged.setdefault(ref["source"], {**ref, "supports": []})
        m["supports"] += [x for x in ref.get("supports", []) if x not in m["supports"]]
    return list(merged.values())

def decimal_year(d: str | None) -> float | None:
    """'1903' -> 1903.0, '1903-05' -> 1903.33, '1903-05-14' -> 1903.37 (a trailing ~ is ignored)."""
    if not d:
        return None
    d = d.rstrip("~")
    parts = [int(x) for x in d.split("-")]
    if len(parts) == 1:
        return float(parts[0])
    if len(parts) == 2:
        return parts[0] + (parts[1] - 1) / 12
    doy = date(*parts).timetuple().tm_yday
    return parts[0] + (doy - 1) / 365.25


def metres(a, b) -> float:
    k = math.cos(math.radians((a[1] + b[1]) / 2)) * 111320
    return math.hypot((a[0] - b[0]) * k, (a[1] - b[1]) * 110540)


def parts_of(geom: dict) -> list[list[list[float]]]:
    return [geom["coordinates"]] if geom["type"] == "LineString" else geom["coordinates"]


def ends(parts):
    return parts[0][0], parts[-1][-1]


def flip(parts):
    return [list(reversed(p)) for p in reversed(parts)]


def orient(pieces: list[list[list[list[float]]]]) -> list[list[list[list[float]]]]:
    """Orient each piece of a route so it runs on from the one before (the first toward the second)."""
    if len(pieces) < 2:
        return pieces
    out = [p for p in pieces]
    s0, e0 = ends(out[0])
    s1, e1 = ends(out[1])
    if min(metres(s0, s1), metres(s0, e1)) < min(metres(e0, s1), metres(e0, e1)):
        out[0] = flip(out[0])
    for i in range(1, len(out)):
        prev_end = ends(out[i - 1])[1]
        s, e = ends(out[i])
        if metres(prev_end, e) < metres(prev_end, s):
            out[i] = flip(out[i])
    return out


def length_km(parts) -> float:
    return sum(metres(p[i - 1], p[i]) for p in parts for i in range(1, len(p))) / 1000


def bbox(parts_list) -> list[float]:
    xs = [c[0] for parts in parts_list for p in parts for c in p]
    ys = [c[1] for parts in parts_list for p in parts for c in p]
    return [round(min(xs), 6), round(min(ys), 6), round(max(xs), 6), round(max(ys), 6)]


def load_era(era: str):
    lines, segments, points = [], {}, []
    for folder in sorted(p for p in (DATA / era).glob("*") if p.is_dir()):
        if (folder / "lines.json").exists():
            lines += json.loads((folder / "lines.json").read_text())["lines"]
        if (folder / "segments.geojson").exists():
            for f in json.loads((folder / "segments.geojson").read_text())["features"]:
                segments[f["properties"]["id"]] = f
        if (folder / "points.geojson").exists():
            points += json.loads((folder / "points.geojson").read_text())["features"]
    return lines, segments, points


def main() -> None:
    sources = {s["id"]: s for s in json.loads(SOURCES.read_text())["sources"]}
    systems = {s["id"]: s for s in json.loads(SYSTEMS.read_text())["systems"]}
    statuses = VOCAB["statuses"]
    catalog = []
    coverage = {}

    for era in ERAS:
        lines, segments, points = load_era(era)
        uses = defaultdict(list)  # segment id -> lines that use it
        for line in lines:
            for r in line["route"]:
                uses[r["segment"]].append(line)

        def line_years(line):
            if era == "future":
                return NOT_YET, OPEN_ENDED
            o = decimal_year(line["opened"])
            c = decimal_year(line["closed"]) if line["closed"] else (OPEN_ENDED if line["status"] == "active" else None)
            return o, c

        def segment_years(seg_props, users):
            """(open_y, close_y, borrowed, undated) for display."""
            if era == "future":
                return NOT_YET, OPEN_ENDED, False, False
            o = decimal_year(seg_props["opened"])
            c = decimal_year(seg_props["closed"])
            active = any(u["status"] == "active" for u in users)
            if c is None and active and not seg_props["closed"]:
                c = OPEN_ENDED
            borrowed = False
            if o is None:
                cands = [y for y in (line_years(u)[0] for u in users) if y is not None]
                if cands:
                    o, borrowed = min(cands), True
            if c is None:
                cands = [y for y in (line_years(u)[1] for u in users) if y is not None]
                if cands:
                    c, borrowed = max(cands), True
            undated = o is None or c is None
            return o, c, borrowed, undated

        draw, line_feats, point_feats = [], [], []
        seg_display = {}
        for fid, (sid, f) in enumerate(sorted(segments.items()), start=1):
            p = f["properties"]
            users = uses.get(sid, [])
            o, c, borrowed, undated = segment_years(p, users)
            seg_display[sid] = (o, c, borrowed, undated)
            mode = users[0]["mode"] if users else "railroad"
            status = max((u["status"] for u in users), key=lambda s: list(statuses).index(s), default="closed")
            draw.append({"type": "Feature", "geometry": f["geometry"], "properties": {
                "fid": fid, "seg": sid, "era": era, "mode": mode, "group": MODE_GROUP[mode],
                "conf": p["geometry_confidence"], "structure": p.get("structure") or "",
                "shared": 1 if p.get("shares_existing_track") else 0,
                "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
                "borrowed": 1 if borrowed else 0, "undated": 1 if undated else 0, "status": status,
            }})

        # Different modes on the same path, side by side close in (decision 10).
        paths = Paths(draw) if era != "past" else None

        def slots(parts, group):
            for part in parts:
                yield from (paths.split(part, group) if paths else [(part, 0.0)])

        pieces_out = []
        for f in draw:
            for coords, off in slots(parts_of(f["geometry"]), f["properties"]["group"]):
                pieces_out.append({"type": "Feature", "geometry": {"type": "LineString", "coordinates": coords},
                                   "properties": {**f["properties"], "fid": len(pieces_out) + 1, "off": off}})
        draw = pieces_out

        fid = 0
        for line in lines:
            pieces = [parts_of(segments[r["segment"]]["geometry"]) for r in line["route"]]
            oriented = orient(pieces)
            fids = []
            for r, parts in zip(line["route"], oriented):
                seg = segments[r["segment"]]["properties"]
                o, c, borrowed, undated = seg_display[r["segment"]]
                # A line's use of a segment can be narrower than the segment's own life.
                if r.get("from"):
                    o = max(o or -math.inf, decimal_year(r["from"]))
                if r.get("to"):
                    c = min(c if c is not None else math.inf, decimal_year(r["to"]))
                for coords, off in slots(parts, MODE_GROUP[line["mode"]]):
                    fid += 1
                    fids.append(fid)
                    line_feats.append({"type": "Feature", "geometry": {"type": "LineString", "coordinates": coords}, "properties": {
                        "fid": fid, "line": line["id"], "seg": r["segment"], "era": era, "name": line["name"],
                        "mode": line["mode"], "group": MODE_GROUP[line["mode"]], "conf": seg["geometry_confidence"],
                        "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
                        "borrowed": 1 if borrowed else 0, "undated": 1 if undated else 0, "status": line["status"],
                        "off": off,
                    }})
            lo, lc = line_years(line)
            segs_km = defaultdict(float)
            for r, parts in zip(line["route"], oriented):
                segs_km[segments[r["segment"]]["properties"]["geometry_confidence"]] += length_km(parts)
            catalog.append({
                "id": line["id"],
                "name": line["name"],
                **({"short_name": line["short_name"]} if "short_name" in line else {}),
                "system": line["system"],
                "system_name": systems.get(line["system"], {}).get("name", line["system"]),
                "operators": line.get("operators", []),
                "mode": line["mode"],
                "mode_label": VOCAB["modes"][line["mode"]]["label"],
                "group": MODE_GROUP[line["mode"]],
                "era": line["era"],
                "opened": line["opened"],
                "closed": line["closed"],
                "status": line["status"],
                "status_label": statuses[line["status"]]["label"],
                **{k: line[k] for k in ("status_as_of", "expected_opening", "last_verified", "summary", "fate",
                                        "fate_note", "successor", "continues_beyond", "gauge_mm", "gauge_label",
                                        "traction", "photo", "links", "notes") if k in line},
                "flags": line["flags"],
                "undated": era != "future" and (lo is None or lc is None),
                "length_km": round(sum(segs_km.values()), 2),
                "confidence_km": {k: round(v, 2) for k, v in sorted(segs_km.items())},
                "bbox": bbox(oriented),
                "fids": fids,
                "segments": [{
                    "id": r["segment"],
                    "name": segments[r["segment"]]["properties"].get("name", r["segment"]),
                    "opened": segments[r["segment"]]["properties"]["opened"],
                    "closed": segments[r["segment"]]["properties"]["closed"],
                    "borrowed": seg_display[r["segment"]][2],
                    "confidence": segments[r["segment"]]["properties"]["geometry_confidence"],
                    "method": segments[r["segment"]]["properties"]["geometry_method"],
                    "structure": segments[r["segment"]]["properties"].get("structure"),
                    "flags": segments[r["segment"]]["properties"]["flags"],
                    **({"notes": segments[r["segment"]]["properties"]["notes"]} if "notes" in segments[r["segment"]]["properties"] else {}),
                } for r in line["route"]],
                "sources": [{**{k: v for k, v in sources[s["source"]].items() if k != "notes"}, **s} for s in line_sources(line, segments)],
            })

        by_line = {l["id"]: l for l in lines}
        for fid, f in enumerate(points, start=1):
            p = f["properties"]
            users = [by_line[i] for i in p["line_ids"] if i in by_line]
            mode = users[0]["mode"] if users else "railroad"
            if era == "future":
                o, c = NOT_YET, OPEN_ENDED
            else:
                o, c = decimal_year(p["opened"]), decimal_year(p["closed"])
                if c is None and not p["closed"] and any(u["status"] == "active" for u in users):
                    c = OPEN_ENDED
                if o is None:
                    o = min((y for y in (decimal_year(u["opened"]) for u in users) if y is not None), default=None)
            point_feats.append({"type": "Feature", "geometry": f["geometry"], "properties": {
                "fid": fid, "id": p["id"], "name": p["name"], "kind": p["kind"], "era": era,
                "group": MODE_GROUP[mode], "status": p.get("status", ""),
                # Delimited both ends, so the map can match one line with ['in', ',id,', lines].
                "lines": "," + ",".join(p["line_ids"]) + ",",
                "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
            }})

        write_geojson(APP / f"{era}-draw.geojson", draw)
        write_geojson(APP / f"{era}-lines.geojson", line_feats)
        write_geojson(APP / f"{era}-points.geojson", point_feats)

        conf = defaultdict(float)
        for f in segments.values():
            conf[f["properties"]["geometry_confidence"]] += length_km(parts_of(f["geometry"]))
        flags = defaultdict(int)
        for item in [*lines, *(f["properties"] for f in segments.values()), *(f["properties"] for f in points)]:
            for fl in item["flags"]:
                flags[fl] += 1
        coverage[era] = {
            "lines": len(lines), "segments": len(segments), "points": len(points),
            "km_by_confidence": {k: round(v, 1) for k, v in sorted(conf.items())},
            "undated_segments": sum(1 for v in seg_display.values() if v[3]),
            "borrowed_dates": sum(1 for v in seg_display.values() if v[2]),
            "flags": dict(sorted(flags.items())),
        }

    write_json(APP / "catalog.json", {"lines": sorted(catalog, key=lambda l: (l["era"], l["name"]))})
    write_json(APP / "coverage.json", coverage)
    update_data_log(coverage)
    for era, c in coverage.items():
        print(f"[build] {era}: {c['lines']} lines, {c['segments']} segments, {c['points']} points, {c['km_by_confidence']}")


def update_data_log(coverage: dict) -> None:
    """Rewrite the coverage table between the markers in DATA_LOG.md."""
    path = ROOT / "DATA_LOG.md"
    if not path.exists():
        return
    text = path.read_text()
    start, end = "<!-- coverage:start -->", "<!-- coverage:end -->"
    if start not in text or end not in text:
        return
    rows = ["| Era | Lines | Segments | Points | km surveyed | km digitized | km approximate | Undated segments | Borrowed dates |",
            "|---|---|---|---|---|---|---|---|---|"]
    for era, c in coverage.items():
        k = c["km_by_confidence"]
        rows.append(f"| {era} | {c['lines']} | {c['segments']} | {c['points']} | {k.get('surveyed', 0)} | "
                    f"{k.get('digitized', 0)} | {k.get('approximate', 0)} | {c['undated_segments']} | {c['borrowed_dates']} |")
    flags = defaultdict(int)
    for c in coverage.values():
        for fl, n in c["flags"].items():
            flags[fl] += n
    rows.append("")
    rows.append("Open flags: " + (", ".join(f"`{fl}` {n}" for fl, n in sorted(flags.items())) or "none") + ".")
    block = f"{start}\n" + "\n".join(rows) + f"\n{end}"
    path.write_text(text[: text.index(start)] + block + text[text.index(end) + len(end):])


if __name__ == "__main__":
    main()
