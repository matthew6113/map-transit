"""Past-era geometry from its recipes (decision 12): `make past`.

Past-era data is hand-edited, except for the geometry, which is rebuilt from
data/past/<group>/trace.json so that every traced line can be redone and checked. A present-era group
that GTFS doesn't cover (data/present/heritage/, the heritage railways) is built the same way from its
own trace.json:

    {"segments": {"<segment id>": {
        "parts": [                                   # joined in order
          {"streets": ["Shattuck Avenue"], "from": "Dwight Way", "to": "Vine Street"},  # "area": "sf" to
                                                     # keep to one box of streets.AREAS
          {"trace": {"sheet": "usgs-san-francisco-1915", "bbox": [W, S, E, N], "zoom": 2},
           "px": [[x, y], ...]},                     # vertices read off that crop
          {"ohm": [way id, ...], "from": [lon, lat], "to": [lon, lat]},
                                                     # OpenHistoricalMap ways, chained and cut
                                                     # (ohm.py; `ohm route` finds the ways)
          {"rail": [[lon, lat], [lon, lat]], "area": "napa"},
                                                     # today's track between two points, where
                                                     # it's still in place (rails.py, Overture)
          {"lonlat": [[lon, lat], ...]},             # given outright (approximate only)
          {"water": [[lon, lat], "Street A/Street B"]} # a ferry: the shortest path over water
        ],                                           # between its terminals (approximate)
        "clip": "county",                            # optional: cut where it leaves the Bay Area
                                                     # (decision 16; counties.py)
        "fit": {"sheet": "usgs-san-francisco-1915",  # optional: correct a traced sheet's
                "controls": [{"label": "...",         # misregistration (usgs_topo.similarity)
                              "at": "Street A/Street B" or [lon, lat],
                              "offset_m": [east, north]}]},
        "check": "usgs-oakland-west-1949",           # the map a street-routed part was checked on;
                                                     # a list where a long OHM feature crosses sheets
        "est_error_m": 15,
        "approximate": false,                        # true: drawn dashed
        "note": "how the source places it"          # appended to geometry_method
     }},
     "points": {"<point id>": {"at": "Street A/Street B"} or {"trace": {...}, "px": [x, y]}
                              or {"lonlat": [lon, lat]}, plus check, fit, est_error_m, note}}

Street parts follow today's centerlines (streets.py, Overture). Traced parts are read off USGS
sheets (usgs_topo.py). OHM parts are OpenHistoricalMap's ways, the first rung of the ladder: a
feature drawn only from them is `surveyed`, one that mixes them with traced or street parts is
`digitized`, and any approximate part makes it `approximate`. The step writes each feature's geometry, geometry_confidence,
geometry_method and georeference, and adds its map and Overture to its sources. With --review DIR it
also draws each feature over its map, for the spot-check list.

    uv run --directory pipeline python -m transit_pipeline.past [--review ../docs/screenshots/p2a/traces]
"""

from __future__ import annotations

import argparse
import json
import math
from collections import defaultdict
from pathlib import Path

from shapely.geometry import LineString

from .common import DATA, round_coords, write_geojson
from .gtfs import to_metres

PAST = DATA / "past"
JOIN_M = 40.0  # parts that should meet but end further apart than this are reported


def _frame(spec: dict):
    from .usgs_topo import Frame
    return Frame(spec["sheet"], tuple(spec["bbox"]), spec.get("zoom", 1.0))


FITS: dict[str, dict] = {}  # named sheet corrections: data/past/fits.json and each trace.json's "fits"


def _fit(recipe: dict):
    """The sheet correction for a recipe, or None: (lon/lat -> lon/lat, report). Controls are either
    pixels on a crop of the traced sheet matched to pixels on a crop of a better sheet ("px",
    "true_px", with the fit's "frame" and "true_frame"), or today's street corners with the offset
    read off `usgs_topo tiles` ("at", "offset_m"). "model" is "similarity" (default) or "shift"."""
    fit = recipe.get("fit")
    if not fit:
        return None
    if isinstance(fit, str):
        if fit not in FITS:
            raise SystemExit(f"[past] no fit named {fit} in data/past/fits.json or the group's trace.json")
        fit = FITS[fit]
    from .usgs_topo import offset_pairs, shift, similarity
    pairs = []
    for c in fit["controls"]:
        if "px" in c:
            pairs.append((tuple(_frame(fit["frame"]).to_lonlat(*c["px"])),
                          tuple(_frame(fit["true_frame"]).to_lonlat(*c["true_px"])), c["label"]))
        else:
            from .streets import crossing
            at = tuple(c["at"]) if isinstance(c["at"], list) else crossing(*c["at"].split("/"))
            pairs += offset_pairs([(c["label"], at, tuple(c["offset_m"]))])
    return (shift if fit.get("model") == "shift" else similarity)(pairs)


BUILT: dict[str, list[list[float]]] = {}  # segment id -> its rebuilt coords, for "join" parts
SAVED: dict[str, list[list[float]]] = {}  # segment id -> its coords as last built, for --only


def _fit_spec(recipe: dict) -> dict:
    fit = recipe.get("fit") or {}
    return FITS.get(fit, {}) if isinstance(fit, str) else fit


def build_part(part: dict, fit) -> tuple[list[list[float]], str, str]:
    """(lon/lat coords, method, description) for one part of a recipe."""
    if "join" in part:
        # Meet another segment exactly at one of its ends (it must come earlier in the file, or be
        # unchanged since the last build, when only some features are rebuilt).
        other = BUILT.get(part["join"]) or SAVED.get(part["join"])
        if other is None:
            raise SystemExit(f"[past] join to {part['join']}, which isn't built yet (order the segments)")
        end = other[0] if part.get("at", "end") == "start" else other[-1]
        return [end], "join", f"joined to {part['join']} at its {part.get('at', 'end')}"
    if "streets" in part:
        from .streets import OVERTURE_RELEASE, route
        coords, length = route(part["streets"], _place(part["from"]), _place(part["to"]), part.get("bridge_m", 0.0),
                               part.get("area"))
        names = " and ".join(part["streets"])
        gap = f", across gaps of up to {part['bridge_m']:.0f} m where the street is cut today" if part.get("bridge_m") else ""
        return coords, "street-centerline", (f"along today's {names} centerline from {_label(part['from'])} to "
                                             f"{_label(part['to'])} ({length:.0f} m; Overture {OVERTURE_RELEASE}{gap})")
    if "trace" in part:
        frame = _frame(part["trace"])
        px = [tuple(p) for p in part["px"]]
        extra = ""
        if part.get("snap"):
            # Centre the hand-read vertices on the line symbol, then keep a straight line or simplify.
            from .usgs_topo import fit_line, snap
            dense, moved = snap(frame, px, search_px=part["snap"])
            if part.get("straight"):
                a, b, rms = fit_line(dense)
                px = [tuple(a), tuple(b)]
                extra = f", centred on the line symbol and fitted straight (RMS {rms * frame.ground:.0f} m)"
            else:
                px = [tuple(c) for c in LineString(dense).simplify(1.0).coords]
                extra = ", centred on the line symbol"
        coords = [frame.to_lonlat(x, y) for x, y in px]
        how = "geotiff"
        if fit:
            apply, report = fit
            coords = [apply(*c) for c in coords]
            how = "similarity"
        from .usgs_topo import label
        return round_coords(coords), how, f"traced by eye from {label(part['trace']['sheet'])} ({len(part['px'])} hand-read points{extra})"
    if "ohm" in part:
        from . import ohm
        coords = ohm.chain(part["ohm"])
        desc = ohm.describe(part["ohm"])
        if part.get("from") or part.get("to"):
            coords = ohm.cut(coords, part.get("from"), part.get("to"))
            desc += ", cut " + " and ".join(f"{k} {_label(part[k])}" for k in ("from", "to") if part.get(k))
        if fit:  # ways an OHM mapper traced off a misregistered sheet carry its error too
            apply, _ = fit
            coords = [list(apply(*c)) for c in coords]
            return round_coords(coords), "similarity", desc + ", corrected with the sheet's fit"
        return round_coords(coords), "ohm", desc
    if "rail" in part:
        from .rails import route as along_rail
        from .streets import OVERTURE_RELEASE
        a, b = (_lonlat(x) for x in part["rail"])
        coords, length = along_rail(a, b, part["area"], tuple(part.get("names", ())))
        what = f"OpenStreetMap's {' and '.join(part['names'])}" if part.get("names") else "today's track"
        return coords, "rail", (f"along {what} from {_label(part['rail'][0])} to {_label(part['rail'][1])} "
                                f"({length:.0f} m; Overture {OVERTURE_RELEASE} rail)")
    if "lonlat" in part:
        return part["lonlat"], "approximate", "given point by point"
    if "water" in part:
        from .water import route as over_water
        from .streets import OVERTURE_RELEASE
        a, b = (_lonlat(x) for x in part["water"])
        coords, length = over_water(a, b)
        return coords, "water", (f"the shortest path over today's water from {_label(part['water'][0])} to "
                                 f"{_label(part['water'][1])} ({length:.0f} m; Overture {OVERTURE_RELEASE} land and water), "
                                 "kept off the shore: the sources give the terminals, not the course")
    raise SystemExit(f"[past] a part needs streets, trace or lonlat: {part}")


def _place(v):
    return tuple(v) if isinstance(v, list) else v


def _lonlat(v) -> tuple[float, float]:
    """[lon, lat], or today's corner "Street A/Street B"."""
    if isinstance(v, list):
        return tuple(v)
    from .streets import crossing
    return crossing(*v.split("/"))


def _label(v) -> str:
    return f"{v[0]:.5f},{v[1]:.5f}" if isinstance(v, list) else v


def join(parts: list[list[list[float]]], sid: str) -> list[list[float]]:
    """Chain parts end to end, reversing any that run backwards."""
    out = list(parts[0])
    if len(out) == 1 and len(parts) > 1:
        # Starts at a join: run the next part away from that point.
        nxt = parts[1]
        q = nxt if _d(out[0], nxt[0]) <= _d(out[0], nxt[-1]) else list(reversed(nxt))
        gap = _d(out[0], q[0])
        if gap > JOIN_M:
            print(f"[past] {sid}: the join is {gap:.0f} m from the next part; joined straight")
        out += q[1:] if gap < 0.5 else q
        parts = [out] + parts[2:]
        out = list(parts[0])
    for i, p in enumerate(parts[1:], start=1):
        if i == 1:
            # The first part may also need turning round.
            ends = [(_d(out[-1], p[0]), False, False), (_d(out[-1], p[-1]), False, True),
                    (_d(out[0], p[0]), True, False), (_d(out[0], p[-1]), True, True)]
            gap, flip_first, flip = min(ends)
            if flip_first:
                out.reverse()
        else:
            gap, _, flip = min((_d(out[-1], p[0]), False, False), (_d(out[-1], p[-1]), False, True))
        q = list(reversed(p)) if flip else list(p)
        if gap > JOIN_M:
            print(f"[past] {sid}: parts {i} and {i + 1} are {gap:.0f} m apart; joined straight")
        out += q[1:] if gap < 0.5 else q
    return out


def _d(a, b) -> float:
    return math.hypot((a[0] - b[0]) * 88_000, (a[1] - b[1]) * 111_000)  # metres, near 37.8 N


def apply_recipe(props: dict, recipe: dict, kind: str) -> dict:
    """Geometry and provenance for one feature."""
    from .streets import SOURCE_ID as OVERTURE
    fit = _fit(recipe)
    if kind == "point":
        if "at" in recipe:
            from .streets import crossing
            coords, how, desc = list(crossing(*recipe["at"].split("/"))), "street-centerline", f"at today's corner of {recipe['at'].replace('/', ' and ')}"
        elif "trace" in recipe:
            c, how, desc = build_part({"trace": recipe["trace"], "px": [recipe["px"]]}, fit)
            coords = c[0]
        else:
            coords, how, desc = recipe["lonlat"], "approximate", "given outright"
        geometry = {"type": "Point", "coordinates": coords}
        methods = [how]
    else:
        built = [build_part(p, fit) for p in recipe["parts"]]
        coords = join([b[0] for b in built], props["id"])
        desc = "; then ".join(b[2] for b in built)
        if recipe.get("clip") == "county":
            from .counties import clip
            coords, cut = clip(coords)
            desc += f"; cut where it leaves the Bay Area's nine counties ({cut / 1000:.1f} km beyond left out, decision 16)"
        BUILT[props["id"]] = coords
        geometry = {"type": "LineString", "coordinates": round_coords(coords)}
        methods = [b[1] for b in built if b[1] != "join"]
    approximate = recipe.get("approximate") or "approximate" in methods or "water" in methods
    surveyed = not approximate and bool(methods) and all(m in ("ohm", "rail") for m in methods)
    checks = _checks(recipe)
    check = checks[0] if checks else None
    sentence = desc[0].upper() + desc[1:]
    if fit:
        r = fit[1]
        spec = _fit_spec(recipe)
        kind_ = "shift" if spec.get("model") == "shift" else "similarity fit"
        sentence += (f"; the sheet corrected by a {kind_} on {len(r['controls'])} control points "
                     f"({spec.get('against', 'today')}; {r['shift_m'][0]:+.0f} m E, {r['shift_m'][1]:+.0f} m N, RMS {r['rms_m']} m)")
    if check and ("street-centerline" in methods or "ohm" in methods or "rail" in methods):
        from .usgs_topo import label
        names = [label(c) for c in checks]
        sentence += "; checked on " + (names[0] if len(names) == 1 else ", ".join(names[:-1]) + " and " + names[-1])
    if recipe.get("note"):
        sentence += f". {recipe['note']}"
    props["geometry_confidence"] = "approximate" if approximate else "surveyed" if surveyed else "digitized"
    props["geometry_method"] = sentence.rstrip(".") + "."
    if check and not approximate and not surveyed:
        main = "similarity" if fit else ("geotiff" if "geotiff" in methods else "street-centerline")
        geo = {"map": check, "method": main, "est_error_m": recipe["est_error_m"]}
        if fit:
            geo |= {k: fit[1][k] for k in ("scale_m_per_unit", "rotation_deg", "shift_m", "rms_m", "controls")}
        props["georeference"] = geo
    else:
        props.pop("georeference", None)
    cited = {s["source"] for s in props["sources"]}
    against = _fit_spec(recipe).get("true_frame", {}).get("sheet")
    from .water import SOURCE_ID as OVERTURE_BASE
    from .counties import SOURCE_ID as COUNTIES
    from .rails import SOURCE_ID as RAIL
    for sid, needed in ((RAIL, "rail" in methods), *((c, True) for c in checks), (against, bool(against)), (OVERTURE, "street-centerline" in methods),
                        (OVERTURE_BASE, "water" in methods), (COUNTIES, recipe.get("clip") == "county")):
        if needed and sid not in cited:
            props["sources"].append({"source": sid, "supports": ["geometry"]})
    if "ohm" in methods:
        from . import ohm
        ids = [w for p in recipe["parts"] for w in p.get("ohm", [])]
        note = "Ways " + ", ".join(str(w) for w in ids)
        props["sources"] = [s for s in props["sources"] if not s["source"].startswith("ohm-")]
        props["sources"].append({"source": ohm.source_id(), "supports": ["geometry"], "note": note})
    elif any(s["source"].startswith("ohm-") for s in props["sources"]):
        # A way cited by hand (compared against, not drawn from) follows the snapshot in the cache,
        # so that a fresh `ohm fetch` doesn't leave a citation to a snapshot no longer in sources.json.
        from . import ohm
        for s in props["sources"]:
            if s["source"].startswith("ohm-"):
                s["source"] = ohm.source_id()
    if kind != "point" and len(geometry["coordinates"]) >= 2:
        props_len = to_metres(LineString(geometry["coordinates"])).length
        print(f"[past] {props['id']}: {props_len:.0f} m, {props['geometry_confidence']}")
    return geometry


def _checks(recipe: dict) -> list[str]:
    """The sheets a feature was traced from or checked on, first the one it was traced from."""
    check = recipe.get("check") or next((p["trace"]["sheet"] for p in recipe.get("parts", [recipe]) if "trace" in p), None)
    return check if isinstance(check, list) else [check] if check else []


def review(group: Path, out: Path, feats: list[tuple[dict, dict]]) -> None:
    """Each feature drawn over the map it was traced from or checked on. A corrected trace is drawn
    twice: uncorrected over its own sheet (does it follow the symbol?) and corrected over the sheet
    it was corrected against (does it land in the right place?)."""
    from .usgs_topo import Frame, crop, sheet_resolution
    out.mkdir(parents=True, exist_ok=True)
    tmp = out / f".{group.name}.geojson"

    def draw(f: dict, sheet: str, name: str, within: tuple[float, float, float, float] | None = None) -> None:
        cs = f["geometry"]["coordinates"]
        cs = [cs] if f["geometry"]["type"] == "Point" else [c for part in cs for c in part] if f["geometry"]["type"] == "MultiLineString" else cs
        if within:  # only the stretch on this sheet
            cs = [c for c in cs if within[0] <= c[0] <= within[2] and within[1] <= c[1] <= within[3]] or cs
        xs, ys = [c[0] for c in cs], [c[1] for c in cs]
        pad = 0.003
        bbox = (min(xs) - pad, min(ys) - pad, max(xs) + pad, max(ys) + pad)
        span_m = max((bbox[2] - bbox[0]) * 88_000, (bbox[3] - bbox[1]) * 111_000)
        zoom = min(2.0, max(0.2, sheet_resolution(sheet) * 1000 / span_m))
        tmp.write_text(json.dumps({"type": "FeatureCollection", "features": [f]}))
        crop(Frame(sheet, bbox, round(zoom, 2)), out / f"{name}.jpg", overlay=[tmp])
        (out / f"{name}.json").unlink(missing_ok=True)  # the crop's frame, not needed for review

    for f, recipe in feats:
        checks = _checks(recipe)
        if not checks or recipe.get("routes"):
            continue
        fid = f["properties"]["id"]
        if len(checks) > 1:  # a long feature over several sheets: one image a sheet
            from .usgs_topo import sheet_bounds
            for n, sheet in enumerate(checks, 1):
                draw(f, sheet, f"{fid}-{n}", within=sheet_bounds(sheet))
            continue
        check = checks[0]
        spec = _fit_spec(recipe)
        if spec:
            raw = {**recipe, "fit": None}
            props = json.loads(json.dumps(f["properties"]))
            kept = BUILT.get(fid)
            geom = apply_recipe(props, raw, "point" if f["geometry"]["type"] == "Point" else "segment")
            if kept is not None:
                BUILT[fid] = kept  # joins use the corrected geometry
            draw({"type": "Feature", "properties": {"id": f"{fid} (as traced)"}, "geometry": geom}, check, fid)
            # Over the sheet it was corrected against, or for controls at today's corners, the
            # fit's own check sheet (a modern one), else its own sheet.
            draw(f, spec.get("true_frame", {}).get("sheet") or spec.get("check_sheet") or check, f"{fid}-corrected")
        else:
            draw(f, check, fid)
    # Street segments cut from route lists (street_routes.py): one image per line and sheet, its
    # streets together, rather than one per piece. A line with a piece rebuilt is drawn whole (from
    # the group's files, already written), so that --only doesn't leave a partial image.
    rebuilt = {f["properties"]["id"] for f, r in feats if r.get("routes")}
    if rebuilt and (group / "routes.json").exists():
        recipes = json.loads((group / "trace.json").read_text())["segments"]
        routed = {f["properties"]["id"]: (f, recipes[f["properties"]["id"]])
                  for f in json.loads((group / "segments.geojson").read_text())["features"]
                  if recipes.get(f["properties"]["id"], {}).get("routes")}
        for lid in json.loads((group / "routes.json").read_text())["lines"]:
            line = next(l for l in json.loads((group / "lines.json").read_text())["lines"] if l["id"] == lid)
            if not any(e["segment"] in rebuilt for e in line["route"]):
                continue
            by_sheet = defaultdict(list)
            for e in line["route"]:
                if e["segment"] in routed:
                    f, r = routed[e["segment"]]
                    by_sheet[r["check"]].append(f["geometry"]["coordinates"])
            for n, (sheet, parts) in enumerate(sorted(by_sheet.items())):
                name = f"{lid}-streets" + (f"-{n + 1}" if len(by_sheet) > 1 else "")
                draw({"type": "Feature", "properties": {"id": f"{lid} streets"},
                      "geometry": {"type": "MultiLineString", "coordinates": parts}}, sheet, name)
    tmp.unlink(missing_ok=True)


def _order(items: list[tuple[str, str, dict]]) -> list[tuple[str, str, dict]]:
    """(group, id, recipe) in file order, except that a recipe joining another segment comes after
    it, wherever that segment lives (an OHM segment may join a traced one in another folder)."""
    by_id = {sid: (g, sid, r) for g, sid, r in items}
    done, out = set(), []

    def visit(item, stack=()):
        g, sid, r = item
        if sid in done:
            return
        if sid in stack:
            raise SystemExit(f"[past] joins go round in a circle at {sid}")
        for part in r.get("parts", []):
            if "join" in part and part["join"] in by_id:
                visit(by_id[part["join"]], stack + (sid,))
        done.add(sid)
        out.append(item)

    for item in items:
        visit(item)
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--review", type=Path, help="draw each feature over its map into this folder")
    ap.add_argument("--only", nargs="*", help="only these feature ids")
    a = ap.parse_args()
    shared = PAST / "fits.json"
    if shared.exists():
        FITS.update({k: v for k, v in json.loads(shared.read_text()).items() if not k.startswith("$")})
    groups = sorted(p for p in PAST.glob("*") if (p / "trace.json").exists())
    groups += sorted(p for p in (DATA / "present").glob("*") if (p / "trace.json").exists())
    files, features, items = {}, {}, []
    for group in groups:
        recipes = json.loads((group / "trace.json").read_text())
        FITS.update(recipes.get("fits", {}))
        for file, key, kind in (("segments.geojson", "segments", "segment"), ("points.geojson", "points", "point")):
            path = group / file
            if not path.exists():
                continue
            data = json.loads(path.read_text())
            files[path] = data
            known = {f["properties"]["id"] for f in data["features"]}
            SAVED.update({f["properties"]["id"]: f["geometry"]["coordinates"] for f in data["features"]
                          if f.get("geometry") and f["geometry"]["type"] == "LineString"})
            for rid in recipes.get(key, {}):
                if rid not in known:
                    raise SystemExit(f"[past] {group.name}/trace.json has a recipe for {rid}, which isn't in {file}")
            for f in data["features"]:
                pid = f["properties"]["id"]
                if pid in recipes.get(key, {}):
                    features[(group, pid)] = (f, kind)
                    items.append((group, pid, recipes[key][pid]))
    done = defaultdict(list)
    for group, pid, recipe in _order(items):
        if a.only and pid not in a.only:
            continue
        f, kind = features[(group, pid)]
        f["geometry"] = apply_recipe(f["properties"], recipe, kind)
        done[group].append((f, recipe))
    for path, data in files.items():
        write_geojson(path, data["features"], comment=data.get("$comment"))
    for group in groups:
        if a.review:
            review(group, a.review, done[group])
        print(f"[past] {group.name}: {len(done[group])} geometries rebuilt")


if __name__ == "__main__":
    main()
