# East Bay research: Key System streetcars, ES&S, E/G, SP Oakland lines, precursors

Gathered Oct 15, 2026. This builds on `docs/research/east-bay-electric.md`, `key-system.md` and
`sp-east-bay.md` and doesn't repeat what they hold.

## Read this first: what this session could reach

- **No primary page was opened.** All session, WebFetch failed on every host with a DNS error
  (`getaddrinfo ENOTFOUND`). That included files.cpuc.ca.gov, archive.org, wikipedia.org and
  example.com, and the sibling research agents hit the same error. Shell curl to archive.org and
  CPUC is blocked by the proxy (403), as expected.
- **Only WebSearch worked,** until the 200-call budget it shares with every agent in the turn ran
  out. Its results include a model-written summary of the CPUC PDFs' OCR. That summary sometimes
  quotes the OCR, often paraphrases it, and once contradicted itself (D27964, below).
- **So everything new here is tagged `[srch]`:** known only from a search-tool summary of a
  document's OCR. I never saw the page. Quotes may not be verbatim, and page numbers are unknown
  ("p. ?").
  - **Nothing tagged `[srch]` should reach `sources.json` or the map until someone reads it in the
    PDF.**
  - What is solid: the decision file names and URLs, which the search engine returned as live
    documents, and the street-junction checks against today's roads (`[data]`, below).
- **Tags:** [P] primary, [O] official (CRC/CPUC, city), [C] contemporary compiled history, [W]
  Wikipedia, railfan or modern web (a pointer, never the sole source), [ocr] OCR text, [img]
  checked on the page image, [srch] (above), [data] a check against today's Overture roads
  (release 2026-09-23.1, `data/raw/overture/2026-09-23.1/eastbay-roads.parquet`, source id
  `overture-roads-2026-09-23-1`). The script is
  `a throwaway script (not kept)`.
  It gives the closest approach between two named streets; a 0 m gap means they meet today.
- [W] pointers below are attributed as the search summary attributed them. The summarizer merges
  sites, so recheck the attribution as well as the fact.

**Next session, first thing:** read the decisions in the reading list (section 7) as PDFs. The
whole Key System section is a scaffold until then.

---

## 1. Key System, East Bay Street Railways and East Bay Transit streetcar lines, 1928–1948

### 1.0 Names, dockets and numbering (for finding more decisions)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Operating company names | Oakland Traction → East Bay Street Railways, Ltd. (1930) → East Bay Transit Co. (1936) → merged into Key System Jan 1, 1942 | Pacific Bus Museum, "East Bay Motor Coach" | https://pacbus.org/related-info/transit-company/east-bay-motor-coach/ | – | "taken over in 1934 by East Bay Street Railways Ltd., which had been running the streetcars since 1930"; "East Bay Transit Co. was merged into Key System" (via search) | [W] |
| Applicants as the decisions name them | "East Bay Street Railways, Ltd." (1931–36: D24224, D26059, D27963, D28472, D28615); "East Bay Transit Company" (1937: D29451, D29473, D29557, D30212); "Key System Transit Lines" (1947–48: D40742, D41385, D41652) | the decisions | see section 7 | p. ? | – | [O][srch] |
| A19502, a long-running docket | Supplemental applications under A19502 run from 1935 to 1948: D28206, D28838, D28918, D29405, D29430, D29451, D29473, D29557, D29641, D30212, D35702, D37339 (the "75th supplemental", 1944), D40742, D41306 | the decisions | section 7 | p. ? | – | [O][srch] |
| Line numbers | Numbers 1–9 at first; "in 1928 the letters were replaced with new numbers 10 through 18"; shuttles got numbers in the 20s; 31–33 were local services over transbay track, "replaced with buses in 1931 and 1932" | chicagorailfan, "Oakland transit routes" | https://www.chicagorailfan.com/bcoakrte.html | – | "streetcar routes within the East Bay area were either assigned numbers originally 1 through 9, or letters" (via search) | [W] |

### 1.1 Decision inventory, 1928–1948 (streetcar abandonments and related orders)

Folders: `D11601_to_D25900` = …/Decisions_D11601_to_D25900/, `D25901_to_D40599` and
`D40600_to_D57800` the same. "Content" is the search summary's description, never read by me.

| Decision | Date (file name) | Docket | Content per search summary | Lines | Tags |
|---|---|---|---|---|---|
| D19526 | 1928-03-29 | A14285 | Rockridge street car line "temporarily abandon[ed]" with motor bus substituted; service "along Broadway Terrace to Broadway, then along Broadway to College Avenue" | Rockridge (no number) | [O][srch] |
| D24059 | 1931-09-21 | A17669 | Abandonment of a Berkeley line "along Dana Street and Allston Way" | ? | [O][srch] |
| D24224 | 1931-11-16 | A17062 | East Bay Street Railways: discontinue rail service "on 8th Street between Broadway and 5th Avenue, along 5th Avenue to 14th Street", and reroute the No. 9 line; follows an Aug 1931 supplemental application amending a January 1931 order | 9 (+?) | [O][srch] |
| D23279 | 1931 (date not seen) | A17062 | The original order that D24963 modifies; file not located | ? | [O][srch] |
| D24764 | 1932-05-16 | A17981 | Not readable through search | ? | [O] |
| D24866 | 1932-06-13 | A18164 (+A18165) | Richmond lines 28 and 29 (routes already in east-bay-electric.md); "In Application No. 18165, East Bay Street Railways, Ltd., requests permission to abandon the operations on its No. 28 (6th Street) line"; hearing at Richmond, June 7, 1932 | 28, 29 | [O][srch] |
| D24963 | 1932-06-30 | A17062 | Supplemental order "rerouting the No. 15 car line on Eighth Street in Oakland"; modifies D23279 | 15 | [O][srch] |
| D25409 | 1932-12-05 | C3374 | Investigation touching East Bay Street Railways and Key System; hearing Nov 10, 1932; relevance unknown | ? | [O][srch] |
| D26059 | 1933-06-12 | A18915 | Abandon lines 17 (8th Avenue, Oakland), 23 (23rd Avenue, Oakland) and 9 (East Alameda, Oakland and Alameda); see 1.3 | 9, 17, 23 | [O][srch] |
| D26438 | 1933-10-16 | A19129 | Richmond line (already in east-bay-electric.md) | Richmond | [O] |
| D27963 | 1935-05-13 | A19918 | Chestnut Street rail line in Oakland → bus; see 1.3 | ? | [O][srch] |
| D27964 | 1935-05-13 | A19919 | One summary: "applied to abandon its No. 7 line in Oakland because the track needed costly repairs"; a second search could not find the document. **Unverified, possibly confused with D27963** | 7? | [O][srch] |
| D28206 | 1935-09-03 | A19502 | Not readable | ? | [O] |
| D28472 | 1935-12-27 | A20290 | Street car service on Eighth Street and Pine Street, Oakland → bus; see 1.3 | ? | [O][srch] |
| D28615 | 1936-03-02 | A20291 | Leona line (No. 16), passenger and freight → bus; see 1.3 | 16 | [O][srch] |
| D28703 | 1936-04-06 | A20289 | Not readable (filed in the same Dec 1935 batch as A20290/20291?) | ? | [O] |
| D28838 | 1936-05-25 | A19502 | Not readable | ? | [O] |
| D28918 | 1936-06-22 | A19502 | Not readable | ? | [O] |
| D29405 | 1936-12-28 | A19502 | East Bay Transit takes over the City of Alameda's motor coach routes (bus) | – | [O][srch] |
| D29430 | 1937-01-04 | A19502 | "replacing rail service on University Avenue in Berkeley with an extended motor coach line", with Berkeley's approval | ? | [O][srch] |
| D29451 | 1937-01-11 | A19502 | Rail service on Fruitvale Avenue, Oakland → bus "extending farther north into an unserved residential area"; Oakland asked for it | ? | [O][srch] |
| D29473 | 1937-01-18 | A19502 | Abandon "street car service upon East 14th Street between 105th Avenue in the City of Oakland and Dutton Avenue, in San Leandro"; San Leandro agreed; removes a traffic hazard | 1? | [O][srch] |
| D29557 | 1937-02-19 | A19502 | Abandon the streetcar line "on Park Avenue between San Pablo Avenue and Peralta Street in Emeryville", and a bus on "Adeline Street between 14th and 7th Streets"; supplemental filed Jan 4, 1937 | ? | [O][srch] |
| D29641 | 1937-04-05 | A19502 | Discontinues a motor coach route in Alameda (bus) | – | [O][srch] |
| D30212 | 1937-10-11 | A19502 | San Lorenzo motor coach on Castro Street / Washington Avenue (bus) | – | [O][srch] |
| D35702 | 1942-08-18 | A19502 | Not readable | ? | [O] |
| D37339 | 1944-09-21 | A19502 (75th suppl.) | Suspends passenger stage service on San Pablo Avenue between Ashby Avenue and downtown Oakland (bus) | – | [O][srch] |
| D38877 | 1946-04-23 | A27427 | Key System motor coach certificates; Richmond public-housing express (bus) | – | [O][srch] |
| **1946 College Ave decision** | not found | – | No search hit. KQED and moderntransit.org (via search): trolley coaches planned for College Avenue, cancelled by the new owners in 1946 | 6? | [W] |
| D40742 | 1947-09-23 | A19502 | Key System Transit Lines asks for a certificate "to operate certain street railway and motor coach routes in the counties of Alameda and Contra Costa". **May list every 1947 rail route: read first** | all? | [O][srch] |
| D41295 | 1948-03-09 | A28924 | Same date as D41306; content unknown | ? | [O] |
| D41306 | 1948-03-09 | A19502 | Lines 14, 15, 18 (see east-bay-electric.md) | 14, 15, 18 | [O] |
| D41385 | 1948-03-30 | A29173 | Arlington Avenue–Euclid Avenue line, Berkeley; see 1.2 | 7 | [O][srch] |
| D41652 | 1948-05-25 | A29172 | Lines 10, 11, 12; see 1.2 | 10, 11, 12 | [O][srch] |
| D42199 | 1948-11-04 | A29174 | Lines 1, 2, 4, 5 (east-bay-electric.md); per the search summary, consolidated with "Application 19502 (110th Supplemental)"; recites that "Subsequent to the issuance of said Decision No. 41306 on March 9, 1948, the Commission granted two other applications of Key System Transit Lines to substitute motor coach service"; Oakland objected | 1, 2, 4, 5 | [O][srch] |

Search hits of unknown relevance: D19150 (1927-12-23, A13875), D19614 (1928-04-14, A14592),
D23779 (1931-06-15, A11329), D24584 (1932-03-14, A12820), D33117 (1940-05-21, A23417), D57402
(1958-09-29, A40355).

### 1.2 The 1948 lines, line by line

#### Line 10, Piedmont Avenue (D41652)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Line name | "Nos. 10 Piedmont Avenue, 11 Oakland Avenue, and 12 Grand Avenue - 16th Street Rail Transit Lines" | CPUC D41652, May 25, 1948 (A29172) | …/Decisions_D40600_to_D57800/D41652_19480525_A29172.pdf | p. 1? | as quoted, from the caption OCR | [O][ocr][srch] |
| Route, 1948 | From Crocker Ave near Hampton Rd in Piedmont, over private right of way, Highland Ave, private right of way, Piedmont Ave and Broadway to 9th St in Oakland, looping by 9th, Franklin and 8th Sts back to Broadway | D41652, a footnote | same | p. ? | paraphrase only | [O][srch] |
| Authorized | May 25, 1948 (file date); the secondary source says May 26 | D41652 / historyofpiedmont.com | same / https://www.historyofpiedmont.com/keysystem | – | – | [O][srch] / [W] |
| Changeover | **Conflict:** June 27, 1948 ("the conversion occurred on June 27, 1948"); June 26, 1948 (the same site's timeline); June 1, 1948 ("Piedmont line abandoned, replaced by buses") | historyofpiedmont.com | https://www.historyofpiedmont.com/keysystem | – | via search | [W] |
| Loop | "The No. 10 Piedmont line looped off Broadway via 9th, Franklin and 8th" after the Piedmont and Hopkins lines were split in 1943 | historyofpiedmont.com | same | – | via search | [W] |
| Alternative description | Line 10 "originating near Hampton and Seaview, passing through the Civic Center and along Highland to Park Way, then descending to Grand (Pleasant Valley), and continuing down Piedmont Avenue to Broadway" | Piedmont General Plan, ch. 4, Transportation (a modern city document; treat as a pointer) | https://cdnsm5-hosted.civiclive.com/UserFiles/Servers/Server_13659739/File/Government/Projects/General%20Plan%20and%20Housing%20Element/04-Transportation.pdf | p. 4-? | via search | [W] |

Street check [data]: Crocker Ave meets Hampton Rd (-122.22522, 37.81887). Highland Ave doesn't
meet Crocker Ave (332 m) or Oakland's Piedmont Ave (876 m), which fits the private rights of way
D41652 names between them. Piedmont Ave meets Broadway (-122.26079, 37.82109). Broadway meets 9th
St and 8th St, and Franklin St meets 9th and 8th: the loop is placeable. Park Way doesn't reach
Grand Ave (331 m). No "Seaview Avenue" exists in today's roads.

**Conflict 1.2a:** the Piedmont plan's route (Highland → Park Way → Grand Ave → Piedmont Ave) is
not D41652's (private right of way → Piedmont Ave). Read D41652's footnote on the page.
**Placeable:** Piedmont Ave from Broadway to its junction with the right of way (unknown), Broadway
south to 8th/9th, and the loop. **Trace:** the Piedmont right-of-way segments (USGS 1949 Oakland
East, `data/raw/usgs/CA_Oakland East_293613_1949_24000_geo.tif`).

#### Line 11, Oakland Avenue (D41652)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Route, 1948 | From 8th St and Broadway, along Broadway, 24th St, Harrison St, a private right of way, Oakland Ave … Linda Ave to Piedmont Ave | D41652 | …/D41652_19480525_A29172.pdf | p. ? | "the No. 11-Oakland Avenue rail line is operated from 8th Street and Broadway in the City of Oakland along Broadway, 24th Street, Harrison Street" (the rest is paraphrase) | [O][ocr][srch] |
| Replacement bus | Proposed "over 14th Street in Oakland between Market Street and Wood Street" (which line's bus this was is unclear) | D41652 | same | p. ? | paraphrase | [O][srch] |
| Origin | "originated as a part of Consolidated Piedmont Cable in 1892 and was later electrified"; 3.12 miles | historyofpiedmont.com | https://www.historyofpiedmont.com/keysystem | – | via search | [W] |
| 1943 change | "a 1943 wartime order split the Oakland Avenue and 38th Avenue lines"; afterwards the line ended at the 9th St loop | historyofpiedmont.com | same | – | via search | [W] |
| Pre-1943 route | "originated at Piedmont Avenue and Linda, following Linda to Oakland Avenue, continuing to downtown Oakland, then out East 14th Street to Fruitvale"; CPTDB: "38th Ave - Downtown Oakland - Linda & Piedmont (1910-1948)" | Piedmont General Plan; CPTDB wiki | plan URL above; https://cptdb.ca/wiki/index.php/Key_System | – | via search | [W] |
| Changeover | June 26 or 27, 1948 (as line 10) | historyofpiedmont.com | same | – | – | [W] |

Street check [data]: Broadway meets 24th St (-122.26548, 37.81338). Harrison St comes within 16 m
of 24th St (-122.26161, 37.81279). Oakland Ave meets Harrison St (-122.25921, 37.81503). Linda Ave
meets Oakland Ave (-122.24543, 37.82217) and Piedmont Ave (-122.25120, 37.82734).
**Placeable once D41652 is read:** the whole line, except the "private right of way" between
Harrison St and Oakland Ave (where it runs isn't stated in the summary).
**Conflict 1.2b:** a cable line on Oakland Ave from 1890 (P&MV, chicagorailfan) or 1892
(Consolidated Piedmont Cable, historyofpiedmont). See section 5.

#### Line 12, Grand Avenue–16th Street (D41652)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Name | "12 Grand Avenue - 16th Street" | D41652, caption | as above | p. 1? | see line 10 | [O][ocr][srch] |
| Route, 1948 | **Not obtained.** The plan's pointer: "originated at Jerome and Oakland Avenue, continued down Fairview Avenue to Grand, and followed Grand through Downtown to West Oakland" | Piedmont General Plan | plan URL | – | via search | [W] |
| History | Began as a "shuttle on Grand Avenue from Wildwood Avenue (the Piedmont city limits) to Perry Street"; "Oct. 20, 1935 Grand Avenue and Hollis Street line changed to Grand Avenue and W. 16th Street line", ending at SP's 16th Street depot | historyofpiedmont.com | https://www.historyofpiedmont.com/keysystem | – | via search | [W] |
| Changeover | June 26 or 27, 1948 (as line 10) | historyofpiedmont.com | same | – | – | [W] |

Street check [data]: Jerome Ave meets Oakland Ave (-122.24018, 37.82375). Fairview Ave meets Grand
Ave (-122.24441, 37.81983). Grand Ave meets Wildwood Ave (-122.24472, 37.81883). **"Perry Street"
is not in today's roads;** a "Perry Place" lies 686 m from Grand Ave, so it isn't identified.
**Conflict 1.2c:** historyofpiedmont also calls it "12 Grand Avenue-West 12th", against D41652's
"16th Street". Probably a slip on that site.

#### Line 7, Arlington Avenue–Euclid Avenue, Berkeley (D41385)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Ends of the line | Euclid Ave and Regal Rd, Berkeley, to Arlington Ave near Coventry Rd | CPUC D41385, Mar 30, 1948 (A29173) | …/Decisions_D40600_to_D57800/D41385_19480330_A29173.pdf | p. 1? | "The rail line involved extends from Euclid Avenue and Regal Road in the City of Berkeley to a point on Arlington Avenue in the vicinity of Coventry Road" | [O][ocr][srch] |
| What was asked | To "discontinue and abandon the street car service on the Arlington Avenue–Euclid Avenue street railway line in Berkeley" | same | same | p. 1? | as quoted | [O][ocr][srch] |
| Hearing | Berkeley, Mar 24, 1948 | same | same | p. ? | – | [O][srch] |
| Streets between the ends | **Not obtained** (through downtown Berkeley per CPTDB: "Arlington to Euclid Ave via Downtown Berkeley, 1907–1948") | CPTDB wiki | https://cptdb.ca/wiki/index.php/Key_System | – | via search | [W] |
| Last day | Unsourced. One search summary gave June 26, 1948 for lines 7, 10, 11 and 12 without a clear source (perhaps tundria.com) | ? | http://www.tundria.com/trams/USA/SanFrancisco-1948.php | – | – | [W] |

Street check [data]: Euclid Ave meets Regal Rd (-122.26379, 37.89409), and Arlington Ave meets
Coventry Rd (-122.27826, 37.90387). Both ends are placeable.

#### Lines 14 (East 21st Street), 15 (MacArthur Boulevard), 18 (Lake Shore–Park Boulevard) (D41306)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Names | "14 East 21st Street, 15 MacArthur Boulevard and 18 Lake Shore-Park Boulevard" | historyofpiedmont.com | https://www.historyofpiedmont.com/keysystem | – | via search | [W] |
| Authorized | Mar 9, 1948 (D41306; routes in east-bay-electric.md, from the earlier session) | CPUC D41306 | …/Decisions_D40600_to_D57800/D41306_19480309_A19502.pdf | – | – | [O] |
| Changeover | March 28, 1948 ("the switch took effect on March 28, 1948") | historyofpiedmont.com | same | – | via search | [W] |
| Trial condition | "The wire and track had to be left in place for one year on all but the 21st Street section" | historyofpiedmont.com | same | – | via search | [W] |
| Line 15 in 1932 | D24963 rerouted "the No. 15 car line on Eighth Street"; whether this is the same line as 1948's MacArthur Blvd 15 is unknown | D24963 | …/Decisions_D11601_to_D25900/D24963_19320630_A17062.pdf | p. ? | – | [O][srch] |

Street names today [data]: East 21st Street, MacArthur Boulevard, Lakeshore Avenue and Park
Boulevard all exist. The decision's "Lake Shore" is written as one word today.

#### Lines 1, 2, 4, 5 (D42199) and line 3

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Line 1 | "San Pablo & Ashby Ave - Oakland 105th Ave & East 14th Street (1931-1948)" | CPTDB wiki | https://cptdb.ca/wiki/index.php/Key_System | – | via search | [W] |
| Line 2 | "San Pablo & Ashby Ave - Downtown Oakland (1916-1948)" | CPTDB wiki | same | – | via search | [W] |
| Line 3 | "Downtown Oakland - UC Campus via Grove St (1904-1948)". Not among D42199's four lines, so it ended by another order (unknown) | CPTDB wiki | same | – | via search | [W] |
| Line 4 | Shattuck, "1904-1948"; another pointer: "Line 4: Telegraph - Shattuck – Euclid" | CPTDB; chefjuke.com PDF | same; https://chefjuke.com/mom/momtrain/momtrain.pdf | – | via search | [W] |
| Line 5 | Telegraph Ave, "1904-1948" | CPTDB | same | – | via search | [W] |
| Authorized | Nov 4, 1948 (D42199); a secondary source says Nov 3 | CPUC D42199; historyofpiedmont.com | …/Decisions_D40600_to_D57800/D42199_19481104_A29174.pdf | – | – | [O] / [W] |
| Last streetcar | **Nov 28, 1948**: "On November 28, 1948, the last streetcar went out of operation" | Key System newspaper clippings, 1941–1960, finding aid (OAC); Pacific Bus Museum | https://oac.cdlib.org/findaid/ark:/13030/kt5199r139/ ; https://pacbus.org/related-info/transit-company/east-bay-motor-coach/ | – | via search | [W] (archival finding aid; needs a newspaper) |
| Line 1's east end | D29473 (Jan 18, 1937) cut East 14th St from 105th Ave to Dutton Ave, which fits CPTDB's "105th Ave & East 14th" from 1937 | D29473 | …/Decisions_D25901_to_D40599/D29473_19370118_A19502.pdf | p. ? | "East 14th Street between 105th Avenue in the City of Oakland and Dutton Avenue, in San Leandro" | [O][ocr][srch] |

Street names today [data]: in Oakland, **East 14th Street is International Boulevard.** Overture
has International Blvd from about 1st Ave (-122.2572, 37.7987) to Durant Ave at the San Leandro
line (-122.164, 37.736), and "East 14th Street" only from there into San Leandro. International
Blvd meets 105th Ave (-122.16679, 37.73923); East 14th St meets Dutton Ave in San Leandro
(-122.16043, 37.73081). The renaming's date and ordinance are unsourced.
**Grove Street is Martin Luther King Jr. Way:** no Grove St remains in Oakland or Berkeley (the
only one is in Alameda, near 37.76 N), and "Martin Luther King Junior Way" meets University Ave
(-122.27302, 37.87156). Pointer: Wikipedia, "Berkeley, California" ("Grove (today's Martin Luther
King Jr. Way)") [W]; the renaming source is still needed.

#### Line 6, College Avenue (1946)

- CPTDB [W]: "Downtown Oakland - Berkeley Arlington Ave via College Ave (1906-1946)".
- KQED (https://www.kqed.org/news/12073762/the-rise-and-fall-of-bay-area-streetcar-transit-system)
  and moderntransit.org (https://moderntransit.org/ctc/ctc03.html) [W]: trolley buses ordered for
  College Avenue; the plan was "canceled ... in 1946".
- The 1946 decision itself was **not found**. Look in `Decisions_D25901_to_D40599` (1946 runs about
  D38700–D39700) for applicant "Key System" and "College Avenue".

### 1.3 Lines cut 1931–1937

#### Line 9, East Alameda (D24224 reroute 1931; D26059 end 1933)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| 1931 reroute | D24224 reroutes the No. 9 when 8th St (Broadway–5th Ave) and 5th Ave (to 14th St) are given up | D24224, Nov 16, 1931 | …/Decisions_D11601_to_D25900/D24224_19311116_A17062.pdf | p. ? | paraphrase | [O][srch] |
| Why it ended | "the Board of Supervisors of Alameda County, on May 2, 1933, ordered the Park Street bridge closed to street cars and vehicles over ten tons"; the No. 9 cars weighed more | D26059, June 12, 1933 | …/Decisions_D25901_to_D40599/D26059_19330612_A18915.pdf | p. ? | paraphrase-like quote | [O][ocr][srch] |
| Last day | "Line 9 was discontinued outright May 3, 1933 with the closure of the Park Street Bridge" | historyofpiedmont.com | https://www.historyofpiedmont.com/keysystem | – | via search | [W] |
| Route | **Not obtained** (Oakland to East Alameda over the Park Street bridge) | – | – | – | – | – |

[data]: 8th St and 5th Ave don't meet today (678 m apart), so the 1931 8th St–5th Ave track must
be traced (USGS 1949 Oakland West or older), not placed from today's streets.

#### Line 17, 8th Avenue, and line 23, 23rd Avenue (D26059)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| Lines | "No. 17 (8th Avenue), Oakland, No. 23 (23rd Avenue), Oakland, No. 9 (East Alameda), Oakland and Alameda" | D26059 | as above | p. 1? | "East Bay Street Railways, Ltd. applied for authority to abandon service on the following street car lines:" + the list | [O][ocr][srch] |
| Filed | May 27, 1933; "no opposition" | D26059 | same | p. ? | – | [O][srch] |
| Bus on 8th Ave | Would run into the business district and spare riders a transfer | D26059 | same | p. ? | paraphrase | [O][srch] |
| Line 23 origin | Built by the Oakland, San Leandro & Haywards Electric Railway; numbered 23 in 1929 | historyofpiedmont.com | same | – | via search | [W] |
| Last days | Unsourced | – | – | – | – | – |

[data]: 8th Ave and 23rd Ave both meet International Blvd (-122.25138, 37.79355; -122.23596,
37.78342). Their routes are not obtained.

#### Chestnut Street line (D27963, 1935)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| What | Abandon the Chestnut Street line in Oakland; buses from Broadway and 10th St via 8th St and Chestnut St, returning the same way | D27963, May 13, 1935 (A19918) | …/Decisions_D25901_to_D40599/D27963_19350513_A19918.pdf | p. ? | "applied for authority to abandon certain street railway service in the city of Oakland and substitute motor coach service" | [O][ocr][srch] |
| Filed | Apr 17, 1935; track and the SP crossing "at Chestnut and Seventh Streets" in poor repair | same | same | p. ? | – | [O][srch] |
| Line number, last day | Unsourced | – | – | – | – | – |

[data]: Chestnut St comes no closer than 148 m to 7th St and 208 m to 8th St today, so its south
end must be traced. Chestnut St meets West Grand Ave (-122.28287, 37.81537).

#### Eighth Street and Pine Street (D28472, 1935)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| What | Street car service on Eighth St and Pine St, Oakland → buses; the streets to be repaved as a Bay Bridge approach | D28472, Dec 27, 1935 (A20290) | …/Decisions_D25901_to_D40599/D28472_19351227_A20290.pdf | p. ? | "not abandon the streetcar service until motor coach service had been inaugurated" (condition, paraphrase) | [O][srch] |
| Filed | Dec 9, 1935 | same | same | p. ? | – | [O][srch] |

[data]: 8th St meets Pine St (-122.30330, 37.80871). Pine St doesn't reach 7th St today (117 m).

#### Line 16, Leona (D28615, 1936)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| What | Leona line (No. 16), passenger and freight, → buses | D28615, Mar 2, 1936 (A20291) | …/Decisions_D25901_to_D40599/D28615_19360302_A20291.pdf | p. ? | "Said Leona street car line has served the territory tributary to Mills College for many years" | [O][ocr][srch] |
| Filed | Dec 9, 1935; Oakland's council wrote that it would not oppose | same | same | p. ? | – | [O][srch] |
| Route, last day | Not obtained. Wikipedia has a "Leona Line" article (https://en.wikipedia.org/wiki/Leona_Line) | – | – | – | – | [W] |

#### University Avenue, Berkeley (D29430); Fruitvale Avenue (D29451); Park Avenue, Emeryville (D29557)

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| University Ave | Rail service on University Ave, Berkeley, → an extended bus line | D29430, Jan 4, 1937 | …/Decisions_D25901_to_D40599/D29430_19370104_A19502.pdf | p. ? | paraphrase | [O][srch] |
| Fruitvale Ave | Rail on Fruitvale Ave, Oakland, → bus extended north; "The city of Oakland had requested the change" | D29451, Jan 11, 1937 | …/D29451_19370111_A19502.pdf | p. ? | paraphrase | [O][srch] |
| Park Ave | Abandon the streetcar line "on Park Avenue between San Pablo Avenue and Peralta Street in Emeryville" | D29557, Feb 19, 1937 | …/D29557_19370219_A19502.pdf | p. ? | as quoted | [O][ocr][srch] |
| Park Ave dates | "Park Avenue streetcar line 1873–1937" | Emeryville Historical Society | https://emeryvillehistorical.org/centennial-essays/park-avenue-streetcar-line-1873-1937/ | – | essay title | [W] |

[data]: Park Ave meets San Pablo Ave (-122.28036, 37.83233) and Hollis St, but **not Peralta St**
(414 m): trace the west end. Fruitvale Ave meets International Blvd (-122.22587, 37.77762).

#### Dana Street and Allston Way, Berkeley (D24059, 1931)

- D24059 (Sept 21, 1931; A17669): abandonment of a Berkeley line "along Dana Street and Allston
  Way" [O][srch]. Line number and route not obtained.
- [data]: Dana St and Allston Way don't meet today (399 m apart), so trace it.

### 1.4 Key System conflicts

1. Lines 10–12 changeover: June 1, June 26 or June 27, 1948 (all [W]).
2. Lines 1, 2, 4, 5: authorized Nov 3 ([W]) or Nov 4, 1948 (D42199's file date). Last car Nov 28,
   1948 ([W] only).
3. Line 10 route: D41652's right-of-way description against the Piedmont plan's
   Highland–Park Way–Grand Ave route.
4. Line 12 "16th Street" (D41652) against "West 12th" (historyofpiedmont).
5. D27964: "No. 7 line in Oakland" from one summary, not found by another.
6. Line 15: the 1932 Eighth St line against 1948's MacArthur Blvd line (same number, perhaps a
   different route).
7. Oakland Ave cable origin: 1890 (P&MV) or 1892 (Consolidated Piedmont Cable).

---

## 2. East Shore & Suburban (Richmond)

Nothing primary was reached this session. New pointers:

| Fact | Value | Source | URL | Page | Quote | Tags |
|---|---|---|---|---|---|---|
| First line | "the system's initial line was built between Castro Point and the Southern Pacific depot and opened on July 28, 1904" (the date matches the Tribune of July 29, 1904, already in east-bay-electric.md; Castro Point is new and unsourced) | Wikipedia, "East Shore and Suburban Railway" | https://en.wikipedia.org/wiki/East_Shore_and_Suburban_Railway | – | via search | [W] |
| First bus conversion | "Service began to be replaced by buses on August 1, 1932, with the conversion of the East Richmond/23rd Street line" (23rd St = line 29 in D24866, so line 29's last day would be July 31, 1932) | same | same | – | via search | [W] |
| Line 28 | "In Application No. 18165, East Bay Street Railways, Ltd., requests permission to abandon the operations on its No. 28 (6th Street) line" | D24866, June 13, 1932 | …/Decisions_D11601_to_D25900/D24866_19320613_A18164.pdf | p. ? | as quoted | [O][ocr][srch] |
| End of ES&S rail | Nov 1933 (fits D26438 and buses from Nov 7, 1933, east-bay-electric.md) | Wikipedia | same | – | – | [W] |

Still unsourced: the full street routes of lines 28 and 29 (D24866's text, read in the earlier
session, sits only in the summary of east-bay-electric.md; get the verbatim from the PDF), line
28's last day, ES&S openings after 1904, and the 1912 merger day. The Richmond streets are outside
the Overture East Bay box (it ends at 37.93 N), so they weren't checked.

## 3. Key System E (Claremont) and G (Westbrae)

Nothing new reached. For tracing: the USGS San Francisco 15′ sheet of 1915
(`data/raw/usgs/CA_San Francisco_298897_1915_62500_geo.tif`, 1:62,500, source id
`usgs-san-francisco-1915` in `data/usgs-sheets.json`). Its image covers -122.540 to -122.230 and
37.731 to 38.015 (read with rasterio, collar included). That takes in the E west of Market St
(40th St/San Pablo to 55th St, about -122.28) and the Westbrae branch (about -122.29, 37.88),
which were both running in 1915. The detail at 1:62,500 may be too coarse for the E/H junction.
The 1949 Oakland West and Richmond sheets (1:24,000) are also in `data/raw/usgs/`; the G closed in
1941, before the 1949 survey.

## 4. SP lines: Eighteenth Street, Webster Street, Alameda via Fruitvale

Nothing new reached this session. Everything known is in `sp-east-bay.md` and
`east-bay-electric.md`. The days to read are listed in section 6.

## 5. Oakland Traction precursors (pointers only)

| Fact | Value | Source | URL | Tags |
|---|---|---|---|---|
| First street railway | "the Oakland Railroad Company opened the city's first street railway in 1869" | LocalWiki Oakland, "Broadway" | https://localwiki.org/oakland/Broadway | [W] |
| Broadway cable | "a cable line later ran along Broadway" | same | same | [W] |
| Oakland Ave cable | "11 Oakland Ave. line operated by P&MV from 1890 to 1896 as a cable car route" | chicagorailfan | https://www.chicagorailfan.com/bcoakrte.html | [W] |
| Oakland Ave cable | Consolidated Piedmont Cable, 1892 | historyofpiedmont.com; also https://www.historyofpiedmont.com/piedmontcable and https://www.historyofpiedmont.com/piedmontmv | | [W] |
| Park Ave, Emeryville | horsecar or streetcar line from 1873 | Emeryville Historical Society (URL above) | | [W] |
| Wikipedia article | "Oakland Railroad Company" | https://en.wikipedia.org/wiki/Oakland_Railroad_Company | | [W] |

Halley (1876) and Wood (1883) were not reached. Find them on archive.org by title.

---

## 6. For Matthew (and the next session)

**A. Read the decision PDFs** (blocked here only by the tool failure; a session with working
WebFetch can do it). In order:

1. D41652, D41306, D42199, D41385 (1948)
2. D40742 (1947: possibly the whole rail network)
3. D26059, D24224, D24963, D24866 (verbatim)
4. D28615, D28472, D27963, D27964, D29430, D29451, D29473, D29557, D24059
5. The unknowns: D24764, D28206, D28703, D28838, D28918, D35702, D41295
6. Find the 1946 College Avenue decision.

**B. Oakland Tribune days on archive.org** (`oakland-tribune-YYYY-MM-DD`; read on the page
image). For the actual changeover days:

- 1948-03-26 to 03-29 (lines 14, 15, 18)
- 1948-03-31 to 04-30 (line 7)
- 1948-06-25 to 06-28 (lines 10, 11, 12)
- 1948-11-26 to 11-29 (lines 1, 2, 4, 5: "last street car")
- 1946, full-text search "College avenue" with "street car" (line 6)
- 1937-01 to 1937-03 (Fruitvale Ave, East 14th St to Dutton Ave, Park Ave Emeryville, University
  Ave Berkeley)
- 1936-03 (Leona); 1935-12 to 1936-02 (8th and Pine); 1935-05 to 06 (Chestnut St)
- 1933-05-02 to 05-04 (Park Street bridge, line 9); 1933-06 to 07 (lines 17 and 23)
- 1932-07-30 to 08-02 (Richmond lines 28 and 29; also the *Richmond Record-Herald*, `cric_`
  items on archive.org)
- 1931-11 to 12 (8th St and 5th Ave); 1931-09 to 10 (Dana St and Allston Way)
- The E: 1905-06 to 1908, search "Fifty-fifth street" and "Claremont"
- SP Eighteenth St: 1912-03-20 to 23. SP Webster St: 1911-06-29 and 30, 1923-12-26 and 27. Alameda
  horseshoe: 1911-12-19 to 21.

**C. Needs Matthew** (blocked services or libraries):

- The *Berkeley Daily Gazette* for 1931 (Dana St), 1937 (University Ave) and 1946–48 (lines 6, 7,
  4, 5).
- The OAC collection "Key System newspaper clippings, 1941–1960", folders "November 1–15, 1948"
  and "November 16–30, 1948" (https://oac.cdlib.org/findaid/ark:/13030/kt5199r139/), for the last
  day of each 1948 line.
- *The Western Railroader* No. 397, "East Bay Transit: Oakland–Berkeley streetcars 1937–48" (seen
  on an eBay listing, https://www.ebay.com/itm/401806092369): route maps of the late network.
  Probably still in copyright, so use it as a pointer for tracing only.
- The renaming dates: East 14th St (Oakland) → International Blvd, and Grove St → Martin Luther
  King Jr. Way (Oakland and Berkeley). City ordinances or council minutes.
- Which streets the "Peralta Street" (Park Ave, Emeryville), "Perry Street" (Grand Ave) and Chestnut
  St south ends were in the 1930s. Trace them on the 1949 USGS Oakland West sheet or Sanborn maps.

## 7. Sources

**CRC/CPUC decisions** (California public records, cited for facts). All are under
https://files.cpuc.ca.gov/LegacyCPUCDecisionsAndResolutions/Decisions/ and none was opened this
session; the file names are the ones search returned.

- `Decisions_D11601_to_D25900/`: D19150_19271223_A13875, D19526_19280329_A14285,
  D19614_19280414_A14592, D23779_19310615_A11329, D24059_19310921_A17669, D24224_19311116_A17062,
  D24584_19320314_A12820, D24764_19320516_A17981, D24866_19320613_A18164, D24963_19320630_A17062,
  D25409_19321205_C3374.
- `Decisions_D25901_to_D40599/`: D26059_19330612_A18915, D27963_19350513_A19918,
  D27964_19350513_A19919, D28206_19350903_A19502, D28472_19351227_A20290, D28615_19360302_A20291,
  D28703_19360406_A20289, D28838_19360525_A19502, D28918_19360622_A19502, D29405_19361228_A19502,
  D29430_19370104_A19502, D29451_19370111_A19502, D29473_19370118_A19502, D29557_19370219_A19502,
  D29641_19370405_A19502, D30212_19371011_A19502, D33117_19400521_A23417, D35702_19420818_A19502,
  D37339_19440921_A19502, D38877_19460423_A27427.
- `Decisions_D40600_to_D57800/`: D40742_19470923_A19502, D41295_19480309_A28924,
  D41306_19480309_A19502, D41385_19480330_A29173, D41652_19480525_A29172, D42199_19481104_A29174,
  D57402_19580929_A40355.

**Data:** Overture Maps transportation, release 2026-09-23.1, East Bay box
(`overture-roads-2026-09-23-1`, already in DATA_LOG.md), used only to check that street pairs meet.

**Pointers only [W]** (modern web; copyrighted; cite as leads, never as the sole source):

- historyofpiedmont.com: https://www.historyofpiedmont.com/keysystem, /piedmontcable, /piedmontmv,
  /transportation
- Piedmont General Plan, ch. 4 (URL in 1.2)
- CPTDB wiki: https://cptdb.ca/wiki/index.php/Key_System
- chicagorailfan: https://www.chicagorailfan.com/bcoakrte.html
- Pacific Bus Museum: https://pacbus.org/related-info/transit-company/east-bay-motor-coach/
- OAC finding aid: https://oac.cdlib.org/findaid/ark:/13030/kt5199r139/
- Wikipedia: Key System, East Shore and Suburban Railway, Leona Line, Oakland Railroad Company,
  Berkeley, California
- LocalWiki Oakland: Broadway
- Emeryville Historical Society: Park Avenue essay
- KQED and moderntransit.org (College Ave trolley coaches)
- chefjuke.com PDF
- tundria.com
- *The Western Railroader* No. 397 (eBay listing)

**License notes:**

- CRC/CPUC decisions: California public records, cited for facts.
- Publications before 1929: public domain.
- The web pointers and *The Western Railroader*: in copyright, so cite facts only, after
  confirming them in a primary or official source.
