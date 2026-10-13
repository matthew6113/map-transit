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
  const r = (x: number) => (x >= 10 ? Math.round(x).toString() : x.toFixed(1));
  return `${r(mi)} mi (${r(km)} km)`;
}

/** "1903 to 1958", "Since 1972", "Opened date not sourced" ... */
export function formatYears(opened: string | null, closed: string | null, status: string): string {
  if (status !== 'closed' && status !== 'active') return '';
  if (status === 'active') return opened ? `Since ${formatDate(opened)}` : 'Opening date not yet sourced';
  return `${opened ? formatDate(opened) : 'opening not sourced'} to ${closed ? formatDate(closed) : 'closing not sourced'}`;
}

export const modeVar = (group: string) => `var(--mode-${group.replace(/_/g, '-')})`;
