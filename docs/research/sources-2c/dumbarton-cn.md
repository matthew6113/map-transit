# Research: SP Dumbarton Cutoff passenger service, the end of SP Oakland – Newark – San José trains, and the California & Nevada RR

Gathered 2026-10-16. Extends `railroads.md` sections 5 and 6. Used for `data/past/sp-dumbarton/`.

## How this pass worked, and how far to trust it

- **archive.org page images worked this time.** `https://<ia6…/ia8….us.archive.org>/BookReader/BookReaderImages.php?…&page=n<i>.jpg&scale=2`
  returned images for every item tried (CSRM timetables, Poor's, the Railroad Commissioners' reports, local
  newspapers, Langley's directory). So most quotes below are **[img]**: read on the page image, with the
  printed page read from the image. Leaf numbers are given as `n<i>` (the BookReader index); a leaf link is
  `https://archive.org/details/<id>/page/n<i>/`.
- **Finding pages:** archive.org full-text search
  (`/services/search/beta/page_production/?service_backend=fts&user_query=…`, optionally with
  `page_type=collection_details&page_target=<collection>`) and `fulltext/inside.php` per item. In one
  directory (`langleyssanfranc1892sanf`) the inside.php page index was off by five leaves; the page was then
  found by eye.
- **CPUC D59928** was downloaded from files.cpuc.ca.gov, rendered with `pdftoppm -r 80` and read on the
  image for pp. 1, 10 and 11; the other pages are text-layer OCR **[ocr]**.
- **Tags:** [P] primary (railroad's own timetable, notice or advertisement; contemporary newspaper);
  [O] official (Railroad Commission / CPUC); [C] contemporary compiled (Poor's, directories, Commissioners'
  reports); [W] pointer only; [img] read on the page image; [ocr] OCR text only.
- **Blocked:** cdnc.ucr.edu (proxy 403), so the SF Call / LA Herald leads from `leads-2c` were not re-read.
- The pass's downloads (timetables, newspapers, CRC volumes 1–13, page images) were not kept; each
  entry's archive.org id and leaf reopen it.

---

## 1. SP Dumbarton Cutoff (Redwood City – Dumbarton bridge – Newark), passenger service

### Answer in one paragraph

Yes. SP carried passengers over the Dumbarton bridge on a scheduled local between **Redwood City and Niles**
(via Sweeney, Henderson, Dumbarton, Newark and Centerville) from **Tuesday 1911-12-26** until the timetable
change of **Sunday 1916-10-01**. At first there were two trains each way daily (one a mixed) plus a
Sunday-only train. By late 1912 it was one **mixed train** each way, daily except Sunday (Nos. 512/503 in the
employee timetables of 1914–1916). The Washington Press (Niles) reported in October 1916 that "the Dumbarton
train no longer carries passengers". In 1912 the service was off for a while and "again put on" by
September 1912; when it stopped is not found. No scheduled passenger train over the bridge appears in the SP
Western Division employee timetables checked from 1916-10 through 1943 (freight only), nor in the Coast
Division ones, where "via Dumbarton" columns are freight trains.

### Facts

| # | Fact | Date | Source | id / URL | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| D1 | First regular passenger train Niles – Redwood City over the bridge | **1911-12-26** (Tuesday) | *Times-Gazette* (Redwood City), Vol. LIII No. 36, Sat. 1911-12-30, "Redwood is main transfer station" | `cdc_000451` | p. 1 (n0) | "Railroad passenger communication between this city and Niles, via the Dumbarton bridge, was established Tuesday morning when the first regular train to carry passengers made the trip from the Alameda shore." | [P][img] |
| D2 | Same date, stated outright | 1911-12-26 | same issue, editorial "A red letter day" | `cdc_000451` | p. [2] (n1; no page number on the image) | "Tuesday, December 26, 1911, will probably stand out for years to come as marking a most important epoch in the history of Redwood City … the opening to passenger traffic of the Dumbarton Cutoff." | [P][img] |
| D3 | Headline: four trains a day; schedule printed. Stations: Redwood, Sweeney, Henderson, Dumbarton, Newark, Centerville, Niles. Daily, daily-except-Sunday and Sunday-only columns each way | 1911-12-30 | same, p. 1 | `cdc_000451` | p. 1 (n0) | "Four trains daily to and from Niles will connect at Redwood City." Table: "Redwood … Sweeney … Henderson … Dumbarton … Newark … Centervi.le … Niles" | [P][img] |
| D4 | Fares; a land-deed condition behind the service | 1911-12-30 | same | `cdc_000451` | p. 1 (n0) | "one of the provisions of the transfer was that there should be two passenger trains over the road daily each way between Niles and Redwood City." "To Newark, 40 cents; Centerville, 50 cents; Niles, 60 cents." | [P][img] |
| D5 | Public timetable "Niles-Redwood City": Pass. (Sunday only), Mixed (except Sunday), Pass. (daily). Same times as D3: e.g. Lv Niles 8.15 a.m. → Ar Redwood 9.00; Lv Redwood 9.30 a.m. → Ar Niles 10.22 | 1912-04-26 | *The Washington Press* (Niles), 1912-04-26 | `cafrwtm_000262` | 4th page (n3; no page number printed) | "NILES-REDWOOD CITY To San Francisco Pass. (Sunday Only) Mixed (Except Sunday) Pass. (Daily) … Dumbarton 3.18 3.39 8.38 Arr. Redwood 3.40 4.35 9.00" | [P][img] |
| D6 | Service had stopped and was restored as one mixed train | by 1912-09-21 | *Times-Gazette*, Sat. 1912-09-21, "Redwood City local notes" | `cdc_000489` | p. [2] (n1) | "The Southern Pacific Company has again put on the Dumbarton cut off train between this city and Niles. The train arrives here every afternoon at 4:30 and returns at 5:15 o'clock. It carries passengers and freight." | [P][img] |
| D7 | Public timetable: one train each way | 1912-11-08 | *The Washington Press*, 1912-11-08, "S. P. time table" | `cafrwtm_000281` | 3rd page (n2) | "Dumbarton Cut-Off: Lv.Redwood 512 5.15p Oakland Ar.Newark 6.00p Lv.Newark 509 3.20p Ar.Redwood 4.30p" | [P][img] |
| D8 | Local complaints about the service (context) | 1913-10-04 | *Times-Gazette*, "Palo Alto urges Dumbarton service" | `cdc_000543` | — | "the people find it impossible to reach Palo Alto over the Dumbarton line, because of the delays due to train changes, in less than three and a half or four hours." | [P][ocr] |
| D9 | **SP employee timetable**: "Dumbarton and Centerville Branch"; second-class No. 512 "Redwood Mixed", Leave Daily Ex. Sunday, Redwood City 3.20 PM, Sweeney f3.30, Henderson f3.35, Dumbarton f3.50, Newark s4.20, Centerville s4.32, Niles s4.45 PM; No. 503 "Redwood Mixed", Niles 1.40 PM → Redwood City s3.05 PM. No first-class train crosses the bridge | eff. **1914-01-04** | SP Western Division Time Table No. 153 (CSRM) | `cscrm_2021_02_000614` | p. 15 (n39) | "Dumbarton and Centerville Branch … Time Table No. 153 January 4, 1914 … 512 Redwood Mixed Leave Daily EX. SUNDAY … 503 Redwood Mixed" | [P][img] |
| D10 | Same mixed train, last timetable with it: 512 Redwood City 3.30 PM, Sweeny f, Henderson f3.40, Dumbarton f3.55, Newark s4.20, Centerville s4.32, Niles s4.45 PM; 503 Niles 1.40 PM → Redwood City s3.10 PM | eff. **1916-05-28** | SP Western Division Time Table No. 166 | `cscrm_2021_02_000730` | p. 16 (n31) | "Dumbarton and Centerville Branch … Time Table No. 166 May 28, 1916 … 512 Redwood Mixed … 503 Redwood Mixed … Leave Daily EX. SUNDAY" | [P][img] |
| D11 | In between, the "Redwood Mixed" is in every Western Division timetable in the collection: Nos. 154, 155, 156 (1914), 157–162 (1915), 163–165 (1916) | 1914-05 to 1916-04 | CSRM items `cscrm_2021_02_000615 … 000729` | — | — | OCR of each table header reads "Redwood … Mixed" | [P][ocr] |
| D12 | Public notices of the same train | 1915-07 to 1915-11 | *The Washington Press*, weekly "trains leave Niles" list (e.g. 1915-07-10) | `cafrwtm_000338` etc. | — | "503—From Niles to Redwood, via Dumbarton…1:40 p. m." | [P][ocr] |
| D13 | Named in a 1916 accident report | 1916-04-12 | *The Washington Press*, 1916-04-29 | `cafrwtm_000369` | — | "At about 11:20 a.m., April 12, 1916, crew of Niles-Redwood mixed train, engine 1663" | [P][ocr] |
| D14 | **End of passenger carriage**, with the timetable change of Sunday 1916-10-01 | **1916-10-01** | *The Washington Press*, Vol. XXVIII No. 6, Sat. 1916-10-07, "Southern Pacific time table has many changes" | `cafrwtm_000387` | p. 1 (n0) | "the new time tables of the Southern Pacific Company went into effect last Sunday, October 1 … In the Niles-Centerville-Newark branch several important changes have been made. The Dumbarton train no longer carries passengers." | [P][img] |
| D15 | Confirmed in the next employee timetable: no mixed; only freights (254, 242, 253) cross Redwood City – Newark | eff. 1916-10-01 | SP Western Division Time Table No. 167 | `cscrm_2021_02_000731` | p. 16 (n37) | Table lists 254, 242 (freight), 92, 188 (Newark – Niles passengers), 507/505/509/513/515, 253; nothing else between Redwood City and Dumbarton | [P][img] |
| D16 | Still freight only: 1917-07 (No. 169, p. 16, n25), 1917-11 (No. 170, p. 16, n33), 1918-06 (No. 172, p. 16, n23), 1919-06 (No. 3, p. 16, n15) | 1917–1919 | CSRM `000778`, `000779`, `000800`, `000825` | — | as given | (tables read on the images) | [P][img] |
| D17 | Still freight only, 1943: Niles Subdivision, Redwood Jct. – Dumbarton – Newark carries freights 408, 402, 406, 473, 477, 401 | 1943-02-15 | SP Western Division Time Table No. 237 | `cscrm_2021_02_001515` | p. 11 (n10) | "402 Freight … 473 Freight … 401 Freight" (no passenger column on the Redwood Jct. line) | [P][img] |
| D18 | Coast Division "via Dumbarton" columns are freight (e.g. 1930: third-class 265 "Ogden Manifest", "Via Dumbarton") | 1930-06-15 | SP Coast Division Time Table No. 130 | `cscrm_2021_02_001156` | p. 7 (n6) | "265 Ogden Manifest … Via Dumbarton" | [P][img] |
| D19 | Pre-service excursion (not scheduled) | 1911-05-21 | *The Washington Press*, 1911-05-19 | `cafrwtm_000263` | — | "the first round the bay excursion across Dumbarton Bridge for next Sunday, May 21. The train will leave Oakland at First and Broadway" | [P][ocr] |

Notes:
- Stop letters "s" and "f" are printed in the tables; the timetables' own legend for them was not found in
  this pass (by SP convention: regular stop / flag stop). The 1911 newspaper table uses the same letters.
- The Dumbarton station moved on paper: mile 33.2 from San Francisco in 1914 (No. 153), 33.9 in 1916
  (No. 166). Henderson 29.2 → 29.5. Distances only; no location is sourced.
- Distances (No. 153, 1914): San Francisco 0.0, Redwood City 25.4, Bestos 26.4, Sweeney 28.0, Henderson
  29.2, Ravenswood 30.9, Dumbarton 33.2, Newark 37.2, Mattos 39.0, Centerville 40.0, Niles 42.9 [img].
- Railroad Commission: CRC Decisions vols 1–13 (1911 – Aug 1917) on archive.org
  (`california-railroad-commission-decisions_1` … `_13`) were searched by OCR for "Dumbarton" and for
  Niles with Redwood/Newark. Only freight-rate cases mention the cutoff (vol 1, vol 11). **No CRC order on
  the 1916 change was found** [ocr]. The CRC annual reports were not searched.
- Specials after 1916 (e.g. the Liberty Bell train, Nov 1915, *Times-Gazette* 1915-11-13; an excursion
  "via the Dumbarton cut-off", 1916-04-22) are pointers only [ocr] and are not scheduled service.

---

## 1b. End of SP passenger trains Oakland – Newark – San José after 1940

### Answer

The last SP passenger trains on the Elmhurst – Newark – Santa Clara line were **Nos. 250/255** (the Oakland
section of the Coast Daylight) and **Nos. 73/74** (the Oakland section of the Lark). CPUC Decision **59928**
(A.41544), dated **1960-04-12** and effective twenty days later, authorized their discontinuance. An SP
schedule statement says 74, 250 and 255 last ran on **1960-05-01** and 73 on **1960-05-02**. Mail trains
90/91 then moved to the line "but will not handle passengers".

| # | Fact | Date | Source | id / URL | Page | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| N1 | Daily passenger round trip 250/255 Oakland Pier – Newark – Santa Clara, plus the Oakland Lark 74/73. 250: SF 7.00 AM, Oakland Pier 7.35, Oakland (First St) s7.47, Fruitvale s7.54, Newark s8.23, Santa Clara 8.45 AM | eff. 1941-09-28 | SP Western Division Time Table No. 234, Niles Subdivision | `cscrm_2021_02_001466` | p. 12 (n11) | "250 Passenger … 255 Passenger … 74 Oakland Lark" | [P][img] |
| N2 | Station list of that line in 1941: Oakland Pier, West Oakland, Magnolia Tower, Oakland (First Street), East Oakland, Fruitvale, Elmhurst, Mulford, Robert, Russell, Mount Eden, Baumberg, Alvarado, Hall, Arden, Newark, Mowry, Albrae, Drawbridge, Alviso, Agnew, Santa Clara | 1941 | same | same | p. 12 (n11) | Rule 5: "Elmhurst-Santa Clara line" | [P][img] |
| N3 | Still running: 250 Leave Daily, Oakland Pier 7.25 AM … Newark s8.20, Agnew c8.38, Santa Clara 8.44, San Jose 8.50 AM | eff. 1955-01-09 | Timetable No. 259 | `cscrm_2021_02_001859` | p. 10 (n13) | "250 Passenger Leave Daily" | [P][img] |
| N4 | Still running in 1958 (No. 268, p. 8, n9) and 1959 (No. 270, p. 6, n15; now from West Oakland 6.25 AM) | 1958-04-27; 1959-04-26 | CSRM `001967`, `001998` | — | as given | "250 Passenger" | [P][img] |
| N5 | **CPUC authority**: application filed 1959-10-02; order | **1960-04-12**, effective 20 days after | CPUC D59928 (A.41544) | files.cpuc.ca.gov …/Decisions_D57801_to_D73750/D59928_19600412_A41544.pdf | p. 10 | "hereby authorized to discontinue the operations of passenger trains Nos. 73, 74, 250 and 255 between Oakland and San Jose and intermediate points" | [O][img] |
| N6 | Order date and effective date | 1960-04-12 | same | same | p. 11 | "The effective date of this order shall be twenty days after the date hereof. Dated at San Francisco, California, this 12th day of April, 1960." | [O][img] |
| N7 | What 250/255 were | — | same | same | p. 1 | "passenger trains Nos. 250 and 255, the Oakland section of the Coast Daylight, between Oakland and San Jose" | [O][img] |
| N8 | Ridership, late 1959 (daily average revenue passengers, Aug/Sep/Oct): 250: 61/41/27; 255: 52/37/24; 73: 29/29/19; 74: 22/24/19 | 1959 | same | same | p. 5 | "The daily average number of revenue passengers using trains Nos. 73, 74, 250, 255, 90 and 91" | [O][ocr] |
| N9 | **Last runs** | **1960-05-01** (74, 250, 255); **1960-05-02** (73) | SP Schedule Statement ST-798, 1960-05-09, bound into Timetable No. 272 | `cscrm_2021_02_002028` | n9 (memo sheet over p. 6) | "Passenger Trains Nos. 74, 250 and 255 were discontinued between Oakland and San Jose following the last operation on May 1, 1960, and Train No. 73 was discontinued following the last operation on May 2nd" | [P][img] |
| N10 | Same, in a handwritten note on the printed table | 1960 | same timetable | same | p. 7 (n10) | "No. 255—last day of operation 5-1-60. No. 73— " " " 5-2-60." (handwritten red ink, owner unknown) | [P][img] |
| N11 | After the change: 90/91 "Mail" and 335/336 "Oakland C.M.E./C.M.W." only, no "Passenger" | eff. 1961-04-30 | Timetable No. 274 | `cscrm_2021_02_002064` | p. 2 (n3) | "90 Mail … 336 Oakland C. M. E." | [P][img] |

---

## 2. California & Nevada Railroad (3 ft gauge, Emeryville/Oakland – Berkeley – San Pablo – Bryant)

### Answer in one paragraph

Yes, it carried the public, but irregularly. The sources show: trains "twice a week" to the end of track
near Orinda Park in **October 1889**; excursion and picnic trains from **1889** on (Oak Grove); in **July
1892** the company told the Railroad Commissioners it collected fares and had "fare schedules"; a San
Francisco **ticket office (650 Market)** in the 1892 and 1893 directories; **passenger earnings of $2,816**
in the year to 1895-06-30; a **daily express train Oakland (Emery station) – Bryants from 1896-06-01**,
connecting with a stage for Lafayette and Walnut Creek; and by **December 1897** "no longer runs trains
regularly", only two or three round trips a week. A daily train is reported again in Oct 1899 and July 1900
(mostly hay and grain; passengers not stated). Poor's 1891 and 1892 still say "no operations other than
transportation of construction materials", which conflicts with the rest. The line was sold at foreclosure
in Nov 1902 (date conflict below), and Poor's 1903 says "The line is not in operation". **Do not draw a
regular passenger service for the whole 1885–1902 span**; the sourced service windows are short.

### Facts

| # | Fact | Date | Source | id | Page (leaf) | Quote (≤ 40 words) | Tags |
|---|---|---|---|---|---|---|---|
| C1 | Built "Oakland east" 17 miles in 1884 | 1884 | *Poor's Manual* 1885 (vol. 18), mileage built in 1884 | `poorsmanualofrai18newyuoft` | — | "California and Nevada. Oakland east 17.00" | [C][ocr] |
| C2 | To a point 4 mi beyond San Pablo, 22 mi; opened March 1885; **no public operation** claimed | as of 1891 | *Poor's* 1891 (vol. 24) | `poorsmanualofrai24newyuoft` | p. 83 (n272) | "formally opened in March, 1885 … Road now in contractor's hands. No operations other than transportation of construction materials." | [C][img] (upgrades the [ocr] in `railroads.md` §5) |
| C3 | Orinda Park – Bryant, 2.5 mi, built 1891; same "no operations" sentence repeated | as of 1892 | *Poor's* 1892 (vol. 25) | `poorsmanualofrai25newyuoft` | p. 95 (n268) | "The extension from Orinda Park to Bryant was built in 1891. … No operations other than transportation of construction materials." | [C][img] |
| C4 | A depot at San Pablo Ave and the cable road; a passenger station planned | 1889-03-28 | *Oakland Tribune*, 1889-03-28 (J. W. Smith interview) | `oakland-tribune-1889-03-28` | — | "a neat building for a passenger station, and railroad offices, on the Johnson lot, just across San Pablo avenue from the present little depot of the California and Nevada Railroad at its crossing with the cable road." | [P][ocr] |
| C5 | Smith's stated plan: Sunday train to Oak Grove; specials on request | 1889-05-09 | *Oakland Tribune*, 1889-05-09 | `oakland-tribune-1889-05-09` | — | "I am going to run a Sunday train to Oak Grove, and Sunday schools and special parties can obtain special trains at other times" | [P][ocr] |
| C6 | **Regular trains twice a week** to the end of track near Orinda Park | 1889-10-10 | *Oakland Daily Evening Tribune*, Thu. 1889-10-10, "The California and Nevada" | `oakland-tribune-1889-10-10` | n5 (no page number in header) | "Regular trains are now run twice a week over the California and Nevada railroad to the end of the road near Orinda Park, General Wagner's ranch." | [P][img] |
| C7 | Same page: no return filed with the Commissioners for 1888–89; "not then running regularly" | 1889-10-10 | same column, "The report of the Railroad Commission for 1889" | same | n5 | "The California and Nevada Railroad has informed Secretary Gaskill that they have nothing to report. Trains were not then running regularly, and the road is still in the hands of the contractor, J. W. Smith" | [P][img] |
| C8 | Picnic train; boarding points | 1890-05-10 | *Oakland Tribune*, 1890-05-09 | `oakland-tribune-1890-05-09` | — | "at Oak Grove, on the California and Nevada Narrow Gauge Railroad. The train will leave Emeryville Junction on the Southern Pacific Railroad at 10 A.M. and San Pablo avenue and Fortieth street at 10:05" | [P][ocr] |
| C9 | **Fares collected; "fare schedules"**; 23 miles long | answer sworn 1892-07-13, filed 07-14 | Board of Railroad Commissioners, *Thirteenth Annual Report* (year ending Sept 1892), Shively v. all railroads | `annualreportboa44commgoog` | p. 118 (n123) | "denies that the rates of railroad fare charged and collected by said defendant are higher … And deny that the present fare schedules of said railroad company should be reduced in any respect whatever." | [O][img] |
| C10 | Same answer: income never covered costs | 1892 | same | same | p. 118 | "the income derived by said company from the operation of its road, and received by it for freights and fares … does not now and never has paid the operating expenses" | [O][img] |
| C11 | **San Francisco ticket office** | 1892 | *Langley's San Francisco Directory*, 1892 edition | `langleyssanfranc1892sanf` | p. 327 (n322) | "California and Nevada Railroad Co., ticket office, 650 Market" | [C][img] |
| C12 | Same in the 1893 directory | 1893 | *Langley's* 1893 | `langleyssanfranc1893sanf` | — | "California and Nevada Railroad Co., ticket office, 650 Market" | [C][ocr] |
| C13 | Leased to and operated by the Pacific Construction and Improvement Co.; 2 passenger cars and 1 combination car | Jan 1893 | *Poor's* 1893 (vol. 26) | `poorsmanualofrai26newyuoft` | p. 107 (n340) | "Leased to and operated by the Pacific Construction and Improvement Co. of San Francisco, Cal. … Cars—passenger, 2; combination, 1" | [C][img] |
| C14 | Route ends, 1893 (satire, but names the terminals) | 1893 | *The Wave* (July–Dec 1893) | `wave1011unse` | — | "The California and Nevada railroad runs from Emery Station, on the Berkeley line, to a stake somewhere in Contra Costa County called 'Bryant.'" | [C][ocr] |
| C15 | "Already in operation" Oakland – Bryants | 1893 | *Industry* magazine 1893 | `industrymagazine1893sanf` | — | "The California and Nevada Railroad is already in operation from Oakland to Bryants" | [C][ocr] |
| C16 | **Passenger earnings** in a full year; operated by the Oakland and San Francisco Terminal Co. | FY to **1895-06-30** | *Poor's* 1896 (vol. 29) | `poorsmanualofrai29newyuoft` | p. 339 (n576), cont. p. 340 | "Operations, year ending June 30, 1895.—Earnings (passenger, $2,816; freight, $3,146)" | [C][img] |
| C17 | Excursion trains from University Avenue (Berkeley) to Oak Grove | 1895-06-23 | *Berkeley Gazette*, 1895-06-24 | `berkeley-gazette-1895-06-24` | — | "two trains on the California and Nevada railroad left University avenue for Oak Grove loaded with firemen" | [P][ocr] |
| C18 | **Daily express train Oakland – Bryants from June 1, 1896**; departs Emery station; freight at 40th St & San Pablo Ave; stage connection | from **1896-06-01** | *Oakland Tribune*, Sat. 1896-06-20 (C&N advertisement, signed C. K. King, receiver; ran daily from 1896-06-01 to at least 07-07) | `oakland-tribune-1896-06-20` | p. 7 (n6) | "on and after June 1st a daily express train will be run between Oakland and Bryants in Contra Costa County, connecting with stage for Lafayette and Walnut Creek. Train leaves Emery station on arrival of the Berkeley train" | [P][img] |
| C19 | Return time | 1896 | same | same | p. 7 | "returning will leave Bryants at 3:10 P. M. Freight and express received at Fortieth street and San Pablo avenue" | [P][img] |
| C20 | Receiver appointed; operations "refused" after FY1895 | May 1896 | *Poor's* 1897 (vol. 30) | `poorsmanualofrai30newyuoft` | — | "Receiver appointed in May, 1896. … Operations, year ending June 30, 1896.—All information refused" | [C][ocr] |
| C21 | Race-day trains from 40th & San Pablo | 1897-07-04 | *Oakland Tribune*, 1897-07-02 | `oakland-tribune-1897-07-02` | — | "Trains leave San Pablo avenue and Fortieth street at 1 P. M. via California and Nevada Railway. Round trip, 25c." | [P][ocr] |
| C22 | **Regular service ends**: occasional trips only | by **1897-12-07** | *Oakland Tribune*, Tue. 1897-12-07, "C. & N. Railroad is not running" | `oakland-tribune-1897-12-07` | p. 4 (n3) | "The California and Nevada Railroad no longer runs trains regularly, owing to a lack of passengers and freight. Round trips are made two or three times a week." | [P][img] |
| C23 | Daily train again (freight emphasized) | 1899-10-26 | *Oakland Tribune*, 1899-10-26 | `oakland-tribune-1899-10-26` | — | "narrow gauge line is again running a daily train … The traffic on this road at present is very light, though during the past two months it has brought in large quantities of hay and grain." | [P][ocr] |
| C24 | Resumption 1900 (hay) | 1900-07-20/25 | *Oakland Tribune*, "California and Nevada Road resumes its operations"; "Lively traffic: daily service on the California and Nevada line" | `oakland-tribune-1900-07-20`, `-07-25` | — | headlines only read; body OCR is garbled | [P][ocr] |
| C25 | Sold at foreclosure; not in operation | 1902-11-29 (or 1903, conflict) | *Poor's* 1903 (vol. 36) | `poorsmanualofrai36newyuoft` | — | "The property was sold under foreclosure Nov. 29, 1902, and was purchased by the Oakland and East Side RR. Co." / "The line is not in operation." | [C][ocr] |
| C26 | Last locomotive scrapped at Emeryville | 1904-01-19 | *Oakland Tribune*, 1904-01-19 | `oakland-tribune-1904-01-19` | — | "The last relic of the old California and Nevada Railroad is now being broken up for scrap iron" | [P][ocr] |

### Stations and route points (all that is sourced)

- **Emery / Emeryville** (junction with SP's Berkeley line; "Emery station"): C8, C14, C18; grade crossing
  "California and Nevada Railroad at Emery" (9th report, `railroads.md` §5).
- **San Pablo Avenue and Fortieth Street, Oakland** (depot at the cable-road crossing; freight office):
  C4, C8, C19, C21.
- **Adeline Street** (crossing of SP's Berkeley branch): `railroads.md` §5 [C][ocr].
- **University Avenue, Berkeley** (excursion boarding point): C17.
- **San Pablo**; "a point 4 miles beyond San Pablo" (1891): C2.
- **Oak Grove** (picnic ground): C5, C8, C17.
- **Orinda Park** and **Bryant / Bryants** (terminus, about 23 mi from Oakland): C3, C6, C9, C16, C18.
- **Street alignment between these points is not sourced.** Do not draw street running; trace from a
  map (below).

---

## Conflicts

1. **Dumbarton passenger span.** Bay Rail Alliance (pointer): "from 1912 to at least 1918". Primary sources
   here: 1911-12-26 to the 1916-10-01 timetable change. The employee timetables of 1917–1919 show no
   passenger or mixed train over the bridge [img]. Use 1911-12-26 → 1916-10-01.
2. **Dumbarton freight opening** (from `leads-2c`): Sept 12, 13 or 24, 1910. Not re-read (CDNC blocked).
3. **Dumbarton 1912 gap.** The April 1912 timetable shows three services; the Sept 1912 note says the train
   was "again put on"; the Nov 1912 timetable shows one mixed. When the trains stopped and how long they
   were off is unsourced.
4. **C&N: Poor's vs everything else.** Poor's 1891 and 1892 [img] say no operations beyond construction
   materials, while the Tribune (Oct 1889) reports regular twice-weekly trains and the company itself (July
   1892) speaks of fares and fare schedules [img]. Poor's text appears to be repeated year to year; prefer the
   company's sworn answer and the newspapers.
5. **C&N in Oct 1889**: the same Tribune column says trains "were not then running regularly" (as of the
   1889 report year) and "Regular trains are now run twice a week" (as of October). Not a contradiction if
   read as before/after; the start date of regular trains is still unsourced.
6. **C&N length**: 22 mi (Poor's 1891), 20.0 + 2.5 mi (Poor's 1893), 23 mi (company 1892; Poor's 1896),
   22 mi (Poor's 1900–1903), "thirty miles" (The Wave 1893, satire).
7. **C&N foreclosure date**: Poor's 1903 says Nov. 29, 1902 in the C&N entry and "Nov. 29, 1903" in the
   Oakland and East Side entry (OCR; not image-checked). *NYT* 1902-11-30 (pointer, OCR) reports the
   auction "to-day". LA Times 1903-02-04 (pointer): sale confirmed by Judge Morrow. Use 1902-11-29 for the
   sale; flag.
8. **SP 1960 end**: the CPUC order became effective 1960-05-02; SP's memo gives last runs 05-01 (250, 255,
   74) and 05-02 (73). Consistent.

## Still unsourced

- Dumbarton: the exact day the 1911 morning daily and Sunday-only trains were dropped (between 1912-04-26
  and 1912-09-21), and the date of the 1912 resumption. The last run of the 1916 mixed (by inference
  Saturday 1916-09-30, since the train ran except Sundays and the change took effect Sunday 10-01; not
  stated anywhere). Any CRC order for 1916 (none found).
- Dumbarton: SP timetables 1910-09 to 1913-12 are not in the CSRM archive.org collection (gap 1909-04 to
  1913-10), so the employee-timetable view of the 1911–1913 trains is missing.
- C&N: the first public passenger train; the end of the 1896 daily express; whether the 1899–1900 daily
  trains carried passengers; the last train of any kind; the Orinda/Bryant end's abandonment; the
  street-by-street alignment.
- Ex-SPC line: which parts of the 1941–1960 "Elmhurst–Santa Clara line" are the old SPC grade and which
  are SP connections (e.g. Elmhurst – Mulford). Not researched here.

## For Matthew (manual work)

- **License question, CSRM timetables.** archive.org rights for the CSRM employee timetables read
  "Copyright Status Unknown … orphan … online access is only provided for the purpose of education and
  research". Citing facts is fine. Before showing page images in the app, decide whether pre-1929 items are
  treated as public domain (they were printed before 1929) and whether to ask CSRM
  (library.csrm@parks.ca.gov) about the 1941–1960 ones.
- **Oakland Tribune on archive.org** (`newspaperarchive-oakland-tribune`) carries no rights statement; the
  1889–1904 issues are pre-1929 US publications (public domain). The *Times-Gazette* and *Washington Press*
  items are marked "Public Domain. No restrictions on use."
- **Map to georeference for the C&N**: the alignment between Emeryville, 40th & San Pablo, Adeline St,
  University Ave and San Pablo / Oak Grove / Orinda Park / Bryant is not in any text found. Candidates:
  "Map shewing the California and Nevada railroad" (Library of Congress, listed in *A List of Maps of
  America*, 1901, pointer `listofmapsofamer00librrich`), 1890s USGS sheets (Concord/San Francisco 15′),
  or the Santa Fe's later right-of-way (the Santa Fe reused part of it).
- **Dumbarton 1912 gap**: the SF Call / Oakland Tribune for May–Sept 1912 (CDNC is blocked from here;
  archive.org has Oakland Tribune issues) would date the suspension and the restart.
- **SP public timetables** (the "Official Guide" or SP folders) for 1912–1916 would confirm the Redwood
  mixed carried passengers in the public tables; Centerville Depot (`leads-2c`) reportedly has Dumbarton
  timetables.

## Sources (suggested `sources.json` ids; none are in the repo yet)

| Source | id / URL | Status | Suggested id |
|---|---|---|---|
| SP Western Division Time Table No. 153, 1914-01-04 (CSRM) | `cscrm_2021_02_000614` | rights "unknown/orphan" (pre-1929) | `sp-ett-wd-153-1914` |
| SP WD Time Table No. 166, 1916-05-28 | `cscrm_2021_02_000730` | same | `sp-ett-wd-166-1916` |
| SP WD Time Table No. 167, 1916-10-01 | `cscrm_2021_02_000731` | same | `sp-ett-wd-167-1916` |
| SP WD Time Tables Nos. 169, 170, 172 (1917–18), No. 3 (1919) | `cscrm_2021_02_000778`, `000779`, `000800`, `000825` | same | — |
| SP WD Time Table No. 237, 1943-02-15 | `cscrm_2021_02_001515` | rights unknown | — |
| SP Coast Division Time Table No. 130, 1930-06-15 | `cscrm_2021_02_001156` | rights unknown | — |
| SP WD Timetables Nos. 234 (1941), 259 (1955), 268 (1958), 270 (1959), 272 (1960, with ST-798), 274 (1961) | `cscrm_2021_02_001466`, `001859`, `001967`, `001998`, `002028`, `002064` | rights unknown | `sp-ett-wd-272-1960` (for ST-798) |
| *Times-Gazette* (Redwood City), 1911-12-30; 1912-09-21; 1913-10-04 | `cdc_000451`, `cdc_000489`, `cdc_000543` | PD (item metadata) | `times-gazette-1911-12-30`, `times-gazette-1912-09-21` |
| *The Washington Press* (Niles), 1911-05-19; 1912-04-26; 1912-11-08; 1915-07-10; 1916-04-29; 1916-10-07 | `cafrwtm_000263`, `000262`, `000281`, `000338`, `000369`, `000387` | PD (item metadata) | `washington-press-1916-10-07`, `washington-press-1912-04-26` |
| CPUC Decision 59928 (A.41544), 1960-04-12 | files.cpuc.ca.gov/…/Decisions_D57801_to_D73750/D59928_19600412_A41544.pdf | California public record | `cpuc-d59928` |
| CRC Decisions vols 1–13 (searched, nothing on Dumbarton passengers) | `california-railroad-commission-decisions_1` … `_13` | PD | — |
| *Poor's Manual* 1885, 1891, 1892, 1893, 1896, 1897, 1903 | `poorsmanualofrai18…`, `24…`, `25…`, `26…`, `29…`, `30…`, `36newyuoft` | PD | `poors-1891`, `poors-1892`, `poors-1893`, `poors-1896` |
| Board of Railroad Commissioners, 13th Annual Report (1892) | `annualreportboa44commgoog` | PD | `ca-brc-report-13` |
| *Langley's San Francisco Directory*, 1892, 1893 | `langleyssanfranc1892sanf`, `langleyssanfranc1893sanf` | PD | `langley-sf-1892` |
| *Oakland Tribune* 1889-03-28, 05-09, 10-10; 1890-05-09; 1896-06-20; 1897-07-02, 12-07; 1899-10-26; 1900-07-20/25; 1904-01-19 | `oakland-tribune-<date>` | pre-1929 (no rights field) | `oakland-tribune-1889-10-10`, `oakland-tribune-1896-06-20`, `oakland-tribune-1897-12-07` |
| *Berkeley Gazette* 1895-06-24; *The Wave* 1893; *Industry* 1893 | `berkeley-gazette-1895-06-24`, `wave1011unse`, `industrymagazine1893sanf` | PD | — |
| Pointers only [W]: Bay Rail Alliance (Dumbarton "1912 to at least 1918") | bayrailalliance.org | — | — |
