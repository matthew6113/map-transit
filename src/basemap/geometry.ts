/** Small geometry helpers, after BAM's src/projects/data.ts (metres, ringPrefix) at 9600699. */
export type LngLat = [number, number];

/** Ground distance in metres (equirectangular; fine at city scale). */
export function metres(a: LngLat, b: LngLat): number {
  const k = Math.cos(((a[1] + b[1]) / 2) * (Math.PI / 180)) * 111320;
  return Math.hypot((a[0] - b[0]) * k, (a[1] - b[1]) * 110540);
}

export function lengthOf(c: LngLat[]): number {
  let s = 0;
  for (let i = 1; i < c.length; i++) s += metres(c[i - 1], c[i]);
  return s;
}

export function bboxOfLines(lines: LngLat[][]): [number, number, number, number] {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const line of lines) {
    for (const [x, y] of line) {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  }
  return [x0, y0, x1, y1];
}

/** The first `metresLeft` of a polyline. */
function prefixOf(c: LngLat[], metresLeft: number): LngLat[] {
  const out: LngLat[] = [c[0]];
  let left = metresLeft;
  for (let i = 1; i < c.length; i++) {
    const d = metres(c[i - 1], c[i]);
    if (left >= d) {
      out.push(c[i]);
      left -= d;
      continue;
    }
    const f = d === 0 ? 0 : left / d;
    out.push([c[i - 1][0] + (c[i][0] - c[i - 1][0]) * f, c[i - 1][1] + (c[i][1] - c[i - 1][1]) * f]);
    break;
  }
  if (out.length < 2) out.push(c[0]);
  return out;
}

/**
 * The first `t` (0 to 1) of a line made of pieces in route order (the build orients them), by
 * length: the pieces draw one after another, so the line grows from one end to the other. (BAM's
 * linePrefix grows every piece at once, which suits a site boundary, not a route.)
 */
export function routePrefix(pieces: LngLat[][], t: number): LngLat[][] {
  if (t >= 1) return pieces;
  const lengths = pieces.map(lengthOf);
  let left = Math.max(0, t) * lengths.reduce((s, d) => s + d, 0);
  const out: LngLat[][] = [];
  for (let i = 0; i < pieces.length; i++) {
    if (left <= 0) break;
    if (left >= lengths[i]) {
      out.push(pieces[i]);
      left -= lengths[i];
    } else {
      out.push(prefixOf(pieces[i], left));
      left = 0;
    }
  }
  return out;
}
