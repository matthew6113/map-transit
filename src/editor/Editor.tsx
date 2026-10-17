/**
 * The network editor (Phase 4b; ?edit=1): Matthew draws his ideal network over the map with Terra
 * Draw, names each line, says which proposals it draws on, and exports data/ideal/network.geojson to
 * commit. Nothing is saved to the site; a draft is kept in this browser only, as a convenience.
 *
 * Terra Draw adds its own layers (ids from ADDED_PREFIX), which syncStyle carries through the app's
 * diffed style updates (src/map/MapView.tsx).
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Map as MapLibreMap, MapGeoJSONFeature } from 'maplibre-gl';
import { TerraDraw, TerraDrawLineStringMode, TerraDrawSelectMode, type GeoJSONStoreFeatures, type HexColor, type TerraDrawMouseEvent } from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import networkUrl from '../../data/ideal/network.geojson?url';
import { MODES, type Mode } from '../data/vocab';
import { ADDED_PREFIX } from '../map/MapView';
import { modeColor, type Theme } from '../theme/theme';
import { DEFAULT_AUTHOR, DEFAULT_MODE, fromFile, parse, problems, serialize, toFile, type DraftFeature } from './network';

const DRAFT_KEY = 'transit-ideal-network-draft';
/** Snap a new point to a line on the map within this many pixels (hold Shift not to). */
const SNAP_PX = 10;
const SNAP_LAYERS = /^transit-(past|present|future|ideal)-(solid|tube|dashed)$/;

interface Props {
  map: MapLibreMap;
  theme: Theme;
  /** The reference proposals on the map, for "based on". */
  proposals: { id: string; name: string }[];
  onClose: () => void;
}

type Tool = 'select' | 'linestring';

const readDraft = (): DraftFeature[] | null => {
  try {
    const text = localStorage.getItem(DRAFT_KEY);
    return text ? (JSON.parse(text) as DraftFeature[]) : null;
  } catch {
    return null;
  }
};
const writeDraft = (features: DraftFeature[] | null) => {
  try {
    if (features) localStorage.setItem(DRAFT_KEY, JSON.stringify(features));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Private windows and blocked storage: the draft just isn't kept.
  }
};

/** The nearest vertex of a transit line drawn under the pointer, so a new line can join one exactly. */
function snapToTransit(map: MapLibreMap) {
  return (e: TerraDrawMouseEvent): [number, number] | undefined => {
    if (e.heldKeys.includes('Shift')) return undefined;
    const layers = map.getStyle().layers.filter((l) => SNAP_LAYERS.test(l.id)).map((l) => l.id);
    if (!layers.length) return undefined;
    const box: [[number, number], [number, number]] = [[e.containerX - SNAP_PX, e.containerY - SNAP_PX], [e.containerX + SNAP_PX, e.containerY + SNAP_PX]];
    let best: [number, number] | undefined;
    let bestD = SNAP_PX * SNAP_PX;
    for (const f of map.queryRenderedFeatures(box, { layers }) as MapGeoJSONFeature[]) {
      const g = f.geometry;
      const coords = g.type === 'LineString' ? g.coordinates : g.type === 'MultiLineString' ? g.coordinates.flat() : [];
      for (const c of coords) {
        const p = map.project(c as [number, number]);
        const d = (p.x - e.containerX) ** 2 + (p.y - e.containerY) ** 2;
        if (d < bestD) {
          bestD = d;
          best = [c[0], c[1]];
        }
      }
    }
    return best;
  };
}

export function Editor({ map, theme, proposals, onClose }: Props) {
  const draw = useRef<TerraDraw | null>(null);
  const [features, setFeatures] = useState<DraftFeature[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('select');
  const [restored, setRestored] = useState(false);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    const color = (f: GeoJSONStoreFeatures) => {
      const m = (f.properties.transit_mode as Mode | undefined) ?? DEFAULT_MODE;
      return modeColor(theme, MODES[m]?.group ?? 'heavy_rail') as HexColor;
    };
    const snapping = { toCoordinate: true, toCustom: snapToTransit(map) };
    const td = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({ map, prefixId: ADDED_PREFIX }),
      modes: [
        new TerraDrawLineStringMode({
          snapping,
          styles: { lineStringColor: color, lineStringWidth: 4, closingPointColor: theme.colors.selection as HexColor, snappingPointColor: theme.colors.selection as HexColor },
        }),
        new TerraDrawSelectMode({
          flags: { linestring: { feature: { draggable: false, coordinates: { midpoints: true, draggable: true, deletable: true, snappable: snapping } } } },
          styles: { selectedLineStringColor: theme.colors.selection as HexColor, selectedLineStringWidth: 5, selectionPointColor: theme.colors.selection as HexColor, midPointColor: theme.colors.land as HexColor, midPointOutlineColor: theme.colors.selection as HexColor },
        }),
      ],
    });
    td.start();
    td.setMode('select');
    const lines = () => td.getSnapshot().filter((f) => f.geometry.type === 'LineString') as unknown as DraftFeature[];
    const sync = () => {
      const now = lines();
      setFeatures(now);
      writeDraft(now);
    };
    td.on('change', sync);
    td.on('select', (id) => setSelected(String(id)));
    td.on('deselect', () => setSelected(null));
    td.on('finish', (id, ctx) => {
      if (ctx.action !== 'draw') return;
      td.updateFeatureProperties(id, { transit_mode: DEFAULT_MODE, author: DEFAULT_AUTHOR, based_on: [], name: '' });
      td.setMode('select');
      setTool('select');
      td.selectFeature(id);
    });
    draw.current = td;

    const load = (items: DraftFeature[]) => {
      td.clear();
      td.addFeatures(items.map((f) => ({ ...f, id: crypto.randomUUID() })) as unknown as GeoJSONStoreFeatures[]);
      sync();
    };
    const draft = readDraft();
    if (draft?.length) {
      load(draft);
      setRestored(true);
    } else {
      void fetch(networkUrl).then((r) => r.text()).then((t) => load(fromFile(parse(t)))).catch(() => setMessage('The network file could not be read.'));
    }
    return () => {
      draw.current = null;
      td.stop();
    };
  }, [map, theme]);

  const current = useMemo(() => features.find((f) => String(f.id) === selected), [features, selected]);

  const choose = (next: Tool) => {
    const td = draw.current;
    if (!td) return;
    td.setMode(next);
    setTool(next);
  };
  const update = (props: Partial<DraftFeature['properties']>) => {
    if (!draw.current || !selected) return;
    draw.current.updateFeatureProperties(selected, props as Record<string, never>);
  };
  const remove = () => {
    if (!draw.current || !selected) return;
    const id = selected;
    draw.current.deselectFeature(id);
    draw.current.removeFeatures([id]);
    setSelected(null);
    setFeatures((prev) => {
      const next = prev.filter((f) => String(f.id) !== id);
      writeDraft(next);
      return next;
    });
  };
  const exportFile = () => {
    const issues = problems(features);
    if (issues.length) {
      setMessage(`Not exported yet: ${issues.join(' ')}`);
      return;
    }
    const blob = new Blob([serialize(toFile(features))], { type: 'application/geo+json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'network.geojson';
    a.click();
    URL.revokeObjectURL(a.href);
    setMessage(`Exported ${features.length} line${features.length === 1 ? '' : 's'}. Commit the file as data/ideal/network.geojson, then run make app-data.`);
  };
  const importFile = async (file: File) => {
    try {
      const items = fromFile(parse(await file.text()));
      const td = draw.current;
      if (!td) return;
      td.clear();
      td.addFeatures(items.map((f) => ({ ...f, id: crypto.randomUUID() })) as unknown as GeoJSONStoreFeatures[]);
      const now = td.getSnapshot() as unknown as DraftFeature[];
      setFeatures(now);
      writeDraft(now);
      setSelected(null);
      setMessage(`Imported ${items.length} line${items.length === 1 ? '' : 's'} from ${file.name}.`);
    } catch (e) {
      setMessage(`Not imported: ${(e as Error).message}`);
    }
  };
  const discardDraft = async () => {
    writeDraft(null);
    setRestored(false);
    const td = draw.current;
    if (!td) return;
    const items = fromFile(parse(await (await fetch(networkUrl)).text()));
    td.clear();
    td.addFeatures(items.map((f) => ({ ...f, id: crypto.randomUUID() })) as unknown as GeoJSONStoreFeatures[]);
    setFeatures(td.getSnapshot() as unknown as DraftFeature[]);
    setSelected(null);
    setMessage('Draft discarded; back to the committed file.');
  };

  return (
    <aside class="line-panel editor" aria-labelledby="editor-title">
      <header>
        <div>
          <h2 id="editor-title" ref={heading} tabIndex={-1}>Matthew's network</h2>
          <p class="meta"><span>Editor</span><span>{features.length} line{features.length === 1 ? '' : 's'}</span></p>
        </div>
        <button type="button" class="close" aria-label="Close the editor" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
        </button>
      </header>

      <p class="small">
        Draw the ideal network over the map. Nothing is saved to the site: export the file and commit it as
        {' '}<code>data/ideal/network.geojson</code>. A draft stays in this browser until then.
      </p>
      {restored && (
        <p class="status-note">
          Restored the draft kept in this browser.{' '}
          <button type="button" class="link" onClick={() => void discardDraft()}>Discard it</button>
        </p>
      )}

      <div class="editor-tools" role="toolbar" aria-label="Drawing tools">
        <button type="button" aria-pressed={tool === 'linestring'} onClick={() => choose('linestring')}>Draw a line</button>
        <button type="button" aria-pressed={tool === 'select'} onClick={() => choose('select')}>Select and edit</button>
        <button type="button" disabled={!current} onClick={remove}>Delete line</button>
      </div>
      <p class="small">
        {tool === 'linestring'
          ? 'Click to add points; double-click, or click the last point again, to finish. Points snap to lines on the map; hold Shift not to.'
          : 'Click a line to edit it: drag a point to move it, drag a midpoint to add one, right-click a point to delete it.'}
      </p>

      {current && (
        <section class="editor-form">
          <h3>This line</h3>
          <label>Name
            <input type="text" value={current.properties.name ?? ''} onInput={(e) => update({ name: (e.currentTarget as HTMLInputElement).value })} />
          </label>
          <label>Mode
            <select value={current.properties.transit_mode ?? DEFAULT_MODE}
              onChange={(e) => update({ transit_mode: (e.currentTarget as HTMLSelectElement).value as Mode })}>
              {(Object.keys(MODES) as Mode[]).map((m) => <option key={m} value={m}>{MODES[m].label}</option>)}
            </select>
          </label>
          <fieldset>
            <legend>Based on</legend>
            {proposals.length === 0 && <p class="small">No proposals are drawn yet.</p>}
            {proposals.map((p) => (
              <label key={p.id} class="check">
                <input type="checkbox" checked={(current.properties.based_on ?? []).includes(p.id)} onChange={(e) => {
                  const on = (e.currentTarget as HTMLInputElement).checked;
                  const prev = current.properties.based_on ?? [];
                  update({ based_on: on ? [...prev, p.id] : prev.filter((x) => x !== p.id) });
                }} />
                {p.name}
              </label>
            ))}
          </fieldset>
          <label>Notes
            <textarea rows={3} value={current.properties.notes ?? ''} onInput={(e) => update({ notes: (e.currentTarget as HTMLTextAreaElement).value })} />
          </label>
          <label>Author
            <input type="text" value={current.properties.author ?? DEFAULT_AUTHOR} onInput={(e) => update({ author: (e.currentTarget as HTMLInputElement).value })} />
          </label>
        </section>
      )}

      <section>
        <h3>Lines</h3>
        {features.length === 0 && <p class="small">None yet.</p>}
        <ul class="line-list">
          {features.map((f, i) => (
            <li key={String(f.id)}>
              <button type="button" aria-current={String(f.id) === selected ? 'true' : undefined} onClick={() => {
                choose('select');
                draw.current?.selectFeature(f.id as string);
              }}>
                <span class="name">{f.properties.name?.trim() || `Unnamed line ${i + 1}`}</span>
                <span class="where">{MODES[f.properties.transit_mode ?? DEFAULT_MODE]?.label} · {f.geometry.coordinates.length} points</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section class="editor-file">
        <button type="button" onClick={exportFile}>Export network.geojson</button>
        <button type="button" onClick={() => fileInput.current?.click()}>Import a file</button>
        <input ref={fileInput} type="file" accept=".geojson,.json,application/geo+json,application/json" hidden
          onChange={(e) => {
            const file = (e.currentTarget as HTMLInputElement).files?.[0];
            if (file) void importFile(file);
            (e.currentTarget as HTMLInputElement).value = '';
          }} />
        {message && <p class="small" role="status">{message}</p>}
      </section>
    </aside>
  );
}
