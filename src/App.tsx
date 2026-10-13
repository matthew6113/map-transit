import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { clearDrawing, currentCamera, flyBack, flyToLine, lineCamera, panelPadding, type Camera } from './basemap/flight';
import { lineIdFromPath, navigate, setQuery } from './basemap/router';
import { loadCatalog, loadEraIndex, type EraIndex, type LineRecord } from './data/catalog';
import { GROUPS, STATUSES, type Era, type Status } from './data/vocab';
import { DATASETS, fadeOutYears } from './eras/layers';
import { homeCamera, MapView, onAfterSync } from './map/MapView';
import type { StyleInputs, ViewMode } from './map/style';
import { applyCssVariables, defaultTheme, MODE_GROUPS, type ModeGroup, type Theme } from './theme/theme';
import { applyYear, resetVisibility, visibleAt, type Dated } from './timeline/visibility';
import { Controls } from './ui/Controls';
import { Credits } from './ui/Credits';
import { EraSwitcher } from './ui/EraSwitcher';
import { Index } from './ui/Index';
import { LinePanel } from './ui/LinePanel';
import { FIRST_YEAR, LAST_YEAR, stepMs, YearSlider } from './ui/YearSlider';

const params = new URLSearchParams(location.search);
/** The page title on the home view. index.html repeats it and the byline for the first paint. */
const SITE_TITLE = 'Bay Area transit';
/** The past era opens on the interurbans' heyday unless the URL says otherwise. */
const DEFAULT_YEAR = 1925;

const ERAS: Era[] = ['past', 'present', 'future'];
const initialEra = (): Era => (ERAS.includes(params.get('era') as Era) ? (params.get('era') as Era) : 'present');
const initialYear = (): number => {
  const y = Number(params.get('year'));
  return Number.isInteger(y) && y >= FIRST_YEAR && y <= LAST_YEAR ? y : DEFAULT_YEAR;
};

/** Layer options from the URL, so a view can be shared or screenshotted: ?labels=0&mask=0&buildings=0 */
function loadTheme(): Theme {
  const theme = structuredClone(defaultTheme);
  const flag = (name: string) => (params.has(name) ? params.get(name) !== '0' : undefined);
  const L = theme.layers;
  L.labels = flag('labels') ?? L.labels;
  L.outsideRegion = flag('mask') ?? L.outsideRegion;
  L.buildings = flag('buildings') ?? L.buildings;
  L.contextRoads = flag('roads') ?? L.contextRoads;
  return theme;
}

interface FlightState {
  /** Bumped by every open and close; a step that finds it changed has been superseded. */
  token: number;
  /** Where the viewer was before the first line opened, to ease back to. */
  returnCamera: Camera | null;
  opener: HTMLElement | null;
}

export function App() {
  const [theme] = useState<Theme>(loadTheme);
  const [mode, setMode] = useState<ViewMode>(params.get('view') === '3d' ? '3d' : '2d');
  const [era, setEraState] = useState<Era>(initialEra);
  const [year, setYear] = useState(initialYear);
  const [ghost, setGhost] = useState(params.get('ghost') === '1');
  const [hiddenGroups, setHiddenGroups] = useState<ModeGroup[]>(() => MODE_GROUPS.filter((g) => !GROUPS[g].defaultOn));
  const [loaded, setLoaded] = useState<Era[]>(() => [...new Set<Era>([...DATASETS[initialEra()], ...(params.get('ghost') === '1' ? ['past' as Era] : [])])]);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [lines, setLines] = useState<LineRecord[]>([]);
  const [indexes, setIndexes] = useState<Partial<Record<Era, EraIndex>>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [interacted, setInteracted] = useState(false);
  const flight = useRef<FlightState>({ token: 0, returnCamera: null, opener: null });
  const animateFrom = useRef<number | undefined>(undefined);
  const hovered = useRef<LineRecord | null>(null);

  const byId = useMemo(() => new Map(lines.map((l) => [l.id, l])), [lines]);
  const live = useRef({ era, openId, byId, indexes, year, speed });
  live.current = { era, openId, byId, indexes, year, speed };

  useEffect(() => {
    applyCssVariables(theme);
    void loadCatalog().then(setLines);
  }, [theme]);

  // Each era's files are fetched once, when the era is first shown.
  useEffect(() => {
    for (const d of loaded) {
      if (indexes[d]) continue;
      void loadEraIndex(d).then((index) => setIndexes((prev) => ({ ...prev, [d]: index })));
    }
  }, [loaded, indexes]);

  const inputs: StyleInputs = useMemo(() => ({
    theme,
    mode,
    loaded,
    view: { era, ghost: ghost && era !== 'past', hiddenGroups, selected: openId },
  }), [theme, mode, loaded, era, ghost, hiddenGroups, openId]);

  /** The past era's year, as feature-state (src/timeline/visibility.ts). */
  const showYear = useCallback((opts: { animateFrom?: number } = {}) => {
    if (!map || live.current.era !== 'past') return;
    const idx = live.current.indexes;
    applyYear(map, Object.fromEntries(DATASETS.past.map((d) => [d, idx[d]])), live.current.year, fadeOutYears(theme),
      { animateFrom: opts.animateFrom, stepMs: stepMs(live.current.speed) });
  }, [map, theme]);

  /**
   * Feature-state doesn't live in the style. A diffed sync keeps it, but can add sources (whose
   * features then need their year); a full style reload drops it all.
   */
  const restoreState = useCallback((full: boolean) => {
    if (!map) return;
    const { openId: id, byId: lines } = live.current;
    const set = (line: LineRecord | null | undefined, state: Record<string, boolean>) => {
      if (!line || !map.getSource(`transit-${line.era}-lines`)) return;
      for (const fid of line.fids) map.setFeatureState({ source: `transit-${line.era}-lines`, id: fid }, state);
    };
    if (full) resetVisibility(map);
    set(hovered.current, { hover: true });
    set(id ? lines.get(id) : null, { selected: true });
    showYear();
  }, [map, showYear]);

  useEffect(() => {
    if (!map) return;
    const afterDiff = () => restoreState(false);
    const afterReload = () => restoreState(true);
    onAfterSync(map, afterDiff);
    map.on('style.load', afterReload);
    return () => {
      map.off('style.load', afterReload);
    };
  }, [map, restoreState]);

  // A new year (or an era's files arriving): show the network as of then.
  useEffect(() => {
    const from = animateFrom.current;
    animateFrom.current = undefined;
    showYear({ animateFrom: from });
  }, [year, era, indexes, showYear]);

  /** Lines under the pointer count only if they're on the map this year. */
  const shown = useCallback((p: Record<string, unknown>) =>
    live.current.era !== 'past' || visibleAt(p as unknown as Dated, live.current.year, fadeOutYears(theme)), [theme]);

  // The URL follows the view (debounced: Safari limits history updates).
  useEffect(() => {
    const t = window.setTimeout(() => setQuery({
      era: era === 'present' ? null : era,
      year: era === 'past' ? String(year) : null,
      ghost: ghost && era !== 'past' ? '1' : null,
    }), 400);
    return () => window.clearTimeout(t);
  }, [era, year, ghost]);

  const setEra = useCallback((next: Era) => {
    setPlaying(false);
    setEraState(next);
    setLoaded((prev) => [...new Set<Era>([...prev, ...DATASETS[next]])]);
  }, []);

  const onHoverLine = useCallback((id: string | null) => {
    if (!map) return;
    const prev = hovered.current;
    if (prev && map.getSource(`transit-${prev.era}-lines`)) {
      for (const fid of prev.fids) map.setFeatureState({ source: `transit-${prev.era}-lines`, id: fid }, { hover: false });
    }
    const next = id ? live.current.byId.get(id) ?? null : null;
    hovered.current = next;
    if (next && map.getSource(`transit-${next.era}-lines`)) {
      for (const fid of next.fids) map.setFeatureState({ source: `transit-${next.era}-lines`, id: fid }, { hover: true });
    }
  }, [map]);

  const setSelected = useCallback((line: LineRecord | undefined, on: boolean) => {
    if (!map || !line || !map.getSource(`transit-${line.era}-lines`)) return;
    for (const fid of line.fids) map.setFeatureState({ source: `transit-${line.era}-lines`, id: fid }, { selected: on });
  }, [map]);

  /** Open a line: panel in, a short flight to it while it draws itself. */
  const openLine = useCallback(async (id: string, opts: { push?: boolean; opener?: HTMLElement | null } = {}) => {
    const line = live.current.byId.get(id);
    if (!map || !line) return;
    const f = flight.current;
    const token = ++f.token;
    const current = () => flight.current.token === token;
    if (!live.current.openId) {
      f.returnCamera = currentCamera(map);
      f.opener = opts.opener ?? (document.activeElement as HTMLElement | null);
    }
    setSelected(live.current.byId.get(live.current.openId ?? ''), false);
    if (!DATASETS[live.current.era].includes(line.era)) setEra(line.era);
    const index = live.current.indexes[line.era] ?? (await loadEraIndex(line.era));
    if (!current()) return;
    if (opts.push !== false) navigate(id);
    document.title = `${line.name} · ${SITE_TITLE}`;
    setOpenId(id);
    setSelected(line, true);
    document.body.dataset.flight = 'flying';
    const padding = panelPadding(map);
    await flyToLine(map, lineCamera(map, line.bbox, padding), padding, index.pieces.get(id) ?? [], current);
    if (current()) document.body.dataset.flight = 'landed';
  }, [map, setEra, setSelected]);

  const closeLine = useCallback(async (opts: { push?: boolean; to?: Camera } = {}) => {
    if (!map || !live.current.openId) return;
    const f = flight.current;
    const token = ++f.token;
    setSelected(live.current.byId.get(live.current.openId), false);
    if (opts.push !== false) navigate(null);
    document.title = SITE_TITLE;
    setOpenId(null);
    clearDrawing(map);
    const back = opts.to ?? f.returnCamera;
    const opener = f.opener;
    f.returnCamera = null;
    f.opener = null;
    (opener?.isConnected ? opener : map.getCanvas()).focus({ preventScroll: true });
    if (back) await flyBack(map, back);
    if (flight.current.token === token) delete document.body.dataset.flight;
  }, [map, setSelected]);

  const goHome = useCallback(() => {
    if (!map) return;
    const camera = homeCamera(map);
    if (live.current.openId) {
      void closeLine({ to: camera });
      return;
    }
    map.easeTo({ ...camera, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1200 });
  }, [map, closeLine]);

  /** The era switcher: leaving an era closes a line it doesn't draw. (Opening a line from another
   * era switches era itself, without closing anything.) */
  const chooseEra = useCallback((next: Era) => {
    const line = live.current.openId ? live.current.byId.get(live.current.openId) : null;
    if (line && !DATASETS[next].includes(line.era)) void closeLine();
    setEra(next);
  }, [closeLine, setEra]);

  // Deep link on load, and the back and forward buttons.
  useEffect(() => {
    if (!map || !lines.length) return;
    const sync = () => {
      const id = lineIdFromPath();
      if (id && !live.current.byId.has(id)) {
        navigate(null, true);
        return;
      }
      if (id && id !== live.current.openId) void openLine(id, { push: false });
      else if (!id && live.current.openId) void closeLine({ push: false });
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [map, lines.length, openLine, closeLine]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && live.current.openId && !document.querySelector('.map-chooser')) void closeLine();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLine]);

  const onReady = useCallback((m: MapLibreMap) => {
    setMap(m);
    document.body.dataset.mapReady = 'true';
  }, []);

  const onYear = useCallback((y: number, opts: { animateFrom?: number } = {}) => {
    animateFrom.current = opts.animateFrom;
    setYear(y);
  }, []);

  // Test hooks (development and ?test=1 only), for the e2e and rendering tests.
  useEffect(() => {
    if (!import.meta.env.DEV && !params.has('test')) return;
    (window as unknown as { __app: unknown }).__app = { setYear: onYear, setEra: chooseEra, openLine, closeLine };
  }, [onYear, chooseEra, openLine, closeLine]);

  const line = openId ? byId.get(openId) : undefined;
  const undatedCount = lines.filter((l) => DATASETS.past.includes(l.era) && l.undated).length;
  const toggleGroup = (g: ModeGroup) =>
    setHiddenGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  return (
    <div class={`app era-${era} ${line ? 'with-line' : ''}`}>
      <a class="skip-link" href="#controls-start">Skip to map controls</a>
      <header class="title">
        <h1>{SITE_TITLE}</h1>
        <p class="byline">by <a href="https://www.matthewhuguet.com/">Matthew Huguet</a></p>
        <div class="era-bar">
          <EraSwitcher era={era} onChange={chooseEra} />
          {era === 'past' && (
            <YearSlider year={year} playing={playing} speed={speed} onYear={onYear} onPlaying={setPlaying}
              onSpeed={setSpeed} undatedCount={undatedCount} />
          )}
          {era !== 'past' && (
            <label class="ghost-toggle">
              <input type="checkbox" checked={ghost} onChange={(e) => {
                const on = (e.currentTarget as HTMLInputElement).checked;
                setGhost(on);
                if (on) setLoaded((prev) => [...new Set<Era>([...prev, 'past'])]);
              }} />
              Show lost lines underneath
            </label>
          )}
          {era === 'future' && (
            <p class="era-note">Funded and under-construction lines. The ideal network comes in Phase 4.</p>
          )}
        </div>
        <Index era={era} lines={lines} hiddenGroups={hiddenGroups} onToggleGroup={toggleGroup} openId={openId}
          onOpen={(id, opener) => void openLine(id, { opener })} onExpand={() => setInteracted(true)} />
      </header>
      <MapView inputs={inputs} shown={shown} statusLabel={(s) => STATUSES[s as Status]?.label ?? s} onReady={onReady}
        onFirstInteraction={() => setInteracted(true)} onHoverLine={onHoverLine}
        onSelectLine={(id) => void openLine(id)} />
      <span id="controls-start" tabIndex={-1} />
      <Controls map={map} mode={mode} onModeChange={setMode} onHome={goHome} />
      <Credits collapse={interacted || !!line} />
      {line && <LinePanel line={line} onClose={() => void closeLine()} />}
    </div>
  );
}
