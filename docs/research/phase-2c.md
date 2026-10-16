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
| San Mateo interurban (No. 40) | 5th and Market by Mission St and its private right of way to Burlingame and San Mateo | Running in 1903 (*Street Railway Journal*), 1909 (Manley) and 1929 (O'Shaughnessy); last day January 15, 1949 (SF PUC 1948–49) | Today's centerlines; OpenHistoricalMap's right of way, checked on the 1949–50 sheets |
| San Francisco & North Pacific, Northwestern Pacific | Trains from Donahue and from Tiburon to Cloverdale, the Guerneville branch, and the NWP's trains to Eureka | The Railroad Commissioners' tenth report and *Poor's Manual* (openings by stretch, 1870–85); CPUC Decision 57488 (1958); running dates for the rest (decision 20) | SMART's track (dated by stretch); OpenHistoricalMap's ways beyond it |
| Central Pacific | Oakland to Sacramento by Niles and the Altamont Pass (1869–1941) and by the Benicia train ferry (1879–1930); to San José by Milpitas (1869–1940) | The Railroad Commissioners' reports (the Northern Railway's openings, 1876–79); *SP Bulletin* (the 1930 bridge) | The Capitol Corridor's track, dated by stretch; the ferry over water; Niles Canyon, the Altamont Pass, Milpitas and Benicia's waterfront from OpenHistoricalMap, checked on the 1952–53 sheets |
| South Pacific Coast | Alameda by Newark and San José to the Santa Cruz County line | The railroad's return in the Commissioners' report of 1894 (1878–80); running in 1900 (*Poor's*), decision 20 | The Capitol Corridor's and Caltrain's track; OpenHistoricalMap, checked on the sheets of 1899–1953 |
| California Pacific (Napa Valley line) | Vallejo by Napa to Calistoga, and the Vallejo Junction ferry | Running in 1880 (*Poor's*), 1889 and 1900; end on or about June 1929 (CRC D21194) | Today's track (Overture); traced through Yountville on the 1951 sheets; OpenHistoricalMap beyond St. Helena |
| California Pacific (to Suisun) | Vallejo by Napa Junction, Jameson Canyon and Cordelia to Suisun, and on to Sacramento | Running in 1880 (*Poor's*) and 1889; by 1929 only to Suisun-Fairfield, ending on or about June 1929 (CRC D21194) | Today's track (Overture), checked on the 1949–51 Cordelia and Fairfield South sheets; the Capitol Corridor's track beyond Suisun |
| Southern Pacific, San Ramon branch | Avon by Concord, Walnut Creek and Danville to San Ramon | Opened June 7, 1891 (the Railroad Commissioners' report of 1894, p. 24, read on the page image); mixed trains abandoned on or about February 1934 (CRC D26834) | OpenHistoricalMap from Galindo south, within about 10 m of the 1947–53 sheets; traced from the 1959 Vine Hill and 1949 Walnut Creek sheets from Avon to Galindo |
| Petaluma & Santa Rosa Railway | Petaluma to Sebastopol, then Santa Rosa (Sebastopol Ave, Olive St, Fourth St to McDonald Ave) and Forestville; Liberty to Two Rock | Opened Nov 19, 1904 (JOE, Jan 1905, p. 31, image; Borden gives Nov 29, Ellison and Sievers Dec 1); Santa Rosa downtown Mar 1-2, 1905; Green Valley Nov 19, 1904 (JOE) or Jan 26, 1905 (Borden; E&S); Forestville Jul 15, 1905; Two Rock Jul 28, 1913 to Sep 20 (Borden) or 30 (E&S), 1925; Fourth St to Dec 31, 1931 (CRC D24310, Borden); passengers ended Jul 1, 1932 (CRC D24818, D24983) | OpenStreetMap's mapped abandoned line, checked on the 1954 sheets; traced from the 1953-54 sheets in Petaluma, Sebastopol, to Leddy and to Forestville; today's streets in Santa Rosa. Not sourced: its streets in Petaluma and its depot there; where between Wilson and Olive Sts the 1931 cut began (a map) |
| Santa Fe at Point Richmond, and its ferry | Stockton by Antioch, Bay Point, Muir and Pinole to Richmond, through the tunnel to Ferry Point; ferry to the foot of Market St | Put in operation May 1, 1900 for freight (BRC report, p. 148, image); first through train July 3, 1900 (county history of 1926, p. 127, image); ferry suspended Aug 18, 1918 to Jan 9, 1921 (CRC D5642, D9543; timetables Nos. 44 and 47, image); Ferry Point ended Apr 23, 1933 (timetable No. 68, image); trains at Richmond still in June 1968 (timetable No. 16) | The Gold Runner's track east of Bay Point (a new dated stretch); today's BNSF track west of it, checked on the 1915-18 sheets; traced from the 1948-49 sheets to Ferry Point; the ferry over water. Not drawn: the trains to Oakland (1904?-1958; CPUC D56779), whose route through Berkeley needs sorting from the 1895 and 1949 sheets |
| Mount Tamalpais railway | Mill Valley up Blithedale Canyon and the Double Bow Knot to the summit | First train to the end of the line Aug 27, 1896 (CRC D2180, vol. 6 p. 235; Poor's 1897, 1898 and 1902 give Aug 17, 27 and 26); winters suspended from 1917 (D4927); abandonment authorized Aug 7, 1930 (D22765, image) | OpenHistoricalMap's way from the 1897 Tamalpais sheet, checked on the 1941 sheet. Not drawn: the Muir Woods branch from Mesa (1906 or 1907), for which the annotated 1915 Tamalpais sheet at the Mill Valley Public Library (archive.org `cmlpl_000900`) is a map to georeference by hand |
| Southern Pacific, Santa Rosa branch | Napa Junction, Schellville, El Verano, Glen Ellen, Kenwood, Santa Rosa | Opened May 31, 1888 (BRC reports 1889 p. 35, 1894 p. 45, image); passenger trains ended under CRC D20488 (Nov 16, 1928, effective 20 days later, image) | Today's track to Schellville; OpenStreetMap's mapped grades by El Verano and Kenwood; OpenHistoricalMap's way from the 1916 Santa Rosa sheet into Santa Rosa, where it joins the Northwestern Pacific north of town. Not sourced: its Santa Rosa depot; the 1934 track swaps (ICC Finance Docket 9950) |
| Sonoma Valley branch (SF&NP, NWP) | Ignacio, Sears Point, Wingo, Schellville, Sonoma, Boyes Springs, Agua Caliente, Madrone, Glen Ellen; Kenwood from 1934 | Sonoma Landing to Sonoma Aug 23, 1880; Sonoma to Glen Ellen Aug 15, 1882; Ignacio to Sears Point June 1, 1888 (BRC 1894 p. 82, image); Kenwood from Jan 15, 1934 (NWP timetable supplement); ended June 12, 1935 (CRC D27973, D34457) | Today's track to Schellville; OpenStreetMap's grade to Sonoma; traced from the 1942 Sonoma and 1916 Santa Rosa sheets to Glen Ellen, which disagree by about 100 m where they meet. Not sourced: Sonoma Landing's place; the change to standard gauge |
| Sebastopol branch (SF&NP, NWP) | Santa Rosa, Kenilworth, Llano, Gravenstein, Sebastopol | Opened Feb 17, 1890 (BRC 1894 p. 82, image); passengers ended 1917 (*Western Railroader*, Apr 1949, p. 10, image) | OpenHistoricalMap's way to Llano (it then follows the P&SR); traced from the 1935 Sebastopol sheet into Sebastopol |
| Martinez–Benicia ferry | Auto ferry across the Carquinez Strait, 1913–1962 | CRC D22535 (1930); *CH&PW* 1962 | The 1952 Benicia sheet's course |

## Not drawn yet, and what each needs

"Read" means read the source itself, as the plans in `leads-2c/` list. "Trace" means hand-reading a
map; "fit" means correcting a misregistered 15-minute sheet against control points (decision 12).

### San Francisco

- **McAllister and Hayes cable lines:** opening dates rest on railfan pages; read Callwell pp. 10–13
  and the Daily Alta of 1883 and 1886.
- **United Railroads and Market Street Railway numbered lines:** 35 drawn from Manley's 1909 list
  and O'Shaughnessy's 1929 one (decision 20), Nos. 2, 5, 16, 22-25, 30 and 35 among them since the
  sources pairing the old street names with today's were found (`CHANGELOG.md`, October 16). Still
  to do: the other lines' last days (the Railroad Commission's 1929-44 decisions, and for Nos. 23, 24
  and 30 the Market Street Railway's 1939-41 changes; Ordinance No. 510 of 1940 is a lead); Nos. 28
  and 29 (Rincon Hill's and Bayshore's streets have changed); the private rights-of-way to the beach
  and Sutro Baths; No. 20's curve through Block 714 and its 1909 beach run; No. 5's diagonal from
  McAllister St to Fulton St; the old San Bruno Ave under US-101 (Nos. 16, 25) and No. 25's right of
  way on Potrero Ave; No. 16's 1909 link from 4th St to Kentucky St.
- **Ferries & Cliff House line around Land's End** (1888–1925, Callwell pp. 12, 36): its dates and
  route are sourced, but the 1915 San Francisco sheet is off by up to about 150 m there and no
  1:24,000 sheet shows the line (it was gone by 1950). Needs a fit on the 1899 or 1915 sheet, or a
  map Matthew georeferences by hand.
- **Sutro Railroad, Park & Ocean:** now sourced (`sources-2c/sf-a.md`): the Sutro's franchise and
  1894 pole permit give its route, the *Street Railway Journal* its February 1, 1896 opening; the Park
  & Ocean's franchises its route, the SF PUC's 1948 report its last streetcar day (July 3, 1948, as
  the No. 7). Their private rights-of-way to Sutro Baths and along the beach need tracing.
- **San Francisco & San Mateo (1892):** No. 40 is drawn from 1903; its forerunner's route of 1892
  (Steuart, Harrison, 14th, Guerrero, San Jose Ave, 30th and Chenery Sts, a trestle over Diamond
  Ravine and the old San Jose road) isn't, and needs the trestle traced from the 1899 sheet. When
  No. 40 moved from those streets to Mission St isn't sourced.
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

- **SF & Oakland and SF & Alameda:** Halley's dates, read on the page images: the SF & Oakland's
  "first trip … on the 2d day of September, 1863", "from the end of the wharf to Broadway" (p. 177),
  and "On the 1st of April [1865] the Oakland Railroad was extended to Larue's Wharf, in Brooklyn"
  (p. 200); the SF & Alameda's trial trip from the Point to Alameda on Saturday, August 13, 1864,
  cars "as far as High Street" on the 25th of August (p. 190), track to San Leandro "finished on
  the first day of March" 1865 (p. 197), and "on the 25th of August the line was completed" to
  Haywards (p. 198). Not drawn: neither Halley nor Wood (1883) names the streets they ran on (7th
  St in Oakland; Railroad, now Lincoln, Ave in Alameda; the way to San Leandro and Haywards), so
  their routes need a period source or a map of the 1860s-70s.

### Ferries and the North Bay

- **Benicia–Port Costa** (the train ferry, 1879–1930) and **Martinez–Benicia** (1913–1962): drawn,
  from the 1898 Karquines and 1952 Benicia sheets.
- **Mare Island, the Petaluma steamers:** dates are web pointers only.
- **Santa Fe:** drawn to Ferry Point (see above). For Matthew: the *San Francisco Call* of July 2, 1900, p. 3 (and July 3, pp. 4, 6, 8; July 4, p. 4) has the first train, and loc.gov's page text can't be reached from here; the Santa Fe and Southern Pacific employee timetables (California State Railroad Museum, "Copyright Status Unknown") are cited for facts only.
- **North Pacific Coast:** drawn to Sheridan, past Monte Rio. Still to do: Sheridan to Duncans Mills
  and up Austin Creek to Cazadero (1886), on no sheet of its years (a map to georeference by hand, such
  as the NPC's own map of about 1900 at Calisphere); its tunnels; the Mill Valley branch; the San
  Rafael & San Quentin (1870, leased 1875) and the San Quentin ferry, which OHM has from the 1895–97
  sheets.
- **San Francisco & North Pacific, still to do:** Donahue to Petaluma (no map of it traced), the
  line beyond Cloverdale, and the trains' later years (1889-1935) and ends. The Sonoma Valley and
  Sebastopol branches are drawn (see above).
- **Petaluma & Santa Rosa:** drawn (see above).
- **Santa Rosa, Petaluma and San Rafael street railways:** dated only by search extracts so far.
- **San Francisco, Napa & Calistoga (not drawn yet):** dates are sourced (Vallejo to Napa between
  May 27 and August 5, 1905; Yountville by September 1907; St. Helena January 1908; Calistoga
  September 2 or 9, 1912; public service on the Napa city tracks ended by September 30, 1937, CRC
  D32850; the Vallejo ferry's last day September 12, 1937, D30121). The geometry isn't:
  - The 1916 and 1942 Mare Island sheets (the second surveyed in 1937) draw it from Vallejo by
    Flosden, Collins and Napa Junction, east of the Southern Pacific, to Tulucay; the 1942 Sonoma
    sheet (photographs of 1939) draws a track on to Rockfram and Imola and up Tulucay Creek into
    East Napa, where today's track runs, and a second track labelled "Electric" south from the west
    side of Napa. Which was the electric line's in which years needs a source.
  - The 1927 Calistoga sheet (surveyed 1915) draws it beside the Southern Pacific from about Lodi
    Lane to Calistoga, labelled "S F N & C Elec".
  - **Between Napa and Lodi Lane (about 30 km, by Yountville and St. Helena), no sheet of its years
    shows it:** the 1951 and 1942 sheets are after its track was taken up in 1938, and the Napa
    1:125,000 sheet is of 1902 (its 1932 reprint draws one line, too coarse to tell). OpenStreetMap
    and OpenHistoricalMap don't map it. A map to georeference by hand, or a choice: draw that
    stretch dashed beside the Southern Pacific through the stations the sources name, as the ferries
    are drawn from their terminals.
  - Vallejo's streets ("via Georgia Street and Sonoma Street", CRC D15174, 1925) and the turn
    between them need a map of Vallejo.

## OpenHistoricalMap still to use

`docs/checks/ohm.md` lists, by operator, the ways not yet drawn. The largest: the Southern Pacific
(212 km), the San Francisco & North Pacific (72 km), the North Pacific Coast (91 km), the Sacramento
Northern's Pittsburg branch and a branch of about 1950 in Solano County, the United Railroads' San
Mateo line (20 km), and 665 km of unnamed ways, many of them traced by OHM's mappers from the
15-minute sheets of 1895–1915.

## For Matthew

- **Decided at the checkpoint:** decision 20 is approved, and the North Pacific Coast is drawn as its
  own line over the track it shared with the electric lines (decision 21).
- **Page-image hosts:** archive.org serves its page images from `*.us.archive.org`, which Matthew
  allowed after the checkpoint. Items whose files sit only on `*.ca.archive.org` or
  `*.eu.archive.org` still can't be opened; `archive.org/metadata/<id>` names an item's servers.
- **Page images:** every archive.org citation taken from OCR text (about 720, in 53 items) was
  re-read on the page images on October 15. Most held; the corrections are in `CHANGELOG.md`. Still
  open from that pass:
  - The 12th St and Poplar St track of the Key Route's A line is dated June 11, 1911 (through
    trains), but the Tribune says cars had run it separately "for more than a year", and its 1912
    history says "In 1909, the Twelfth street line was opened" (`conflicting_sources`).
  - No. 9's last day is printed "1/15/59" in the 1948-49 report, among the January 1949 entries;
    the map reads it as January 15, 1949.
  - Ends of lines the reports name but the map doesn't draw: No. 7's 1929 run on Lincoln Way, a
    private right of way and La Playa; No. 20's 1909 run out H St; No. 36's start from the Ferry by
    Howard and Steuart Sts. No. 12's 1929 link from Ocean Ave to Sloat Blvd follows today's K track,
    which O'Shaughnessy doesn't name.
  - The city's 1948 transit history dates the Presidio and Ferries cable line "18?0", the third
    digit overtyped (it reads most like 1880); the record has 1882 from another source.
  - Demoro's *The Key Route* p. 104 is borrow-only on archive.org.
- **Maps to georeference by hand** (or approve a fitted trace): Land's End on the 1899 or 1915 San
  Francisco sheet; the Westbrae shuttle and the Webster St bridge on the 1915 sheet.
- **San Francisco, Napa & Calistoga:** a map of the line between Napa and St. Helena while it ran
  (1905–37), or approval to draw that stretch dashed through its stations (see "Ferries and the North
  Bay").
- **Petaluma & Santa Rosa, conflicts to settle:** the first day (JOE's November 19, 1904; Borden's
  November 29; Ellison and Sievers' December 1) and Green Valley's (November 19, 1904 or January 26,
  1905). The *Sebastopol Times* or *Press Democrat* for those weeks would settle both (CDNC, which
  this container can't reach).
- **Books and newspapers:** as listed per system in `leads-2c/`, and the earlier notes' lists.
- **SF street names, your calls:** Manley's "22nd Ave." (Nos. 16 and 30 in 1909) is drawn as
  Twenty-second avenue South, today's Van Dyke Ave, though he omits "South"; Richmond Ave is drawn as
  Euclid Ave on a newspaper of 1909 and the matching routes, not an ordinance; No. 2 is drawn to 48th
  Ave only for 1929 (the Sutro franchise, Order 2781, would carry it to 1909).
- **Santa Fe's Oakland line (1904?-1958):** OpenHistoricalMap's way from the 1895 sheet runs within
  about 15 m of the old right of way (OpenStreetMap, the Richmond and Ohlone Greenways) from Richmond
  to south Berkeley, but south of Russell St the 1949 sheet doesn't show where the track ran to 40th
  St and San Pablo Ave; a map of the 1930s-50s would settle it.
