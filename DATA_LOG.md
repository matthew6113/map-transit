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

Opening dates aren't in GTFS. `data/present/extensions.json` adds them by stretch, from official
sources, and cuts each line into shared, dated segments at build time (docs/SCHEMA.md, "Today's
network, dated"). Every system now has what official sources give (Phase 2b). What's left is in
`docs/checks/present.md` and below; it stays `opened_unsourced` and off the year slider unless its line
has a date to lend (decision 4).

### Opening dates of today's network (official sources)

| | |
|---|---|
| Status | In use. BART: 24 segments, all dated. Muni: 34 segments; the K's Ocean Ave, the L's Taraval St and the F's Market St track is older than today's service and not yet dated. Capitol Corridor: its track from West Oakland to Suisun dated by stretch from the Northern Railway's openings of 1876–79 and the bridge of 1930, from Melrose to Niles from the Western Pacific's of 1869, and from Centerville by Newark to Santa Clara from the South Pacific Coast's of 1878–82 (past sources). SMART: its track dated stretch by stretch from the San Francisco & North Pacific's openings of 1870–85 (past sources, as for Caltrain), with SMART's own service from 2017, 2019 and 2025. VTA: Tasman East and the Capitol line, plus Mountain View and Winchester stations; the Guadalupe trunk, Tasman West and Vasona are undated. Caltrain: dated from July 1, 1980, when Caltrans took over; its track by stretch, from the San Francisco & San Jose Railroad (October 1863 and January 16, 1864), the Bayshore Cutoff (December 8, 1907) and San José's line of December 31, 1935, plus Gilroy service (1992) and three stations. Its approach to 4th & King and the Santa Cruz branch through Diridon are older track not yet dated. Line openings for ACE, the Capitol Corridor, the Zephyr, the Gold Runner, the AirTrain and ten ferry routes; BRT lanes on Van Ness, International Blvd and Alum Rock. |
| Origin | Hand-entered in `data/present/extensions.json`, with quotes. BART: its annual reports (1973–74, 1974–75, 2003), 1973 and 1974 news releases, 1947–1991 chronology, 1997 report to Congress, 2020 timeline and project pages, under https://www.bart.gov/ (scanned PDFs, cited by PDF page); VTA's BART Silicon Valley page; Alameda CTC. Muni: Robert Callwell, *Transit in San Francisco: A Selected Chronology, 1850–1995* (Muni, 1999), on SFMTA's archive, cited by PDF page; SFMTA's short-range transit plans (2005, 2008), history, historic streetcar, cable car and Central Subway pages, its blog, and the Van Ness BRT notice. Others: the CPUC's 2011 safety review of VTA and VTA's timeline; Caltrain's milestones pages (to 1979, the 1980s and the 1990s); SMART's 2022 release and December 2019 general manager's report; the Golden Gate Ferry timeline; SF Bay Ferry's history; ACE; the Capitol Corridor's timeline; Amtrak's media site and Great American Stations; AC Transit's Tempo release; an SFCTA/TIMMA memo; MTC's news posts. |
| Cut points | GTFS stations and stops (511). Street corners from Overture roads: Taraval St and 33rd Ave, Tasman Dr at I-880, Capitol Ave at Hostetter Rd and Alum Rock Ave. The Duboce portal, where Overture's rail tunnel flags end (`overture-rail-2026-09-23-1`). Caltrain's junctions with its older lines: Seventh St and 16th St and San Bruno (where the 1950 USGS San Francisco sheets draw the old line meeting today's track), Polhemus Street and San Carlos Street in San José (the 1943 USGS San Jose sheet). |
| License | Public agency records, cited for facts. Geometry stays GTFS (511's terms). |
| Older track | Where a stretch is older than the service on it today (Caltrain's 1863–1935 track), its date is a past fact and may come from any citable source but Wikipedia: the 1864–65 San Francisco business directory, the San Francisco Call of 1907 and the Southern Pacific Bulletin of 1936, as well as Caltrain's milestones. |
| Gaps | Quotes from BART's scanned PDFs come from their machine-read text; Matthew should check them against the page images (`docs/checks/present.md`). Dates an agency announced beforehand are used and noted (decision of Oct 14). Undated: the Coast Starlight, Harbor Bay, Oakland & Alameda, Triangle and Angel Island–Tiburon ferries; VTA's Guadalupe trunk, Tasman West and Vasona track; Caltrain's approach to 4th & King and the Santa Cruz branch from Polhemus Street to San Carlos Street. |

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

The Phase 2a pilot: the Key System, the Southern Pacific's Red Trains / Interurban Electric Railway,
and the Bay Bridge railway (`data/past/key-system/`, `sp-east-bay/`, `bay-bridge/`). Phase 2b adds San
Francisco's cable lines (`sf-cable/`), Muni's first streetcar lines (`sf-muni/`), the San Francisco & San Jose Railroad's Peninsula trains (`sp-peninsula/`) and the first historic ferries (`ferries/`, and the Key Route ferry in `key-system/`), the Northwestern Pacific's electric lines in Marin (`nwp-marin/`), and the Sacramento Northern from Oakland to Bay Point (`sacramento-northern/`). Phase 2c draws the Sacramento Northern on to the Yolo County line (`sacramento-northern/` and, from OpenHistoricalMap, `ohm-sacramento-northern/`). It adds Market St's steam dummy, its first cable lines and the Fillmore Hill counterbalance to `sf-cable/`. The Key System's E line joins `key-system/`. The Southern Pacific's Eighteenth Street and Webster Street lines join `sp-east-bay/`. The Market Street Railway's numbered lines, as Manley's report of 1909 and O'Shaughnessy's of 1929 list them street by street, are in `sf-msry/`: `routes.json` gives each line's streets, and `transit_pipeline.street_routes` cuts them into shared street segments (`make past`). The East Bay's local streetcar lines, as the Railroad Commission's orders of 1931–48 describe them, are in `eb-streetcars/`, the same way. The Southern Pacific's Oakland, Alameda and Creek Route ferries and the Richmond–San Rafael ferry join `ferries/`. The North Pacific Coast is in `north-pacific-coast/`: its own line over the Northwestern Pacific's electric track from Sausalito to San Anselmo (decision 21), then OpenHistoricalMap's ways to the Russian River, checked on the USGS sheets of 1897–1945. The San Mateo interurban (No. 40) joins `sf-msry/`, its streets in San Francisco and San Mateo cut by `street_routes`, with its private right of way from Daly City to San Mateo from OpenHistoricalMap in `sf-san-mateo/`. The San Francisco & North Pacific and the Northwestern Pacific's trains to Eureka are in `sf-north-pacific/`, on SMART's track where it runs (decision 13) and on OpenHistoricalMap's ways beyond it. The Central Pacific's trains to Sacramento by the Benicia train ferry (1879–1930) and by Niles Canyon and the Altamont Pass (1869–1941), and to San José by Milpitas (1869–1940), are in `central-pacific/`; the South Pacific Coast from Alameda to the Santa Cruz County line is in `south-pacific-coast/`; the California Pacific's Napa Valley line and its Vallejo Junction ferry are in `california-pacific/`; the Martinez–Benicia auto ferry joins `ferries/`, over the Capitol Corridor's track, which is now dated by stretch from the Northern Railway's openings (1876–79) and the Martinez–Benicia bridge (1930). Every past
record cites its sources in `data/sources.json`; the research behind them, with quotes, conflicts
and open items, is in `docs/research/`. The open checks for Matthew are in `docs/checks/past.md`
(`make checklists`).

### Past-era sources (cited for facts)

| Source | Type | License |
|---|---|---|
| California Railroad Commission and CPUC decisions, 1916–1957 (`crc-d*`, `cpuc-d*`), from files.cpuc.ca.gov | official | California public records; cited for facts. Whether state documents are public domain is an open question for Matthew. |
| Street Railway Journal (1904, 1906; including the North Shore Railroad's third-rail line, January 2, 1904), Railroad Gazette (1907), the Journal of Electricity, Power and Gas (1912), the Commercial & Financial Chronicle (1913), Railway Age Gazette (1912), Electric Railway Journal (1911, 1912), from archive.org | journal | Public domain (published before 1929) |
| The San Francisco Call (1907, 1911) and the Oakland Tribune (1904–1924), via Chronicling America and archive.org | primary_document | Public domain (published before 1929) |
| *The Western Railroader*, August 1945 (railfan periodical), from archive.org | journal | Copyright status unknown; cited for facts only (one date, the Sacramento Northern's last day) |
| San Francisco directories: the *Business Directory and Mercantile Guide* for 1864–65 and Langley's directory of 1867, from archive.org | primary_document | Public domain (published 1864, 1867) |
| *Southern Pacific Bulletin*, January 1936 (California State Railroad Museum scan on archive.org) | primary_document | Copyright status unknown; cited for facts only |
| HAER CA-32 (Bay Bridge) and CA-164 (IER Bridge Yard Shop), Library of Congress | official | Public domain (U.S. Government work) |
| National Park Service, San Francisco Maritime National Historical Park: Hyde Street Pier history | official | Public domain (U.S. Government work) |
| California Highways and Public Works (1939) | official | California public record; cited for facts |
| Railway Signaling, March 1939 | journal | Unclear (1939); cited for facts |
| Demoro, *The Key Route* (1985) | book | Copyrighted; cited for facts, page unverified (decision 11) |
| Robert Callwell, *Transit in San Francisco: A Selected Chronology, 1850–1995* (Muni, 1999), and SFMTA's cable car history page | official | Public agency publications; cited for facts |
| *History of public transit in San Francisco, 1850–1948* (City and County of San Francisco, 1948), from archive.org's OCR | official | Public record; cited for facts. Its quotes need checking against the page images. |
| Halley's *Centennial Year Book of Alameda County* (1876) and the *History of Alameda County* (M. W. Wood, 1883), from archive.org's OCR text | book | Public domain (published 1876, 1883). Their quotes need checking against the page images. |
| *Southern Pacific Bulletin*, November–December 1930 (California State Railroad Museum scan on archive.org) | primary_document | Copyright status unknown; cited for facts only (decision 19) |
| Palmer's *History of Napa and Lake Counties* (1881) and *Poor's Manual* of 1880, from archive.org's OCR text | book | Public domain (published 1880–81). Their quotes need checking against the page images. |
| Munro-Fraser's histories of Marin and Sonoma Counties (Alley, Bowen, 1880), the Board of Railroad Commissioners' tenth annual report (1889) and first biennial report (1894) and *Poor's Manual of Railroads* (1885, 1887, 1900), from archive.org's OCR text | book, official | Public domain (published 1880–1900). Their quotes need checking against the page images. |
| HABS CA-1888 (Southern Pacific Mole & Pier), Library of Congress catalog record | official | Public domain (U.S. Government work) |
| *California Highways and Public Works*, September–October 1956 | official | California public record; cited for facts |
| Warren Manley, *Report on the operation of the street railroad lines of San Francisco* (Merchants' Association, February 1, 1909), from archive.org's OCR text | primary_document | Public domain (published 1909). Its quotes need checking against the page images, which this environment can't open. |
| Muni's financial reports (1912–1930), O'Shaughnessy's *Report on the street railway transportation requirements of San Francisco* (1929) and the San Francisco PUC's reports (1947–1953), from archive.org | official | Public records; cited for facts, read on the page images |

The geometry tools are below (decision 12).

### USGS Historical Topographic Map Collection

| | |
|---|---|
| Status | In use for tracing and checking past geometry (decision 12). Fetched Oct 14, 2026 by `make past`. |
| Origin | `https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/`, chosen from the HTMC index (`StagedProducts/Maps/Metadata/topomaps_all_legacy.zip`, `topomaps_all.csv`). Each sheet is pinned in `data/usgs-sheets.json` (file, URL, SHA-256, size, CRS) and registered in `data/sources.json` as a `primary_map`. |
| License | Public domain (U.S. Government work). |
| Georeferencing | By USGS, to each sheet's neatline, NAD27 polyconic. Shifted to WGS84 with NOAA's NADCON grid (below). Checked against today's streets on Oct 14: the 1:24,000 sheets of 1947–49 fall within a few metres; the 15-minute sheets of 1895–1915 are off by tens of metres and drawn at 1:62,500 (streets about 30 m wide), so traces from them are corrected locally with control points and carry a larger `est_error_m`. The 1943 San Jose 15-minute sheet falls within about 30 m in downtown San José. The San Mateo sheets (1899, 1915) and the San Jose sheet of 1899 were fetched for the Peninsula line but not traced: the 1950 San Francisco South and 1943 San Jose sheets still draw its old track, and the 1899 San Jose sheet is off by several hundred metres. The 1941 Tamalpais 15-minute sheet (aerial photographs of 1939) falls within about 30 m of today's streets from Mill Valley to San Rafael, by the same street-matching check, so Marin's electric lines are traced from it uncorrected. |
| Gaps | The 15-minute sheets show railroads on their own right-of-way, not street railways in the street. Reprints (a later imprint year) are skipped unless they are the only scan. |

| Source id | File | m a pixel | SHA-256 (first 12) |
|---|---|---|---|
| `usgs-concord-1897` | CA_Concord_297157_1897_62500_geo.tif | 5.292 | `b7f81ad3986f` |
| `usgs-concord-1915` | CA_Concord_297163_1915_62500_geo.tif | 5.292 | `c15e2699616d` |
| `usgs-concord-1942` | CA_Concord_465521_1942_62500_geo.tif | 5.292 | `bc6ab6bfdabb` |
| `usgs-oakland-east-1949` | CA_Oakland East_293613_1949_24000_geo.tif | 2.032 | `c458649ad474` |
| `usgs-oakland-west-1949` | CA_Oakland West_293623_1949_24000_geo.tif | 2.032 | `ce44edbc1b54` |
| `usgs-richmond-1949` | CA_Richmond_294669_1949_24000_geo.tif | 2.032 | `9112f971428f` |
| `usgs-san-francisco-1899` | CA_San Francisco_298890_1899_62500_geo.tif | 5.292 | `fed0096205c5` |
| `usgs-san-francisco-1915` | CA_San Francisco_298897_1915_62500_geo.tif | 5.292 | `2faaad04375c` |
| `usgs-san-francisco-south-1950` | CA_San Francisco South_300067_1950_24000_geo.tif | 2.032 | `e4c69e7c91ca` |
| `usgs-san-jose-1899` | CA_San Jose_298900_1899_62500_geo.tif | 5.292 | `589c29aab28b` |
| `usgs-san-jose-1943` | CA_San Jose_466308_1943_62500_geo.tif | 5.292 | `54f2629b7369` |
| `usgs-san-mateo-1899` | CA_San Mateo_298921_1899_62500_geo.tif | 5.292 | `b5164e60d1be` |
| `usgs-san-mateo-1915` | CA_San Mateo_298922_1915_62500_geo.tif | 5.292 | `f648bf5144d5` |
| `usgs-tamalpais-1941` | CA_Tamalpais_301788_1941_62500_geo.tif | 5.292 | `e8b2a9b5bf73` |
| `usgs-walnut-creek-1949` | CA_Walnut Creek_301186_1949_24000_geo.tif | 2.032 | `77c7663e774d` |
| `usgs-port-chicago-1951` | CA_Port Chicago_294325_1951_24000_geo.tif | 2.032 | `51be4bd5938a` |
| `usgs-san-leandro-1948` | CA_San Leandro_300123_1948_24000_geo.tif | 2.032 | `736d4e9ccd87` |
| `usgs-honker-bay-1918` | CA_Honker Bay_296168_1918_31680_geo.tif | 2.682 | `63a8636eacb3` |
| `usgs-honker-bay-1953` | CA_Honker Bay_291408_1953_24000_geo.tif | 2.032 | `2aebec44aa88` |
| `usgs-birds-landing-1953` | CA_Birds Landing_288442_1953_24000_geo.tif | 2.032 | `b1354c7dac09` |
| `usgs-dozier-1952` | CA_Dozier_290036_1952_24000_geo.tif | 2.032 | `88b9ba333b31` |
| `usgs-tamalpais-1897` | CA_Tamalpais_298980_1897_62500_geo.tif | 5.292 | `b1004563c202` |
| `usgs-petaluma-1914` | CA_Petaluma_298523_1914_62500_geo.tif | 5.292 | `8527e7c2264c` |
| `usgs-point-reyes-1916` | CA_Point Reyes_466171_1916_48000_geo.tif | 4.064 | `fe63937cf3f3` |
| `usgs-sebastopol-1935` | CA_Sebastopol_301575_1935_48000_geo.tif | 4.064 | `fe6029fb913f` |
| `usgs-duncans-mills-1945` | CA_Duncans Mills_296063_1945_31680_geo.tif | 2.682 | `c781bde4be85` |
| `usgs-cazadero-1945` | CA_Cazadero_302658_1945_31680_geo.tif | 2.682 | `da9f6fa9d8d7` |
| `usgs-montara-mountain-1949` | CA_Montara Mountain_293071_1949_24000_geo.tif | 2.032 | `3dcb383b93fb` |
| `usgs-san-mateo-1949` | CA_San Mateo_300158_1949_24000_geo.tif | 2.032 | `0deb7839d441` |
| `usgs-san-quentin-1948` | CA_San Quentin_300194_1948_24000_geo.tif | 2.032 | `96d5efa56ec6` |
| `usgs-san-rafael-1954` | CA_San Rafael_300201_1954_24000_geo.tif | 2.032 | `12d0fec9d0f3` |
| `usgs-healdsburg-1940` | CA_Healdsburg_297672_1940_62500_geo.tif | 5.292 | `a80bddd854fd` |
| `usgs-asti-1959` | CA_Asti_288086_1959_24000_geo.tif | 2.032 | `627539aa3ad5` |
| `usgs-cloverdale-1960` | CA_Cloverdale_289371_1960_24000_geo.tif | 2.032 | `c59f618c99ba` |
| `usgs-karquines-1898` | CA_Karquines_297860_1898_62500_geo.tif | 5.292 | `85c0c3d48a80` |
| `usgs-benicia-1952` | CA_Benicia_288320_1952_24000_geo.tif | 2.032 | `fc85d0208b27` |
| `usgs-niles-1953` | CA_Niles_293546_1953_24000_geo.tif | 2.032 | `ea533197d873` |
| `usgs-la-costa-valley-1953` | CA_La Costa Valley_291950_1953_24000_geo.tif | 2.032 | `64aacdd91628` |
| `usgs-livermore-1953` | CA_Livermore_292401_1953_24000_geo.tif | 2.032 | `49f21b204286` |
| `usgs-altamont-1953` | CA_Altamont_287935_1953_24000_geo.tif | 2.032 | `227003fee77f` |
| `usgs-midway-1953` | CA_Midway_292938_1953_24000_geo.tif | 2.032 | `98a93e167555` |
| `usgs-milpitas-1953` | CA_Milpitas_292969_1953_24000_geo.tif | 2.032 | `733e5adf7332` |
| `usgs-los-gatos-1919` | CA_Los Gatos_298061_1919_62500_geo.tif | 5.292 | `d7dfaf400d1a` |
| `usgs-san-jose-west-1953` | CA_San Jose West_300105_1953_24000_geo.tif | 2.032 | `797624721dd4` |
| `usgs-mare-island-1916` | CA_Mare Island_298113_1916_62500_geo.tif | 5.292 | `576cf0a203ea` |
| `usgs-cuttings-wharf-1951` | CA_Cuttings Wharf_289712_1951_24000_geo.tif | 2.032 | `2d36e11c075a` |
| `usgs-napa-1951` | CA_Napa_293422_1951_24000_geo.tif | 2.032 | `bef57728fcc7` |
| `usgs-yountville-1951` | CA_Yountville_301469_1951_24000_geo.tif | 2.032 | `c9428b96a808` |
| `usgs-rutherford-1951` | CA_Rutherford_294860_1951_24000_geo.tif | 2.032 | `4606f3e1899a` |
| `usgs-st-helena-1945` | CA_St Helena_298977_1945_62500_geo.tif | 5.292 | `a5919128217d` |
| `usgs-calistoga-1945` | CA_Calistoga_296981_1945_62500_geo.tif | 5.292 | `3b437a92a9e9` |
| `usgs-cordelia-1951` | CA_Cordelia_289511_1951_24000_geo.tif | 2.032 | `5e91acd236b3` |
| `usgs-fairfield-south-1949` | CA_Fairfield South_290434_1949_24000_geo.tif | 2.032 | `4174b070619e` |
| `usgs-las-trampas-ridge-1947` | CA_Las Trampas Ridge_292167_1947_24000_geo.tif | 2.032 | `12f165eada70` |
| `usgs-diablo-1953` | CA_Diablo_289931_1953_24000_geo.tif | 2.032 | `cc0c424ed2d6` |
| `usgs-mt-diablo-1898` | CA_Mt Diablo_298277_1898_62500_geo.tif | 5.292 | `131ad0f00447` |
| `usgs-vine-hill-1959` | CA_Vine Hill_301163_1959_24000_geo.tif | 2.032 | `382dfe8a0bf5` |
| `usgs-petaluma-1953` | CA_Petaluma_294061_1953_24000_geo.tif | 2.032 | `db5c6ed8813c` |
| `usgs-two-rock-1954` | CA_Two Rock_301038_1954_24000_geo.tif | 2.032 | `7a522bc95b0b` |
| `usgs-cotati-1954` | CA_Cotati_289550_1954_24000_geo.tif | 2.032 | `391e619d0558` |
| `usgs-sebastopol-1954` | CA_Sebastopol_300394_1954_24000_geo.tif | 2.032 | `e29789030665` |
| `usgs-santa-rosa-1954` | CA_Santa Rosa_300294_1954_24000_geo.tif | 2.032 | `29504600fc63` |
| `usgs-camp-meeker-1954` | CA_Camp Meeker_288861_1954_24000_geo.tif | 2.032 | `898f19ff2944` |
| `usgs-santa-rosa-1916` | CA_Santa Rosa_298959_1916_62500_geo.tif | 5.292 | `6f916d06382b` |
| `usgs-calistoga-1927` | CA_Calistoga_465408_1927_62500_geo.tif | 5.292 | `70617308c21b` |
| `usgs-mare-island-1942` | CA_Mare Island_465907_1942_62500_geo.tif | 5.292 | `08217109a6a8` |
| `usgs-sonoma-1942` | CA_Sonoma_301738_1942_62500_geo.tif | 5.292 | `5b07e0968b21` |
| `usgs-antioch-1908` | CA_Antioch_296717_1908_62500_geo.tif | 5.292 | `6860a040bccc` |
| `usgs-jersey-1910` | CA_Jersey_296187_1910_31680_geo.tif | 2.682 | `d7dc4c6ac5a5` |
| `usgs-brentwood-1914` | CA_Brentwood_295948_1914_31680_geo.tif | 2.682 | `be02f04ec82d` |
| `usgs-woodward-island-1913` | CA_Woodward Island_296614_1913_31680_geo.tif | 2.682 | `38bc3da04aac` |

### NOAA NADCON grid (NAD27 to WGS84)

| | |
|---|---|
| Status | In use, to place the USGS sheets (`usgs_topo.py`). |
| Origin | `us_noaa_conus.tif` from OSGeo's PROJ-data (`https://raw.githubusercontent.com/OSGeo/PROJ-data/master/us_noaa/us_noaa_conus.tif`; cdn.proj.org is blocked from the cloud container). SHA-256 `44611d823c48e5347500ee6afe40ff33d2b88cf817bf59f705ed4a4c3bd687d7`, pinned in the code. Cached in `data/raw/proj/`. |
| License | Public domain (NOAA), redistributed by PROJ-data under its open license. |
| Accuracy | About 5 m (EPSG transformation "NAD27 to WGS 84 (79)"). Without it, PROJ falls back to a 10–20 m approximation, so the step stops instead. |

### Overture Maps roads (street centerlines)

| | |
|---|---|
| Status | In use, for past lines that a source places on a named street (`streets.py`, decision 12). |
| Origin | Overture Maps transportation segments (subtype `road`, named), release 2026-09-23.1, the same release as BAM's basemap, in four boxes: the East Bay (-122.36, 37.70, -122.15, 37.93), and, added in Phase 2b, San Francisco (-122.52, 37.70, -122.355, 37.835), Milpitas and north San José (-121.98, 37.33, -121.83, 37.45), southern Marin (-122.60, 37.845, -122.45, 38.02) and central Contra Costa (-122.22, 37.82, -121.88, 38.05), where they check the USGS sheets' registration, and, added in Phase 2c, Richmond (-122.40, 37.90, -122.28, 37.98), Burlingame and San Mateo (-122.36, 37.555, -122.31, 37.59) and Santa Rosa (-122.78, 38.415, -122.69, 38.45). Read anonymously from S3 and cached in `data/raw/overture/`. Source id `overture-roads-2026-09-23-1`. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. A segment routed along these centerlines is derived from them, so it carries ODbL too, and the source is credited in its panel. |
| Gaps | These are today's centerlines. A street that has moved since (a freeway cut, a widening, a renaming such as Grove St to Martin Luther King Jr Way) is checked on the USGS sheet of the period, and traced from it where it differs. Divided roads come out along one carriageway. |

### Overture Maps land and water (ferry courses)

| | |
|---|---|
| Status | In use, for past ferry routes whose sources give only their terminals (`water.py`). |
| Origin | Overture Maps base theme, release 2026-09-23.1: coastline-derived land polygons (subtype `land`) and water polygons (ocean, river, water, canal, lake) in the box -122.66, 37.45, -121.85, 38.33. Read anonymously from S3 and cached in `data/raw/overture/`. Source id `overture-base-2026-09-23-1`. |
| Method | Rasterized at 40 m. A ferry's line is the shortest path over water between its terminals, costing four times as much within 120 m of land (so it keeps mid-channel), simplified and smoothed. Always `approximate` (dashed): a schematic, not the course steered. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. |
| Gaps | Today's shores. Land filled since the 1850s (San Francisco's waterfront, the Oakland and Alameda moles, Treasure Island) is land here, so a terminal on fill is joined straight to the nearest water. |

### Overture Maps rail (today's track)

| | |
|---|---|
| Status | In use, for past lines on track still in place where no better map is traced (`rails.py`): the Napa Valley line, the California Pacific to Suisun, the Santa Fe from Bay Point to Richmond, the Sonoma Valley's lines (where OpenStreetMap maps their abandoned grades, class `unknown`), and the Petaluma & Santa Rosa, whose abandoned line OpenStreetMap still maps (class `unknown`, named "Petaluma and Santa Rosa Railroad"; a recipe's `names` keeps to those ways). |
| Origin | Overture Maps transportation theme, release 2026-09-23.1, segments of subtype `rail` in the boxes `napa` (-122.62, 38.06, -122.03, 38.60) `sonoma` (-122.92, 38.22, -122.62, 38.50) and `santafe` (-122.42, 37.82, -121.55, 38.07). Read anonymously from S3 and cached in `data/raw/overture/`. Source id `overture-rail-2026-09-23-1`. |
| Method | The shortest path over today's rail network between two points, each snapped onto it (within 150 m); `surveyed`. Checked against the USGS sheets of the line's years; where today's track was moved (as at Yountville), the old line is traced from the sheet instead. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. |
| Gaps | Today's track only: realignments since the line's years must be found on the sheets. |

### OpenHistoricalMap

| | |
|---|---|
| Status | In use since Oct 15, 2026 (Phase 2c), the first rung of the geometry ladder. |
| Origin | `https://overpass-api.openhistoricalmap.org/api/interpreter` (Overpass), read by `python -m transit_pipeline.ohm fetch`: every way tagged `railway`, every ferry route and the route relations in the pan limits, as of `timestamp_osm_base` 2026-10-15T00:15:59Z (1,064 ways, 61 relations). Cached in `data/raw/ohm/region.json`; source id `ohm-2026-10-15`. |
| License | CC0 1.0 (public domain dedication). Every segment drawn from it names its OHM way ids in its geometry method and its source note. |
| How it's used | Geometry only (`surveyed`): a trace recipe's `ohm` part chains the ways it names (`ohm route` finds them). OHM's dates are crowd-sourced, so they are pointers; dates come from the cited histories, and where they disagree, the primary source wins and the record is flagged `conflicting_sources`. Each segment is checked on a USGS sheet of its period (review images in `docs/screenshots/p2c/traces/`). |
| Overrides | `data/past/ohm.json` (hand-kept): OHM operators mapped to this map's systems and modes, the ways that duplicate segments traced here, and the ways skipped. `python -m transit_pipeline.ohm survey` writes `docs/checks/ohm.md`: every way as drawn, a duplicate (with its distance from ours), today's track, outside the nine counties, skipped or unused. |
| Cross-check | Where OHM and this map traced the same track, the medians agree within 1–12 m for Muni's Geary, Van Ness and Chestnut St lines, 15–31 m for the Sacramento Northern in the Oakland hills and the NWP in Marin, and 19–57 m elsewhere (`docs/checks/ohm.md`). |
| Drawn from it | The Sacramento Northern from West Pittsburg to Mallard, and from Chipps Island to the Yolo County line (`data/past/ohm-sacramento-northern/`). |
| Gaps | OHM has nothing yet for the Key System or the Interurban Electric Railway. Many of its ways were traced by its mappers from the 15-minute USGS sheets of 1895–1915, which are off by tens to hundreds of metres; those are checked or corrected before use. Its San Mateo interurban relation (2800853) follows the 1892 route in San Francisco, not the later one. |

### Overture Maps divisions (the Bay Area's boundary)

| | |
|---|---|
| Status | In use since Oct 15, 2026, for decision 16. |
| Origin | Overture Maps divisions theme (`division_area`, county), release 2026-09-23.1: the land and territorial-water areas of the nine counties in `src/basemap/region.json`, joined and simplified to about 10 m into `data/bay-area.geojson` by `python -m transit_pipeline.counties register`. Read anonymously from S3 and cached in `data/raw/overture/`. Source id `overture-divisions-2026-09-23-1`. |
| License | ODbL 1.0, © OpenStreetMap contributors and Overture Maps Foundation. |
| Used for | Cutting past lines that leave the region at the county line (`"clip": "county"` in a trace recipe), and the test that a line marked `continues_beyond` reaches the map's edge or, in the past era, that line. |

### Other candidates

| Source | Status | Notes |
|---|---|---|
| OpenStreetMap: `railway=abandoned`, `razed`, `disused`; `abandoned:railway` | Candidate | ODbL. Overpass and Geofabrik are blocked from the cloud container, so this runs in GitHub Actions unless Matthew allowlists `overpass-api.de`. |
| U.S. DOT NTAD North American Rail Network | Candidate | Public domain. Out-of-service arcs; BAM's `ntad_rail.py` fetches it. |
| USGS Historical Topographic Map Collection | In use | See above. |
| Library of Congress railroad and Sanborn maps | Candidate | Public domain (pre-1929). |
| David Rumsey Map Collection and Allmaps georeferences | Candidate, fallback only (decision 7) | The scans are CC BY-NC-SA 3.0 (https://davidrumsey.com/about; https://purl.stanford.edu/xh235dd9059). Non-commercial use only; adaptations take the same license; commercial republication needs permission from rumseymapcenter@stanford.edu. Credit: "David Rumsey Map Collection, David Rumsey Map Center, Stanford Libraries." Used only where no USGS or Library of Congress map shows the line, and every feature traced from one is tagged with this license. |
| Demoro, *The Key Route*; Ford, *Red Trains in the East Bay*; Sappers; Western Railway Museum; Market Street Railway; cable-car-guy.com | Candidate | Dates and text routings. The printed books may need page citations from Matthew. |

<!-- coverage:start -->
| Era | Lines | Segments | Points | km surveyed | km digitized | km approximate | Undated segments | Borrowed dates |
|---|---|---|---|---|---|---|---|---|
| past | 127 | 550 | 11 | 684.4 | 590.0 | 123.0 | 8 | 503 |
| present | 44 | 139 | 275 | 1676.8 | 0 | 0 | 12 | 48 |
| future | 6 | 14 | 17 | 10.5 | 21.7 | 111.0 | 0 | 0 |

Open flags: `closed_unsourced` 543, `conflicting_sources` 29, `expected_opening_unsourced` 6, `geometry_unverified` 6, `license_unclear` 46, `needs_manual_digitizing` 7, `opened_unsourced` 842, `page_unverified` 1, `status_unverified` 6.
<!-- coverage:end -->
