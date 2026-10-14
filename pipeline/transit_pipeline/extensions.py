"""Today's network, dated: data/present/extensions.json applied at build time (Phase 2b).

The present era comes from GTFS (gtfs.py) as one undated segment per line. extensions.json says
where today's lines were opened in stages, station to station, with official sources. Here each
stretch is cut out of the line's GTFS geometry once, and becomes a shared, dated segment: BART's
colors that run over the same track share one segment, so it opens once on the year slider.

    "systems": {"bart": {
        "segments": [{"id": "bart-macarthur-fremont", "name": "MacArthur to Fremont",
                      "from": "MacArthur", "to": "Fremont", "line": "bart-orange",
                      "opened": "1972-09-11", "sources": [...]}],
        "lines": {"bart-orange": {"opened": "1972-09-11", "sources": [...],
                                  "route_from": {"some-segment": {"from": "1974-09-16", "note": "..."}}}},
        "points": {"Embarcadero BART": {"opened": "1976-05-27", "sources": [...]}},
        "stations": {"Duboce portal": [lon, lat]},
        "dates": {"muni-49-brt-lanes": {"opened": "2022-04-01", "sources": [...]}}}}

A stretch is cut from its line's GTFS geometry along the shortest path between the two stations
(both ways round a loop, with "both_ways"). Where it runs over track that opened earlier, that part
is left to the older stretch, so a junction or a wye opens once. Each line of the same mode is then
rebuilt: the dated stretches that lie along it, in order, plus whatever is left over as an undated
part. The GTFS segment is dropped once nothing uses it. "dates" dates a whole segment in place, with no
cut (BRT lanes, a ferry route). This runs in build.py, so it needs no feed key
and is the same on every machine.
"""

from __future__ import annotations

import heapq
import json
import math
from pathlib import Path

from shapely.geometry import LineString, MultiLineString, Point
from shapely.ops import linemerge, nearest_points, substring, unary_union

from .common import DATA, round_coords
from .gtfs import to_degrees, to_metres

SPEC = DATA / "present" / "extensions.json"
STATION_M = 120.0  # a station this close to a line is on it (platform centroids sit off the track)
GAP_M = 40.0  # GTFS pieces of one line this close at an end are joined (merged shapes leave gaps)
ALONG_M = 25.0  # a dated segment lies along a line if this much of it is within this distance
ALONG_SHARE = 0.9
REST_MIN_M = 150.0  # leftovers shorter than this are slivers between dated stretches
TRIM_MIN_M = 60.0  # pieces of a stretch shorter than this, once older track is taken out, are slivers
END_NAME_M = 150.0  # a split piece's end this close to a station takes its name
RUN_M = 100.0  # a line within ALONG_M of a stretch for this long runs along it (shorter: it crosses)
SPLIT_MIN_M = 20.0  # no split this close to an end, or to another split


def _lines_of(g) -> list[LineString]:
    if isinstance(g, LineString):
        return [g] if not g.is_empty else []
    return [p for p in getattr(g, "geoms", []) if isinstance(p, LineString) and not p.is_empty]


def _merge(g) -> list[LineString]:
    """The parts of a line geometry, joined end to end where they meet."""
    parts = _lines_of(g)
    return _lines_of(linemerge(MultiLineString(parts))) if len(parts) > 1 else parts


def _geom(feature: dict):
    g = feature["geometry"]
    parts = [g["coordinates"]] if g["type"] == "LineString" else g["coordinates"]
    return to_metres(MultiLineString([p for p in parts if len(p) >= 2]))


def _to_geojson(g) -> dict:
    parts = [round_coords([list(c) for c in to_degrees(p).coords]) for p in _lines_of(g)]
    if len(parts) == 1:
        return {"type": "LineString", "coordinates": parts[0]}
    return {"type": "MultiLineString", "coordinates": parts}


def _key(p) -> tuple[float, float]:
    return (round(p[0], 1), round(p[1], 1))


def _graph(line_geom, stops: list[Point]) -> dict:
    """The line's pieces as a graph, split at the stops; a loose end within GAP_M of another piece
    is joined to it (GTFS shapes merged per line leave such gaps)."""
    parts = _merge(line_geom)
    cuts: dict[int, set[float]] = {i: {0.0, p.length} for i, p in enumerate(parts)}
    links = []
    for i, p in enumerate(parts):
        for end in (Point(p.coords[0]), Point(p.coords[-1])):
            others = [(q.distance(end), j) for j, q in enumerate(parts) if j != i]
            if not others:
                continue
            d, j = min(others)
            if d <= GAP_M:  # an end on, or near, the middle of another piece: a junction
                t = parts[j].project(end)
                cuts[j].add(t)
                if d > 1e-9:  # even a hair's gap, or the two ends could round to different nodes
                    links.append(LineString([end, parts[j].interpolate(t)]))
    for s in stops:
        i = min(range(len(parts)), key=lambda k: parts[k].distance(s))
        cuts[i].add(parts[i].project(s))
    graph: dict[tuple, list[tuple[tuple, float, LineString]]] = {}

    def add(piece: LineString) -> None:
        u, v = _key(piece.coords[0]), _key(piece.coords[-1])
        graph.setdefault(u, []).append((v, piece.length, piece))
        graph.setdefault(v, []).append((u, piece.length, piece))

    for i, p in enumerate(parts):
        ts = sorted(cuts[i])
        for x, y in zip(ts, ts[1:]):
            if y - x > 0.05:
                add(substring(p, x, y))
    for link in links:
        add(link)
    return graph


def _shortest(graph: dict, src, dst, penalty: dict | None = None) -> list[LineString] | None:
    dist, prev, queue = {src: 0.0}, {}, [(0.0, src)]
    while queue:
        d, u = heapq.heappop(queue)
        if u == dst:
            break
        if d > dist.get(u, float("inf")):
            continue
        for v, w, piece in graph[u]:
            w = w * (penalty or {}).get(id(piece), 1.0)
            if d + w < dist.get(v, float("inf")):
                dist[v], prev[v] = d + w, (u, piece)
                heapq.heappush(queue, (d + w, v))
    if dst not in dist:
        return None
    pieces, v = [], dst
    while v != src:
        u, piece = prev[v]
        pieces.append(piece)
        v = u
    return pieces


def _cut(line_geom, a: Point, b: Point, both_ways: bool = False):
    """The stretch of a line between two stations: the shortest path along its pieces, and with
    both_ways the way back too (round a loop, or a pair of one-way streets)."""
    if line_geom.distance(a) > STATION_M or line_geom.distance(b) > STATION_M:
        return None
    a_on, b_on = nearest_points(line_geom, a)[0], nearest_points(line_geom, b)[0]
    graph = _graph(line_geom, [a_on, b_on])
    src = min(graph, key=lambda k: Point(k).distance(a_on))
    dst = min(graph, key=lambda k: Point(k).distance(b_on))
    if src == dst:
        return None
    there = _shortest(graph, src, dst)
    if there is None:
        return None
    pieces = list(there)
    if both_ways:
        back = _shortest(graph, dst, src, penalty={id(p): 20.0 for p in there}) or []
        pieces += [p for p in back if all(p is not q for q in there)]
    merged = _merge(unary_union(pieces))
    return merged[0] if len(merged) == 1 else MultiLineString(merged)


def _trim(cut, older):
    """A stretch less the track that opened before it, its ends drawn on to meet that track."""
    if older is None or older.is_empty:
        return cut
    rest = [p for p in _lines_of(cut.difference(older.buffer(ALONG_M))) if p.length >= TRIM_MIN_M]
    out = []
    for p in rest:
        cs = list(p.coords)
        for at in (0, -1):
            end = Point(cs[at])
            if end.distance(older) <= ALONG_M + 1:
                q = nearest_points(older, end)[0].coords[0]
                cs = [q, *cs] if at == 0 else [*cs, q]
        out.append(LineString(cs))
    if not out:
        return None
    return out[0] if len(out) == 1 else MultiLineString(out)


def _split(cut, others: list, start: Point) -> list[LineString]:
    """A stretch split where the lines along it part, so each piece is used whole by its lines (the
    Blue line runs over only some of MacArthur to Fremont). Pieces run from the stretch's start."""
    out = []
    for part in sorted(_lines_of(cut), key=lambda q: q.distance(start)):
        if Point(part.coords[-1]).distance(start) < Point(part.coords[0]).distance(start):
            part = LineString(part.coords[::-1])
        at = []
        for g in others:
            for q in _lines_of(part.intersection(g.buffer(ALONG_M))):
                if q.length >= RUN_M:  # running along, not crossing
                    at += [part.project(Point(q.coords[0])), part.project(Point(q.coords[-1]))]
        cuts: list[float] = []
        for t in sorted(t for t in at if SPLIT_MIN_M < t < part.length - SPLIT_MIN_M):
            if not cuts or t - cuts[-1] >= SPLIT_MIN_M:  # lines parting at one junction, metres apart
                cuts.append(t)
        ts = [0.0, *cuts, part.length]
        out += [substring(part, x, y) for x, y in zip(ts, ts[1:])]
    return out


def _along(seg, line_geom) -> bool:
    near = seg.intersection(line_geom.buffer(ALONG_M))
    return near.length >= ALONG_SHARE * seg.length


def _position(seg, line_geom) -> tuple[int, float]:
    """Where a piece sits along a line: (part index, distance along it), for ordering a route."""
    mid = seg.interpolate(0.5, normalized=True) if isinstance(seg, LineString) else seg.centroid
    parts = _merge(line_geom)
    i = min(range(len(parts)), key=lambda k: parts[k].distance(mid))
    return i, parts[i].project(mid)


def _line_dates(line: dict, spec_line: dict) -> None:
    if spec_line.get("earlier_mode"):  # build.py draws its track in that mode until then
        line["earlier_mode"] = spec_line["earlier_mode"]
    if spec_line.get("opened"):
        line["opened"] = spec_line["opened"]
        line["flags"] = [f for f in line["flags"] if f != "opened_unsourced"]
    line["flags"] += [f for f in spec_line.get("flags", []) if f not in line["flags"]]
    line["sources"] = line["sources"] + spec_line.get("sources", [])
    if spec_line.get("notes"):
        line["notes"] = (line.get("notes", "") + " " + spec_line["notes"]).strip()


def apply(lines: list[dict], segments: dict[str, dict], points: list[dict],
          spec_path: Path = SPEC) -> tuple[dict, dict[str, list[str]], dict[str, list[str]]]:
    """Rewrite the present era in place from extensions.json. Returns a summary per system; for each
    station, the dated segments it stands on (a station with no date of its own borrows theirs for
    display, as decision 4 lets a segment borrow from its lines); and the pieces each stretch was
    split into, in order, for past lines that name a stretch (decision 13)."""
    if not spec_path.exists():
        return {}, {}, {}
    spec = json.loads(spec_path.read_text())
    summary, on_track, pieces_of = {}, {}, {}
    for sys_id, sysspec in spec.get("systems", {}).items():
        sys_lines = [l for l in lines if l["system"] == sys_id]
        if not sys_lines:
            raise SystemExit(f"[extensions] no present lines for system {sys_id}")
        by_id = {l["id"]: l for l in sys_lines}
        sys_points = [p for p in points if p["properties"]["system"] == sys_id]
        stations = {p["properties"]["name"].lower(): to_metres(Point(p["geometry"]["coordinates"])) for p in sys_points}
        stations.update({k.lower(): to_metres(Point(v)) for k, v in sysspec.get("stations", {}).items()})
        # A whole segment dated as it is: no cut (BRT lanes, a ferry route).
        mine_segs = {r["segment"] for l in sys_lines for r in l["route"]}
        for sid, d in sysspec.get("dates", {}).items():
            if sid not in mine_segs:
                raise SystemExit(f"[extensions] dates: {sid} isn't a segment of {sys_id}'s present lines")
            props = segments[sid]["properties"]
            props["opened"] = d["opened"]
            props["flags"] = [f for f in props["flags"] if f != "opened_unsourced"] + list(d.get("flags", []))
            props["sources"] = props["sources"] + d["sources"]
            if d.get("notes"):
                props["notes"] = d["notes"]
        geom = {l["id"]: unary_union([_geom(segments[r["segment"]]) for r in l["route"]]) for l in sys_lines}
        base = {l["id"]: segments[l["route"][0]["segment"]]["properties"] for l in sys_lines}

        # Oldest first, so where two stretches share track the older one keeps it. ISO dates sort as
        # text, a year before any day in it.
        specs = sorted(sysspec.get("segments", []), key=lambda d: d.get("opened") or "9999")
        dated: dict[str, tuple] = {}  # id -> (geometry, properties, mode, start)
        whole_line: dict[str, str] = {}  # id -> the line it was cut from
        for d in specs:
            try:
                a, b = stations[d["from"].lower()], stations[d["to"].lower()]
            except KeyError as e:
                raise SystemExit(f"[extensions] {d['id']}: no station {e} in {sys_id}'s stations") from None
            if d["line"] not in by_id:
                raise SystemExit(f"[extensions] {d['id']}: no present line {d['line']} in {sys_id}")
            cut = _cut(geom[d["line"]], a, b, d.get("both_ways", False))
            if cut is None:
                raise SystemExit(f"[extensions] {d['id']}: {d['line']} doesn't run from {d['from']} to {d['to']}")
            mode = by_id[d["line"]]["mode"]
            older = [g for g, _, m, _ in dated.values() if m == mode]
            cut = _trim(cut, unary_union(older) if older else None)
            if cut is None:
                raise SystemExit(f"[extensions] {d['id']}: all of it is older track")
            b0 = base[d["line"]]
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
            dated[d["id"]] = (cut, props, mode, a)
            whole_line[d["id"]] = d["line"]

        # Split each stretch where its lines part; a piece is named for the stations at its ends.
        names = {p["properties"]["name"].lower(): p["properties"]["name"] for p in sys_points}
        names.update({k.lower(): k for k in sysspec.get("stations", {})})

        def end_name(q: Point) -> str | None:
            near = min(((stations[k].distance(q), k) for k in stations), default=(math.inf, None))
            return names[near[1]] if near[0] <= END_NAME_M else None

        whole = dated
        dated, base_of = {}, {}  # piece id -> (geometry, properties, lines along it); -> stretch id
        for sid, (cut, props, mode, start) in whole.items():
            same = [l for l in sys_lines if l["mode"] == mode]
            groups: dict[frozenset, list[LineString]] = {}
            for piece in _split(cut, [geom[l["id"]] for l in same], start):
                users = frozenset(l["id"] for l in same if _along(piece, geom[l["id"]])) or frozenset([whole_line[sid]])
                groups.setdefault(users, []).append(piece)
            for i, (users, pieces) in enumerate(groups.items(), start=1):
                pid = sid if len(groups) == 1 else f"{sid}-{i}"
                merged = _merge(unary_union(pieces))
                g = merged[0] if len(merged) == 1 else MultiLineString(merged)
                ends = [Point(merged[0].coords[0]), Point(merged[-1].coords[-1])]
                a_name, b_name = end_name(ends[0]), end_name(ends[1])
                name = props["name"] if len(groups) == 1 else (
                    f"{a_name} to {b_name}" if len(merged) == 1 and a_name and b_name and a_name != b_name
                    else f"{props['name']}, part {i} of {len(groups)}")
                dated[pid] = (g, {**props, "id": pid, "name": name}, users)
                base_of[pid] = sid
                pieces_of.setdefault(sid, []).append(pid)

        used: set[str] = set()
        for line in sys_lines:
            g = geom[line["id"]]
            spec_line = sysspec.get("lines", {}).get(line["id"], {})
            # Only stretches of the line's own mode: the F on Market St isn't the subway under it.
            pieces = [(sid, s) for sid, (s, _, users) in dated.items() if line["id"] in users]
            if not pieces:
                if spec_line.get("route_from"):
                    raise SystemExit(f"[extensions] {line['id']}: route_from, but nothing dated along the line")
                _line_dates(line, spec_line)
                continue
            covered = unary_union([s for _, s in pieces]).buffer(ALONG_M) if pieces else None
            rest = [p for p in _lines_of(g.difference(covered) if covered else g) if p.length >= REST_MIN_M]
            route = []
            for sid, s in pieces:
                route.append((_position(s, g), {"segment": sid, **spec_line.get("route_from", {}).get(base_of[sid], {})}))
            for i, p in enumerate(rest, start=1):
                rid = f"{line['id']}-undated-{i}"
                b0 = base[line["id"]]
                segments[rid] = {"type": "Feature", "geometry": _to_geojson(p), "properties": {
                    "id": rid, "system": sys_id, "name": f"{line['name']}, part not yet dated",
                    "opened": None, "closed": None, "geometry_confidence": b0["geometry_confidence"],
                    "geometry_method": f"{b0['geometry_method']}; the part not covered by a dated stretch",
                    "sources": b0["sources"], "flags": ["opened_unsourced"]}}
                route.append((_position(p, g), {"segment": rid}))
            missing = set(spec_line.get("route_from", {})) - {base_of[sid] for sid, _ in pieces}
            if missing:
                raise SystemExit(f"[extensions] {line['id']}: route_from names {', '.join(sorted(missing))}, not on the line")
            used.update(r["segment"] for r in line["route"])
            line["route"] = [r for _, r in sorted(route, key=lambda x: x[0])]
            _line_dates(line, spec_line)
        for sid, (s, props, _) in dated.items():
            segments[sid] = {"type": "Feature", "geometry": _to_geojson(s), "properties": props}
        still = {r["segment"] for l in lines for r in l["route"]}
        for sid in used - still:
            segments.pop(sid, None)

        named = {k.lower(): v for k, v in sysspec.get("points", {}).items()}
        for p in sys_points:
            pp = p["properties"]
            own = named.pop(pp["name"].lower(), None)
            if own:
                pp["opened"] = own["opened"]
                pp["flags"] = [f for f in pp["flags"] if f != "opened_unsourced"]
                pp["sources"] = pp["sources"] + own["sources"]
                if own.get("notes"):
                    pp["notes"] = own["notes"]
            here = to_metres(Point(p["geometry"]["coordinates"]))
            mine = {r["segment"] for lid in pp["line_ids"] if lid in by_id for r in by_id[lid]["route"]}
            on_track[pp["id"]] = sorted(sid for sid in mine & set(dated) if dated[sid][0].distance(here) <= STATION_M)
        if named:
            raise SystemExit(f"[extensions] {sys_id}: no station named {', '.join(named)}")
        summary[sys_id] = {"dated": len(dated), "undated_parts": sum(1 for s in segments if s.startswith(tuple(
            l["id"] + "-undated-" for l in sys_lines)))}
    return summary, on_track, pieces_of
