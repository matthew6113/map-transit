# Research: future statuses, October 2026 pass

Oct 16, 2026. This pass re-checked the six future lines against official sources, in place of BAM's
Oct 7-8 translations (`pipeline/transit_pipeline/bam_sync.py`, STATUS). It also lists other Bay Area
rail, light-rail and BRT projects for Matthew to consider. It edits no data. The proposals below are
for `data/future/verified.json` and `data/sources.json`, following the routine in
`docs/checks/future.md`.

## How the pass worked, and its limits

- **No agency page was opened.** From this container, vtabart.org, tjpa.org, hsr.ca.gov, sfcta.org
  and transit.dot.gov time out. The proxy also refuses www.caltrain.com and www.sfmta.com (403 on
  CONNECT).
- **archive.org gave nothing usable.**
  - web.archive.org is refused by the proxy (403 on CONNECT). archive.org's availability API answers,
    but the snapshot URLs it returns are on web.archive.org.
  - A search of archive.org's items found no mirrored board packets for these agencies.
  - SFGTV's recordings of TJPA board meetings are on archive.org (through
    `SFGTV_20261013_050000_Transbay_Joint_Powers_Authority`), but their caption files return 403
    "Item not available".
  - So nothing here is `[pdf]`: every row is `[srch]`.
- **Every fact comes from WebSearch,** with `allowed_domains` limited to the agency's own domains
  (standard mode, and extended mode where results were thin). The tool returns each page's title and
  URL plus a written summary.
  - "Quoted words" below are the strings that summary presented as text from the page. Which URL a
    quote came from is the tool's attribution; where it gave two pages for one quote, both are named.
  - Quote boundaries aren't always marked, so a quote may be lightly trimmed. Paraphrase is marked
    *(paraphrase)*.
  - One phrase that a summary put on SMART's pages, "initial construction activities are currently
    underway", couldn't be found again by a targeted search, so it is left out.
- **Statement dates** are the dates the documents carry. They are not when the search indexed them.
  Undated web pages are marked "undated".
- **The index trails late 2026.** The search found few documents from August to October 2026. For
  example, TJPA's July and August 2026 Portal reports and VTA's July 2026 PMOC report were listed but
  not indexed. A newer statement may exist that this pass didn't see.
- **`docs/checks/future.md` says to re-verify against the agency's own pages.** These are search
  results from those pages, not reads of them. Before committing, Matthew may want to open the key
  documents in a browser; each table names them.
- **If adopted with `last_verified: 2026-10-16`,** each line falls due again on 2027-01-14.

## 1. BART Silicon Valley Phase II (`bart-silicon-valley-phase-2`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Construction | Early works under way at the tunnel launch structure and stations | VTA, "BART Silicon Valley Phase II Achieves 3 Million Safe Work Hours", https://www.vta.org/blog/bart-silicon-valley-phase-ii-achieves-3-million-safe-work-hours | 2026-09-01 | "crews have placed 75,000 cubic yards of concrete"; "crews simultaneously operated 13 cranes, 12 excavators, and eight forklifts and manlifts" (during diaphragm wall construction) | [srch] |
| Construction | Launch structure work continuing | VTA, "VTA BSVII Executive Monthly Progress Report May 1, 2026", https://vtabart.org/wp-content/uploads/2026/07/BSVII_Executive-Monthly-Report_May_2026-070726-v2.pdf | Report for May 1-31, 2026, dated 2026-06-29 (file stamped 07-07-26) | "progress continues across key components of the Tunnel Boring Machine (TBM) Launch Structure" (as of June 26, 2026) | [srch] |
| Construction, October | 24-hour work at West Portal | A VTA October 2026 newsletter (the search gave no URL) | 2026-10 | "In October, work activities at West Portal will occur Monday through Saturday 24 hours a day" | [srch] |
| Federal funding | No FFGA. CIG share capped at 40%. FFGA application and execution proposed for Q4 2027 | Same May 2026 executive report | 2026-06-29 | *(paraphrase)* The milestone table shows FFGA application and execution in Q4 2027, "proposed plan discussed with FTA in April 2026", and the FFGA revenue service date in Q1 2039. Readiness documents moved to Q3 2026. | [srch] |
| Rebaseline | New cost and schedule baseline in draft, to be shared with FTA and the PMOC | Same report | 2026-06-29 | "a re-baselining of the project cost estimate is underway this summer" | [srch] |
| Expected opening | Target Q2 2037. Q1 2039 in the federal funding plan | Same report | 2026-06-29 | "Q1-2039 RSD while managing to the aforementioned target RSD of Q2-2037" (RSD is revenue service date) | [srch] |
| Changes since early Oct | None found on status or schedule. The October 24-hour work at West Portal confirms construction is continuing. | | | | |

- **Proposed:** `status: under_construction`, `status_as_of: 2026-09-01`,
  `expected_opening: "Q1 2039 (VTA's target: Q2 2037)"`.
- **Why:** VTA reports early works under way (excavation, diaphragm walls and the launch structure),
  which counts as construction in the vocabulary, though the federal grant isn't signed.
- **Note:** The 2039 date is the one VTA adopted for its federal application, and 2037 is the
  internal target it manages to. This matches BAM's summary ("scheduled for 2039 (VTA aims for 2037)").
  The rebaseline due this summer may move both.

## 2. The Portal (`the-portal`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Phase | In FTA's Engineering phase; funding gap still open | MTC, "Programming and Allocations Committee Attachment A June 10, 2026" (RM3 semi-annual report), https://www.mtc.ca.gov/sites/default/files/meetings/attachments/6640/2j_26_0605_2_Attachment_A_RM3_Semi_Annual_Report_June_2026_with_appendix.pdf?cb=7d83102d | 2026-06-10 | "TJPA has completed 30% design and was accepted into the engineering phase of the federal Capital Investment program"; a funding gap remains *(paraphrase)* | [srch] |
| Phase | Listed in Engineering | FTA, "Annual Report on Funding Recommendations Fiscal Year 2027", https://www.transit.dot.gov/sites/fta.dot.gov/files/2026-04/FY27-AR-Project-Profiles-Combined-04-07-2026.pdf | 2026-04-07 | *(paraphrase)* Transbay Program Downtown Extension among New Starts projects in Engineering. The April 2026 CIG dashboard gives a projected FFGA timing of "Summer 2027". | [srch] |
| Funding | About $2.2 billion to find beyond the $3.38 billion federal grant, and about $1.05 billion of it from the state | SFCTA, "TJPA Portal Project" (CAC item 9 memo), https://www.sfcta.org/sites/default/files/2026-01/SFCTA_CAC_Item9_TJPAPortalProjectFiscalYear2026MEMO_2026-01-28.pdf | 2026-01-23 | "allocation of $12.5 million in Prop L funds to TJPA for continued advancement of The Portal project within the FTA Engineering Phase"; "planned to open for revenue service in 2036, subject to funding availability" | [srch] |
| State funding asked | A $750 million TIRCP Cycle 8 application, endorsed by MTC; award pending | MTC, "Programming and Allocations Committee Item 4a-26-0346 May 13, 2026" (Cycle 8 TIRCP endorsements), https://www.mtc.ca.gov/sites/default/files/meetings/attachments/6589/4a_26_0346_2_Attachment_A_Cycle8_TIRCP_Endorsements.pdf?cb=416d53bc | 2026-05-13 | *(paraphrase)* Staff proposed endorsing the full $750 million request, above the framework's $500 million. | [srch] |
| FFGA | Target July 2027 | TJPA, "The Portal Update, Citizens Advisory Committee, March 10, 2026", https://tjpa.org/media/40319/download?inline= | 2026-03-10 | "target Full Funding Grant Agreement July 2027" | [srch] |
| Expected opening | May 2036, funding dependent | Same TJPA deck | 2026-03-10 | "Target start of revenue service: May 2036. Subject to change depending on funding availability." | [srch] |
| Expected opening, detail | May 2, 2036 | TJPA, "Monthly Status Report February 2026", https://tjpa.org/media/40324/download?inline= (another search titled this file "Monthly Status Report - December 2025") | Feb 2026 (schedule data date Jan 31, 2026) | "target RSD of May 2, 2036, representing a 16-working-day delay compared to January schedule update" | [srch] |
| Conflicting page | TJPA's project page still says 2035 | TJPA, "The Portal", https://www.tjpa.org/portaldtx | undated | "anticipated revenue service date of 2035, funding dependent" | [srch] |
| Changes since early Oct | None found. The TIRCP Cycle 8 award, which CalSTA expects in October 2026, is still pending (see "Pending this month" below). | | | | |

- **Proposed:** `status: environmental`, `status_as_of: 2026-06-10`, `expected_opening: "May 2036"`.
- **Why:** It is environmentally cleared and in FTA's Engineering phase, but its construction funding
  isn't committed (no FFGA, state and local gap open) and construction hasn't started, so it is
  "cleared but without construction funding".
- **Note:** TJPA's own project page still says 2035. Consider `conflicting_sources`, or cite only the
  dated 2026 schedule documents. The newest TJPA schedule this pass could see is March 2026;
  the July and August 2026 status reports (on the September 10 board agenda) weren't indexed.

## 3. CAHSR San Francisco to San Jose (`cahsr-sf-sj`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Environmental | Cleared: San Francisco-San José Final EIR/EIS certified August 2022 | CHSRA, "Northern California", https://hsr.ca.gov/project-overview/project-sections/northern-california/ | undated | the alignment is "fully approved and eligible for advanced design" | [srch] |
| Plan | Final 2026 Business Plan adopted; Bay Area service only in later scenarios | CHSRA, "2026 Business Plan" (final), https://hsr.ca.gov/wp-content/uploads/2026/06/2026-Final-Business-Plan-060126-A11Y.pdf; adopted by Resolution HSR #26-04 (Board meeting schedule page, https://hsr.ca.gov/about/board-of-directors/schedule/) | 2026-06-01 | "San Francisco – Bakersfield extends north to Gilroy and enables through service to San Jose and San Francisco via electrification, signaling, capacity, and station upgrades" | [srch] |
| Terminus | Fourth and King first | Same plan | 2026-06-01 | "San Francisco will serve as the interim northern terminus at the existing 4th and King Street station" *(lightly paraphrased in the result)* | [srch] |
| Funding | No construction funding for the Bay Area. San José-Gilroy needs a state solution | Same plan | 2026-06-01 | "A coordinated state solution, in partnership with regional agencies, will also be required to access and improve the Union Pacific rail line between San Jose and Gilroy" | [srch] |
| Expected opening (scenario) | San Francisco-Bakersfield "by 2039" | Same plan | 2026-06-01 | SF-B needs "$61.2 billion in capital investments to deliver SF-B by 2039" (one result gave $60.34 billion, the draft's figure; the year is the same in both) | [srch] |
| Other scenarios | San Francisco-Palmdale and Phase 1: completion 2039, full service 2040 | Same plan | 2026-06-01 | "The SF-P scenario is projected to cost $96.9 billion, with completion in 2039 and full service beginning in 2040." | [srch] |
| Oversight | Schedule risk | CHSRA Office of the Inspector General, "Review of the 2026 Business Plan" (letter of July 31, 2026), https://hsr.ca.gov/wp-content/uploads/2026/07/OIG-HSR-Review-of-2026-Business-Plan-A11Y.pdf | 2026-07-31 | "The business plan's scheduled completion date assumes that these third parties will quickly agree to design changes. If they do not, the schedule could be further delayed." | [srch] |
| **Changed in October** | A new environmental review of Gilroy to the Central Valley Wye, the link that would bring trains to the Bay Area (not SF-SJ itself) | CHSRA, "Gilroy to Central Valley Wye Project Signed Notice of Preparation", https://hsr.ca.gov/wp-content/uploads/2026/10/G-Y-Official-NOP-Signed-A11Y.pdf; "Gilroy to Central Valley Project", https://hsr.ca.gov/program-areas/environmental-planning/environmental-documents/special-project-environmental-documents/gilroy-to-central-valley-project/; CEQAnet SCH 2009022083, https://ceqanet.lci.ca.gov/2009022083/8 | NOP 2026-10-13 (CEQAnet) / 2026-10-14 (CHSRA page); scoping ends 2026-11-13 | "With recent diminished reliability of federal funding and increased costs of delivering infrastructure, the Authority is considering alternative ways to deliver the G-Y Project Segment, including several new possible alignments"; a decision on the new alignments "by the end of 2027" | [srch] |

- **Proposed:** `status: environmental`, `status_as_of: 2026-06-01`,
  `expected_opening: null` (keep `expected_opening_unsourced`).
- **Why:** The section has been cleared since 2022, but nothing is funded or built in the Bay Area.
  The adopted plan reaches San Francisco only in later scenarios, which still need a state solution
  for San José-Gilroy.
- **Matthew's call:** The plan names no opening for high-speed service between San Francisco and San
  José. The closest stated year is the San Francisco-Bakersfield scenario, "deliver SF-B by 2039". If
  he wants a date shown, `"by 2039 (San Francisco–Bakersfield scenario)"` is the agency's wording;
  "deliver" may mean the end of construction, not the first service.
- **October change:** The Gilroy-Wye NOP doesn't change SF-SJ's status, but it reopens the route that
  would bring trains to San José. It's worth a line in the panel.

## 4. Valley Link (`valley-link`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Environmental | Subsequent EIR approved October 2024; FTA's NEPA approval May 2025; an update for phased delivery and a NEPA re-evaluation under way | Valley Link, project delivery list ("MP 12/18 Copy of VALLEY LINK PROJECT"), https://www.valleylinkrail.com/copy-of-valley-link-project; MTC, RM3 semi-annual report (December 10, 2025), https://mtc.ca.gov/sites/default/files/documents/2026-02/3a_25-1486_2_Attachment_A_RM3_SemiannualReportJune2025WithAppendix.pdf?cb=0889e7a8 | undated page; 2025-12-10 | "an update to the environmental documentation to accommodate the phased delivery strategy is underway" (MTC) | [srch] |
| Phase | Not yet in CIG Engineering; value engineering being finished | MTC, RM3 semi-annual report, June 10, 2026 (URL in section 2) | 2026-06-10 | "preparing to enter the engineering phase of the federal CIG program" | [srch] |
| Design | Final design procurement (GEC, CM/GC) | Valley Link, "Doing business" (RFP 2026-01), https://www.valleylinkrail.com/doing-business | undated (2026 RFP) | "As the Phase 1A Project moves into Final Design under the Construction Manager/General Contractor delivery model" | [srch] |
| Funding | $4 million RM3 allocation on MTC's August agenda; construction unfunded | MTC, Commission agenda August 26, 2026 (item 8b), https://www.mtc.ca.gov/sites/default/files/meetings/agendas/6681_A_Metropolitan_Transportation_Commission_26_08_26_MTC_SAFE_1.pdf | 2026-08-26 | "allocation of $4 million to Tri-Valley - San Joaquin Valley Regional Rail Authority for the Valley Link Project" (the vote wasn't seen) | [srch] |
| Expected opening | Phase 1A in 2032 | Valley Link, "Valley Link Project", https://www.valleylinkrail.com/valleylink-project | undated | "Phase 1A is targeted for completion in 2032 with Phase 1B's schedule remaining contingent on future funding" | [srch] |
| Changes since early Oct | None found | | | | |

- **Proposed:** `status: environmental`, `status_as_of: 2026-06-10`,
  `expected_opening: "2032 (Phase 1A, Dublin/Pleasanton to Vasco Road)"`.
- **Why:** It is cleared under CEQA and NEPA (with an update for the phasing under way) and in design,
  but it isn't in CIG Engineering and has no construction funding.
- **Notes:**
  - "Completion" is the agency's word, not "opening".
  - The statement is on an undated project page.
  - BAM's geometry covers the whole first 11 miles; Phase 1A ends at Vasco Road.

## 5. SMART Healdsburg extension (`smart-healdsburg`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Schedule | Design to Dec 2026, construction from Jan 2027 | SMART, "Healdsburg extension", https://www.sonomamarintrain.org/healdsburgextension (one result put the same list on "Healdsburg station", https://www.sonomamarintrain.org/healdsburg) | undated (updated after April 2026) | "Design: September 2025 - December 2026; Construction: January 2027 - November 2028; Testing: November - December 2028; Service Begins: December 2028." | [srch] |
| Field work | Potholing since April 2026, as a design input | Same page | undated | "Potholing work began in April 2026 and is expected to continue for several month[s]"; "This process informs the design team of underground utilities and helps avoid costly delays to the project." | [srch] |
| Contract | Progressive design-build, Phase One $21.7 million (Sept 2025); the release's "January 2026" start is superseded | SMART, "Media Release: SMART Board awards construction contract to build the Healdsburg rail extension", https://www.sonomamarintrain.org/node/625 | 2025-09 | "Construction is scheduled to begin in January 2026 and is anticipated to be complete by late 2028." | [srch] |
| Funding | $269 million secured | Same project page | undated | "$269 million in federal, state, regional and local transportation grant funds" | [srch] |
| Board, September | Phase I work ongoing; utility and roadway design agreements; station site reopened for engagement | SMART, Board of Directors regular meeting agenda package, September 16, 2026, https://www.sonomamarintrain.org/sites/default/files/Documents/09.16.2026%20Complete%20Agenda%20Package_0.pdf; SMART, "Healdsburg Station Location Consideration Outreach" memo, https://www.sonomamarintrain.org/sites/default/files/Documents/SMART%20Healdsburg%20Station%20Location%20Consideration%20Outreach_COC%2009.23.26.pdf | 2026-09-16; 2026-09-23 | "On September 16, 2026, the SMART Board of Directors directed staff to initiate a public engagement process around the location of the SMART Healdsburg Station … expected to run through November 2026." | [srch] |
| Ceremony | A groundbreaking celebration was scheduled for May 8, 2026 | City of Healdsburg, "Calendar • Healdsburg Station Groundbreaking Celebration", https://www.healdsburg.gov/Calendar.aspx?EID=3285 | 2026 | "Join SMART on Friday, May 8 at 1:00 p.m., at the Foley Family Community Pavilion in Healdsburg to celebrate this exciting milestone." | [srch] |
| Expected opening | December 2028 | SMART project page (above) | undated | "Service Begins: December 2028" | [srch] |
| Pending | The CTC meets Oct 15-16, 2026. BAM's record cites an item from it (`catc.ca.gov/.../2026-10/99-2-6s8-a11y.pdf`); this pass couldn't see what it is. | CTC, https://catc.ca.gov/ | 2026-10-15 | "October 15(Th)-16(F), 2026 - CTC Meeting Information." | [srch] |

- **Proposed:** `status: funded`, `status_as_of: 2026-09-16`, `expected_opening: "December 2028"`.
- **Why:** It is funded ($269 million), its CEQA addendum was adopted in December 2025 (Resolution
  2025-33, cited in BAM's record) and its contract is in the design phase. SMART's own schedule
  starts construction in January 2027, and SMART describes the potholing as informing the design.
- **Borderline:** SMART and the city held, or at least scheduled, a groundbreaking on May 8, 2026,
  and one SMART page reportedly says "active construction will begin in Spring 2027" (wording not
  confirmed). If Matthew counts the potholing or the ceremony as early works, it becomes
  `under_construction`. On the stated schedule, re-check in January 2027.
- **Station site:** It is open again until about November 2026 (Depot/Hudson Street or downtown). That
  may move the station point.

## 6. SMART Cloverdale extension (`smart-cloverdale`)

| Field | Value | Official source (title, URL) | Statement date | Quoted words | How seen |
|---|---|---|---|---|---|
| Geyserville station | Public engagement directed June 2026; site near Highway 128 and Remmel Road | SMART, "Geyserville", https://www.sonomamarintrain.org/geyserville | undated (after June 2026) | "SMART Board of Directors directed staff in June 2026 to begin public engagement on a potential station in Geyserville. SMART is evaluating a location near Highway 128 and Remmel Road." | [srch] |
| Environmental, Geyserville | Statutory exemption filed | CEQAnet, "Geyserville Station" (Notice of Exemption, SCH 2026080751), https://ceqanet.lci.ca.gov/2026080751 | 2026-08-20 | *(paraphrase)* exempt under Public Resources Code 21080.25(b)(6)(A), a public passenger rail project including a station, under $50 million, within SMART's right-of-way | [srch] |
| Board | Geyserville adopted into SMART's program | SMART, Board agenda package, September 16, 2026 (URL in section 5) | 2026-09-16 (package; the vote may be the August 19 meeting's, in its minutes) | "Resolution 2026-26 adopts the Geyserville Station Project into SMART's program"; carried 11-0-1-0 | [srch] |
| Phasing | Split into two roughly nine-mile projects to compete for grants | SMART, "Geyserville" (above) | undated | "By segmenting the final northern extension into two approximately nine-mile projects instead of one 18-mile project, SMART can pursue grant opportunities that are often more competitive for smaller, phased capital projects." | [srch] |
| Funding | No construction funding. A TIRCP Cycle 8 application for some components (pedestrian bridges, two zero-emission buses, Geyserville) | MTC, Cycle 8 TIRCP endorsements, May 13, 2026 (URL in section 2; the same file is also on planbayarea.org) | 2026-05-13 | "proposed SMART Geyserville Station is not in Plan Bay Area 2050+; recommended MTC endorsement for other components only" | [srch] |
| Funding | Still a goal in the budget | SMART, "Draft Proposed Fiscal Year 2026/2027 Budget", https://sonomamarintrain.org/sites/default/files/Documents/Draft_FY27_Budget.pdf | 2026 (draft) | "Pursue funding for extension north to Cloverdale" | [srch] |
| Expected opening | None stated | | | | |
| Changes since early Oct | None found. The TIRCP Cycle 8 award is pending. | | | | |

- **Proposed:** `status: environmental`, `status_as_of: 2026-09-16`, `expected_opening: null`.
- **Why:** The line is cleared under the original system EIR (SCH 2002112033, in BAM's record), and
  the Geyserville station is exempt (August 2026). But SMART is still seeking construction funding,
  so it is "cleared but without construction funding".

## Proposed values for the six

| Line | Status | Status as of | Expected opening | Change from BAM's Oct 7-8 |
|---|---|---|---|---|
| `bart-silicon-valley-phase-2` | under_construction | 2026-09-01 | "Q1 2039 (VTA's target: Q2 2037)" | Opening now sourced |
| `the-portal` | environmental | 2026-06-10 | "May 2036" | Opening now sourced (the project page's 2035 conflicts) |
| `cahsr-sf-sj` | environmental | 2026-06-01 | null (option: "by 2039 (San Francisco–Bakersfield scenario)") | None; the Oct 13-14 Gilroy-Wye NOP is adjacent |
| `valley-link` | environmental | 2026-06-10 | "2032 (Phase 1A, Dublin/Pleasanton to Vasco Road)" | Opening now sourced |
| `smart-healdsburg` | funded | 2026-09-16 | "December 2028" | Opening now sourced; borderline with under_construction |
| `smart-cloverdale` | environmental | 2026-09-16 | null | None |

No status changes from BAM's translation. Every line can drop `status_unverified` once Matthew
accepts these; four can drop `expected_opening_unsourced`.

### Pending this month

These could change several lines soon after this pass:

- **TIRCP Cycle 8 awards.** CalSTA's page expects the announcement in October 2026; the guidelines
  named September 18, 2026. None had been announced in what the search could see. Bay Area requests
  include The Portal ($750 million) and parts of SMART Cloverdale.
  - CalSTA, "Transit and Intercity Rail Capital Program",
    https://calsta.ca.gov/subject-areas/transit-intercity-rail-capital-prog
  - California Grants Portal, "Transit and Intercity Rail Capital Program Cycle 8 2026",
    https://www.grants.ca.gov/grants/transit-and-intercity-rail-capital-program-cycle-8-2026/
- **CTC meeting, October 15-16, 2026:** its SMART Healdsburg item is unknown (section 5).

## Second list: other Bay Area projects in construction, funded or in environmental review

Each entry is for Matthew to decide on; none is ranked or recommended. All are `[srch]`.

| Project | Mode, county | Status (vocabulary) | Official source (title, URL) | Statement date | Quoted words |
|---|---|---|---|---|---|
| VTA Eastridge to BART Regional Connector (Capitol Expressway light rail, Alum Rock to Eastridge, 2.4 miles elevated) | Light rail, Santa Clara | under_construction | VTA, "Eastridge to BART Regional Connector - EBRC", https://www.vta.org/projects/eastridge-bart-regional-connector; VTA, 2026 EBRC summer newsletter, https://www.vta.org/sites/default/files/2026-07/2026EBRC_Summer_Newsletter_ADA_Final.pdf | undated page; newsletter 2026-07 | "The Eastridge to BART Regional Connector Project is anticipated to be fully completed in early 2028."; "As of May 31, 2026, the project is 67% complete." |
| Capitol Corridor South Bay Connect (Oakland-Newark via the Coast Subdivision, new Ardenwood station) | Intercity rail, Alameda | environmental (CEQA cleared, NEPA pending, construction funding gap) | CEQAnet, "South Bay Connect" (NOD), https://ceqanet.lci.ca.gov/2020060655/6; CCJPA, "FY 2026-27 [and FY 2027-28] Final Annual Business Plan", https://www.capitolcorridor.org/wp-content/uploads/2026/06/CCJPA-FY27-FY28-Final-Annual-Business-Plan.pdf; CCJPA board slide deck, June 17, 2026, https://www.capitolcorridor.org/wp-content/uploads/2026/06/June-17-2026-CCJPA-Board-Meeting_Slide-Deck-Presentation_Final1.pdf | NOD 2024-11-22; plan and board 2026-06-17 | Project approved "11/20/2024"; "a known funding gap persists due to prior inflation"; CCJPA is working with UPRR "to implement a reduced project scope that reduces costs while maintaining minimum project viability"; the board authorized agreements with CHSRA "for NEPA lead agency services". The schedules conflict (Feb 2026 deck: construction April 2030; June 2026 plan: December 2034), and both give "Project cost: $440M - $840M". |
| BART Irvington station (infill, Warm Springs line, Fremont) | Rapid transit station, Alameda | environmental (CEQA addendum 2019; NEPA still needed; $122M of $282M secured) | BART, letter to Senator Wahab on Irvington station, https://www.bart.gov/sites/default/files/2026-01/Senator%20Wahab%20-%20BART%20Irvington%20Station%201.28.26.pdf; City of Fremont, "Irvington BART Station Project", https://www.fremont.gov/government/departments/public-works/public-works-projects/irvington-bart-station-project | 2026-01-28; Fremont page undated | *(paraphrase)* federal grants need NEPA clearance; design under 80%; 14 of 17 properties acquired. Fremont: construction "could begin as early as mid-2026 and the station could open in late 2031, subject to funding availability, and the acquisition of all necessary property". |
| SFMTA Geary Boulevard Improvement Project (Stanyan to 34th Ave: bus bulbs, transit and safety work, after SFPUC's utility work) | Bus priority, San Francisco; whether it counts as BRT is Matthew's call | under_construction | SFMTA, "Geary Boulevard Improvement Project", https://www.sfmta.com/projects/geary-boulevard-improvement-project; SFMTA, "Information for contractors", https://www.sfmta.com/notices/information-contractors-0 | undated; contract advertised 2026-04-27 | *(paraphrase)* stage: construction, $48 million, predicted completion early 2028; surface contract "advertised for bids on 4/27/2026 with bids currently due by 5/27/2026". |
| Alameda CTC San Pablo Avenue Bus Lanes and Bike Lanes (16th St, Oakland, to Heinz Ave, Berkeley, 3.5 miles) | Bus-only lanes, Alameda; whether it counts as BRT is Matthew's call | environmental (preliminary engineering; environmental document expected late 2026) | Alameda CTC, "San Pablo Avenue Corridor Projects", https://www.alamedactc.org/programs-projects/multimodal-arterial-roads/sanpabloave; Alameda CTC, "Executive Director's Report", December 2025, https://www.alamedactc.org/wp-content/uploads/2025/12/RPT_ED-Report_December2025_FINAL.pdf | undated; 2025-12 | Construction "anticipated to take around 18 months and begin in 2026, pending the project securing all funding and approvals needed"; $200-250 million *(the December 2025 report's "late 2026" for the environmental document is paraphrase)* |
| CAHSR Gilroy to Central Valley Wye (new alignments south of Gilroy, partly in Santa Clara County) | High-speed rail, Santa Clara (and beyond the region) | environmental (SEIR began with the Oct 13-14, 2026 NOP) | See section 3 | 2026-10-14 | see section 3 |
| CAHSR San José to Gilroy (upgrades of the existing corridor) | High-speed rail, Santa Clara | environmental (cleared 2022; no funding) | CHSRA, 2026 Business Plan (section 3) | 2026-06-01 | "A coordinated state solution, in partnership with regional agencies, will also be required to access and improve the Union Pacific rail line between San Jose and Gilroy"; Gilroy-San José estimated at "approximately $2 to $5 billion" *(as the result put it)* |

**Checked, but at an earlier stage (planned) or not clearly qualifying:**

- **Link21 (new Transbay rail crossing):** in its Project Identification phase, before environmental
  review. Capitol Corridor runs it day to day from July 1, 2025.
  - Link21, "Planning Activities", https://link21program.org/en/program/planning-activities: "Since
    mid-2022, we have been in the Project Identification phase, which will take us from concept
    development to a proposed project for Environmental Review."
- **Reimagine Dumbarton (SamTrans):** now a busway and trail, not rail. A feasibility study runs from
  fall 2025 to spring 2027, with design proposals released in September 2026 and a survey through
  October 30, 2026.
  - SamTrans, "Reimagine Dumbarton",
    https://www.samtrans.com/Planning/Planning_and_Research/Dumbarton_Rail_Corridor.html.
  - MTC's April 2026 RM3 update says "planning and environmental work to advance dedicated busway
    improvements" had begun:
    https://mtc.ca.gov/sites/default/files/meetings/attachments/6572/2b_26_0343_4_Attachment_C_RM3_Project17_Dumbarton_Corridor_Updates.pdf?cb=0ad9099d.
  - Pending funding, "construction would start after 2031".
- **San José Diridon-Airport Connector (Glydways):** Phase 2a pre-development. The council item was
  statutorily exempt from CEQA as a feasibility study (§15262), and environmental study comes later.
  - City of San José, "Diridon to Airport Connector Project Moves to Next Phase",
    https://www.sanjoseca.gov/Home/Components/News/News/6549/4765 (about March 2025; no 2026 update
    found).
- **Pennsylvania Avenue Extension (Caltrain tunnel south of The Portal):** in planning. SFCTA says
  "PAX is in the planning stage and is not yet environmentally cleared", and a bridging-study
  procurement began in October 2025.
  - SFCTA, 2025 annual report (Motion 26-01),
    https://www.sfcta.org/sites/default/files/2026-02/M26-01%202025%20Annual%20Report.pdf.
- **Hercules Hub (Capitol Corridor candidate station):** design funding is still being sought. A
  February 2026 FRA application asked for $21.7 million for project development and final design.
  CCJPA doesn't commit service.
  - City of Hercules, "The Hercules Hub Project",
    https://www.herculesca.gov/government/engineering-public-works/construction-projects/the-hercules-hub-project-7
  - CCJPA FY27-28 business plan (above).
- **ACE:** no Bay Area construction or environmental project from 2026 was found. The Altamont
  Corridor Vision is a long-range plan ($9.7 billion, with an Altamont tunnel); see
  https://acerail.com/altamont-corridor-vision/. The SJRRC's Newark/Albrae siding is on MTC's May 2026
  TIRCP endorsement list, but it is track capacity, not a line.
- **Not searched separately:** Muni rail extensions (none known past planning), AC Transit's other
  corridors, and VTA's BRT corridors.

## As applied: reconciled with BAM's records

BAM's records of Oct 7-8 (`data/raw/bam/9600699ae10a/projects.json`, its `stageNote`, `nextMilestone`
and `verify` fields) were read from the agencies' documents themselves, and for two lines they carry
schedules newer than this pass could see. `data/future/verified.json` therefore differs from the
proposals above:

- **Status as of** is BAM's verification date (Oct 7, or Oct 8 for SMART) for all six: the last day
  the documents were read. This pass found nothing that changes any status.
- **The Portal:** "November 2036 (TJPA's forecast, September 2026)". BAM read TJPA's September 2026
  status report (ready for service Nov 17, 2036) and lists FTA's oversight consultant's July 2026
  target of July 16, 2036. The March 2026 deck's May 2036 is cited as earlier; `conflicting_sources`
  stays, for those and the project page's 2035.
- **Valley Link:** "Summer 2033 (Phase 1A, Dublin/Pleasanton to Vasco Road)", from the June 2026 MTC
  request's schedule as BAM records it, against the undated project page's 2032; flagged
  `conflicting_sources`.
- BART Silicon Valley Phase II (2039, VTA's target 2037), SMART Healdsburg (December 2028), CAHSR
  (none) and SMART Cloverdale (none) agree with BAM's records.

## Proposed sources.json entries

```json
[
  {
    "id": "vta-bsvii-executive-report-2026-05",
    "title": "VTA BSVII Executive Monthly Progress Report May 1, 2026",
    "publisher": "Santa Clara Valley Transportation Authority",
    "date": "2026-06-29",
    "type": "official",
    "url": "https://vtabart.org/wp-content/uploads/2026/07/BSVII_Executive-Monthly-Report_May_2026-070726-v2.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only (vtabart.org can't be reached from the build container); the PDF wasn't opened. Revenue service: \"Q1-2039 RSD while managing to the aforementioned target RSD of Q2-2037\"; the milestone table proposes FFGA application and execution in Q4 2027. Construction: \"progress continues across key components of the Tunnel Boring Machine (TBM) Launch Structure\" (as of June 26, 2026)."
  },
  {
    "id": "vta-blog-bsvii-3-million-hours-2026",
    "title": "BART Silicon Valley Phase II Achieves 3 Million Safe Work Hours",
    "publisher": "Santa Clara Valley Transportation Authority",
    "date": "2026-09-01",
    "type": "official",
    "url": "https://www.vta.org/blog/bart-silicon-valley-phase-ii-achieves-3-million-safe-work-hours",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"crews have placed 75,000 cubic yards of concrete\" and, during diaphragm wall construction, \"crews simultaneously operated 13 cranes, 12 excavators, and eight forklifts and manlifts\"."
  },
  {
    "id": "tjpa-portal-cac-update-2026-03-10",
    "title": "The Portal Update, Citizens Advisory Committee, March 10, 2026",
    "publisher": "Transbay Joint Powers Authority",
    "date": "2026-03-10",
    "type": "official",
    "url": "https://tjpa.org/media/40319/download?inline=",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the deck wasn't opened. \"Target start of revenue service: May 2036. Subject to change depending on funding availability.\" Target Full Funding Grant Agreement July 2027. TJPA's project page (tjpa.org/portaldtx) still says \"anticipated revenue service date of 2035, funding dependent\"."
  },
  {
    "id": "tjpa-portal-status-report-2026-02",
    "title": "The Portal Monthly Status Report, February 2026",
    "publisher": "Transbay Joint Powers Authority",
    "date": "2026-02",
    "type": "official",
    "url": "https://tjpa.org/media/40324/download?inline=",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the report wasn't opened (one result titled the same file \"Monthly Status Report - December 2025\"). The master schedule with a January 31, 2026 data date reflects a \"target RSD of May 2, 2036, representing a 16-working-day delay compared to January schedule update\"."
  },
  {
    "id": "sfcta-portal-fy2026-memo-2026-01",
    "title": "TJPA Portal Project, fiscal year 2026 (Community Advisory Committee item 9 memorandum)",
    "publisher": "San Francisco County Transportation Authority",
    "date": "2026-01-23",
    "type": "official",
    "url": "https://www.sfcta.org/sites/default/files/2026-01/SFCTA_CAC_Item9_TJPAPortalProjectFiscalYear2026MEMO_2026-01-28.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the memo wasn't opened. Recommends \"allocation of $12.5 million in Prop L funds to TJPA for continued advancement of The Portal project within the FTA Engineering Phase\"; the project \"is planned to open for revenue service in 2036, subject to funding availability\". Remaining need about $2.2 billion beyond the $3.38 billion CIG grant."
  },
  {
    "id": "mtc-rm3-semiannual-2026-06",
    "title": "Regional Measure 3 semi-annual report, June 2026 (Programming and Allocations Committee, Attachment A, June 10, 2026)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-06-10",
    "type": "official",
    "url": "https://www.mtc.ca.gov/sites/default/files/meetings/attachments/6640/2j_26_0605_2_Attachment_A_RM3_Semi_Annual_Report_June_2026_with_appendix.pdf?cb=7d83102d",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the report wasn't opened. The Portal: \"TJPA has completed 30% design and was accepted into the engineering phase of the federal Capital Investment program\", with a funding gap remaining. Valley Link: \"preparing to enter the engineering phase of the federal CIG program\"; phased construction approved June 2025 (Phase 1A Dublin/Pleasanton to Vasco Road, Phase 1B Vasco Road to Mountain House)."
  },
  {
    "id": "mtc-tircp-cycle8-endorsements-2026-05",
    "title": "Cycle 8 TIRCP endorsements (Programming and Allocations Committee item 4a-26-0346, Attachment A, May 13, 2026)",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-05-13",
    "type": "official",
    "url": "https://www.mtc.ca.gov/sites/default/files/meetings/attachments/6589/4a_26_0346_2_Attachment_A_Cycle8_TIRCP_Endorsements.pdf?cb=416d53bc",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the attachment wasn't opened. Staff proposed endorsing TJPA's full $750 million request for The Portal (above the framework's $500 million). SMART Cloverdale Extension: \"proposed SMART Geyserville Station is not in Plan Bay Area 2050+; recommended MTC endorsement for other components only\". Awards were still pending on 2026-10-16."
  },
  {
    "id": "fta-fy27-annual-report-profiles",
    "title": "Annual Report on Funding Recommendations Fiscal Year 2027: project profiles",
    "publisher": "Federal Transit Administration",
    "date": "2026-04-07",
    "type": "official",
    "url": "https://www.transit.dot.gov/sites/fta.dot.gov/files/2026-04/FY27-AR-Project-Profiles-Combined-04-07-2026.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the PDF wasn't opened. Lists the Transbay Program Downtown Extension (The Portal) among New Starts projects in Engineering; FTA's April 2026 CIG dashboard gives its projected FFGA timing as Summer 2027."
  },
  {
    "id": "chsra-2026-business-plan",
    "title": "2026 Business Plan",
    "publisher": "California High-Speed Rail Authority",
    "date": "2026-06-01",
    "type": "official",
    "url": "https://hsr.ca.gov/wp-content/uploads/2026/06/2026-Final-Business-Plan-060126-A11Y.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the plan wasn't opened. Adopted June 1, 2026 (Resolution HSR #26-04). \"San Francisco – Bakersfield extends north to Gilroy and enables through service to San Jose and San Francisco via electrification, signaling, capacity, and station upgrades\"; SF-B needs \"$61.2 billion in capital investments to deliver SF-B by 2039\" (one result gave the draft's $60.34 billion); \"A coordinated state solution, in partnership with regional agencies, will also be required to access and improve the Union Pacific rail line between San Jose and Gilroy\"; San Francisco's interim terminus is the existing 4th and King station. No opening date is given for the San Francisco to San Jose section itself."
  },
  {
    "id": "chsra-northern-california",
    "title": "Northern California",
    "publisher": "California High-Speed Rail Authority",
    "type": "official",
    "url": "https://hsr.ca.gov/project-overview/project-sections/northern-california/",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. The Northern California alignment is \"fully approved and eligible for advanced design\": the Board certified the San Francisco to San José Final EIR/EIS in August 2022 and the San José to Merced one in April 2022."
  },
  {
    "id": "chsra-gilroy-wye-nop-2026-10",
    "title": "Gilroy to Central Valley Wye Project: signed Notice of Preparation",
    "publisher": "California High-Speed Rail Authority",
    "date": "2026-10-14",
    "type": "official",
    "url": "https://hsr.ca.gov/wp-content/uploads/2026/10/G-Y-Official-NOP-Signed-A11Y.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the notice wasn't opened. NOP for a supplemental EIR (SCH 2009022083; CEQAnet gives 10/13/2026, the Authority's page October 14, 2026); scoping ends November 13, 2026. \"With recent diminished reliability of federal funding and increased costs of delivering infrastructure, the Authority is considering alternative ways to deliver the G-Y Project Segment, including several new possible alignments\"; a decision by the end of 2027."
  },
  {
    "id": "valley-link-project-page",
    "title": "Valley Link Project",
    "publisher": "Tri-Valley – San Joaquin Valley Regional Rail Authority",
    "type": "official",
    "url": "https://www.valleylinkrail.com/valleylink-project",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened, and it is undated. \"Phase 1A is targeted for completion in 2032 with Phase 1B's schedule remaining contingent on future funding.\" Phase 1A runs from Dublin/Pleasanton BART to Vasco Road ACE, with three stations and battery-electric trains."
  },
  {
    "id": "valley-link-doing-business-2026",
    "title": "Doing business (RFP 2026-01, general engineering consultant services)",
    "publisher": "Tri-Valley – San Joaquin Valley Regional Rail Authority",
    "date": "2026",
    "type": "official",
    "url": "https://www.valleylinkrail.com/doing-business",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. \"As the Phase 1A Project moves into Final Design under the Construction Manager/General Contractor delivery model, the GEC will guide project development\"."
  },
  {
    "id": "mtc-commission-agenda-2026-08-26",
    "title": "Metropolitan Transportation Commission agenda, August 26, 2026",
    "publisher": "Metropolitan Transportation Commission",
    "date": "2026-08-26",
    "type": "official",
    "url": "https://www.mtc.ca.gov/sites/default/files/meetings/agendas/6681_A_Metropolitan_Transportation_Commission_26_08_26_MTC_SAFE_1.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the agenda wasn't opened. Item 8b, MTC Resolution No. 3914, Revised: \"allocation of $4 million to Tri-Valley - San Joaquin Valley Regional Rail Authority for the Valley Link Project\". The outcome of the vote wasn't seen."
  },
  {
    "id": "smart-healdsburg-extension-page",
    "title": "Healdsburg extension",
    "publisher": "Sonoma-Marin Area Rail Transit District",
    "type": "official",
    "url": "https://www.sonomamarintrain.org/healdsburgextension",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened, and it is undated (updated after April 2026). \"Design: September 2025 - December 2026; Construction: January 2027 - November 2028; Testing: November - December 2028; Service Begins: December 2028.\" \"Potholing work began in April 2026\"; \"This process informs the design team of underground utilities\". SMART has secured \"$269 million in federal, state, regional and local transportation grant funds\"."
  },
  {
    "id": "smart-board-agenda-2026-09-16",
    "title": "Board of Directors regular meeting agenda package, September 16, 2026",
    "publisher": "Sonoma-Marin Area Rail Transit District",
    "date": "2026-09-16",
    "type": "official",
    "url": "https://www.sonomamarintrain.org/sites/default/files/Documents/09.16.2026%20Complete%20Agenda%20Package_0.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the package wasn't opened. Healdsburg: Phase I work of the design-build contract ongoing; agreements with the City of Healdsburg and Sonoma County for utility and roadway design; staff recommended public engagement on the Healdsburg station location. Cloverdale: \"Resolution 2026-26 adopts the Geyserville Station Project into SMART's program\", carried 11-0-1-0 (possibly the August 19 meeting's vote, recorded in this package)."
  },
  {
    "id": "smart-healdsburg-station-outreach-2026-09-23",
    "title": "SMART Healdsburg Station Location Consideration Outreach (memorandum)",
    "publisher": "Sonoma-Marin Area Rail Transit District",
    "date": "2026-09-23",
    "type": "official",
    "url": "https://www.sonomamarintrain.org/sites/default/files/Documents/SMART%20Healdsburg%20Station%20Location%20Consideration%20Outreach_COC%2009.23.26.pdf",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the memo wasn't opened. \"On September 16, 2026, the SMART Board of Directors directed staff to initiate a public engagement process around the location of the SMART Healdsburg Station\", \"expected to run through November 2026\"; two sites (Depot/Hudson Street and downtown)."
  },
  {
    "id": "smart-geyserville-page",
    "title": "Geyserville",
    "publisher": "Sonoma-Marin Area Rail Transit District",
    "type": "official",
    "url": "https://www.sonomamarintrain.org/geyserville",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened, and it is undated. \"SMART Board of Directors directed staff in June 2026 to begin public engagement on a potential station in Geyserville. SMART is evaluating a location near Highway 128 and Remmel Road.\" \"By segmenting the final northern extension into two approximately nine-mile projects instead of one 18-mile project, SMART can pursue grant opportunities that are often more competitive for smaller, phased capital projects.\""
  },
  {
    "id": "ceqanet-2026080751-geyserville",
    "title": "Geyserville Station (Notice of Exemption, SCH 2026080751)",
    "publisher": "Sonoma-Marin Area Rail Transit District, via the Governor's Office of Land Use and Climate Innovation (CEQAnet)",
    "date": "2026-08-20",
    "type": "official",
    "url": "https://ceqanet.lci.ca.gov/2026080751",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the record wasn't opened. A statutory exemption under Public Resources Code 21080.25(b)(6)(A) for a passenger platform, shelter, bicycle and auto parking on Highway 128 near Remmel Road, within SMART's right-of-way."
  },
  {
    "id": "calsta-tircp-cycle-8",
    "title": "Transit and Intercity Rail Capital Program",
    "publisher": "California State Transportation Agency",
    "type": "official",
    "url": "https://calsta.ca.gov/subject-areas/transit-intercity-rail-capital-prog",
    "accessed": "2026-10-16",
    "notes": "Seen in web search results only; the page wasn't opened. Cycle 8 award announcement expected October 2026 (the final guidelines named September 18, 2026); no award list had been seen by 2026-10-16."
  }
]
```
