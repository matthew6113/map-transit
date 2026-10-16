"""Import BAM's six verified future rail lines, pinned to one BAM commit (decision 1).

BAM (matthew6113/BAM) researched these lines from official sources only and keeps them current with
its upkeep routine. Until the two maps merge, this map reads BAM's files at a pinned commit rather
than copying the research: bump BAM_COMMIT deliberately, rerun, and review the diff.

Writes data/future/bam/{lines.json, segments.geojson, points.geojson} and this step's entries in
data/sources.json and data/systems.json.

BAM's stages (proposed, entitlement, entitled, infrastructure, construction...) describe development
projects; this map's future statuses are planned, environmental, funded, under_construction and
opening. The translation is per project, from each record's stage note (STATUS below), and a line
stays flagged status_unverified until this map re-checks it.

data/future/verified.json (hand-kept) holds those re-checks: per line, the status, status_as_of,
expected_opening and last_verified found in the agency's own sources, with the citations, which
live in data/sources.json under ids not starting "bam-". It overrides BAM's translation; a line
it doesn't list keeps BAM's. `make checklists` writes docs/checks/future.md, the re-verification
list with each line's due date (docs/SCHEMA.md, "Future lines").

    uv run --directory pipeline python -m transit_pipeline.bam_sync
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from .common import DATA, RAW, SOURCES, ensure_systems, fetch, merge_registry, round_coords, write_geojson, write_json

BAM_COMMIT = "9600699ae10affa5787c1a73374c34a5fa8e4b41"
BAM_RAW = f"https://raw.githubusercontent.com/matthew6113/BAM/{BAM_COMMIT}"
BAM_BLOB = f"https://github.com/matthew6113/BAM/blob/{BAM_COMMIT}"

OUT = DATA / "future" / "bam"
VERIFIED = DATA / "future" / "verified.json"
CACHE = RAW / "bam" / BAM_COMMIT[:12]

# project id -> (system, mode, status, why). "why" quotes or paraphrases BAM's stageNote.
STATUS = {
    "bart-silicon-valley-phase-2": (
        "bart", "rapid_transit", "under_construction",
        "BAM stage 'infrastructure': early construction ahead of tunneling (launch structure dug, demolition and utility relocation at station sites).",
    ),
    "the-portal": (
        "caltrain", "commuter_rail", "environmental",
        "BAM stage 'entitled': environmentally cleared, in FTA's Engineering phase, not under construction or fully funded.",
    ),
    "cahsr-sf-sj": (
        "cahsr", "intercity_rail", "environmental",
        "BAM stage 'entitled': environmentally cleared (ROD Oct 2022); right-of-way, design and station work not started.",
    ),
    "valley-link": (
        "valley-link", "commuter_rail", "environmental",
        "BAM stage 'entitled': environmentally cleared and in design; no construction yet.",
    ),
    "smart-healdsburg": (
        "smart", "commuter_rail", "funded",
        "BAM stage 'entitled': funded, environmentally cleared and in design; construction hasn't started.",
    ),
    "smart-cloverdale": (
        "smart", "commuter_rail", "environmental",
        "BAM stage 'proposed': environmentally cleared but not yet fully funded, with no construction schedule.",
    ),
}

SYSTEM_NAMES = {
    "bart": ("Bay Area Rapid Transit", "BART"),
    "caltrain": ("Caltrain", "Caltrain"),
    "cahsr": ("California High-Speed Rail", "High-speed rail"),
    "valley-link": ("Valley Link", "Valley Link"),
    "smart": ("Sonoma-Marin Area Rail Transit", "SMART"),
}

# BAM's accuracy vocabulary -> this map's geometry_confidence (docs/SCHEMA.md).
CONFIDENCE = {"official": "surveyed", "traced": "digitized", "approximate": "approximate"}


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def host_title(url: str) -> str:
    m = re.match(r"https?://([^/]+)(/[^?#]*)?", url)
    host, path = (m.group(1), m.group(2) or "") if m else (url, "")
    path = path.rstrip("/")
    tail = path.rsplit("/", 1)[-1] if path else ""
    return f"{host.removeprefix('www.')}: {tail}" if tail else host.removeprefix("www.")


def verify(line: dict, v: dict) -> dict:
    """Apply a re-check from data/future/verified.json: the agency's own status and dates replace BAM's."""
    line.update({k: v[k] for k in ("status", "status_as_of", "expected_opening", "last_verified")})
    record = next(s for s in line["sources"] if s["source"].endswith("-record"))
    record["supports"] = ["general"]
    record.pop("note", None)
    line["sources"] = v["sources"] + line["sources"]
    line["flags"] = [f for f in line["flags"] if f != "status_unverified"
                     and not (f == "expected_opening_unsourced" and v["expected_opening"])]
    line["notes"] = v["notes"]
    return line


def main() -> None:
    projects = json.loads(fetch(f"{BAM_RAW}/data/projects.json", CACHE / "projects.json").read_text())
    verified = json.loads(VERIFIED.read_text())["lines"] if VERIFIED.exists() else {}
    by_id = {p["id"]: p for p in projects["projects"]}

    lines, segments, points, sources = [], [], [], []
    for pid, (system, mode, status, why) in STATUS.items():
        p = by_id[pid]
        geo = json.loads(fetch(f"{BAM_RAW}/data/lines/{pid}.geojson", CACHE / f"lines-{pid}.geojson").read_text())
        meta = geo["properties"]
        confidence = CONFIDENCE[meta["accuracy"]]
        license_unclear = "no license" in meta["license"].lower()

        geometry_source = f"bam-{pid}-geometry"
        record_source = f"bam-{pid}-record"
        sources.append({
            "id": geometry_source,
            "title": meta["sourceLabel"],
            "url": meta["sourceUrl"],
            "type": "dataset" if meta["sourceUrl"].startswith("https://services.arcgis.com/xOi1kZaI0eWDREZv") else "official",
            "license": meta["license"],
            "notes": f"Alignment as drawn in BAM (data/lines/{pid}.geojson at {BAM_COMMIT[:7]}). {meta['accuracyNote']}",
        })
        sources.append({
            "id": record_source,
            "title": f"Bay Area megaprojects: {p['name']} (project record, verified {p['lastVerified']})",
            "author": "Matthew Huguet",
            "url": f"{BAM_BLOB}/data/projects.json",
            "type": "dataset",
            "date": p["lastVerified"],
            "notes": "BAM records facts from official sources only (public agencies, adopted plans, hearing records, GIS).",
        })
        cited = []
        for i, url in enumerate(p["sources"], start=1):
            sid = f"bam-{pid}-src-{i}"
            sources.append({"id": sid, "title": host_title(url), "url": url, "type": "official",
                            "notes": f"Cited by BAM's {pid} record."})
            cited.append({"source": sid, "supports": ["general"]})

        route = []
        for n, f in enumerate(x for x in geo["features"] if x["properties"]["kind"] == "line"):
            fp = f["properties"]
            sid = f"{pid}-s{n + 1}"
            route.append({"segment": sid})
            note = " ".join(x for x in (fp.get("note"), fp.get("approval") and f"Approval: {fp['approval']}") if x)
            seg = {
                "id": sid,
                "system": system,
                "name": fp["name"],
                "opened": None,
                "closed": None,
                "structure": "tunnel" if fp["segment"] == "tunnel" else None,
                **({"shares_existing_track": True} if fp["segment"] == "shared" else {}),
                "geometry_confidence": "approximate" if fp["source"].startswith("constructed:") else confidence,
                "geometry_method": fp["source"],
                **({"georeference": meta["georeference"]} if "georeference" in meta else {}),
                "sources": [{"source": geometry_source, "supports": ["geometry"]}],
                "flags": ["license_unclear"] if license_unclear else [],
                **({"notes": note} if note else {}),
            }
            segments.append({"type": "Feature", "properties": seg,
                             "geometry": {"type": f["geometry"]["type"], "coordinates": round_coords(f["geometry"]["coordinates"])}})

        for f in (x for x in geo["features"] if x["properties"]["kind"] == "station"):
            fp = f["properties"]
            pt = {
                "id": f"{pid}-{slug(fp['name'])}",
                "kind": "station",
                "name": fp["name"],
                "system": system,
                "line_ids": [pid],
                "opened": None,
                "closed": None,
                "status": fp["status"],
                "geometry_confidence": confidence,
                "geometry_method": fp["source"],
                "sources": [{"source": geometry_source, "supports": ["stations"]}],
                "flags": ["license_unclear"] if license_unclear else [],
                **({"notes": fp["note"]} if fp.get("note") else {}),
            }
            points.append({"type": "Feature", "properties": pt,
                           "geometry": {"type": "Point", "coordinates": round_coords(f["geometry"]["coordinates"])}})

        line = {
            "id": pid,
            "name": p["name"],
            "system": system,
            "mode": mode,
            "era": "future",
            "opened": None,
            "closed": None,
            "status": status,
            "status_as_of": p["lastVerified"],
            "expected_opening": None,
            "last_verified": p["lastVerified"],
            "summary": p["summary"],
            "route": route,
            "links": [{"label": "Project record in the megaprojects map", "url": f"https://matthew6113.github.io/BAM/p/{pid}/"}],
            "sources": [
                {"source": record_source, "supports": ["status", "general"], "note": why},
                {"source": geometry_source, "supports": ["geometry", "stations"]},
                *cited,
            ],
            "flags": ["status_unverified", "expected_opening_unsourced"],
            "notes": f"Status translated from BAM's stage ({p['stage']}): {why} Stage note at {p['lastVerified']}: {p['stageNote']}",
        }
        lines.append(verify(line, verified[pid]) if pid in verified else line)

    write_json(OUT / "lines.json", {
        "$comment": f"Generated by transit_pipeline.bam_sync from matthew6113/BAM at {BAM_COMMIT}. Don't edit by hand; rerun.",
        "lines": lines,
    })
    write_geojson(OUT / "segments.geojson", segments,
                  comment=f"Generated by transit_pipeline.bam_sync from matthew6113/BAM at {BAM_COMMIT}.")
    write_geojson(OUT / "points.geojson", points,
                  comment=f"Generated by transit_pipeline.bam_sync from matthew6113/BAM at {BAM_COMMIT}.")
    merge_registry(SOURCES, "sources", "bam-", sources)
    ensure_systems([{"id": sid, "name": SYSTEM_NAMES[sid][0], "short_name": SYSTEM_NAMES[sid][1]}
                    for sid in sorted({v[0] for v in STATUS.values()})])
    print(f"[bam_sync] {len(lines)} lines ({sum(pid in verified for pid in STATUS)} re-verified here), "
          f"{len(segments)} segments, {len(points)} stations, {len(sources)} sources")


if __name__ == "__main__":
    main()
