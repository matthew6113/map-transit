/**
 * Rendering spike for the year slider (docs/DECISIONS.md, rendering): 10,000 synthetic past segments
 * (tests/fixtures/make-synthetic.mjs; never shipped), Chromium with a 4x CPU slowdown. Compares the
 * time from a year step to a settled map for:
 *  A. the app's path: whole-year filters through the diffed setStyle, plus feature-state fades;
 *  B. the same filters with map.setFilter directly (no style diff);
 *  C. the same filters written with global-state, stepped with map.setGlobalStateProperty;
 *  D. no year filter at all: visibility as feature-state, set only on features crossing the year.
 * Plus hover: feature-state on one line's features.
 * Headless Chromium draws with SwiftShader (software WebGL), so absolute times are pessimistic;
 * the comparison is what counts. Results: test-results/perf.json.
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

test('year slider rendering, 10k features, 4x CPU slowdown', async ({ page, context }) => {
  test.setTimeout(1_500_000);
  execFileSync('node', ['tests/fixtures/make-synthetic.mjs', '10000']);
  await page.setViewportSize({ width: 1440, height: 900 });
  // Without the building print: under software WebGL it dominates every frame and hides the
  // differences being measured. (Phase 5 re-measures with buildings on a real GPU.)
  await page.goto('/?era=past&year=1900&perf=synthetic&test=1&buildings=0#map=10/37.75/-122.25');
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
  await page.waitForFunction(() => {
    const m = (window as unknown as { __map?: import('maplibre-gl').Map }).__map;
    return !!m?.getSource('transit-past-draw') && m.isSourceLoaded('transit-past-draw') && m.isSourceLoaded('transit-past-lines');
  }, null, { timeout: 120_000 });
  await idle(page);

  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  console.log('A: app path');
  const a = await measure(page, 'window.__app.setYear(year, { animateFrom: year - 1 })', 1901);

  console.log('B: setFilter');
  const b = await measure(page, `
    const m = window.__map;
    const ids = m.getStyle().layers.filter((l) => l.id.startsWith('transit-past-')).map((l) => l.id);
    for (const id of ids) {
      const f = m.getFilter(id);
      if (!Array.isArray(f) || f[0] !== 'all') continue;
      m.setFilter(id, f.map((c) => Array.isArray(c) && c[0] === '<' && c[1][1] === 'open_y' ? ['<', ['get', 'open_y'], year + 1]
        : Array.isArray(c) && c[0] === '>' && c[1][1] === 'close_y' ? ['>', ['get', 'close_y'], year - 2] : c));
    }`, 1930);

  // C: global-state in the same layers' filters (set once; each step sets the year).
  await page.evaluate(() => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    m.setGlobalStateProperty('year', 1950);
    for (const l of m.getStyle().layers) {
      if (!l.id.startsWith('transit-past-')) continue;
      const f = m.getFilter(l.id);
      if (!Array.isArray(f) || f[0] !== 'all') continue;
      m.setFilter(l.id, f.map((c) => (Array.isArray(c) && c[0] === '<' && (c[1] as unknown[])[1] === 'open_y'
        ? ['<', ['get', 'open_y'], ['+', ['global-state', 'year'], 1]]
        : Array.isArray(c) && c[0] === '>' && (c[1] as unknown[])[1] === 'close_y'
          ? ['>', ['get', 'close_y'], ['-', ['global-state', 'year'], 2]] : c)) as import('maplibre-gl').FilterSpecification);
    }
  });
  await idle(page);
  console.log('C: global-state filters');
  const c = await measure(page, 'window.__map.setGlobalStateProperty("year", year)', 1951);

  // D: visibility as feature-state. No year in any filter: every past layer's opacity reads a
  // feature-state "vis", and each step sets it only on the features that open or close.
  await page.evaluate(async () => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    const w = window as unknown as { __years: Record<string, { fid: number; open: number; close: number }[]>; __vis: Record<string, Set<number>> };
    w.__years = {};
    w.__vis = {};
    for (const kind of ['draw', 'lines', 'points']) {
      const fc = await (await fetch(`/tests/fixtures/synthetic-${kind}.geojson`)).json();
      w.__years[`transit-past-${kind}`] = fc.features.map((f: { properties: { fid: number; open_y: number; close_y: number } }) =>
        ({ fid: f.properties.fid, open: f.properties.open_y, close: f.properties.close_y }));
      w.__vis[`transit-past-${kind}`] = new Set();
    }
    const vis: import('maplibre-gl').ExpressionSpecification = ['coalesce', ['feature-state', 'vis'], 0];
    for (const l of m.getStyle().layers) {
      if (!l.id.startsWith('transit-past-')) continue;
      const f = m.getFilter(l.id);
      if (Array.isArray(f) && f[0] === 'all') {
        m.setFilter(l.id, f.filter((x) => !(Array.isArray(x) && (x[0] === '<' || x[0] === '>'))) as import('maplibre-gl').FilterSpecification);
      }
      if (l.type === 'line' && !l.id.endsWith('-highlight') && !l.id.endsWith('-hit')) m.setPaintProperty(l.id, 'line-opacity', vis);
      if (l.type === 'circle') {
        m.setPaintProperty(l.id, 'circle-opacity', vis);
        m.setPaintProperty(l.id, 'circle-stroke-opacity', vis);
      }
    }
    (window as unknown as { __step: (y: number) => void }).__step = (year: number) => {
      for (const [source, items] of Object.entries(w.__years)) {
        const shown = w.__vis[source];
        for (const it of items) {
          const on = it.open < year + 1 && it.close > year;
          if (on !== shown.has(it.fid)) {
            m.setFeatureState({ source, id: it.fid }, { vis: on ? 1 : 0 });
            if (on) shown.add(it.fid); else shown.delete(it.fid);
          }
        }
      }
    };
    (window as unknown as { __step: (y: number) => void }).__step(1950);
  });
  await idle(page);
  console.log('D: feature-state visibility');
  const d = await measure(page, 'window.__step(year)', 1951);

  console.log('Hover: feature-state');
  const hover = await measure(page, `
    const m = window.__map;
    for (let i = 1; i <= 5; i++) m.setFeatureState({ source: 'transit-past-lines', id: (year % 1000) * 5 + i }, { hover: year % 2 === 0 });`, 1975);

  const result = {
    features: 10000, cpuSlowdown: 4, renderer: 'SwiftShader (software WebGL)', buildings: false, stepsPerMethod: YEARS,
    msToIdle: { appPath: stats(a), setFilter: stats(b), globalStateFilters: stats(c), featureStateVisibility: stats(d), hoverFeatureState: stats(hover) },
  };
  mkdirSync('test-results', { recursive: true });
  writeFileSync('test-results/perf.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  expect(a.length).toBe(YEARS);
});
