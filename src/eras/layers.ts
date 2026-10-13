/**
 * The transit layers, drawn over BAM's basemap (above the buildings, below the place labels).
 *
 * Every era has three GeoJSON sources, loaded by URL (data never goes into the style):
 * - `transit-<era>-draw`: one feature per segment, the visible strokes. Opaque, so lines sharing
 *   track read as one stroke; translucency only for fades, the ghost overlay and future solidity.
 * - `transit-<era>-lines`: one feature per line x segment use: the hit target, and a highlight
 *   layer shown only where the line is hovered or selected (feature-state, keyed by `fid`).
 * - `transit-<era>-points`: stations, piers, terminals.
 *
 * Encodings (docs/DECISIONS.md): hue and width are mode; a dash is approximate geometry; a hollow
 * tube is a tunnel or subway; a lighter tint is a date borrowed from the line; future status is
 * solidity; the ghost overlay is faint and uncased.
 *
 * The year is not in the style at all. In the past era, every layer's opacity reads a feature-state
 * `vis`, which src/timeline/visibility.ts sets only on the features crossing the year: a filter or a
 * global-state change would reload the whole source on every step (docs/DECISIONS.md).
 */
import type { ExpressionSpecification, LayerSpecification, SourceSpecification } from 'maplibre-gl';

/** Filters are written as expressions throughout (never the legacy filter syntax). */
type FilterSpecification = ExpressionSpecification;
import { MODE_GROUPS, modeColor, modeWidth, over, type ModeGroup, type Theme } from '../theme/theme';
import { currentDrawing, DRAW_SOURCE } from '../basemap/flight';
import type { Era } from '../data/vocab';

export interface TransitView {
  era: Era;
  /** Past rights-of-way, faint, under the present and future networks. */
  ghost: boolean;
  /** Filter groups switched off in the legend. */
  hiddenGroups: ModeGroup[];
  /** The open line, if any (its stations get labels). */
  selected: string | null;
}

/** Datasets drawn in each era. The past era runs to today, so it includes the present network. */
export const DATASETS: Record<Era, Era[]> = {
  past: ['past', 'present'],
  present: ['present'],
  future: ['present', 'future'],
};

/** Layers that open a line when clicked. */
export const hitLayers = (era: Era) => DATASETS[era].map((d) => `transit-${d}-hit`);

/** After closing, a line stays on the map, fading, for this many years. */
export const fadeOutYears = (theme: Theme) => theme.transit.eras.fadeOutYears;

/** In the past era, how visible a feature is this year (set by src/timeline/visibility.ts). */
const VIS: ExpressionSpecification = ['coalesce', ['feature-state', 'vis'], 0];

const byGroup = (_theme: Theme, value: (g: ModeGroup) => string | number): ExpressionSpecification =>
  ['match', ['get', 'group'], ...MODE_GROUPS.flatMap((g) => [g, value(g)]), value('heavy_rail')] as unknown as ExpressionSpecification;

/** Line width at z6, z10 and z15, exponential, scaled by the mode's width. */
function width(theme: Theme, z6: number, z10: number, z15: number, extra = 0): ExpressionSpecification {
  const w = (g: ModeGroup, v: number) => +(v * modeWidth(theme, g) + extra).toFixed(2);
  return [
    'interpolate', ['exponential', 1.6], ['zoom'],
    6, byGroup(theme, (g) => w(g, z6)),
    10, byGroup(theme, (g) => w(g, z10)),
    15, byGroup(theme, (g) => w(g, z15)),
  ];
}

/** The mode color, or a lighter tint (toward the paper) where the dates were borrowed from the line. */
function color(theme: Theme): ExpressionSpecification {
  const mix = theme.transit.eras.borrowedDatesMix;
  return ['case', ['==', ['get', 'borrowed'], 1],
    byGroup(theme, (g) => over(modeColor(theme, g), 1 - mix, theme.colors.land)),
    byGroup(theme, (g) => modeColor(theme, g)),
  ];
}

/**
 * Future status as solidity; shared existing track at BAM's 0.55. In the future era today's network
 * steps back (BAM: the present as print, the future in color). In the past era, the year's `vis`.
 */
function opacity(theme: Theme, dataset: Era, era: Era): ExpressionSpecification | number {
  if (era === 'past') return VIS;
  if (dataset === 'present' && era === 'future') return theme.transit.eras.presentInFuture;
  if (dataset !== 'future') return 1;
  const s = theme.transit.status;
  return ['*',
    ['match', ['get', 'status'],
      'planned', s.planned, 'environmental', s.environmental, 'funded', s.funded,
      'under_construction', s.under_construction, 'opening', s.opening, 1],
    ['case', ['==', ['get', 'shared'], 1], 0.55, 1]];
}

/** Undated features never show on the year slider (decision 4); the year itself is feature-state. */
function pastFilter(view: TransitView): FilterSpecification[] {
  return view.era === 'past' ? [['==', ['get', 'undated'], 0]] : [];
}

const groupFilter = (view: TransitView): FilterSpecification[] =>
  view.hiddenGroups.length ? [['!', ['in', ['get', 'group'], ['literal', view.hiddenGroups]]]] : [];

const TUBE: FilterSpecification = ['in', ['get', 'structure'], ['literal', ['tunnel', 'subway']]];
const APPROX: FilterSpecification = ['==', ['get', 'conf'], 'approximate'];

export function transitSources(urls: Record<Era, { draw: string; lines: string; points: string }>, loaded: Era[]): Record<string, SourceSpecification> {
  const out: Record<string, SourceSpecification> = {};
  for (const era of loaded) {
    out[`transit-${era}-draw`] = { type: 'geojson', data: urls[era].draw, promoteId: 'fid' };
    out[`transit-${era}-lines`] = { type: 'geojson', data: urls[era].lines, promoteId: 'fid' };
    out[`transit-${era}-points`] = { type: 'geojson', data: urls[era].points, promoteId: 'fid' };
  }
  out[DRAW_SOURCE] = { type: 'geojson', data: currentDrawing() };
  return out;
}

export function transitLayers(theme: Theme, view: TransitView, fonts: { regular: string[]; medium: string[] }): LayerSpecification[] {
  const c = theme.colors;
  const layers: LayerSpecification[] = [];
  const all = (...f: FilterSpecification[]): FilterSpecification =>
    (f.length === 0 ? ['literal', true] : f.length === 1 ? f[0] : ['all', ...f]) as FilterSpecification;

  if (view.ghost && view.era !== 'past') {
    layers.push({
      id: 'transit-ghost',
      type: 'line',
      source: 'transit-past-draw',
      filter: all(...groupFilter(view)),
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': byGroup(theme, (g) => modeColor(theme, g)),
        'line-opacity': theme.transit.eras.ghostOpacity,
        'line-width': width(theme, 0.8, 1.2, 3),
      },
    });
  }

  for (const d of DATASETS[view.era]) {
    const base = [...pastFilter(view), ...groupFilter(view)];
    const src = `transit-${d}-draw`;
    layers.push(
      {
        // A paper casing under every stroke, so lines read over the building print.
        id: `transit-${d}-casing`,
        type: 'line',
        source: src,
        filter: all(...base),
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': c.land, 'line-width': width(theme, 2.8, 4.8, 11), 'line-opacity': opacity(theme, d, view.era) },
      },
      {
        id: `transit-${d}-solid`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], ['!', TUBE], ...base),
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': color(theme), 'line-width': width(theme, 1.5, 2.6, 6.5), 'line-opacity': opacity(theme, d, view.era) },
      },
      {
        // Tunnels and subways: a hollow tube (BAM's convention).
        id: `transit-${d}-tube`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], TUBE, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: { 'line-color': color(theme), 'line-width': width(theme, 1.9, 3.3, 9), 'line-opacity': opacity(theme, d, view.era) },
      },
      {
        id: `transit-${d}-tube-hollow`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], TUBE, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: { 'line-color': c.land, 'line-width': width(theme, 0.6, 1.3, 4.5), 'line-opacity': opacity(theme, d, view.era) },
      },
      {
        // Approximate geometry (reconstructed from text) is dashed, whatever its structure.
        id: `transit-${d}-dashed`,
        type: 'line',
        source: src,
        filter: all(APPROX, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: {
          'line-color': color(theme),
          'line-width': width(theme, 1.5, 2.6, 6.5),
          'line-opacity': opacity(theme, d, view.era),
          'line-dasharray': [2, 1.6],
        },
      },
      {
        // Shown only on the hovered or selected line (feature-state), wider than its stroke.
        id: `transit-${d}-highlight`,
        type: 'line',
        source: `transit-${d}-lines`,
        filter: all(...base),
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': byGroup(theme, (g) => modeColor(theme, g)),
          'line-width': width(theme, 3, 5, 11),
          'line-opacity': ['*', view.era === 'past' ? VIS : 1, ['case',
            ['boolean', ['feature-state', 'selected'], false], 1,
            ['boolean', ['feature-state', 'hover'], false], 0.9,
            0]],
        },
      },
    );
  }

  layers.push(
    {
      id: 'transit-selected-casing',
      type: 'line',
      source: DRAW_SOURCE,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': c.land, 'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 6, 3.2, 10, 5, 15, 12] },
    },
    {
      // The selected line draws itself in the selection color, visible over same-colored shared track.
      id: 'transit-selected-line',
      type: 'line',
      source: DRAW_SOURCE,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': c.selection, 'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 6, 1.4, 10, 2.4, 15, 6] },
    },
  );

  for (const d of DATASETS[view.era]) {
    const base = [...pastFilter(view), ...groupFilter(view)];
    const isNew: ExpressionSpecification = ['==', ['get', 'status'], 'new'];
    layers.push(
      {
        // Existing stations are hollow (paper fill, mode ring); new ones are filled (BAM's convention).
        id: `transit-${d}-stations`,
        type: 'circle',
        source: `transit-${d}-points`,
        minzoom: 10,
        filter: all(...base),
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 2.2, 13, 3.6, 16, 5.5],
          'circle-color': ['case', isNew, byGroup(theme, (g) => modeColor(theme, g)), c.land],
          'circle-stroke-color': ['case', isNew, c.land, byGroup(theme, (g) => modeColor(theme, g))],
          'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1.1, 16, 2],
          'circle-opacity': view.era === 'past' ? VIS : 1,
          'circle-stroke-opacity': view.era === 'past' ? VIS : 1,
        },
      },
      {
        // Station names only for the open line, and only close in: labels stay sparse.
        id: `transit-${d}-station-labels`,
        type: 'symbol',
        source: `transit-${d}-points`,
        minzoom: 11,
        filter: all(['in', `,${view.selected ?? '-'},`, ['get', 'lines']], ...base),
        layout: {
          'text-field': ['get', 'name'],
          'text-font': fonts.medium,
          'text-size': 12,
          'text-offset': [0, 0.9],
          'text-anchor': 'top',
          'text-max-width': 9,
          'text-optional': true,
        },
        paint: { 'text-color': c.labels, 'text-halo-color': c.land, 'text-halo-width': 1.6, 'text-opacity': view.era === 'past' ? VIS : 1 },
      },
    );
  }

  // Invisible, wide hit targets last, so thin lines are easy to hover and tap.
  for (const d of DATASETS[view.era]) {
    layers.push({
      id: `transit-${d}-hit`,
      type: 'line',
      source: `transit-${d}-lines`,
      filter: all(...pastFilter(view), ...groupFilter(view)),
      paint: { 'line-color': '#000000', 'line-opacity': 0, 'line-width': 16 },
    });
  }
  return layers;
}
