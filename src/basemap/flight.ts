/**
 * Selecting a line: a short flight to its bounds while it draws itself in the selection color.
 * Adapted from BAM's src/projects/flight.ts (9600699): the panel padding, reduced-motion dip and
 * interruption handling are BAM's; the flight is shorter and scaled by distance, keeps the current
 * pitch, and draws the route end to end (docs/VENDORED.md).
 */
import type { GeoJSONSource, Map as MapLibreMap, PaddingOptions } from 'maplibre-gl';
import type { FeatureCollection, MultiLineString } from 'geojson';
import { metres, routePrefix, type LngLat } from './geometry';

export interface Camera {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
}

export const MIN_FLIGHT_MS = 1200;
export const MAX_FLIGHT_MS = 2500;
export const RETURN_MS = 1200;

/** The source the selected line draws itself into. */
export const DRAW_SOURCE = 'transit-selected-draw';

/**
 * Review screenshots only (?test=1&at=0.8): hold the flight still at that many seconds in.
 * Software WebGL can't keep up with the real thing, so frames are taken this way (as in BAM).
 */
const query = new URLSearchParams(typeof location === 'undefined' ? '' : location.search);
const HOLD_AT_MS = query.has('test') && query.has('at') ? Number(query.get('at')) * 1000 : null;

/** Below this width the panel is a bottom sheet over the lower half of the map. */
export const SHEET_BREAKPOINT = 720;
export const PANEL_WIDTH = 400;
export const SHEET_FRACTION = 0.5;

export const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export function currentCamera(map: MapLibreMap): Camera {
  const c = map.getCenter();
  return { center: [c.lng, c.lat], zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing() };
}

/** The part of the map the panel covers, so the camera centres on what's left. */
export function panelPadding(map: MapLibreMap): PaddingOptions {
  const el = map.getContainer();
  if (el.clientWidth < SHEET_BREAKPOINT) {
    return { top: 48, right: 0, bottom: Math.round(el.clientHeight * SHEET_FRACTION), left: 0 };
  }
  return { top: 0, right: Math.min(PANEL_WIDTH, Math.round(el.clientWidth * 0.45)), bottom: 0, left: 0 };
}

/** The camera that fits a line's bounds in the part of the map the panel leaves, at the current pitch. */
export function lineCamera(map: MapLibreMap, bbox: [number, number, number, number], padding: PaddingOptions): Camera {
  const [x0, y0, x1, y1] = bbox;
  const pad = 48;
  const fitted = map.cameraForBounds([x0, y0, x1, y1], {
    padding: {
      top: pad + (padding.top ?? 0), bottom: pad + (padding.bottom ?? 0),
      left: pad + (padding.left ?? 0), right: pad + (padding.right ?? 0),
    },
  });
  return {
    center: [(x0 + x1) / 2, (y0 + y1) / 2],
    zoom: Math.min(fitted?.zoom ?? 12, 15),
    pitch: map.getPitch(),
    bearing: map.getBearing(),
  };
}

/** Longer hops take a little longer, between MIN_FLIGHT_MS and MAX_FLIGHT_MS. */
export function flightDuration(map: MapLibreMap, camera: Camera): number {
  const c = map.getCenter();
  const km = metres([c.lng, c.lat], camera.center) / 1000;
  const dz = Math.abs(map.getZoom() - camera.zoom);
  const t = clamp01((Math.log2(1 + km) + dz) / 10);
  return Math.round(MIN_FLIGHT_MS + (MAX_FLIGHT_MS - MIN_FLIGHT_MS) * t);
}

type Drawing = FeatureCollection<MultiLineString>;
let drawing: Drawing = { type: 'FeatureCollection', features: [] };

/**
 * The selected line as drawn so far. The style is built with it (src/eras/layers.ts): a diffed
 * setStyle compares GeoJSON data too, and would otherwise reset the drawing on the next sync.
 */
export const currentDrawing = (): Drawing => drawing;

function setDrawing(map: MapLibreMap, pieces: LngLat[][] | null) {
  drawing = {
    type: 'FeatureCollection',
    features: pieces && pieces.length
      ? [{ type: 'Feature', properties: {}, geometry: { type: 'MultiLineString', coordinates: pieces } }]
      : [],
  };
  (map.getSource(DRAW_SOURCE) as GeoJSONSource | undefined)?.setData(drawing);
}

/** Clear the drawn selection (when a line closes). */
export function clearDrawing(map: MapLibreMap) {
  setDrawing(map, null);
}

/** Reduced motion: dip to paper, jump, wait for the map to settle, come back up (BAM). */
async function dip(map: MapLibreMap, jump: () => void): Promise<void> {
  const veil = document.createElement('div');
  veil.className = 'dip';
  document.body.appendChild(veil);
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  veil.classList.add('on');
  await new Promise((r) => setTimeout(r, 160));
  jump();
  await Promise.race([new Promise((r) => map.once('idle', () => r(null))), new Promise((r) => setTimeout(r, 1500))]);
  veil.classList.remove('on');
  await new Promise((r) => setTimeout(r, 260));
  veil.remove();
}

/**
 * Fly to a line while it draws itself over the second half of the flight. Resolves when the camera
 * arrives or the viewer interrupts (the line is then completed at once). `current` turns false if
 * another flight has started since, and this one must leave the map alone.
 */
export async function flyToLine(
  map: MapLibreMap, camera: Camera, padding: PaddingOptions, pieces: LngLat[][], current: () => boolean,
): Promise<void> {
  map.stop();
  if (prefersReducedMotion()) {
    await dip(map, () => map.jumpTo({ ...camera, padding }));
    if (current()) setDrawing(map, pieces);
    return;
  }
  const duration = flightDuration(map, camera);
  const drawnAt = (t: number) => easeInOutCubic(clamp01((t - 0.25) / 0.7));
  if (HOLD_AT_MS !== null) {
    const t = Math.min(1, HOLD_AT_MS / duration);
    if (t >= 1) {
      map.jumpTo({ ...camera, padding });
      setDrawing(map, pieces);
      return;
    }
    setDrawing(map, routePrefix(pieces, drawnAt(t)));
    map.flyTo({ ...camera, padding, duration: 1e9, curve: 1.42, easing: () => easeInOutCubic(t), essential: true });
    return new Promise(() => {});
  }
  setDrawing(map, null);
  const start = performance.now();
  const onMove = () => {
    if (!current()) return;
    const drawn = drawnAt((performance.now() - start) / duration);
    if (drawn > 0) setDrawing(map, routePrefix(pieces, drawn));
  };
  map.on('move', onMove);
  await new Promise<void>((resolve) => {
    map.once('moveend', () => resolve());
    // `essential` keeps MapLibre from skipping the flight; reduced motion is handled above.
    map.flyTo({ ...camera, padding, duration, curve: 1.42, easing: easeInOutCubic, essential: true });
  });
  map.off('move', onMove);
  if (current()) setDrawing(map, pieces);
}

/** Ease back to where the viewer was, dropping the panel's padding on the way. */
export async function flyBack(map: MapLibreMap, camera: Camera): Promise<void> {
  map.stop();
  const padding = { top: 0, right: 0, bottom: 0, left: 0 };
  if (prefersReducedMotion()) {
    map.jumpTo({ ...camera, padding });
    return;
  }
  await new Promise<void>((resolve) => {
    map.once('moveend', () => resolve());
    map.easeTo({ ...camera, padding, duration: RETURN_MS, easing: easeInOutCubic, essential: true });
  });
}
