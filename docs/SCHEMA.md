# Data schema

Every line, segment and point on the map comes from the files described here. The JSON Schemas are in
`data/schema/`, and the shared vocabulary (modes, statuses, flags and the rest) is in
`data/schema/vocabulary.json`. `npm test` checks everything on this page. That suite is the only
place validation runs.

## Two levels: segments and lines

The data is in two levels:

- A **segment** is a physical right-of-way: a piece of track, a ferry route, a busway. It has its
  own dates, because track was laid, extended, cut back and torn up on its own schedule.
- A **line** is a named service, such as the Key System's B train, BART's Yellow line or the SP's
  Alameda line. It lists the segments it ran over, and optionally when it used each one.

The two levels exist because one right-of-way often carried many lines over the years. The Key
System's Bay Bridge trunk and Market Street's four tracks are examples. Lines were also rerouted onto
different track. OpenHistoricalMap models history the same way, with dated ways plus route
relations, so it imports one to one.

There are two kinds of "what happened to it":
- A right-of-way's fate, for example "now the Ohlone Greenway".
- A service's fate, for example "replaced by AC Transit bus 72".

The app doesn't read these files directly. `make app-data` (`pipeline/transit_pipeline/build.py`)
flattens them into `data/app/`:

- `<era>-draw.geojson`: one feature per segment piece. These are the visible strokes.
- `<era>-lines.geojson`: one feature per line × segment piece, in route order. These are used for
  hovering, selecting and drawing the line during the flight.
- A segment is cut into pieces where it runs alongside a different mode. Each piece's `off` is its slot
  across the path: 0 alone, else -1, 0 or 1 for three modes, and -0.5 or 0.5 for two. Close in, the
  map spreads the pieces apart by their slot (decision 10). In the past era, only lines whose display
  dates overlap count as alongside.
- `<era>-points.geojson`: stations and other points. Like the strokes, each carries its display years
  (`open_y`, `close_y`) and the `borrowed` and `undated` marks (decision 4).
- `catalog.json`: every line, with its sources resolved, for the panel and the list.

## Where files live

```
data/
  schema/          line, segment, point and source schemas; vocabulary.json
  sources.json     every source, cited by id
  systems.json     operating systems and companies (Key System, SP, BART, Muni...)
  <era>/<group>/   lines.json, segments.geojson, points.geojson
                   era is past, present, future or ideal; group is a system or a generator,
                   e.g. future/bam (from BAM), present/bart (from GTFS), past/key-system
  ideal/<proposal>/  the future's reference proposals (layer B), one folder per proposal
  ideal/network.geojson  Matthew's own network (hand-edited or from the editor)
  app/             built by `make app-data`; don't edit
  raw/             downloads, git-ignored
```

A file whose `$comment` says it was generated is rewritten by its pipeline step, so fix the step,
not the file. Past-era files are hand-edited.

## Provenance (on every line, segment and point)

| Field | Rule |
|---|---|
| `sources[]` | At least one entry. Each entry is `{source, supports[], pages?, note?}`: `source` is an id in `sources.json`, and `supports` names the facts it backs: `geometry`, `opened`, `closed`, `route`, `fate`, `status`, `expected_opening`, `operator`, `gauge`, `electrification`, `photo`, `name`, `stations` or `general`. |
| `geometry_confidence` | One of three values, for segments and points: **`surveyed`** (from OSM, OpenHistoricalMap, GTFS or official GIS), **`digitized`** (traced from a georeferenced map) or **`approximate`** (reconstructed from text descriptions; the map draws these dashed). |
| `geometry_method` | How the geometry was made, specifically enough to redo it. Examples: `OHM way 200015280`; `USGS 1:62,500 San Francisco 1899, TPS fit, RMS 14 m`; `street-routed along Shattuck Ave per Demoro p. 45`; `GTFS shapes.txt, shape 002A_shp`. |
| `georeference` | For `digitized` geometry. In the past era (decision 12) it is `{map, method, est_error_m}`: `map` is the `primary_map` source the geometry was traced from or checked against, which the feature also cites; `method` is `geotiff` (traced by eye from a georeferenced scan), `street-centerline` (a surveyed street centerline between cross streets a source names, checked on the map) or `similarity` (a fitted transform); `est_error_m` is the estimated error in metres. A `similarity` fit adds the transform, control points and RMS, in the shape BAM's `Similarity.report()` produces, as BAM's future lines have. |
| `flags[]` | What is still open. `opened_unsourced`, `closed_unsourced`, `expected_opening_unsourced`, `status_unverified`, `geometry_unverified`, `needs_manual_digitizing`, `page_unverified` (a book's page cited as another work gives it, not yet checked in the book; decision 11), `conflicting_sources`, `license_unclear`. |
| `notes` | Free text. |

A `sources.json` entry has `id`, `title`, `type`, and optionally `author`, `publisher`, `date`, `url`,
`license`, `accessed` and `notes`. Its `type` is one of `official`, `primary_map`,
`primary_document`, `book`, `journal`, `railfan_web`, `wiki` or `dataset`. Wikipedia counts only as
a pointer to the sources it cites.

### Mapping to BAM's vocabulary

BAM's `accuracy` maps onto `geometry_confidence` as follows. `bam_sync.py` applies this mapping, and
a merge would too.

| BAM `accuracy` | This map's `geometry_confidence` |
|---|---|
| `official` | `surveyed` |
| `traced` | `digitized` |
| `approximate` | `approximate` |

BAM marks a straight join that no figure draws as `constructed:`. Those features become
`approximate`.

## Dates

- A date is `YYYY`, `YYYY-MM` or `YYYY-MM-DD`, or `null`. A trailing `~` is allowed only when the
  source itself says "circa".
- **A date is never filled in.** A null `opened` needs the `opened_unsourced` flag, except on a
  line or point that hasn't opened yet. A null `closed` needs `closed_unsourced`, except on a line
  that is still running or not yet open. Tests enforce both rules.
- What the map shows for a segment with a null date (decision 4) depends on what its lines have:
  - If the lines that used it have sourced dates, the map **borrows** them for display: the earliest
    sourced opening and the latest sourced closing.
  - A borrowed date is drawn in a lighter tint and stated in the panel. The data keeps the `null`.
  - If none of its lines has a sourced date, the segment is **undated**. It is left off the year
    slider, listed in the slider's note, and still drawn in the ghost overlay.
  - A point borrows from its lines the same way. A station of today's network borrows first from
    the dated track it stands on (`present/extensions.json`), then from its lines.
- A line's `route[]` entry can narrow its use of a segment with `from` and `to`, as when a line ran
  over a bridge only from 1939 to 1958. Both fall within the segment's dates and the line's, which a
  test checks.
- A past line whose opening or closing isn't sourced can list in `running[]` the dates a cited source
  shows it in service (`{date, source, pages, note}`): a route list, a timetable, an order describing
  it. The map draws it for those years, lighter (decision 20); `opened` and `closed`
  stay null with their flags. A route entry's `running` names the dates that show that stretch,
  where it isn't in all of them.
- Every line in `data/past/` has the status `closed`.

## `lines.json`

`{ "lines": [ … ] }`. Each line has the following fields.

**Identity:**
- `id`: kebab-case, prefixed with its system, e.g. `key-system-b`, `bart-yellow`.
- `name`
- `short_name`

**What it was:**
- `system`: an id in `systems.json`.
- `operators[]`: each entry is `{name, from, to}`.
- `mode`: a mode from the table below.
- `traction[]`: each entry is `{type, from, to}`, with type horse, steam, cable,
  electric_overhead, electric_third_rail, diesel, battery, diesel_electric or gas_electric.
- `gauge_mm` and `gauge_label`

**When it ran:**
- `era`: past, present or future; it must match its folder.
- `opened` and `closed`
- `status`: `closed` for past lines and `active` for present ones. For future lines:

| Status | Meaning |
|---|---|
| `planned` | In an adopted plan or under study, with no environmental clearance yet. |
| `environmental` | In environmental review, or cleared but without construction funding. |
| `funded` | Environmentally cleared with construction funding committed, but construction not started. |
| `under_construction` | Construction, including early works, is under way. |
| `opening` | Built and in testing, or the agency has announced an opening date. |

- `status_as_of`, `last_verified`, and `expected_opening` (as the agency states it, cited by a
  source that `supports` it).

**What happened to it:**
- `fate`: abandoned, converted_to_bus, absorbed_into_bart, absorbed_into_muni, rail_trail,
  paved_over, still_freight, heritage_railway or replaced_by_rail.
- `fate_note`
- `successor`
- `continues_beyond`: for a line clipped at the map's pan limits, where it goes on to, taken from its
  terminals in the source (e.g. "Chicago Union Station"). A test checks that every line carrying it
  reaches the map's edge.

**Route:** `route[]`, each entry `{segment, from?, to?, running?, note?}`, in route order. `running[]` (past lines, decision 20): `{date, source, pages?, note?}`, the dates a source shows the line running.

**Extras:**
- `summary`
- `photo`: `{commons_file, author, date, license, source_url}`. Public domain only: `public-domain`,
  `PD-US-expired` or `CC0`. It is downloaded at build time, never hotlinked.
- `links[]`

Plus the provenance fields above.

## `segments.geojson`

A FeatureCollection of LineStrings and MultiLineStrings. Properties:

- `id`, `system`, `name`
- `opened`, `closed`: the track itself.
- `structure`: street, surface, elevated, subway, tunnel, cut, bridge, trestle, mole, pier or ferry,
  or `null` if not known.
- `shares_existing_track`: future lines only; true for track that already carries service.
- `gauge_mm`
- `electrified[]`: each entry is `{type, from, to}`.
- `fate`, `successor_note`: for example, "BART's Richmond line follows this right-of-way".
- The provenance fields.

Coordinates must stay inside BAM's pan limits (`src/basemap/region.json`). Lines that run beyond
them, such as the Zephyr, Starlight and San Joaquins, are clipped there.

## `points.geojson`

Points, with these properties:

- `id`, `name`, `system`
- `kind`: station, pier, mole, ferry_terminal, carbarn, shop, yard or depot.
- `line_ids[]`
- `opened`, `closed`
- `status`: future projects only; existing, new or rebuilt.
- `fate`, `photo`
- The provenance fields.

## Today's network, dated (`present/extensions.json`)

GTFS has no opening dates, and it gives each present line as one segment, so lines that share track
overlap. `data/present/extensions.json` (schema: `data/schema/extensions.schema.json`) says where
today's lines were opened in stages, and `extensions.py` applies it in `make app-data`:

- **`segments[]`**, the stretches: `{id, name, line, from, to, opened, sources}`, plus `closed`,
  `structure`, `flags`, `notes` and `both_ways`.
  - Each stretch is cut from its `line`'s GTFS geometry, along the shortest path between two
    stations: a point of the system, or a name in `stations` (`[lon, lat]`, for a street corner or a
    tunnel portal, each with a source). `both_ways` also takes the way back, round a loop or a pair
    of one-way streets.
  - Oldest first: where a stretch runs over track that opened earlier, that part stays with the
    older stretch, so a junction or a wye opens once.
  - Each stretch is then split where the lines of its mode part, so every piece is used whole: the
    Blue line runs over only part of MacArthur to Fremont. Pieces take ids `<id>-1`, `<id>-2` and
    so on, named for the stations at their ends where both are within 150 m. A past line that names
    the stretch (decision 13) runs over all its pieces.
  - Each line's route is rebuilt from the pieces along it, in order. What's left over becomes
    `<line>-undated-<n>`, "part not yet dated".
- **`opened` is when the track first carried passengers.** Where today's service runs over older
  track whose date isn't sourced (the United Railroads' track on Ocean Ave and Taraval St, Market
  St's street track under the F), it stays `null`, with a note saying why.
- **`lines`**, by line id: `opened` (when the service began), `sources`, `flags`, `notes`, and
  `route_from` `{segment: {from, note}}`, where the line began to use a stretch later than both
  opened (the J into the Market St subway in 1981).
- **`points`**, by station name: `opened` and `sources`, for a station that opened apart from its
  track (BART's Embarcadero, 1976). Other stations borrow the date of the track they stand on, for
  display only (decision 4).
- **`dates`**, by segment id: a whole present segment dated as it is, with no cut (BRT lanes).
- **In the past era, present track draws in the mode of the year.** Where past lines use it
  (decision 13), `build.py` (`mode_spans`) splits its drawing into spans: the past line's mode while
  it ran (`past-draw`, `span: 1`), today's mode for the rest (`present-draw`). A present line's
  **`earlier_mode`** `{mode, to, note}` does the same for a line that changed mode itself: Muni's J,
  K, L, M and N draw as streetcars until their Metro service began (1980–81, Callwell).
- **Dates come from official sources only,** as for the future era; a dataset may place a cut point.
  An agency's date announced before the day counts, and the notes say it was announced. Tests check
  both rules and that every null stretch says why.
- **Track older than the service on it is a past fact.** Where a stretch opened before its line's
  own `opened` (Caltrain's 1863–64 track, under Caltrain from 1980), its date may come from any
  citable source but Wikipedia, as in the past era; so may the route of a stretch with no date.
- **A station borrows its track's date only if the track is no older than its lines' service,**
  so Caltrain's stations show from 1980, not 1863.

## Modes

The map colors and filters by group. The hue is the group's, and width is a second channel (see the
theme's `transit.widths`).

| `mode` | Examples | Filter group |
|---|---|---|
| `rapid_transit` | BART, eBART | Heavy rail |
| `railroad` | CP, SP, WP, NWP, SN mainlines, State Belt (past only; today's freight is basemap context) | Heavy rail |
| `commuter_rail` | Caltrain, ACE, SMART, SP Peninsula commute service | Commuter rail |
| `intercity_rail` | Capitol Corridor, San Joaquins, Zephyr, Starlight, high-speed rail | Commuter rail |
| `interurban` | Key System trains, IER Red Trains, SN electric, Peninsular, P&SR | Interurban |
| `streetcar` | horsecar, steam dummy, electric streetcar (see `traction`), today's F and E | Streetcar |
| `cable` | every cable line | Cable |
| `light_rail` | Muni Metro, VTA light rail | Light rail |
| `people_mover` | SFO AirTrain, BART's Oakland Airport line | Light rail |
| `ferry` | every ferry route | Ferry |
| `brt` | Van Ness BRT, Tempo, VTA's Alum Rock BRT: only where buses have center or median lanes (decision 3). The agency's source names the corridor, and OpenStreetMap's lane tags give where the lanes run (decision 9). | BRT |
| `heritage` | Niles Canyon, Napa Valley Wine Train, Western Railway Museum | Heritage (off by default) |

## Future lines

- Future facts come from **official sources only**, as in BAM: public agencies, their adopted plans,
  hearing records, permits and GIS.
- Every future line needs at least one `official` source, a `status_as_of` and a `last_verified`.
- `npm test` fails when any future line was last verified more than 90 days ago. The routine:
  `make checklists` writes `docs/checks/future.md`, each line with its status, its last check and the
  day it falls due. Re-verify a line against the agency's own pages, then update its entry in
  `data/future/verified.json` and run `make future-sync app-data checklists`.
- `data/future/verified.json` is hand-kept: per line id, `status`, `status_as_of`, `expected_opening`
  (null when no official source states one), `last_verified`, `sources[]` (citations into
  `data/sources.json`, each quoting what it supports; ids not starting `bam-`) and `notes`.
  `bam_sync` applies it over BAM's translated stage and drops `status_unverified`, and
  `expected_opening_unsourced` once a date is cited. A line it doesn't list keeps BAM's.
- With no published alignment, a project has no geometry. It appears only in the list and the
  panel, as BAM does for Link21.

## Ideal network (Phase 4)

The future era has two layers: A, what's being built (`data/future/`), and B, the ideal network.
Layer B starts from a **reference layer** of serious proposals, which Matthew designs his own
network from. Nothing in layer B is generated: the reference layer records what each document
proposes, and Matthew's network holds only the lines he picks.

**The reference layer, `data/ideal/<proposal>/`,** is built like the other eras (this refines the
flat `ideal/reference/<proposal>.geojson` of the plan, so that proposals sharing a corridor share
one stroke): `segments.geojson` for the corridors as the documents describe them, `lines.json` for
each proposed line, and optionally `points.geojson` for named stations. The folder is the proposal.
Each line has `era: "ideal"`, `status: "proposed"`, and:

| Field | Rule |
|---|---|
| `proposal_id` | The folder's name. |
| `proposed_by` | Who proposed it, as the document names them (for example "SFCTA", "SPUR"). |
| `document` | The source id of the document that proposes it; the line cites it in `sources[]` too. |
| `year` | The document's date. |
| `proposal_status` | How far the proposal has gone (`vocabulary.json`, `proposal_statuses`): `adopted` (in an adopted plan), `study` (under study by a public agency), `advocacy` (proposed by a group outside government), `superseded` or `withdrawn`. `adopted` and `study` need an `official` source. |
| `status_as_of` | When `proposal_status` was last checked. |

- Proposals are facts about documents: a document says what it proposes, so it is the source for
  that, whoever published it (`type`: `official` for public agencies, `primary_document` for others).
- **Geometry follows the ladder.** A path traced from a document's georeferenced map is
  `digitized`; one rebuilt from the document's words along today's streets or track is
  `approximate` (drawn dashed), and `geometry_method` says which words and which streets. Where a
  document publishes no path, such as a new tube under the bay, the line has no segment drawn
  for that stretch, and the panel says so.
- On the map, proposals are drawn thinner (`theme.transit.proposals`) and only when "Show proposals"
  is on (`?proposals=1`). They are never on the year slider. Three looks are open for Matthew
  (`?proposalstyle=translucent`, `tint` or `neutral`).
- A recipe may also place stations a document names by cross street (`points`): where today's
  street crosses the corridor, or the nearest point to a street ending within 40 m of it.

**Matthew's network, `data/ideal/network.geojson`,** is hand-editable, or exported from the
in-browser editor (Phase 4b), and checked against `data/schema/network.schema.json`. Each feature is
a line, with `id`, `name`, `mode`, `based_on[]` (the reference proposals or proposal lines it draws
on; empty for his own), `notes` and `author`. It holds only what Matthew draws.

`make app-data` turns each of its lines into an ideal-era line (`ideal-network-<id>`, status
`ideal`) on one segment of its own, with `geometry_confidence: designed` (a design, not a surveyed
or reconstructed path; no authored segment may use it). In the future era it draws at full
strength with its own toggle, "Show Matthew's network" (`?network=0` hides it), shown once the
file has lines; its panel says what each line is based on.
