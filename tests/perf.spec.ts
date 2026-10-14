/**
 * Rendering spike for the year slider (docs/DECISIONS.md, rendering): 10,000 synthetic past segments
 * (tests/fixtures/make-synthetic.mjs; never shipped), Chromium with a 4x CPU slowdown, building print
 * off. Compares the time from a year step to a settled map for:
 *  A. the app's path: visibility as feature-state, set only on features crossing the year;
 *  B. the year as layer filters, changed with map.setFilter (what the plan first proposed);
 *  C. the same filters written with global-state, stepped with map.setGlobalStateProperty.
 * Plus hover: feature-state on one line's features.
 * Headless Chromium draws with SwiftShader (software WebGL): a repaint alone costs about 1.5 s here,
 * so absolute times are pessimistic and the comparison is what counts. Results: test-results/perf.json.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const YEARS = 12;
/** A step that never settles is recorded at this cap. */
const CAP_MS = 20_000;

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
    const ms = await page.evaluate(([code, year, cap]) => new Promise<number>((resolve) => {
      const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
      const t0 = performance.now();
      m.once('idle', () => resolve(performance.now() - t0));
      setTimeout(() => resolve(cap), cap);
      new Function('year', code)(year);
      m.triggerRepaint();
    }), [step, y, CAP_MS] as const);
    console.log(`  year ${y}: ${Math.round(ms)} ms`);
    times.push(ms);
  }
  return times;
}

const stats = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { median: Math.round(q(0.5)), p90: Math.round(q(0.9)), max: Math.round(s[s.length - 1]) };
};

/** Put the year in every past layer's filter: plain numbers (B) or global-state expressions (C). */
const YEAR_FILTERS = `
  (m, open, close) => {
    for (const l of m.getStyle().layers) {
      if (!l.id.startsWith('transit-past-')) continue;
      const f = m.getFilter(l.id);
      const keep = Array.isArray(f) && f[0] === 'all'
        ? f.slice(1).filter((c) => !(Array.isArray(c) && (c[0] === '<' || c[0] === '>')))
        : f ? [f] : [];
      m.setFilter(l.id, ['all', ...keep, ['<', ['get', 'open_y'], open], ['>', ['get', 'close_y'], close]]);
    }
  }`;

test('year slider rendering, 10k features, 4x CPU slowdown', async ({ page, context }) => {
  test.setTimeout(1_500_000);
  execFileSync('node', ['tests/fixtures/make-synthetic.mjs', '10000']);
  await page.setViewportSize({ width: 1440, height: 900 });
  // Without the building print: under software WebGL it dominates every frame and hides the
  // differences being measured.
  await page.goto('/?era=past&year=1900&perf=synthetic&test=1&buildings=0#map=10/37.75/-122.25');
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
  await page.waitForFunction(() => {
    const m = (window as unknown as { __map?: import('maplibre-gl').Map }).__map;
    return !!m?.getSource('transit-past-draw') && m.isSourceLoaded('transit-past-draw') && m.isSourceLoaded('transit-past-lines');
  }, null, { timeout: 120_000 });
  await idle(page);

  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  console.log('A: app path (feature-state)');
  const a = await measure(page, 'window.__app.setYear(year, { animateFrom: year - 1 })', 1901);

  // B and C draw every past layer at full opacity and put the year in the layers' filters.
  await page.evaluate(() => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    for (const l of m.getStyle().layers) {
      if (!l.id.startsWith('transit-past-')) continue;
      if (l.type === 'line' && !l.id.endsWith('-hit') && !l.id.endsWith('-highlight')) m.setPaintProperty(l.id, 'line-opacity', 1);
      if (l.type === 'circle') {
        m.setPaintProperty(l.id, 'circle-opacity', 1);
        m.setPaintProperty(l.id, 'circle-stroke-opacity', 1);
      }
    }
  });
  await idle(page);

  console.log('B: setFilter');
  const b = await measure(page, `(${YEAR_FILTERS})(window.__map, year + 1, year - 2)`, 1930);

  await page.evaluate(`(${YEAR_FILTERS})(window.__map, ['+', ['global-state', 'year'], 1], ['-', ['global-state', 'year'], 2])`);
  await page.evaluate(() => (window as unknown as { __map: import('maplibre-gl').Map }).__map.setGlobalStateProperty('year', 1950));
  await idle(page);
  console.log('C: global-state filters');
  const c = await measure(page, 'window.__map.setGlobalStateProperty("year", year)', 1951);

  console.log('Hover: feature-state');
  const hover = await measure(page, `
    const m = window.__map;
    for (let i = 1; i <= 5; i++) m.setFeatureState({ source: 'transit-past-lines', id: (year % 1000) * 5 + i }, { hover: year % 2 === 0 });`, 1975);

  const result = {
    features: 10000, cpuSlowdown: 4, renderer: 'SwiftShader (software WebGL)', buildings: false, stepsPerMethod: YEARS,
    msToIdle: { appFeatureState: stats(a), setFilter: stats(b), globalStateFilters: stats(c), hoverFeatureState: stats(hover) },
  };
  mkdirSync('test-results', { recursive: true });
  writeFileSync('test-results/perf.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  expect(a.length).toBe(YEARS);
});
