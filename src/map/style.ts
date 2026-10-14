/** The whole map style: BAM's basemap with the transit layers over its buildings. */
import type { StyleSpecification } from 'maplibre-gl';
import { buildBasemapStyle, fontStacks, type ViewMode } from '../basemap/basemap';
import { transitLayers, transitSources, type TransitView } from '../eras/layers';
import { eraUrls } from '../data/catalog';
import type { Era } from '../data/vocab';
import type { Theme } from '../theme/theme';

export type { ViewMode };

export interface StyleInputs {
  theme: Theme;
  mode: ViewMode;
  view: TransitView;
  /** Eras whose sources have been added (kept once loaded, so switching back doesn't refetch). */
  loaded: Era[];
}

export function buildStyle({ theme, mode, view, loaded }: StyleInputs): StyleSpecification {
  const urls = { past: eraUrls('past'), present: eraUrls('present'), future: eraUrls('future') };
  return buildBasemapStyle(theme, {
    mode,
    name: `Bay Area transit (${theme.name})`,
    rail: 'freight',
    sources: transitSources(urls, loaded),
    over: transitLayers(theme, view, fontStacks(theme.type.mapLabels)),
  });
}
