"""USGS historical topographic maps, for tracing and checking past-era geometry (decision 12).

The USGS Historical Topographic Map Collection (HTMC) publishes every scanned quadrangle as a
GeoTIFF on S3, georeferenced by USGS to its neatline (NAD27 polyconic). They are public domain.

    fetch                       download the sheets in SHEETS into data/raw/usgs/, check them against
                                data/usgs-sheets.json (or pin them there with --pin), and register
                                each one in data/sources.json as a primary map
    crop SHEET OUT.png --bbox=W,S,E,N
                                a crop reprojected to Web Mercator, the map's projection, with a
                                lat/lon grid; --overlay F.geojson draws candidate geometry on it, and
                                --px draws a pixel grid for picking points
    pick CROP.json X,Y ...      pixel positions on a crop, as lon/lat
    tiles SHEET OUT.png 'A St/B Ave' ...
                                one tile per control point, centred on where it is today, with a
                                10 m grid, to read off where the sheet draws it

Tracing an old sheet (decision 12): `tiles` shows a few street corners that exist on the sheet and
today (control points), each centred on where it really is; the offset of the sheet's own drawing of
it is read off in metres. `similarity()` fits those offsets, which corrects the sheet's local
misregistration (tens of metres on the 15-minute sheets of 1895-1915; a few metres on the 1:24,000
sheets of the 1940s). The line's vertices are read off a crop drawn with --px and mapped through the
fit. data/past/<group>/trace.json keeps those pixels, so
`transit_pipeline.past` can redo every geometry.

    uv run --directory pipeline python -m transit_pipeline.usgs_topo fetch
    uv run --directory pipeline python -m transit_pipeline.usgs_topo crop usgs-san-francisco-1915 \\
        ../data/raw/usgs/crops/key-pier.png --bbox=-122.36,37.80,-122.27,37.84 --overlay ../data/past/key-system/segments.geojson

Datums: the sheets are NAD27 (the 15-minute sheets of 1895-1915 say nothing, and USGS georeferenced
them as NAD27). NAD27 is shifted to WGS84 with NOAA's NADCON grid (us_noaa_conus.tif, from OSGeo's
PROJ-data, about 5 m); without the grid PROJ would fall back to a 10-20 m approximation.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from datetime import date
from functools import cache
from pathlib import Path

import numpy as np
import pyproj
import rasterio
from PIL import Image, ImageDraw, ImageFont
from pyproj.aoi import AreaOfInterest
from rasterio.windows import Window, from_bounds

from .common import DATA, RAW, SOURCES, fetch, merge_registry, sha256, write_json

HTMC = "https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/"
RAW_USGS = RAW / "usgs"
LOCK = DATA / "usgs-sheets.json"
PROJ_DIR = RAW / "proj"
NADCON = ("us_noaa_conus.tif", "https://raw.githubusercontent.com/OSGeo/PROJ-data/master/us_noaa/us_noaa_conus.tif",
          "44611d823c48e5347500ee6afe40ff33d2b88cf817bf59f705ed4a4c3bd687d7")
BAY = AreaOfInterest(-123.0, 37.0, -121.5, 38.5)


@dataclass(frozen=True)
class Sheet:
    id: str  # also its id in data/sources.json
    quad: str
    scale: int
    edition: int  # the date on the map
    scan: str  # HTMC scan id
    printed: int | None  # imprint year, for a reprint
    note: str  # what it shows, from the collar and the index

    @property
    def file(self) -> str:
        return f"CA_{self.quad}_{self.scan}_{self.edition}_{self.scale}_geo.tif"

    @property
    def url(self) -> str:
        return HTMC + self.file.replace(" ", "%20")


# Original printings where the collection has them; a reprint only where it is the one scanned.
SHEETS = [
    Sheet("usgs-san-francisco-1899", "San Francisco", 62500, 1899, "298890", None, "15-minute sheet, surveyed 1894, edition of 1899"),
    Sheet("usgs-san-francisco-1915", "San Francisco", 62500, 1915, "298897", None, "15-minute sheet, surveyed 1894, edition of 1915"),
    Sheet("usgs-concord-1897", "Concord", 62500, 1897, "297157", None, "15-minute sheet, surveyed 1894, edition of 1897"),
    Sheet("usgs-concord-1915", "Concord", 62500, 1915, "297163", None, "15-minute sheet, surveyed 1894, edition of 1915"),
    Sheet("usgs-concord-1942", "Concord", 62500, 1942, "465521", 1942, "15-minute sheet, aerial photographs of 1939, edition of 1942"),
    Sheet("usgs-oakland-west-1949", "Oakland West", 24000, 1949, "293623", None, "7.5-minute sheet, aerial photographs of 1946, field check 1947, edition of 1949"),
    Sheet("usgs-oakland-east-1949", "Oakland East", 24000, 1949, "293613", None, "7.5-minute sheet, aerial photographs of 1946, surveyed 1947, edition of 1949"),
    Sheet("usgs-richmond-1949", "Richmond", 24000, 1949, "294669", None, "7.5-minute sheet, aerial photographs of 1946, field check 1947, edition of 1949"),
    Sheet("usgs-san-leandro-1948", "San Leandro", 24000, 1948, "300123", None, "7.5-minute sheet, edition of 1948"),
    Sheet("usgs-san-francisco-north-1950", "San Francisco North", 24000, 1950, "466304", None, "7.5-minute sheet, aerial photographs of 1946, edition of 1950"),
    Sheet("usgs-san-francisco-south-1950", "San Francisco South", 24000, 1950, "300067", None, "7.5-minute sheet, edition of 1950"),
    Sheet("usgs-san-mateo-1899", "San Mateo", 62500, 1899, "298921", None, "15-minute sheet, edition of 1899"),
    Sheet("usgs-san-mateo-1915", "San Mateo", 62500, 1915, "298922", None, "15-minute sheet, edition of 1915"),
    Sheet("usgs-san-jose-1899", "San Jose", 62500, 1899, "298900", None, "15-minute sheet, edition of 1899"),
    Sheet("usgs-san-jose-1943", "San Jose", 62500, 1943, "466308", None, "15-minute sheet, edition of 1943"),
    Sheet("usgs-tamalpais-1941", "Tamalpais", 62500, 1941, "301788", None, "15-minute sheet, aerial photographs of 1939, edition of 1941"),
    Sheet("usgs-walnut-creek-1949", "Walnut Creek", 24000, 1949, "301186", None, "7.5-minute sheet, aerial photographs of 1946, edition of 1949"),
    Sheet("usgs-port-chicago-1951", "Port Chicago", 24000, 1951, "294325", 1951, "7.5-minute sheet, aerial photographs of 1948, edition of 1951"),
    Sheet("usgs-honker-bay-1918", "Honker Bay", 31680, 1918, "296168", None, "1:31,680 sheet, edition of 1918"),
    Sheet("usgs-honker-bay-1953", "Honker Bay", 24000, 1953, "291408", 1955, "7.5-minute sheet, aerial photographs of 1949, edition of 1953"),
    Sheet("usgs-birds-landing-1953", "Birds Landing", 24000, 1953, "288442", 1954, "7.5-minute sheet, aerial photographs of 1949, edition of 1953"),
    Sheet("usgs-dozier-1952", "Dozier", 24000, 1952, "290036", 1953, "7.5-minute sheet, aerial photographs of 1949, edition of 1952"),
    # The North Pacific Coast's route, on the sheets of its years.
    Sheet("usgs-tamalpais-1897", "Tamalpais", 62500, 1897, "298980", None, "15-minute sheet, surveyed 1895, edition of 1897"),
    Sheet("usgs-petaluma-1914", "Petaluma", 62500, 1914, "298523", None, "15-minute sheet, surveyed 1912, edition of 1914"),
    Sheet("usgs-point-reyes-1916", "Point Reyes", 48000, 1916, "466171", None, "1:48,000 advance sheet, surveyed 1916"),
    Sheet("usgs-sebastopol-1935", "Sebastopol", 48000, 1935, "301575", None, "1:48,000 advance sheet, surveyed 1935"),
    Sheet("usgs-duncans-mills-1945", "Duncans Mills", 31680, 1945, "296063", None, "1:31,680 sheet, edition of 1945"),
    Sheet("usgs-cazadero-1945", "Cazadero", 31680, 1945, "302658", None, "1:31,680 sheet, surveyed 1943, edition of 1945"),
    # The San Mateo interurban, while it still ran (to 1949).
    Sheet("usgs-montara-mountain-1949", "Montara Mountain", 24000, 1949, "293071", None, "7.5-minute sheet, aerial photographs of 1946, edition of 1949"),
    Sheet("usgs-san-mateo-1949", "San Mateo", 24000, 1949, "300158", None, "7.5-minute sheet, aerial photographs of 1946, edition of 1949"),
    # The San Francisco & North Pacific: its Tiburon line, Guerneville branch and the line to Cloverdale.
    Sheet("usgs-san-quentin-1948", "San Quentin", 24000, 1948, "300194", None, "7.5-minute sheet, aerial photographs of 1947, edition of 1948"),
    Sheet("usgs-san-rafael-1954", "San Rafael", 24000, 1954, "300201", 1955, "7.5-minute sheet, aerial photographs of 1952, edition of 1954"),
    Sheet("usgs-healdsburg-1940", "Healdsburg", 62500, 1940, "297672", None, "15-minute sheet, surveyed 1933, edition of 1940"),
    Sheet("usgs-asti-1959", "Asti", 24000, 1959, "288086", 1961, "7.5-minute sheet, aerial photographs of 1957, edition of 1959"),
    Sheet("usgs-cloverdale-1960", "Cloverdale", 24000, 1960, "289371", 1962, "7.5-minute sheet, aerial photographs of 1957, edition of 1960"),
]
BY_ID = {s.id: s for s in SHEETS}


def label(sheet_id: str) -> str:
    """'USGS San Francisco 1:62,500 (1915)', for method text."""
    s = BY_ID[sheet_id]
    return f"USGS {s.quad} 1:{s.scale:,} ({s.edition})"


def _proj_grid() -> None:
    """Make NADCON available to PROJ (downloaded once, checked against its pinned hash)."""
    name, url, digest = NADCON
    path = fetch(url, PROJ_DIR / name)
    if sha256(path) != digest:
        raise SystemExit(f"[usgs] {name} doesn't match its pinned SHA-256; delete it and rerun")
    pyproj.datadir.append_data_dir(str(PROJ_DIR))


def from_wgs84(crs) -> pyproj.Transformer:
    """Lon/lat (WGS84) to the sheet's CRS, through NADCON."""
    _proj_grid()
    t = pyproj.Transformer.from_crs("EPSG:4326", crs, always_xy=True, area_of_interest=BAY)
    t.transform(-122.27, 37.80)  # PROJ picks the operation per point; check the one it used here
    used = t.get_last_used_operation().description
    if "NAD27" in pyproj.CRS(crs).to_wkt() and "(79)" not in used:
        raise SystemExit(f"[usgs] PROJ chose {used!r}, not NADCON (NAD27 to WGS 84 (79)); check {PROJ_DIR}")
    return t


def sheet_path(sheet: Sheet) -> Path:
    return RAW_USGS / sheet.file


def fetch_sheets(ids: list[str], pin: bool) -> None:
    lock = json.loads(LOCK.read_text()) if LOCK.exists() else {"sheets": {}}
    for sid in ids or [s.id for s in SHEETS]:
        sheet = BY_ID[sid]
        path = fetch(sheet.url, sheet_path(sheet))
        digest = sha256(path)
        with rasterio.open(path) as d:
            info = {"file": sheet.file, "url": sheet.url, "sha256": digest, "bytes": path.stat().st_size,
                    "pixels": [d.width, d.height], "metres_per_pixel": round(d.res[0], 3), "crs": d.crs.to_wkt()}
        have = lock["sheets"].get(sid)
        if have and have["sha256"] != digest and not pin:
            raise SystemExit(f"[usgs] {sheet.file} doesn't match data/usgs-sheets.json; rerun with --pin if USGS replaced it")
        same = have and have["sha256"] == digest
        info["fetched"] = have.get("fetched", date.today().isoformat()) if same else date.today().isoformat()
        lock["sheets"][sid] = info
        print(f"[usgs] {sid}: {sheet.file}, {info['pixels'][0]}x{info['pixels'][1]} px at {info['metres_per_pixel']} m")
    lock["$comment"] = "Generated by transit_pipeline.usgs_topo fetch: the USGS HTMC GeoTIFFs used for tracing and checking, with their hashes."
    lock["sheets"] = dict(sorted(lock["sheets"].items()))
    write_json(LOCK, lock)
    register(lock)


def register(lock: dict) -> None:
    """One primary-map source per sheet in data/sources.json."""
    entries = []
    for sid, info in lock["sheets"].items():
        s = BY_ID[sid]
        scale = f"1:{s.scale:,}"
        printed = f", printed {s.printed}" if s.printed and s.printed != s.edition else ""
        entries.append({
            "id": sid,
            "title": f"{s.quad}, Cal., topographic quadrangle, {scale}, {s.edition}{printed}",
            "author": "U.S. Geological Survey",
            "publisher": "U.S. Geological Survey, Historical Topographic Map Collection",
            "date": str(s.edition),
            "url": info["url"],
            "type": "primary_map",
            "license": "Public domain (U.S. Government work)",
            "accessed": info["fetched"],
            "notes": f"{s.note}. HTMC scan {s.scan}, GeoTIFF georeferenced by USGS (NAD27 polyconic), "
                     f"{info['metres_per_pixel']} m a pixel. SHA-256 {info['sha256']}.",
        })
    merge_registry(SOURCES, "sources", "usgs-", entries)


# --- crops -------------------------------------------------------------------------------------

MERC = pyproj.Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
MERC_INV = pyproj.Transformer.from_crs("EPSG:3857", "EPSG:4326", always_xy=True)


@dataclass(frozen=True)
class Frame:
    """A crop's pixel grid in Web Mercator, fixed by its sheet, box and zoom, so pixel positions
    written down from a crop can be turned back into lon/lat without the image."""
    sheet: str
    bbox: tuple[float, float, float, float]
    zoom: float

    @property
    def ground(self) -> float:
        """Ground metres a pixel: the sheet's own resolution over the zoom."""
        return sheet_resolution(self.sheet) / self.zoom

    @property
    def step(self) -> float:
        """Mercator metres a pixel (ground metres / cos(latitude), at the middle of the box)."""
        return self.ground / math.cos(math.radians((self.bbox[1] + self.bbox[3]) / 2))

    @property
    def origin(self) -> tuple[float, float]:
        w, _, _, n = self.bbox
        return MERC.transform(w, n)

    @property
    def size(self) -> tuple[int, int]:
        w, s, e, n = self.bbox
        (mx0, mx1), (my0, my1) = MERC.transform([w, e], [s, n])
        return int((mx1 - mx0) / self.step), int((my1 - my0) / self.step)

    def to_px(self, lon: float, lat: float) -> tuple[float, float]:
        x, y = MERC.transform(lon, lat)
        mx0, my1 = self.origin
        return (x - mx0) / self.step, (my1 - y) / self.step

    def to_merc(self, x: float, y: float) -> tuple[float, float]:
        mx0, my1 = self.origin
        return mx0 + x * self.step, my1 - y * self.step

    def to_lonlat(self, x: float, y: float) -> list[float]:
        lon, lat = MERC_INV.transform(*self.to_merc(x, y))
        return [round(lon, 6), round(lat, 6)]


@cache
def sheet_resolution(sheet_id: str) -> float:
    with rasterio.open(sheet_path(BY_ID[sheet_id])) as d:
        return d.res[0]


@cache
def sheet_bounds(sheet_id: str) -> tuple[float, float, float, float]:
    """The scan's extent in lon/lat, collar included."""
    with rasterio.open(sheet_path(BY_ID[sheet_id])) as d:
        b = d.bounds
        lon, lat = pyproj.Transformer.from_crs(d.crs, "EPSG:4326", always_xy=True).transform(
            [b.left, b.right, b.left, b.right], [b.bottom, b.bottom, b.top, b.top])
    return min(lon), min(lat), max(lon), max(lat)


def render(frame: Frame) -> np.ndarray:
    """The sheet's pixels in the frame, nearest neighbour, as an RGB array."""
    sheet = BY_ID[frame.sheet]
    path = sheet_path(sheet)
    if not path.exists():
        raise SystemExit(f"[usgs] {sheet.file} isn't downloaded; run fetch first")
    cols, rows = frame.size
    if cols * rows > 25_000_000:
        raise SystemExit("[usgs] crop too large; narrow the box or lower --zoom")
    mx0, my1 = frame.origin
    gx, gy = np.meshgrid(mx0 + (np.arange(cols) + 0.5) * frame.step, my1 - (np.arange(rows) + 0.5) * frame.step)
    lon, lat = MERC_INV.transform(gx, gy)
    with rasterio.open(path) as d:
        sx, sy = from_wgs84(d.crs).transform(lon, lat)
        # Read only the source window that covers the crop.
        win = from_bounds(np.nanmin(sx), np.nanmin(sy), np.nanmax(sx), np.nanmax(sy), d.transform)
        win = Window(math.floor(win.col_off) - 2, math.floor(win.row_off) - 2,
                     math.ceil(win.width) + 4, math.ceil(win.height) + 4)
        data = d.read(window=win, boundless=True, fill_value=255)
        c, r = ~d.window_transform(win) * (sx, sy)
    ci, ri = np.floor(c).astype(int), np.floor(r).astype(int)
    ok = (ci >= 0) & (ri >= 0) & (ci < data.shape[2]) & (ri < data.shape[1])
    rgb = np.full((rows, cols, 3), 255, np.uint8)
    for b in range(3):
        band = np.full((rows, cols), 255, np.uint8)
        band[ok] = data[min(b, data.shape[0] - 1)][ri[ok], ci[ok]]
        rgb[..., b] = band
    return rgb


def snap(frame: Frame, pts: list[tuple[float, float]], search_px: float = 8, step_px: float = 4) -> tuple[list[list[float]], float]:
    """Centre a roughly traced polyline (crop pixels) on the dark line symbol under it: every
    step_px along it, the darkness profile across it (out to search_px each side) gives a weighted
    centre. Returns the centred points (crop pixels) and the mean offset moved, in pixels."""
    img = render(frame).astype(float)
    dark = 255 - img.mean(axis=2)
    rows, cols = dark.shape
    samples = []  # (centre x, centre y, normal x, normal y, offset or None)
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        length = math.hypot(x1 - x0, y1 - y0)
        if length == 0:
            continue
        ux, uy = (x1 - x0) / length, (y1 - y0) / length
        nx, ny = -uy, ux
        offsets = np.arange(-search_px, search_px + 0.5, 0.5)
        for t in np.arange(0, length, step_px):
            cx, cy = x0 + ux * t, y0 + uy * t
            xs = np.clip(np.round(cx + nx * offsets).astype(int), 0, cols - 1)
            ys = np.clip(np.round(cy + ny * offsets).astype(int), 0, rows - 1)
            prof = dark[ys, xs]
            w = np.clip(prof - np.percentile(prof, 60), 0, None)  # only the darkest part of the profile
            samples.append((cx, cy, nx, ny, float((w * offsets).sum() / w.sum()) if w.sum() else None))
    # A moving median of the offsets, so a railroad symbol's ties don't make the centre zigzag.
    d = np.array([s_[4] if s_[4] is not None else np.nan for s_ in samples])
    smooth = np.array([np.nanmedian(d[max(0, i - 3): i + 4]) if not np.all(np.isnan(d[max(0, i - 3): i + 4])) else 0.0
                       for i in range(len(d))])
    out = [[cx + nx * o, cy + ny * o] for (cx, cy, nx, ny, _), o in zip(samples, smooth)]
    out.append(list(pts[-1]))
    return out, float(np.nanmean(np.abs(smooth))) if len(smooth) else 0.0


def fit_line(points: list[list[float]]) -> tuple[list[float], list[float], float]:
    """A straight line through points (total least squares), from the projection of the first to
    that of the last, and the RMS distance of the points from it (same units)."""
    a = np.array(points, float)
    c = a.mean(axis=0)
    _, _, vt = np.linalg.svd(a - c)
    d = vt[0]
    t = (a - c) @ d
    rms = float(np.sqrt(np.mean(((a - c) - np.outer(t, d)) ** 2) * 2))
    return list(c + d * t[0]), list(c + d * t[-1]), rms


def shift(pairs: list[tuple[tuple[float, float], tuple[float, float], str]]):
    """The mean shift from where a sheet draws control points to where they are: (lon/lat as the
    sheet draws it, true lon/lat, label). For a small cluster of controls, where a fitted rotation
    or scale wouldn't carry. Returns (lon/lat on the sheet -> true lon/lat, report)."""
    src = np.array([MERC.transform(*a) for a, _, _ in pairs], float)
    dst = np.array([MERC.transform(*b) for _, b, _ in pairs], float)
    t = (dst - src).mean(axis=0)
    cos_lat = math.cos(math.radians(float(np.mean([p[1][1] for p in pairs]))))

    def apply(lon: float, lat: float) -> list[float]:
        x, y = MERC.transform(lon, lat)
        lo, la = MERC_INV.transform(x + t[0], y + t[1])
        return [round(lo, 6), round(la, 6)]

    residuals = [{"label": label, "residual_m": round(float(np.hypot(*(q0 + t - q1))) * cos_lat, 1)}
                 for q0, q1, (_, _, label) in zip(src, dst, pairs)]
    report = {
        "scale_m_per_unit": 1.0,
        "rotation_deg": 0.0,
        "shift_m": [round(float(v) * cos_lat, 1) for v in t],
        "rms_m": round(math.sqrt(sum(r["residual_m"] ** 2 for r in residuals) / len(residuals)), 1),
        "controls": residuals,
    }
    return apply, report


def similarity(pairs: list[tuple[tuple[float, float], tuple[float, float], str]]):
    """A least-squares similarity transform (scale, rotation, shift) from where an old sheet draws
    things to where they are: pairs of (lon/lat as the sheet draws it, true lon/lat, label), usually
    street corners that exist on the sheet and today. It corrects the sheet's local misregistration.
    One pair gives a shift alone. Returns (lon/lat on the sheet -> true lon/lat, report)."""
    if not pairs:
        raise ValueError("no control points")
    src = np.array([MERC.transform(*a) for a, _, _ in pairs], float)
    dst = np.array([MERC.transform(*b) for _, b, _ in pairs], float)
    c0 = src.mean(axis=0)
    if len(pairs) == 1:
        a, b = 1.0, 0.0
    else:
        rows_, rhs = [], []
        for (px, py), (qx, qy) in zip(src - c0, dst - c0):
            rows_ += [[px, -py, 1, 0], [py, px, 0, 1]]
            rhs += [qx, qy]
        a, b, _, _ = np.linalg.lstsq(np.array(rows_), np.array(rhs), rcond=None)[0]
    # The shift that, with that scale and rotation, best fits the pairs.
    rot = np.array([[a, -b], [b, a]])
    t = (dst - (src - c0) @ rot.T).mean(axis=0)
    cos_lat = math.cos(math.radians(float(np.mean([p[1][1] for p in pairs]))))

    def fwd(x: float, y: float) -> np.ndarray:
        return rot @ (np.array([x, y]) - c0) + t

    def apply(lon: float, lat: float) -> list[float]:
        lo, la = MERC_INV.transform(*fwd(*MERC.transform(lon, lat)))
        return [round(lo, 6), round(la, 6)]

    residuals = [{"label": label, "residual_m": round(float(np.hypot(*(fwd(*q0) - q1))) * cos_lat, 1)}
                 for q0, q1, (_, _, label) in zip(src, dst, pairs)]
    report = {
        "scale_m_per_unit": round(math.hypot(a, b), 4),  # metres today per metre on the sheet
        "rotation_deg": round(math.degrees(math.atan2(b, a)), 3),
        "shift_m": [round(float(v) * cos_lat, 1) for v in (t - c0)],  # east, north
        "rms_m": round(math.sqrt(sum(r["residual_m"] ** 2 for r in residuals) / len(residuals)), 1),
        "controls": residuals,
    }
    return apply, report


def offset_pairs(controls: list[tuple[str, tuple[float, float], tuple[float, float]]]):
    """Control points read off `tiles`: (label, true lon/lat, where the sheet draws it as metres
    east and north of that) -> pairs for `similarity`."""
    out = []
    for label, (lon, lat), (de, dn) in controls:
        x, y = MERC.transform(lon, lat)
        k = 1 / math.cos(math.radians(lat))
        out.append((tuple(MERC_INV.transform(x + de * k, y + dn * k)), (lon, lat), label))
    return out


def tiles(sheet: str, corners: list[tuple[str, tuple[float, float]]], out: Path, half_m: float = 100,
          zoom: float = 4) -> None:
    """A contact sheet: one tile per control point, centred on where the point really is today
    (orange cross), with a grid every 10 m labelled in metres east and north of it, so the offset of
    the sheet's own drawing of the corner can be read off."""
    tiles_ = []
    font = ImageFont.load_default(size=12)
    for label, (lon, lat) in corners:
        dlat = half_m / 111_320
        dlon = half_m / (111_320 * math.cos(math.radians(lat)))
        frame = Frame(sheet, (lon - dlon, lat - dlat, lon + dlon, lat + dlat), zoom)
        img = Image.fromarray(render(frame)).convert("RGBA")
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(layer)
        cx, cy = frame.to_px(lon, lat)
        per_m = 1 / frame.ground
        for m in range(-int(half_m), int(half_m) + 1, 10):
            strong = m % 50 == 0
            col = (0, 90, 200, 150 if strong else 60)
            draw.line([(cx + m * per_m, 0), (cx + m * per_m, img.height)], fill=col, width=1)
            draw.line([(0, cy - m * per_m), (img.width, cy - m * per_m)], fill=col, width=1)
            if strong and m:
                draw.text((cx + m * per_m + 2, img.height - 14), f"{m:+d}", fill=(0, 60, 160, 255), font=font)
                draw.text((2, cy - m * per_m + 2), f"{m:+d}", fill=(0, 60, 160, 255), font=font)
        draw.line([(cx - 8, cy), (cx + 8, cy)], fill=(255, 120, 0, 255), width=2)
        draw.line([(cx, cy - 8), (cx, cy + 8)], fill=(255, 120, 0, 255), width=2)
        draw.rectangle([0, 0, img.width, 16], fill=(255, 255, 255, 200))
        draw.text((3, 2), label, fill=(0, 0, 0, 255), font=font)
        tiles_.append(Image.alpha_composite(img, layer).convert("RGB"))
    per_row = 4
    tw, th = max(t.width for t in tiles_), max(t.height for t in tiles_)
    sheet_img = Image.new("RGB", (tw * min(per_row, len(tiles_)) + 4 * per_row, (th + 4) * math.ceil(len(tiles_) / per_row)), "white")
    for i, t in enumerate(tiles_):
        sheet_img.paste(t, ((i % per_row) * (tw + 4), (i // per_row) * (th + 4)))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet_img.save(out, optimize=True)
    print(f"[usgs] {out.name}: {len(tiles_)} tiles, {2 * half_m:.0f} m across, grid every 10 m")


def crop(frame: Frame, out: Path, overlay: list[Path] | None = None, px_grid: int = 0,
         roads: bool = False, marks: list[tuple[float, float, str]] | None = None,
         shift_m: tuple[float, float] = (0.0, 0.0)) -> None:
    """Render the frame, with a lon/lat grid, and optionally a pixel grid, today's named roads
    (thin, labelled: to match corners for control points), overlay geometry (red) and marked
    pixels. Writes OUT.png and OUT.json (the frame, for `pick`)."""
    img = Image.fromarray(render(frame)).convert("RGBA")
    cols, rows = frame.size
    w, s, e, n = frame.bbox
    # Overlays can be moved by a shift (metres east, north), e.g. a sheet's error reversed, so
    # today's geometry lands where the sheet draws the same things.
    k_lat = 1 / 111_320
    k_lon = 1 / (111_320 * math.cos(math.radians((s + n) / 2)))

    def ov_px(lon: float, lat: float) -> tuple[float, float]:
        return frame.to_px(lon + shift_m[0] * k_lon, lat + shift_m[1] * k_lat)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    font = ImageFont.load_default(size=max(11, int(12 * min(frame.zoom, 2))))
    # Lon/lat grid, at a round spacing that gives about six lines across.
    span = max(e - w, n - s)
    spacing = min((0.0005, 0.001, 0.002, 0.005, 0.01, 0.02, 0.05), key=lambda g: abs(span / g - 6))
    for i in range(math.ceil(w / spacing), math.floor(e / spacing) + 1):
        x, _ = frame.to_px(i * spacing, s)
        draw.line([(x, 0), (x, rows)], fill=(0, 90, 200, 110), width=1)
        draw.text((x + 2, 2), f"{i * spacing:.4f}", fill=(0, 60, 160, 255), font=font)
    for j in range(math.ceil(s / spacing), math.floor(n / spacing) + 1):
        _, y = frame.to_px(w, j * spacing)
        draw.line([(0, y), (cols, y)], fill=(0, 90, 200, 110), width=1)
        draw.text((2, y + 2), f"{j * spacing:.4f}", fill=(0, 60, 160, 255), font=font)
    if px_grid:
        for x in range(0, cols, px_grid):
            draw.line([(x, 0), (x, rows)], fill=(200, 0, 160, 80), width=1)
            draw.text((x + 2, rows - 16), str(x), fill=(160, 0, 120, 255), font=font)
        for y in range(0, rows, px_grid):
            draw.line([(0, y), (cols, y)], fill=(200, 0, 160, 80), width=1)
            draw.text((cols - 40, y + 2), str(y), fill=(160, 0, 120, 255), font=font)
    if roads:
        from shapely.geometry import box

        from .gtfs import to_degrees, to_metres
        from .streets import roads as all_roads
        area = to_metres(box(w, s, e, n))
        longest: dict[str, tuple[float, list]] = {}
        for _, name, g, _ in all_roads():
            if not g.intersects(area):
                continue
            pts = [ov_px(*c) for c in to_degrees(g).coords]
            draw.line(pts, fill=(20, 140, 60, 200), width=1)
            if g.length > longest.get(name, (0, None))[0]:
                longest[name] = (g.length, pts)
        for name, (_, pts) in longest.items():
            x, y = pts[len(pts) // 2]
            draw.text((x + 3, y - 3), name, fill=(10, 110, 40, 255), font=font)
    for path_ in overlay or []:
        for f in json.loads(Path(path_).read_text())["features"]:
            g = f["geometry"]
            if g is None:
                continue
            parts = {"LineString": [g["coordinates"]], "MultiLineString": g["coordinates"]}.get(g["type"])
            if parts:
                # Magenta on a white casing: the 1940s sheets print highways in red.
                for part in parts:
                    draw.line([ov_px(*c[:2]) for c in part], fill=(255, 255, 255, 170), width=5)
                for part in parts:
                    draw.line([ov_px(*c[:2]) for c in part], fill=(200, 0, 190, 220), width=2)
            elif g["type"] == "Point":
                x, y = ov_px(*g["coordinates"][:2])
                draw.ellipse([x - 5, y - 5, x + 5, y + 5], outline=(200, 0, 190, 230), width=2)
            label = f.get("properties", {}).get("id")
            if label and (parts or g["type"] == "Point"):
                lx, ly = ov_px(*(parts[0][len(parts[0]) // 2] if parts else g["coordinates"])[:2])
                draw.text((lx + 6, ly - 6), label, fill=(170, 0, 160, 255), font=font)
    for x, y, label in marks or []:
        draw.ellipse([x - 4, y - 4, x + 4, y + 4], outline=(255, 120, 0, 255), width=2)
        if label:
            draw.text((x + 6, y + 2), label, fill=(200, 90, 0, 255), font=font)
    img = Image.alpha_composite(img, layer).convert("RGB")
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.suffix.lower() in (".jpg", ".jpeg"):
        img.save(out, quality=82, optimize=True)  # review images, small enough to commit
    else:
        img.save(out, optimize=True)
    out.with_suffix(".json").write_text(json.dumps({"sheet": frame.sheet, "bbox": list(frame.bbox), "zoom": frame.zoom}) + "\n")
    print(f"[usgs] {out.name}: {cols}x{rows} px, {frame.ground:.3f} m a pixel, grid every {spacing} deg")


def named_corner(spec: str) -> tuple[str, tuple[float, float]]:
    """'Shattuck Avenue/University Avenue' (where today's streets cross) or 'label=LON,LAT'."""
    if "=" in spec:
        label, ll = spec.split("=", 1)
        lon, lat = (float(v) for v in ll.split(","))
        return label, (lon, lat)
    from .streets import crossing
    a, b = spec.split("/")
    return spec, crossing(a, b)


def load_frame(meta_path: Path) -> Frame:
    meta = json.loads(meta_path.read_text())
    return Frame(meta["sheet"], tuple(meta["bbox"]), meta["zoom"])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    f = sub.add_parser("fetch")
    f.add_argument("ids", nargs="*")
    f.add_argument("--pin", action="store_true", help="accept new hashes (USGS replaced a scan)")
    c = sub.add_parser("crop")
    c.add_argument("sheet", choices=sorted(BY_ID))
    c.add_argument("out", type=Path)
    c.add_argument("--bbox", required=True, help="W,S,E,N in lon/lat; write it --bbox=W,S,E,N")
    c.add_argument("--zoom", type=float, default=1.0)
    c.add_argument("--overlay", type=Path, action="append")
    c.add_argument("--px", type=int, default=0, help="also draw a pixel grid this many pixels apart")
    c.add_argument("--roads", action="store_true", help="also draw today's named roads (Overture), labelled")
    c.add_argument("--mark", action="append", default=[], help="X,Y[,label]: circle a pixel")
    c.add_argument("--shift", default="0,0", help="E,N metres to move overlays and roads by (write --shift=-74,-213)")
    t = sub.add_parser("tiles")
    t.add_argument("sheet", choices=sorted(BY_ID))
    t.add_argument("out", type=Path)
    t.add_argument("corners", nargs="+", help="'Street A/Street B' (from today's roads) or 'label=LON,LAT'")
    t.add_argument("--half", type=float, default=100, help="metres from the centre to each edge")
    t.add_argument("--zoom", type=float, default=4)
    p = sub.add_parser("pick")
    p.add_argument("meta", type=Path, help="the crop's .json")
    p.add_argument("xy", nargs="+", help="X,Y pixel positions")
    a = ap.parse_args()
    if a.cmd == "fetch":
        fetch_sheets(a.ids, a.pin)
    elif a.cmd == "crop":
        marks = [(float(m.split(",")[0]), float(m.split(",")[1]), ",".join(m.split(",")[2:])) for m in a.mark]
        frame = Frame(a.sheet, tuple(float(v) for v in a.bbox.split(",")), a.zoom)
        crop(frame, a.out, a.overlay, a.px, a.roads, marks, tuple(float(v) for v in a.shift.split(",")))
    elif a.cmd == "tiles":
        tiles(a.sheet, [named_corner(c) for c in a.corners], a.out, a.half, a.zoom)
    else:
        frame = load_frame(a.meta)
        print(json.dumps([frame.to_lonlat(*map(float, xy.split(","))) for xy in a.xy]))

if __name__ == "__main__":
    main()
