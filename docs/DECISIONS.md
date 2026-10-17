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

## Made by Matthew (2026-10-13, Phase 1 planning)

5. **Ferries: every public ferry in 511's regional feed is part of the present network,** not only
   SF Bay Ferry and Golden Gate Ferry. Seasonal or tourist routes are included if 511 carries them,
   and their panel says so when the feed marks them seasonal.
6. **The placeholder palette stays through the Phase 1 checkpoint.** Matthew will supply his own.
7. **Rumsey scans: public-domain maps first.**
   - Geometry is traced from USGS and Library of Congress scans (public domain) first.
   - A David Rumsey Map Collection scan is used only where no public-domain map shows the line.
   - The Rumsey images are CC BY-NC-SA 3.0. Non-commercial use is allowed "in any work or
     publication, either in print or digital media"; adaptations must carry the same license; and
     commercial republication needs permission (rumseymapcenter@stanford.edu).
   - Every feature traced from a Rumsey scan cites a source whose `license` is "CC BY-NC-SA 3.0
     (David Rumsey Map Collection)", so those features can be listed and swapped out.
   - Credit: "David Rumsey Map Collection, David Rumsey Map Center, Stanford Libraries."
8. **`main` was created at the first scaffold commit,** and Phase 0 and 1 merge to it through a pull
   request. Merging to `main` deploys to GitHub Pages.
9. **BRT lane limits come from OpenStreetMap's bus-lane tags** (decision 3 says how far to draw).
   - Only SFMTA publishes its limits (Van Ness, Mission St to Lombard St). AC Transit and VTA describe
     their dedicated lanes without saying where they start and end (research below).
   - Each line cites its agency for the corridor being BRT. Where the center or median lanes run comes
     from OSM's surveyed tags (`highway=busway`, or `designated` in the innermost position of
     `bus:lanes`/`psv:lanes`), fetched from Overpass (ODbL).
   - Van Ness is checked against SFMTA's limits, and Alum Rock against VTA's schedule; a mismatch is
     flagged `conflicting_sources`.
   - The method is in "Present-era data" below.

## Made by Matthew (2026-10-14, Phase 1 review)

10. **Different modes on the same path are drawn side by side, close in.**
    - The case is Market St: BART and Muni Metro run in stacked subways with the F on the street
      above, so one stroke hid the other two.
    - From zoom 13, lines of different modes that run within 12 m of each other for at least 150 m
      are drawn a few pixels apart. That's 3.5 px a slot at z13.5, 7 at z15 and 14 at z17.
    - One mode's shared track stays one stroke, as decision 2 says: BART's colors, the Muni Metro
      letters, Caltrain with the Capitol Corridor.
    - The slots keep the real order across the path. Stacked tunnels within 4 m are ordered by mode.
    - A crossing street touches a line for less than 150 m, so it never jogs.
    - The open line's drawing and the stations stay on the true path.
    - Today this applies on Market St, on upper Market (the F with Muni Metro), and on short
      side-by-side stretches at SFO, Millbrae and Mountain View.
    - In the past era the slots are time-aware (Phase 2a): two lines count as alongside only if
      their display dates overlap, so lines that never ran together don't push each other aside. A
      line that ever shared the path with another mode keeps its slot for its whole life, and an
      undated line pushes nothing aside.
    - Present lines drawn in the past era keep their present-era slots. The two datasets are compared
      once the present network has dates (Phase 2b, `present/extensions.json`).
    - Code: `pipeline/transit_pipeline/side_by_side.py` and the `off` property in `data/app/`.

## Made by Matthew (2026-10-14, Phase 2 planning)

11. **Book dates go in now, flagged.**
    - Most Key System and Red Train dates rest on Demoro's *The Key Route* (1985) and Ford's *Red Trains
      in the East Bay* (1977). Their page numbers are known only as Wikipedia gives them.
    - Such dates are entered with the book cited, the page as given, and the flag `page_unverified`;
      the panel says the page hasn't been checked in the book yet.
    - A free primary source wins wherever one exists: California Railroad Commission decisions, trade
      journals, newspapers of the day. Matthew checks the book pages later (the page-check list).
12. **I trace; Matthew spot-checks.**
    - A segment that a cited source places on a named street follows that street's centerline today
      (Overture), checked on the USGS sheet of its period: `street-centerline`.
    - Private right-of-way (piers and moles, cuts, trestles) is traced by eye from USGS GeoTIFFs,
      with the hand-read points centred on the line symbol: `geotiff`. Where the sheet is
      misregistered, the trace is corrected by a fit to control points: `similarity`.
    - Both are `digitized`, with `georeference` `{map, method, est_error_m}` and, for a fit, its shift,
      RMS and controls. What can't be confirmed is `approximate` (dashed).
    - Every geometry is rebuilt from a recipe (`data/past/<group>/trace.json`) by `make past`, so it
      can be redone and reviewed; `make past-review` draws each feature over its map for the
      spot-check list.
    - Measured on Oct 14: the 1:24,000 sheets of 1947–49 match today's streets within a few metres.
      The 15-minute sheets of 1895–1915 are misplaced by up to a few hundred metres (Yerba Buena
      Island sits about 210 m too far south on the 1915 San Francisco sheet), so traces from them are
      corrected against features unchanged on a 1:24,000 sheet, and carry an error of about 50 m.

## Made by Matthew (2026-10-14, Phase 2b planning)

- Phase 2b covers all four streams at once: today's network dates, the early railroads and ferries,
  the San Francisco streetcars, and the rest of the East Bay. Matthew will allowlist
  OpenHistoricalMap's Overpass server for its dated railway ways.

13. **Past lines may run over present track.**
    - Many past services ran on rights-of-way still in use: the SF & San José and Southern Pacific
      commuter trains on today's Caltrain line, the Central Pacific on the Capitol Corridor's.
      Drawing them twice would double the strokes.
    - So a past line's route may name a present segment. The present segment keeps its own dates
      (when the track opened), borrows from the past lines that used it where those are null, and
      is drawn once, in the present layer; the past line's hover and highlight follow it.
    - Today's network is cut into shared, dated segments at build time from
      `data/present/extensions.json` (`extensions.py`), with dates from official sources only.

## Made by Matthew (2026-10-15, Phase 2c planning)

14. **The past era's line list follows the year slider.** The lines running in the chosen year come
    first; every other line follows, dimmed. Search still finds any line.
15. **Freight-only railroads are drawn, as `railroad`:** the Alameda Belt Line, the Oakland Terminal
    Railway and the like, for the years they carried freight. Passenger track that went on carrying
    freight counts too: its segment stays until the freight ended (the Sacramento Northern from
    Shafter Ave to Lafayette, 1941–57), drawn in the railroad mode for those years.
16. **The Sacramento Northern stops at the Bay Area's boundary,** the county line of the nine
    counties (`src/basemap/region.json`), not at the pan limits: east of Bay Point it is drawn
    through Solano County to the Yolo County line, and `continues_beyond` says where it went on to.
    A past line cut there reaches a county line rather than the map's edge, and the test accepts
    either.
17. **A ferry whose last run isn't dated closes in the month of the order that authorized its
    end,** noted "on or about" (the Creek Route, Hyde St–Berkeley, Benicia–Port Costa,
    Martinez–Benicia). The order is cited for `closed`, its note says the date is the order's month
    and not the last run, and `make checklists` lists these ends for a newspaper check. This narrows
    the rule that a date is never filled in: the month is the order's, which is sourced.
18. **The 1864 Britton & Co. railroad map of San Francisco may be traced** (David Rumsey 4779.000,
    CC BY-NC-SA 3.0), under decision 7: each feature traced from it cites the Rumsey source with its
    license, so it can be listed and swapped out.
19. **Sources whose copyright is unknown are cited for facts only** (Matthew asked for the
    recommendation): the California State Railroad Museum's timetable scans, the *Orinda Sun* and
    *The Western Railroader*. Dates, routes and station names are facts; nothing is reproduced beyond
    a short quote, and each `sources.json` entry says "copyright status unknown; cited for facts
    only".

## Made by Matthew (2026-10-15, Phase 2c review)

20. **A line a source shows running, but whose opening or closing isn't sourced, is drawn for the
    years it's shown.** Matthew approved it at the Phase 2c checkpoint.
    - The case: San Francisco's numbered streetcar lines are listed street by street in Manley's
      inspection report of February 1, 1909 and O'Shaughnessy's city report of May 1929, and
      Oakland's in the Railroad Commission's abandonment orders of 1944–48. Few of their openings are
      sourced, and some of their last days aren't, so under decision 4 alone they would all be left
      off the year slider.
    - The data keeps `opened` and `closed` null with their flags, and lists in `running[]` each date
      a cited source shows the line in service, with its page. A route entry's own `running` lists
      the dates that show that stretch, where it isn't in all of them (a 1929 extension, a 1909 street
      later given up).
    - The map draws such a line from its first running date (or its sourced opening) to its last (or
      its sourced closing), in the lighter tint of a borrowed date, so it under-claims rather than
      over-claims. A stretch in only some of the dates starts at the first that shows it and ends at
      the last. The panel says "Running by February 1, 1909; until at least May 1929", and names
      the sources.
    - Where the last day is sourced (the San Francisco PUC's reports of 1945–49 give most of the
      Market Street Railway lines' last streetcar days), the route at the last running date is drawn
      on to it. The route may have changed in between; the panel gives the dates the route rests on.
    - The alternative is to keep these lines undated: drawn only in the ghost overlay, listed in the
      slider's note. `RUNNING_DATES = False` in `build.py` does that.
21. **The North Pacific Coast is its own line over the track it shared with the 1903 electric
    lines.** Its trains ran from Sausalito by San Anselmo from 1875; the North Shore electrified that
    track in 1903, and the map already drew it as the electric lines'. The NPC (with its successors'
    steam trains, under the North Shore and the Northwestern Pacific) is a line of its own whose
    route runs over the same segments, and the shared segments take the track's dates, as today's
    track does under decision 13. The other option, drawing the NPC only from San Anselmo north with
    a note, was not taken.

## Today's network, dated (2026-10-14, Phase 2b)

- **A present segment's date is its track's.** `opened` is when the track first carried passengers,
  so the past era shows it from then and past lines over it (decision 13) aren't cut short. Where
  today's service runs over older track whose date isn't sourced yet (the K on the United Railroads'
  Ocean Ave track, the L on Taraval St, the F on Market St), the segment stays `null` and the line's
  `route_from` says when the service began there; display borrows that, lighter (decision 4).
- **Track older than its service is the past era's** (Phase 2b, early railroads). Caltrain dates from
  July 1, 1980, when Caltrans took over, but most of its track is the San Francisco & San Jose
  Railroad's of 1863–64, the Bayshore Cutoff of 1907 and San José's line of 1935. Those dates are
  past facts, so they may come from any citable source but Wikipedia (CLAUDE.md), here the
  directories and newspapers of the day; Caltrain's own milestones confirm 1863–64 and 1935. Stations
  standing on older track borrow their line's date, not the track's.
- **Official sources only.** Today's network is dated from its agencies' own records, as the future era
  is. For example:
  - BART: its annual reports, news releases, reports to Congress and timeline.
  - Muni: its 1999 chronology by Robert Callwell, and SFMTA's short-range transit plans and pages.
  - The other systems: VTA and the CPUC's safety review, Caltrain's milestones, SMART's releases and
    board reports, the Golden Gate and SF Bay Ferry histories, ACE, the Capitol Corridor, Amtrak,
    AC Transit, SFCTA and MTC.
- **An agency's announced date counts, with a note** (Matthew, Oct 14). Where an agency announced
  an opening date beforehand and nothing contradicts it, the date is used, and the notes say it was
  announced:
  - the Central Subway's weekend service, November 19, 2022;
  - West Dublin/Pleasanton, February 19, 2011;
  - Tempo, August 9, 2020.
  Where a post leaves the day unclear, only the month is given: SMART's Windsor extension, May 2025,
  and Petaluma North's "grand opening".
- **Conflicts:** BART's San Francisco line opened November 5, 1973 (November 3 was ceremonies and
  free rides). BART's 2020 timeline gives May 13, 2020 for Berryessa, against VTA's and BART's own
  June 13. The Powell-Mason cable line is dated only to 1888 (Callwell: full service a few days after
  March 28; SFMTA's blog: early March) and flagged.
- **One stretch, one stroke.** A stretch is cut from one line's GTFS geometry between two stations,
  older track keeps any part two stretches share, and each stretch is split where the lines of its
  mode part. So BART's colors share their track as one dated segment each, the Muni Metro letters
  share the subway, and the F on Market St stays apart from the subway under it (different modes).
- **Past-era colors follow the mode of the year** (Matthew, Oct 14). Where past lines use present
  track (decision 13), the track draws in the mode of the line using it at each year, so Muni's
  Twin Peaks Tunnel draws as a streetcar before 1980 and as light rail after. Today's lines that
  changed mode themselves carry an `earlier_mode` in `extensions.json`: the N until February 18,
  1980, the K until June 11, 1980, the L and M until December 17, 1980 and the J until June 17,
  1981, the days their weekday Metro service began (Callwell).
- **Stations borrow from their track.** A station with no date of its own shows from when the track
  it stands on opened (the earliest, at a junction), drawn as borrowed. Stations that opened apart
  from their track carry their own dates (BART's Embarcadero, 1976; West Dublin/Pleasanton, 2011).

## Architecture (2026-10-13)

- **BAM's basemap is served same-origin, from a pinned snapshot (refines decision 1).**
  - BAM's GitHub Pages host answers CORS preflights with 405 and no CORS headers. Only simple GETs
    carry `access-control-allow-origin: *`.
  - So range requests that trigger a preflight, and font loads, could fail in some browsers. Mobile
    Safari is the worry.
  - BAM's CSS also points at root-relative `/generated/` URLs.
  - `make basemap` copies BAM's deployed `/generated/` (110 files, 279 MB) and checks it against
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
| Solidity | Future status. In the future era, today's network steps back to 0.4 (BAM: "the present as print, the future in color"). Three ways to draw it are open for Matthew (Phase 3; `?solidity=opacity`, `tint` or `committed`); `opacity` stays the default until he picks. |
| Faint, uncased | Ghost overlay |
| Lines a few pixels apart, close in | Different modes on the same path (decision 10) |

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
`npm run perf` (`tests/perf.spec.ts`) used 10,000 synthetic past segments plus 2,000 points under a
4× CPU slowdown, with the building print off. Headless Chromium draws with SwiftShader (software
WebGL), where one repaint alone takes about 1–1.5 s, so the absolute times are pessimistic and the
comparison is what counts.

Milliseconds from a year step to a settled map, 12 steps each:

| Approach | Median | p90 | Max |
|---|---|---|---|
| **A. Feature-state visibility, set only on features crossing the year (shipped)** | **1,055** | **2,587** | **4,140** |
| B. Year in every layer's filter, via `setFilter` (the plan's first proposal) | 4,928 | 7,495 | 8,187 |
| C. The same filters written with `global-state`, via `setGlobalStateProperty` | 3,328 | 6,264 | 8,503 |
| Hover: feature-state on one line's five features | 30 | 2,316 | 4,338 |

- A is 3–5× faster than B or C.
- B and C reload the source and re-lay out every layer at each step. A costs about one repaint.
- An earlier run that compared one global-state paint layer against ten filtered layers was not a
  fair test and isn't used.
- **With the real data (2026-10-17, Phase 5):** the past era has 576 segments and 148 lines, not
  10,000. The same measure, years 1906 to 1917 (the second test in `tests/perf.spec.ts`):

  | View | Median | p90 | Max |
  |---|---|---|---|
  | The "Whole Bay" frame | 378 | 665 | 698 |
  | San Francisco, zoom 13 | 233 | 341 | 381 |
  | San Francisco, zoom 13, with the building print | 1,289 | 2,586 | 3,061 |

  The building print, not the lines, is what costs under software WebGL. On a real GPU both are
  far cheaper; that, and WebKit on an iPhone, needs a device (Matthew's).
- **PMTiles aren't needed for the past era.** Its files are 628 KB and 972 KB (119 KB and 150 KB
  gzipped) and load only in the past era. The catalog, the largest file at the start, now lists each
  source's record once and lines cite it by id: 2.66 MB to 2.07 MB (319 KB to 255 KB gzipped). It
  loads beside the map, not before it, so it delays only the list and the panels.
<!-- perf:end -->

## Present-era data (2026-10-13, Phase 1)

- **One source per train.** Amtrak-run trains (Capitol Corridor, Zephyr, Coast Starlight) come from
  Amtrak's national feed, and are skipped in 511's feed so nothing is drawn twice. Every other agency
  comes from 511, the SFO AirTrain included. BART's own feed is used only when there's no 511 key.
  The Gold Runner is in neither feed: it comes from its own (Amtrak San Joaquins, via the Mobility
  Database's mirror, since the producer's host is blocked).
- **Grouping routes into lines** follows a table per agency in `gtfs.py`:
  - BART by color.
  - Muni Metro by letter; F and E as streetcars; each cable line.
  - Caltrain, SMART and ACE as one line each, because their patterns share track.
  - VTA by color. Its special-event services (Event-Blue, Event-Green, Event-Orange, Event-Special)
    run over the same track and are skipped.
  - The SFO AirTrain as one line; its Red and Blue lines share one guideway.
  - Every ferry route in 511's feed.

  Bus substitutions and shuttle patterns such as Muni's S are skipped. A rail agency in 511 with no
  rule is printed for review, never drawn silently.
- **Names follow the map's sentence case.**
  - A name the feed gives in capitals ("J CHURCH", "POWELL-HYDE CABLE CAR") gets its words
    capitalized as proper names: "J Church", "Powell-Hyde cable car".
  - A spaced hyphen becomes an en dash.
  - A ferry route loses a trailing "Ferry", since the mode already says it: "Larkspur–San Francisco".
- **Geometry covers every shape a line runs,** which replaces the Phase 0 "busiest shape" rule. That
  rule dropped branches such as Caltrain's Gilroy tail and BART's airport wye.
  - Shapes are taken longest first; only parts more than 25 m from kept track are added; slivers
    under 200 m are dropped; each branch is joined to the track it leaves; then the result is
    simplified to 3 m.
  - A route with no published shape is drawn through its stops and marked `approximate` (dashed).
- **Clipping.** Lines are clipped at BAM's pan limits. Where they go on to comes from their
  terminals' names in the feed (`continues_beyond`), never written by hand.
- **Stations.** Rail and people movers show their stations, ferries their terminals. Muni Metro on
  the surface, the F and E and the cable cars show only subway stations, which keeps the city quiet.
  - In 511's feed, Muni's stops have a parent station only where they share one with BART.
  - So a Muni station is every stop named as one, with its directions merged: "Metro Castro
    Station/Downtown" and "Metro Castro Station/Outbound" become "Castro", at the mean of their
    positions.
  - That gives 13 stations, the Central Subway's included.
- **The SFO AirTrain comes from 511's "SFO Airport" feed** (since Oct 13, with the key).
  - It replaced the Overture (OpenStreetMap) guideway used before the key, because GTFS is this era's
    source and it carries the 11 stations.
  - The Overture step and its `pyarrow` dependency were removed.
- **511 attribution (Data Disseminator Agreement 5.b).**
  - "Data provided by 511.org", linked to http://www.511.org, appears in the credit line whenever a
    511 line is loaded, and stays visible when the credits collapse.
  - There's no "511" in the map's name, and no agency logos.
  - Matthew must send MTC the live link within 30 days of launch (`DATA_LOG.md`).

### BRT lane limits (researched 2026-10-13; Matthew chose OSM, decision 9)

Decision 3 draws BRT only where the dedicated center or median lanes run, cut at limits an official
source names. Searching official pages found that only Van Ness names its limits:

- **Van Ness BRT (Muni 49): sourced.** Center-running lanes from Mission St to Lombard St, opened
  April 2022. Source: SFMTA, https://www.sfmta.com/projects/van-ness-improvement-project.
- **Tempo (AC Transit 1T): no limits found.**
  - AC Transit's press releases (June 30 and Aug 7, 2020) and Alameda CTC (Aug 12, 2020) say only
    that it has a "nearly 10-mile network of dedicated and painted bus-only lanes", curbside or in
    the center, from Uptown Oakland to San Leandro BART.
  - Wikipedia's route section (median running from 14th Ave on International Blvd; mixed traffic on
    Broadway and in San Leandro) cites nothing, so it can't be used.
- **VTA Alum Rock–Santa Clara BRT (Rapid 522): named in its schedule** (found after decision 9).
  - VTA's Aug 2018 release (reprinted by Mass Transit) says only that "for approximately one mile of
    the route, there is a dedicated lane for buses only", on Alum Rock Ave.
  - VTA's own Rapid 522 schedule
    (https://www.vta.org/sites/default/files/route_schedule_pdfs/current/route_522/route_522_schedule.pdf)
    gives the limits in its driving directions:
    - on Alum Rock Ave, buses "Merge Left into Bus Only lane";
    - they use the "median BRT stops at Alum Rock & Jackson and Alum Rock & King";
    - they "Merge Right into regular traffic lane after 34th" westbound, and "after Muirfield"
      eastbound.
  - The pipeline checks OSM's extent against these limits, as it does for Van Ness.

**Results (Oct 13, 2026, with OSM as of 2026-10-13):**

| Corridor | Median lanes | Check against the agency's limits |
|---|---|---|
| Van Ness (Muni 49) | 3.2 km on 34 OSM ways, 14 stations | Ends 15 m from Mission St and 3 m from Lombard St |
| Tempo (AC Transit 1T) | 9.3 km on 208 OSM ways, 21 stations | No published limits to check |
| Alum Rock (VTA Rapid 522) | 2.2 km on 11 OSM ways; the Alum Rock & King and Alum Rock & Jackson stations, the two VTA names | Ends 70 m from N 34th St and 173 m from Muirfield Dr |

- One way along Tempo was listed for review: 11th St, way 1056371791, in the downtown couplet. Its
  tags (`lanes:bus=1`, `bus:lanes=yes|yes|yes`) don't say where the bus lane is.
  - Settled Oct 14: it stays undrawn. 11th St is a one-way street of the couplet, so any bus lane
    on it is at a curb, not the center or median that decision 3 draws.

Matthew chose OpenStreetMap's lane tags for all three (decision 9).

**The method** (`pipeline/transit_pipeline/osm_lanes.py` and the BRT rule in `gtfs.py`):
- **Query.** Overpass is queried over each route's GTFS shapes, padded by 100 m, for ways that carry
  any bus-lane or busway tag. The response is cached in `data/raw/osm/`, and its `timestamp_osm_base`
  is recorded.
- **What counts as a center or median lane.** A way counts if it is a `highway=busway`, or if a
  `bus:lanes` or `psv:lanes` list (plain, `:forward` or `:backward`) is `designated` in its innermost
  lane:
  - On a one-way way, the innermost lane is the first entry.
  - On a two-way way, it's the first entry of each direction, the one next to the centre line. A
    two-way way's plain list runs left to right across the whole road, so its innermost lane can't be
    told apart, and it's listed for review instead.
  - Curb lanes (`busway=lane`, `busway:right=lane`) don't count.
- **Clipping.** The route's GTFS coverage is kept only within 15 m of those ways. Gaps under 120 m
  are closed, where the tags lapse at intersections, and pieces under 200 m are dropped.
- **Records.** Each segment is `surveyed`, and its `geometry_method` names the shapes, the OSM way ids
  and `timestamp_osm_base`.

## Interface (2026-10-13)

- **The app opens on the present era.** The past era opens at 1925, the interurbans' heyday, and
  `?year=` overrides that.
- **The past slider runs 1850 to today and includes the present network.** BART and Muni grow in
  from their sourced dates (Phase 2b, `present/extensions.json`). Systems not yet dated are off the
  slider, which the slider's note says.
- **The "Whole Bay" frame** is the core of the rail network, from San Rafael and Richmond to San José
  and Livermore. BAM's frame fits its project sites.
- **Freight-only rail stays as BAM's faint dashed context.** BAM's context lines for transit rail and
  ferries are hidden, since this map draws its own. BAM's single `layers.context` flag is split into
  roads, rail and ferry; that split should be backported to BAM.
- **The style panel (Phase 5) is BAM's, behind `?style=1`.** Mode colors and widths, the eras, future
  status, proposals, the shared basemap, type, 3D and layers, all live, with the contrast check; it
  exports `theme.json` to commit. A change kept in the browser shows only with `?style=1`, never to
  visitors. The basemap colors are BAM's, so a change there belongs in BAM too. BAM's newer
  `controlBorder` came with it: fields and filter chips are outlined at 3:1 (WCAG 1.4.11).
- **The share card is drawn from the map itself** (Phase 5, `npm run share-card`): 1200×630, the
  title band over the map, in the theme's type and colors; one card for the site and every line's
  page. Three options are open for Matthew (`docs/screenshots/p5/share-card-*.jpg`): the whole Bay
  in 1925 (the default), today, or 1925, today and coming side by side. Redraw it when the data or
  the palette changes.

## Accessibility (2026-10-17, Phase 5)

- **axe-core runs on seven views** (`npm run a11y`, `tests/a11y.spec.ts`, WCAG 2.1 A and AA rules):
  the present, the past at 1925, the future with proposals, a line panel, a proposal panel, the
  editor and a phone's line panel. CI runs it in WebKit. The map canvas is out of axe's reach; the
  line list is its text equivalent.
- **One fix:** a mode chip that's off had 45% text, under 4.5:1 on the panel. It's 62% now, still
  struck through.
- **By hand, with the keyboard:** every control shows a focus ring; the tab order runs skip link,
  byline, era, the era's own controls (play, speed, year), the list toggle, mode chips, search and the
  list. Enter on a line opens its panel with focus on its title; Escape closes it and returns focus to
  the line in the list. Drawing in the editor needs a pointer; it's an author's tool, and its form
  fields are keyboard accessible.

## The ideal network (2026-10-16, Phase 4)

- **The reference layer is two-level, like the eras** (refines `docs/SCHEMA.md`'s planned flat
  `ideal/reference/<proposal>.geojson`). Each proposal is a folder, `data/ideal/<proposal>/`, with
  segments and lines, so proposals that share a corridor share a stroke. The app treats it as a fourth
  dataset, `ideal`, drawn in the future era only when "Show proposals" is on (`?proposals=1`).
- **Proposals are drawn only where their documents word a route.** Along today's streets or track,
  `approximate` (dashed) unless the right-of-way already exists; a stretch the words don't place
  (a turn "somewhere between Masonic and Park Presidio", a new tube under the bay) is left out, and
  the panel says so. A proposal with no path at all is on the tradeoffs page only
  (`docs/ideal/tradeoffs.md`).
- **`proposal_status` is a separate vocabulary** (adopted, study, advocacy, superseded, withdrawn),
  since a proposal isn't a project being built; `adopted` and `study` need an official source.
- **The look is a placeholder:** proposals at 0.6 of the width, off by default, in one of three looks
  open for Matthew (`?proposalstyle=`): `translucent` (the mode's hue at 0.85 opacity, the default),
  `tint` (the mode's hue mixed halfway toward the paper) or `neutral` (one grey,
  `theme.transit.proposals.neutral`). See `docs/research/phase-4.md`.
- **The editor (Phase 4b) is an author's tool behind `?edit=1`,** loaded on demand (Terra Draw 1.35.0
  and its MapLibre adapter 1.4.1). It exports `data/ideal/network.geojson` to commit; nothing is saved
  to the site. Its layers (`transit-editor-*`) survive the app's diffed style updates because
  `syncStyle` carries them into each new style.
- **Matthew's network draws at full strength once it has lines,** with its own toggle, on by default
  and hidden while the editor is open (the editor draws it). Its geometry is `designed`, a fourth
  confidence used for nothing else. Whether it should look otherwise (over everything, or in place
  of the proposals) is his call.
