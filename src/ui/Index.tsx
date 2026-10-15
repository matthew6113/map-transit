import { useMemo, useState } from 'preact/hooks';
import type { LineRecord } from '../data/catalog';
import { GROUPS, STATUSES, type Era } from '../data/vocab';
import { DATASETS } from '../eras/layers';
import { MODE_GROUPS, type ModeGroup } from '../theme/theme';
import { formatYears, modeVar, trackFrom } from './format';

interface Props {
  era: Era;
  lines: LineRecord[];
  /** Past era: the lines on the map in the slider's year, and that year (decision 14). */
  running?: { year: number; ids: Set<string> };
  hiddenGroups: ModeGroup[];
  onToggleGroup: (group: ModeGroup) => void;
  openId: string | null;
  onOpen: (id: string, opener: HTMLElement) => void;
  onExpand?: () => void;
}

/**
 * Legend, mode filters and the list of lines, in one panel under the title (BAM's index pattern).
 * The legend is the filter: each mode chip turns its lines on and off on the map and in the list.
 * The list is the screen-reader equivalent of the canvas.
 */
export function Index({ era, lines, running, hiddenGroups, onToggleGroup, openId, onOpen, onExpand }: Props) {
  const [open, setOpen] = useState(() => typeof matchMedia === 'function' && !matchMedia('(max-width: 719px)').matches);
  const [query, setQuery] = useState('');
  const inEra = useMemo(() => lines.filter((l) => DATASETS[era].includes(l.era)), [lines, era]);
  const counts = useMemo(() => {
    const c = new Map<ModeGroup, number>();
    for (const l of inEra) c.set(l.group, (c.get(l.group) ?? 0) + 1);
    return c;
  }, [inEra]);
  const q = query.trim().toLowerCase();
  const shown = inEra
    .filter((l) => !hiddenGroups.includes(l.group))
    .filter((l) => !q || `${l.name} ${l.system_name} ${l.mode_label}`.toLowerCase().includes(q))
    .sort((a, b) => MODE_GROUPS.indexOf(a.group) - MODE_GROUPS.indexOf(b.group) || a.name.localeCompare(b.name));
  // In the past era the list follows the slider: the lines running that year first, the rest dimmed
  // below them (decision 14). Search still finds every line.
  const groups = running
    ? [
        { key: 'running', head: `Running in ${running.year}`, items: shown.filter((l) => running.ids.has(l.id)) },
        { key: 'other', head: `Not running in ${running.year}`, items: shown.filter((l) => !running.ids.has(l.id)) },
      ].filter((g) => g.items.length)
    : [{ key: 'all', head: '', items: shown }];

  return (
    <section class="index" aria-label="Lines and legend">
      <button type="button" class="index-toggle" aria-expanded={open} aria-controls="index-body"
        onClick={() => {
          setOpen(!open);
          onExpand?.();
        }}>
        Lines <span class="count">{inEra.length}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d={open ? 'M3 7.5 6 4.5l3 3' : 'M3 4.5 6 7.5l3-3'} /></svg>
      </button>
      {open && (
        <div id="index-body">
          <fieldset class="modes">
            <legend>Modes</legend>
            {MODE_GROUPS.map((g) => (
              <button key={g} type="button" class="mode-toggle" aria-pressed={!hiddenGroups.includes(g)}
                onClick={() => onToggleGroup(g)}>
                <i class={`swatch w-${g}`} style={{ background: modeVar(g) }} />
                {GROUPS[g].label}
                <span class="n">{counts.get(g) ?? 0}</span>
              </button>
            ))}
          </fieldset>
          <Legend era={era} />
          <label class="search">
            <span class="visually-hidden">Find a line</span>
            <input type="search" placeholder="Find a line" value={query}
              onInput={(e) => setQuery((e.currentTarget as HTMLInputElement).value)} />
          </label>
          {groups.map((g) => (
            <div key={g.key} class={`line-group ${g.key}`}>
              {g.head && <h3 class="line-group-head">{g.head} <span class="n">{g.items.length}</span></h3>}
              <ul class="line-list">
                {g.items.map((l) => (
                  <li key={l.id}>
                    <button type="button" aria-current={l.id === openId ? 'true' : undefined}
                      onClick={(e) => onOpen(l.id, e.currentTarget)}>
                      <span class="name"><i style={{ background: modeVar(l.group) }} />{l.name}</span>
                      <span class="where">
                        {l.system_name} · {l.mode_label}
                        {' · '}
                        {l.era === 'future' ? STATUSES[l.status].label : formatYears(l.opened, l.closed, l.status, trackFrom(l.segments))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {shown.length === 0 && <p class="empty">{inEra.length ? 'No lines match.' : emptyNote(era)}</p>}
        </div>
      )}
    </section>
  );
}

function emptyNote(era: Era): string {
  return era === 'past' ? 'Past lines arrive in Phase 2, starting with the Key System and the SP Red Trains.' : 'No lines yet.';
}

/** What the line styles mean. Hue is mode (the chips above); the rest is drawn here. */
function Legend({ era }: { era: Era }) {
  return (
    <ul class="legend" aria-label="How lines are drawn">
      <li><svg viewBox="0 0 28 8" aria-hidden="true"><path class="ink" d="M1 4h26" /></svg>Surveyed or traced from a map</li>
      <li><svg viewBox="0 0 28 8" aria-hidden="true"><path class="ink dash" d="M1 4h26" /></svg>Approximate: rebuilt from descriptions</li>
      <li><svg viewBox="0 0 28 8" aria-hidden="true"><path class="ink tube" d="M1 4h26" /><path class="paper" d="M1 4h26" /></svg>Tunnel or subway</li>
      {era === 'past' && (
        <li><svg viewBox="0 0 28 8" aria-hidden="true"><path class="ink tint" d="M1 4h26" /></svg>Segment dates not sourced: shown with its line's dates</li>
      )}
      {era === 'future' && (
        <li><svg viewBox="0 0 28 8" aria-hidden="true"><path class="ink faint" d="M1 4h13" /><path class="ink" d="M15 4h12" /></svg>Fainter is less certain: planned, in review, funded, building</li>
      )}
    </ul>
  );
}
