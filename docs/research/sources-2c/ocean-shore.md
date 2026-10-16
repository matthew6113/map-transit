# Research: the Ocean Shore Railroad, San Francisco – Tunitas (1905–1920)

Gathered 2026-10-16. Covers the northern division only: San Francisco and San Mateo Counties. The southern
division (Santa Cruz – Swanton) is in Santa Cruz County, outside the nine counties (decision 16). It never
joined the northern one: a 26-mile gap was left between Tunitas and Scott Junction. For a future
`data/past/ocean-shore/`. Nothing in the repo was changed except this file.

## How this pass worked, and how far to trust it

- **archive.org page images worked.** `https://<server>.us.archive.org/BookReader/BookReaderImages.php?zip=…&file=…&scale=…`
  returned images for every item tried: the CRC bound volumes, *Railroad (Age) Gazette*, *Street Railway
  Journal*, *Electric Railway Journal*, the *Book of franchises* (1910), the city attorney's opinions, the
  Redwood City *Times-Gazette*, the South San Francisco *Enterprise*, the *Daly City Record*, the *Oakland
  Tribune*, one *San Francisco Chronicle* issue and *The Western Railroader*. The Tribune uses `_tif.zip`
  rather than `_jp2.zip`. Quotes marked **[img]** were read on the page image, cropped to the item. Leaves
  are given as `n<i>`, so a link is `https://archive.org/details/<id>/page/n<i>/`.
- **Finding pages:** archive.org full-text search, `fulltext/inside.php` per item, and its word boxes to
  crop the page. `archive.org/download/…` redirects to `dn*.ca.archive.org`, which the proxy refuses, so
  files were fetched straight from the `ia*.us.archive.org` server named in each item's metadata.
- **files.cpuc.ca.gov:** the typed originals of every Commission decision used here are in
  `Decisions_D24_to_D11600/` (D143, D353, D1620, D2683, D2768, D2907, D8071, D8216). D8071 was checked
  against the bound volume on the image. The bound volumes (`california-railroad-commission-decisions_<n>`)
  give the printed page numbers cited below.
- **Blocked or missing:**
  - **loc.gov / Chronicling America.** The search API works (use `dates=YYYY/YYYY`; date ranges in days
    return nothing), but it returns only the first ~1,000 characters of a page. Page text and images are on
    `tile.loc.gov`, which the proxy refuses (403), and `?st=text` gets a Cloudflare challenge. So the *San
    Francisco Call* could be searched, not read; its hits below are leads only.
  - **Callwell's chronology** (`archives.sfmta.com`) was refused (403), so pp. 33 and 35 were not re-read.
  - ***Poor's Manual*, 1906–1921:** not on archive.org under `poorsmanualofrai<nn>newyuoft`, which stops at
    vol. 36 (1903). *Moody's Manual* 1917 (`moodysmanualofin00newyuoft`) had no Ocean Shore hit.
  - **USGS TNM API** (`tnmaccess.nationalmap.gov`) was refused; the S3 listing on `prd-tnm.s3.amazonaws.com`
    worked.
- **Tags:** [O] official (Railroad Commission, City and County of San Francisco); [P] primary
  (contemporary newspaper, the company's own timetable or advertisement); [C] contemporary trade journal;
  [S] secondary but citable (*The Western Railroader*, 1952, a railfan periodical, cited for facts only
  under decision 19); [W] pointer only; [img] read on the page image; [ocr] OCR text only.
- Downloads are in the session scratchpad (`…/scratchpad/ocean-shore/`) and were not kept in the repo; each
  entry's id and leaf reopens it.

---

## Answer in one paragraph

The Ocean Shore Railway Co., incorporated 1905-05-18, began building in 1905 from both ends. The
earthquake of 1906-04-18 damaged the unfinished roadbed; no trains were running on the north end then. The
first section opened in 1907 (CRC D1620). Callwell gives October 1907, and Brandt (1952) gives the first
passenger train, San Francisco – Tobin, on **1907-10-02** (no contemporary source for the day was read). By
January–March 1908 trains ran regularly from San Francisco (12th and Mission Sts) to **Pedro Valley/Tobin**
(17–18 mi). The line then opened in stages:

| Extension | When | Source |
|---|---|---|
| To **Farallone** | by 1908-05-08 | officials rode to "the present terminus" on Sunday 1908-05-17 |
| To **Granada** | by 1908-07-17 | "27½ miles … in operation" on 1908-09-04 |
| To **Half Moon Bay** | passenger trains on Monday **1908-10-12** | |
| To **Arleta Park** | by 1908-11-20 | |
| To **Long Bridge/Tunitas** (38 mi) | by 1909-03-05 | the track was laid in 1908; the Commission says "the last portion of the road was put in operation on May 16, 1909" |

The line was steam-worked except about 2.4 miles of street track in San Francisco, which was electric.
From 1912 to 1915 the company ran three to four daily trains each way, some only to Arleta, with fewer
trains in winter. Slides cut the line from **1916-01-15** until its regular schedule resumed on
**1916-03-02**.

Service ended in **August 1920**, when the train crews quit. The Oakland Tribune of **Tuesday 1920-08-17**
reports "trains have stopped", and Callwell gives 1920-08-15. The Railroad Commission recorded on
1920-09-08 (D8071) that service had been discontinued. On **1920-10-09**, in **Decision 8216**
(A. 6070), it authorized the company "to discontinue permanently on its northern division its service as a
common carrier". That order covers the line from Army and Illinois Sts to Tunitas and the branch from just
south of Army and Kansas Sts to 12th and Mission Sts.

---

## Facts

### Company, construction, and the opening by stretches

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| O1 | Incorporated to build San Francisco – Santa Cruz along the shore | 1905-05-18 | CRC Decision 1620 (Case 180), valuation, decided 1914-06-29 | `california-railroad-commission-decisions_4`; CPUC `D1620_19140629_C180.pdf` | vol. 4 p. 1330 (n1329) | "incorporated on May 18, 1905, to construct and operate a single or double track line from San Francisco to Santa Cruz, a distance of 80.26 miles" | [O][img] |
| O2 | Built from both ends from 1905; the 1906 earthquake damaged the roadbed | 1905; 1906-04-18 | D1620 | same | pp. 1330–1331 (n1329–n1330) | "construction commenced in 1905 from both termini" … "The earthquake of April 18, 1906, did considerable damage to the roadbed" | [O][img] |
| O3 | **First section opened in 1907**; opened piecemeal | 1907 | D1620 | same | p. 1331 (n1330) | "The road was therefore opened for operation as fast as portions of it were completed, the opening of the first section occurring in 1907." | [O][img] |
| O4 | **Last portion put in operation 1909-05-16**; the north end then reached Tunitas, 38.2 mi | 1909-05-16 | D1620 | same | p. 1331 (n1330) | "the last portion of the road was put in operation on May 16, 1909. At this time the northerly portion of the line from San Francisco south had reached Tunitas, a distance of 38.2 miles" | [O][img] |
| O5 | San Francisco service October 1907 to August 15, 1920 | 1907-10; 1920-08-15 | Callwell, *Transit in San Francisco* (Muni, 1999) | `sfmta-callwell-chronology` | p. 35 | (already in the repo; not re-read, site blocked) | [O] |
| O6 | First passenger train San Francisco – Tobin; two coaches, 125 passengers | **1907-10-02** | Brandt, "Ocean Shore 'Reaches the Beaches'", *The Western Railroader* 15(7), 1952 | `sim_western-railroader-the-western-railfan_1952_15_7` | "Page Seven" (n6) | "on October 2, 1907, the first passenger train was operated from San Francisco to Tobin (later known as Pedro Valley)" | [S][img] |
| O7 | **Cars run regularly** from San Francisco to the San Pedro Valley | by 1908-01-25 | *Street Railway Journal* 31, 1908-01-25, construction news | `streetrailwayjo311908newy` | p. 156 (n168) | "From San Francisco end cars are regularly run to the San Pedro Valley, and the work of extending the line is being carried on steadily." | [C][img] |
| O8 | **In operation San Francisco – Pedro Valley, 17 mi**; 36 mi of track laid | by 1908-03-13 | *Railroad Gazette* 44(11), 1908-03-13, annual construction list | `sim_railway-age_1908-03-13_44_11` | p. 393 (n62) | "Grading 85 per cent. finished. Track laid for 36 miles. … In operation from San Francisco to Pedro Valley, 17 miles." | [C][img] |
| O9 | A plan, not an event: trains to Green Valley by April 1 | 1908-02-15 | *SRJ* 31, 1908-02-15 | `streetrailwayjo311908newy` | p. 270 (n282) | "trains will be running to Green Valley by April 1" | [C][ocr] |
| O10 | Track being laid through Farallone City; trains to Halfmoon Bay expected "by June 10th" (did not happen) | 1908-05-16 | *The Enterprise* (South San Francisco), 1908-05-16 | `cssf_000661` | n3 | "The track is now being laid through Farallone City." | [P][ocr] |
| O11 | **Extended Pedro Valley – Farallone, 5½ mi** | by 1908-05-08 | *Railroad Gazette* 44(19), 1908-05-08, "Railroad construction" | `sim_railway-age_1908-05-08_44_19` | p. 655 (n30) | "OCEAN SHORE (ELECTRIC).—This road has been extended from Pedro Valley, Cal., to Farallone, 5½ miles." | [C][img] |
| O12 | **Farallone City the terminus**; officials rode out "last Sunday" (1908-05-17) and went on to Moss Beach | 1908-05-17 | *The Enterprise*, Sat. 1908-05-23 | `cssf_000662` | n7 | "Last Sunday a party of San Mateo County officials made a very enjoyable trip over the new Ocean Shore Railroad to Farrallone City, the present terminus, and Moss Beach, a short distance south." | [P][img] |
| O13 | A Moss Beach wedding couple "departed on the Ocean Shore railroad for San Francisco" after a Tuesday wedding (1908-06-02) | 1908-06-02 | *Times-Gazette* (Redwood City), 1908-06-06 | `cdc_000267` | n2 | "After the wedding breakfast, Mr. and Mrs. Nash departed on the Ocean Shore railroad for San Francisco." | [P][ocr] |
| O14 | Rails reached Granada | 1908-06-23 | Brandt 1952 | as O6 | "Page Nine" (n8) | "The rails reached Granada on June 23, 1908, and the most attractive of Ocean Shore depots was built there." | [S][img] |
| O15 | **Extension finished Farallone – Granada, 4.7 mi** | by 1908-07-17 | *Railroad Age Gazette* 45(7), 1908-07-17 | `sim_railway-age_1908-07-17_45_7` | p. 555 (n48) | "OCEAN SHORE.—An extension has been finished from Farallone, Cal., to Granada, 4.7 miles." | [C][img] |
| O16 | **In operation San Francisco – Granada, 27½ mi**, by steam; Santa Cruz – Folger 16½ mi | 1908-09-04 | *Railroad Age Gazette* 45(14), 1908-09-04 | `sim_railway-age_1908-09-04_45_14` | p. 889 (n48) | "using steam for motive power on the 44 miles of main track now in operation from San Francisco, Cal., south to Grenada, 27½ miles on the north end" | [C][img] |
| O17 | The gap then reached from Granada to Scotts Creek; grading contracts let | 1908-08-01; 08-22 | *Electric Railway Journal* 32 | `electricrailway321908newy` | pp. 415 (n431), 526 (n542) | "The gap of 37 miles between Granada on the north and Scotts Creek on the south is to be closed as rapidly as possible." | [C][ocr] |
| O18 | **Passenger trains first reach Halfmoon Bay** "on Monday" (= 1908-10-12, the Monday before the issue) | 1908-10-12 | *The Enterprise*, Sat. 1908-10-17 | `cssf_000683` | n4 | "There was rejoicing at Halfmoon Bay on Monday when passenger trains of the Ocean Shore Railroad made their trips to and from San Francisco." | [P][img] |
| O19 | **Extended Granada – Arleta Park, 3 mi**; Folger – Swanton 1½ mi | by 1908-11-20 | *Railroad Age Gazette* 45(25), 1908-11-20 | `sim_railway-age_1908-11-20_45_25` | p. 1419 (n46) | "The line formerly running from San Francisco, Cal., south to Granada has been extended to Arleta Park, three miles" | [C][img] |
| O20 | **Track built in 1908: Pedro Valley – Tunitas, 20.30 mi** (track, not service) | 1908 | *Railroad Age Gazette* 45(30), 1908-12-25, "Railway built in 1908" | `sim_railway-age_1908-12-25_45_30` | p. 1624 (n9) | "Ocean Shore—Pedro Valley to Tunitas, 20.30 miles; Folger to Swanton, 1.60; total … 21.90" | [C][img] |
| O21 | End of 1908: **47 mi in operation, 53 mi built** (both divisions); the gap ran from "Long Bridge near San Gregorio" to Scott's Creek | 1908-12-31 | *Times-Gazette*, 1909-01-09, "Forty-seven miles of road in operation" | `cdc_000297` | n3 | "closed the year with forty-seven miles in actual operation, fifty-three miles actually built" … "The gap now remaining to be closed is from Long Bridge near San Gregorio to Scott's creek" | [P][img] |
| O22 | 28 mi of track laid in 1908, 20 of them "southerly from San Pedro terrace" | 1909-01-23 | *ERJ* 33 | `electricrailway331909newy` | p. 150 (n170) | "Twenty miles were built southerly from San Pedro terrace, and 1.5 miles north of Folger at the Santa Cruz end." | [C][ocr] |
| O23 | Public schedule from 12th and Mission: three trains out on weekdays, four on Sundays; a "Granada Express" | 1909-02-13 | *San Francisco Chronicle*, 1909-02-13, railroad schedules | `sanfranciscochr1219unse_0` | n16 | "OCEAN SHORE RAILWAY (12th and Mission). Daily ex. Sun. Lv. 9:30A, 1:45P, 5:40P. … *Granada Express; no stops." | [P][img] |
| O24 | **In operation San Francisco – Long Bridge, 38 mi** (an officer's statement) | by 1909-03-05 | *Railroad Age Gazette* 46(10), 1909-03-05 | `sim_railway-age_1909-03-05_46_10` | p. 481 (n40) | "is now in operation from San Francisco south to Long Bridge, 38 miles, and from Santa Cruz, north to Scott creek, 14 miles, leaving a gap of about 26 miles" | [C][img] |
| O25 | Trains running to Long Bridge (Pescadero column) | by 1909-04-17 | *Times-Gazette*, 1909-04-17 | `cdc_000311` | n2 | "The trains are running to Long Bridge only nine miles away." | [P][img] |
| O26 | Stage connection planned from Long Bridge to Pescadero (Pebble Beach Hotel) | 1909-05-22 | *Times-Gazette*, 1909-05-22 | `cdc_000316` | n1 | "The OceanShore Rail Road Co. is going to run a stage line from Long Bridge to Pebble Beach Hotel" | [P][ocr] |
| O27 | Receiver appointed 1909-12-06; sold 1911-01-17; the new Ocean Shore Railroad Co. was organized 1911-10-09 and took over 1911-11-27 | 1909–1911 | D1620 | as O1 | pp. 1330, 1332, 1336 | "On October 9, 1911, the Ocean Shore Railroad Company was organized" | [O][img] (p. 1330) / [ocr] |

### Service, 1911–1916 (running dates, cut-backs)

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| S1 | **Terminus 12th and Mission – Tunitas Glen** | 1912-12-03 | CRC Decision 353, *E. F. Jordan v. Ocean Shore Railroad Co.* (Case 330) | `california-railroad-commission-decisions_1`; CPUC `D353_19121203_C330.pdf` | vol. 1 p. 966 (n967) | "operating trains from the terminus at Twelfth and Mission streets, San Francisco to Tunitas Glen" | [O][img] |
| S2 | Winter cut-back: one morning train from Half Moon Bay, 1911-11-06 to 1912-04-20; "it being the practice … to take off one train during the winter season" | 1911–12 | D353 | same | pp. 962–963 | "during the period from November 6, 1911, to April 20, 1912, but one passenger train was run each morning from Half Moon Bay to San Francisco" | [O][ocr] |
| S3 | Slides interrupt winter service; one morning train may be withdrawn after 1912-12-15; two trains expected again from 1913-03-15 | 1912-12-15 | D353 | same | pp. 966–967 | "Its service has been frequently interrupted during the winter period for many days at a time due to slides" | [O][ocr] |
| S4 | **Public timetable, effective Sunday 1912-12-15**: 31 stations with mileages (list below). Daily trains 2–6; trains 7, 8 and 10 Sundays only; some trains end at Arleta; stages at Tunitas | 1912-12-15 | *Daly City Record*, 1913-05-09, "Ocean Shore Railroad – Official time schedule" | `cdc_002427` | n2 (3rd page) | "OFFICIAL TIME SCHEDULE Became Effective Sunday, Dec. 15, 1912" … "At Tunitas, stages connect for San Gregorio, La Honda, Ballevale, Pescadero and Pebble Beach." | [P][img] |
| S5 | The same table, reprinted weekly | 1913-04-18 to 1913-10-24 | *Daly City Record* | `cdc_002424` … `cdc_002451` | — | (timetable rows in the OCR) | [P][ocr] |
| S6 | Spur across Kansas St about 400 ft south of Army St | 1912-07-13 | CRC Decision 143 (A. 143) | vol. 1; CPUC `D143_19120713_A143.pdf` | vol. 1 p. 341 (n342) | "to construct its spur track at grade across Kansas street … at a point about four hundred (400) feet south of the south side of Army street" | [O][ocr] |
| S7 | **Service in 1914**: three passenger trains each way daily San Francisco – Tunitas, one San Francisco – Halfmoon, two more on Sundays; one daily freight; fewer in winter | as of 1914-06 | D1620 | as O1 | p. 1335 (n1334) | "three (3) passenger trains each way daily between San Francisco and Tunitas, and one (1) passenger train each way daily between San Francisco and Halfmoon." | [O][img] |
| S8 | Agent withdrawn at South Granada | 1915-08-09 | CRC Decision 2683 (A. 1641) | vol. 7; CPUC `D2683_19150809_A1641.pdf` | vol. 7 p. 824 (n823) | "Applicant permitted to discontinue this agency" | [O][ocr] |
| S9 | Agent withdrawn at Salada, "14.3 miles from San Francisco", the first agency station out of the city | 1915-09-18 | CRC Decision 2768 (A. 1642) | vol. 8; CPUC `D2768_19150918_A1642.pdf` | vol. 8 p. 111 (n110) | "The station of Salada is located 14.3 miles from San Francisco and is the first station out of San Francisco at which an agent is maintained." | [O][ocr] |
| S10 | **Winter 1915–16**: trains 4 and 5 (Arleta – San Francisco) taken off. Left: No. 1 San Francisco 9.00 a.m. → Tunitas 11.05; No. 4 Tunitas 2.00 p.m. → San Francisco 4.15; No. 2 Arleta 5.55 a.m. → San Francisco 7.35; No. 3 San Francisco 5.30 p.m. → Arleta 7.10 | 1915-11-18 | CRC Decision 2907 (A. 1928) | vol. 8; CPUC `D2907_19151118_A1928.pdf` | vol. 8 pp. 438–439 (n437–n438) | "Train No. 4. Leave 7.00 a.m., Arleta … Arrive 8.40 a.m., San Francisco" | [O][img] |
| S11 | **Slide at Mussel Rock** stops all traffic south of it; trains "no longer reach even Farallone" | by 1916-01-29 | *Times-Gazette*, 1916-01-29 (Halfmoon Bay column) | `cdc_000664` | n2 | "A big slide at Mussel Rock … has very effectively barred all traffic to the south of that point and trains no longer reach even Farallone." | [P][img] |
| S12 | **Out of service 1916-01-15 to 1916-03-02**; trains from 12th and Mission at 9 a.m. and 5:30 p.m. | 1916-01-15 → 1916-03-02 | *Times-Gazette*, 1916-04-01 | `cdc_000673` | n4 | "After having been out of service since the 15th day of January, on account of slides and washouts … the "Ocean Shore" resumed its regular schedule on March 2nd" | [P][img] |
| S13 | Resumed to Tunitas "March 4th" after nearly a mile of roadbed was relocated at Devil's Slide | 1916-03-04 | Brandt 1952 | as O6 | "Page Fifteen" (n14) | "On March 4th service was resumed to Tunitas after relocating nearly a mile of roadbed at Devil's Slide" | [S][img] |
| S14 | Passengers carried, northern division: 166,671 (1914), 140,657 (1915), 101,536 (1916), 92,736 (1917), 82,795 (1918), 95,334 (1919) | 1914–1919 | CRC Decision 8216 | as E3 | vol. 18 p. 990 (n991) | (table) | [O][img] |

### End of service, 1920

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| E1 | **Trains stopped; the crews quit** over the Railroad Labor Board wage award | dateline Tue. **1920-08-17** | *Oakland Tribune*, 1920-08-17, "Tunitas trains stop; workers demand raise" | `oakland-tribune-1920-08-17` | n4 | "are without their usual means of transportation today because the train crews of the railroad have quit their jobs and trains have stopped." | [P][img] |
| E2 | **Interim order**: service already discontinued pending the hearing; most of the operating force had quit; the city's agreement to run switching service approved | 1920-09-08 | CRC Decision 8071 (A. 6070) | vol. 18; CPUC `D8071_19200908_A6070.pdf` | vol. 18 p. 758 (n759) | "Whereas, pending the hearing of said application said company has discontinued service over its said line; and Whereas, said company urges … that practically all of its operating force has quit its employ" | [O][img] |
| E3 | **Final order**: permanent discontinuance of all common-carrier service on the northern division; dismantling allowed. Covers Army & Illinois Sts – Tunitas and the branch from just south of Army & Kansas Sts to 12th & Mission Sts | **1920-10-09** | CRC Decision 8216 (A. 6070) | vol. 18; CPUC `D8216_19201009_A6070.pdf` | vol. 18 pp. 986–992 (n987–n993) | "It is hereby ordered, that Ocean Shore Railroad Company be and it is hereby authorized to discontinue permanently on its northern division its service as a common carrier" (p. 992) | [O][img] |
| E4 | The application's first title (1920-09-08) named the line from its "southerly crossing of San Bruno Avenue" to Tunitas | 1920 | D8071 | as E2 | p. 758 | "between its southerly crossing of San Bruno Avenue, in the City and County of San Francisco, and Tunitas, in the County of San Mateo, the southerly terminus of its San Francisco Division" | [O][img] |
| E5 | 38.08 mi owned Tunitas – San Francisco (38.15 mi built, single track, standard gauge); 2.4 mi electric in San Francisco, the rest steam | 1920 | D8216 | as E3 | p. 987 (n988) | "Only about 2.4 miles in San Francisco are electrically operated, the remainder being operated by steam." | [O][img] |
| E6 | "Recently discontinued operation on account of labor troubles"; describes the line as running from the depot at Twelfth and Market Sts to Tunitas | 1920-08-28 | *ERJ* 56(9) | `electricrailway561920newy` | p. 436 (n456) | "Ocean Shore Railroad, San Francisco, Cal., recently discontinued operation on account of labor troubles." | [C][ocr] |
| E7 | "Has ceased to operate" | 1920-09-11 | *ERJ* 56(11), "Ocean Shore ceases operation" | same | p. 518 (n538) | "The Ocean Shore Railroad, San Francisco, Cal., has ceased to operate." | [C][img] |
| E8 | Applications filed 1920-07-27 (south end) and 1920-08-12 (north end); "four days later" the operating employees left | 1920-08-12 (+4 days) | Brandt 1952 | as O6 | "Page Seventeen" (n16) | "On August 12th a similar application was filed for the north end. … Four days later all operating employees left their jobs" | [S][img] |
| E9 | After 1920: the city acquired the right of way "from San Bruno Avenue to the County line" and planned a boulevard on it (Alemany Blvd); Muni had "one electric locomotive purchased for operating the Ocean Shore Railway" | report 1924–25 | Bureau of Engineering, Dept. of Public Works, *Report* 1924–25 | `reportofbureauof19241925s` | n22; n66 | "The City has acquired the right of way of the Ocean Shore Railway Company from San Bruno Avenue to the County line." | [O][ocr] |

---

## The route, street by street and stretch by stretch

### San Francisco: the electric passenger branch (12th and Mission Sts – the shops, about 2.4 mi)

The franchises below give the streets as granted. The Commission's 1914 description, the city attorney's
1913 opinion and the 1917 stops (Brandt) show which of them were built.

1. **Terminal at 12th and Mission Sts.** CRC D353 (1912), D1620 (1914, p. 1333) and D8216 (1920) all say
   "Twelfth and Mission". D1620 also says "The San Francisco terminal is at Eleventh and Mission streets",
   on the same page (conflict 1). The company's office was "No. 52 Eleventh Street" (Times-Gazette
   assessment notices, 1907) [P][ocr].
2. **12th St**, from Mission St southeast to Harrison St. Ord. 1808 (1906-04-02), Ord. 40 NS (1906-07-31)
   and Ord. 630 NS (1908-12-10) run it "along Twelfth street to the southeasterly line of Market street"
   [O][img, *Book of franchises* p. 328]. D1620: "catenary trolley system with steel center pole and bracket
   construction on the Twelfth street line" [O][img].
3. **Across block 46 (Mission District)**, from Harrison St opposite 12th St to the north end of Florida St,
   crossing the SP line there. The 1906 ordinances required an overhead crossing, and Ord. 630 NS (1908) a
   crossing "at grade" [O][ocr]. Brandt puts it at "12th and Division", "later changed to a grade crossing"
   [S][ocr].
4. **Florida St**, south from its north end to Mariposa St (Ord. 40 NS, 630 NS). Brandt places a grade
   crossing at "16th and Florida" (1912) and a stop "at 16th and Florida Streets" (1917) [S][ocr].
5. **Mariposa St**, Florida St east to Potrero Ave (Ord. 40 NS, 630 NS) [O][img].
6. **Potrero Ave**, Mariposa St south to 25th St (Ord. 40 NS: "thence northerly along Potrero avenue to and
   within Mariposa street", going the other way) [O][img]. The city attorney (1913) cites the grant as
   "Potrero Avenue from Twenty-fifth Street to Mariposa Street" [O][img]. Brandt gives stops at 18th and
   24th Sts (1917) and says Muni's H line "laid a paralleling track alongside the Ocean Shore's single track
   from 18th to 25th Streets" [S][img].
   - Ord. 1808 (April 1906) had routed this part by Hampshire St and York St instead. Ord. 40 NS replaced
     them with Potrero Ave in July 1906, "in lieu of York and Hampshire streets, so surrendered" (*Book of
     franchises*, resolutions after Ord. 1808) [O][ocr].
7. **The southern link, two forms:**
   - (a) **As first built:** 25th St east from Potrero Ave to Vermont St, then Vermont St south to Army St
     (Ord. 1808; Ord. 40 NS). By 1913-01-23 "The tracks on Twenty-fifth Street between the points named
     having been abandoned and removed" (city attorney's opinion, p. 226) [O][img].
   - (b) **The replacement:** Potrero Ave south of 25th St to its end at Serpentine Ave, then across a
     30-ft city sewer right of way (temporarily) and the company's own right of way to Army St, then Army
     St, Holladay Ave and San Bruno Ave, and through private property to the tracks in Vermont St south of
     Army St. The Board of Supervisors' Resolution 4009 NS (passed 1908-06-14, approved 1908-06-24) allowed
     it; the opinion of 1913-01-23 upholds the tracks "in that part of Potrero Avenue between Twenty-fifth
     and Serpentine Avenue" [O][img]. D1620 (1914): "a simple span suspended trolley wire on the Army
     street line" [O][img].
   - **When (b) replaced (a) is unsourced:** after June 1908 and before January 1913.
8. **The shops and yard**, south of Army St. Ord. 1623 (1905) grants yards from Army St near Missouri St
   southwest to Barneveld Ave [O][ocr]. "Shops" are 2.5 mi from San Francisco in the 1912 timetable [P][img].
   D8216's branch begins "just at a point south of Army and Kansas streets" [O][img]. Kansas St spur, 1912
   (D143) [O][ocr].

### San Francisco: the steam main line (Illinois and Army Sts – the county line)

As granted by **Ord. 1623 (approved 1905-10-05)**, *Book of franchises* pp. 310–319. The p. 312 passage
was [img]; the rest is [ocr].

- The junction with the joint SP and Santa Fe tracks is at Army and Illinois Sts (D1620 p. 1333 [O][img];
  D8216 [O][img]).
- **Army St to Barneveld Ave:** from "a point on Illinois street just south of Army street", westerly on
  private property "parallel to and just south of Army street, to Connecticut street". Then by curve to
  Orleans St at Norman St, across Luck St, and along Barneveld Ave and Loomis St. Also a branch "along
  Barneveld avenue and Vermont street from the intersection of Luck street and Barneveld avenue … to Army
  street", which joins the passenger branch.
- **Bayview and Bernal Heights:** under 15th Ave South; Waterloo St; between Morengo St and Barneveld Ave;
  over Dickenson St and San Bruno Ave; between Crescent Ave and Case St; over Paul St; Welden and Salem Sts
  at grade.
- **Islais Creek valley to Ocean View:** "following the general course of the valley of the Islais Creek to
  Alemany avenue, crossing under Mission street at its intersection with Canal street" [img]. Then along
  Alemany Ave, to Huron Ave at Mohawk Ave, over Ocean and Onondaga Aves, along Huron Ave, and to Sherman
  and Wyoming Aves, over Naglee and Worden Aves.
- **To the county line:** to Worcester Ave near Vernon St; under Sickles Ave at De Wolf St, Regent St and
  San Jose Ave, Liebig St, Palmetto Ave and the SP tracks; Orizaba, Bright, Head and Victoria Sts at grade;
  over Ramsell St and over Worcester and Arch Sts; then "southwesterly … to the southerly boundary line of
  the city and county".
- **As built:** D1620: "From the shops the line follows the bed of Islais Creek to a summit near Ocean
  View, and thence to the shore of the Pacific Ocean" [O][img]. The city took the right of way from San
  Bruno Ave to the county line for a boulevard, the later Alemany Blvd (1924–25 report) [O][ocr].
- **Stations:** Onondaga (5.4 mi) and Palmetto (7.1) in 1912 [P][img]. Brandt's 1917 stops: San Bruno Ave,
  Mission Viaduct, Onondaga, Sherman and Palmetto Aves [S][ocr].
- **Street names:** several 1905 names have since changed (the 1908–09 renamings are in
  `sf-municipal-reports-1908-09`). Trace from a map rather than by name.
- **Mileage:** 7.49 mi of main line in San Francisco County and 30.66 in San Mateo County (D1620 p. 1328)
  [O][img].

### San Mateo County: stretch by stretch, with stations

Mileages are from San Francisco, from the timetable effective 1912-12-15 (S4) [P][img]. **Bold** names are
printed in heavier type in that table. "1915 sheet" means the label is on USGS San Mateo 15′, ed. 1915
("culture revised in part in 1914"), `usgs-san-mateo-1915`, where the line is drawn and labelled "OCEAN
SHORE" from Daly City to North Granada [img].

| Stretch | Stations (mi) | In service from | Route notes (source) |
|---|---|---|---|
| County line – Daly City – the coast | **Daly City** 7.6, Thornton 9.9 | 1907-10 (O3, O5, O6) | 1915 sheet: west from Daly City to the shore at Thornton |
| Mussel Rock bluffs | Mussel Rock 11.9, Edgemar 13.1 | 1907-10 | "along Mussel Rock Bluffs for some two miles" (D1620 p. 1333) |
| Valley mouths to Rockaway | **Salada** 14.3, Brighton 14.8, Vallemar 16.0, Rockaway 16.6 | 1907-10 | "crosses the mouths of several fertile valleys" (D1620 p. 1334). 1915 sheet: Milagra Valley, Salada, Vallemar, Rockaway |
| Rockaway Point to San Pedro Valley | **Tobin** 18.1 (Pedro Valley, see conflict 7) | 1907-10; regular by 1908-01-25 (O7, O8) | Terminus Oct 1907 – spring 1908 |
| Devil's Slide | Ransome 18.9, Green Canon 21.1, Montara 22.8, **Farallon(e)** 23.0 | by 1908-05-08 (O11, O12) | "San Pedro Point is reached, in mile 19; then for approximately four miles the line continues along the steep bluffs" (D1620 p. 1334). 1915 sheet: Ransome, Devils Slide, Green Canon, Montara, Farallone. Roadbed relocated at Devil's Slide in 1916 (S13) |
| Moss Beach – Granada | **Moss Beach** 24.1, Marine 24.4, Princeton 26.0, North Granada 26.5, Granada 27.1, **South Granada** 27.6 | Moss Beach used by 1908-06-02 (O13, ocr); Granada by 1908-07-17 (O15, O16) | 1915 sheet: Moss Beach, Marine, Seal Cove, Princeton, North Granada (the sheet ends at 37°30′) |
| Granada – Half Moon Bay – Arleta Park | Miramar 28.1, **Half Moon** 30.2, Arleta 30.8 | Half Moon Bay 1908-10-12 (O18); Arleta Park by 1908-11-20 (O19) | Several trains ended at Arleta (S4, S10) |
| Arleta – Tunitas | Fairhaven 32.6, Purisima 34.3, Sealrox 34.8, Lobitos 36.1, **Tunitas** 38.0 | Track laid 1908 (O20); in operation by 1909-03-05 (O24); "last portion" 1909-05-16 (O4) | "Purissima and Lobitas creeks are crossed on high single track trestles"; "just south of Tunitas the track crosses Tunitas Creek, and a few rail lengths beyond the end of track is found" (D1620 p. 1334) |

**Station names in 1920.** The *Times-Gazette* of 1920-08-14 (n5) lists "these Ocean Shore R. R. towns and
stations" [P][img]: Tunitas, Lobitos, Sealrox, Purissima, Cowell, Fair Haven, Arleta, Half Moon,
Palarictos, Miramar, South Granada, Granada, North Granada, Princeton, Martinez, Marine, Moss Beach,
Montara, McNee, Green Canyon, Ransome, Pedro Valley, Fleming, Rockaway, Vellemar, Brighton, Salada,
Edgemear, Mussel Rock, Thornton, Crosby and Paoli.

- **New since 1912:** Cowell, Palarictos (Pilarcitos?), Martinez, McNee, Fleming, Crosby and Paoli. Their
  places are not given; the list runs south to north. No opening date is sourced for any of them.
- **Renamed:** Tobin appears as Pedro Valley.

**Traction.** Steam everywhere except the San Francisco street branch: "except for some 2.4 miles in the
city of San Francisco, where franchises compel the company to use electric power" (D1620 p. 1333 [O][img];
D8216 p. 987 [O][img]). When electric working began is sourced only in Brandt: electric motor No. 51 in
service March 1907, city officials' trip of 1907-06-26 [S][ocr]. Brandt also has two gasoline motor cars
from November 1918 [S][ocr].

---

## Conflicts

1. **The San Francisco terminal.**
   - **"Twelfth and Mission":** D353 (1912), D1620 (p. 1333, second mention), D8216 (1920), the
     *Chronicle* (1909) and the *Times-Gazette* (1916).
   - **"Eleventh and Mission":** D1620 p. 1333 (first mention) and *SRJ* 1908-01-11 p. 44.
   - **"Eleventh and Market"** (ERJ 1908-09-05) and **"Twelfth and Market"** (ERJ 1920-08-28).
   - The 1906 ordinances run the track up 12th St to Market St. Use **12th St and Mission St**, the
     orders' wording.
   - ERJ 1908-09-05 p. 576 also says "This road has not yet been placed in service"; it describes the
     planned electric line and is not used.
2. **The company's name in 1905–1911.** The franchises, the 1909 *Chronicle* advertisement and D8216 say
   *Ocean Shore Railway Company*, and *Ocean Shore Railroad Company* for the 1911 successor. D1620 calls
   the 1905 company "Ocean Shore Railroad Company", and gives its control "from April 18, 1905" but its
   incorporation as May 18, 1905. Use Railway (1905–1911) and Railroad (1911–1920). The April date looks
   like a slip.
3. **The first passenger day.** The only day is Brandt's 1907-10-02 [S]. D1620 gives the year (1907),
   Callwell the month (October 1907), and *The Enterprise* of 1907-09-28 still speaks of when "their cars
   get in r[unning]" [P][ocr]. The *San Francisco Call* page of 1907-10-02, p. 2
   (`loc.gov/resource/sn85066387/1907-10-02/ed-1/?sp=2`) matches "ocean shore railway train" in loc.gov's
   search, but could not be read here: lead only.
4. **Granada.** Brandt has the rails reaching Granada on 1908-06-23; *RAG* of 1908-07-17 has the extension
   "finished"; on 1908-09-04 it was "in operation … to Grenada, 27½ miles". *The Enterprise* (1908-05-16)
   had expected trains to Half Moon Bay by June 10, which did not happen; passenger trains reached it on
   1908-10-12. The day passenger service reached Granada is unsourced.
5. **Tunitas, "Long Bridge", and 1909-05-16.**
   - The track to Tunitas was laid in 1908 (O20; Brandt: "by the end of the year the rails had reached
     Tunitas Glen").
   - At the end of 1908 only 47 mi were in operation on both divisions (O21). That leaves about 29–30 mi
     on the north end, so service then ended near Arleta.
   - By 1909-03-05 the line was "in operation … to Long Bridge, 38 miles" (O24), and trains ran there by
     April (O25).
   - D1620 says "the last portion of the road was put in operation on May 16, 1909" without naming the end.
     It may be the last mile into Tunitas, or the Swanton end.
   - Whether "Long Bridge" (1909) and Tunitas (38.0 mi in 1912) are the same place is not stated. The
     *Times-Gazette* puts Long Bridge "near San Gregorio" and near Lobitos.
   - **Suggested:** Arleta – Tunitas opened 1909, with "by 1909-03-05" as the first sourced running date
     and 1909-05-16 in a note. Matthew to decide.
6. **1916.** The *Times-Gazette* gives "out of service since the 15th day of January" and "resumed its
   regular schedule on March 2nd". Brandt gives "March 4th" (to Tunitas) and a slide "south of Pedro Valley"
   with the relocation at Devil's Slide. The *Times-Gazette* of 1916-01-29 puts the big slide at Mussel
   Rock. Whether the whole line was out, or only south of Mussel Rock, is not clear. Prefer the contemporary
   paper: 1916-01-15 → 1916-03-02.
7. **Tobin and Pedro Valley.** *RAG* (1908) and D1620 use Pedro Valley and San Pedro Point; the 1912
   timetable uses Tobin (18.1 mi); the 1920 list has Pedro Valley and no Tobin; Brandt says "Tobin (later
   known as Pedro Valley)". *RAG*'s "17 miles" to Pedro Valley against 18.1 in 1912 is rounding or a
   different point. The renaming date is unsourced.
8. **The last day in August 1920.**
   - Callwell: 1920-08-15 (not re-read).
   - Brandt: four days after the application of 1920-08-12, so 08-16.
   - *Oakland Tribune*, Tuesday 08-17: "trains have stopped" and commuters are without trains "today".
   - Monday 08-16 or Sunday 08-15 could each be the last day of trains; neither is settled. The Commission's
     orders (09-08, 10-09) only record that service had stopped and authorize its end.
9. **Muni's Potrero Ave segment.** `data/past/sf-muni/segments.geojson`, `muni-potrero-25th-division`
   ("Potrero Ave, 25th St to Division St"), notes "Shared with the Ocean Shore Railroad's electric trains
   until 1920 (Callwell p. 33)". The franchises (Ord. 40 NS, 630 NS) put the Ocean Shore on Potrero Ave
   only between 25th St and Mariposa St; it then turned west on Mariposa St to Florida St. Brandt has
   Muni's parallel track from 18th to 25th Sts. Between Mariposa St and Division St the Ocean Shore was not
   on Potrero Ave, unless Callwell p. 33 says otherwise. Re-read Callwell, then narrow the note.
10. **Length.** 38.0 mi to Tunitas (1912 timetable); 38 (*RAG* 1909); 38.08 owned and 38.15 built
    (D8216); 38.15/38.12 (D1620 table); 38.2 (D1620 text).

## Still unsourced

- **Openings to passengers by day.** Each day in October 1907 except Brandt's 10-02 [S]; Farallone (between
  the March and May 1908 lists); Granada (between May and 1908-07-17); Arleta Park (between 1908-10-12 and
  11-20); Long Bridge/Tunitas (between 1909-01-01 and 03-05). The *San Francisco Call*, 1907–1909, would
  date these; it is on Chronicling America and CDNC, both unreadable from here.
- **The last train** in August 1920 (the 15th or the 16th).
- **Openings of individual stations** and of the stations new by 1920 (Cowell, Palarictos, Martinez, McNee,
  Fleming, Crosby, Paoli), with their places. The renaming of Tobin to Pedro Valley.
- **The San Francisco street route as built.** The franchises are grants, not proof of construction. That
  12th, Florida, Mariposa and Potrero were built rests on the 1912–1917 mentions (D1620; the city attorney
  1913; Brandt). Still unsourced:
  - when the 25th St and Vermont St link was replaced by Potrero Ave, Army St, Holladay Ave and San Bruno
    Ave (after 1908-06, before 1913-01);
  - whether Hampshire St and York St (Ord. 1808) ever carried track (Brandt says the route changed before
    the line was built);
  - the exact track across block 46 and at Division St.
- **Electric working:** its start date in a primary source (Brandt only: March 1907).
- **Freight after August 1920 in San Francisco (decision 15).**
  - Switching was resumed by agreement with the city, approved by D8071 (1920-09-08).
  - Brandt says Muni ran it for "a month and a half", then the SP and WP took it over [S][ocr].
  - Muni's 1924–25 report lists an electric locomotive "purchased for operating the Ocean Shore Railway"
    [O][ocr].
  - Which tracks stayed in use, and until when, was not researched.
- **Muni's emergency trains over the Ocean Shore** in the 1917 United Railroads strike, Army St and Potrero
  Ave to Daly City (Brandt only, [S][ocr]). Unverified, and a separate operation if drawn at all.

## For Matthew (manual work)

- **Re-read Callwell pp. 33 and 35** (`archives.sfmta.com` blocked here). Check the Potrero Ave wording
  behind the Muni segment note (conflict 9) and the Oct 1907 / 1920-08-15 dates.
- **Newspapers, for the opening days and the last day.** The *San Francisco Call*: 1907-10-01 to 10-05
  (start with 1907-10-02 p. 2), 1908-05, 1908-07, 1908-10-12/13 and 1909-01 to 05; Chronicling America and
  CDNC are not reachable from here. For 1920, the *San Francisco Chronicle* or *Examiner* for 1920-08-15
  to 08-17, and the *Coast Side Comet* (Half Moon Bay), via CDNC or a library.
- **Geometry, three gaps:**
  - **San Francisco streets:** trace on today's centerlines from the franchise streets above, and
    check them on a Sanborn atlas of 1913–1915 (LoC, not reachable here) or a 1910s city map.
  - **Islais Creek – county line:** the right of way became Alemany Blvd. The 1915 San Francisco and San
    Mateo 15′ sheets show railways there but do not label which is the Ocean Shore. Needs a map that names
    it.
  - **North Granada – Tunitas:** off the 1915 San Mateo sheet. The only USGS Halfmoon Bay 15′ editions on
    HTMC are 1940 (scans 297627, 297628) and 1943, after the end. The 1940 scan shows no railway, only an
    unlabelled dashed line along the bluff from Purisima to Martins Beach. A 1909–1920 county or railroad
    map is needed; perhaps the right-of-way maps behind D1620's valuation (the engineering department's
    report of 1914-03-24).
- **OpenHistoricalMap** way 200014102 runs from Daly City (37.7104, −122.4598) to North Granada (37.5017,
  −122.4724). It is marked "fixme: Incomplete", traced from the 1915 San Mateo sheet, with 1905/1920 dates
  taken from Wikipedia. Its geometry is usable after the fit noted in `phase-2c.md`; its dates are not.
- **Licences.**
  - *The Western Railroader*: copyright unknown, cited for facts only (decision 19).
  - The *Times-Gazette*, *Daly City Record* and *Enterprise* scans are marked "Public Domain. No
    restrictions on use."
  - The 1909 *Chronicle* scan (`lincolncollection`) has no rights field; it is a pre-1929 US publication.
  - The *Railroad (Age) Gazette*, *SRJ* and *ERJ* items were published 1908–1920, so are public domain.
  - The city's books (franchises 1910, opinions 1912–16, Bureau of Engineering 1924–25) are public
    records.

---

## Proposed sources.json entries

Reuse: `sfmta-callwell-chronology` (p. 35; p. 33 for the Potrero Ave note) and `usgs-san-mateo-1915`
(geometry: the line is drawn and labelled from Daly City to North Granada). New:

```json
[
  {
    "id": "crc-d1620",
    "title": "Railroad Commission of California, Decision No. 1620 (Case No. 180): ascertaining the value of the property of the Ocean Shore Railroad Company",
    "publisher": "Railroad Commission of the State of California",
    "date": "1914-06-29",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D1620_19140629_C180.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound in Decisions of the Railroad Commission vol. 4 (archive.org california-railroad-commission-decisions_4), pp. 1328-1337. p. 1330: \"incorporated on May 18, 1905\"; p. 1331: \"the opening of the first section occurring in 1907\" and \"the last portion of the road was put in operation on May 16, 1909. At this time the northerly portion of the line from San Francisco south had reached Tunitas, a distance of 38.2 miles\"; p. 1333: \"Beginning at Twelfth and Mission streets in San Francisco the line follows the city streets for approximately 2.4 miles to the company's shops\" and \"From the shops the line follows the bed of Islais Creek to a summit near Ocean View, and thence to the shore of the Pacific Ocean\"; p. 1334: Mussel Rock bluffs, San Pedro Point \"in mile 19\", Purissima and Lobitas trestles, end of track just south of Tunitas Creek; p. 1335: three passenger trains each way daily San Francisco - Tunitas and one to Halfmoon (1914). Read on the page images of the bound volume."
  },
  {
    "id": "crc-d353",
    "title": "Railroad Commission of California, Decision No. 353 (Case No. 330): E. F. Jordan v. Ocean Shore Railroad Company",
    "publisher": "Railroad Commission of the State of California",
    "date": "1912-12-03",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D353_19121203_C330.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound vol. 1 (california-railroad-commission-decisions_1), pp. 962-968. p. 966: \"operating trains from the terminus at Twelfth and Mission streets, San Francisco to Tunitas Glen\" (read on the page image); pp. 962-967 (OCR): one morning train from Half Moon Bay November 6, 1911 to April 20, 1912; service \"frequently interrupted during the winter period for many days at a time due to slides\"; one morning train may be withdrawn after December 15, 1912."
  },
  {
    "id": "crc-d2907",
    "title": "Railroad Commission of California, Decision No. 2907 (Application No. 1928): Ocean Shore Railroad Company, to discontinue two passenger trains",
    "publisher": "Railroad Commission of the State of California",
    "date": "1915-11-18",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D2907_19151118_A1928.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound vol. 8, pp. 438-440. Trains 4 (Arleta 7.00 a.m. - San Francisco 8.40) and 5 (San Francisco 3.00 p.m. - Arleta 4.40) discontinued for the winter; remaining schedule: No. 1 San Francisco 9.00 a.m. - Tunitas 11.05; No. 4 Tunitas 2.00 p.m. - San Francisco 4.15; No. 2 Arleta 5.55 a.m. - San Francisco 7.35; No. 3 San Francisco 5.30 p.m. - Arleta 7.10. Read on the page images."
  },
  {
    "id": "crc-d2768",
    "title": "Railroad Commission of California, Decision No. 2768 (Application No. 1642): Ocean Shore Railroad Company, agent at Salada",
    "publisher": "Railroad Commission of the State of California",
    "date": "1915-09-18",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D2768_19150918_A1642.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound vol. 8, pp. 111-113: \"The station of Salada is located 14.3 miles from San Francisco and is the first station out of San Francisco at which an agent is maintained.\" OCR of the bound volume; the PDF exists but was not read."
  },
  {
    "id": "crc-d8071",
    "title": "Railroad Commission of California, Decision No. 8071 (Application No. 6070): Ocean Shore Railroad Company, interim order approving the switching agreement with San Francisco",
    "publisher": "Railroad Commission of the State of California",
    "date": "1920-09-08",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D8071_19200908_A6070.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound vol. 18, pp. 758-759. \"pending the hearing of said application said company has discontinued service over its said line\"; \"practically all of its operating force has quit its employ\"; approves the agreement under which switching service \"may be resumed and continued\" with the aid of the city and county. The application is titled for the line \"between its southerly crossing of San Bruno Avenue, in the City and County of San Francisco, and Tunitas\". Read on the typed original and on the bound page."
  },
  {
    "id": "crc-d8216",
    "title": "Railroad Commission of California, Decision No. 8216 (Application No. 6070): Ocean Shore Railroad Company, abandonment of the northern division",
    "publisher": "Railroad Commission of the State of California",
    "date": "1920-10-09",
    "type": "official",
    "url": "https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D24_to_D11600/D8216_19201009_A6070.pdf",
    "license": "California public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Bound vol. 18, pp. 986-992. The line \"between Army and Illinois streets in the City and County of San Francisco and Tunitas in the County of San Mateo, its southerly terminus, and between a point just south of Army and Kansas streets to the corner of Twelfth and Mission streets\". p. 987: 38.08 miles Tunitas to San Francisco; \"Only about 2.4 miles in San Francisco are electrically operated, the remainder being operated by steam.\" p. 990: passengers carried on the northern division 1914-1919. p. 992: \"authorized to discontinue permanently on its northern division its service as a common carrier\". Read on the page images."
  },
  {
    "id": "sf-franchises-1910",
    "title": "Book of franchises granted by the Board of Supervisors of the City and County of San Francisco",
    "publisher": "City and County of San Francisco (Rincon Pub. Co.)",
    "date": "1910",
    "type": "official",
    "url": "https://archive.org/details/bookoffranchises00sanf",
    "license": "Public record (published 1910); cited for facts",
    "accessed": "2026-10-16",
    "notes": "\"Ocean Shore Railway Franchises\", pp. 310-341. Ordinance No. 1623 (approved October 5, 1905): main line from Illinois street just south of Army street by the Islais Creek valley, Alemany, Huron and Worcester avenues to the county line, yards south of Army street, a branch by Barneveld avenue and Vermont street (p. 312 read on the page image). Ordinance No. 1808 (approved April 2, 1906) and Ordinance No. 40 (New Series, approved July 31, 1906): the electric branch from Vermont and Army streets by 25th street, Potrero avenue, Mariposa street, Florida street and block 46 to Twelfth street and Market street (p. 328 read on the page image). Ordinance No. 630 (New Series, approved December 10, 1908): the same route, the Southern Pacific crossing on Florida street at grade. Ordinance No. 758 (New Series, valid May 10, 1909) amends No. 1623."
  },
  {
    "id": "sf-city-attorney-opinions-1912-16",
    "title": "Official opinions of Percy V. Long, City Attorney of the City and County of San Francisco",
    "author": "Percy V. Long",
    "publisher": "City and County of San Francisco",
    "date": "1916",
    "type": "official",
    "url": "https://archive.org/details/officialopinions191216sanf",
    "license": "Public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "pp. 226-230 (scan leaves n279-n283), \"Rights of Ocean Shore Railway in Potrero Avenue and in Twenty-fifth Street\", January 23, 1913: tracks \"in that part of Potrero Avenue between Twenty-fifth and Serpentine Avenue\"; \"The tracks on Twenty-fifth Street between the points named having been abandoned and removed\"; quotes Resolution No. 4009 (New Series), June 14, 1908, for extending the tracks \"over and along Potrero Avenue, produced, to Army Street, and thence over and along Army Street, Holladay Avenue and San Bruno Avenue and through private property to connect with its present tracks in Vermont Street southerly from Army Street\". Read on the page images."
  },
  {
    "id": "sf-bureau-engineering-1924-25",
    "title": "Report of the Bureau of Engineering of the Department of Public Works, City and County of San Francisco, 1924-25",
    "publisher": "City and County of San Francisco, Bureau of Engineering",
    "date": "1925",
    "type": "official",
    "url": "https://archive.org/details/reportofbureauof19241925s",
    "license": "Public record; cited for facts",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n22: \"The City has acquired the right of way of the Ocean Shore Railway Company from San Bruno Avenue to the County line. It is planned to construct a boulevard along this strip\"; n51: the proposed \"Alemany Boulevard over the old Ocean Shore Railway right of way\". OCR only; to be read on the page images."
  },
  {
    "id": "railroad-gazette-1908-03-13",
    "title": "The Railroad Gazette 44(11), March 13, 1908: railroad construction in 1907, Ocean Shore (Electric)",
    "publisher": "The Railroad Gazette",
    "date": "1908-03-13",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-03-13_44_11",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 393 (scan leaf n62): \"Grading 85 per cent. finished. Track laid for 36 miles. … In operation from San Francisco to Pedro Valley, 17 miles.\" Read on the page image."
  },
  {
    "id": "railroad-gazette-1908-05-08",
    "title": "The Railroad Gazette 44(19), May 8, 1908: railroad construction, Ocean Shore (Electric)",
    "publisher": "The Railroad Gazette",
    "date": "1908-05-08",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-05-08_44_19",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 655 (scan leaf n30): \"This road has been extended from Pedro Valley, Cal., to Farallone, 5½ miles.\" Read on the page image."
  },
  {
    "id": "rag-1908-07-17",
    "title": "Railroad Age Gazette 45(7), July 17, 1908: railroad construction, Ocean Shore",
    "publisher": "Railroad Age Gazette",
    "date": "1908-07-17",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-07-17_45_7",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 555 (scan leaf n48): \"An extension has been finished from Farallone, Cal., to Granada, 4.7 miles.\" Read on the page image."
  },
  {
    "id": "rag-1908-09-04",
    "title": "Railroad Age Gazette 45(14), September 4, 1908: railroad construction, Ocean Shore",
    "publisher": "Railroad Age Gazette",
    "date": "1908-09-04",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-09-04_45_14",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 889 (scan leaf n48): \"using steam for motive power on the 44 miles of main track now in operation from San Francisco, Cal., south to Grenada, 27½ miles on the north end, and from Santa Cruz north to Folger, 16½ miles on the south end.\" Read on the page image."
  },
  {
    "id": "rag-1908-11-20",
    "title": "Railroad Age Gazette 45(25), November 20, 1908: railroad construction, Ocean Shore",
    "publisher": "Railroad Age Gazette",
    "date": "1908-11-20",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-11-20_45_25",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 1419 (scan leaf n46): \"The line formerly running from San Francisco, Cal., south to Granada has been extended to Arleta Park, three miles, and the line formerly running from Santa Cruz, Cal., to Folber has been extended to Swanton, 1½ miles.\" Read on the page image."
  },
  {
    "id": "rag-1908-12-25",
    "title": "Railroad Age Gazette 45(30), December 25, 1908: \"Railway built in 1908\"",
    "publisher": "Railroad Age Gazette",
    "date": "1908-12-25",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1908-12-25_45_30",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 1624 (scan leaf n9), new main track laid in 1908, California: \"Ocean Shore—Pedro Valley to Tunitas, 20.30 miles; Folger to Swanton, 1.60; total … 21.90\". Track, not service. Read on the page image."
  },
  {
    "id": "rag-1909-03-05",
    "title": "Railroad Age Gazette 46(10), March 5, 1909: railroad construction, Ocean Shore",
    "publisher": "Railroad Age Gazette",
    "date": "1909-03-05",
    "type": "journal",
    "url": "https://archive.org/details/sim_railway-age_1909-03-05_46_10",
    "license": "Public domain (published 1909)",
    "accessed": "2026-10-16",
    "notes": "p. 481 (scan leaf n40): \"An officer writes that the main line from San Francisco, Cal., south to Santa Cruz … is now in operation from San Francisco south to Long Bridge, 38 miles, and from Santa Cruz, north to Scott creek, 14 miles\". Read on the page image."
  },
  {
    "id": "srj-1908-01-25-ocean-shore",
    "title": "Street Railway Journal 31, January 25, 1908: construction news, San Francisco (Ocean Shore Railway)",
    "publisher": "Street Railway Journal",
    "date": "1908-01-25",
    "type": "journal",
    "url": "https://archive.org/details/streetrailwayjo311908newy",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "p. 156 (scan leaf n168): \"From San Francisco end cars are regularly run to the San Pedro Valley, and the work of extending the line is being carried on steadily.\" Read on the page image. The same volume, p. 44 (January 11, 1908), describes the line \"Starting at Eleventh and Mission Streets\" (OCR)."
  },
  {
    "id": "erj-1920-09-11-ocean-shore",
    "title": "Ocean Shore Ceases Operation",
    "publisher": "Electric Railway Journal 56(11)",
    "date": "1920-09-11",
    "type": "journal",
    "url": "https://archive.org/details/electricrailway561920newy",
    "license": "Public domain (published 1920)",
    "accessed": "2026-10-16",
    "notes": "p. 518 (scan leaf n538): \"The Ocean Shore Railroad, San Francisco, Cal., has ceased to operate.\" Read on the page image. Also p. 436 (August 28, 1920, OCR): \"recently discontinued operation on account of labor troubles\"."
  },
  {
    "id": "enterprise-1908-05-23",
    "title": "The Enterprise (South San Francisco), May 23, 1908: county officials visit Farallone City, the present terminus",
    "publisher": "The Enterprise (South San Francisco Public Library scan)",
    "date": "1908-05-23",
    "type": "primary_document",
    "url": "https://archive.org/details/cssf_000662",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n7: \"Last Sunday a party of San Mateo County officials made a very enjoyable trip over the new Ocean Shore Railroad to Farrallone City, the present terminus, and Moss Beach, a short distance south.\" Read on the page image."
  },
  {
    "id": "enterprise-1908-10-17",
    "title": "The Enterprise (South San Francisco), October 17, 1908: passenger trains reach Halfmoon Bay",
    "publisher": "The Enterprise (South San Francisco Public Library scan)",
    "date": "1908-10-17",
    "type": "primary_document",
    "url": "https://archive.org/details/cssf_000683",
    "license": "Public domain (published 1908)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n4: \"There was rejoicing at Halfmoon Bay on Monday when passenger trains of the Ocean Shore Railroad made their trips to and from San Francisco.\" The Saturday issue's \"Monday\" is October 12, 1908 (the weekday is the reader's inference). Read on the page image."
  },
  {
    "id": "times-gazette-1909-01-09",
    "title": "Times-Gazette (Redwood City), January 9, 1909: \"Forty-seven miles of road in operation\"",
    "publisher": "Times-Gazette (Daly City Public Library scan)",
    "date": "1909-01-09",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_000297",
    "license": "Public domain (published 1909)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n3: the Ocean Shore \"closed the year with forty-seven miles in actual operation, fifty-three miles actually built\"; \"The gap now remaining to be closed is from Long Bridge near San Gregorio to Scott's creek\". Read on the page image."
  },
  {
    "id": "times-gazette-1909-04-17",
    "title": "Times-Gazette (Redwood City), April 17, 1909: Pescadero news",
    "publisher": "Times-Gazette (Daly City Public Library scan)",
    "date": "1909-04-17",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_000311",
    "license": "Public domain (published 1909)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n2: \"The trains are running to Long Bridge only nine miles away.\" Read on the page image."
  },
  {
    "id": "times-gazette-1916-01-29",
    "title": "Times-Gazette (Redwood City), January 29, 1916: Halfmoon Bay without trains",
    "publisher": "Times-Gazette (Daly City Public Library scan)",
    "date": "1916-01-29",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_000664",
    "license": "Public domain (published 1916)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n2: \"A big slide at Mussel Rock … has very effectively barred all traffic to the south of that point and trains no longer reach even Farallone.\" Read on the page image."
  },
  {
    "id": "times-gazette-1916-04-01",
    "title": "Times-Gazette (Redwood City), April 1, 1916: the Ocean Shore resumes its schedule",
    "publisher": "Times-Gazette (Daly City Public Library scan)",
    "date": "1916-04-01",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_000673",
    "license": "Public domain (published 1916)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n4: \"After having been out of service since the 15th day of January, on account of slides and washouts … the \\\"Ocean Shore\\\" resumed its regular schedule on March 2nd\"; trains \"depart from 12th and Mission streets, San Francisco, daily, at 9 a. m. and 5:30 p. m.\" Read on the page image."
  },
  {
    "id": "times-gazette-1920-08-14",
    "title": "Times-Gazette (Redwood City), August 14, 1920: the Ocean Shore's towns and stations",
    "publisher": "Times-Gazette (Daly City Public Library scan)",
    "date": "1920-08-14",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_000901",
    "license": "Public domain (published 1920)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n5: \"these Ocean Shore R. R. towns and stations: Tunitas, Lobitos, Sealrox, Purissima, Cowell, Fair Haven, Arleta, Half Moon, Palarictos, Miramar, South Granada, Granada, North Granada, Princeton, Martinez, Marine, Moss Beach, Montara, McNee, Green Canyon, Ransome, Pedro Valley, Fleming, Rockaway, Vellemar, Brighton, Salada, Edgemear, Mussel Rock, Thornton, Crosby, Paoli.\" Read on the page image."
  },
  {
    "id": "daly-city-record-1913-05-09",
    "title": "Daly City Record, May 9, 1913: Ocean Shore Railroad official time schedule (effective December 15, 1912)",
    "publisher": "Daly City Record (Daly City Public Library scan)",
    "date": "1913-05-09",
    "type": "primary_document",
    "url": "https://archive.org/details/cdc_002427",
    "license": "Public domain (published 1913)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n2: \"OFFICIAL TIME SCHEDULE Became Effective Sunday, Dec. 15, 1912\", 31 stations with miles from San Francisco: San Francisco 0.0, Shops 2.5, Onondaga 5.4, Palmetto 7.1, Daly City 7.6, Thornton 9.9, Mussel Rock 11.9, Edgemar 13.1, Salada 14.3, Brighton 14.8, Vallemar 16.0, Rockaway 16.6, Tobin 18.1, Ransome 18.9, Green Canon 21.1, Montara 22.8, Farallon 23.0, Moss Beach 24.1, Marine 24.4, Princeton 26.0, North Granada 26.5, Granada 27.1, South Granada 27.6, Miramar 28.1, Half Moon 30.2, Arleta 30.8, Fairhaven 32.6, Purisima 34.3, Sealrox 34.8, Lobitos 36.1, Tunitas 38.0; \"At Tunitas, stages connect for San Gregorio, La Honda, Ballevale, Pescadero and Pebble Beach.\" Read on the page image; the same table is reprinted in the issues of April-October 1913."
  },
  {
    "id": "sf-chronicle-1909-02-13",
    "title": "San Francisco Chronicle, February 13, 1909: railroad schedules, Ocean Shore Railway",
    "publisher": "San Francisco Chronicle",
    "date": "1909-02-13",
    "type": "primary_document",
    "url": "https://archive.org/details/sanfranciscochr1219unse_0",
    "license": "Public domain (published 1909)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n16: \"OCEAN SHORE RAILWAY (12th and Mission). Daily ex. Sun. Lv. 9:30A, 1:45P, 5:40P. Ar. 7:35A, 9:10A, 5:10 P. Sundays—Lv. 9:30A, *10:10A, 12:15P, 5:40P. … *Granada Express; no stops.\" Read on the page image."
  },
  {
    "id": "oakland-tribune-1920-08-17",
    "title": "Oakland Tribune, 1920-08-17: \"Tunitas trains stop; workers demand raise\"",
    "publisher": "Oakland Tribune",
    "date": "1920-08-17",
    "type": "primary_document",
    "url": "https://archive.org/details/oakland-tribune-1920-08-17",
    "license": "Public domain (published before 1929)",
    "accessed": "2026-10-16",
    "notes": "Scan leaf n4, dateline San Francisco, Aug. 17: workers \"living down the coast on the Ocean Shore Railroad, which operates between here and Tunitas, thirty-eight miles south, are without their usual means of transportation today because the train crews of the railroad have quit their jobs and trains have stopped.\" Read on the page image."
  },
  {
    "id": "western-railroader-1952-15-7",
    "title": "The Western Railroader 15(7), 1952: Rudolph Brandt, \"Ocean Shore 'Reaches the Beaches'\"",
    "author": "Rudolph Brandt",
    "publisher": "The Western Railroader",
    "date": "1952",
    "type": "journal",
    "url": "https://archive.org/details/sim_western-railroader-the-western-railfan_1952_15_7",
    "license": "Copyright status unknown (railfan periodical, 1952); cited for facts only",
    "accessed": "2026-10-16",
    "notes": "Page Seven (leaf n6): \"on October 2, 1907, the first passenger train was operated from San Francisco to Tobin (later known as Pedro Valley)\"; Page Nine (n8): \"The rails reached Granada on June 23, 1908\", Half Moon Bay's first train \"in the middle of October\"; Page Thirteen (n12): Muni's H line \"laid a paralleling track alongside the Ocean Shore's single track from 18th to 25th Streets\"; Page Fifteen (n14): \"On March 4th service was resumed to Tunitas after relocating nearly a mile of roadbed at Devil's Slide\" (1916); Page Seventeen (n16): north-end application filed August 12, 1920, \"Four days later all operating employees left their jobs\". Read on the page images. Secondary; used only where a primary source is missing, and so flagged."
  }
]
```

Optional, not relied on for dates: `crc-d143` (D143_19120713_A143.pdf, the Kansas St spur, 1912-07-13),
`crc-d2683` (D2683_19150809_A1641.pdf, the South Granada agency, 1915-08-09), and *ERJ* 1908-08-01 p. 415,
1908-08-22 p. 526 and 1909-01-23 p. 150 (construction notes, OCR only).
