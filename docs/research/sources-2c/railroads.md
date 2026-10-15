# Research 2: Bay Area steam railroads — identifiers, opening dates, passenger ends

Gathered Oct 15, 2026 (second pass). Builds on `docs/research/early-railroads.md` and
`docs/research/leads-2c/railroads.md`.

## How this pass worked, and how far to trust it

- **archive.org full texts were read** through `https://archive.org/stream/<id>/<id>_djvu.txt`
  (the `<pre>` block). `advancedsearch.php` and `metadata/<id>` work.
- **archive.org page images could NOT be opened.** `/download/`, `page/nN.jpg` and IIIF redirect
  to data hosts (`dnNNNNNN.ca.archive.org`) that the proxy refuses. So **no quote below is [img]**;
  every archive.org quote is **[ocr]**. Printed page numbers were read from the running heads in
  the OCR text (e.g. "UNDER THE STARS AND STRIPES. 435"), which is reliable for the page but not a
  substitute for an image check. Leaf numbers could not be determined (the `_page_numbers.json`
  and scandata are on the blocked hosts); each citation gives an archive.org URL by printed page
  (`/details/<id>/page/<printed page>/`), which archive.org resolves to the right leaf.
- **CPUC / Railroad Commission decisions** were downloaded as PDFs from files.cpuc.ca.gov and
  read with `pdftotext -layout`. Their quotes are the PDF's text layer (OCR of the scan) — [ocr];
  where noted, the text was checked against a rendered page image of the PDF ([img]).
- OCR spellings are kept inside quotes except for obvious letter-level OCR noise ("tliat" →
  "that"), which is silently corrected; "…" marks omissions.

**Tags:** [P] primary; [O] official; [C] contemporary compiled history (county histories, *Poor's
Manual*, the Railroad Commissioners' reports); [W] pointer only; [img] checked on a page image;
[ocr] OCR text only.

---

## Task 1. County histories: archive.org identifiers and page confirmations

All of these are public domain (published 1876–1883; archive.org metadata
`possible-copyright-status: NOT_IN_COPYRIGHT` for Halley; the others are pre-1929 US imprints).

| Book | archive.org identifier (used here) | Other scans of the same edition |
|---|---|---|
| Halley, *The Centennial Year Book of Alameda County* (Oakland, 1876) | `centennialyearbo00hall` | `centennialyearb00hall`, `centennialyearbo0000unse` |
| [Wood / Munro-Fraser], *History of Alameda County, California* (Oakland: M. W. Wood, 1883) | `historyofalamed00munr` | `historyofalameda00munr`, `historyofalameda00unse`, `cu31924028881188` |
| [Munro-Fraser], *History of Contra Costa County, California* (San Francisco: W. A. Slocum, 1882) | `historyofcontrco00munrrich` | `historyofcontrac00munr` |
| [Munro-Fraser], *History of Marin County, California* (San Francisco: Alley, Bowen & Co., 1880) | `historyofmarinco00munr` | — |
| [Munro-Fraser], *History of Sonoma County* (San Francisco: Alley, Bowen & Co., 1880) | `historyofsonomac00alle` | `cu31924028882771` |
| [Palmer], *History of Napa and Lake Counties, California* (San Francisco: Slocum, Bowen & Co., 1881) | `historyofnapalak00palm` | `historyofireland00rowa` (mis-titled identifier, same book) |
| [Munro-Fraser], *History of Solano County* (San Francisco: Wood, Alley & Co., 1879) | `historyofsolanoc00munr` | `historyofsolanoc01munr` |

### Page confirmations (every quote [C][ocr]; page = printed page from the running head)

| Fact in `early-railroads.md` | Book, page | Verdict | Quote (OCR, ≤ 40 words) |
|---|---|---|---|
| SF&O first trip 1863-09-02, wharf to Broadway | Halley p. 177 | **Confirmed** (Halley calls it the "Oakland and San Francisco Ferry Railroad") | "The first trip made by the cars on the Oakland and San Francisco Ferry Railroad was made on the 2d day of September, 1863. At that date the road was completed from the end of the wharf to Broadway" |
| Same, in Wood | Wood p. 627 | **Confirmed** (second source) | "on September 2, 1863, the first train of cars passed over the line, the track being completed from the end of the wharf to Broadway" |
| SF&A construction began 1864-06-23 | Halley p. 190 | **Confirmed** (was [W] only) | "On the 23d day of June was commenced the building of the San Francisco and Alameda Railroad … landed at the company's wharf, at Alameda Point" |
| SF&A trial trip 1864-08-13; to High St 1864-08-25 | Halley p. 190 (chapter for 1864) | **Confirmed** | "A trial trip was made over the San Francisco and Alameda Railroad on Saturday, August 13th … On the 25th of August the cars were run on the road as far as High Street" |
| SF&A to San Leandro 1865-03-01 | Halley pp. 197–198 (chapter for 1865) | **Confirmed** | "the laying of the track finished on the first day of March, and the first trip made by boat and cars from San Francisco to San Leandro in an hour and a quarter" |
| SF&A to Haywards 1865-08-25 | Halley p. 198 | **Confirmed.** The two "25th of August" are in different chapters (1864 on p. 190, 1865 on p. 198): not an OCR repeat | "The contract for the completion of the road from San Leandro to Haywards (five miles) was given out in April … and on the 25th of August the line was completed." |
| SF&O to Larue's Wharf 1865-04-01 | Halley p. 200; Wood p. 628 | **Confirmed** (two sources) | Halley: "On the 1st of April the Oakland Railroad was extended to Larue's Wharf, in Brooklyn, beyond which it did not extend until purchased by the Central Pacific". Wood: "On April 1, 1865, the 'local line' was extended to Larue's wharf, at San Antonio (Brooklyn)" |
| WP first through train at San Leandro, Mon 1869-09-06 | Halley p. 279 | **Confirmed** | "There was much rejoicing at San Leandro on the arrival there of the first train of the Western Pacific Railroad, through from Sacramento, on Monday evening, September 6th." |
| Last rail 1869-10-29; first through passenger train from Oakland Point 1869-11-08 | Halley pp. 280–281 | **Confirmed** | p. 280: "The last rail of the Pacific Railroad was laid on the 29th of October, in Oakland"; p. 281: "of November, the first passenger through train started from Oakland Point, at half past eight o'clock in the morning, stopping a moment at Broadway station." |
| Long wharf "completed, in January, 1871" | Wood p. 630 | **Confirmed** | "ready for use as soon as the new wharf was completed, in January, 1871, when the freight and passenger business of the company's roads was concentrated at that point." |
| Mole begun June 1879, completed 1881 | Wood pp. 630–631 | **Confirmed**; p. 631 adds the depot "was opened with a grand ball in February, 1881" | "In June, 1879, was commenced, and in 1881 was completed the Oakland Pier, or Mole. It is one and twenty-sixth hundredths miles in length" |
| Alameda ferry abandoned 1873-09-29 | Wood p. 630 | **Confirmed**, with the route of the new 1873 line (see §2) | "the Alameda ferry was abandoned … The new track was completed and boats and trains commenced making half-hourly trips on September 29, 1873" |
| SPC Alameda–Los Gatos regular service 1878-06-01 | Wood p. 833 | **Confirmed** | "On June 1, 1878, the cars began to run regularly between Alameda and Los Gatos, Santa Clara County, connecting with the ferry between Alameda Point and San Francisco." |
| Oakland Point to the Willows, 1876-07-27 | Halley p. 435 | **Confirmed**, but note the company name and length | "The first section of the Berkeley or Bay Shore Railroad was inaugurated on the 27th of July, the distance being two miles, from Oakland Point to the Willows." |
| CP through Antioch 1878-09-09 | Contra Costa (1882) p. 491 | **Confirmed** | "completing their line from Oakland to Tracy, the first train passed through Antioch September 9, 1878." |
| Port Costa ferry slip, 1879 | Contra Costa (1882) p. 415 | **Year confirmed**; no day | "The Ferry-boat Slip was completed in the year 1879, and is a splendid piece of workmanship, while the Solano itself is one of these truly gigantic boats" |
| NPC "first opened January, 1875" | Marin (1880) p. 147 | **Confirmed** | "The road was first opened January, 1875." |
| NPC to Duncan's Mills "winter of 1876-7" | Marin (1880) p. 148 | **Confirmed** | "The road was finished to its destined terminus on Russian river in the winter of 1876-7." |
| NPC formal opening (new) | Marin (1880) p. 333 | **New: day found** | "The formal opening of the North Pacific Coast Railroad took place on Thursday, January 7, 1875 … from Saucelito to Tomales." |
| San Rafael & San Quentin first trip 1870-03-21 | Marin (1880) p. 333 | **Confirmed** | "on Monday, March 21, 1870, the initiatory trip was made, since when the line has been in working order" |
| SF&NP Petaluma–Santa Rosa, October 1870 | Sonoma (1880) p. 301 | **Confirmed** (month only) | "the road to Santa Rosa was completed in October, and a passenger car at once put on the route." |
| SF&NP Cloverdale 1872 | Marin (1880) p. 146 (not Sonoma pp. 301–302) | **Confirmed, but the page was wrong**: the Cloverdale year is in the Marin history | "was commenced in the year 1869, and was completed to its present terminus at Cloverdale in 1872." |
| Napa Valley RR Soscol–Napa first train 1865-07-11 | Napa & Lake (1881) p. 76 | **Confirmed** | "The rolling-stock did not arrive until about July 1, 1865, and on the 11th of that month the first train passed over the track." |
| Napa Valley RR to Calistoga, October 1868 | Napa & Lake (1881) p. 80 | **Confirmed** (month only) | "In October, 1868, the road was completed to Calistoga, and a grand excursion was had." |
| California Pacific dates | Solano (1879) | **Not in this book.** The Solano history gives the 1868 act and the company's origins (p. 117) but no opening dates | — |

**Archive URLs by printed page** (archive.org resolves these to the leaf):
`https://archive.org/details/centennialyearbo00hall/page/435/`,
`https://archive.org/details/historyofalamed00munr/page/630/`,
`https://archive.org/details/historyofcontrco00munrrich/page/491/`,
`https://archive.org/details/historyofmarinco00munr/page/333/`,
`https://archive.org/details/historyofsonomac00alle/page/301/`,
`https://archive.org/details/historyofnapalak00palm/page/76/`, and so on for the pages above.

---

## 1. North Pacific Coast (narrow gauge), San Francisco & North Pacific, and their NWP successors

Corporate line (sourced): NPC chartered 1871-12-16 (*Poor's* 1885 p. 870 [C][ocr]); leased the
San Rafael & San Quentin from 1875-03-11 (same). SF&NP incorporated 1877-06-29 by consolidation
(*Poor's* 1885 p. 874). SP's acquisition of the SPC on 1887-07-01 and the Northwestern Pacific's
formation (1907) are outside these sources except as noted; NWP is the operator in every CRC
decision below.

### Facts

| Stretch | Event | Date | Source | id / URL | Page | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| San Rafael – San Quentin (SR&SQ) | First trip | 1870-03-21 (Mon) | *History of Marin County* (1880) | `historyofmarinco00munr` | 333 | "on Monday, March 21, 1870, the initiatory trip was made, since when the line has been in working order" | [C][ocr] |
| same | Opened (conflict) | "March, 1871" | *Poor's Manual* 1885 (vol. 18) | `poorsmanualofrai18newyuoft` | 871 | "Chartered February 25, 1869 ; road opened in March, 1871. Leased, March 11, 1875, to N. P. C. RR. Co." | [C][ocr] — **conflict, 1870 vs 1871** |
| NPC Tomales: first freight train | — | 1874-12-03 | Marin (1880) | `historyofmarinco00munr` | 411–412 | "The first train to take goods left the warehouse on December 3, 1874" (Tomales–boats on Tomales Bay, before the line reached San Rafael) | [C][ocr] |
| NPC Saucelito – Tomales | Formal opening | **1875-01-07** (Thu) | Marin (1880) | same | 333 | "The formal opening of the North Pacific Coast Railroad took place on Thursday, January 7, 1875 … over the entire length of the road, from Saucelito to Tomales." | [C][ocr] |
| same | "first opened" | January 1875 | Marin (1880) | same | 147 | "The road was first opened January, 1875." | [C][ocr] |
| NPC: first through shipment via San Rafael | — | 1875-01-08 | Marin (1880) | same | 412 | "The first shipment made over the road to San Francisco via San Rafael was on January 8, 1875" | [C][ocr] |
| NPC: Tomales – Howard's (Occidental) | First passenger train | **1876-10-16** | *History of Sonoma County* (1880) | `historyofsonomac00alle` | 201 | "That same year the railroad reached this point, and the first passenger train arrived here October 16, 1876." | [C][ocr] |
| NPC: to Duncan's Mills (Russian River) | Finished | winter 1876–77 | Marin (1880) | `historyofmarinco00munr` | 148 | "The road was finished to its destined terminus on Russian river in the winter of 1876-7." | [C][ocr] |
| same | Opened | **1877-05-15** | *Poor's Manual* 1900 (vol. 33) | `poorsmanualrail00poorgoog` | 606 (OCR head; verify) | "History. — Chartered Dec. 16, 1871 ; road opened to Duncan's, May 15, 1877." | [C][ocr] |
| NPC network, 1884 | Snapshot | 1883–84 | *Poor's* 1885 | `poorsmanualofrai18newyuoft` | 870 | "Saucelito, Cal., to Duncan's Mills, Cal 74.25 miles. San Rafael Branch : Junction, Cal., to San Rafael, Cal 2.00 miles." | [C][ocr] |
| NPC network, 1899 | Snapshot | 1899 | *Poor's* 1900 | `poorsmanualrail00poorgoog` | 606 | "Main Line — San Francisco to Cazadero, Cal. (ferry, 6 m.; RR., 80.75 m.) … San Rafael Branch … Mill Valley Branch … Leased : San Rafael and San Quentin RR." | [C][ocr] |
| NWP Guerneville branch: Cazadero | Passenger business still existed | 1928 (12 months to Nov 30) | CRC D21112 (A15344), 1929-05-16 | files.cpuc.ca.gov …/Decisions_D11601_to_D25900/D21112_19290516_A15344.pdf | p. 1 | "Cazadero … is the terminal of the Guerneville Branch … Revenue from passenger tickets sold … $972.15" | [O][ocr] |
| NWP narrow gauge **Point Reyes – Monte Rio** | ICC-authorized abandonment; **operation ceased** | **1930-04-03** | CRC D22672 (A15517), 1930-07-14 | …/Decisions_D11601_to_D25900/D22672_19300714_A15517.pdf | p. 5 | "the Interstate Commerce Commission, by its Decision in Finance Docket No. 7302, authorized the abandonment of the narrow gauge line … between Point Reyes and Monte Rio, and operation thereof ceased on April 3, 1930." | [O][img] |
| same (substitute bus) | Bus Tomales–Monte Rio–Petaluma established; then abandoned | bus from 1930-08-01; abandonment authorized "on or before January 31, 1931" | CRC D23284 (A15517), 1931-01-13 | …/D23284_19310113_A15517.pdf | pp. 1–2 | "It was established August 1, 1930 … authorized to abandon, on or before January 31, 1931, all of its schedules and operations between Petaluma and Monte Rio" | [O][ocr] (a bus, not rail) |
| NWP **Manor – Point Reyes** (ex-NPC, standard gauge after 1920 [W]) | Passenger and mixed trains: discontinuance authorized | order 1933-01-09 (effective that day) | CRC D25533 (A18587) | …/Decisions_D11601_to_D25900/D25533_19330109_A18587.pdf | p. 2 | "authority to discontinue the operation of all passenger and mixed train service between Manor and Point Reyes, Marin County, coincident with the establishment of passenger stage service by Pacific Greyhound Lines" | [O][img] |
| same | **Last day of steam trains** | trains to 1933-07-31; discontinued **1933-08-01** | CRC D34457 (A24059), 1941-07-29 | …/Decisions_D25901_to_D40599/D34457_19410729_A24059.pdf | p. 2 | "Prior to August 1, 1933 service under the fares applicant seeks to cancel were performed by steam train. On that date … applicant discontinued operations between Point Reyes and Manor." | [O][img] |
| NWP main line: local trains San Francisco (Sausalito) – Santa Rosa / Ukiah | Some trains discontinued; two through trains each way remain | order 1935-05-20; done **1935-06-12** | CRC D27973 (A19844); D34457 p. 2 | …/D27973_19350520_A19844.pdf | D27973 p. 3; D34457 p. 2 | D34457: "On June 12, 1935, applicant discontinued certain passenger trains serving main line points between Ukiah and San Francisco and branch line points between Kenwood and Ignacio." | [O][img] (D34457) |
| NWP **Ignacio – Kenwood** (Sonoma Valley branch) | **All passenger service ended** | order 1935-05-20; done 1935-06-12 | CRC D27973 | as above | p. 3 | "Branch line between Ignacio and Kenwood: Northbound, 140 and 142, daily, and Southbound, 141 and 143, daily, being the only passenger service on said railroad branch line" | [O][ocr] |
| NWP Guerneville branch | Passenger trains still running | 1935-05 | CRC D27973 | as above | p. 2 | "there will still remain in service two trains in each direction between San Francisco and Eureka, as well as trains on the Guerneville Branch." | [O][ocr] |
| NWP **Sausalito – San Rafael**, electric interurban and Sausalito ferry | All service ended | **1941-03-01** | CRC D34457 | as above | p. 2 | "The pooling arrangement was canceled March 1, 1941 at which time applicant also discontinued all service on its interurban electric line between Sausalito and San Rafael and on its ferry route between Sausalito and San Francisco." | [O][img] (already `crc-d34457` in the repo) |
| NWP **San Rafael – Sausalito**, steam trains 1–4 | Discontinuance of "all regular passenger service" authorized | order **1941-09-10**, effective 10 days later (1941-09-20) | CRC D34571 (A24370) | …/Decisions_D25901_to_D40599/D34571_19410910_A24370.pdf | pp. 1, 3 | p. 3: "to discontinue all regular passenger service between San Rafael and Sausalito, all in the County of Marin … The effective date of this order shall be ten (10) days from the date hereof." | [O][img] |
| same, context | Passengers bused SF–Sausalito already | 1941 | D34571 | as above | p. 1 | "Passengers are transported between San Francisco and Sausalito by the stages of Pacific Greyhound Lines, and are transferred at this latter point to the trains." | [O][ocr] |
| NWP **San Rafael – Eureka** | Daily overnight trains replaced by tri-weekly daytime trains | order dated 1956 (file name 1956-05-01; D66194 recites "June 2, 1956") | CPUC D52991 (A37294) | …/Decisions_D40600_to_D57800/D52991_19560501_A37294.pdf | last page | "authorized to discontinue regular daily overnight passenger service between San Rafael and Eureka … provided that it substitute therefor triweekly daytime passenger service" | [O][ocr] |
| NWP **San Rafael – Willits** (trains 3, 4) | **Discontinuance authorized** (end of passenger trains south of Willits) | order **1958-10-21** | CPUC D57488 (A39660); recited in D66194 (1963-10-22) | …/D57488_19581021_A39660.pdf | order, item 1 | "Northwestern Pacific Railroad Company … is hereby authorized to discontinue the operation of Trains Nos. 3 and 4 between San Rafael and Willits and intermediate points." | [O][ocr]. The last day (1958-11-10 per [W]) is **not** in the order; D57488 required the railroad to notify the date within 30 days |
| NWP Sausalito – Tiburon/Belvedere | Ferry *Marin* replaced by bus | order 1933-12-04 | CRC D26596 (A18953) | …/D26596_19331204_A18953.pdf | p. 1 | "permission to discontinue its ferry service between Sausalito, Tiburon and Belvedere … conducted by the Motorship 'Marin.'" | [O][ocr] — implies no Tiburon rail passenger service by 1933; the rail end itself is **unsourced** |
| NWP ferries, 1925 | Snapshot | 1925 | CRC D14726 (C2040), 1925-04-01 | …/D14726_19250401_C2040.pdf | p. 1 | "a ferry system between Sausalito and San Francisco, and Sausalito and Tiburon … the San Francisco terminal at the foot of Market Street" | [O][ocr] |

#### San Francisco & North Pacific (standard gauge): opening dates per stretch

| Stretch | Date | Source | id | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Petaluma – Santa Rosa (built Aug–Oct 1870) | completed October 1870; inaugural excursion SF–Santa Rosa 1870-12-31 | *History of Sonoma County* (1880) | `historyofsonomac00alle` | 301–302 | p. 301: "the road to Santa Rosa was completed in October, and a passenger car at once put on the route"; p. 302: "tickets were issued for an inaugural excursion from San Francisco to Santa Rosa on the last day of the year 1870" | [C][ocr] |
| Donahue – Santa Rosa (23 mi) | "January 1, 1870" (sic) | *Poor's* 1885 | `poorsmanualofrai18newyuoft` | 874 | "Road opened from Donahue to Santa Rosa (23 miles) January 1, 1870 ; to Windsor (9 miles) March 1, 1871 ; to Grant's (4 miles) April 10, 1871 ; to Healdsburg (2 miles) July 1, 1871" | [C][ocr]. **Conflict**: Sonoma history has the road built Aug–Oct 1870, so Poor's "1870" is probably a slip for **1871-01-01** (the day after the excursion). Not resolved |
| Santa Rosa – Windsor | 1871-03-01 | *Poor's* 1885 | same | 874 | (above) | [C][ocr] |
| Windsor – Grant's | 1871-04-10 | same | same | 874 | (above) | [C][ocr] |
| Grant's – Healdsburg | 1871-07-01 | same | same | 874 | (above) | [C][ocr] |
| Healdsburg – Cloverdale (18 mi) | 1872-04-15 | same | same | 874 | "and to Cloverdale (18 miles) April 15, 1872." | [C][ocr]; year agrees with Marin (1880) p. 146: "completed to its present terminus at Cloverdale in 1872" |
| Fulton – Guerneville branch (16 mi) | 1876-05-29 | same | same | 874 | "The Guerneville Branch was opened May 29, 1876" | [C][ocr] |
| San Rafael – Junction (Petaluma), 20.5 mi ("Petaluma Branch") | 1879-06-02 | same | same | 874 | "and the Petaluma Branch June 2, 1879." | [C][ocr] |
| Point Tiburon – San Rafael (9 mi, leased) | in the main line by 1886; opening day **unsourced** | *Poor's* 1887 (vol. 20) | `poorsmanualofrai20newyuoft` | 873 | "Main Line of Road. — Point Tiburon, Cal., to Cloverdale, Cal 84.50 miles … Included in main line is a section of nine miles, Point Tiburon to San Rafael, leased." | [C][ocr] |
| Sonoma Valley RR (3 ft): Sonoma Landing – Sonoma; Sonoma – Santa Rosa | 1880-08-23; 1882-08-15 | *Poor's* 1885 | `poorsmanualofrai18newyuoft` | 875 | "The Sonoma Valley RR. Co. was incorporated July 24, 1878 ; road opened August 23, 1880. The Sonoma and Santa Rosa RR. was opened August 15, 1882." | [C][ocr] (predecessor of NWP's Sonoma Valley branch; whether the 1935 Ignacio–Kenwood branch follows it is not sourced) |

#### The railroads' own returns to the Board of Railroad Commissioners ("opened for public use")

| Road | Stretch | Opened | Source | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| NPC | Sausalito – Tomales | **1875-01-11** | 10th report (`annualreportboa54commgoog`); also the 10th report's prose history (`annualreportboa05unkngoog`, p. 18, right edge cropped) | 154 | "From Sausalito to Tomales … Jan. 11,1875." Prose: "San Francisco to Tomales January 11, 18[75]" | [C][ocr]. The formal opening was 1875-01-07 (Marin p. 333); Jan 11 is the start of public service |
| NPC | Tomales – Howards | **1876-10-16** | same | 154 | ".Oct. 16, 1876" | [C][ocr]; agrees with Sonoma (1880) p. 201 |
| NPC | Howards – Tyrone | **1877-04-02** | same | 154 | "April 2, 1877." | [C][ocr] |
| NPC | Tyrone – Duncans (Mills) | **1877-05-15** | same | 154 | ".May 15, 1877." | [C][ocr]; agrees with *Poor's* 1900 |
| NPC | Duncans – Cazadero | April 1886 (day cropped: "April 1?, 18[86]"); operated under a 10-year lease "from April 1, 1[886]" | 10th report prose (`annualreportboa05unkngoog`) | 18 | "Duncans to Cazadero April II, 19 … that from Duncans to Cazadero, under one of ten years, from April 1, 1" | [C][ocr], right edge cropped; year 1886 agrees with [W] |
| SF&NP | Donahue – Santa Rosa … Petaluma – San Rafael | as in the table above | 9th report (`annualreportboa05unkngoog`, SF&NP return); 10th report | 9th p. 198; 10th p. 121 | 9th: "Prom Donahue to Santa Rosa Jan. 1, 1870 … Prom Petaluma to San Rafael June 2, 1879." | [C][ocr]; same dates as *Poor's* (including "1870") |
| SF&NP | **San Rafael – Tiburon** | **1885-05-01** | 10th report SF&NP return (column-split OCR, paired by order; the other eight rows match the 9th report) | 121 | Rows "From San Rafael to Tiburon" … "May" … "1, 1885." | [C][ocr]. **Conflict** with [W] "1884" |
| SF&NP | Ignacio – Sears Point (Marin & Napa RR, 7.5 mi) | **1888-06-01** | same; prose: "the Marin and Napa Railroad, built in 1888 from [Igna]cio to Sears Point, 7.5 miles" | 121 | Rows "From Ignacio to Sears Point" … "June" … "1, 1888." | [C][ocr] |

### Route and stations at a dated snapshot

- **NPC, 1877–80** (Marin 1880 pp. 147–148 [C][ocr]): ferry San Francisco – Saucelito (freight)
  and San Francisco – San Quentin (passengers); San Quentin branch "leaves the main line two
  miles north of San Rafael"; main line through Ross valley "by Fairfax and Pacheco, to the
  summit, known as White Hill" (tunnel 1,300 ft), down San Geronimo creek to Nicasio, then
  Tomales; tunnel 1,700 ft into Sonoma County; Valley Ford, Bodega Corners depot, Freestone,
  Howard's (Occidental), then Duncan's Mills on the Russian River.
- **SF&NP, 1884** (*Poor's* 1885 p. 874): Donahue – Petaluma – Santa Rosa – Windsor – Grant's –
  Healdsburg – Cloverdale (56 mi); Fulton – Guerneville (16 mi); San Rafael – Junction (Petaluma)
  (20.5 mi); ferry Donahue – San Francisco (34 mi). **1886**: main line Point Tiburon – Cloverdale
  84.5 mi (*Poor's* 1887 p. 873).

### Today's track vs gone

- **SMART** runs San Rafael – Novato – Petaluma – Santa Rosa – Windsor (and Larkspur). That it
  uses the 1879 Petaluma Branch and the 1870–71 SF&NP alignment is **not stated in any source read
  here**; decide by geometry (buffer test against today's rail).
- **Gone** (passenger): Point Reyes – Monte Rio (1930-04-03), Manor – Point Reyes (1933-08-01),
  Ignacio – Kenwood (1935-06-12), Sausalito – San Rafael electric (1941-03-01) and steam
  (authorized 1941-09-10), San Rafael – Willits (authorized 1958-10-21). The Guerneville branch's
  passenger end and Tiburon's rail passenger end are **unsourced**.

### Conflicts

1. SR&SQ opening: 1870-03-21 (Marin 1880 p. 333) vs "March, 1871" (*Poor's* 1885 p. 871).
2. SF&NP Donahue – Santa Rosa: Oct 1870 / excursion 1870-12-31 (Sonoma 1880) vs "January 1, 1870"
   (*Poor's* 1885, probably for 1871).
3. NPC to Duncan's Mills: winter 1876–77 (Marin) vs 1877-05-15 (*Poor's* 1900). Sonoma (1880)
   p. 249 says "in 1877, the North Pacific Coast … had reached the Russian River". Taking
   1877-05-15 as the opening for public use is defensible; "winter" may be track completion.
4. Narrow-gauge end: CRC D22672 "operation thereof ceased on April 3, 1930" vs [W] "last
   narrow-gauge run … March 29, 1930". The CRC is official; use 1930-04-03 (operation ceased),
   with the [W] date as a possible last regular run.

### For Matthew (North Bay)

- The Guerneville-branch (Fulton – Monte Rio – Cazadero) passenger end: not found in a CRC
  decision (the [W] pointer says 1935–36). A bulk scan of CRC decisions 1935-06 to 1936-12 for
  "Guerneville" would settle it (the method used here for 1932–33 works; see the notes at the end).
- Tiburon rail passenger end: pointers say 1909 (NWP moved trains to Sausalito); unsourced.
- ICC Finance Docket 7302 (1930) is cited by D22672; the printed ICC report would give the exact
  abandoned segment.
- D57488's actual last-run date was to be reported to the Commission in writing; the CPUC's
  formal file for A39660 (not online) would have it.

---

## 2. Central Pacific and the 1862 Western Pacific; Northern Railway (Oakland – Martinez – Port Costa / Benicia)

**Key new source:** the California Board of Railroad Commissioners' annual reports, whose company
returns include a table "Date when the road or portions thereof were opened for public use".
- *Fourteenth Annual Report* (18 months to 1894-06-30), `annualreportboa00caligoog`: the tables
  print each stretch and its date **on one line**, so the pairing is safe. Used as the main
  reading. Pages are the company-report pages printed in the running heads.
- *Tenth Annual Report* (company returns for 1888, published 1889), `annualreportboa54commgoog`:
  same tables, but the OCR splits columns (stretches, then months, then days); pairing by order
  agrees with the 14th report, so it is used only as a cross-check.
- The volume `annualreportboa05unkngoog` binds the 9th–12th reports and includes a prose
  "brief history of each of these lines" (10th report, pp. 9–19), used for the Northern
  Railway.

### Corporate succession (now sourced)

| Event | Date | Source | Page | Quote | Tags |
|---|---|---|---|---|---|
| WP and San Francisco Bay RR consolidated | 1869-11-02 (articles); announced Oct 28, 1869 | 14th report, CP return; Halley | CP p. 26; Halley pp. 279–280 | 14th: "Western Pacific Railroad Company, … San Francisco Bay Railroad Company, consolidated November 2, 1869." Halley: "Notice was given at Sacramento, 28th of October, that the Western Pacific Railroad and San Francisco Bay Railroad had amalgamated" | [C][ocr] |
| WP takes over the Oakland ferry ("local line") | from 1869-11-01 (announced) | Halley | 280 | "on the 1st of November the Western Pacific R. R. Co. would take formal possession of the Oakland Ferry" | [C][ocr] |
| CP of California + WP consolidated | 1870-06-23 (executed June 22) | 14th report; Halley | CP p. 26; Halley p. 296 | Halley: "articles of association, amalgamation and consolidation of the Central Pacific of California with the Western Pacific Railroad, under the name of Central Pacific Railroad, executed June 22d" | [C][ocr] |
| SF&O + SF, Alameda & Haywards → "San Francisco, Oakland and Alameda RR" | July 1, 1870 (Halley) or June 29, 1870 (14th report) | Halley; 14th report | Halley p. 295; CP p. 26 | Halley: "consolidated July 1st, under the name of the S. F. O. & A. R. R. Co., to form a continuous line from San Francisco to Haywards" | [C][ocr] — **conflict by two days** |
| CP, C&O, SFO&A, SJ Valley → Central Pacific RR | 1870-08-22 | 14th report | CP p. 26 | "The above four roads were consolidated August 22, 1870, under the name of the Central Pacific Railroad Company." | [C][ocr] |
| CP leased to Southern Pacific Co. (operator) | 1885-04-01 | *Poor's* 1900 | 616–617 | "of the Central Pacific lines, 1,649.86 miles, on April 1, 1885" | [C][ocr] |
| Northern Railway organized; consolidated with branch companies | 1871-07-19; 1888-05-15 | 10th report narrative | 10–11 | "This road was organized July 19, 1871 … On May 15, 1888, the Northern Railway was consolidated with … Berkeley Branch Railroad, forming the Northern Railway Company." | [C][ocr] |

### Facts: openings and ends

| Stretch | Event | Date | Source | id | Page | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| WP San José – Vallejo's Mills (Niles) – Alameda Cañon | Graded 20 mi; "in working order within four months" | report of early 1866 | Halley | `centennialyearbo00hall` | 207–208 | "Grading of twenty miles of the road had been completed. In the Alameda Canon were through cuts of over sixty feet in depth … that twenty miles of the road would be in working order within four months" | [C][ocr]. The 1866 opening **day** is still unsourced (NPS gives the year) |
| Sacramento – Galt – Lodi – Stockton (WP) | Opened for public use | Galt 1869-05-15; Lodi 1869-08-04; Stockton 1869-08-14 | 14th report, CP return | `annualreportboa00caligoog` | CP p. 31 | "To Gait May 15, 1869. To Lodi August 4, 1869. To Stockton August 14, 1869." | [C][ocr] ("Lodi … 1889" is an OCR slip; the 10th and 9th reports read 1869) |
| Sacramento – Niles – San José | Opened for public use | 1869-09-15 (9th and 10th reports) or 09-16 (14th) | CP returns | `annualreportboa05unkngoog`; `annualreportboa00caligoog` | 9th: line "Sacramento to San José Sept 15, 1869"; 14th CP p. 31 | "Prom Sacramento to San Jose Sept 15, 1869" | [C][ocr] |
| Sacramento – Niles – San Leandro – (SF&A) – Alameda Wharf | First through train at San Leandro | **1869-09-06** (Mon) | Halley | `centennialyearbo00hall` | 279 | "the arrival there of the first train of the Western Pacific Railroad, through from Sacramento, on Monday evening, September 6th." | [C][ocr] |
| same | Opened for public use | **1869-09-08** | CP returns (9th, 10th, 14th) | as above | 14th CP p. 31 | "To Alameda Wharf September 8, 1869." (9th: "Prom Sacramento to Alameda Wharf Sept 8, 1869") | [C][ocr] |
| San Leandro – Oakland: last rail; first locomotive into Oakland | — | **1869-10-29** | Halley | same | 280 | "The last rail of the Pacific Railroad was laid on the 29th of October, in Oakland, and the first locomotive of the line entered that city at five minutes after 10 o'clock A. M." | [C][ocr] |
| Oakland Point (over the SF&O on Seventh St) | First through passenger train | **1869-11-08** | Halley | same | 280–281 | "the first passenger through train started from Oakland Point, at half past eight o'clock in the morning, stopping a moment at Broadway station." | [C][ocr] |
| "Sacramento to San Francisco" | Opened for public use | "About December 1, 1869" | CP returns | as above | 14th CP p. 31 | "To San Francisco _ _ About December 1, 1869." | [C][ocr] — **conflict** with Halley's Nov 8 (perhaps the formal through-ticketing date) |
| WP route Oakland – San Leandro, Nov 1869 | Junction with the SF&A at **Simpson's Station** (Brooklyn Township), ~3 mi west of San Leandro | 1869-11-14 | Halley (quoting the *Alameda County Gazette*) | same | 283–284 | "at Simpson's Station, Brooklyn Township … The Alameda train passed San Leandro Station … and was due at Simpson's, the junction of the two roads, at 8:55. The Eastward-bound train of the Western Pacific Railroad left Oakland wharf at 8:30" | [C][ocr]. So in Nov 1869 overland trains ran Oakland wharf – (SF Bay RR) – Simpson's – SF&A track – San Leandro. The separate San Leandro – Melrose line of 1870-05-15 stays [W] |
| Oakland Long Wharf | Completed; business concentrated there | January 1871 | Wood (1883) | `historyofalamed00munr` | 630 | "as soon as the new wharf was completed, in January, 1871, when the freight and passenger business of the company's roads was concentrated at that point." | [C][ocr] |
| 1873 line: 2nd track Railroad Ave & Seventh St (Bay St – Harrison St) and branch to Mastick Station, Alameda (3.79 mi), crossing the main line at First & Alice Sts | Half-hourly trains begin; Alameda ferry abandoned | **1873-09-29** | Wood (1883) | same | 630 | "a second track through Railroad Avenue and Seventh Street, Oakland, from Bay Street to Harrison Street, and a branch thence to Mastick Station, Alameda, was built. This branch crossed the main line at the intersection of First and Alice Streets" | [C][ocr] |
| Oakland Mole and depot | Begun June 1879; completed 1881; depot opened with a ball February 1881 | 1881 | Wood (1883) | same | 630–631 | p. 631: "This noble depot … was opened with a grand ball in February, 1881" | [C][ocr]. HABS's 1882-01-22 is [x] (unread); **conflict** stays |
| CP Oakland/Alameda branch lengths | Snapshot | 1872 and 1881 | Wood (1883) | same | 631 | "Oakland Wharf to East Oakland 6 miles [1872], 5.67 [1881] … Oakland Point to Mastick — 3.82 … Alameda Wharf to Melrose (Haywards) 17 [1872], 5.19 [1881] … Fruit Vale Connection … 2.01" | [C][ocr]: by 1881 the old SF&A line ran only Alameda Wharf – Melrose |
| Oakland Point – the Willows (2 mi), "Berkeley or Bay Shore Railroad" | First section inaugurated | 1876-07-27 | Halley | `centennialyearbo00hall` | 435 | "The first section of the Berkeley or Bay Shore Railroad was inaugurated on the 27th of July, the distance being two miles, from Oakland Point to the Willows." | [C][ocr] |
| Northern Ry: West Oakland – Shell Mound | Opened for public use | **1876-08-16** | 10th report narrative; 10th report table; 14th report table ("August 17, 1886", OCR) | `annualreportboa05unkngoog`; `annualreportboa54commgoog`; `annualreportboa00caligoog` | narrative pp. 10–11; 10th table p. 57; 14th NR p. 46 | "From West Oakland to Shell Mound [the] road was opened August 16, 1876; to Martinez, January 9, 1878; to S[uisun], December 28, 1879, joining there the California Pacific Railroad" | [C][ocr]. Two readings give Aug 16, 1876; the 14th's "17 … 1886" is OCR noise |
| Northern Ry: Shell Mound – Martinez | Opened for public use | **1878-01-09** | same three | same | same | (above) | [C][ocr]. [W]'s "first train 1877-09-22" is a construction/first-train date, not this |
| Martinez – Antioch – Tracy (CP) | First train through Antioch | 1878-09-09 | *History of Contra Costa County* (1882) | `historyofcontrco00munrrich` | 491 | "completing their line from Oakland to Tracy, the first train passed through Antioch September 9, 1878." | [C][ocr] |
| Port Costa – Benicia train ferry (*Solano*) and Benicia – Suisun | Opened for public use | **1879-12-28** | 10th report narrative and tables; 14th report | as above | narrative pp. 10–11; 14th NR p. 46 | 14th: "From Benicia to Suisun December 28, 1879." Narrative: "At Port Costa extensive wharves were built, and a ferry established to transfer freight and passenger trains across the Straits of Carquinez to Benicia. For that p[urpose] the steamer 'Solano' was constructed" | [C][ocr]. **Resolves** [W]'s Dec 6 vs Dec 28: the railroad's own return says Dec 28 |
| Port Costa ferry slip | Completed | 1879 | Contra Costa (1882) | `historyofcontrco00munrrich` | 415 | "The Ferry-boat Slip was completed in the year 1879" | [C][ocr] |
| West Oakland – Port Costa second track | In operation | 1888-11-01 | 10th report narrative | `annualreportboa05unkngoog` | 11 | "the increase in traffic between West Oakland [and] Port Costa necessitated the construction of a second track, which was completed and put in operation November 1, 1888." | [C][ocr] |
| Shell Mound – Berkeley – Berrymans (Berkeley Branch RR) | Opened for public use | Shell Mound – Berkeley **1876-08-16**; Berkeley – Berrymans **1878-07-01** | 9th report (Berkeley Branch RR return) and 14th report (NR p. 46) agree; the 10th (p. 57, column-split OCR) reads "Dec. 16, 1876" and "May 1, 1878" | `annualreportboa05unkngoog`; `annualreportboa00caligoog` | 14th NR p. 46 | 14th: "From Shell Mound to Berkeley August 16, 1876, From Berkeley to Berrymans - July 1, 1878." 9th: "Aug. 16, 1876 … July 1, 1878 … 3.8363 miles" | [C][ocr]. The same return lists a grade crossing with the "California and Nevada Narrow Gauge at Adeline Street" |
| Benicia ferry | Replaced by the Martinez – Benicia bridge | bridge opened 1930-10-15; last ferry trip **unsourced** | *SP Bulletin* Nov–Dec 1930 (in `early-railroads.md`) | — | — | — | [P][ocr] |
| Vallejo Junction – South Vallejo ferry (SP, ex-Cal. Pacific) | Discontinuance authorized | order 1929-06-10 (bus to start by 1929-08-01) | CRC D21194 | see §3 | p. 7 | "Ferry operated between Vallejo Junction and the City of Vallejo" | [O][img] |

### Network snapshot, c. 1889 (10th report narrative, pp. 9–11 [C][ocr])

Northern Railway mileage: "West Oakland to near Martinez", "Port Costa to Suisun", "Oakland —
Sixteenth Street to Delaware Street", "Oakland — Sixteenth Street to Berrymans", "Napa Junction to
Santa Rosa", plus lines outside the Bay Area. CP: "Niles to San Jose" and the "Oakland local lines"
and "Alameda local lines"; its ferries "make connection with all trains at the Oakland terminal
depot". *Poor's* 1900 (pp. 616–617) repeats this as SP Co. mileage: "West Oakland to near
Martinez", "Benicia to Suisun", "Ferry — Port Costa to Benicia … 1 m", "16th St., Oakland, to West
Berkeley 4.11", "16th St., Oakland, to Shell Mound", "Napa Junction to Calistoga", "Ferry — Vallejo
Jc. to Vallejo".

### Passenger ends (CP lines in the Bay Area)

- **Oakland, Alameda and Berkeley local lines:** electrified 1911–12, ended 1941 — already in
  `sp-east-bay.md` (CRC D33891, D34060, D34389, D34460).
- **Tracy – Livermore – Pleasanton – Niles – Hayward – Elmhurst (the 1869 WP line over Altamont
  and through Niles Canyon):** all regular passenger trains ended by **CRC D33781** (A23810),
  dated **1941-01-03**, effective 20 days later (**1941-01-23**) [O][img]:
  - p. 1: "Southern Pacific Company maintains … a line of railroad between Oakland Pier, Oakland, and
    Tracy, which passes through Elmhurst, Hayward, Niles, Pleasanton, Livermore … The only passenger
    trains running between Elmhurst and Tracy via this route are the two proposed to be discontinued"
    (trains 231 and 232);
  - p. 3: "authorized (a) to discontinue the operation of passenger trains Nos. 231 and 232 between
    Tracy and Oakland Pier, via Niles, and (b), to discontinue all regular passenger train service
    between Tracy and Elmhurst, via Niles";
  - p. 4: "Dated at San Francisco, California, this 3rd day of January, 1941." (D33830 of
    1941-01-21 calls it "dated January 5, 1941" — a minor conflict; the signed page says the 3rd.)
  - The track abandonments of 1984/1986 remain [W] (`leads-2c/railroads.md`).
- **Niles – Milpitas – San José (the 1866–69 WP line):** "all regular scheduled passenger service"
  ended by **CRC D32804** (A23211), dated **1940-02-13** [img: "Dated at San Francisco, California,
  this 13th day of February, 1940"], effective 10 days later (1940-02-23) [O][img]. p. 7: "III
  Discontinue all regular scheduled passenger service between Niles and San Jose via Milpitas".
  The same order (item II) ended "all regular scheduled passenger service between Newark and Niles
  via Centerville" (see §5).
- **Oakland Pier – Martinez locals:** CRC D32335 (A22916, 1939-09-19) [O][ocr] concerned
  discontinuing local trains 203, 205, 206 and 282 "operating between Martinez and Oakland Pier";
  through trains remained. Not an end of service on the line.
- **Oakland – Martinez – Port Costa – Benicia:** still a passenger route (Capitol Corridor; the
  ferry replaced by the 1930 bridge).

### Today's track vs gone

No source read here states stretch by stretch which 1869–79 alignments are under today's trains.
Recommendation unchanged: decide by geometry against today's rail. Sourced context only:
- the Oakland Mole, Long Wharf, Seventh St and Railroad/Lincoln Ave local lines are gone
  (`sp-east-bay.md`);
- the Benicia ferry is gone (bridge 1930).

### Conflicts

1. First trains vs "opened for public use": Alameda Wharf 1869-09-06 (Halley, first train) vs
   1869-09-08 (CP return). Use Sep 6 for "first train" and Sep 8 for the opening; they are
   different events.
2. Through to San Francisco: 1869-11-08 (Halley) vs "About December 1, 1869" (CP return).
3. San José: Sept 15 vs 16, 1869 (OCR; two of three readings give 15).
4. SFO&A consolidation: July 1 (Halley) vs June 29, 1870 (14th report).
5. Mole: 1881 (Wood) vs 1882-01-22 (HABS, unread).
6. Shell Mound – Berkeley and Berkeley – Berrymans: the 10th report's column-split OCR disagrees; two in-line readings (9th, 14th) agree on 1876-08-16 and 1878-07-01.

### For Matthew

- The **1866 opening day** of San José – Niles (Vallejo's Mills): not in Halley; try the
  *Sacramento Daily Union* 1866-10-03 (CDNC, blocked here) or the Board of Railroad Commissioners'
  first reports (1880), which archive.org does not seem to hold.
- When did the WP's own San Leandro – Melrose line open (1870-05-15 per [W])? Wood's 1872/1881
  branch table and the 1869 Simpson's junction are consistent with it, but no source states it.

---

## 3. California Pacific and the Napa Valley Railroad

### Facts

| Stretch | Event | Date | Source | id | Page | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| Napa Valley RR | Incorporated | 1864-03-02 | 14th report, Cal. Pacific return | `annualreportboa00caligoog` | Cal. Pac. return, "History" | "Napa Valley Railroad Company, incorporated March 2, 1864." | [C][ocr] |
| Soscol – Napa City | Track complete | by 1865-01-10 | *History of Napa and Lake Counties* (1881) | `historyofnapalak00palm` | 76 | "By January 10, 1865, the road was completed as to grading and track-laying from Soscol to Napa City." | [C][ocr] |
| same | **First train** | **1865-07-11** | same | same | 76 | "The rolling-stock did not arrive until about July 1, 1865, and on the 11th of that month the first train passed over the track." | [C][ocr] |
| Napa City streets (1865) | Route | 1865 | same | same | 76 | "The track entered Napa City by way of Main street, and was laid along that street to Third." | [C][ocr] |
| Soscol | Steamer connection | 1865 | same | same | 77 | "The trains ran to Soscol, where connection was made with a steamer for San Francisco." | [C][ocr] |
| Napa – Calistoga | Completed | **October 1868** (day unsourced) | same | same | 80 | "In October, 1868, the road was completed to Calistoga, and a grand excursion was had." | [C][ocr] |
| Napa Valley RR | Sold; Cal. Pacific management | 1869-05-27 | same | same | 80 | "May 27, 1869, the Napa Valley Railroad was sold to Messrs. Rulofson & Ryder, for the sum of $500,000, which put the road under the management of the California Pacific." | [C][ocr]. The 10th report says it was consolidated into the Cal. Pacific Extension on 1869-04-05 — different events |
| Napa: depot at Fourth & Main; route through East Napa | Re-routed | **1877-01-04** | same | same | 80 | "trains used to run up to the depot, at the corner of Fourth and Main streets, and then back down … Januaiy 4, 1877, the change to the present route through East Napa was made." | [C][ocr] |
| California Pacific: Vallejo – Sacramento; Napa Junction – Calistoga | Opened for public use | "At sundry dates in January [sic], 1868 and 1869, while in hands of contractors"; turned over January 1870 | 10th report, Cal. Pac. return | `annualreportboa54commgoog` | 63 | "* At sundry dates in January, 1868 and 1869, while in hands of contractors, who turned the road over to the railroad company January, 1870." | [C][ocr]. **No per-stretch dates in any report read**; the [W] timeline (Vallejo – Suisun 1868-06-24 etc.) stays a pointer |
| same | Turned over to the company; leased to CP | 1870-01-10; lease from 1876-07-01 | *Poor's* 1880 | `poorsmanualofr1880newyuoft` | 973 | "These roads were built by a construction company, and turned over to the RR. Co. January 10, 1870. — Leased from July 1, 1876, to July 1, 1905, to the Central Pacific RR. Co." | [C][ocr] |
| South Vallejo – San Francisco steamer | Ferry, 26.25 mi | 1879 | *Poor's* 1880 | same | 973 | "Steam Ferry, South Vallejo to San Francisco 26.25 miles." | [C][ocr] |
| Cal. Pacific consolidation | — | 1869-12-28 (*Poor's* 1880) or 1869-12-23 (14th and 10th reports) | as above | — | — | 14th: "Date of consolidation : December 23, 1869." | [C][ocr] — **conflict** |
| Network c. 1889 | Snapshot | 1889 | 10th report narrative | `annualreportboa05unkngoog` | 10 | "Vallejo Junction to Vallejo (ferry) 2.00 · Vallejo to Sacramento 60.39 · Davis to Knight's Landing 18.67 · Napa Junction to Calistoga 34.48" | [C][ocr]; the ferry Vallejo – Vallejo Junction connects "with the Northern Railway for San Francisco" |
| Napa Junction – Santa Rosa (Northern Ry) | Opened for public use | 1888-05-31 | 14th report, NR return | `annualreportboa00caligoog` | NR p. 46 | "From Napa Junction to Santa Rosa May 31, 1888." | [C][ocr] |
| **Vallejo – Napa – Calistoga**, SP trains 154/157 (the only round trip); **Vallejo – Suisun-Fairfield**, trains 166–173; **Vallejo Junction – Vallejo ferry** | **Discontinuance authorized**, motor-coach substitute to begin by 1929-08-01 | order **1929-06-10**, effective 20 days later | CRC D21194 (A14085, A14086, A14758, A14760, A14898) | …/Decisions_D11601_to_D25900/D21194_19290610_A14085.pdf | p. 7 | "authorized to discontinue the operation of ferry and trains … A. Ferry operated between Vallejo Junction and the City of Vallejo, B. Trains Nos. 154 and 157, operated between Vallejo, Napa and Calistoga, C. Trains Nos. 166-167, 168-169, 170-171 and 172-173, operated between Vallejo and Suisun-Fairfield" | [O][img] |

### Stations at a dated snapshot (1929)

CRC D21194 p. 7 [O][img] lists the SP passenger stations the substitute coaches had to serve, which
were the stations of the discontinued trains: "South Vallejo, North Vallejo Wharf, Flosden, Napa
Junction, Kelly, Napa-Suisun Forks (Sacramento Junction), Napa, Union, Oak Knoll, Truebody,
Yountville, Oakville, Rutherford, Zinfandel, St. Helena, Larkmead, Calistoga, Creston, Cordelia,
Thomasson, Subeet [sic] and Suisun". D21194 p. 4 also says SP "operated branch lines from Vallejo
north, one having its terminus at Santa Rosa, another at Calistoga, and another at
Suisun-Fairfield" and that Calistoga had "one round trip" of SP plus the electric San Francisco,
Napa and Calistoga Railway.

### Today's track vs gone

- **Suisun – Davis – Sacramento:** today's Capitol Corridor runs between these places, but no
  source here says it is the 1868 California Pacific alignment; decide by geometry.
- **Vallejo – Napa – Calistoga, Vallejo – Suisun:** no regular passenger trains after 1929
  (D21194). Napa Valley Wine Train is excursion service, outside the GTFS network [W].

### Conflicts and For Matthew

1. Cal. Pacific consolidation Dec 23 vs Dec 28, 1869; Napa Valley RR "sold" May 27, 1869 vs
   consolidated April 5, 1869.
2. **Per-stretch California Pacific dates (1868–70) are still unsourced.** The railroad itself
   told the Commissioners it had no detailed record ("at sundry dates"). Best remaining sources:
   the *Daily Alta* / *Sacramento Daily Union* of 1868-06-25, 1868-08-25, 1868-11-16 and January
   1870 (CDNC, blocked here); the 1869 "Map of California Pacific Railroad".

---

## 4. Santa Fe at Point Richmond and its Ferry Point ferry (1900–1933)

| Stretch | Event | Date | Source | id / URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|---|
| Stockton – Point Richmond (Ferry Point) | First overland passenger service | 1900-07-01 | *SF Call*, Jul 2, 1900 (in `early-railroads.md`) | Chronicling America (blocked here) | p. 3 | — | [P][ocr] (carried over) |
| Ferry Point – San Francisco ferry | Santa Fe's own ferries end; trains to SP at Oakland Mole | 1933-04-23 ([W]) | Wikipedia "Ferry Point"; search-tool extract of abandonedrails.com: ICC docket "9543, filed 7/23/1932 … to abandon ferry boat and rail operations between Richmond Depot and San Francisco" | — | — | — | [W]. **The order is federal**: an ICC Finance Docket (probably FD 9543). Not found on archive.org (the ICC Reports volumes of 1932–33 are not there) |
| same | **Negative result**: no Railroad Commission order | — | Bulk scan of all 1,158 CRC decisions dated 1932-07-01 to 1933-06-30 (first two pages of each), searched for ferry/terry/boat/steamer with Richmond or Santa Fe/Atchison | files.cpuc.ca.gov | — | — | [O] negative: the change did not go through the CRC in that window |
| Santa Fe bus SF – Oakland – Richmond (Santa Fe Transportation Co.) | Certificated; then abandoned (service moved to rail to Emeryville) | certificate D29029 (1936-08-03); abandonment D31370 (1938-10-17) | CRC D31370 (A22174) | …/Decisions_D25901_to_D40599/D31370_19381017_A22174.pdf | p. 1 | "it will be more economical and more convenient … to have such highway common carrier service … carried over its rails to and from Emeryville" | [O][ocr]. A bus, not the ferry |

**For Matthew:** the 1933 ferry order is an ICC matter. Its text would be in *Interstate Commerce
Commission Reports* (Finance Reports) for 1932–33 (HathiTrust, which is blocked here), under
"Atchison, Topeka & Santa Fe Ry. Co. Abandonment" or FD 9543. Until then, 1933-04-23 is a [W] date.

---

## 5. South Pacific Coast (narrow gauge) and the California & Nevada

### SPC corporate succession (sourced)

14th report, SPC return, "History" [C][ocr] (`annualreportboa00caligoog`): South Pacific Coast
Railway "Date of organization : May 21, 1887", consolidating the Santa Cruz and Felton RR (inc.
1874-11-12), South Pacific Coast Railway (1876-03-29), Bay and Coast RR (1877-05-02), Oakland
Township RR (1881-01-07), San Francisco and Colorado River RR (1883-01-16), Felton and Pescadero RR
(1883-06-13) and Alameda Branch RR (1887-04-16); "Carrier operating the road of this company:
Southern Pacific Company." *Poor's* 1900 pp. 616–617: SP Co. acquired "the South Pacific Coast
Ry., 104 miles, on July 1, 1887".

### SPC openings ("opened for public use")

Three readings: 9th report p. 293 (`annualreportboa05unkngoog`), 10th report p. 146
(`annualreportboa54commgoog`), 14th report SPC return p. 35–36 (`annualreportboa00caligoog`). All
three print stretch and date per line. Where they differ, the majority is taken. All [C][ocr].

| Stretch | Opened | Readings (9th / 10th / 14th) | Quote (14th unless noted) |
|---|---|---|---|
| Santa Cruz – Felton (Santa Cruz & Felton RR) | **1875-10-13** | 1875 / 1875 / 1876 | 9th: "From Santa Cruz to Felton.— Oct. 13,1875." |
| **Alameda Point – Los Gatos** (via Newark, San José) | **1878-06-01** | all three; also Wood (1883) p. 833 | "From Alameda Point to Los Gatos June 1, 1878." |
| Los Gatos – Alma | **1878-08-01** | all three | "From Los Gatos to Alma August 1, 1878." |
| Alma – Wrights | **1879-05-01** | all three | "From Alma to Wrights May 1, 1879." |
| Wrights – Felton (through to Santa Cruz) | **1880-05-15** | 15 / 15 / 16 | 9th: "From Wrights to Felton May 15,1880." |
| **Alameda Point – Twelfth and Webster Sts, Oakland** (Oakland branch over the Webster St bridge) | **1881-05-30** | all three | "From Alameda Point to Twelfth and Webster Streets, Oakland May 30, 1881." |
| Twelfth and Webster – Fourteenth and Franklin Sts, Oakland | **1886-10-01** | 10th only (9th line cut off; not in the 14th) | 10th: "From Twelfth and Webster Streets, Oakland, to Fourteenth and Franklin Streets, Oakland … Oct. 1, 1886" (column-split OCR; pairing by order) |
| Newark – Centerville | **1882-02-18** | all three | "From Newark to Centreville February 18, 1882." |
| **Alameda Mole – Alameda Point** | **1884-03-15** | all three | "From Alameda Mole to Alameda Point March 15, 1884." |
| Felton Junction – Boulder Creek | **1885-05-01** | 1885 / 1885 / 1886 | 9th: "From Pelton Junction to Bowlder Creek May 1,1885." |
| Campbells – (New) Almaden | **1886-06-15** | 15 / 15(?) / 16 | 9th: "From Campbells to Almaden. June 15. 1886." |

Earlier, unscheduled steps (Wood 1883 [C][ocr], `historyofalamed00munr`):
- **1876, Dumbarton Point:** p. 833: "in a few weeks the track was laid and construction trains
  were running a distance of several miles from Dumbarton Point towards San Jose. At the Point
  was a spacious wharf". Construction trains only; no public service date.
- **1877, Alameda:** p. 391: a franchise "to what is now known as the South Pacific Coast Railroad
  Company, in 1877"; p. 392: "The last item of interest in the year 1877 is the initial trip of
  the South Pacific Coast Railroad, in the shape of an excursion which took place on December 2d."
- **Oakland terminus:** pp. 632–633: "afterwards crossing it by Webster-street Bridge and locating
  its terminus at the corner of Twelfth and Webster Streets, in the city of Oakland."
- **Newark, 1883:** p. 832: "about twenty-eight miles from San Francisco on the line of the South
  Pacific Coast Railroad".

Network c. 1899 (*Poor's* 1900 pp. 616–617 [C][ocr]): "Alameda to Santa Cruz 77.6 · Alameda Jc.
to 14th St., Oakland 1.8 · Newark to Centerville 3.0 · Campbells to New Almaden 9.6 · Felton to
Boulder Creek 7.3 · … Ferry — San Fran. to Alameda 3 m."

### SPC passenger ends found

| Stretch | Event | Date | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|---|
| **Newark – Centerville – Niles** | "all regular scheduled passenger service" ended | order **1940-02-13**, effective 10 days later | CRC D32804 (A23211) | …/Decisions_D25901_to_D40599/D32804_19400213_A23211.pdf | p. 7 | "II Discontinue all regular scheduled passenger service between Newark and Niles via Centerville" | [O][img] |
| Oakland Pier – San José **via Newark** (ex-SPC Newark – Santa Clara – San José) | Still two SP schedules each way in 1940 | 1940-01 | same | same | p. 1 | "Applicant now operates two schedules via Newark and one schedule via Niles daily from Oakland Pier to San Jose" | [O][ocr]. The end of these trains is **not found** |
| Alameda Pier and the Oakland branch (electrified 1911) | Ended 1941 | — | `sp-east-bay.md` (CRC D33891 etc.) | — | — | — | [O], already in the repo |
| SP Harrison St drawbridge services (14th & Franklin – Alameda Pier; crosstown) | 1921 abandonment application **denied** | 1921-08-30 | CRC D9428 (A6560) | …/Decisions_D24_to_D11600/D9428_19210830_A6560.pdf | p. 16 | "IT IS HEREBY ORDERED that the application should be and hereby is denied without prejudice." | [O][ocr] |
| Los Gatos – Santa Cruz (mountain line) | Storm damage 1940-02-26; Los Gatos – Olympia abandoned 1940-11-07 | 1940 | santacruztrains.com and others (search extracts) | — | — | — | [W] only; the ICC/CRC orders were not found |

### California & Nevada (3 ft gauge)

| Fact | Date | Source | id | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Oakland – "a point 4 miles beyond San Pablo", 22 mi; begun 1884; "formally opened in March, 1885"; in 1891 still "in contractor's hands" | 1885-03 | *Poor's Manual* 1891 (vol. 24) | `poorsmanualofrai24newyuoft` | 83 | "In 1884 construction was begun, and toward the close of that year the line was completed to San Pablo … and formally opened in March, 1885 … No operations other than transportation of construction materials." | [C][ocr] — **Poor's says no public operation as of 1891** |
| Extended toward Orinda; branch "Orinda Park to Bryant, Cal., 2.5 m."; leased to the Oakland and San Francisco Terminal Co. | by 1893–94 | *Poor's* 1894 (vol. 27) | `poorsmanualofrai27newyuoft` | ~263 (OCR badly cropped) | "Projected from Oakland, Cal., eastward to Bodie … Orinda Park to Bryant, Cal., 2.5 m." | [C][ocr], low-quality OCR |
| Grade crossings with SP lines | 1888 | 9th report: Berkeley Branch RR return; Northern Ry return | `annualreportboa05unkngoog` | — | "California and Nevada Narrow Gauge at Adeline Street." / "California and Nevada Railroad at Emery." | [C][ocr]: fixes two points of the C&N route (Adeline St, Berkeley; Emeryville) |

No C&N passenger service, timetable or end date was found; Poor's 1891 suggests there was none
then. **Do not draw the C&N as a passenger line** without a timetable.

### For Matthew (SPC, C&N)

- The end of SP passenger trains Oakland Pier – Newark – San José (ex-SPC) after 1940: a CRC/CPUC
  bulk scan of 1940-03 to 1945 for "Newark" would find it (method below).
- Los Gatos – Santa Cruz (1940): ICC Finance Docket order; not on archive.org.
- C&N: *Poor's* 1886–1890 or the *Daily Alta* 1885-03 for whether it ever carried the public.

---

## 6. SP branches: San Ramon, Napa (see §3), Dumbarton Cutoff

| Stretch | Event | Date | Source | id / URL | Page | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| Avon – San Ramon (San Ramon Valley RR) | Opened for public use | **June 1891** (day not reliable in OCR; month and year align) | 14th report, SP RR Co. return | `annualreportboa00caligoog` | SP p. 24 | Table row "Branch from Avon to San Ramon" … "June" … "1891" (column-split OCR) | [C][ocr]; the City of San Ramon's 1891-06-07 first regular trip [O] is consistent |
| same | In SP mileage | 1899 | *Poor's* 1900 | `poorsmanualrail00poorgoog` | 616–617 | "Avon to San Ramon 20.860" | [C][ocr] |
| **Avon – San Ramon: mixed trains 444/445 (the branch's passenger service)** | **Abandonment authorized**, effective the date of the order | **1934-02-26** | CRC D26834 (A19269) | …/Decisions_D25901_to_D40599/D26834_19340226_A19269.pdf | pp. 1–2 | p. 2: "authorized to abandon the operation of mixed trains Nos. 444 and 445 between Avon and San Ramon on its San Ramon Branch … and to cancel … all passenger tariffs and time tables at stations affected" | [O][img] |
| same, context | Trains ran Tuesdays and Fridays; "two passengers were handled in a forty-two day test period" | filed 1934-01-20 | same | same | p. 1 | "said mixed trains operate on two days a week, namely, Tuesdays and Fridays … two passengers were handled in a forty-two day test period" | [O][ocr] |
| Danville agency | Closure application | 1933-06-05 | CRC D26032 (A18817) | …/D26032_19330605_A18817.pdf | p. 1 | "an order authorizing it to close its agency at Danville Station" | [O][ocr] |
| **Conflict** | — | "December 1934" | *Sanders v. EBMUD* (1993) [O][x] (in `leads-2c`) | — | — | — | The CRC order is Feb 1934; the court's "December 1934" may be the last freight-only change or an error. **Use 1934-02-26 (authorized) and flag the last run as unsourced** |
| San Ramon – Radum | Passenger service | — | — | — | — | — | **Unsourced**: D26834 names only Avon – San Ramon |
| Dumbarton Cutoff (Niles/Newark – Redwood City) | Passenger service | 1911/1912 to c. 1918 | Bay Rail Alliance; search extracts | — | — | — | [W] only. No CRC decision found (one targeted search). Freight from Sept 1910 (SF Call, LA Herald) [P][ocr] |
| Napa / Calistoga | Passenger end | 1929 | CRC D21194 | see §3 | p. 7 | — | [O][img] |

---

## 7. The SF & San José's Fourth Street line in San José

Nothing new beyond `early-railroads.md`: CRC D3351 (1916) describes the route ("enters the City
from the northwest near the end of Autumn Street … follows Fourth Street … to Reed Street") and
the *SP Bulletin* (Jan 1936, p. 7 [P][img]) gives the change: new line "opened to traffic at 12:01
a.m., December 31" (1935); "All traffic has ceased over the old line." Additional checks this
pass:
- The 14th Commissioners' report (SP RR Co. return, p. 24) opens the SF&SJ as "From San Francisco
  to Menlo Park … October 17, 1863" and "to San José … January 16, 1864" (month/day/year columns
  align for these first rows) [C][ocr] — agreeing with the 1864–65 directory.
- A scan of CRC decision captions from 1933-07 to 1935-03 found no order on the San José
  relocation; it may be later in 1935 (not scanned).

---

## 8. Today's track vs gone (all railroads)

No source read in this pass states, stretch by stretch, that a 19th-century alignment is under a
present-day passenger service. What the sources do establish is when **passenger service** ended
on each stretch; whether the **track** is still there is a separate question. Summary:

| Stretch | Passenger service ended | Basis | Today (unsourced unless noted) |
|---|---|---|---|
| SF&SJ, SF – San Bruno via Bernal/Ocean View | 1928/1930 | CRC D20459, D22212 (`early-railroads.md`) | Gone; BART/I-280 reuse parts [W] |
| SF&SJ, San Bruno – Santa Clara | — (never ended) | — | Caltrain corridor (`early-railroads.md`, Caltrain [O]) |
| SF&SJ Fourth St, San José | 1935-12-30 | *SP Bulletin* Jan 1936 | Gone |
| WP 1869 Niles – Milpitas – San José | 1940 (order 1940-02-13) | CRC D32804 [img] | Geometry test (Capitol Corridor uses a Niles – San José route; which one is not sourced) |
| WP 1869 Tracy – Altamont – Livermore – Niles Canyon – Niles – Hayward – Elmhurst | 1941 (order 1941-01-03, eff. 1941-01-23) | CRC D33781 [img] | Niles Canyon: heritage railway since 1988 [W]; Altamont: track removed 1984/86 [W]; ACE uses the 1909 WP line [W]; Elmhurst – Niles: geometry test |
| SPC Newark – Centerville – Niles | 1940 (order 1940-02-13) | CRC D32804 [img] | Geometry test |
| SPC Oakland Pier – Newark – San José | after 1940 (date not found) | D32804 (still 2 trains in 1940) | Geometry test |
| SPC/CP Alameda and Oakland local lines | 1941 | `sp-east-bay.md` | Gone |
| SPC Los Gatos – Santa Cruz | 1940 [W] | — | Gone through the mountains [W] |
| Northern Ry Oakland – Martinez; Port Costa – Benicia ferry | ferry replaced 1930 | *SP Bulletin* 1930 | Capitol Corridor runs Oakland – Martinez (alignment by geometry) |
| Cal. Pacific Vallejo – Napa – Calistoga; Vallejo – Suisun | 1929 (order 1929-06-10) | CRC D21194 [img] | No regular passenger trains |
| Cal. Pacific Suisun – Davis – Sacramento | — | — | Capitol Corridor (alignment by geometry) |
| NPC Point Reyes – Monte Rio (3 ft) | 1930-04-03 | CRC D22672 [img] | Gone |
| NWP Manor – Point Reyes | 1933-08-01 | CRC D34457 [img], D25533 [img] | Gone |
| NWP Ignacio – Kenwood | 1935-06-12 | CRC D27973, D34457 [img] | Gone (passenger) |
| NWP Sausalito – San Rafael (electric) | 1941-03-01 | CRC D34457 [img] | Gone |
| NWP San Rafael – Sausalito (steam) | 1941 (order 1941-09-10) | CRC D34571 [img] | Gone |
| NWP San Rafael – Petaluma – Santa Rosa – Willits | 1958 (order 1958-10-21) | CPUC D57488 [ocr] | SMART runs Larkspur – San Rafael – Windsor today (the project's present-era GTFS) — alignment by geometry |
| SP San Ramon branch | 1934 (order 1934-02-26) | CRC D26834 [img] | Gone (Iron Horse Trail [W]) |
| Santa Fe Ferry Point ferry | 1933-04-23 [W] | ICC (not found) | Gone |

**Recommendation (unchanged):** mark "today's track" by a geometric buffer test of each traced
historic segment against today's rail (GTFS shapes, Overture rail), not from text.

---

## Sources (with identifiers and public-domain status)

Public-domain status: every book and report below was published in the United States before 1929
(public domain); CRC/CPUC decisions are California public records; HABS is a US government work.
Suggested `sources.json` ids are in the last column (none of these are in `sources.json` yet,
except `crc-d34457`).

### Contemporary compiled histories and manuals [C]

| Source | archive.org id | Used for | Status | Suggested id |
|---|---|---|---|---|
| Halley, *The Centennial Year Book of Alameda County* (Oakland, 1876) | `centennialyearbo00hall` | SF&O, SF&A, WP 1866–70, Berkeley branch 1876 | PD (archive.org: NOT_IN_COPYRIGHT) | `halley-1876` |
| *History of Alameda County, California* (Oakland: M. W. Wood, 1883) | `historyofalamed00munr` | Long Wharf, 1873 line, Mole, SPC | PD | `wood-alameda-1883` |
| *History of Contra Costa County* (San Francisco: W. A. Slocum, 1882) | `historyofcontrco00munrrich` | Antioch 1878, Port Costa 1879 | PD | `contra-costa-history-1882` |
| *History of Marin County* (San Francisco: Alley, Bowen, 1880) | `historyofmarinco00munr` | NPC, SR&SQ, SF&NP Cloverdale | PD | `marin-history-1880` |
| *History of Sonoma County* (San Francisco: Alley, Bowen, 1880) | `historyofsonomac00alle` | SF&NP 1870, NPC Occidental 1876 | PD | `sonoma-history-1880` |
| *History of Napa and Lake Counties* (San Francisco: Slocum, Bowen, 1881) | `historyofnapalak00palm` | Napa Valley RR | PD | `napa-lake-history-1881` |
| *History of Solano County* (San Francisco: Wood, Alley, 1879) | `historyofsolanoc00munr` | (no railroad dates found) | PD | — |
| *Poor's Manual of Railroads*, 1880 | `poorsmanualofr1880newyuoft` | California Pacific (p. 973) | PD | `poors-1880` |
| *Poor's Manual*, vol. 18 (1885) | `poorsmanualofrai18newyuoft` | NPC, SR&SQ, SF&NP, Sonoma Valley RR (pp. 870–875) | PD | `poors-1885` |
| *Poor's Manual*, vol. 20 (1887) | `poorsmanualofrai20newyuoft` | SF&NP with Tiburon (p. 873) | PD | `poors-1887` |
| *Poor's Manual*, vol. 24 (1891) | `poorsmanualofrai24newyuoft` | California & Nevada (p. 83) | PD | `poors-1891` |
| *Poor's Manual*, vol. 27 (1894) | `poorsmanualofrai27newyuoft` | California & Nevada (p. ~263, bad OCR) | PD | `poors-1894` |
| *Poor's Manual*, vol. 33 (1900) | `poorsmanualrail00poorgoog` | NPC (p. 606), SP Co. mileage and leases (pp. 616–617) | PD | `poors-1900` |
| Board of Railroad Commissioners of California, 9th–12th Annual Reports, c. 1888–1892, bound together (the 9th prints company returns for 1887; the 10th has the "brief history of each of these lines", pp. 9–19) | `annualreportboa05unkngoog` | CP, NR, SF&NP, SPC, NPC tables and prose | PD (Calif. state publication, pre-1929) | `ca-brc-reports-9-12` |
| Board of Railroad Commissioners, 10th Annual Report (company returns for 1888; 1889) | `annualreportboa54commgoog` | Opening tables (CP p. 49, NR p. 57, Cal. Pac. p. 63, SF&NP p. 121, SPC p. 146, NPC p. 154) | PD | `ca-brc-report-10` |
| Board of Railroad Commissioners, 14th Annual Report (18 months to 1894-06-30) | `annualreportboa00caligoog` (duplicate scan `annualreportboa02caligoog`) | In-line opening tables (SP p. 24, CP pp. 26 & 31, SPC pp. 35–36, NR p. 46) | PD | `ca-brc-report-14` |

### Official decisions [O] (files.cpuc.ca.gov, `LegacyCPUCDecisionsAndResolutions/Decisions/<folder>/`)

| Decision | Date | Folder / file | Subject | Checked | Suggested id |
|---|---|---|---|---|---|
| CRC D9428 (A6560) | 1921-08-30 | `Decisions_D24_to_D11600/D9428_19210830_A6560.pdf` | SP estuary (Harrison St bridge) passenger services: abandonment denied | [ocr] | `crc-d9428` |
| CRC D14726 (C2040) | 1925-04-01 | `Decisions_D11601_to_D25900/D14726_19250401_C2040.pdf` | NWP ferries (SF–Sausalito, Sausalito–Tiburon) | [ocr] | `crc-d14726` |
| CRC D21112 (A15344) | 1929-05-16 | `…/D21112_19290516_A15344.pdf` | Cazadero agent; Cazadero the Guerneville Branch terminal | [ocr] | `crc-d21112` |
| CRC D21194 (A14085 et al.) | 1929-06-10 | `…/D21194_19290610_A14085.pdf` | SP Vallejo Jc ferry, Vallejo–Napa–Calistoga and Vallejo–Suisun trains | [img] p. 7 | `crc-d21194` |
| CRC D22672 (A15517) | 1930-07-14 | `…/D22672_19300714_A15517.pdf` | Point Reyes – Monte Rio narrow gauge ceased 1930-04-03 (ICC FD 7302) | [img] p. 5 | `crc-d22672` |
| CRC D23284 (A15517) | 1931-01-13 | `…/D23284_19310113_A15517.pdf` | Substitute bus abandoned | [ocr] | `crc-d23284` |
| CRC D25533 (A18587) | 1933-01-09 | `…/D25533_19330109_A18587.pdf` | Manor – Point Reyes passenger and mixed trains | [img] p. 2 | `crc-d25533` |
| CRC D26032 (A18817) | 1933-06-05 | `Decisions_D25901_to_D40599/D26032_19330605_A18817.pdf` | Danville agency | [ocr] | — |
| CRC D26596 (A18953) | 1933-12-04 | `…/D26596_19331204_A18953.pdf` | Sausalito – Tiburon/Belvedere ferry *Marin* | [ocr] | `crc-d26596` |
| CRC D26834 (A19269) | 1934-02-26 | `…/D26834_19340226_A19269.pdf` | **San Ramon branch mixed trains 444/445** | [img] p. 2 | `crc-d26834` |
| CRC D27973 (A19844) | 1935-05-20 | `…/D27973_19350520_A19844.pdf` | NWP main-line locals; Ignacio – Kenwood passenger end | [ocr] | `crc-d27973` |
| CRC D31370 (A22174) | 1938-10-17 | `…/D31370_19381017_A22174.pdf` | Santa Fe bus SF–Oakland–Richmond abandoned | [ocr] | — |
| CRC D32335 (A22916) | 1939-09-19 | `…/D32335_19390919_A22916.pdf` | Oakland Pier – Martinez local trains | [ocr] | — |
| CRC D32804 (A23211) | 1940-02-13 | `…/D32804_19400213_A23211.pdf` | **Niles – Milpitas – San José and Newark – Centerville – Niles passenger end** | [img] p. 7 | `crc-d32804` |
| CRC D33781 (A23810) | 1941-01-03 | `…/D33781_19410103_A23810.pdf` | **Tracy – Niles – Elmhurst passenger end** | [img] pp. 1, 3, 4 | `crc-d33781` |
| CRC D33830 (A23810) | 1941-01-21 | `…/D33830_19410121_A23810.pdf` | Supplemental order to D33781 | [ocr] | — |
| CRC D34457 (A24059) | 1941-07-29 | `…/D34457_19410729_A24059.pdf` | NWP history: 1933, 1935, 1941 changes | [img] p. 2 | `crc-d34457` (exists) |
| CRC D34571 (A24370) | 1941-09-10 | `…/D34571_19410910_A24370.pdf` | San Rafael – Sausalito steam passenger end | [img] p. 3 | `crc-d34571` |
| CPUC D52991 (A37294) | 1956 (file date 05-01) | `Decisions_D40600_to_D57800/D52991_19560501_A37294.pdf` | NWP San Rafael – Eureka daily → tri-weekly | [ocr] | — |
| CPUC D57488 (A39660) | 1958-10-21 | `…/D57488_19581021_A39660.pdf` | **NWP San Rafael – Willits passenger end** | [ocr] | `cpuc-d57488` |
| CPUC D66194 (A45134) | 1963-10-22 | `Decisions_D57801_to_D73750/D66194_19631022_A45134.pdf` | Recites D52991 and D57488 | [ocr] | — |

Not relevant after reading: D25891 (1933; a trucking certificate, not the NWP), D20866 and D26221
(not read; not needed), D22451 (California Western, Fort Bragg), D58218 (SF–San José trains,
1959).

### Pointers only [W]

Wikipedia ("Ferry Point", "North Pacific Coast Railroad", "Northwestern Pacific Railroad"),
abandonedrails.com (via a search extract: ICC docket 9543), santacruztrains.com (1940 mountain
line), Bay Rail Alliance (Dumbarton passenger), *Sanders v. EBMUD* (1993; "December 1934") — see
`leads-2c/railroads.md` for URLs.

---

## Method notes (for reproducing or extending)

- **archive.org text:** `https://archive.org/stream/<id>/<id>_djvu.txt`, take the `<pre>` block.
  Pages: printed numbers from the OCR running heads; link
  `https://archive.org/details/<id>/page/<printed page>/`.
- **CRC/CPUC decisions:** the folder listings on files.cpuc.ca.gov are browsable (e.g.
  `…/Decisions/Decisions_D25901_to_D40599/`), giving every file name (`D<no>_<yyyymmdd>_<A|C><no>.pdf`).
  To find an order with no known number, download all decisions in a date window and grep the
  first two pages (`pdftotext -l 2 -layout`). This pass scanned 1932-07 → 1936-12 (about 4,500
  decisions, ~1 GB in all). Image checks: `pdftoppm -r 75 -gray -png`.

---
