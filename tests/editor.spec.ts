/**
 * The network editor (Phase 4b, ?edit=1): draw a line, name it, and export a file the network
 * schema accepts; the draft survives a reload; the editor's layers survive a style update.
 */
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import Ajv2020 from 'ajv/dist/2020.js';

const validate = new Ajv2020({ allErrors: true, strict: false }).compile(JSON.parse(readFileSync('data/schema/network.schema.json', 'utf8')));

test.setTimeout(240_000);

async function ready(page: Page) {
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
}

async function screenPoint(page: Page, lngLat: [number, number]) {
  return page.evaluate((ll) => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    const p = m.project(ll);
    const r = m.getCanvas().getBoundingClientRect();
    return { x: r.left + p.x, y: r.top + p.y };
  }, lngLat);
}

test('draws, names and exports a line of the network', async ({ page }) => {
  await page.goto('/?edit=1&test=1#map=12/37.7800/-122.4500/0/0');
  await ready(page);
  const editor = page.getByRole('complementary', { name: "Matthew's network" });
  await expect(editor).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Future' })).toHaveAttribute('aria-checked', 'true');

  // Three clicks in open country west of the Presidio (nothing to snap to), finished on the last point.
  await editor.getByRole('button', { name: 'Draw a line' }).click();
  const pts: [number, number][] = [[-122.505, 37.765], [-122.495, 37.772], [-122.485, 37.768]];
  for (const ll of pts) {
    const p = await screenPoint(page, ll);
    await page.mouse.click(p.x, p.y);
    await page.waitForTimeout(150);
  }
  const last = await screenPoint(page, pts[2]);
  await page.mouse.click(last.x, last.y);
  await expect(editor.getByRole('heading', { name: 'This line' })).toBeVisible();

  await editor.getByLabel('Name').fill('Ocean Beach test line');
  await editor.getByLabel('Mode').selectOption('light_rail');
  await expect(editor.locator('.line-list')).toContainText('Ocean Beach test line');

  // A style update (switching a mode group off and on) keeps the editor's layers.
  await page.getByRole('button', { name: /Heavy rail/ }).click();
  await page.getByRole('button', { name: /Heavy rail/ }).click();
  await expect.poll(() => page.evaluate(() => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    return m.getStyle().layers.some((l) => l.id.startsWith('transit-editor'));
  })).toBe(true);

  const download = page.waitForEvent('download');
  await editor.getByRole('button', { name: 'Export network.geojson' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('network.geojson');
  const json = JSON.parse(readFileSync(await file.path(), 'utf8'));
  expect(validate(json), JSON.stringify(validate.errors)).toBe(true);
  expect(json.features).toHaveLength(1);
  expect(json.features[0].properties).toMatchObject({ id: 'ocean-beach-test-line', name: 'Ocean Beach test line', mode: 'light_rail', author: 'Matthew Huguet' });
  expect(json.features[0].geometry.coordinates).toHaveLength(3);

  // The draft is kept in this browser, and can be discarded.
  await page.reload();
  await ready(page);
  await expect(editor.getByText('Restored the draft kept in this browser.')).toBeVisible();
  await expect(editor.locator('.line-list')).toContainText('Ocean Beach test line');
  await editor.getByRole('button', { name: 'Discard it' }).click();
  await expect(editor.getByText('None yet.')).toBeVisible();
});
