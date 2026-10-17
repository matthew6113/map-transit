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
10); in the past era only lines that ran at the same time count.

Today's network is cut into shared, dated segments first (extensions.py, data/present/extensions.json),
and past lines may run over present segments, track that is still in use (decision 13).
- <era>-points.geojson  stations, piers, terminals, carbarns.
- catalog.json          every line with its resolved sources, for the panel and the list.

The ideal era (data/ideal/<proposal>/) is the future's layer B: the reference proposals Matthew
designs his own network from, built like the other eras and never on the year slider. Each catalog
entry carries its proposal: who proposed it, in which document and year, and how far it has gone.
Matthew's own network (data/ideal/network.geojson, from the editor) joins the same era: each of its
lines becomes one segment, `designed`, with status `ideal` and what it's based on.

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

from . import extensions
from .common import APP, DATA, MODE_GROUP, ROOT, SOURCES, SYSTEMS, VOCAB, write_geojson, write_json
from .side_by_side import Paths

ERAS = ("past", "present", "future", "ideal")
OPEN_ENDED = 9999.0  # still running (or not yet open): no closing year
NOT_YET = 9000.0  # future lines and proposals: never on the year slider
UNBUILT = ("future", "ideal")
NETWORK = DATA / "ideal" / "network.geojson"
NETWORK_ID = "ideal-network"  # its source, its system and its lines' id prefix



def line_sources(line: dict, segments: dict) -> list[dict]:
    """The line's own sources, then its segments' (so the panel credits who drew the geometry too).
    A source cited by both is listed once, with what each citation supports."""
    merged: dict[str, dict] = {}
    refs = list(line["sources"]) + [s for r in line["route"] for s in segments[r["segment"]]["properties"]["sources"]]
    for ref in refs:
        m = merged.setdefault(ref["source"], {**ref, "supports": []})
        m["supports"] += [x for x in ref.get("supports", []) if x not in m["supports"]]
    return list(merged.values())

# Decision 20: draw a line whose opening or closing isn't sourced for
# the years a source shows it running (its `running` dates). False leaves such lines undated.
RUNNING_DATES = True


def running_years(line: dict) -> list[float]:
    """The years a source shows the line running (decision 20), in order."""
    return sorted(decimal_year(x["date"]) for x in line.get("running", []))


def attested(line: dict) -> bool:
    """Drawn for its running dates, not its own (decision 20): lighter, like a borrowed date."""
    return RUNNING_DATES and bool(line.get("running")) and (line["opened"] is None or line["closed"] is None)


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


def mode_spans(o_p: float | None, c_p: float | None, past_uses: list[tuple[float, float, str, str]]):
    """A present segment's life split by the mode drawn: (spans of past lines' modes, spans of its own
    mode). Where past lines used it (decision 13), the track draws in the mode of the line running
    then, the earliest-opened if several; otherwise in today's mode (Matthew, Oct 14)."""
    if o_p is None or c_p is None or not past_uses:
        return [], [(o_p, c_p)]
    uses = [(max(o, o_p), min(c, c_p), mode, key) for o, c, mode, key in past_uses if min(c, c_p) > max(o, o_p)]
    cuts = sorted({o_p, c_p, *(x for o, c, _, _ in uses for x in (o, c))})
    spans: list[list] = []  # [start, end, mode or None for today's]
    for a, b in zip(cuts, cuts[1:]):
        active = [u for u in uses if u[0] <= a and u[1] >= b]
        mode = min(active, key=lambda u: u[3])[2] if active else None
        if spans and spans[-1][2] == mode and spans[-1][1] == a:
            spans[-1][1] = b
        else:
            spans.append([a, b, mode])
    return [(a, b, m) for a, b, m in spans if m], [(a, b) for a, b, m in spans if not m]


def network() -> tuple[list[dict], dict]:
    """Matthew's network as the ideal era's lines and segments: one segment per line, as he drew it."""
    if not NETWORK.exists():
        return [], {}
    lines, segments = [], {}
    for f in json.loads(NETWORK.read_text())["features"]:
        p = f["properties"]
        lid = f"{NETWORK_ID}-{p['id']}"
        segments[lid] = {"type": "Feature", "geometry": f["geometry"], "properties": {
            "id": lid, "system": NETWORK_ID, "name": p["name"], "opened": None, "closed": None, "structure": None,
            "geometry_confidence": "designed",
            "geometry_method": "Drawn by Matthew in the network editor (data/ideal/network.geojson).",
            "sources": [{"source": NETWORK_ID, "supports": ["geometry"]}], "flags": []}}
        lines.append({
            "id": lid, "name": p["name"], "system": NETWORK_ID, "mode": p["mode"], "era": "ideal",
            "opened": None, "closed": None, "status": "ideal", "route": [{"segment": lid}],
            "sources": [{"source": NETWORK_ID, "supports": ["general"]}], "flags": [],
            **({"notes": p["notes"]} if p.get("notes") else {}),
            "based_on": p["based_on"], "author": p["author"],
        })
    return lines, segments


def based_on(line: dict, lines: list[dict], sources: dict) -> list[dict]:
    """What a line of Matthew's network draws on, by name: a whole proposal, or one proposal line."""
    by_line = {l["id"]: l for l in lines}
    by_proposal = {l["proposal_id"]: l for l in lines if l.get("proposal_id")}
    out = []
    for ref in line["based_on"]:
        if ref in by_line:
            out.append({"id": ref, "name": by_line[ref]["name"], "line": ref})
        elif ref in by_proposal:
            l = by_proposal[ref]
            out.append({"id": ref, "name": f"{l['proposed_by']}: {sources[l['document']]['title']}"})
        else:
            out.append({"id": ref, "name": ref})
    return out


def load_era(era: str):
    lines, segments, points = [], {}, []
    if era == "ideal":
        lines, segments = network()
    if not (DATA / era).exists():
        return lines, segments, points
    for folder in sorted(p for p in (DATA / era).glob("*") if p.is_dir()):
        if (folder / "lines.json").exists():
            lines += json.loads((folder / "lines.json").read_text())["lines"]
        if (folder / "segments.geojson").exists():
            for f in json.loads((folder / "segments.geojson").read_text())["features"]:
                segments[f["properties"]["id"]] = f
        if (folder / "points.geojson").exists():
            points += json.loads((folder / "points.geojson").read_text())["features"]
    return lines, segments, points


def proposal(line: dict, sources: dict) -> dict:
    """A reference line's proposal, for the panel: who, in which document, and how far it has gone."""
    doc = sources[line["document"]]
    return {
        "id": line["proposal_id"],
        "proposed_by": line["proposed_by"],
        "document": {k: doc[k] for k in ("id", "title", "url", "date", "publisher", "type") if k in doc},
        "year": line["year"],
        "status": line["proposal_status"],
        "status_label": VOCAB["proposal_statuses"][line["proposal_status"]]["label"],
        "status_as_of": line["status_as_of"],
    }


def main() -> None:
    sources = {s["id"]: s for s in json.loads(SOURCES.read_text())["sources"]}
    systems = {s["id"]: s for s in json.loads(SYSTEMS.read_text())["systems"]}
    statuses = VOCAB["statuses"]
    catalog = []
    coverage = {}

    loaded = {era: load_era(era) for era in ERAS}
    # Today's network, cut into shared, dated segments (data/present/extensions.json).
    ext_summary, on_track, pieces_of = extensions.apply(*loaded["present"])
    for sys_id, n in ext_summary.items():
        print(f"[build] present/{sys_id}: {n['dated']} dated segments, {n['undated_parts']} parts not yet dated")
    present_segments = loaded["present"][1]
    # A past line that names a stretch of today's network runs over every piece it was split into.
    for line in loaded["past"][0]:
        line["route"] = [{**r, "segment": pid} for r in line["route"]
                         for pid in (pieces_of[r["segment"]] if r["segment"] in pieces_of and r["segment"] not in present_segments
                                     else [r["segment"]])]
    # Past lines may run over track that is still in use (decision 13): their route entries can name
    # present segments, which then borrow dates from the past lines too.
    cross = [(line, r) for line in loaded["past"][0] for r in line["route"]
             if r["segment"] not in loaded["past"][1] and r["segment"] in present_segments]
    present_display: dict = {}
    # Present track that past lines used, drawn in their modes for those years: sid -> (spans, feature).
    past_mode_spans: dict = {}

    # The present first, so the past can draw its lines over present track with its display dates.
    for era in ("present", "past", "future", "ideal"):
        lines, segments, points = loaded[era]
        route_segments = {**present_segments, **segments} if era == "past" else segments
        uses = defaultdict(list)  # segment id -> lines that use it
        spans = defaultdict(list)  # segment id -> (line, route entry): when each line used it
        for line in lines:
            for r in line["route"]:
                uses[r["segment"]].append(line)
                spans[r["segment"]].append((line, r))
        if era == "present":
            for line, r in cross:
                uses[r["segment"]].append(line)
                spans[r["segment"]].append((line, r))

        def line_years(line):
            if era in UNBUILT:
                return NOT_YET, OPEN_ENDED
            o = decimal_year(line["opened"])
            c = decimal_year(line["closed"]) if line["closed"] else (OPEN_ENDED if line["status"] == "active" else None)
            # Decision 20: a line a source shows running, whose opening or closing isn't sourced, is
            # drawn for the years it's shown: from the first such date, to the last.
            seen = running_years(line)
            if seen and RUNNING_DATES:
                o = seen[0] if o is None else o
                c = seen[-1] if c is None else c
            return o, c

        def use_years(line, r=None):
            """A line's years on one segment: its own, narrowed by the route entry's from/to, and by
            the dates a source shows this stretch in use, where it's in only some of them."""
            o, c = line_years(line)
            if r and r.get("from"):
                o = max(o if o is not None else -math.inf, decimal_year(r["from"]))
            if r and r.get("to"):
                c = min(c if c is not None else math.inf, decimal_year(r["to"]))
            if r and r.get("running") and RUNNING_DATES:
                seen, mine = running_years(line), sorted(decimal_year(d) for d in r["running"])
                if mine[0] > seen[0]:
                    o = max(o if o is not None else -math.inf, mine[0])
                if mine[-1] < seen[-1]:
                    c = min(c if c is not None else math.inf, mine[-1])
            return o, c

        def segment_years(seg_props, users, used=None):
            """(open_y, close_y, borrowed, undated) for display, of a segment or a point. A segment
            borrows from its lines' use of it (route from/to), a point from its lines."""
            if era in UNBUILT:
                return NOT_YET, OPEN_ENDED, False, False
            o = decimal_year(seg_props["opened"])
            c = decimal_year(seg_props["closed"])
            active = any(u["status"] == "active" for u in users)
            if c is None and active and not seg_props["closed"]:
                c = OPEN_ENDED
            borrowed = False
            years = [use_years(u, r) for u, r in used] if used else [use_years(u) for u in users]
            if o is None:
                cands = [y[0] for y in years if y[0] is not None and y[0] != -math.inf]
                if cands:
                    o, borrowed = min(cands), True
            if c is None:
                cands = [y[1] for y in years if y[1] is not None and y[1] != math.inf]
                if cands:
                    c, borrowed = max(cands), True
            undated = o is None or c is None
            return o, c, borrowed, undated

        draw, line_feats, point_feats = [], [], []
        seg_display = {}
        for fid, (sid, f) in enumerate(sorted(segments.items()), start=1):
            p = f["properties"]
            users = uses.get(sid, [])
            o, c, borrowed, undated = segment_years(p, users, spans.get(sid))
            seg_display[sid] = (o, c, borrowed, undated)
            mode = users[0]["mode"] if users else "railroad"
            status = max((u["status"] for u in users), key=lambda s: list(statuses).index(s), default="closed")
            base = {"type": "Feature", "geometry": f["geometry"], "properties": {
                "fid": fid, "seg": sid, "era": era, "mode": mode, "group": MODE_GROUP[mode],
                "conf": p["geometry_confidence"], "structure": p.get("structure") or "",
                "shared": 1 if p.get("shares_existing_track") else 0,
                "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
                "borrowed": 1 if borrowed else 0, "undated": 1 if undated else 0, "status": status,
            }}
            # A past segment that lines of different modes used in turn (an interurban, then freight
            # trains; cable, then electric cars) draws in the mode of each year: the earliest-opened
            # line running then, else the line that ran just before (decision 15).
            if era == "past" and not undated and len({u["mode"] for u in users}) > 1:
                turns = []
                for line, r in spans.get(sid, []):
                    lo, lc = use_years(line, r)
                    lo = o if lo is None or lo == -math.inf else max(lo, o)
                    lc = c if lc is None or lc == math.inf else min(lc, c)
                    turns.append((lo, lc, line["mode"], line["opened"] or "9999"))
                historic, own = mode_spans(o, c, turns)
                for a, b in own:
                    before = [m for x, y, m in historic if y <= a]
                    after = [m for x, y, m in historic if x >= b]
                    historic.append((a, b, before[-1] if before else after[0] if after else mode))
                for a, b, m in sorted(historic):
                    draw.append({**base, "properties": {**base["properties"], "mode": m, "group": MODE_GROUP[m],
                                                         "open_y": round(a, 3), "close_y": round(b, 3), "span": 1}})
                continue
            past_uses = []
            if era == "present":
                for line, r in (x for x in cross if x[1]["segment"] == sid):
                    lo, lc = use_years(line, r)
                    if lo is not None and lc is not None:
                        past_uses.append((lo, lc, line["mode"], line["opened"] or "9999"))
                # Today's lines that ran in another mode before (Muni's streetcars before Metro).
                for line, r in spans.get(sid, []):
                    em = line.get("earlier_mode")
                    if em and line["era"] == "present":
                        lo = decimal_year(r.get("from") or line["opened"])
                        lc = min(decimal_year(em["to"]), decimal_year(r["to"]) if r.get("to") else math.inf)
                        if lo is not None and lc > lo:
                            past_uses.append((lo, lc, em["mode"], line["opened"] or "9999"))
            historic, own = mode_spans(o, c, past_uses)
            if historic:
                past_mode_spans[sid] = (historic, base)
            for a, b in own:  # today's mode, for the years no past line drew it
                draw.append({**base, "properties": {**base["properties"],
                    **({"open_y": round(a, 3), "close_y": round(b, 3)} if historic else {})}})
        if era == "past":
            # Present track in the mode of the past line using it, for those years (decision 13).
            for sid, (historic, base) in sorted(past_mode_spans.items()):
                for a, b, m in historic:
                    draw.append({**base, "properties": {**base["properties"], "era": "past", "mode": m, "group": MODE_GROUP[m],
                                                         "open_y": round(a, 3), "close_y": round(b, 3), "undated": 0,
                                                         "status": "closed", "span": 1}})

        # Different modes on the same path, side by side close in (decision 10); in the past era,
        # only lines that ran at the same time.
        paths = Paths(draw, timed=era == "past")

        def slots(parts, group, sid, span=None):
            if span is None and sid not in seg_display:  # a present segment under a past line: drawn by the present
                yield from ((part, 0.0) for part in parts)
                return
            if span is None:
                o, c, _, undated = seg_display[sid]
                span = None if undated else (o, c)
            for part in parts:
                yield from paths.split(part, group, span)

        def display(sid):
            return seg_display[sid] if sid in seg_display else present_display[sid]

        def sid_split(sid):
            return sid in past_mode_spans

        pieces_out = []
        for f in draw:
            fp = f["properties"]
            own = (fp["open_y"], fp["close_y"]) if fp.get("span") or (era == "present" and sid_split(fp["seg"])) else None
            for coords, off in slots(parts_of(f["geometry"]), fp["group"], fp["seg"], own):
                pieces_out.append({"type": "Feature", "geometry": {"type": "LineString", "coordinates": coords},
                                   "properties": {**f["properties"], "fid": len(pieces_out) + 1, "off": off}})
        draw = pieces_out

        fid = 0
        for line in lines:
            pieces = [parts_of(route_segments[r["segment"]]["geometry"]) for r in line["route"]]
            oriented = orient(pieces)
            fids = []
            for r, parts in zip(line["route"], oriented):
                seg = route_segments[r["segment"]]["properties"]
                o, c, borrowed, undated = display(r["segment"])
                # A line's use of a segment can be narrower than the segment's own life: its route
                # entry's from/to, and the line's own sourced dates (Caltrain runs on track of 1863,
                # but only from 1980).
                if r.get("from"):
                    o = max(o or -math.inf, decimal_year(r["from"]))
                if r.get("to"):
                    c = min(c if c is not None else math.inf, decimal_year(r["to"]))
                lo, lc = use_years(line, r)
                if lo is not None and o is not None and not undated:
                    o = max(o, lo)
                if lc is not None and c is not None and not undated:
                    c = min(c, lc)
                # The segment's own dates, so the line's pieces match the drawn ones.
                for coords, off in slots(parts, MODE_GROUP[line["mode"]], r["segment"]):
                    fid += 1
                    fids.append(fid)
                    line_feats.append({"type": "Feature", "geometry": {"type": "LineString", "coordinates": coords}, "properties": {
                        "fid": fid, "line": line["id"], "seg": r["segment"], "era": era, "name": line["name"],
                        "mode": line["mode"], "group": MODE_GROUP[line["mode"]], "conf": seg["geometry_confidence"],
                        "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
                        "borrowed": 1 if borrowed or attested(line) else 0, "undated": 1 if undated else 0,
                        "status": line["status"], "off": off,
                    }})
            lo, lc = line_years(line)
            segs_km, counted = defaultdict(float), set()
            for r, parts in zip(line["route"], oriented):
                # A segment listed twice, around a break in service, is one stretch of track.
                if r["segment"] in counted:
                    continue
                counted.add(r["segment"])
                segs_km[route_segments[r["segment"]]["properties"]["geometry_confidence"]] += length_km(parts)
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
                **({"proposal": proposal(line, sources)} if line["status"] == "proposed" else {}),
                **({"based_on": based_on(line, lines, sources), "author": line["author"]} if line["status"] == "ideal" else {}),
                "flags": line["flags"],
                **({"running": line["running"]} if line.get("running") and RUNNING_DATES else {}),
                "undated": era not in UNBUILT and (lo is None or lc is None),
                "length_km": round(sum(segs_km.values()), 2),
                "confidence_km": {k: round(v, 2) for k, v in sorted(segs_km.items())},
                "bbox": bbox(oriented),
                "fids": fids,
                "segments": [{
                    "id": r["segment"],
                    "name": route_segments[r["segment"]]["properties"].get("name", r["segment"]),
                    "opened": route_segments[r["segment"]]["properties"]["opened"],
                    "closed": route_segments[r["segment"]]["properties"]["closed"],
                    # This line's use of the segment, where narrower than the segment's own life.
                    **{k: r[k] for k in ("from", "to", "running", "note") if r.get(k)},
                    "borrowed": display(r["segment"])[2],
                    "undated": display(r["segment"])[3],
                    "confidence": route_segments[r["segment"]]["properties"]["geometry_confidence"],
                    "method": route_segments[r["segment"]]["properties"]["geometry_method"],
                    "structure": route_segments[r["segment"]]["properties"].get("structure"),
                    "flags": route_segments[r["segment"]]["properties"]["flags"],
                    **({"notes": route_segments[r["segment"]]["properties"]["notes"]} if "notes" in route_segments[r["segment"]]["properties"] else {}),
                } for r in line["route"]],
                "sources": [{**{k: v for k, v in sources[s["source"]].items() if k != "notes"}, **s} for s in line_sources(line, route_segments)],
            })

        by_line = {l["id"]: l for l in lines}
        for fid, f in enumerate(points, start=1):
            p = f["properties"]
            users = [by_line[i] for i in p["line_ids"] if i in by_line]
            mode = users[0]["mode"] if users else "railroad"
            # A point borrows null dates from its lines, as a segment does (decision 4); a station of
            # today's network first from the dated track it stands on (extensions.py), which is
            # nearer the mark than its line's first day.
            o, c, borrowed, undated = segment_years(p, users)
            # Only track no older than its lines' service: Caltrain's stations stand on track of
            # 1863, but most of them are far newer.
            track = [seg_display[s][0] for s in on_track.get(p["id"], []) if seg_display[s][0] is not None
                     and (o is None or seg_display[s][0] >= o)]
            if era == "present" and p["opened"] is None and track:
                o, borrowed = min(track), True
                undated = c is None
            point_feats.append({"type": "Feature", "geometry": f["geometry"], "properties": {
                "fid": fid, "id": p["id"], "name": p["name"], "kind": p["kind"], "era": era,
                "group": MODE_GROUP[mode], "status": p.get("status", ""),
                # Delimited both ends, so the map can match one line with ['in', ',id,', lines].
                "lines": "," + ",".join(p["line_ids"]) + ",",
                "open_y": round(o, 3) if o is not None else -1, "close_y": round(c, 3) if c is not None else -1,
                "borrowed": 1 if borrowed else 0, "undated": 1 if undated else 0,
                # The ideal era's layers (proposals, Matthew's network) switch on apart: a station goes with its lines.
                **({"lstatus": users[0]["status"] if users else "proposed"} if era == "ideal" else {}),
            }})

        if era == "present":
            present_display = seg_display
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

    coverage = {era: coverage[era] for era in ERAS}
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
