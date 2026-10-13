/// <reference types="vitest/config" />
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { linePages } from './scripts/linePages.ts';
import { siteMeta } from './scripts/siteMeta.ts';

/**
 * The basemap (tiles, glyphs, fonts, labels) is BAM's build, served from this site's own
 * /generated/ (docs/DECISIONS.md, decision 1). The deploy restores the pinned snapshot into
 * public/generated/ (`make basemap`). Without a local snapshot, the dev server proxies /generated
 * to BAM's deployed site, which keeps it same-origin as it is in production.
 */
const BAM_SITE = 'https://matthew6113.github.io/BAM';
const hasSnapshot = existsSync(resolve(import.meta.dirname, 'public/generated/tiles/base.pmtiles'));
const proxy = hasSnapshot
  ? undefined
  : { '/generated': { target: BAM_SITE, changeOrigin: true, secure: true } };

export default defineConfig({
  // The deploy workflow sets BASE_PATH (and SITE_URL) to wherever GitHub Pages serves the site.
  base: process.env.BASE_PATH ?? '/',
  plugins: [preact(), siteMeta(import.meta.dirname), linePages(import.meta.dirname)],
  server: { port: 5173, strictPort: true, proxy },
  preview: { port: 4173, strictPort: true, proxy },
  build: {
    target: 'es2022',
    sourcemap: true,
    // MapLibre alone is about 1 MB minified, so the default 500 kB warning always fires.
    chunkSizeWarningLimit: 1400,
    rolldownOptions: {
      output: {
        // MapLibre in a file of its own, so its name only changes when MapLibre does.
        codeSplitting: { groups: [{ name: 'maplibre', test: /[\\/]node_modules[\\/]maplibre-gl[\\/]/ }] },
      },
    },
  },
  test: { include: ['tests/**/*.test.ts'] },
});
