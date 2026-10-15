"""Past lines a source gives street by street, cut into shared street segments (decision 12):
`make past` runs it before past.py.

Manley's report of 1909 ("Out Market from Ferry to Eddy to Devisadero to Sacramento ..."),
O'Shaughnessy's of 1929 and the Railroad Commission's abandonment orders describe each line as a run
of streets between cross streets. Lines share streets, and a street's track is one stroke
(decision 2), so each run is cut wherever another run on the same street starts or ends, and a piece
that is already a street segment (in any past group's trace.json) is reused. The group's
routes.json:

    {"area": "sf",                                   # a box of streets.AREAS
     "prefix": "sf",                                 # new segment ids: <prefix>-<street>-<cross>-<cross>
     "system": "united-railroads",                   # new segments' system
     "check": {"usgs-san-francisco-north-1950": [W, S, E, N], ...},
                                                     # the 1:24,000 sheet each piece is checked on
     "lines": {"<line id>": [                        # in route order
         {"segment": "muni-f-market-drumm-1st"},     # an existing segment, as is
         {"street": "Sutter Street", "from": "Market Street", "to": "Presidio Avenue",
          "running": ["1929-05"], "note": "..."},    # running and note go onto every piece
         {"street": "Hayes Street", "from": [lon, lat], "from_name": "Market Street", ...}]}}
                                                     # an end today's street no longer reaches

It writes the street segments it makes into the group's segments.geojson and trace.json (marked
`"routes": true` there, so a rerun replaces them), and each listed line's `route` into lines.json;
the rest of lines.json is hand-kept. A new segment cites the sources of the lines on it that support
`route`, with their pages.

    uv run --directory pipeline python -m transit_pipeline.street_routes [GROUP ...]
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from shapely.geometry import LineString, Point

from .common import DATA, write_geojson, write_json
from .gtfs import to_metres

PAST = DATA / "past"
INSIDE_M = 12.0  # a cross street this far or more from a run's ends cuts it
OVERLAP_M = 25.0  # a new piece running this far along an existing segment is reported
PRESENT_M = 60.0  # or this far along today's track


def slug(name: str) -> str:
    from .streets import norm
    return re.sub(r"[^a-z0-9]+", "-", norm(name)).strip("-")


def short(name: str) -> str:
    """'Sutter Street' -> 'Sutter St', for segment names."""
    from .streets import SUFFIX
    words = name.split()
    return " ".join(w if w.lower() not in SUFFIX else SUFFIX[w.lower()].capitalize() for w in words)


def existing() -> tuple[dict, dict[str, set[str]], dict[str, list[tuple[str, LineString]]]]:
    """Street segments already made by hand: by (street, {cross, cross}), their ends by street, and
    their geometry by street."""
    from .streets import norm
    by_key, ends, geoms = {}, {}, {}
    for trace in sorted(PAST.glob("*/trace.json")):
        recipes = json.loads(trace.read_text())["segments"]
        feats = json.loads((trace.parent / "segments.geojson").read_text())["features"]
        geom = {f["properties"]["id"]: f["geometry"] for f in feats}
        for sid, r in recipes.items():
            if r.get("routes") or len(r["parts"]) != 1:
                continue
            p = r["parts"][0]
            if "streets" not in p or len(p["streets"]) != 1 or not isinstance(p["from"], str) or not isinstance(p["to"], str):
                continue
            st = norm(p["streets"][0])
            by_key[(st, frozenset({norm(p["from"]), norm(p["to"])}))] = sid
            ends.setdefault(st, set()).update({p["from"], p["to"]})
            if sid in geom and geom[sid]:
                geoms.setdefault(st, []).append((sid, to_metres(LineString(geom[sid]["coordinates"]))))
    return by_key, ends, geoms


def check_sheet(spec: dict, coords: list[list[float]]) -> str:
    mid = coords[len(coords) // 2]
    for sheet, (w, s, e, n) in spec.items():
        if w <= mid[0] <= e and s <= mid[1] <= n:
            return sheet
    raise SystemExit(f"[street_routes] no check sheet covers {mid}")


def build(group: Path) -> None:
    from .streets import corner, norm, route
    cfg = json.loads((group / "routes.json").read_text())
    area = cfg["area"]
    by_key, ends, geoms = existing()
    lines_doc = json.loads((group / "lines.json").read_text())
    lines = {l["id"]: l for l in lines_doc["lines"]}
    missing = [i for i in cfg["lines"] if i not in lines]
    if missing:
        raise SystemExit(f"[street_routes] {group.name}: write these lines in lines.json first: {missing}")

    def end(r, which):  # (name, place): a cross street, or a lon/lat with the name of its corner
        v = r[which]
        return (r[f"{which}_name"], tuple(v)) if isinstance(v, list) else (v, v)

    # Every cross street a run on each street starts or ends at, and the hand-made segments' ends.
    nodes: dict[str, dict[str, str | tuple]] = {k: {n: n for n in v} for k, v in ends.items()}
    for runs in cfg["lines"].values():
        for r in runs:
            if "street" in r:
                nodes.setdefault(norm(r["street"]), {}).update(dict([end(r, "from"), end(r, "to")]))

    # A street cut today (redevelopment, a freeway) is bridged across gaps up to its runs' bridge_m.
    bridge: dict[str, float] = {}
    for runs in cfg["lines"].values():
        for r in runs:
            if r.get("bridge_m"):
                bridge[norm(r["street"])] = max(bridge.get(norm(r["street"]), 0.0), r["bridge_m"])

    # Today's track, drawn by the present era; a past line uses it rather than a second stroke.
    used = {r["segment"] for runs in cfg["lines"].values() for r in runs if "segment" in r}
    present = [(f["properties"]["seg"], to_metres(LineString(f["geometry"]["coordinates"])).buffer(8.0))
               for f in json.loads((DATA / "app" / "present-draw.geojson").read_text())["features"]
               if f["geometry"]["type"] == "LineString" and f["properties"]["seg"] not in used
               # a subway or BART under the street is other track
               and f["properties"].get("structure") not in ("subway", "tunnel") and f["properties"]["group"] != "heavy_rail"]
    made: dict[str, dict] = {}  # new segment id -> {street, a, b, coords, lines}
    problems, warnings = [], []  # warnings: data/app/present-draw.geojson may be a build behind
    for lid, runs in cfg["lines"].items():
        out = []
        for r in runs:
            extra = {k: r[k] for k in ("running", "note") if k in r}
            if "segment" in r:
                out.append({"segment": r["segment"], **{k: r[k] for k in ("from", "to") if k in r}, **extra})
                continue
            st = norm(r["street"])
            (fname, fplace), (tname, tplace) = end(r, "from"), end(r, "to")
            try:
                coords, length = route([r["street"]], fplace, tplace, bridge.get(st, 0.0), area=area)
            except (SystemExit, IndexError) as e:
                problems.append(f"{lid}: {r['street']} from {fname} to {tname}: {e or 'no path between the two corners'}")
                continue
            run = to_metres(LineString(coords))
            cuts = []
            for n, place in nodes[st].items():
                if norm(n) in {norm(fname), norm(tname)}:
                    continue
                try:
                    p = corner(run, place, area)
                except SystemExit:
                    continue
                near = to_metres(Point(place)).distance(p) if isinstance(place, tuple) else p.distance(run)
                at = run.project(p)
                if near < (INSIDE_M if isinstance(place, tuple) else 1.0) and INSIDE_M < at < run.length - INSIDE_M:
                    cuts.append((at, n))
            stops = [fname, *(n for _, n in sorted(cuts)), tname]
            for a, b in zip(stops, stops[1:]):
                key = (st, frozenset({norm(a), norm(b)}))
                sid = by_key.get(key)
                if sid is None:
                    x, y = sorted([a, b], key=slug)
                    sid = f"{cfg['prefix']}-{slug(r['street'])}-{slug(x)}-{slug(y)}"
                    if sid not in made:
                        px, py = nodes[st][x], nodes[st][y]
                        piece, _ = route([r["street"]], px, py, bridge.get(st, 0.0), area=area)
                        made[sid] = {"street": r["street"], "a": x, "b": y, "pa": px, "pb": py, "coords": piece, "lines": [],
                                     "bridge": bridge.get(st, 0.0)}
                        pm = to_metres(LineString(piece))
                        for other, g in present:
                            shared = pm.intersection(g).length
                            if shared > PRESENT_M:
                                warnings.append(f"{sid} runs {shared:.0f} m along today's {other}: cut it there and use it (decision 13)")
                        for other, g in geoms.get(st, []):
                            shared = pm.intersection(g.buffer(6.0)).length
                            if shared > OVERLAP_M:
                                problems.append(f"{sid} runs {shared:.0f} m along {other}: split {other} at "
                                                f"{a if a not in ends.get(st, ()) else b}")
                    if lid not in made[sid]["lines"]:
                        made[sid]["lines"].append(lid)
                out.append({"segment": sid, **extra})
        lines[lid]["route"] = out

    for p in problems:
        print(f"[street_routes] {group.name}: {p}")
    if problems:
        raise SystemExit(f"[street_routes] {group.name}: {len(problems)} problems; nothing written")

    # Segments: new ones replace the last run's; hand-made features stay as they are.
    trace_path, seg_path = group / "trace.json", group / "segments.geojson"
    trace = json.loads(trace_path.read_text()) if trace_path.exists() else {"segments": {}}
    old = {k for k, v in trace["segments"].items() if v.get("routes")}
    seg_doc = json.loads(seg_path.read_text()) if seg_path.exists() else {"features": []}
    feats = seg_doc["features"]
    # What past.py built last time stays until it rebuilds: the geometry, how it was made, the maps.
    built = {f["properties"]["id"]: f for f in feats if f["properties"]["id"] in old}
    feats = [f for f in feats if f["properties"]["id"] not in old]
    trace["segments"] = {k: v for k, v in trace["segments"].items() if k not in old}
    for sid, m in sorted(made.items()):
        users = [lines[i] for i in m["lines"]]
        cites, seen = [], set()
        for u in users:
            for s in u["sources"]:
                if "route" in s["supports"] and (s["source"], s.get("pages")) not in seen:
                    seen.add((s["source"], s.get("pages")))
                    cites.append({"source": s["source"], "supports": ["route"], **({"pages": s["pages"]} if s.get("pages") else {})})
        names = ", ".join(u.get("short_name") or u["name"] for u in users)
        prev = built.get(sid, {"geometry": None, "properties": {}})
        pp = prev["properties"]
        maps = [x for x in pp.get("sources", []) if x["supports"] == ["geometry"]]
        feats.append({"type": "Feature", "geometry": prev["geometry"], "properties": {
            "id": sid, "system": cfg["system"],
            "name": f"{short(m['street'])}, {short(m['a'])} to {short(m['b'])}",
            "opened": None, "closed": None, "structure": "street",
            "geometry_confidence": pp.get("geometry_confidence", "digitized"), "sources": cites + maps,
            "flags": ["opened_unsourced", "closed_unsourced"],
            "notes": f"Track in {m['street']}, as the route descriptions give it, for {names}.",
            "geometry_method": pp.get("geometry_method", ""),
            **({"georeference": pp["georeference"]} if "georeference" in pp else {}),
        }})
        place = lambda v: list(v) if isinstance(v, tuple) else v  # noqa: E731
        part = {"streets": [m["street"]], "from": place(m["pa"]), "to": place(m["pb"]), "area": area,
                **({"bridge_m": m["bridge"]} if m["bridge"] else {})}
        trace["segments"][sid] = {"routes": True, "parts": [part],
                                  "check": check_sheet(cfg["check"], m["coords"]), "est_error_m": 15,
                                  "note": f"In {m['street']}"}
    feats.sort(key=lambda f: f["properties"]["id"])
    write_geojson(seg_path, feats, comment=seg_doc.get("$comment"))
    write_json(trace_path, trace)
    write_json(group / "lines.json", lines_doc)
    print(f"[street_routes] {group.name}: {len(made)} street segments for {len(cfg['lines'])} lines")
    for w in warnings:
        print(f"[street_routes] {group.name}: warning: {w}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("groups", nargs="*")
    args = ap.parse_args()
    groups = [PAST / g for g in args.groups] or sorted(p.parent for p in PAST.glob("*/routes.json"))
    for g in groups:
        build(g)


if __name__ == "__main__":
    main()
