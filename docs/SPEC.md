# Spec

This is the approved Phase 0 plan, condensed. `docs/DECISIONS.md` records choices as they're made, and
`docs/SCHEMA.md` covers the data.

## The three eras

The era switcher sits under the title.

### Past

- **Year slider and play button.** The slider runs from 1850 to today, and the play button sweeps it
  in about 20 seconds at 1×, with 0.5× and 2× options.
- **Lines appear and fade.** A line appears the year it opened and fades out over the two years after
  it closed. Segments carry their own dates, because lines were extended, cut back and rerouted.
- **The slider includes today's network,** so BART grows in once its segments have sourced dates.
- **Reduced motion:** play steps a decade at a time, with no fades.
- **Undated segments:** a segment with no sourced dates borrows its line's dates, drawn lighter. One
  with nothing to borrow stays off the slider and is listed in the slider's note (decision 4).

### Present

- **The major network,** with no standard local buses:
  - BART, including eBART and the Oakland Airport line
  - Muni Metro, the Central Subway, the F and E lines and the cable cars
  - Caltrain, VTA light rail, SMART, ACE, the Capitol Corridor and Amtrak
  - SF Bay Ferry, Golden Gate Ferry and SFO AirTrain
  - BRT with dedicated center or median lanes (decision 3)
- **Source:** GTFS, from 511.org's regional feed plus Amtrak. Shapes come from GTFS, never drawn by
  hand.
- **Ghost toggle:** past rights-of-way drawn faintly underneath, so you can see what was lost and
  where BART and Muni follow old alignments.

### Future

**Layer A: real projects.** Each has:
- a status: planned, environmental, funded, under construction or opening;
- an as-of date, an expected opening and an official source link;
- a verification date, re-checked against official sources by web search at build time.

**Layer B: the ideal network,** designed by Matthew from a reference layer of serious proposals. It
is stored as hand-editable GeoJSON, with an in-browser editor in Phase 4b.

## Interaction

- **Era switcher, mode filters and legend.** The legend is the filter: each mode chip turns its lines
  on and off on the map and in the list. Heritage railways are off by default.
- **Hover** highlights the whole line, with a tooltip on mouse and none on touch.
- **Click** opens the line's panel and runs a short flight to it, during which the line draws itself.
  A click on shared track lists every line there.
- **The panel** shows the name, operator, mode, years, gauge and power, what happened to the line,
  how it's drawn (confidence and segments), open flags, a public-domain photo and the sources.
- **The line list** under the legend is searchable and keyboard friendly, and doubles as the
  screen-reader equivalent of the canvas.
- **Deep links:** `/l/{line-id}`, `?era=`, `?year=`, `?ghost=1`, `#map=`. There is a static page per
  line for link previews.
- **Layout:** 2D by default, with a 3D tilt. Panels become a bottom sheet below 720 px. Works on
  mobile Safari.
- **Static site** on GitHub Pages, with BAM's basemap served from the same origin.

## Phases (stop for Matthew's review after each)

0. **Read BAM; agree the architecture and schema; scaffold.** Shell, schema, BAM's future lines, a
   BART preview, the rendering spike, CI.
1. **Present era from GTFS.** 511's regional feed (needs Matthew's key) and Amtrak, plus BRT clipped
   to its lanes and AirTrain from OSM. This proves the styling.
2. **Past era, the long pole.**
   - The pilot is the Key System and the SP Red Trains / Interurban Electric Railway, to lock the
     workflow: the geometry ladder (OHM/OSM, then USGS/LOC/Rumsey maps, then text), dates from cited
     histories, and points (piers, moles, terminals, carbarns).
   - Then scale to every system.
   - Also add `present/extensions.json` so today's network carries opening dates.
3. **Future layer A,** with statuses verified from official sources. Solidity options are shown at the
   checkpoint.
4. **Ideal network.**
   - First a reference layer of proposals: Link21 and the second Transbay crossing, ConnectSF, SPUR,
     Seamless Bay Area, the Muni Subway Vision, Dumbarton rail, a Geary/19th Avenue subway and
     regional express rail.
   - Then a tradeoffs page for Matthew. He picks, modifies and adds lines, which go into
     `ideal/network.geojson`.
   - 4b is an in-browser editor (Terra Draw, with GeoJSON import and export).
5. **Polish.**
   - Timeline animation tuning and the ghost overlay.
   - Full panels with photos and the style panel.
   - Performance (PMTiles for the past era if it's needed), an accessibility audit and the share card.
   - WebKit e2e and deploy.

## Coverage to verify in Phase 2

The brief's list was a starting point, not a ceiling. These additions are preliminary; each is
verified before it goes in.

**Early railroads:**
- SF & San José Railroad (1863–64), including the original Mission and Bernal Cut route that the
  1907 Bayshore Cutoff replaced.
- SF & Oakland and SF & Alameda Railroads.
- The *original* 1860s Western Pacific, a Central Pacific affiliate. It's a different company from
  the 1903 WP and gets a separate id.
- North Pacific Coast.
- SF & North Pacific.
- California Pacific.

**Later railroads:**
- Santa Fe at Point Richmond, with the Ferry Point–SF ferry.
- California & Nevada Railroad.
- Oakland, Antioch & Eastern.
- SP San Ramon Branch.
- SP Dumbarton Cutoff.
- Alameda Belt Line and Oakland Terminal Railway.
- SP Napa and Calistoga branch.

**Interurbans and street railways:**
- SF, Napa & Calistoga electric line.
- Sacramento Northern and IER service over the Bay Bridge (1939–41).
- East Shore & Suburban (Richmond).
- Oakland Traction's precursors.
- SF horsecar and steam-dummy lines.
- Clay Street Hill Railroad.
- Sutro and Ferries & Cliff House lines.
- United Railroads' San Mateo interurban.
- Street railways in Santa Rosa, Petaluma and San Rafael.

**Ferries:**
- Benicia–Port Costa train ferries.
- Richmond–San Rafael and Martinez–Benicia auto ferries.
- Vallejo and Mare Island.
- SP Creek Route.
- Golden Gate Ferry Co.
- Petaluma River steamers.

**Present:**
- Heritage railways.
- Blue & Gold, Angel Island–Tiburon and Treasure Island ferries.
