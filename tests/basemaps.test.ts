/**
 * The base maps (decision 25): each one's whole style is valid MapLibre, puts its layers where the
 * map needs them, and loads another site's tiles only while it is shown.
 */
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { validateStyleMin } from '@maplibre/maplibre-gl-style-spec';
import type { StyleSpecification } from 'maplibre-gl';
import { contrastIssues, defaultTheme, normalizeTheme } from '../src/theme/theme';
import { BASEMAPS, SATELLITE_SOURCE, SATELLITE_STYLES, STREETS_SOURCE, type Basemap, type SatelliteStyle } from '../src/map/basemaps';
import type { StyleInputs } from '../src/map/style';

let buildStyle: (inputs: StyleInputs) => StyleSpecification;

beforeAll(async () => {
  // The style builder reads the page's address for its URLs.
  vi.stubGlobal('location', new URL('http://127.0.0.1:5173/'));
  ({ buildStyle } = await import('../src/map/style'));
});

const style = (basemap: Basemap, opts: Partial<StyleInputs> & { satelliteStyle?: SatelliteStyle } = {}) => buildStyle({
  theme: defaultTheme,
  mode: '2d',
  loaded: ['present'],
  basemap,
  view: { era: 'present', ghost: false, hiddenGroups: [], selected: null },
  ...opts,
});
const ids = (s: StyleSpecification) => s.layers.map((l) => l.id);
const layer = (s: StyleSpecification, id: string) => s.layers.find((l) => l.id === id)!;
const visible = (s: StyleSpecification, id: string) => (layer(s, id).layout as { visibility?: string } | undefined)?.visibility !== 'none';

describe('base maps', () => {
  for (const b of BASEMAPS) {
    for (const mode of ['2d', '3d'] as const) {
      it(`${b} (${mode}) is a valid MapLibre style`, () => {
        expect(validateStyleMin(style(b, { mode, loaded: ['present', 'past', 'future', 'ideal'] })).map((e) => e.message)).toEqual([]);
      });
    }
  }

  it('plain is BAM\'s style as before, with no other site\'s tiles', () => {
    const s = style('plain');
    expect(Object.keys(s.sources)).not.toContain(STREETS_SOURCE);
    expect(Object.keys(s.sources)).not.toContain(SATELLITE_SOURCE);
    expect(ids(s).filter((id) => id.startsWith('transit-streets') || id === 'transit-satellite')).toEqual([]);
  });

  it('keeps every BAM layer id in every base map, hiding rather than removing', () => {
    const bam = ids(style('plain'));
    for (const b of BASEMAPS) expect(ids(style(b))).toEqual(expect.arrayContaining(bam));
  });

  it('names every new layer transit-', () => {
    const bam = new Set(ids(style('plain')));
    for (const b of BASEMAPS) for (const id of ids(style(b))) if (!bam.has(id)) expect(id).toMatch(/^transit-/);
  });

  it('streets: roads replace BAM\'s freeways, under the lines; names sit under the stations', () => {
    const s = style('streets');
    const at = (id: string) => ids(s).indexOf(id);
    expect(visible(s, 'context-freeway')).toBe(false);
    expect(visible(s, 'context-highway')).toBe(false);
    expect(visible(s, 'water')).toBe(true);
    expect(at('transit-streets-parks')).toBeLessThan(at('water'));
    expect(at('transit-streets-roads')).toBeLessThan(at('transit-present-casing'));
    expect(at('transit-streets-names')).toBeGreaterThan(at('transit-present-solid'));
    expect(at('transit-streets-names')).toBeLessThan(at('transit-present-station-labels'));
    expect(at('transit-streets-places')).toBeLessThan(at('label-city-1'));
  });

  it('satellite: imagery over the paper, BAM\'s water and names over it, its buildings and context hidden', () => {
    const s = style('satellite', { mode: '3d' });
    const at = (id: string) => ids(s).indexOf(id);
    expect(at('transit-satellite')).toBe(at('land') + 1);
    expect(at('transit-satellite')).toBeLessThan(at('water'));
    expect(visible(s, 'water')).toBe(true);
    expect(visible(s, 'label-city-1')).toBe(true);
    for (const id of ids(s).filter((i) => i.startsWith('buildings-') || i.startsWith('context-'))) expect(visible(s, id), id).toBe(false);
    // Salt ponds are left to the imagery.
    expect(JSON.stringify((layer(s, 'water') as { filter?: unknown }).filter)).toContain('salt_pond');
  });

  it('satellite: muted by the theme, or natural', () => {
    for (const satelliteStyle of SATELLITE_STYLES) {
      const paint = layer(style('satellite', { satelliteStyle }), 'transit-satellite').paint as Record<string, number>;
      if (satelliteStyle === 'natural') expect(paint).toEqual({});
      else expect(paint['raster-saturation']).toBe(defaultTheme.transit.basemaps.satellite.saturation);
    }
  });

  it('?labels=0 hides the streets\' names too', () => {
    const theme = structuredClone(defaultTheme);
    theme.layers.labels = false;
    const s = style('streets', { theme });
    for (const id of ids(s).filter((i) => /^transit-streets-(names|places|park-names)/.test(i))) expect(visible(s, id), id).toBe(false);
  });
});

describe('base map tokens', () => {
  it('normalizeTheme keeps imported values of the right type and ignores junk', () => {
    const t = normalizeTheme({ transit: { basemaps: { streets: { park: '#EEEEEE', road: 4 }, satellite: { saturation: -0.2, contrast: 'x' } } } });
    expect(t.transit.basemaps.streets.park).toBe('#EEEEEE');
    expect(t.transit.basemaps.streets.road).toBe(defaultTheme.transit.basemaps.streets.road);
    expect(t.transit.basemaps.satellite.saturation).toBe(-0.2);
    expect(t.transit.basemaps.satellite.contrast).toBe(defaultTheme.transit.basemaps.satellite.contrast);
  });

  it('reports street names too pale to read', () => {
    const pale = normalizeTheme({ transit: { basemaps: { streets: { labels: '#B0B0B0' } } } });
    expect(contrastIssues(pale).map((i) => i.subject)).toContain('Street names');
  });
});
