/** Play's pace through the years (Phase 5, `?pace=`); src/ui/YearSlider.tsx plays it. */

/**
 * How play moves through the years, for Matthew to choose from (Phase 5; `?pace=`):
 * - `even`: every year takes the same time, the default so far;
 * - `busy`: a year takes longer the more opens and closes in it, and quiet decades pass quickly. The
 *   sweep keeps its length.
 */
export type Pace = 'even' | 'busy';
export const PACES: Pace[] = ['even', 'busy'];

/** Each year's share of the sweep under `busy`, as a multiple of an even step: from the features
 * opening or closing that year in the given eras' indexes. */
export function busyPace(indexes: ({ lines: { open: number; close: number }[] } | undefined)[], first: number, last: number): (year: number) => number {
  const changes = new Map<number, number>();
  for (const index of indexes) {
    for (const f of index?.lines ?? []) {
      for (const y of [f.open, f.close].map(Math.floor)) if (y >= first && y <= last) changes.set(y, (changes.get(y) ?? 0) + 1);
    }
  }
  // A floor, so a quiet year still shows, and a cap, so a busy one doesn't stall.
  const raw = (y: number) => Math.min(7, 1 + (changes.get(y) ?? 0));
  let total = 0;
  for (let y = first + 1; y <= last; y++) total += raw(y);
  const mean = total / (last - first);
  return (y: number) => raw(y) / mean;
}
