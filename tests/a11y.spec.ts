/**
 * Accessibility audit (Phase 5): axe-core on the key views, WCAG 2.1 A and AA rules. The map canvas
 * itself is out of axe's reach; the line list is its screen-reader equivalent (docs/SPEC.md).
 * `npm run a11y`.
 */
import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.setTimeout(240_000);

async function ready(page: Page) {
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
}

async function audit(page: Page, name: string) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join('; ')}`);
  expect(summary, `${name}: axe violations`).toEqual([]);
}

const VIEWS: { name: string; url: string; width?: number; height?: number; open?: string }[] = [
  { name: 'present', url: '/?test=1' },
  { name: 'past, 1925', url: '/?era=past&year=1925&test=1' },
  { name: 'future, with proposals', url: '/?era=future&proposals=1&test=1' },
  { name: 'a line panel', url: '/l/bart-yellow?test=1&at=99' },
  { name: 'a proposal panel', url: '/l/geary-19th-subway?test=1&at=99' },
  { name: 'the editor', url: '/?edit=1&test=1' },
  { name: 'phone, a line panel', url: '/l/bart-yellow?test=1&at=99', width: 390, height: 844 },
];

for (const v of VIEWS) {
  test(`axe: ${v.name}`, async ({ browser }) => {
    const context = await browser.newContext(v.width ? { viewport: { width: v.width, height: v.height! }, isMobile: true, hasTouch: true } : {});
    const page = await context.newPage();
    await page.goto(v.url);
    await ready(page);
    await page.waitForTimeout(1500);
    await audit(page, v.name);
    await context.close();
  });
}
