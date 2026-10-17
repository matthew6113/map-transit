import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { clearDrawing, currentCamera, flyBack, flyToLine, lineCamera, panelPadding, type Camera } from './basemap/flight';
import { lineIdFromPath, navigate, setQuery } from './basemap/router';
import { loadCatalog, loadEraIndex, type EraIndex, type LineRecord } from './data/catalog';
import { GROUPS, STATUSES, type Dataset, type Era, type Status } from './data/vocab';
import { DATASETS, fadeOutYears, GHOST_STYLES, PROPOSAL_STYLES, STATUS_STYLES, type GhostStyle, type ProposalStyle, type StatusStyle } from './eras/layers';
import { homeCamera, MapView, onAfterSync } from './map/MapView';
import type { StyleInputs, ViewMode } from './map/style';
import { applyCssVariables, defaultTheme, MODE_GROUPS, normalizeTheme, type ModeGroup, type Theme } from './theme/theme';
import { applyYear, resetVisibility, visibleAt, type Dated } from './timeline/visibility';
import { Controls } from './ui/Controls';
import { Credits } from './ui/Credits';
import type { Editor as EditorComponent } from './editor/Editor';
import { EraSwitcher } from './ui/EraSwitcher';
import { Index } from './ui/Index';
import { LinePanel } from './ui/LinePanel';
import { StylePanel } from './ui/StylePanel';
import { busyPace, PACES, type Pace } from './timeline/pace';
import { FIRST_YEAR, LAST_YEAR, stepMs, YearSlider } from './ui/YearSlider';

const params = new URLSearchParams(location.search);
/** The page title on the home view. index.html repeats it and the byline for the first paint. */
const SITE_TITLE = 'Bay Area transit';
/** The past era opens on the interurbans' heyday unless the URL says otherwise. */
const DEFAULT_YEAR = 1925;

const ERAS: Era[] = ['past', 'present', 'future'];
/** The era that draws a dataset: the reference proposals are the future's layer B. */
const eraOf = (d: Dataset): Era => (d === 'ideal' ? 'future' : d);
/** The network editor (Phase 4b), for Matthew: ?edit=1, in the future era. */
const EDIT = params.get('edit') === '1';
const initialEra = (): Era => (ERAS.includes(params.get('era') as Era) ? (params.get('era') as Era) : EDIT ? 'future' : 'present');
/** How future status is drawn, while Matthew chooses (Phase 3): ?solidity=opacity|tint|committed */
const STATUS_STYLE: StatusStyle = STATUS_STYLES.includes(params.get('solidity') as StatusStyle) ? (params.get('solidity') as StatusStyle) : 'opacity';
/** How the reference proposals are drawn, while Matthew chooses (Phase 4): ?proposalstyle=translucent|tint|neutral */
const PROPOSAL_STYLE: ProposalStyle = PROPOSAL_STYLES.includes(params.get('proposalstyle') as ProposalStyle) ? (params.get('proposalstyle') as ProposalStyle) : 'translucent';
/** How the lost lines are drawn under today's network, while Matthew chooses (Phase 5): ?ghoststyle=hue|ink|dashed */
const GHOST_STYLE: GhostStyle = GHOST_STYLES.includes(params.get('ghoststyle') as GhostStyle) ? (params.get('ghoststyle') as GhostStyle) : 'hue';
/** How play moves through the years, while Matthew chooses (Phase 5): ?pace=even|busy */
const PACE: Pace = PACES.includes(params.get('pace') as Pace) ? (params.get('pace') as Pace) : 'even';
const initialYear = (): number => {
  const y = Number(params.get('year'));
  return Number.isInteger(y) && y >= FIRST_YEAR && y <= LAST_YEAR ? y : DEFAULT_YEAR;
};

/** The style panel (Phase 5, from BAM) is an author's tool: ?style=1. Its theme persists in the browser. */
const STYLE_PANEL_ENABLED = params.get('style') === '1';
const STORAGE_KEY = 'transit.theme.v1';

/** Layer options from the URL, so a view can be shared or screenshotted: ?labels=0&mask=0&buildings=0 */
function loadTheme(): Theme {
  let theme = structuredClone(defaultTheme);
  if (STYLE_PANEL_ENABLED && !params.has('test')) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) theme = normalizeTheme(JSON.parse(saved));
    } catch {
      // Storage can be blocked; fall back to the theme file.
    }
  }
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
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [panelOpen, setPanelOpen] = useState(STYLE_PANEL_ENABLED);
  const styleToggle = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<ViewMode>(params.get('view') === '3d' ? '3d' : '2d');
  const [era, setEraState] = useState<Era>(initialEra);
  const [year, setYear] = useState(initialYear);
  const [ghost, setGhost] = useState(params.get('ghost') === '1');
  const [proposals, setProposals] = useState(params.get('proposals') === '1');
  // Matthew's own network shows once it has lines, unless switched off (?network=0).
  const [networkOn, setNetworkOn] = useState(params.get('network') !== '0');
  const [editing, setEditing] = useState(EDIT);
  // The editor and Terra Draw load only for ?edit=1, not for every visitor.
  const [Editor, setEditor] = useState<typeof EditorComponent | null>(null);
  useEffect(() => {
    if (editing && !Editor) void import('./editor/Editor').then((m) => setEditor(() => m.Editor));
  }, [editing, Editor]);
  const [hiddenGroups, setHiddenGroups] = useState<ModeGroup[]>(() => MODE_GROUPS.filter((g) => !GROUPS[g].defaultOn));
  const [loaded, setLoaded] = useState<Dataset[]>(() => [...new Set<Dataset>([...DATASETS[initialEra()], ...(params.get('ghost') === '1' ? ['past' as Era] : [])])]);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [lines, setLines] = useState<LineRecord[]>([]);
  const [indexes, setIndexes] = useState<Partial<Record<Dataset, EraIndex>>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [interacted, setInteracted] = useState(false);
  const flight = useRef<FlightState>({ token: 0, returnCamera: null, opener: null });
  const animateFrom = useRef<number | undefined>(undefined);
  const hovered = useRef<LineRecord | null>(null);

  const byId = useMemo(() => new Map(lines.map((l) => [l.id, l])), [lines]);
  const hasNetwork = useMemo(() => lines.some((l) => l.status === 'ideal'), [lines]);
  // While the editor is open it draws the network itself, so the map's copy steps aside.
  const network = hasNetwork && networkOn && !editing;
  // Play's pace (?pace=busy): a year in which more opens and closes takes longer.
  const pace = useMemo(() => (PACE === 'busy' ? busyPace([indexes.past, indexes.present], FIRST_YEAR, LAST_YEAR) : () => 1),
    [indexes.past, indexes.present]);
  const live = useRef({ era, openId, byId, indexes, year, speed, proposals, pace });
  live.current = { era, openId, byId, indexes, year, speed, proposals, pace };

  useEffect(() => {
    void loadCatalog().then(setLines);
  }, []);

  useEffect(() => {
    applyCssVariables(theme);
    if (!STYLE_PANEL_ENABLED) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // Not critical: the panel still works without persistence.
    }
  }, [theme]);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    // Focus goes back to the button that opens it, which renders once the panel has gone.
    requestAnimationFrame(() => styleToggle.current?.focus());
  }, []);

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
    view: { era, ghost: ghost && era !== 'past', hiddenGroups, selected: openId, statusStyle: STATUS_STYLE,
      proposals: proposals && era === 'future', network: network && era === 'future', proposalStyle: PROPOSAL_STYLE,
      ghostStyle: GHOST_STYLE },
  }), [theme, mode, loaded, era, ghost, hiddenGroups, openId, proposals, network]);

  /** The past era's year, as feature-state (src/timeline/visibility.ts). */
  const showYear = useCallback((opts: { animateFrom?: number } = {}) => {
    if (!map || live.current.era !== 'past') return;
    const idx = live.current.indexes;
    applyYear(map, Object.fromEntries(DATASETS.past.map((d) => [d, idx[d]])), live.current.year, fadeOutYears(theme),
      { animateFrom: opts.animateFrom, stepMs: stepMs(live.current.speed) * live.current.pace(live.current.year) });
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
      proposals: proposals && era === 'future' ? '1' : null,
      network: hasNetwork && !networkOn && era === 'future' ? '0' : null,
      edit: editing ? '1' : null,
    }), 400);
    return () => window.clearTimeout(t);
  }, [era, year, ghost, proposals, editing, hasNetwork, networkOn]);

  const setEra = useCallback((next: Era) => {
    setPlaying(false);
    setEraState(next);
    setLoaded((prev) => [...new Set<Dataset>([...prev, ...DATASETS[next]])]);
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
    if (!DATASETS[live.current.era].includes(line.era)) setEra(eraOf(line.era));
    if (line.status === 'proposed' && !live.current.proposals) setProposals(true);
    if (line.status === 'ideal') setNetworkOn(true);
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
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      // Alt+Shift+S, as in BAM, not a bare "S": single-key shortcuts fire while typing (WCAG 2.1.4).
      if (STYLE_PANEL_ENABLED && !typing && e.altKey && e.shiftKey && e.code === 'KeyS') {
        e.preventDefault();
        setPanelOpen((open) => !open);
      } else if (e.key === 'Escape' && panelOpen) {
        // The topmost panel closes first.
        closePanel();
      } else if (e.key === 'Escape' && live.current.openId && !document.querySelector('.map-chooser')) {
        void closeLine();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLine, closePanel, panelOpen]);

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
  const undated = useMemo(() => {
    const segs = new Map<string, { id: string; name: string; system: string; lines: string[] }>();
    for (const l of lines) {
      if (!DATASETS.past.includes(l.era)) continue;
      for (const s of l.segments) {
        if (!s.undated) continue;
        const u = segs.get(s.id) ?? { id: s.id, name: s.name, system: l.system_name, lines: [] };
        if (!u.lines.includes(l.name)) u.lines.push(l.name);
        segs.set(s.id, u);
      }
    }
    return [...segs.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [lines]);
  // The lines on the map in the slider's year, from the same feature years the map fades by: a line
  // runs if any of its pieces is open that year (decision 14).
  const running = useMemo(() => {
    if (era !== 'past') return undefined;
    const open = new Map<Dataset, Map<number, { open: number; close: number }>>();
    for (const d of DATASETS.past) {
      const index = indexes[d];
      if (index) open.set(d, new Map(index.lines.map((f) => [f.fid, f])));
    }
    const ids = new Set<string>();
    for (const l of lines) {
      const fids = open.get(l.era);
      if (fids && l.fids.some((fid) => {
        const f = fids.get(fid);
        return !!f && f.open >= 0 && f.open < year + 1 && f.close > year;
      })) ids.add(l.id);
    }
    return { year, ids };
  }, [era, year, lines, indexes]);
  // The proposals a line of Matthew's network can say it is based on.
  const proposalChoices = useMemo(() => {
    const seen = new Map<string, string>();
    for (const l of lines) if (l.proposal && !seen.has(l.proposal.id)) seen.set(l.proposal.id, `${l.proposal.proposed_by}: ${l.proposal.document.title}`);
    return [...seen].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [lines]);
  const toggleGroup = (g: ModeGroup) =>
    setHiddenGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  return (
    <div class={`app era-${era} ${line || (editing && era === 'future') ? 'with-line' : ''} ${panelOpen ? 'with-panel' : ''}`}>
      <a class="skip-link" href="#controls-start">Skip to map controls</a>
      <header class="title">
        <h1>{SITE_TITLE}</h1>
        <p class="byline">by <a href="https://www.matthewhuguet.com/">Matthew Huguet</a></p>
        <div class="era-bar">
          <EraSwitcher era={era} onChange={chooseEra} />
          {era === 'past' && (
            <YearSlider year={year} playing={playing} speed={speed} pace={pace} onYear={onYear} onPlaying={setPlaying}
              onSpeed={setSpeed} undated={undated} />
          )}
          {era !== 'past' && (
            <label class="ghost-toggle">
              <input type="checkbox" checked={ghost} onChange={(e) => {
                const on = (e.currentTarget as HTMLInputElement).checked;
                setGhost(on);
                if (on) setLoaded((prev) => [...new Set<Dataset>([...prev, 'past'])]);
              }} />
              Show lost lines underneath
            </label>
          )}
          {era === 'future' && hasNetwork && (
            <label class="ghost-toggle">
              <input type="checkbox" checked={networkOn} onChange={(e) => {
                const on = (e.currentTarget as HTMLInputElement).checked;
                setNetworkOn(on);
                if (!on && line?.status === 'ideal') void closeLine();
              }} />
              Show Matthew's network
            </label>
          )}
          {era === 'future' && (
            <label class="ghost-toggle">
              <input type="checkbox" checked={proposals} onChange={(e) => {
                const on = (e.currentTarget as HTMLInputElement).checked;
                setProposals(on);
                if (!on && line?.status === 'proposed') void closeLine();
              }} />
              Show proposals
            </label>
          )}
          {era === 'future' && (
            <p class="era-note">
              Lines being planned, funded or built, with their status from their agencies.
              {network && ' Matthew\'s own network is drawn in full.'}
              {proposals && ' Proposals are drawn thinner, as their documents describe them: the plans Matthew\'s ideal network is drawn from.'}
            </p>
          )}
        </div>
        <Index era={era} lines={lines} running={running} hiddenGroups={hiddenGroups} onToggleGroup={toggleGroup} openId={openId}
          statusStyle={STATUS_STYLE} proposals={proposals} network={network} proposalStyle={PROPOSAL_STYLE} onOpen={(id, opener) => void openLine(id, { opener })} onExpand={() => setInteracted(true)} />
      </header>
      <MapView inputs={inputs} shown={shown} statusLabel={(s) => STATUSES[s as Status]?.label ?? s} onReady={onReady}
        onFirstInteraction={() => setInteracted(true)} onHoverLine={onHoverLine}
        onSelectLine={(id) => { if (!editing) void openLine(id); }} />
      <span id="controls-start" tabIndex={-1} />
      <Controls map={map} mode={mode} onModeChange={setMode} onHome={goHome} />
      <Credits collapse={interacted || !!line || (editing && era === 'future')} has511={lines.some((l) => l.sources.some((s) => s.source === 'gtfs-511'))} />
      {line && !(editing && era === 'future') && <LinePanel line={line} onClose={() => void closeLine()} />}
      {editing && era === 'future' && map && Editor && (
        <Editor map={map} theme={theme} proposals={proposalChoices} onClose={() => setEditing(false)} />
      )}
      {STYLE_PANEL_ENABLED && !panelOpen && (
        <button ref={styleToggle} type="button" class="style-toggle" onClick={() => setPanelOpen(true)}
          title="Open the style panel (Alt+Shift+S)">
          Style
        </button>
      )}
      {panelOpen && <StylePanel theme={theme} onChange={setTheme} onClose={closePanel} />}
    </div>
  );
}
