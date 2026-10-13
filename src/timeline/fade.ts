/**
 * The year slider's fades, as feature-state on just the features crossing the current year:
 * a line that closed fades out over the following years (theme.transit.eras.fadeOutYears); a line
 * that opens this year fades in over the step. The year filter itself is in the style (whole years),
 * so a style rebuild keeps it; these states are reapplied after every sync (MapView onAfterSync).
 */
import type { Map as MapLibreMap } from 'maplibre-gl';
import type { EraIndex } from '../data/catalog';
import { prefersReducedMotion } from '../basemap/flight';

/** How visible a closed feature still is, `year` years on: 1 just after closing, fading to a trace. */
export function closingFade(close: number, year: number, fadeOut: number): number {
  return Math.max(0.12, Math.min(1, (close - (year - fadeOut)) / (fadeOut + 1)));
}

const applied = new WeakMap<MapLibreMap, Map<string, Set<number>>>();
let raf = 0;

/**
 * Set the fade state for `year` on each dataset's draw and points sources. `animateFrom` (the
 * previous year, when stepping forward) fades in the features that open in between.
 */
export function applyFades(
  map: MapLibreMap, indexes: Partial<Record<string, EraIndex>>, year: number, fadeOut: number, stepMs = 0, animateFrom?: number,
) {
  cancelAnimationFrame(raf);
  const prev = applied.get(map) ?? new Map<string, Set<number>>();
  const next = new Map<string, Set<number>>();
  const opening: { source: string; fid: number }[] = [];

  for (const [dataset, index] of Object.entries(indexes)) {
    if (!index) continue;
    for (const [kind, items] of [['draw', index.draw], ['points', index.points]] as const) {
      const source = `transit-${dataset}-${kind}`;
      if (!map.getSource(source)) continue;
      const set = new Set<number>();
      for (const f of items) {
        if (f.open < 0 || f.close < 0) continue;
        if (f.close <= year + 1 && f.close > year - fadeOut) {
          set.add(f.fid);
          map.setFeatureState({ source, id: f.fid }, { fade: closingFade(f.close, year, fadeOut) });
        } else if (animateFrom !== undefined && f.open >= animateFrom + 1 && f.open < year + 1) {
          set.add(f.fid);
          opening.push({ source, fid: f.fid });
          map.setFeatureState({ source, id: f.fid }, { fade: 0 });
        }
      }
      for (const fid of prev.get(source) ?? []) {
        if (!set.has(fid)) map.removeFeatureState({ source, id: fid }, 'fade');
      }
      next.set(source, set);
    }
  }
  applied.set(map, next);

  if (!opening.length) return;
  if (prefersReducedMotion() || stepMs <= 0) {
    for (const o of opening) map.setFeatureState({ source: o.source, id: o.fid }, { fade: 1 });
    return;
  }
  const duration = Math.min(450, stepMs * 0.85);
  const start = performance.now();
  const frame = () => {
    const t = Math.min(1, (performance.now() - start) / duration);
    for (const o of opening) map.setFeatureState({ source: o.source, id: o.fid }, { fade: t });
    if (t < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
}

/** Drop every fade (leaving the past era). */
export function clearFades(map: MapLibreMap) {
  cancelAnimationFrame(raf);
  for (const [source, fids] of applied.get(map) ?? []) {
    if (!map.getSource(source)) continue;
    for (const fid of fids) map.removeFeatureState({ source, id: fid }, 'fade');
  }
  applied.delete(map);
}
