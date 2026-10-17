/**
 * The share card (og:image, Phase 5): the map at 1200×630 with the title over it, drawn from the
 * app itself so it follows the data and the theme. `npm run share-card` writes the chosen card to
 * public/share-card.jpg (committed; the build serves it) and every option to docs/screenshots/p5/.
 * SHARE_CARD picks the option (the default is below; Matthew chooses).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { test, type Page } from '@playwright/test';

const W = 1200;
const H = 630;
const CHOSEN = process.env.SHARE_CARD ?? 'past-1925';
const DIR = 'docs/screenshots/p5';

/** Each option's map view(s); a triptych has one per era. The centres sit south of the core, so the
 * core shows above the title band. */
const OPTIONS: Record<string, { label: string; url: string }[]> = {
  'past-1925': [{ label: '', url: '/?era=past&year=1925&test=1#map=9.9/37.7300/-122.3300/0/0' }],
  present: [{ label: '', url: '/?test=1#map=9.9/37.7300/-122.3300/0/0' }],
  'three-eras': [
    { label: '1925', url: '/?era=past&year=1925&test=1#map=10.2/37.7500/-122.3300/0/0' },
    { label: 'Today', url: '/?test=1#map=10.2/37.7500/-122.3300/0/0' },
    { label: 'Coming', url: '/?era=future&test=1#map=10.2/37.7500/-122.3300/0/0' },
  ],
};

const TITLE = 'Bay Area transit';
const DECK = 'Everything that ever ran, everything running now, and what’s coming';
const BYLINE = 'by Matthew Huguet';
/** The basemap's data is ODbL: an image made from it says so (as the map's own credit line does). */
const CREDIT = 'Map data © OpenStreetMap contributors, Overture Maps Foundation';

async function ready(page: Page) {
  await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
  await page.waitForTimeout(2500);
}

/** Only the map: the app's controls, panels and credits are hidden. */
const MAP_ONLY = `.app > :not(.map):not(.map-wrap) , .title, .credits, .maplibregl-ctrl-container { display: none !important; }
  .maplibregl-ctrl-attrib, .maplibregl-ctrl-bottom-right, .maplibregl-ctrl-bottom-left { display: none !important; }`;

async function shoot(page: Page, url: string, width: number): Promise<Buffer> {
  await page.setViewportSize({ width, height: H });
  // A fresh document each time: from a page at the same path, a new hash alone wouldn't reload.
  await page.goto('about:blank');
  await page.goto(url);
  await ready(page);
  await page.addStyleTag({ content: MAP_ONLY });
  await page.waitForTimeout(500);
  return page.screenshot({ type: 'png' });
}

/** The card: the map image(s) under a band with the title, in the theme's own type and colors. */
async function compose(page: Page, shots: { label: string; png: Buffer }[]): Promise<Buffer> {
  await page.setViewportSize({ width: W, height: H });
  await page.goto('about:blank');
  await page.goto('/?test=1');
  await ready(page);
  const panels = shots.map((s) => ({ label: s.label, src: `data:image/png;base64,${s.png.toString('base64')}` }));
  await page.evaluate(([panels, title, deck, byline, credit]) => {
    const card = document.createElement('div');
    card.id = 'transit-share-card';
    card.innerHTML = `
      <div class="panels">${panels.map((p) => `<figure><img src="${p.src}" alt="">${p.label ? `<figcaption>${p.label}</figcaption>` : ''}</figure>`).join('')}</div>
      <div class="band"><h1></h1><p class="deck"></p><p class="by"></p><p class="credit"></p></div>`;
    card.querySelector('h1')!.textContent = title;
    card.querySelector('.deck')!.textContent = deck;
    card.querySelector('.by')!.textContent = byline;
    document.body.appendChild(card);
    card.querySelector('.credit')!.textContent = credit;
  }, [panels, TITLE, DECK, BYLINE, CREDIT] as const);
  await page.addStyleTag({
    content: `
      #transit-share-card { position: fixed; inset: 0; z-index: 1000; background: var(--color-land); font-family: var(--font-ui); }
      #transit-share-card .panels { position: absolute; inset: 0; display: flex; gap: 0; }
      #transit-share-card figure { margin: 0; flex: 1; position: relative; overflow: hidden; border-left: 1px solid var(--color-panel-rule); }
      #transit-share-card figure:first-child { border-left: 0; }
      #transit-share-card img { display: block; height: 100%; width: 100%; object-fit: cover; }
      #transit-share-card figcaption { position: absolute; top: 20px; left: 22px; font-size: 22px; font-weight: 600;
        color: var(--color-panel-text); text-shadow: 0 0 3px var(--color-land), 0 0 6px var(--color-land), 0 0 10px var(--color-land); }
      #transit-share-card .band { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 40px 30px;
        background: color-mix(in srgb, var(--color-panel-background) 92%, transparent); border-top: 1px solid var(--color-panel-rule); }
      #transit-share-card h1 { margin: 0; font-size: 54px; font-weight: 600; letter-spacing: -0.01em; color: var(--color-panel-text); line-height: 1.05; }
      #transit-share-card .deck { margin: 8px 0 0; font-family: var(--font-text); font-size: 26px; color: var(--color-panel-text); }
      #transit-share-card .by { margin: 10px 0 0; font-size: 19px; color: var(--color-labels); }
      #transit-share-card .credit { position: absolute; right: 40px; bottom: 30px; margin: 0; font-size: 13px; color: var(--color-labels); }`,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  return page.screenshot({ type: 'jpeg', quality: 88 });
}

if (!(CHOSEN in OPTIONS)) throw new Error(`SHARE_CARD=${CHOSEN}: not one of ${Object.keys(OPTIONS).join(', ')}`);

test('share card', async ({ browser }) => {
  test.setTimeout(900_000);
  mkdirSync(DIR, { recursive: true });
  const context = await browser.newContext({ viewport: { width: W, height: H }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const [name, views] of Object.entries(OPTIONS)) {
    const width = Math.round(W / views.length);
    const shots = [];
    for (const v of views) shots.push({ label: v.label, png: await shoot(page, v.url, width) });
    const card = await compose(page, shots);
    writeFileSync(`${DIR}/share-card-${name}.jpg`, card);
    if (name === CHOSEN) writeFileSync('public/share-card.jpg', card);
    console.log(`share card: ${name}${name === CHOSEN ? ' (chosen)' : ''}`);
  }
  await context.close();
});
