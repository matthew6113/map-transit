import { describe, expect, it } from 'vitest';
import { busyPace } from '../src/timeline/pace';

describe("play's busy pace (?pace=busy)", () => {
  const index = { lines: [
    { open: 1903.5, close: 1958.2 }, { open: 1903.1, close: 1941 }, { open: 1903.9, close: -1 }, { open: -1, close: -1 },
  ] };
  const pace = busyPace([index, undefined], 1850, 2026);

  it('keeps the sweep its length: the steps average one even step', () => {
    let total = 0;
    for (let y = 1851; y <= 2026; y++) total += pace(y);
    expect(total / 176).toBeCloseTo(1, 10);
  });

  it('gives a busy year more time than a quiet one, by whole years', () => {
    expect(pace(1903)).toBeGreaterThan(pace(1958));
    expect(pace(1958)).toBeGreaterThan(pace(1900));
    expect(pace(1900)).toBeGreaterThan(0);
  });

  it('ignores undated features', () => {
    expect(pace(1849)).toBe(pace(1900));
  });
});
