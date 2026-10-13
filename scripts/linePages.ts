import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { siteUrl } from './siteMeta.ts';

/**
 * Static hosts have no rewrites, so every line's deep link gets a real page: dist/l/{id}/index.html
 * is the app with that line's title and summary (for link previews), and dist/404.html catches the
 * rest. The app reads the path and opens the line. Adapted from BAM's scripts/projectPages.ts.
 */
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function retitle(html: string, title: string, description: string, path: string): string {
  const t = escape(title);
  const d = escape(description);
  const site = siteUrl();
  // Replacer functions, not strings: text can contain '$', which a replacement string would read as a group.
  let out = html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, a: string, b: string) => a + d + b)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a: string, b: string) => a + t + b)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a: string, b: string) => a + d + b);
  if (site) {
    out = out
      .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a: string, b: string) => `${a}${site}/${path}${b}`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a: string, b: string) => `${a}${site}/${path}${b}`);
  }
  return out;
}

interface CatalogLine {
  id: string;
  name: string;
  mode_label: string;
  status_label: string;
  system_name: string;
  summary?: string;
}

export function linePages(root: string): Plugin {
  return {
    name: 'transit-line-pages',
    apply: 'build',
    // After Vite's own HTML plugin has emitted index.html.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') return;
      const html = String(index.source);
      const site = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
      const catalog = JSON.parse(readFileSync(resolve(root, 'data/app/catalog.json'), 'utf8')) as { lines: CatalogLine[] };
      for (const l of catalog.lines) {
        const description = l.summary ?? `${l.mode_label}, ${l.system_name}. ${l.status_label}.`;
        this.emitFile({ type: 'asset', fileName: `l/${l.id}/index.html`, source: retitle(html, `${l.name} · ${site}`, description, `l/${l.id}/`) });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: html });
    },
  };
}
