"""Different modes on the same path, drawn side by side close in (decision 10; docs/DECISIONS.md).

On Market St, BART and Muni Metro run in stacked subways with the F on the street above, all within a
few metres, so one stroke would hide the others. Where lines of *different* mode groups run within
SHARE_M of each other for at least MIN_SHARED_M, each is split into pieces and every piece gets a slot,
`off`: 0 when it runs alone, otherwise its place across the path, centred on zero (-1, 0, 1 for three
modes; -0.5, 0.5 for two). The map multiplies `off` by a zoom-dependent spacing (src/eras/layers.ts),
so the lines spread apart only close in. One mode's shared track (BART's colors, Muni Metro's letters)
stays one stroke (decision 2).

The slots keep the real order across the path: each piece measures, in its own direction of travel,
which side the other modes lie on. Stacked tunnels (within TIE_M) are ordered by mode, in a fixed
compass frame, so two lines running opposite ways agree on who goes where. MapLibre offsets a line to
the right of its own direction, so a slot computed in the piece's own frame needs no flipping.

A crossing street touches a line for only a few dozen metres, under MIN_SHARED_M, so it never jogs.

In the past era the slots are time-aware: two lines count as alongside only if their display dates
overlap, so a streetcar torn up in 1935 never pushes aside an interurban laid on its street in 1940.
A line that ever shared the path with another mode is offset for its whole life, and undated features
(off the slider) push nothing aside. Present lines, which the past era also draws, keep their
present-era slots: the two datasets are compared once the present network has dates (Phase 2b).
"""

from __future__ import annotations

import math

from shapely.geometry import LineString, Point
from shapely.ops import nearest_points, substring, unary_union

from .common import round_coords
from .gtfs import to_degrees, to_metres

SHARE_M = 12.0  # lines this close run on the same path (Market St's three are within 0-7 m)
MIN_SHARED_M = 150.0  # a shorter brush is a crossing, not a shared path
TIE_M = 4.0  # this close, stacked: ordered by mode, not by position
MIN_PIECE_M = 60.0  # a shorter piece (where shared runs start a few metres apart) joins its neighbour
SAMPLE_M = 25.0
ORDER = ["heavy_rail", "commuter_rail", "interurban", "light_rail", "streetcar", "cable", "brt", "ferry", "heritage"]
# The compass direction ties are ordered along, chosen oblique to the Bay Area's street grids.
CANON = (math.cos(math.radians(20)), math.sin(math.radians(20)))


def _lines(g) -> list[LineString]:
    return [p for p in getattr(g, "geoms", [g]) if isinstance(p, LineString) and not p.is_empty]


class Paths:
    """The geometry of each mode group in one era's dataset, in metres. With `timed`, each feature
    keeps its display dates (open_y, close_y), and only features whose dates overlap are compared."""

    def __init__(self, features: list[dict], timed: bool = False):
        self.timed = timed
        self.items: list[tuple[str, LineString, tuple[float, float] | None]] = []
        for f in features:
            p = f["properties"]
            if timed and p["undated"]:
                continue
            span = (p["open_y"], p["close_y"]) if timed else None
            for part in _parts(f["geometry"]):
                if len(part) >= 2:
                    self.items.append((p["group"], to_metres(LineString(part)), span))
        self._layers: dict[tuple[int, ...], tuple[dict, dict]] = {}

    def layers(self, span: tuple[float, float] | None) -> tuple[dict, dict]:
        """The geometry and SHARE_M zone of each mode group alive during `span` (all of them when
        the era isn't timed)."""
        alive = tuple(i for i, (_, _, s) in enumerate(self.items) if span is None or s is None or _overlap(span, s))
        if alive not in self._layers:
            by_group: dict[str, list] = {}
            for i in alive:
                by_group.setdefault(self.items[i][0], []).append(self.items[i][1])
            geom = {g: unary_union(v) for g, v in by_group.items()}
            self._layers[alive] = (geom, {g: x.buffer(SHARE_M) for g, x in geom.items()})
        return self._layers[alive]

    def split(self, part: list[list[float]], group: str,
              span: tuple[float, float] | None = None) -> list[tuple[list[list[float]], float]]:
        """One line part (lon/lat) as pieces in order, each with its slot `off`. In a timed era,
        `span` is the feature's display dates, None when it's undated (and never offset)."""
        if self.timed and span is None:
            return [(part, 0.0)]
        geom, zones = self.layers(span)
        line = to_metres(LineString(part))
        runs: dict[str, list[tuple[float, float]]] = {}
        for h, zone in zones.items():
            if h == group or not line.intersects(zone):
                continue
            spans = []
            for p in _lines(line.intersection(zone)):
                if p.length >= MIN_SHARED_M:
                    a, b = line.project(Point(p.coords[0])), line.project(Point(p.coords[-1]))
                    spans.append((min(a, b), max(a, b)))
            if spans:
                runs[h] = spans
        if not runs:
            return [(part, 0.0)]

        cuts = sorted({0.0, line.length, *(x for spans in runs.values() for s in spans for x in s)})
        pieces: list[list] = []  # [start, end, groups alongside]
        for a, b in zip(cuts, cuts[1:]):
            if b - a < 1.0:
                continue
            mid = (a + b) / 2
            alongside = frozenset(h for h, spans in runs.items() if any(x <= mid <= y for x, y in spans))
            if pieces and pieces[-1][2] == alongside:
                pieces[-1][1] = b
            else:
                pieces.append([a, b, alongside])

        # Shared runs of different modes start and end a few metres apart: fold those slivers into the
        # piece before (or after), so the line doesn't jog.
        kept: list[list] = []
        for piece in pieces:
            if piece[1] - piece[0] < MIN_PIECE_M and kept:
                kept[-1][1] = piece[1]
            elif kept and kept[-1][1] - kept[-1][0] < MIN_PIECE_M:
                piece[0] = kept[-1][0]
                kept[-1] = piece
            else:
                kept.append(piece)

        out: list[tuple[list[list[float]], float]] = []
        for a, b, alongside in kept:
            seg = substring(line, a, b)
            off = _slot(seg, group, alongside, geom) if alongside else 0.0
            coords = round_coords([list(c) for c in to_degrees(seg).coords])
            if out and out[-1][1] == off:
                out[-1] = (out[-1][0] + coords[1:], off)  # same slot: one piece
            else:
                out.append((coords, off))
        return out


def _slot(seg: LineString, group: str, alongside: frozenset, geom: dict) -> float:
    """This piece's place across the path among the modes alongside, centred on zero, to the right
    of its own direction of travel."""
    (x0, y0), (x1, y1) = seg.coords[0], seg.coords[-1]
    forward = (x1 - x0) * CANON[0] + (y1 - y0) * CANON[1] >= 0
    pos = {group: 0.0}
    for h in alongside:
        d = _side(seg, geom[h])
        if abs(d) < TIE_M:  # stacked: by mode order, left to right along the compass frame
            d = (ORDER.index(h) - ORDER.index(group)) * 1e-3 * (1 if forward else -1)
        pos[h] = d
    ranked = sorted(pos, key=lambda g: pos[g])
    return ranked.index(group) - (len(ranked) - 1) / 2


def _overlap(a: tuple[float, float], b: tuple[float, float]) -> bool:
    """Two display spans share some time (a line closing the year another opens doesn't count)."""
    return a[0] < b[1] and b[0] < a[1]


def _side(seg: LineString, other) -> float:
    """The mean signed distance of `other` from `seg`, positive to the right of seg's direction."""
    n = max(2, int(seg.length // SAMPLE_M))
    total, count = 0.0, 0
    for i in range(n):
        t = seg.length * (i + 0.5) / n
        p, ahead = seg.interpolate(t), seg.interpolate(min(seg.length, t + 1.0))
        behind = seg.interpolate(max(0.0, t - 1.0))
        tx, ty = ahead.x - behind.x, ahead.y - behind.y
        q = nearest_points(p, other)[1]
        dist = p.distance(q)
        if dist > SHARE_M * 2:
            continue
        cross = tx * (q.y - p.y) - ty * (q.x - p.x)  # > 0: q is to the left
        total += -dist if cross > 0 else dist
        count += 1
    return total / count if count else 0.0


def _parts(geom: dict) -> list[list[list[float]]]:
    return [geom["coordinates"]] if geom["type"] == "LineString" else geom["coordinates"]
