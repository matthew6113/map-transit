/**
 * The editor's export (src/editor/network.ts) writes a file the network schema accepts, keeps ids
 * across a round trip, and refuses what the schema would.
 */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import Ajv2020 from 'ajv/dist/2020';
import networkSchema from '../data/schema/network.schema.json';
import { fromFile, parse, problems, serialize, toFile, type DraftFeature } from '../src/editor/network';

const validate = new Ajv2020({ allErrors: true, strict: false }).compile(networkSchema);
const line = (name: string, coords: number[][], extra: Partial<DraftFeature['properties']> = {}): DraftFeature => ({
  type: 'Feature',
  properties: { mode: 'linestring', name, ...extra },
  geometry: { type: 'LineString', coordinates: coords },
});

describe("Matthew's network file", () => {
  it('exports what the schema accepts, with ids from names', () => {
    const file = toFile([
      line('Geary subway', [[-122.47, 37.78], [-122.40, 37.79]], { transit_mode: 'rapid_transit', based_on: ['connectsf'] }),
      line('Geary subway', [[-122.47, 37.78], [-122.50, 37.77]]),
    ]);
    expect(validate(file), JSON.stringify(validate.errors)).toBe(true);
    expect(file.features.map((f) => f.properties.id)).toEqual(['geary-subway', 'geary-subway-2']);
    expect(file.features[0].properties.author).toBe('Matthew Huguet');
  });

  it('keeps ids, fields and coordinates through a round trip', () => {
    const first = toFile([line('Second Transbay tube', [[-122.39, 37.79], [-122.30, 37.80]], { notes: 'Via Alameda?', based_on: ['link21'] })]);
    const again = toFile(fromFile(parse(serialize(first))).map((f) => ({ ...f, properties: { ...f.properties, name: 'Renamed' } })));
    expect(again.features[0].properties.id).toBe('second-transbay-tube');
    expect(again.features[0].properties.notes).toBe('Via Alameda?');
    expect(again.features[0].geometry).toEqual(first.features[0].geometry);
  });

  it('serializes like the file in the repository', () => {
    const text = readFileSync(join(resolve(import.meta.dirname, '..'), 'data', 'ideal', 'network.geojson'), 'utf8');
    expect(serialize(toFile(fromFile(parse(text))))).toBe(text);
  });

  it('names what still stops an export', () => {
    expect(problems([line('', [[-122.4, 37.8], [-122.3, 37.8]]), line('Stub', [[-122.4, 37.8]])])).toEqual([
      'Line 1 has no name.',
      'Stub has fewer than two points.',
    ]);
  });

  it('refuses a file that holds anything but lines', () => {
    expect(() => parse(JSON.stringify({ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [0, 0] } }] }))).toThrow('Only lines');
  });
});
