/**
 * Matthew's network file (data/ideal/network.geojson, data/schema/network.schema.json), to and from
 * the editor's working copy. Terra Draw keeps its own `mode` property on every feature (the draw mode
 * that owns it), so the transit mode travels as `transit_mode` while editing.
 */
import vocab from '../../data/schema/vocabulary.json';
import type { Mode } from '../data/vocab';

export interface NetworkProps {
  id: string;
  name: string;
  mode: Mode;
  based_on: string[];
  notes?: string;
  author: string;
}

export interface NetworkFeature {
  type: 'Feature';
  properties: NetworkProps;
  geometry: { type: 'LineString'; coordinates: number[][] } | { type: 'MultiLineString'; coordinates: number[][][] };
}

export interface NetworkFile {
  type: 'FeatureCollection';
  $comment?: string;
  features: NetworkFeature[];
}

/** A line while it's being edited: Terra Draw's feature, with the network's fields beside its own. */
export interface DraftFeature {
  id?: string | number;
  type: 'Feature';
  properties: {
    mode: 'linestring';
    transit_mode?: Mode;
    name?: string;
    based_on?: string[];
    notes?: string;
    author?: string;
    /** The id it had in the file, kept so a re-export doesn't rename it. */
    network_id?: string;
    [key: string]: unknown;
  };
  geometry: { type: 'LineString'; coordinates: number[][] };
}

export const DEFAULT_AUTHOR = 'Matthew Huguet';
export const DEFAULT_MODE: Mode = 'rapid_transit';
const MODES = Object.keys(vocab.modes) as Mode[];

export const COMMENT = "Matthew's ideal network: his own design, drawn from the reference proposals in data/ideal/<proposal>/ or on its own. Hand-edited, or exported from the in-browser editor (Phase 4b). Nothing here is generated: lines are added only when Matthew picks them (CLAUDE.md, the ideal network is Matthew's). Fields: docs/SCHEMA.md, 'Ideal network'.";

export const slug = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** The file's lines as editor features; a MultiLineString becomes one feature per part. */
export function fromFile(file: NetworkFile): DraftFeature[] {
  return file.features.flatMap((f) => {
    const parts = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
    return parts.map((coordinates, i) => ({
      type: 'Feature' as const,
      properties: {
        mode: 'linestring' as const,
        transit_mode: f.properties.mode,
        name: f.properties.name,
        based_on: [...f.properties.based_on],
        ...(f.properties.notes ? { notes: f.properties.notes } : {}),
        author: f.properties.author,
        network_id: parts.length > 1 ? `${f.properties.id}-${i + 1}` : f.properties.id,
      },
      geometry: { type: 'LineString' as const, coordinates: coordinates.map((c) => [c[0], c[1]]) },
    }));
  });
}

/** What still stops an export: lines with no name, or too few points. */
export function problems(features: DraftFeature[]): string[] {
  const out: string[] = [];
  features.forEach((f, i) => {
    const label = f.properties.name?.trim() || `Line ${i + 1}`;
    if (!f.properties.name?.trim()) out.push(`${label} has no name.`);
    if (f.geometry.coordinates.length < 2) out.push(`${label} has fewer than two points.`);
    if (f.properties.transit_mode && !MODES.includes(f.properties.transit_mode)) out.push(`${label} has an unknown mode.`);
  });
  return out;
}

/** The editor's lines as the network file, with ids from their names, unique, in a stable order. */
export function toFile(features: DraftFeature[]): NetworkFile {
  const used = new Set<string>();
  const unique = (base: string) => {
    let id = base || 'line';
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  };
  // Kept ids first, so a renamed neighbour can't take one.
  const kept = features.map((f) => f.properties.network_id && !used.has(f.properties.network_id) ? unique(f.properties.network_id) : null);
  const out = features.map((f, i): NetworkFeature => {
    const p = f.properties;
    return {
      type: 'Feature',
      properties: {
        id: kept[i] ?? unique(slug(p.name ?? '')),
        name: (p.name ?? '').trim(),
        mode: p.transit_mode && MODES.includes(p.transit_mode) ? p.transit_mode : DEFAULT_MODE,
        based_on: [...new Set(p.based_on ?? [])].sort(),
        ...(p.notes?.trim() ? { notes: p.notes.trim() } : {}),
        author: p.author?.trim() || DEFAULT_AUTHOR,
      },
      geometry: { type: 'LineString', coordinates: f.geometry.coordinates.map((c) => [round(c[0]), round(c[1])]) },
    };
  });
  out.sort((a, b) => a.properties.id.localeCompare(b.properties.id));
  return { type: 'FeatureCollection', $comment: COMMENT, features: out };
}

/** Six decimals, about 10 cm: the precision of every other file here. */
const round = (x: number) => Math.round(x * 1e6) / 1e6;

/** The file as the repository keeps it: two-space JSON, one line per coordinate pair. */
export function serialize(file: NetworkFile): string {
  return JSON.stringify(file, null, 2).replace(/\[\s+(-?\d[\d.e-]*),\s+(-?\d[\d.e-]*)\s+\]/g, '[$1, $2]') + '\n';
}

/** Read an imported file, or say why not. */
export function parse(text: string): NetworkFile {
  const data = JSON.parse(text) as Partial<NetworkFile>;
  if (data.type !== 'FeatureCollection' || !Array.isArray(data.features)) throw new Error('Not a GeoJSON FeatureCollection.');
  for (const f of data.features) {
    const t = f?.geometry?.type;
    if (t !== 'LineString' && t !== 'MultiLineString') throw new Error('Only lines can be imported.');
    const p = (f.properties ?? {}) as Partial<NetworkProps>;
    f.properties = {
      id: typeof p.id === 'string' ? p.id : '',
      name: typeof p.name === 'string' ? p.name : '',
      mode: MODES.includes(p.mode as Mode) ? (p.mode as Mode) : DEFAULT_MODE,
      based_on: Array.isArray(p.based_on) ? p.based_on.filter((x): x is string => typeof x === 'string') : [],
      ...(typeof p.notes === 'string' ? { notes: p.notes } : {}),
      author: typeof p.author === 'string' && p.author ? p.author : DEFAULT_AUTHOR,
    };
  }
  return data as NetworkFile;
}
