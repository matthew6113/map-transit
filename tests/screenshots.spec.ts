/**
 * Review screenshots of key views for the checkpoint (docs/screenshots/p0/; SHOTS_DIR overrides).
 * Headless Chromium draws with SwiftShader, so these are for review, not pixel diffs.
 */
import { mkdirSync } from 'node:fs';
import { test, type Page } from '@playwright/test';

const DIR = process.env.SHOTS_DIR ?? 'docs/screenshots/p0';

const VIEWS: { name: string; url: string; width?: number; height?: number }[] = [
  { name: 'present-regional', url: '/?test=1' },
  { name: 'future-regional', url: '/?era=future&test=1' },
  { name: 'present-sf', url: '/?test=1#map=13.2/37.7840/-122.4100/0/0' },
  { name: 'present-east-bay', url: '/?test=1#map=11.3/37.8150/-122.2300/0/0' },
  { name: 'future-line-portal', url: '/l/the-portal?test=1&at=99' },
  { name: 'future-line-valley-link', url: '/l/valley-link?test=1&at=99' },
  { name: 'past-1925', url: '/?era=past&year=1925&test=1' },
  { name: 'present-3d-sf', url: '/?view=3d&test=1#map=15/37.7880/-122.3990/-20/55' },
  { name: 'mobile-present', url: '/?test=1', width: 390, height: 844 },
  { name: 'mobile-line', url: '/l/bart-yellow?test=1&at=99', width: 390, height: 844 },
  // Phase 1: the full present network, where it is densest, and each BRT corridor.
  { name: 'present-downtown-sf', url: '/?test=1#map=14.6/37.7880/-122.4040/0/0' },
  { name: 'present-san-jose', url: '/?test=1#map=12.6/37.3400/-121.8900/0/0' },
  { name: 'present-ferries-marin', url: '/?test=1#map=11.4/37.8700/-122.4600/0/0' },
  { name: 'present-peninsula', url: '/?test=1#map=10.4/37.5600/-122.2900/0/0' },
  { name: 'present-sfo-airtrain', url: '/l/sfo-airtrain?test=1&at=99' },
  { name: 'present-brt-van-ness', url: '/l/muni-49?test=1&at=99' },
  { name: 'present-brt-tempo', url: '/l/ac-transit-1t?test=1&at=99' },
  { name: 'present-brt-alum-rock', url: '/l/vta-522?test=1&at=99' },
];

async function settle(page: Page) {
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
  await page.evaluate(() => new Promise<void>((r) => {
    const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
    m.once('idle', () => r());
    m.triggerRepaint();
    setTimeout(r, 60_000);
  }));
  // Let the credit line collapse, as it does after a few seconds.
  await page.waitForTimeout(5500);
}

for (const v of VIEWS) {
  test(`screenshot ${v.name}`, async ({ browser }) => {
    test.setTimeout(300_000);
    mkdirSync(DIR, { recursive: true });
    const mobile = (v.width ?? 1440) < 720;
    const context = await browser.newContext({
      viewport: { width: v.width ?? 1440, height: v.height ?? 900 },
      deviceScaleFactor: mobile ? 2 : 1,
      hasTouch: mobile,
      isMobile: mobile,
    });
    const page = await context.newPage();
    await page.goto(v.url);
    await settle(page);
    await page.screenshot({ path: `${DIR}/${v.name}.png`, timeout: 120_000 });
    await context.close();
  });
}
