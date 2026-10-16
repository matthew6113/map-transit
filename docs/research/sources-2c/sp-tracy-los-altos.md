# Research: SP Martinez – Tracy line (passenger service, 1878–1971) and the SP Los Altos branch (Mayfield cut-off, 1908–1963/64)

Gathered 2026-10-16. Extends `railroads.md` §2 (Central Pacific / Northern Railway, "Passenger ends") and §6
(SP branches). Neither line is in `data/past/` yet.

## How this pass worked, and how far to trust it

- **archive.org page images worked.** `https://<server>/BookReader/BookReaderImages.php?id=<id>&itemPath=<dir>&server=<server>&page=n<i>.jpg&scale=1`
  (server and dir from `/metadata/<id>`) returned images for every public item tried: the Railroad Commissioners'
  reports, the 1882 Contra Costa history, CSRM employee timetables, *Southern Pacific Bulletin*, *Sunset*, *Los
  Angeles Times*, *Electric Railway Journal*, *The Western Railroader*, the *Campbell Interurban Press* and *Campbell
  Press*. Most quotes below are **[img]**: read on the page image, printed page read from the image where printed.
  Leaves are `n<i>` (BookReader index); a leaf link is `https://archive.org/details/<id>/page/n<i>/`.
- **OCR text** came from the item's data server (`https://<server><dir>/<file>_djvu.txt`, and
  `_hocr_searchtext.txt.gz` + `_hocr_pageindex.json.gz` to find the leaf). `/download/` redirects to
  `dn*.ca.archive.org`, which the proxy refuses. The page index was off by one leaf in one item (ERJ 1910-01-29:
  index 34 = n33); every leaf cited below was confirmed on the image.
- **Finding pages:** archive.org full-text search (`/services/search/beta/page_production/?service_backend=fts&user_query=…`)
  and `fulltext/inside.php`.
- **CPUC decisions** were downloaded from files.cpuc.ca.gov, rendered with `pdftoppm -r 70–250 -gray` and read on
  the image for the pages cited. To look for orders with no known number, all decisions in four windows were
  downloaded and their text layers grepped (first 2–3 pages, or all pages for SP items): **1954-08 → 1955-03**
  (803 applications), **1958-09 → 1959-04** (853 applications + 217 others), **1963-07 → 1963-11** (483
  applications), **1963-11-27 → 1964-03** (642, all kinds). None contained an order on Martinez–Tracy trains
  55/56, on Los Gatos service, or on Los Altos branch trains (details under each line).
- **WebSearch** was used only for leads (decision numbers D67736, D74832, D68686, D51391, D55707 came from it);
  every fact below was read in the source itself.
- **Not reachable / not used:** CDNC, newspapers.com, Wikipedia (pointers only). The *Los Altos Reminiscences*
  (1973) item is lending-only; only its full-text-search snippet could be read (tagged **[ocr-snippet]**).
- **Tags:** [P] primary (railroad timetable, company magazine, contemporary newspaper or advertisement);
  [O] official (Railroad Commission / CPUC); [C] contemporary compiled (Commissioners' reports, county histories,
  trade journals); [W] pointer only; [img] read on the page image; [ocr] text layer only.
- Downloads were kept in the session scratchpad only (not in the repo); each id and leaf below reopens them.

---

## 1. Martinez – Antioch – Tracy (San Pablo & Tulare Railroad; SP's "Tracy line")

### Answer in one paragraph

The line was built and owned by the **San Pablo and Tulare Railroad Company** (incorporated 1871-07-19; merged
into the Southern Pacific Railroad Company on 1888-05-14, with the Southern Pacific Company as operator). The
railroad's own returns to the Board of Railroad Commissioners, in three separate reports, give **"From Tracy to
Martinez … Sept. 3, 1878"** as the date it was opened for public use [img]. The 1882 county history's "first train
passed through Antioch September 9, 1878" is six days later (conflict 1). Passenger trains ran over it for 93
years: in 1914 eight eastward first-class passenger trains a day (the Owl, Atlantic Express, Fresno and Bakersfield
passengers, a Tracy and Fresno local); in 1955 the Owl, a daily-except-Sunday local (Nos. 55/56, gone by April 1955;
"discontinued in 1955") and the San Joaquin Daylight; the Owl's discontinuance was authorized by **CPUC D68686
(1965-03-02)** and it was gone from the timetable effective 1965-04-12; from then only the **San Joaquin Daylight
(Nos. 51/52)** used the line, and the CPUC refused SP's request to drop it (D74832, 1968-10-15). The **last regular
passenger trains ran on 1971-04-30**: the *Southern Pacific Bulletin* of May 1971 says the San Joaquin Daylight was
"not selected by NRPC for operation" and was "discontinued on April 30" [img], and the next employee timetable
(1971-05-23) shows no train on the Tracy line [img]. No CPUC or ICC order for the 1971 end was found or needed by
these sources; none was read.

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| T1 | **Opened for public use, Tracy – Martinez**; length 46.518 mi "from near Martinez to Tracy" | **1878-09-03** | Board of Railroad Commissioners, 9th report (returns for 1887), San Pablo and Tulare RR return | `annualreportboa05unkngoog` | p. [204] (n207; between p. 203 n206 and p. 205 n208) | "Date when the road, or portions thereof, were opened for public use: From Tracy to Martinez … Sept. 3, 1878." "Length of main line of road from near Martinez to Tracy … 46.5180 miles." | [C][img] |
| T2 | Same date, SP RR Co. return | 1878-09-03 | 10th report (1889) | `annualreportboa54commgoog` | p. 73 (n193) | "From Martinez to Tracy … Sept. 3, 1878." | [C][img] |
| T3 | Same date, in-line table | 1878-09-03 | Report of 1893–94 (`ca-brc-report-1894`), SP RR Co. return | `annualreportboa00caligoog` | SP p. 24 (n127) | "From Martinez to Tracy … September 3, 1878." | [C][img] |
| T4 | Owner in 1887 | 1887 | 9th report, list of corporations | `annualreportboa05unkngoog` | p. 21 (n24) | "San Pablo and Tulare Railroad Company … Tracy to Martinez." | [C][img] |
| T5 | Incorporation | 1871-07-19 | 9th report, the company's return | same | p. [202] (n205) | "San Pablo and Tulare Railroad Company was incorporated July 19, 1871." | [C][img] |
| T6 | Merged into SP Railroad Co.; operated by SP Co. | 1888-05-14 | 1893–94 report, SP RR Co. history | `annualreportboa00caligoog` | SP p. 17 (n120) | Constituent companies include "San Pablo and Tulare Railroad Company … July 19, 1871"; consolidated "Southern Pacific Railroad Company … May 14, 1888"; "Carrier operating the road of this company: Southern Pacific Company." | [C][img] |
| T7 | Railroad crossings on the line (fixes three points) | 1887 | 9th report, SP&T return | `annualreportboa05unkngoog` | p. [204] (n207) | "Black Diamond Railroad, 19 feet clear, Cornwall. Pittsburg Railroad, 18½ feet clear, Los Medanos. Empire Railroad, 19 feet clear, Antioch." | [C][img] |
| T8 | Passenger fares in force (so passenger service by 1888) | 1888 | 9th report, maximum rates | same | p. 35 (n38) | "San Pablo and Tulare Railroad, connecting at Tracy with Western Division as above. Oakland to Martinez, via Port Costa … 4 cents. Martinez to Tracy … 3 cents." | [C][img] |
| T9 | First train through Antioch | 1878-09-09 | *History of Contra Costa County* (1882) | `historyofcontrco00munrrich` | p. 491 (n582) | "the Central Pacific Railroad had stretched out its octopus arms, and completing their line from Oakland to Tracy, the first train passed through Antioch September 9, 1878." | [C][img] (upgrades `railroads.md`'s [ocr]) |
| T10 | Brentwood town and depot owe to the railroad | by 1882 | same | same | pp. 496–497 (n589–n590) | "the owners of the Marsh Grant donated a tract of land for the purpose of laying out a town, the necessity for such having sprung from the advent of the railroad" … "a handsome railroad depot" | [C][img] |
| T11 | Byron on the line, with a depot; Byron Hot Springs reached by stage from Byron Station | by 1882 | same | same | p. 497 (n590) | "BYRON.—This is another hamlet on the line of the railroad … There is also a fine depot and a post-office." "There is stage connection with Byron Station." | [C][img] |
| T12 | **Passenger trains, 1914**: eastward first-class over Martinez – Tracy: 6 Atlantic Express, 26 The Owl, 50 Fresno Express, 52 Fresno Passenger, 8 Los Angeles Passenger, 84 Bakersfield Passenger, 36 Tracy and Fresno Passenger, 86 Fresno Express (44, 60, 42 turn off at Avon) | eff. 1914-01-04 | SP Western Division Time Table No. 153 | `cscrm_2021_02_000614` | p. 10 (n34) | "36 Tracy and Fresno Passenger … s 8.15 [Martinez] … s 8.33 [Bay Point] … s 8.50 [Pittsburg] … s 9.00 [Antioch] … s 9.17 [Brentwood] s 9.28 [Byron] … s 10.10 AM [Tracy]" | [P][img] |
| T13 | **Passenger trains, January 1955**: 58 Owl (daily), 56 Passenger (daily ex. Sunday; stops s at Avon, Port Chicago, Pittsburg, Antioch, Brentwood, Byron, Tracy), 52 San Joaquin Daylight (daily; s Pittsburg, Tracy) | eff. 1955-01-09 | SP WD Timetable No. 259, Martinez Subdivision | `cscrm_2021_02_001859` | p. 6 (n9) | "58 Owl … 56 Passenger Leave Daily Ex. Sunday … 52 San Joaquin Daylight" ; No. 56 "s12.05 [Antioch] … s12.21 [Brentwood] s12.32 [Byron] … s12.55 PM [Tracy]" | [P][img] |
| T14 | Handwritten on No. 56 in that copy (owner unknown) | 1955 | same | same | p. 6 (n9) | "Discontinued – last trip 1-[1?]8-55" | [P][img], hand unreadable: "1-8-55" or "1-18-55" |
| T15 | Local gone: only 58 Owl and 52 San Joaquin Daylight eastward | eff. 1955-04-24 | SP WD Timetable No. 260 | `cscrm_2021_02_001858` | p. 6 (n7) | (table: first class 58 Owl, 52 San Joaquin Daylight only) | [P][img] |
| T16 | Which pairs had ended, and when | 1955, 1965, 1960 | CPUC D74832 (A.50211), footnote 4 | files.cpuc.ca.gov …/Decisions_D73751_to_D86500/D74832_19681015_A50211.pdf | p. 5 | "They were Trains Nos. 55 and 56, 57 and 58 (the Owl) and 59 and 60 (the West Coast). Operation of these pairs was discontinued in 1955, 1965 and 1960, respectively." | [O][img]. The West Coast is not on the 1955 Tracy-line table (T13); it is not drawn here |
| T17 | 1964: Owl 58/57 and San Joaquin Daylight 52/51 on the Tracy line | eff. 1964-10-25 | SP WD Timetable No. 2 | `cscrm_2021_02_002164` | p. [12] (n11) | "58 Owl … 52 San Joaquin Daylight … 57 Owl … 51 San Joaquin Daylight" | [P][img] |
| T18 | **Owl discontinuance authorized** (with a condition precedent on a bus-connection schedule for 51/52) | order **1965-03-02**, effective 20 days later | CPUC D68686 (A.46660, filed 1964-05-22) | …/Decisions_D57801_to_D73750/D68686_19650302_A46660.pdf | pp. 20–21 | p. 20: "(c) Southern Pacific Company is hereby authorized to discontinue Owl Trains Nos. 57 and 58 between San Francisco and Los Angeles." p. 21: "Dated at Los Angeles, California, this 2nd day of March, 1965." | [O][img] |
| T19 | Owl gone from the Tracy line | eff. **1965-04-12** 12:01 a.m. | Supplement No. 1 to WD Timetable No. 2 ("superseding pages 12 and 13") | `cscrm_2021_02_002200` | cover (n0); p. 12 (n1) | Tracy line: "52 San Joaquin Daylight" / "51 San Joaquin Daylight" only | [P][img]. Also absent in No. 3 (1965-04-25, `cscrm_2021_02_002199`, n11) and No. 4 (1965-10-31, `cscrm_2021_02_002198`, n11) [img] |
| T20 | San Joaquin Daylight's route; SP's 1968 application to drop it **denied** | order 1968-10-15, eff. 25 days later | CPUC D74832 (A.50211, filed 1968-05-03) | as T16 | pp. 2, 44 | p. 2: "The San Joaquin Daylights operate between Los Angeles and Oakland via Lancaster, Mojave, Bakersfield, Fresno, Merced, Lathrop, Tracy and Martinez". p. 44: "1. Application No. 50211 is denied." | [O][img]. Rehearing denied, D75178 (1969-01-07) [O][ocr] |
| T21 | **Last timetable with a Tracy-line passenger train**: 52 San Joaquin Daylight, leave daily, Martinez 9.22 AM, Mococo, Avon, Port Chicago, s Pittsburg 9.38, Los Medanos, Brentwood, Byron, s Tracy 10.14 AM; 51 Tracy 4.40 PM … s Pittsburg 5.13, s Martinez 5.28 PM | eff. 1970-03-29 | SP WD Timetable No. 13, Martinez Subdivision | `cscrm_2021_02_002281` | p. 12 (n11) | "52 San Joaquin Daylight Leave Daily … s 9.38 … PITTSBURG … s10.14 AM … TRACY" | [P][img] |
| T22 | **End**: discontinued April 30, 1971 (not taken by Amtrak) | **1971-04-30** | *Southern Pacific Bulletin* 55(4), May 1971, "AMTRAK Service Begins" | `cscrm_002463` | p. 10 (n5, spread pp. 10–11) | "Four of our inter-city trains were not selected by NRPC for operation and were therefore discontinued on April 30: the San Joaquin Daylight, the Sacramento Daylight, the Northwestern Pacific's self-propelled car…" | [P][img] |
| T23 | After: Tracy-line table has no trains; Nos. 12 and 102 now "N.R.P.C. Passenger" on the Sacramento line | eff. 1971-05-23 | SP WD Timetable No. 14 | `cscrm_2021_02_002282` | p. 12 (n11) | Tracy line table: stations only; "12 N.R.P.C. Passenger … 102 N.R.P.C. Passenger" | [P][img] |

### Route and stations (sourced)

- **1914, eastward from Port Costa (miles from San Francisco)** [P][img] (T12): Port Costa 31.1, Nevada Dock 32.2,
  **Martinez 34.7**, Amorco 35.8, Mococo 36.0, Peyton 36.8, **Avon 38.1**, **Bay Point 41.2**, Nichols 43.0, McAvoy
  44.8, **Pittsburg 48.9**, Los Medanos 50.8, Prince 53.1, **Antioch 53.5**, Newlove 56.0, Nerola 57.3,
  **Brentwood 61.7**, **Byron 66.9**, Byron Hot Springs 68.9, Herdlyn 71.6, **Bethany 75.7**, Janney 79.1,
  **Tracy 82.2**. Bold = "s" stops of the Tracy and Fresno local No. 36; it stopped on flag ("f") at Peyton,
  Nichols, McAvoy, Los Medanos, Nerola, Byron Hot Springs, Herdlyn. (The timetable's own legend for s/f was not
  read; `dumbarton-cn.md` has the same caveat.)
- **1955** (T13; distance from Martinez): Martinez 0.0, Mococo, Avon, Port Chicago 6.6, McAvoy, Pittsburg 14.2,
  Los Medanos, Antioch 18.8, Neroly, Brentwood 27.0, Byron 32.2, Herdlyn, Bethany, Janney, Tracy 47.5.
- **1964–70** (T17, T21): timed stations Martinez, Mococo, Avon, Port Chicago, Pittsburg, Los Medanos, Brentwood,
  Byron, Tracy; Nichols, McAvoy, Shell Point, Antioch (MP 53.5) and Janney are "additional stations" with no
  times. The through trains stopped ("s") only at Martinez, Pittsburg and Tracy (Brentwood "f" for the Owl, 1964).
- Junction: the line leaves the Oakland – Martinez line at Martinez ("TO MARTINEZ", MP 34.7, double track to
  Mococo, "Time applies at end of double track") and joins the Western Division at Tracy ("crossover MP 72 on
  Stockton Subdivision", 1970 rule 5) [img].
- Fixed points from 1887 (T7): crossings of the Black Diamond RR at Cornwall, the Pittsburg RR at Los Medanos
  and the Empire RR at Antioch. Antioch's and Brentwood's and Byron's depots (T9–T11).
- **Geometry is not sourced by any text here**; trace from the USGS sheets already in `sources.json`
  (`usgs-antioch-1908`, `usgs-brentwood-1914`, `usgs-port-chicago-1951`, `usgs-concord-1897`, etc.).

### Conflicts

1. **Opening, Sept 3 vs Sept 9, 1878.** Three railroad returns (T1–T3) [img] say opened for public use Sept 3;
   the county history (T9) [img] says the first train passed Antioch Sept 9. A line opened Sept 3 would have had
   trains at Antioch before the 9th, so these are not just two events. Use **1878-09-03** (the railroad's sworn
   return) for `opened`, and note Sept 9 as the county history's "first train". [W] leads (`leads-2c`) also
   have overland trains rerouted 1878-09-08 — not read.
2. **Builder.** The county history credits "the Central Pacific Railroad"; the Commissioners' reports say the San
   Pablo and Tulare Railroad Company owned it (T4–T6). Not a real conflict (the SP&T was an associated company);
   the operator in 1878 isn't stated in what was read.
3. **Length:** 46.518 mi (1887, "near Martinez" to Tracy), 47.5 (1955), 48.2 (1970, distance from Tracy to
   Martinez). Measuring points differ.
4. **Nos. 55/56:** CPUC says "discontinued in 1955" (T16) [img]; the timetables bracket it between 1955-01-09
   and 1955-04-24 (T13, T15) [img]; a handwritten note gives a last trip of "1-8-55" or "1-18-55" (T14). Jan 8
   is before the timetable that still lists the train, so "1-18-55" is the likelier reading; unconfirmed.
5. **Amtrak hypothesis:** the end was the day before Amtrak's start: last runs **April 30, 1971** (T22), not May 1.

### Still unsourced

- The CPUC (or ICC) order, if any, for Nos. 55/56 in 1955: none found in the CPUC decisions of 1954-08 → 1955-03
  (803 applications scanned, plus D49552 of Case 5234) — it may be earlier in 1954 or a Case 5234 order.
- The exact last runs of Nos. 55/56 and of the Owl (between the 1965-03-02 order and the 1965-04-12 supplement).
- Any order for the 1971 end (the SP Bulletin gives the reason, not an authority).
- When intermediate stations (Antioch, Brentwood, Byron) lost regular passenger stops; the 1964 and 1970 tables
  show the through trains stopping only at Martinez, Pittsburg and Tracy.
- Bay Point → Port Chicago rename date; whether any passenger train used the line after 1971 (not researched).

---

## 2. SP Los Altos branch (Mayfield cut-off; later "Vasona Branch"): Mayfield/California Ave – Los Altos – Monta Vista – Vasona Jct (– Los Gatos)

### Answer in one paragraph

Built by SP's **Peninsular Railroad** (Mayfield to Vasona, 16.25 mi; Monte Vista – Vasona finished in 1908), the
cut-off got its **first special passenger trains in April 1908** (excursions announced for Sunday April 12; an SP
officers' special with editors ran Saturday April 18) and **regular SP passenger service with Coast Division Time
Table No. 72, effective Sunday 1908-04-19**: six "Los Gatos Passenger" trains via Mayfield, Los Altos, Loyola, Monta
Vista, Congress Junction, Quito and Vasona Junction to Los Gatos [img]. From 1910 the west track of the double
track Mayfield – Congress Junction was given to the Peninsular Railway's electric cars [img]. Service shrank to one
weekday commute round trip (Nos. 129/132) by 1957–58. **Los Gatos lost it first: the train ran there "for the last
time January 23" 1959**, when an ICC order ending the Vasona Junction – Los Gatos stub became final; it then
terminated at Vasona and, by April 1959, ran on via Campbell to San José [img]. **The end on the branch itself was
authorized by the ICC, not the CPUC**: an ICC decision in Finance Docket No. "22C09" (as printed) authorized SP "to
discontinue the Vasona Branch" (CPUC D67736 takes official notice of it, 1964-08-18) [img], and the *Campbell Press*
of 1963-12-18 reports the ICC "has ruled for abandonment … effective December 26th" [img]. The last day is in
conflict: the last employee timetable with the branch train is **Supplement No. 1 to Coast Division Time Table 185
(effective 1963-09-01)**; **Time Table No. 186 (effective 1963-10-27)** shows the branch with no trains [img]; a 1973
local history says "The last train to go through Los Altos was on January 27, 1964" [ocr-snippet only]. Los Altos –
Los Gatos did end earlier than Palo Alto – Los Altos, but only for the Vasona Jct – Los Gatos stub (1959); the
Mayfield/California Ave – Vasona section kept its single train until 1963/64.

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| L1 | Under construction: Peninsular Railroad, Mayfield – Vasona, nine miles graded | report 1908-02-14 | *Railroad Gazette* 44(7) | `sim_railway-age_1908-02-14_44_7` | — | "Peninsular Railroad.—Building from Mayfield, Cal., to Vasona, about 16 miles; nine miles graded and grading work under way on the remainder of the line." | [C][ocr] |
| L2 | First passenger train announced for Sunday April 12, regular service to Los Altos "a week later" | 1908-03-19 (dateline) | *Los Angeles Times*, 1908-03-20, "Mayfield Cut-Off to Begin Service" | `sim_los-angeles-times_the-los-angeles-times_1908-03-20` | 2nd page (n1) | "SAN JOSE, March 19.—The first passenger train to use the Mayfield cut-off will be run Sunday, April 12, with a train from San Francisco. The Southern Pacific expects to begin regular service to Los Altos a week later." | [P][img] |
| L3 | Same plan in a land-company advertisement | April 1908 issue | *Sunset* 20(6), advertising section (Los Altos Land Co., Walter A. Clark) | `sim_sunset-central-west-edition_1908-04_20_6` | n31 | "First Trains Over the New Los Altos Cutoff to Los Gatos and Santa Cruz will be our Special Excursions from San Francisco and San Jose to Los Altos, Sunday, April 12th" | [P][img] (whether the April 12 excursion ran is not confirmed) |
| L4 | SP officers' special over the cut-off with editors; five trains a day planned; double track to Congress Junction; stations | Sat. **1908-04-18** | *Campbell Interurban Press*, 1908-04-29, "S. P. Officers' Excursion" (quoting the *Palo Alto Tribune*) | `cacblm_000152` | p. [4] (n3) | "On Saturday, April 18th, the editor of this paper had an invitation from the Southern Pacific Railway Co. to join the officers' excursion over the new cut-off from Mayfield to Vasona." "Five trains will run daily each way between Los Gatos and San Francisco." | [P][img] |
| L5 | (same article) | 1908 | same | same | p. [4] (n3) | "It is double-track as far as Congress Junction." "The other stations are Loyola, where the new Santa Clara College will be located, Monte Vista, Congress Junction and Quito." | [P][img] |
| L6 | Not yet in the timetable of February 1908 (no Los Altos, Loyola, Monta Vista, Congress Jct or Quito anywhere in the OCR) | eff. 1908-02-09 | SP Coast Division Time Table No. 71 | `cscrm_2021_02_000601` | — | — | [P][ocr] (absence; checked by OCR count, two pages by eye) |
| L7 | **Regular service begins**: first-class "Los Gatos Passenger" Nos. 54, 538, 536 (Sunday only), 534, 532, 530 from San Francisco via Mayfield and the cut-off to Los Gatos | eff. **1908-04-19** (Sunday) | SP Coast Division Time Table No. 72 | `cscrm_2021_02_000600` | p. 10 (n9) | "Time Table No. 72 April 19, 1908 … 530 Los Gatos Passenger Leave Daily … MAYFIELD 9.35AM … s 9.43 LOS ALTOS … s 9.53 MONTA VISTA … VASONA JUNCT. … 10.15AM LOS GATOS" | [P][img] |
| L8 | Construction finished in 1908 | 1908 | *Railroad Age Gazette* 45(29), new mileage | `sim_railway-age_1908-12-18_45_29` | — | "The Penisular Railroad, building from Mayfield, Cal., to Vasona, 16.25 miles, was finished from Monte Vista, Cal., to Vasona, 7.26 miles." | [C][ocr] |
| L9 | **Shared with the Peninsular Railway's electric cars**: steam trains to use the east track Mayfield – Congress Junction, the west track turned over to the Peninsular, being equipped to Monte Vista | 1910-01 | *Electric Railway Journal* 35(5), "Southern Pacific Railroad Electrification" | `transit-journal-1932_1910-01-29_35_5` | p. 204 (n33) | "steam trains will hereafter use only the east track of the double-track line between Mayfield and Congress Junction, the west track being turned over to the Peninsula Railways, which is now equipping the line for operation by electricity to Monte Vista" | [C][img] |
| L10 | Peninsular electric service selling tickets at Palo Alto and Los Altos | by 1910-05-13 | *Campbell Interurban Press*, 1910-05-13 (Peninsular advertisement) | `cacblm_000229` | — | "Electric Interurban Railway Service. Excursion tickets sold at our offices, Palo Alto, Los Altos, Los Gatos, Saratoga, San Jose … Last cars will leave San Jose for Los Gatos, Palo Alto and way stations" | [P][ocr] |
| L11 | 1955: SP fares "via its main line and its so-called Los Altos Branch" | 1955-04-26 (file date) | CPUC D51391 (A.35739) | …/Decisions_D40600_to_D57800/D51391_19550426_A35739.pdf | p. 2 | "Los Gatos and intermediate points via its main line and its so-called Los Altos Branch." | [O][img] |
| L12 | 1957: one round trip a day to Los Gatos, 15–19 commuters there | 1957-10-22 | CPUC D55707 (A.38951; C.5234) | …/Decisions_D40600_to_D57800/D55707_19571022_A38951.pdf | p. 4 (date p. 26) | "the present 15 to 19 commuters using the Los Gatos station would be greatly inconvenienced if the one round trip a day were operated to Vasona Junction only" | [O][img] |
| L13 | **1958**: No. 132 (weekdays) California Ave 6.01 PM, s Los Altos, Springer Road, Loyola, Simla, Monta Vista, Azule, Congress Jct, Pollard Road, s Vasona Jct 6.41, then the Los Gatos Branch to s Los Gatos 6.50 PM; No. 129 Los Gatos 6.38 AM → California Ave 7.24 AM | eff. 1958-09-28 | SP Coast Division Timetable No. 176 | `cscrm_2021_02_001977` | p. 11 (n12) | "Los Altos Branch … 132 Passenger (c) Leave Daily Ex. Sat., Sun. and Holidays … CALIFORNIA AVE. … VASONA JCT." ; "Los Gatos Branch … Via Los Altos … s 6.50 PM … LOS GATOS" | [P][img] |
| L14 | **Los Gatos end**: last commute train to Los Gatos; ICC order on the Vasona Jct – Los Gatos stub; train cut back to Vasona | **1959-01-23**; special 1959-01-25 | *The Western Railroader* 22(4), Feb 1959, "Southern Pacific Passenger Notes" | `sim_western-railroader-the-western-railfan_1959-02_22_4` | p. 15 (n14) | "Los Gatos saw the daily (except Sat. & Sun.) commute train for the last time January 23 as the ICC order became final approving end of the three-mile stub from Vasona Junction to down-town Los Gatos." | [P][img] |
| L15 | (same note) | 1959 | same | same | p. 15 (n14) | "The commute train will continue over the Los Altos branch terminating at Vasona." | [P][img] |
| L16 | Then on to San José: "Vasona Branch", No. 132 California Ave 5.01 PM … s Vasona 5.41, Campbell, s San Jose 6.00 PM; No. 129 San Jose 5.20 AM … s California Ave 6.24 AM; no Los Gatos | eff. 1959-04-26 | SP Coast Division Timetable No. 177 | `cscrm_2021_02_002006` | p. 11 (n16) | "Vasona Branch … 132 Passenger (c) … CALIFORNIA AVE. … LOS ALTOS … VASONA … CAMPBELL … SAN JOSE" | [P][img]; handwritten "Champagne Fountain (renamed 8-1-59)" by Congress Jct. (owner unknown) |
| L17 | One commute train each way; county and Los Altos want the Simla – California Avenue track for a highway; nothing filed yet | Nov–Dec 1959 | *The Western Railroader* 22(12) | `sim_western-railroader-the-western-railfan_november-december-1959_22_12` | p. 2 | "The Southern Pacific branch through Los Altos served by a commute train in each direction daily, has been threatened by a plea by the County of Santa Clara and City of Los Altos to discontinue the trackage between Simla and California Avenue" | [P][ocr] |
| L18 | SP's 1963 commute application (filed 1963-05-27, amended 08-30) proposed dropping No. 132 and running No. 134 "via Vasona Branch line" | 1963 | CPUC D67736 (A.45471) | …/Decisions_D57801_to_D73750/D67736_19640818_A45471.pdf | pp. 1, 13 | "Add stop at Menlo Park and Palo Alto to train No. 134 and operate via Vasona Branch line." | [O][ocr] |
| L19 | **Last timetable with the branch train**: No. 132 (weekdays) California Ave 5.01 PM, s Los Altos 5.13, s Springer Road, s Loyola 5.19, s Simla, s Monta Vista 5.26, s Blue Hills, s Champagne Fountain 5.37, s Vasona 5.44, s San Jose 6.10 PM; No. 129 San Jose 5.20 AM → s California Ave 6.24 AM | eff. **1963-09-01** | Supplement No. 1 to SP Coast Division Timetable 185 | `cscrm_2021_02_002149` | cover (n0); p. 11 (n6) | "Vasona Branch … 132 Passenger Leave Daily Ex. Sat., Sun. and Holidays … 129 Passenger Arrive Daily Ex. Sat., Sun. and Holidays" | [P][img] |
| L20 | **Branch listed with no trains**; 129 and 132 now run via the main line (Mountain View, Sunnyvale) | eff. **1963-10-27** | SP Coast Division Timetable No. 186 | `cscrm_2021_02_002147` | p. 11 (n10); pp. 4–5 (n3–n4) | Vasona Branch table: "CALIFORNIA AVE. … LOS ALTOS … SIMLA … VASONA … CAMPBELL … SAN JOSE" with no train columns; No. 132 "s 5.58 [California Ave] … s 6.04 [Mountain View]" | [P][img] |
| L21 | **ICC abandonment** reported, effective Dec 26; it had been delayed by commuters' appeals; Foothill Expressway to use the right-of-way | notice 1963-12-11; eff. **1963-12-26** | *Campbell Press*, 1963-12-18, "Vasona railway branch to be abandoned Dec. 26" | `Campbell_Press_1963-12-18` | p. 9 (n8) | "the Interstate Commerce Commission has ruled for abandonment of the Southern Pacific's Vasona Branch Railway line effective December 26th." "The abandonment had been delayed by appeals primarily from the line's small number of commuters." | [P][img] |
| L22 | **The authority**: ICC decision in Finance Docket "22C09" (as printed; 3rd digit unclear) | noticed 1964-08-18 | CPUC D67736 (A.45471), finding 8 | as L18 | p. 23 (date p. 24) | "The Commission takes official notice of the issuance of the decision by the Interstate Commerce Commission in Finance Docket No. 22C09 authorizing Southern Pacific to discontinue the Vasona Branch." | [O][img] |
| L23 | Last train through Los Altos | **1964-01-27** | *Los Altos Reminiscences* (California History Center, 1973) | `losaltosreminisc0000cali` (lending-only) | not known | "…station house was abandoned. The last train to go through Los Altos was on January 27, 1964. In June…" | [C][ocr-snippet] — not read on a page |
| L24 | After: Vasona Branch still listed, no trains | eff. 1964-04-26 | SP Western-Coast Division Timetable No. 1 | `cscrm_2021_02_002165` | p. 10 (n21) | (stations only) | [P][img] |

### Route and stations (sourced)

- **1908** (L7; miles from San Francisco): Mayfield 35.4 (junction with the main line), Los Altos 39.6, Loyola
  41.9, Monta Vista 44.7, Congress Junction 48.9, Quito 51.5, Vasona Junct. 51.8/52.7, (Bermingham spur 53.0),
  Los Gatos 55.2; Los Gatos – Santa Cruz beyond. Double track Mayfield – Congress Junction (L5).
- **1958** (L13; mileposts): California Ave. 31.8, Los Altos 35.7, Springer Road 37.5, Loyola 38.2, Simla 39.7,
  Monta Vista 41.0, Azule 43.8, Congress Jct. 45.2, Pollard Road 46.9, Vasona Jct. 48.1/51.8 (16.3 mi from
  California Ave); Los Gatos Branch: Vasona Jct. – Los Gatos 54.3. Additional stations Neal 33.0, Alta Mesa 34.0,
  Permanente (on a spur 2.42 mi from Simla).
- **1959–63** (L16, L19): California Ave., Los Altos, Springer Road, Loyola, Simla, Monta Vista, Blue Hills,
  Champagne Fountain (formerly Congress Jct.), Vasona, Campbell, San Jose (22.4 mi California Ave – San Jose). From
  1959 the branch train used the Vasona – Campbell – San José line, not Los Gatos.
- The junction station is "Mayfield" in 1908 and "California Ave." in 1958–64. No source read here says they are
  the same place; check by geometry.
- **Shared track:** Peninsular Railway cars on the west track of the double track, Mayfield – Congress Junction /
  Monta Vista (L9), with junctions at Monta Vista and Congress Junction to its San José lines (L5).
- Geometry: trace from `usgs-palo-alto-1953`, `usgs-los-gatos-1919`, `usgs-san-jose-west-1953` (in
  `sources.json`).

### Conflicts

1. **First train.** Excursions announced for **1908-04-12** (L2, L3) and an officers' special on **1908-04-18**
   (L4); regular service per the timetable from **1908-04-19** (L7) — consistent with the *Times*' "a week
   later". Whether the April 12 excursion ran is not confirmed. Use 1908-04-19 for `opened` (regular service);
   OHM's 1907-11-05 [W] may be a construction or freight date; not sourced.
2. **Last train on the branch: 1963-10-25/27 vs 1963-12-26 vs 1964-01-27.** SP's employee timetable carries the
   branch round trip in the 1963-09-01 supplement (L19) and not in the 1963-10-27 timetable (L20) [img], which
   suggests the last scheduled run was Friday 1963-10-25 (inference; not stated). The *Campbell Press* (L21)
   puts the ICC's abandonment in effect on 1963-12-26 and says it "had been delayed by appeals" — so the train
   may have kept running under a bulletin not in the CSRM set. The 1973 local history (L23) gives 1964-01-27
   [ocr-snippet]. None of the three is a statement of the last run read on a page. **Recommendation:** keep
   `closed` null with `closed_unsourced`, list `running` through 1963-09-01 (decision 20), and cite the ICC
   authority as reported (L21, L22); or, if Matthew prefers decision 17's rule, "1963-12" (month the
   abandonment took effect, per the newspaper). Upgrade to 1964-01-27 only if the book page is read.
3. **CPUC vs ICC.** The caller expected a CPUC decision of about 1959–64. None exists in the windows scanned:
   the end was by ICC abandonment (1959 for Vasona – Los Gatos, L14; 1963 for the branch, L21–L22). CPUC D67736
   only took notice of the ICC decision; D56641 (1958) closed the Los Altos agency only (station stayed a
   non-agency stop) [O][ocr].
4. **Peninsular double-track use:** the 1908 article says the Peninsular "connects with it at Monte Vista,
   Congress Junction and Los Gatos" (L5); ERJ says the west track to "Monte Vista" (L9). Draw the shared stretch
   only where a source puts electric cars on it (Mayfield – Monte Vista at least).

### Still unsourced

- The ICC decision itself (Finance Docket 22?09, 1963): date, and whether it was an abandonment of track,
  operation, or both. The 1959 ICC order for Vasona Jct – Los Gatos (number, date).
- The day of the last regular train over the branch (see conflict 2); a page image of *Los Altos Reminiscences*.
- When the Peninsular's cars began and ended on the shared track (only "by May 1910", L10 [ocr]).
- The 1908 "opened for public use" date from a Commissioners' return (the 1909 report on archive.org,
  `annualreportboa03caligoog`, has a one-page scan only).
- Station-by-station dates for later stops (Springer Road, Simla, Azule, Pollard Road, Blue Hills).

## For Matthew (manual work)

- **Borrow *Los Altos Reminiscences*** (archive.org `losaltosreminisc0000cali`, lending) and read the page with
  "The last train to go through Los Altos was on January 27, 1964" — it is the only source for that date.
- **Newspapers for Oct 1963 – Jan 1964** (Los Altos Town Crier, Palo Alto Times, San Jose Mercury; not on
  archive.org or reachable here) would settle when the branch train last ran, and whether it ran after the
  1963-10-27 timetable.
- **The ICC Finance Docket** (printed "22C09") for the Vasona Branch, and the 1958–59 docket for Vasona Jct –
  Los Gatos: ICC Finance reports or the National Archives (RG 134).
- **License question:** the CSRM employee timetables and the *Southern Pacific Bulletin* are "copyright status
  unknown" (decision 19: facts only). The *Campbell Press* (1963) item carries no rights statement; treat it the
  same way. The *Campbell Interurban Press* (1908, 1910) items are marked "Public Domain".

## By-products (other files, not edited)

- `railroads.md` §6: the 1893–94 report's SP RR Co. return gives "Branch from Avon to San Ramon … June 7, 1891"
  on the image (`annualreportboa00caligoog`, SP p. 24, n127) [img] — the day that section left as unreliable.
- `railroads.md` §2: the Contra Costa history's p. 491 quote is now [img] (n582).

---

## Proposed sources.json entries

Reused ids (extend their `notes`; do not duplicate): `ca-brc-reports-9-12`, `ca-brc-report-10`,
`ca-brc-report-1894`, `cscrm-2021-02-000614`.

Suggested note additions:
- `ca-brc-reports-9-12`: "The San Pablo and Tulare Railroad's return for 1887, p. [204] (scan n207): 'From Tracy to
  Martinez … Sept. 3, 1878', 'from near Martinez to Tracy … 46.5180 miles'; p. [202] (n205): incorporated July 19,
  1871; p. 21 (n24): 'San Pablo and Tulare Railroad Company … Tracy to Martinez'; p. 35 (n38): fare 'Martinez to
  Tracy … 3 cents'. Read on the page images, October 16, 2026."
- `ca-brc-report-10`: "p. 73 (n193), SP RR Co. return: 'From Martinez to Tracy … Sept. 3, 1878.' Read on the page
  image, October 16, 2026."
- `ca-brc-report-1894`: "SP RR Co. return p. 24 (n127): 'From Martinez to Tracy … September 3, 1878' and 'Branch
  from Avon to San Ramon … June 7, 1891'; p. 17 (n120): the San Pablo and Tulare RR (incorporated July 19, 1871)
  among the companies consolidated May 14, 1888, operated by the Southern Pacific Company. Read on the page images,
  October 16, 2026."
- `cscrm-2021-02-000614`: "p. 10 (n34): eastward first-class passenger trains over Martinez – Tracy (6, 26 The Owl,
  50, 52, 8, 84, 36 Tracy and Fresno Passenger, 86), with stations Port Costa … Martinez … Bay Point … Pittsburg …
  Antioch … Brentwood … Byron … Tracy (82.2 mi). Read on the page image, October 16, 2026."

New entries:

```json
[
  {
    "id": "contra-costa-history-1882",
    "title": "History of Contra Costa County, California",
    "author": "J. P. Munro-Fraser",
    "publisher": "W. A. Slocum, San Francisco",
    "date": "1882",
    "type": "book",
    "url": "https://archive.org/details/historyofcontrco00munrrich",
    "license": "Public domain (published 1882)",
    "accessed": "2026-10-16",
    "notes": "p. 491 (scan n582): \"completing their line from Oakland to Tracy, the first train passed through Antioch September 9, 1878.\" p. 497 (n590): Brentwood laid out on \"the advent of the railroad\", with \"a handsome railroad depot\"; Byron \"another hamlet on the line of the railroad\" with \"a fine depot\"; \"stage connection with Byron Station\" for Byron Hot Springs. Read on the page images, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-001859",
    "title": "Southern Pacific, Western Division, employee timetable No. 259, 1955-01-09",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1955-01-09",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_001859",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 6 (n9), Martinez Subdivision eastward, Martinez – Tracy: first-class 58 Owl, 56 Passenger (leave daily except Sunday; stops at Avon, Port Chicago, Pittsburg, Antioch, Brentwood, Byron, Tracy) and 52 San Joaquin Daylight; distance Martinez – Tracy 47.5 mi. A handwritten note on No. 56 (owner unknown) reads \"Discontinued – last trip 1-[1?]8-55\". Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-001858",
    "title": "Southern Pacific, Western Division, employee timetable No. 260, 1955-04-24",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1955-04-24",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_001858",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 6 (n7): Martinez – Tracy eastward first class only 58 Owl and 52 San Joaquin Daylight (the local No. 56 gone). Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002164",
    "title": "Southern Pacific, Western Division, employee timetable No. 2, 1964-10-25",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1964-10-25",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002164",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. [12] (n11), Martinez Subdivision, Tracy line: 58/57 Owl and 52/51 San Joaquin Daylight, stopping at Martinez, Pittsburg and Tracy (Owl flag stop at Brentwood). Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002200",
    "title": "Southern Pacific, Supplement No. 1 to Western Division employee timetable No. 2, effective 1965-04-12",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1965-04-12",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002200",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "Cover (n0): \"Superseding pages 12 and 13, effective Monday, April 12, 1965 at 12:01 A.M.\"; p. 12 (n1): the Tracy line has only 52/51 San Joaquin Daylight (the Owl gone). Read on the page images, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002281",
    "title": "Southern Pacific, Western Division, employee timetable No. 13, 1970-03-29",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1970-03-29",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002281",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 12 (n11), Martinez Subdivision, Tracy line: 52 San Joaquin Daylight, leave daily, Martinez 9.22 AM, s Pittsburg 9.38, s Tracy 10.14 AM; 51 Tracy 4.40 PM, s Pittsburg 5.13, s Martinez 5.28 PM; stations Martinez, Mococo, Avon, Port Chicago, Pittsburg, Los Medanos, Brentwood, Byron, Tracy; additional stations Nichols, McAvoy, Shell Point, Antioch, Janney. Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002282",
    "title": "Southern Pacific, Western Division, employee timetable No. 14, 1971-05-23",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1971-05-23",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002282",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 12 (n11): the Tracy line table lists stations only, no trains; Nos. 12 and 102 on the Sacramento line are \"N.R.P.C. Passenger\". Read on the page image, October 16, 2026."
  },
  {
    "id": "sp-bulletin-1971-05",
    "title": "Southern Pacific Bulletin 55(4), May 1971: \"AMTRAK Service Begins\"",
    "publisher": "Southern Pacific Company",
    "date": "1971-05",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_002463",
    "license": "Copyright status unknown (California State Railroad Museum scan); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 10 (n5): \"Four of our inter-city trains were not selected by NRPC for operation and were therefore discontinued on April 30: the San Joaquin Daylight, the Sacramento Daylight, the Northwestern Pacific's self-propelled car which ran thrice-weekly between Eureka and Willits, and the San Jose-Monterey portion of the Del Monte.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "cpuc-d68686",
    "title": "Public Utilities Commission of California, Decision No. 68686 (Application No. 46660): Santa Fe Golden Gate trains and Southern Pacific Owl trains 57 and 58",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1965-03-02",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D57801_to_D73750/D68686_19650302_A46660.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 2: Southern Pacific \"presently operates two daily trains in each direction between San Francisco and Los Angeles via the San Joaquin Valley\"; p. 20: \"Southern Pacific Company is hereby authorized to discontinue Owl Trains Nos. 57 and 58 between San Francisco and Los Angeles\", subject to a condition precedent on a schedule for San Joaquin Daylight trains 51 and 52; p. 21: dated at Los Angeles March 2, 1965, effective twenty days after. Read on the scanned pages, October 16, 2026."
  },
  {
    "id": "cpuc-d74832",
    "title": "Public Utilities Commission of California, Decision No. 74832 (Application No. 50211): San Joaquin Daylight trains 51 and 52 and Sacramento Daylight trains 53 and 54",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1968-10-15",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D73751_to_D86500/D74832_19681015_A50211.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 2: the San Joaquin Daylights \"operate between Los Angeles and Oakland via Lancaster, Mojave, Bakersfield, Fresno, Merced, Lathrop, Tracy and Martinez\"; p. 5, footnote 4: Trains 55 and 56, 57 and 58 (the Owl) and 59 and 60 (the West Coast) \"discontinued in 1955, 1965 and 1960, respectively\"; p. 44: \"Application No. 50211 is denied\", dated October 15, 1968, effective twenty-five days after. Read on the scanned pages, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-000600",
    "title": "Southern Pacific, Coast Division, employee timetable No. 72, 1908-04-19",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1908-04-19",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_000600",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 10 (n9): the first timetable with the Mayfield cut-off; first-class \"Los Gatos Passenger\" trains 54, 538, 536 (Sunday only), 534, 532 and 530 from San Francisco by Mayfield 35.4, Los Altos 39.6, Loyola 41.9, Monta Vista 44.7, Congress Junction 48.9, Quito 51.5 and Vasona Junct. to Los Gatos 55.2 mi. The previous one, No. 71 of 1908-02-09 (cscrm_2021_02_000601), has none of these stations. Read on the page image, October 16, 2026."
  },
  {
    "id": "lat-1908-03-20",
    "title": "Los Angeles Times, March 20, 1908: \"Mayfield Cut-Off to Begin Service\"",
    "publisher": "Los Angeles Times",
    "date": "1908-03-20",
    "type": "primary_document",
    "url": "https://archive.org/details/sim_los-angeles-times_the-los-angeles-times_1908-03-20",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "2nd page (n1): \"SAN JOSE, March 19.—The first passenger train to use the Mayfield cut-off will be run Sunday, April 12, with a train from San Francisco. The Southern Pacific expects to begin regular service to Los Altos a week later.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "campbell-interurban-press-1908-04-29",
    "title": "Campbell Interurban Press, April 29, 1908: \"S. P. Officers' Excursion\"",
    "publisher": "Campbell Interurban Press (Campbell Historical Museum scan)",
    "date": "1908-04-29",
    "type": "primary_document",
    "url": "https://archive.org/details/cacblm_000152",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. [4] (n3), quoting the Palo Alto Tribune: the officers' special \"over the new cut-off from Mayfield to Vasona\" on Saturday, April 18, 1908; \"It is double-track as far as Congress Junction\"; \"Five trains will run daily each way between Los Gatos and San Francisco\"; other stations Loyola, Monte Vista, Congress Junction and Quito. Read on the page image, October 16, 2026."
  },
  {
    "id": "erj-1910-01-29-sp-electrification",
    "title": "Southern Pacific Railroad Electrification",
    "publisher": "Electric Railway Journal 35(5)",
    "date": "1910-01-29",
    "type": "journal",
    "url": "https://archive.org/details/transit-journal-1932_1910-01-29_35_5",
    "license": "Public domain (published 1910)",
    "accessed": "2026-10-16",
    "notes": "p. 204 (n33): \"steam trains will hereafter use only the east track of the double-track line between Mayfield and Congress Junction, the west track being turned over to the Peninsula Railways, which is now equipping the line for operation by electricity to Monte Vista\". Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-001977",
    "title": "Southern Pacific, Coast Division, employee timetable No. 176, 1958-09-28",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1958-09-28",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_001977",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 11 (n12): Los Altos Branch, No. 132 (weekdays) California Ave. 6.01 PM by Los Altos, Springer Road, Loyola, Simla, Monta Vista, Azule, Congress Jct. and Pollard Road to Vasona Jct. 6.41 and, on the Los Gatos Branch, Los Gatos 6.50 PM; No. 129 Los Gatos 6.38 AM to California Ave. 7.24 AM. Read on the page image, October 16, 2026."
  },
  {
    "id": "western-railroader-1959-02",
    "title": "The Western Railroader 22(4), February 1959: \"Southern Pacific Passenger Notes\"",
    "publisher": "The Western Railroader",
    "date": "1959-02",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1959-02_22_4",
    "license": "Copyright status unknown (railfan periodical, 1959); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 15 (n14): \"Los Gatos saw the daily (except Sat. & Sun.) commute train for the last time January 23 as the ICC order became final approving end of the three-mile stub from Vasona Junction to down-town Los Gatos.\" \"The commute train will continue over the Los Altos branch terminating at Vasona.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002006",
    "title": "Southern Pacific, Coast Division, employee timetable No. 177, 1959-04-26",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1959-04-26",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002006",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 11 (n16): \"Vasona Branch\", No. 132 California Ave. 5.01 PM by Los Altos, Loyola, Monta Vista, Congress Jct. and Vasona 5.41 to Campbell and San Jose 6.00 PM; No. 129 San Jose 5.20 AM to California Ave. 6.24 AM; Los Gatos no longer served. Read on the page image, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002149",
    "title": "Southern Pacific, Supplement No. 1 to Coast Division employee timetable 185, effective 1963-09-01",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1963-09-01",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002149",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "Cover (n0): effective Sunday, September 1, 1963; p. 11 (n6): Vasona Branch, No. 132 Passenger (weekdays) California Ave. 5.01 PM, stopping at Los Altos, Springer Road, Loyola, Simla, Monta Vista, Blue Hills, Champagne Fountain and Vasona, to San Jose 6.10 PM; No. 129 San Jose 5.20 AM to California Ave. 6.24 AM. The last timetable in the collection with a train on the branch. Read on the page images, October 16, 2026."
  },
  {
    "id": "cscrm-2021-02-002147",
    "title": "Southern Pacific, Coast Division, employee timetable No. 186, 1963-10-27",
    "publisher": "Southern Pacific Company (California State Railroad Museum scan)",
    "date": "1963-10-27",
    "type": "primary_document",
    "url": "https://archive.org/details/cscrm_2021_02_002147",
    "license": "Copyright status unknown; cited for facts only (decision 19)",
    "accessed": "2026-10-16",
    "notes": "p. 11 (n10): Vasona Branch, California Ave. (MP 31.8) – Los Altos – Springer Road – Loyola – Simla – Monta Vista – Blue Hills – Champagne Fountain – Vasona – Campbell – San Jose, with no trains; pp. 4-5 (n3-n4): Nos. 129 and 132 run by the main line. Read on the page images, October 16, 2026."
  },
  {
    "id": "campbell-press-1963-12-18",
    "title": "The Campbell Press, December 18, 1963: \"Vasona railway branch to be abandoned Dec. 26\"",
    "publisher": "The Campbell Press (Campbell Historical Museum scan)",
    "date": "1963-12-18",
    "type": "primary_document",
    "url": "https://archive.org/details/Campbell_Press_1963-12-18",
    "license": "Copyright status unknown; cited for facts only",
    "accessed": "2026-10-16",
    "notes": "p. 9 (n8): the Board of Supervisors \"received notice December 11th from Congressman Charles F. Gubser that the Interstate Commerce Commission has ruled for abandonment of the Southern Pacific's Vasona Branch Railway line effective December 26th\"; \"The abandonment had been delayed by appeals primarily from the line's small number of commuters.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "cpuc-d67736",
    "title": "Public Utilities Commission of California, Decision No. 67736 (Application No. 45471): Southern Pacific Peninsula commute service between San Francisco, San Jose and Vasona",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1964-08-18",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D57801_to_D73750/D67736_19640818_A45471.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 23, finding 8: \"The Commission takes official notice of the issuance of the decision by the Interstate Commerce Commission in Finance Docket No. 22C09 [as printed] authorizing Southern Pacific to discontinue the Vasona Branch.\" Application filed May 27, 1963; p. 13 (text layer): SP proposed to run train No. 134 \"via Vasona Branch line\". p. 24: dated August 18, 1964. Read on the scanned pages, October 16, 2026."
  },
  {
    "id": "cpuc-d55707",
    "title": "Public Utilities Commission of California, Decision No. 55707 (Application No. 38951; Case No. 5234): Peninsula fares and service, San Francisco – San Jose – Los Gatos",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1957-10-22",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D55707_19571022_A38951.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 4, staff recommendation 3: \"the present 15 to 19 commuters using the Los Gatos station would be greatly inconvenienced if the one round trip a day were operated to Vasona Junction only\". Dated October 22, 1957 (p. 26). Read on the scanned pages, October 16, 2026."
  }
]
```

Optional, if the Los Altos end is drawn from them: `cpuc-d51391` (1955-04-26, p. 2, "its so-called Los Altos
Branch", [img]); `western-railroader-1959-11` (Nov–Dec 1959, p. 2, one commute train each way [ocr]);
`cscrm-2021-02-002165` (1964-04-26, branch listed without trains [img]); `sunset-1908-04` (Los Altos Land Co.
advertisement, n31 [img]); `railroad-age-gazette-1908-12-18` (Peninsular RR finished Monte Vista – Vasona,
[ocr]); and, only after the page is read, `los-altos-reminiscences-1973` (California History Center, 1973,
`losaltosreminisc0000cali`, lending-only).

Pointers only [W] (not cited): OpenHistoricalMap relation 2749538 (Los Altos branch, 1907-11-05 / 1908-04-19 /
1964-01-27); santacruztrains.com "stations: Vasona Junction" (2017; January 1964 closure, a comment giving
1964-01-27); Wikipedia "Mayfield Cutoff", "San Joaquin Daylight"; *Rail Travel News* 1971 (railfan newsletter,
"last train run April 30, 1971").
