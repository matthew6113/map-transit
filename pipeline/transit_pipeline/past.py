"""Past-era geometry from its recipes (decision 12): `make past`.

Past-era data is hand-edited, except for the geometry, which is rebuilt from
data/past/<group>/trace.json so that every traced line can be redone and checked:

    {"segments": {"<segment id>": {
        "parts": [                                   # joined in order
          {"streets": ["Shattuck Avenue"], "from": "Dwight Way", "to": "Vine Street"},
          {"trace": {"sheet": "usgs-san-francisco-1915", "bbox": [W, S, E, N], "zoom": 2},
           "px": [[x, y], ...]},                     # vertices read off that crop
          {"lonlat": [[lon, lat], ...]}              # given outright (approximate only)
        ],
        "fit": {"sheet": "usgs-san-francisco-1915",  # optional: correct a traced sheet's
                "controls": [{"label": "...",         # misregistration (usgs_topo.similarity)
                              "at": "Street A/Street B" or [lon, lat],
                              "offset_m": [east, north]}]},
        "check": "usgs-oakland-west-1949",           # the map a street-routed part was checked on
        "est_error_m": 15,
        "approximate": false,                        # true: drawn dashed
        "note": "how the source places it"          # appended to geometry_method
     }},
     "points": {"<point id>": {"at": "Street A/Street B"} or {"trace": {...}, "px": [x, y]}
                              or {"lonlat": [lon, lat]}, plus check, fit, est_error_m, note}}

Street parts follow today's centerlines (streets.py, Overture). Traced parts are read off USGS
sheets (usgs_topo.py). The step writes each feature's geometry, geometry_confidence,
geometry_method and georeference, and adds its map and Overture to its sources. With --review DIR it
also draws each feature over its map, for the spot-check list.

    uv run --directory pipeline python -m transit_pipeline.past [--review ../docs/screenshots/p2a/traces]
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

from shapely.geometry import LineString

from .common import DATA, round_coords, write_geojson
from .gtfs import to_metres

PAST = DATA / "past"
JOIN_M = 40.0  # parts that should meet but end further apart than this are reported


def _frame(spec: dict):
    from .usgs_topo import Frame
    return Frame(spec["sheet"], tuple(spec["bbox"]), spec.get("zoom", 1.0))


def _fit(recipe: dict):
    """The sheet correction for a recipe, or None: (lon/lat -> lon/lat, report)."""
    fit = recipe.get("fit")
    if not fit:
        return None
    from .streets import crossing
    from .usgs_topo import offset_pairs, similarity
    controls = []
    for c in fit["controls"]:
        at = tuple(c["at"]) if isinstance(c["at"], list) else crossing(*c["at"].split("/"))
        controls.append((c["label"], at, tuple(c["offset_m"])))
    return similarity(offset_pairs(controls))


def build_part(part: dict, fit) -> tuple[list[list[float]], str, str]:
    """(lon/lat coords, method, description) for one part of a recipe."""
    if "streets" in part:
        from .streets import OVERTURE_RELEASE, route
        coords, length = route(part["streets"], _place(part["from"]), _place(part["to"]))
        names = " and ".join(part["streets"])
        return coords, "street-centerline", (f"along today's {names} centerline from {_label(part['from'])} to "
                                             f"{_label(part['to'])} ({length:.0f} m; Overture {OVERTURE_RELEASE})")
    if "trace" in part:
        frame = _frame(part["trace"])
        coords = [frame.to_lonlat(x, y) for x, y in part["px"]]
        how = "geotiff"
        if fit:
            apply, report = fit
            coords = [apply(*c) for c in coords]
            how = "similarity"
        return round_coords(coords), how, f"traced by eye from {part['trace']['sheet']} ({len(coords)} vertices)"
    if "lonlat" in part:
        return part["lonlat"], "approximate", "given point by point"
    raise SystemExit(f"[past] a part needs streets, trace or lonlat: {part}")


def _place(v):
    return tuple(v) if isinstance(v, list) else v


def _label(v) -> str:
    return f"{v[0]:.5f},{v[1]:.5f}" if isinstance(v, list) else v


def join(parts: list[list[list[float]]], sid: str) -> list[list[float]]:
    """Chain parts end to end, reversing any that run backwards."""
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
        geometry = {"type": "LineString", "coordinates": round_coords(coords)}
        methods = [b[1] for b in built]
        desc = "; then ".join(b[2] for b in built)
    approximate = recipe.get("approximate") or "approximate" in methods
    check = recipe.get("check") or next((p["trace"]["sheet"] for p in recipe.get("parts", [recipe]) if "trace" in p), None)
    sentence = desc[0].upper() + desc[1:]
    if fit:
        r = fit[1]
        sentence += (f"; the sheet corrected to today's streets by a similarity fit on {len(r['controls'])} "
                     f"control points (shift {r['shift_m'][0]:+.0f} m E, {r['shift_m'][1]:+.0f} m N, RMS {r['rms_m']} m)")
    if check and "street-centerline" in methods:
        sentence += f"; checked on {check}"
    if recipe.get("note"):
        sentence += f". {recipe['note']}"
    props["geometry_confidence"] = "approximate" if approximate else "digitized"
    props["geometry_method"] = sentence.rstrip(".") + "."
    if check and not approximate:
        main = "similarity" if fit else ("geotiff" if "geotiff" in methods else "street-centerline")
        geo = {"map": check, "method": main, "est_error_m": recipe["est_error_m"]}
        if fit:
            geo |= {k: fit[1][k] for k in ("scale_m_per_unit", "rotation_deg", "rms_m", "controls")}
        props["georeference"] = geo
    else:
        props.pop("georeference", None)
    cited = {s["source"] for s in props["sources"]}
    for sid, needed in ((check, bool(check)), (OVERTURE, "street-centerline" in methods)):
        if needed and sid not in cited:
            props["sources"].append({"source": sid, "supports": ["geometry"]})
    if kind != "point" and len(geometry["coordinates"]) >= 2:
        props_len = to_metres(LineString(geometry["coordinates"])).length
        print(f"[past] {props['id']}: {props_len:.0f} m, {props['geometry_confidence']}")
    return geometry


def review(group: Path, out: Path, feats: list[tuple[dict, dict]]) -> None:
    """Each feature drawn over the map it was traced from or checked on."""
    from .usgs_topo import Frame, crop
    tmp = out / f".{group.name}.geojson"
    for f, recipe in feats:
        check = recipe.get("check") or next((p["trace"]["sheet"] for p in recipe.get("parts", [recipe]) if "trace" in p), None)
        if not check:
            continue
        cs = f["geometry"]["coordinates"]
        cs = [cs] if f["geometry"]["type"] == "Point" else cs
        xs, ys = [c[0] for c in cs], [c[1] for c in cs]
        pad = 0.003
        bbox = (min(xs) - pad, min(ys) - pad, max(xs) + pad, max(ys) + pad)
        span_m = max((bbox[2] - bbox[0]) * 88_000, (bbox[3] - bbox[1]) * 111_000)
        from .usgs_topo import sheet_resolution
        zoom = min(2.0, max(0.25, sheet_resolution(check) * 1400 / span_m))
        out.mkdir(parents=True, exist_ok=True)
        tmp.write_text(json.dumps({"type": "FeatureCollection", "features": [f]}))
        crop(Frame(check, bbox, round(zoom, 2)), out / f"{f['properties']['id']}.png", overlay=[tmp])
    tmp.unlink(missing_ok=True)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--review", type=Path, help="draw each feature over its map into this folder")
    ap.add_argument("--only", nargs="*", help="only these feature ids")
    a = ap.parse_args()
    for group in sorted(p for p in PAST.glob("*") if (p / "trace.json").exists()):
        recipes = json.loads((group / "trace.json").read_text())
        done = []
        for file, key, kind in (("segments.geojson", "segments", "segment"), ("points.geojson", "points", "point")):
            path = group / file
            if not path.exists():
                continue
            data = json.loads(path.read_text())
            known = {f["properties"]["id"] for f in data["features"]}
            for rid in recipes.get(key, {}):
                if rid not in known:
                    raise SystemExit(f"[past] {group.name}/trace.json has a recipe for {rid}, which isn't in {file}")
            for f in data["features"]:
                pid = f["properties"]["id"]
                if pid in recipes.get(key, {}) and (not a.only or pid in a.only):
                    f["geometry"] = apply_recipe(f["properties"], recipes[key][pid], kind)
                    done.append((f, recipes[key][pid]))
            write_geojson(path, data["features"], comment=data.get("$comment"))
        if a.review:
            review(group, a.review, done)
        print(f"[past] {group.name}: {len(done)} geometries rebuilt")


if __name__ == "__main__":
    main()
