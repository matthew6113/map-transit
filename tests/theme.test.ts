import { describe, expect, it } from 'vitest';
import themeJson from '../src/theme/theme.json';
import vocab from '../data/schema/vocabulary.json';
import { contrast, contrastIssues, defaultTheme, MODE_GROUPS, modeColor, normalizeTheme, over } from '../src/theme/theme';

const HEX = /^#[0-9A-Fa-f]{6}$/;

describe('theme.json', () => {
  it('gives every color role and mode a #rrggbb value', () => {
    for (const [role, value] of Object.entries(themeJson.colors)) expect(value, role).toMatch(HEX);
    for (const group of MODE_GROUPS) expect(modeColor(defaultTheme, group), group).toMatch(HEX);
    expect(themeJson.map.light.color).toMatch(HEX);
  });

  it('has a color and a width for every filter group in the vocabulary, and no others', () => {
    expect(MODE_GROUPS.slice().sort()).toEqual(Object.keys(vocab.groups).sort());
    for (const group of MODE_GROUPS) expect(typeof (themeJson.transit.widths as Record<string, unknown>)[group], group).toBe('number');
  });

  it("keeps BAM's basemap colors, so the two maps can share one theme file", () => {
    expect(themeJson.colors).toMatchObject({
      land: '#FBFAF6', water: '#E3E8EA', shoreline: '#9CA6AE', buildings: '#3A3631', labels: '#3A3835', context: '#C5CAD0',
      controlBorder: '#949494',
    });
  });
});

describe('contrast', () => {
  it('computes WCAG ratios', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(over('#1E1E1E', 0.85, '#FFFFFF')).toBe('#404040');
  });

  it('gives every mode at least 3:1 against land and water, and labels 4.5:1', () => {
    expect(contrastIssues(defaultTheme)).toEqual([]);
  });

  it('reports a mode color too pale for the water', () => {
    const pale = normalizeTheme({ transit: { modes: { ferry: '#9FD3E6' } } });
    expect(contrastIssues(pale).map((i) => `${i.subject}/${i.against}`)).toContain('Mode: ferry/water');
  });
});

describe('normalizeTheme', () => {
  it('fills gaps from the defaults and ignores junk', () => {
    const t = normalizeTheme({ colors: { land: '#FAFAFA', bogus: 3 }, layers: { contextRail: false, overview: 7 } });
    expect(t.colors.land).toBe('#FAFAFA');
    expect(t.colors.water).toBe(defaultTheme.colors.water);
    expect(t.layers.contextRail).toBe(false);
    expect(t.layers.overview).toBe(defaultTheme.layers.overview);
  });
});
