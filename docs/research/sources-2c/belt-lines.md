# Research: the Alameda Belt Line and the Oakland Terminal Railroad / Railway (freight-only railroads)

Gathered 2026-10-16 for decision 15 (freight-only railroads drawn in the `railroad` mode for the years
they carried freight). Extends `leads-2c/ferries-northbay.md` §7, which had only search-tool extracts.
Every fact below was read in the source itself; nothing here comes from Wikipedia, a forum or a search
summary except where a row is tagged [W] (pointer only).

## How this pass worked, and how far to trust it

- **archive.org.** `archive.org/download/…` redirects to `dn*.ca.archive.org` hosts, which the proxy
  refused (403). Files were fetched instead from the item's own `d1`/`d2` servers
  (`https://ia*.us.archive.org/<dir>/<file>`, taken from `/metadata/<id>`), and page images through
  `BookReader/BookReaderImages.php?zip=<dir>/<id>_jp2.zip&file=<id>_jp2/<id>_<nnnn>.jp2&id=<id>&scale=2`.
  Oakland Tribune items have no JP2 zip, so their PDFs were downloaded and pages rendered with `pdftoppm`;
  the article was located on the page with the item's hOCR word boxes and cropped. Leaf numbers are given as
  `n<i>` (BookReader index from 0). A leaf link is `https://archive.org/details/<id>/page/n<i>/`.
- **Finding pages:** archive.org full-text search (`/services/search/beta/page_production/?service_backend=fts…`,
  optionally with `page_type=collection_details&page_target=<collection>`), then each item's
  `_hocr_searchtext.txt.gz` + `_hocr_pageindex.json.gz` to get the leaf of a match.
- **Railroad Commission bound volumes** (`california-railroad-commission-decisions_14` … `_31`, i.e. 1917–mid
  1928) were searched by OCR for "Alameda Belt", "belt line", "Clement", "city of Alameda". Volumes after 31
  are not on archive.org.
- **files.cpuc.ca.gov.** The folder listings give only decision number, date and application number. Where a
  decision number was known (from a bound volume's tables, or cited in another decision) the PDF was opened
  directly. Otherwise every decision PDF in a date window was downloaded and its text layer grepped for
  "Oakland Terminal", "Alameda Belt", "Union Street", "Key System": Nov 1934 – Mar 1935 (366 PDFs),
  Nov 1942 – Jul 1943 (622), 1930–31 (2,395), 1938–39 (2,247), 1956 (2,117), 1957 (1,694). The text layers
  are poor OCR, so a decision whose first pages don't name the company would have been missed. Hits were
  rendered with `pdftoppm -r 80/90` and read on the image.
- **Federal Register** is not reachable at federalregister.gov or govinfo.gov, but the printed issues are on
  archive.org (`sim_federal-register-find_<date>_…`); the 2012 STB notice was read there on the page image.
- **Not reachable / not used:** courtlistener (the 2003 *Alameda Belt Line v. City of Alameda* opinion was not
  re-read), govinfo (the Railroad Retirement Board determinations were not re-read), stb.gov, CDNC, the
  Oakland Tribune after 1924 (archive.org's run ends in 1924). WebSearch was not used in this pass.
- **Tags:** [P] primary (newspaper or trade journal of the day, company notice); [O] official (Railroad
  Commission / CPUC, ICC, STB, state or federal agency); [C] contemporary compiled; [R] railfan periodical
  (copyright unknown, facts only, decision 19); [W] pointer only; [img] read on the page image; [ocr] text
  layer only.
- Downloads (about 1.9 GB of decision PDFs, page images, OCR text) are in the session scratchpad and were not
  kept in the repo; each entry's id and page reopen it.

---

## 1. Alameda Belt Line (Alameda)

### Answer in one paragraph

The **City of Alameda built a municipal belt line on Clement Avenue in 1918**: bids for "the Alameda belt
line on Clement avenue, from Pearl street west to Grand street" were opened on 1918-04-09, and the **first
freight moved over it on Monday 1918-05-27**, hauled to the new Barnes-Tibbitts shipyard at the north end of
Chestnut St "by a Southern Pacific locomotive". In 1924 the **Southern Pacific was operating switching
engines over it by agreement with the city**. The **Alameda Belt Line** company, caused to be incorporated by
the Western Pacific and the Santa Fe, was authorized by the Railroad Commission on **1925-07-14** (Decision
15177) to buy the city's line for $30,000 and extend it, and by the ICC on **1926-01-16** (Finance Docket
4682). The city's line then ran "along the center line of Clement avenue" from 188 ft east of Broadway to the
west line of Grand St (6,364.5 ft). The Commission authorized the **extension in 1926** (D16794, 1926-05-28):
from the Clement Ave track near Minturn St across Grand St and Eagle Ave to Hibbard St, west along the north
side of Buena Vista Ave, then north on Sherman St to the "Segregation Line"; and in **1927** (D18770) a main
track across **Webster St** and the SP tracks between Webster and Eighth Sts. The ICC gave until 1928-05-31
to finish; by 1928-04-30 the company had spent $695,049 on road and equipment. **When the ABL itself began
operating, when each extension opened, and the last train (1998 in pointers) are not sourced.** Formal end:
the STB notice of exemption **AB 1090X** (City of Alameda d/b/a Alameda Belt Line Railroad), 2.61 miles from
Clement Ave & Broadway to near Constitution Way, "no local traffic … for at least 2 years", effective
**2012-06-16**.

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| A1 | City council opens bids for the municipal belt line on Clement Ave, Pearl St west to Grand St; about 6,234 ft of track; a separate bid for the Park St crossing | bids opened 1918-04-09 ("last night" in the 04-10 issue) | *Oakland Tribune*, 1918-04-10, "Bids are received for belt line" | `oakland-tribune-1918-04-10` | PDF p. 7 (n6) | "Bids for the construction of the Alameda belt line on Clement avenue, from Pearl street west to Grand street, were opened by the city council last night" | [P][img] |
| A2 | Same: the line's length | 1918-04-10 | same | same | n6 | "It is estimated that 123 tons of rails will be required to lay about 6234 feet of track." | [P][img] |
| A3 | **First freight over the new municipal belt line**, to the Barnes-Tibbitts shipyard at the north end of Chestnut St, hauled by an SP locomotive | **1918-05-27** (Monday; "this morning") | *Oakland Tribune*, 1918-05-27 (page dated by "Monday, May 27" in an advertisement on the same page) | `oakland-tribune-1918-05-27` | PDF p. 9 (n8) | "The new plant has the distinction of receiving the first freight transported over the new municipal belt line, several cars of shipping board material being hauled over the new tracks to the yard by a Southern Pacific locomotive this morning." | [P][img] |
| A4 | Extension westward from Grand St "being considered"; aim to reach tidewater on the bay | 1918-06-06 | *Oakland Tribune*, 1918-06-06 | `oakland-tribune-1918-06-06` | n16 | "Plans for the extension of the new municipal belt line westward from Grand street through the 130-acre tract just purchased by the Bethlehem Shipbuilding Corporation are being considered" | [P][ocr] |
| A5 | Still a city line, earning a small profit | Jul–Dec 1922 | *Oakland Tribune*, 1923-02-09 | `oakland-tribune-1923-02-09` | n16 | "The municipal belt line of Alameda netted the city a profit of $102.50 for the six months ending December 31, 1922" | [P][ocr] |
| A6 | **SP operates the city's line** by agreement with the city; WP and Santa Fe propose an extension and a ferry terminal at the foot of Grand St with a spur up Grand to Clement | 1924-03-25 | *Oakland Tribune*, 1924-03-25 | `oakland-tribune-1924-03-25` | PDF p. 15 (n14) | "the Southern Pacific, now operating switching engines over the belt line by an agreement with the city … the line, now operated over only by the Southern Pacific" | [P][img] |
| A7 | **CRC Decision No. 15177**, Application 10888, decided **1925-07-14**: WP and Santa Fe "have caused Alameda Belt Line to be incorporated"; buy the city's line for $30,000 | 1925-07-14 | Railroad Commission, *Decisions* vol. 26 | `california-railroad-commission-decisions_26`; also CPUC `Decisions_D11601_to_D25900/D15177_19250714_A10888.pdf` | pp. 801–805 (n806–n810); quotes on pp. 802–803 | "Application No. 10888. Decided July 14, 1925." / "by the acquisition for the sum of $30,000 from the city of Alameda of an existing belt line railroad and extend and operate the same" | [O][img] |
| A8 | **The city's line, as of 1925** | 1925 | same | same | p. 803 (n808) | "Beginning at a point 188 feet, more or less, easterly of the intersection of the center line of Clement avenue and Broadway; thence by a single track along the center line of Clement avenue in a westerly direction … to … the westerly line of Grand street, a distance of 6364.5 feet." | [O][img] (OCR reads "158 feet"; the image reads 188) |
| A9 | **Planned extension, 1925** (see Route) | 1925 | same | same | p. 803 (n808) | "Beginning at a point in existing track on Clement avenue near Minturn street; thence by a single track on an S curve … southerly and westerly to Buena Vista avenue at Hibbard street" | [O][img] |
| A10 | Interchange track and yard planned | 1925 | same | same | p. 803 | "with interchange track on Clement avenue between Broadway and Park street, and also classification yard, track scales, water and oil facilities, and engine houses" | [O][img] |
| A11 | Hearing began 1925-03-26; SP opposed; the ICC to decide in Finance Dockets 4682–4686 | 1925 | same | same | p. 802 (n807) | "As these matters will be passed upon by the Interstate Commerce Commission in Finance Docket Nos. 4682 to 4686, inclusive" | [O][img] |
| A12 | WP and Santa Fe 2,480 shares each | 1925 | same | same | p. 804 (n809) | "the Western Pacific has subscribed for and agreed to purchase 2480 shares and the Santa Fe 2480 shares" | [O][img] |
| A13 | ICC examiner recommends approval; also car-float service by WP and Santa Fe on the estuary | report of 1925 | *The Traffic World* 36(15), 1925-10-10, "San Francisco harbor plan" | `sim_traffic-world_1925-10-10_36_15` | — | "Examiner Haskell C. Davis, in a report on finance docket No. 4682, Acquisition and Construction of Line by Alameda Belt Line, has recommended approval" | [P][ocr] |
| A14 | **ICC Finance Docket 4682 decided 1926-01-16**, 105 I.C.C. 349–360 (Finance decision 2159) | 1926-01-16 | *Monthly Catalog of U.S. Government Publications*, March 1926 | `sim_monthly-catalog-of-united-states-government-publications_1926-03_375` | p. 676 (n92) | "Alameda Belt Line. Finance docket no. 4682, acquisition and construction of line by Alameda Belt Line; decided Jan. 16, 1926; … p. 349–360. ([Finance decision] 2159.) … v. 105." | [O][img] |
| A15 | What the ICC authorized (acquisition, extensions, stock, WP/SF control, car floats) | 1926 | *The Traffic World* 37(5), 1926-01-30, "Belt line authorized" (prints "Alabama Belt Line", a typo) | `sim_traffic-world_1926-01-30_37_5` | p. 287 (n8), cont. p. 288 | "authorized the Alabama Belt Line (a) to acquire a line of railroad and (b) construct extensions thereto in Alameda county, California" | [P][img] |
| A16 | ICC extends the time to finish construction to 1928-05-31 (supplemental order of 1927-05-03, 124 I.C.C. 465 per the Monthly Catalog of June 1927) | 1927 | *The Traffic World* 39(20), 1927-05-14 | `sim_traffic-world_1927-05-14_39_20` | p. 1255 (n15) | "so as to extend the time for the completion of the proposed construction to May 31, 1928" | [P][ocr] |
| A17 | CRC D16668 (A12792, filed 1926-04-29): spur track across part of Clement Ave and across Oak St | **1926-05-05** | CRC Decision 16668 | CPUC `…/D16668_19260505_A12792.pdf`; date from the table in vol. 28 | p. 1 [img]; route p. 1–2 [ocr]; vol. 28 p. 924 (n927) [img] | "asking for authority to construct a spur track at grade across a portion of Clement Avenue and at grade across Oak Street" | [O][img] |
| A18 | CRC D16792 (A12603): an earlier crossing application dismissed at the ABL's request | 1926-05-28 | CRC Decision 16792; vol. 28 Table B | CPUC `…/D16792_19260528_A12603.pdf`; `california-railroad-commission-decisions_28` | p. 1; vol. 28 p. 904 (n907) | "Applicant herein having requested in writing that this application be dismissed" | [O][ocr]; table [img] |
| A19 | **CRC D16794 (A12874, filed 1926-05-24): two tracks for the extension** (route below). Franchise: Ordinance 273 N.S., 1925-02-03, on a slightly different alignment | **1926-05-28** | CRC Decision 16794 | CPUC `…/D16794_19260528_A12874.pdf`; vol. 28 p. 925 (n928) "Clement Avenue, etc." | pp. 1–2 | "BEGINNING at a point in the center line of an existing track of the Alameda Belt Line in the center of Clement Avenue, distant 56.09 feet southeasterly from the southeastern line of Minturn Street" | [O][img] |
| A20 | **CRC D18770 (A13720, filed 1927-04-22): main track across Webster St**, across the Key System's double-track streetcar line in Webster St, and across the SP tracks between Webster and Eighth Sts (Ordinance 311; SP agreement 1927-04-14) | **1927-09-07** | CRC Decision 18770 | CPUC `…/D18770_19270907_A13720.pdf`; vol. 30 p. 940 (n943) | pp. 1–2 [img]; p. 3 [ocr] | "Beginning at a point on the easterly line of Webster Street which is 730 feet northerly from the northerly line of Buena Vista Avenue; thence … crossing Webster Street" | [O][img] |
| A21 | Crossing number of the Webster St crossing | 1927 | same | same | p. 2 | "The above crossing shall be identified as Crossing No. 10-2.64." | [O][img] |
| A22 | **Status 1928**: ferry slip now "located"; $695,049.41 spent to 1928-04-30; extension to Webster St re-estimated at $827,248.72, west of Webster at $160,000 | 1928-06-05 | CRC Decision 19857 (A14658); *Decisions* vol. 31 pp. 840–842 | CPUC `…/D19857_19280605_A14658.pdf`; `california-railroad-commission-decisions_31` n843–n845 | PDF p. 2 | "including a line to the freight ferry slip located on the Estuary of San Antonio" / "Up to April 30, 1928 the company reports expenditures for road and equipment of $695,049.41." | [O][img] |
| A23 | Track at grade across Industrial Highway (not yet built as a street) | 1931-08-31 | CRC Decision 24002 (A17576) | CPUC `…/D24002_19310831_A17576.pdf` | p. 1 | "authorized to construct a single railroad track at grade across Industrial Highway, in the City of Alameda" | [O][ocr] |
| A24 | Spur across Industrial Highway relocated | 1939-10-03 | CRC Decision 32419 (A22999) | CPUC `…/D32419_19391003_A22999.pdf` | p. 1 | "Alameda Belt Line is authorized to construct one spur track at grade across Industrial Highway" | [O][ocr] |
| A25 | 1940: three ex-Santa Fe 0-6-0s; "some 15 miles of track", "17 miles of line" | 1940-03 | *The Western Railroader* 3(4), March 1940 | `sim_western-railroader-the-western-railfan_1940-03_3_4` | p. 12 | "The Alameda Belt Line is a terminal operation in the city of Alameda, California, owning some 15 miles of track and operating a total of 17 miles of line." | [R][ocr] |
| A26 | 1941: interchange with SP on the island and with Santa Fe and WP by ferry; "In 1938 new track was built west to the naval base"; also says the line was formed and built "In 1930" (conflicts with A7–A22) | 1941-08 | *Trains* 1(10), August 1941, "Alameda Belt Line" | `trains-magazine-vol-1-no-10-aug-1941-images` | pp. 41–43 | "In 1938 new track was built west to the naval base on man-made land to the west." | [R][ocr] |
| A27 | SP employee timetable: SP crosses the Belt line at Alameda between West Alameda and Pacific Ave, and between Eagle Ave and Tynan | 1941-09-28 | SP Western Division Time Table No. 234 (CSRM) | `cscrm_2021_02_001466` (repo id `cscrm-2021-02-001466`) | p. 18 (n16) | "Alameda, Belt line bet'n West Alameda and Pacific Ave. 'stop.' Alameda, Belt line bet'n Eagle Ave. and Tynan, 'stop.'" | [P][ocr] |
| A28 | ICC abandonment proceeding AB 89 (Sub-No. 1), "abandonment in the City of Alameda" (which track is not stated) | notice 1975-07-29 | *Federal Register* 40(153), 1975-08-07 | `sim_federal-register-find_1975-08-07_40_153` | p. 33311 (n123) | "[AB 89 (Sub-No. 1)] ALAMEDA BELT LINE, CALIF. Abandonment … In the matter of Alameda Belt Line, abandonment in the City of Alameda" | [O][ocr] |
| A29 | **Formal abandonment, STB AB 1090X**: City of Alameda d/b/a ABL; 2.61 mi, MP 0.0 near Clement Ave & Broadway to MP 2.61 near Constitution Way | notice 2012-05-17; **effective 2012-06-16** | *Federal Register* 77(96), 2012-05-17 | `sim_federal-register-find_2012-05-17_77_97` | p. 29456 (n259) [img]; p. 29457 (n260) [ocr] | "to abandon approximately 2.61 miles of rail line between milepost 0.0 near the intersection of Clement Avenue and Broadway and milepost 2.61 near Constitution Way" | [O][img] |
| A30 | Same: no local traffic for two years; effective date | 2012 | same | same | p. 29456 | "No local traffic has moved over the line for at least 2 years" / "this exemption will be effective on June 16, 2012" | [O][img] |
| A31 | UP's own abandonment of its Alameda trackage includes "track #7", its connection to the ABL near St. Charles Ave | 2016-06-20 | *Federal Register* 81(118) | `sim_federal-register-find_federal-register_2016-06-20_81_118` | p. 39996 (n135) | "track #7, the connection between the Alameda Belt Line near St. Charles Avenue and the Alameda Industrial Lead at its milepost 16.5 near Constitution Way" | [O][ocr] |
| A32 | Pointer: sale agreement 1924-12-15; city option to buy back; last operation 1998-11-10; UP trackage rights to 2001 | — | 2003 court opinion; Alameda Sun; Wikipedia (`leads-2c` §7a) | — | — | (not re-read) | [W] |

### Route, street by street

1. **City line, 1918 → (sold) 1925/26.** Clement Avenue, single track in the center of the street.
   - 1918 contract: "from Pearl street west to Grand street", about 6,234 ft, with a Park St crossing (A1–A2).
   - 1925 description: from 188 ft east of the Clement Ave / Broadway intersection, west along the center line
     of Clement Ave, "crossing all intervening streets", to the west line of Grand St, 6,364.5 ft (A8).
   - Draw: Clement Ave from just east of Broadway to Grand St. Open **1918-05-27** (first freight, A3);
     operated by SP's switch engines under the city (A6) until the ABL took over (date unsourced).
   - Connection with SP: not stated for 1918 (SP locomotives hauled the cars). The 1925 plan puts an
     interchange track "on Clement avenue between Broadway and Park street" (A10).
2. **Spur across Oak St** (D16668, 1926-05-05): from the Clement Ave track 103.7 ft southeast of Oak St,
   northwest along Clement Ave and across Oak St (A17). Short; draw only if wanted.
3. **Extension west, authorized 1926-05-28 (D16794).** Two tracks:
   - (A) from the Clement Ave track 56.09 ft southeast of Minturn St, curving west "over and along Clement
     Avenue, private property, and Grand Street" to a point in Grand St at Eagle Ave; southwest across Eagle Ave,
     Grand St, private property and Hibbard St to Hibbard St just north of Buena Vista Ave; then northwest
     "parallel with and 6.50 feet northeasterly from the northeastern line of Buena Vista Avenue 2174.93 feet" to
     a point 299.72 ft east of Sherman St; then curving across Sherman St and Eagle Ave and north along Sherman
     St to "a point on the Segregation Line" (A19). [O][img]
   - (B) a short second track on Sherman St across Eagle Ave to the corner of Sherman St and Eagle Ave.
   - Map: Div'n Eng. Dwg. No. T-6-105, dated 1926-05-01 (attached to the application; not in the PDF).
   - Opening date: unsourced. Built by 1928-04-30 in part at least (A22).
4. **West across Webster St, authorized 1927-09-07 (D18770).** Main track crossing Webster St 730–735.64 ft
   north of Buena Vista Ave, across the Key System's double-track car line in Webster St, then across SP
   tracks "between Webster Street and Eighth Street" (A20). Map: Dwg. No. 285-E. The 1925 plan carries it on
   "westerly over private rights of way … to the shore line of San Francisco Bay" (A9), not traced by any
   decision found. Opening unsourced; the ICC deadline was 1928-05-31 (A16).
5. **Freight ferry slip** on the estuary (car floats to WP and Santa Fe): planned 1925, "located" by 1928
   (A22); its position is not given beyond "on the estuary of San Antonio", reached by a line curving north
   from Buena Vista Ave between Benton and Bay Sts in the 1925 plan (A9). Not placed.
6. **Later.** Industrial Highway spur (1931, relocated 1939; A23–A24); "west to the naval base" 1938
   (A26, railfan only); the 1975 partial abandonment (A28) is unplaced.
7. **2012 remainder:** MP 0.0 near Clement Ave & Broadway to MP 2.61 near Constitution Way (A29), i.e. the
   Clement Avenue corridor. No traffic for at least 2 years before the 2012 notice.

**Dates to draw (decision 15), with what is sourced:** Clement Ave Broadway–Grand from **1918-05-27**
(city line) [img]; owner/operator changes to the ABL between 1925-07-14 (CRC) / 1926-01-16 (ICC) and an
unsourced takeover day; the 1926 and 1927 extensions from their authorizations (1926-05-28, 1927-09-07)
only as "authorized", opening unsourced, so under decision 20 they need a running date (A22's 1928-04-30
expenditure report says money was spent, not that trains ran). End: unsourced (1998 pointer); the formal
end is 2012-06-16, with no traffic for two years before.

### Conflicts

1. **East end of the city line:** "from Pearl street" (1918 bid, A1) vs "188 feet … easterly of … Clement
   avenue and Broadway" (1925, A8); and 6,234 ft (estimate) vs 6,364.5 ft (1925). The two may agree if Pearl
   St is next to Broadway (check on the 1949 Oakland West / 1950 SF North sheets); not assumed.
2. **The repo's citation "CRC Decisions vol. 26 (1925), pp. 808–809"** (`east-bay-electric.md`) is the scan
   leaf, not the page: the decision is D15177 on printed pp. 801–805 (leaves n806–n810); the Minturn St quote
   is on p. 803.
3. **When the ABL was formed and built:** CRC/ICC 1925–1928 (A7–A22) vs *Trains* 1941 "In 1930 the …
   Santa Fe, together with the Western Pacific and the City of Alameda, formed the Belt Line and constructed
   the necessary trackage" (A26). Prefer the official record.
4. **1925 plan vs 1926 alignment:** the plan curves north from Buena Vista Ave "between Benton street and
   Bay street" to the ferry slip; the 1926 authorization turns north on Sherman St to the Segregation Line.
   Whether these are the same place is a map question.
5. **Length:** 6,364.5 ft (1925 city line); 15 mi of track / 17 mi operated (1940, A25); 2.61 mi (2012).
   Track miles vs route miles; not a contradiction.
6. **End of service:** 1998-11-10 (pointer) vs "no local traffic … for at least 2 years" before May 2012
   (A30). The later bound only.
7. Minor: D19857 restates D15177's estimate as $494,535.58; D15177 has $494,545.58.

### Still unsourced

- The day the Alameda Belt Line company took over and began operating (agreement 1924-12-15 and
  incorporation 1925-01-12 are pointers only).
- Opening dates of the Buena Vista Ave / Sherman St extension, the Webster St crossing and the line to the
  bay shore, and of the freight ferry slip; the ferry slip's position.
- The 1938 naval air station extension (railfan only) and its route; the track given up under AB 89
  (Sub-No. 1), 1975; the city's re-purchase of the line; the last train (1998?); AB 1090X consummation.
- Street-by-street route west of Webster St.

---

## 2. Oakland Terminal Railroad (1935–43) and Oakland Terminal Railway (from 1943)

### Answer in one paragraph

The freight company was **Key System, Ltd.**, which in **1930–31** built switching tracks in the **Outer
Harbor** under a Port of Oakland resolution of 1930-12-15, connected with its main line and paid for by the
WP and Santa Fe (CRC D27383, 1934). By CRC Decision **27770** (1935-02-25, **effective 1935-03-01**) Key
System, Ltd. leased all its lines "except such as are exclusively devoted to freight service" to Key Terminal
Railway, Ltd. (the passenger company; D36427 later calls the lessee under that lease "Key System"), and Key System, Ltd.'s name was **changed to
Oakland Terminal Railroad Co.** (D30868, 1938; the day is unsourced, 1935-02-26 per a pointer). In 1937 its
tracks were "on the present Key Mole", and they were relocated for the Bridge Railway's East Bay yard in
1937–38. On **1943-07-01** the **Oakland Terminal Railway**, jointly controlled by the Santa Fe and the
Western Pacific, took over all freight operations (ICC 1943-05-26; CRC D36427, 1943-06-08). It got the
Outer Harbor switching tracks, industrial spurs, **trackage rights over the Key System's passenger lines**,
and the **40th St line from near Adeline St to near Broadway** (to meet the Sacramento Northern). The
sources then place its freight on **Key's A and B lines from Yerba Buena Ave along Poplar St and West Grand
Ave** (1953), on Louise St and Poplar St to 12th St (1957), and, for the WP's traffic, over the **Key "C"
line from 40th & Shafter to the Outer Harbor** until the **Union Street line** (authorized by CPUC
D53801, 1956-09-25: along Union St from Key's 12th St line south across 12th, 10th, 8th, 7th and 5th Sts, and
across Third, Union and Magnolia Sts to the WP near First St) was **placed in operation in April 1957**. The
company still operated 10 miles of switching track in West Oakland in 2013.

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| T1 | **Outer Harbor tracks**: Port of Oakland Resolution 1928 of 1930-12-15 let Key System, Ltd. build tracks in the outer harbor "connecting with applicant's main line"; built, owned and operated by it | resolution 1930-12-15; decision **1934-09-24** | CRC Decision 27383 (A19600) | CPUC `Decisions_D25901_to_D40599/D27383_19340924_A19600.pdf` | pp. 1, 3 | "permission was granted to applicant to construct certain tracks in the outer harbor area of the City of Oakland connecting with applicant's main line. It is reported that such tracks were constructed and now are owned and operated by applicant" | [O][img] |
| T2 | Same: the tracks, 14,500.68 ft with overhead trolley; paid for by WP and Santa Fe ($158,877.43) | 1934 | same | same | p. 2 | "Main switching lead of 6,896.20 feet … 14th Street dock spur of 1,471.0 feet … a total of 14,500.68 feet, together with all appurtenances thereof, including roadbed and overhead trolley system" | [O][img] |
| T3 | Built in 1931 | 1931 | *Traffic World* 71(8), 1943-02-20 | `sim_traffic-world_1943-02-20_71_8` | p. 416 (n15) | "a mortgage on the Oakland Terminal Railroad outer harbor district trackage and appurtenances built in 1931, as subsequently relocated" | [P][img] |
| T4 | Key System, Ltd. and SP: joint drill track across two city-owned spurs in the Port Area near West 12th St and "B" St | 1931-12-07 | CRC Decision 24291 (A17795) | CPUC `…/Decisions_D11601_to_D25900/D24291_19311207_A17795.pdf` | pp. 1–2 | "authorized to construct a joint drill track at grade across two spur tracks owned by the City of Oakland, in the Port Area in the vicinity of the intersection of West Twelfth Street and 'B' Street" | [O][ocr] |
| T5 | **Lease of the passenger lines**: Key System, Ltd. leases all lines and properties "except such as are exclusively devoted to freight service" to Key Terminal Railway, Ltd.; Key System, Ltd. "also engaged … in the transportation of freight" | filed 1935-02-07; decided 1935-02-25; **effective 1935-03-01** | CRC Decision 27770 (A19822) | CPUC `…/Decisions_D25901_to_D40599/D27770_19350225_A19822.pdf` | p. 1; p. 4 | "asks permission to lease its lines and properties, except such as are exclusively devoted to freight service, to Key Terminal Railway, Ltd." / "the authority herein granted shall become effective March 1, 1935" | [O][img] |
| T6 | **Key System, Ltd. renamed Oakland Terminal Railroad Co.** (date of the change not given) | stated 1938-05 | CRC Decision 30868 (A19600, first supplemental order) | CPUC `…/D30868_19380516_A19600.pdf` | p. 1 | "OAKLAND TERMINAL RAILROAD CO. (whose name was formerly Key System, Ltd.)" / "authorized Key System, Ltd., whose name since has been changed to Oakland Terminal Railroad Co." | [O][img] |
| T7 | A purely freight company on the waterfront | 1935-03-29 | *East Bay Labor Journal*, 1935-03-29 | `csfst_000792` | n2 | "The Oakland Terminal railroad is a purely freight concern operating in and around the waterfront." | [P][ocr] (copyright: Central Labor Council of Alameda County; facts only) |
| T8 | 1937: OTR tracks on the Key Mole; Bay Bridge work shifts Key and OTR tracks | to 1937-07-01 | California Dept. of Public Works, *Fourth Annual Progress Report, San Francisco–Oakland Bay Bridge*, July 1, 1937 | `annualprogressre1937unse` | p. 70 (n76) | "the shifting of the main Key System tracks, as well as those of the freight subsidiary of the Key System, the Oakland Terminal Railroad." / "the Oakland Terminal tracks, located on the present Key Mole" | [O][img] |
| T9 | 1938: OTR relocated for the East Bay yard | to 1938-07-01 | *Fifth Annual Report, San Francisco–Oakland Bay Bridge*, July 1, 1938 | `annualreportsanf1938unse` | p. 47 (n51) | "It was also required that the Oakland Terminal Railroad, a Key System subsidiary, be relocated." | [O][img] |
| T10 | Same report: the SP overhead carries IER westbound trains over Key's eastbound tracks and OTR's freight tracks | 1937–38 | same | same | substructure section (page not checked) | "designed to carry the Interurban Electric westbound trains over Key System's eastbound tracks and the Oakland Terminal Railroad's freight tracks" | [O][ocr] |
| T11 | Some mortgaged OTR track removed for the Bridge Railway; replacement track built by the Toll Bridge Authority | supplemental petition 1938-04-22; order 1938-05-16 | CRC D30868 | as T6 | p. 1 | "certain of the trackage mortgaged … has been removed because of the work of the construction of the Bridge Railway facilities … and other trackage has been constructed by said Authority in lieu thereof" | [O][img] |
| T12 | Pointer: WP and Santa Fe file incorporation papers for the Oakland Terminal Railway | 1942-12 | *The Western Railroader* 6(2), Dec 1942 | `sim_western-railroader-the-western-railfan_1942-12_6_2` | p. 8 | "filed incorporation papers with the California Railroad Commission for the Oakland Terminal Railway to operate the Key System holdings of the former Oakland Terminal Railroad on the Oakland waterfront" | [R][ocr] |
| T13 | ICC applications FD 14115/14116; OTR serves "points in the City of Oakland and the Town of Emeryville" | 1943-02-20 | *Traffic World* 71(8) | `sim_traffic-world_1943-02-20_71_8` | p. 416 (n15) | "a freight switching railroad serving points in the City of Oakland and the Town of Emeryville, Calif., is asked in applications docketed as Finance Nos. 14115 and 14116" | [P][img] |
| T14 | ICC report and order approved (uncontested finance cases) | 1943-05-29 issue | *Traffic World* 71(22) | `sim_traffic-world_1943-05-29_71_22` | p. 1265 (n15) | "Authorizing purchase by the Oakland Terminal Railway of part of the property of the Oakland Terminal Railroad Co., acquisition … of trackage rights over the remaining lines" | [P][ocr] |
| T15 | **CRC D36427**: transfer to the Oakland Terminal Railway; ICC decision of 1943-05-26 | **1943-06-08** | CRC Decision 36427 (A25539) | CPUC `…/Decisions_D25901_to_D40599/D36427_19430608_A25539.pdf` | pp. 2–3, 6 | "The Interstate Commerce Commission, by its decision of May 26, 1943, authorizes the sale and transfer of Oakland Terminal Railroad Co. business and properties" | [O][img] |
| T16 | **What the Railway got** (route facts) | 1943 | same | same | p. 2 | "switching tracks in the Outer Harbor District of Oakland … various industrial spur tracks and trackage rights over the lines now leased to and operated by Key System in passenger service" | [O][img] |
| T17 | **40th St line** to the Sacramento Northern | 1943 | same | same | p. 2 | "title to the Fortieth Street Line extending from a point near Adeline Street and Fortieth Street to a point near Fortieth Street and Broadway in the City of Oakland to afford a connection with the Sacramento Northern Railway" | [O][img] |
| T18 | OTR Co. then merged into Key System; Key owns "the tracks east of the Bridge Railway" except the 40th St section; OTR track shown in Exhibit 2 (not in the PDF) | 1943 | same | same | p. 3 | "The location of the Oakland Terminal Railroad Co. track is shown in Exhibit 2." | [O][img] |
| T19 | **Oakland Terminal Railway takes over on July 1** (1943); serves the Army's Outer Harbor depots and "certain industries located on Key System tracks in Inner Oakland"; offices at 1501 Yerba Buena Ave | **1943-07-01** | *Railway Age* 115(1), 1943-07-03, "Oakland Terminal begins operations July 1" | `sim_railway-age_1943-07-03_115_1` | p. 35 (n40) | "took over, on July 1, all freight operations heretofore conducted by the Oakland Terminal Railroad Company, one of the Key System companies." | [P][img] |
| T20 | Same: the bridge route to the harbor | 1943 | same (quoting the ICC) | same | p. 35 | "The new company will have the benefit of the bridge route, which will afford a more direct and efficient route to the harbor district, free from interference by passenger trains." | [P][img] |
| T21 | **Key A and B lines, Poplar St and West Grand Ave**, to stay for OTR freight when passenger rail ends | 1953-11-10 | CPUC Decision 49307 (A33920) | repo `cpuc-d49307` | p. 2 | "Remaining portions of the 'A' and 'B' rail lines from Yerba Buena Avenue along Poplar Street and West Grand Avenue, it is alleged, are subject to retention by Oakland Terminal Railways for freight operations" | [O][img] |
| T22 | Union St franchise application (Jan 1952): single track on Union St from the Key "A" line at 12th St to Fifth St, then over WP property, crossing Third and Magnolia Sts, to the WP main line on First St | 1952-01 | *The Western Railroader* 15(3), Jan 1952 (reprinting a newspaper) | `sim_western-railroader-the-western-railfan_1952-01_15_3` | p. 5 | "construct and operate a single track along Union Street from the Key System 'A' line at 12th Street to Fifth Street, hence over Western Pacific property for two blocks, crossing Third and Magnolia Streets" | [R][ocr] |
| T23 | Franchise: "four-tenths of a mile of track on Union Street, from 12th Street south to Fifth Street"; WP lists "Elimination of freight train operations on 40th Street" | 1953-10-02 | *Orinda Sun*, 1953-10-02 | `caorihs_000290` | n0, n2 | "a franchise for four-tenths of a mile of track on Union Street, from 12th Street south to Fifth Street" | [P][ocr] (copyright unknown; decision 19) |
| T24 | OTR tracks among those crossed by the Cypress St freeway's temporary detour | 1956-03-13 | CPUC Decision 52754 (A37449) | CPUC `…/Decisions_D40600_to_D57800/D52754_19560313_A37449.pdf` | p. 1 | "a temporary detour crossing at separated grades over the tracks of The Atchison, Topeka and Santa Fe Railway Company, Southern Pacific Company, and The Oakland Terminal Railway" | [O][ocr] |
| T25 | **ICC approves the SN–OTR "package deal"**: SN abandoned Lafayette – 40th & Shafter; **OTR to abandon its service from Yerba Buena yards to 40th & Shafter over the Key System**; new line 12th & Poplar – Union St – Third & Union | 1956-08 | *The Western Railroader* 19(10), Aug 1956 | `sim_western-railroader-the-western-railfan_1956-08_19_10` | p. 8 (n7) | "The Oakland Terminal will abandon service from Yerba Buena yards to 40th & Shafter over the Key System. The new 2-mile line will run from the Key System tracks at 12th and Poplar over Union Street to the Western Pacific tracks at Third and Union." | [R][img] |
| T26 | **CPUC D53801**: WP and OTR to build a line along Union St; crossings 16B-0.41 (12th), 16B-0.30 (10th), 16B-0.17 (8th), 16B-0.10 (7th), 16B-0.01 (5th); 4-6.22-C Magnolia, 4-6.28-C Union, 4-6.44-C Third; ICC: work to start by 1956-10-01 | **1956-09-25** | CPUC Decision 53801 (A38249, filed 1956-07-13) | CPUC `…/Decisions_D40600_to_D57800/D53801_19560925_A38249.pdf` | pp. 1–2 | "authorized to construct a line of railroad along Union Street, crossing Twelfth, Tenth, Eighth, Seventh, and Fifth Streets and across Third, Union and Magnolia Streets and across the Twelfth Street line of Key System Transit Lines" | [O][img] |
| T27 | Same: crossing of Key's 12th St line between Union and Poplar Sts | 1956 | same | same | p. 2 | "Interlocking plans for the crossing of the Key System Transit Lines' 12th Street Line between Union and Poplar Streets shall be presented" | [O][img] |
| T28 | Key System proposes to remove all its track "except that jointly used by The Oakland Terminal Railway" | 1956-12-11 | CPUC Decision 54242 (A36656) | repo `cpuc-d54242` | p. 23 | "Key System proposes to remove all its remaining trackage, except that jointly used by The Oakland Terminal Railway" | [O][img] |
| T29 | SN abandonment "set for March 1" with the completion of the Union St line | 1957-03 | *The Western Railroader* 20(5), March 1957 | `sim_western-railroader-the-western-railfan_1957-03_20_5` | p. 13 (n13) | "Abandonment of the Sacramento Northern from Lafayette into Oakland appears set for March 1 with the completion of the Union Street line of the Oakland Terminal Railroad." | [R][ocr] |
| T30 | **Before 1957 the WP reached the Outer Harbor via the SN over Key's "C" line from 40th & Shafter**; SN asked the ICC on 1955-11-30 to abandon 40th & Shafter – Lafayette | 1957-09-10 | CPUC Decision 55545 (Case 5900) | CPUC `…/Decisions_D40600_to_D57800/D55545_19570910_C5900.pdf` | p. 2; date p. 12 | "This connection was made over the 'C' line tracks of the Key System Transit Lines from 40th and Shafter in Oakland to the Outer Harbor." | [O][img] |
| T31 | **Union St line: WP near First & Magnolia to Key's tracks at 12th & Union; in operation April 1957** | **1957-04** | same | same | p. 3 | "connecting The Western Pacific Railroad in the vicinity of First and Magnolia Streets in Oakland with the tracks of Key System Transit Lines at Twelfth and Union Streets." / "The Union Street line was completed and placed in operation in April of 1957." | [O][img] |
| T32 | **Key track used by OTR, 1957**: Tower No. 2 (Yerba Buena Ave & Louise St) – Louise St – Poplar St – 12th St, double track; B line leaves Poplar just north of West Grand Ave | 1957 | same | same | p. 4 | "from Tower No. 2 at Yerba Buena Avenue and Louise Street along the center of Louise Street to Poplar Street, thence along the center of Poplar Street to 12th Street. The line is double-tracked throughout." | [O][img] |
| T33 | OTR switching on Poplar St and West Grand Ave; "W. P. Transfer" trains First St – Outer Harbor, only 6:30 pm – 6:00 am by Ordinance 4276 C.M.S. (1953-11-10), ≤ 25 cars | 1957 | same | same | p. 4 | "The Oakland Terminal Railway provides switching service for the industries along Poplar Street and West Grand Avenue." | [O][img] |
| T34 | Navy EIS: the Port "also is served by the Oakland Terminal Railroad [sic], a local switching railroad" | 1997-03 | DTIC ADA322210 (FISC Oakland disposal EIS/EIR) | `DTIC_ADA322210` | p. 3-121 (n242) | "The Port also is served by the Oakland Terminal Railroad, a local switching railroad." | [O][ocr] |
| T35 | 2013: OTR "operates 10 miles of switching track in West Oakland" for UP and BNSF | 2013-10 | Caltrans, *California State Rail Plan 2013*, App. C.2.4 | `california-state-rail-plan-2013` | p. 52 (n51) | "The Oakland Terminal Railway (OTR) is a terminal railroad associated with the Port of Oakland. It operates 10 miles of switching track in West Oakland, performing switching activities for both UPRR and BNSF." | [O][ocr] |
| T36 | Pointer: Key System, Ltd. incorporated 1930-08-07; OTR Co.'s service from 1935-02-26; OT Railway covered from 1943-07-01 (Railroad Retirement Board) | — | RRB L-1937-970, L-1943-754 (`leads-2c` §7b) | govinfo (blocked) | — | (not re-read) | [W] |

### Route, street by street (each stretch with its source and dates)

1. **Outer Harbor switching tracks** (Port Area, West Oakland): built 1931 under Port Resolution 1928
   (1930-12-15), "connecting with applicant's main line" (T1–T3); a joint drill track with SP near West 12th St
   and "B" St, 1931 (T4). Owner/operator: Key System, Ltd. → Oakland Terminal Railroad Co. (renamed; T6) →
   Oakland Terminal Railway from 1943-07-01 (T16, T19). **Geometry not in any text**: needs the Port's or the
   Commission's map (D36427 Exhibit 2 is not in the PDF). Draw from 1931 (year only) when traced.
2. **Key Mole freight tracks** (west of the Key trunk, on the mole): "Oakland Terminal tracks, located on the
   present Key Mole", 1937 (T8); relocated 1937–38 for the Bridge Railway's East Bay yard (T9–T11). Not
   placeable from text; the 1938 report says replacement track gave the connection "between tracks subject to
   said mortgage" (the Outer Harbor tracks) for OTR's operations.
3. **Yerba Buena yards – Key trunk – 40th St – 40th & Shafter** (connection with the SN, used for the WP's
   traffic to the Outer Harbor): trackage rights over Key's passenger lines from 1943 (T16); the 40th St line
   from near Adeline St to near Broadway owned by OTR (T17); the "C" line tracks from 40th & Shafter to the
   Outer Harbor (T30); OTR service Yerba Buena yards – 40th & Shafter given up with the Union St line (T25).
   Streets: Yerba Buena Ave between Adeline St and 40th St (repo `cpuc-d50731`, p. 2), 40th St from the trunk
   to Broadway (T17) and on to Shafter Ave (T30). **Dates:** freight over it sourced from 1943-07-01 (OTR
   Railway; T16) — for 1935–43 the 40th St line was OTR Co.'s own track leased to Key (T5, T17), but OTR
   freight on it before 1943 is not stated; **end April 1957** (T31; WR says March 1, T29). The C line's
   own street routing east of Broadway is in the Key System data, not repeated here.
4. **Tower No. 2 (Yerba Buena Ave & Louise St) – Louise St – Poplar St – 12th St**, and **Poplar St – West
   Grand Ave** (Key's A and B lines): OTR switching for industries on Poplar St and West Grand Ave (T32–T33);
   "subject to retention by Oakland Terminal Railways" when passenger service ends (1953, T21); Key keeps only
   track "jointly used" by OTR (1956, T28). **Dates:** named for OTR in 1953-11-10 and 1957-09-10 (decision
   20 running dates); from 1943 under the general trackage rights (T16) only by inference, not drawn. Key's
   A-line track "east of Poplar Street" was to be removed (D49307 p. 2).
5. **12th St between Poplar St and Union St** (Key's 12th St line) and **Union St line**: from the Key
   tracks at 12th & Poplar (T25) / 12th & Union (T31) south along Union St, crossing 12th, 10th, 8th, 7th and
   5th Sts (T26), then over WP property crossing Third, Union and Magnolia Sts (T22, T26) to the WP "in the
   vicinity of First and Magnolia Streets" (T31). **Opened April 1957** (month only; T31). Franchise 0.4 mile
   on Union St, 12th to 5th (T23); "2-mile line" overall (T25). End: unsourced.
6. **Emeryville**: served in 1943 (T13); which tracks is not stated. Not placed.

### Conflicts

1. **Start of the "Oakland Terminal Railroad" name:** 1935-02-26 (RRB, pointer) vs the lease effective
   1935-03-01 (T5). The CRC sources give no renaming date (T6).
2. **Union St opening:** "set for March 1" 1957 (T29, railfan) vs "placed in operation in April of 1957"
   (T31, CPUC). Use April 1957 (month only), flagged; the forum's "February 1957" (`leads-2c`) is a pointer.
   The "1955 street trackage at 10th and Union" pointer is not supported by anything read: D53801 authorized
   the crossings only on 1956-09-25.
3. **Union St line's west end:** "WP tracks at Third and Union" (T25) vs "First and Magnolia" (T31) vs "the
   Western Pacific Railroad mainline on First Street" (T22). The line crosses Third St, Union St and Magnolia
   St (T26); First & Magnolia is the CPUC's wording. Not a real contradiction.
4. **Names:** sources after 1943 still say "Oakland Terminal Railroad" for the Railway (T29, T34). Two
   companies: Railroad (Key System, Ltd. renamed; merged into Key System after 1943) and Railway (1943, WP–SF).
5. **Outer Harbor date:** Port resolution 1930-12-15 (T1) and "built in 1931" (T3). Consistent; the day the
   tracks opened is unsourced.

### Still unsourced

- The renaming date of Key System, Ltd. to Oakland Terminal Railroad Co.; Key System's freight before 1930.
- Geometry of the Outer Harbor tracks, the Key Mole tracks and their 1938 relocation, and the Emeryville
  tracks (no map found; D36427's Exhibit 2 and D27383's mortgage exhibit are not in the PDFs).
- Which Key tracks OTR freight used, street by street, between 1935 and 1953, beyond 40th St.
- The end of OTR use of each Key segment after Key's last trains (1958), the end of the Union St line, and
  the Railway's end (the "West Oakland Pacific" successor is a pointer).

---

## Leads not followed up (pointers for a later pass)

- *United States Daily* 1929-04-26 (`sim_united-states-daily_1929-04-26_4_47`) prints an ICC report on a WP
  proposal for an "Alameda Belt connection" from Union Belt Junction across a drawbridge over the Tidal Canal
  "to a connection with the railroad of the Alameda Belt Line … at a point in Clement Avenue near the east
  line of Broadway" [O][ocr]. Whether it was built was not checked.
- *A progress report … on the southern crossing* (1954, `progressreportto1954cali`) mentions "the route now
  followed by the Alameda Belt Line and Atlantic Avenue" [ocr]: a later ABL route along Atlantic Ave.
- *Western Railroader* 1945-12 (`sim_western-railroader-the-western-railfan_1945-12_9_2`): "Terminal seeks
  Union St. link" (OCR garbled; an earlier franchise attempt).
- Encinal Terminals' ownership of some ABL tracks (`waterbornecommer00nord`, 1985) [ocr].
- Federal Register 1948-10-22/23: ICC Service Order 831, unloading of logs on the ABL (shows operation).
- Moody's / *Railroad Ten-Year Trends* list the ABL (50% ATSF, 50% UP) into the 1990s: ownership only.

## For Matthew (manual work)

- **Maps to georeference:** the ABL's 1926 extension (Div'n Eng. Dwg. T-6-105) and 1927 Webster St crossing
  (Dwg. 285-E) are attached to the applications, not the decisions; the Commission's files would have them.
  Until then, trace from USGS sheets already in `sources.json` (`usgs-oakland-west-1949`,
  `usgs-san-francisco-north-1950`), which may show the Clement Ave, Buena Vista Ave and Sherman St tracks and
  the West Oakland freight tracks.
- **Pearl St vs Broadway** (ABL conflict 1): a street-map check of where Pearl St meets Clement Ave.
- **OTR geometry** (Outer Harbor, Key Mole, Emeryville): needs a Port of Oakland or railroad map; the 1943
  ICC report (Finance Dockets 14115/14116, I.C.C. Finance Reports, 1943) may describe the lines and was not
  found on archive.org.
- **License:** *Trains* (Kalmbach, 1941) and *The Western Railroader* are copyright unknown, facts only
  (decision 19); the *East Bay Labor Journal* item is copyrighted (Central Labor Council of Alameda County),
  facts only; the *Orinda Sun* is copyright unknown. CRC/CPUC decisions, ICC/STB notices, the Bay Bridge
  reports and the 1918–24 *Oakland Tribune* are public records or pre-1929.
- **Not re-read:** the 2003 *Alameda Belt Line v. City of Alameda* opinion (sale agreement 1924-12-15, the
  city's buy-back) and the RRB determinations (courtlistener and govinfo are blocked here).

---

## Proposed sources.json entries

Reuse the existing ids `cpuc-d49307`, `cpuc-d54242` and `cpuc-d50731` (their `notes` are empty or about
passenger routes; the notes below can be appended), and `cscrm-2021-02-001466`.

```json
[
  {
    "id": "oakland-tribune-1918-04-10",
    "title": "Oakland Tribune, 1918-04-10: \"Bids are received for belt line\" (Alameda)",
    "publisher": "Oakland Tribune",
    "date": "1918-04-10",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1918-04-10",
    "accessed": "2026-10-16",
    "notes": "PDF p. 7 (leaf n6): \"Bids for the construction of the Alameda belt line on Clement avenue, from Pearl street west to Grand street, were opened by the city council last night\"; \"about 6234 feet of track\"; \"Bids on the Park street crossing\". Read on the page image, October 16, 2026."
  },
  {
    "id": "oakland-tribune-1918-05-27",
    "title": "Oakland Tribune, 1918-05-27: the Barnes-Tibbitts shipyard and the first freight on Alameda's municipal belt line",
    "publisher": "Oakland Tribune",
    "date": "1918-05-27",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1918-05-27",
    "accessed": "2026-10-16",
    "notes": "PDF p. 9 (leaf n8): the Barnes-Tibbitts shipyard \"at the north end of Chestnut street, Alameda\"; \"The new plant has the distinction of receiving the first freight transported over the new municipal belt line, several cars of shipping board material being hauled over the new tracks to the yard by a Southern Pacific locomotive this morning.\" Same page carries a menu dated \"Monday, May 27\". Read on the page image, October 16, 2026."
  },
  {
    "id": "oakland-tribune-1918-06-06",
    "title": "Oakland Tribune, 1918-06-06: extension of Alameda's municipal belt line considered",
    "publisher": "Oakland Tribune",
    "date": "1918-06-06",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1918-06-06",
    "accessed": "2026-10-16",
    "notes": "Leaf n16: \"Plans for the extension of the new municipal belt line westward from Grand street through the 130-acre tract just purchased by the Bethlehem Shipbuilding Corporation are being considered\". Text layer only."
  },
  {
    "id": "oakland-tribune-1923-02-09",
    "title": "Oakland Tribune, 1923-02-09: \"Alameda Belt Line shows $102 profit\"",
    "publisher": "Oakland Tribune",
    "date": "1923-02-09",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1923-02-09",
    "accessed": "2026-10-16",
    "notes": "Leaf n16: \"The municipal belt line of Alameda netted the city a profit of $102.50 for the six months ending December 31, 1922\". Text layer only."
  },
  {
    "id": "oakland-tribune-1924-03-25",
    "title": "Oakland Tribune, 1924-03-25: WP and Santa Fe plans for Alameda's belt line",
    "publisher": "Oakland Tribune",
    "date": "1924-03-25",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1924-03-25",
    "accessed": "2026-10-16",
    "notes": "PDF p. 15 (leaf n14): \"the Southern Pacific, now operating switching engines over the belt line by an agreement with the city\"; the WP and Santa Fe propose \"a joint ferry terminal at the foot of Grand street and the construction of a spur track up Grand to Clement avenue to connect with the belt line.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "crc-d15177",
    "title": "Railroad Commission of California, Decision No. 15177 (Application No. 10888): Alameda Belt Line stock; purchase of the city of Alameda's belt line",
    "publisher": "Railroad Commission of the State of California",
    "date": "1925-07-14",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D15177_19250714_A10888.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Also Decisions of the Railroad Commission vol. 26, pp. 801-805 (archive.org california-railroad-commission-decisions_26, leaves n806-n810; the repo's earlier \"pp. 808-809\" are leaf numbers). p. 802: \"Application No. 10888. Decided July 14, 1925.\" p. 803: the WP and Santa Fe \"have caused Alameda Belt Line to be incorporated\"; existing line \"Beginning at a point 188 feet, more or less, easterly of the intersection of the center line of Clement avenue and Broadway; thence by a single track along the center line of Clement avenue … to … the westerly line of Grand street, a distance of 6364.5 feet\"; extension \"from a connection with the existing track of the city's railroad in Clement avenue near Minturn street\"; \"interchange track on Clement avenue between Broadway and Park street\". p. 804: 2480 shares each to WP and Santa Fe. Read on the page images, October 16, 2026."
  },
  {
    "id": "crc-d16668",
    "title": "Railroad Commission of California, Decision No. 16668 (Application No. 12792): Alameda Belt Line spur across Oak Street",
    "publisher": "Railroad Commission of the State of California",
    "date": "1926-05-05",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D16668_19260505_A12792.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: application filed April 29, 1926 \"asking for authority to construct a spur track at grade across a portion of Clement Avenue and at grade across Oak Street\" (read on the image); pp. 1-2: from the Clement Avenue track \"103.7 feet southeasterly from the southeastern line of Oak Street\" (text layer). Date from Decisions vol. 28, p. 924, Table D (read on the image)."
  },
  {
    "id": "crc-d16794",
    "title": "Railroad Commission of California, Decision No. 16794 (Application No. 12874): Alameda Belt Line extension tracks across streets in Alameda",
    "publisher": "Railroad Commission of the State of California",
    "date": "1926-05-28",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D16794_19260528_A12874.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "pp. 1-2: two tracks; (A) from the Clement Avenue track \"distant 56.09 feet southeasterly from the southeastern line of Minturn Street\" over Clement Ave, private property and Grand St, across Eagle Ave and Hibbard St, \"parallel with and 6.50 feet northeasterly from the northeastern line of Buena Vista Avenue 2174.93 feet\", then across Sherman St and Eagle Ave and along Sherman St \"to a point on the Segregation Line\"; (B) a short track on Sherman St at Eagle Ave. Franchise Ordinance No. 273 N.S. of February 3, 1925 (slightly different alignment); map Div'n Eng. Dwg. No. T-6-105. Date from Decisions vol. 28, p. 925, Table D. Read on the page images, October 16, 2026."
  },
  {
    "id": "crc-d18770",
    "title": "Railroad Commission of California, Decision No. 18770 (Application No. 13720): Alameda Belt Line main track across Webster Street and the SP and Key System tracks",
    "publisher": "Railroad Commission of the State of California",
    "date": "1927-09-07",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D18770_19270907_A13720.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "pp. 1-2: main track at grade across Webster Street, across the Key System Transit Company's tracks in it, and \"across tracks of Southern Pacific Company between Webster and Eighth Streets\"; \"Beginning at a point on the easterly line of Webster Street which is 730 feet northerly from the northerly line of Buena Vista Avenue\"; \"Crossing No. 10-2.64\". Date from Decisions vol. 30, p. 940. Read on the page images, October 16, 2026."
  },
  {
    "id": "crc-d19857",
    "title": "Railroad Commission of California, Decision No. 19857 (Application No. 14658): Alameda Belt Line additional stock",
    "publisher": "Railroad Commission of the State of California",
    "date": "1928-06-05",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D19857_19280605_A14658.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Also Decisions vol. 31, pp. 840-842. PDF p. 2: \"including a line to the freight ferry slip located on the Estuary of San Antonio\"; \"Up to April 30, 1928 the company reports expenditures for road and equipment of $695,049.41.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "traffic-world-1926-01-30",
    "title": "The Traffic World 37(5), January 30, 1926: \"Belt line authorized\" (ICC Finance Docket No. 4682)",
    "publisher": "The Traffic World",
    "date": "1926-01-30",
    "type": "journal",
    "url": "https://archive.org/details/sim_traffic-world_1926-01-30_37_5",
    "accessed": "2026-10-16",
    "notes": "p. 287 (leaf n8), cont. p. 288: the ICC, division 4, in finance docket No. 4682 \"has authorized the Alabama [sic] Belt Line (a) to acquire a line of railroad and (b) construct extensions thereto in Alameda county\"; control by the Santa Fe and WP; car floats on the estuary. Read on the page image, October 16, 2026. The decision itself (decided Jan. 16, 1926, 105 I.C.C. 349-360, Finance decision 2159) is listed in the Monthly Catalog of U.S. Government Publications, March 1926, p. 676 (sim_monthly-catalog-of-united-states-government-publications_1926-03_375, leaf n92, read on the image)."
  },
  {
    "id": "traffic-world-1927-05-14",
    "title": "The Traffic World 39(20), May 14, 1927: ICC amends Finance Docket No. 4682 (Alameda Belt Line)",
    "publisher": "The Traffic World",
    "date": "1927-05-14",
    "type": "journal",
    "url": "https://archive.org/details/sim_traffic-world_1927-05-14_39_20",
    "accessed": "2026-10-16",
    "notes": "p. 1255 (leaf n15): the report and certificate in finance docket No. 4682 amended \"so as to extend the time for the completion of the proposed construction to May 31, 1928.\" Text layer only."
  },
  {
    "id": "fr-2012-05-17-ab1090x",
    "title": "Federal Register 77(96), May 17, 2012: STB Docket No. AB 1090X, City of Alameda d/b/a Alameda Belt Line Railroad, abandonment exemption",
    "publisher": "Office of the Federal Register",
    "date": "2012-05-17",
    "type": "official",
    "url": "https://archive.org/details/sim_federal-register-find_2012-05-17_77_97",
    "license": "US government work; public domain",
    "accessed": "2026-10-16",
    "notes": "pp. 29456-29457 (leaves n259-n260): \"to abandon approximately 2.61 miles of rail line between milepost 0.0 near the intersection of Clement Avenue and Broadway and milepost 2.61 near Constitution Way\"; \"No local traffic has moved over the line for at least 2 years\"; \"this exemption will be effective on June 16, 2012\". p. 29456 read on the page image; p. 29457 text layer only."
  },
  {
    "id": "fr-1975-08-07-ab89",
    "title": "Federal Register 40(153), August 7, 1975: ICC AB 89 (Sub-No. 1), Alameda Belt Line abandonment",
    "publisher": "Office of the Federal Register",
    "date": "1975-08-07",
    "type": "official",
    "url": "https://archive.org/details/sim_federal-register-find_1975-08-07_40_153",
    "license": "US government work; public domain",
    "accessed": "2026-10-16",
    "notes": "p. 33311 (leaf n123): \"In the matter of Alameda Belt Line, abandonment in the City of Alameda, County of Alameda\"; environmental notice only, the track is not described. Text layer only."
  },
  {
    "id": "trains-1941-08",
    "title": "Trains 1(10), August 1941: \"Alameda Belt Line\"",
    "publisher": "Kalmbach Publishing Co.",
    "date": "1941-08",
    "type": "journal",
    "url": "https://archive.org/details/trains-magazine-vol-1-no-10-aug-1941-images",
    "license": "Copyright status unknown (railfan periodical, 1941); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "pp. 41-43: interchange \"with the Southern Pacific on the island, and with Santa Fe and Western Pacific by ferry\"; \"In 1938 new track was built west to the naval base on man-made land to the west\"; also says the Belt Line was formed and built \"In 1930\", which the Railroad Commission and ICC records contradict. Text layer only."
  },
  {
    "id": "crc-d27383",
    "title": "Railroad Commission of California, Decision No. 27383 (Application No. 19600): Key System, Ltd. mortgage on its Outer Harbor tracks",
    "publisher": "Railroad Commission of the State of California",
    "date": "1934-09-24",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D27383_19340924_A19600.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: Port of Oakland Resolution No. 1928 of December 15, 1930 let Key System, Ltd. \"construct certain tracks in the outer harbor area of the City of Oakland connecting with applicant's main line\"; the tracks \"now are owned and operated by applicant\". p. 2: cost $158,877.43 advanced by the WP and Santa Fe; tracks \"a total of 14,500.68 feet\" including a 14th Street dock spur, \"including roadbed and overhead trolley system\". Read on the page images, October 16, 2026."
  },
  {
    "id": "crc-d27770",
    "title": "Railroad Commission of California, Decision No. 27770 (Application No. 19822): Key System, Ltd. leases its non-freight lines to Key Terminal Railway, Ltd.",
    "publisher": "Railroad Commission of the State of California",
    "date": "1935-02-25",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D27770_19350225_A19822.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: filed February 7, 1935; Key System, Ltd. \"asks permission to lease its lines and properties, except such as are exclusively devoted to freight service, to Key Terminal Railway, Ltd.\"; Key System, Ltd. \"is also engaged to a certain extent in the transportation of freight\". p. 4: \"the authority herein granted shall become effective March 1, 1935\"; dated the 25th day of February, 1935. Read on the page images, October 16, 2026."
  },
  {
    "id": "crc-d30868",
    "title": "Railroad Commission of California, Decision No. 30868 (Application No. 19600, first supplemental order): Oakland Terminal Railroad Co. (formerly Key System, Ltd.)",
    "publisher": "Railroad Commission of the State of California",
    "date": "1938-05-16",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D30868_19380516_A19600.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: \"OAKLAND TERMINAL RAILROAD CO. (whose name was formerly Key System, Ltd.)\"; certain mortgaged trackage \"has been removed because of the work of the construction of the Bridge Railway facilities by the California Toll Bridge Authority and other trackage has been constructed by said Authority in lieu thereof\". Read on the page image, October 16, 2026."
  },
  {
    "id": "ca-dpw-bay-bridge-report-1937",
    "title": "Fourth Annual Progress Report, San Francisco-Oakland Bay Bridge, July 1, 1937",
    "publisher": "California State Printing Office (Department of Public Works)",
    "date": "1937-07-01",
    "type": "official",
    "url": "https://archive.org/details/annualprogressre1937unse",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 70 (leaf n76), East Bay Storage Yard: the work involves \"the shifting of the main Key System tracks, as well as those of the freight subsidiary of the Key System, the Oakland Terminal Railroad\"; fill shipped \"to the Oakland Terminal tracks, located on the present Key Mole\". Read on the page image, October 16, 2026."
  },
  {
    "id": "ca-dpw-bay-bridge-report-1938",
    "title": "Fifth Annual Report, San Francisco-Oakland Bay Bridge, July 1, 1938",
    "publisher": "California State Printing Office (Department of Public Works)",
    "date": "1938-07-01",
    "type": "official",
    "url": "https://archive.org/details/annualreportsanf1938unse",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 47 (leaf n51), East Bay Yard (Contract R-21): \"It was also required that the Oakland Terminal Railroad, a Key System subsidiary, be relocated.\" Read on the page image. The Southern Pacific overhead was \"designed to carry the Interurban Electric westbound trains over Key System's eastbound tracks and the Oakland Terminal Railroad's freight tracks\" (text layer; page not checked)."
  },
  {
    "id": "traffic-world-1943-02-20",
    "title": "Traffic World 71(8), February 20, 1943: \"Oakland Terminal Railway operation\" (ICC Finance Nos. 14115 and 14116)",
    "publisher": "The Traffic World",
    "date": "1943-02-20",
    "type": "journal",
    "url": "https://archive.org/details/sim_traffic-world_1943-02-20_71_8",
    "accessed": "2026-10-16",
    "notes": "p. 416 (leaf n15): \"a freight switching railroad serving points in the City of Oakland and the Town of Emeryville, Calif.\"; purchase price $161,000; \"the Oakland Terminal Railroad outer harbor district trackage and appurtenances built in 1931, as subsequently relocated\". Read on the page image, October 16, 2026."
  },
  {
    "id": "railway-age-1943-07-03",
    "title": "Railway Age 115(1), July 3, 1943: \"Oakland Terminal begins operations July 1\"",
    "publisher": "Simmons-Boardman Publishing Corporation",
    "date": "1943-07-03",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1943-07-03_115_1",
    "accessed": "2026-10-16",
    "notes": "p. 35 (leaf n40): the Oakland Terminal Railway \"took over, on July 1, all freight operations heretofore conducted by the Oakland Terminal Railroad Company, one of the Key System companies\"; it serves the Oakland Port of Embarkation and the Army General Depot in the Outer Harbor and \"certain industries located on Key System tracks in Inner Oakland\"; the ICC: \"The new company will have the benefit of the bridge route\"; operating offices at 1501 Yerba Buena Avenue. Read on the page image, October 16, 2026."
  },
  {
    "id": "crc-d36427",
    "title": "Railroad Commission of California, Decision No. 36427 (Application No. 25539): Oakland Terminal Railroad Co. sells its freight business to The Oakland Terminal Railway; merger into Key System",
    "publisher": "Railroad Commission of the State of California",
    "date": "1943-06-08",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D36427_19430608_A25539.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 2: properties \"devoted exclusively to freight purposes, consisting principally of switching tracks in the Outer Harbor District of Oakland\"; \"various industrial spur tracks and trackage rights over the lines now leased to and operated by Key System in passenger service\"; \"title to the Fortieth Street Line extending from a point near Adeline Street and Fortieth Street to a point near Fortieth Street and Broadway … to afford a connection with the Sacramento Northern Railway\". p. 3: ICC decision of May 26, 1943; OTR track shown in Exhibit 2 (not in the PDF). p. 6: dated June 8, 1943. Read on the page images, October 16, 2026."
  },
  {
    "id": "cpuc-d53801",
    "title": "Public Utilities Commission of California, Decision No. 53801 (Application No. 38249): Western Pacific and The Oakland Terminal Railway, line along Union Street, Oakland",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1956-09-25",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D53801_19560925_A38249.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: \"authorized to construct a line of railroad along Union Street, crossing Twelfth, Tenth, Eighth, Seventh, and Fifth Streets and across Third, Union and Magnolia Streets and across the Twelfth Street line of Key System Transit Lines\"; crossings 16B-0.41, 16B-0.30, 16B-0.01; p. 2: 16B-0.10, 16B-0.17, 4-6.22-C, 4-6.28-C, 4-6.44-C; Key's \"12th Street Line between Union and Poplar Streets\"; ICC required work to start by October 1, 1956; dated September 25, 1956. Read on the page images, October 16, 2026."
  },
  {
    "id": "cpuc-d55545",
    "title": "Public Utilities Commission of California, Decision No. 55545 (Case No. 5900): grade crossings on the Key System's Poplar and Louise Street line used by The Oakland Terminal Railway",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1957-09-10",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D55545_19570910_C5900.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 2: the WP's Outer Harbor connection \"was made over the 'C' line tracks of the Key System Transit Lines from 40th and Shafter in Oakland to the Outer Harbor\"; SN asked the ICC on November 30, 1955 to abandon 40th and Shafter - Lafayette. p. 3: the new line connects the WP \"in the vicinity of First and Magnolia Streets\" with Key tracks \"at Twelfth and Union Streets\"; \"The Union Street line was completed and placed in operation in April of 1957.\" p. 4: Key tracks \"from Tower No. 2 at Yerba Buena Avenue and Louise Street along the center of Louise Street to Poplar Street, thence along the center of Poplar Street to 12th Street\"; OTR switches industries on Poplar St and West Grand Ave; \"W. P. Transfer\" trains only 6:30 p.m. to 6:00 a.m. under Ordinance No. 4276 C.M.S. of November 10, 1953. p. 12: dated September 10, 1957. Read on the page images, October 16, 2026."
  },
  {
    "id": "cpuc-d52754",
    "title": "Public Utilities Commission of California, Decision No. 52754 (Application No. 37449): Cypress Street viaduct crossings over SP, Santa Fe and Oakland Terminal Railway tracks",
    "publisher": "Public Utilities Commission of the State of California",
    "date": "1956-03-13",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D52754_19560313_A37449.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "p. 1: a temporary detour crossing \"over the tracks of The Atchison, Topeka and Santa Fe Railway Company, Southern Pacific Company, and The Oakland Terminal Railway\" (portion of Crossing No. 2K-12.63-AC), location by exhibits only. Text layer only."
  },
  {
    "id": "western-railroader-1956-08",
    "title": "The Western Railroader 19(10), August 1956: \"I.C.C. approves Sacramento Northern abandonment\"",
    "publisher": "The Western Railroader",
    "date": "1956-08",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1956-08_19_10",
    "license": "Copyright status unknown (railfan periodical, 1956); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "Page Eight (leaf n7): \"The Oakland Terminal will abandon service from Yerba Buena yards to 40th & Shafter over the Key System. The new 2-mile line will run from the Key System tracks at 12th and Poplar over Union Street to the Western Pacific tracks at Third and Union.\" Read on the page image, October 16, 2026."
  },
  {
    "id": "western-railroader-1957-03",
    "title": "The Western Railroader 20(5), March 1957: Sacramento Northern abandonment and the Union Street line",
    "publisher": "The Western Railroader",
    "date": "1957-03",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1957-03_20_5",
    "license": "Copyright status unknown (railfan periodical, 1957); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "Page Thirteen (leaf n13): \"Abandonment of the Sacramento Northern from Lafayette into Oakland appears set for March 1 with the completion of the Union Street line of the Oakland Terminal Railroad.\" Text layer only."
  },
  {
    "id": "western-railroader-1952-01",
    "title": "The Western Railroader 15(3), January 1952: Oakland Terminal Railway's Union Street franchise application",
    "publisher": "The Western Railroader",
    "date": "1952-01",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1952-01_15_3",
    "license": "Copyright status unknown (railfan periodical, 1952); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "Page Five (leaf n5), a reprinted newspaper item: \"a single track along Union Street from the Key System 'A' line at 12th Street to Fifth Street, hence over Western Pacific property for two blocks, crossing Third and Magnolia Streets to connect with the Western Pacific Railroad mainline on First Street.\" Text layer only."
  },
  {
    "id": "orinda-sun-1953-10-02",
    "title": "Orinda Sun, October 2, 1953: the Union Street franchise and the Sacramento Northern",
    "publisher": "Orinda Sun",
    "date": "1953-10-02",
    "type": "primary_document",
    "url": "https://archive.org/details/caorihs_000290",
    "license": "Copyright status unknown; cited for facts only",
    "accessed": "2026-10-16",
    "notes": "Leaf n0: \"a franchise for four-tenths of a mile of track on Union Street, from 12th Street south to Fifth Street\"; franchise applied for in January 1952; leaf n2: WP's list includes \"Elimination of freight train operations on 40th Street\". Text layer only."
  },
  {
    "id": "caltrans-state-rail-plan-2013",
    "title": "California State Rail Plan 2013",
    "publisher": "California Department of Transportation",
    "date": "2013-10",
    "type": "official",
    "url": "https://archive.org/details/california-state-rail-plan-2013",
    "license": "Public domain mark (archive.org item)",
    "accessed": "2026-10-16",
    "notes": "p. 52 (leaf n51), C.2.4: \"The Oakland Terminal Railway (OTR) is a terminal railroad associated with the Port of Oakland. It operates 10 miles of switching track in West Oakland, performing switching activities for both UPRR and BNSF.\" Text layer only."
  }
]
```

Notes to append to existing entries:

- `cpuc-d49307`: "p. 2: \"Remaining portions of the 'A' and 'B' rail lines from Yerba Buena Avenue along Poplar Street and
  West Grand Avenue, it is alleged, are subject to retention by Oakland Terminal Railways for freight
  operations upon applicant's abandonment of rail passenger service.\" Read on the page image, October 16, 2026."
- `cpuc-d54242`: "p. 23: \"Key System proposes to remove all its remaining trackage, except that jointly used by The
  Oakland Terminal Railway\". Read on the page image, October 16, 2026."
- `cscrm-2021-02-001466`: "p. 18 (leaf n16): SP crossings \"Alameda, Belt line bet'n West Alameda and Pacific Ave.\" and
  \"bet'n Eagle Ave. and Tynan\" (text layer)."

Cited in the tables but not proposed as entries (pointers or context only): *Traffic World* 1925-10-10 and
1943-02-27, 1943-05-29; *Western Railroader* 1940-03, 1942-12, 1945-12; *East Bay Labor Journal* 1935-03-29
(copyrighted; facts only); CRC D16792, D24002, D24291, D32419; Federal Register 2016-06-20; DTIC ADA322210;
*United States Daily* 1929-04-26; the Railroad Commission's bound volumes 26, 28, 30 and 31 (the decision
PDFs above are the citable copies).
