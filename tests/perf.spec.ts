/**
 * Rendering spike for the year slider (docs/DECISIONS.md, rendering): 10,000 synthetic past segments
 * (tests/fixtures/make-synthetic.mjs; never shipped), Chromium with a 4x CPU slowdown. Compares the
 * time from a year step to a settled map for:
 *  A. the app's path: whole-year filters through the diffed setStyle, plus feature-state fades;
 *  B. the same filters with map.setFilter directly (no style diff);
 *  C. a global-state paint expression (map.setGlobalStateProperty), the rejected alternative.
 * Plus hover: feature-state on one line's features.
 * Headless Chromium draws with SwiftShader (software WebGL), so absolute times are pessimistic;
 * the comparison is what counts. Results: test-results/perf.json.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const YEARS = 24;

async function idle(page: Page) {
  await page.evaluate(() => new Promise<void>((r) => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    m.once('idle', () => r());
    m.triggerRepaint();
  }));
}

/** Milliseconds from running `step(year)` in the page to the map's next idle, for each year. */
async function measure(page: Page, step: string, from: number): Promise<number[]> {
  const times: number[] = [];
  for (let y = from; y < from + YEARS; y++) {
    const ms = await page.evaluate(([code, year]) => new Promise<number>((resolve) => {
      const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
      const t0 = performance.now();
      m.once('idle', () => resolve(performance.now() - t0));
      new Function('year', code)(year);
      m.triggerRepaint();
    }), [step, y] as const);
    times.push(ms);
  }
  return times;
}

const stats = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { median: Math.round(q(0.5)), p90: Math.round(q(0.9)), max: Math.round(s[s.length - 1]) };
};

test('year slider rendering, 10k features, 4x CPU slowdown', async ({ page, context }) => {
  test.setTimeout(900_000);
  execFileSync('node', ['tests/fixtures/make-synthetic.mjs', '10000']);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?era=past&year=1900&perf=synthetic&test=1#map=10/37.75/-122.25');
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
  await page.waitForFunction(() => {
    const m = (window as unknown as { __map?: import('maplibre-gl').Map }).__map;
    return !!m?.getSource('transit-past-draw') && m.isSourceLoaded('transit-past-draw') && m.isSourceLoaded('transit-past-lines');
  }, null, { timeout: 120_000 });
  await idle(page);

  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  // A: the app's own path.
  const a = await measure(page, 'window.__app.setYear(year, { animateFrom: year - 1 })', 1901);

  // B: setFilter directly on the same layers.
  const b = await measure(page, `
    const m = window.__map;
    const ids = m.getStyle().layers.filter((l) => l.id.startsWith('transit-past-')).map((l) => l.id);
    for (const id of ids) {
      const f = m.getFilter(id);
      if (!Array.isArray(f) || f[0] !== 'all') continue;
      m.setFilter(id, f.map((c) => Array.isArray(c) && c[0] === '<' && c[1][1] === 'open_y' ? ['<', ['get', 'open_y'], year + 1]
        : Array.isArray(c) && c[0] === '>' && c[1][1] === 'close_y' ? ['>', ['get', 'close_y'], year - 2] : c));
    }`, 1930);

  // C: global-state paint on a layer of its own (the app's past layers hidden).
  await page.evaluate(() => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    for (const l of m.getStyle().layers) if (l.id.startsWith('transit-past-')) m.setLayoutProperty(l.id, 'visibility', 'none');
    m.setGlobalStateProperty('year', 1950);
    m.addLayer({
      id: 'perf-global-state', type: 'line', source: 'transit-past-draw',
      paint: {
        'line-color': '#1F5FAD', 'line-width': 2,
        'line-opacity': ['case', ['all', ['<', ['get', 'open_y'], ['+', ['global-state', 'year'], 1]],
          ['>', ['get', 'close_y'], ['global-state', 'year']]], 1, 0],
      },
    }, 'transit-selected-casing');
  });
  await idle(page);
  const c = await measure(page, 'window.__map.setGlobalStateProperty("year", year)', 1951);

  // Hover: feature-state on the five features of one synthetic line.
  const hover = await measure(page, `
    const m = window.__map;
    for (let i = 1; i <= 5; i++) m.setFeatureState({ source: 'transit-past-lines', id: (year % 1000) * 5 + i }, { hover: year % 2 === 0 });`, 1975);

  const result = {
    features: 10000, cpuSlowdown: 4, renderer: 'SwiftShader (software WebGL)',
    msToIdle: { appPath: stats(a), setFilter: stats(b), globalStatePaint: stats(c), hoverFeatureState: stats(hover) },
  };
  mkdirSync('test-results', { recursive: true });
  writeFileSync('test-results/perf.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  expect(a.length).toBe(YEARS);
});
