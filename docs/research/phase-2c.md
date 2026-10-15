# Research: Phase 2c, what was drawn and what each system needs next

Oct 15, 2026. Phase 2c set out to draw every system on the coverage list in `docs/SPEC.md`. For the
whole session no source page could be opened (WebFetch failed DNS on every host, and the shell is
refused archive.org, files.cpuc.ca.gov and the Library of Congress), so only facts already read in
Phase 2b, and recorded in the notes in this folder, went onto the map. The five research passes of
this session left reading plans in `leads-2c/`; nothing in them is citable yet.

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
| Market Street Railway (URR in 1909) | 26 numbered and named lines, street by street | Running on February 1, 1909 (Manley) and in May 1929 (O'Shaughnessy); ends unsourced, so drawn for those years only (decision 20, proposed) | Today's centerlines (`street_routes.py`), today's F, N, J and K track where they shared it |

## Not drawn yet, and what each needs

"Read" means read the source itself, as the plans in `leads-2c/` list. "Trace" means hand-reading a
map; "fit" means correcting a misregistered 15-minute sheet against control points (decision 12).

### San Francisco

- **McAllister and Hayes cable lines:** opening dates rest on railfan pages; read Callwell pp. 10–13
  and the Daily Alta of 1883 and 1886.
- **United Railroads and Market Street Railway numbered lines:** 26 drawn from Manley's 1909 list
  and O'Shaughnessy's 1929 one (decision 20). Still to do: each line's last day (the Railroad
  Commission's 1929–44 decisions and the city's after 1944); the lines whose 1909 routes use renamed
  streets (2, 5, 16, 22–25, 30, 35, and the 1909 parts of 20, 23 and 24), once a source pairs the old
  names with the new; No. 28 and No. 29 (Rincon Hill's and Bayshore's streets have changed); the
  private rights-of-way to the beach.
- **Ferries & Cliff House line around Land's End** (1888–1925, Callwell pp. 12, 36): its dates and
  route are sourced, but the 1915 San Francisco sheet is off by up to about 150 m there and no
  1:24,000 sheet shows the line (it was gone by 1950). Needs a fit on the 1899 or 1915 sheet, or a
  map Matthew georeferences by hand.
- **Sutro Railroad, Park & Ocean:** routes and ends need reading (Callwell pp. 10, 17; `leads-2c/sf-a.md`).
- **San Mateo interurban (No. 40):** OHM's relation 2800853 is mapped south of the city line from
  the 1939 USGS sheet and other period maps, but its San Francisco part follows the 1892 route, not the later one, and the 1902–03 extension to San
  Mateo is dated only by railfan pages. Read the Call of 1902–03 and Callwell for the 1949 end.
- **Muni's exposition lines I and J:** their streets aren't sourced; read Muni's 1915–16 reports.
- **Ocean Shore Railroad** (October 1907 to August 15, 1920, Callwell p. 35): OHM has its coast line,
  but traced from the 1915 San Mateo 15-minute sheet, so it needs a fit before use.

### East Bay

- **Oakland Traction / Key System streetcars:** about 40 Commission decisions of 1928–48 are located
  by file name (`leads-2c/eastbay.md`, section 1.1). Read D40742 (1947) first: it may list every rail
  route then.
- **East Shore & Suburban:** the Richmond line's 1933 route is sourced (CRC D26438) and its end
  (November 6, 1933), but not when the through line opened; the Tribune's 1904 opening names only "the
  connecting link between the old and the new towns of Richmond".
- **Key System G (Westbrae shuttle):** dated, but its private right-of-way was gone by 1949 and the
  1915 sheet needs a fit; trace it once fitted.
- **SP Webster Street line in Alameda:** the Harrison Street swing bridge and the run to Webster
  Junction and the pier need a period map (the 1915 sheet, fitted).
- **SP Fruitvale (horseshoe) line:** its opening is unsourced.
- **Sacramento Northern freight, Oakland to Lafayette, 1941–57 (decision 15):** the *Western
  Railroader* of August 1956 and the *Orinda Sun* of March 1, 1957 hold it, but the *Orinda Sun*'s
  archive.org item (`caorihs_000462` or `_000468`) has to be confirmed. The Pittsburg branch's opening
  is unsourced.
- **Alameda Belt Line, Oakland Terminal Railway:** dates rest on court opinions and federal rulings
  found only by search (`leads-2c/ferries-northbay.md`, section 7).

### Early railroads

The county histories that date them (Halley 1876, Wood 1883, the Contra Costa, Marin, Sonoma, Napa
and Solano histories of 1879–82) were read in Phase 2b, but their archive.org items and pages weren't
all recorded, so they aren't in `sources.json` yet. Most of these railroads also run under today's
Capitol Corridor, ACE, Caltrain and SMART track, which would be dated by stretch as Caltrain's was
(decision 13): Central Pacific and the 1862 Western Pacific, the SF & Oakland and SF & Alameda, the
California Pacific and Napa Valley, the North Pacific Coast and SF & North Pacific (both partly in
OHM), Santa Fe at Point Richmond, the South Pacific Coast and California & Nevada, and the SP's San
Ramon, Napa and Dumbarton lines. `leads-2c/railroads.md` has the plan.

### Ferries and the North Bay

- **The Creek Route** (re-opened July 1, 1876, Halley p. 435; closed on or about August 1937, CRC
  D29999): waits only on registering Halley's archive.org item.
- **Benicia–Port Costa and Martinez–Benicia:** opening years from the county histories; their ends
  came with the bridges of 1930 and 1962, which decision 17 would date by month.
- **Richmond–San Rafael, Mare Island, the Petaluma steamers:** dates are web pointers only; OHM has
  the Richmond–San Rafael course.
- **Santa Rosa, Petaluma and San Rafael street railways, the Petaluma & Santa Rosa, the SF Napa &
  Calistoga:** dated only by search extracts so far.

## OpenHistoricalMap still to use

`docs/checks/ohm.md` lists, by operator, the ways not yet drawn. The largest: the Southern Pacific
(212 km), the San Francisco & North Pacific (72 km), the North Pacific Coast (91 km), the Sacramento
Northern's Pittsburg branch and a branch of about 1950 in Solano County, the United Railroads' San
Mateo line (20 km), and 665 km of unnamed ways, many of them traced by OHM's mappers from the
15-minute sheets of 1895–1915.

## For Matthew

- **Network:** allow archive.org, files.cpuc.ca.gov and www.loc.gov for this environment, or check
  why the fetch tool can't resolve them; every next step above starts with reading a source.
- **Maps to georeference by hand** (or approve a fitted trace): Land's End on the 1899 or 1915 San
  Francisco sheet; the Westbrae shuttle and the Webster St bridge on the 1915 sheet.
- **Books and newspapers:** as listed per system in `leads-2c/`, and the earlier notes' lists.
