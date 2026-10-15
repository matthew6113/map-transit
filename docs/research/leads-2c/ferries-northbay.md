# Research: historic ferries, North Bay street railways and interurbans, and freight belt lines

Gathered on Oct 15, 2026, for the past era (Phase 2c). Read-only research. Nothing in the repo was
changed.

## How this was gathered: read this first

**No page was opened this session.** The tools failed in three ways:

- **WebFetch** failed DNS for every host all session (`getaddrinfo ENOTFOUND`), including
  example.com, archive.org, files.cpuc.ca.gov and en.wikipedia.org.
- **curl** got 403 from the egress proxy for archive.org and files.cpuc.ca.gov. The PDF viewer
  plugin's fetch also failed.
- **WebSearch** worked until its shared budget of 200 searches per turn ran out, and two searches
  in this item were refused because of it. That leaves the Alameda Mole's opening and the
  South Pacific Coast ferry's first run without new sources.

Every new fact below therefore came through the search tool's extract of a page. The tool
summarizes pages, so its quotes may be trimmed or lightly paraphrased.

**Tags**

| Tag | Meaning |
|---|---|
| [P] | Primary: a newspaper, journal, timetable or company publication of the day. |
| [O] | Official: a CRC or CPUC decision, NPS/HABS, ICC, STB, RRB, a court opinion, or a city or state agency. |
| [C] | A contemporary compiled history (county histories, 1876–1883). |
| [W] | Wikipedia, a railfan site, a modern news column, a blog or a marker: a pointer only. |
| [srch] | **New this session:** text relayed by the WebSearch tool's extract, not read on the page. Quotes may be trimmed. Open the page and check before the fact goes on the map. Page numbers are unknown. |
| [repo] | Already in the repo, read in the Oct 14 session (`data/sources.json` notes, `docs/research/*.md`). Its page and tags are as recorded there. |
| [ocr] / [img] | As in the earlier research: OCR only, or read on the page image. |

Nothing here was checked on a page image this session, so no new item carries [img].

---

## 1. SP Creek Route: foot of Mission St (San Francisco) to foot of Broadway (Oakland)

### Facts

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Re-opened | 1876-07-01 | Halley, *Centennial Year Book of Alameda County* (1876) | (repo: early-railroads.md §4) | p. 435 | (see repo) | [C][repo] |
| SF terminal, 1937 | Mission St landing. The ferry company's routes in Jan 1937 included "San Francisco, Mission Street – Oakland, Broadway". | CRC D29464 (1937-01-18, A20742) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D29464_19370118_A20742.pdf | unknown | "San Francisco, Mission Street - Oakland, Broadway" (route list) | [O][srch]; landing table [repo] |
| SF terminal (descriptive) | Foot of Mission St, south of the Ferry Building | Page not identified in the search results; probably cable-car-guy.com's "Yesterday" page | https://www.cable-car-guy.com/ferry/html/yesterday.html (probable) | — | "the Oakland Harbor Ferry of the Southern Pacific runs half hourly from the foot of Mission street, south of the Ferry building, to the foot of Broadway, Oakland" | [W][srch] |
| Traffic before the end | About 10 vehicles a day in 1935, steadily declining | CRC D29338 (1936-12-07, A20753) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D29338_19361207_A20753.pdf | unknown | (paraphrase only: "in 1935 only about ten vehicles a day, on average, used it") | [O][srch] |
| Operator, 1937 | Southern Pacific Golden Gate Ferries, Ltd. (the applicant in D29999) | CRC D29999 (1937-08-09, A21237) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D29999_19370809_A21237.pdf | caption | "authority to abandon its ferry lines between San Francisco and Richmond and the foot of Broadway, Oakland, respectively" | [O][srch] |
| Abandonment authorized | Aug 9, 1937 (the file name's date). D29999 also covers A21297 (SF–Berkeley) and Cases 4201, 4204 and 4225. | CRC D29999 | as above | ordering paragraphs not read | repo note: authorizes abandonment of "the Ferry Building-Oakland (Broadway) and Richmond auto ferries" | [O][repo][ocr] |
| Last run | **Unsourced.** Under decision 17: `closed` on or about 1937-08, citing D29999 | — | — | — | — | — |

### Terminals and route

- **San Francisco:** the Mission St landing, beside and south of the Ferry Building. D29464 lists
  Mission St for Oakland Pier, Alameda and Oakland (Broadway). The repo's note on D29999 says
  "Ferry Building", so the slip should be checked on the order.
- **Oakland:** the foot of Broadway, on the Oakland Estuary.
- **Course:** across the bay and up the estuary to Broadway. Trace it over water: from the Mission
  St slip, round the Alameda/Oakland harbor training walls, then up the estuary.

### Conflicts

- **The SF terminal's name:** "Ferry Building" (repo note on D29999) or "Mission Street" (D29464).
  Probably the same slip complex, but it isn't confirmed.
- **What ran in 1937:** auto ferries under SP-Golden Gate Ferries. Whether any SP passenger boats
  still ran to Broadway separately is unsourced.

### For Matthew

- Read D29999's **order**: its effective date and any "within N days" or tariff-notice condition.
  Decision 17 takes the order's month, but a stated effective date would be better.
- **Newspapers:** Oakland Tribune and SF Chronicle, Aug 10 – Sept 30, 1937, for the last Broadway
  boat. archive.org has `oakland-tribune-1937-08-…` when reachable.

---

## 2. SP mole ferries: Oakland Pier and Alameda Pier to San Francisco

### 2a. Oakland Pier (Long Wharf, then Oakland Mole) to San Francisco

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Ferry from Oakland Point before the Long Wharf | SF & Oakland RR's first trip from the end of its wharf, 1863-09-02 | Halley (1876) | (repo) | p. 177 | "The first trip … was made on the 2d day of September, 1863" | [C][repo] |
| Long Wharf opened | **1871-01-16** | HABS CA-1888, Southern Pacific Mole & Pier (Library of Congress catalog record) | https://www.loc.gov/pictures/item/ca0018/ | catalog summary | "Facilities expanded to Oakland Long Wharf which opened to traffic January 16, 1871." | [O][srch] |
| Long Wharf completed | January 1871 | *History of Alameda County* (Wood, 1883) | (repo) | pp. 629–631 | "completed, in January, 1871" | [C][repo] |
| Oakland Mole opened | **1882-01-22** | HABS CA-1888 | as above | catalog summary | "Developed into Oakland Mole and Pier by Central Pacific, which opened to traffic January 22, 1882, while Long Wharf continued as shipping terminal for freight until 1919." | [O][srch] |
| Mole completed | Begun June 1879, completed 1881 | 1883 history | (repo) | pp. 629–631 | "in 1881 was completed" | [C][repo] |
| Commuter ferries ended | January 1939 | HABS CA-1888 | as above | catalog summary | "Ferry commuter service was discontinued January 1939" | [O][srch] |
| Bridge rail service began | 1939-01-15 | CRC D33445 (1940) | (repo: sp-east-bay.md) | p. 9 | "It was not until January 15, 1939, that the bridge was opened to rail service." | [O][img][repo] |
| ICC authority to end the ferry | ICC decision of **May 14, 1958**, Finance Docket No. 19960, for SP and WP | A CPUC decision of 1958 that recites it: D56900 (1958-06-24, A39899) or D57169 (1958-08-12, A40157). The search result didn't show which. | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D57169_19580812_A40157.pdf ; …/D56900_19580624_A39899.pdf | unknown | "by its decision of May 14, 1958, in Finance Docket No. 19960, the Interstate Commerce Commission authorized Southern Pacific Company and Western Pacific Railroad Company to abandon the use of the ferries between the Oakland pier and San Francisco" | [O][srch] |
| Replacement buses | CPUC certificate for SP buses between the Ferry Building and the Sixteenth and Wood St station, run by Western Greyhound Lines; the ferry was to end when the buses started | CPUC D56964 (1958-07-08, A40234) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D40600_to_D57800/D56964_19580708_A40234.pdf | unknown | "the Interstate Commerce Commission has authorized applicant to abandon at such time as bus service is commenced over the San Francisco-Oakland Bay Bridge" | [O][srch] |
| WP's use of the ferry | 366 revenue passengers to or from San Francisco over nine months (WP trains 1 and 2) | CPUC decision of Aug 1958, probably D57169 (A40157) | as above | unknown | "a total of 366 revenue passengers to or from San Francisco used the presently provided ferry service" | [O][srch] |
| Last ferry | **1958-07-30** (HABS) | HABS CA-1888 | as above | catalog summary | "all ferry service was discontinued on July 30, 1958" | [O][srch] |
| Last ferry (alternatives) | Jul 29, 1958 (*San Leandro*) or Jul 31, 1958 | cruiselinehistory.com; Oakland LocalWiki, citing the Oakland Tribune of Jul 31, 1958 | https://www.cruiselinehistory.com/last-ferry-to-san-francisco/ ; https://oaklandwiki.org/Oakland_Long_Wharf | — | "The last ferryboat to San Francisco, the "San Leandro", operated on July 29, 1958." | [W][srch] |
| Terminal abandoned | 1960-05-14 | HABS CA-1888 (data pages) | https://tile.loc.gov/storage-services/master/pnp/habshaer/ca/ca0000/ca0018/data/ca0018data.pdf | unknown | "abandoned for all operational use May 14, 1960" | [O][srch][ocr] |
| Last vessel | *San Leandro* (acquired by SP 1945) | SF Memory (sfm003-10872) | https://sfmemory.org/Display/sfm003-10872 | — | "the last passenger ferry to leave service in July 1958" | [W][srch] |

**Terminals.** San Francisco: the Ferry Building, foot of Market St (D56964 names it for the
buses; the ferry slip itself isn't quoted). East Bay: the Oakland Pier (Oakland Mole) at the west
end of Seventh St.

**Phases to draw.** Treat them as one ferry line with segments by era (the terminal moved):

- 1863–1871: from the SF & Oakland wharf at Oakland Point;
- 1871-01-16 to 1882-01-22: the Long Wharf;
- from 1882-01-22 to 1958-07-30: the Mole.

### 2b. Alameda Pier (Alameda Mole) to San Francisco

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Earlier SF & Alameda RR ferry | Trial trip 1864-08-13; ferry abandoned 1873-09-29 | Halley p. 190; 1883 history p. 630 | (repo) | p. 190; p. 630 | (see repo) | [C][repo] |
| South Pacific Coast service | Alameda–Los Gatos regular service 1878-06-01 (implies the SPC ferry from Alameda Point by then) | 1883 history | (repo) | p. 833 | (see repo) | [C][repo] |
| Mole built | 1876–1878 by the South Pacific Coast; SP leased it in 1887 | Wikipedia, "Alameda Mole" | https://en.wikipedia.org/wiki/Alameda_Mole | — | (relayed) "built by the South Pacific Coast Railroad in 1876–1878" | [W][srch] |
| SP lease of the SPC | From 1887-07-01 | *Poor's Manual* | (repo) | — | — | [C][repo] |
| Last ferry | **1939-01-15**, early hours | George W. Hilton, quoted on Wikipedia; Alameda Museum Quarterly (Summer 2015) gives the same date | https://en.wikipedia.org/wiki/Alameda_Mole ; https://alamedamuseum.org/wp-content/uploads/2024/09/AMQ_2015_Summer.pdf | Hilton's page unknown | "The ferry was abandoned in the early hours of January 15, 1939" | [W][srch] (Hilton is a published book: a citable [C]-grade source once the page is known) |
| Supporting primary | The IER's Time Table No. 1, "To Take Effect Sunday, January 15, 1939, at 4:01 A. M." | CSRM `cscrm_2021_02_001411` | (repo: east-bay-electric.md) | — | as quoted | [P][repo] |
| Terminal's fate | The Navy demolished the terminal the following year (Naval Air Station Alameda) | Alameda Post | https://alamedapost.com/history/south-pacific-coast-narrow-gauge-railroad-once-traversed-alameda/ | — | — | [W][srch] |

**Terminals.** San Francisco: the Ferry Building or the Mission St landing (D29464 puts Alameda at
Mission St in January 1937). Alameda: the Alameda Pier (Alameda Mole) at the west end of Alameda,
where the trains ran four tracks to the slips (RAG p. 461, repo).

### Conflicts

1. **The Oakland Mole's completion:** "in 1881" (1883 history) vs opened to traffic 1882-01-22
   (HABS). Not really a conflict: built 1881, opened January 1882. Use 1882-01-22.
2. **The last Oakland Pier ferry:** Jul 29, Jul 30 or Jul 31, 1958. HABS [O] says Jul 30. The
   Tribune of Jul 31 (via LocalWiki) is probably reporting the previous night's last run.
3. **The SF end of the 1958 buses:** the Ferry Building (D56964) vs Third & Townsend (railfan
   sites). Not a ferry question.

### For Matthew

- **Oakland Tribune:** 1958-07-29 to 08-01 (last *San Leandro* run) and 1939-01-14 to 01-16 (last
  Alameda boat; the end of commuter boats at Oakland Pier).
- **Book page:** Hilton's "early hours of January 15, 1939". Which Hilton book and which page?
- **The ICC report:** Finance Docket No. 19960, decided 1958-05-14, in *ICC Reports* (Finance
  Reports) — HathiTrust.
- When the CPUC server is reachable: re-read D56900, D56964 and D57169 to fix which decision
  carries the ICC recital.
- HABS CA-1888 data pages (tile.loc.gov): read on the page image.

---

## 3. Benicia–Port Costa, Martinez–Benicia, Richmond–San Rafael, Vallejo–Mare Island, Petaluma River

### 3a. Benicia–Port Costa train ferries (*Solano*, *Contra Costa*)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Opened | 1879 | *History of Contra Costa County* (1882) | (repo) | (repo) | — | [C][repo] |
| Opened (month) | December 1879 | CPRR Museum, "The railroad ferry steamer *Solano*" | https://cprr.org/Museum/Solano/index.html | — | "From December, 1879, until the opening of the Benicia-Martinez (Carquinez) Railroad Drawbridge on October 15, 1930, all Central Pacific and Southern Pacific trains crossed the mile-wide Carquinez Straits by ferry" | [W][srch] |
| *Solano*'s first trips | Maiden voyage 1879-11-24, service from 1879-12-01 (Wikipedia), or maiden voyage 1879-12-28 (Benicia Magazine) | Wikipedia "Solano (ferry)"; Benicia Magazine | https://en.wikipedia.org/wiki/Solano_(ferry) ; https://www.beniciamagazine.com/looking-back-race-across-the-strait/ | — | — | [W][srch] |
| Track to the slip | Benicia–Fairfield completed 1879-12-06 | Wikipedia "Rail transportation in Solano County" | https://en.wikipedia.org/wiki/Rail_transportation_in_Solano_County,_California | — | — | [W][srch] |
| *Contra Costa* added | 1914 | CPRR Museum | as above | — | "the Southern Pacific built and added a second, slightly larger ferry, the "Contra Costa," to the service" | [W][srch] |
| Bridge opened | 1930-10-15 | *SP Bulletin*, Nov–Dec 1930 | (repo) | (repo) | — | [P][ocr][repo] |
| First passenger train over the bridge, and its dedication | Oct 15, 1930; formal dedication Nov 1, 1930 | Solano County Historical Articles, "Benicia–Martinez bridge makes history" | https://www.solanoarticles.com/history/index.php/weblog/print/beniciamartinez_bridge_makes_history/ | — | (relayed) first passenger train crossed Oct 15, 1930; formal dedication Nov 1, 1930 | [W][srch] |
| Last ferry crossing | **Nov 1, 1930** (a photo of the *Solano* leaving Port Costa with a passenger train on her last crossing) | OpenSFHistory wnp37.02981 | https://test.opensfhistory.org/photo/wnp37.02981 | — | (relayed caption) "last crossing of the Carquinez Strait to Benicia" | [W][srch] |
| Last ferry (another caption) | Nov 1, 1930 | Contra Costa County Historical Society photo search (Port Costa / Transportation / Marine) | http://www.cocohistory.com/selpic.php?city=PORT+COSTA&cat=TRANSPORTATION&scat=MARINE | — | "last ferry to leave Port Costa, November 1, 1930"; "both ferries were dismantled upon the completion of the Martinez-Benicia railroad bridge Nov 1, 1930" | [W][srch] |
| *Solano*'s fate | Sold 1931; scuttled near Antioch as a breakwater | CPRR Museum | as above | — | "sold by the SP in 1931 and towed some thirty miles east of Benicia to Antioch, CA, where the then half-century old vessel was scuttled to serve as a breakwater" | [W][srch] |

**Terminals.** The SP train-ferry slips at Benicia (Solano County) and Port Costa (Contra Costa
County), across Carquinez Strait. The slips' exact positions aren't sourced here: trace them from
a USGS sheet before 1930 (Karquinez 1898 or Mare Island 1916, both already queued).

**Conflict.** The bridge opened Oct 15, 1930, but a photo caption and the CCCHS date the last
ferry crossing Nov 1, 1930, the day of the formal dedication. The ferries may have run until the
dedication, or the photo may show a ceremonial last trip. **Neither date has a primary source.**

**For Matthew**

- Was the end authorized by an order? This was interstate railroad operation, so the ICC is the
  likely regulator rather than the CRC. No order has been found, so decision 17's "order's month"
  rule has no order to use here. Options: (a) 1930-10-15 from the *SP Bulletin* [P] as "replaced
  by the bridge", or (b) 1930-11-01 from the captions, flagged.
- **Newspapers:** Oakland Tribune and SF Chronicle, Oct 15–16 and Nov 1–3, 1930; *Contra Costa
  Gazette* (Martinez) and *Benicia Herald* for the same days.

### 3b. Martinez–Benicia auto ferry

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Running "since 1913" | — | CRC D22535 | (repo) | (repo) | "since 1913" | [O][repo] |
| CRC certificate | Granted to the Martinez-Benicia Ferry and Transportation Company; about a 30-minute weekday headway | CRC D22535 (1930-06-14, A16420; the OCR reads 15420) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D22535_19300614_A16420.pdf | unknown | "application of the Martinez-Benicia Ferry and Transportation Company for certificate of public convenience and necessity to operate a ferry over Carquinez Strait between the City of Martinez and the Town of Benicia" | [O][srch] |
| Owner from 1929 | American Toll Bridge Co. held all the stock | *American Toll Bridge Co. v. Railroad Commission* (Cal. 1938) | https://caselaw.findlaw.com/court/ca-supreme-court/1784505.html | unknown | "all of the outstanding stock of the Rodeo-Vallejo Ferry Company and of the Martinez-Benicia Ferry and Transportation Company" | [O][srch] (the 1929 date is [W], Gribblenation) |
| Municipal ownership | CRC approved the transfer to the cities; the company was relieved of its utility obligation | CRC D33769 (1940-12-26, A23670) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D33769_19401226_A23670.pdf | unknown | (paraphrase only) | [O][srch] |
| Transferred | To the City of Martinez, 1941-01-01; Benicia withdrew | Gribblenation, citing *California Highways & Public Works* | http://www.gribblenation.org/2019/11/the-original-alignment-of-us-route-40.html | — | "The ferry was transferred to the City of Martinez on January 1st of 1941" | [W][srch] |
| Last run | **1962-09-14** (markers) or **1962-09-15** (Gribblenation) | Martinez marker (HMDB 27645); ECV 13; Gribblenation | https://www.hmdb.org/m.asp?m=27645 ; https://ecv13.org/martinezport-costa/ ; Gribblenation as above | — | "with the opening of the George Miller Jr. Memorial Bridge the ferry ceased operations September 14, 1962" (ECV 13); "until September 15, 1962, when it was replaced by a highway bridge" (Gribblenation) | [W][srch] |
| Last vessel | *Carquinez* (the second of the name, 1956–62) | City of Benicia / Benicia Magazine | https://www.beniciamagazine.com/early-commercial-activities-along-benicias-waterfront/ | — | — | [W][srch] |

**Terminals.** Martinez: the public wharf and ferry slip (Living New Deal lists a "Public Wharf
and Ferry Slip (former)" in Martinez). Benicia: the ferry slip at the foot of First St [W,
unsourced]. Read both off a USGS sheet of 1950–59.

**Conflicts**

- **The last day:** Sept 14 vs Sept 15, 1962. A last run on the evening of the 14th with the bridge
  opening on the 15th would fit both. Unconfirmed.
- **No end order:** from 1941 the ferry was municipal, which D33769 relieved of utility status, so
  there may be no CPUC order to take a month from (decision 17).

**For Matthew**

- *California Highways and Public Works*, Sept–Oct 1962: the bridge opening (Caltrans [O]; on
  archive.org).
- *Contra Costa Gazette* and *Benicia Herald*, Sept 13–17, 1962.

### 3c. Richmond–San Rafael auto ferry

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Opened | **1915-05-01** | Wikipedia "Richmond–San Rafael Ferry Company" | https://en.wikipedia.org/wiki/Richmond%E2%80%93San_Rafael_Ferry_Company | — | "began car ferry service on May 1, 1915, as a subsidiary of the Oliver J. Olson & Company" | [W][srch] |
| Operator | Richmond–San Rafael Ferry & Transportation Co. (Olson subsidiary) | as above | as above | — | — | [W][srch] |
| Terminals | Castro Point (Richmond) – Point San Quentin | CPUC D47825 (1952) | (repo) | (repo) | — | [O][repo] |
| Marin landing | The former North Pacific Coast wharf at San Quentin | Wikipedia | as above | — | — | [W][srch] |
| Crossing | "approximately 3.76 miles and about 25 minutes" | CRC D14727 (1925) | (repo) | (repo) | as quoted | [O][repo] |
| Last run | Night of **1956-08-31 to 09-01**; the bridge opened 1956-09-01 | Wikipedia (two articles) | https://en.wikipedia.org/wiki/Richmond%E2%80%93San_Rafael_Bridge | — | "Ferry service ran until the night of August 31–September 1, 1956, when the Richmond–San Rafael Bridge opened." | [W][srch] |
| Vessel | *Sierra Nevada* served until the bridge opened | Wikipedia "Sierra Nevada (ferry)" | https://en.wikipedia.org/wiki/Sierra_Nevada_(ferry) | — | — | [W][srch] |

**Conflict (an aside on SF–Richmond).** The Wikipedia article (relayed) says SP's San
Francisco–Richmond route was inaugurated 1925-01-15 and that SP "discontinued ferry service to
Richmond in 1939". But CRC D29999 (Aug 1937) authorized SP-Golden Gate Ferries to abandon the
SF–Richmond line. Read D29999 before drawing any SF–Richmond route.

**For Matthew**

- **Newspapers:** Richmond Independent and San Rafael *Independent-Journal*, Aug 31 – Sept 1,
  1956; Richmond and San Rafael papers about May 1, 1915.
- Is there a CPUC decision of 1956 ending the certificate? Not found.

### 3d. Vallejo–Mare Island (Navy yard) ferry

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Causeway (first) | The Navy began a causeway from Tennessee St in 1918; drawbridge done summer 1919; celebrated 1919-07-03 | *Daily Republic* (Fairfield), "Drawbridge is a Mare Island workhouse" | https://www.dailyrepublic.com/news/solano-county/drawbridge-is-a-mare-island-workhouse/article_4f6fb9c7-046d-523d-bd5b-748214201b53.html | — | "It completed the bridge in the summer of 1919, with an opening celebration on July 3, 1919." | [W][srch] |
| Causeway bridge (city) | "originally built in 1934" | City of Vallejo, Mare Island Causeway Bridge maintenance project | https://www.vallejo.gov/our_city/departments_divisions/public_works_department/engineering_division/capital_projects/project_archive/mare_island_causeway_bridge_preventative | — | "The Mare Island Causeway Bridge, originally built in 1934, is a vehicle and pedestrian bridge that straddles the Napa River" | [O][srch] |
| Ferry end | After World War II | Wikipedia "Vallejo (ferry)" | https://en.wikipedia.org/wiki/Vallejo_(ferry) | — | "Ferry service was discontinued after the end of World War II, and with the construction of a causeway connecting Mare Island and Vallejo" | [W][srch] |
| A wartime vessel | *City of Seattle*, out of service at Mare Island 1946-10-14 | Wikipedia "City of Seattle (steam ferry)" | https://en.wikipedia.org/wiki/City_of_Seattle_(steam_ferry) | — | "taken out of service at Mare Island on October 14, 1946" | [W][srch] |
| Operator | "Mare Island Line" (Robert Rauhauge bought the *Vallejo* in 1923): a blog only | Medium, "The fascinating history of Vallejo's ferry service" | https://medium.com/@vallejoferry/the-fascinating-journey-of-vallejos-ferry-service-4214c45e9186 | — | — | [W][srch] |
| Opened; terminals | **Unsourced** | — | — | — | — | — |

**Conflict.** A causeway from 1919 (Daily Republic) or 1934 (City of Vallejo), yet the ferry ran
until after WWII (Wikipedia). The ferry plainly outlived the first causeway, so the "replaced by
the causeway" story is unproven.

**For Matthew.** This line has no primary or official source yet: operator, opening, terminals
(the Vallejo landing, probably the foot of Georgia St, is **unsourced**) and end. Leads:

- the NPS/HAER Mare Island Naval Shipyard documentation;
- *Vallejo Times-Herald* 1919-07-03 and 1946–47;
- Navy yard annual reports.

Suggest leaving it off the map until one is found.

### 3e. Petaluma River steamers (P&SR's *Gold* and *Petaluma*)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| *Gold* on the run | Petaluma–San Francisco "since 1883" | Wikipedia "Petaluma and Santa Rosa Railroad" | https://en.wikipedia.org/wiki/Petaluma_and_Santa_Rosa_Railroad | — | "The Steamer Gold had been providing ferry service between Petaluma and San Francisco since 1883." | [W][srch] |
| Petaluma terminal | The *Gold* landing at the foot of Copeland St (P&SR's first spike, 1904-04-05) | Wikipedia (as above); City of Petaluma, Steamer Landing Park | as above; https://cityofpetaluma.org/location/petaluma-steamer-landing-park/ | — | — | [W][srch] |
| *Petaluma* | Built 1914; the 36-mile run; more than 10,000 trips | HMDB "Petaluma's Sternwheel" marker | https://www.hmdb.org/m.asp?m=234181 | — | — | [W][srch] |
| Passengers ended | 1935; freight went on (*Gold* scrapped 1940) | Wikipedia (as above) | as above | — | "ferry passenger service was discontinued in 1935" | [W][srch] |
| Last trip | **1950-08-24** | *Petaluma Argus-Courier* / petaluma360, "Petaluma's Past: the steamboat era of Petaluma Creek" | https://www.petaluma360.com/article/entertainment/petalumas-past-the-steamboat-era-of-petaluma-creek/ | — | "the last steam boat, the Petaluma III, left here on Aug. 24, 1950" | [W][srch] |
| Last skipper | Capt. John Urton, 1950 | Sonoma County Library photo (Calisphere) | https://calisphere.org/item/86d2c0239fe8319ba3396941c76b2700/ | — | "Captain John Urton, last skipper of the Steamer Petaluma" (title) | [W][srch] |
| San Francisco landing | **Unsourced** | — | — | — | — | — |

**Conflict.** The earlier research had "Aug 24 or Apr 24" 1950. Two sources this session give
Aug 24, 1950, so Apr 24 looks like an error. Still [W].

**For Matthew**

- The **San Francisco wharf**: no source found. Candidates (unverified): Washington St wharf / Pier
  42 or Jackson St.
- **Leads:** a P&SR public timetable; the CRC decision that ended steamer passengers (about 1935;
  not found); the *Petaluma Argus-Courier* of Aug 24–25, 1950.

---

## 4. Golden Gate Ferry Co. / Southern Pacific–Golden Gate Ferries: extras

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| SP-GGF incorporated; took over | Incorporated 1929-02-18; took over the Berkeley service and others 1929-05-01 | Wikipedia "Golden Gate Ferry Company" / "Berkeley Pier" | https://en.wikipedia.org/wiki/Golden_Gate_Ferry_Company | — | "On May 1, 1929, ferry service to San Francisco from the Berkeley Pier was taken over by the new company." | [W][srch] (May 1, 1929 is also in D31113 [O][repo]) |
| Berkeley suspended | Suspension "for six months" authorized Aug 1937 (A21297 sought to "abandon or suspend") | CRC D29999 | (see §1) | — | repo note: "suspend the operation of the San Francisco-Berkeley" route | [O][repo][ocr] |
| Berkeley end (city) | 1937 | City of Berkeley, Berkeley Pier-Ferry Project Update (Oct 24, 2025) | https://berkeleyca.gov/sites/default/files/documents/2025-10-24%20%20Berkeley%20Pier-Ferry%20Project%20Update_0.pdf | unknown | "1937, when the Bay Bridge was opened and ferry service discontinued, the Pier was acquired by the City of Berkeley" | [O][srch] (modern summary) |
| Hyde St–Sausalito end | NPS: last ferry 1938-07-25. Sausalito Historical Society: Sausalito–Hyde St and Tiburon–SF direct service ended 1938-07-24 | NPS (repo); Sausalito Historical Society | https://www.sausalitohistoricalsociety.com/2019-columns/2019/9/25/golden-gate-bridge-war-on-ferries | — | — | [O][repo]; [W][srch] |
| Vallejo ferry end | "with the close of business September 12th" 1937 | CRC D30121 | (repo) | — | as quoted | [O][repo][ocr] |

**Berkeley.** The six-month suspension of Aug 1937 is the only order found. Under decision 17,
Hyde St–Berkeley closes on or about 1937-08, citing D29999. Whether the boats stopped at once,
and whether an order of about Feb 1938 made it permanent, is unsourced.

**Conflict.** The last Sausalito boat: Jul 24 (Sausalito HS) vs Jul 25, 1938 (NPS). The repo uses
NPS [O]; a boat after midnight would fit both.

**For Matthew.** *Berkeley Daily Gazette* and Oakland Tribune, Aug 10 – Sept 15, 1937 (the last
Berkeley boat), and Feb–Mar 1938 (any permanent order).

---

## 5. North Bay street railways and the Petaluma & Santa Rosa

### 5a. Horsecar lines (Santa Rosa, Petaluma) and San Rafael

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| The four horsecar companies | Santa Rosa Street Railway, Union Street Railway (Santa Rosa), Petaluma Street Railroad, Central Street Railway; consolidated **1903-06-20** into the P&SR Railway | Wikipedia "Petaluma and Santa Rosa Railroad" | https://en.wikipedia.org/wiki/Petaluma_and_Santa_Rosa_Railroad | — | "On June 20, 1903, the Santa Rosa Street Railway, the Union Street Railway of Santa Rosa, the Petaluma Street Railroad, and the Central Street Railway were consolidated" | [W][srch] |
| Built | Between 1888 and 1891 | as above | as above | — | "The four consolidated horse car lines built between 1888 and 1891 were to be replaced by an electric railroad" | [W][srch] |
| Petaluma horsecar | First installed 1889. Route: Sunnyslope Ave, F St, Liberty St, Western Ave and Washington St to the fairgrounds | Petaluma Historian (cites the *Petaluma Courier*, "Petaluma Street Railway", Oct 3, 1889) | https://petalumahistorian.com/tag/petaluma-street-railway/ | — | "the Petaluma Street Railway, a horse-drawn trolley first installed in 1889" | [W][srch]; the Courier is [P], unread |
| Santa Rosa "1877" | **Unsourced.** Not found; the 1888–91 date above contradicts it | — | — | — | — | — |
| San Rafael street railway | **None found built.** Franchise bids in Dec 1905 (Marin Terminal Railroad, then the Clear Lake & Southern) for an electric line on Fourth St | Anne T. Kent California Room newsletter, "An abundance of proposed railroads for early 20th century Marin" | https://medium.com/anne-t-kent-california-room-community-newsletter/an-abundance-of-proposed-railroads-for-early-20th-century-marin-dd98797fd68e | — | "In December 1905 the Marin Terminal Railroad (MTR) applied to San Rafael for an electric trolley street railway franchise along the full length of Fourth Street." | [W][srch] |
| San Rafael & San Quentin (steam, not a street railway) | First trip 1870-03-21 | *History of Marin County* (1880) | (repo) | p. 333 | — | [C][repo] |

**For Matthew**

- *History of Sonoma County* (1880) and *History of Marin County* (1880) couldn't be opened
  (archive.org blocked). Their street-railway pages are still unread. The Sonoma history (1880)
  predates the 1888–91 horsecars anyway; Gregory's *History of Sonoma County* (1911) or Tom Gregory
  would cover them.
- **Newspapers:** *Petaluma Courier* 1889-10-03; *Sonoma Democrat* / *Press Democrat* 1888–91 for
  the Santa Rosa horsecar franchises and first runs.
- Routes: no street-by-street route was found for any Santa Rosa horsecar line.

### 5b. Petaluma & Santa Rosa Railroad (electric interurban)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Incorporated | 1903-06-20 (as the P&SR Railway) | Wikipedia; Press Democrat | https://www.pressdemocrat.com/article/news/santa-rosa-petaluma-railroad-sonoma-county-history/ | — | — | [W][srch] |
| First spike | 1904-04-05, at the *Gold* landing, foot of Copeland St, Petaluma | Wikipedia | as above | — | — | [W][srch] |
| Opened | Service "established" by Dec 10, 1904 | *Electrical Review* | (repo: east-bay-electric.md §4) | (repo) | "established" | [P][repo] |
| Opened (day) | 1904-12-01 (Wikipedia) or regular schedule from 1904-11-29 (a GitHub data note) | Wikipedia; DanielMConnolly/american-rail-history PR #7 | https://github.com/DanielMConnolly/american-rail-history/pull/7 | — | "the regular schedule began Nov 29 1904" | [W][srch] |
| Santa Rosa crossing | Stopped at the California Northwestern crossing until the "Battle of Sebastopol Avenue", 1905-03-01 | Raremaps map description; GitHub note | https://www.raremaps.com/gallery/detail/25806/ | — | — | [W][srch] |
| Graton; Forestville | 1905-01-26; 1905-07-15 | GitHub note | as above | — | "service reached Graton on Jan 26 1905 and Forestville on Jul 15 1905" | [W][srch] |
| Fourth St, Santa Rosa | Electrified 1905 over an old horsecar street; cars stopped running past the depot 1931-12-31 | GitHub note | as above | — | "Cars stopped running past the depot on Dec 31 1931." | [W][srch] |
| Fourth St abandonment authorized | "its line of railroad on Fourth Street, from east of the west line of Wilson Street to its terminus at Fourth and McDonald Streets" | CRC D24310 (1931-12-14, A17824) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D24310_19311214_A17824.pdf | (repo) | as quoted | [O][repo] |
| Passengers ended (authorized) | CRC D24818 (1932-05-31, A18089) authorized discontinuing passenger service | CRC D24818 | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D11601_to_D25900/D24818_19320531_A18089.pdf | (repo) | — | [O][repo] |
| Last passenger day | 1932-07-01 (Wikipedia) or 1932-06-30 (GitHub note) | Wikipedia; GitHub note | as above | — | "all trolley passenger service ended on July 1 of that year" | [W][srch] |
| NWP control | 1932 | Wikipedia; Press Democrat | as above | — | "control over the P&SR was gained by the Northwestern Pacific Railroad in 1932" | [W][srch] |
| Freight end | "officially shut down in 1946"; trolley wire down by 1947 | Press Democrat | as above | — | — | [W][srch] |
| Lines (map title) | "From Petaluma to Two Rock -- Sebastopol To Forestville and Santa Rosa" | Raremaps (a period P&SR map, for sale) | as above | — | (title) | [W][srch]. The map itself would be [P] if dated. |

**Routes** (unsourced in detail; draw from a 1914 USGS sheet and D24310):

- Petaluma (the Copeland St landing) – Liberty – Two Rock area – Sebastopol;
- Sebastopol – Santa Rosa via Sebastopol Ave and Fourth St, to Fourth and McDonald;
- Sebastopol – Graton – Forestville.

The Two Rock branch's existence rests on the map title only.

**Conflicts**

- **The opening:** Nov 29 vs Dec 1, 1904 (both [W]). *Electrical Review* [P] says only "by
  Dec 10".
- **The last passenger day:** Jun 30 vs Jul 1, 1932. D24818's order date is May 31, 1932, so
  decision 17 doesn't apply (this isn't a ferry), but the order gives the month if needed.

**For Matthew**

- *Press Democrat* and *Petaluma Argus*: Nov 28 – Dec 2, 1904; Jan 26 and Jul 15, 1905; Mar 1–2,
  1905; Dec 31, 1931; Jun 30 – Jul 1, 1932.
- Read D24818's order for its effective date.
- The Raremaps P&SR map: its date and whether it can be georeferenced (rights question).

---

## 6. San Francisco, Napa & Calistoga Railway (the "Napa Valley Route")

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Names | Vallejo, Benicia & Napa Valley RR (incorporated 1902-04-24); SF, Vallejo & Napa Valley RR (1906); SF, Napa & Calistoga Ry (1911); SF & Napa Valley RR (reorganized 1935–36) | Napa Valley Register history columns; Wikipedia | https://napavalleyregister.com/news/history/rebecca-yerger-memory-lane-napa-railroad/article_758a454d-4761-495e-a32c-42f1d443b3f4.html ; https://en.wikipedia.org/wiki/San_Francisco,_Napa_and_Calistoga_Railway | — | "named San Francisco, Vallejo & Napa Valley Railroad in 1906 and in 1911 it was renamed San Francisco, Napa & Calistoga Railway Company" | [W][srch] |
| Electric since 1905 | Vallejo–Calistoga railroad "since 1905" (said of the bus company's parent) | CRC D30108 (1937-09-07, A20805: the Napa Valley Bus Co. extends to San Francisco) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D30108_19370907_A20805.pdf | unknown | "since 1905 has operated an electric railroad between Calistoga and Vallejo" | [O][srch] |
| Vallejo–Napa opened | **1905-07-04** | Napa Valley Register, "Shock of the new: Harry Ayres and Napa's electric railway" | https://napavalleyregister.com/lifestyles/real-napa/article_d94000a6-451e-11df-963b-001cc4c002e0.html | — | "opening day for the electric train was July 4, 1905" | [W][srch] |
| Yountville | "in full operation as far as Yountville" by 1907 | NVR (after Evans & De Shazo) | https://napavalleyregister.com/star/lifestyles/building-the-napa-valley-interurban-railroad/article_613fcdda-a740-5ed8-873a-fdbc2966ae66.html | — | — | [W][srch] |
| St. Helena | **1908-01-01**, first regular car at 7:25 a.m. | NVR | as above / "Historic Calistoga-Vallejo railcar" article | — | "on Jan. 1, 1908 at 7:25 a.m. the first regular passenger car of the S.F.V.&N.V. R.R. Co. arrived at the corner of Main and Spring streets" | [W][srch] |
| Calistoga | **September 1912** | NVR | https://napavalleyregister.com/community/calistogan/news/historic-calistoga-vallejo-railcar-found-in-st-helena-backyard/article_b2e52eaa-616a-5225-b472-298265f10574.html | — | "Extension of the service to Calistoga was completed in September 1912" | [W][srch] |
| The ferry link | With the Monticello Steamship Co., a combined rail and ferry service called the "Napa Valley Route" | Wikipedia | as above | — | — | [W][srch] |
| The Vallejo ferry (Clay St, SF) | Hatch 1895 → Monticello 1904 → Golden Gate Ferry Co. 1927-04-29 → SP-GGF 1929-05-01; pier at the foot of Clay St; ended at the close of business 1937-09-12 | CRC D29464, D30086, D30121 | (repo) | — | "abandoned its service with the close of business September 12th" | [O][repo][ocr] |
| Electric operation ended | **1937-09-12**; buses and trucks substituted | NVR (the search didn't pin which column; probable page) | https://napavalleyregister.com/news/local/before-the-car-an-electric-railroad-ruled-the-napa-valley/article_c953dc64-6e1e-5ed6-b13a-c324dd0e412f.html | — | "electric interurban railway operation in Napa Valley ended Sept. 12, 1937 when the S.F.&N.V. Railroad substituted bus and truck transport for its electric passenger and freight service" | [W][srch] |
| Passengers ended (museum) | September 1937 | Western Railway Museum, car 63 | https://www.wrm.org/visit/car-roster/passenger-cars/interurban/item/103-san-francisco-and-napa-valley-63 | — | "passenger service was discontinued in September, 1937" | [W][srch] |
| Later abandonment | 1941: authority to abandon "an additional section" of 3,967 ft near Napa Junction (so A21745 had an earlier abandonment order) | CRC D33927 (1941-02-18, A21745) | https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/Decisions_D25901_to_D40599/D33927_19410218_A21745.pdf | unknown | (paraphrase) | [O][srch] |
| Track removed | Napa–Calistoga in 1938 (NVR) or 1939 (another source); rails in Napa 1940 | NVR; Trolley Tuesdays blog | — | — | — | [W][srch] |
| Receivership | 1936-03-01 | NVR/blog | — | — | — | [W][srch] |

**Route.** From Vallejo (the ferry landing, which connected with the Monticello boats from the
foot of Clay St in San Francisco) north via Napa Junction to Napa (Jefferson St and Calistoga Ave,
per the NVR), then up the valley through Yountville to St. Helena (Main and Spring) and Calistoga.
Street routes in Vallejo and Napa are **unsourced**; trace them from the USGS Napa / Mare Island
sheets of 1916.

**Conflicts**

1. **Calistoga:** Sept 1912 (NVR) vs June 1907 (the CSRM/OAC finding aid for the company's records
   of 1904–1916, relayed) vs Sept 2, 1908 (a blog). The 1908 St. Helena opening makes 1907 for
   Calistoga impossible; 1912 is the likely one, but it's [W].
2. **The end:** Sept 12, 1937 (NVR) agrees with the Vallejo ferry's last day in D30121 [O], since
   the railway's ferry ended with it. A Calistoga landmark article says 1939 (probably track
   removal).

**For Matthew**

- **Find the CRC order of about 1937–38 on A21745** (the electric line's abandonment). D33927
  (1941) is a later order on the same application.
- **Book:** Swett & Aitken, *The Napa Valley Route: Electric Trains & Steamers* (1975; reprinted
  1988): page citations for every date above.
- **Newspapers:** *Napa Register* / *Napa Journal*, Jul 4–5, 1905; Jan 1–2, 1908; Sept 1912;
  Sept 11–13, 1937.
- **Primary journals:** *Street Railway Journal* 1905 and *Electric Railway Journal* 1912
  (archive.org), for the openings.

---

## 7. Freight lines: the Alameda Belt Line and the Oakland Terminal Railway

### 7a. Alameda Belt Line

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Built by the city | 1918, Clement Ave between Pearl St and Grand St | Page not identified (the HMDB "History of the Alameda Belt Line" marker, the Alameda Post or the Alameda Sun) | https://www.hmdb.org/m.asp?m=157021 ; https://alamedapost.com/history/alamedas-own-belt-line-railroad/ | — | "In 1918, the City of Alameda constructed a municipal belt line railroad along Clement Avenue, between Pearl and Grand Street, to serve the newly developing northern industrial area." | [W][srch] |
| Sale agreement | Executed 1924-12-15; $30,000; paragraph 14 gave the city an option to buy it back | *Alameda Belt Line v. City of Alameda* (2003) 113 Cal.App.4th 15 (1st Dist., Div. 5, No. A099429, decided 2003-11-04) | https://www.courtlistener.com/opinion/5809078/alameda-belt-line-v-city-of-alameda/ | unknown | "The parties formally executed the agreement on December 15, 1924, whereby the City agreed to sell the railroad to ABL for the sum of $30,000." | [O][srch] |
| CRC approval and extension | Bought for $30,000; extended "from a connection with the existing track of the city's railroad in Clement avenue near Minturn street" | CRC Decisions vol. 26 (1925) | archive.org `california-railroad-commission-decisions_26` | pp. 808–809 | as quoted | [O][repo] |
| Incorporated | 1925-01-12, to take over about 1.2 miles of the city's 1918 track | Wikipedia "Alameda Belt Line" | https://en.wikipedia.org/wiki/Alameda_Belt_Line | — | — | [W][srch] |
| Owners | Western Pacific and Santa Fe; later UP and BNSF | Wikipedia; repo | as above | — | — | [W] |
| Last operated | 1998 (Del Monte cannery closed); "closing on November 10, 1998"; UP served one shipper by trackage rights until late 2001 | Wikipedia; Alameda Sun | https://alamedasun.com/news/belt-line-railroad-served-city%E2%80%99s-north-shore | — | "closing on November 10, 1998" | [W][srch] |
| Formal abandonment | STB notice of exemption, Docket **AB 1090X**, City of Alameda d/b/a Alameda Belt Line; 77 FR 29456, 2012-05-17. No local traffic for at least 2 years. | Federal Register | https://www.federalregister.gov/documents/2012/05/17/2012-11976/city-of-alameda-dba-alameda-belt-line-railroad-abandonment-exemption-in-alameda-county-ca | — | "approximately 2.61 miles of rail line between milepost 0.0 near the intersection of Clement Avenue and Broadway and milepost 2.61 near Constitution Way, in Alameda, California" | [O][srch] |

**Route.** Clement Ave in Alameda, from near Broadway (MP 0.0; the 2012 notice) west to near
Constitution Way (MP 2.61). That includes the 1918 city track between Pearl St and Grand St and the
1925 extension near Minturn St. The yard was later Jean Sweeney Open Space Park.

**Dates to draw (decision 15):**

- 1918: opened (the year only, [W]);
- 1925-01-12: becomes the ABL (incorporation [W]; the CRC approval in vol. 26 [O] gives the month);
- 1998-11-10 or late 2001: freight ends.

**Conflicts**

- **The sale:** Dec 15, 1924 (agreement; court opinion) vs 1925 (CRC approval; incorporation).
  These are steps in one process, not a conflict.
- **The last freight:** 1998 vs late 2001 (UP's trackage-rights service).
- **The length:** 2.61 miles (FR text) vs 2.84 (govinfo PDF, garbled OCR) vs 1.2 miles (the 1918
  city track only).

**For Matthew**

- Read the 2003 opinion (it's long; the background section dates the 1918 construction).
- The STB consummation notice for AB 1090X, for the formal end date.

### 7b. Oakland Terminal Railway (Key System's freight company)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Predecessors | Key System, Ltd. incorporated 1930-08-07; Oakland Terminal Railroad Co.'s service from 1935-02-26; a carrier under the Railroad Retirement Act from 1935-08-29 | US Railroad Retirement Board, determination L-1937-970 (memo of 1937-09-29) | https://www.govinfo.gov/content/pkg/GOVPUB-RR-dbbdbe5d2251fd6e336736a08b7150cd/pdf/GOVPUB-RR-dbbdbe5d2251fd6e336736a08b7150cd.pdf | unknown | "incorporated on August 7, 1930, under the laws of California as the Key System, Ltd." | [O][srch][ocr] |
| Freight's share | Of 292 employees on 1934-08-01, 9 handled freight | RRB L-1937-970 | as above | unknown | (paraphrase) | [O][srch] |
| Oakland Terminal Railway | Successor, covered from **1943-07-01**. The ICC authorized the purchase of part of the Oakland Terminal Railroad's property, with trackage rights over the rest. | RRB L-1943-754 (1943-10-18) | https://www.govinfo.gov/content/pkg/GOVPUB-RR-39baef5dc90f91867be326e96b43275a/pdf/GOVPUB-RR-39baef5dc90f91867be326e96b43275a.pdf | unknown | (paraphrase) | [O][srch][ocr] |
| Buyers | Western Pacific and Santa Fe, jointly, 1943 | Wikipedia "Oakland Terminal Railway" | https://en.wikipedia.org/wiki/Oakland_Terminal_Railway | — | — | [W][srch] |
| Union St line | "The new 2-mile line will run from the Key System tracks at 12th and Poplar over Union Street to the Western Pacific tracks at Third and Union." | *Western Railroader*, Aug 1956 | archive.org `sim_western-railroader-the-western-railfan_1956-08_19_10` | (repo) | as quoted | [P][repo] (copyright unknown; facts only, decision 19) |
| Union St track built | "the 1955 street trackage at 10th and Union" | trainweb.org/sp5623 (1993 railfan account) | http://www.trainweb.org/sp5623/otr.htm | — | "predates the 1955 street trackage at 10th and Union" | [W][srch] |
| Union St completed | Connection "finally completed along Union Street in February 1957"; the SN's Shafter Ave track removed as a condition of the franchise | trainorders.com forum | https://www.trainorders.com/discussion/read.php?1,3471877 | — | "The connection was finally completed along Union Street in February 1957." | [W][srch] |
| Poplar and Louise | A 1957 CPUC investigation of grade crossings "on line of Key System Transit Lines and the Oakland Terminal Railway along Poplar and Louise Streets, Oakland" | HathiTrust catalog record 100896054 | https://catalog.hathitrust.org/Record/100896054 | — | (title) | [O] pointer |
| Union St crossing today | CPUC No. 016-1.22-C, "Exempt - Pre 1978" | CPUC Resolution SX-151 (2024-02-16) | https://www.cpuc.ca.gov/-/media/cpuc-website/divisions/rail-safety-division/rceb/resolution-sx-151-with-appendices.pdf | appendix | "Exempt - Pre 1978" | [O][srch] |
| Today | West Oakland Pacific Railroad, about 10 miles of track | Wikipedia | as above | — | — | [W][srch] |

**Routes.** Only the Union St line is placed: 12th and Poplar, along Union St, to Third and Union
(WP), about 2 miles, 1956–57. The rest of the OTR network isn't placed by any source here. It
includes Key System street trackage used for freight (Poplar and Louise Sts), the 40th St / Yerba
Buena Ave area and the Key System Mole.

**Conflicts**

- **Union St:** 1955 street trackage (trainweb), the Aug 1956 plan (*Western Railroader*) and
  completion in Feb 1957 (forum). Take the opening as Feb 1957, flagged, until a CPUC crossing
  decision of 1955–57 is found.
- **"Oakland Terminal Railroad" vs "Railway":** 1935–43 vs from 1943. Two companies (RRB), one
  line of business.

**For Matthew**

- The CPUC crossing decisions for Union St (about 1955–57): the legacy folder
  `Decisions_D40600_to_D57800/`, applications by Oakland Terminal Railway.
- *Oakland Tribune* about Feb 1957.
- Demoro's Key System book for OTR routes (page citations).

---

## Cross-cutting: what decision 17 does with each ferry end

| Ferry | Order found | Order's date | Note |
|---|---|---|---|
| Creek Route | D29999 | 1937-08-09 | closed on or about 1937-08; the order's effective clause is unread |
| Hyde St–Berkeley | D29999 (six-month suspension) | 1937-08-09 | closed on or about 1937-08; a permanent order is unknown |
| Benicia–Port Costa | **none found** (likely ICC, not CRC) | — | candidates are 1930-10-15 (bridge, [P]) and 1930-11-01 (captions, [W]) |
| Martinez–Benicia | **none expected** (municipal from 1941, D33769) | — | 1962-09-14 or -15 [W]; CH&PW Sept–Oct 1962 [O] is the best next source |
| Oakland Pier | ICC FD 19960, 1958-05-14 (recited by the CPUC) | 1958-05-14 | the last run is 1958-07-30 per HABS [O], so the order's month isn't needed |
| Alameda Pier | none found | — | 1939-01-15 (Hilton [C-grade book]; the IER timetable [P]) |
| Steamer *Petaluma* | none found | — | 1950-08-24 [W] |

## Every source used

**Official [O]** (public records; US federal works are public domain; California agency records
are public records; cite them as facts):

- CRC/CPUC decisions, `https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/`:
  - `Decisions_D11601_to_D25900/`: D22535_19300614_A16420; D24310_19311214_A17824 [repo];
    D24818_19320531_A18089 [repo].
  - `Decisions_D25901_to_D40599/`:
    - D29338_19361207_A20753, D29464_19370118_A20742, D29999_19370809_A21237, D30086 [repo],
      D30108_19370907_A20805, D30121 [repo], D31113 [repo];
    - D33445 [repo], D33769_19401226_A23670, D33927_19410218_A21745, D34457 [repo].
  - `Decisions_D40600_to_D57800/`: D56900_19580624_A39899 (?), D56964_19580708_A40234,
    D57169_19580812_A40157.
  - D14727 (1925) and D47825 (1952) [repo]. CRC Decisions vol. 26, pp. 808–809 (1925) [repo].
- HABS CA-1888, Southern Pacific Mole & Pier, Oakland (Library of Congress; public domain):
  https://www.loc.gov/pictures/item/ca0018/ ; data pages
  https://tile.loc.gov/storage-services/master/pnp/habshaer/ca/ca0000/ca0018/data/ca0018data.pdf
- US Railroad Retirement Board determinations L-1937-970 (1937-09-29) and L-1943-754 (1943-10-18),
  govinfo (public domain). URLs above.
- Federal Register, 77 FR 29456 (2012-05-17), STB Docket AB 1090X (public domain).
- *Alameda Belt Line v. City of Alameda* (2003) 113 Cal.App.4th 15 (court opinion; public domain).
- *American Toll Bridge Co. v. Railroad Commission* (Cal. 1938) (court opinion; public domain).
- City of Berkeley, Berkeley Pier-Ferry Project Update (2025-10-24); City of Vallejo, Mare Island
  Causeway Bridge project page; CPUC Resolution SX-151 (2024). Government documents, but modern
  summaries: they carry dates, not historic proof.
- HathiTrust record 100896054 (1957 CPUC grade-crossing investigation): a catalog pointer.

**Primary [P]** (all from the repo; none newly read): *Electrical Review* (1904); *SP Bulletin*
(Nov–Dec 1930); *Western Railroader* (Aug 1956; copyright unknown, facts only); IER Time Table
No. 1 (CSRM; copyright unknown, facts only).

**Compiled [C]** (from the repo; public domain): Halley 1876; *History of Alameda County* 1883;
*History of Contra Costa County* 1882; *History of Marin County* 1880; *Poor's Manual*.

**Pointers [W]** (copyrighted; cited for facts only, never sole sources):

- Wikipedia: Alameda Mole; Oakland Long Wharf; Solano (ferry); Richmond–San Rafael Ferry Company;
  Richmond–San Rafael Bridge; Sierra Nevada (ferry); Vallejo (ferry); City of Seattle (steam
  ferry); Petaluma and Santa Rosa Railroad; San Francisco, Napa and Calistoga Railway; Alameda Belt
  Line; Oakland Terminal Railway; Golden Gate Ferry Company; Berkeley Pier; Rail transportation in
  Solano County. All CC BY-SA.
- Napa Valley Register history columns (several URLs above).
- Petaluma360 / Argus-Courier column; Petaluma Historian; the Press Democrat.
- Benicia Magazine; Gribblenation; ECV 13; HMDB markers 27645, 157021 and 234181; CCCHS photo
  search; OpenSFHistory wnp37.02981; Calisphere (Sonoma County Library photos); SF Memory.
- cruiselinehistory.com; Oakland LocalWiki; cable-car-guy.com; CPRR Museum (cprr.org).
- Daily Republic; Alameda Post; Alameda Sun; Alameda Museum Quarterly (Summer 2015).
- Western Railway Museum; Raremaps (P&SR map); trainweb.org/sp5623; trainorders.com; Medium (Anne T.
  Kent California Room; a Vallejo ferry blog); DanielMConnolly/american-rail-history PRs #7 and #9
  (GitHub; couldn't be opened: access to the repo was denied).

## Summary for Matthew: what needs you

1. **Re-run this with working network access.** Every [srch] fact needs the page opened, and the
   CPUC orders (D29999's order, D24818, D56900/D57169) need their ordering paragraphs read.
2. **Newspaper days** (CDNC, newspapers.com, or archive.org's `oakland-tribune-YYYY-MM-DD`):
   - Oakland Tribune: 1930-10-15/16 and 1930-11-01/03 (Benicia–Port Costa); 1937-08-10 to 09-30
     (Creek Route; Berkeley); 1937-09-12/13 (Napa line; Vallejo); 1939-01-14/16 (Alameda Pier);
     1956-08-31 to 09-01 (Richmond–San Rafael); 1957-02 (Union St); 1958-07-29 to 08-01 (Oakland
     Pier); 1962-09-14/16 (Martinez–Benicia).
   - *Petaluma Courier* 1889-10-03; *Press Democrat* 1904-11-28 to 12-02, 1905-01-26, 1905-03-01,
     1905-07-15, 1931-12-31, 1932-06-30 to 07-01; *Petaluma Argus-Courier* 1950-08-24/25.
   - *Napa Register* 1905-07-04/05, 1908-01-01/02, 1912-09, 1937-09-11/13.
   - *Vallejo Times-Herald* 1919-07-03 and 1946–47 (the Mare Island ferry).
3. **Book pages:**
   - Hilton (the Alameda ferry's last night);
   - Swett & Aitken, *The Napa Valley Route*;
   - Harlan & Fisher, *Of Walking Beams and Paddle Wheels* (1951), for ferry openings, terminals
     and vessels;
   - Demoro, *The Key Route* (the OTR).
4. **Decisions to make:**
   - the end of Benicia–Port Costa (Oct 15 or Nov 1, 1930; no order);
   - the end of Martinez–Benicia (no order: municipal);
   - whether to draw the Vallejo–Mare Island ferry and the San Rafael "street railway" at all
     (no primary source for either; San Rafael may never have had one built).
