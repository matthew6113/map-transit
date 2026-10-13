# Data log

Every dataset this map uses: where it came from, its license, when it was fetched, and its known
gaps. Update this file in the same commit as any data change. The coverage table at the bottom is
rewritten by `make app-data`.

Status key: **in use** is drawn on the map; **checked** was used only to check other data;
**candidate** is planned for a later phase and not yet fetched.

## Basemap

### BAM's built basemap

| | |
|---|---|
| Status | In use. |
| Origin | `https://matthew6113.github.io/BAM/generated/`, the build of [matthew6113/BAM](https://github.com/matthew6113/BAM) as deployed on Oct 13, 2026. BAM's source was read at commit `9600699`. |
| Contents | 110 files, 277 MB, listed with SHA-256s in `basemap.lock.json` (snapshot id `830e7d00280d`). Tiles: `base.pmtiles` (region mask, water, shoreline, context roads, rail and ferries); building footprints for the overview and for z13, z14 and z15; city and water labels; Libre Franklin and Megaprojects Serif fonts with SDF glyphs. |
| License | Map data © OpenStreetMap contributors and Overture Maps Foundation (release 2026-09-23.1), ODbL 1.0. Building footprints also from Microsoft and Esri Community Maps contributors. Fonts under the SIL Open Font License; the OFL texts are copied with them. See BAM's `data/CREDITS.md`. |
| How to refresh | `make basemap-refresh`, then review the diff of `basemap.lock.json`. |
| Gaps | Context rail carries no names or operators. Abandoned, disused and under-construction track was filtered out in BAM's pipeline. |

## Present era

### BART GTFS feed

| | |
|---|---|
| Status | In use (Phase 0 preview). |
| Origin | `https://www.bart.gov/dev/schedules/google_transit.zip`, which redirected to `google_transit_20260810-20270108_v02.zip`. Fetched Oct 13, 2026. SHA-256 `affdc4d7…` (full value in `data/present/feeds.json`). Its `feed_info` says version 72, valid Jan 12 to Aug 30, 2026, which doesn't match the file name. |
| License | BART Developer License Agreement: https://www.bart.gov/schedules/developers/developer-license-agreement |
| Used for | 6 lines (Yellow, Orange, Green, Red, Blue, Oakland Airport) and 50 stations. Each line is drawn from the shape most of its trips run, simplified to 3 m. |
| Gaps | GTFS has no opening dates, so every BART line and station is `opened_unsourced` (null) and stays off the year slider until Phase 2 sources dates by extension. Each line is one segment, so shared track isn't split into dated segments yet. |

### 511.org regional feed

| | |
|---|---|
| Status | Candidate (Phase 1). |
| Origin | `https://api.511.org/transit/datafeeds?operator_id=RG`. Needs Matthew's API key in `TRANSIT_511_API_KEY`; the key is never committed. Rate limit 60 requests per hour. |
| License | To check: the 511 SF Bay Open Data terms. |

### Amtrak national GTFS

| | |
|---|---|
| Status | Candidate (Phase 1). |
| Used for | The Zephyr, Starlight and San Joaquins. Clipped at the map's pan limits. |

## Future era

### Bay Area megaprojects line records

| | |
|---|---|
| Status | In use. |
| Origin | `data/projects.json` and `data/lines/*.geojson` from matthew6113/BAM at commit `9600699ae10affa5787c1a73374c34a5fa8e4b41`, read by `make future-sync`. Each record was last verified Oct 7–8, 2026, from official sources only. |
| Lines | BART Silicon Valley Phase II, The Portal, CAHSR SF–SJ, Valley Link, SMART Healdsburg and SMART Cloverdale. 14 segments and 17 stations. |
| Licenses (per line, as BAM recorded them) | **VTA GIS** (BART SV II): no license stated, flagged `license_unclear`. **TJPA status report** (Portal): traced facts; the PDF isn't redistributed. **NTAD rail network** (CAHSR, SMART): public domain. **Valley Link board packet and SEIR figures**: traced facts; georeferenced on OpenStreetMap (ODbL). **County of Sonoma GIS**: CC BY-SA 3.0 US. **SMART's station layer**: no license stated, flagged `license_unclear`. **Caltrain GTFS stations**: Caltrain developer license. **BTS National Transit Map**: CC BY 3.0 US. |
| Gaps | Statuses are translated from BAM's stages (`docs/DECISIONS.md`) and flagged `status_unverified` until Phase 3 re-checks them. Expected openings aren't recorded yet. The CAHSR alignment is NTAD's Caltrain centerline, which is approximate and drawn dashed. |

## Past era

No past-era data yet. Phase 2 pilots the Key System and the SP Red Trains / Interurban Electric
Railway.

### OpenHistoricalMap

| | |
|---|---|
| Status | Candidate (Phase 2). |
| Origin | `https://overpass-api.openhistoricalmap.org/` |
| License | CC0, public domain. |
| Coverage | An Overpass count over BAM's bbox on Oct 13, 2026 found 1,061 railway ways, 1,059 with `start_date` and 552 with `end_date`. Operators include Sacramento Northern (152 ways), Southern Pacific, South Pacific Coast (with a dated branch chronology, 1876–1998), North Pacific Coast, SF & North Pacific, the San José horsecar lines and United Railroads. There are dated Muni A–H route relations. **There is nothing yet for the Key System or the Interurban Electric Railway.** |

### Other candidates

| Source | Status | Notes |
|---|---|---|
| OpenStreetMap: `railway=abandoned`, `razed`, `disused`; `abandoned:railway` | Candidate | ODbL. Overpass and Geofabrik are blocked from the cloud container, so this runs in GitHub Actions unless Matthew allowlists `overpass-api.de`. |
| U.S. DOT NTAD North American Rail Network | Candidate | Public domain. Out-of-service arcs; BAM's `ntad_rail.py` fetches it. |
| USGS Historical Topographic Map Collection | Candidate | Public domain, already georeferenced, 1890s onward. Source for `digitized` geometry. |
| Library of Congress railroad and Sanborn maps | Candidate | Public domain (pre-1929). |
| David Rumsey Map Collection and Allmaps georeferences | Candidate, fallback only (decision 7) | The scans are CC BY-NC-SA 3.0 (https://davidrumsey.com/about; https://purl.stanford.edu/xh235dd9059). Non-commercial use only; adaptations take the same license; commercial republication needs permission from rumseymapcenter@stanford.edu. Credit: "David Rumsey Map Collection, David Rumsey Map Center, Stanford Libraries." Used only where no USGS or Library of Congress map shows the line, and every feature traced from one is tagged with this license. |
| Demoro, *The Key Route*; Ford, *Red Trains in the East Bay*; Sappers; Western Railway Museum; Market Street Railway; cable-car-guy.com | Candidate | Dates and text routings. The printed books may need page citations from Matthew. |

<!-- coverage:start -->
| Era | Lines | Segments | Points | km surveyed | km digitized | km approximate | Undated segments | Borrowed dates |
|---|---|---|---|---|---|---|---|---|
| past | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| present | 6 | 6 | 50 | 394.1 | 0 | 0 | 6 | 0 |
| future | 6 | 14 | 17 | 10.5 | 21.7 | 111.0 | 0 | 0 |

Open flags: `expected_opening_unsourced` 6, `license_unclear` 15, `opened_unsourced` 62, `status_unverified` 6.
<!-- coverage:end -->
