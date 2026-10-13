/**
 * The line catalog and per-era files built by pipeline/transit_pipeline/build.py (data/app/).
 * Files are imported as URLs, so Vite fingerprints them and the map sources load them by URL
 * (data never goes into the style; docs/DECISIONS.md, rendering).
 */
import catalogUrl from '../../data/app/catalog.json?url';
import pastDraw from '../../data/app/past-draw.geojson?url';
import pastLines from '../../data/app/past-lines.geojson?url';
import pastPoints from '../../data/app/past-points.geojson?url';
import presentDraw from '../../data/app/present-draw.geojson?url';
import presentLines from '../../data/app/present-lines.geojson?url';
import presentPoints from '../../data/app/present-points.geojson?url';
import futureDraw from '../../data/app/future-draw.geojson?url';
import futureLines from '../../data/app/future-lines.geojson?url';
import futurePoints from '../../data/app/future-points.geojson?url';
import type { Confidence, Era, Mode, Status } from './vocab';
import type { ModeGroup } from '../theme/theme';
import type { LngLat } from '../basemap/geometry';

export interface ResolvedSource {
  id: string;
  source: string;
  title: string;
  type: string;
  supports: string[];
  url?: string;
  author?: string;
  publisher?: string;
  date?: string;
  license?: string;
  accessed?: string;
  pages?: string;
  note?: string;
}

export interface CatalogSegment {
  id: string;
  name: string;
  opened: string | null;
  closed: string | null;
  borrowed: boolean;
  confidence: Confidence;
  method: string;
  structure: string | null;
  flags: string[];
  notes?: string;
}

export interface LineRecord {
  id: string;
  name: string;
  short_name?: string;
  system: string;
  system_name: string;
  operators: { name: string; from?: string | null; to?: string | null }[];
  mode: Mode;
  mode_label: string;
  group: ModeGroup;
  era: Era;
  opened: string | null;
  closed: string | null;
  status: Status;
  status_label: string;
  status_as_of?: string;
  expected_opening?: string | null;
  last_verified?: string;
  summary?: string;
  fate?: string;
  fate_note?: string;
  successor?: string;
  gauge_mm?: number;
  gauge_label?: string;
  traction?: { type: string; from?: string | null; to?: string | null }[];
  photo?: { commons_file: string; author: string; date?: string; license: string; source_url: string };
  links?: { label: string; url: string }[];
  notes?: string;
  flags: string[];
  undated: boolean;
  length_km: number;
  confidence_km: Partial<Record<Confidence, number>>;
  bbox: [number, number, number, number];
  fids: number[];
  segments: CatalogSegment[];
  sources: ResolvedSource[];
}

export const ERA_FILES: Record<Era, { draw: string; lines: string; points: string }> = {
  past: { draw: pastDraw, lines: pastLines, points: pastPoints },
  present: { draw: presentDraw, lines: presentLines, points: presentPoints },
  future: { draw: futureDraw, lines: futureLines, points: futurePoints },
};

const absolute = (url: string) => new URL(url, location.href).href;

/** Source URLs for MapLibre, which resolves them in a worker: make them absolute. */
export function eraUrls(era: Era) {
  const f = ERA_FILES[era];
  return { draw: absolute(f.draw), lines: absolute(f.lines), points: absolute(f.points) };
}

export async function loadCatalog(): Promise<LineRecord[]> {
  const res = await fetch(catalogUrl);
  return ((await res.json()) as { lines: LineRecord[] }).lines;
}

/** What the client needs from an era's files: each line's route for the drawing animation, and
 * each feature's years for the fades. */
export interface EraIndex {
  pieces: Map<string, LngLat[][]>;
  draw: { fid: number; open: number; close: number }[];
  points: { fid: number; open: number; close: number }[];
}

type Geom = { type: 'LineString'; coordinates: LngLat[] } | { type: 'MultiLineString'; coordinates: LngLat[][] };
type YearProps = { properties: { fid: number; open_y: number; close_y: number } };

const years = (features: YearProps[]) =>
  features.map((f) => ({ fid: f.properties.fid, open: f.properties.open_y, close: f.properties.close_y }));

/** The same URLs the map sources use, so the browser serves the second request from its cache. */
export async function loadEraIndex(era: Era): Promise<EraIndex> {
  const urls = eraUrls(era);
  const [lines, draw, points] = await Promise.all([
    fetch(urls.lines).then((r) => r.json()),
    fetch(urls.draw).then((r) => r.json()),
    fetch(urls.points).then((r) => r.json()),
  ]);
  const pieces = new Map<string, LngLat[][]>();
  for (const f of lines.features as { properties: { line: string }; geometry: Geom }[]) {
    const parts = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
    const list = pieces.get(f.properties.line) ?? [];
    list.push(...parts);
    pieces.set(f.properties.line, list);
  }
  return { pieces, draw: years(draw.features), points: years(points.features) };
}
