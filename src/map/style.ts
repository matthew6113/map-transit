/** The whole map style: BAM's basemap (or a street map or imagery in its place) with the transit layers over it. */
import type { StyleSpecification } from 'maplibre-gl';
import { buildBasemapStyle, fontStacks, type ViewMode } from '../basemap/basemap';
import { transitLayers, transitSources, type TransitView } from '../eras/layers';
import { eraUrls } from '../data/catalog';
import type { Dataset } from '../data/vocab';
import type { Theme } from '../theme/theme';
import { applyBasemap, type Basemap, type SatelliteStyle } from './basemaps';

export type { ViewMode };

export interface StyleInputs {
  theme: Theme;
  mode: ViewMode;
  view: TransitView;
  /** Datasets whose sources have been added (kept once loaded, so switching back doesn't refetch). */
  loaded: Dataset[];
  /** What the lines are drawn over: BAM's print (the default), streets or imagery (decision 23). */
  basemap?: Basemap;
  satelliteStyle?: SatelliteStyle;
}

export function buildStyle({ theme, mode, view, loaded, basemap = 'plain', satelliteStyle }: StyleInputs): StyleSpecification {
  const urls = { past: eraUrls('past'), present: eraUrls('present'), future: eraUrls('future'), ideal: eraUrls('ideal') };
  const fonts = fontStacks(theme.type.mapLabels);
  const style = buildBasemapStyle(theme, {
    mode,
    name: `Bay Area transit (${theme.name})`,
    rail: 'freight',
    sources: transitSources(urls, loaded),
    over: transitLayers(theme, view, fonts),
  });
  return applyBasemap(style, theme, { basemap, satelliteStyle, fonts });
}
