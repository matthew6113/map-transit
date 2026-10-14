/**
 * The map. Adapted from BAM's src/map/MapView.tsx (9600699): the same setup (PMTiles protocol, worker,
 * diffed setStyle, 2D/3D handling, hover tooltip). Hover highlights a whole line through feature-state
 * instead of a style rebuild, and a click on shared track lists every line there.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import * as maplibregl from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
import { HOME_BOUNDS, MAX_BOUNDS, MAX_ZOOM, MIN_ZOOM } from '../basemap/config';
import type { Camera } from '../basemap/flight';
import { hitLayers } from '../eras/layers';
import { buildStyle, type StyleInputs } from './style';

maplibregl.setWorkerUrl(workerUrl);
const protocol = new Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

export const PITCH_3D = 55;
export const MAX_PITCH_3D = 65;

export const isTouch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;

/** Camera that frames the core of the network, flat and north up, padded for the viewport size. */
export function homeCamera(map: maplibregl.Map): Camera {
  const small = map.getContainer().clientWidth < 640;
  const pad = small ? 20 : 64;
  const fit = map.cameraForBounds(HOME_BOUNDS, {
    padding: { top: pad + (small ? 96 : 40), bottom: pad, left: pad, right: pad },
  });
  const center = fit?.center ? maplibregl.LngLat.convert(fit.center) : { lng: -122.2, lat: 37.7 };
  return { center: [center.lng, center.lat], zoom: fit?.zoom ?? 9, pitch: 0, bearing: 0 };
}

const applied = new WeakMap<maplibregl.Map, StyleInputs>();
/** Callbacks run after every style sync: feature-state and fades don't live in the style. */
const afterSync = new WeakMap<maplibregl.Map, () => void>();

/**
 * Bring the map's style up to date, as a diff. The style holds no data (sources load by URL) and no
 * year (feature-state, src/timeline/visibility.ts), so this runs only when the view changes.
 */
export function syncStyle(map: maplibregl.Map, next: StyleInputs) {
  const prev = applied.get(map);
  if (
    prev && prev.theme === next.theme && prev.mode === next.mode && prev.loaded.join() === next.loaded.join() &&
    prev.view.era === next.view.era && prev.view.ghost === next.view.ghost &&
    prev.view.selected === next.view.selected && prev.view.hiddenGroups.join() === next.view.hiddenGroups.join()
  ) return;
  applied.set(map, next);
  map.setStyle(buildStyle(next), { diff: true });
  afterSync.get(map)?.();
}

export function onAfterSync(map: maplibregl.Map, fn: () => void) {
  afterSync.set(map, fn);
}

export interface LineHit {
  id: string;
  name: string;
  group: string;
  status: string;
}

interface Hover {
  lines: LineHit[];
  x: number;
  y: number;
}

interface Props {
  inputs: StyleInputs;
  /** Whether a feature under the pointer is on the map now (the past era hides by feature-state). */
  shown: (props: Record<string, unknown>) => boolean;
  statusLabel: (status: string) => string;
  onReady: (map: maplibregl.Map) => void;
  onFirstInteraction?: () => void;
  onHoverLine?: (id: string | null) => void;
  onSelectLine?: (id: string) => void;
}

/** The distinct lines under a point that are on the map now, in the order the map returned them. */
function linesAt(features: maplibregl.MapGeoJSONFeature[], shown: (p: Record<string, unknown>) => boolean): LineHit[] {
  const seen = new Map<string, LineHit>();
  for (const f of features) {
    if (!shown(f.properties)) continue;
    const p = f.properties as { line: string; name: string; group: string; status: string };
    if (!seen.has(p.line)) seen.set(p.line, { id: p.line, name: p.name, group: p.group, status: p.status });
  }
  return [...seen.values()];
}

export function MapView({ inputs, shown, statusLabel, onReady, onFirstInteraction, onHoverLine, onSelectLine }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [hover, setHover] = useState<Hover | null>(null);
  const [chooser, setChooser] = useState<Hover | null>(null);
  const cb = useRef({ onHoverLine, onSelectLine, shown, era: inputs.view.era });
  cb.current = { onHoverLine, onSelectLine, shown, era: inputs.view.era };

  useEffect(() => {
    if (!container.current) return;
    // Read before the map exists: MapLibre writes its own hash as soon as it moves.
    const startsFromHash = /(^#|&)map=/.test(location.hash);
    const mode = inputs.mode;
    const map = new maplibregl.Map({
      container: container.current,
      style: buildStyle(inputs),
      bounds: startsFromHash ? undefined : HOME_BOUNDS,
      maxBounds: MAX_BOUNDS,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxPitch: mode === '3d' ? MAX_PITCH_3D : 0,
      hash: 'map',
      attributionControl: false,
      locale: { 'Map.Title': 'Map of Bay Area transit' },
      canvasContextAttributes: { antialias: true },
      pixelRatio: Math.min(window.devicePixelRatio || 1, isTouch ? 2 : 3),
      dragRotate: mode === '3d',
      pitchWithRotate: mode === '3d',
      fadeDuration: 150,
    });
    applied.set(map, inputs);
    map.keyboard.enable();
    if (mode === '2d') map.touchZoomRotate.disableRotation();

    const hoverable = !isTouch;
    let hovered: string | null = null;
    const setHovered = (id: string | null) => {
      if (id === hovered) return;
      hovered = id;
      cb.current.onHoverLine?.(id);
    };
    map.on('mousemove', (e) => {
      if (!hoverable) return;
      const layers = hitLayers(cb.current.era).filter((id) => map.getLayer(id));
      const hits = layers.length ? linesAt(map.queryRenderedFeatures(e.point, { layers }), cb.current.shown) : [];
      if (!hits.length) {
        if (hovered) {
          map.getCanvas().style.cursor = '';
          setHover(null);
          setHovered(null);
        }
        return;
      }
      map.getCanvas().style.cursor = 'pointer';
      setHover({ lines: hits, x: e.point.x, y: e.point.y });
      setHovered(hits[0].id);
    });
    map.on('mouseout', () => {
      setHover(null);
      setHovered(null);
    });
    map.on('click', (e) => {
      const layers = hitLayers(cb.current.era).filter((id) => map.getLayer(id));
      const hits = layers.length ? linesAt(map.queryRenderedFeatures(e.point, { layers }), cb.current.shown) : [];
      setHover(null);
      map.getCanvas().style.cursor = '';
      if (hits.length === 1) {
        setChooser(null);
        cb.current.onSelectLine?.(hits[0].id);
      } else if (hits.length > 1) {
        // Shared track: list every line here and let the viewer pick.
        setChooser({ lines: hits, x: e.point.x, y: e.point.y });
      } else {
        setChooser(null);
      }
    });
    map.on('movestart', () => {
      setHover(null);
      setChooser(null);
    });
    map.once('load', () => {
      if (!startsFromHash) map.jumpTo(homeCamera(map));
      onReady(map);
    });
    const first = () => onFirstInteraction?.();
    map.once('dragstart', first);
    map.once('zoomstart', (e) => {
      if ((e as { originalEvent?: Event }).originalEvent) first();
    });
    mapRef.current = map;
    if (import.meta.env.DEV || new URLSearchParams(location.search).has('test')) {
      (window as unknown as { __map: maplibregl.Map }).__map = map;
    }
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // The map is created once; style inputs are applied below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) syncStyle(map, inputs);
  }, [inputs]);

  const mode = inputs.mode;
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (mode === '3d') {
      map.setMaxPitch(MAX_PITCH_3D);
      map.dragRotate.enable();
      map.touchZoomRotate.enableRotation();
      map.touchPitch.enable();
      return;
    }
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.touchPitch.disable();
    // Lock the pitch only once the map has eased back to flat, so the easing isn't cut short.
    const lock = () => map.setMaxPitch(0);
    if (map.getPitch() === 0 && !map.isMoving()) lock();
    else map.once('moveend', lock);
    return () => {
      map.off('moveend', lock);
    };
  }, [mode]);

  useEffect(() => {
    if (!chooser) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChooser(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chooser]);

  return (
    <>
      <div ref={container} class="map" />
      {hover && !chooser && (
        <div class="map-tooltip" role="presentation" style={{ left: `${hover.x}px`, top: `${hover.y}px` }}>
          <strong>{hover.lines[0].name}</strong>
          <span>
            <i style={{ background: `var(--mode-${hover.lines[0].group.replace(/_/g, '-')})` }} />
            {statusLabel(hover.lines[0].status)}
          </span>
          {hover.lines.length > 1 && <span class="more">and {hover.lines.length - 1} more on this track</span>}
        </div>
      )}
      {chooser && (
        <div class="map-chooser" role="dialog" aria-label="Lines on this track"
          style={{ left: `${chooser.x}px`, top: `${chooser.y}px` }}>
          <p>Lines on this track</p>
          <ul>
            {chooser.lines.map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => {
                  setChooser(null);
                  cb.current.onSelectLine?.(l.id);
                }}>
                  <i style={{ background: `var(--mode-${l.group.replace(/_/g, '-')})` }} />
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
