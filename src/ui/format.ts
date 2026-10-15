/** Formatting for the panels: dates as the sources give them, lengths in miles and kilometres. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

/** '1903' -> '1903'; '1903-05' -> 'May 1903'; '1903-05-14' -> 'May 14, 1903'; a trailing ~ -> 'c. '. */
export function formatDate(d: string | null | undefined): string {
  if (!d) return '';
  const circa = d.endsWith('~');
  const [y, m, day] = d.replace('~', '').split('-').map(Number);
  const s = day ? `${MONTHS[m - 1]} ${day}, ${y}` : m ? `${MONTHS[m - 1]} ${y}` : String(y);
  return circa ? `c. ${s}` : s;
}

export function formatLength(km: number): string {
  const mi = km / 1.609344;
  if (mi < 0.1) return `${Math.max(1, Math.round(km * 1000))} m`;
  const r = (x: number) => (x >= 10 ? Math.round(x).toString() : x.toFixed(1));
  return `${r(mi)} mi (${r(km)} km)`;
}

/** The earliest sourced opening among a line's segments: when its track first carried passengers. */
export function trackFrom(segments: { opened: string | null }[]): string | null {
  const dated = segments.map((s) => s.opened).filter((d): d is string => !!d).sort();
  return dated[0] ?? null;
}

/** "1903 to 1958", "Since 1972", "Track from 1972" (the service's own start isn't sourced) ... */
export function formatYears(opened: string | null, closed: string | null, status: string, track?: string | null): string {
  if (status !== 'closed' && status !== 'active') return '';
  if (status === 'active') {
    if (opened) return `Since ${formatDate(opened)}`;
    return track ? `Track from ${track.replace('~', '').slice(0, 4)}` : 'Opening date not yet sourced';
  }
  return `${opened ? formatDate(opened) : 'opening not sourced'} to ${closed ? formatDate(closed) : 'closing not sourced'}`;
}

/**
 * A closed line whose opening or closing isn't sourced, drawn for the dates a source shows it
 * running (decision 20): "Running by February 1, 1909; until at least May 1929".
 */
export function formatRunning(opened: string | null, closed: string | null, running: { date: string }[]): string {
  const dates = running.map((r) => r.date).sort();
  const first = opened ? formatDate(opened) : `Running by ${formatDate(dates[0])}`;
  const last = closed ? `to ${formatDate(closed)}` : `until at least ${formatDate(dates[dates.length - 1])}`;
  return `${first}; ${last}`;
}

export const modeVar = (group: string) => `var(--mode-${group.replace(/_/g, '-')})`;
