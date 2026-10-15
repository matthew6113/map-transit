# Research (pass 2): lines to the beach, the San Mateo interurban, Market St cable branches, Muni's exposition lines, Ocean Shore (sf-a)

Gathered 2026-10-15 for Phase 2b.D. Read-only pass; nothing in the repo was changed. Builds on
`docs/research/sf-street-railways.md` (keys CW, CAM, MFR, OS29, MAN09, VIL15 as there) and checks the leads in
`docs/research/leads-2c/sf-a.md` against the sources themselves.

## Read this first

- **Network.** archive.org full text works through `https://archive.org/stream/<id>/<id>_djvu.txt`;
  archive.org page images, web.archive.org, sfmta.com and archives.sfmta.com are refused (403 or DNS). So:
  - **Every archive.org quote below is [ocr]**: read in the OCR text, never on the page image. Printed page
    numbers are taken from the running heads in the OCR text; where a head is missing the page is inferred from
    the neighbouring heads and marked "≈".
  - **Callwell (CW) could not be opened.** It isn't on archive.org (searched "Callwell", "Transit in San
    Francisco", "selected chronology"), and the Wayback copy is on web.archive.org (refused). CW facts below are
    the repo's earlier quotes, marked [prev], or the last session's search-engine excerpts, marked [snip]/[para].
  - **CPUC/Railroad Commission typescripts** (files.cpuc.ca.gov) download fine; the folder listings work, so
    decisions can be found by number and date. Quotes from them are read with `pdftotext` (still OCR of a scan,
    so also [ocr]).
- **New primary sources found this pass** (all public domain by date):
  - **MR88**: *San Francisco Municipal Reports, fiscal year 1887–88*, "Street railroad franchises", pp. 136–177:
    every franchise order then in force, with its route. archive.org `sanfranciscomuni38sanfrich`.
  - **SRJ**: *Street Railway Journal* (New York), news and articles, 1884–1907 (ids listed per fact).
  - **RRC**: *Decisions of the Railroad Commission of the State of California*, vols 1–31 (1911–1928) on
    archive.org (`california-railroad-commission-decisions_<n>`), plus the CPUC typescripts.
  - **ARN13**: Bion J. Arnold, *Report on the improvement and development of the transportation facilities of
    San Francisco*, 1913 (`reportonimprovem00arno_0`).
  - **PUC47 / PUC48**: SF Public Utilities Commission reports 1947–48 and 1948–49 (already in `sources.json`).
  - **WR**: Townley & Perry, *Western Railroader* 1965 reprint, routes 1944–49 (secondary; already in the repo).
- **Tags.** [P] primary document; [O] official (government) source; [C] contemporary but not official
  (trade journal, Merchants' Association); [W] pointer only (Wikipedia, railfan); [ocr] read in OCR text only;
  [img] checked on a page image (none this pass); [prev] quoted by the repo's 2026-10-14 pass from CW's PDF;
  [snip]/[para] CW text seen only as a search-engine excerpt / paraphrase in the last session.
- **Names used for today's streets**: Central Ave (old, west of Divisadero) = Presidio Ave (CW p. 8 [prev]);
  H St = Lincoln Way (CW p. 10 [prev]; SRJ 1899 calls H St "the southern boundary of Golden Gate Park");
  Point Lobos Ave east of about 42nd Ave = Geary Blvd (unsourced equivalence, as before); First Ave = Arguello
  Blvd (see §2: CW's 1896 route and MAN09's 1909 route of the same line name "Arguello Blvd." and "1st Ave."
  in the same place, an inference, not a sourced renaming); D St = Fulton St and B St = Balboa St (still
  unsourced; see "For Matthew").

---

## 1. Ferries & Cliff House Railway: the California St steam line, 1888–1905, electric to 1925

### Facts

| Fact | Value | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Steam line, first day | 1888-07-01 | CW | sfmta-callwell-chronology | p. 12 | (paraphrase) "a steam line from California St. & Presidio Ave. out to 33rd Ave., around Land's End, and on to a terminal at 48th Ave. and Pt. Lobos" | [O][para][prev] |
| Steam line route | from the junction at California & Central (Presidio) Ave, California St to 33rd Ave, around Land's End to Point Lobos Ave near the Cliff House | CAM, *History of public transit in SF 1850–1948* | archive.org `historyofpublict1947sanf` | ≈ p. 17 (OCR heads "-15-" and "-20-" only) | "a steam line was established from the junction at California and Central Avenue out California Street to 33rd Avenue and around Land's End to Point Lobos Avenue near the Cliff House and Seal Rocks" | [O][ocr] |
| Its east end (contemporary) | the Cal Cable's terminus (California & Presidio Ave) | SRJ vol. 25, Feb 18, 1905, "Electric equipment of Cliff line, San Francisco" | `streetrailwayjo251905newy` | p. 324 | "The steam line … ran from the terminus of the California Street Cable Railroad Company to California Street, and via private right of way along the cliffs overlooking the bay and the Golden Gate to the Cliff House" | [C][ocr] |
| Franchise for California St west of First Ave (granted to Gustav Sutro, in lieu of his 1884 order No. 1765) | First Ave & Geary (Point Lobos Ave), north on First Ave to California St, west on California St "to or near the City Cemetery", then private property round Golden Gate Cemetery to a point near the Cliff House, then east to 48th Ave and on 48th Ave to D St; franchise 25 years from 1886-12-01 | MR88, "Street railroad franchises", Ferries & Cliff House Railway Co. (System) | `sanfranciscomuni38sanfrich` | pp. 143–144 | "thence westerly on a curve into California street; thence on and along California street westerly to or near the City Cemetery; thence either in a northerly direction along Thirty-second avenue to Lake street" | [P][O][ocr] |
| Same order, the cemetery section | "to and between Golden Gate Cemetery and the ocean shore, and thence to a point on the Cliff House or Point Lobos Ranch northerly from and near the Cliff House; thence in a general easterly direction … to Forty-eighth avenue; thence along said Forty-eighth avenue to D street" | MR88 | as above | p. 144 | (quoted in the value cell, ≤ 40 words) | [P][O][ocr] |
| Curves through Golden Gate Cemetery (today Lincoln Park) | three surveyed curves at the cemetery's east, north and west boundaries, granted to Gustav Sutro "in connection with" order 1765 | MR88 | as above | pp. 140–141 | "Beginning at a point on the eastern boundary of the Golden Gate Cemetery, from which the northeast corner thereof bears northerly 330 feet distant" | [P][O][ocr] |
| Central Ave link and the 7th Ave branch (W. H. Martin, John Ballard, W. J. Adams, Thomas Magee, H. H. Lynch; 25 years from 1887-09-27; steam dummies allowed for 11 years) | double track from California St along 7th Ave to the north line of Golden Gate Park; and Central (Presidio) Ave from Jackson St to California St | MR88 | as above | pp. 144–145 | "Commencing with a double track at the intersection of California street, and Seventh avenue … thence along and upon Seventh avenue to the north line of Golden Gate Park." | [P][O][ocr] |
| Same order, Central Ave | Jackson St to California St on Central Ave | MR88 | as above | p. 144 | "Commencing at the intersection of Jackson street and Central avenue … thence along and upon Central avenue to California street" | [P][O][ocr] |
| 7th Ave branch, end | until February 1894 | CW | sfmta-callwell-chronology | p. 12 | (paraphrase) | [O][para] — not re-verified |
| F&CH merged into the Market Street Railway | 1893-10-13 | RRC Decision No. 3056 (Application No. 2033, United Railroads; F&CH bonds), decided Jan 12, 1916 | `california-railroad-commission-decisions_9` | vol. 9 pp. 40–41 | "on October 13, 1893, Ferries and Cliff House Railway Company consolidated and amalgamated into Market Street Railway Company" | [O][ocr] |
| Same, in OS29 | "Ferries and Cliff Railway Company" listed among the lines the Market Street Railway (incorporated 1893-10-11) took over | OS29 | `reportonstreetr1929osha_1` | p. 10 | "The Market Street Railway Company was incorporated October 11, 1893." | [O][ocr] |
| Electrification franchise; tunnel at Land's End | early 1905 the URR got a franchise to change the "California Street & Cliff steam line" to electricity; a 100-ft wooden tunnel near Land's End was being replaced by an open cut (work began Jan 13, 1905; slides) | SRJ, Feb 18, 1905 | `streetrailwayjo251905newy` | p. 324 | "the company decided to replace the old wooden tunnel, 100 ft. long, situated near Land's End, by an open cut" | [C][ocr] |
| Electric line opened | **1905-05-27**, double track, United Railroads, to the Cliff House | SRJ vol. 25 no. 23, June 10, 1905 | `streetrailwayj251905newy` | ≈ p. 1037 (next head is 1038) | "The opening of the new double-track electric line of the United Railroads of San Francisco to the Cliff House was fittingly celebrated May 27." | [C][ocr] |
| Same, CW | "converted to streetcar operation in May 1905" | CW | – | p. not seen | (paraphrase) | [O][para] |
| 1909 service | No. 1 Sutter: Sutter, Presidio Ave, California St to 6th Ave; every other car to the beach "via the old Cliff House Steam Line" | MAN09 (Merchants' Association, dated Feb 1, 1909) | `reportonoperatio00manlrich` | p. 13 | "From Market and Sutter out Sutter to Presidio Ave. to California to 6th Ave., every other car going to the beach via the old Cliff House Steam Line." | [C][ocr] |
| 1909, the transfer point | the "California Street electric line" began at 6th Ave & California | MAN09 | as above | p. 14 | "The Sutter Street line with its extension to the California Street electric line at 6th Ave., and California, transports a great many people to the beach" | [C][ocr] |
| 1912–13 status | California St line from 6th Ave to "Cliff Avenue" ran without a franchise | ARN13 | `reportonimprovem00arno_0` | p. 42 | "the necessary rehabilitation of the California Street line from Sixth Avenue to Cliff Avenue, which is now operating without a franchise" | [O][ocr] |
| Muni's C on California St | from 1915-02-19 (to 13th Ave) and 1915-03-28 (to 33rd Ave) | MFR chronologies | `financialreport1912sanf_0` | many reports | "March 28, 1915. California Street line in operation to Thirty-third avenue." | [O][ocr] |
| **1915: URR moved to Clement St** | when Muni's C opened on California St (1915), the URR rerouted its beach cars from California St to Clement St between 6th and 33rd Aves, "and thence around Land's End" | CAM | `historyofpublict1947sanf` | p. 37 (OCR footer "-36-" before it) | "the United Railroads rerouting its cars from California to Clement Street from Sixth to 33rd Avenue and thence around Land's End" | [O][ocr] |
| Land's End section ended | 1925-02-07, after an earth slide | CW | sfmta-callwell-chronology | p. 36 | (paraphrase) | [O][para][prev] |
| No Railroad Commission decision on it | RRC vols 25–31 (May 1924 – June 1928) have no decision naming Land's End, Lincoln Park, the Cliff House or the Market Street Railway's beach line | RRC | `california-railroad-commission-decisions_25` … `_31` | – | (searched the full OCR) | [O][ocr] |
| 1928 (after the Land's End closure) | MSRy line 1 Sutter–California: Ferry, Market, Sutter, Presidio, California, **6th Ave and Clement** to 33rd Ave | OS29 appendix B | `reportonstreetr1929osha_1` | p. 343 | "From Ferry Loop via Market Street, Sutter Street, Presidio Avenue, California Street, Sixth Avenue and Clement Street to Thirty-third Avenue." | [O][ocr] |
| 1928, California St west of 2nd Ave | Muni's C: "2nd Ave., Cornwall St. and California St. to 33rd Ave." | OS29 | as above | p. 352 | "From Ferry Loop via Market Street, Geary St., 2nd Ave., Cornwall St. and California St. to 33rd Ave." | [O][ocr] |
| 1928, three parallel lines | Muni on Geary, MSRy on Clement, Muni again on California | OS29 | as above | p. 154 | "the Municipal Railway operates on Geary Street, the Market Street Railway Company on Clement Street, and the Municipal Railway again on California Street" | [O][ocr] |
| 1944 route of line 1 | Ferry, Market, Sutter, Presidio, California, 6th Ave, Clement, 33rd Ave, Geary to 45th Ave; Sundays and holidays to the Cliff House via Geary, 48th Ave and the private right of way | WR (1965) | `sanfranciscomuni1965town` | p. "seven"≈1 | "From Ferry Bldg. via Market, Sutter, Presidio, California, Sixth Avenue, Clement, 33rd Ave., and Geary to 45th Ave." | [W][ocr] (railfan; in Callwell's reading list) |
| Line 1, last streetcar | replaced by motor coach 1949-07-03 (WR); motor coaches on the No. 1 "as of July 3, 1949" (PUC48) | WR; PUC48 | `sanfranciscomuni1965town`; `reportofsanfranc1948sanf` | WR p. ≈1; PUC48 p. 167 | "3 July 1949: REPLACED BY MOTOR COACH LINE 1" | [W][O][ocr] |

### Route at each dated snapshot (today's names)

**A. 1888-07-01 to 1905 (steam), per CW/CAM; geometry per the franchise and the USGS sheets**

1. California St, from Presidio Ave (old Central Ave) west to 33rd Ave, or to where California St ends today inside
   Lincoln Park (≈ 37.7835 N, −122.4935; measured last session). CAM and CW say "to 33rd Ave"; the 1886 franchise
   says "to or near the City Cemetery".
   - The link east of Presidio Ave: Presidio Ave from Jackson St to California St (franchise of 1887, MR88 p. 144),
     joining the company's Washington–Jackson cable line (already drawn, `data/past/sf-cable/`).
   - **Conflict:** the 1886 franchise starts the California St route at First Ave (Arguello Blvd) and Geary, north on
     First Ave; CW, CAM and SRJ 1905 start at Presidio Ave. Draw from Presidio Ave (three sources on the line as run);
     the First Ave piece is a franchise only.
2. Private right of way: north along the east edge of the Golden Gate Cemetery (today Lincoln Park, roughly the 32nd–33rd
   Ave line), round its northeast corner, west along the cliffs above the Golden Gate past Land's End, then south to
   Point Lobos Ave at 48th Ave by the Cliff House (≈ 37.7799 N, −122.5095).
   - **Map:** USGS San Francisco 1:62,500, 1895 (scan 298889) and 1899 (`usgs-san-francisco-1899`), and 1915
     (`usgs-san-francisco-1915`) for the electric period; checked on the image by the last session, not this one.
     Result is `digitized` at best (1:62,500).
   - MR88's three surveyed curves (radii 319.6 ft, 383 ft, 803 ft, 478.3 ft, 1,042 ft) fix where the line crossed the
     cemetery's east, north and west boundaries; usable as checks when tracing, not as geometry by themselves.
3. Terminal: 48th Ave & Point Lobos Ave (CW). The franchise's continuation along 48th Ave to D St (Fulton) is not
   reported built by any source reached.
4. **7th Ave branch**: 7th Ave from California St to Fulton St (the park's north line), double track (franchise of
   1887-09-27, MR88 pp. 144–145). Opening date unsourced (between the franchise, Sept 1887, and CW's Feb 1894 end).
   Draw only with Matthew's say: the franchise proves the right, CW (para) proves it ran.

**B. 1905-05-27 to 1925-02-07 (electric, URR, then MSRy from 1921-04-01)**

- Same alignment, double-tracked, with the Land's End tunnel replaced by an open cut (SRJ 1905).
- In 1909 it was worked as the outer part of the No. 1 Sutter line: Sutter St, Presidio Ave, California St to 6th Ave
  (every car), and California St west of 6th Ave and the cliff line (every other car) (MAN09 p. 13).
- West of 6th Ave the line ran without a franchise in 1912–13 (ARN13 p. 42).
- **From 1915 (CAM p. 37):** when Muni's C opened on California St (2nd Ave/Cornwall St to 33rd Ave; 1915-02-19 to
  13th Ave, 1915-03-28 to 33rd Ave per MFR), the URR moved its beach cars to **6th Ave and Clement St from 6th to 33rd
  Ave**, "and thence around Land's End". The link from Clement & 33rd Ave to the cliff right of way (north along the
  33rd Ave line inside Lincoln Park?) isn't described; trace it from USGS SF 1915. The day of the switch isn't given
  (between 1915-02-19 and 1915-03-28, when the C reached 33rd Ave, is the likely window; unsourced).
- So for 1915-03 → 1925-02-07: Sutter St, Presidio Ave, California St (Presidio → 6th Ave), 6th Ave (California →
  Clement), Clement St (6th → 33rd Ave), then the cliff line to 48th Ave & Point Lobos. California St west of 6th Ave
  was Muni's from then on (C line).

**C. After 1925-02-07 (California St)**

- California St from Presidio Ave to 6th Ave stayed MSRy line 1 (OS29 1928; WR 1944), then Muni's line 1 from
  1944-09-29, to the last streetcar on 1949-07-02/03 (WR "3 July 1949: replaced by motor coach line 1"; PUC48 lists
  the No. 1 among lines with motor coaches "as of July 3, 1949"). Last day of service: 1949-07-02 if the 3rd was the
  first motor-coach day; the sources don't say which, so flag it.
- California St west of 2nd Ave was Muni's C (from 1915; end planned for 1950-03-05 per the repo note).
- Line 1 west of 6th Ave ran on 6th Ave and Clement St to 33rd Ave (OS29), later on 33rd Ave and Geary to 45th Ave
  (WR 1944); these belong to the Clement line (§2).

### Conflicts

| Item | Values | Note |
|---|---|---|
| East end of the steam line | Presidio Ave (CW, CAM, SRJ 1905) vs First Ave & Geary (1886 franchise) | built from Presidio Ave; the franchise route was an option |
| Electric opening | 1905-05-27 (SRJ, celebrated that day) vs "May 1905" (CW) | consistent; SRJ gives the day |
| "Cliff Avenue" (ARN13 pp. 42, 162) | a street from about 38th–39th Ave west to 48th Ave, near the Sutro line ("extension of Cliff Avenue … between 38th and 39th Avenues") | not identified. Hypothesis only: today's Clement St runs west of 33rd Ave to about 45th Ave (37.781, −122.5063) and Seal Rock Dr continues it to 48th Ave, a line parallel to Point Lobos Ave on its north side. Don't use for geometry |
| OS29's line 2 "40th Avenue" | see §2 | |

### For Matthew

- **Georeference by hand:** ARN13's Plate 20/21 franchise maps (1912) and Figure 103, "Railways operating in San
  Francisco in 1893" (ARN13 p. ≈ 419). Both are public domain and would settle the 1893 and 1912 alignments, including
  "Cliff Avenue". The page images weren't reachable from this container.
- **Newspapers** (unreachable here): the Alta, 1888-07-01/02 (steam opening); the Call, 1905-05-27/28 (electric
  opening, SRJ's date); SF Chronicle/Examiner, 1925-02-07/10 (slide).
- **Callwell pp. 12, 36:** re-read the 7th Ave branch end (Feb 1894) and the 1925 entry when the PDF is reachable.

---

## 2. Sutro Railroad (1896) and Park & Ocean Railroad (1883)

### 2a. Sutro Railroad — facts

| Fact | Value | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Franchise | Order No. 2781 to Adolph Sutro, adopted 1894-07-02, 50 years; sold for $6,010 | MR 1898–99, "Street railroad franchises", Sutro Railroad Company | archive.org `sanfranciscomuni49sanfrich` | pp. 225–228 | "Franchise for 50 years. Franchise sold for $6,010. Payments: Two per cent, of the gross receipts. Order adopted July 2, 1894." | [P][O][ocr] |
| Order 2781, "First" route | Geary & Central Ave, Central Ave to Washington St, Washington to First Ave, First Ave to Clement St, Clement St to near the east line of the City Cemetery Reservation, curving south to 33rd Ave, 33rd Ave to Point Lobos Ave, Point Lobos Ave to 48th Ave, 48th Ave north to Point Lobos road, then to or near the Cliff House | MR 1898–99 | as above | p. 226 | "thence southerly along Thirty-third avenue to Point Lobos avenue; thence westerly along Point Lobos avenue to Forty-eighth avenue; thence northerly along and upon Forty-eighth avenue to Point Lobos road" | [P][O][ocr] |
| Order 2781, "Second" (8th Ave branch) | Clement St & 8th Ave, 8th Ave south to D St (Fulton St) | MR 1898–99 | as above | p. 226 | "Commencing at the intersection of Clement street and Eighth avenue; thence along and upon Eighth avenue southerly to D street." | [P][O][ocr] |
| Order 2781, "Third" (the line as built east of First Ave) | California & Central Ave, California St west to Maple St, curving south through private land "along unnamed street" to Richmond Ave, Richmond Ave west to First Ave, First Ave south to Clement St | MR 1898–99 | as above | pp. 226–227 | "thence along and upon California street westerly to Maple street; thence curving southward, entering private lands, with the consent of the owners thereof, along unnamed street to its intersection with Richmond avenue" | [P][O][ocr] |
| Parts given up | Central Ave (California–Washington), Washington St, First Ave (Washington–Richmond Ave); and Clement St 33rd–48th Ave, 48th Ave, Point Lobos road to the Cliff House: abandonment approved 1895-10-24 (Res. 13,055) | MR 1898–99 | as above | pp. 226–230 | "Resolved, That this Board does hereby consent to the abandonment by said Sutro Railroad Company of the franchise … Resolution No. 13,055 (Third Series). Approved October 24, 1895." | [P][O][ocr] |
| Electric operation, route as built | Res. 11,448 (1894-12-03): iron poles on Central Ave and California St "to Williamson street", wooden poles over the rest: Williamson St to Richmond Ave, Richmond Ave to First Ave, First Ave south to Clement, Clement to 33rd Ave, 33rd Ave to Point Lobos Ave, Point Lobos Ave to 48th Ave, 48th Ave to Point Lobos road, "entering private lands to or near Sutro Baths"; and the 8th Ave branch | MR 1898–99 | as above | pp. 229–230 | "thence along and upon and crossing Point Lobos road, entering private lands to or near Sutro Baths." | [P][O][ocr] |
| Time extensions | completion extended by Orders 2862 (1895-04-24), 2917 (1895-10-24), 2922 (1895-11-04, 90 days "to complete and operate") | MR 1898–99 | as above | pp. 228–229 | "An extension of ninety (90) days' time is hereby granted to the Sutro Railroad Company in which to complete and operate its street railroad" | [P][O][ocr] |
| Opening announced | to open 1896-02-01; transfers with the Sutter Street Railway | SRJ vol. 12, Jan 1896 | `streetrailwayjo121896newy` | p. 69 | "is nearly completed and will be opened for traffic February 1st, 1896" | [C][ocr] |
| Same, Feb issue | "preparatory to the opening of the road on February 1" | SRJ vol. 12 no. 2, Feb 1896 | as above | p. 136 | "Work on Mayor Sutro's electric road is being finished up preparatory to the opening of the road on February 1." | [C][ocr] |
| First day | 1896-02-01 | CW | sfmta-callwell-chronology | p. 17 | (prev pass; route quote below is a search excerpt) | [O][prev] |
| Route in CW | Presidio Ave & Sutter, Presidio Ave, California, Parker and Euclid Aves, Arguello Blvd, Clement, 33rd Ave, Pt. Lobos Ave, 48th Ave, private right of way to Sutro Baths | CW | as above | p. 17 | "The Sutro Railroad Co. begins streetcar service on a line running from Presidio Ave. & Sutter, on Presidio Ave., California, Parker and Euclid Aves., Arguello Blvd., Clement, 33rd Ave., Pt. Lobos Ave., 48th Ave., and a private right of way…" | [O][snip] |
| Route in CAM | from Geary & Presidio Ave; Presidio, California, Parker, Euclid, Clement, 33rd Ave, Point Lobos Ave to Sutro Baths; branch on 8th Ave from Clement to Golden Gate Park; later sold to the Sutter Street Railway (cites Arnold p. 418) | CAM | `historyofpublict1947sanf` | p. 24 (OCR footers "-20-", "-25-") | "with a branch line along Eighth Avenue from Clement to Golden Gate Park. As the venture was unprofitable Sutro sold it to the Sutter Street Railway Company." | [O][ocr] |
| Sold to the Sutter Street Ry | no date in ARN13 p. 418, CAM p. 24 or OS29 p. 10; CW gives October 1899 (para, unverified) | ARN13; OS29 | `reportonimprovem00arno_0`; `reportonstreetr1929osha_1` | ARN13 p. 418; OS29 p. 10 | "This road did not pay, and was eventually sold to the Sutter Street Railway Company." (ARN13) | [O][ocr] |
| Into the URR | Sutter Street and Sutro lines transferred to the Baltimore syndicate (early 1902); the Sutro Railroad Co. among the URR's constituents (inc. 1902-03-04) | SRJ vol. 19 no. 11, March 15, 1902; ARN13 | `streetrailwayjo191902newy`; ARN13 | SRJ p. 349; ARN13 p. 321 | "The Sutter Street and Sutro Railway lines have been formally transferred to the Baltimore syndicate" | [C][O][ocr] |
| 1909 | "Clement" line: Parker Ave & California St, Parker to Richmond Ave, 1st Ave, Clement, 33rd Ave, Point Lobos Ave to Sutro Baths; "the old Sutro line before the fire" | MAN09 | `reportonoperatio00manlrich` | p. 27 | "ROUTE— Parker Ave. and California St. via Parker to Richmond Ave. to 1st Ave. to Clement to 33rd Ave. to Point Lobos Ave. to Sutro Baths." | [C][ocr] |
| 1928 | MSRy line 2 Sutter & Clement: Ferry, Market, Sutter, Presidio, California, Parker, Euclid, Arguello, Clement, 33rd Ave, Geary, "40th Avenue" (OCR; see conflicts), private right of way to Sutro Baths | OS29 | `reportonstreetr1929osha_1` | p. 343 | "Clement Street, 33rd Avenue, Geary Street, 40th Avenue, and Private Right of Way to Sutro Baths" | [O][ocr] |
| 1944 | Muni line 2 Sutter–Clement: … Geary, 48th Ave and PRW to Sutro Station (Cliff House) | WR | `sanfranciscomuni1965town` | ≈ p. 1 | "Clement, 33rd Ave., Geary 48th Ave., and PRW to Sutro Station (Cliff House)." | [W][ocr] |
| Cut back | 1949-02-12 to 45th Ave after a fire at the Sutro Baths depot | WR | as above | ≈ p. 1 | "12 Feb. 1949: End of line changed to 45th Ave. (Due to fire destroying Sutro Bath Depot)." | [W][ocr] |
| Last streetcar | replaced by motor coach line 2, 1949-07-03 (WR); No. 2 among lines on motor coaches "as of July 3, 1949" (PUC48) | WR; PUC48 | as above; `reportofsanfranc1948sanf` | PUC48 p. 167 | "3 July 1949: REPLACED BY MOTOR COACH LINE 2" | [W][O][ocr] |

### 2a. Sutro Railroad — route at each snapshot (today's names)

Today's junctions measured on Overture 2026-09-23.1: California/Presidio 37.78727, −122.44681; Presidio/Sutter
37.78444, −122.44626; Presidio/Geary 37.78261, −122.44586; California/Parker 37.78625, −122.45479 (Maple St meets
California 25 m east, so the 1894 "Maple street … unnamed street" turn is today's Parker Ave); Parker/Euclid 37.78409,
−122.45467; Euclid/Arguello 37.78383, −122.45908; Clement/Arguello 37.78320, −122.45903; Clement/33rd 37.78163,
−122.49346; 33rd/Geary 37.77965, −122.49332; Geary meets Point Lobos Ave 37.77958, −122.50299; Point Lobos/48th
37.77987, −122.50946; Clement/8th 37.78285, −122.46658; 8th/Fulton 37.77340, −122.46590.

**A. 1896-02-01 to 1906 (Sutro Railroad, then Sutter Street Ry, then URR from 1902):**
1. Presidio Ave from Sutter St (CW) or Geary Blvd (CAM; Order 2781) north to California St. One block's difference;
   see conflicts.
2. California St, Presidio Ave → Parker Ave.
3. Parker Ave, California St → Euclid Ave (1894: "unnamed street"; Res. 11,448: "Williamson street").
4. Euclid Ave (1894: "Richmond avenue"), Parker Ave → Arguello Blvd.
5. Arguello Blvd (1894: "First avenue"), Euclid Ave → Clement St (one short block south).
6. Clement St, Arguello Blvd → 33rd Ave. Order 2781 allows a curve south "at or near the east line of the City
   Cemetery Reservation" instead of the corner; 33rd Ave & Clement is that line today.
7. 33rd Ave, Clement St → Geary Blvd (old Point Lobos Ave).
8. Geary Blvd, 33rd Ave → Point Lobos Ave (≈ 42nd Ave), then Point Lobos Ave → 48th Ave.
9. 48th Ave north, across "Point Lobos road", into private land to the Sutro Baths station: **private right of way**,
   not a present street. Trace it from USGS San Francisco 1:62,500 1899 (`usgs-san-francisco-1899`) and 1915
   (`usgs-san-francisco-1915`); the line ran until 1949, so also look at San Francisco North 1:24,000, 1950
   (`usgs-san-francisco-north-1950`). Not checked on an image this pass.
10. 8th Ave branch: 8th Ave, Clement St → Fulton St (Order 2781 "Second"; CAM). Its opening and end aren't sourced;
    in 1928 the track was used by MSRy line 21 Hayes ("Fulton St. and 8th Ave. to Clement St.", OS29 p. 346).

**B. 1909 (MAN09, "Clement" extension line)**: steps 2–9 above from Parker Ave & California St; the Sutter St cars
ran to 6th Ave on California St (§1), so the Clement line was a shuttle from Parker & California.

**C. 1928 (OS29, line 2)** and **1944–49 (WR, Muni line 2)**: through route from the Ferry by Market, Sutter,
Presidio, then steps 2–9. From 1949-02-12 to 45th Ave only; last streetcars 1949-07-02/03.

### 2b. Park & Ocean Railroad — facts

| Fact | Value | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Original franchise | to Leland Stanford, Collis P. Huntington, Charles Crocker, "now changed to Park and Ocean Railroad Company"; 50 years from 1879-11-28: Stanyan St from Haight to Waller, curve to H St, H St to 48th Ave, curve 900 ft to the Great Highway, along it to the cliff | MR88 | `sanfranciscomuni38sanfrich` | pp. 148–149 | "thence along H street to the east line of Forty-eighth avenue; thence on a curve with a radius of five hundred and seventy-three (573) feet for a distance of nine hundred (900) feet to the great highway" | [P][O][ocr] |
| Amended route (franchise 50 years from 1883-10-08) | Stanyan St from Haight to Waller; curve through the NE corner of Block 714 to H St; H St to the Great Highway; north along the Great Highway; east to D St & 49th Ave; 49th Ave to between C and B Sts; west through private land to B St; tunnel under the park's Grand Ave | MR88 | as above | p. 149 | "thence deflecting easterly to the intersection of D street and Forty-ninth avenue; thence along Forty-ninth avenue to a point between C and B streets; thence diverging to the west through private property to a point on B street" | [P][O][ocr] |
| Park commissioners' consent | 1883-10-12 | CW | sfmta-callwell-chronology | p. 10 | "S.F.'s park commissioners vote unanimously to allow the Park & Ocean Railroad, a steam-line subsidiary of the Market St. company, to operate from Haight & Stanyan, on Stanyan" | [O][snip] |
| First day | 1883-12-01 (steam) | CW | as above | p. 10 | (paraphrase) | [O][para][prev] |
| Other date | "1884. Park & Ocean Railroad Company, organized 1883, put into operation as a steam line to the Beach." | ARN13 | `reportonimprovem00arno_0` | pp. 416–417 | (as in value) | [O][ocr] |
| Size, Nov 1886 | 4.62 miles; 7 dummy engines, 16 passenger cars | SRJ vol. 3, Nov 1886, directory | `streetrailwa318861887newy` | p. 26 | "Park & Ocean R.R. Co. 4.62m, 35 and 40 lb r, 4-8½ g, 7 dummy engines, 16 pass. c" | [C][ocr] |
| Route (CAM) | Haight & Stanyan, along H St (Lincoln Way) to and along the beach to the Cliff House | CAM | `historyofpublict1947sanf` | pp. 16–17 | "Operating as a steam line, it ran from Haight and Stanyan Streets along "H" Street (Lincoln Way) to and along the Beach to the … Cliff House." | [O][ocr] |
| Into the MSRy | Park and Ocean Railroad Company among the lines taken over by the Market Street Railway (inc. 1893-10-11) | OS29 | `reportonstreetr1929osha_1` | p. 10 | "Park and Ocean Railroad Company" (in the list) | [O][ocr] |
| Electrified | during 1898: "formerly operated by steam motors, from Stanyan and Haight Streets, along H Street … to the ocean beach"; double track, about 4 miles | SRJ vol. 15, Jan 1899, "Recent improvements in San Francisco" | `streetrailwayjo151899newy` | p. 37 | "The Park and Ocean Line, formerly operated by steam motors, from Stanyan and Haight Streets, along H Street (the southern boundary of Golden Gate Park), to the ocean beach, has been converted to the electric system." | [C][ocr] |
| Same, CW | June 1898 | CW | as above | p. 10 | (parenthetical) | [O][para][prev] |
| 1909 | No. 20 Ellis & Ocean: … Oak, Stanyan, H St to 19th Ave; every other car on out H St to "Ocean Boulevard, thence west to B Street" | MAN09 | `reportonoperatio00manlrich` | p. 13 | "From 19th and H every other car continues out H to Ocean Boulevard, thence west to B Street." | [C][ocr] |
| 1928 | line 7 Haight & Ocean: Ferry, Market, Haight, Stanyan, Frederick, Lincoln Way, private right of way and La Playa to the Balboa St loop | OS29 | as above | p. 344 | "From Ferry Loop via Market Street, Haight St., Stanyan St., Frederick St., Lincoln Way, Private Right of Way and La Playa to Balboa Street Loop." | [O][ocr] |
| 1944–47 | Muni line 7 Haight–Ocean: … Lincoln and La Playa; cut back to Lincoln Way & 47th Ave 1947-02-23 | WR | `sanfranciscomuni1965town` | ≈ p. 8 | "23 Feb. 1947: Line cut back to Lincoln Way and 47th Ave." | [W][ocr] |
| Last streetcar | 1948-07-03, motor coaches 07-04 | PUC48 | `reportofsanfranc1948sanf` | p. 189 (and p. 163) | "7/ 3/48 No. 7 — Last day of street car operation." | [O][ocr] |

### 2b. Park & Ocean — route (today's names)

**1883-12-01 (or 1884) to 1898 (steam), then electric:**
1. Stanyan St from Haight St south to Waller St (both franchises).
2. A curve "through the northeast corner of Block No. 714" from Stanyan & Waller to Lincoln Way (the park's SE corner);
   **private right of way**, short; trace from USGS SF 1:62,500 1895/1899.
3. Lincoln Way (H St) west to the Great Highway.
4. **Private right of way / Great Highway** north along the beach, then east to La Playa at Fulton St; the 1883
   franchise's "Forty-ninth avenue" between D St and B St is today's La Playa St (an inference: CW's terminal "what is
   now La Playa & Balboa" and the franchise's "49th avenue … B street" describe the same corner; La Playa runs where a
   49th Ave would be, between 48th Ave and the Great Highway).
5. La Playa from Fulton St to Balboa St (terminal). OS29 (1928) and PUC48 (1948) both use "Balboa and La Playa".
- **Maps:** USGS SF 1:62,500 1895/1899 draw it along the park's south edge and north along the beach, labelled
  "S. P. R. R." (last session, on the image). For the beach section, use the 1915 sheet and SF North 1950 too.

**Conflicts:** first day 1883-12-01 (CW) vs "1884" (ARN13 pp. 416–417). Keep CW's date; ARN13 is a year-only summary.

### Conflicts (2a)

| Item | Values | Note |
|---|---|---|
| Sutro line's east end | Presidio Ave & Sutter (CW) vs Presidio Ave & Geary (CAM; Order 2781 "First") | Res. 11,448's pole permit starts "on and along Central avenue", no cross street. One block; Matthew's call |
| West of Geary/Point Lobos | OS29 1928 "40th Avenue" vs 48th Ave (Order 2781; Res. 11,448; WR 1944; CW) | OS29's OCR is known to misread figures (repo note); take 48th Ave, but check OS29 p. 343 on the page image |
| "Euclid" vs "Richmond Ave"; "Arguello" vs "First Ave" | CW and OS29 use today's names; Order 2781 and MAN09 the old ones | same streets by route; not a sourced renaming |
| Sale to Sutter St Ry | Oct 1899 (CW, para) vs undated (ARN13, CAM, OS29) | newspaper (the Call, Oct 1899) |

### For Matthew

- **Trace** the Sutro Baths private right of way and the Park & Ocean's beach section from the USGS sheets
  (1899, 1915, and SF North 1950). Both are `digitized` at best.
- **D St = Fulton St, B St = Balboa St, 49th Ave = La Playa, Richmond Ave = Euclid Ave, First Ave = Arguello Blvd,
  Williamson St/"unnamed street" = Parker Ave north of Euclid**: all inferred from route comparisons. A street-renaming
  ordinance (SF Board of Supervisors, about 1909) would source them; the Municipal Reports 1909–10 and 1910–11
  (`sanfranciscomuni59sanfrich`, `sanfranciscomuni60sanfrich`) are the place to look. Not read this pass.

---

## 3. San Francisco & San Mateo Railway (1892) → URR/MSRy/Muni No. 40 San Mateo interurban (to 1949)

### Facts

| Fact | Value | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| City franchise | Order No. 2306 to J. W. Hartzell, Behrend Joost, W. F. Thomas; passed 1890-12-23; 50 years | MR 1898–99, "Street railroad franchises", SF & SM Railway Co. | `sanfranciscomuni49sanfrich` | pp. 197–200 | "Order finally approved and passed December 23, 1890. Acceptance filed by grantees December 29, 1890." | [P][O][ocr] |
| Order 2306 route (outbound) | Steuart St from Market to Harrison; Harrison to 14th St; …; 14th to Guerrero; Guerrero to San Jose Ave; San Jose Ave to 30th St; 30th to Chenery; Chenery to Croton Ave; Croton Ave to Old San Jose road; Old San Jose road to the county line | MR 1898–99 | as above | pp. 197–198 | "commencing at the junction of Guerrero street and Fourteenth street; thence along and upon Guerrero street to San Jose avenue; thence along and upon San Jose avenue to Thirtieth street; thence along and upon Thirtieth street to Chenery street" | [P][O][ocr] |
| Order 2306, the rest of the south end | "thence along and upon Chenery street to Croton avenue; thence along and upon Croton avenue to Old San Jose road; thence along and upon Old San Jose road to the county line" | MR 1898–99 | as above | p. 198 | (as in value) | [P][O][ocr] |
| Order 2306, downtown loop | Stanley Place from Harrison to Bryant; Bryant from East St to 8th St; 8th St to Harrison; also 2nd St Bryant–Brannan, Brannan Beale–8th, 8th to Harrison, 14th to Dolores, Dolores to 30th (franchise only) | MR 1898–99 | as above | pp. 197–198 | "beginning at the junction of Stanley place and Harrison street; thence along and upon Stanley place to Bryant street; also, beginning at the junction of Bryant and East streets; thence along and upon Bryant to Eighth street" | [P][O][ocr] |
| Same order, the 18th St/Park branch | Guerrero & 18th, 18th to Falcon road, Casselli Ave, Park Lane road to Frederick St, and to Stanyan & Waller (the later "switchback" line) | MR 1898–99 | as above | p. 198 | "commencing at the junction of Guerrero and Eighteenth streets; thence along and upon Eighteenth street to Falcon road" | [P][O][ocr] |
| Speed limits name the outer end | 8 mph from Market & Steuart to 30th St; 20 mph from 30th St to the county line | MR 1898–99 | as above | p. 199 | "nor at a rate of speed exceeding twenty miles per hour between Thirtieth street and the county line between the counties of San Francisco and San Mateo" | [P][O][ocr] |
| $50,000 spent | accepted 1891-11-16 (Res.); evidence filed 1891-11-04 | MR 1898–99 | as above | pp. 200–201 | "Resolution approved November 16, 1891." | [P][O][ocr] |
| Bypass franchise, 1893 | Order 2723 (approved 1893-12-18): 30th & San Jose Ave south on San Jose Ave to Randall St, private land to Arlington St, Arlington St and private land to San Jose road, "connecting with the tracks of the San Francisco and San Mateo Railway Company at Sunnyside avenue" | MR 1898–99 | as above | pp. 201–204 | "thence southerly and along Arlington street through private property, with owners' consent, to San Jose road, connecting with the tracks of the San Francisco and San Mateo Railway Company at Sunnyside avenue" | [P][O][ocr] |
| Ferry link, 1898 | Order 104: Steuart & Howard, Howard to East St, East St to opposite the Ferry Depot (SF & SM *Electric* Railway Co.; 43 years) | MR 1898–99 | as above | pp. 204–205 | "commencing at the intersection of the center line of Steuart street with Howard street, and running thence along and upon Howard street to East street" | [P][O][ocr] |
| Route, official summary | Steuart & Market, Steuart, Harrison, 14th, Guerrero, San Jose Ave, Chenery, San Jose Ave to the county line; later to the cemeteries, Burlingame and San Mateo | CAM | `historyofpublict1947sanf` | p. 23 | "Its initial route ran from Steuart and Market Streets along Steuart, Harrison, Fourteenth, and Guerrero Streets, San Jose Avenue, Chenery Street, San Jose Avenue to the county line" | [O][ocr] |
| Same, ARN13 | "from the corner of Steuart and Market to the County line, via Steuart, Harrison, Fourteenth, Guerrero and San Jose Avenue"; later "extended to the Holy Cross Cemetery" | ARN13 | `reportonimprovem00arno_0` | pp. 417–418 | (as in value) | [O][ocr] |
| Planned opening | "by February 15 cars will be running from the city terminus of the road at Market and Steuart Streets to Holy Cross Cemetery" | SRJ vol. 8, Feb 1892 | `streetrailwayjou8189unse` | p. 112 | (as in value) | [C][ocr] |
| Opening | "opened April 26, 1892" (the first electric railway in SF) | SRJ vol. 10, Oct 1894 | `streetrailwayjo101894newy` | ≈ p. 612 (next head 613) | "The first electric railway in operation was the San Francisco & San Mateo Railway which opened April 26, 1892." | [C][ocr] |
| Opening (CW) | ceremonies 1892-04-26, regular service the next day | CW | sfmta-callwell-chronology | p. 14 | "Opening-day ceremonies for the San Francisco & San Mateo Railway, S.F.'s first electric streetcar line, with regular service starting the next day." | [O][snip][prev] |
| Route (CW) | Steuart, Harrison, 14th, Guerrero, San José Ave, 30th, Chenery, trestle over Diamond Ravine, Old San José Road to Holy Cross Cemetery (Colma); eastbound Harrison, 8th, Bryant, Stanley Place (Sterling St), Harrison | CW | as above | p. 14 | "then on a trestle over Diamond Ravine, and then on Old San José Road to Holy Cross Cemetery in what is now Colma" | [O][snip] |
| Receivership, 1896 | court ordered the road sold (1896-01-03); "built in '91–'92 … thirteen miles" | SRJ vol. 12 no. 2, Feb 1896 | `streetrailwayjo121896newy` | p. 136 | "This road was originally built in '91-'92 and had a length of thirteen miles." | [C][ocr] |
| Bought by the "Baltimore Syndicate" | 1900, $1,200,000 | ARN13; OS29 | ARN13; `reportonstreetr1929osha_1` | ARN13 pp. 420–421; OS29 p. 11 | "In 1900 the San Francisco and San Mateo line was purchased by what was known as the "Baltimore Syndicate."" (OS29) | [O][ocr] |
| Into the URR | 1902-03-04 (URR incorporated, taking the SF & SM Electric Railway Co.) | OS29; ARN13 | as above | OS29 p. 11; ARN13 p. 321 | "the San Francisco and San Mateo Electric Railroad Company" (in the list) | [O][ocr] |
| Extension to San Mateo, as built | 11 miles of trolley line already ran "from the ferries" to Holy Cross (4 in the city, 7 suburban); private right of way Holy Cross → Burlingame "through the outskirts of Baden, San Bruno and Millbrae"; streets from Burlingame to San Mateo; double track; 10.635 miles Holy Cross–San Mateo; map stations Holy Cross (new depot), Baden, Tanforan, San Bruno, Millbrae, Burlingame, San Mateo | SRJ vol. 22 no. 18, Oct 31, 1903, "San Mateo extension of the United Railroads of San Francisco" | `streetrailwayjo221903newy` | pp. 798–799 | "A private right of way was secured from Holy Cross to Burlingame, through the outskirts of Baden, San Bruno and Millbrae. From Burlingame to San Mateo franchises were secured to run on the streets." | [C][ocr] |
| Running by Oct 1903 | half-hourly 5:30 a.m.–8 p.m.; 23 miles in 1 h 15 min; fare 25¢ | SRJ, Oct 31, 1903 | as above | p. 802 | "The cars at the present time are operated every half-hour from 5:30 a. m. to 8:00 p. m." | [C][ocr] |
| Power, Apr 1903 | Millbrae sub-station for "the suburban line from the cemeteries to San Mateo" described as under construction | SRJ vol. 21, Apr 18, 1903 | `streetrailwayjo211903newy` | p. 582 | "(3) to a sub-station at Millbrae, which will supply the suburban line from the cemeteries to San Mateo" | [C][ocr] |
| South San Francisco branch | South San Francisco RR & Power Co. line turning east from the San Mateo line "from a point near Baden" (1909) | MAN09 | `reportonoperatio00manlrich` | p. 28 | "turning off toward the east from a point near Baden" | [C][ocr] |
| 1909 route | "5th and Market via 5th to Mission to Colma to Cemeteries to San Mateo"; 25¢ | MAN09 | as above | p. 26 | (as in value) | [C][ocr] |
| 1909, the city terminus | 5th & Market "the terminus of the San Mateo Electric line" | MAN09 | as above | p. 23 | "besides being the terminus of the San Mateo Electric line" | [C][ocr] |
| 1928 route (No. 40) | 5th St, Mission St through Daly City and Colma; PRW through San Bruno, Lomita Park, Millbrae to Burlingame; San Mateo Drive, Baldwin Ave, B St, 3rd Ave to Main St (San Mateo); back by Main St, 2nd Ave, B St, Baldwin Ave, Ellsworth Ave, Poplar Ave, San Mateo Drive | OS29 appendix B | `reportonstreetr1929osha_1` | p. 349 | "then via San Mateo Drive, Baldwin Avenue, "B" Street and 3rd Ave. to Main Street - San Mateo." | [O][ocr] |
| 1944 route | 5th St & Market, 5th, Mission (Daly City), interurban PRW to Colma, Cemeteries, Tanforan, San Bruno, Lomita Park, Millbrae, Broadway, Burlingame, San Mateo | WR | `sanfranciscomuni1965town` | ≈ p. 14 ("fourteen") | "From Fifth St. and Market (San Francisco), via Fifth, Mission (Daly City), and interurban prw to Colma, Cemeteries, Tanforan, San Bruno, Lomita Park, Millbrae, Broadway, Burlingame…" | [W][ocr] |
| Valencia detour | 1945-02-04 via 14th St and Valencia St back to Mission; 1946-07-28 "Route of 1944 resumed" | WR | as above | ≈ p. 14 | "4 Feb. 1945: From Fifth St. and Market via Fifth, Mission, 14th, Valencia, Mission, etc." | [W][ocr] |
| Through service cut | 1947-08-17: operations San Mateo–Daly City; through to 5th & Market only at peaks | PUC47 (date column aligned by order, [ocr]); WR | `reportofsanfranc1947sanf` | p. 171 | "No. 40 — Operations confined San Mateo to Daly City. Service to Fifth and Market during peaks, weekdays and Saturdays only." | [O][ocr] |
| **Last day** | **1949-01-15**; abandoned 1949-01-16 | PUC48 | `reportofsanfranc1948sanf` | p. 164 and p. 277 | "On January 16, 1949, the No. 40 San Mateo street car line was abandoned, the last day of operation being January 15, 1949." | [O][ocr] |
| Same, power | "On January 15, 1949, the San Mateo Suburban Line No. 40 was discontinued, and Millbrae substation was closed permanently." | PUC48 | as above | p. 226 | (as in value) | [O][ocr] |

### Route at each dated snapshot (today's names)

**A. 1892-04-26/27 (SF & SM; CW, CAM, ARN13, Order 2306):**
1. Steuart St, Market St → Harrison St. (Steuart today ends about 395 m short of Harrison; the last session measured
   it. That block is gone: draw it `approximate`, or along the 1899 USGS sheet.)
2. Harrison St, Steuart → 14th St (outbound). Eastbound jog (CW; Order 2306): Harrison → 8th St → Bryant St → Sterling
   St (Stanley Place, CW p. 14) → Harrison. Sterling St today meets Bryant but stops 119 m short of Harrison.
3. 14th St, Harrison → Guerrero St.
4. Guerrero St, 14th → San Jose Ave (≈ 28th St).
5. San Jose Ave, Guerrero → 30th St.
6. 30th St, San Jose Ave → Chenery St.
7. Chenery St, 30th St → "Croton avenue" (Order 2306) — CW: a trestle over Diamond Ravine. **Croton Ave is not a
   present street; the trestle is private right of way. Not drawable from today's streets.** Trace from USGS SF 1899.
8. "Old San Jose road" (Order 2306) to the county line, then to Holy Cross Cemetery, Colma. CAM writes this part as
   "San Jose Avenue to the county line", i.e. today's southern San Jose Ave (Glen Park → Daly City); in 1903 the
   URR's sub-station for this section was at Geneva & San Jose Aves (SRJ Apr 1903). Treat Old San Jose road = today's
   San Jose Ave south of Glen Park as **likely, not sourced**. OHM way 200016955 (Chenery → Daly City) is a
   geometry pointer.
9. County line → Holy Cross: alignment not in any source reached (Mission St/El Camino Real is the obvious candidate;
   unsourced).
- Order 2723 (1893) gives a bypass of the Chenery/trestle section: San Jose Ave from 30th St to Randall St, private
  land, Arlington St, to "San Jose road" at "Sunnyside avenue". Whether it was built isn't sourced.
- From 1898 a franchise to reach the Ferry by Howard St and East St (Order 104); SRJ 1903 says the line ran "from the
  ferries". The Steuart → Howard → Embarcadero link is therefore likely 1898/1903+, unconfirmed.

**B. 1903 (URR; San Mateo extension, SRJ Oct 31, 1903):** A + Holy Cross → Burlingame on **private right of way**
(USGS San Mateo 1:62,500 1915, scan 298922, labelled "INTERURBAN"; and 1939, scan 301595, "ELECTRIC"; both checked on
the image by the last session), then streets in Burlingame and San Mateo (franchise streets not named in SRJ).
Opening date: unsourced. Bounds from primary text: the Millbrae sub-station was "being" built on 1903-04-18 and cars
ran half-hourly by 1903-10-31. The railfan date for the first car, 1902-12-26, is [W].

**C. 1909 (MAN09):** 5th St & Market → 5th St → Mission St → (Daly City) → Colma → cemeteries → San Mateo. So after 1906
the SF section is 5th St (Market → Mission) and Mission St south to the county line; the 1892 streets (Steuart,
Harrison, 14th, Guerrero, San Jose Ave, 30th, Chenery) were served by other lines in 1909 (e.g. No. 10 Guerrero and Glen
Park; 18th St line on Harrison from 8th). The date of the switch to Mission St is not in a primary source reached
(after the 1906 earthquake per RE [W]).

**D. 1928 (OS29 p. 349):** C, plus the San Mateo end: San Mateo Drive (Burlingame) → Baldwin Ave → B St → 3rd Ave →
Main St (terminal, San Mateo); return Main St → 2nd Ave → B St → Baldwin Ave → Ellsworth Ave → Poplar Ave → San Mateo
Drive. Draw both directions (a one-way loop in downtown San Mateo).

**E. 1944–1949 (WR; PUC47; PUC48):** C/D with the Valencia detour 1945-02-04 → 1946-07-28 (Mission St from 5th St to
14th St, 14th St to Valencia St, Valencia St to Mission St at its south end, then Mission St); from 1947-08-17 through
cars to 5th & Market at peaks only; **last day 1949-01-15** (PUC48).

### Conflicts

| Item | Values | Note |
|---|---|---|
| First day | 1892-04-26 (SRJ 1894 "opened") vs 04-26 ceremonies + 04-27 service (CW) | take 04-27 for service, as the repo did; SRJ doesn't distinguish ceremony from service |
| Year built | "'91–'92" (SRJ 1896); 1891 (CAM, ARN13, OHM) vs 1892 (CW, SRJ 1894) | construction 1891, opening 1892; draw from 1892 |
| Old San Jose road | = San Jose Ave (CAM's wording) vs unidentified (Order 2306, CW) | likely; see A.8 |
| Valencia detour | WR: 1945-02-04 → 1946-07-28 vs RE [W]: undated "late change" | WR is the only dated source; PUC reports for 1944–46 not read (not in the repo) |
| Last day | 1949-01-15 (PUC48 twice; RE) vs 01-16 (WR "abandoned") | **resolved by PUC48**: last day of operation 01-15, abandoned 01-16 |

### For Matthew

- **Trace** the Diamond Ravine trestle / Croton Ave link and "Old San Jose road" from USGS SF 1:62,500 1899, and the
  Holy Cross–Burlingame right of way from USGS San Mateo 1915/1939 (or use OHM relation 2800853 south of Daly City,
  which cites USGS San Mateo 1939).
- **Not found:** the date service reached San Mateo (1903), the Baden/Holy Cross extension date (before 1903), and the
  date the line moved to Mission St. Newspapers (Call 1902-12 to 1903-06; Chronicling America) or the SF PUC/Muni
  reports for 1944–46 (not on archive.org under the ids searched) would settle them.

---

## 4. Market Street Cable Railway: McAllister and Hayes lines (to 1906)

### Facts

| Fact | Value | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| 1879 franchise (Order 1514, 53 years from 1879-09-20) | McAllister St to 400 ft west of Divisadero (car house at Fillmore & Turk); Hayes St to Laguna, Laguna to McAllister (horse cars or cable) | MR88 | `sanfranciscomuni38sanfrich` | pp. 146–147 | "Fifth— Commencing at the intersection of Market and Hayes streets; thence along Hayes street to Laguna street; thence along Laguna street to McAllister street." | [P][O][ocr] |
| **1882 franchise** (amending Order 1514; 50 years from 1882-06-05) | McAllister: Market → McAllister → Lott St → southwest to Fulton → Fulton to Stanyan. Hayes: Market → Hayes → west line of Stanyan. Also Haight to Golden Gate Park and Valencia to Mission | MR88 | as above | p. 147 | "Third— Commencing at the intersection of Market and McAllister streets; thence along McAllister street to Lott street; thence southwest to Fulton street; thence along Fulton street to Stanyan street. Fourth— … along Hayes street to the westerly line of Stanyan street." | [P][O][ocr] |
| McAllister extension franchise | Stanyan St along Fulton to First Ave (Arguello); 47 years from 1883-06-29 | MR88 | as above | p. 147 | "To extend the McAllister street branch of its railway from Stanyan street along Fulton street to First avenue." | [P][O][ocr] |
| Before the cable | McAllister horse line: Market → Stanyan via McAllister, Central, Fulton; Hayes Valley branch: 9th & Market via Hayes, Laguna, McAllister, Fillmore, Golden Gate, Steiner to O'Farrell & Divisadero; "changed to cable beginning in 1883, and the Hayes Street line was straightened out, terminating at Stanyan Street" | CAM | `historyofpublict1947sanf` | p. 16 | "All these services were changed to cable beginning in 1883, and the Hayes Street line was straightened out, terminating at Stanyan Street" | [O][ocr] |
| Cable ropes in use, Sept 1886 | McAllister St rope 20,580 ft; Hayes St 23,385 ft; Haight 20,452 ft; a Fulton St rope 5,580 ft; all cars use the Market St rope | SRJ vol. 2, Sept 1886 (reprinting "a San Francisco paper") | `streetrailwa218851886newy` | p. 432 | "the McAllister street 20,580 feet long, the Hayes street 23,385 feet long, the Haight street 20,452. The Fulton street rope is 5,580 feet in length" | [C][ocr] |
| Hayes cable line built | double track from Market & Hayes along Hayes to Stanyan, over two miles; car house and engine house erected; "to be operated as a cable line" | SRJ vol. 2, Sept 1886 | as above | pp. 442–443 | "A double track line of street railway has been constructed by the Market Street Cable Ry. Co., from the junction of Market and Hayes streets, along Hayes to Stanyon street. The length is over two miles." | [C][ocr] |
| Hayes, first day | 1886-05-26 or 05-20 | railfan (Cable Car Museum; JT) | – | – | – | [W] — no primary found |
| McAllister, first day | 1883 (month not found) | railfan | – | – | – | [W] — no primary found |
| Listed in 1889 | "Haight St. Branch Market St. Cable" and "Hayes Valley Branch Market St. Cable" among street railroads | Langley's SF Directory 1889 | `langleyssanfranc1889sanf` | classified list "Railroads—Street" (page not read) | "Hayes Valley Branch Market St. Cable, NE cor Fourth and Townsend" | [P][ocr] |
| Into the MSRy | Market Street Cable Railway Co. among lines taken over, Oct 1893 | OS29 | `reportonstreetr1929osha_1` | p. 10 | "Market Street Cable Railway Company" (in the list) | [O][ocr] |
| End of cable | 1906 earthquake; URR cable lines electrified 1906–07 except Castro, Powell, Sacramento | ARN13 | `reportonimprovem00arno_0` | pp. 420–421 | "1906-07. All United Railroads cable lines were electrified excepting Castro, Powell, and Sacramento cables." | [O][ocr] |
| 1909: McAllister (No. 5) | Ferry, Market, McAllister to the car house at McAllister & Central Ave; every other car on to the Chutes | MAN09 | `reportonoperatio00manlrich` | p. 11 | "Out Market from Ferry to McAllister to Car House at McAllister and Central Ave. Every other car continues through to Chutes." | [C][ocr] |
| 1909: Hayes (No. 21 Hayes & Ellis) | Ellis, Hyde, O'Farrell, Divisadero, Hayes, Stanyan, Fulton (Hayes St east of Divisadero not used) | MAN09 | as above | p. 18 | "Out Ellis from Market to Hyde to O'Farrell to Devisadero to Hayes to Stanyan to Fulton" | [C][ocr] |
| 1909: Fulton shuttle | from 8th Ave ("the extension of the Geary, Turk and Eddy, McAllister, and Hayes Street lines") to 36th Ave | MAN09 | as above | p. 29 | "One car runs every 20 minutes on Fulton Street from 8th Avenue … to 36th Avenue." | [C][ocr] |
| 1928 | No. 5: Ferry, Market, McAllister, private right of way, Fulton, La Playa to Balboa loop. No. 21: Ferry, Market, Hayes, Stanyan, Fulton, 8th Ave to Clement | OS29 | `reportonstreetr1929osha_1` | pp. 344, 346 | "From Ferry Loop via Market Street, McAllister Street, Private Right of Way, Fulton Street and La Playa to Balboa Street Loop." | [O][ocr] |
| Last streetcars, 5 and 21 | converted to motor coach 1948-06-07 (PUC47); last day 06-06 (WR) | PUC47; WR | `reportofsanfranc1947sanf`; WR | PUC47 p. 166 | "On June 7, 1948, the No. 5 McAllister and the No. 21 Hayes street car lines were converted…" | [O][ocr] |

### Routes (today's names)

**McAllister cable (1883?–1906):**
1. Market St from the Ferry (The Embarcadero) to McAllister St (today's junction 37.7812, −122.4117).
2. McAllister St west to "Lott street" (1882 franchise); the car house was at McAllister & Central Ave (MAN09).
   **Lott St isn't in Overture today** (no street of that name in SF), so its place on McAllister needs a period map.
3. "Thence southwest to Fulton street": a diagonal across the block McAllister/Central/Fulton/Masonic (private right
   of way; still "Private Right of Way" in OS29 1928). Trace from a map (Sanborn or USGS 1899).
4. Fulton St west to Stanyan St; franchise (1883) on to First Ave (Arguello Blvd). The Fulton rope of 5,580 ft (1886) is
   about the length of Fulton St from Masonic to Arguello (≈ 1.1 mi), which suggests the cable reached First Ave by
   1886 — an inference only.
5. Later extensions on Fulton: to 7th Ave in 1892 [W]; 8th → 12th Ave in 1902 (CW p. 13, prev).

**Hayes cable (1886–1906):**
1. Market St from the Ferry to Hayes St. (Today Hayes St's east end is 47 m off Market St; the 1886 junction needs a
   period map, as noted last session.)
2. Hayes St west to Stanyan St (SRJ 1886; 1882 franchise: to the west line of Stanyan).
- **Earlier Hayes horse route** (CAM): 9th & Market, Hayes, Laguna, McAllister, Fillmore, Golden Gate Ave, Steiner,
  O'Farrell, Divisadero. Undated; not for drawing without dates.

### Conflicts / For Matthew

- The opening days of McAllister (1883) and Hayes (1886) remain **unsourced in primary or official text**. SRJ's
  Sept 1886 issue proves the Hayes line was built by then. Callwell, when reachable, or the Daily Alta (CDNC; Aug–Dec
  1883 and May 1886) would settle them.
- **Book:** Hilton, *The Cable Car in America*, has both dates; a page citation from you would do.

---
