import { describe, expect, it } from 'vitest';
import { busyPace } from '../src/timeline/pace';

describe("play's busy pace (?pace=busy)", () => {
  // Three lines: two open in 1903 (one in two pieces), one closes in 1958; undated pieces (-1) don't count.
  const lines = [
    [{ open: 1903.5, close: 1958.2 }, { open: 1903.1, close: 1941 }],
    [{ open: 1903.9, close: -1 }],
    [{ open: -1, close: -1 }],
  ];
  const pace = busyPace(lines, 1850, 2026);

  it('keeps the sweep its length: the steps average one even step', () => {
    let total = 0;
    for (let y = 1851; y <= 2026; y++) total += pace(y);
    expect(total / 176).toBeCloseTo(1, 10);
  });

  it('counts a line once a year, however many of its pieces change, by whole years', () => {
    // 1903: two lines; 1958 and 1941: one each; 1900: none.
    expect(pace(1903) / pace(1900)).toBeCloseTo(1 + Math.SQRT2, 10);
    expect(pace(1958)).toBeCloseTo(pace(1941), 10);
    expect(pace(1958) / pace(1900)).toBeCloseTo(2, 10);
  });
});
