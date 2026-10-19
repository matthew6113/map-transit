/**
 * The transit layers, drawn over BAM's basemap (above the buildings, below the place labels).
 *
 * Every dataset (each era's own, and `ideal`, the future's reference proposals) has three GeoJSON sources, loaded by URL (data never goes into the style):
 * - `transit-<era>-draw`: one feature per segment, the visible strokes. Opaque, so lines sharing
 *   track read as one stroke; translucency only for fades, the ghost overlay and future solidity.
 * - `transit-<era>-lines`: one feature per line x segment use: the hit target, and a highlight
 *   layer shown only where the line is hovered or selected (feature-state, keyed by `fid`).
 * - `transit-<era>-points`: stations, piers, terminals.
 *
 * Encodings (docs/DECISIONS.md): hue and width are mode; a dash is approximate geometry; a hollow
 * tube is a tunnel or subway; a lighter tint is a date borrowed from the line; future status is
 * solidity; reference proposals are thinner (theme.transit.proposals); the ghost overlay is faint and uncased. Close in, different modes on the same path spread
 * apart by their slot, `off` (decision 10); the open line's drawing and the stations stay on the true
 * path.
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
import type { Dataset, Era } from '../data/vocab';

export interface TransitView {
  era: Era;
  /** Past rights-of-way, faint, under the present and future networks. */
  ghost: boolean;
  /** Filter groups switched off in the legend. */
  hiddenGroups: ModeGroup[];
  /** The open line, if any (its stations get labels). */
  selected: string | null;
  /** How future status is drawn: one of the options shown at the Phase 3 checkpoint. */
  statusStyle?: StatusStyle;
  /** Future era: draw the reference proposals (layer B) too. */
  proposals?: boolean;
  /** Future era: draw Matthew's own network (layer B). */
  network?: boolean;
  /** How the reference proposals are drawn: one of the options shown at the Phase 4 checkpoint. */
  proposalStyle?: ProposalStyle;
  /** How the lost lines under today's network are drawn: one of the options shown at the Phase 5 checkpoint. */
  ghostStyle?: GhostStyle;
}

/**
 * Ways to draw the lost lines under today's and the future's networks ("Show lost lines underneath"),
 * shown at the Phase 5 checkpoint (`?ghoststyle=`), all at theme.transit.eras.ghostOpacity:
 * - `hue`: each line in its mode's hue, as in the past era; Matthew's choice (decision 22);
 * - `ink`: the building print's ink, so the past reads as print under today's color;
 * - `dashed`: the mode's hue, dashed, so a lost line can't pass for a running one.
 */
export type GhostStyle = 'hue' | 'ink' | 'dashed';
export const GHOST_STYLES: GhostStyle[] = ['hue', 'ink', 'dashed'];
export const DEFAULT_GHOST_STYLE: GhostStyle = 'hue';

/**
 * Ways to draw the reference proposals, shown at the Phase 4 checkpoint (`?proposalstyle=`). All are
 * thinner than lines being built (theme.transit.proposals.width), and dashed where approximate:
 * - `translucent`: the mode's hue, slightly translucent (theme.transit.proposals);
 * - `tint`: the mode's hue mixed toward the paper, opaque, so a proposal on real track can't pass for a
 *   running line; Matthew's choice (decision 22);
 * - `neutral`: one color for every proposal, the mode left to the panel.
 */
export type ProposalStyle = 'translucent' | 'tint' | 'neutral';
export const PROPOSAL_STYLES: ProposalStyle[] = ['translucent', 'tint', 'neutral'];
export const DEFAULT_PROPOSAL_STYLE: ProposalStyle = 'tint';

/**
 * Ways to draw a future line's status, shown at the Phase 3 checkpoint (`?solidity=` previews):
 * - `opacity`: the status ladder as opacity (theme.transit.status);
 * - `tint`: the same ladder as an opaque tint toward the paper, so overlaps don't darken; Matthew's
 *   choice (decision 22);
 * - `committed`: two steps, pale and thin while planned or in environmental review, full once funded.
 */
export type StatusStyle = 'opacity' | 'tint' | 'committed';
export const STATUS_STYLES: StatusStyle[] = ['opacity', 'tint', 'committed'];
export const DEFAULT_STATUS_STYLE: StatusStyle = 'tint';

const UNCOMMITTED = ['planned', 'environmental'];

/**
 * Datasets drawn in each era. The past era runs to today, so it includes the present network; the
 * future's includes the reference proposals, drawn when switched on (`shownDatasets`).
 */
export const DATASETS: Record<Era, Dataset[]> = {
  past: ['past', 'present'],
  present: ['present'],
  future: ['present', 'future', 'ideal'],
};

/** The datasets on the map now: layer B only when its proposals or Matthew's network are switched on. */
export const shownDatasets = (view: Pick<TransitView, 'era' | 'proposals' | 'network'>) =>
  DATASETS[view.era].filter((d) => d !== 'ideal' || view.proposals || view.network);

/** Within layer B, the line statuses shown: `proposed` (the reference proposals) and `ideal` (Matthew's). */
const idealFilter = (view: TransitView, key = 'status'): FilterSpecification[] =>
  [['in', ['get', key], ['literal', [...(view.proposals ? ['proposed'] : []), ...(view.network ? ['ideal'] : [])]]]];
const IS_PROPOSAL: ExpressionSpecification = ['==', ['get', 'status'], 'proposed'];

/** Layers that open a line when clicked (those not in the style are skipped by the caller). */
export const hitLayers = (era: Era) => DATASETS[era].map((d) => `transit-${d}-hit`);

/** After closing, a line stays on the map, fading, for this many years. */
export const fadeOutYears = (theme: Theme) => theme.transit.eras.fadeOutYears;

/** In the past era, how visible a feature is this year (set by src/timeline/visibility.ts). */
const VIS: ExpressionSpecification = ['coalesce', ['feature-state', 'vis'], 0];

const byGroup = (_theme: Theme, value: (g: ModeGroup) => string | number): ExpressionSpecification =>
  ['match', ['get', 'group'], ...MODE_GROUPS.flatMap((g) => [g, value(g)]), value('heavy_rail')] as unknown as ExpressionSpecification;

/** Line width at z6, z10 and z15, exponential, scaled by the mode's width. */
function width(theme: Theme, z6: number, z10: number, z15: number, extra = 0, factor: number | ExpressionSpecification = 1): ExpressionSpecification {
  const w = (g: ModeGroup, v: number) => +(v * modeWidth(theme, g) + extra).toFixed(2);
  const at = (v: number): ExpressionSpecification | number =>
    factor === 1 ? byGroup(theme, (g) => w(g, v)) : ['*', byGroup(theme, (g) => w(g, v)), factor];
  return [
    'interpolate', ['exponential', 1.6], ['zoom'],
    6, at(z6),
    10, at(z10),
    15, at(z15),
  ] as unknown as ExpressionSpecification;
}

/** Different modes on the same path, side by side close in: each piece's slot times the spacing. */
function offset(theme: Theme): ExpressionSpecification {
  const { zooms, px } = theme.transit.sideBySide;
  return ['interpolate', ['linear'], ['zoom'],
    ...zooms.flatMap((z, i) => [z, ['*', ['coalesce', ['get', 'off'], 0], px[i]]])] as unknown as ExpressionSpecification;
}

/**
 * A future line's color under the `tint` and `committed` styles: the mode color laid over the paper
 * at the status's strength (the same ladder as the opacity style), or two steps.
 */
function statusColor(theme: Theme, style: StatusStyle): ExpressionSpecification {
  const s = theme.transit.status;
  const tint = (a: number) => byGroup(theme, (g) => over(modeColor(theme, g), a, theme.colors.land));
  if (style === 'committed') {
    return ['case', ['in', ['get', 'status'], ['literal', UNCOMMITTED]], tint(s.planned), byGroup(theme, (g) => modeColor(theme, g))];
  }
  return ['match', ['get', 'status'],
    'planned', tint(s.planned), 'environmental', tint(s.environmental), 'funded', tint(s.funded),
    'under_construction', tint(s.under_construction), byGroup(theme, (g) => modeColor(theme, g))];
}

/** A reference proposal's color under each proposal style; Matthew's own lines keep their mode's. */
function proposalColor(theme: Theme, style: ProposalStyle): ExpressionSpecification {
  const p = theme.transit.proposals;
  const own = byGroup(theme, (g) => modeColor(theme, g));
  if (style === 'tint') return ['case', IS_PROPOSAL, byGroup(theme, (g) => over(modeColor(theme, g), 1 - p.tintMix, theme.colors.land)), own];
  if (style === 'neutral') return ['case', IS_PROPOSAL, p.neutral, own];
  return own;
}

/** The same for a proposal's stations, whose features carry their lines' status as `lstatus`. */
function proposalStationColor(theme: Theme, style: ProposalStyle): ExpressionSpecification {
  const p = theme.transit.proposals;
  const own = byGroup(theme, (g) => modeColor(theme, g));
  const proposed: ExpressionSpecification = ['==', ['get', 'lstatus'], 'proposed'];
  if (style === 'tint') return ['case', proposed, byGroup(theme, (g) => over(modeColor(theme, g), 1 - p.tintMix, theme.colors.land)), own];
  if (style === 'neutral') return ['case', proposed, p.neutral, own];
  return own;
}

/** Under the `committed` style, uncommitted future lines are drawn thinner. */
const statusWidth = (style: StatusStyle): number | ExpressionSpecification =>
  style === 'committed' ? ['case', ['in', ['get', 'status'], ['literal', UNCOMMITTED]], 0.6, 1] : 1;

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
function opacity(theme: Theme, dataset: Dataset, era: Era, style: StatusStyle = DEFAULT_STATUS_STYLE, proposalStyle: ProposalStyle = DEFAULT_PROPOSAL_STYLE): ExpressionSpecification | number {
  if (era === 'past') return VIS;
  if (dataset === 'present' && era === 'future') return theme.transit.eras.presentInFuture;
  if (dataset === 'ideal') return ['case', IS_PROPOSAL, proposalStyle === 'translucent' ? theme.transit.proposals.opacity : 1, 1];
  if (dataset !== 'future') return 1;
  const s = theme.transit.status;
  if (style !== 'opacity') return ['case', ['==', ['get', 'shared'], 1], 0.55, 1];
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

export function transitSources(urls: Record<Dataset, { draw: string; lines: string; points: string }>, loaded: Dataset[]): Record<string, SourceSpecification> {
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
    const ghost = view.ghostStyle ?? DEFAULT_GHOST_STYLE;
    layers.push({
      id: 'transit-ghost',
      type: 'line',
      source: 'transit-past-draw',
      filter: all(...groupFilter(view)),
      layout: { 'line-join': 'round', 'line-cap': ghost === 'dashed' ? 'butt' : 'round' },
      paint: {
        'line-color': ghost === 'ink' ? c.buildings : byGroup(theme, (g) => modeColor(theme, g)),
        'line-opacity': theme.transit.eras.ghostOpacity,
        'line-width': width(theme, 0.8, 1.2, 3),
        ...(ghost === 'dashed' ? { 'line-dasharray': [2, 1.5] } : {}),
      },
    });
  }

  const off = offset(theme);
  const style = view.statusStyle ?? DEFAULT_STATUS_STYLE;
  for (const d of shownDatasets(view)) {
    const base = [...pastFilter(view), ...groupFilter(view), ...(d === 'ideal' ? idealFilter(view) : [])];
    const src = `transit-${d}-draw`;
    const styled = d === 'future' && style !== 'opacity';
    const lineColor = styled ? statusColor(theme, style) : d === 'ideal' ? proposalColor(theme, view.proposalStyle ?? DEFAULT_PROPOSAL_STYLE) : color(theme);
    const f = d === 'future' ? statusWidth(style) : d === 'ideal' ? ['case', IS_PROPOSAL, theme.transit.proposals.width, 1] as ExpressionSpecification : 1;
    const op = opacity(theme, d, view.era, style, view.proposalStyle ?? DEFAULT_PROPOSAL_STYLE);
    layers.push(
      {
        // A paper casing under every stroke, so lines read over the building print.
        id: `transit-${d}-casing`,
        type: 'line',
        source: src,
        filter: all(...base),
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': c.land, 'line-width': width(theme, 2.8, 4.8, 11, 0, f), 'line-opacity': op, 'line-offset': off },
      },
      {
        id: `transit-${d}-solid`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], ['!', TUBE], ...base),
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': lineColor, 'line-width': width(theme, 1.5, 2.6, 6.5, 0, f), 'line-opacity': op, 'line-offset': off },
      },
      {
        // Tunnels and subways: a hollow tube (BAM's convention).
        id: `transit-${d}-tube`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], TUBE, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: { 'line-color': lineColor, 'line-width': width(theme, 1.9, 3.3, 9, 0, f), 'line-opacity': op, 'line-offset': off },
      },
      {
        id: `transit-${d}-tube-hollow`,
        type: 'line',
        source: src,
        filter: all(['!', APPROX], TUBE, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: { 'line-color': c.land, 'line-width': width(theme, 0.6, 1.3, 4.5, 0, f), 'line-opacity': op, 'line-offset': off },
      },
      {
        // Approximate geometry (reconstructed from text) is dashed, whatever its structure.
        id: `transit-${d}-dashed`,
        type: 'line',
        source: src,
        filter: all(APPROX, ...base),
        layout: { 'line-join': 'round', 'line-cap': 'butt' },
        paint: {
          'line-color': lineColor,
          'line-width': width(theme, 1.5, 2.6, 6.5, 0, f),
          'line-opacity': op,
          'line-dasharray': [2, 1.6],
          'line-offset': off,
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
          'line-offset': off,
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

  for (const d of shownDatasets(view)) {
    const base = [...pastFilter(view), ...groupFilter(view), ...(d === 'ideal' ? idealFilter(view, 'lstatus') : [])];
    const isNew: ExpressionSpecification = ['==', ['get', 'status'], 'new'];
    // A proposal's stations take the proposal look's color, so they read with its line.
    const ring = d === 'ideal' ? proposalStationColor(theme, view.proposalStyle ?? DEFAULT_PROPOSAL_STYLE) : byGroup(theme, (g) => modeColor(theme, g));
    const waterside: FilterSpecification = ['in', ['get', 'kind'], ['literal', ['pier', 'mole', 'ferry_terminal']]];
    const works: FilterSpecification = ['in', ['get', 'kind'], ['literal', ['carbarn', 'shop', 'yard', 'depot']]];
    layers.push(
      {
        // Piers, moles and ferry terminals: a second, outer ring, where trains met the boats.
        id: `transit-${d}-waterside`,
        type: 'circle',
        source: `transit-${d}-points`,
        minzoom: 10,
        filter: all(waterside, ...base),
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4.6, 13, 6.6, 16, 9.5],
          'circle-color': 'rgba(0,0,0,0)',
          'circle-stroke-color': byGroup(theme, (g) => modeColor(theme, g)),
          'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 1.6],
          'circle-stroke-opacity': view.era === 'past' ? VIS : 1,
        },
      },
      {
        // Existing stations are hollow (paper fill, mode ring); new ones are filled (BAM's convention).
        // Shops, yards and carbarns, where no one boarded, take the label color instead of the mode's.
        id: `transit-${d}-stations`,
        type: 'circle',
        source: `transit-${d}-points`,
        minzoom: 10,
        filter: all(...base),
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 2.2, 13, 3.6, 16, 5.5],
          'circle-color': ['case', isNew, ring, c.land],
          'circle-stroke-color': ['case', isNew, c.land, works, c.labels, ring],
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
  for (const d of shownDatasets(view)) {
    layers.push({
      id: `transit-${d}-hit`,
      type: 'line',
      source: `transit-${d}-lines`,
      filter: all(...pastFilter(view), ...groupFilter(view), ...(d === 'ideal' ? idealFilter(view) : [])),
      paint: { 'line-color': '#000000', 'line-opacity': 0, 'line-width': 16, 'line-offset': offset(theme) },
    });
  }
  return layers;
}
