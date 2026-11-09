/**
 * The base map menu (decision 25): one button in the map controls opens a short list, Plain,
 * Streets or Satellite. A menu rather than three buttons, so the controls column stays short on a
 * phone with a line's sheet open. Radio buttons, so arrow keys move between the options; a pick made
 * with the pointer closes the menu, and Escape or a press outside closes it too.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { BASEMAP_LABELS, BASEMAPS, type Basemap } from '../map/basemaps';

interface Props {
  basemap: Basemap;
  onChange: (basemap: Basemap) => void;
  disabled?: boolean;
}

export function BasemapMenu({ basemap, onChange, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  /** Whether the last pick was made with a pointer (which closes the menu) or the keyboard (which doesn't). */
  const byPointer = useRef(false);

  const close = (focusToggle: boolean) => {
    setOpen(false);
    if (focusToggle) toggle.current?.focus({ preventScroll: true });
  };

  // A layout effect, so Escape works from the moment the menu shows (as the shared-track chooser's).
  // App's own Escape handler stands aside while the menu is open (src/App.tsx).
  useLayoutEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown, true);
    };
  }, [open]);

  // Opened from the keyboard, focus goes to the checked option, so the arrow keys work at once.
  useEffect(() => {
    if (open && !byPointer.current) root.current?.querySelector<HTMLInputElement>('input:checked')?.focus({ preventScroll: true });
  }, [open]);

  const current = BASEMAP_LABELS[basemap].label;
  return (
    <div class="control-group transit-basemap" ref={root}>
      <button ref={toggle} type="button" disabled={disabled} aria-expanded={open} aria-controls="transit-basemap-menu"
        aria-label={`Base map: ${current}`} title={`Base map: ${current}`}
        onPointerDown={() => { byPointer.current = true; }}
        onKeyDown={() => { byPointer.current = false; }}
        onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 2.6 14 5.6 8 8.6 2 5.6z" />
          <path d="M2.6 8.4 8 11.1l5.4-2.7" />
          <path d="M2.6 11.1 8 13.8l5.4-2.7" />
        </svg>
      </button>
      {open && (
        <fieldset id="transit-basemap-menu" class="transit-basemap-menu"
          onPointerDown={() => { byPointer.current = true; }}
          onKeyDown={() => { byPointer.current = false; }}>
          <legend>Base map</legend>
          {BASEMAPS.map((b) => (
            <label key={b} class="transit-basemap-option">
              <input type="radio" name="transit-basemap" value={b} checked={b === basemap}
                onChange={() => {
                  onChange(b);
                  if (byPointer.current) close(true);
                }}
                // Picking the base map already shown changes nothing, but still closes the menu.
                onClick={() => {
                  if (byPointer.current && b === basemap) close(true);
                }} />
              <span>
                <strong>{BASEMAP_LABELS[b].label}</strong>
                <small>{BASEMAP_LABELS[b].note}</small>
              </span>
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}
