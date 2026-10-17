# Research: Link21, Dumbarton rail and regional express rail

Oct 16, 2026. Research for Phase 4's reference layer (`docs/SPEC.md`, phase 4; `docs/SCHEMA.md`,
"Ideal network"). It covers three proposals: Link21 and the second Transbay rail crossing, passenger
rail across the Dumbarton rail bridge, and official proposals for faster regional rail. It records
what each document proposes. It recommends nothing and edits no data.

## How this was gathered, and its limits

- **No page or PDF was opened.** From this container the agencies' sites (link21program.org,
  bart.gov, capitolcorridor.org, mtc.ca.gov, planbayarea.org, samtrans.com, caltrain.com,
  dot.ca.gov) are refused, and so is web.archive.org. Every fact comes from WebSearch with
  `allowed_domains` set to the publisher's own domain (standard mode, then extended mode).
- **Every row is `[srch]`.** The tool returns titles, URLs and a written summary.
  - Text in quotation marks is a string the summary presented as the page's words. Quote boundaries
    aren't always marked, so a quote may be lightly trimmed.
  - Which URL a fact came from is the tool's attribution. Where it gave none, the row says so.
  - Everything else is *(paraphrase)*.
- **The search budget ran out partway through.** The session's shared limit of 200 searches was
  reached, so some follow-ups weren't run. They are listed at the end, under "Not searched".
- Ids in brackets, such as `[bart-letter-rm3-transbay-2026-04-23]`, are the proposed
  `data/sources.json` ids in the JSON block at the end. None of them exists in `data/sources.json`
  yet. One cited source is already there: `mtc-commission-agenda-2026-08-26`.

Status words follow the brief: `adopted`, `study`, `advocacy`, `superseded` and `withdrawn`.
"Rebuildable" means a path could be drawn from the document's own wording along today's streets or
tracks (`approximate` in `docs/SCHEMA.md`). "No path" means the document publishes none.

---

## 1. Link21 and the second Transbay rail crossing

### Where it stands (Oct 16, 2026)

- **Technology was chosen in June 2025: a standard-gauge ("Regional Rail") crossing, not BART.**
  BART's Board voted to "advance the Link 21 Program as a standard-gauge rail project that is part
  of the California State Rail Plan and a series of projects to be advanced by the state, while
  seeking federal funding" `[bart-link21-milestones-2025-06]`. The Capitol Corridor Joint Powers
  Authority (CCJPA) board followed on June 18, 2025 `[ccjpa-link21-update-2025-06]`. Its staff
  report asked the board to "Accept from BART the transfer of Link21 program management and oversight
  responsibilities to the Capitol Corridor Joint Powers Authority" (Resolution 25-19)
  `[ccjpa-board-2025-06-18]`.
- **BART dropped its own second crossing.** BART's letter to MTC of April 23, 2026 says: "The
  technical analysis determined that investing in and enhancing the existing standard-gauge rail
  network would meet more program requirements than adding a second BART crossing. As a result, the
  BART Board decided in June 2025 not to proceed with a project to design and construct a second
  BART transbay rail crossing." `[bart-letter-rm3-transbay-2026-04-23]`
- **CCJPA has run the program day to day since July 1, 2025.** "Since the CCJPA and San Francisco
  Bay Area Rapid Transit (BART) Boards approved Stage Gate 2 of Link21 (standard gauge in the
  crossing), CCJPA has assumed day-to-day management of Link21 as of July 1, 2025."
  `[ccjpa-board-2026-06-17]`
- **Its next planning work waits on a federal agreement.** "Staff is working closely with the
  Caltrans Department of Rail and has obtained approval from the FRA for our Corridor ID scope,
  schedule, and budget for planning work over the next several years. We are waiting for Caltrans
  and FRA to execute an agreement before we can start work, which is anticipated sometime in 2026."
  `[ccjpa-board-2026-06-17]`. Whether the agreement was signed wasn't seen.
- **The regional toll money for a second crossing was moved to BART's Core Capacity program.**
  - BART asked MTC to rescope RM3 project 13, "Transbay Rail Crossing" ($50 million), "to provide
    accommodation of additional Bay Area Rapid Transit District rail service in the Bay Bridge
    corridor and remove reference to a second transbay crossing", with "Proposed Funding Change: $0"
    `[mtc-rm3-hearing-notice-2026-05]`.
  - The hearing was May 13, 2026. On June 10 the Programming and Allocations Committee referred MTC
    Resolution 4621, Revised to the Commission for its June 24 meeting `[mtc-pac-minutes-2026-06-10]`.
    The draft resolution reads that it was "revised on June 24, 2026 to update the scope for RM3
    projects #13, #25, #32, #33, and #34 with no change to the project funding"
    `[mtc-resolution-4621-revised-2026-06]`. The Commission's vote wasn't seen.
  - The Commission's agenda of Aug 26, 2026 then lists "RM3 Project 13, Transbay Corridor Core
    Capacity Project - $50 million to BART" `[mtc-commission-agenda-2026-08-26]`. That implies the
    rescoping went through, but the outcome of the vote wasn't seen either.
- **The phase is unclear in the sources.**
  - The program site says "Since mid-2022, we have been in the Project Identification phase, which
    will take us from concept development to a proposed project for Environmental Review"
    `[link21-planning-activities]`. The page is undated.
  - BART's 2026 letter says *(paraphrase)* that Phase 1 concluded in 2025 with the technical analysis
    of standard gauge against broad gauge, and that "an estimated $800 million in grant funding is
    required to complete Phase 2 of the Link21 program". It adds *(paraphrase)* that securing that
    money and beginning Phase 2 could take ten-plus years `[bart-letter-rm3-transbay-2026-04-23]`.
  - The 2024 draft business case puts project approval at Stage Gate 3, at the end of Phase 2, which
    would define alternatives for environmental review and authorize a Notice of Intent and Notice of
    Preparation *(paraphrase)* `[link21-preliminary-business-case-2024-08]`.
  - So no environmental review has begun. None is scheduled in anything seen *(inference from the
    above)*.
- **Schedule history.** A 2023 fact sheet gave "Phase 2 Project Selection" as 2024-2028
  `[link21-fact-sheet-2023-06]`. That has slipped (above).

### Concepts

The program's building blocks: "The building blocks of Link21 concepts include: markets, service,
train technology, and infrastructure. Each concept has a new train crossing between Oakland and San
Francisco, new and improved stations, enhanced service, and potential infrastructure needed to
accommodate that service." `[link21-concepts-page]`

The concept round of December 2023 named six concepts `[link21-environmental-input-concepts-2023]`.
The August 2024 draft business case then carried "two Representative Concepts", one per technology
*(paraphrase)* `[link21-preliminary-business-case-2024-08]`. Which of the six became the two wasn't
seen.

| Concept | Mode | What it would build, as worded | Route rebuildable from text? | Status, with the supporting quote |
|---|---|---|---|---|
| A, "Regional Rail STC to Jack London District via Alameda" `[link21-environmental-input-concepts-2023]` | Standard-gauge regional rail | Concepts page: "Concept A Regional Rail Salesforce Transit Center via Alameda", with a West Oakland connection to BART *(paraphrase)* `[link21-concepts-page]`. Appendix C, as the result put it: "A new Regional Rail crossing from the STC to Hercules via Alameda, with a grade separation at Jack London Square, ending at Coliseum Station", with "an average of 10.5 tph" through the crossing at the peak `[link21-pbc-appendix-c-2024-05]`. A later search found no mention of Hercules, so that wording is unconfirmed. | **No path.** The San Francisco end is a point (Salesforce Transit Center) and the tube is unpublished. Alameda and Jack London Square are named places only. East of the crossing, the brief says only that infrastructure "would extend north to Richmond and south to the Coliseum Station" (below). | `study`. The standard-gauge choice of June 2025 (above). Which standard-gauge alignment goes forward isn't decided: "Work on station locations and track alignment will be further defined to identify the proposed Project" *(paraphrase; program pages)* `[link21-current-planning-activities]`. |
| B, "Regional Rail STC via Port of Oakland" | Standard-gauge regional rail | Appendix C: "A new Regional Rail crossing from the STC to Hercules via the Port of Oakland" (the result cut off there) `[link21-pbc-appendix-c-2024-05]` | **No path.** | `study` (as A) |
| E, "Regional Rail STC to MacArthur via Alameda" | Standard-gauge regional rail | Name only `[link21-environmental-input-concepts-2023]` | **No path.** | `study` (as A; whether E survived to the representative concept wasn't seen) |
| F, "Regional Rail STC to Oakland City Center via Alameda" | Standard-gauge regional rail | Name only `[link21-environmental-input-concepts-2023]` | **No path.** | `study` (as E) |
| C, "BART Downtown San Francisco via Alameda" | BART (broad gauge) | "Concept C begins underground at Geary Boulevard and Divisadero Street, first surfacing at the potential new STC-adjacent Howard Street Station before tunneling under the San Francisco Bay toward Alameda" `[link21-environmental-input-concepts-2023]`. Appendix C: "Concept C would be a new BART crossing from a new station near the STC to a new Alameda station. It would extend north to the MacArthur Station via new Jack London Square (JLS) and downtown Oakland stations and south to a new station at San Antonio." `[link21-pbc-appendix-c-2024-05]` | **Points only.** The ends (Geary at Divisadero; MacArthur BART) and the station areas (Howard Street by the STC, Alameda, Jack London Square, downtown Oakland, San Antonio) are named. The path between them isn't. "First surfacing" may mean the first station; the result doesn't say. | `superseded`. "the BART Board decided in June 2025 not to proceed with a project to design and construct a second BART transbay rail crossing" `[bart-letter-rm3-transbay-2026-04-23]` |
| D, "BART Downtown San Francisco via Mission Bay and Alameda" `[link21-pbc-appendix-c-2024-05]` | BART | "Concept D includes multiple new San Francisco stations before tunneling under the bay to Alameda", with stations at 3rd & Mission, 4th & Townsend and Mission Bay/UCSF *(the station list is paraphrase)*; "The BART concepts converge just west of Alameda Island and share stations throughout Oakland, including the new San Antonio Station." `[link21-environmental-input-concepts-2023]` | **Points only.** The three San Francisco stations are named by intersection or district; no path between them is worded. | `superseded` (as C) |
| Dual gauge (both gauges in one crossing) | Both | Dropped: "Link21 is not advancing this concept as it is operationally infeasible to combine the two fundamentally different rail systems in this way". The tool put this on Link21's FAQ or its dual-gauge fact sheet without saying which `[link21-dual-gauge-fact-sheet-2024]`. | n/a | `withdrawn` (as quoted) |
| A combined BART and Regional Rail crossing | Both | Appendix C recommends that such a concept "should not be advanced due to low additional ridership" `[link21-pbc-appendix-c-2024-05]` | n/a | `withdrawn` (as quoted) |

**The Transbay corridor's landing points and stations, across the concepts.**
- Possible transfer points: Salesforce Transit Center, Alameda, Jack London Square, West Oakland,
  the Coliseum and Richmond *(paraphrase)* `[link21-example-concepts]`.
- In the East Bay, "Regional Rail infrastructure improvements would extend north to Richmond and
  south to the Coliseum Station" `[link21-example-concepts]`. The tool attributed that line to the
  example concepts in one search and to "a later planning document" in another.
- Both crossing types would include a new BART–Regional Rail transfer station in Oakland and could
  support a new station in Alameda *(paraphrase)* `[link21-preliminary-business-case-2024-08]`.
- The Alameda station and its alignment options were to be studied further after Stage Gate 2.
  A San Antonio station "is not needed" for the crossing: tested as a sensitivity, it drew new trips
  mostly within the East Bay *(paraphrase, apart from the quoted words)* `[link21-eac-input-report-2024-06]`.
- **San Francisco: Salesforce Transit Center as a through station.** A standard-gauge crossing would
  make the STC a through-running station, reachable from the Peninsula on both sides of the bay. The
  Portal could see a large increase in passenger volume as a result *(paraphrase; Link21 program
  pages)* `[link21-current-planning-activities]`. The 2024 State Rail Plan links the STC's
  high-speed rail vault to a future second crossing, "allowing maximum regional, high-speed, and
  intercity rail throughput" `[csrp-2024]`.

### Costs, ridership and benefits

| Figure | Year and basis | Source |
|---|---|---|
| Crossing infrastructure: "the initial costs of the crossing infrastructure (e.g., tunneling, portals, and track systems) would be between $18 and $30 billion in 2023 dollars"; roughly the same for either technology, with the difference in connecting infrastructure *(second half paraphrase)* | 2023 dollars; excludes finance charges | `[link21-faqs]` |
| "cost estimates are highly variable and depend on the definition of core features, such as alignment, stations, and service levels" | 2024 | `[link21-faqs]` |
| A figure "between $5 and $10 billion in 2023 dollars" whose subject the fragment didn't show | 2024 draft | `[link21-pbc-draft-summary-2024]` |
| BART crossing: "A BART crossing could potentially generate 110,000 new daily rail trips if serving only downtown San Francisco, 130,000 trips if also serving 4th and Townsend and Mission Bay, and 140,000 trips if further serving San Antonio." | 2024 draft | `[link21-preliminary-business-case-2024-08]` |
| "ridership is highly sensitive to the number of stations served by transbay services, especially in San Francisco"; the Regional Rail concept "offers larger travel time saving benefits to a focused number of riders in less established travel markets" | 2024 draft | `[link21-pbc-draft-summary-2024]` |
| Plan Bay Area 2050 (2021): Link21, project 21-T11-112, 2036-2050, "$28,800" (millions, year-of-expenditure); "Link21 provides new transbay rail service between San Francisco and Oakland, including new stations in the East Bay and San Francisco", with 10 trains per hour per direction at the peak *(the frequency is paraphrase)* | 2021; the amended list of Nov 2024 kept the entry | `[pba2050-project-list-2021-10]`, `[pba2050-project-list-amended-2024-11]` |
| Plan Bay Area 2050+ (2026): Link21 appears among corridors where the plan funds project development, "including alternatives and/or studies". No capital line was seen. | Adopted March 2026 | `[pba2050plus-project-list-2026-03]` |
| Phase 2 needs "an estimated $800 million in grant funding" | April 2026 | `[bart-letter-rm3-transbay-2026-04-23]` |

### Drawbacks, risks and criticisms (official)

- **Financing.** BART's letter: Link21 faces "two significant financing obstacles". The $50 million
  of RM3 "allocated to Link21 were intended as a local match" for a federal-state grant that Link21
  did not receive *(that clause paraphrase)*. A Regional Rail crossing is "unrealistic to move
  forward with ... within a reasonable timeframe" (the result elided the middle).
  `[bart-letter-rm3-transbay-2026-04-23]`
- **Lead times and partners.** CCJPA's draft Vision Plan says projects like this "require UP
  agreement, major federal/state funding, NEPA/CEQA clearance, and 10-20+ year lead times"
  `[ccjpa-vision-plan-2026-draft]`.
- **A thin standard-gauge network.** Connecting costs differ because Northern California's
  standard-gauge network is limited by a history of low investment *(paraphrase; the tool didn't
  say which Link21 page, the FAQ being likeliest)* `[link21-faqs]`.
- **Narrower benefits for Regional Rail.** Its travel-time savings go to "a focused number of riders
  in less established travel markets" `[link21-pbc-draft-summary-2024]`.

### Earlier official proposals the program builds on

| Year | Document | What it proposed for the Transbay corridor | Status |
|---|---|---|---|
| 2007 | MTC with BART, Caltrain and the High-Speed Rail Authority, *Regional Rail Plan for the San Francisco Bay Area*, Sept 2007 `[mtc-regional-rail-plan-2007]` | "Plan Recommendation: Alternative 1". Chapter 7's table: "both Alternative 1 & Alternative 2 recommended in long-term future for the Transbay Corridor"; a footnote: "the cost of the transbay crossing and SF subway to Market Street is $7,200 – $8,800" (units and dollar year not shown in the result); Alternative 2 "$37-billion". It treated standard-gauge rail as the backbone, and "New BART lines are considered only to alleviate capacity concerns" `[mtc-regional-rail-plan-2007-ch7]`. | `superseded` (inferred from the later plans; no quote seen) |
| 2013 | BART, *Sustainable Communities Operations Analysis*, June 2013 `[bart-scoa-2013]` | Paired with the longer-range BART Metro Vision, it treated a second Transbay Tube as a long-term capacity option *(paraphrase)* | `superseded` (inferred) |
| 2017 | MTC, *Core Capacity Transit Study* `[mtc-core-capacity-transit-study-2017]` | Long-term options included a second BART crossing, which would give redundancy to the Market Street corridor, and a new conventional rail crossing *(paraphrase)*. The final recommendation wasn't seen. | `superseded` (folded into Link21; inferred) |
| 2018 | BART, "Planning for a second Transbay Tube", Nov 14, 2018 `[bart-second-transbay-tube-2018-11]`; board deck "New Transbay Rail Crossing: Program Overview + Project Contracting Plan", Nov 15, 2018 `[bart-new-transbay-crossing-board-2018-11]` | "BART is taking early steps to create a second Transbay Tube, although it's too early to say if it will actually be a tube"; "a companion to the existing Transbay Tube could include both standard width rail tracks (known as standard-gauge) and the wider BART tracks". A feasibility study was to narrow the alternatives to two to four, and construction might begin in about ten years *(paraphrase)*. | `superseded`. BART's letter: "in 2019, BART initiated a Link21 program to plan, design and construct a second transbay rail crossing" `[bart-letter-rm3-transbay-2026-04-23]` |
| 2019 | MTC Horizon perspective paper, *Crossings* `[mtc-horizon-crossings-2019]`; draft project performance `[mtc-horizon-project-performance-draft]` | It "makes observations about the relative merits of seven different potential Transbay crossings". The performance draft lists, among others, BART Crossing 3 (Mission St) at $36.2B, BART Crossing 4 (New Markets) at $37.4B, Commuter Rail Crossing 5 at $46.1B and Crossing 7 (BART plus commuter rail) at $83.5B. The result read these as present-value costs and couldn't read the column headers, so check them. | `superseded` (inferred) |
| 2021 | Plan Bay Area 2050, strategy T11 `[pba2050-plan-2021-10]` | "Expand and modernize the regional rail network. Better connect communities while increasing frequencies by advancing the Link21 new transbay rail crossing, BART to Silicon Valley Phase 2, Valley Link, Caltrain Downtown Rail Extension and Caltrain/High-Speed Rail grade separations." | `superseded` by Plan Bay Area 2050+ (March 2026), which funds only project development for Link21 |

### Maps

None was seen in the search results. Appendix C (May 2024) and the Environmental Input report
(December 2023) describe each concept's alignment and are the likeliest places for concept maps.
That is unconfirmed: someone must open them in a browser. The Concepts and Example Concepts pages may
carry diagrams too.

### Overlaps and conflicts

- **BART's Core Capacity program instead of a BART tube.** BART says the program would raise its
  transbay capacity by 40% by running longer trains more often through the existing tube, in less
  than ten years *(paraphrase)* `[bart-letter-rm3-transbay-2026-04-23]`. Three new traction power
  substations entered service from January to June 2026. They "give BART the future capability to
  run additional trains through the Transbay Tube" `[bart-tccp-substations-2026-07]`.
- **The Portal.** Through-running at the Salesforce Transit Center needs Caltrain at the STC, which is
  The Portal (a layer A line, environmental review) *(inference from the Link21 and State Rail Plan
  wording above)*.
- **Capitol Corridor.** The program now sits in CCJPA's Corridor ID work *(paraphrase)*
  `[ccjpa-business-plan-fy27-fy28]` and its draft Vision Plan (section 3). The draft says Richmond to Oakland Coliseum, the stretch Link21's East Bay pieces
  would use, is the most complex section to improve *(paraphrase)* `[ccjpa-vision-plan-2026-draft]`.
- **State Rail Plan.** The 2024 plan's "second transbay crossing" is the same idea at state level
  (section 3).

---

## 2. Dumbarton rail

### Where it stands (Oct 16, 2026)

**Confirmed: SamTrans now studies a busway, not rail, on the Dumbarton rail corridor.**
- SamTrans's Reimagine Dumbarton page, as seen on Oct 16, 2026 `[samtrans-reimagine-dumbarton]`:
  - The feasibility study runs from "fall 2025 to spring 2027".
  - Design proposals released in September 2026 call for "a continuous four-mile-long paved walking
    and bicycling trail parallel to a dedicated busway".
  - "Phase II of community engagement is taking place September 9 - October 30".
  - "pending funding availability, construction would start after 2031".
  - "This Project will not preclude the opportunity to convert the corridor to passenger rail in the
    future".
- SamTrans's 2025 item awarding the busway feasibility contract `[samtrans-dumbarton-busway-contract-2025]`
  (MTC reported the consultant procured by April 2026 `[mtc-rm3-project17-update-2026-04]`) says: "Market viability assessment in 2023 found: Significant costs
  associated; limited funding available. Insufficient ridership projections to justify cost -
  estimated at $3.6B in 2024 dollars". The result read the $3.6 billion as the rail option's cost but
  said the slide is ambiguous. The deck also says the rail lines are "to remain intact for potential
  future use".
- **The adopted regional plan swapped rail for bus.**
  - Plan Bay Area 2050 (2021) carried "Dumbarton Rail", 21-T11-108, 2036-2050, "$3,840": "This
    program includes funding to implement new group rapid transit service between Redwood City and
    Newark, including seven new stations (1 minute peak headways)." `[pba2050-project-list-2021-10]`
  - Plan Bay Area 2050+ (adopted March 2026) carries instead 25-T11-145: new express bus between
    Union City and Redwood City with 30-minute peak headways, and a new busway along the Dumbarton
    rail right of way between Menlo Park and Redwood City *(paraphrase)*. It also upgrades the Union
    City–Palo Alto express ("30 minute peak headways on route DB"). It is listed for 2025-2035 at
    $606 million `[pba2050plus-project-list-2026-03]`.
  - The ids moved between drafts: Dumbarton was 25-T11-149 in December 2024 *(paraphrase)*.
- **MTC said rail was not feasible in the mid term.** "A new passenger rail service along the
  Dumbarton corridor is infeasible in the mid-term due to constraints at Redwood City and capacity
  along the peninsula." `[mtc-soco-rail-study]`

### The proposals

| Proposal | Documents | What it would run, and where (as worded) | Route rebuildable from text? | Costs, ridership, times | Status, with the supporting quote |
|---|---|---|---|---|---|
| **Dumbarton Rail Corridor project** (SamTrans and partners, 2000s to 2012) | The tool didn't name the document; probably the DTCS final report's background `[samtrans-dtcs-final-report-2017]` | A 2006 Phase 1 alternatives analysis came first. The project was in Regional Measure 2: "During this time, this project was included in Regional Measure 2 and had funds of approximately $300 million programmed to it." The rail service plan covered Menlo Park, East Palo Alto, Newark, Fremont/Centerville, Union City and Redwood City, among other stations *(paraphrase)*. A 2012 draft EIS/EIR is cited as unpublished *(paraphrase)*. | **Partly.** Redwood City to Newark could follow the existing Dumbarton rail line, already drawn in the past era from OHM (Dumbarton Cutoff, `docs/research/phase-2c.md`). Newark to Union City isn't worded in what was seen. | Not seen | `superseded`; the passenger-rail environmental work is described as "on hold" *(the tool didn't name the page)* |
| **Dumbarton Transportation Corridor Study, Alternative 10** (SamTrans, 2017) | Final report, Nov 20, 2017 `[samtrans-dtcs-final-report-2017]`; press release `[samtrans-dtcs-news-2017]` | The final report recommended "moving forward with Alternative 10 using a phased approach" (road, bus and rail). By 2020, bus and approach work on the highway bridge. By 2025, a "rail shuttle service" on the Dumbarton rail bridge between Redwood City and Newark, "with the goal of extending to Union City by 2030". By 2035, rail "interlined with Caltrain and better connected to ACE and Capitol Corridor". *(The quoted fragments come from the result's summary.)* | **Partly.** Redwood City to Newark could follow the existing Dumbarton rail line. Newark to Union City isn't worded. | Near term: about $51 million capital and $12 million operating, "13,700 more transbay riders daily, a 34 percent increase". Rail: about $975 million to Newark (bridge to safety standards, double track), about $295 million more to Union City, and "approximately $327 million" more for the 2035 phase; 15,600 transbay riders daily. The draft rail forecast was 12,500 to 15,300 riders a day. "the rail alternatives, while most costly, have the greatest potential for private investment and long-term ridership gains" | `superseded` by the 2023 market assessment and the busway (above) |
| **Cross Bay Transit Partners** (Facebook and Plenary under an exclusive negotiating agreement with SamTrans, 2018-21) | Board update, Jan 8, 2020 `[samtrans-dumbarton-update-2020-01]`; project fact sheet, about Jan 2020 `[samtrans-dumbarton-fact-sheet-2020]`; virtual meeting notice, March 2021 `[samtrans-dumbarton-virtual-meeting-2021]`; 2023 legislative program `[samtrans-legislative-program-2023]` | The agreement was signed Aug 14, 2018 and covered only investigation, feasibility and environmental review (CEQA/NEPA) *(paraphrase)*. The alignment runs from the Caltrain Sequoia/Redwood City station to the Union City BART station *(paraphrase)*. "Between Redwood City and Newark, the Project would primarily utilize an existing railroad right-of-way owned by the District." In 2021 "the focus is on developing conceptual alternatives to connect Redwood City to Union City". **The mode isn't stated in what was seen.** Plan Bay Area 2050's entry for the corridor is group rapid transit (next row). | **Partly**, as above: Redwood City to Newark on the existing right of way. Newark to Union City isn't worded. | "$3 Billion" construction, "subject to change"; operation planned by 2028; "Projected Increases by 2040 24,000 trips/day 7.3 million annual trips" | `withdrawn`. The 2018 agreement "also ended in late Spring 2021"; "While Facebook has since ended its involvement in the project, the Agency is continuing to seek new opportunities." `[samtrans-legislative-program-2023]` |
| **Plan Bay Area 2050: "Dumbarton Rail"** as group rapid transit (MTC/ABAG, 2021) | Project list, Oct 2021 `[pba2050-project-list-2021-10]`; amended list, Nov 2024 `[pba2050-project-list-amended-2024-11]`; San Mateo County factsheet, Jan 2022 `[pba2050-san-mateo-factsheet-2022]` | "new group rapid transit service between Redwood City and Newark, including seven new stations (1 minute peak headways)". The factsheet: it would "restore rail service to the 20-mile Dumbarton rail corridor between Redwood City and the East Bay", with automated small-vehicle shuttles of up to 50 passengers a car, linking Caltrain with BART and the Capitol Corridor *(paraphrase)*. | **Partly.** Redwood City to Newark is the existing right of way. The seven stations aren't named in what was seen. | "$3,840" (millions, year-of-expenditure), 2036-2050 | `superseded` by Plan Bay Area 2050+, adopted March 2026 (above) |
| **RM3 project 17, Dumbarton Corridor Improvements** (MTC, 2018 measure) | RM3 ballot description, April 2018 `[mtc-rm3-ballot-description-2018]`; June 2024 programming `[mtc-rm3-dumbarton-programming-2024-06]`; April 2026 update `[mtc-rm3-project17-update-2026-04]` | $130 million for planning, environmental review, design and construction in the Dumbarton bridge and rail corridor *(paraphrase)*. "Eligible projects include, but are not limited to, projects recommended in the 2016 Dumbarton Corridor Transportation Study led by SamTrans", plus a rail connection at Shinn station *(paraphrase)*. As programmed in June 2024 (quote): "$72 million programmed to projects in Alameda County, $32.5 million programmed to projects in San Mateo County, $5 million programmed to Bay Area Toll Authority projects, and $20.5 million in a reserve for future programming". The transit pieces: the San Mateo Dumbarton busway ($5 million, business case and pre-environmental) and Union City BART's east entrance and at-grade crossing ($3 million). | n/a (a funding program) | Busway: about $150 million total, construction targeted for 2029 (as of June 2024). April 2026: $5.0 million programmed and $4.1 million allocated to the busway, with consultant procured *(paraphrase)* | `adopted` as a funding category, programmed by MTC in June 2024 (quote above); no rail project is funded under it |
| **Reimagine Dumbarton busway** (SamTrans, 2025-27): the competing non-rail proposal | `[samtrans-reimagine-dumbarton]`; MTC news `[mtc-news-dumbarton-bridge-toll]` | A dedicated busway and a parallel trail on the rail corridor between Middlefield Road (Redwood City) and University Avenue (East Palo Alto). Nine stations: "Fair Oaks Health Center/Middlefield Road, Fifth Avenue, Ninth Avenue, Bay Road/Marsh Road, Bohannon Drive, Belle Haven Community Campus, Chilco Street, Willow Road, and University Avenue". Two near-term links to Redwood City Transit Center and Caltrain leave the busway at Middlefield Road, one via Woodside Road to El Camino Real and one via Middlefield Road and Jefferson Avenue *(paraphrase)*. The 2024 framing: "a dedicated busway from the west end of the Dumbarton Bridge to the Redwood City Caltrain station" `[mtc-news-dumbarton-bridge-toll]`. | **Yes.** Middlefield Road to University Avenue along today's Dumbarton rail right of way, with stations at the named cross streets. The two Redwood City links are worded by street (Woodside Road and El Camino Real; Middlefield Road and Jefferson Avenue). | "approximately 13 minutes in both directions" between Middlefield Road and University Avenue; some common trips up to 74% shorter *(paraphrase)* | `study` at SamTrans (feasibility to spring 2027); the bus project 25-T11-145 is in the adopted Plan Bay Area 2050+ |

### Drawbacks, risks and criticisms (official)

- **Cost against ridership.** The 2023 market viability assessment: "Insufficient ridership
  projections to justify cost - estimated at $3.6B in 2024 dollars"
  `[samtrans-dumbarton-busway-contract-2025]`.
- **Bus did better per dollar.** The bus alternatives produced about 25% more ridership than rail
  *(paraphrase; a later SamTrans document citing the 2017 study)*. The 2017 study found that "the bus
  alternatives performed the best in terms of cost-effectiveness" `[samtrans-dtcs-final-report-2017]`.
- **Redwood City and the Peninsula.** Mid-term rail is "infeasible ... due to constraints at Redwood
  City and capacity along the peninsula" `[mtc-soco-rail-study]`.
- **The bridge itself.** The 2017 report: "It also represents a safety hazard in its current
  condition and could require substantial funding to remove if not repaired". Demolition would cost
  about $150 million. The U.S. Coast Guard would require dismantling and mitigation if the bridge
  isn't rehabilitated *(paraphrase)* `[samtrans-dtcs-final-report-2017]`.

### Maps

None was confirmed in the search results.
- The Reimagine Dumbarton page's design proposals (September 2026) list stations, and probably carry
  a map; open the page to check.
- The 2017 study and the 2020 fact sheet weren't seen with figures.
- The 2007 Regional Rail Plan showed Dumbarton as a Redwood City–Union City rail link with a BART
  connection at Union City *(paraphrase)* `[mtc-regional-rail-plan-2007-ch7]`. Its maps weren't seen.

### Overlaps and conflicts

- **Rail against the busway.** The busway uses the same right of way. SamTrans says it "will not
  preclude" rail, and the rail lines are to stay "intact for potential future use" (quotes above).
- **Caltrain capacity.** The 2017 study's 2035 phase interlines with Caltrain. Caltrain's 2025
  service vision caps the corridor at "12 trains per hour per direction in the peak hours, made up of
  eight Caltrain and four California High Speed Rail Authority trains" (section 3) and names the
  "Dumbarton Rail Corridor" among partner planning efforts `[caltrain-lrsv-2025]`. MTC's study cites
  Peninsula capacity against mid-term rail (above).
- **The East Bay end.** MTC's study picked the Union City Intermodal Station as the East Bay rail hub
  *(paraphrase)* `[mtc-soco-rail-study]`, the east end of the 2017 study's and the 2018-21
  partnership's rail. Capitol Corridor's South Bay Connect would also run through Newark (layer A
  candidate, `docs/research/future-status-2026-10.md`).
- **State Rail Plan, 2018 edition.** It called for half-hourly peak and hourly off-peak "bus or rail"
  service in the Dumbarton corridor, an East Bay hub near Newark, Hayward or Fremont, and a Dumbarton
  crossing "chosen consistent with results of the 2022" study (the result cut off there). Its near
  term was "initial integrated express bus services connecting the Peninsula and East Bay across the
  Dumbarton Bridge" `[csrp-2018-chapter-4]`. Whether the 2024 edition says anything on Dumbarton
  wasn't seen.

---

## 3. Regional express rail

No official document seen uses "regional express rail" as the name of a network. The proposals for
faster, more integrated regional rail are these:

| Document | Publisher, date | What it proposes (as worded) | Rebuildable? | Costs and benefits | Status, with the supporting quote |
|---|---|---|---|---|---|
| **2024 California State Rail Plan** `[csrp-2024]`, its fact sheet `[csrp-2024-fact-sheet]` and Caltrans's page `[caltrans-state-rail-plan-page]` | Caltrans, December 2024; released Jan 7, 2025 | A 2050 integrated zero-emission network with timed transfers. Its timetable-based planning gives "pulsed" all-day schedules that support timed connections all day *(paraphrase)*. "A second transbay crossing will allow for through-running trains from Sacramento to San Jose and beyond". Coordinated regional and intercity service in the largest metro areas with high-frequency all-day connections *(paraphrase)*. It would study Sacramento–Oakland and San Jose–Oakland service with and without a new Transbay crossing *(paraphrase; the edition, 2018 or 2024, is unclear)*. Regional rail "will connect the north Bay Area to as far as Healdsburg", and service would extend from San Jose toward Salinas. One search instead read the fact sheet as Salinas and Cloverdale. About 1,500 miles electrified by 2050 (about 440 by 2034). An express-and-local Peninsula target of "six trains per hour in each direction in peak periods" was seen, but its edition (2018 or 2024) is unclear. | **Partly.** Services run on today's lines (Capitol Corridor, Caltrain, ACE and SMART in GTFS). The second crossing has no path. | "$307 billion" capital statewide; "over $537 billion" economic return by 2050; "over $65 billion will be spent over the next ten years"; "nearly 200 million miles per day" of passenger travel in 2050 | `adopted` (the brief counts the State Rail Plan as an adopted plan). Caltrans: released on January 7, 2025; the next full update is due in 2028 *(paraphrase)*. No formal adoption act was seen. The 2026 TIRCP guidelines ask applicants to show support for it *(paraphrase)*. |
| **2018 California State Rail Plan**, chapter 4 `[csrp-2018-chapter-4]` | Caltrans, 2018 | Pulse scheduling as uniform service patterns repeating on regular intervals *(paraphrase)*, with "Exhibit 4.1: Sketch of 'Pulsed' Services" (hubs at Oakland, San Francisco and San Jose). Oakland–San Jose half-hourly at the peak and at least every two hours off-peak; Altamont up to half-hourly San Jose–Stockton, with timed Tri-Valley connections *(paraphrase)*. Dumbarton as above. | Same as 2024 | Not seen | `superseded` by the 2024 edition (inferred: a newer edition replaced it) |
| **Caltrain Long-Range Service Vision** `[caltrain-lrsv-2025]`; staff report `[caltrain-lrsv-staff-report-2025-10]` | Caltrain (Peninsula Corridor JPB), adopted October 2025 | Maximum peak "8 trains per hour per direction on the JPB-owned corridor between Tamien Station in San Jose and San Francisco, with 4 trains per hour per direction between Blossom Hill and Tamien Stations"; off-peak and weekends "between 2 and 6 trains per hour per direction north of Blossom Hill". The staff report recommends "confirming the Core Service Vision as JPB's goal for future maximum rail service on the corridor", 12 trains per hour per direction at the peak (8 Caltrain and 4 high-speed rail). It removes "language that directs planning for Expanded Growth in service, beyond the Core Service Vision" and the 2040 horizon date. The vision keeps short four-track stations for overtakes *(paraphrase)*. A 2024 analysis put the four-track segments around Millbrae, Hayward Park/Hillsdale and Redwood City, with California Avenue as the north Santa Clara County option *(paraphrase)* `[caltrain-4-track-analysis-2024-02]`. | **Yes.** It is today's Caltrain line (GTFS shape). The four-track stations are named places along it; their lengths weren't seen. | 2025: not seen. 2019 vision: "$23 billion" total capital including about $9.4 billion of grade separations, about $370 million a year to operate, and "almost triple to 180,000 daily riders by 2040" `[caltrain-lrsv-page-2019]`, `[caltrain-service-vision-2019-news]` | `adopted`. Title: "Adopted October 2025"; "This updated policy supersedes Caltrain's first Long-Range Service Vision, which the board adopted in October 2019." |
| **Caltrain 2040 Service Vision** (Business Plan) `[caltrain-service-vision-2019-news]`, `[caltrain-lrsv-page-2019]` | Caltrain, October 2019 | "Service during peak hours would grow to a minimum of eight trains per direction per hour, with all day express service every 15 minutes"; "a series of short, 4-track stations that allow express trains to overtake locals". Its materials referred to growing from 12 to 16 trains per hour with added passing tracks *(paraphrase)*, which the 2025 update drops. | **Yes**, as above | As above | `superseded` (October 2025, quoted above) |
| **Capitol Corridor Vision Plan** (public draft) `[ccjpa-vision-plan-2026-draft]` | CCJPA, July 2026 | "a long-range blueprint for train service between the Sacramento region and the San Francisco Bay Area". Sacramento–Oakland: 15-minute peak frequencies in the long term, and higher speeds "(up to potentially 150 mph – electrified service)". Oakland Coliseum–San Jose: from 7 to 15 round trips a day *(paraphrase)*. Oakland to San Francisco is Link21, "a combination of transit and intercity rail service". Separating passenger from freight trains where possible, Oakland–San Jose *(paraphrase)*. | **Partly.** Today's Capitol Corridor route (GTFS). The San Francisco link is Link21, with no path. | Not seen in the results | `study`. The draft's timeline: "September/October 2026 - Finalize Vision Plan; November 2026 – CCJPA Board adopts Vision Plan" |
| **Plan Bay Area 2050+, strategy T11, and Transit 2050+** `[pba2050plus-page]`, `[mtc-transit-2050-plus-page]`, `[mtc-transit-2050-plus-final-network-2024-12]`, `[mtc-transit-2050-plus-draft-report]` | MTC/ABAG; Transit 2050+ final network December 2024; plan adopted by ABAG Mar 19 and MTC Mar 25, 2026 | "Transit 2050+ envisions a nearly $340 billion investment in the Bay Area's transit network over the next 25 years". Five-to-ten-minute headways or better in the urban cores *(paraphrase)* and "Frequencies of 15 minutes or better for routes between urban centers". "Caltrain Systemwide frequency upgrades to be implemented in Phase 1 (6 trains per hour per direction in peak) and Phase 2 (8 trains per hour per direction in peak)". Lower-cost upgrades come before 2035 and large expansions in 2035-2050 *(paraphrase)*. Link21: project development only (section 1). | **Partly.** Upgrades are on existing lines (GTFS). | Draft report: "By 2050, these investments would increase regionwide transit service levels by approximately 60%. Transit ridership could increase by 41%" | `adopted`. "The project list was adopted by the Commission as part of the Plan Bay Area 2050+ Final Blueprint in January 2025" `[mtc-transit-2050-plus-page]`; the final plan was adopted in March 2026 `[pba2050plus-page]`. A planbayarea.org listing dated Sept 21, 2026 says MTC "today adopted" the plan, which conflicts with March and looks like a listing artifact. |
| **MTC Regional Rail Plan** (2007) `[mtc-regional-rail-plan-2007]` | MTC with BART, Caltrain and the High-Speed Rail Authority, September 2007 | A long-range vision for the existing passenger rail system and its extension *(paraphrase)*, recommending Alternative 1 (section 1) | Not seen | Regional build-out near $40 billion *(paraphrase)*; Alternative 2 "$37-billion" | `superseded` (inferred) |

### Maps

- **2018 State Rail Plan, chapter 4:** "Exhibit 4.1: Sketch of 'Pulsed' Services" and "Exhibit 4.6:
  Northern California Service (2027 Vision)". Both are named in the results; the pages weren't seen.
- **2024 State Rail Plan:** Caltrans's pages refer to Northern California service maps
  *(paraphrase)*. Their figure numbers weren't seen.
- **Caltrain and Capitol Corridor:** no map was seen in the results.

### Overlaps and conflicts

- **One crossing in three documents.** The State Rail Plan's through-running from Sacramento to San
  José, CCJPA's Vision Plan (Oakland to San Francisco "is Link21") and Link21's standard-gauge choice
  describe the same crossing. BART's letter calls it unrealistic within a reasonable timeframe, and
  Plan Bay Area 2050+ funds only its project development.
- **Caltrain's ceiling.** It is 8 Caltrain and 4 high-speed trains per direction per peak hour, with
  the Expanded Growth language removed. Any extra service from Dumbarton or Link21 trains on the
  Peninsula would need to fit within it (that it would is inference; Caltrain's vision names both as
  partner efforts).

---

## For Matthew: what needs doing by hand

- **Open in a browser** (every fact here is search-summary text, `[srch]`):
  - Link21's Appendix C (May 2024) and Environmental Input report (December 2023): concept
    alignments, any maps, and whether Concepts A and B really run to Hercules.
  - The August 2024 Preliminary Business Case: which concepts became the two representative
    concepts, and their stations.
  - BART's letter of April 23, 2026 (in MTC's May 13, 2026 committee packet): its full wording.
  - MTC's minutes of June 24 and Aug 26, 2026: whether the RM3 project 13 rescoping and the
    $50 million allocation passed.
  - Reimagine Dumbarton's design proposals (September 2026): its map, to trace the nine stations.
  - The 2017 Dumbarton study's figures and alternatives.
  - The 2024 State Rail Plan: its Bay Area figure numbers and any Dumbarton wording.
- **Check one unattributed find.** One result described a study of six Dumbarton modes (a Caltrain
  spur, light rail, BRT, personal rapid transit, group rapid transit and an aerial ropeway). In it,
  BRT and personal rapid transit were preferred and evaluated "under 2025 conditions", and a BRT
  alternative had ten stations, five of them in the Facebook campus. The tool didn't name the
  document, so this is left out of the tables.
- **Nothing to trace in the Transbay tube.** No Link21 alignment is published, and the BART
  concepts are superseded. As `docs/SCHEMA.md` says for projects without a published alignment,
  these could appear in the list and panel only, with points for named stations if you want them.
- **Paths that could be rebuilt from text:**
  - the Dumbarton rail right of way, Redwood City to Newark (reuse the past era's Dumbarton Cutoff
    geometry);
  - the Reimagine Dumbarton busway, Middlefield Road to University Avenue, with its two Redwood City
    street links;
  - Caltrain's four-track overtake areas (Millbrae, Hayward Park/Hillsdale, Redwood City, California
    Avenue), as places along today's track;
  - service visions on today's Caltrain and Capitol Corridor lines (GTFS shapes).

## Not searched (search budget reached)

- Link21's Stage Gate 2 report, and the full rationale of June 2025 in its own words.
- Link21's FAQ, checked directly for the $18-30 billion figure and the dual-gauge wording (attributed
  above as the tool gave it).
- Whether the 2024 State Rail Plan names Dumbarton, and its Bay Area maps.
- The SamTrans board item of August 2026 (7.c) and any October 2026 Reimagine Dumbarton update.
- Plan Bay Area 2050+'s own wording for strategy T11 (the 2021 wording is quoted above).

## Proposed `data/sources.json` entries

`mtc-commission-agenda-2026-08-26` already exists and is reused; its notes could add RM3 project 13
("Transbay Corridor Core Capacity Project - $50 million to BART"). The Plan Bay Area 2050+ project
list is also registered as `bam-smart-cloverdale-src-7`, a BAM-synced id, so it gets its own
non-`bam-` id here.

```json
[
  {
    "id": "link21-concepts-page",
    "title": "Concepts",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "type": "official",
    "url": "https://link21program.org/en/program/concepts",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated. \"The building blocks of Link21 concepts include: markets, service, train technology, and infrastructure. Each concept has a new train crossing between Oakland and San Francisco, new and improved stations, enhanced service, and potential infrastructure needed to accommodate that service.\" \"Concept A Regional Rail Salesforce Transit Center via Alameda\"."
  },
  {
    "id": "link21-planning-activities",
    "title": "Planning Activities",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "type": "official",
    "url": "https://link21program.org/en/program/planning-activities",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated. \"Since mid-2022, we have been in the Project Identification phase, which will take us from concept development to a proposed project for Environmental Review.\""
  },
  {
    "id": "link21-current-planning-activities",
    "title": "Current Planning Activities",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "type": "official",
    "url": "https://link21program.org/en/program/current-planning-activities",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated. Paraphrase: Link21 continues planning a standard-gauge crossing, to advance into Environmental Review in the Project Selection Phase; station locations and track alignment are still to be defined; a standard-gauge crossing would make Salesforce Transit Center a through-running station."
  },
  {
    "id": "link21-example-concepts",
    "title": "Example Concepts",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "type": "official",
    "url": "https://link21program.org/en/program/example-concepts",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated. Paraphrase: possible transfer points at Salesforce Transit Center, Alameda, Jack London Square, West Oakland, the Coliseum and Richmond. \"Regional Rail infrastructure improvements would extend north to Richmond and south to the Coliseum Station\" (the tool's attribution of this line varied)."
  },
  {
    "id": "link21-faqs",
    "title": "Frequently Asked Questions",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "type": "official",
    "url": "https://link21program.org/en/about/faqs",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"the initial costs of the crossing infrastructure (e.g., tunneling, portals, and track systems) would be between $18 and $30 billion in 2023 dollars\"; \"cost estimates are highly variable and depend on the definition of core features, such as alignment, stations, and service levels\"."
  },
  {
    "id": "link21-dual-gauge-fact-sheet-2024",
    "title": "Link21 Program Dual Gauge Fact Sheet (draft)",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2024-02",
    "type": "official",
    "url": "https://link21program.org/sites/default/files/2024-02/2-OUTR-PH1-Link21_FactSheet_DualGauge_DRAFT-20240209_PDFUA.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Link21 is not advancing this concept as it is operationally infeasible to combine the two fundamentally different rail systems in this way.\" The tool didn't say whether this line was from the fact sheet or the FAQ."
  },
  {
    "id": "link21-environmental-input-concepts-2023",
    "title": "Environmental Input to Link21 Concepts (executive summary)",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2023-12",
    "type": "official",
    "url": "https://link21program.org/sites/default/files/2024-02/03_2-ENVI-PH1-Env_Input_Link21_Concepts_508_ES_ONLY_120823.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Concept names: \"Concept A: Regional Rail STC to Jack London District via Alameda\", \"Concept B: Regional Rail STC via Port of Oakland\", \"Concept C: BART Downtown San Francisco via Alameda\", \"Concept E: Regional Rail STC to MacArthur via Alameda\", \"Concept F: Regional Rail STC to Oakland City Center via Alameda\". \"Concept C begins underground at Geary Boulevard and Divisadero Street, first surfacing at the potential new STC-adjacent Howard Street Station before tunneling under the San Francisco Bay toward Alameda.\" \"The BART concepts converge just west of Alameda Island and share stations throughout Oakland, including the new San Antonio Station.\" The date is from the file name (120823)."
  },
  {
    "id": "link21-pbc-appendix-c-2024-05",
    "title": "Draft Preliminary Business Case Report, Appendix C: Draft Concept Development",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2024-05",
    "type": "official",
    "url": "https://link21program.org/en/media/624/download",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Concept C would be a new BART crossing from a new station near the STC to a new Alameda station. It would extend north to the MacArthur Station via new Jack London Square (JLS) and downtown Oakland stations and south to a new station at San Antonio.\" Concept D: \"BART Downtown San Francisco via Mission Bay and Alameda\". As the result put it, Concept A: \"A new Regional Rail crossing from the STC to Hercules via Alameda, with a grade separation at Jack London Square, ending at Coliseum Station\", with \"an average of 10.5 tph\" at the peak (Hercules unconfirmed by a later search). A combined BART and Regional Rail crossing \"should not be advanced due to low additional ridership\"."
  },
  {
    "id": "link21-preliminary-business-case-2024-08",
    "title": "Preliminary Business Case Report, Draft Final (draft, deliberative)",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2024-08",
    "type": "official",
    "url": "https://link21program.org/sites/default/files/2-BUSC-PH1-Prelim_BUSC_Preliminary_Business_Case_Report_v0.10_clean.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"A BART crossing could potentially generate 110,000 new daily rail trips if serving only downtown San Francisco, 130,000 trips if also serving 4th and Townsend and Mission Bay, and 140,000 trips if further serving San Antonio.\" Paraphrase: two Representative Concepts, one per technology; both include a new BART-Regional Rail transfer station in Oakland and could support an Alameda station; project approval at Stage Gate 3, the end of Phase 2."
  },
  {
    "id": "link21-pbc-draft-summary-2024",
    "title": "Link21 Preliminary Business Case Report: Draft Summary",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2024",
    "type": "official",
    "url": "https://link21program.org/en/media/650/download?inline=",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"ridership is highly sensitive to the number of stations served by transbay services, especially in San Francisco\"; the Regional Rail concept \"offers larger travel time saving benefits to a focused number of riders in less established travel markets\". A fragment gives \"between $5 and $10 billion in 2023 dollars\" without its subject."
  },
  {
    "id": "link21-eac-input-report-2024-06",
    "title": "Draft Stage Gate 2 Equity Advisory Council (EAC) Input Report",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2024-06",
    "type": "official",
    "url": "https://link21program.org/en/media/645/download?inline=",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: a San Antonio station is not needed for the crossing; tested as a sensitivity, its new trips were mostly within the East Bay. Alameda station and alignment options to be studied further after Stage Gate 2."
  },
  {
    "id": "link21-fact-sheet-2023-06",
    "title": "A Transformative Program for Northern California (Link21 general fact sheet)",
    "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)",
    "date": "2023-06",
    "type": "official",
    "url": "https://link21program.org/sites/default/files/2023-06/2-OUTR-PH1_General_Fact_Sheet_DRAFT_FINAL_v3-2023-06-07_PDFUA_DIGITAL.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Gave \"Phase 2 Project Selection\" as 2024-2028, since overtaken."
  },
  {
    "id": "bart-link21-milestones-2025-06",
    "title": "Link21 reaches new milestones for technology selection and inclusion in the state's rail plan",
    "publisher": "San Francisco Bay Area Rapid Transit District",
    "date": "2025-06-12",
    "type": "official",
    "url": "https://www.bart.gov/news/articles/2025/news20250612-1",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. The BART Board voted to \"advance the Link 21 Program as a standard-gauge rail project that is part of the California State Rail Plan and a series of projects to be advanced by the state, while seeking federal funding\"; \"the day-to-day management of the Link21 Project will now be managed by the Capitol Corridor Joint Powers Authority (CCJPA), in coordination with the State Transportation Agency\". The date is from the URL; one CCJPA result said June 13."
  },
  {
    "id": "ccjpa-link21-update-2025-06",
    "title": "Capitol Corridor Board Advances Link21 as Standard-Gauge Rail Project and Takes Over Day-to-Day Management",
    "publisher": "Capitol Corridor Joint Powers Authority",
    "date": "2025-06",
    "type": "official",
    "url": "https://www.capitolcorridor.org/blogs/get_on_board/link21update2025/",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Paraphrase: the CCJPA board voted on June 18, 2025 to advance Link21 as a standard-gauge project and to assume day-to-day management, in coordination with CalSTA."
  },
  {
    "id": "ccjpa-board-2025-06-18",
    "title": "CCJPA Board of Directors meeting, June 18, 2025: agenda packet, supplemental slides and public comments",
    "publisher": "Capitol Corridor Joint Powers Authority",
    "date": "2025-06-18",
    "type": "official",
    "url": "https://www.capitolcorridor.org/wp-content/uploads/2025/07/June-18-2025-CCJPA-Board-Meeting_AgendaPacket_Supplemental_Slides_Public-Comments_Final.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Accept from BART the transfer of Link21 program management and oversight responsibilities to the Capitol Corridor Joint Powers Authority\"; Resolution 25-19."
  },
  {
    "id": "ccjpa-board-2026-06-17",
    "title": "CCJPA Board of Directors meeting, June 17, 2026: agenda packet and slide deck",
    "publisher": "Capitol Corridor Joint Powers Authority",
    "date": "2026-06-17",
    "type": "official",
    "url": "https://www.capitolcorridor.org/wp-content/uploads/2026/06/June-17-2026-CCJPA-Board-Meeting_Agenda-Packet-Slide-Deck.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Since the CCJPA and San Francisco Bay Area Rapid Transit (BART) Boards approved Stage Gate 2 of Link21 (standard gauge in the crossing), CCJPA has assumed day-to-day management of Link21 as of July 1, 2025.\" \"We are waiting for Caltrans and FRA to execute an agreement before we can start work, which is anticipated sometime in 2026.\""
  },
  {
    "id": "ccjpa-business-plan-fy27-fy28",
    "title": "FY 2026-27 and FY 2027-28 Final Annual Business Plan",
    "publisher": "Capitol Corridor Joint Powers Authority",
    "date": "2026-06",
    "type": "official",
    "url": "https://www.capitolcorridor.org/wp-content/uploads/2026/06/CCJPA-FY27-FY28-Final-Annual-Business-Plan.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: Link21 is an element of the Corridor ID process, which Caltrans and CCJPA expect to build on the Vision Plan."
  },
  {
    "id": "ccjpa-vision-plan-2026-draft",
    "title": "Vision Plan 2026 (public draft)",
    "publisher": "Capitol Corridor Joint Powers Authority",
    "date": "2026-07",
    "type": "official",
    "url": "https://www.capitolcorridor.org/wp-content/uploads/2026/07/CCJPA_VisionPlan_public_Web.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"a long-range blueprint for train service between the Sacramento region and the San Francisco Bay Area\"; \"(up to potentially 150 mph – electrified service)\"; Link21 as \"a combination of transit and intercity rail service\"; projects \"require UP agreement, major federal/state funding, NEPA/CEQA clearance, and 10-20+ year lead times\"; \"September/October 2026 - Finalize Vision Plan; November 2026 – CCJPA Board adopts Vision Plan\"."
  },
  {
    "id": "bart-letter-rm3-transbay-2026-04-23",
    "title": "Letter to Andrew Fremier, MTC, on the second BART Transbay Rail Crossing and RM3 scope (Programming and Allocations Committee item 3a, Attachment A, May 13, 2026)",
    "publisher": "San Francisco Bay Area Rapid Transit District (in an MTC committee packet)",
    "date": "2026-04-23",
    "type": "official",
    "url": "https://zh-tw.mtc.ca.gov/sites/default/files/meetings/attachments/6589/3a_26_0565_2_Attachment_A_Project_Amendment_Request_Letters.pdf?cb=42f20d40",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened (the search returned MTC's zh-tw mirror). \"The technical analysis determined that investing in and enhancing the existing standard-gauge rail network would meet more program requirements than adding a second BART crossing. As a result, the BART Board decided in June 2025 not to proceed with a project to design and construct a second BART transbay rail crossing.\" \"two significant financing obstacles\"; \"an estimated $800 million in grant funding is required to complete Phase 2 of the Link21 program\"."
  },
  {
    "id": "mtc-rm3-hearing-notice-2026-05",
    "title": "Notice of Public Hearing, Regional Measure 3 (May 13, 2026)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-04",
    "type": "official",
    "url": "https://www.mtc.ca.gov/sites/default/files/documents/2026-04/2026-RM3PublicHearingNotice.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"modify scope of Transbay Rail Crossing (RM3 project #13) to provide accommodation of additional Bay Area Rapid Transit District rail service in the Bay Bridge corridor and remove reference to a second transbay crossing\"; \"Current Total RM3 Funding: $50 million; Proposed Total RM3 Funding: $50 million; Proposed Funding Change: $0\"; Commission action set for June 24, 2026."
  },
  {
    "id": "mtc-pac-minutes-2026-06-10",
    "title": "Programming and Allocations Committee minutes, June 10, 2026",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-06-10",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/meetings/minutes/6640_M_Programming_and_Allocations_Committee_26_06_10_Meeting_Minutes.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: the committee referred MTC Resolution No. 4621, Revised (the RM3 program amendment, including project 13) to the Commission for approval on June 24, 2026."
  },
  {
    "id": "mtc-resolution-4621-revised-2026-06",
    "title": "MTC Resolution No. 4621, Revised (Programming and Allocations Committee attachment, June 10, 2026)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-06",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/meetings/attachments/6640/3a_26_0615_2_MTC_Resolution_No_4621_Revised.pdf?cb=a0138f39",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. The draft reads \"revised on June 24, 2026 to update the scope for RM3 projects #13, #25, #32, #33, and #34 with no change to the project funding\". The Commission's vote wasn't seen."
  },
  {
    "id": "bart-tccp-substations-2026-07",
    "title": "BART brings three new traction power substations online, strengthening reliability across the system",
    "publisher": "San Francisco Bay Area Rapid Transit District",
    "date": "2026-07-31",
    "type": "official",
    "url": "https://www.bart.gov/news/articles/2026/news20260731-0",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"The increase in available power from the new substations will also give BART the future capability to run additional trains through the Transbay Tube\". Paraphrase: three substations in service January to June 2026 under the Transbay Corridor Core Capacity Program, about 20 percent more power on the M-Line."
  },
  {
    "id": "bart-second-transbay-tube-2018-11",
    "title": "Planning for a second Transbay Tube",
    "publisher": "San Francisco Bay Area Rapid Transit District",
    "date": "2018-11-14",
    "type": "official",
    "url": "https://www.bart.gov/news/articles/2018/news20181114-0",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"BART is taking early steps to create a second Transbay Tube, although it's too early to say if it will actually be a tube.\" \"a companion to the existing Transbay Tube could include both standard width rail tracks (known as standard-gauge) and the wider BART tracks\"."
  },
  {
    "id": "bart-new-transbay-crossing-board-2018-11",
    "title": "New Transbay Rail Crossing: Program Overview + Project Contracting Plan (Board presentation)",
    "publisher": "San Francisco Bay Area Rapid Transit District",
    "date": "2018-11-15",
    "type": "official",
    "url": "https://www.bart.gov/sites/default/files/docs/New%20Transbay%20Crossing%20Board%202018%2011%2015%20v%20FINAL%20Q%20drive%20Recovered_0.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: six objectives for the crossing, among them connecting the megaregion, leveraging Caltrain and high-speed rail, and protecting Market Street throughput."
  },
  {
    "id": "bart-scoa-2013",
    "title": "BART Sustainable Communities Operations Analysis, Final Report",
    "publisher": "San Francisco Bay Area Rapid Transit District",
    "date": "2013-06",
    "type": "official",
    "url": "https://www.bart.gov/sites/default/files/docs/BART%20Metro%20SCOA%20Final%20Report%20June%202013.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: run alongside the longer-range BART Metro Vision, which looked at a second Transbay Tube as a long-term capacity option."
  },
  {
    "id": "mtc-regional-rail-plan-2007",
    "title": "Regional Rail Plan for the San Francisco Bay Area, Final Report (chapters 1-5) and Executive Summary",
    "publisher": "Metropolitan Transportation Commission, with BART, Caltrain and the California High-Speed Rail Authority",
    "date": "2007-09",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/RegionalRailPlan-Chapters1-5.pdf?cb=2a6007b7",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Executive summary page: https://mtc.ca.gov/tools-and-resources/digital-library/san-francisco-bay-area-regional-rail-plan-executive-summary (dated September 1, 2007). Paraphrase: a long-range vision for improving the existing passenger rail system and extending it."
  },
  {
    "id": "mtc-regional-rail-plan-2007-ch7",
    "title": "Regional Rail Plan for the San Francisco Bay Area, Chapter 7: Alternatives Definition and Evaluation",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2007-09",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/RegionalRailPlan-Chapter7.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Plan Recommendation: Alternative 1\"; \"both Alternative 1 & Alternative 2 recommended in long-term future for the Transbay Corridor\"; \"the cost of the transbay crossing and SF subway to Market Street is $7,200 – $8,800\" (units not shown); Alternative 2 \"$37-billion\"; \"New BART lines are considered only to alleviate capacity concerns\"."
  },
  {
    "id": "mtc-core-capacity-transit-study-2017",
    "title": "Core Capacity Transit Study (CCTS)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2017",
    "type": "official",
    "url": "https://mtc.ca.gov/planning/transportation/regional-transportation-studies/core-capacity-transit-study-ccts",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Paraphrase: released in 2017; its long-term Transbay options included a second BART crossing, giving redundancy to Market Street, and a new conventional rail crossing (summary sheet: https://es.mtc.ca.gov/sites/default/files/CCTS_Takeaway.pdf). The final recommendation wasn't seen."
  },
  {
    "id": "mtc-horizon-crossings-2019",
    "title": "Crossings: Perspective Paper Weighs Options for New Transbay Bridges, Tunnels",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments (Plan Bay Area)",
    "date": "2019",
    "type": "official",
    "url": "https://planbayarea.org/news/news-story/crossings-perspective-paper-weighs-options-new-transbay-bridges-tunnels",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. The paper \"makes observations about the relative merits of seven different potential Transbay crossings\" and does not select one (paraphrase)."
  },
  {
    "id": "mtc-horizon-project-performance-draft",
    "title": "Horizon / Plan Bay Area 2050 draft project performance results",
    "publisher": "Metropolitan Transportation Commission",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/Horizon_PBA50_Draft_Project_Performance.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Undated. Lists BART Crossing 3 (Mission St) $36.2B, BART Crossing 4 (New Markets) $37.4B, Commuter Rail Crossing 5 $46.1B, Crossing 7 (BART plus commuter rail) $83.5B, read by the search as present-value costs; column headers not seen."
  },
  {
    "id": "pba2050-plan-2021-10",
    "title": "Plan Bay Area 2050: A Vision for the Future (final)",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "date": "2021-10-01",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/Plan_Bay_Area_2050_October_2021_rev.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"T11. Expand and modernize the regional rail network. Better connect communities while increasing frequencies by advancing the Link21 new transbay rail crossing, BART to Silicon Valley Phase 2, Valley Link, Caltrain Downtown Rail Extension and Caltrain/High-Speed Rail grade separations.\""
  },
  {
    "id": "pba2050-project-list-2021-10",
    "title": "Plan Bay Area 2050 Transportation Project List",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "date": "2021-10",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/PBA2050_Transportation_Project_List_Oct2021.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Link21, 21-T11-112, 2036-2050, \"$28,800\": \"Link21 provides new transbay rail service between San Francisco and Oakland, including new stations in the East Bay and San Francisco.\" Dumbarton Rail, 21-T11-108, 2036-2050, \"$3,840\": \"This program includes funding to implement new group rapid transit service between Redwood City and Newark, including seven new stations (1 minute peak headways).\""
  },
  {
    "id": "pba2050-project-list-amended-2024-11",
    "title": "Plan Bay Area 2050 Transportation Project List (amended)",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "date": "2024-11",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/Amended_Plan_Bay_Area_2050_Transportation_Project_List.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Keeps 21-T11-112 (Link21, 2036-2050, \"$28,800\") and 21-T11-108 (\"Dumbarton Rail\", group rapid transit Redwood City-Newark, \"$3,840\"). One Link21 line reads about $165 million for 2021-2035, but the table was hard to parse."
  },
  {
    "id": "pba2050-san-mateo-factsheet-2022",
    "title": "Plan Bay Area 2050 San Mateo County Factsheet",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "date": "2022-01-28",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/Plan_Bay_Area_2050_Final_San_Mateo_County_Factsheet_012822_0.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Dumbarton group rapid transit would \"restore rail service to the 20-mile Dumbarton rail corridor between Redwood City and the East Bay\"; paraphrase: automated small-vehicle shuttles of up to 50 passengers a car, linking Caltrain with BART and the Capitol Corridor. The date is from the file name (012822)."
  },
  {
    "id": "pba2050plus-project-list-2026-03",
    "title": "Plan Bay Area 2050+ Transportation Project List Report (final)",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "date": "2026-03-06",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/2026-04/Final_Plan_Bay_Area_2050_Plus_Transportation_Project_List_Report.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Also registered as bam-smart-cloverdale-src-7. 25-T11-145, Dumbarton Bridge, Union City to Redwood City, 2025-2035, $606 million: paraphrase, new express bus with 30-minute peak headways and a busway on the Dumbarton rail right of way between Menlo Park and Redwood City, plus \"30 minute peak headways on route DB\". Link21 listed for project development, \"including alternatives and/or studies\"; no capital line seen. Plan total $512 billion, FY25-FY50."
  },
  {
    "id": "pba2050plus-page",
    "title": "Plan Bay Area 2050+",
    "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments",
    "type": "official",
    "url": "https://planbayarea.org/technical-resources/plan-bay-area-2050-plus",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Paraphrase: adopted by ABAG on March 19, 2026 and by MTC on March 25, 2026. A planbayarea.org news listing dated September 21, 2026 says MTC \"today adopted\" the plan, which conflicts."
  },
  {
    "id": "mtc-transit-2050-plus-page",
    "title": "Transit 2050+",
    "publisher": "Metropolitan Transportation Commission",
    "type": "official",
    "url": "https://mtc.ca.gov/planning/long-range-planning/plan-bay-area-2050/transit-2050-plus",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"The project list was adopted by the Commission as part of the Plan Bay Area 2050+ Final Blueprint in January 2025.\""
  },
  {
    "id": "mtc-transit-2050-plus-final-network-2024-12",
    "title": "Transit 2050+: Final Network (Bay Area Partnership Board, item 4a, Attachment A, December 2, 2024)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2024-12-02",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/meetings/attachments/6175/4a_24_1491_2_Att_A_Transit50_Final_Network.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Caltrain Systemwide frequency upgrades to be implemented in Phase 1 (6 trains per hour per direction in peak) and Phase 2 (8 trains per hour per direction in peak).\""
  },
  {
    "id": "mtc-transit-2050-plus-draft-report",
    "title": "Draft Transit 2050+: A New Vision for the Bay Area's Transit Network",
    "publisher": "Metropolitan Transportation Commission",
    "type": "official",
    "url": "https://planbayarea.org/sites/default/files/documents/Draft_Transit_2050_Plus_Report.pdf?cb=ae538e70",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Undated draft. \"Transit 2050+ envisions a nearly $340 billion investment in the Bay Area's transit network over the next 25 years.\" \"Frequencies of 15 minutes or better for routes between urban centers\". \"By 2050, these investments would increase regionwide transit service levels by approximately 60%. Transit ridership could increase by 41%\"."
  },
  {
    "id": "samtrans-reimagine-dumbarton",
    "title": "Reimagine Dumbarton",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "type": "official",
    "url": "https://www.samtrans.com/projects/reimagine-dumbarton",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Feasibility study \"fall 2025 to spring 2027\"; \"a continuous four-mile-long paved walking and bicycling trail parallel to a dedicated busway\"; nine stations \"Fair Oaks Health Center/Middlefield Road, Fifth Avenue, Ninth Avenue, Bay Road/Marsh Road, Bohannon Drive, Belle Haven Community Campus, Chilco Street, Willow Road, and University Avenue\"; \"approximately 13 minutes in both directions\"; \"Phase II of community engagement is taking place September 9 - October 30\"; \"pending funding availability, construction would start after 2031\"; \"This Project will not preclude the opportunity to convert the corridor to passenger rail in the future\". Older URL: https://www.samtrans.com/Planning/Planning_and_Research/Dumbarton_Rail_Corridor.html"
  },
  {
    "id": "samtrans-dumbarton-busway-contract-2025",
    "title": "Awarding a Contract for the Dumbarton Busway Feasibility Study Services",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2025",
    "type": "official",
    "url": "https://www.samtrans.com/media/35169/download",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Market viability assessment in 2023 found: Significant costs associated; limited funding available. Insufficient ridership projections to justify cost - estimated at $3.6B in 2024 dollars\"; rail lines \"to remain intact for potential future use\". Paraphrase: an 18-month busway feasibility study; a busway costs less, is quicker and doesn't preclude rail. A related SamTrans Citizens Advisory Committee deck (April 30, 2025) is https://www.samtrans.com/media/35337/download."
  },
  {
    "id": "samtrans-dtcs-final-report-2017",
    "title": "Dumbarton Transportation Corridor Study, Final Report",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2017-11-20",
    "type": "official",
    "url": "https://www.samtrans.com/files/samtrans/Assets/Dumbarton+Rail+Corridor/PDFs/171120+DTCS+-+Full+Report.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Recommends \"moving forward with Alternative 10 using a phased approach\"; \"the bus alternatives performed the best in terms of cost-effectiveness\"; \"the rail alternatives, while most costly, have the greatest potential for private investment and long-term ridership gains\"; the rail bridge \"also represents a safety hazard in its current condition and could require substantial funding to remove if not repaired\". The date is from the file name (171120)."
  },
  {
    "id": "samtrans-dtcs-news-2017",
    "title": "SamTrans Looks to Improve Travel in the Dumbarton Corridor",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "type": "official",
    "url": "https://www.samtrans.com/news/samtrans-looks-improve-travel-dumbarton-corridor",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated (about the 2017 study). Near-term bus work about $51 million, \"13,700 more transbay riders daily, a 34 percent increase\"; rail Redwood City-Newark about $975 million, about $295 million more to Union City, \"approximately $327 million\" for interlining with Caltrain by 2035; 15,600 transbay riders daily."
  },
  {
    "id": "samtrans-dumbarton-update-2020-01",
    "title": "Dumbarton Rail Corridor Project Update (Board of Directors presentation)",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2020-01-08",
    "type": "official",
    "url": "https://www.samtrans.com/files/samtrans/Assets/__Agendas+and+Minutes/SamTrans/Board+of+Directors/Presentations/Dumbarton+Rail+Corridor+Project+Update.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: Cross Bay Transit Partners (Facebook and Plenary) and the District executed an Exclusive Negotiating Agreement on August 14, 2018, covering investigation, feasibility and environmental review (CEQA/NEPA) only. \"Fall 2019 Collaboration as required Pre-scoping\"; an administrative draft EIR/EIS expected in winter 2020."
  },
  {
    "id": "samtrans-dumbarton-fact-sheet-2020",
    "title": "Dumbarton Rail Corridor Project: Estimated Ridership, Housing and Employment",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2020-01",
    "type": "official",
    "url": "https://www.samtrans.com/media/5006/download?inline=",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Dated January 2020 by the search result. \"Between Redwood City and Newark, the Project would primarily utilize an existing railroad right-of-way owned by the District.\" Construction \"$3 Billion\", subject to change; operation by 2028; \"Projected Increases by 2040 24,000 trips/day 7.3 million annual trips\". Paraphrase: Caltrain Sequoia/Redwood City station to Union City BART."
  },
  {
    "id": "samtrans-dumbarton-virtual-meeting-2021",
    "title": "SamTrans to Hold Virtual Public Meeting on Dumbarton Rail Bridge Project",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2021-03",
    "type": "official",
    "url": "https://www.samtrans.com/news/samtrans-hold-virtual-public-meeting-dumbarton-rail-bridge-project",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Meeting March 15, 2021: \"the focus is on developing conceptual alternatives to connect Redwood City to Union City\"; \"the San Mateo County Transit District and Cross BayTransit Partners, LLC (CBTP) are working together under a P3 arrangement\"."
  },
  {
    "id": "samtrans-legislative-program-2023",
    "title": "San Mateo County Transit District 2023 Legislative Program",
    "publisher": "San Mateo County Transit District (SamTrans)",
    "date": "2023",
    "type": "official",
    "url": "https://www.samtrans.com/media/27023/download",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. The 2018 agreement with Cross Bay Transit Partners \"also ended in late Spring 2021\"; \"While Facebook has since ended its involvement in the project, the Agency is continuing to seek new opportunities.\""
  },
  {
    "id": "mtc-rm3-ballot-description-2018",
    "title": "Regional Measure 3: Bay Area Traffic Relief Plan (ballot description, corrected)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2018-04",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/RM_3_Ballot_Description_041218_Corrected.pdf?cb=2a6007b7",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Dumbarton Corridor Improvements ($130 million): \"Eligible projects include, but are not limited to, projects recommended in the 2016 Dumbarton Corridor Transportation Study led by SamTrans\"; paraphrase, a rail connection at Shinn Station is also named. The date is from the file name (041218)."
  },
  {
    "id": "mtc-rm3-dumbarton-programming-2024-06",
    "title": "RM3 Capital Programming for Dumbarton Corridor Improvements (presentation)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2024-06",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/meetings/attachments/6030/8c_Presentation_Dumbarton_programmingR1_v2.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Initial programming of the $130 million in RM3 Project #17, Dumbarton Corridor Improvements. $72 million programmed to projects in Alameda County, $32.5 million programmed to projects in San Mateo County, $5 million programmed to Bay Area Toll Authority projects, and $20.5 million in a reserve for future programming.\" Paraphrase: San Mateo Dumbarton busway $5 million (business case, pre-environmental), about $150 million total, construction targeted 2029."
  },
  {
    "id": "mtc-news-dumbarton-bridge-toll",
    "title": "Bridge Toll Dollars Drive Dumbarton Corridor Improvements",
    "publisher": "Metropolitan Transportation Commission",
    "type": "official",
    "url": "https://mtc.ca.gov/news/bridge-toll-dollars-drive-dumbarton-corridor-improvements",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated; the search metadata put it in about late June 2024. \"a dedicated busway from the west end of the Dumbarton Bridge to the Redwood City Caltrain station\", estimated at $150 million, on track to break ground in 2029 (paraphrase)."
  },
  {
    "id": "mtc-rm3-project17-update-2026-04",
    "title": "RM3 Project 17 Dumbarton Corridor Updates (Programming and Allocations Committee item 2b, Attachment C, April 8, 2026)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-04-08",
    "type": "official",
    "url": "https://mtc.ca.gov/sites/default/files/meetings/attachments/6572/2b_26_0343_4_Attachment_C_RM3_Project17_Dumbarton_Corridor_Updates.pdf?cb=0ad9099d",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Busway (17.1): \"planning and environmental work to advance dedicated busway improvements\"; $5.0 million programmed, $4.1 million allocated; consultant procured; peer interviews and a Monterey-Salinas Transit BRT site visit done (paraphrase)."
  },
  {
    "id": "mtc-soco-rail-study",
    "title": "Southern Alameda County Integrated Rail Analysis (SoCo Rail) Study",
    "publisher": "Metropolitan Transportation Commission",
    "type": "official",
    "url": "https://mtc.ca.gov/planning/transportation/regional-transportation-studies/southern-alameda-county-integrated-rail-analysis-soco-rail-study",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"A new passenger rail service along the Dumbarton corridor is infeasible in the mid-term due to constraints at Redwood City and capacity along the peninsula.\" \"Phase 1 of the SoCo Rail Study identified the Union City Intermodal Station as the recommended location for the East Bay rail hub.\" Phase 1 report November 2021; Phase 2 report July 20, 2023."
  },
  {
    "id": "csrp-2018-chapter-4",
    "title": "California State Rail Plan (2018), Chapter 4: Proposed Passenger Improvements and Investments",
    "publisher": "California Department of Transportation",
    "date": "2018",
    "type": "official",
    "url": "https://dot.ca.gov/-/media/dot-media/programs/rail-mass-transportation/documents/rail-plan/4-chapter-4csrpfinal.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"Exhibit 4.1: Sketch of 'Pulsed' Services\"; \"Exhibit 4.6: Northern California Service (2027 Vision)\"; \"initial integrated express bus services connecting the Peninsula and East Bay across the Dumbarton Bridge\"; a Dumbarton crossing location \"chosen consistent with results of the 2022\" study (cut off). Paraphrase: half-hourly peak and hourly off-peak bus or rail service in the Dumbarton corridor."
  },
  {
    "id": "csrp-2024",
    "title": "2024 California State Rail Plan",
    "publisher": "California Department of Transportation",
    "date": "2024-12",
    "type": "official",
    "url": "https://dot.ca.gov/-/media/dot-media/programs/rail-mass-transportation/documents/california-state-rail-plan/2024-ca-state-rail-plan-a11y.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. The Salesforce Transit Center's high-speed rail vault and a second crossing: \"allowing maximum regional, high-speed, and intercity rail throughput\"; \"nearly 200 million miles per day\" in 2050; \"$307 billion\" direct capital investment, economic return \"over $537 billion\" by 2050. Paraphrase: about 1,500 miles electrified by 2050; Sacramento-Oakland and San Jose-Oakland service evaluated with and without a new Transbay crossing."
  },
  {
    "id": "csrp-2024-fact-sheet",
    "title": "California State Rail Plan 2024 Service Vision Highlights (fact sheet)",
    "publisher": "California Department of Transportation",
    "date": "2024-12-13",
    "type": "official",
    "url": "https://dot.ca.gov/-/media/dot-media/programs/rail-mass-transportation/documents/rail-plan/20241213-final-srp-fact-sheet-v2-a11y.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"A second transbay crossing will allow for through-running trains from Sacramento to San Jose and beyond\"; regional rail \"will connect the north Bay Area to as far as Healdsburg\" (one search read Cloverdale); paraphrase: 'pulsed' all-day schedules supporting timed connections."
  },
  {
    "id": "caltrans-state-rail-plan-page",
    "title": "California State Rail Plan",
    "publisher": "California Department of Transportation",
    "type": "official",
    "url": "https://dot.ca.gov/programs/rail/california-state-rail-plan",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Paraphrase: the plan was released January 7, 2025; the 2025 State Rail Annual Report was released May 6, 2026; the next full update is scheduled for 2028."
  },
  {
    "id": "caltrain-lrsv-2025",
    "title": "The Caltrain Long-Range Service Vision (adopted October 2025)",
    "publisher": "Peninsula Corridor Joint Powers Board (Caltrain)",
    "date": "2025-10",
    "type": "official",
    "url": "https://www.caltrain.com/media/36287",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. \"This updated policy supersedes Caltrain's first Long-Range Service Vision, which the board adopted in October 2019.\" Maximum peak \"8 trains per hour per direction on the JPB-owned corridor between Tamien Station in San Jose and San Francisco, with 4 trains per hour per direction between Blossom Hill and Tamien Stations\"; off-peak \"between 2 and 6 trains per hour per direction north of Blossom Hill\"; partner efforts include \"endeavors related to the Dumbarton Rail Corridor, the Link21 program\"."
  },
  {
    "id": "caltrain-lrsv-staff-report-2025-10",
    "title": "Adopt Proposed Changes to Long-Range Service Vision (staff report)",
    "publisher": "Peninsula Corridor Joint Powers Board (Caltrain)",
    "date": "2025-10",
    "type": "official",
    "url": "https://www.caltrain.com/media/35876/download",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Staff \"recommend confirming the Core Service Vision as JPB's goal for future maximum rail service on the corridor\", \"12 trains per hour per direction in the peak hours, made up of eight Caltrain and four California High Speed Rail Authority trains\"; \"removing language that directs planning for Expanded Growth in service, beyond the Core Service Vision\"; \"removing the 2040 horizon date\". Draft resolution dated October 9, 2025."
  },
  {
    "id": "caltrain-service-vision-2019-news",
    "title": "Caltrain Board Signs Off on Business Plan Service Vision",
    "publisher": "Peninsula Corridor Joint Powers Board (Caltrain)",
    "date": "2019-10",
    "type": "official",
    "url": "https://www.caltrain.com/news/caltrain-board-signs-business-plan-service-vision",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"Service during peak hours would grow to a minimum of eight trains per direction per hour, with all day express service every 15 minutes\"; ridership to \"almost triple to 180,000 daily riders by 2040\"; \"a series of short, 4-track stations that allow express trains to overtake locals\"."
  },
  {
    "id": "caltrain-lrsv-page-2019",
    "title": "Long Range Service Vision (Caltrain 2040)",
    "publisher": "Peninsula Corridor Joint Powers Board (Caltrain)",
    "type": "official",
    "url": "https://www.caltrain.com/projects/business-plan/caltrain-2040/long-range-service-vision",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Undated (the 2019 vision). \"$23 billion\" total capital, about $9.4 billion of it grade separations; about $370 million a year operating cost by 2040 (paraphrase)."
  },
  {
    "id": "caltrain-4-track-analysis-2024-02",
    "title": "JPB Board of Directors meeting of February 1, 2024, supplemental reading file (4-track analysis)",
    "publisher": "Peninsula Corridor Joint Powers Board (Caltrain)",
    "date": "2024-02-01",
    "type": "official",
    "url": "https://www.caltrain.com/media/32739/download",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Paraphrase: planned four-track segments around Millbrae, Hayward Park/Hillsdale and Redwood City, with California Avenue as the north Santa Clara County option."
  }
]
```
