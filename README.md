# Bay Area transit: past, present, future

An interactive map of Bay Area transportation in three eras:

- **Past:** everything that ever ran, on a year slider from 1850.
- **Present:** everything running now.
- **Future:** what's being built, and an ideal network.

It's a sibling of the [Bay Area megaprojects](https://github.com/matthew6113/BAM) map and draws on its
quiet basemap, in the spirit of the NYT's "A Map of Every Building in America". Lines are the star.

**Status: Phase 0 (scaffold).** The map shell is up, with BAM's six future rail lines and today's BART
lines (a preview from BART's public GTFS feed). Past lines start in Phase 2. See `docs/SPEC.md` for the
phases, `docs/DECISIONS.md` for the choices made so far, and `DATA_LOG.md` for every dataset.

## Quick start

Requirements: Node 22+ and [uv](https://docs.astral.sh/uv/).

```sh
npm install
make basemap     # optional: copy BAM's built basemap locally (277 MB); without it, dev proxies BAM's site
npm run dev      # http://127.0.0.1:5173
```

| Command | What it does |
|---|---|
| `make basemap` | Copy BAM's basemap into `public/generated/`, checked against `basemap.lock.json`. |
| `make basemap-refresh` | Re-read BAM's deployed basemap and rewrite the lock (review the diff). |
| `make future-sync` | Import BAM's future lines at the pinned commit (`data/future/bam/`). |
| `make present` | Today's network from GTFS: 511's regional feed (needs `TRANSIT_511_API_KEY`), Amtrak, and BART's own feed as a fallback, plus the SFO AirTrain from Overture (`data/present/<agency>/`). |
| `make app-data` | Build the files the app reads (`data/app/`), and the coverage table in `DATA_LOG.md`. |
| `npm test` | Schemas, data rules (sources, null-date flags, routes, bounds, future-status freshness) and theme contrast. |
| `npm run e2e` / `npm run screenshots` / `npm run perf` | Playwright: interaction tests, review screenshots, and the year-slider rendering spike. |
| `npm run build` | Type-check and production build into `dist/`. |

## How the data works

The data has two levels: **segments** are physical rights-of-way with their own dates, and **lines**
are services that ran over them. Every record carries its sources and how its geometry was made:
surveyed, traced from a georeferenced map, or approximate, which is drawn dashed. Unsourced dates
stay empty and flagged. See `docs/SCHEMA.md`.

## Deploying

`.github/workflows/deploy.yml` restores the pinned basemap snapshot, runs the tests, builds the site
and publishes it to GitHub Pages from `main`. Pull requests build and test only.

One-time setup, in the repository's Settings, then Pages: set Source to **GitHub Actions**.

## Licenses

- Base map data © OpenStreetMap contributors and Overture Maps Foundation (ODbL 1.0), from BAM's
  build.
- Transit data comes from the agencies and projects credited in `DATA_LOG.md` and in each line's
  panel.
- Fonts are under the SIL Open Font License.
