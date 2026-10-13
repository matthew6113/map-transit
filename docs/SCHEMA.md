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

- `<era>-draw.geojson`: one feature per segment. These are the visible strokes.
- `<era>-lines.geojson`: one feature per line × segment use, oriented in route order. These are used
  for hovering, selecting and drawing the line during the flight.
- `<era>-points.geojson`: stations and other points.
- `catalog.json`: every line, with its sources resolved, for the panel and the list.

## Where files live

```
data/
  schema/          line, segment, point and source schemas; vocabulary.json
  sources.json     every source, cited by id
  systems.json     operating systems and companies (Key System, SP, BART, Muni...)
  <era>/<group>/   lines.json, segments.geojson, points.geojson
                   era is past, present or future; group is a system or a generator,
                   e.g. future/bam (from BAM), present/bart (from GTFS), past/key-system
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
| `georeference` | For `digitized` geometry: the map, transform, control points and RMS, in the shape BAM's `Similarity.report()` produces. |
| `flags[]` | What is still open. `opened_unsourced`, `closed_unsourced`, `expected_opening_unsourced`, `status_unverified`, `geometry_unverified`, `needs_manual_digitizing`, `conflicting_sources`, `license_unclear`. |
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
- A line's `route[]` entry can narrow its use of a segment with `from` and `to`, as when a line ran
  over a bridge only from 1939 to 1958.

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

**Route:** `route[]`, each entry `{segment, from?, to?, note?}`, in route order.

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
| `brt` | Van Ness BRT, Tempo, VTA's Alum Rock/Santa Clara segment: only where buses have dedicated center or median lanes (decision 3) | BRT |
| `heritage` | Niles Canyon, Napa Valley Wine Train, Western Railway Museum | Heritage (off by default) |

## Future lines

- Future facts come from **official sources only**, as in BAM: public agencies, their adopted plans,
  hearing records, permits and GIS.
- Every future line needs at least one `official` source, a `status_as_of` and a `last_verified`.
- `npm test` fails when any future line was last verified more than 90 days ago. Re-verify it
  against official sources (Phase 3 sets up the routine), then update `last_verified`.
- With no published alignment, a project has no geometry. It appears only in the list and the
  panel, as BAM does for Link21.

## Ideal network (Phase 4)

These files are added in Phase 4:

- `ideal/reference/<proposal>.geojson`: `proposal_id`, `proposed_by`, `document`, `year` and
  `proposal_status`, plus the provenance fields.
- `ideal/network.geojson`: Matthew's own network, hand-editable. Fields are `id`, `name`, `mode`,
  `based_on[]` (reference proposal ids), `notes` and `author`.
