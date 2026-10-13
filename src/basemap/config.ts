/**
 * Vendored from BAM (src/map/config.ts at 9600699). The basemap files are BAM's build, served from
 * this site's own /generated/ (decision 1); HOME_BOUNDS frames the rail network, not BAM's projects.
 */
import region from './region.json';

/** Absolute URL of the site root, including any base path. */
const SITE = `${location.origin}${import.meta.env.BASE_URL}`;

/** Where the PMTiles archives live. Defaults to the site itself; VITE_TILE_BASE_URL overrides. */
export const TILE_BASE_URL: string =
  (import.meta.env.VITE_TILE_BASE_URL as string | undefined) ?? `${SITE}generated/tiles`;

export const GLYPHS_URL = `${SITE}generated/glyphs/{fontstack}/{range}.pbf`;
export const LABELS_URL = `${SITE}generated/data/labels.geojson`;

export const OVERTURE_RELEASE = region.overtureRelease;

/** The nine counties' land extent, from Overture divisions (BAM's pipeline). */
export const EXTENT = region.extent as [number, number, number, number];

/** Panning stops a little beyond the nine counties. Lines are clipped here too. */
export const MAX_BOUNDS = region.maxBounds as [number, number, number, number];

/**
 * The "whole Bay" frame: the core of the rail network, from San Rafael and Richmond to San José
 * and Livermore. Lines run beyond it (SMART, Capitol Corridor, ACE); panning reaches them.
 */
export const HOME_BOUNDS: [number, number, number, number] = [-122.62, 37.25, -121.75, 38.05];

export const MIN_ZOOM = 6;
export const MAX_ZOOM = 18;
/** Overview building tiles cover z6-z12; detail tiles (with heights) take over at z13. */
export const DETAIL_MIN_ZOOM = 13;
export const DETAIL_MAX_ZOOM = 15;
/** One detail archive per zoom keeps every file under 100 MB. */
export const DETAIL_ZOOMS = [13, 14, 15] as const;
/** Existing buildings extrude (faintly) only this close in, and only in 3D mode. */
export const CONTEXT_EXTRUSION_MIN_ZOOM = 14;
