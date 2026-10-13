# Decisions

Choices made so far, newest last within each section. A decision waiting on Matthew is headed
"(open for Matthew's review)".

## Made by Matthew (2026-10-13, Phase 0 planning)

1. **Share BAM's basemap rather than rebuilding it.**
   - There is no Overture or Tippecanoe pipeline in this repo.
   - BAM's style, theme, flight and router code is vendored with its provenance (`docs/VENDORED.md`).
   - BAM's six verified future lines are imported by `bam_sync.py`, pinned to a BAM commit.
2. **Lines are colored by mode, one stroke per line.**
   - The same mode palette is used in every era, and shared track is one stroke.
   - Hover highlights one service. A click on shared track lists every line there.
   - There are no agency route colors and no parallel offsets.
3. **BRT is limited to center- or median-running corridors:** Van Ness BRT, AC Transit Tempo, and
   VTA's Alum Rock/Santa Clara segment.
   - Only the stretch with dedicated lanes is drawn, clipped from GTFS shapes at the lane limits the
     agency names.
4. **Undated segments borrow their line's sourced dates, for display only.**
   - They are drawn in a lighter tint, and the panel says so.
   - The data keeps `null` and its flag.
   - A shared segment borrows the earliest sourced opening and the latest sourced closing.
   - With nothing sourced, the segment is left off the slider.

## Architecture (2026-10-13)

- **BAM's basemap is served same-origin, from a pinned snapshot (refines decision 1).**
  - BAM's GitHub Pages host answers CORS preflights with 405 and no CORS headers. Only simple GETs
    carry `access-control-allow-origin: *`.
  - So range requests that trigger a preflight, and font loads, could fail in some browsers. Mobile
    Safari is the worry.
  - BAM's CSS also points at root-relative `/generated/` URLs.
  - `make basemap` copies BAM's deployed `/generated/` (110 files, 277 MB) and checks it against
    `basemap.lock.json`. The deploy restores it from a release asset, so a BAM redeploy can't change
    this map underneath it.
  - Development proxies BAM's site, as BAM's own `vite.mock.config.ts` does.
- **The data is two-level, which refines Matthew's flat schema.**
  - Segments are rights-of-way with their own dates; lines reference segments over time.
  - This matches OpenHistoricalMap's model, and it separates the fate of a right-of-way from the fate
    of a service.
  - The app still reads flat files. See `docs/SCHEMA.md`.
- **Geometry-confidence names follow Matthew's brief** (`surveyed`, `digitized`, `approximate`),
  mapped one to one onto BAM's `official`, `traced` and `approximate`.
- **Future statuses use Matthew's vocabulary:** planned, environmental, funded, under_construction,
  opening. BAM's development-project stages are translated per project by `bam_sync.py`, from each
  record's stage note, never mechanically:
  - BART Silicon Valley Phase II: under_construction (early works).
  - The Portal, CAHSR SF–SJ, Valley Link and SMART Cloverdale: environmental (cleared, not funded).
  - SMART Healdsburg: funded.
  - Every one is flagged `status_unverified` until Phase 3 re-checks it.
- **Validation runs in one place:** ajv inside Vitest (`npm test`). The pipeline builds but doesn't
  validate.
- **Future statuses go stale after 90 days.** `npm test` fails when a future line was last verified
  more than 90 days ago. CI can't run web searches, so re-verification is a deliberate pass that
  updates `last_verified`.

## Rendering (2026-10-13)

These rules come from MapLibre 6.11.2's own source, confirmed in the plan review.

- **Data never goes into the style.** Sources load by URL, because `syncStyle`'s diffed `setStyle`
  deep-clones and compares the whole style. The one exception is the selected line's drawing. It's
  small, and it must be in the style, because the diff compares GeoJSON data and would otherwise wipe
  it on the next sync.
- **The year is feature-state, not a filter (changed after the rendering spike; this reverses the
  plan's "whole-year setFilter").**
  - In the past era, every transit layer's opacity reads a feature-state `vis` from 0 to 1, and each
    year step sets it only on the features whose visibility changes (`src/timeline/visibility.ts`).
  - The same `vis` carries the fades: closing lines fade over two years, and opening lines fade in
    over the step while playing.
  - A year filter, whether set with `setFilter` or written with `global-state`, makes MapLibre reload
    the whole source and re-lay out every layer on it at each step (`style_layer.ts` →
    `_updateLayer` → `'reload'`).
  - Costs: the client keeps each feature's years (`EraIndex`), hit-testing skips features hidden this
    year (`visibleAt`), and entering the past era sets `vis` on every feature once.
  - Undated features stay out by a static filter.
- **Hover and selection are feature-state** on every feature of the line (promoteId `fid`), the same
  way BAM's massing "rise" works. A style rebuild doesn't reset them: they are reapplied after every
  sync and on `style.load`.
- **Two sources per era.**
  - `-draw` has one feature per segment, with opaque strokes, so lines sharing track don't darken.
  - `-lines` has one feature per line × segment use, for hit-testing and highlights.
  - In the Phase 0 preview, today's BART lines each have their own segment, so their strokes overlap.
    That is invisible, because the strokes are opaque and the same color. Phase 2 splits the present
    network into shared, dated segments.
- **Selecting a line** runs a 1.2–2.5 s flight scaled by distance that keeps the current pitch.
  BAM's flight is 4.5 s to pitch 58, too slow for hopping between lines. The line draws itself end to
  end in the selection color, so it shows over same-colored shared track.

### Encodings

| Encoding | Meaning |
|---|---|
| Hue, plus width as a second channel | Mode |
| Dash | `approximate` geometry only |
| Hollow tube | Tunnel or subway (BAM's convention) |
| Lighter tint | Display dates borrowed from the line |
| Solidity | Future status. In the future era, today's network steps back to 0.4 (BAM: "the present as print, the future in color"). |
| Faint, uncased | Ghost overlay |

- **Known merge conflict.** In BAM a dash means *proposed*; here it means *approximate*, as
  Matthew's brief asks. When the maps merge, BAM's proposed treatment should move to its own
  solidity convention.

### Mode palette (placeholder; open for Matthew's review)

- The colors are placeholders, like BAM's. Matthew supplies the final palette in
  `src/theme/theme.json`; no code changes.
- The placeholder hues, in legend order:
  - heavy rail blue `#1F5FAD`
  - commuter rail crimson `#C02942`
  - interurban violet `#6A3FB0`
  - streetcar green `#2F7D1F`
  - cable magenta `#A62F86`
  - light rail orange `#B35400`
  - ferry cyan `#007FA8`
  - BRT ochre `#7F6A00`
  - heritage warm gray `#6F665C`
- They are checked with the data-viz palette validator. Every check passes on both land (`#FBFAF6`)
  and water (`#E3E8EA`), in legend order: lightness band, chroma floor, colorblind separation of
  adjacent pairs, normal-vision floor, and 3:1 contrast.
- **No 8-color palette can pass the all-pairs colorblind check that a map strictly needs.** The worst
  pairs are blue against violet and blue against cyan. Mode is therefore never color alone:
  - widths differ by mode (`transit.widths`);
  - hover tooltips and the panel name the mode;
  - the legend chips filter by mode;
  - the line list is a text equivalent.
  Matthew's palette should be re-run through the validator.
- `npm test` enforces 3:1 contrast for every mode against land and water.

### Rendering spike (2026-10-13)

<!-- perf:start -->
Results pending (tests/perf.spec.ts).
<!-- perf:end -->

## Interface (2026-10-13)

- **The app opens on the present era.** The past era opens at 1925, the interurbans' heyday, and
  `?year=` overrides that.
- **The past slider runs 1850 to today and includes the present network.** BART grows in as its
  segments get sourced dates (Phase 2, `present/extensions.json`). Until then BART's lines are
  undated and off the slider, which the slider's note says.
- **The "Whole Bay" frame** is the core of the rail network, from San Rafael and Richmond to San José
  and Livermore. BAM's frame fits its project sites.
- **Freight-only rail stays as BAM's faint dashed context.** BAM's context lines for transit rail and
  ferries are hidden, since this map draws its own. BAM's single `layers.context` flag is split into
  roads, rail and ferry; that split should be backported to BAM.
- **The style panel is deferred to Phase 5.** The palette is still a one-file swap.
