# Research: San Francisco's street railways, 1860–1982 (Phase 2b.D)

The sourced inventory behind `data/past/sf-cable/` and the San Francisco lines still to draw.
Gathered on Oct 14, 2026.

## How far to trust the quotes

- **Callwell** (`sfmta-callwell-chronology`) is quoted verbatim from the PDF's own text. His printed
  page numbers equal the PDF pages; this was checked on pp. 3, 4, 5 and 40.
- **Everything else** came from archive.org's OCR text, read through a fetch tool that returns only
  short excerpts and infers the page numbers. Those quotes need checking against the page images
  before they're cited, and so do their pages.
- **No newspaper has been checked.** The page text of the California Digital Newspaper Collection
  and Chronicling America was refused from this container.
- **Opening dates are the gap.** Most of the United Railroads' and Market Street Railway's electric
  lines have no opening date in any source reached. They have dated route snapshots (1909 and 1928)
  and sourced end dates only.

## Sources

| Key | Source | Tier | Where |
|---|---|---|---|
| CW | Robert Callwell, *Transit in San Francisco: A Selected Chronology, 1850–1995*, Muni, 1999 | Primary (official) | `sfmta-callwell-chronology` |
| SFMTA-CC | SFMTA, "Cable car history" | Primary (official) | `sfmta-cable-car-history` |
| CAM | *History of public transit in San Francisco, 1850–1948*, City and County of SF, June 1948 (poor OCR) | Primary (official) | `sf-public-transit-history-1948` |
| MFR | Municipal Railway of San Francisco, *Financial reports*, Dec 1912 to FY1930, each with a "Chronology" and a "Routes" list | Primary | https://archive.org/details/financialreport1912sanf_0 |
| OS29 | O'Shaughnessy, *Report on the street railway transportation requirements of San Francisco*, Bureau of Engineering, May 1929; route appendix about pp. 343–354 | Primary | https://archive.org/details/reportonstreetr1929osha_1 |
| MILLS | Mills, *Report on the rehabilitation of the San Francisco Municipal Railway 1947–1951*, SF PUC, 1951 | Primary | https://archive.org/details/reportonrehabili1195mill |
| ROCK | Rockwell (ed.), *The Cable Cars of San Francisco*, SF PUC, about 1965 (years only) | Primary | https://archive.org/details/cablecarsofsanfr1965rock |
| MAN09 | Manley, *Report on the Operation of the Street Railroad Lines of San Francisco*, Merchants' Association, 1909: a "ROUTE—" entry for each line | Contemporary, not official | https://archive.org/details/reportonoperatio00manlrich |
| VIL15 | Vilas, *Municipal Railway of San Francisco*, 1915 | Contemporary, not official | https://archive.org/details/municipalrailwa00vilagoog |
| WR | Townley & Perry, *Western Railroader* nos. 286–287 (1963) and 300 (1965): Muni line by line, 1944–64 | Secondary (railfan periodical, in Callwell's reading list) | https://archive.org/details/sanfranciscomuni1965town |
| RE | Rice & Echeverria, "Red and White Fleet" | Secondary | https://sfmuseum.org/hist10/interurban.html |
| JT | Joe Thompson, Cable Car Chronology (cable-car-guy.com) | Pointer only (railfan) | |
| WP | Wikipedia | Pointer only | |
| OHM | OpenHistoricalMap relations 2800853 (San Mateo interurban) and 2698518 (Muni lines from 1911) | Geometry pointer; their dates come from sfmuseum.org or Wikipedia | |

"[R]" below marks a fact that rests on JT or WP alone. Those are not drawn.

## Drawn so far: the cable lines with no present line (`data/past/sf-cable/`)

Every route follows today's street centerlines (Overture, the San Francisco box), checked on the
USGS San Francisco North 1:24,000 sheet of 1950.

| Line | Opened | Closed | Route | Notes |
|---|---|---|---|---|
| Clay Street Hill Railroad | 1873-09-01 (CW p. 7; SFMTA-CC) | 1892 (CW p. 13) | Clay St, Kearny → Leavenworth | JT gives 1891 for the change to Sacramento–Clay. |
| Sutter Street cable line | 1877-01-27 (CW p. 8) | 1906 (CW p. 21) | Sutter St, Market → Larkin (1877) → Presidio Ave (1879) | 5 ft gauge (CW p. 21). Electric streetcars a few weeks after May 1906. |
| California St line, west of Van Ness | 1878-04-10 (CW p. 8) | 1954-05-16 (CW p. 47) | California St, Van Ness → Fillmore (1878) → Presidio Ave (1879) | Cal Cable ended 1951-07-31; Muni from 1952-01-13. The rest runs today. |
| O'Farrell, Jones and Hyde line | 1891-02-09 (CW p. 13) | 1954-05-16 (CW p. 47) | O'Farrell, Jones, Pine and Hyde Sts to Beach St | Hyde St became part of Powell–Hyde in 1957 (CW p. 49). |
| Jones Street shuttle | 1891-02-09 (CW p. 13) | 1954-02-06 (CW p. 47) | Jones St, Market → O'Farrell | |
| Washington–Jackson | 1888-04-05 (SFMTA blog; CW p. 12, "a few days" after Mar 28) | 1956-09-01 (CW p. 48) | Powell; Jackson west, Washington east; to Presidio Ave and California St until 1906, then to Steiner (CW pp. 12, 22) | Runs over today's Powell St and Jackson/Washington segments (decision 13). |
| Sacramento–Clay | 1892 (CW p. 13) | 1942-02-14 (CW p. 43) | Sacramento St out to Fillmore; back on Sacramento, Larkin and Clay (the post-1906 route, CW p. 43) | JT gives 1891-11-02. The pre-1906 route isn't sourced. |
| Geary Street cable (GSP&O) | 1880 (SFMTA-CC) | 1912-05-05 (CW p. 28) | Geary St, Kearny/Market → Presidio Ave (CAM p. 15) | By 1896 on to 5th Ave and Fulton St (CW p. 17); the extension's date is [R] (1892), so it isn't drawn. |
| Union Street cable (Presidio & Ferries) | 1882 (SFMTA-CC) | 1906 (CW p. 22) | Columbus Ave from Washington St; Union St to Steiner (CW p. 22; CAM p. 15) | CAM and ROCK give 1880; flagged. |
| Castro Street cable | 1888 (CW p. 81) | 1941-04-05 (CW p. 41) | Castro St, 18th → 26th | Until 1906 also on Market St from Valencia; to be drawn with the Market St lines. SFMTA-CC's "until 1944" is contradicted by Callwell. |

## Still to draw

### Cable lines on Market St

These run on Market St, so today's F track on Market St must first be cut at their junctions
(Valencia, Haight, Hayes, McAllister) in `data/present/extensions.json`.

- **Market Street Cable Railway trunk and Valencia line**, 1883-08-22 (CW p. 10): "from the ferry
  terminal, on Market and Valencia to Valencia & Mission Sts." Streetcars "on Market to Castro and
  on Market and Valencia to 28th St." within days of 1906-05-03 (CW p. 21).
- **Haight line**, September 1883 (CW p. 10), Market → Stanyan (CAM p. 16); ended 1906.
- **McAllister line**: opened November 1883 [R]; Fulton St from 8th to 12th Aves in 1902 (CW
  p. 13); ended 1906.
- **Hayes line**: 1886 [R]; ended 1906.
- **The Castro line's run on Market St** from Valencia, 1888–1906.

### Other cable lines

- **Pacific Ave (Sutter St RR)**: Polk → Divisadero (OS29) or Broderick (MAN09); last day
  1929-11-17 (CW p. 38). Its opening is [R] only.
- **Omnibus Railroad & Cable Co.**, 1889-08-26 (CW p. 13): from the ferry terminal on The
  Embarcadero and Howard St to 26th St, with a branch on 24th St to Potrero Ave. The cable lines
  were converted to electric "over the next few years" after 1894 (CW p. 16). The Post, Oak and
  Ellis lines are [R].
- **Telegraph Hill funicular**, 1884-06-30 (CW p. 11), "abandoned after less than three years".
- **Fillmore Hill counterbalance**, 1895 to 1941-04-05 (CW pp. 41, 86): Fillmore St, Broadway →
  Green.

### Muni's own streetcar lines, 1912–1982

Drawn so far (`data/past/sf-muni/`): A, B and E, from Callwell alone. C, D, F and H wait for routes.

Dates mostly from CW, MFR and WR.

- **A Geary–10th Ave**, 1912-12-28 to December 1932.
- **B Geary**:
  - 1912-12-28, a shuttle on Geary from 10th to 33rd Aves;
  - to the beach 1913-06-24 or 06-25 (MFR's reports disagree);
  - last day 1956-12-29 (CW p. 48).
- **C Geary–California**: opened February or March 1915 (MFR's reports disagree); replaced by bus
  1956-12-30 (WR).
- **D Geary–Van Ness**: 1914-08-15 (MFR) to 1950-03-18 (WR).
- **E Union St** (the former Presidio & Ferries): Muni's from 1913-12-11 (CW p. 31); last day
  1947-06-08 (CW p. 45).
- **F Stockton**: 1914-12-29 (MFR) to 1951-01-20 (WR, MILLS).
- **H Potrero–Van Ness**: 1914-08-15 (MFR Exhibit 1) or 09-07 (MFR chronology) to 1950-03-18.
- **The surface history of today's J, K, L, M and N**:
  - Van Ness Ave (J and K, 1917–18);
  - Brighton Ave (K, to 1951);
  - Ocean Ave east of Phelan (K, to 1952);
  - Market St from Church to Castro (to 1972-12-02);
  - the Market St surface trunk (Ferry Building service ended 1949-03-21; four tracks ended
    1949-07-02).

### Early steam, horse and electric lines in Callwell

- **San Francisco Market Street Railroad steam dummy**, 1860-07-15 to 1867-03-06 (CW pp. 4–6):
  "from 3rd & Market Sts., on Market and Valencia to 16th St."
- **Omnibus Railroad horsecars**, 1862-12-22 (CW p. 5).
- **Park & Ocean Railroad (steam)**, 1883-12-01 (CW p. 10): Stanyan, H St (Lincoln Way) and a right
  of way to La Playa & Balboa; electric from June 1898.
- **Ferries & Cliff House steam line**, 1888-07-01 (CW p. 12): California St to 33rd Ave and
  around Land's End to 48th & Pt. Lobos Aves. Electric from May 1905; the Land's End section ended
  1925-02-07 (CW p. 36).
- **Sutro Railroad**, 1896-02-01 (CW p. 17).
- **San Francisco & San Mateo Railway**, 1892-04-27 (CW p. 14), later the No. 40 interurban to San
  Mateo. Last cars 1949-01-15 (RE) or 01-16 (WR).
- **Metropolitan Railway** (October 1892), **Mission St electric** (1894-09-15) and **18th & Park**
  (November 1894) (CW p. 16).
- **Ocean Shore Railroad**, October 1907 to 1920-08-15 (CW p. 35).

### The United Railroads / Market Street Railway numbered lines

- The URR was incorporated 1902-03-04 (CW p. 19). It became the Market Street Railway on
  1921-04-01 (CW p. 35). The city took over at 5 a.m. on 1944-09-29 (CW p. 44).
- Line numbers began in 1909 (CW p. 28).
- MAN09 (1909) and OS29 (1928) give each line's streets, and WR gives most conversion dates.
- Opening dates are unsourced for most lines, so they will show on the year slider only through
  their streets' dates, drawn lighter (decision 4).

## Street names

| Old name | Today | Source |
|---|---|---|
| Central Ave | Presidio Ave | CW p. 8 |
| H St | Lincoln Way | CW p. 10 |
| Montgomery Ave | Columbus Ave | CAM p. 15 |
| East St | The Embarcadero | CW p. 8 |
| Army St | Cesar Chavez St | CW p. 35 |
| Howard St south of 12th | South Van Ness Ave | CW p. 13 |
| China Ave | Excelsior Ave | CW p. 16 |
| Stanley Place | Sterling St | CW p. 14 |

**Unsourced equivalences:**
- D St = Fulton St (JT);
- Point Lobos Ave = Geary Blvd west of Presidio Ave;
- 13th St = Duboce Ave;
- 1st Ave = Arguello Blvd.

**Unidentified names:** Lewis St, Richmond Ave, Kentucky St, Railroad Ave, Falcon Ave, City Hall
Ave and Old San José Road.

## Conflicts

| Item | Values | Taken |
|---|---|---|
| Market Street Cable opening | 1883-08-22 (CW) vs 08-21 (JT) | CW |
| Cal Cable to Market St | 1890 (CW) vs 1891 (CAM, JT) | CW, pending a primary check |
| Sacramento–Clay | 1892 (CW) vs 1891-11-02 (JT) | CW |
| Presidio & Ferries cable | 1882 (SFMTA) vs 1880 (CAM, ROCK) | 1882, flagged |
| Castro cable end | 1941 (CW, CAM) vs "until 1944" (SFMTA's page) | CW |
| Geary line to the beach | 1913-06-24 vs 06-25 (Muni's own reports) | open |
| C line opening | Feb 19, 1915 to 33rd Ave, or to 13th Ave then 33rd Ave on Mar 28 | open |
| H line opening | 1914-08-15 vs 1914-09-07 | open (perhaps Van Ness first, then Potrero) |
| K line's first terminal | Van Ness & Pine (CW) vs Van Ness & Bush (MFR) | open |
| D and H last day | 03-18 vs 03-19, 1950 | the last day of service, 03-18 |
| E line end | 1947-06-08 (CW) vs 07-20 (WP) | CW |
| O'Farrell, Jones and Hyde end | 1954 (CW) vs 1956 (WP) | CW |
| No. 40 last day | 1949-01-15 vs 01-16 | the last day of service |

## Open questions for Matthew

1. **Closing dates.** `closed` is the last day of service; the replacement's first day goes in
   `fate_note`.
2. **Page checks.** Check the OCR quotes from MFR, OS29, CAM, MILLS, MAN09, VIL15 and WR against
   the page images before they're cited. That includes OS29's line numbers, which the OCR misreads,
   and CAM's p. 15 routes, cited now.
3. **Newspaper checks** (the Daily Alta California and the Call) would settle:
   - the 1883 Market St cable and Haight lines;
   - 1890 vs 1891 for Cal Cable to Market St;
   - the 1891–92 Sacramento–Clay line;
   - the McAllister and Hayes lines;
   - the 1889 Omnibus lines;
   - the Geary line's 1892 extension;
   - the San Mateo extension of 1902–03.
4. **Books.** Hilton, Smallwood, Perles and Stindt hold the electric lines' opening dates; only
   page citations from you can bring them in.
5. **Free primary sources not yet mined:**
   - Arnold's 1913 report (archive.org `reportonimprovem00arno_0`): its route tables and franchise
     expirations;
   - OS29's franchise appendix;
   - Railroad Commission decisions on Market Street Railway abandonments, 1935–44.
6. **OpenHistoricalMap.** Use relations 2698518 and 2800853 as surveyed geometry once OHM is
   reachable, or trace from maps?
7. **One line or one per traction era?** The cable lines here are drawn per traction era: the
   Sutter St cable line ends in 1906, and the electric line that followed is a separate record.
   Should a route like Haight St be one line whose `traction[]` changes in 1906 instead?
