import type { Era } from '../data/vocab';

const ERAS: { era: Era; label: string; hint: string }[] = [
  { era: 'past', label: 'Past', hint: 'Every line that ever ran, year by year' },
  { era: 'present', label: 'Present', hint: 'The network running today' },
  { era: 'future', label: 'Future', hint: 'Lines funded or being built, and an ideal network' },
];

interface Props {
  era: Era;
  onChange: (era: Era) => void;
}

/** Three eras as one segmented control (a radio group: arrow keys move between them). */
export function EraSwitcher({ era, onChange }: Props) {
  const move = (e: KeyboardEvent) => {
    const i = ERAS.findIndex((x) => x.era === era);
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = ERAS[(i + step + ERAS.length) % ERAS.length];
    onChange(next.era);
    requestAnimationFrame(() => (document.querySelector(`[data-era="${next.era}"]`) as HTMLElement | null)?.focus());
  };
  return (
    <div class="era-switcher" role="radiogroup" aria-label="Era" onKeyDown={move}>
      {ERAS.map((x) => (
        <button key={x.era} type="button" role="radio" data-era={x.era} aria-checked={era === x.era}
          tabIndex={era === x.era ? 0 : -1} title={x.hint} onClick={() => onChange(x.era)}>
          {x.label}
        </button>
      ))}
    </div>
  );
}
