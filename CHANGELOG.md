# Changelog

Data changes, newest first. Code changes are in the git log.

## 2026-10-14: Phase 2b, the Sacramento Northern to Bay Point

- **The Oakland, Antioch & Eastern / Sacramento Northern** (`data/past/sacramento-northern/`):
  through trains from the Key Route pier (from 1939 the Bay Bridge) by 40th St, Shafter Ave, Lake
  Temescal, Montclair, Shepherd Canyon and the Redwood Peak tunnel to Moraga, Lafayette, Walnut Creek,
  Concord and Bay Point, April 7, 1913 to June 30, 1941. Traced from the 1942–1951 USGS sheets, while
  the track still carried freight; the canyon and tunnel are approximate. East of Bay Point (to
  Sacramento, by ferry) isn't drawn yet.
- The Key System's 40th St segment is split at Shafter Ave, where the two met.

## 2026-10-14: Phase 2b, Muni's C, D, F and H

- **C Geary–California** (1915), **D Van Ness–Union** (1914–1950), **F Stockton** (1914–1951) and
  **H Van Ness–Potrero** (1914–1950), on the streets of O'Shaughnessy's 1929 report, with their route
  changes dated from Muni's and the PUC's reports. The Stockton Street Tunnel is its own segment
  (1914–1951). The C's end isn't sourced yet (only a planned date in 1950).
- The E now turns by Vallejo St and Van Ness Ave from July 22, 1919; Geary is split at Van Ness Ave
  and 2nd Ave where the D and C leave it.

## 2026-10-14: Phase 2b, Marin's electric lines

- **The Northwestern Pacific's third-rail lines** (`data/past/nwp-marin/`), built by the North Shore
  Railroad: Sausalito–San Rafael by Mill Valley Junction, the Alto tunnel, Corte Madera, Larkspur,
  Ross and San Anselmo (October 17, 1903), and the Mill Valley branch (August 21, 1903), to March
  1, 1941 (Street Railway Journal, 1904; CRC Decision No. 34457). Traced from the 1941 USGS
  Tamalpais sheet, drawn while the line ran, and the 1950 sheet along Sausalito's waterfront.
- The Sausalito ferry terminal now belongs to the railroad and lists its lines.

## 2026-10-14: Phase 2b, the first historic ferries

- **The Key Route ferry** from its pier to the Ferry Building, 1903–1939, and **the Hyde
  Street–Sausalito auto ferry**, 1922–1938 (`data/past/ferries/`), with its terminals traced off
  the 1950 USGS sheet. Courses are drawn over water between the terminals and dashed: the sources
  give the terminals, not the course.

## 2026-10-14: Phase 2b, Muni's streetcar years

- Today's J, K, L, M and N now draw as streetcar lines in the past era until their weekday Metro
  service began: the N on February 18, 1980, the K on June 11, 1980, the L and M on December 17,
  1980 and the J on June 17, 1981 (Callwell). A new `earlier_mode` on present lines in
  `extensions.json` does this.

## 2026-10-14: Phase 2b, Muni's first streetcar lines

- **A Geary–10th Ave** (1912–1932), **B Geary** (1912–1956) and **E Union** (1913–1947), from
  Callwell's chronology, in `data/past/sf-muni/`. The B runs from the Ferry Building over today's F
  track on Market St, now cut at 1st St and Kearny St (decision 13), until March 21, 1949. The E
  follows the Presidio & Ferries' route as the city bought it in 1913.
- The Union St cable segment is split at Larkin and Franklin Sts, where the E's streetcars turned
  off Union St.

## 2026-10-14: Phase 2b, the San Francisco & San Jose Railroad

- **Caltrain's track dated by stretch,** from the papers of the day where it is older than Caltrain:
  San Bruno to Mayfield (October 1863), Mayfield to San José (January 16, 1864), the Bayshore Cutoff
  (December 8, 1907) and San José's line of December 31, 1935. Caltrain itself dates from July 1,
  1980, when Caltrans took over the Peninsula Commute Service.
- **The Peninsula trains** (`data/past/sp-peninsula/`), 1863–1980: the San Francisco & San Jose
  Railroad, then the Southern Pacific. Before 1907 they left the city by Division St, the Mission,
  the Bernal Cut and Ocean View, traced from the 1899 and 1950 USGS sheets; in San José they ran into
  the Market Street station until 1935 (the 1943 sheet). They run over today's Caltrain track
  (decision 13).
- **The Ocean View line,** the local trains left on the old line after 1907. When they stopped
  (1928–30) isn't sourced yet.
- Stations of today's network borrow their track's date only when the track is no older than their
  line's service, so Caltrain's stations no longer appear in 1863.
- Research: `docs/research/early-railroads.md`.

## 2026-10-14: Phase 2b, San Francisco's cable lines

- **Ten cable lines that left no present line** (`data/past/sf-cable/`), 1873–1956: the Clay
  Street Hill Railroad, Sutter St, the California St line west of Van Ness, O'Farrell–Jones–Hyde, the
  Jones St shuttle, Washington–Jackson, Sacramento–Clay, Geary St, Union St and Castro St. 24
  street segments, drawn along today's centerlines and checked on the 1950 USGS sheet.
- Dates from Muni's 1999 chronology (Callwell) and SFMTA; routes from Callwell and the city's 1948
  transit history. Washington–Jackson and O'Farrell–Jones–Hyde run over today's Powell, Jackson,
  Washington and Hyde St track (decision 13).
- Research and open questions: `docs/research/sf-street-railways.md`.

## 2026-10-14: Phase 2b, the rest of today's network dated

- **SMART** by stretch: Sonoma County Airport–San Rafael (August 25, 2017), San Rafael–Larkspur
  (December 14, 2019), Windsor (May 2025), and two infill stations.
- **VTA:** Tasman East (May 2001, June 2004) and the Capitol line (June 2004), cut at the road
  crossings the CPUC names; Mountain View (1999) and Winchester (2005) stations; the Alum Rock BRT
  lanes (2017).
- **Caltrain:** Gilroy service from July 1, 1992, over the older Southern Pacific line; the San
  Francisco terminal (1975), Diridon (1935) and Tamien (1992).
- **Line openings:** ACE (1998), the Capitol Corridor (1991), the California Zephyr (1983), the Gold
  Runner as the San Joaquins (1974), the SFO AirTrain (2003), four Golden Gate Ferry routes
  (1970–2021) and five SF Bay Ferry routes (1986–2024), and the Treasure Island ferry (2022).
- **BRT lanes:** Van Ness (April 1, 2022) and Tempo (August 9, 2020).
- Dates an agency announced beforehand now count, with a note (Matthew's decision): the Central
  Subway opens on November 19, 2022, and West Dublin/Pleasanton on February 19, 2011.

## 2026-10-14: Phase 2b, today's network dated (BART and Muni)

- **BART** is cut into 24 shared, dated segments, from MacArthur–Fremont (September 11, 1972) to
  Warm Springs–Berryessa (June 13, 2020), so it grows in on the year slider. BART's colors share
  their track as one stroke each. Embarcadero (1976) and West Dublin/Pleasanton (2011) carry their
  own dates; other stations take their track's.
- **Muni** is cut into 34 segments: the J (1917), the Twin Peaks Tunnel (1918), the M (1925), the N
  and Sunset Tunnel (1928), the Market St subway (1980), the J's and M's extensions (1980, 1991), the
  Muni Metro Extension (1998), the T (2007), the Central Subway (2023), the F's Embarcadero extension
  (2000), and the cable car lines (1878–1891). Line openings for the J, K, L, M, N, T, F and the
  three cable car lines.
- Dates come from the agencies' own records only: BART's reports, releases and timeline, and Muni's
  1999 chronology and SFMTA's plans and pages (`data/present/extensions.json`, with quotes).
- Not yet dated: the track under the K on Ocean Ave, the L on Taraval St and the F on Market St,
  which is older than today's service; and the other present systems.

## 2026-10-14: Phase 2a, the past-era pilot

- **The Key System** (`data/past/key-system/`): the 1903 pier, its approach and subway, and lines
  A (12th Street), B (22nd Street), C (Piedmont), F (Berkeley) and H (Sacramento Street), with the
  pier terminal and two stations. The E (Claremont) and G (Westbrae) lines aren't drawn yet: the
  sources don't place their routes.
- **The Southern Pacific's Red Trains / Interurban Electric Railway** (`data/past/sp-east-bay/`):
  the Shattuck Avenue, Ninth Street, Seventh Street, Encinal Avenue and Lincoln Avenue lines, the
  Oakland and Alameda moles, and four stations. Openings from the San Francisco Call and the
  Electric Railway Journal (1911): Encinal Avenue June 1, Seventh Street December 1 (to Melrose),
  Lincoln Avenue December 19 (as announced), Shattuck Avenue December 23. The Ninth Street line's
  opening (planned for February 3, 1912) isn't confirmed, so it stays off the year slider.
- **The Bay Bridge railway** (`data/past/bay-bridge/`), 1939–1958: the Transbay Terminal loop, the
  bridge's lower deck, the East Bay approach and the Interurban's lead to 26th Street, and the
  Transbay Terminal.
- In all, 10 lines, 45 segments (74 km traced from a map or along a street, 9 km approximate) and
  8 points. Dates come from Railroad Commission and CPUC decisions, the Street Railway Journal,
  Railway Age Gazette, Electric Railway Journal, the San Francisco Call, the Oakland Tribune, HAER
  records and California Highways and Public Works. One book page (Demoro p. 104) is cited
  second-hand and flagged.

## 2026-10-14: Phase 1 close-out

- **The Gold Runner,** from its own GTFS feed (Amtrak San Joaquins, via the Mobility Database's
  mirror): one line and 9 stations, continuing beyond the map to Bakersfield. The feed is the
  Nov 26, 2025 version, which has expired; it's flagged `license_unclear`.
- The present era is now 44 lines and 275 stations.

## 2026-10-13: Phase 1, with the 511 key

- **511's regional feed** (SHA-256 `7b366511…`, fetched Oct 13): BART, Muni (J, K, L, M, N and T;
  the F; three cable car lines), Caltrain, VTA (Blue, Green, Orange), SMART, ACE, the SFO AirTrain,
  and 14 ferry routes from four operators (Golden Gate Ferry, San Francisco Bay Ferry, Angel
  Island–Tiburon Ferry, Treasure Island Ferry).
- **BRT** on its center or median lanes (decision 9): Van Ness (Muni 49), Tempo (AC Transit 1T) and
  Alum Rock (VTA Rapid 522), from OpenStreetMap via Overpass.
- **The SFO AirTrain** now comes from 511, with its 11 stations. The Overture version is gone.
- **BART** now comes from 511, and its own feed's record was dropped.
- **Not in the feeds:** the Gold Runner (the San Joaquins) is in neither 511's nor Amtrak's feed, and Muni's E line isn't in 511's current feed.
- The present era has 43 lines and 266 stations, ferry terminals included.

## 2026-10-13: Phase 1 (without the 511 key)

- **Basemap re-pinned** as snapshot `c58e3ba99831` (110 files, 279 MB). BAM's files are unchanged
  since the Phase 0 snapshot; that snapshot's lock recorded two building tiles (z14 and z15) that the
  container's proxy had cut short, so a complete download never matched it. Downloads now check every
  file's length and retry.
- **Amtrak.** Three lines from Amtrak's national GTFS (version 20261013), clipped at the map's
  edge:
  - Capitol Corridor
  - California Zephyr, which continues to Chicago
  - Coast Starlight, which continues to Los Angeles and Seattle

  Plus 18 stations. All are flagged `license_unclear`.
- **SFO AirTrain** from Overture Maps (2026-09-23.1), as one people-mover line.
- **BART** is rebuilt with the new coverage rule, so its lines now include their airport branches.

## 2026-10-13: Phase 0

- **Basemap.** BAM's deployed basemap was snapshotted into `basemap.lock.json` (110 files, 277 MB,
  snapshot id `830e7d00280d`). BAM's source was read at `9600699`.
- **Future.** Six lines imported from BAM at `9600699`:
  - BART Silicon Valley Phase II (under construction)
  - The Portal, environmental
  - CAHSR SF–SJ, environmental
  - Valley Link, environmental
  - SMART Healdsburg, funded
  - SMART Cloverdale, environmental

  The statuses are translated from BAM's stages and flagged `status_unverified` until Phase 3.
- **Present (preview).** Six BART lines and 50 stations from BART's GTFS feed, SHA-256 `affdc4d7…`.
  Opening dates aren't sourced yet.
