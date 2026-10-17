# Research: the San Rafael & San Quentin (the NPC / North Shore / NWP San Quentin branch and ferry), and the Sacramento Northern's Oakland – Lafayette freight, 1941–1957

Gathered 2026-10-16. Extends `railroads.md` §1 (NPC rows) and `east-bay-electric.md` §2 (SN endings).
For `data/past/north-pacific-coast/`, `data/past/ferries/` and `data/past/sacramento-northern/`
(decision 15).

## How this pass worked, and how far to trust it

- **archive.org text and page images both worked**, but only from each item's own data server.
  `/download/<id>/…` redirects to `dn*.ca.archive.org`, which the proxy refuses (403). So the server and
  directory came from `/metadata/<id>`, and files were read from `https://<server><dir>/<file>`
  (the `_djvu.txt`, `_hocr.html`, `_hocr_pageindex.json.gz` and `_hocr_searchtext.txt.gz`). Page images came
  from `https://<server>/BookReader/BookReaderImages.php?zip=<dir>/<id>_jp2.zip&file=…_<leaf>.jp2`
  (or the `_tif.zip` for old Google scans). Leaves are `n<i>`; a leaf link is
  `https://archive.org/details/<id>/page/n<i>/`.
- **Finding pages:** archive.org full-text search
  (`/services/search/beta/page_production/?service_backend=fts&user_query=…`) for leads; then the hOCR page
  index to find the leaf, and the hOCR word boxes to crop the column. Every quote tagged **[img]** was read on
  the cropped page image; the printed page was read on the image, or from the OCR's running heads where the
  image crop cut it off (said so).
- **What was searched and found nothing:** CRC Decisions vols. 1–20 (1911 – May 1921,
  `california-railroad-commission-decisions_1` … `_20`), grepped for "San Quentin": only water, prison,
  stage and the Richmond ferry; **no order on San Quentin trains**. ICC Northwestern Pacific abandonments
  1932–35 (F.D. 9657/9736, 9949, 10893, 11009; Monthly Catalog and *Traffic World*): none is the San
  Quentin branch. The *Argonaut* 1911–1913: no NWP timetable advertisements. CPUC decisions of 1956–57 and
  files.cpuc.ca.gov were **not** searched in this pass (no decision number lead).
- **Not reachable / not readable:** CDNC (so the *Sausalito News* and *Marin Journal* were not read);
  books in archive.org's lending library (Dickinson's *Narrow Gauge to the Redwoods*, Stindt's *The
  Northwestern Pacific Railroad*, Benson's *One Track Mind*, *Pacific News* 1972, *Oil Lamps and Iron
  Ponies*, Harlan's ferryboat books): their search snippets are pointers only **[W]**.
- **Tags:** [P] primary (company timetable or advertisement, contemporary newspaper or trade periodical);
  [O] official (ICC, Railroad Commission, state returns); [C] contemporary compiled (county history, ICC
  digest, Poor's); [S] secondary (a later railfan history, e.g. Borden 1949); [W] pointer only;
  [img] read on the page image; [ocr] OCR text only.
- Downloads are in the session scratchpad (`npc-sn/`), not kept in the repo; each entry's id and leaf
  reopen it.

---

## 1. San Rafael & San Quentin RR, and the San Quentin ferry (NPC 1875–1902, North Shore 1902–07, NWP 1907 on)

### Answer in one paragraph

A steamer ran from San Francisco to Point San Quentin **before the railroad** (by April 1867, with stages to
San Rafael). The **San Rafael & San Quentin** (standard gauge, 3½ mi) made its first trip on
**1870-03-21**, and from **1870-04-30** Minturn's steamer *Contra Costa* connected with "the recently
constructed Railroad to San Rafael". The North Pacific Coast leased it from **1875-03-11** (lease to
1918, $1 a year), relaid it to 3 ft gauge, and made Point San Quentin its **passenger** terminal: in 1877
the steamer *San Rafael* ran San Francisco – San Quentin "connecting with trains" for San Rafael, the
Junction (San Anselmo) and through trains to Duncan Mills, while Saucelito took the freight. **The San
Quentin ferry ended with the NPC timetable of late April 1884**: the timetable of 1884-01-21 still runs
boats "via San Quentin Ferry" (advertised to 1884-04-19), and the one "Commencing Saturday, April 27th,
1884" sends every boat via Saucelito. Trains kept running to San Quentin: the North Shore's San Francisco
timetable marked trains that "run to San Quentin" from at least 1903-02-16 to 1903-11-02. **The electric
line (1903) did not run to San Quentin** ("this extension is not in operation at present", Jan 1904);
steam trains shuttled San Rafael – San Quentin (Borden), two each way daily in the 1909 timetable (a 1953
railfan summary). **Passenger service ended in 1913** — that rests on one railfan history (Borden, *Western
Railroader*, Apr 1949) and no order or newspaper was found. The track went on as a freight branch: the NWP
employee timetables list the "San Quentin Branch", San Rafael (mile 17.0) to San Quentin (20.1), from
1929-10-20 to 1933-09-17, and drop it from the page that replaced it on **1934-01-15**; no railway is on
Point San Quentin on the 1948 USGS sheet (photos 1947). **When the freight ended is not sourced.**

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| Q1 | Ferry before the railroad: San Francisco – Point San Quentin – Point Isabel, stages to San Rafael | ad of 1867-04-06 | *Banner of Progress* 1(13), 1867-04-06 | `IAPSOP-banner_of_progress_v1_n13_apr_6_1867_partial` | PDF p. 1 (rendered with pdftoppm) | "SAN PABLO AND SAN QUENTIN FERRY. Through to San Rafael and Point Isabel. From Vallejo and Davis Streets. … Connecting with Stages for San Rafael, Olima, Tomales, and Bolinas" | [P][img] |
| Q2 | SR&SQ incorporated; standard gauge; 3½ miles | 1869-02-25 | Borden, *Western Railroader* 12(6), Apr 1949 | `sim_western-railroader-the-western-railfan_1949-04_12_6` | p. 6 (n5) | "The San Rafael & San Quentin Railroad was incorporated on February 25, 1869. It was standard gauge and was built from San Rafael to San Quentin, a distance of 3½ miles" | [S][img]; agrees with *Poor's* 1885 p. 871 "Chartered February 25, 1869" ([ocr], `railroads.md`) |
| Q3 | Three San Rafael terminus sites discussed (which was chosen is not stated) | 1869-03-17 | *History of Marin County* (1880) | `historyofmarinco00munr` | p. 333 (n423) | "First, At the foot of E street, on what is called Short's addition … Second, The foot of B street … Third, At the foot of Second street, at the edge of the salt marsh." | [C][ocr] |
| Q4 | **First trip** | **1870-03-21** (Mon) | same | same | p. 333 | "on Monday, March 21, 1870, the initiatory trip was made, since when the line has been in working order" | [C][ocr] (already in the repo) |
| Q5 | **Ferry connecting with the railroad**; three boats each way, Sundays excepted | from **1870-04-30** (ad still running 1870-10-07) | *The Voice of Israel*, 1870-10-07 | `casfema_000161` | [p. 7] (n6) | "On and after April 30, 1870, the favorite steamer CONTRA COSTA … will leave as follows, daily (Sundays excepted) … Connecting at Point San Quentin with the recently constructed Railroad to San Rafael" | [P][img]; signed "CHAS. MINTURN"; boats from "Ferry Wharf, Davis Street, bet. Broadway and Vallejo" |
| Q6 | NPC lease; its terms on trips | March 1875 | *History of Marin County* (1880) | `historyofmarinco00munr` | p. 334 (n424) | "the Narrow Guage agree to run three trips via San Quentin, and as early as April 1, 1876, to commence and run two trips daily via Saucelito." | [C][img] |
| Q7 | **Lease dates, length, ferry in the NPC's mileage** | lease 1875-03-11 to 1918-03-11; return for 1877 | NPC's return, in the Board of Commissioners of Transportation's report | `reportboardcomm00trangoog` | p. 211 (tif leaf 0357) | "San Rafael and San Quentin Railroad. Termini From San Rafael to San Quentin. Length 3.50 miles. Dates of lease From March 11, 1875, to March 11, 1918." … "including San Quentin Ferry 91.25 miles." | [O][img]; p. 210: "including San Quentin ferry, 11.5 miles" [ocr] |
| Q8 | NPC winter timetable: steamer *San Rafael* SF – San Quentin "connecting with trains"; trains on to San Rafael and the Junction; the 10.00 a.m. boat meets the through train to Duncan Mills | from **1877-11-05** (ad in the issue of 1878-01-12) | *The Argonaut* 2(1), 1878-01-12 | `argonaut21878sanf` | p. 16 (n24) | "the new, swift, and elegantly appointed steamer, SAN RAFAEL, Will run between San Francisco and San Quentin (connecting with trains at latter place)" … "for San Quentin, San Rafael, and Junction." | [P][img] |
| Q9 | **San Quentin = the NPC's passenger terminus**, by the branch from the main line | as of 1880 | *History of Marin County* (1880) | `historyofmarinco00munr` | p. 148 (n189) | "a second terminus … at San Quentin, by a branch road, which leaves the main line two miles north of San Rafael. The Saucelito terminus is used for freight business, while the San Quentin terminus is used principally for the passenger business." | [C][img]; "two elegant ferry boats, built in New York", "about nine miles" |
| Q10 | Last timetable with the San Quentin ferry: boats to San Rafael "via San Quentin Ferry" and "via Saucelito Ferry" | timetable from 1884-01-21; still advertised **1884-04-19** | *The Argonaut* 14(16), 1884-04-19 | `argonaut141884sanf` | p. 13 (n259) | "Commencing Monday, January 21st, 1884 … For SAN RAFAEL (via San Quentin Ferry)—†10.15, *11.15 A. M., *4.50, †5.00 P. M." | [P][img] |
| Q11 | **San Quentin ferry gone**: all boats via Saucelito; the heading still names San Quentin | timetable "Commencing Saturday, April 27th, 1884" (ad in the issue of 1884-05-03) | *The Argonaut* 14(18), 1884-05-03 | `argonaut141884sanf` | p. 13 (n291) | "SAUCELITO—SAN RAFAEL—SAN QUENTIN, via NORTH PACIFIC COAST R. R. … Commencing Saturday, April 27th, 1884 … For SAN RAFAEL and SAUCELITO (week days)—7.30, 9.15 A. M." | [P][img]; the same timetable is in the 1884-05-10 issue (n307); then "Commencing Monday, May 12th, 1884" (n371), also via Saucelito only |
| Q12 | NPC still operating the leased line; U.S. mail to San Quentin | returns for 1892 / FY 1893 | Board of Railroad Commissioners, Report 1893–94 (the NPC's report) | `annualreportboa29commgoog` (another scan of `ca-brc-report-1894`) | NPC report p. 84 | "San Anselmo to San Rafael .. Branch line … San Rafael to San Quentin ... Leased line" / "United States mails from San Francisco to Cazadero, San Quentin, and Mill Valley." | [O][ocr] |
| Q13 | North Shore plan to electrify, including San Quentin (a plan) | 1901-12-14 | *Sonoma Index-Tribune*, 1901-12-14 | `casomvhs_001247` | — | "The entire railroad, from Sausalito to San Rafael and San Quentin, from the junction to Mill Valley … will be converted into an electric railway." | [P][ocr] |
| Q14 | **Through trains from San Francisco to San Quentin**: weekdays *7.45 a.m., *1.45 and *6.15 p.m.; Sundays *9, *10 a.m., *1.30, *3.50 p.m. | ads from 1903-02-16 (first North Shore ad in the *Argonaut*) to **1903-11-02** | *The Argonaut* 53 (No. 1390), 1903-11-02 | `argonaut531903sanf` | p. 288 (n298) | "FOR SAN RAFAEL, ROSS, MILL VALLEY, ETC., Via Sausalito Ferry. … Trains marked * run to San Quentin." | [P][img]; first in v. 52 No. 1353, 1903-02-16 [ocr]; in ten issues of v. 53 (n70 … n298) [ocr] |
| Q15 | Electric suburban timetable: no San Quentin trains named | ad of **1903-11-09** | *The Argonaut* 53 (No. 1391), 1903-11-09 | `argonaut531903sanf` | p. 304 (n314) | "Suburban Service, Standard Gauge Electric—Depart from San Francisco Daily—7.00, 8.00, 9.00, 10.00, 11.00 A. M." | [P][img]; San Quentin is not in any later *Argonaut* timetable checked (vols. 54–67, 1904–1910) [ocr] |
| Q16 | **The electric line did not run to San Quentin** | 1904-01-02 | *Street Railway Journal* 23(1) | `streetrailwayjo231904newy` | p. 6 (n22) | "The line extends to San Quentin, where one of the State penitentiaries is located, but this extension is not in operation at present." | [P][img] |
| Q17 | Steam passenger trains San Rafael – San Quentin after electrification | 1903 on | Borden 1949 | `sim_western-railroader-the-western-railfan_1949-04_12_6` | p. 7 (n6) | "Steam passenger trains continued to run from Sausalito to Cazadero and between San Rafael and San Quentin and steam freight trains operated over the whole railroad." | [S][img] |
| Q18 | Junction at San Rafael's B Street station; gauge changed on lease | 1875 | same | same | p. 7 (n6) | "the other to B street station in San Rafael, where connections were made with the San Rafael & San Quentin. On March 11, 1875, the San Rafael & San Quentin was leased to the North Pacific Coast and its track was changed to three foot gauge." | [S][img] |
| Q19 | SR&SQ merged into the NWP | 1907-01-08 | Railroad Commission of California, report (c. 1911–12), "Steam railroads and officials" | `reportrailroadc00unkngoog` | p. 172 | "Incorporated January 8, 1907 … Formed by consolidating the following: … North Shore Railroad Company … San Rafael and San Quentin Railroad Company." | [O][ocr] |
| Q20 | Two trains daily each way San Rafael – San Quentin | 1909 timetable | *Western Railroader* 16(8), June 1953 (unsigned, "A day in the redwoods") | `sim_western-railroader-the-western-railfan_1953-06_16_8` | pp. 3, 5 (n2, n4) | p. 3: "The 1909 timetable from which the map in this issue is taken shows the following services"; p. 5: "The branch between San Rafael and San Quentin had two trains daily each way." | [S][img]; the 1909 timetable itself was not found |
| Q21 | **Passenger service ended** | **1913** (year only) | Borden 1949 | `sim_western-railroader-the-western-railfan_1949-04_12_6` | p. 10 (n9) | "In 1913 the track was completed from South Fork to McCann … Passenger service was discontinued between San Rafael and San Quentin and between Samoa and Arcata." | [S][img]; no CRC order (vols. 1–5 searched), no newspaper |
| Q22 | Freight branch in the NWP employee timetable: San Rafael 17.0 – San Quentin 20.1 (3.1 mi), no scheduled trains | **1929-10-20** | NWP employee timetable No. 4 | `cscrm_2021_02_001171` | p. 8 (n7) | Table "Time-Table No. 4 October 20, 1929 … 17.0 DNR SAN RAFAEL 3.1 … 20.1 SAN QUENTIN 0.0" | [P][img]; speed restriction "San Quentin Branch … 12 12" (n11) [ocr] |
| Q23 | Same table; locomotive limit for the branch | **1933-09-17** | NWP employee timetable No. 12 | `cscrm_2021_02_001294` | p. 4 (n3); n7 | "17.0 TO-R SAN RAFAEL 3.1 … 20.1 SAN QUENTIN 0.0"; n7: "San Quentin Branch … 114 T-57-19/26-110 169,000" | [P][img]; listed in every timetable in between (Nos. 5–11, 1930–33) [ocr] |
| Q24 | **Dropped from the timetable**: the page that replaced p. 4 omits the San Rafael – San Quentin (and Sebastopol, Donahue) tables | **1934-01-15** | Supplement No. 1 to timetable No. 12 | `cscrm_2021_02_001320` | p. 4 (n1) | "SUPPLEMENT No. 1 TO TIME-TABLE No. 12 SUPERSEDING PAGE 4 To Take Effect Monday, January 15, 1934" (no San Quentin table on the page) | [P][img]; also absent from the locomotive-weight tables of No. 13 (1934-06-10, n7), No. 14 (1934-09-15, p. 8, n7) and No. 16 (1935-09-15, n7) [img] |
| Q25 | The NWP's system map still draws the branch, San Rafael by California Park to San Quentin | map "June 1930", "Revised Apr. 15, 1934" | in NWP employee timetable No. 13 (1934-06-10) | `cscrm_2021_02_001319` | n9 (Sausalito inset) | (map) | [P][img]; a map can lag the track |
| Q26 | **No railway on Point San Quentin** (roads and the Richmond ferry pier only) | aerial photos 1947, ed. 1948 | USGS San Quentin 7.5′ | `usgs-san-quentin-1948` (local GeoTIFF in `data/raw/usgs/`) | — | (map) | [P][img]; San Rafael itself is off this sheet |

Notes:
- The ferry before 1870 (Q1) and after the railroad (Q5) was Charles Minturn's; the NPC ran its own boats
  from 1875 (Q6–Q8). The ferry's start before April 1867 is not sourced here.
- The line between the NPC (1884) and the North Shore ads (1903) is thin: the NPC's ads of 1884–1888
  name San Quentin in the heading (Q11; the timetable "Commencing Monday, October 17, 1887" in
  `argonaut221888231888sanf` [ocr]) but print no San Quentin times; the 1893 return (Q12) shows the line
  operated and carrying mail. No San Quentin train times between 1884 and 1903 were found.
- After 1934 the NWP timetables (Nos. 13–23) were searched by OCR for "Quentin" with no hit; their
  "interurban electric territory" is "(San Rafael, Mill Valley, Sausalito, Manor and points between)"
  (No. 17, 1939, n6) [ocr].

### Route and stations (all that is sourced)

- **Point San Quentin** (ferry wharf; the railroad met the boats there): Q1, Q5, Q8, Q9. The State Prison
  at San Quentin village lies just west of the point (USGS 1948, Q26).
- **San Rafael**: the SR&SQ's other end. Its terminus site (E St, B St or Second St) is **not stated**
  (Q3). In the NPC years the SR&SQ met the NPC's San Rafael branch at **B Street station** (Q18, [S]); the
  NPC branch ran **San Anselmo (the Junction) – San Rafael**, 2 mi (Q12; `poors-1885`). In the NWP years the
  branch starts at **San Rafael** station, mile 17.0 from San Francisco (Q22, Q23), and the 1930/34 map
  draws it southeast by **California Park** (Q25).
- **Through running:** in 1877 boats met trains at San Quentin "for San Quentin, San Rafael, and Junction",
  and through trains to Duncan Mills (Q8). So the NPC line's route from Point San Quentin runs over the
  SR&SQ to San Rafael, then the San Rafael branch to San Anselmo, then the main line.
- **Length:** 3.50 mi (Q7), 3½ mi (Q2), 3.1 mi in the NWP timetables (Q22) — see conflicts.
- **Geometry:** not in any text. `phase-2c.md` says OpenHistoricalMap has the SR&SQ and the ferry from the
  1895–97 USGS sheets (Tamalpais 15′); use those, or the 1930/34 NWP map (Q25) for the NWP-era junction.

### Conflicts

1. **Opening year:** 1870-03-21 (Marin p. 333) vs "road opened in March, 1871" (*Poor's* 1885 p. 871,
   [ocr]) vs "The line opened in 1871" (Sievers, *Western Railroader* 2(8), June 1939, [ocr]). The ferry
   advertisement (Q5) runs from 1870-04-30 and calls the railroad "recently constructed" [img], which
   supports **1870**.
2. **The April 1884 timetable's day:** printed "Saturday, April 27th, 1884", but 1884-04-27 was a Sunday
   (April 26 was the Saturday) [img]. Either the day or the weekday is a misprint.
3. **Length:** 3.50 mi (1877 return) vs 3.1 mi (NWP timetables 1929–33). The NWP figure runs from San
   Rafael station, and the 1877 one from the SR&SQ's own San Rafael end; not resolved.
4. **The 1913 end** rests on Borden alone [S]; the *Argonaut*'s last San Quentin train notice is 1903
   (the ads change form with the electric service, Q15), and the 1909 evidence (Q20) is a 1953 railfan
   summary of a timetable not seen here.
5. **Electric:** the SRJ (Q16) says the line "extends to San Quentin" but the extension was not operated;
   Borden (Q17) says steam trains ran there. Read together: no electric service to San Quentin. (Borden
   also gives the first electric train to San Rafael as 1903-09-19, against the SRJ's 1903-10-17 opening
   already in the repo.)
6. **The freight end:** last listed 1933-09-17 (Q23), off the timetable from 1934-01-15 (Q24), still on the
   NWP map revised 1934-04-15 (Q25), gone by 1947 (Q26). [W]: *When the Railroad Leaves Town* (search
   snippet) gives "the abandonment of the little-used route to San Quentin in 1946"; Stindt (1964, snippet)
   mentions the NWP discontinuing "the San Quentin ferry service and 0.22 mile of line that ran out on the
   wharf". Neither was read.

### Still unsourced

- The day passenger service ended in 1913, and under what authority (the CRC decisions of 1913 have no
  order on it).
- When the branch's freight ended and when it was abandoned (no ICC finance docket for it found in
  1932–35); the 1946 pointer.
- When the NPC's narrow gauge on the branch was changed back to standard gauge.
- The San Rafael terminus site and street alignment; the ferry wharf's length.
- San Quentin train times 1884–1903; the ferry's start before 1867.

### Proposed treatment (for the data pass; not done here)

- A passenger line (the SR&SQ and its NPC / North Shore / NWP successors), **opened 1870-03-21**
  (`marin-history-1880` p. 333), **closed 1913** (`western-railroader-1949-04` p. 10, year only, flagged as
  a railfan source), with `running[]` at 1870-04-30, 1877-11-05, 1884-01-21, 1903-02-16 … 1903-11-02 and
  1909 (the last [S]).
- A ferry, San Francisco – Point San Quentin: `running[]` 1867-04-06 (with Point Isabel) and 1870-04-30;
  the NPC's boats from the lease (1875) to the timetable change of **April 1884** (`closed: "1884-04"`,
  noting the printed "Saturday, April 27th" and that the last ad with the ferry is 1884-04-19).
- The San Rafael – San Quentin segment stays in the railroad mode after 1913 for its freight years
  (decision 15), with running dates 1929-10-20 and 1933-09-17; its `closed` is null with
  `closed_unsourced`.

---

## 2. Sacramento Northern freight, Oakland (40th St & Shafter Ave) – (West) Lafayette, 1941–1957

### Answer in one paragraph

On **1955-11-26** *Traffic World* reported the application: the Oakland Terminal, the Sacramento Northern
and its trustees asked the ICC (**Finance Docket No. 19124**) to abandon "about 17.52 miles of line in
Oakland and West Lafayette", with a companion application (**F.D. 19125**) for the Oakland Terminal and the
Western Pacific to build a substitute connection in West Oakland (the Union Street line). The ICC's
Division 4 **granted both on 1956-07-03** (*ICC Practitioners' Journal*, Sept 1956), with the employee
protection conditions of 257 I.C.C. 700. The local press and *The Western Railroader* reported it in July and
August 1956 ("18 miles … from Lafayette, through Moraga and Canyon into Oakland", "including the trackage in
Shafter Avenue"). The last passenger movement was a railfans' "farewell" run on **Sunday 1957-01-13**,
after maintenance on the line had ended. The Union Street line opened on **1957-03-01**, and the
*Orinda Sun* of 1957-04-05 states that **the 16 miles from 40th and Shafter, Oakland, to West Lafayette
station "were abandoned by Western Pacific as of March 1"** (1957); the track and wire were sold for scrap on
1957-03-28. The whole stretch — Shafter Ave, the Oakland hills (Redwood Peak) tunnel, Canyon, Moraga — closed
at once; no stretch is reported closing earlier. **The abandonment stopped at West Lafayette**, not at
Lafayette: the line from Lafayette station east stayed in WP/SN service. The SN's passenger trains to Oakland
ended in **1941** (the *Orinda Sun*, 1957: "1941 was the year when commuter service on the line was dropped;
since then the Sacramento Northern has been used only for freight"), which agrees with the repo's 1941.
The last freight train's day is **not** in any source read (pointers say Thursday 1957-02-28).

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| S1 | **Application, F.D. 19124**: abandon Oakland – West Lafayette | reported 1955-11-26 | *Traffic World* 96, 1955-11-26, "Oakland Terminal" | `sim_traffic-world_1955-11-26_96` | p. 60 (n61; page number from the OCR's order, not seen on the image) | "The Oakland Terminal Railway, the Sacramento Northern Railway, and the Sacramento Northern trustees, by an application in Finance No. 19124, have asked the Commission for authority to abandon about 17.52 miles of line in Oakland and West Lafayette" | [P][img] |
| S2 | Why; the companion F.D. 19125 | 1955-11-26 | same | same | same | "Sacramento Northern said there was uncertainty as to its right to continue operation without franchise authority through an Oakland residential area and that an expenditure of about $1,100,000 would be required" | [P][img]; F.D. 19125: Oakland Terminal and WP to "extend their lines in Oakland a distance of 0.71-mile" [img] |
| S3 | **ICC grants the abandonment** (Division 4), with employee conditions | **1956-07-03** | *ICC Practitioners' Journal* 23(10), Sept 1956 | `sim_icc-practitioners-journal_1956-09_23_10` | p. 1219 (n136) | "257 I. C. C. 700 conditions imposed for the protection of employees. F. D. 19124, Oakland Terminal Ry. et al. Abandonment, July 3, 1956, Div. 4." / "Oakland Terminal R., et al, F. D. 19124, Granted, July 3, 1956" | [C][img] |
| S4 | ICC grants the Union Street construction | 1956-07-03 | same | same | p. 1210 (n127) | "Oakland Terminal Railway et al., Construction, F. D. 19125, July 3, 1956" | [C][img] |
| S5 | Approval announced | reported 1956-07-14 | *Traffic World* 98, 1956-07-14, "Oakland Terminal" | `sim_traffic-world_1956-07-14_98` | p. 36 (n41) | "approval of a report and certificate in Finance No. 19124, Oakland Terminal Railway et al., Abandonment. In the application the Oakland Terminal and the Sacramento Northern railways asked authority to abandon about 15.52 miles of line in Oakland Terminal and West Lafayette" | [P][img] |
| S6 | Local report: the route abandoned; freight to be loaded at Lafayette | 1956-07-13 | *Orinda Sun*, 1956-07-13, "Old rail lines to be abandoned" | `caorihs_000435` | p. 1 (n0) | "The Interstate Commerce Commission in Washington, D.C., has authorized the railway to abandon its 18 miles of track from Lafayette, through Moraga and Canyon into Oakland." | [P][img]; "Freight from industries in the Contra Costa County areas will be loaded at Lafayette" [img]; "franchise expired in 1946" [ocr] |
| S7 | Shafter Avenue included; the Oakland Terminal's Key System link to 40th & Shafter goes too | Aug 1956 | *Western Railroader* 19(10), Aug 1956, "I.C.C. approves Sacramento Northern abandonment" | `sim_western-railroader-the-western-railfan_1956-08_19_10` | p. 8 (n7) | "Eighteen miles of SN track will be abandoned between Lafayette and 40th & Shafter including the trackage in Shafter Avenue franchise for which expired some time ago." | [P][img]; next sentence: "The Oakland Terminal will abandon service from Yerba Buena yards to 40th & Shafter over the Key System." [img] |
| S8 | **Last passenger movement**: railfans' "farewell" run, after maintenance ended | **1957-01-13** (Sun) | *Western Railroader* 20(4), Feb 1957 | `sim_western-railroader-the-western-railfan_1957-02_20_4` | p. 16 (n15) | "On the Sacramento Northern a "farewell" passenger run was made January 13 due to an end to maintenance on the portion to be abandoned between Oakland and Lafayette." | [P][img] |
| S9 | Same trip, from 40th & Shafter by Redwood Canyon to Lafayette and Pittsburg; "to be abandoned soon" | 1957-01-13 (reported 01-18) | *Orinda Sun*, 1957-01-18 | `caorihs_000462` | p. 1 (n0) | "The Sacramento Northern line is soon to be abandoned between Oakland and Lafayette, and Sunday's train may well have been the last chance to take in the electric railway trip" | [P][img]; caption: "The portion of the line between Oakland and West Lafayette is to be abandoned soon" [ocr] |
| S10 | **Freight only since 1941**; about 16 miles, to West Lafayette station; due "next month" | 1957-02-15 | *Orinda Sun*, 1957-02-15, "Sacto-Northern picture recalls long controversy" | `caorihs_000466` | p. 1 (n0) | "For 1941 was the year when commuter service on the line was dropped; since then the Sacramento Northern has been used only for freight." / "the approximately 16 miles between 40th and Shafter, Oakland, and West Lafayette station" | [P][img] |
| S11 | Rails to be removed by September; overhead already coming down | 1957-02-22 | *Orinda Sun*, 1957-02-22 | `caorihs_000467` | p. 1 (n0) | "THE RAIL from Oakland to Lafayette is to be abandoned and removed by September and the Western Pacific is under a $100,000 bond to complete the work." | [P][img] |
| S12 | "Expected to abandon … in March"; Lafayette station onward still in WP use | 1957-03-01 | *Orinda Sun*, 1957-03-01 | `caorihs_000468` (the issue of March 1, 1957; `caorihs_000462` is January 18) | p. 1 (n0) | "It is expected to abandon the line from Lafayette to Oakland in March." / "The county has no plans of acquiring any of the right of way past the Lafayette Station. This property is still in use by Western Pacific" | [P][img] |
| S13 | Set for March 1; east of Lafayette stays, electric | Mar 1957 | *Western Railroader* 20(5), Mar 1957 | `sim_western-railroader-the-western-railfan_1957-03_20_5` | p. 14 (n13) | "Abandonment of the Sacramento Northern from Lafayette into Oakland appears set for March 1 with the completion of the Union Street line of the Oakland Terminal Railroad." / "The portion East of Lafayette will remain in service" | [P][img] |
| S14 | Union Street line opened; the SN's "last operation to West Layfette" (sic) | **1957-03-01** | *Western Railroader* 20(6), Apr 1957 | `sim_western-railroader-the-western-railfan_1957-04_20_6` | p. 14 (n13) | "The Oakland Terminal and the Western Pacific drove a gold spike on March 1 for the opening of the new Union Street trackage" … "The Sacramento Northern meantime saw its last operation to West Layfette" | [P][img] |
| S15 | **Abandoned as of March 1, 1957**; sold for scrap March 28 | **1957-03-01** | *Orinda Sun*, 1957-04-05, "Reno man buys Sacto-Northern tracks, wire" | `caorihs_000473` | p. 1 (n0) | "The 16 miles of Sacramento Northern track from 40th and Shafter, Oakland, to West Lafayette station were abandoned by Western Pacific as of March 1." | [P][img]; "Sale by Western Pacific, owner of Sacramento Northern, to Borden was consummated March 28" [img] |
| S16 | Last train Thursday 1957-02-28 | 1957-02-28 | *One Track Mind* (Benson 1999); *Pacific News* Apr 1972 (Koenig); *Traction & Models* Oct 1972; *Oakland Hills* (2004) | `onetrackmindphot0000bens`, `pacificnews12unse_0`, `tractionmodels08unse_2`, `oaklandhills0000mail` | — | search snippets only (lending library) | [W] |

### Route and stations (all that is sourced)

- **40th Street and Shafter Avenue, Oakland** (the SN depot and junction with the Key System): S1–S15;
  the street trackage in **Shafter Avenue** was abandoned with the rest (S7).
- **Canyon, Moraga** and the **Redwood Canyon** (the Oakland hills tunnel route): S6, S9; the 1957-01-13 trip
  ran "up Oakland's Shafter Avenue", past Lake Temescal, "through the Redwood Canyon" to Lafayette [ocr].
- **West Lafayette station**: the east end of the abandonment (S1, S5, S10, S14, S15). Its location is
  not given; it lies inside the repo's `sn-eastport-lafayette` segment, which needs a cut there.
- **Lafayette station and east**: stayed in service (S12, S13). So `sn-eastport-lafayette` from West
  Lafayette to Lafayette, and `sn-saranap-concord`, go on past 1957 (their end is not researched here).
- **The Oakland Terminal's link** from Yerba Buena yard over the Key System to 40th & Shafter (the repo's
  `key-yerba-buena` / `key-40th-st`) was abandoned in the same package (S7), replaced by the Union Street
  line, 12th & Poplar to the WP at 3rd & Union, opened 1957-03-01 (S14; `east-bay-electric.md`).

### Conflicts

1. **Length:** 17.52 mi (application, S1) vs 15.52 mi (approval, S5) vs 18 mi (S6, S7) vs "approximately
   16" / "16" (S10, S15). The ICC figures are the docket's; the two *Traffic World* numbers differ by
   exactly 2 miles (a misprint in one, or the docket amended). Not resolved.
2. **East end:** "Lafayette" (S6, S7, S8, S11–S13) vs "West Lafayette" (the ICC docket, S1, S5; S10, S14,
   S15). The docket and the after-the-fact report agree on **West Lafayette**; S12–S13 show Lafayette itself
   stayed in use.
3. **Closing day:** abandoned "as of March 1" 1957 (S15, the after-the-fact report) and "set for March 1"
   (S13); [W] pointers give the last train as 1957-02-28. Consistent if the last run was on the 28th; the
   28th itself is not sourced.
4. **SN passenger end:** "1941" (S10) agrees with the repo's 1941-06-30 (`western-railroader-1945-08`, CRC
   D34232). No conflict.

### Still unsourced

- The day of the last freight train (1957-02-28 per pointers).
- The ICC report and certificate in F.D. 19124 itself (only digests and news read); any CPUC action in
  1956–57 on the SN or the Union Street line (not searched).
- Where West Lafayette station stood; when the West Lafayette – Lafayette stretch closed.
- When the rails were actually lifted (S11 expects "by September" 1957).

### Proposed treatment

- The SN segments `sn-shafter-ave`, `sn-rockridge-temescal`, `sn-shepherd-canyon` and
  `sn-eastport-lafayette` up to West Lafayette: drawn in the railroad mode from 1941 (the end of passenger
  service) to **closed 1957-03-01**, citing `orinda-sun-1957-04-05` (and the ICC grant of 1956-07-03,
  `icc-practitioners-journal-1956-09`, as the authority). The note says the last train's day is unsourced.

---

## For Matthew (manual work)

- **Licenses.** Decision 19 covers the *Orinda Sun* and *The Western Railroader* (facts only). Three new
  periodicals of 1955–57 are not in it: *Traffic World* and the *ICC Practitioners' Journal* (archive.org
  "sim_" scans, no rights statement; copyright not checked), and the CSRM's NWP employee timetables of
  1933–35 (same "copyright status unknown" as the others). Recommend the same rule: cite for facts only.
  The *Argonaut* (1878, 1884, 1903), *The Voice of Israel* (1870, "Public Domain"), the *Banner of
  Progress* (1867) and the 1877 state returns are public domain.
- **The San Quentin passenger end (1913).** Only Borden gives it. The *Sausalito News* and *Marin
  Journal* for 1913 (CDNC, blocked here) would date it; so would an NWP public timetable of 1912–14.
- **The San Quentin branch's abandonment** (after 1933; a pointer says 1946): an ICC finance docket of
  1934–46 or a CRC order; the ICC's Monthly Catalog index for 1934–47 could be searched for "Northwestern
  Pacific … abandonment … Marin".
- **The SN's last train (1957-02-28 per pointers):** the *Oakland Tribune* or *Contra Costa Gazette* of
  1957-02-28 / 03-01 (not on archive.org as far as found).
- **Map to trace:** the SR&SQ's San Rafael end and Point San Quentin wharf from the 1895–97 USGS Tamalpais
  15′ sheet (OHM has it), and West Lafayette station from a 1950s USGS 7.5′ sheet (Walnut Creek / Briones
  Valley).

## Proposed sources.json entries

Existing ids reused: `marin-history-1880`, `poors-1885`, `western-railroader-1949-04`,
`srj-1904-01-02-north-shore`, `cscrm-2021-02-001171`, `cscrm-2021-02-001320`, `usgs-san-quentin-1948`,
`ca-brc-report-1894`, `western-railroader-1945-08`, `crc-d34232`. Suggested note additions to them are
given first, then the new entries.

Note additions (append to the existing `notes`):

- `marin-history-1880`: "p. 148 (n189): \"The road has a second terminus on the Bay of San Francisco, at San
  Quentin, by a branch road, which leaves the main line two miles north of San Rafael … the San Quentin
  terminus is used principally for the passenger business.\" p. 334 (n424): the lease of March 1875, \"the
  Narrow Guage agree to run three trips via San Quentin\". Read on the page images, October 16, 2026."
- `western-railroader-1949-04`: "p. 6 (n5): the San Rafael & San Quentin \"was incorporated on February 25,
  1869. It was standard gauge\", 3½ miles; p. 7 (n6): \"Steam passenger trains continued to run … between San
  Rafael and San Quentin\" after 1903; p. 10 (n9), under 1913: \"Passenger service was discontinued between
  San Rafael and San Quentin\". Read on the page images, October 16, 2026."
- `srj-1904-01-02-north-shore`: "p. 6 (n22): \"The line extends to San Quentin … but this extension is not in
  operation at present.\" Read on the page image, October 16, 2026."
- `cscrm-2021-02-001171`: "p. 8 (n7): San Rafael 17.0 to San Quentin 20.1, \"Distance from San Quentin\" 3.1,
  no trains. Read on the page image."
- `cscrm-2021-02-001320`: "The page that supersedes p. 4 of No. 12 has no San Rafael – San Quentin,
  Sebastopol or Donahue table. Read on the page image, October 16, 2026."
- `ca-brc-report-1894`: "Another scan, `annualreportboa29commgoog`: the North Pacific Coast's report, p. 84,
  \"San Rafael to San Quentin … Leased line\" and \"United States mails from San Francisco to Cazadero, San
  Quentin, and Mill Valley\" (OCR)."

New entries:

```json
[
  {
    "id": "banner-of-progress-1867-04-06",
    "title": "Banner of Progress 1(13), April 6, 1867: advertisement, \"San Pablo and San Quentin Ferry\"",
    "publisher": "Banner of Progress, San Francisco",
    "date": "1867-04-06",
    "type": "primary_document",
    "url": "https://archive.org/details/IAPSOP-banner_of_progress_v1_n13_apr_6_1867_partial",
    "license": "Public domain (published 1867)",
    "accessed": "2026-10-16",
    "notes": "PDF p. 1: \"SAN PABLO AND SAN QUENTIN FERRY. Through to San Rafael and Point Isabel. From Vallejo and Davis Streets\"; the steamer Contra Costa, \"Connecting with Stages for San Rafael, Olima, Tomales, and Bolinas\"; Charles Minturn, agent. Read on the rendered page image, October 16, 2026."
  },
  {
    "id": "voice-of-israel-1870-10-07",
    "title": "The Voice of Israel (San Francisco), October 7, 1870: advertisement, \"San Quentin Ferry\"",
    "publisher": "The Voice of Israel",
    "date": "1870-10-07",
    "type": "primary_document",
    "url": "https://archive.org/details/casfema_000161",
    "license": "Public domain (item metadata: \"Public Domain. No restrictions on use.\")",
    "accessed": "2026-10-16",
    "notes": "[p. 7] (scan leaf n6): \"On and after April 30, 1870, the favorite steamer CONTRA COSTA … will leave as follows, daily (Sundays excepted): San Francisco, 9:30 a m; 1 p m; 4:30 p m. San Quentin, 8 a m; 11:30 a m; 2:45 p m. Connecting at Point San Quentin with the recently constructed Railroad to San Rafael\". Signed Chas. Minturn. Read on the page image."
  },
  {
    "id": "ca-transportation-report-1877",
    "title": "Report of the Board of Commissioners of Transportation to the Legislature of the State of California, with the railroads' returns for 1877",
    "author": "California Board of Commissioners of Transportation",
    "publisher": "State Office, Sacramento",
    "date": "1878",
    "type": "official",
    "url": "https://archive.org/details/reportboardcomm00trangoog",
    "license": "Public domain (State of California publication)",
    "accessed": "2026-10-16",
    "notes": "The North Pacific Coast's return for the year ending December 31, 1877, p. 211: \"San Rafael and San Quentin Railroad. Termini From San Rafael to San Quentin. Length 3.50 miles. Dates of lease From March 11, 1875, to March 11, 1918\", rental $1; \"Total miles of road operated by this company, including San Quentin Ferry 91.25 miles\"; p. 210 (OCR): \"including San Quentin ferry, 11.5 miles\". archive.org dates the item 1876. A Google scan. Read on the page image (p. 211)."
  },
  {
    "id": "argonaut-1878-01-12",
    "title": "The Argonaut 2(1), January 12, 1878: North Pacific Coast Railroad timetable advertisement",
    "publisher": "The Argonaut, San Francisco",
    "date": "1878-01-12",
    "type": "primary_document",
    "url": "https://archive.org/details/argonaut21878sanf",
    "license": "Public domain (published 1878)",
    "accessed": "2026-10-16",
    "notes": "p. 16 (scan leaf n24): \"Commencing Monday Nov. 5th, 1877, the new, swift, and elegantly appointed steamer, SAN RAFAEL, Will run between San Francisco and San Quentin (connecting with trains at latter place)\"; boats \"for San Quentin, San Rafael, and Junction\"; \"The 10.00 A. M. boat connects with through trains for Duncan Mills\". Read on the page image."
  },
  {
    "id": "argonaut-1884-04-19",
    "title": "The Argonaut 14(16), April 19, 1884: North Pacific Coast Railroad timetable advertisement",
    "publisher": "The Argonaut, San Francisco",
    "date": "1884-04-19",
    "type": "primary_document",
    "url": "https://archive.org/details/argonaut141884sanf",
    "license": "Public domain (published 1884)",
    "accessed": "2026-10-16",
    "notes": "p. 13 (scan leaf n259): \"Commencing Monday, January 21st, 1884 … For SAN RAFAEL (via San Quentin Ferry)—†10.15, *11.15 A. M., *4.50, †5.00 P. M.\", and boats via Saucelito. The last issue found with the San Quentin ferry. Read on the page image."
  },
  {
    "id": "argonaut-1884-05-03",
    "title": "The Argonaut 14(18), May 3, 1884: North Pacific Coast Railroad timetable advertisement",
    "publisher": "The Argonaut, San Francisco",
    "date": "1884-05-03",
    "type": "primary_document",
    "url": "https://archive.org/details/argonaut141884sanf",
    "license": "Public domain (published 1884)",
    "accessed": "2026-10-16",
    "notes": "p. 13 (scan leaf n291): \"SAUCELITO—SAN RAFAEL—SAN QUENTIN, via NORTH PACIFIC COAST R. R. … Commencing Saturday, April 27th, 1884 … For SAN RAFAEL and SAUCELITO (week days)—7.30, 9.15 A. M.\": no San Quentin ferry. April 27, 1884 was a Sunday. Read on the page image."
  },
  {
    "id": "argonaut-1903-11-02",
    "title": "The Argonaut 53 (No. 1390), November 2, 1903: North Shore Railroad timetable advertisement",
    "publisher": "The Argonaut, San Francisco",
    "date": "1903-11-02",
    "type": "primary_document",
    "url": "https://archive.org/details/argonaut531903sanf",
    "license": "Public domain (published 1903)",
    "accessed": "2026-10-16",
    "notes": "p. 288 (scan leaf n298): \"FOR SAN RAFAEL, ROSS, MILL VALLEY, ETC., Via Sausalito Ferry\"; weekdays *7.45 a.m., *1.45, *6.15 p.m.; \"Trains marked * run to San Quentin.\" The same note is in the ads from February 16, 1903 (vol. 52, No. 1353) on. Read on the page image."
  },
  {
    "id": "argonaut-1903-11-09",
    "title": "The Argonaut 53 (No. 1391), November 9, 1903: North Shore Railroad timetable advertisement",
    "publisher": "The Argonaut, San Francisco",
    "date": "1903-11-09",
    "type": "primary_document",
    "url": "https://archive.org/details/argonaut531903sanf",
    "license": "Public domain (published 1903)",
    "accessed": "2026-10-16",
    "notes": "p. 304 (scan leaf n314): \"Suburban Service, Standard Gauge Electric—Depart from San Francisco Daily\"; no train to San Quentin is named, here or in the ads of 1904-1910. Read on the page image."
  },
  {
    "id": "western-railroader-1953-06",
    "title": "The Western Railroader 16(8), June 1953: \"A day in the redwoods\" (the Northwestern Pacific)",
    "publisher": "The Western Railroader",
    "date": "1953-06",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1953-06_16_8",
    "license": "Copyright status unknown (railfan periodical, 1953); cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 3 (n2): \"The 1909 timetable from which the map in this issue is taken shows the following services\"; p. 5 (n4): \"The branch between San Rafael and San Quentin had two trains daily each way.\" A railfan summary; the 1909 timetable was not seen. Read on the page images."
  },
  {
    "id": "cscrm-2021-02-001294",
    "title": "Northwestern Pacific Railroad, employee timetable No. 12, Southern Division, September 17, 1933",
    "publisher": "California State Railroad Museum scan",
    "date": "1933-09-17",
    "url": "https://archive.org/details/cscrm_2021_02_001294",
    "type": "primary_document",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 4 (n3): San Rafael 17.0 to San Quentin 20.1 miles from San Francisco, \"Distance from San Quentin\" 3.1, no trains; n7, maximum locomotive weights: \"San Quentin Branch … 114 T-57-19/26-110 169,000\". The last timetable found that lists the branch. Read on the page images."
  },
  {
    "id": "cscrm-2021-02-001319",
    "title": "Northwestern Pacific Railroad, employee timetable No. 13, June 10, 1934",
    "publisher": "California State Railroad Museum scan",
    "date": "1934-06-10",
    "url": "https://archive.org/details/cscrm_2021_02_001319",
    "type": "primary_document",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "n7: the maximum locomotive weight table has no San Quentin Branch. n9: \"Map of the lines of the Northwestern Pacific Railroad Company, June 1930\", \"Revised Apr. 15, 1934\", whose Sausalito inset still draws a line from San Rafael by California Park to San Quentin. Read on the page images."
  },
  {
    "id": "cscrm-2021-02-001318",
    "title": "Northwestern Pacific Railroad, employee timetable No. 14, September 15, 1934",
    "publisher": "California State Railroad Museum scan",
    "date": "1934-09-15",
    "url": "https://archive.org/details/cscrm_2021_02_001318",
    "type": "primary_document",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 8 (n7): \"Maximum locomotive weights and car loading permissible over districts shown\" lists no San Quentin Branch (nor Donahue or Sebastopol). Read on the page image."
  },
  {
    "id": "traffic-world-1955-11-26",
    "title": "Traffic World 96, November 26, 1955: \"Oakland Terminal\" (Finance No. 19124, application)",
    "publisher": "Traffic World",
    "date": "1955-11-26",
    "type": "journal",
    "url": "https://archive.org/details/sim_traffic-world_1955-11-26_96",
    "license": "Copyright status unknown (trade weekly, 1955); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 60 (n61; page number from the OCR's order): the Oakland Terminal, the Sacramento Northern and its trustees, \"by an application in Finance No. 19124, have asked the Commission for authority to abandon about 17.52 miles of line in Oakland and West Lafayette\"; Finance No. 19125, a 0.71-mile Oakland Terminal - Western Pacific connection. Read on the page image."
  },
  {
    "id": "traffic-world-1956-07-14",
    "title": "Traffic World 98, July 14, 1956: \"Oakland Terminal\" (Finance No. 19124, approval)",
    "publisher": "Traffic World",
    "date": "1956-07-14",
    "type": "journal",
    "url": "https://archive.org/details/sim_traffic-world_1956-07-14_98",
    "license": "Copyright status unknown (trade weekly, 1956); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 36 (n41): \"The Commission, division 4, has announced approval of a report and certificate in Finance No. 19124, Oakland Terminal Railway et al., Abandonment\", \"about 15.52 miles of line in Oakland Terminal and West Lafayette\". Read on the page image."
  },
  {
    "id": "icc-practitioners-journal-1956-09",
    "title": "I. C. C. Practitioners' Journal 23(10), September 1956: digest of Commission decisions",
    "publisher": "Association of Interstate Commerce Commission Practitioners",
    "date": "1956-09",
    "type": "journal",
    "url": "https://archive.org/details/sim_icc-practitioners-journal_1956-09_23_10",
    "license": "Copyright status unknown (professional journal, 1956); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 1219 (n136): \"F. D. 19124, Oakland Terminal Ry. et al. Abandonment, July 3, 1956, Div. 4\", with \"257 I. C. C. 700 conditions imposed for the protection of employees\"; \"Oakland Terminal R., et al, F. D. 19124, Granted, July 3, 1956\". p. 1210 (n127): \"Oakland Terminal Railway et al., Construction, F. D. 19125, July 3, 1956\". Read on the page images."
  },
  {
    "id": "orinda-sun-1956-07-13",
    "title": "Orinda Sun, July 13, 1956: \"Old rail lines to be abandoned\"",
    "publisher": "Orinda Sun",
    "date": "1956-07-13",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000435",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): \"The Interstate Commerce Commission in Washington, D.C., has authorized the railway to abandon its 18 miles of track from Lafayette, through Moraga and Canyon into Oakland\"; \"Freight from industries in the Contra Costa County areas will be loaded at Lafayette.\" Read on the page image."
  },
  {
    "id": "orinda-sun-1957-01-18",
    "title": "Orinda Sun, January 18, 1957: \"Electric passenger train goes on nostalgic SN run\"",
    "publisher": "Orinda Sun",
    "date": "1957-01-18",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000462",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): the Bay Area Electric Railroad Association's two-car special of Sunday (January 13, 1957) from 40th and Shafter to Pittsburg; \"The Sacramento Northern line is soon to be abandoned between Oakland and Lafayette\". Read on the page image."
  },
  {
    "id": "orinda-sun-1957-02-15",
    "title": "Orinda Sun, February 15, 1957: \"Sacto-Northern picture recalls long controversy\"",
    "publisher": "Orinda Sun",
    "date": "1957-02-15",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000466",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): \"For 1941 was the year when commuter service on the line was dropped; since then the Sacramento Northern has been used only for freight\"; abandonment of \"the approximately 16 miles between 40th and Shafter, Oakland, and West Lafayette station\" is \"supposed to happen next month\". Read on the page image."
  },
  {
    "id": "orinda-sun-1957-02-22",
    "title": "Orinda Sun, February 22, 1957: the transit district drops its Sacramento Northern purchase",
    "publisher": "Orinda Sun",
    "date": "1957-02-22",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000467",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): \"THE RAIL from Oakland to Lafayette is to be abandoned and removed by September and the Western Pacific is under a $100,000 bond to complete the work\"; overhead wiring already being removed. Read on the page image."
  },
  {
    "id": "orinda-sun-1957-03-01",
    "title": "Orinda Sun, March 1, 1957: \"Right-of-way sought from Moraga to P.H.\" and \"Sacto-Northern 'tracks' claimed by CCCSD\"",
    "publisher": "Orinda Sun",
    "date": "1957-03-01",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000468",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): \"It is expected to abandon the line from Lafayette to Oakland in March\"; \"The county has no plans of acquiring any of the right of way past the Lafayette Station. This property is still in use by Western Pacific\". The item is caorihs_000468 (caorihs_000462 is January 18). Read on the page image."
  },
  {
    "id": "orinda-sun-1957-04-05",
    "title": "Orinda Sun, April 5, 1957: \"Reno man buys Sacto-Northern tracks, wire\"",
    "publisher": "Orinda Sun",
    "date": "1957-04-05",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000473",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 1 (n0): \"The 16 miles of Sacramento Northern track from 40th and Shafter, Oakland, to West Lafayette station were abandoned by Western Pacific as of March 1\"; the sale to Rupert E. Borden, a scrap dealer, \"was consummated March 28\". Read on the page image."
  },
  {
    "id": "western-railroader-1956-08",
    "title": "The Western Railroader 19(10), August 1956: \"I.C.C. approves Sacramento Northern abandonment\"",
    "publisher": "The Western Railroader",
    "date": "1956-08",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1956-08_19_10",
    "license": "Copyright status unknown (railfan periodical, 1956); cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 8 (n7): \"Eighteen miles of SN track will be abandoned between Lafayette and 40th & Shafter including the trackage in Shafter Avenue franchise for which expired some time ago. The Oakland Terminal will abandon service from Yerba Buena yards to 40th & Shafter over the Key System.\" Read on the page image."
  },
  {
    "id": "western-railroader-1957-02",
    "title": "The Western Railroader 20(4), February 1957: news notes",
    "publisher": "The Western Railroader",
    "date": "1957-02",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1957-02_20_4",
    "license": "Copyright status unknown (railfan periodical, 1957); cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 16 (n15): \"On the Sacramento Northern a \"farewell\" passenger run was made January 13 due to an end to maintenance on the portion to be abandoned between Oakland and Lafayette.\" Read on the page image."
  },
  {
    "id": "western-railroader-1957-03",
    "title": "The Western Railroader 20(5), March 1957: news notes",
    "publisher": "The Western Railroader",
    "date": "1957-03",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1957-03_20_5",
    "license": "Copyright status unknown (railfan periodical, 1957); cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 14 (n13): \"Abandonment of the Sacramento Northern from Lafayette into Oakland appears set for March 1 with the completion of the Union Street line of the Oakland Terminal Railroad\"; \"The portion East of Lafayette will remain in service\". Read on the page image."
  },
  {
    "id": "western-railroader-1957-04",
    "title": "The Western Railroader 20(6), April 1957: \"Union Street line 'gold spike'\"",
    "publisher": "The Western Railroader",
    "date": "1957-04",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1957-04_20_6",
    "license": "Copyright status unknown (railfan periodical, 1957); cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 14 (n13): the Oakland Terminal and the Western Pacific \"drove a gold spike on March 1 for the opening of the new Union Street trackage\"; \"The Sacramento Northern meantime saw its last operation to West Layfette\" (sic). Read on the page image."
  }
]
```

Optional (cited above for single [ocr] facts; add only if the data uses them): the *Sonoma Index-Tribune*
1901-12-14 (`casomvhs_001247`, the electrification plan), the Railroad Commission's report of c. 1912
(`reportrailroadc00unkngoog`, p. 172, the NWP's 1907 consolidation), NWP timetable No. 16
(`cscrm_2021_02_001338`, n7, no San Quentin Branch) and the *Argonaut* of 1888
(`argonaut221888231888sanf`, the 1887 NPC timetable heading).
