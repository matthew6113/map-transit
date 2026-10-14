import { useEffect, useRef } from 'preact/hooks';
import { prefersReducedMotion } from '../basemap/flight';

export const FIRST_YEAR = 1850;
export const LAST_YEAR = new Date().getFullYear();
/** A full sweep at 1x takes about 20 s. */
const SWEEP_MS = 20_000;
export const SPEEDS = [0.5, 1, 2] as const;

export function stepMs(speed: number) {
  return SWEEP_MS / (LAST_YEAR - FIRST_YEAR) / speed;
}

interface Props {
  year: number;
  playing: boolean;
  speed: number;
  onYear: (year: number, opts?: { animateFrom?: number }) => void;
  onPlaying: (playing: boolean) => void;
  onSpeed: (speed: number) => void;
  /** Lines without sourced dates aren't on the slider (decision 4). */
  /** Segments with no sourced dates, and the lines that use them (SPEC: listed under the slider). */
  undated: { id: string; name: string; system: string; lines: string[] }[];
}

/**
 * The past era's year: a native range input (keyboard and screen-reader friendly), a play button that
 * sweeps from the chosen year to today, and a speed control. With reduced motion, play steps a decade
 * at a time without fades.
 */
/** The undated segments by system, the largest group first. */
function bySystem<T extends { system: string }>(items: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const u of items) groups.set(u.system, [...(groups.get(u.system) ?? []), u]);
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export function YearSlider({ year, playing, speed, onYear, onPlaying, onSpeed, undated }: Props) {
  const live = useRef({ year, onYear });
  live.current = { year, onYear };

  useEffect(() => {
    if (!playing) return;
    const reduced = prefersReducedMotion();
    const step = reduced ? 10 : 1;
    const ms = reduced ? 700 : stepMs(speed);
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (now - last >= ms) {
        last = now;
        const from = live.current.year;
        const next = Math.min(LAST_YEAR, from + step);
        live.current.onYear(next, { animateFrom: reduced ? undefined : from });
        if (next >= LAST_YEAR) {
          onPlaying(false);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, onPlaying]);

  const decades = [];
  for (let y = Math.ceil(FIRST_YEAR / 25) * 25; y <= LAST_YEAR; y += 25) decades.push(y);

  return (
    <div class="year-slider">
      <div class="year-row">
        <button type="button" class="play" aria-pressed={playing}
          aria-label={playing ? 'Pause' : year >= LAST_YEAR ? 'Play from 1850' : 'Play'}
          onClick={() => {
            if (!playing && year >= LAST_YEAR) onYear(FIRST_YEAR);
            onPlaying(!playing);
          }}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {playing ? <path d="M5 3.5v9M11 3.5v9" /> : <path class="fill" d="M5 3l8 5-8 5z" />}
          </svg>
        </button>
        <output class="year" for="year-input" aria-live="off">{year}</output>
        <label class="speed">
          <span class="visually-hidden">Playback speed</span>
          <select value={String(speed)} onChange={(e) => onSpeed(Number((e.currentTarget as HTMLSelectElement).value))}>
            {SPEEDS.map((s) => <option key={s} value={String(s)}>{s}×</option>)}
          </select>
        </label>
      </div>
      <input id="year-input" type="range" min={FIRST_YEAR} max={LAST_YEAR} step={1} value={year}
        aria-label="Year" aria-valuetext={String(year)}
        onInput={(e) => {
          onPlaying(false);
          onYear(Number((e.currentTarget as HTMLInputElement).value));
        }} />
      <div class="ticks" aria-hidden="true">
        {decades.map((d) => (
          <span key={d} style={{ left: `${((d - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR)) * 100}%` }}>{d}</span>
        ))}
      </div>
      {undated.length > 0 && (
        <details class="undated small">
          <summary>{undated.length} {undated.length === 1 ? 'segment has' : 'segments have'} no sourced dates yet and {undated.length === 1 ? 'is' : 'are'} left off the slider.</summary>
          <div class="groups">
            {bySystem(undated).map(([system, items]) => (
              <section key={system}>
                <h3>{system} <span class="muted">{items.length}</span></h3>
                <ul>{items.map((u) => <li key={u.id}>{u.name} <span class="muted">({u.lines.join(', ')})</span></li>)}</ul>
              </section>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
