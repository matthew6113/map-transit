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

The lines are built by `make present`: `pipeline/transit_pipeline/gtfs.py`, with `osm_lanes.py` for BRT.

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
| Status | In use. The pipeline reads `TRANSIT_511_API_KEY` from the environment or `.env`; the key is never committed or logged, and the stored URL has it stripped. |
| Origin | `https://api.511.org/transit/datafeeds?operator_id=RG` (with `api_key`), fetched Oct 13, 2026: 57 MB, SHA-256 `7b3665119162…` (in full in `data/present/feeds.json`). Its `feed_info` gives no version or dates. Rate limit 60 requests per hour. |
| License | The 511 Data Disseminator Agreement (https://511.org/sites/default/files/pdfs/511_Data_Agreement_Final.pdf, last modified May 2019). See below. |
| Used for | BART (6 lines, 50 stations), Muni (J, K, L, M, N, T, the F and three cable car lines; 13 subway stations), Caltrain, VTA light rail (Blue, Green, Orange), SMART, ACE, the SFO AirTrain (11 stations), 14 ferry routes from Golden Gate Ferry, San Francisco Bay Ferry, Angel Island–Tiburon Ferry and Treasure Island Ferry (decision 5), and the routes of the three BRT corridors (decision 3). Amtrak-run trains, the Capitol Corridor included, come from Amtrak's feed instead. |
| Gaps | The Gold Runner isn't in 511's feed (nor Amtrak's); it comes from its own feed (below). Muni's E line isn't in the current feed. VTA's special-event services are left out. |
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
| Gaps | The Gold Runner (the San Joaquins, renamed Nov 3, 2025) isn't in Amtrak's national feed, nor in 511's. It comes from its own feed (below). |

### Gold Runner (Amtrak San Joaquins) GTFS feed

| | |
|---|---|
| Status | In use since Oct 14, 2026. |
| Origin | The feed Trillium Solutions publishes for Amtrak San Joaquins, read from the Mobility Database's mirror (feed `mdb-2295`, `storage.googleapis.com/.../us-california-amtrak-san-joaquins-gtfs-2295.zip`), fetched Oct 14, 2026: 122 KB, SHA-256 `9964232c8aad…` (in full in `data/present/feeds.json`). The producer's own URL (`data.trilliumtransit.com/gtfs/sanjoaquins-ca-us/`) is blocked from the build environment. |
| Version | `feed_info`: "UTC: 26-Nov-2025 18:19", valid Nov 26, 2025 to **June 30, 2026, so it has expired.** The service still runs, and the track it draws hasn't changed, so the geometry and stations stand. Refresh it from the producer once `data.trilliumtransit.com` is reachable. |
| License | **None stated** (`feed_license` is empty), and no terms were found from the agency, so its features are flagged `license_unclear`, like Amtrak's. **Open item for Matthew.** |
| Used for | The Gold Runner: one line (`intercity_rail`), Oakland Jack London Square to Stockton and Sacramento inside the map ("continues beyond the map to Bakersfield"), and 9 stations. Thruway buses are left out. |

### BART GTFS feed

| | |
|---|---|
| Status | Not in use since Oct 13, 2026: BART comes from 511. The pipeline falls back to this feed only when there's no 511 key and no 511-built BART data. |
| Origin | `https://www.bart.gov/dev/schedules/google_transit.zip`, which redirected to `google_transit_20260810-20270108_v02.zip`, fetched Oct 13, 2026. Its `feed_info` says version 72, valid Jan 12 to Aug 30, 2026, which doesn't match the file name. |
| License | BART Developer License Agreement: https://www.bart.gov/schedules/developers/developer-license-agreement |
| Used for | Phase 0's BART preview: 6 lines (Yellow, Orange, Green, Red, Blue, Oakland Airport) and 50 stations. |

### SFO AirTrain (Overture Maps)

| | |
|---|---|
| Status | Retired Oct 13, 2026: the AirTrain now comes from 511's feed (its "SFO Airport" operator), with its stations. |
| Origin | Overture Maps transportation segments, release 2026-09-23.1: the 36 `monorail`-class segments around SFO. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. |

### OpenStreetMap bus lanes, for BRT (decision 9)

| | |
|---|---|
| Status | In use. Fetched Oct 13, 2026; OSM data as of 2026-10-13T23:08Z to 23:20Z (`timestamp_osm_base`, in `sources.json`). |
| Origin | Overpass API (`https://overpass-api.de/api/interpreter`): ways tagged `highway=busway`, or with any `busway*`, `bus:lanes*`, `psv:lanes*`, `lanes:bus*` or `lanes:psv*` tag, in each BRT route's bbox padded by about 100 m; and the roads named as the agencies' lane limits (Mission St, Lombard St, N 34th St, Muirfield). Each query and its response are cached in `data/raw/osm/brt-*.json`, with the response's `timestamp_osm_base`. |
| License | ODbL 1.0, © OpenStreetMap contributors. |
| Used for | Where Van Ness BRT (Muni 49; 3.2 km), Tempo (AC Transit 1T; 9.3 km) and the Alum Rock BRT (VTA Rapid 522; 2.2 km) run in center or median lanes. The routes come from the 511 feed. |
| Agency sources | SFMTA's Van Ness project page and VTA's Rapid 522 schedule name their lane limits, and OSM agrees with both: Van Ness's lanes end 15 m from Mission St and 3 m from Lombard St, and Alum Rock's 70 m from N 34th St and 173 m from Muirfield Dr. AC Transit doesn't name Tempo's. |
| Gaps | Ways whose tags don't say which lane is the bus lane are printed for review, not drawn. One is on Tempo's route: 11th St, way 1056371791. |

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
| present | 44 | 44 | 275 | 2167.4 | 0 | 0 | 44 | 0 |
| future | 6 | 14 | 17 | 10.5 | 21.7 | 111.0 | 0 | 0 |

Open flags: `expected_opening_unsourced` 6, `license_unclear` 50, `opened_unsourced` 363, `status_unverified` 6.
<!-- coverage:end -->
