"""Snapshot BAM's built basemap into public/generated/, pinned by basemap.lock.json (decision 1).

This map doesn't rebuild BAM's Overture basemap; it serves BAM's own build from this site, same-origin.
(BAM's GitHub Pages host answers CORS preflights with 405, so loading the files from BAM's site at
runtime can fail in some browsers, and BAM redeploys would change the files under us.)

    python -m transit_pipeline.basemap fetch     # download the files the lock lists, check each SHA-256
    python -m transit_pipeline.basemap refresh   # re-read BAM's site, rewrite the lock (review the diff)
    python -m transit_pipeline.basemap verify    # check public/generated/ against the lock

The deploy workflow restores the snapshot from this repo's release asset `basemap-<lock id>` (made
the first time a build finds it missing), so builds keep working if BAM's files change or move.
"""

from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path

from .common import ROOT, USER_AGENT, sha256, write_json

LOCK = ROOT / "basemap.lock.json"
OUT = ROOT / "public" / "generated"
BAM_SITE = "https://matthew6113.github.io/BAM/generated"
# The BAM commit whose source was read to list these files (its style.ts, tiles.py and fonts.py).
BAM_COMMIT = "9600699ae10affa5787c1a73374c34a5fa8e4b41"

FILES = [
    "tiles/base.pmtiles",
    "tiles/buildings-overview-all.pmtiles",
    "tiles/buildings-overview-light.pmtiles",
    "tiles/buildings-z13.pmtiles",
    "tiles/buildings-z14.pmtiles",
    "tiles/buildings-z15.pmtiles",
    "data/labels.geojson",
    "fonts/LibreFranklin-Variable.woff2",
    "fonts/LibreFranklin-Italic-Variable.woff2",
    "fonts/MegaprojectsSerif-Variable.woff2",
    "fonts/MegaprojectsSerif-Italic-Variable.woff2",
    "fonts/LibreFranklin-OFL.txt",
    "fonts/SourceSerif4-OFL.txt",
]
# Map label fontstacks (BAM pipeline fonts.py INSTANCES); glyph ranges are discovered by probing.
FONTSTACKS = [
    "Libre Franklin Regular", "Libre Franklin Medium", "Libre Franklin SemiBold", "Libre Franklin Italic",
    "Megaprojects Serif Regular", "Megaprojects Serif SemiBold", "Megaprojects Serif Italic",
]


def _request(url: str, method: str = "GET"):
    """Open a URL, retrying a few times when GitHub Pages answers 5xx under the glyph probe's load."""
    for attempt in range(5):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, method=method, headers={"User-Agent": USER_AGENT}), timeout=120)
        except urllib.error.HTTPError as e:
            if e.code < 500 or attempt == 4:
                raise
            time.sleep(2 ** attempt)


def _exists(url: str) -> bool:
    try:
        with _request(url, "HEAD") as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        raise


def discover() -> list[str]:
    """Every file to copy: the fixed list, plus each fontstack's glyph ranges that exist."""
    probes = [f"glyphs/{stack}/{start}-{start + 255}.pbf" for stack in FONTSTACKS for start in range(0, 65536, 256)]
    with ThreadPoolExecutor(8) as pool:
        found = [p for p, ok in zip(probes, pool.map(lambda p: _exists(f"{BAM_SITE}/{urllib.request.quote(p)}"), probes)) if ok]
    return FILES + found


def download(path: str, dest: Path) -> None:
    """Download one file whole. A transfer cut short (some proxies end it without an error) is retried,
    so a truncated tile can never be written to the lock."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    for attempt in range(5):
        with _request(f"{BAM_SITE}/{urllib.request.quote(path)}") as r, open(tmp, "wb") as f:
            expected = r.headers.get("Content-Length")
            while chunk := r.read(1 << 20):
                f.write(chunk)
        got = tmp.stat().st_size
        if expected is None or got == int(expected):
            tmp.rename(dest)
            return
        print(f"[basemap] {path}: got {got} of {expected} bytes, retrying", file=sys.stderr)
        time.sleep(2 ** attempt)
    tmp.unlink()
    sys.exit(f"[basemap] {path}: every download was cut short")


def refresh() -> None:
    files = discover()
    print(f"[basemap] {len(files)} files on {BAM_SITE}")
    entries = {}
    for i, path in enumerate(files, start=1):
        dest = OUT / path
        download(path, dest)
        entries[path] = {"bytes": dest.stat().st_size, "sha256": sha256(dest)}
        if i % 50 == 0 or path.startswith("tiles/"):
            print(f"[basemap] {i}/{len(files)} {path}")
    write_json(LOCK, {
        "$comment": "BAM's built basemap, as copied into public/generated/ by `make basemap`. Refresh deliberately (make basemap-refresh) and review the diff.",
        "source": BAM_SITE,
        "bam_commit_read": BAM_COMMIT,
        "fetched": date.today().isoformat(),
        "id": sha256_of_entries(entries),
        "files": entries,
    })
    print(f"[basemap] lock written: {len(entries)} files, {sum(e['bytes'] for e in entries.values()) / 1e6:.0f} MB")


def sha256_of_entries(entries: dict) -> str:
    """A short id for the whole snapshot (names the release asset)."""
    import hashlib
    h = hashlib.sha256()
    for path in sorted(entries):
        h.update(f"{path}:{entries[path]['sha256']}\n".encode())
    return h.hexdigest()[:12]


def fetch() -> None:
    lock = json.loads(LOCK.read_text())
    todo = [p for p, e in lock["files"].items() if not ((OUT / p).exists() and sha256(OUT / p) == e["sha256"])]
    print(f"[basemap] {len(lock['files']) - len(todo)} files present, {len(todo)} to download")
    with ThreadPoolExecutor(8) as pool:
        list(pool.map(lambda p: download(p, OUT / p), todo))
    verify()


def verify() -> None:
    lock = json.loads(LOCK.read_text())
    bad = [p for p, e in lock["files"].items() if not (OUT / p).exists() or sha256(OUT / p) != e["sha256"]]
    if bad:
        print(f"[basemap] {len(bad)} files differ from basemap.lock.json, e.g. {bad[:3]}.", file=sys.stderr)
        print("[basemap] BAM's deployed basemap has changed since the lock was written. Restore the release "
              "asset, or run `make basemap-refresh` and review the change.", file=sys.stderr)
        sys.exit(1)
    print(f"[basemap] {len(lock['files'])} files match basemap.lock.json ({lock['id']})")


if __name__ == "__main__":
    {"fetch": fetch, "refresh": refresh, "verify": verify}[sys.argv[1] if len(sys.argv) > 1 else "fetch"]()
