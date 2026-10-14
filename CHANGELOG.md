# Changelog

Data changes, newest first. Code changes are in the git log.

## 2026-10-14: Phase 2a, the past-era pilot

- **The Key System** (`data/past/key-system/`): the 1903 pier, its approach and subway, and lines
  A (12th Street), B (22nd Street), C (Piedmont), F (Berkeley) and H (Sacramento Street), with the
  pier terminal and two stations. The E (Claremont) and G (Westbrae) lines aren't drawn yet: the
  sources don't place their routes.
- **The Southern Pacific's Red Trains / Interurban Electric Railway** (`data/past/sp-east-bay/`):
  the Shattuck Avenue, Ninth Street, Seventh Street, Encinal Avenue and Lincoln Avenue lines, the
  Oakland and Alameda moles, and four stations. Their opening dates aren't sourced to a primary
  source yet, so they don't show on the year slider.
- **The Bay Bridge railway** (`data/past/bay-bridge/`), 1939–1958: the Transbay Terminal loop, the
  bridge's lower deck, the East Bay approach and the Interurban's lead to 26th Street, and the
  Transbay Terminal.
- In all, 10 lines, 46 segments (74 km traced from a map or along a street, 9 km approximate) and
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
