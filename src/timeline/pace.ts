/** Play's pace through the years (Phase 5, `?pace=`); src/ui/YearSlider.tsx plays it. */

/**
 * How play moves through the years, for Matthew to choose from (Phase 5; `?pace=`):
 * - `even`: every year takes the same time, the default so far;
 * - `busy`: a year takes longer the more lines open or close in it, and quiet decades pass quickly.
 *   The sweep keeps its length.
 */
export type Pace = 'even' | 'busy';
export const PACES: Pace[] = ['even', 'busy'];

type Years = { open: number; close: number };

/**
 * Each year's share of the sweep under `busy`, as a multiple of an even step. `lines` holds each
 * line's pieces with their years: a line counts once in a year in which any of its pieces opens or
 * closes. The square root keeps one crowded year (a franchise ending, a company's last day) from
 * stalling play, and a quiet year still shows.
 */
export function busyPace(lines: Years[][], first: number, last: number): (year: number) => number {
  const changes = new Map<number, number>();
  for (const pieces of lines) {
    const years = new Set<number>();
    for (const p of pieces) for (const y of [p.open, p.close].map(Math.floor)) if (y >= first && y <= last) years.add(y);
    for (const y of years) changes.set(y, (changes.get(y) ?? 0) + 1);
  }
  const raw = (y: number) => 1 + Math.sqrt(changes.get(y) ?? 0);
  let total = 0;
  for (let y = first + 1; y <= last; y++) total += raw(y);
  const mean = total / (last - first);
  return (y: number) => raw(y) / mean;
}
