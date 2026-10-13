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
| Contents | 110 files, 279 MB, listed with SHA-256s in `basemap.lock.json` (snapshot id `c58e3ba99831`). Tiles: `base.pmtiles` (region mask, water, shoreline, context roads, rail and ferries); building footprints for the overview and for z13, z14 and z15; city and water labels; Libre Franklin and Megaprojects Serif fonts with SDF glyphs. |
| License | Map data © OpenStreetMap contributors and Overture Maps Foundation (release 2026-09-23.1), ODbL 1.0. Building footprints also from Microsoft and Esri Community Maps contributors. Fonts under the SIL Open Font License; the OFL texts are copied with them. See BAM's `data/CREDITS.md`. |
| How to refresh | `make basemap-refresh`, then review the diff of `basemap.lock.json`. |
| Gaps | Context rail carries no names or operators. Abandoned, disused and under-construction track was filtered out in BAM's pipeline. |

## Present era

The lines are built by `make present`: `pipeline/transit_pipeline/gtfs.py` and `overture.py`.

How each line's geometry is made:
- It covers every shape its trips run, longest first.
- It keeps only the parts more than 25 m from track already kept, and joins each branch to the track
  it leaves.
- It's simplified to 3 m and clipped at the map's pan limits.
- A line that runs past those limits records where it goes on to (`continues_beyond`).

Opening dates aren't in GTFS. Every present line and station is `opened_unsourced` (null) and stays
off the year slider until Phase 2 sources dates by extension (decision 4). Each line is still one
segment, so lines that share track overlap.

### 511.org regional feed

| | |
|---|---|
| Status | Waiting for the API key (Phase 1). The pipeline reads `TRANSIT_511_API_KEY` from the environment or `.env`; the key is never committed or logged. |
| Origin | `https://api.511.org/transit/datafeeds?operator_id=RG` (with `api_key`). Rate limit 60 requests per hour. |
| License | The 511 Data Disseminator Agreement (https://511.org/sites/default/files/pdfs/511_Data_Agreement_Final.pdf, last modified May 2019). See below. |
| Will cover | BART, Muni Metro and the F, E and cable cars, Caltrain, VTA light rail, SMART, ACE, the Gold Runner if 511 carries it, every ferry operator (decision 5), and the BRT corridors (decision 3). Amtrak-run trains come from Amtrak's feed instead. |
| **Action for Matthew** | Within 30 days of the site's launch, email developerresources@511.org a link or screenshots of the map (section 2.g). |

What the agreement allows: use, copying, storing, distribution, derivative works and public display
(section 1).

What it requires:
- **Credit:** "data provided by 511.org" or "powered by 511.org", linked to http://www.511.org and
  near the data (5.b). The map shows it in the credit line, collapsed or open, whenever a 511 line is
  loaded.
- **Branding:** no "511" in the product's name (5.c), and no agency trademarks or logos (2.e, 5.d).
- **Sales:** the data can't be sold as received (2.b).
- **Currency:** the information should be kept reasonably current (2.a).

### Amtrak national GTFS

| | |
|---|---|
| Status | In use. |
| Origin | `https://content.amtrak.com/content/gtfs/GTFS.zip`, fetched Oct 13, 2026: feed version 20261013, valid Oct 14–20, 2026. SHA-256 in `data/present/feeds.json`. |
| License | None stated in the feed, and none found on Amtrak's site, so every Amtrak feature is flagged `license_unclear`. **Open item for Matthew.** |
| Used for | Capitol Corridor (San José to Auburn), California Zephyr ("continues beyond the map to Chicago Union Station") and Coast Starlight (to Los Angeles and Seattle): 3 lines and 18 stations. Thruway buses are left out. |
| Gaps | **The Gold Runner (the San Joaquins, renamed Nov 3, 2025) isn't in Amtrak's national feed.** Next, check whether 511 carries it. |

### BART GTFS feed

| | |
|---|---|
| Status | In use as the fallback for BART until the 511 key arrives. After that, BART comes from 511. |
| Origin | `https://www.bart.gov/dev/schedules/google_transit.zip`, which redirected to `google_transit_20260810-20270108_v02.zip`, fetched Oct 13, 2026. Its `feed_info` says version 72, valid Jan 12 to Aug 30, 2026, which doesn't match the file name. |
| License | BART Developer License Agreement: https://www.bart.gov/schedules/developers/developer-license-agreement |
| Used for | 6 lines (Yellow, Orange, Green, Red, Blue, Oakland Airport) and 50 stations. |

### SFO AirTrain (Overture Maps)

| | |
|---|---|
| Status | In use. |
| Origin | Overture Maps transportation segments, release 2026-09-23.1 (the same as BAM's basemap), read from `s3://overturemaps-us-west-2`. It covers the rail segments in a box around SFO, cached in `data/raw/overture/`. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. |
| Used for | One line: the 36 `monorail`-class segments around SFO (most named "SFO AirTrain"), merged into the guideway. Its Red and Blue lines are service patterns on the same guideway. |
| Gaps | No stations yet, since Overture's segments carry no stops. Opening date not sourced. |

### OpenStreetMap bus lanes, for BRT (decision 9)

| | |
|---|---|
| Status | Not fetched yet. Needs `overpass-api.de` in the environment's allowed domains, and the 511 key for the routes. |
| Origin | Overpass API (`https://overpass-api.de/api/interpreter`): ways tagged `highway=busway`, or with any `busway*`, `bus:lanes*`, `psv:lanes*`, `lanes:bus*` or `lanes:psv*` tag, in each BRT route's bbox padded by about 100 m. Each query and its response are cached in `data/raw/osm/brt-<line>.json`, with the response's `timestamp_osm_base`. |
| License | ODbL 1.0, © OpenStreetMap contributors. |
| Used for | Where Van Ness BRT (Muni 49), Tempo (AC Transit 1T) and the Alum Rock BRT (VTA Rapid 522) run in center or median lanes. The routes come from the 511 feed. |
| Agency sources | SFMTA's Van Ness project page and VTA's Rapid 522 schedule name their lane limits, and the pipeline checks OSM against them. AC Transit doesn't name Tempo's. |
| Gaps | Ways whose tags don't say which lane is the bus lane are printed for review, not drawn. |

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
| present | 10 | 10 | 68 | 1241.4 | 0 | 0 | 10 | 0 |
| future | 6 | 14 | 17 | 10.5 | 21.7 | 111.0 | 0 | 0 |

Open flags: `expected_opening_unsourced` 6, `license_unclear` 39, `opened_unsourced` 88, `status_unverified` 6.
<!-- coverage:end -->
