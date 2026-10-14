// Synthetic past-era files for the rendering spike (tests/perf.spec.ts): NOT DATA. Random walks
// inside the Bay Area with random years, written to tests/fixtures/synthetic-*.geojson (git-ignored)
// and loaded only by the dev server with ?perf=synthetic.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const N = Number(process.argv[2] ?? 10000);
let seed = 42;
const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const groups = ['heavy_rail', 'commuter_rail', 'interurban', 'streetcar', 'cable', 'light_rail', 'ferry'];
const draw = [];
const lines = [];
const points = [];
for (let i = 1; i <= N; i++) {
  let x = -122.6 + rand() * 0.9;
  let y = 37.3 + rand() * 0.75;
  const coords = [[x, y]];
  const steps = 8 + Math.floor(rand() * 20);
  const dx = (rand() - 0.5) * 0.004;
  const dy = (rand() - 0.5) * 0.004;
  for (let s = 0; s < steps; s++) {
    x += dx + (rand() - 0.5) * 0.002;
    y += dy + (rand() - 0.5) * 0.002;
    coords.push([+x.toFixed(6), +y.toFixed(6)]);
  }
  const open = 1850 + Math.floor(rand() * 170) + rand();
  const close = rand() < 0.2 ? 9999 : Math.min(2026, open + 1 + rand() * 80);
  const group = groups[Math.floor(rand() * groups.length)];
  const common = { era: 'past', mode: 'streetcar', group, conf: rand() < 0.2 ? 'approximate' : 'surveyed', open_y: +open.toFixed(3), close_y: +close.toFixed(3), borrowed: rand() < 0.1 ? 1 : 0, undated: 0, status: 'closed' };
  draw.push({ type: 'Feature', properties: { fid: i, seg: `s${i}`, structure: rand() < 0.05 ? 'subway' : '', shared: 0, ...common }, geometry: { type: 'LineString', coordinates: coords } });
  lines.push({ type: 'Feature', properties: { fid: i, line: `l${Math.ceil(i / 5)}`, seg: `s${i}`, name: `Synthetic ${Math.ceil(i / 5)}`, ...common }, geometry: { type: 'LineString', coordinates: coords } });
  if (i % 5 === 0) points.push({ type: 'Feature', properties: { fid: i / 5, id: `p${i}`, name: `Stop ${i}`, kind: 'station', era: 'past', group, status: '', lines: `,l${i / 5},`, open_y: common.open_y, close_y: common.close_y }, geometry: { type: 'Point', coordinates: coords[0] } });
}
const dir = new URL('.', import.meta.url).pathname;
const fc = (features) => JSON.stringify({ type: 'FeatureCollection', features });
writeFileSync(join(dir, 'synthetic-draw.geojson'), fc(draw));
writeFileSync(join(dir, 'synthetic-lines.geojson'), fc(lines));
writeFileSync(join(dir, 'synthetic-points.geojson'), fc(points));
console.log(`[synthetic] ${draw.length} segments, ${points.length} points`);
