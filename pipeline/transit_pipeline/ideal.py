"""The reference proposals' corridors (the ideal era, data/ideal/<proposal>/), from their recipes:
`make ideal`.

A proposal's document words its route ("a subway on Geary Boulevard from Market Street to 33rd
Avenue", "rail service over the Dumbarton rail bridge"); the recipe turns those words into geometry
along today's streets or track, never more precisely than the words allow, so every segment is
`approximate` and drawn dashed unless a recipe says it traces a georeferenced map. The group's
recipe.json:

    {"system": "sfcta",                              # the segments' system (data/systems.json)
     "segments": {"<segment id>": {
         "name": "Geary Blvd, Market St to 33rd Ave",
         "structure": "subway",                      # optional: tunnel, subway, elevated...
         "streets": [{"names": ["Geary Boulevard", "Geary Street"], "from": "Market Street",
                      "to": "33rd Avenue", "area": "sf"}],     # streets.route, joined in order
         "copy": "<segment id>",                     # or: another era's segment (track that exists),
         "clip": {"box": "dumbarton", "from": "Middlefield Road", "to": "University Avenue"},
                                                     # cut where today's streets cross it (BOXES)
         "method": "...",                            # how, in words: becomes geometry_method
         "sources": [{"source": "...", "supports": ["route"], "note": "..."}],
         "flags": [], "notes": "..."}}}

It writes the group's segments.geojson (generated: edit the recipe, not the file). lines.json is
hand-kept.

    uv run --directory pipeline python -m transit_pipeline.ideal [GROUP ...]
"""

from __future__ import annotations

import argparse
import json

from .common import DATA, round_coords, write_geojson

IDEAL = DATA / "ideal"
ERAS = ("present", "past", "future")
# Street boxes of this step's own (Overture, as streets.AREAS), for clipping a copied right-of-way.
BOXES = {
    "dumbarton": (-122.24, 37.455, -122.12, 37.495),  # Redwood City to East Palo Alto (the Dumbarton busway)
}


def existing_segments() -> dict:
    """Every other era's segments, by id, for `copy`."""
    out = {}
    for era in ERAS:
        for path in sorted((DATA / era).glob("*/segments.geojson")):
            for f in json.loads(path.read_text())["features"]:
                out[f["properties"]["id"]] = f
    return out


def clip(geometry: dict, spec: dict) -> dict:
    """The stretch of a line between where two of today's streets cross it."""
    from shapely.geometry import LineString
    from shapely.ops import linemerge, substring
    from . import streets
    from .gtfs import to_degrees, to_metres
    line = to_metres(LineString(geometry["coordinates"]) if geometry["type"] == "LineString"
                     else linemerge([LineString(part) for part in geometry["coordinates"]]))
    box = BOXES[spec["box"]]

    def at(name: str) -> float:
        hit = line.intersection(streets.box_street([name], spec["box"], box))
        if hit.is_empty:
            raise SystemExit(f"[ideal] {name} doesn't cross the line")
        return line.project(hit.centroid)

    a, b = sorted((at(spec["from"]), at(spec["to"])))
    piece = to_degrees(substring(line, a, b))
    return {"type": "LineString", "coordinates": round_coords([list(c) for c in piece.coords])}


def build(group, others: dict) -> int:
    from . import streets
    recipe = json.loads((group / "recipe.json").read_text())
    features = []
    for sid, spec in recipe["segments"].items():
        if "copy" in spec:
            src = others.get(spec["copy"])
            if src is None:
                raise SystemExit(f"[ideal] {group.name}/{sid}: no segment {spec['copy']} to copy")
            geometry = src["geometry"]
            if "clip" in spec:
                geometry = clip(geometry, spec["clip"])
        else:
            coords: list[list[float]] = []
            for run in spec["streets"]:
                part, _ = streets.route(run["names"], tuple(run["from"]) if isinstance(run["from"], list) else run["from"],
                                        tuple(run["to"]) if isinstance(run["to"], list) else run["to"],
                                        bridge_m=run.get("bridge_m", 0.0), area=run.get("area"))
                coords += part if not coords else part[1:]
            geometry = {"type": "LineString", "coordinates": round_coords(coords)}
        props = {
            "id": sid,
            "system": spec.get("system", recipe["system"]),
            "name": spec["name"],
            "opened": None,
            "closed": None,
            "structure": spec.get("structure"),
            # A copied right-of-way keeps its own confidence: the proposal names track that exists.
            "geometry_confidence": spec.get("confidence", src["properties"]["geometry_confidence"] if "copy" in spec else "approximate"),
            "geometry_method": spec["method"],
            # A copied segment brings the citations for its geometry along (they follow its snapshot).
            "sources": spec["sources"] + ([c for c in src["properties"]["sources"] if "geometry" in c["supports"]
                                           and c["source"] not in {x["source"] for x in spec["sources"]}] if "copy" in spec else []),
            "flags": spec.get("flags", []),
            **({"notes": spec["notes"]} if spec.get("notes") else {}),
        }
        features.append({"type": "Feature", "properties": props, "geometry": geometry})
    write_geojson(group / "segments.geojson", features,
                  comment=f"Generated by transit_pipeline.ideal from {group.name}/recipe.json. Don't edit by hand; edit the recipe and rerun.")
    return len(features)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("groups", nargs="*")
    args = ap.parse_args()
    groups = [IDEAL / g for g in args.groups] or sorted(p.parent for p in IDEAL.glob("*/recipe.json"))
    others = existing_segments()
    for g in groups:
        print(f"[ideal] {g.name}: {build(g, others)} segments")


if __name__ == "__main__":
    main()
