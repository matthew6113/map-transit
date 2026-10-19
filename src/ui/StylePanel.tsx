/**
 * Vendored from BAM (src/ui/StylePanel.tsx at bbc4fd4): the same fields, contrast check, export,
 * import and reset. BAM's stage colors, site fills, massing and presets are replaced by this map's
 * own tokens (`theme.transit`: modes, widths, eras, future status, proposals) (docs/VENDORED.md).
 * An author's tool behind ?style=1, for Matthew's palette.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import vocab from '../../data/schema/vocabulary.json';
import { contrastIssues, defaultTheme, MODE_GROUPS, modeColor, normalizeTheme, type ColorRole, type ModeGroup, type StatusKey, type Theme } from '../theme/theme';

interface Props {
  theme: Theme;
  onChange: (theme: Theme) => void;
  onClose: () => void;
}

const COLOR_LABELS: Record<ColorRole, string> = {
  land: 'Land (paper)',
  water: 'Water',
  shoreline: 'Shoreline hairline',
  outsideRegion: 'Land outside the nine counties',
  buildings: 'Existing buildings (ink)',
  labels: 'Labels',
  context: 'Context lines',
  contextExtrusion: 'Building heights in 3D',
  selection: 'Selection highlight',
  selectionFill: 'Selected site (ground)',
  panelBackground: 'Panel background',
  panelText: 'Panel text',
  panelRule: 'Panel rules',
  controlBorder: 'Field and filter outlines',
};

const MODE_LABELS = Object.fromEntries(Object.entries(vocab.groups).map(([g, v]) => [g, v.label])) as Record<ModeGroup, string>;

const STATUS_LABELS: Record<StatusKey, string> = {
  planned: 'Planned',
  environmental: 'In environmental review',
  funded: 'Funded',
  under_construction: 'Under construction',
  opening: 'Opening',
};

const FONTS = ['Libre Franklin', 'Megaprojects Serif'];

const LAYER_LABELS: Record<Exclude<keyof Theme['layers'], 'overview'>, string> = {
  buildings: 'Buildings',
  water: 'Water',
  shoreline: 'Shoreline hairline',
  saltPonds: 'Salt ponds drawn as water',
  outsideRegion: 'Tint land outside the nine counties',
  labels: 'Labels',
  contextRoads: 'Freeways and highways',
  contextRail: 'Freight railroads',
  contextFerry: "BAM's ferry routes",
};

function ColorField({ label, value, onInput }: { label: string; value: string; onInput: (v: string) => void }) {
  const [text, setText] = useState(value);
  // Keep the text box in sync when the value changes elsewhere (picker, import, reset).
  useEffect(() => setText(value), [value]);
  return (
    <label class="field color-field">
      <span>{label}</span>
      <input type="color" value={value} onInput={(e) => onInput((e.target as HTMLInputElement).value.toUpperCase())} />
      <input
        type="text"
        value={text}
        spellcheck={false}
        aria-label={`${label} hex`}
        onInput={(e) => {
          const v = (e.target as HTMLInputElement).value.trim();
          setText(v);
          if (/^#[0-9a-f]{6}$/i.test(v)) onInput(v.toUpperCase());
        }}
      />
    </label>
  );
}

function Slider(props: { label: string; min: number; max: number; step: number; value: number; onInput: (v: number) => void }) {
  return (
    <label class="field slider-field">
      <span>{props.label}</span>
      <input type="range" min={props.min} max={props.max} step={props.step} value={props.value}
        onInput={(e) => props.onInput(Number((e.target as HTMLInputElement).value))} />
      <output>{props.value}</output>
    </label>
  );
}

export function StylePanel({ theme, onChange, onClose }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState('');
  useEffect(() => closeButton.current?.focus(), []);
  const set = (fn: (t: Theme) => void) => {
    const next = structuredClone(theme);
    fn(next);
    onChange(next);
  };
  const issues = contrastIssues(theme);
  const widths = theme.transit.widths as unknown as Record<ModeGroup, number>;

  const exportTheme = async () => {
    const json = JSON.stringify(theme, null, 2) + '\n';
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'theme.json';
    a.click();
    URL.revokeObjectURL(a.href);
    try {
      await navigator.clipboard.writeText(json);
      setMessage('Downloaded theme.json and copied it to the clipboard.');
    } catch {
      setMessage('Downloaded theme.json.');
    }
  };

  const importTheme = async (file: File) => {
    try {
      onChange(normalizeTheme(JSON.parse(await file.text())));
      setMessage(`Imported ${file.name}.`);
    } catch (err) {
      setMessage(`Could not read ${file.name}: ${(err as Error).message}`);
    }
  };

  return (
    <aside class="style-panel" aria-label="Style panel">
      <header>
        <h2>Style</h2>
        <button ref={closeButton} type="button" class="close" aria-label="Close style panel" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>
      </header>
      <p class="hint">Changes apply live. Export the result and commit it as <code>src/theme/theme.json</code>.</p>

      <section>
        <h3>Mode colors</h3>
        <p class="hint">Hue means mode in every era. Lines need 3:1 on land and on water (below).</p>
        {MODE_GROUPS.map((g) => (
          <ColorField label={MODE_LABELS[g]} value={modeColor(theme, g)}
            onInput={(v) => set((t) => { t.transit.modes[g] = v; })} />
        ))}
      </section>

      <section>
        <h3>Mode widths</h3>
        <p class="hint">A second channel for mode besides hue, as a multiple of the base width.</p>
        {MODE_GROUPS.map((g) => (
          <Slider label={MODE_LABELS[g]} min={0.3} max={1.5} step={0.05} value={widths[g]}
            onInput={(v) => set((t) => { (t.transit.widths as unknown as Record<ModeGroup, number>)[g] = v; })} />
        ))}
      </section>

      <section>
        <h3>Eras</h3>
        <Slider label="Lost lines underneath" min={0.05} max={0.8} step={0.05} value={theme.transit.eras.ghostOpacity}
          onInput={(v) => set((t) => { t.transit.eras.ghostOpacity = v; })} />
        <Slider label="Today's network in the future" min={0.1} max={1} step={0.05} value={theme.transit.eras.presentInFuture}
          onInput={(v) => set((t) => { t.transit.eras.presentInFuture = v; })} />
        <Slider label="Borrowed dates, toward the paper" min={0} max={0.9} step={0.05} value={theme.transit.eras.borrowedDatesMix}
          onInput={(v) => set((t) => { t.transit.eras.borrowedDatesMix = v; })} />
        <Slider label="Fade out over (years)" min={0} max={5} step={1} value={theme.transit.eras.fadeOutYears}
          onInput={(v) => set((t) => { t.transit.eras.fadeOutYears = v; })} />
      </section>

      <section>
        <h3>Future status</h3>
        <p class="hint">Solidity by status, as <code>?solidity=opacity</code> draws it (the map draws <code>tint</code>).</p>
        {(Object.keys(STATUS_LABELS) as StatusKey[]).map((s) => (
          <Slider label={STATUS_LABELS[s]} min={0.1} max={1} step={0.05} value={theme.transit.status[s]}
            onInput={(v) => set((t) => { t.transit.status[s] = v; })} />
        ))}
      </section>

      <section>
        <h3>Proposals</h3>
        <Slider label="Opacity (translucent)" min={0.2} max={1} step={0.05} value={theme.transit.proposals.opacity}
          onInput={(v) => set((t) => { t.transit.proposals.opacity = v; })} />
        <Slider label="Width" min={0.3} max={1} step={0.05} value={theme.transit.proposals.width}
          onInput={(v) => set((t) => { t.transit.proposals.width = v; })} />
        <Slider label="Toward the paper (tint)" min={0} max={0.9} step={0.05} value={theme.transit.proposals.tintMix}
          onInput={(v) => set((t) => { t.transit.proposals.tintMix = v; })} />
        <ColorField label="One color (neutral)" value={theme.transit.proposals.neutral}
          onInput={(v) => set((t) => { t.transit.proposals.neutral = v; })} />
      </section>

      <section>
        <h3>Base map colors</h3>
        <p class="hint">Shared with BAM: a change here belongs in BAM's theme too.</p>
        {(Object.keys(COLOR_LABELS) as ColorRole[]).map((role) => (
          <ColorField label={COLOR_LABELS[role]} value={theme.colors[role]}
            onInput={(v) => set((t) => { t.colors[role] = v; })} />
        ))}
        <Slider label="Building opacity, street level" min={0.3} max={1} step={0.05} value={theme.opacity.buildings}
          onInput={(v) => set((t) => { t.opacity.buildings = v; })} />
        <Slider label="Building opacity, city (zoom 12.5)" min={0.1} max={1} step={0.05} value={theme.opacity.buildingsCity}
          onInput={(v) => set((t) => { t.opacity.buildingsCity = v; })} />
        <Slider label="Building opacity, regional" min={0.1} max={1} step={0.05} value={theme.opacity.buildingsRegional}
          onInput={(v) => set((t) => { t.opacity.buildingsRegional = v; })} />
        <Slider label="Shoreline weight" min={0.5} max={3} step={0.25} value={theme.map.shorelineWidth}
          onInput={(v) => set((t) => { t.map.shorelineWidth = v; })} />
      </section>

      <section>
        <h3>Type</h3>
        {([['ui', 'Interface'], ['text', 'Summaries and notes'], ['mapLabels', 'Map labels']] as const).map(([key, label]) => (
          <label class="field">
            <span>{label}</span>
            <select value={theme.type[key]} onChange={(e) => set((t) => { t.type[key] = (e.target as HTMLSelectElement).value; })}>
              {FONTS.map((f) => <option value={f}>{f}</option>)}
            </select>
          </label>
        ))}
        <p class="sample" style={{ fontFamily: `'${theme.type.text}'` }}>
          The Key System's trains ran out along the mole to meet the ferries for San Francisco.
        </p>
      </section>

      <section>
        <h3>3D</h3>
        <Slider label="Height exaggeration" min={0.5} max={3} step={0.1} value={theme.map.heightExaggeration}
          onInput={(v) => set((t) => { t.map.heightExaggeration = v; })} />
        <Slider label="Light direction (°)" min={0} max={359} step={1} value={theme.map.light.azimuth}
          onInput={(v) => set((t) => { t.map.light.azimuth = v; })} />
        <Slider label="Light height (°)" min={0} max={90} step={1} value={theme.map.light.polar}
          onInput={(v) => set((t) => { t.map.light.polar = v; })} />
        <Slider label="Light intensity" min={0} max={1} step={0.05} value={theme.map.light.intensity}
          onInput={(v) => set((t) => { t.map.light.intensity = v; })} />
        <Slider label="Context massing opacity" min={0} max={1} step={0.05} value={theme.opacity.contextExtrusion}
          onInput={(v) => set((t) => { t.opacity.contextExtrusion = v; })} />
      </section>

      <section>
        <h3>Layers</h3>
        {(Object.keys(LAYER_LABELS) as (keyof typeof LAYER_LABELS)[]).map((key) => (
          <label class="check">
            <input type="checkbox" checked={theme.layers[key]}
              onChange={(e) => set((t) => { t.layers[key] = (e.target as HTMLInputElement).checked; })} />
            {LAYER_LABELS[key]}
          </label>
        ))}
        <fieldset>
          <legend>Building tiles below zoom 13</legend>
          {([['all', 'Every building (heavier tiles)'], ['light', 'Lighter tiles (dense cores thinned)']] as const).map(([v, label]) => (
            <label class="check">
              <input type="radio" name="overview" checked={theme.layers.overview === v}
                onChange={() => set((t) => { t.layers.overview = v; })} />
              {label}
            </label>
          ))}
        </fieldset>
      </section>

      <section>
        <h3>Contrast check</h3>
        {issues.length === 0 ? (
          <p class="hint">Every check passes.</p>
        ) : (
          <ul class="issues">
            {issues.map((i) => (
              <li>{i.subject} on {i.against}: {i.ratio.toFixed(2)}:1 (needs {i.needed}:1)</li>
            ))}
          </ul>
        )}
      </section>

      <section class="actions">
        <button type="button" onClick={exportTheme}>Export JSON</button>
        <button type="button" onClick={() => fileInput.current?.click()}>Import JSON</button>
        <button type="button" onClick={() => { onChange(structuredClone(defaultTheme)); setMessage('Reset to the theme file.'); }}>Reset</button>
        <input ref={fileInput} type="file" accept="application/json,.json" hidden
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            const f = input.files?.[0];
            if (f) importTheme(f);
            // So picking the same file again (edited on disk) imports it again.
            input.value = '';
          }} />
        <p class="hint" role="status">{message}</p>
      </section>
    </aside>
  );
}
