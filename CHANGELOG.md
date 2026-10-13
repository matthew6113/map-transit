# Changelog

Data changes, newest first. Code changes are in the git log.

## 2026-10-13: Phase 1 (without the 511 key)

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
