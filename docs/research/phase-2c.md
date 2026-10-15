# Research: Phase 2c, what was drawn and what each system needs next

Oct 15, 2026. Phase 2c set out to draw every system on the coverage list in `docs/SPEC.md`. At first
no source page could be opened, and the five research passes left reading plans in `leads-2c/`. Once
the network allowed archive.org, files.cpuc.ca.gov and www.loc.gov, a second round of passes read the
sources themselves (`sources-2c/`), and the San Francisco and East Bay streetcars and five ferries
were drawn from them. Many streetcar lines' openings and some of their ends aren't sourced, so
decision 20 (approved at the checkpoint) draws a line for the years a source shows it
running.

## Drawn in Phase 2c

| System | What | Dates from | Geometry from |
|---|---|---|---|
| Sacramento Northern | Bay Point by West Pittsburg, the Mallard–Chipps Island train ferry, Montezuma and Rio Vista Junction to the Yolo County line (decision 16) | ERJ, Jul 12 and Sep 13, 1913; CRC Decisions 33009, 33416 (recited in 34232); on or about August 1940 (decision 17) | OpenHistoricalMap ways, checked on the 1952–53 USGS sheets; Bay Point–West Pittsburg traced from the 1953 Honker Bay sheet |
| SF Market Street Railroad | The steam dummy, 1860–1867, 3rd St out Market St and Valencia St to 16th St | Callwell pp. 4–6 | Today's F track on Market St (decision 13) and Valencia St's centerline |
| Market Street Cable Railway | The Market St trunk and Valencia St line (1883–1906), the Haight St line (1883–1906), the Castro line's run on Market St (1888–1906) | Callwell pp. 10, 21, 81; the city's 1948 transit history p. 16 | Today's F track, cut at Haight and Valencia Sts, and today's centerlines |
| Market Street Railway | The Fillmore Hill counterbalance, 1895–1941 | Callwell pp. 41, 86 | Fillmore St's centerline |
| Key System | E Claremont line, 1908–1958 | Oakland Tribune 1905 and 1912; CPUC Decisions 50731, 54669; HAER | Today's centerlines on the streets D50731 names, and the 1949 sheet where the freeway cut them |
| Southern Pacific | The Eighteenth Street line (1912–1933) and the Webster Street line in Oakland (1911–1923) | SF Call 1911, 1912; CRC Decisions 12906, 17743, 25740, 27800; the SP's 1914 employee timetable | Today's centerlines; the unsourced 18th–20th St link dashed |
| Golden Gate Ferries | The Hyde St–Berkeley ferry closes on or about August 1937 | CRC Decision 29999 (decision 17) | (already drawn) |
| East Bay streetcars (Oakland Traction's successors) | 18 lines in Oakland, Berkeley, Alameda and Richmond, street by street | The Railroad Commission's and CPUC's orders of 1931–48, each line drawn for the years its orders show it running (decision 20) | Today's centerlines (`street_routes.py`); Washington St under City Center dashed |
| Ferries | The Oakland Pier, Alameda Pier and Creek Route ferries; the SF & Alameda ferry (1864–73); Richmond–San Rafael | Halley (1876), the 1883 county history, HABS CA-1888, CRC Decisions 2624, 29338, 29999, 33445, *California Highways and Public Works* (1956) | Over water between terminals (approximate); Richmond–San Rafael from OpenHistoricalMap |
| Market Street Railway (URR in 1909) | 26 numbered and named lines, street by street | Running on February 1, 1909 (Manley) and in May 1929 (O'Shaughnessy); 17 lines' last streetcar days from the SF PUC's reports of 1945–49; openings unsourced, so drawn from the first running date (decision 20) | Today's centerlines (`street_routes.py`), today's F, N, J and K track where they shared it |
| North Pacific Coast | Sausalito to the Russian River at Monte Rio (decision 21), and its San Rafael branch | The Railroad Commissioners' tenth report (openings by stretch, 1875–77); CRC Decisions 22672 and 34457 (1930, 1933); the San Rafael branch for its running dates (decision 20) | The electric lines' track to San Anselmo, then OpenHistoricalMap's ways, checked on the sheets of 1897–1945 |

## Not drawn yet, and what each needs

"Read" means read the source itself, as the plans in `leads-2c/` list. "Trace" means hand-reading a
map; "fit" means correcting a misregistered 15-minute sheet against control points (decision 12).

### San Francisco

- **McAllister and Hayes cable lines:** opening dates rest on railfan pages; read Callwell pp. 10–13
  and the Daily Alta of 1883 and 1886.
- **United Railroads and Market Street Railway numbered lines:** 26 drawn from Manley's 1909 list
  and O'Shaughnessy's 1929 one (decision 20). 17 have their last day from the SF PUC's reports of
  1945–49. Still to do: the other lines' last days (the Railroad Commission's 1929–44 decisions); the lines whose 1909 routes use renamed
  streets (2, 5, 16, 22–25, 30, 35, and the 1909 parts of 20, 23 and 24), once a source pairs the old
  names with the new: the Board of Supervisors renamed "many streets" by Ordinances Nos. 988, 989 and
  1029 in December 1909 (*Municipal Reports* 1909–10, p. 640, archive.org `sanfranciscomuni59sanfrich`,
  which lists the old names only, Point Lobos Ave from Presidio Ave to 48th Ave among them), so the
  ordinances' text is the source to find; No. 28 and No. 29 (Rincon Hill's and Bayshore's streets have changed); the
  private rights-of-way to the beach.
- **Ferries & Cliff House line around Land's End** (1888–1925, Callwell pp. 12, 36): its dates and
  route are sourced, but the 1915 San Francisco sheet is off by up to about 150 m there and no
  1:24,000 sheet shows the line (it was gone by 1950). Needs a fit on the 1899 or 1915 sheet, or a
  map Matthew georeferences by hand.
- **Sutro Railroad, Park & Ocean:** now sourced (`sources-2c/sf-a.md`): the Sutro's franchise and
  1894 pole permit give its route, the *Street Railway Journal* its February 1, 1896 opening; the Park
  & Ocean's franchises its route, the SF PUC's 1948 report its last streetcar day (July 3, 1948, as
  the No. 7). Their private rights-of-way to Sutro Baths and along the beach need tracing.
- **San Mateo interurban (No. 40):** opened April 26, 1892 (*Street Railway Journal*), last day
  January 15, 1949 (SF PUC report 1948–49); the 1903 extension's opening isn't sourced. The private
  right-of-way to Burlingame is on the 1915 and 1939 San Mateo sheets and in OHM.
- **Muni's exposition lines I and J:** their streets aren't sourced; read Muni's 1915–16 reports.
- **Ocean Shore Railroad** (October 1907 to August 15, 1920, Callwell p. 35): OHM has its coast line,
  but traced from the 1915 San Mateo 15-minute sheet, so it needs a fit before use.

### East Bay

- **Oakland Traction / Key System streetcars:** 18 lines drawn from the Commission's orders of
  1931–48 (D40742 turned out to be a bus order). Still to do: each line's opening (franchises, the
  Tribune) and last day; lines 3, 4, 5, 7 (both the Oakland and the Berkeley 7), 26, 28 and Leona,
  whose orders don't give their whole route or whose streets are gone; the private rights-of-way
  (Piedmont, Leona, the Richmond ferry), to trace from the 1949 sheets.
- **East Shore & Suburban:** the Richmond line's 1933 route is sourced (CRC D26438) and its end
  (November 6, 1933), but not when the through line opened; the Tribune's 1904 opening names only "the
  connecting link between the old and the new towns of Richmond".
- **Key System G (Westbrae shuttle):** dated, but its private right-of-way was gone by 1949 and the
  1915 sheet needs a fit; trace it once fitted.
- **SP Fruitvale (horseshoe) line:** its opening is unsourced.
- **Sacramento Northern freight, Oakland to Lafayette, 1941–57 (decision 15):** the *Western
  Railroader* of August 1956 and the *Orinda Sun* of March 1, 1957 hold it, but the *Orinda Sun*'s
  archive.org item (`caorihs_000462` or `_000468`) has to be confirmed. The Pittsburg branch's opening
  is unsourced.
- **Alameda Belt Line, Oakland Terminal Railway:** dates rest on court opinions and federal rulings
  found only by search (`leads-2c/ferries-northbay.md`, section 7).

### Early railroads

The county histories that date them (Halley 1876, Wood 1883, the Contra Costa, Marin, Sonoma, Napa
and Solano histories of 1879–82) are now identified on archive.org and their pages confirmed
(`sources-2c/railroads.md`), with the Railroad Commissioners' reports of 1888–94, which give each
stretch's day "opened for public use"; Halley and Wood are in `sources.json`. Most of these railroads also run under today's
Capitol Corridor, ACE, Caltrain and SMART track, which would be dated by stretch as Caltrain's was
(decision 13): Central Pacific and the 1862 Western Pacific, the SF & Oakland and SF & Alameda, the
California Pacific and Napa Valley, the North Pacific Coast and SF & North Pacific (both partly in
OHM), Santa Fe at Point Richmond, the South Pacific Coast and California & Nevada, and the SP's San
Ramon, Napa and Dumbarton lines. `leads-2c/railroads.md` has the plan.

### Ferries and the North Bay

- **Benicia–Port Costa** (December 1879 to October 15, 1930, *SP Bulletin* 1930) and
  **Martinez–Benicia** (1913 to September 15, 1962, CRC D22535, *CH&PW* 1962): dated; their slips need
  a map (the 1898 Karquinez or 1916 Mare Island sheet).
- **Mare Island, the Petaluma steamers:** dates are web pointers only.
- **North Pacific Coast:** drawn to Sheridan, past Monte Rio. Still to do: Sheridan to Duncans Mills
  and up Austin Creek to Cazadero (1886), on no sheet of its years (a map to georeference by hand, such
  as the NPC's own map of about 1900 at Calisphere); its tunnels; the Mill Valley branch; the San
  Rafael & San Quentin (1870, leased 1875) and the San Quentin ferry, which OHM has from the 1895–97
  sheets.
- **Santa Rosa, Petaluma and San Rafael street railways, the Petaluma & Santa Rosa, the SF Napa &
  Calistoga:** dated only by search extracts so far.

## OpenHistoricalMap still to use

`docs/checks/ohm.md` lists, by operator, the ways not yet drawn. The largest: the Southern Pacific
(212 km), the San Francisco & North Pacific (72 km), the North Pacific Coast (91 km), the Sacramento
Northern's Pittsburg branch and a branch of about 1950 in Solano County, the United Railroads' San
Mateo line (20 km), and 665 km of unnamed ways, many of them traced by OHM's mappers from the
15-minute sheets of 1895–1915.

## For Matthew

- **Decided at the checkpoint:** decision 20 is approved, and the North Pacific Coast is drawn as its
  own line over the track it shared with the electric lines (decision 21).
- **Page-image hosts:** archive.org serves its page images from `*.us.archive.org`, which this
  environment's network policy blocks; allowing it would let the checks below be done here.
- **Page images:** every archive.org quote of this phase is from the OCR text; the page images can't
  be opened from this environment. `docs/checks/past.md` lists the records; the SF PUC report's
  date column, lined up by order for six lines, most needs a look.
- **Maps to georeference by hand** (or approve a fitted trace): Land's End on the 1899 or 1915 San
  Francisco sheet; the Westbrae shuttle and the Webster St bridge on the 1915 sheet.
- **Books and newspapers:** as listed per system in `leads-2c/`, and the earlier notes' lists.
