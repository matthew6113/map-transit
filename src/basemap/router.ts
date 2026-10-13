/**
 * Deep links, after BAM's router (src/router.ts at 9600699): /l/{line-id} under the site's base path,
 * plus the era and year in the query (?era=past&year=1925). Query and hash are kept, so the camera
 * (#map=) survives navigation.
 */
const BASE = import.meta.env.BASE_URL;

const rest = (path: string) => (path.startsWith(BASE) ? path.slice(BASE.length) : path.replace(/^\//, ''));

export const LINE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function lineIdFromPath(path: string = location.pathname): string | null {
  const m = /^l\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(rest(path));
  return m ? m[1] : null;
}

export function pathForLine(id: string | null): string {
  return id ? `${BASE}l/${id}` : BASE;
}

/** Open (or, with null, close) a line's page. */
export function navigate(id: string | null, replace = false) {
  const url = pathForLine(id) + location.search + location.hash;
  if (url === location.pathname + location.search + location.hash) return;
  if (replace) history.replaceState({ line: id }, '', url);
  else history.pushState({ line: id }, '', url);
}

/** Keep query parameters in step with the view, without adding history entries. */
export function setQuery(values: Record<string, string | null>) {
  const params = new URLSearchParams(location.search);
  for (const [k, v] of Object.entries(values)) {
    if (v === null) params.delete(k);
    else params.set(k, v);
  }
  const q = params.toString();
  const url = location.pathname + (q ? `?${q}` : '') + location.hash;
  if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url);
}
