# Research: Market St cable lines, the lines to the beach, the San Mateo interurban and Muni's exposition lines (sf-a)

Gathered 2026-10-15 for Phase 2b.D. Builds on `docs/research/sf-street-railways.md` (keys CW, CAM, MFR, OS29,
MAN09, VIL15 as defined there) and doesn't repeat what is drawn already.

## Read this first: what this pass could and couldn't reach

- **Network:** archive.org, sfmta.com (and archives.sfmta.com), Wikipedia, CDNC, loc.gov and every railfan
  site refused connections from the shell **and from the WebFetch tool**. WebFetch failed with "getaddrinfo
  ENOTFOUND" for all of them on 2026-10-15; only openhistoricalmap.org answered. So **no archive.org text
  (OS29, MAN09, CAM, MFR, VIL15) and no page image of Callwell was read in this pass.**
- **What was reached:**
  - Callwell's chronology and the SFMTA blog, only through **search-engine excerpts** (WebSearch, until the
    shared search budget ran out);
  - OpenHistoricalMap's Overpass API (full tags and geometry);
  - USGS topographic sheets (prd-tnm.s3.amazonaws.com), downloaded and **looked at on the image**;
  - Overture street centerlines already in `data/raw/overture/` (for today's junctions).
- **What the tags mean here** (on top of the brief's [P] [O] [C] [W] [ocr] [img]):
  - **[snip]**: text shown in a search-engine excerpt of the source, which wasn't opened; the wording looks
    verbatim but is unverified, and the page wasn't seen.
  - **[para]**: the search tool's paraphrase of the source, not a quote. Treat as a pointer to the entry.
  - **[prev]**: quoted by the 2026-10-14 pass (`docs/research/sf-street-railways.md`,
    `data/past/*/lines.json`), which read Callwell's PDF text and checked its page numbering.
- **Callwell page numbers** below come from [prev] when given; otherwise "p. not seen". Every [snip] and
  [para] row needs a check against the PDF (one sitting: pp. 10–17, 21, 31–33, 36, 38, 46).

Callwell URL: https://archives.sfmta.com/cms/rhome/documents/TransitinSanFrancisco-CallwellChronologyweb.pdf
(the same PDF is also served at https://www.sfmta.com/sites/default/files/TransitinSanFrancisco-CallwellChronologyweb.pdf
and https://www.sfmta.com/media/9347/download).

---

## 1. Market Street Cable Railway lines, 1883–1906

### Facts

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Market St trunk and Valencia line, first day | 1883-08-22 | CW | Callwell URL | p. 10 [prev] | "Market St. cable service begins, operating from the ferry terminal, on Market and Valencia to Valencia & Mission Sts." | [O][snip][prev] |
| Same, other date | 1883-08-21, Valencia and Haight lines together | Joe Thompson (JT) | https://www.cable-car-guy.com/html/ccsfmsr.html | – | "opened from the Ferry its Valencia Street line to Mission Street and Haight Street line to Golden Gate Park (Stanyan) on August 21, 1883" | [W][snip] |
| Valencia line's south end | "to 29th Street" | Cable Car Museum | https://www.cablecarmuseum.org/co-market-st.html | – | (paraphrase: Valencia line opened August 1883, "extending to 29th Street") | [W][para] |
| Haight line, first day | September 1883 (day not found) | CW, Dec 1, 1883 entry | Callwell URL | p. 10 [prev] | the Market St. company's "cable line on Haight St. had begun service that September" | [O][para][prev] |
| Haight line route | Market St → Haight St → Stanyan St | CAM | https://archive.org/details/historyofpublict1947sanf | p. 16 [prev] | (prev pass: "Market → Stanyan", OCR) | [O][ocr][prev] |
| Haight line's power | from the Market & Valencia powerhouse | Cable Car Museum | co-market-st.html | – | (paraphrase) | [W][para] |
| McAllister line, first day | 1883 (month and day not found) | Cable Car Museum; JT | co-market-st.html; ccsfmsr.html | – | "The McAllister Street line opened west to Golden Gate Park from Market, from a separate power house taking up most of a block bounded by Fulton and McAllister Streets, and Masonic and Central Avenues." | [W][snip] |
| McAllister route, at its cable end | Market, McAllister to the car barn, diagonally across the barn's block to Fulton, Fulton to Stanyan | OpenSFHistory, "McAllister Car Barn: a closer look" (2019-12-08) | https://www.opensfhistory.org/osfhcrucible/2019/12/08/mcallister-car-barn-a-closer-look/ | – | "the line cut diagonally across the car barn property to Fulton and continued out Fulton to its terminus at Stanyan Street" | [W][snip] |
| McAllister extension on Fulton (D St) | to 7th Ave, 1892 (JT: March 1892, "on D Street") | OpenSFHistory; JT | as above | – | "In 1892, the line was extended down Fulton Street to 7th Avenue." | [W][snip] |
| McAllister extension on Fulton | 8th Ave → 12th Ave, 1902 | CW | Callwell URL | p. 13 [prev] | (prev pass: "Fulton St from 8th to 12th Aves in 1902") | [O][prev] |
| Hayes line, first day | 1886-05-26 | Cable Car Museum; JT's line page | co-market-st.html; ccsfmsr.html | – | (paraphrase: "opened on May 26, 1886", own powerhouse and carbarn on Hayes St) | [W][para] |
| Hayes line, other date | 1886-05-20 | JT's chronology page | https://www.cable-car-guy.com/html/ccsf.html (one of JT's pages; exact page not seen) | – | (paraphrase: "opened on May 20, 1886") | [W][para] |
| Hayes route | Ferry, Market, Hayes to Golden Gate Park (Stanyan) | Market Street Railway (nonprofit), "Hayes Street: transit since 1860" | https://www.streetcar.org/hayes-street-transit-since-1860/ | – | "From the Ferry, Market, Hayes to Golden Gate Park (Stanyan)" | [W][snip] |
| Car colors | Haight red, Hayes green, McAllister yellow, Valencia blue | streetcar.org, as above | – | – | "Haight Street cars were red; Hayes Street cars green; McAllister Street cars a bright yellow; and Valencia Street cars were blue" | [W][snip] |
| Steam dummies on Market, Valencia → Castro | 1880 to 1888 | CW | Callwell URL | p. not seen | "Steam dummies operated on Market between Valencia and Castro from 1880 to 1888." | [O][snip] |
| Castro line (cable), first day | 1888 | CW | Callwell URL | p. 81 [prev] | the 8 Market traced to "a cable car line that had begun service in 1888" | [O][prev] |
| Castro line, day | 1888-02-27, "from the Ferry via Valencia and Market to 26th and Castro" — or steam dummy ended 1888-03-27 and cable opened 1888-08-27 | JT (two of his pages disagree) | cable-car-guy.com | – | (paraphrase) | [W][para] |
| Company end | consolidated into the Market Street Railway Co., October 1893 | Cable Car Museum, "8 original cable car companies" | https://www.cablecarmuseum.org/archive/8c/8c.htm | – | (paraphrase) | [W][para] |
| Same, in Callwell | the consolidation "Included … the F&CHRy and the Omnibus Co." | CW | Callwell URL | p. not seen (date not seen) | "Included in the consolidation were the F&CHRy and the Omnibus Co." | [O][snip] |
| United Railroads | incorporated 1902-03-04 | CW | Callwell URL | p. 19 [prev] | – | [O][prev] |
| First streetcar after the earthquake | 1906-05-03: Market from 5th St to the Ferry Building, then Market to Valencia | CW | Callwell URL | p. 21 [prev] | (paraphrase: Mayor Schmitz at the controls; then "operated on Market to Valencia") | [O][para][prev] |
| Electric service on the trunk | "within the next few days" of 1906-05-03 | CW | Callwell URL | p. 21 [prev] | "streetcar service on Market to Castro and on Market and Valencia to 28th St." | [O][snip][prev] |
| Why so fast | Market St cable track was standard gauge | CW | Callwell URL | p. 21 | (paraphrase: streetcars could use the Market St. cable tracks because the gauge was the standard 4' 8½") | [O][para] |
| Conversion ordinance | 1906-05-21: Board of Supervisors lets the URR convert its cable lines to electricity | CW | Callwell URL | p. not seen (≈ p. 21–22) | "Board of Supervisors unanimously approves an ordinance allowing the URR to convert its cable lines to …" (cut off) | [O][snip] |
| Hayes after 1906 | streetcars avoided the steep block of Hayes between Pierce and Scott; in 1916 the Hayes route was restored with streetcars, extended 2 blocks north on Stanyan to Fulton | streetcar.org (as above); Western Neighborhoods Project, "21 Hayes" | https://www.outsidelands.org/21-line.php | – | (paraphrase) | [W][para] |
| McAllister streetcar (later) | "Ferries to Ocean Beach at La Playa and Balboa loop via Market, McAllister, Central and Masonic and Fulton"; rail ended 1948-06-05 (trolley bus) | Wikipedia "5 Fulton"; outsidelands.org "5 McAllister" | https://en.wikipedia.org/wiki/5_Fulton ; https://www.outsidelands.org/5-line.php | – | (snippet as quoted) | [W][snip] |
| Haight St streetcar after 1906 | not found | – | – | – | – | – |

### Routes (snapshot 1888–1906, today's names)

Branch junctions with Market St are measured on today's Overture centerlines
(`data/raw/overture/2026-09-23.1/sf-roads.parquet`). That the cable turned there is sourced only as far as the
rows above say.

- **Trunk:** Market St, from the ferry terminal (The Embarcadero) west. Every branch used it (CW: "from the
  ferry terminal").
- **Valencia line:**
  - Market St from the ferry terminal to Valencia St (today's junction 37.7725 N, −122.4227).
  - Valencia St south to its end at Mission St (today 37.7456 N, −122.4199, just south of Duncan St).
  - CW names the end "Valencia & Mission Sts."; the Cable Car Museum says 29th St [W].
- **Haight line:**
  - Market St to Haight St; today's Haight–Market junction (37.7732, −122.4219) is about 104 m east of
    Valencia's.
  - Haight St west to Stanyan St (37.7692, −122.4536).
  - Junction to Park & Ocean RR steam trains at Haight & Stanyan (§2).
- **McAllister line:**
  - Market St to McAllister St (today's junction 37.7812, −122.4117, by 7th St and Charles J. Brenham Pl).
  - McAllister St west to the car barn on the block of McAllister, Central Ave, Fulton and Masonic Ave (this
    Central Ave is today's Central Ave, by Masonic; it's not the old "Central Ave" = Presidio Ave).
  - Across the block to Fulton St; Fulton St to Stanyan [W].
  - Out Fulton St to 7th Ave in 1892 [W], and 8th → 12th Aves in 1902 (CW p. 13).
- **Hayes line:**
  - Market St to Hayes St, then Hayes St to Stanyan St (37.7729, −122.4543) [W].
  - Today Hayes St's east end is 47 m from Market St (37.7777, −122.4170), so the 1886 junction needs a
    period map.
- **Castro line:**
  - Market St from Valencia to Castro St (Market & Castro, 37.7627, −122.4352), then Castro St to 26th St.
  - JT [W]: "via Valencia and Market to 26th and Castro".
  - It replaced the 1880–88 steam dummies on Market between Valencia and Castro (CW).
- **Fates, 1906:**
  - All five ended with the earthquake of April 1906. The last day of cable service isn't in any source
    reached.
  - Electric streetcars ran on Market to Castro and on Market and Valencia "to 28th St." within days of
    1906-05-03 (CW p. 21).
  - On the Castro line only Castro St between 18th and 26th Sts stayed cable, until 1941-04-05 (CW p. 41,
    already drawn).
  - When electric service began on Haight, McAllister and Hayes isn't sourced. Only the ordinance of
    1906-05-21 is.

### Conflicts

| Item | Values | Note |
|---|---|---|
| Valencia/Haight opening | 1883-08-22 (CW) vs 08-21 (JT) | CW taken already |
| Haight line | September 1883 (CW) vs with the Valencia line in August (JT) | open; newspaper |
| Valencia line's end | "Valencia & Mission" (CW 1883) vs 29th St (Cable Car Museum) vs streetcars "to 28th St." (CW 1906) | today Valencia doesn't reach 28th or 29th St (it ends about 190 m from each), so "28th St." in 1906 needs a period map |
| Hayes opening | 1886-05-26 vs 05-20 (both railfan) | newspaper |
| Castro cable opening | 1888 (CW); Feb 27 vs Aug 27, 1888 (JT, two pages) | newspaper |
| McAllister on Fulton | to 7th Ave in 1892 [W] vs "from 8th to 12th Aves" in 1902 (CW) | maybe 7th→8th was a later step; open |

### For Matthew

- **Newspapers** (Daily Alta California to June 1891, then the Call; both on CDNC):
  - Haight and McAllister openings: Alta, Aug 20 to Dec 31, 1883 (search "Haight street" with "cable").
    Search engines listed the Alta of Aug 20, Aug 25, Oct 5 and Nov 1, 1883 for such terms, but their content
    wasn't seen.
  - Hayes: Alta, May 19–28, 1886.
  - Castro cable: Alta, Feb 26–29, Mar 26–29 and Aug 26–29, 1888.
  - The 1893 consolidation: Call, October 1893.
  - Electric service on Haight, McAllister and Hayes: the Call, May to December 1906 (Chronicling America has
    the Call, 1895–1913).
- **Book:** George W. Hilton, *The Cable Car in America*: his Market Street Cable Railway section gives
  every branch's opening date and route. A page citation from you would settle most of this section.
- **Free primary to mine when archive.org is reachable:**
  - MAN09: the 1909 electric routes on Haight, Hayes, McAllister and Valencia;
  - Langley's San Francisco Directory for 1889 (archive.org `langleyssanfranc1889sanf`): its street railroad
    list gives every cable route of 1889, a dated snapshot [P].

---

## 2. Sutro Railroad, Ferries & Cliff House Railway and Park & Ocean Railroad

### Facts

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Park & Ocean RR, franchise | 1883-10-12, park commissioners | CW | Callwell URL | p. 10 [prev] | "S.F.'s park commissioners vote unanimously to allow the Park & Ocean Railroad, a steam-line subsidiary of the Market St. company, to operate from Haight & Stanyan, on Stanyan" | [O][snip] |
| Park & Ocean route | across the SE corner of Golden Gate Park, on H St (now Lincoln Way), then its own right of way at the park's west end, ending at what is now La Playa & Balboa | CW | Callwell URL | p. 10 | (paraphrase of the same entry) | [O][para] |
| Park & Ocean, first day | 1883-12-01 (steam) | CW | Callwell URL | p. 10 [prev] | (paraphrase: opened Dec 1, 1883, "an immediately popular means to get to Ocean Beach and the Cliff House") | [O][para][prev] |
| Park & Ocean, electric | June 1898 | CW | Callwell URL | p. 10 [prev] | (parenthetical: converted to electric service in June 1898) | [O][para][prev] |
| Park & Ocean on the map | rail line along the south edge of Golden Gate Park (H St) to the beach, then north along the beach to about Fulton/Balboa; labeled "S.P.R.R." | USGS San Francisco 1:62,500, ed. 1895 (surveyed 1894), scan 298889; same on ed. 1899, scan 298890 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/CA_San%20Francisco_298889_1895_62500_geo.tif | map | label "S. P. R. R." | [O][img] |
| F&CH, steam line, first day | 1888-07-01 | CW | Callwell URL | p. 12 [prev] | (paraphrase: "a steam line from California St. & Presidio Ave. out to 33rd Ave., around Land's End, and on to a terminal at 48th Ave. and Pt. Lobos") | [O][para][prev] |
| F&CH, 7th Ave branch | a short branch on 7th Ave, until February 1894 | CW, same entry | Callwell URL | p. 12 | (paraphrase) | [O][para] |
| F&CH on the map | rail line west on California St to the east edge of the Golden Gate Cemetery (now Lincoln Park), north to the cliffs, west around Land's End and south to the Cliff House / Point Lobos Ave; labeled "S.P.R.R." | USGS SF 1:62,500, 1895 ed., scan 298889 | as above | map | label "S. P. R. R." | [O][img] |
| F&CH absorbed | into the Market Street Railway's consolidation (1893 per the Cable Car Museum) | CW | Callwell URL | p. not seen | "Included in the consolidation were the F&CHRy and the Omnibus Co." | [O][snip] |
| F&CH, electric | May 1905, the California St and Land's End line | CW | Callwell URL | p. not seen | (paraphrase: "converted to streetcar operation in May 1905") | [O][para] |
| Land's End line still there | 1915 edition still draws the line around Lincoln Park | USGS SF 1:62,500, 1915 ed., scan 298896 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/CA_San%20Francisco_298896_1915_62500_geo.tif | map | – | [O][img] |
| Land's End section ended | 1925-02-07, after an earth slide; the Market Street Railway stopped the run around Land's End | CW | Callwell URL | p. 36 [prev] | (paraphrase; excerpt cut off) | [O][para][prev] |
| Why it mattered | it broke the Market St company's monopoly of rail service to the Cliff House and Ocean Beach, without the extra nickel for transfers | CW, 1925 entry | Callwell URL | p. 36 | (paraphrase) | [O][para] |
| Sutro Railroad, first day | 1896-02-01, electric from the start | CW | Callwell URL | p. 17 [prev] | "The Sutro Railroad Co. begins streetcar service on a line running from Presidio Ave. & Sutter, on Presidio Ave., California, Parker and Euclid Aves., Arguello Blvd., Clement, 33rd Ave., Pt. Lobos Ave., 48th Ave., and a private right of way to a terminal at Sutro Baths." | [O][snip][prev] |
| Sutro transfers | free transfers with the Sutter St cable line at Presidio Ave | CW, same entry | Callwell URL | p. 17 | (paraphrase) | [O][para] |
| Sutro Railroad sold | to the Sutter St company, October 1899 | CW | Callwell URL | p. not seen | (paraphrase; the excerpt was fragmentary) | [O][para] |
| Sutro Railroad, end of rail | not found | – | – | – | – | – |

### Routes (today's names)

- **Park & Ocean RR, 1883–98 (steam):**
  - From Haight & Stanyan (the Haight cable's end): Stanyan St, then across the SE corner of Golden Gate Park
    to H St.
  - H St = Lincoln Way (CW p. 10), west along the park's south edge.
  - Own right of way at the park's west end, then north to a terminal at La Playa & Balboa St.
  - The 1895 USGS sheet agrees: a line along the park's south edge, then north along the beach to about the
    latitude of Fulton/Balboa.
  - Electric from June 1898; nothing found on its later end.
- **Ferries & Cliff House steam line, 1888-07-01 to May 1905 (then electric to 1925-02-07):**
  - From California St & Presidio Ave (old Central Ave, CW p. 8), California St west to the 33rd Ave line.
    Today California St ends at 37.7835, −122.4935, inside Lincoln Park, 208 m north of where 33rd Ave ends.
  - Then a private right of way, which the 1895 sheet draws north along the cemetery's east edge to the cliffs.
  - West around Land's End along the cliff, then south to a terminal at 48th Ave & Point Lobos Ave (today's
    junction 37.7799, −122.5095).
  - A 7th Ave branch until February 1894; its ends aren't sourced.
  - The California St part stayed after 1925. What served it afterwards isn't in any source reached.
- **Sutro Railroad, 1896-02-01, electric:**
  - Presidio Ave & Sutter St; Presidio Ave; California St; Parker Ave; Euclid Ave; Arguello Blvd.
  - Clement St (Clement & Arguello today 37.7832, −122.4590) to 33rd Ave (37.7816, −122.4935).
  - 33rd Ave south to Point Lobos Ave, then Point Lobos Ave west to 48th Ave. Between 33rd and about 42nd Ave
    that's today's Geary Blvd; Geary meets the surviving Point Lobos Ave at 37.7796, −122.5030. The
    equivalence is unsourced (as in the earlier note).
  - 48th Ave, then a private right of way to Sutro Baths.
  - Callwell writes "Arguello Blvd." in the modern form; the old name (1st Ave) is still unsourced.

### Conflicts and notes

- The USGS sheets label both the Park & Ocean and the F&CH lines "S.P.R.R." Treat that as the surveyors'
  name for the Southern Pacific–linked Market St companies, not a different railroad.
- "33rd Ave" (CW) vs the line drawn along the cemetery's (now Lincoln Park's) east edge on the 1895 sheet:
  consistent within a block at 1:62,500. Trace from the sheet, not from a street.

### For Matthew

- **Maps to georeference/trace (public domain, USGS):**
  - SF 1:62,500 of 1895 (scan 298889, surveyed 1894), for the F&CH steam line and the Park & Ocean RR.
  - SF of 1915 (scan 298896), for the Land's End line late in its life.
  - Both are 5.3 m a pixel and already georeferenced (NAD27 polyconic). They're 1:62,500, so the result is
    `digitized` at best.
- **Newspapers:**
  - Park & Ocean: the Alta, Dec 1–3, 1883.
  - F&CH steam: the Alta, Jul 1–3, 1888.
  - 7th Ave branch end: the Call, February 1894.
  - Sutro RR: the Call, Jan 31 to Feb 3, 1896.
  - Sutro RR sale: the Call, October 1899.
  - P&O electric: the Call, June 1898.
  - F&CH electric: the Call, May 1905.
  - Land's End slide: SF Chronicle or Examiner, Feb 7–10, 1925 (not on CDNC; newspapers.com).
- **Primary to mine when reachable:**
  - MAN09: the 1909 routes of the Sutro/Clement line and the California St line to the Cliff House;
  - OS29: the 1928 routes of the same, and the No. 1 and No. 2 if numbered so (unverified);
  - the California Railroad Commission's abandonment decisions of 1925 for Land's End.

---

## 3. San Francisco & San Mateo Railway (1892) → United Railroads' San Mateo interurban (No. 40)

### Facts

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Opening ceremonies | 1892-04-26 | CW | Callwell URL | p. 14 [prev] | "Opening-day ceremonies for the San Francisco & San Mateo Railway, S.F.'s first electric streetcar line, with regular service starting the next day." | [O][snip][prev] |
| First day of public service | 1892-04-27 (CW "the next day"; SFMTA blog of 2017-04-27, "125 years ago today") | CW; SFMTA blog, "SF's first electric streetcar line opened 125 years ago today" | Callwell URL; https://www.sfmta.com/blog/sfs-first-electric-streetcar-line-opened-125-years-ago-today | p. 14 | (blog paraphrase: opened April 27, 1892, from Steuart and Market to Glen Park and the cemeteries in Colma) | [O][snip/para] |
| 1892 route | Steuart & Market … Holy Cross Cemetery | CW | Callwell URL | p. 14 | "The line ran from Steuart & Market, on Steuart, Harrison, 14th St., Guerrero, San José Ave., 30th St., and Chenery, then on a trestle over Diamond Ravine, and then on Old San José Road to Holy Cross Cemetery in what is now Colma, San Mateo County." | [O][snip] |
| Eastbound jog | the Rincon Hill grade on Harrison | CW | Callwell URL | p. 14 | "In the downtown area, the eastbound tracks were on Harrison, 8th St., Bryant, Stanley Place (now Sterling St.), and back to Harrison" | [O][snip] |
| Why | the grade on Harrison between 3rd St and Stanley Place, on Rincon Hill's western slope | CW | Callwell URL | p. 14 | (paraphrase) | [O][para] |
| Fares | 5¢ to the county line, 10¢ to the cemeteries | CW | Callwell URL | p. 14 | (paraphrase) | [O][para] |
| To Baden (South San Francisco) | "late 1893" vs "three years later" (≈1895) | railfan and Wikipedia pages | https://en.wikipedia.org/wiki/San_Francisco_and_San_Mateo_Electric_Railway ; http://sfmuseum.org/hist10/sf&sm.html | – | (paraphrase) | [W][para] |
| URR takes over | 1902 | sfmuseum.org, "San Francisco & San Mateo Railway Company – 1892" | http://sfmuseum.org/hist10/sf&sm.html | – | "After the SF & SM came under the control, in 1902, of the United Railroads of San Francisco (URR) management, the interurban line was extended thirteen miles from Baden to San Mateo and routed directly to downtown San Francisco via the populated Mission Street corridor." | [W][snip] |
| First car in San Mateo | line car 0301, 1902-12-26 | a railfan page in the same results (exact page not identified) | – | – | "the first car to arrive in San Mateo was line car 0301 that arrived on December 26, 1902" | [W][snip] |
| Service to San Mateo | "by 1903 service was opened all the way to downtown San Mateo" | same pages | – | – | (snippet) | [W][snip] |
| OHM's date | start_date 1903, start_date:edtf 1902/1903; the SF ways say 1891 | OHM relation 2800853 and its ways | https://www.openhistoricalmap.org/relation/2800853 | – | description: "The line was not extended to San Mateo until after the line became part of United Railroads of San Francisco (URR)." | [W] (OHM, citing sfmuseum.org) |
| Interurban on the map, 1915 | "INTERURBAN" beside "SOUTHERN PACIFIC", parallel to its west, San Bruno → Millbrae → Burlingame → San Mateo | USGS San Mateo 1:62,500, 1915 ed., scan 298922 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/CA_San%20Mateo_298922_1915_62500_geo.tif | map | label "INTERURBAN" | [O][img] |
| Interurban on the map, 1939 | "ELECTRIC" line through Burlingame into San Mateo, between the SP and El Camino Real | USGS San Mateo 1:62,500, 1939 ed., scan 301595 | https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/CA/CA_San%20Mateo_301595_1939_62500_geo.tif | map | label "ELECTRIC" | [O][img] |
| After 1906, in SF | rerouted to Mission St | Rice & Echeverria (RE), "End of San Francisco interurban streetcar service – 1949" | http://sfmuseum.org/hist10/interurban.html | – | (paraphrase: after the 1906 earthquake the URR rerouted the San Mateo line to Mission Street) | [W][para] |
| Late change | about 14 blocks moved off Mission St onto Valencia St to save 6–8 minutes (date not found) | RE, as above | as above | – | (paraphrase) | [W][para] |
| In Burlingame/San Mateo | down the middle of California Dr – North San Mateo Dr toward San Mateo High School | marker or press piece in the results (HMdb "Transportation Evolution" m=206508, or San Mateo Daily Journal "The number 40 trolley line") | https://www.hmdb.org/m.asp?m=206508 ; https://www.smdailyjournal.com/news/local/the-number-40-trolley-line/article_0a7cadf2-79d0-5289-bc36-6fc99b96d593.html | – | "the line was diverted to and ran down the middle of California Drive – North San Mateo Drive on its way to the San Mateo High School and San Mateo" | [W][snip] |
| San Mateo terminal | Third Ave & B St (by SP's San Mateo station) | RE; a 1944 Market Street Railway timetable as reproduced by Tundria | sfmuseum.org interurban.html; http://www.tundria.com/trams/USA/SanFrancisco-1944.php | – | (paraphrase: "San Mateo terminal at Third & 'B' Streets") | [W][para] |
| 1944 timepoints | Fifth & Market; Mission St & Ocean Ave; Daly City; Colma; San Bruno; Millbrae; Burlingame; San Mateo (Third & B) | 1944 timetable via Tundria | as above | – | (paraphrase) | [W][para] |
| Abandonment | 1949, the former MSRy No. 40 | CW | Callwell URL | p. not seen (≈ p. 46) | "1949 abandonment of the former MSRy No. 40 line (the descendant of the San Francisco & San Mateo Rwy.'s line to San Mateo County), which had provided suburban service to the city of San Mateo." | [O][snip] |
| Last day | farewell Saturday 1949-01-15; the last car left San Mateo early Sunday 1949-01-16 | RE | sfmuseum.org interurban.html | – | (paraphrase) | [W][para] |
| Daly City trackage | San Jose Ave track from Geneva car house to the Daly City "hill top" abandoned January 1949 | Tundria / RE (results) | as above | – | (paraphrase) | [W][para] |

### Routes (today's names)

- **1892-04-27 (SF&SM), outbound, by CW p. 14:**
  - Steuart St from Market St. Today Steuart stops about 395 m short of Harrison St, so the right of way south
    of Folsom is gone.
  - Harrison St to 14th St (37.7687, −122.4135); 14th St to Guerrero St (37.7680, −122.4244).
  - Guerrero St to San Jose Ave (37.7456, −122.4223); San Jose Ave to 30th St (37.7423, −122.4233).
  - 30th St to Chenery St; Chenery St.
  - Trestle over Diamond Ravine (Glen Park).
  - "Old San José Road" to Holy Cross Cemetery, Colma. Old San José Road still isn't identified with a
    present street.
- **Eastbound jog:** Harrison St, 8th St, Bryant St, Stanley Place = Sterling St (CW p. 14), then back to
  Harrison St. Today Sterling St meets Bryant (37.7837, −122.3928) but stops 119 m short of Harrison,
  under the Bay Bridge approach.
- **1902–03 extension:** from Baden (South San Francisco) about 13 miles [W] to San Mateo, beside and west of
  the SP. The 1915 and 1939 USGS sheets confirm it [img]; OHM has the geometry.
- **1928 (No. 40, OS29): not reached.** What the sources reached suggest for the post-1906 SF route:
  - Market St (from 5th St in 1944);
  - Mission St to the county line, with a late detour on Valencia St [W];
  - in Daly City, San Jose Ave, Geneva car house to the "hill top" [W].
- **Terminal in San Mateo:** 3rd Ave & B St [W].

### OpenHistoricalMap 2800853, checked

- **SF section:** way 200016954 (17 nodes) follows the **1892** route: Steuart, Harrison, 14th, Guerrero,
  San Jose and 30th to Chenery.
  - Single track, without the Bryant–Sterling jog.
  - Dated 1891–1949, from a YouTube video.
  - Way 200016955 goes on from Chenery to Daly City (37.708, −122.459), from the 1912 New Commercial Atlas
    (NARA 26335490).
- **So for the No. 40 after 1906, OHM's San Francisco geometry is the wrong street** (Mission St isn't
  there). It's right only for 1892–1906, and its 1891 start conflicts with CW's 1892-04-27.
- **South of Daly City:** way 200016967 is from USGS San Mateo 1939.
- **In San Mateo**, the ways come from:
  - the 1940 census enumeration district maps (NARA 5823166);
  - Bromfield's 1912 map of San Mateo (UC Berkeley digicoll 59012);
  - San Mateo County subdivision maps;
  - Sanborn 1908 for a spur dated 1901/1908.
- **Dates:** all the ways cite sfmuseum.org for 1903 and 1949.

### Conflicts

| Item | Values | Note |
|---|---|---|
| First day | 1892-04-27 (CW "next day", SFMTA blog, sfmuseum) vs 04-26 (Wikipedia: opened for business) vs 04-28 / 04-17 (Market Street Railway nonprofit's two anniversary posts) | take 04-27; 04-26 was the ceremony |
| OHM start | 1891 on the SF ways | contradicted by CW |
| Baden | late 1893 vs ≈1895 | newspaper |
| San Mateo | first car 1902-12-26 vs service "by 1903" | the first car was a line car, so public service probably came later: newspaper |
| Last day | 1949-01-15 (farewell; last run in the early hours of 01-16) vs 01-16 | per the earlier rule, `closed` = 1949-01-15 if the 01-16 run was the last trip of the 01-15 service day; needs the San Mateo Times |

### For Matthew

- **Newspapers:**
  - Opening: the Call, Apr 26–28, 1892.
  - Baden: the Call, 1893–95 (search "San Mateo electric" with "Baden").
  - San Mateo: the Call, Dec 26–31, 1902, and Jan to Jun 1903 for the first regular cars to San Mateo
    (Chronicling America and CDNC).
  - The end: San Mateo Times, Jan 14–17, 1949 (newspapers.com), and the SF Chronicle of Jan 16–17, 1949.
- **OS29** (archive.org `reportonstreetr1929osha_1`, the routes appendix about pp. 343–354): the No. 40's 1928
  route street by street. It's the one source that fixes the post-1906 SF streets. Read on the page image.
- **MAN09** (1909): the San Mateo line's "ROUTE—" entry, for the first post-1906 snapshot.
- **Book:** *San Francisco's Interurban to San Mateo* (Arcadia, Images of Rail), sold by the Market Street
  Railway nonprofit (https://www.streetcar.org/product/san-franciscos-interurban-san-mateo/). The author
  isn't confirmed here; page citations for the 1902–03 extension and the Valencia detour would help.
- **Maps:** USGS San Mateo 1:62,500 of 1915 (298922) and 1939 (301595), already georeferenced, to check OHM's
  ways south of Daly City. The 1899 edition (298915, surveyed 1892) shows Baden station and the SP but
  doesn't clearly separate the electric line; look at it at full size before using it.

---

## 4. Muni's 1915 exposition lines (G, I and J)

### Facts

| Fact | Value | Source | URL | Page/leaf | Quote | Tags |
|---|---|---|---|---|---|---|
| Exposition opened | 1915-02-20 | CW | Callwell URL | p. not seen (Feb 1915 entry) | "Opening day of the Panama-Pacific International Exposition, with an estimated 150,000 people in attendance." | [O][snip] |
| Muni's exposition service | four permanent and three temporary streetcar lines | CW, same entry | Callwell URL | p. not seen | (paraphrase) | [O][para] |
| Temporary lines named | G, I and J, in 1915 and 1916 | SFMTA blog, "How Muni's streetcar lines got their letters" | https://www.sfmta.com/blog/how-munis-streetcar-lines-got-their-letters | – | "The G, I and J were temporary lines created to serve the exposition in 1915 and 1916 (that first J line was unrelated to today's J Church)" | [O][snip] |
| G route | Market & Stockton to the Presidio via Union St | same blog | as above | – | "The G ran from Market and Stockton to the Presidio via Union Street" | [O][snip] |
| I route and life | Steiner & Union to Geary & 33rd Ave, "for just three days" | same blog | as above | – | "the I Line ran from Steiner and Union to Geary and 33rd for just three days." | [O][snip] |
| I, earlier note | 33rd Ave to the Exposition, Sundays and holidays | MFR or CAM (leaf not recorded) | https://archive.org/details/financialreport1912sanf_0 | leaf not recorded | (prev pass) | [O][prev] |
| J route and end | Columbus Ave, Ferries to the Exposition; to June 1, 1916 | MFR or CAM (leaf not recorded) | as above | leaf not recorded | (prev pass) | [O][prev] |
| J of 1917 | "Muni's eighth streetcar line, not counting the temporary lines that had been operated for the Panama-Pacific exposition" | CW | Callwell URL | p. not seen (1917 entry) | "The J line was Muni's eighth streetcar line, not counting the temporary lines that had been operated for the Panama-Pacific exposition." | [O][snip] |
| Count, other official | nine lines by 1915, six permanent, three fair service | SFMTA blog, "The world's fair that transformed Muni 100 years ago" | https://www.sfmta.com/blog/worlds-fair-transformed-muni-100-years-ago | – | "Between 1912 and 1915, Muni expanded its single Geary Street line into a total of nine lines, six of which became a permanent part of Muni (the other three were special fair service)." | [O][snip] |
| G as E + F | "a combination of the E and F routes" | Wikipedia, List of defunct Muni lines | https://en.wikipedia.org/wiki/List_of_defunct_San_Francisco_Municipal_Railway_lines | – | (paraphrase) | [W][para] |
| Possible G in 1916 | E branch "Presidio to Market, Fourth and Ellis via Union and Stockton" from 1916-01-24 | MFR | as above | n75 [prev] | (prev pass, image) | [O][img][prev] |

### Routes (as far as sourced)

- **I:**
  - Geary Blvd & 33rd Ave (the B's track) to Steiner & Union Sts by the Exposition (SFMTA blog).
  - The streets between aren't sourced. Muni's tracks then ran on Geary, Van Ness (D) and Union (E), but
    the path isn't stated: **don't draw** until MFR or VIL15 names it.
- **J (1915):**
  - From the Ferries via Columbus Ave to the Exposition.
  - The streets before Columbus Ave (The Embarcadero? Jackson/Washington as on the E?) and after it (North
    Point and Van Ness, as on the F?) aren't sourced. Those guesses are only questions for the reports.
- **G:**
  - Market & Stockton to the Presidio via Union St; Wikipedia says the E plus the F.
  - MFR n75's 1916 E branch "via Union and Stockton" may be the same service continued. Unconfirmed.

### Conflicts

| Item | Values | Note |
|---|---|---|
| I's service | "Sundays and holidays" (prev pass, MFR/CAM) vs "just three days" (SFMTA blog) | could both be true (three holidays): read MFR's 1915 chronology |
| Count of exposition lines | 4 permanent + 3 temporary (CW) vs 6 permanent + 3 (SFMTA blog) | depends on whether A, B and C count; no effect on drawing |
| J's end | June 1, 1916 (prev pass) vs "1915 and 1916" (blog) | consistent |

### For Matthew

- **MFR** (archive.org `financialreport1912sanf_0`): the 1914–15 report's chronology (around leaf n47) and
  its routes table, and the 1915–16 report (around n75–n80), for:
  - I and J's first and last days and their streets;
  - the leaf numbers the earlier note didn't record.
- **VIL15** (archive.org `municipalrailwa00vilagoog`, 1915): Vilas wrote during the fair; look for "Exposition"
  routes.
- **CAM** (`historyofpublict1947sanf`) pp. 36–37: the 1915 routes list.
- **Newspaper:** the Call (Chronicling America), Feb 18–22, 1915 for the exposition service, and May 30 to
  June 2, 1916 for the J's end.
- **Book:** Perles, *The People's Railway* (1981), on Muni's first years.

---

## 5. Omnibus Railroad & Cable Co. (1889) and the Pacific Ave cable (lower priority)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Omnibus cable, first day | 1889-08-26 | CW | Callwell URL | p. 13 [prev] | "First day of service on the Omnibus Co.'s main cable route, beginning at the ferry terminal and running on The Embarcadero and Howard St." | [O][snip][prev] |
| Two lines | Howard & 26th St; and east on 24th St to Potrero Ave | CW, same entry | Callwell URL | p. 13 | "There were two lines on the route, one to Howard & 26th St. and the other turning east from Howard, on 24th St. to Potrero Ave." | [O][snip] |
| Last cable company | the last in SF to start cable operations | CW, same entry | Callwell URL | p. 13 | "This was the last company in S.F. to start cable operations" | [O][snip] |
| Electrified | after the Market Street Railway consolidation; "over the next few years" after 1894 | CW | Callwell URL | p. 16 [prev] | "After that, the cable car lines that it had acquired from the Omnibus Co. were converted to electric service." | [O][snip][prev] |
| Pacific Ave cable, last day | 1929-11-17 | CW | Callwell URL | p. 38 [prev] | – | [O][prev] |
| Pacific Ave route | Polk → Divisadero (OS29) or → Broderick (MAN09) | OS29; MAN09 | – | – | (prev pass) | [O][C][prev] |
| Pacific Ave opening | not found in an official source | – | – | – | – | – |

**Omnibus route, 1889 (today's names):**
- From the ferry terminal on The Embarcadero (old East St, CW p. 8) to Howard St.
- Howard St southwest to 12th St, then South Van Ness Ave (old Howard St south of 12th, CW p. 13).
  - Today Howard meets South Van Ness at 37.7704, −122.4177.
- The main line to 26th St (37.7492, −122.4160).
- The branch: 24th St east from South Van Ness (37.7524, −122.4163) to Potrero Ave (37.7530, −122.4063).
- The Post, Oak and Ellis lines in the earlier note remain [R]: not found in this pass.

**For Matthew:**
- Omnibus: the Alta of Aug 26–27, 1889.
- Pacific Ave opening: the Call. The year isn't known; JT gives one [R], so check his date first and then
  that week's Call.

---

## Street names added or checked in this pass

| Old or ambiguous name | Today | Source |
|---|---|---|
| Stanley Place | Sterling St | CW p. 14, "Stanley Place (now Sterling St.)" [snip] (already in the table) |
| H St | Lincoln Way | CW p. 10, "H St. (now Lincoln Way)" [para] (already in the table) |
| Central Ave (in the McAllister powerhouse block) | today's Central Ave by Masonic Ave, **not** Presidio Ave | Cable Car Museum [W]; geometry check |
| Pt. Lobos Ave between 33rd Ave and about 42nd Ave | Geary Blvd (Point Lobos Ave survives west of 42nd Ave to 48th Ave and the Cliff House) | today's streets only; the equivalence stays unsourced |
| D St | Fulton St | JT [W] only (as before) |

## Sources used in this pass

| Source | Author, date | URL | archive.org id | Status |
|---|---|---|---|---|
| *Transit in San Francisco: A Selected Chronology, 1850–1995* | Robert Callwell, Muni, Sept 1999 | see the top | – | official; copyright SFMTA; cited for facts; **read only through search excerpts** in this pass |
| "SF's first electric streetcar line opened 125 years ago today" | SFMTA blog, 2017-04-27 | https://www.sfmta.com/blog/sfs-first-electric-streetcar-line-opened-125-years-ago-today | – | official; cited for facts; excerpts only |
| "How Muni's streetcar lines got their letters" | SFMTA blog (date not seen) | https://www.sfmta.com/blog/how-munis-streetcar-lines-got-their-letters | – | official; excerpts only |
| "The world's fair that transformed Muni 100 years ago" | SFMTA blog, 2015 | https://www.sfmta.com/blog/worlds-fair-transformed-muni-100-years-ago | – | official; excerpts only |
| USGS San Francisco 1:62,500 | USGS, eds. 1895 (scan 298889), 1899 (298890), 1915 (298896), surveyed 1894 | prd-tnm.s3.amazonaws.com …/CA_San%20Francisco_2988{89,90,96}_…_62500_geo.tif | – | public domain (US Government); looked at on the image |
| USGS San Mateo 1:62,500 | USGS, eds. 1899 (298915), 1915 (298922), 1939 (301595) | prd-tnm.s3.amazonaws.com …/CA_San%20Mateo_{298915_1899,298922_1915,301595_1939}_62500_geo.tif | – | public domain; looked at on the image |
| OpenHistoricalMap relation 2800853 and its ways | OHM contributors | https://www.openhistoricalmap.org/relation/2800853 | – | CC0; dates cite sfmuseum.org |
| Overture Maps transportation, 2026-09-23.1 (already in the repo) | Overture | `data/raw/overture/2026-09-23.1/sf-roads.parquet` | – | ODbL (as logged); used only to measure today's junctions |
| Rice & Echeverria, "End of San Francisco interurban streetcar service – 1949" and "San Francisco & San Mateo Railway Company – 1892" | Museum of the City of San Francisco | http://sfmuseum.org/hist10/interurban.html ; http://sfmuseum.org/hist10/sf&sm.html | – | secondary; pointer [W] |
| Cable Car Museum pages | Cable Car Museum | https://www.cablecarmuseum.org/co-market-st.html ; https://www.cablecarmuseum.org/archive/8c/8c.htm | – | pointer [W] |
| Joe Thompson, The Cable Car Home Page | railfan | https://www.cable-car-guy.com/html/ccsfmsr.html and related pages | – | pointer [W] |
| Market Street Railway (nonprofit) blog | streetcar.org | https://www.streetcar.org/hayes-street-transit-since-1860/ | – | pointer [W] |
| OpenSFHistory / Western Neighborhoods Project | outsidelands.org, opensfhistory.org | https://www.opensfhistory.org/osfhcrucible/2019/12/08/mcallister-car-barn-a-closer-look/ ; https://www.outsidelands.org/21-line.php ; https://www.outsidelands.org/5-line.php | – | pointer [W] |
| Wikipedia: "San Francisco and San Mateo Electric Railway", "5 Fulton", "List of defunct San Francisco Municipal Railway lines" | – | en.wikipedia.org | – | pointer [W] |
| Tundria timetable pages (1944, 1948) | railfan | http://www.tundria.com/trams/USA/SanFrancisco-1944.php | – | pointer [W] |
| HMdb "Transportation Evolution"; San Mateo Daily Journal, "The number 40 trolley line" | marker; newspaper feature | https://www.hmdb.org/m.asp?m=206508 ; smdailyjournal.com | – | pointer [W] |
| Reused from the earlier pass | CAM (1948), MFR (1912–30), OS29 (1929), MAN09 (1909) | see `docs/research/sf-street-railways.md` | historyofpublict1947sanf; financialreport1912sanf_0; reportonstreetr1929osha_1; reportonoperatio00manlrich | MAN09 (1909) and MFR's reports to FY1928 are public domain by date; OS29 (May 1929) and CAM (1948) are public records, cited for facts |
| Not reached; listed for a later pass | Langley's San Francisco Directory, 1889 | https://archive.org/details/langleyssanfranc1889sanf | langleyssanfranc1889sanf | public domain (1889) |
