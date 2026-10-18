/**
 * Review screenshots of key views for the checkpoint (docs/screenshots/p0/; SHOTS_DIR overrides).
 * Headless Chromium draws with SwiftShader, so these are for review, not pixel diffs.
 */
import { mkdirSync } from 'node:fs';
import { test, type Page } from '@playwright/test';

const DIR = process.env.SHOTS_DIR ?? 'docs/screenshots/p0';
// SHOTS_ONLY=past- takes only the views whose names match (a regular expression).
const ONLY = new RegExp(process.env.SHOTS_ONLY ?? '');

/** `paint` sets a layer's paint property before the shot: a token value to compare, without the style panel. */
const VIEWS: { name: string; url: string; width?: number; height?: number; paint?: [string, string, unknown][] }[] = [
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
  { name: 'present-market-st', url: '/?test=1#map=16/37.7848/-122.4075/0/0' },
  { name: 'present-san-jose', url: '/?test=1#map=12.6/37.3400/-121.8900/0/0' },
  { name: 'present-ferries-marin', url: '/?test=1#map=11.4/37.8700/-122.4600/0/0' },
  { name: 'present-peninsula', url: '/?test=1#map=10.4/37.5600/-122.2900/0/0' },
  { name: 'present-sfo-airtrain', url: '/l/sfo-airtrain?test=1&at=99' },
  { name: 'present-brt-van-ness', url: '/l/muni-49?test=1&at=99' },
  { name: 'present-brt-tempo', url: '/l/ac-transit-1t?test=1&at=99' },
  { name: 'present-brt-alum-rock', url: '/l/vta-522?test=1&at=99' },
  // Phase 2a: the past-era pilot (Key System, SP Red Trains / IER, the Bay Bridge railway).
  { name: 'past-1905', url: '/?era=past&year=1905&test=1#map=12.2/37.8300/-122.2900/0/0' },
  { name: 'past-1912', url: '/?era=past&year=1912&test=1#map=11.8/37.8200/-122.2700/0/0' },
  { name: 'past-east-bay-1925', url: '/?era=past&year=1925&test=1#map=11.8/37.8200/-122.2700/0/0' },
  { name: 'past-1940', url: '/?era=past&year=1940&test=1#map=11.6/37.8100/-122.3200/0/0' },
  { name: 'past-1950', url: '/?era=past&year=1950&test=1#map=11.8/37.8200/-122.2900/0/0' },
  { name: 'past-key-pier', url: '/?era=past&year=1925&test=1#map=13.4/37.8210/-122.3200/0/0' },
  { name: 'past-sf-loop', url: '/?era=past&year=1945&test=1#map=15.6/37.7880/-122.3950/0/0' },
  { name: 'past-line-key-f', url: '/l/key-f?era=past&year=1945&test=1&at=99' },
  { name: 'past-line-sp-shattuck', url: '/l/sp-shattuck-avenue?era=past&year=1935&test=1&at=99' },
  // Phase 2b: today's network grows in on the slider (BART, Muni).
  { name: 'past-bay-1973', url: '/?era=past&year=1973&test=1#map=10.2/37.7600/-122.2400/0/0' },
  { name: 'past-bay-1975', url: '/?era=past&year=1975&test=1#map=10.2/37.7600/-122.2400/0/0' },
  { name: 'past-bay-2005', url: '/?era=past&year=2005&test=1#map=10.2/37.7000/-122.2400/0/0' },
  { name: 'past-sf-1890', url: '/?era=past&year=1890&test=1#map=14.2/37.7960/-122.4130/0/0' },
  { name: 'past-sf-1930', url: '/?era=past&year=1930&test=1#map=12.4/37.7500/-122.4500/0/0' },
  { name: 'past-sf-1985', url: '/?era=past&year=1985&test=1#map=12.4/37.7500/-122.4500/0/0' },
  { name: 'past-line-bart-yellow', url: '/l/bart-yellow?era=past&year=1990&test=1&at=99' },
  // Checkpoint 2b: the whole Bay Area by decade, San Francisco close in, and a few new lines.
  { name: 'past-region-1870', url: '/?era=past&year=1870&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-1890', url: '/?era=past&year=1890&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-1910', url: '/?era=past&year=1910&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-1930', url: '/?era=past&year=1930&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-1950', url: '/?era=past&year=1950&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-1975', url: '/?era=past&year=1975&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-region-2000', url: '/?era=past&year=2000&test=1#map=9.4/37.7500/-122.2500/0/0' },
  { name: 'past-sf-1920', url: '/?era=past&year=1920&test=1#map=12.9/37.7850/-122.4400/0/0' },
  { name: 'past-sf-1900-peninsula', url: '/?era=past&year=1900&test=1#map=12.2/37.7200/-122.4300/0/0' },
  { name: 'past-line-sp-peninsula', url: '/l/sp-peninsula?era=past&year=1920&test=1&at=99' },
  { name: 'past-line-sn', url: '/l/sn-oakland-sacramento?era=past&year=1925&test=1&at=99' },
  { name: 'past-line-nwp-san-rafael', url: '/l/nwp-sausalito-san-rafael?era=past&year=1925&test=1&at=99' },
  { name: 'past-line-muni-h', url: '/l/muni-h-potrero?era=past&year=1930&test=1&at=99' },
  // Checkpoint 2c (with the region views above, re-taken): the Sacramento Northern to the county
  // line, San Francisco and Oakland close in, and the new lines' panels.
  { name: 'past-region-wide-1925', url: '/?era=past&year=1925&test=1#map=8.7/37.9800/-122.1500/0/0' },
  { name: 'past-mallard-1925', url: '/?era=past&year=1925&test=1#map=13.2/38.0450/-121.9300/0/0' },
  { name: 'past-sf-1865', url: '/?era=past&year=1865&test=1#map=13.6/37.7750/-122.4150/0/0' },
  { name: 'past-sf-market-1890', url: '/?era=past&year=1890&test=1#map=13.4/37.7740/-122.4300/0/0' },
  { name: 'past-oakland-1915', url: '/?era=past&year=1915&test=1#map=13.8/37.8150/-122.2700/0/0' },
  { name: 'past-oakland-1930', url: '/?era=past&year=1930&test=1#map=13.0/37.8250/-122.2650/0/0' },
  { name: 'past-line-sf-steam-dummy', url: '/l/sf-market-st-steam-dummy?era=past&year=1865&test=1&at=99' },
  { name: 'past-line-sf-market-valencia-cable', url: '/l/sf-market-valencia-cable?era=past&year=1890&test=1&at=99' },
  { name: 'past-line-key-e', url: '/l/key-e?era=past&year=1930&test=1&at=99' },
  { name: 'past-line-sp-eighteenth-street', url: '/l/sp-eighteenth-street?era=past&year=1920&test=1&at=99' },
  // The Market Street Railway's numbered lines, drawn for the years Manley (1909) and O'Shaughnessy
  // (1929) show them running (decision 20).
  { name: 'past-sf-streetcars-1910', url: '/?era=past&year=1910&test=1#map=12.7/37.7720/-122.4380/0/0' },
  { name: 'past-sf-streetcars-1929', url: '/?era=past&year=1929&test=1#map=12.7/37.7720/-122.4380/0/0' },
  { name: 'past-sf-downtown-1929', url: '/?era=past&year=1929&test=1#map=14.4/37.7850/-122.4080/0/0' },
  { name: 'past-line-msry-21', url: '/l/msry-21?era=past&year=1929&test=1&at=99' },
  { name: 'past-line-msry-6', url: '/l/msry-6?era=past&year=1910&test=1&at=99' },
  // The East Bay's streetcars, from the Railroad Commission's orders of 1931-48 (decision 20).
  { name: 'past-sf-streetcars-1940', url: '/?era=past&year=1940&test=1#map=12.7/37.7720/-122.4380/0/0' },
  { name: 'past-bay-ferries-1900', url: '/?era=past&year=1900&test=1#map=11.2/37.8300/-122.3300/0/0' },
  { name: 'past-bay-ferries-1925', url: '/?era=past&year=1925&test=1#map=10.6/37.8600/-122.3600/0/0' },
  { name: 'past-oakland-streetcars-1935', url: '/?era=past&year=1935&test=1#map=12.4/37.8150/-122.2400/0/0' },
  { name: 'past-oakland-streetcars-1947', url: '/?era=past&year=1947&test=1#map=12.4/37.8150/-122.2400/0/0' },
  { name: 'past-line-eb-11', url: '/l/eb-11-oakland-ave?era=past&year=1942&test=1&at=99' },
  { name: 'past-marin-1900', url: '/?era=past&year=1900&test=1#map=9.6/38.1600/-122.7500/0/0' },
  { name: 'past-marin-1931', url: '/?era=past&year=1931&test=1#map=9.6/38.1600/-122.7500/0/0' },
  { name: 'past-line-npc', url: '/l/npc-main-line?era=past&year=1900&test=1&at=99' },
  { name: 'past-line-msry-40', url: '/l/msry-40?era=past&year=1930&test=1&at=99' },
  { name: 'past-north-bay-1880', url: '/?era=past&year=1880&test=1#map=9.2/38.2500/-122.7000/0/0' },
  { name: 'past-north-bay-1940', url: '/?era=past&year=1940&test=1#map=9.2/38.2500/-122.7000/0/0' },
  { name: 'past-line-sfnp-tiburon', url: '/l/sfnp-tiburon?era=past&year=1888&test=1&at=99' },
  { name: 'present-smart', url: '/?era=present&test=1#map=9.6/38.2000/-122.6500/0/0' },
  { name: 'past-line-cp-benicia', url: '/l/cp-oakland-sacramento-benicia?era=past&year=1900&test=1&at=99' },
  { name: 'past-carquinez-1900', url: '/?era=past&year=1900&test=1#map=12.6/38.0450/-122.1550/0/0' },
  { name: 'past-line-spc', url: '/l/spc-alameda-santa-cruz?era=past&year=1895&test=1&at=99' },
  { name: 'past-line-napa', url: '/l/calp-vallejo-calistoga?era=past&year=1900&test=1&at=99' },
  { name: 'past-line-calp-suisun', url: '/l/calp-vallejo-suisun?era=past&year=1885&test=1&at=99' },
  { name: 'past-line-san-ramon', url: '/l/sp-san-ramon-branch?era=past&year=1900&test=1&at=99' },
  { name: 'past-line-psr-santa-rosa', url: '/l/psr-sebastopol-santa-rosa?era=past&year=1920&test=1&at=99' },
  { name: 'past-line-santa-fe', url: '/l/atsf-stockton-ferry-point?era=past&year=1910&test=1&at=99' },
  { name: 'past-line-mt-tamalpais', url: '/l/mt-tamalpais-railway?era=past&year=1910&test=1&at=99' },
  { name: 'past-line-sonoma-valley', url: '/l/sfnp-sonoma-valley?era=past&year=1920&test=1&at=99' },
  { name: 'past-line-msry-22', url: '/l/msry-22?era=past&year=1929&test=1&at=99' },
  { name: 'past-line-santa-rosa-horsecars', url: '/l/sr-horsecars-fourth-mcdonald?era=past&year=1890&test=1&at=99' },
  { name: 'past-line-petaluma-horsecars', url: '/l/petaluma-street-railroad?era=past&year=1902&test=1&at=99' },
  { name: 'past-line-dumbarton', url: '/l/sp-dumbarton-redwood-niles?era=past&year=1914&test=1&at=99' },
  { name: 'past-line-petaluma-steamers', url: '/l/psr-steamers?era=past&year=1920&test=1&at=99' },
  { name: 'past-line-mare-island-ferry', url: '/l/mare-island-ferry?era=past&year=1943&test=1&at=99' },
  { name: 'past-line-oakland-san-jose-1941', url: '/l/sp-oakland-san-jose-elmhurst?era=past&year=1950&test=1&at=99' },
  { name: 'present-line-niles-canyon-railway', url: '/l/niles-canyon-railway?era=present&test=1&at=99' },
  { name: 'past-line-western-pacific', url: '/l/wp-oakland-stockton?era=past&year=1925&test=1&at=99' },
  // Checkpoint 2d (with the region views above, re-taken): the lines OpenHistoricalMap's ways
  // made drawable, and the belt lines.
  { name: 'past-line-california-nevada', url: '/l/cn-oakland-bryant?era=past&year=1896&test=1&at=99' },
  { name: 'past-east-bay-1896', url: '/?era=past&year=1896&test=1#map=11.2/37.8700/-122.2400/0/0' },
  { name: 'past-line-wp-san-jose', url: '/l/wp-niles-san-jose?era=past&year=1925&test=1&at=99' },
  { name: 'past-south-bay-1925', url: '/?era=past&year=1925&test=1#map=10.6/37.4600/-121.9500/0/0' },
  { name: 'past-line-los-altos', url: '/l/sp-los-altos-branch?era=past&year=1930&test=1&at=99' },
  { name: 'past-line-tracy', url: '/l/sp-oakland-tracy?era=past&year=1930&test=1&at=99' },
  { name: 'past-line-san-quentin', url: '/l/npc-san-quentin-trains?era=past&year=1880&test=1&at=99' },
  { name: 'past-marin-1880', url: '/?era=past&year=1880&test=1#map=11.4/37.9200/-122.4800/0/0' },
  { name: 'past-line-sn-freight', url: '/l/sn-oakland-lafayette-freight?era=past&year=1950&test=1&at=99' },
  { name: 'past-oakland-hills-1950', url: '/?era=past&year=1950&test=1#map=11.8/37.8350/-122.2000/0/0' },
  { name: 'past-line-alameda-belt', url: '/l/abl-clement-ave?era=past&year=1930&test=1&at=99' },
  { name: 'past-line-otr-40th-st', url: '/l/otr-40th-st?era=past&year=1950&test=1&at=99' },
  { name: 'past-west-oakland-1957', url: '/?era=past&year=1957&test=1#map=13.6/37.8150/-122.2750/0/0' },
  { name: 'past-line-ocean-shore', url: '/l/os-san-francisco-tunitas?era=past&year=1915&test=1&at=99' },
  { name: 'past-coast-1915', url: '/?era=past&year=1915&test=1#map=10.8/37.6000/-122.4700/0/0' },
  // Checkpoint 3: the future era under each way of drawing status (?solidity=), for Matthew to choose.
  ...(['opacity', 'tint', 'committed'] as const).flatMap((style) => [
    { name: `future-${style}-regional`, url: `/?era=future&solidity=${style}&test=1` },
    { name: `future-${style}-sf`, url: `/?era=future&solidity=${style}&test=1#map=13.0/37.7720/-122.4050/0/0` },
    { name: `future-${style}-south-bay`, url: `/?era=future&solidity=${style}&test=1#map=11.4/37.3600/-121.9300/0/0` },
    { name: `future-${style}-north-bay`, url: `/?era=future&solidity=${style}&test=1#map=10.2/38.5300/-122.8300/0/0` },
  ]),
  // Checkpoint 4: the reference proposals (layer B, "Show proposals"), two of their panels, and the editor.
  { name: 'future-proposals-regional', url: '/?era=future&proposals=1&test=1' },
  { name: 'future-proposals-sf', url: '/?era=future&proposals=1&test=1#map=12.7/37.7720/-122.4430/0/0' },
  { name: 'future-proposals-dumbarton', url: '/?era=future&proposals=1&test=1#map=12.4/37.4960/-122.1300/0/0' },
  // The three ways to draw proposals (?proposalstyle=), for Matthew to choose.
  ...(['translucent', 'tint', 'neutral'] as const).flatMap((style) => [
    { name: `future-proposals-${style}-sf`, url: `/?era=future&proposals=1&proposalstyle=${style}&test=1#map=13.4/37.7800/-122.4400/0/0` },
    { name: `future-proposals-${style}-dumbarton`, url: `/?era=future&proposals=1&proposalstyle=${style}&test=1#map=13.6/37.4790/-122.1750/0/0` },
  ]),
  { name: 'future-line-geary-19th-subway', url: '/l/geary-19th-subway?test=1&at=99' },
  { name: 'future-line-reimagine-dumbarton', url: '/l/reimagine-dumbarton-busway?test=1&at=99' },
  { name: 'future-editor', url: '/?edit=1&test=1#map=12.2/37.7700/-122.4300/0/0' },
  // Checkpoint 5: the lost lines under today's network, three ways; the style panel.
  ...(['hue', 'ink', 'dashed'] as const).flatMap((style) => [
    { name: `present-ghost-${style}-east-bay`, url: `/?ghost=1&ghoststyle=${style}&test=1#map=11.8/37.8200/-122.2700/0/0` },
    { name: `present-ghost-${style}-sf`, url: `/?ghost=1&ghoststyle=${style}&test=1#map=13.0/37.7750/-122.4300/0/0` },
  ]),
  // The same at 0.55 (theme.transit.eras.ghostOpacity is 0.3).
  ...(['hue', 'ink'] as const).map((style) => (
    { name: `present-ghost-${style}-055-east-bay`, url: `/?ghost=1&ghoststyle=${style}&test=1#map=11.8/37.8200/-122.2700/0/0`,
      paint: [['transit-ghost', 'line-opacity', 0.55]] as [string, string, unknown][] })),
  { name: 'style-panel', url: '/?style=1&test=1' },
  // Panels with photos (public-domain journal halftones, `make photos`).
  ...['key-f', 'key-ferry', 'mt-tamalpais-railway', 'psr-steamers', 'sp-encinal-avenue', 'msry-40', 'sn-oakland-sacramento',
    'psr-sebastopol-santa-rosa', 'muni-a-geary-10th', 'nwp-mill-valley', 'psr-petaluma-sebastopol', 'sp-seventh-street',
    'nwp-sausalito-san-rafael', 'os-san-francisco-tunitas', 'wp-ferry', 'cp-oakland-sacramento-benicia', 'vallejo-ferry',
    'sp-shattuck-avenue', 'sp-lincoln-avenue', 'key-c'].map((id) => (
    { name: `past-line-${id}-photo`, url: `/l/${id}?era=past&year=1912&test=1&at=99` })),
  // The F line opened in December 1914.
  { name: 'past-line-muni-f-stockton-photo', url: '/l/muni-f-stockton?era=past&year=1915&test=1&at=99' },
  // The Golden Gate Ferry's runs opened in 1922 and 1927.
  ...['ggf-hyde-sausalito', 'ggf-hyde-berkeley'].map((id) => (
    { name: `past-line-${id}-photo`, url: `/l/${id}?era=past&year=1928&test=1&at=99` })),
  { name: 'mobile-line-key-f-photo', url: '/l/key-f?era=past&year=1912&test=1&at=99', width: 390, height: 844 },
  { name: 'style-panel-mobile', url: '/?style=1&test=1', width: 390, height: 844 },
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

for (const v of VIEWS.filter((x) => ONLY.test(x.name))) {
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
    if (v.paint) {
      await page.waitForFunction(() => document.body.dataset.mapReady === 'true', null, { timeout: 120_000 });
      await page.evaluate((paint) => {
        const m = (window as unknown as { __map: import('maplibre-gl').Map }).__map;
        for (const [layer, prop, value] of paint) m.setPaintProperty(layer, prop as 'line-opacity', value as number);
      }, v.paint);
    }
    await settle(page);
    await page.screenshot({ path: `${DIR}/${v.name}.png`, timeout: 120_000 });
    await context.close();
  });
}
