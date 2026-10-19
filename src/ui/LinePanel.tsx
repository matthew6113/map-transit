import { useEffect, useRef } from 'preact/hooks';
import type { LineRecord, ResolvedSource } from '../data/catalog';
import { CONFIDENCE, FLAGS, PROPOSAL_STATUSES, STATUSES } from '../data/vocab';
import { formatDate, formatLength, formatRunning, formatYears, modeVar, trackFrom } from './format';

interface Props {
  line: LineRecord;
  onClose: () => void;
}

const FATES: Record<string, string> = {
  abandoned: 'Abandoned',
  converted_to_bus: 'Converted to bus',
  absorbed_into_bart: 'Absorbed into BART',
  absorbed_into_muni: 'Absorbed into Muni',
  rail_trail: 'Now a trail',
  paved_over: 'Paved over',
  still_freight: 'Still carries freight',
  heritage_railway: 'Now a heritage railway',
  replaced_by_rail: 'Replaced by another rail line',
};

const PHOTO_LICENSE: Record<string, string> = {
  'public-domain': 'Public domain',
  'PD-US-expired': 'Public domain (its US copyright has expired)',
  CC0: 'CC0, no rights reserved',
};

const CONFIDENCE_LABEL: Record<string, string> = {
  surveyed: 'Surveyed',
  digitized: 'Traced from a map',
  approximate: 'Approximate',
  designed: 'Designed',
};

/** The line's panel: what it is, when it ran, what happened to it, how it's drawn, and its sources. */
export function LinePanel({ line, onClose }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [line.id]);

  const proposal = line.proposal;
  const mine = line.status === 'ideal';
  // Not built (a future line, a proposal or a line of Matthew's network): no years of service.
  const future = line.era === 'future' || line.era === 'ideal';
  const running = line.status === 'closed' && line.running?.length ? line.running : null;
  const years = running ? formatRunning(line.opened, line.closed, running)
    : formatYears(line.opened, line.closed, line.status, trackFrom(line.segments));
  const gauge = line.gauge_label ?? (line.gauge_mm ? `${line.gauge_mm} mm` : undefined);
  const traction = line.traction?.map((t) => `${t.type.replace(/_/g, ' ')}${t.from ? ` from ${formatDate(t.from)}` : ''}${t.to ? ` to ${formatDate(t.to)}` : ''}`).join('; ');
  const borrowed = line.segments.some((s) => s.borrowed);

  return (
    <aside class="line-panel" aria-labelledby="line-title">
      <header>
        <div>
          <h2 id="line-title" ref={heading} tabIndex={-1}>{line.name}</h2>
          <p class="meta">
            <span class="mode-chip"><i style={{ background: modeVar(line.group) }} />{line.mode_label}</span>
            <span>{proposal ? proposal.proposed_by : mine ? line.author : line.system_name}</span>
            <span>{proposal ? proposal.status_label : future ? STATUSES[line.status].label : years}</span>
          </p>
        </div>
        <button type="button" class="close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
        </button>
      </header>

      {proposal && (
        <p class="status-note">
          <strong>A proposal</strong>, drawn as {proposal.document.url ? <a href={proposal.document.url}>{proposal.document.title}</a> : proposal.document.title}
          {' '}({proposal.year.slice(0, 4)}) describes it; nothing here is being built. {proposal.status_label} as of{' '}
          {formatDate(proposal.status_as_of)}: {PROPOSAL_STATUSES[proposal.status].meaning}
        </p>
      )}

      {mine && (
        <p class="status-note">
          <strong>Matthew's network</strong>: his design, not a project being built or a proposal.
          {line.based_on?.length
            ? <> Based on {line.based_on.map((b, i) => <span key={b.id}>{i ? '; ' : ''}{b.name}</span>)}.</>
            : ' Drawn on its own, from no proposal.'}
        </p>
      )}

      {future && !proposal && !mine && (
        <p class="status-note">
          <strong>{STATUSES[line.status].label}</strong>
          {line.status_as_of && <> as of {formatDate(line.status_as_of)}</>}. {STATUSES[line.status].meaning}
          {' '}Expected opening: {line.expected_opening ?? 'not yet recorded'}.
        </p>
      )}

      {line.summary && <p class="summary">{line.summary}</p>}

      {line.photo && (
        <figure class="photo">
          {/* Served from this site (make photos), never hotlinked. */}
          <img src={`${import.meta.env.BASE_URL}${line.photo.file}`} width={line.photo.width} height={line.photo.height}
            alt={line.photo.caption} loading="lazy" decoding="async" />
          <figcaption>
            {line.photo.caption}{' '}
            <span class="credit">
              {line.photo.author}{line.photo.date ? `, ${line.photo.date}` : ''}. {PHOTO_LICENSE[line.photo.license]}.{' '}
              <a href={line.photo.source_url}>Source</a>
            </span>
          </figcaption>
        </figure>
      )}

      <section>
        <dl class="facts">
          {line.operators.length > 0 && (
            <div><dt>Operator</dt><dd>{line.operators.map((o) => o.name).join(', ')}</dd></div>
          )}
          <div><dt>Mode</dt><dd>{line.mode_label}</dd></div>
          {!future && <div><dt>Years</dt><dd>{years}</dd></div>}
          {gauge && <div><dt>Gauge</dt><dd>{gauge}</dd></div>}
          {traction && <div><dt>Power</dt><dd>{traction}</dd></div>}
          <div><dt>Length as drawn</dt><dd>{formatLength(line.length_km)}</dd></div>
        </dl>
        {running && (
          <p class="small">
            {!line.opened && !line.closed
              ? 'Its opening and closing aren\'t sourced, so the map shows it only for the years a source shows it running'
              : !line.opened
                ? 'Its opening isn\'t sourced, so the map shows it from the first date a source shows it running'
                : 'Its closing isn\'t sourced, so the map shows it until the last date a source shows it running'}, in a
            lighter tint:{' '}
            {running.map((r, i) => {
              const s = line.sources.find((x) => x.source === r.source);
              const who = s ? (s.author ?? s.publisher ?? s.title).split(',')[0] : r.source;
              return <span key={r.date}>{i ? '; ' : ''}{formatDate(r.date)} ({who}{r.pages ? `, p. ${r.pages}` : ''})</span>;
            })}.
          </p>
        )}
        {line.continues_beyond && <p class="small">Continues beyond the map to {line.continues_beyond}.</p>}
      </section>

      {(line.fate || line.fate_note || line.successor) && (
        <section>
          <h3>What happened to it</h3>
          <p>{[line.fate && FATES[line.fate], line.fate_note].filter(Boolean).join('. ')}</p>
          {line.successor && <p class="small">Succeeded by {line.successor}.</p>}
        </section>
      )}

      <section>
        <h3>How it's drawn</h3>
        <ul class="confidence">
          {Object.entries(line.confidence_km).map(([k, km]) => (
            <li key={k}><strong>{CONFIDENCE_LABEL[k]}</strong> ({formatLength(km!)}): {CONFIDENCE[k as keyof typeof CONFIDENCE]}</li>
          ))}
        </ul>
        {borrowed && <p class="small">Some segments have no sourced dates of their own; the map shows them with this line's dates.</p>}
        <details>
          <summary>Segments ({line.segments.length})</summary>
          <ol class="segments">
            {/* A segment can appear twice, once per period this line used it, so its id alone isn't a key. */}
            {line.segments.map((s, i) => (
              <li key={`${s.id}-${i}`}>
                <span class="seg-name">{s.name}</span>
                <span class="small">
                  {CONFIDENCE_LABEL[s.confidence]}
                  {s.structure ? ` · ${s.structure}` : ''}
                  {!future && ` · ${s.opened ? formatDate(s.opened) : 'opening not sourced'} to ${s.closed ? formatDate(s.closed) : line.status === 'active' ? 'today' : 'closing not sourced'}`}
                </span>
                {(s.from || s.to) && (
                  <span class="small">This line used it {s.from ? `from ${formatDate(s.from)}` : ''}{s.from && s.to ? ' ' : ''}{s.to ? `to ${formatDate(s.to)}` : ''}{s.note ? `: ${s.note}` : ''}.</span>
                )}
                {!s.from && !s.to && s.running && (
                  <span class="small">Shown in this line's route on {s.running.map(formatDate).join(' and ')} only{s.note ? `: ${s.note}` : ''}.</span>
                )}
                {!s.from && !s.to && !s.running && s.note && <span class="small">{s.note}</span>}
                <span class="small method">{s.method}</span>
                {s.notes && <span class="small">{s.notes}</span>}
                {s.flags.length > 0 && <span class="small flags-inline">Still to check: {s.flags.map((f) => FLAGS[f] ?? f).join(' ')}</span>}
              </li>
            ))}
          </ol>
        </details>
      </section>

      {line.flags.length > 0 && (
        <section>
          <h3>Still to check</h3>
          <ul class="flags">{line.flags.map((f) => <li key={f}>{FLAGS[f] ?? f}</li>)}</ul>
        </section>
      )}

      {line.notes && (
        <section>
          <h3>Notes</h3>
          <p class="small">{line.notes}</p>
        </section>
      )}

      {line.links && line.links.length > 0 && (
        <section>
          <h3>Links</h3>
          <ul class="links">{line.links.map((l) => <li key={l.url}><a href={l.url}>{l.label}</a></li>)}</ul>
        </section>
      )}

      <section>
        <h3>Sources</h3>
        <ol class="sources">{line.sources.map((s) => <SourceItem key={s.source} s={s} />)}</ol>
        {line.last_verified && <p class="small">Last verified {formatDate(line.last_verified)}.</p>}
      </section>
    </aside>
  );
}

function SourceItem({ s }: { s: ResolvedSource }) {
  const detail = [s.author, s.publisher, s.date, s.pages && `pp. ${s.pages}`].filter(Boolean).join(', ');
  return (
    <li>
      {s.url ? <a href={s.url}>{s.title}</a> : s.title}
      {detail && <>, {detail}</>}
      <span class="small"> · supports {s.supports.join(', ')}{s.note ? `. ${s.note}` : ''}</span>
    </li>
  );
}
