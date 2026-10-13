/**
 * The data rules, checked in one place (docs/SCHEMA.md). Every authoring file under data/<era>/<group>/
 * is validated against its JSON Schema, then the rules a schema can't express:
 * - every source and system a record names exists;
 * - a null date carries its *_unsourced flag (dates are never filled in);
 * - every line's route names segments that exist in the same era;
 * - future statuses were verified against official sources within the last 90 days;
 * - geometry stays inside the map's bounds;
 * - the app files (data/app/) were rebuilt after the last data change.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import vocab from '../data/schema/vocabulary.json';
import lineSchema from '../data/schema/line.schema.json';
import segmentSchema from '../data/schema/segment.schema.json';
import pointSchema from '../data/schema/point.schema.json';
import sourceSchema from '../data/schema/source.schema.json';
import region from '../src/basemap/region.json';

const ROOT = resolve(import.meta.dirname, '..');
const DATA = join(ROOT, 'data');
const read = (p: string) => JSON.parse(readFileSync(p, 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validators = {
  lines: ajv.compile(lineSchema),
  segments: ajv.compile(segmentSchema),
  points: ajv.compile(pointSchema),
  registry: ajv.compile(sourceSchema),
};

type Props = Record<string, unknown> & { id: string; flags: string[]; sources: { source: string }[] };
interface Folder {
  era: string;
  dir: string;
  lines: (Props & { era: string; status: string; system: string; route: { segment: string }[]; opened: string | null; closed: string | null; last_verified?: string })[];
  segments: { properties: Props & { system: string; opened: string | null; closed: string | null }; geometry: { type: string; coordinates: unknown } }[];
  points: { properties: Props & { system: string; line_ids: string[]; opened: string | null; closed: string | null }; geometry: { coordinates: number[] } }[];
}

const ERAS = ['past', 'present', 'future'] as const;
const folders: Folder[] = ERAS.flatMap((era) => {
  const base = join(DATA, era);
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((d) => statSync(join(base, d)).isDirectory())
    .map((d) => {
      const dir = join(base, d);
      const opt = (f: string, key: string) => (existsSync(join(dir, f)) ? read(join(dir, f))[key] : []);
      return { era, dir, lines: opt('lines.json', 'lines'), segments: opt('segments.geojson', 'features'), points: opt('points.geojson', 'features') };
    });
});

const sources = read(join(DATA, 'sources.json'));
const systems = read(join(DATA, 'systems.json'));
const sourceIds = new Set<string>(sources.sources.map((s: { id: string }) => s.id));
const systemIds = new Set<string>(systems.systems.map((s: { id: string }) => s.id));
const FUTURE = Object.entries(vocab.statuses).filter(([, v]) => v.era === 'future').map(([k]) => k);

describe('schemas', () => {
  it('match the shared vocabulary', () => {
    const line = lineSchema.$defs.line.properties;
    expect(line.mode.enum).toEqual(Object.keys(vocab.modes));
    expect(line.status.enum).toEqual(Object.keys(vocab.statuses));
    expect(line.fate.enum).toEqual(vocab.fates);
    expect(line.flags.items.enum).toEqual(Object.keys(vocab.flags));
    expect(segmentSchema.$defs.props.properties.geometry_confidence.enum).toEqual(Object.keys(vocab.geometry_confidence));
    expect(segmentSchema.$defs.props.properties.structure.anyOf[1].enum).toEqual(vocab.structures);
    expect(pointSchema.$defs.props.properties.kind.enum).toEqual(vocab.point_kinds);
    expect(sourceSchema.$defs.source.properties.type.enum).toEqual(vocab.source_types);
  });

  it('every mode belongs to a filter group', () => {
    for (const [mode, v] of Object.entries(vocab.modes)) expect(Object.keys(vocab.groups), mode).toContain(v.group);
  });

  it('accept the source and system registries', () => {
    expect(validators.registry(sources), JSON.stringify(validators.registry.errors)).toBe(true);
    expect(validators.registry(systems), JSON.stringify(validators.registry.errors)).toBe(true);
  });

  for (const f of folders) {
    const name = f.dir.slice(DATA.length + 1);
    it(`accept ${name}`, () => {
      const dir = f.dir;
      for (const [file, v] of [['lines.json', validators.lines], ['segments.geojson', validators.segments], ['points.geojson', validators.points]] as const) {
        if (!existsSync(join(dir, file))) continue;
        const ok = v(read(join(dir, file)));
        expect(ok, `${name}/${file}: ${ajv.errorsText(v.errors, { separator: '\n' })}`).toBe(true);
      }
    });
  }
});

describe('provenance', () => {
  const all = folders.flatMap((f) => [
    ...f.lines.map((l) => ({ era: f.era, kind: 'line', p: l })),
    ...f.segments.map((s) => ({ era: f.era, kind: 'segment', p: s.properties })),
    ...f.points.map((s) => ({ era: f.era, kind: 'point', p: s.properties })),
  ]);

  it('gives every record at least one source, and every source exists', () => {
    for (const { kind, p } of all) {
      expect(p.sources.length, `${kind} ${p.id}`).toBeGreaterThan(0);
      for (const s of p.sources) expect(sourceIds, `${kind} ${p.id} cites ${s.source}`).toContain(s.source);
    }
  });

  it('names systems that exist', () => {
    for (const { kind, p } of all) expect(systemIds, `${kind} ${p.id}`).toContain(p.system as string);
  });

  it('uses each id once', () => {
    const seen = new Map<string, string>();
    for (const { kind, p } of all) {
      const key = `${kind}:${p.id}`;
      expect(seen.has(key), `duplicate ${key}`).toBe(false);
      seen.set(key, p.id);
    }
  });

  it('never fills in a date: a null date carries its flag', () => {
    for (const { era, kind, p } of all) {
      const status = (p.status as string | undefined) ?? '';
      const notYetOpen = era === 'future' || FUTURE.includes(status);
      if (p.opened === null && !notYetOpen) expect(p.flags, `${kind} ${p.id}: opened is null`).toContain('opened_unsourced');
      // Running today (or not yet open) has no closing date to source.
      const stillOpen = era !== 'past' || status === 'active';
      if (p.closed === null && !stillOpen) expect(p.flags, `${kind} ${p.id}: closed is null`).toContain('closed_unsourced');
    }
  });

  it('keeps each line in its folder era, on segments of that era', () => {
    for (const f of folders) {
      const segs = new Set(folders.filter((g) => g.era === f.era).flatMap((g) => g.segments.map((s) => s.properties.id)));
      for (const l of f.lines) {
        expect(l.era, l.id).toBe(f.era);
        for (const r of l.route) expect(segs, `${l.id} uses ${r.segment}`).toContain(r.segment);
      }
    }
  });

  it('cites an official source for every future line, verified within 90 days', () => {
    const official = new Set(sources.sources.filter((s: { type: string }) => s.type === 'official').map((s: { id: string }) => s.id));
    const now = Date.now();
    for (const f of folders.filter((x) => x.era === 'future')) {
      for (const l of f.lines) {
        expect(l.sources.some((s) => official.has(s.source)), `${l.id} has no official source`).toBe(true);
        expect(l.last_verified, `${l.id} last_verified`).toBeTruthy();
        const days = (now - Date.parse(l.last_verified!)) / 86_400_000;
        expect(days, `${l.id}: status last verified ${l.last_verified}; re-verify (docs/SCHEMA.md, future)`).toBeLessThanOrEqual(90);
      }
    }
  });

  it('only uses public-domain photos', () => {
    for (const { kind, p } of all) {
      const photo = p.photo as { license: string } | undefined;
      if (photo) expect(['public-domain', 'PD-US-expired', 'CC0'], `${kind} ${p.id}`).toContain(photo.license);
    }
  });
});

describe('geometry', () => {
  const [x0, y0, x1, y1] = region.maxBounds;
  const coordsOf = (c: unknown): number[][] => (typeof (c as number[])[0] === 'number' ? [c as number[]] : (c as unknown[]).flatMap(coordsOf));

  it('stays inside the map bounds (lines beyond are clipped)', () => {
    for (const f of folders) {
      for (const s of [...f.segments, ...f.points]) {
        for (const [x, y] of coordsOf(s.geometry.coordinates)) {
          expect(x >= x0 && x <= x1 && y >= y0 && y <= y1, `${s.properties.id} at ${x},${y}`).toBe(true);
        }
      }
    }
  });

  it('carries a method for every geometry', () => {
    for (const f of folders) {
      for (const s of [...f.segments, ...f.points]) expect((s.properties.geometry_method as string).length, s.properties.id).toBeGreaterThan(2);
    }
  });
});

describe('app files (data/app/)', () => {
  const catalog = read(join(DATA, 'app', 'catalog.json'));

  it('were rebuilt after the last data change (make build)', () => {
    const want = folders.flatMap((f) => f.lines.map((l) => l.id)).sort();
    const have = catalog.lines.map((l: { id: string }) => l.id).sort();
    expect(have).toEqual(want);
  });

  it('resolve every cited source into the catalog', () => {
    for (const l of catalog.lines) {
      for (const s of l.sources) expect(s.title, `${l.id}: ${s.source}`).toBeTruthy();
    }
  });
});
