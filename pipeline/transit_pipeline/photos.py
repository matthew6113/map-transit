"""Line photos, downloaded at build time and never hotlinked (CLAUDE.md): `make photos`.

A line's `photo` (data/<era>/<group>/lines.json, docs/SCHEMA.md) names a public-domain image by its
Wikimedia Commons file or a direct image address (a Library of Congress JPEG, say). This step
downloads each one into data/raw/photos/ (git-ignored), resizes it for the panel and writes it,
without its metadata, to public/photos/, which is committed so the site never depends on the photo's
host. A photo that isn't downloaded yet is left out of the catalog (build.py), never drawn broken.

    uv run --directory pipeline python -m transit_pipeline.photos
"""

from __future__ import annotations

import hashlib
import json
import urllib.parse
from pathlib import Path

from .common import DATA, ROOT, fetch

PUBLIC = ROOT / "public" / "photos"
RAW = DATA / "raw" / "photos"
ERAS = ("past", "present", "future", "ideal")
MAX_W, MAX_H = 960, 720  # the panel is 360 px wide: enough for a 2x screen, cropped to 260 px tall
QUALITY = 82


def origin(photo: dict) -> str:
    """Where the image is downloaded from."""
    if "commons_file" in photo:
        return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(photo['commons_file'])}?width=2000"
    return photo["image_url"]


def photo_file(line_id: str, photo: dict) -> str:
    """The published file's name: the line and a hash of the image's origin, so a new photo gets a new
    name and no cache shows the old one."""
    key = photo.get("commons_file") or photo["image_url"]
    return f"photos/{line_id}-{hashlib.sha1(key.encode()).hexdigest()[:8]}.jpg"


def photos() -> list[tuple[str, dict]]:
    """Every line's photo, as (line id, photo)."""
    out = []
    for era in ERAS:
        for path in sorted((DATA / era).glob("*/lines.json")):
            for line in json.loads(path.read_text())["lines"]:
                if line.get("photo"):
                    out.append((line["id"], line["photo"]))
    return out


def main() -> None:
    from PIL import Image, ImageOps
    PUBLIC.mkdir(parents=True, exist_ok=True)
    wanted = set()
    for line_id, photo in photos():
        name = photo_file(line_id, photo)
        wanted.add(Path(name).name)
        dest = ROOT / "public" / name
        if dest.exists():
            continue
        raw = fetch(origin(photo), RAW / f"{Path(name).stem}.orig")
        with Image.open(raw) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            im.thumbnail((MAX_W, MAX_H), Image.LANCZOS)
            # No EXIF or other metadata: only the pixels go out.
            im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        print(f"[photos] {line_id}: {dest.relative_to(ROOT)} ({im.width}x{im.height})")
    for stale in PUBLIC.glob("*.jpg"):
        if stale.name not in wanted:
            stale.unlink()
            print(f"[photos] removed {stale.name}, no longer any line's photo")
    print(f"[photos] {len(wanted)} photos")


if __name__ == "__main__":
    main()
