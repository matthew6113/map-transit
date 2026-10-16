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
import idealDraw from '../../data/app/ideal-draw.geojson?url';
import idealLines from '../../data/app/ideal-lines.geojson?url';
import idealPoints from '../../data/app/ideal-points.geojson?url';
import type { Confidence, Dataset, Mode, ProposalStatus, Status } from './vocab';
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
  /** This line's use of the segment, where narrower than the segment's own life. */
  from?: string;
  to?: string;
  /** Where this stretch is in only some of the line's running dates (decision 20): those dates. */
  running?: string[];
  note?: string;
  borrowed: boolean;
  /** No sourced dates of its own or its lines': left off the year slider. */
  undated: boolean;
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
  era: Dataset;
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
  /** Where a line clipped at the map's edge goes on to. */
  continues_beyond?: string;
  gauge_mm?: number;
  gauge_label?: string;
  traction?: { type: string; from?: string | null; to?: string | null }[];
  photo?: { commons_file: string; author: string; date?: string; license: string; source_url: string };
  links?: { label: string; url: string }[];
  notes?: string;
  flags: string[];
  /** Dates a source shows the line running; drawn for those years where its own dates are missing (decision 20). */
  running?: { date: string; source: string; pages?: string; note?: string }[];
  undated: boolean;
  length_km: number;
  confidence_km: Partial<Record<Confidence, number>>;
  bbox: [number, number, number, number];
  fids: number[];
  segments: CatalogSegment[];
  sources: ResolvedSource[];
  /** A reference proposal (the ideal dataset): who proposed it, in which document, and how far it has gone. */
  proposal?: {
    id: string;
    proposed_by: string;
    document: { id: string; title: string; url?: string; date?: string; publisher?: string; type: string };
    year: string;
    status: ProposalStatus;
    status_label: string;
    status_as_of: string;
  };
}

export const ERA_FILES: Record<Dataset, { draw: string; lines: string; points: string }> = {
  past: { draw: pastDraw, lines: pastLines, points: pastPoints },
  present: { draw: presentDraw, lines: presentLines, points: presentPoints },
  future: { draw: futureDraw, lines: futureLines, points: futurePoints },
  ideal: { draw: idealDraw, lines: idealLines, points: idealPoints },
};

const absolute = (url: string) => new URL(url, location.href).href;

/**
 * The rendering spike (tests/perf.spec.ts) swaps the past era for 10,000 synthetic features with
 * ?perf=synthetic. Development server only: production builds drop this branch.
 */
const SYNTHETIC = import.meta.env.DEV && new URLSearchParams(location.search).get('perf') === 'synthetic';
if (SYNTHETIC) {
  ERA_FILES.past = {
    draw: '/tests/fixtures/synthetic-draw.geojson',
    lines: '/tests/fixtures/synthetic-lines.geojson',
    points: '/tests/fixtures/synthetic-points.geojson',
  };
}

/** Source URLs for MapLibre, which resolves them in a worker: make them absolute. */
export function eraUrls(era: Dataset) {
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
  lines: { fid: number; open: number; close: number }[];
  points: { fid: number; open: number; close: number }[];
}

type Geom = { type: 'LineString'; coordinates: LngLat[] } | { type: 'MultiLineString'; coordinates: LngLat[][] };
type YearProps = { properties: { fid: number; open_y: number; close_y: number; undated?: number } };

const years = (features: YearProps[]) =>
  features.map((f) => ({
    fid: f.properties.fid,
    // Undated features never show on the slider (decision 4).
    open: f.properties.undated ? -1 : f.properties.open_y,
    close: f.properties.undated ? -1 : f.properties.close_y,
  }));

/** The same URLs the map sources use, so the browser serves the second request from its cache. */
export async function loadEraIndex(era: Dataset): Promise<EraIndex> {
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
  return { pieces, draw: years(draw.features), lines: years(lines.features), points: years(points.features) };
}
