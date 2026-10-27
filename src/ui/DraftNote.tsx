// The map is a draft while its sources are double-checked. This note under the title says so, and
// shrinks to one line once the viewer starts using the map, as the credits do, so the warning stays.
import { useEffect, useState } from 'preact/hooks';

interface Props {
  /** Shrink to one line once the viewer starts using the map or opens a line. */
  collapse: boolean;
}

export function DraftNote({ collapse }: Props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (collapse) setOpen(false);
  }, [collapse]);

  return (
    <div class={`transit-draft-note ${open ? 'open' : ''}`}>
      <p id="draft-note-body" class="transit-draft-note-body" hidden={!open}>
        This map shows Bay Area transit in three eras: every line that has run since 1850, the network running
        today, and what is planned or being built. Each line cites the sources it was drawn from, and where no
        source gives a date or a route, the map leaves it blank rather than guess. The map is still a draft. Its
        sources are being double-checked, so dates, routes, project statuses and other details may be incomplete or
        wrong. Please don't rely on it for travel, research, legal or any other decisions; check the cited sources
        instead. This is a personal project, not affiliated with or endorsed by any transit agency.
      </p>
      <button type="button" class="transit-draft-note-toggle" aria-expanded={open} aria-controls="draft-note-body"
        onClick={() => setOpen(!open)}>
        {open ? 'Hide this note' : 'Draft: not to be relied upon · About this map'}
      </button>
    </div>
  );
}
