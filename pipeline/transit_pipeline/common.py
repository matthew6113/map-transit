"""Paths, the shared vocabulary, and small helpers used by every pipeline step."""

from __future__ import annotations

import hashlib
import json
import os
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "data"
RAW = DATA / "raw"
APP = DATA / "app"
SOURCES = DATA / "sources.json"
SYSTEMS = DATA / "systems.json"

VOCAB = json.loads((DATA / "schema" / "vocabulary.json").read_text())
MODE_GROUP = {mode: v["group"] for mode, v in VOCAB["modes"].items()}

# A browser-like user agent: some agency hosts refuse Python's default.
USER_AGENT = "bay-area-transit-map/0.1 (+https://github.com/matthew6113/map-transit)"


def load_env() -> None:
    """Read KEY=VALUE lines from the repo's .env (git-ignored) into the environment, without
    overriding what's already set. Secrets such as TRANSIT_511_API_KEY live there or in the
    cloud environment's settings, never in the repo."""
    path = ROOT / ".env"
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def fetch(url: str, dest: Path, timeout: int = 300, refresh: bool = False) -> Path:
    """Download url to dest (cached: an existing file is reused unless refresh). Never logs the
    URL, which may carry an API key."""
    if dest.exists() and dest.stat().st_size > 0 and not refresh:
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    tmp = dest.with_suffix(dest.suffix + ".part")
    with urllib.request.urlopen(req, timeout=timeout) as r, open(tmp, "wb") as f:
        while chunk := r.read(1 << 20):
            f.write(chunk)
    tmp.rename(dest)
    return dest


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(1 << 20):
            h.update(chunk)
    return h.hexdigest()


def write_json(path: Path, data: object) -> None:
    """Stable, diff-friendly JSON: two-space indent, UTF-8, trailing newline."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def write_geojson(path: Path, features: list[dict], comment: str | None = None) -> None:
    """GeoJSON with one feature per line, so diffs show which feature changed."""
    path.parent.mkdir(parents=True, exist_ok=True)
    head = {"type": "FeatureCollection"}
    if comment:
        head["$comment"] = comment
    lines = [json.dumps(f, ensure_ascii=False, separators=(",", ":")) for f in features]
    body = ",\n".join(lines)
    opening = json.dumps(head, ensure_ascii=False)[:-1]
    path.write_text(f'{opening}, "features": [\n{body}\n]}}\n')


def round_coords(coords, places: int = 6):
    """Round nested coordinates (6 places is about 0.1 m)."""
    if isinstance(coords, (int, float)):
        return round(coords, places)
    return [round_coords(c, places) for c in coords]


def ensure_systems(entries: list[dict]) -> None:
    """Add systems (id, name, short_name) to data/systems.json, keeping every existing entry."""
    data = json.loads(SYSTEMS.read_text()) if SYSTEMS.exists() else {"systems": []}
    have = {s["id"] for s in data["systems"]}
    data["systems"] += [e for e in entries if e["id"] not in have]
    data["systems"].sort(key=lambda e: e["id"])
    write_json(SYSTEMS, data)


def merge_registry(path: Path, key: str, prefix: str, entries: list[dict]) -> None:
    """Replace the entries this step owns (ids starting with prefix) in a shared registry file."""
    data = json.loads(path.read_text()) if path.exists() else {key: []}
    kept = [e for e in data.get(key, []) if not e["id"].startswith(prefix)]
    data[key] = sorted(kept + entries, key=lambda e: e["id"])
    write_json(path, data)
