/**
 * The year slider, as feature-state (docs/DECISIONS.md, rendering spike). No layer filters on the
 * year: in the past era every transit layer's opacity reads a feature-state `vis` (0 to 1), and each
 * step sets it only on the features whose visibility changes. A filter or global-state change makes
 * MapLibre reload the whole source; this doesn't, so a step costs one repaint.
 *
 * `vis` also carries the fades: a line that closed fades out over the following years
 * (theme.transit.eras.fadeOutYears), and one that opens fades in over the step while playing.
 */
import type { Map as MapLibreMap } from 'maplibre-gl';
import type { EraIndex } from '../data/catalog';
import { prefersReducedMotion } from '../basemap/flight';

export interface Dated {
  open_y: number;
  close_y: number;
  undated?: number;
}

/** Whether a feature is on the map in `year` (open during it, or still fading after closing). */
export function visibleAt(p: Dated, year: number, fadeOut: number): boolean {
  if (p.undated || p.open_y < 0 || p.close_y < 0) return false;
  return p.open_y < year + 1 && p.close_y > year - fadeOut;
}

/** How visible a closed feature still is, `year` years on: 1 just after closing, fading to a trace. */
export function closingFade(close: number, year: number, fadeOut: number): number {
  return Math.max(0.12, Math.min(1, (close - (year - fadeOut)) / (fadeOut + 1)));
}

/** The target `vis` for a feature in `year`; `opening` when it should fade in over the step. */
export function target(open: number, close: number, year: number, fadeOut: number, animateFrom?: number): { vis: number; opening: boolean } {
  if (open < 0 || close < 0 || open >= year + 1 || close <= year - fadeOut) return { vis: 0, opening: false };
  if (close <= year) return { vis: closingFade(close, year, fadeOut), opening: false };
  return { vis: 1, opening: animateFrom !== undefined && open >= animateFrom + 1 };
}

/** Per map: the `vis` last set on each source's features (feature-state persists across style diffs). */
const applied = new WeakMap<MapLibreMap, Map<string, Map<number, number>>>();
let raf = 0;

/** Forget what was set (after a full style reload, which drops all feature-state). */
export function resetVisibility(map: MapLibreMap) {
  cancelAnimationFrame(raf);
  applied.delete(map);
}

/**
 * Show the network as of `year`: set `vis` on every feature of the given datasets' draw, lines and
 * points sources whose visibility changed since the last call. With `animateFrom` (the previous
 * year, while playing), features opening in between fade in over the step.
 */
export function applyYear(
  map: MapLibreMap, indexes: Partial<Record<string, EraIndex>>, year: number, fadeOut: number,
  opts: { animateFrom?: number; stepMs?: number } = {},
) {
  cancelAnimationFrame(raf);
  const bySource = applied.get(map) ?? new Map<string, Map<number, number>>();
  applied.set(map, bySource);
  const opening: { source: string; fid: number }[] = [];

  for (const [dataset, index] of Object.entries(indexes)) {
    if (!index) continue;
    for (const [kind, items] of [['draw', index.draw], ['lines', index.lines], ['points', index.points]] as const) {
      const source = `transit-${dataset}-${kind}`;
      if (!map.getSource(source)) continue;
      const set = bySource.get(source) ?? new Map<number, number>();
      bySource.set(source, set);
      for (const f of items) {
        const t = target(f.open, f.close, year, fadeOut, opts.animateFrom);
        const vis = t.opening ? 0 : t.vis;
        if ((set.get(f.fid) ?? 0) === vis && !t.opening) continue;
        map.setFeatureState({ source, id: f.fid }, { vis });
        set.set(f.fid, vis);
        if (t.opening) opening.push({ source, fid: f.fid });
      }
    }
  }

  if (!opening.length) return;
  const finish = () => {
    for (const o of opening) {
      map.setFeatureState({ source: o.source, id: o.fid }, { vis: 1 });
      bySource.get(o.source)!.set(o.fid, 1);
    }
  };
  const stepMs = opts.stepMs ?? 0;
  if (prefersReducedMotion() || stepMs <= 0) {
    finish();
    return;
  }
  const duration = Math.min(450, stepMs * 0.85);
  const start = performance.now();
  const frame = () => {
    const t = Math.min(1, (performance.now() - start) / duration);
    if (t >= 1) return finish();
    for (const o of opening) map.setFeatureState({ source: o.source, id: o.fid }, { vis: t });
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
}
