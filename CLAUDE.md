# Bay Area transit: past, present, future

An interactive, pannable web map of Bay Area transportation in three eras, built as a public portfolio
piece for Matthew Huguet ("Matty"):

- **Past:** everything that ever ran, on a year slider from 1850 with a play button.
- **Present:** everything running now, drawn from GTFS.
- **Future:** what's being built, plus an ideal network that Matthew designs.

It is a sibling of the Bay Area megaprojects map ([matthew6113/BAM](https://github.com/matthew6113/BAM)).
The two share a stack, a basemap and color tokens so they can merge later.

## Read before writing code

- `docs/SPEC.md`: the eras, the interaction, and the build phases with their checkpoints.
- `docs/SCHEMA.md`: the data model (segments and lines), the provenance fields and the date rules.
- `docs/DECISIONS.md`: choices made so far, including Matthew's four planning decisions.
- `docs/VENDORED.md`: what came from BAM, and what changed.
- `DATA_LOG.md`: every dataset, with its origin, license and gaps.

## The look in one line

Lines are the star; the basemap stays quiet. BAM's existing city is drawn as quiet print (in the
spirit of NYT's "A Map of Every Building in America"), with optional 3D tilt (Melbourne's Development
Activity Model). Hue means mode in every era. In the future era, today's network steps back, after
BAM's "the present as print, the future in color".

## Ground rules

### Accuracy

- **Never invent geometry, a date or a fact.** If you can't source it, leave it null, flag it, and
  say so.
- Every line, segment and point carries:
  - `sources[]`, citing ids in `data/sources.json`;
  - `geometry_confidence`: `surveyed` (OSM, OHM, GTFS or official GIS), `digitized` (traced from a
    georeferenced map) or `approximate` (rebuilt from text, drawn dashed);
  - `geometry_method`, saying how the geometry was made.
- A null date carries its `*_unsourced` flag, and the data never fills it in (decision 4 covers
  display only).
- **Future facts come from official sources only, as in BAM.** That means public agencies, adopted
  plans, hearing records and GIS. Re-verify statuses with web searches at build time; never rely on
  memory, because statuses change. `npm test` fails when a future status is more than 90 days old.
- **Past facts can come from any citable source**, recorded by `type` in `sources.json`: primary
  maps and documents, books, journals, railfan histories. Wikipedia only points to sources.
- **The ideal network is Matthew's.** Don't generate it. Present proposals with their tradeoffs, and
  draw only what he picks.
- Tell Matthew when a source needs manual work from him: a page citation from a book, a map to
  georeference by hand, or a license question.

### Data and licensing

- Record every dataset in `DATA_LOG.md` in the same commit as the data change.
- Credit the sources in the map (`src/ui/Credits.tsx`) and in each line's panel.
- Photos must be public domain (PD, PD-US-expired or CC0), downloaded at build time and never
  hotlinked.
- Keep raw downloads in `data/raw/`, which is git-ignored. Ask before any single download over about
  2 GB.
- The pipeline is reproducible: `make data` regenerates every generated file.
- Never commit API keys. The 511 key lives in `.env` as `TRANSIT_511_API_KEY`.

### Design

- All colors live in `src/theme/theme.json`. Its `colors`, `opacity`, `type` and `map` blocks are
  BAM's and must stay identical; a test checks this. Matthew supplies the final palette. Re-run the
  palette validator when it changes (`docs/DECISIONS.md`).
- Sentence case everywhere. Labels stay sparse: station names show only for the open line, close in.
- Respect `prefers-reduced-motion`. Keyboard accessible. Works on mobile Safari.
- When unsure about a design choice that affects the look, show options rather than picking silently.

### Merging with BAM later

- Keep BAM's names and layer ids in vendored files.
- Prefix everything new with `transit-`.
- Log every change to a vendored file in `docs/VENDORED.md`.

### Workflow

- Build in phases (`docs/SPEC.md`). **Stop for Matthew's review after every phase.**
- Before each checkpoint, take Playwright screenshots of key views into `docs/screenshots/p<n>/`, then
  summarize what changed and what's still open.
- Commit in small, described steps. Work on the branch you were given.

## Commands

| Command | What it does |
|---|---|
| `npm install`, then `make basemap` | Install, then copy BAM's built basemap into `public/generated/`, checked against `basemap.lock.json` (279 MB). Without it, the dev server proxies BAM's site. |
| `make data` | `future-sync` (BAM's future lines), `present` (GTFS from 511, Amtrak and BART, plus BRT lanes from OpenStreetMap; 511 needs `TRANSIT_511_API_KEY`, and BRT needs `overpass-api.de` reachable), `past` (past geometry rebuilt from `data/past/*/trace.json`, using OpenHistoricalMap's ways, USGS sheets and today's street centerlines; `make past-review` draws each traced feature over its map), then `app-data` (the app files in `data/app/`). The steps run individually too. |
| `npm run dev` | Dev server on http://127.0.0.1:5173. |
| `npm test` | Schemas, data rules, future-status freshness and theme contrast. Validation lives only here. |
| `npm run e2e` | Playwright: eras, hover and select, keyboard, reduced motion, mobile, deep links. |
| `npm run screenshots` | Key views into `docs/screenshots/p0/`; set `SHOTS_DIR=docs/screenshots/p<n>` for a later checkpoint. |
| `npm run perf` | The year-slider rendering spike (10k synthetic features, 4x CPU slowdown). |
| `npx tsc --noEmit`, `npm run build` | Type-check; production build. |
| Deploy | Push to `main`. `.github/workflows/deploy.yml` restores the basemap snapshot, tests, builds and publishes to GitHub Pages. Pull requests build and test only. |

URL options: `?era=past|present|future`, `?year=1925`, `?ghost=1`, `?view=3d`, `#map=zoom/lat/lng/bearing/pitch`,
`/l/{line-id}`. For review only, `?test=1&at=<seconds>` holds a line's flight still.
