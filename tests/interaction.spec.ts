/**
 * Interaction tests: eras, the legend's filters, the list, opening and closing lines (list, map,
 * shared track, deep link, Escape), the year slider by keyboard, reduced motion, the phone layout and
 * the style panel.
 * Chromium here; WebKit in CI (PW_WEBKIT=1).
 */
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

/** Counts come from the built catalog, so the tests follow the data. Groups off by default (heritage)
 * aren't listed until their legend chip is switched on. */
const catalog = JSON.parse(readFileSync('data/app/catalog.json', 'utf8')) as { lines: { era: string; group: string }[] };
const groups = (JSON.parse(readFileSync('data/schema/vocabulary.json', 'utf8')) as { groups: Record<string, { defaultOn: boolean }> }).groups;
const shown = catalog.lines.filter((l) => groups[l.group]?.defaultOn !== false);
const present = shown.filter((l) => l.era === 'present');
const future = shown.filter((l) => l.era === 'present' || l.era === 'future');
const futureNotHeavy = future.filter((l) => l.group !== 'heavy_rail');

test.setTimeout(240_000);

async function ready(page: Page) {
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
}

/** Screen position of a lon/lat on the map. */
async function screenPoint(page: Page, lngLat: [number, number]) {
  return page.evaluate((ll) => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    const p = m.project(ll);
    const r = m.getCanvas().getBoundingClientRect();
    return { x: r.left + p.x, y: r.top + p.y };
  }, lngLat);
}

async function settled(page: Page) {
  await page.evaluate(() => new Promise<void>((r) => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    if (!m.isMoving() && m.loaded()) return r();
    m.once('idle', () => r());
  }));
}

test('eras, filters, list and the line panel', async ({ page }) => {
  await page.goto('/?test=1');
  await ready(page);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bay Area transit');
  const radio = (name: string) => page.getByRole('radio', { name });
  await expect(radio('Present')).toHaveAttribute('aria-checked', 'true');
  const list = page.locator('.line-list li');
  await expect(list).toHaveCount(present.length);

  // The era switcher is a radio group: arrow keys move between eras.
  await radio('Present').focus();
  await page.keyboard.press('ArrowRight');
  await expect(radio('Future')).toHaveAttribute('aria-checked', 'true');
  await expect(list).toHaveCount(future.length);
  await expect.poll(() => new URL(page.url()).searchParams.get('era')).toBe('future');

  // The legend is the filter: switching heavy rail off removes BART's rapid-transit lines (the
  // Oakland Airport line is a people mover, filed under light rail).
  const heavy = page.getByRole('button', { name: /Heavy rail/ });
  await heavy.click();
  await expect(heavy).toHaveAttribute('aria-pressed', 'false');
  await expect(list).toHaveCount(futureNotHeavy.length);
  await expect(page.locator('.line-list')).not.toContainText('Rapid transit');
  await heavy.click();
  await expect(list).toHaveCount(future.length);

  // Open a line from the list; the panel names it, the URL follows, Escape closes it.
  await page.getByRole('button', { name: /^Valley Link/ }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Valley Link');
  await expect(page).toHaveURL(/\/l\/valley-link/);
  await expect(page.locator('.line-panel')).toContainText('Environmental review');
  await expect(page.locator('.line-panel')).toContainText('Sources');
  await page.keyboard.press('Escape');
  await expect(page.locator('.line-panel')).toHaveCount(0);
  await expect(page).not.toHaveURL(/\/l\//);
});

test('hover highlights a line; a click on shared track lists every line there', async ({ page }) => {
  // Market Street in San Francisco, where four BART lines share the subway.
  await page.goto('/?test=1#map=14/37.7894/-122.4013');
  await ready(page);
  await page.waitForFunction(() => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    return m.isSourceLoaded('transit-present-lines');
  });
  await settled(page);
  // Montgomery St station, on the shared trunk.
  const p = await screenPoint(page, [-122.401587, 37.789173]);
  await page.mouse.move(p.x, p.y);
  await expect(page.locator('.map-tooltip')).toBeVisible();
  await expect(page.locator('.map-tooltip .more')).toContainText('more on this track');
  await page.mouse.click(p.x, p.y);
  const chooser = page.getByRole('dialog', { name: 'Lines on this track' });
  await expect(chooser).toBeVisible();
  expect(await chooser.getByRole('button').count()).toBeGreaterThanOrEqual(2);
  await chooser.getByRole('button', { name: 'Red line' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Red line');
});

test('deep link opens a line, and the back button closes it', async ({ page }) => {
  await page.goto('/?test=1');
  await ready(page);
  await page.goto('/l/the-portal?test=1');
  await ready(page);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('The Portal (Downtown Rail Extension)');
  await expect(page.getByRole('radio', { name: 'Future' })).toHaveAttribute('aria-checked', 'true');
  await page.goBack();
  await expect(page.locator('.line-panel')).toHaveCount(0);
});

test('year slider works from the keyboard and lands in the URL', async ({ page }) => {
  await page.goto('/?era=past&year=1925&test=1');
  await ready(page);
  const slider = page.getByRole('slider', { name: 'Year' });
  await expect(slider).toHaveValue('1925');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.year-slider .year')).toHaveText('1927');
  await expect.poll(() => new URL(page.url()).searchParams.get('year')).toBe('1927');
  // BART's opening dates aren't sourced yet, so the slider says its lines are left off.
  await expect(page.locator('.year-slider')).toContainText('no sourced dates');
  // Play advances the year, and pause stops it.
  await page.getByRole('button', { name: 'Play' }).click();
  await expect.poll(async () => Number(await page.locator('.year-slider .year').textContent()), { timeout: 20_000 }).toBeGreaterThan(1928);
  await page.getByRole('button', { name: 'Pause' }).click();
});

test('the past era lists the lines running in the slider year first, the rest dimmed (decision 14)', async ({ page }) => {
  await page.goto('/?era=past&year=1910&test=1');
  await ready(page);
  const running = page.locator('.line-group.running');
  const other = page.locator('.line-group.other');
  await expect(running.locator('.line-group-head')).toContainText('Running in 1910');
  await expect(running).toContainText('Peninsula trains');
  await expect(running).not.toContainText('Yellow line');
  await expect(other).toContainText('Yellow line');
  // The groups follow the slider.
  const slider = page.getByRole('slider', { name: 'Year' });
  await slider.fill('1990');
  await expect(running.locator('.line-group-head')).toContainText('Running in 1990');
  await expect(running).toContainText('Yellow line');
});

test('reduced motion: a line opens without a flight', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/?test=1');
  await ready(page);
  await page.getByRole('button', { name: /^Yellow line/ }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Yellow line');
  await page.waitForFunction(() => document.body.dataset.flight === 'landed', null, { timeout: 30_000 });
  await context.close();
});

test('on a phone the panel is a bottom sheet', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto('/l/bart-blue?test=1');
  await ready(page);
  const panel = page.locator('.line-panel');
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  expect(box!.y).toBeGreaterThan(844 * 0.4);
  expect(box!.width).toBeGreaterThan(380);
  await context.close();
});

test('the style panel (?style=1) changes a mode color live, and Escape closes it', async ({ page }) => {
  await page.goto('/?style=1&test=1');
  await ready(page);
  const panel = page.getByRole('complementary', { name: 'Style panel' });
  await expect(panel).toBeVisible();
  await expect(panel.getByText('Every check passes.')).toBeVisible();
  const paint = () => page.evaluate(() => JSON.stringify((window as unknown as { __map: import('maplibre-gl').Map }).__map
    .getStyle().layers.filter((l) => l.id.startsWith('transit-present')).map((l) => 'paint' in l ? l.paint : null)));
  expect(await paint()).not.toContain('#123456');
  await panel.getByLabel('Heavy rail hex').fill('#123456');
  await expect.poll(paint).toContain('#123456');
  // A pale color fails the contrast check, which says so.
  await panel.getByLabel('Ferry hex').fill('#DDEEFF');
  await expect(panel.getByText(/Mode: ferry on water/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(page.getByRole('button', { name: 'Style' })).toBeFocused();
});

test('with the style panel open, Escape closes the shared-track chooser first', async ({ page }) => {
  await page.goto('/?style=1&test=1#map=14/37.7894/-122.4013');
  await ready(page);
  await page.waitForFunction(() => (window as unknown as { __map: import('maplibre-gl').Map }).__map.isSourceLoaded('transit-present-lines'));
  await settled(page);
  const p = await screenPoint(page, [-122.401587, 37.789173]);
  await page.mouse.click(p.x, p.y);
  const chooser = page.getByRole('dialog', { name: 'Lines on this track' });
  await expect(chooser).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(chooser).toBeHidden();
  await expect(page.getByRole('complementary', { name: 'Style panel' })).toBeVisible();
});

test("the URL's layer options change the view, not the theme the style panel saves", async ({ page }) => {
  // No ?test=1: the panel saves its theme in the browser only outside tests.
  await page.goto('/?style=1&buildings=0');
  await ready(page);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('transit.theme.v1') ?? 'null'));
  expect(saved?.layers?.buildings).toBe(true);
  await expect(page.getByRole('complementary', { name: 'Style panel' }).getByLabel('Buildings', { exact: true })).toBeChecked();
});
