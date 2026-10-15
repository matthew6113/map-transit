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
import extSchema from '../data/schema/extensions.schema.json';
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
  extensions: ajv.compile(extSchema),
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
    expect(extSchema.$defs.segment.properties.structure.enum).toEqual(vocab.structures);
    expect(extSchema.$defs.flags.items.enum).toEqual(Object.keys(vocab.flags));
  });

  it('every mode belongs to a filter group', () => {
    for (const [mode, v] of Object.entries(vocab.modes)) expect(Object.keys(vocab.groups), mode).toContain(v.group);
  });

  it('accept the source and system registries', () => {
    expect(validators.registry(sources), JSON.stringify(validators.registry.errors)).toBe(true);
    expect(validators.registry(systems), JSON.stringify(validators.registry.errors)).toBe(true);
  });

  it('list each source and system once', () => {
    for (const reg of [sources.sources, systems.systems] as { id: string }[][]) {
      const ids = reg.map((x) => x.id);
      expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
    }
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

  it('keeps each line in its folder era, on segments of that era (past lines may also use present track, decision 13)', () => {
    const idsOf = (era: string) => folders.filter((g) => g.era === era).flatMap((g) => g.segments.map((s) => s.properties.id));
    // Today's network is cut into dated segments at build time (data/present/extensions.json).
    const ext = existsSync(join(DATA, 'present', 'extensions.json')) ? read(join(DATA, 'present', 'extensions.json')) : { systems: {} };
    const extIds = Object.values(ext.systems as Record<string, { segments?: { id: string }[] }>).flatMap((s) => (s.segments ?? []).map((x) => x.id));
    for (const f of folders) {
      const segs = new Set([...idsOf(f.era), ...(f.era === 'past' ? [...idsOf('present'), ...extIds] : [])]);
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

  it('draws BRT only on center or median lanes: the agency names the corridor, surveyed data the lanes (decisions 3 and 9)', () => {
    const type = new Map<string, string>(sources.sources.map((s: { id: string; type: string }) => [s.id, s.type]));
    for (const f of folders) {
      const segs = new Map(f.segments.map((s) => [s.properties.id, s.properties]));
      for (const l of f.lines.filter((x) => (x as { mode?: string }).mode === 'brt')) {
        expect(l.sources.some((s) => type.get(s.source) === 'official'), `${l.id} needs its agency's own source for the corridor`).toBe(true);
        for (const r of l.route) {
          const seg = segs.get(r.segment)!;
          const lanes = seg.sources.filter((s) => ['official', 'dataset'].includes(type.get(s.source) ?? '') && (s as { supports?: string[] }).supports?.includes('route'));
          expect(lanes.length, `${seg.id} needs a source for where its lanes run`).toBeGreaterThan(0);
          expect(seg.geometry_method as string, `${seg.id} must say it follows center or median lanes`).toMatch(/center or median bus lane/);
        }
      }
    }
  });

  it('gives every past line the closed status', () => {
    for (const f of folders.filter((x) => x.era === 'past')) {
      for (const l of f.lines) expect(l.status, l.id).toBe('closed');
    }
  });

  // Dates as precise as their source ('1941', '1941-06', '1941-06-01', circa '1941~'), compared at
  // the coarser of the two.
  const atOrBefore = (a: string, b: string) => {
    const [x, y] = [a.replace(/~$/, ''), b.replace(/~$/, '')];
    const n = Math.min(x.length, y.length);
    return x.slice(0, n) <= y.slice(0, n);
  };

  it('keeps a line\'s use of a segment within the dates of both', () => {
    // Past lines may also run over present track (decision 13), including stretches cut at build time.
    const extPath = join(DATA, 'present', 'extensions.json');
    const ext = existsSync(extPath) ? read(extPath) : { systems: {} };
    const extSegs = Object.values(ext.systems as Record<string, { segments?: { id: string; opened: string | null; closed?: string | null }[] }>)
      .flatMap((x) => (x.segments ?? []).map((d) => [d.id, { opened: d.opened, closed: d.closed ?? null }] as const));
    for (const f of folders) {
      const eras = f.era === 'past' ? ['past', 'present'] : [f.era];
      const segs = new Map<string, { opened: string | null; closed: string | null }>([
        ...(f.era === 'past' ? extSegs : []),
        ...folders.filter((g) => eras.includes(g.era)).flatMap((g) => g.segments.map((s) => [s.properties.id, s.properties] as const)),
      ]);
      for (const l of f.lines) {
        for (const r of l.route as { segment: string; from?: string | null; to?: string | null }[]) {
          const seg = segs.get(r.segment)!;
          const where = `${l.id} on ${r.segment}`;
          if (r.from && r.to) expect(atOrBefore(r.from, r.to), `${where}: from ${r.from} is after to ${r.to}`).toBe(true);
          for (const [opened, what] of [[seg.opened, 'segment'], [l.opened, 'line']] as const) {
            if (r.from && opened) expect(atOrBefore(opened, r.from), `${where}: from ${r.from} is before the ${what} opened (${opened})`).toBe(true);
          }
          for (const [closed, what] of [[seg.closed, 'segment'], [l.closed, 'line']] as const) {
            if (r.to && closed) expect(atOrBefore(r.to, closed), `${where}: to ${r.to} is after the ${what} closed (${closed})`).toBe(true);
          }
        }
      }
    }
  });

  it('draws a line for the dates a source shows it running only where its own dates are missing (decision 20)', () => {
    for (const f of folders) {
      for (const l of f.lines) {
        const running = (l.running ?? []) as { date: string; source: string }[];
        if (!running.length) continue;
        const dates = running.map((x) => x.date);
        // Only where opening or closing isn't sourced; they're for drawing, not instead of dates.
        expect(l.opened === null || l.closed === null, `${l.id}: running dates, but both ends are sourced`).toBe(true);
        for (const x of running) {
          expect(sourceIds, `${l.id} running ${x.date} cites ${x.source}`).toContain(x.source);
          expect((l.sources as { source: string }[]).map((s) => s.source), `${l.id}: cite ${x.source} in sources too`).toContain(x.source);
          if (l.opened) expect(atOrBefore(l.opened as string, x.date), `${l.id}: running ${x.date} before it opened`).toBe(true);
          if (l.closed) expect(atOrBefore(x.date, l.closed as string), `${l.id}: running ${x.date} after it closed`).toBe(true);
        }
        for (const r of l.route as { segment: string; running?: string[] }[]) {
          for (const d of r.running ?? []) expect(dates, `${l.id} on ${r.segment}: running ${d} isn't one of the line's`).toContain(d);
        }
      }
    }
  });

  it('flags a page cited second-hand only on a record that cites a book (decision 11)', () => {
    const type = new Map<string, string>(sources.sources.map((s: { id: string; type: string }) => [s.id, s.type]));
    for (const { kind, p } of all) {
      if (!p.flags.includes('page_unverified')) continue;
      expect(p.sources.some((s) => type.get(s.source) === 'book'), `${kind} ${p.id} is flagged page_unverified but cites no book`).toBe(true);
    }
  });

  it('records the map behind every traced past geometry, and cites it (decision 12)', () => {
    const type = new Map<string, string>(sources.sources.map((s: { id: string; type: string }) => [s.id, s.type]));
    for (const f of folders.filter((x) => x.era === 'past')) {
      for (const { properties: p } of [...f.segments, ...f.points]) {
        if (p.geometry_confidence !== 'digitized') continue;
        const g = p.georeference as { map?: string; method?: string; est_error_m?: number } | undefined;
        expect(g?.map && g.method && typeof g.est_error_m === 'number', `${p.id} needs georeference {map, method, est_error_m}`).toBe(true);
        expect(type.get(g!.map!), `${p.id}: ${g!.map} is not a primary map in sources.json`).toBe('primary_map');
        expect(p.sources.map((s) => s.source), `${p.id} must cite ${g!.map}`).toContain(g!.map);
      }
    }
  });

  it('tags every David Rumsey scan with its license, so features traced from one can be listed (decision 7)', () => {
    for (const s of sources.sources as { id: string; title: string; publisher?: string; url?: string; license?: string }[]) {
      if (/rumsey/i.test(`${s.title} ${s.publisher ?? ''} ${s.url ?? ''}`)) {
        expect(s.license, s.id).toBe('CC BY-NC-SA 3.0 (David Rumsey Map Collection)');
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

describe("today's network, dated (data/present/extensions.json)", () => {
  type Ref = { source: string; supports: string[] };
  type ExtSeg = { id: string; line: string; opened: string | null; sources: Ref[]; notes?: string };
  type ExtLine = { opened?: string; sources?: Ref[]; route_from?: Record<string, { from: string }> };
  type ExtSystem = { segments?: ExtSeg[]; lines?: Record<string, ExtLine>; points?: Record<string, { opened: string; sources: Ref[] }>; dates?: Record<string, { opened: string; sources: Ref[] }> };
  const path = join(DATA, 'present', 'extensions.json');
  const ext: { systems: Record<string, ExtSystem> } = existsSync(path) ? read(path) : { systems: {} };
  const type = new Map<string, string>(sources.sources.map((s: { id: string; type: string }) => [s.id, s.type]));
  const present = folders.filter((f) => f.era === 'present');
  const presentLines = new Map(present.flatMap((f) => f.lines.map((l) => [l.id, l] as const)));

  it('matches its schema', () => {
    expect(validators.extensions(ext), ajv.errorsText(validators.extensions.errors, { separator: '\n' })).toBe(true);
  });

  it('dates today\'s network from official sources only (a dataset may place a cut point)', () => {
    // Track older than the service on it (Caltrain's line of 1863, under Caltrain since 1980) is
    // the past era's: its date may come from any citable source but Wikipedia (CLAUDE.md), and so
    // may the route of a stretch that carries no date at all.
    const before = (a: string, b: string) => {
      const n = Math.min(a.length, b.length);
      return a.slice(0, n) < b.slice(0, n);
    };
    const pastTypes = ['official', 'primary_map', 'primary_document', 'book', 'journal', 'railfan_web', 'dataset'];
    for (const [sys, s] of Object.entries(ext.systems)) {
      const service = (line: string) => s.lines?.[line]?.opened;
      const refs: [string, Ref[], boolean][] = [
        ...(s.segments ?? []).map((x) => {
          const started = service(x.line);
          return [x.id, x.sources, !x.opened || !!(started && before(x.opened, started))] as [string, Ref[], boolean];
        }),
        ...Object.entries(s.lines ?? {}).map(([id, x]) => [id, x.sources ?? [], false] as [string, Ref[], boolean]),
        ...Object.entries(s.points ?? {}).map(([id, x]) => [`${sys} point ${id}`, x.sources, false] as [string, Ref[], boolean]),
        ...Object.entries(s.dates ?? {}).map(([id, x]) => [id, x.sources, false] as [string, Ref[], boolean]),
      ];
      for (const [id, rs, older] of refs) {
        for (const r of rs) {
          expect(sourceIds, `${id} cites ${r.source}`).toContain(r.source);
          const dates = r.supports.some((x) => x !== 'geometry');
          const allowed = older ? pastTypes : dates ? ['official'] : ['official', 'dataset'];
          expect(allowed, `${id} cites ${r.source} (${type.get(r.source)}) for ${r.supports}`).toContain(type.get(r.source));
        }
      }
    }
  });

  it('cites a source for every date, and says why a stretch has none', () => {
    for (const s of Object.values(ext.systems)) {
      for (const x of s.segments ?? []) {
        if (x.opened) expect(x.sources.some((r) => r.supports.includes('opened')), `${x.id}: no source supports its opening`).toBe(true);
        else expect(x.notes, `${x.id}: opened is null; say why in notes`).toBeTruthy();
      }
      for (const [id, l] of Object.entries(s.lines ?? {})) {
        if (l.opened) expect((l.sources ?? []).some((r) => r.supports.includes('opened')), `${id}: no source supports its opening`).toBe(true);
      }
      for (const [id, p] of [...Object.entries(s.points ?? {}), ...Object.entries(s.dates ?? {})]) {
        expect(p.sources.some((r) => r.supports.includes('opened')), `${id}: no source supports its opening`).toBe(true);
      }
    }
  });

  it('cuts stretches from present lines of the same system, under new ids', () => {
    const presentSegs = new Set(present.flatMap((f) => f.segments.map((x) => x.properties.id)));
    const seen = new Set<string>();
    for (const [sys, s] of Object.entries(ext.systems)) {
      for (const x of s.segments ?? []) {
        expect(presentLines.get(x.line)?.system, `${x.id} is cut from ${x.line}`).toBe(sys);
        expect(seen.has(x.id) || presentSegs.has(x.id), `${x.id} is used twice`).toBe(false);
        seen.add(x.id);
      }
      for (const id of Object.keys(s.lines ?? {})) expect(presentLines.get(id)?.system, `lines.${id}`).toBe(sys);
      const mine = new Set(present.flatMap((f) => f.lines.filter((l) => l.system === sys).flatMap((l) => l.route.map((r) => r.segment))));
      for (const id of Object.keys(s.dates ?? {})) expect(mine.has(id), `dates.${id} isn't a segment of ${sys}'s present lines`).toBe(true);
    }
  });

  it("keeps a line's later start on a stretch after the stretch and the line opened", () => {
    const atOrBefore = (a: string, b: string) => {
      const n = Math.min(a.length, b.length);
      return a.slice(0, n) <= b.slice(0, n);
    };
    for (const s of Object.values(ext.systems)) {
      const segs = new Map((s.segments ?? []).map((x) => [x.id, x]));
      for (const [id, l] of Object.entries(s.lines ?? {})) {
        for (const [sid, r] of Object.entries(l.route_from ?? {})) {
          const seg = segs.get(sid);
          expect(seg, `${id} route_from names ${sid}, which isn't a stretch of this system`).toBeTruthy();
          if (seg?.opened) expect(atOrBefore(seg.opened, r.from), `${id} on ${sid}: ${r.from} is before the stretch opened`).toBe(true);
          if (l.opened) expect(atOrBefore(l.opened, r.from), `${id} on ${sid}: ${r.from} is before the line opened`).toBe(true);
        }
      }
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

  // Past lines that leave the region stop at the nine counties' boundary instead (decision 16).
  const bayArea = read(join(DATA, 'bay-area.geojson')).features[0].geometry;
  const boundary: number[][][] = (bayArea.type === 'Polygon' ? [bayArea.coordinates] : bayArea.coordinates).flat();
  const toBoundary = ([x, y]: number[]) => {
    let best = Infinity;
    for (const ring of boundary) {
      for (let i = 1; i < ring.length; i++) {
        const [ax, ay] = ring[i - 1];
        const [bx, by] = ring[i];
        const dx = bx - ax;
        const dy = by - ay;
        const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
        best = Math.min(best, Math.hypot(x - (ax + t * dx), y - (ay + t * dy)));
      }
    }
    return best;
  };

  it('marks lines clipped at the map edge (or, in the past era, the Bay Area\'s county line) with where they continue to', () => {
    const near = (x: number, y: number) =>
      Math.min(Math.abs(x - x0), Math.abs(x - x1), Math.abs(y - y0), Math.abs(y - y1)) < 0.002;
    const allSegs = new Map(folders.flatMap((f) => f.segments.map((s) => [s.properties.id, s] as const)));
    for (const f of folders) {
      for (const l of f.lines) {
        if (!(l as { continues_beyond?: string }).continues_beyond) continue;
        const geoms = l.route.map((r) => allSegs.get(r.segment)?.geometry).filter((g) => !!g);
        // The ends of every part, for the county line (all vertices would be slow there).
        const ends = geoms.flatMap((g) => (g!.type === 'LineString' ? [g!.coordinates as number[][]] : (g!.coordinates as number[][][])))
          .flatMap((part) => (part.length ? [part[0], part[part.length - 1]] : []));
        const touches = geoms.some((g) => coordsOf(g!.coordinates).some(([x, y]) => near(x, y)))
          || (f.era === 'past' && ends.some((c) => toBoundary(c) < 0.0005));
        expect(touches, `${l.id} says it continues beyond the map but doesn't reach the edge or the county line`).toBe(true);
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

  it('give every stroke a slot, and spread Market St\'s three modes apart (decision 10)', () => {
    type Feat = { properties: { off: number; group: string }; geometry: { coordinates: number[][] } };
    for (const era of ERAS) {
      for (const kind of ['draw', 'lines']) {
        const fs: Feat[] = read(join(DATA, 'app', `${era}-${kind}.geojson`)).features;
        for (const f of fs) {
          expect(Number.isInteger(f.properties.off * 2) && Math.abs(f.properties.off) <= 3, `${era}-${kind} off ${f.properties.off}`).toBe(true);
        }
      }
    }
    // Market St at Powell: BART, Muni Metro and the F, each in its own slot.
    const inBox = ([x, y]: number[]) => x > -122.412 && x < -122.403 && y > 37.781 && y < 37.788;
    const atPowell = (f: Feat) => f.geometry.coordinates.slice(1).some((b, i) => {
      const a = f.geometry.coordinates[i];
      return Array.from({ length: 21 }, (_, k) => [a[0] + ((b[0] - a[0]) * k) / 20, a[1] + ((b[1] - a[1]) * k) / 20]).some(inBox);
    });
    const draw: Feat[] = read(join(DATA, 'app', 'present-draw.geojson')).features;
    const slots = new Map<string, Set<number>>();
    for (const f of draw.filter(atPowell)) {
      if (!['heavy_rail', 'light_rail', 'streetcar'].includes(f.properties.group)) continue;
      slots.set(f.properties.group, (slots.get(f.properties.group) ?? new Set()).add(Math.abs(f.properties.off)));
    }
    expect([...slots.keys()].sort()).toEqual(['heavy_rail', 'light_rail', 'streetcar']);
    expect(slots.get('light_rail')).toEqual(new Set([0]));
    expect(slots.get('heavy_rail')).toEqual(new Set([1]));
    expect(slots.get('streetcar')).toEqual(new Set([1]));
  });

  it('draw a line from its first running date, lighter, where its opening is unsourced (decision 20)', () => {
    const decimal = (d: string) => {
      const [y, m = 1, day = 1] = d.replace(/~$/, '').split('-').map(Number);
      return d.split('-').length === 3 ? y + (Date.UTC(y, m - 1, day) - Date.UTC(y, 0, 1)) / 86400000 / 365.25 : y + (m - 1) / 12;
    };
    type Feat = { properties: { line: string; open_y: number; close_y: number; borrowed: number; undated: number } };
    const pieces: Feat[] = read(join(DATA, 'app', 'past-lines.geojson')).features;
    const lines = catalog.lines as { id: string; opened: string | null; closed: string | null; running?: { date: string }[]; undated: boolean }[];
    const drawn = lines.filter((l) => l.running?.length && !l.opened);
    expect(drawn.length).toBeGreaterThan(0);
    for (const l of drawn) {
      const mine = pieces.filter((f) => f.properties.line === l.id);
      expect(l.undated, `${l.id} is on the slider`).toBe(false);
      expect(mine.every((f) => f.properties.borrowed === 1), `${l.id} drawn lighter`).toBe(true);
      const first = Math.min(...l.running!.map((r) => decimal(r.date)));
      expect(Math.min(...mine.map((f) => f.properties.open_y)), `${l.id} starts at its first running date`).toBeCloseTo(first, 2);
      if (l.closed) expect(Math.max(...mine.map((f) => f.properties.close_y)), `${l.id} ends at its closing`).toBeCloseTo(decimal(l.closed), 2);
    }
  });

  it('mark points undated or borrowed as they do segments, so past-era points draw (decision 4)', () => {
    for (const era of ERAS) {
      for (const f of read(join(DATA, 'app', `${era}-points.geojson`)).features as { properties: Record<string, number> }[]) {
        const p = f.properties;
        expect([0, 1], `${era} point ${p.id} undated`).toContain(p.undated);
        expect([0, 1], `${era} point ${p.id} borrowed`).toContain(p.borrowed);
        if (!p.undated) expect(p.open_y >= 0 && p.close_y > p.open_y, `${era} point ${p.id} years`).toBe(true);
      }
    }
  });

  it("draw present track in the past era in the mode of the year, without overlaps (Matthew, Oct 14)", () => {
    type Span = { properties: { seg: string; group: string; open_y: number; close_y: number; span?: number } };
    const past: Span[] = read(join(DATA, 'app', 'past-draw.geojson')).features.filter((f: Span) => f.properties.span);
    const present: Span[] = read(join(DATA, 'app', 'present-draw.geojson')).features;
    const pastLines = folders.filter((f) => f.era === 'past').flatMap((f) => f.lines);
    // Today's lines that ran in another mode before (Muni's streetcars before Metro) count too.
    const extPath = join(DATA, 'present', 'extensions.json');
    const ext: { systems: Record<string, { lines?: Record<string, { earlier_mode?: unknown }> }> } = existsSync(extPath) ? read(extPath) : { systems: {} };
    const earlier = new Set(Object.values(ext.systems).flatMap((s) => Object.entries(s.lines ?? {}).filter(([, l]) => l.earlier_mode).map(([id]) => id)));
    const presentUse = new Map<string, Set<string>>();
    for (const f of read(join(DATA, 'app', 'present-lines.geojson')).features as { properties: { seg: string; line: string } }[]) {
      if (!presentUse.has(f.properties.seg)) presentUse.set(f.properties.seg, new Set());
      presentUse.get(f.properties.seg)!.add(f.properties.line);
    }
    for (const f of past) {
      const p = f.properties;
      const users = [...pastLines.filter((l) => l.route.some((r) => r.segment === p.seg)).map((l) => l.id),
                     ...[...(presentUse.get(p.seg) ?? [])].filter((id) => earlier.has(id))];
      expect(users.length, `${p.seg}: drawn in a past mode, but no past line uses it`).toBeGreaterThan(0);
      const own = present.filter((x) => x.properties.seg === p.seg);
      for (const x of own) {
        const overlap = Math.min(p.close_y, x.properties.close_y) - Math.max(p.open_y, x.properties.open_y);
        expect(overlap, `${p.seg}: ${p.group} ${p.open_y}-${p.close_y} overlaps today's mode ${x.properties.open_y}-${x.properties.close_y}`).toBeLessThanOrEqual(0.001);
      }
    }
  });

  it('resolve every cited source into the catalog', () => {
    for (const l of catalog.lines) {
      for (const s of l.sources) expect(s.title, `${l.id}: ${s.source}`).toBeTruthy();
    }
  });
});
