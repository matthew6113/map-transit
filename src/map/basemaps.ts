/**
 * The base maps under the lines (decision 25):
 * - `plain`, BAM's print (the default): land, water, the buildings in ink, city and water names;
 * - `streets`: OpenStreetMap's streets, parks and names, drawn in BAM's paper and ink without hue
 *   (hue means mode), over BAM's land and water, with BAM's buildings faint;
 * - `satellite`: the USGS's aerial imagery on land, muted toward the paper, with BAM's water, shore and
 *   place names. The water stays print because the USGS's cache has none to show there: black no-data
 *   blocks and mosaic seams over the Bay from afar, empty tiles over open water close in.
 *
 * BAM's style (src/basemap/basemap.ts) is built as ever and adjusted here by layer id, so the vendored
 * file stays BAM's. BAM's layers that a base map replaces are hidden, not removed, so a diffed
 * setStyle only flips their visibility. The new layers, all `transit-streets-*` or `transit-satellite`,
 * are spliced in by position. Their sources are in the style only while their base map is shown, so
 * the default view loads nothing from another site.
 */
import type { ExpressionSpecification, LayerSpecification, SourceSpecification, StyleSpecification } from 'maplibre-gl';
import region from '../basemap/region.json';
import type { Theme } from '../theme/theme';

export type Basemap = 'plain' | 'streets' | 'satellite';
export const BASEMAPS: Basemap[] = ['plain', 'streets', 'satellite'];
export const DEFAULT_BASEMAP: Basemap = 'plain';

/** The base map menu's words (sentence case). */
export const BASEMAP_LABELS: Record<Basemap, { label: string; note: string }> = {
  plain: { label: 'Plain', note: 'The city in print' },
  streets: { label: 'Streets', note: 'Street names, from OpenStreetMap' },
  satellite: { label: 'Satellite', note: 'Aerial photos, from the USGS' },
};

/**
 * How the imagery is drawn (`?satellitestyle=`):
 * - `muted`: desaturated and lifted toward the paper (theme.transit.basemaps.satellite), so the lines
 *   stay the star; the default, open for Matthew's review;
 * - `natural`: the imagery as the USGS serves it.
 */
export type SatelliteStyle = 'muted' | 'natural';
export const SATELLITE_STYLES: SatelliteStyle[] = ['muted', 'natural'];
export const DEFAULT_SATELLITE_STYLE: SatelliteStyle = 'muted';

/** OpenFreeMap's TileJSON: OpenStreetMap in the OpenMapTiles schema, rebuilt weekly, no key (DATA_LOG.md). */
export const STREETS_TILEJSON = 'https://tiles.openfreemap.org/planet';
/** The USGS National Map's imagery cache, public domain, no key; cached to zoom 16 (1:9,028), overzoomed past it. */
export const SATELLITE_TILES = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}';
const SATELLITE_MAX_ZOOM = 16;

export const STREETS_CREDIT =
  '<a href="https://openfreemap.org">OpenFreeMap</a> <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> ' +
  'Data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
export const SATELLITE_CREDIT = 'Imagery: USGS The National Map (USDA NAIP and USGS orthoimagery, public domain)';

export const STREETS_SOURCE = 'transit-streets';
export const SATELLITE_SOURCE = 'transit-satellite';

/** BAM's layers each base map hides. */
const HIDDEN: Record<Basemap, (id: string) => boolean> = {
  plain: () => false,
  // OpenStreetMap's roads replace BAM's freeways and highways.
  streets: (id) => id === 'context-highway' || id === 'context-freeway',
  // The imagery shows the roads, the track and the buildings itself.
  satellite: (id) => id.startsWith('context-') || id.startsWith('buildings-'),
};

export interface BasemapOptions {
  basemap: Basemap;
  satelliteStyle?: SatelliteStyle;
  fonts: { regular: string[]; medium: string[]; italic: string[] };
}

/** BAM's style, adjusted for a base map. `plain` returns it unchanged. */
export function applyBasemap(style: StyleSpecification, theme: Theme, opts: BasemapOptions): StyleSpecification {
  if (opts.basemap === 'plain') return style;
  const hidden = HIDDEN[opts.basemap];
  let layers = style.layers.map((l): LayerSpecification => (hidden(l.id) ? { ...l, layout: { ...l.layout, visibility: 'none' } } as LayerSpecification : l));
  const sources: Record<string, SourceSpecification> = { ...style.sources };

  if (opts.basemap === 'satellite') {
    sources[SATELLITE_SOURCE] = {
      type: 'raster',
      tiles: [SATELLITE_TILES],
      tileSize: 256,
      maxzoom: SATELLITE_MAX_ZOOM,
      bounds: region.maxBounds as [number, number, number, number],
      attribution: SATELLITE_CREDIT,
    };
    // Over the paper, so the map stays paper where a tile fails; under the veil outside the nine counties.
    layers = insertAfter(layers, 'land', [satelliteLayer(theme, opts.satelliteStyle ?? DEFAULT_SATELLITE_STYLE)]);
    const sat = theme.transit.basemaps.satellite;
    // Salt ponds are left to the imagery, where their colors show; the water and its shore stay print.
    layers = layers.map((l): LayerSpecification => {
      if (l.id === 'outside-region' && l.type === 'fill') return { ...l, paint: { ...l.paint, 'fill-opacity': sat.outsideRegion } };
      if (l.id === 'water' && l.type === 'fill') return { ...l, filter: ['!=', ['get', 'kind'], 'salt_pond'], paint: { ...l.paint, 'fill-opacity': sat.water } };
      if (l.id === 'shoreline' && l.type === 'line') return { ...l, filter: ['==', ['get', 'kind'], 'shore'] };
      return l;
    });
  }

  if (opts.basemap === 'streets') {
    sources[STREETS_SOURCE] = { type: 'vector', url: STREETS_TILEJSON, attribution: STREETS_CREDIT };
    const s = theme.transit.basemaps.streets;
    // Parks under the veil outside the nine counties and under the water; roads over the water (bridges).
    layers = insertAfter(layers, 'land', streetsGroundLayers(theme));
    layers = insertBefore(layers, 'context-rail', streetsRoadLayers(theme));
    // BAM's buildings stay, faint, so the streets read first.
    layers = layers.map((l) => (l.type === 'fill' && l.id.startsWith('buildings-')
      ? { ...l, paint: { ...l.paint, 'fill-opacity': l.id === 'buildings-overview'
        ? ['interpolate', ['linear'], ['zoom'], 8, s.buildingOpacity * 0.6, 13, s.buildingOpacity]
        : s.buildingOpacity } }
      : l));
    // Names over the lines' strokes, so a street a line runs along stays legible, but under the
    // stations: MapLibre places the labels of upper layers first, and the open line's station names
    // must win (only BAM's city and water names stay above them, as in the plain map).
    const stations = layers.findIndex((l) => /^transit-.+-waterside$/.test(l.id));
    layers = insertBefore(layers, stations < 0 ? 'label-water-1' : layers[stations].id, streetsLabelLayers(theme, opts.fonts));
  }

  return { ...style, sources, layers };
}

function insertAfter(layers: LayerSpecification[], id: string, add: LayerSpecification[]): LayerSpecification[] {
  const i = layers.findIndex((l) => l.id === id);
  return i < 0 ? [...layers, ...add] : [...layers.slice(0, i + 1), ...add, ...layers.slice(i + 1)];
}

function insertBefore(layers: LayerSpecification[], id: string, add: LayerSpecification[]): LayerSpecification[] {
  const i = layers.findIndex((l) => l.id === id);
  return i < 0 ? [...layers, ...add] : [...layers.slice(0, i), ...add, ...layers.slice(i)];
}

function satelliteLayer(theme: Theme, style: SatelliteStyle): LayerSpecification {
  const s = theme.transit.basemaps.satellite;
  return {
    id: 'transit-satellite',
    type: 'raster',
    source: SATELLITE_SOURCE,
    paint: style === 'natural' ? {} : {
      'raster-saturation': s.saturation,
      'raster-brightness-min': s.brightnessMin,
      'raster-brightness-max': s.brightnessMax,
      'raster-contrast': s.contrast,
    },
  };
}

// ---------------------------------------------------------------- streets (OpenMapTiles schema)

const has = (key: string, values: string[]): ExpressionSpecification => ['in', ['get', key], ['literal', values]];

/** Parks from OpenStreetMap's protected areas: their `class` is free text ("State Park", but also "historic"). */
const PARKISH: ExpressionSpecification = ['any',
  ...['park', 'recreation', 'conservation', 'preserve', 'reserve', 'open space', 'wilderness', 'protected']
    .map((word): ExpressionSpecification => ['in', word, ['downcase', ['to-string', ['get', 'class']]]])];

function streetsGroundLayers(theme: Theme): LayerSpecification[] {
  const s = theme.transit.basemaps.streets;
  return [
    {
      id: 'transit-streets-parks',
      type: 'fill',
      source: STREETS_SOURCE,
      'source-layer': 'park',
      filter: PARKISH,
      paint: { 'fill-color': s.park, 'fill-antialias': false },
    },
    {
      // City parks, gardens, golf courses and woods (generic grass and meadow are left plain).
      id: 'transit-streets-green',
      type: 'fill',
      source: STREETS_SOURCE,
      'source-layer': 'landcover',
      filter: ['any', ['==', ['get', 'class'], 'wood'], has('subclass', ['park', 'garden', 'golf_course', 'recreation_ground', 'village_green'])],
      paint: { 'fill-color': s.park, 'fill-opacity': ['case', ['==', ['get', 'class'], 'wood'], 0.7, 1], 'fill-antialias': false },
    },
    {
      id: 'transit-streets-cemeteries',
      type: 'fill',
      source: STREETS_SOURCE,
      'source-layer': 'landuse',
      filter: ['==', ['get', 'class'], 'cemetery'],
      paint: { 'fill-color': s.park, 'fill-antialias': false },
    },
  ];
}

/** Road classes drawn, most important last; rail, transit, busways and ferries are this map's own lines. */
const ROADS = ['track', 'service', 'minor', 'tertiary', 'secondary', 'primary', 'trunk', 'motorway'];
const MAJOR = ['motorway', 'trunk'];

/** A road's fill width at a zoom, by class: [z6, z10, z13, z16, z18]. */
const ROAD_WIDTHS: Record<string, number[]> = {
  motorway: [0.35, 0.9, 2.6, 9, 22],
  trunk: [0.35, 0.9, 2.6, 9, 22],
  primary: [0, 0.5, 2, 7, 18],
  secondary: [0, 0.5, 2, 7, 18],
  tertiary: [0, 0.3, 1.4, 5.5, 14],
  minor: [0, 0, 0.7, 4, 11],
  service: [0, 0, 0, 1.8, 6],
  track: [0, 0, 0, 1.2, 4],
};
const ROAD_ZOOMS = [6, 10, 13, 16, 18];

function roadWidth(extra = 0): ExpressionSpecification {
  const at = (i: number): ExpressionSpecification =>
    ['match', ['get', 'class'], ...Object.entries(ROAD_WIDTHS).flatMap(([c, w]) => [c, w[i] > 0 ? +(w[i] + extra).toFixed(2) : 0]), 0] as unknown as ExpressionSpecification;
  return ['interpolate', ['exponential', 1.5], ['zoom'], ...ROAD_ZOOMS.flatMap((z, i) => [z, at(i)])] as unknown as ExpressionSpecification;
}

const IS_ROAD: ExpressionSpecification = ['all', ['==', ['geometry-type'], 'LineString'], has('class', ROADS), ['!=', ['get', 'indoor'], 1]];
const TUNNEL_FADE: ExpressionSpecification = ['case', ['==', ['get', 'brunnel'], 'tunnel'], 0.45, 1];
const ROAD_RANK: ExpressionSpecification = ['index-of', ['get', 'class'], ['literal', ROADS]];

function streetsRoadLayers(theme: Theme): LayerSpecification[] {
  const s = theme.transit.basemaps.streets;
  return [
    {
      id: 'transit-streets-runways',
      type: 'line',
      source: STREETS_SOURCE,
      'source-layer': 'aeroway',
      minzoom: 10,
      filter: ['all', ['==', ['geometry-type'], 'LineString'], has('class', ['runway', 'taxiway'])],
      paint: {
        'line-color': s.minorRoad,
        'line-width': ['interpolate', ['exponential', 1.5], ['zoom'],
          10, ['match', ['get', 'class'], 'runway', 0.8, 0], 14, ['match', ['get', 'class'], 'runway', 12, 1.5], 17, ['match', ['get', 'class'], 'runway', 60, 8]],
      },
    },
    {
      // Footways and paths, faint and dashed, close in.
      id: 'transit-streets-paths',
      type: 'line',
      source: STREETS_SOURCE,
      'source-layer': 'transportation',
      minzoom: 15,
      filter: ['all', ['==', ['get', 'class'], 'path'], ['!', has('subclass', ['platform', 'corridor'])], ['!=', ['get', 'indoor'], 1], ['!=', ['get', 'brunnel'], 'tunnel']],
      paint: { 'line-color': s.roadCasing, 'line-width': ['interpolate', ['linear'], ['zoom'], 15, 0.6, 18, 1.4], 'line-dasharray': [2, 1.5] },
    },
    {
      // Gray edges close in, so white streets read on the paper.
      id: 'transit-streets-casing',
      type: 'line',
      source: STREETS_SOURCE,
      'source-layer': 'transportation',
      minzoom: 12,
      filter: IS_ROAD,
      layout: { 'line-join': 'round', 'line-cap': 'butt', 'line-sort-key': ROAD_RANK },
      paint: {
        'line-color': s.roadCasing,
        'line-width': roadWidth(1.6),
        'line-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0, 13.5, TUNNEL_FADE],
      },
    },
    {
      // Gray lines from afar, as BAM's context roads are; white streets close in.
      id: 'transit-streets-roads',
      type: 'line',
      source: STREETS_SOURCE,
      'source-layer': 'transportation',
      filter: IS_ROAD,
      layout: { 'line-join': 'round', 'line-cap': 'round', 'line-sort-key': ROAD_RANK },
      paint: {
        'line-color': ['interpolate', ['linear'], ['zoom'],
          12, ['case', has('class', MAJOR), s.roadCasing, s.minorRoad],
          13.5, s.road],
        'line-width': roadWidth(),
        'line-opacity': TUNNEL_FADE,
      },
    },
  ];
}

/** The Latin-script name only: BAM's glyphs carry no CJK ranges, so other scripts are left unlabeled. */
const LATIN_NAME: ExpressionSpecification = ['coalesce', ['get', 'name:en'], ['get', 'name:latin'], ''];

function streetsLabelLayers(theme: Theme, fonts: BasemapOptions['fonts']): LayerSpecification[] {
  const s = theme.transit.basemaps.streets;
  const visibility = theme.layers.labels ? 'visible' : 'none';
  const streetName = (id: string, classes: string[], minzoom: number): LayerSpecification => ({
    id,
    type: 'symbol',
    source: STREETS_SOURCE,
    'source-layer': 'transportation_name',
    minzoom,
    filter: ['all', has('class', classes), ['!=', ['get', 'subclass'], 'junction'], ['!=', ['get', 'indoor'], 1]],
    layout: {
      visibility,
      'symbol-placement': 'line',
      'text-field': LATIN_NAME,
      'text-font': fonts.regular,
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 10, 16, 12, 18, 13.5],
      'text-letter-spacing': 0.02,
      'text-rotation-alignment': 'map',
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 320,
    },
    paint: { 'text-color': s.labels, 'text-halo-color': s.road, 'text-halo-width': 1.4, 'text-halo-blur': 0.3 },
  });
  return [
    streetName('transit-streets-names', ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'], 13),
    streetName('transit-streets-names-minor', ['minor', 'service'], 15),
    {
      id: 'transit-streets-park-names',
      type: 'symbol',
      source: STREETS_SOURCE,
      'source-layer': 'poi',
      // Close in only: OpenStreetMap names every plaza and parklet, and the tiles' rank is per tile.
      minzoom: 15,
      filter: ['==', ['get', 'class'], 'park'],
      layout: {
        visibility,
        'text-field': LATIN_NAME,
        'text-font': fonts.italic,
        'text-size': 11,
        'text-max-width': 7,
        'symbol-sort-key': ['coalesce', ['get', 'rank'], 99],
        'text-padding': 6,
      },
      paint: { 'text-color': s.labels, 'text-halo-color': theme.colors.land, 'text-halo-width': 1.4 },
    },
    {
      // Districts and neighborhoods; BAM's own labels name the cities.
      id: 'transit-streets-places',
      type: 'symbol',
      source: STREETS_SOURCE,
      'source-layer': 'place',
      minzoom: 12,
      maxzoom: 17,
      filter: ['any', has('class', ['suburb', 'quarter']), ['all', ['==', ['get', 'class'], 'neighbourhood'], ['>=', ['zoom'], 14]]],
      layout: {
        visibility,
        'text-field': LATIN_NAME,
        'text-font': fonts.medium,
        'text-size': ['interpolate', ['linear'], ['zoom'], 12, ['match', ['get', 'class'], 'neighbourhood', 10, 11], 16, ['match', ['get', 'class'], 'neighbourhood', 11.5, 13]],
        'text-letter-spacing': 0.06,
        'text-max-width': 7,
        'symbol-sort-key': ['match', ['get', 'class'], 'suburb', 1, 'quarter', 2, 3],
        'text-padding': 8,
      },
      paint: { 'text-color': s.labels, 'text-halo-color': theme.colors.land, 'text-halo-width': 1.6, 'text-halo-blur': 0.4 },
    },
  ];
}
