# Changelog

Data changes, newest first. Code changes are in the git log.

## 2026-10-16: Nine more Market Street Railway lines, and No. 20's 1909 run on H St

- **Nos. 2, 5, 16, 22, 23, 24, 25, 30 and 35** (`sf-msry/`), drawn from Manley's 1909 routes and
  O'Shaughnessy's of 1929 (decision 20), now that sources pair their old street names with today's:
  the city's list of the 1909 renamings (*Municipal Reports* 1908-09, pp. 1458-1466: Devisadero,
  First Ave to Arguello Blvd, Point Lobos Ave to Geary, H St to Lincoln Way, Twenty-second avenue
  South to Van Dyke Ave), Duboce Ave "formerly thirteenth street" (*General Ordinances*, 1907),
  Kentucky St and Railroad Ave to 3rd St (1915, 1921), Howard St to South Van Ness Ave (1932), Army St
  to Cesar Chavez St (1995), and Richmond Ave to Euclid Ave (a newspaper of 1909, flagged).
- Last days from the SF PUC's reports: No. 2 July 2, 1949; No. 5 June 5, 1948; No. 16 October 1946;
  Nos. 22 and 25 July 31, 1948; No. 35 in 1939 (the city's 1948 transit history). Nos. 23, 24 and
  30 had no cars by September 29, 1944; their last days aren't sourced, so they are drawn 1909-29.
- **No. 20:** its 1909 run out H St (Lincoln Way) from Arguello Blvd to 19th Ave and on to the Great
  Highway. Not drawn, for want of a map: its curve from Stanyan St through Block 714, its beach run
  to Balboa St, No. 5's diagonal across a block to Fulton St, and the old San Bruno Ave (Nos. 16
  and 25).
- **Private rights of way:** No. 2's to the Sutro Baths and No. 7's along the west edge of Golden
  Gate Park to La Playa and the Balboa St loop, drawn for 1929 where the 1950 San Francisco North
  sheet still has their track.

## 2026-10-16: The Sonoma Valley's railroads and the Sebastopol branch

- **Southern Pacific, Santa Rosa branch** (`sonoma-valley/`): Napa Junction by Schellville, El
  Verano, Glen Ellen and Kenwood to Santa Rosa, opened May 31, 1888 (the Railroad Commissioners'
  reports of 1889 and 1894); passenger trains ended under CRC Decision 20488, effective December 6,
  1928, so on or about December 1928 (decision 17).
- **Sonoma Valley branch, Ignacio to Glen Ellen**: from June 1, 1888, when the Marin & Napa joined
  the Sonoma Valley Railroad (1880-82) to the main line, by Sears Point, Wingo, Schellville and
  Sonoma; on to Kenwood from January 15, 1934 over the Southern Pacific's track; passenger trains
  ended June 12, 1935 (Decisions 27973 and 34457). The first narrow-gauge line from Sonoma Landing
  isn't drawn: where the landing was isn't sourced.
- **Sebastopol branch**, Santa Rosa to Sebastopol: February 17, 1890 to 1917, its passenger end from
  *The Western Railroader* of April 1949 (read on the page image).
- Geometry: today's track to Schellville; OpenStreetMap's mapped abandoned grades up the valley and
  by Kenwood; OpenHistoricalMap's ways (from the 1916 Santa Rosa sheet) into Santa Rosa and to Llano;
  traced from the 1942 Sonoma sheet (Sonoma to Madrone), the 1916 Santa Rosa sheet (Madrone to Glen
  Ellen) and the 1935 Sebastopol sheet (Llano to Sebastopol).

## 2026-10-16: The Mount Tamalpais railway

- **Mount Tamalpais railway** (`mt-tamalpais/`): steam trains from the Northwestern Pacific's
  station at Mill Valley up Blithedale Canyon and around the Double Bow Knot to the summit, 8.19
  miles. First train to the end of the line August 27, 1896 (CRC Decision 2180; Poor's gives August
  17, 26 and 27 in different years, flagged); abandonment of all service authorized August 7, 1930
  (Decision 22765), so it closes on or about August 1930 (decision 17). Drawn from OpenHistoricalMap's
  way, traced from the 1897 Tamalpais sheet and checked on the 1941 one. The Muir Woods branch
  (1906 or 1907) isn't drawn: no sheet in the repo shows it.

## 2026-10-16: The Santa Fe at Point Richmond

- **Santa Fe trains, Stockton to Richmond and Ferry Point** (`santa-fe/`): across the Delta and along
  Suisun and San Pablo Bays to Richmond, and through the tunnel to Ferry Point. Put in operation May
  1, 1900 for freight (the Railroad Commissioners' report, p. 148); the first through train from
  Chicago July 3, 1900 (the county history of 1926). Ferry Point's trains and the **Santa Fe ferry**
  to the foot of Market St stopped under federal control from August 18, 1918 to January 9, 1921
  (CRC Decisions 5642 and 9543; employee timetables Nos. 44 and 47) and ended April 23, 1933
  (timetable No. 68). The trains are drawn to 1968, the last timetable read with passenger trains
  at Richmond (decision 20); their line to Oakland isn't drawn yet.
- East of Bay Point the line is today's Gold Runner track: a new dated stretch in
  `present/extensions.json` (`gr-bay-point-stockton`), whose date is borrowed from the Santa Fe's
  trains, as no official source dates its first passengers (decision 13). West of it, today's BNSF
  track (`rails.py`), checked on the 1915-18 sheets; Richmond to Ferry Point traced from the 1948
  San Quentin and 1949 Richmond sheets. Four USGS sheets of 1908-14 added, to check the Delta
  stretch.

## 2026-10-16: The Petaluma & Santa Rosa

- **Petaluma & Santa Rosa Railway** (`petaluma-santa-rosa/`), an electric interurban, as four lines:
  Petaluma to Sebastopol, Sebastopol to Santa Rosa, Sebastopol to Forestville, and the Two Rock
  branch. Opened November 19, 1904 (the *Journal of Electricity, Power and Gas*, January 1905, p.
  31); into downtown Santa Rosa across the steam road's tracks the night of March 1, 1905 (Borden,
  1960); Forestville July 15, 1905; Two Rock July 28, 1913 to September 1925. Fourth St's cars ended
  December 31, 1931 (CRC Decision 24310) and all passenger service on July 1, 1932 (Decisions 24818
  and 24983). The opening and Green Valley dates conflict between the 1905 journal and the railfan
  histories, and are flagged.
- Geometry: OpenStreetMap still maps most of the abandoned line (`rails.py`, which now keeps to named
  ways), checked on the 1954 sheets, on which the track is still in place for freight. Petaluma,
  Sebastopol, the Santa Rosa branch to Leddy, and Graton to Forestville are traced from the 1953–54
  sheets; Sebastopol Rd, Olive St and Fourth St in Santa Rosa follow today's streets, checked on the
  1916 and 1954 Santa Rosa sheets. Seven USGS sheets added.

## 2026-10-15: The San Ramon branch

- **Southern Pacific, San Ramon branch** (`sp-san-ramon/`): from Avon, on today's line from
  Martinez to Tracy, by Concord, Walnut Creek and Danville to San Ramon. Opened for public use June
  7, 1891 (the Railroad Commissioners' report of 1894, p. 24); its mixed trains, by then two days a
  week, were abandoned on or about February 1934 (CRC Decision 26834, decision 17).
- Geometry from OpenHistoricalMap from Galindo south, within about 10 m of the railroad on the
  1947–53 sheets; from Avon to Galindo, where OpenHistoricalMap's way (from the 1896 sheet) is up to
  150 m off, traced from the 1959 Vine Hill and 1949 Walnut Creek sheets. Its end at San Ramon is
  where the 1898 Mt Diablo sheet ends the track. Four USGS sheets added (Las Trampas Ridge 1947,
  Diablo 1953, Mt Diablo 1898, Vine Hill 1959).

## 2026-10-15: The California Pacific to Suisun

- **California Pacific trains, Vallejo to Suisun and Sacramento** (`calp-vallejo-suisun`): from the
  ferry at South Vallejo by Napa Junction, through Jameson Canyon and by Cordelia, Thomasson and
  Subeet to Suisun-Fairfield, and on to Sacramento over the Capitol Corridor's track. Drawn from
  1880, the first date a source shows the line (decision 20), to its end on or about June 1929 (CRC
  Decision 21194, which names its stations); the stretch beyond Suisun is shown for 1880 and 1889
  only, since by 1929 the trains turned at Suisun-Fairfield.
- Geometry along today's track (`rails.py`), split at the fork north of Napa Junction so the two
  California Pacific lines share it; checked on the 1951 Cordelia and the 1949 Fairfield South
  sheets (new).

## 2026-10-15: Railroad reports and journals, re-read on the page images

- **Dates:** the railroad commissioners' report of 1894 prints "To San José … September 15, 1869"
  and "From Wrights to Felton … May 15, 1880"; the OCR had the 16th, so both stretches were given
  only to the month. They now open on the 15th.
- **Key Route, 1903:** the opening of October 26, 1903 is in Part II of the *Street Railway
  Journal*'s article (p. 283), not Part I, which gives no date. The pier, trunk, Adeline St and
  Shattuck Ave segments now cite Part II. Part I no longer backs the routes of the A, B and H lines,
  which it doesn't describe.
- **Sacramento Northern, 1913:** *Electric Railway Journal* says only that service was "expected
  to inaugurate" on April 7, and its September article dates the formal opening to September 3. So
  April 7 rests on the *Commercial and Financial Chronicle* (p. 1157), which says it "was
  inaugurated on April 7".
- **The Webster St line:** the 1930s timetable puts it on single track only "In case of
  emergency"; it was double track.
- **Pages corrected:**
  - the Northern Railway's return (p. 45);
  - the California Pacific's history and mileage (tenth report, p. 9);
  - Poor's San Francisco & North Pacific entry (p. 874);
  - the *Railway Age Gazette*'s SP electrification article (pp. 460–463);
  - *California Highways and Public Works*, 1956 (p. 12);
  - the San Mateo article of 1903 (pp. 798–802).
- **Quotes corrected:** "about 1½ miles along Shafter avenue" (not 1¾); "40 miles of its suburban
  lines"; the San Francisco & North Pacific's purchase of the Tiburon line was filed December 19,
  1888. The Sonoma County history's p. 201 gives the NPC's arrival at Occidental, not its 1875
  opening.

## 2026-10-15: SF's 1929-49 reports and the Oakland Tribune, re-read on the page images

- O'Shaughnessy's routes of 1929: No. 6 ran from the Ferry by Market St in 1929 too; No. 20 came back
  up Divisadero St from Page St to Oak St (a block was missing); No. 27's 1929 return turned into
  Brannan St at 8th St, so Brannan St from 10th St to 8th St is drawn for 1909 only. No. 7's summary
  quotes its 1929 end ("Lincoln Way, Private Right of Way and La Playa to Balboa Street Loop"), still
  not drawn past Frederick St.
- Fates: the PUC's reports say No. 40 "was abandoned" (not converted to bus), and No. 17's
  "Discontinued" and No. 12's "Last day of street car operation" don't say what replaced them, so
  their fates are left out.
- Report notes corrected: the 1945-46 list runs pp. 279-280; the 1947-48 one pp. 171-175; the
  1948-49 chronology starts in 1902.
- The Oakland Tribune's articles all read as quoted; their printed pages are now cited. The Tribune
  of June 12, 1911 dates through trains on 12th St from June 11, 1911, but says separate cars had
  served it "for more than a year", and its history of October 25, 1912 says "In 1909, the Twelfth
  street line was opened": the 12th St and Poplar St track is flagged `conflicting_sources`.

## 2026-10-15: Manley's 1909 report, re-read on the page images

- Every route and quote taken from Manley's report of 1909 was read again on its page images. Five
  1909 routes went further than drawn: No. 4 came back up 6th Ave to close its Richmond loop (the
  loop No. 24 ran the other way, p. 16); No. 6 ran on along Parnassus Ave "to Affiliated Colleges";
  No. 10 ran on along San Jose Ave; No. 12 along Ocean Ave; and No. 21 out Fulton St to 8th Ave
  (p. 29). No. 20's summary now says that all its cars ran "to H to 19th", and every other car on
  to Ocean Boulevard.
- Street segments cited every report a line was in, even for a stretch in only one report's
  route: 28 cited a Manley page that doesn't name them. A segment now cites only the reports whose
  routes include it (`street_routes.py`). This also dropped East Bay orders from 30 segments whose
  streets those orders don't name.

## 2026-10-15: Six SF last days, read on the page images

- The San Francisco PUC's reports of 1947–48 (p. 171) and 1948–49 (p. 190), read on their page
  images now that archive.org's image hosts are reachable, give the last day of street car operation
  for six lines that were given to the month: No. 20, September 27, 1947; No. 12, October 31, 1948;
  Nos. 9, 11 and 14, January 15, 1949 (No. 9's year is misprinted "59"). No. 41's entry of January
  15, 1949 says "Discontinued" without naming the last day, so it stays January 1949.

## 2026-10-15: The Martinez–Benicia ferry

- **Martinez–Benicia ferry** (1913 to its last trip, September 15, 1962, the day the bridge opened):
  between the Municipal Wharf at Martinez and the foot of Fifth Street at Benicia (CRC Decision
  22535), on the course the 1952 Benicia sheet draws (*California Highways and Public Works*, 1962).

## 2026-10-15: The Napa Valley line

- **California Pacific trains, Vallejo to Calistoga** (`california-pacific/`): from the wharf at
  South Vallejo by Napa Junction, Napa, Yountville and St. Helena to Calistoga. When trains first
  ran from Vallejo isn't sourced (the railroad reported "sundry dates" in 1868–69), so it is drawn
  from 1880, the first date a source shows it (decision 20), to its end on or about June 1929 (CRC
  Decision 21194). The Napa Valley Railroad's own first train, Soscol to Napa on July 11, 1865, and
  its completion to Calistoga in October 1868 are in its notes.
- **The Vallejo Junction–South Vallejo ferry**, drawn from 1889 to on or about June 1929.
- Geometry along today's track where it's still in place (`rails.py`, Overture's rail, new), traced
  from the 1951 sheets through Yountville, where today's track was moved, and from OpenHistoricalMap
  beyond St. Helena.
- Eight USGS sheets added (Mare Island 1916, Cuttings Wharf, Napa, Yountville, Rutherford and
  Cordelia 1951, St. Helena and Calistoga 1945).

## 2026-10-15: The South Pacific Coast

- **South Pacific Coast, Alameda to Santa Cruz** (`south-pacific-coast/`): from the Alameda mole
  through Alameda, across San Leandro Bay and the marshes to Newark, on today's track by Santa Clara
  to San José, then by Campbell, Los Gatos, Alma and Wrights to the summit tunnel and the Santa Cruz
  County line. Each stretch opens as the railroad's return to the Commissioners gives it (June 1,
  1878 to May 1880); its end isn't sourced, so it is drawn to 1900 (*Poor's Manual*, decision 20).
- The Alameda mole now opens March 15, 1884, and Central and Encinal Avenues in Alameda June 1,
  1878, as the South Pacific Coast's.
- The Capitol Corridor's track from Centerville to Newark (February 18, 1882), Newark to Santa
  Clara (June 1, 1878) and Santa Clara to San José (the San Francisco & San José's of 1864) is dated.
- Two USGS sheets added: Los Gatos 1919 and San Jose West 1953.

## 2026-10-15: The Central Pacific of 1869

- **Central Pacific trains, Oakland to Sacramento by Niles and the Altamont Pass**, from the first
  through passenger train from Oakland Point on November 8, 1869 (Halley; the railroad's return
  says about December 1) to the end of passenger trains between Tracy and Elmhurst via Niles, on or
  about January 1941 (CRC Decision 33781). Through Niles Canyon and over the pass from
  OpenHistoricalMap's ways, checked on the 1953 sheets, made while the track was still there.
- **Trains to San José by Niles and Milpitas**, September 1869 to on or about February 1940 (CRC
  Decision 32804).
- The Capitol Corridor's track from Melrose to Niles takes the Western Pacific's dates: San Leandro
  to Niles September 8, 1869, Melrose to San Leandro November 8, 1869.
- Six 1953 USGS sheets added: Niles, La Costa Valley, Livermore, Altamont, Midway and Milpitas.

## 2026-10-15: The Central Pacific by the Benicia ferry

- **The Capitol Corridor's track is dated** by stretch: West Oakland to Shell Mound August 16, 1876,
  Shell Mound to Martinez January 9, 1878, Benicia to Suisun December 28, 1879 (the Northern
  Railway, from the Railroad Commissioners' reports), and the Martinez–Benicia bridge October 15,
  1930 (*Southern Pacific Bulletin*). Suisun to Davis, the California Pacific's of 1868–69, stays
  undated: the company itself reported only "sundry dates".
- **Central Pacific trains, Oakland to Sacramento by the Benicia ferry** (`central-pacific/`): from
  the Oakland Mole along the bay shore to Port Costa, across the Carquinez Strait on the train ferry
  (drawn over water between the slips of the 1898 Karquines sheet) and by Benicia's waterfront to
  Suisun, December 28, 1879 to October 15, 1930, when the bridge replaced the ferry.
- Two USGS sheets added: Karquines 1898 and Benicia 1952.
- `npm test` follows a past line onto present track split where today's lines part (`<id>-1`), and
  accepts a line that runs on beyond the county line over today's track.

## 2026-10-15: The San Francisco & North Pacific

- **SMART's track is dated** stretch by stretch from the railroad's own openings, as Caltrain's is:
  Petaluma–Santa Rosa October 1870, Santa Rosa–Windsor March 1, 1871, San Rafael–Petaluma June 2,
  1879 and San Rafael–Larkspur (the line to Tiburon, by the Cal Park Hill tunnel) May 1, 1885.
  SMART's own service keeps its dates (2017; Larkspur 2019; Windsor 2025).
- **Four lines** (`sf-north-pacific/`): the San Francisco & North Pacific's trains from the steamer
  at Donahue (1870, drawn to 1885), from San Rafael and Tiburon (1879, drawn to 1889), the
  Guerneville branch (1876, drawn to 1935), and the Northwestern Pacific's trains to Eureka (drawn
  from 1935 to its last train, on or about November 1958, CPUC Decision 57488), out to the
  Mendocino County line. Openings by stretch from the Railroad Commissioners' tenth report and
  *Poor's Manual*; Windsor to Cloverdale and the Tiburon line from OpenHistoricalMap's ways.
- The line list says "Running by …" for lines drawn by decision 20, as their panels do.
- Five USGS sheets added: San Quentin 1948, San Rafael 1954, Healdsburg 1940, Asti 1959 and
  Cloverdale 1960.

## 2026-10-15: The San Mateo interurban (No. 40)

- **No. 40 San Mateo** (`msry-40`): from 5th and Market out Mission St, then by its private right of
  way through Colma, San Bruno and Millbrae to Burlingame, and O'Shaughnessy's loop through the
  streets of San Mateo. Its opening to San Mateo isn't sourced, so it is drawn from October 31, 1903,
  when the *Street Railway Journal* describes its cars running (decision 20), and in San Francisco
  from Manley's route of 1909; the last day is January 15, 1949 (the San Francisco PUC's report).
- The right of way (`sf-san-mateo/`) is OpenHistoricalMap's, checked on the 1:24,000 sheets of
  1949–50 (Montara Mountain and San Mateo added), made from aerial photographs of 1946, while the line
  still ran.

## 2026-10-15: The North Pacific Coast (decision 21)

- **Decision 20 approved** at the checkpoint: the 46 lines drawn for their running dates stay.
- **The North Pacific Coast** (`north-pacific-coast/`): its own line from Sausalito over the electric
  lines' track to San Anselmo (decision 21), then by Fairfax, White's Hill, San Geronimo and Camp
  Taylor to Point Reyes, around Tomales Bay to Tomales, and by Occidental and Camp Meeker to the
  Russian River at Monte Rio. Each stretch opens on the day the Railroad Commissioners' tenth report
  gives (January 11, 1875 to May 15, 1877); Point Reyes to Monte Rio ends April 3, 1930 (CRC Decision
  22672) and Manor to Point Reyes August 1, 1933 (Decision 34457). Geometry from OpenHistoricalMap's
  ways, checked on the USGS sheets of 1897, 1914 and 1916 (and of 1935 and 1945, after it closed).
  Not drawn: Sheridan to Duncans Mills and Cazadero, which no sheet of its years shows.
- **Its San Rafael branch,** drawn for the years Marin County's history (1875) and Poor's Manual
  (1885, 1900) show it (decision 20).
- The Sausalito–San Anselmo track now opens in 1875, with the North Pacific Coast.
- Six USGS sheets added: Tamalpais 1897, Petaluma 1914, Point Reyes 1916, Sebastopol 1935, Duncans
  Mills 1945 and Cazadero 1945.

## 2026-10-15: Phase 2c checkpoint

- The research passes' readings of the sources are saved in `docs/research/sources-2c/`, and
  `docs/research/phase-2c.md` says what was drawn and what each system still needs.
- `npm test` checks that a line drawn by decision 20 starts at its first running date, in the
  lighter tint.

## 2026-10-15: Phase 2c, five bay ferries

- **The Oakland Pier ferry** (September 2, 1863 to July 30, 1958; drawn to Oakland Pier from its
  opening on January 22, 1882: Halley, the 1883 county history, HABS CA-1888).
- **The Creek Route** up the Oakland Estuary to the foot of Broadway (re-opened July 1, 1876 to on or
  about August 1937; CRC Decisions 29338 and 29999).
- **The Alameda Pier ferry** (running by June 1, 1878, when the South Pacific Coast's trains met it;
  to January 1939, when the Bay Bridge trains began) and the **San Francisco & Alameda Railroad's
  ferry** (August 1864 to September 1873).
- **The Richmond–San Rafael ferry** (May 1915 to September 1, 1956), on OpenHistoricalMap's course.
- Benicia–Port Costa and Martinez–Benicia are sourced (December 1879 to October 15, 1930; 1913 to
  September 15, 1962) but wait on a map that places their slips.

## 2026-10-15: Phase 2c, San Francisco streetcars' last days

- **17 of the 26 Market Street Railway lines now have their last streetcar day**, from the San
  Francisco Public Utilities Commission's reports of 1945–49, which list Muni's changes to the
  lines it took over in 1944: from No. 19 (September 1945) to Nos. 1, 2 and 3 (July 2, 1949). Where
  the reports' date column has to be lined up with its entries in the scan's text, the end is given
  to the month. Each line's 1929 route is drawn on to its last day (decision 20).
- The East Bay's No. 18 turns onto Walavista Ave at its western junction with Lakeshore Ave.

## 2026-10-15: Phase 2c, the East Bay's streetcars

- **18 local streetcar lines of Oakland, Berkeley, Alameda and Richmond**, street by street as the
  Railroad Commission's (from 1946 the Public Utilities Commission's) orders of 1931–48 describe
  them: Nos. 1, 2, 6, 9, 10, 11, 12, 14, 15, 17, 18, 23, 24, 29, the K, the 38th Avenue line, the
  Cemetery line and the Richmond line (on San Pablo Ave). Each is drawn for the years its orders
  show it running (decision 20); the 1948 orders that ended the last lines name no last days.
- Washington St's old course under City Center, between where it stops today and San Pablo Ave, is
  drawn dashed. Private rights-of-way (to Piedmont, Leona, the Richmond ferry) and streets the
  freeways cut in Richmond aren't drawn yet; lines 26, 28 and Leona wait on them.
- The No. 12 of San Francisco no longer runs on to Daly City and back: the street-route cutter now
  keeps apart cross streets of the same name in different places.

## 2026-10-15: Phase 2c, San Francisco's numbered streetcar lines

- **26 Market Street Railway lines** (United Railroads in 1909), street by street as Warren Manley's
  report of February 1, 1909 and M. M. O'Shaughnessy's of May 1929 give them: Nos. 1, 3, 4, 6–12,
  14, 15, 17–21, 27, 32–34, 36, 41 and 42, the Tenth and Post line and the Divisadero St extension.
  Few of their openings or last days are sourced yet, so each is drawn only for the years the
  reports show it running, in the lighter tint (decision 20, proposed and open for review). A stretch
  in only one report's route is drawn for that year only.
- On Market St they run on today's F track, now cut at Sutter, Powell, McAllister and Hayes Sts.
  Today's N track on Carl St (Cole St to Stanyan St) and J track on 30th St are cut where the old
  lines shared them; those pieces' openings are left null, as older track.
- Left for later: lines whose 1909 routes use streets renamed since (13th St, H St, Army St, Central
  Ave and others), until a source pairs the old name with the new; No. 28 (its Rincon Hill streets
  are gone); the private rights-of-way to the beach (their courses aren't given).
- The Sutter St and Jackson St cable segments are cut at Fillmore St, where the numbered lines joined
  them.

## 2026-10-15: Phase 2c, sources reachable again

- **The Sacramento Northern's end beyond West Pittsburg** now cites Railroad Commission Decision No.
  33416 (August 20, 1940), which let the trains stop on five days' notice; the 1913 Electric Railway
  Journal quotes for the first through train (July 2) and the formal opening (September 3) are
  checked in the journal's text.
- **The Webster Street line reaches Alameda Pier:** across the estuary by the bridge the 1915 USGS
  sheet draws (corrected by the sheet's fit, about 80 m), then along the railroad on Alameda's north
  shore, which the 1949 sheet still draws, to the mole.

## 2026-10-15: Phase 2c, the Fillmore Hill counterbalance

- **The Fillmore Hill counterbalance** on Fillmore St from Broadway to Green St, 1895 to April 5,
  1941 (Callwell pp. 41, 86), drawn as a cable line.

## 2026-10-15: Phase 2c, the SP's Oakland street lines

- **The Eighteenth Street line** (March 21, 1912, as announced, to March 26, 1933): from the
  Oakland Mole by Sixteenth Street Station, 18th St and 20th St to 14th and Franklin Sts, and from
  1926 down Webster St to 2nd St (CRC Decisions 17743, 25740 and 27800). The link from 18th St to
  20th St isn't sourced, so it is drawn along San Pablo Ave and dashed.
- **The Webster Street line** (June 29, 1911 to December 27, 1923), drawn in Oakland from 14th and
  Franklin Sts down Webster St to 1st St (CRC Decision 17743; the SP's 1914 employee timetable).
  Its crossing of the estuary and its run through Alameda aren't drawn yet.

## 2026-10-15: Phase 2c, the Key System's E

- **E Claremont line** (1908 to 1958): from the trunk up Adeline St, then 55th St, Vicente St and
  56th St to Claremont Ave, and up Claremont Ave to the Claremont Hotel, on the streets the 1954
  Commission decision names (CPUC Decision No. 50731) and the 1949 USGS sheet draws. Opened as
  the Claremont line in 1908 (the Oakland Tribune's retrospective of 1912); its 55th St branch
  ran to Telegraph Ave from 1905–07, on a first day not yet sourced.
- The Adeline St segment is split at 55th St, where the E left it.

## 2026-10-15: Phase 2c, Market St's first lines

- **The Market Street steam dummy** (1860-07-15 to 1867-03-06), from 3rd St out Market St and
  Valencia St to 16th St, San Francisco's first street railroad (Callwell pp. 4–6).
- **The Market Street Cable Railway's trunk and Valencia St line** (1883-08-22 to 1906) and its
  **Haight St line** (September 1883 to 1906), from the ferries (Callwell p. 10; the city's 1948
  transit history p. 16). The Castro St cable line now also runs on Market St from Valencia St until
  1906.
- Today's F track on Market St is cut at Haight St and Valencia St, where these lines left it
  (decision 13).
- **The Hyde Street–Berkeley ferry closes on or about August 1937,** the month the Railroad
  Commission let it be suspended (Decision No. 29999; decision 17), and is back on the year slider.

## 2026-10-15: Phase 2c, the Sacramento Northern to the county line, from OpenHistoricalMap

- **OpenHistoricalMap is in use** (`pipeline/transit_pipeline/ohm.py`, `data/past/ohm.json`), for
  geometry only; `docs/checks/ohm.md` lists every OHM way in the area and what became of it.
- **The Sacramento Northern east of Bay Point:** by West Pittsburg, the train ferry from Mallard to
  Chipps Island, Montezuma and Rio Vista Junction to the Yolo County line, where it leaves the Bay
  Area (decision 16), from September 3, 1913 (Electric Railway Journal) to on or about August 1940
  (Railroad Commission Decisions 33009 and 33416; decision 17). Bay Point to West Pittsburg is traced
  from the 1953 Honker Bay sheet; the rest is OHM's, checked on the 1952–53 sheets.
- **A segment used by different modes in turn draws in the mode of each year,** such as Union St's
  cable track, then the E's streetcars.

## 2026-10-15: Phase 2c, the line list follows the year

- **The past era's line list follows the slider** (decision 14): the lines running in the chosen year
  come first, the rest follow, dimmed.
- **A line's pieces keep to its own dates.** In the past era a line is hovered and listed only while
  it ran, even where its track is older: Caltrain runs on track of 1863, but from 1980.

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

- **The San Francisco–Vallejo ferry** (1895–1937), from the foot of Clay St, and **the Hyde
  Street–Berkeley auto ferry** (from 1927), to the end of the Berkeley pier, which the 1949 USGS sheet
  still draws. The Berkeley ferry's last run isn't sourced, so it stays off the year slider.
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
