# Follow-up research: the ideal network's open gaps

Oct 17, 2026. This pass picks up where `san-francisco.md`, `spur-seamless.md` and
`link21-dumbarton-express-rail.md` (Oct 16) ran out of searches. It is research only: it edits no
data and recommends nothing, because the ideal network is Matthew's to design.

## How this pass worked

- **No page was opened.** Checked again today with curl: connectsf.org, ftp.connectsf.org (where
  ConnectSF's uploads live), sfcta.org, sfplanning.org (including commissions.sfplanning.org),
  sf.gov and sfbos.org are all refused by the proxy (403 on CONNECT). The brief lists the other
  publishers' sites and web.archive.org as refused too.
- **Every fact is `[srch]`.** It comes from WebSearch with `allowed_domains` set to the
  publisher's domain, in standard mode first and extended mode when results were thin.
  - Words in quotation marks are strings that the tool's summary gave as the page's own words.
  - Everything else is *(paraphrase)*.
  - Which URL a statement came from is the tool's attribution. Where the attribution was unclear
    or conflicting, the text says so.
- **About 100 searches** were used, under the 120 budget.
- **Source ids.** `[id]` marks an id already in `data/sources.json`. `[new: id]` marks an entry
  proposed in the JSON block at the end. Each section's table gives every cited document's title,
  publisher, date and URL.
- **"Drawable from the words"** means the text names a street plus the cross streets where the
  line starts and ends on it. For track, it means a named existing line plus named end points.
  Anything drawn that way would be `geometry_confidence: approximate`.

## Summary

| Gap | What this pass found | Still open | Drawable from the words |
|---|---|---|---|
| 1. ConnectSF Transit Strategy | Its four recommendations, in SFCTA's wording; the rail items (Geary/19th subway, Central Subway to Fisherman's Wharf, Bayview Caltrain); "five major rail and transit projects"; the Transit Corridors Study's 13 corridors (names not seen); staff saying in April 2021 that no Five-Minute Network routes were chosen; the Five-Minute Network corridors Muni Forward now funds | The strategy PDF itself; the 13 corridor names; any Five-Minute Network route list in the final strategy; any adoption vote | No rail item. Muni Forward quick-build segments on existing routes: 28 19th Avenue (Lincoln to Junipero Serra Blvd) yes; 22 Fillmore (Marina Blvd to Herman St) yes but seen once |
| 2. Subway Vision corridors | Chapter 4's structure, Figures 15-17 (a "Network B" exists), the 2016 slides' corridor headings; the "Van Ness Avenue to Divisadero Street" string seen a second time | The corridor names and both networks | No |
| 3. SPUR, *Nine Ideas* | Its framing and subtitle only | The nine ideas, and the PDF's URL | No |
| 4. Seamless Bay Area Vision Map | Its own pages call it aspirational and a communication tool; they name no lines | Everything on the map image | No |
| 5. Link21 concepts | Concepts A, B, E, F in more detail; Hercules tested as an extension, then dropped; the Round 2 Representative Concepts' station sequences, including a Regional Rail one ending at San Pablo and a "RR to Millbrae" variant that includes PAX | Concept maps; the final Stage Gate 2 report's content | No tube path. East Bay legs are station-to-station only |
| 6. PAX portals | Each alternative's south end and portal, as SFCTA words them; the north end at the DTX structure in the 4th and King railyard; tunnel lengths; Bridging Study procurement from October 2025 | Which portal belongs to which variant (the sources conflict); the turn from 7th St into Pennsylvania Ave | Nearly, for the long alternative (see section 6) |
| 7. SFTP 2050+ | No adoption found. The latest schedule is a Summer 2026 draft and a Fall 2026 final; the Oct 27, 2026 Board meeting was canceled; an "SFTP 2055" budget line appears in May 2026 | Adoption; the 2026 major transit project list | n/a |

## 1. ConnectSF Transit Strategy (2021)

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[new: sfcta-connectsf-project-page]` | ConnectSF (project page) | SFCTA | undated | https://www.sfcta.org/projects/connectsf |
| `[new: sfcta-blog-transit-investment-strategy-feedback-2021]` | Give feedback on San Francisco's Transit Investment Strategy | SFCTA | 2021 (feedback due May 7) | https://www.sfcta.org/blogs/give-feedback-san-franciscos-transit-investment-strategy |
| `[new: sfcta-board-minutes-2021-04-27]` | Draft minutes, Transportation Authority Board | SFCTA | 2021-04-27 | https://www.sfcta.org/sites/default/files/2021-05/04%20April%2027%20Mins.pdf |
| `[new: sfcta-connectsf-transit-slides-2021-03-23]` | Statement of Needs: Challenges to Making the ConnectSF Vision a Reality (transit slides to the Board) | SFCTA | 2021-03-23 (from the file name) | https://www.sfcta.org/sites/default/files/2021-03/Transit%20Slides%20to%20TA%20Board%202021%200323%20v6.pdf |
| `[new: sfplanning-cpc-connectsf-transit-packet]` | Statement of Needs: Challenges to Making the ConnectSF Vision a Reality (Planning Commission packet, item 11) | SF Planning | undated | https://commissions.sfplanning.org/cpcpackets/11.ConnectSF.pdf |
| `[new: sfmta-board-workshop-2021-reference]` | 2021 Board of Directors Workshop Reference Materials | SFMTA | 2021 | https://www.sfmta.com/about-us/sfmta-board-directors/2021-board-directors-workshop |
| `[new: sfmta-board-2021-07-20-item-18]` | 7-20-21 MTAB Item 18 ConnectSF Investment Strategies | SFMTA | 2021-07-20 | https://www.sfmta.com/reports/7-20-21-mtab-item-18-connectsf-investment-strategies |
| `[new: sfmta-central-subway-faq]` | Central Subway Project Frequently Asked Questions | SFMTA | undated | https://www.sfmta.com/project-updates/central-subway-project-frequently-asked-questions |
| `[new: sfcta-sftp-2050-appendix-a]` | SFTP 2050 Appendix A: SFTP 2050 Investment Plan Development | SFCTA | 2022-12-01 | https://www.sfcta.org/sites/default/files/2022-12/SFCTA_SFTP-2050_Appendix-A-Plan-Development-Process_2022-12-01.pdf |
| `[sfmta-fast-convenient-transit]` | Fast and Convenient Transit | SFMTA | undated | https://www.sfmta.com/fast-and-convenient-transit |
| `[sfcta-geary-19th-strategic-case-page]` | Geary/19th Ave Subway and Regional Connections Study Strategic Case (report page) | SFCTA | 2026-07 | https://www.sfcta.org/reports/geary19th-ave-subway-and-regional-connections-study-strategic-case |

The Five-Minute Network documents are in their own table below.

### What the strategy recommends

- **Its four recommendations, in SFCTA's wording** `[new: sfcta-connectsf-project-page]`: "Make the
  system work better with aggressive maintenance and restoration.", "Deliver a five-minute network
  for reliable transit service citywide.", "Increase speed, reliability, and capacity for a modern
  rail system." and "Build rail where bus service is not sufficient to meet demand." [srch]
  - The 2021 feedback post carries the second and third in the same words
    `[new: sfcta-blog-transit-investment-strategy-feedback-2021]` [srch].
  - The first pass saw a different wording once, on connectsf.org ("Renew and modernize our rail
    system, and Build more rail to San Francisco's busiest places"). The two may be the draft's and
    the final's wording; which is which wasn't seen.
- **SFMTA's 2021 Board workshop** `[new: sfmta-board-workshop-2021-reference]`: "Recommended
  investments include: 1) bus priority investments across the City to improve speeds and
  reliability while reducing operating costs; 2) improvements to existing surface rail and subway
  infrastructure ... and 3) in the few locations where surface transit cannot provide enough
  capacity, new underground rail such as a Geary subway, linking to regional investments such as a
  future new transbay rail crossing." (The result elided the middle.) [srch]
- **The rail items, now as an exact string** `[sfmta-fast-convenient-transit]`: "Build new rail
  projects in places where no amount of bus improvements will be able to meet the demand,
  including on Geary Boulevard and 19th Avenue and extending the Central Subway to Fisherman's
  Wharf." [srch] This replaces the first pass's paraphrase.
- **The Transit Corridors Study behind it** `[new: sfcta-sftp-2050-appendix-a]`:
  - "The TCS conducted a comparative analysis of representative transit concepts to understand the
    benefits that might be achieved through alternative major investments in each of the 13
    ConnectSF transportation corridors" [srch].
  - The concepts "were intended to direct the commencement of corridor planning studies, rather
    than as formal project proposals" [srch].
  - "Some corridors will not be able to serve future community needs with bus-based projects alone;
    they require a major rail investment." [srch] The tool attributed this sentence once to this
    appendix and once to SFCTA's ConnectSF page.
  - The "Build More Rail" element points to the Geary/19th Avenue subway, a Central Subway
    extension to Fisherman's Wharf and a new Caltrain station for the Bayview; the study scored the
    corridors against 11 transit objectives and finished in early 2022 *(all paraphrase)* [srch].
  - **The 13 corridors' names weren't seen** *(open)*.
- **"Five major rail and transit projects."** `[sfcta-geary-19th-strategic-case-page]`: "ConnectSF
  and the 2022 San Francisco Transportation Plan identified five major rail and transit projects
  with the potential to deliver significant benefits to San Francisco and the region." [srch]
  - The tool saw four bullets: The Portal with the Pennsylvania Avenue Extension, the Geary/19th
    Ave Subway, a Central Subway extension to Fisherman's Wharf, and a new Bayview Caltrain
    station *(paraphrase)* [srch].
  - The fifth wasn't seen. Counting The Portal and PAX separately would make five, but that is an
    inference, not something the tool showed.
  - The plans "did not prioritize the order in which each should advance or be implemented"
    [srch]. The study treats The Portal as the near-term priority *(paraphrase)* [srch].
  - So the Geary study counts five. SFCTA's early-2025 papers say four *(paraphrase)* [srch], so
    the first pass's "four or five" question is still open across documents.

### The Five-Minute Network

**In the strategy (2021): no routes chosen.** At the SFCTA Board on April 27, 2021, according to its
draft minutes `[new: sfcta-board-minutes-2021-04-27]` [srch]:
- "Mr. Uchida said that they are regular bus lines and noted that a lot of service planning work
  remains to be done and no decisions have been made on which routes will be in the 5-minute
  network."
- "Mr. Uchida replied that the connector routes were meant to be a high-quality service not as
  frequent as the 5-minute network, but still very frequent, likely 10 minutes or better."
- "He said the next step on the westside subway is a more focused planning study."

That was the April 2021 draft. Whether the December 2021 final names routes is *open*. The draft
deck says the corridors would likely include Rapid Network routes, other routes with enough
demand, and routes where growth is expected *(paraphrase)* `[new: sfplanning-cpc-connectsf-transit-packet]`
[srch].

**Streets named for it.** Two SFCTA studies of 2021 say: "For ConnectSF, both Sunset Blvd and 19th Ave
are part of the proposed 5-Minute network, which is intended to provide fast, frequent, and
prioritized transit service" `[new: sfcta-great-highway-evaluation-2021-07]`,
`[new: sfcta-d4-mobility-study-2021-09]` [srch]. These are corridors only, with no ends.

**"About a dozen corridors."** The phrase "about a dozen corridors that carry two-thirds of all Muni
ridership" was matched in fragmented text of SFMTA's Muni Forward update slides of Nov 21, 2023
`[new: sfmta-muni-forward-update-2023-11-21]` [srch]. Another result put similar words in an SFCTA
memo, so the attribution is unsettled. No list of the dozen was seen.

**As Muni Forward now funds it** (SFCTA's Prop L documents; all [srch]):

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[new: sfcta-prop-l-5ypp-cac-2024-01-24]` | Adopt Four Prop L 5YPPs and Amend Strategic Plan Baseline (CAC presentation) | SFCTA | 2024-01-24 | https://www.sfcta.org/sites/default/files/2024-01/SFCTA_CAC_2023PropL5YPPPRESENTATION_2024-01-24.pdf |
| `[new: sfcta-board-packet-2024-10-08]` | Transportation Authority Board packet | SFCTA | 2024-10-08 | https://www.sfcta.org/sites/default/files/2024-10/SFCTA_Board_PACKET_2024-10-08_1.pdf |
| `[new: sfcta-prop-l-allocations-memo-2024-10-22]` | Prop L Allocations Memo (Board item 6) | SFCTA | 2024-10-22 | https://www.sfcta.org/sites/default/files/2024-10/SFCTA_Board_Item6_PropLAllocationsMEMO_2024-10-22.pdf |
| `[new: sfcta-board-packet-2026-02-24]` | Transportation Authority Board packet | SFCTA | 2026-02-24 | https://www.sfcta.org/sites/default/files/2026-02/SFCTA_Board_PACKET_2026-02-24.pdf |
| `[new: sfcta-blog-muni-forward-quick-build-2026]` | Transportation Authority Board Approves $1.5 Million for Muni Forward Quick-Build Improvements | SFCTA | 2026-02 | https://www.sfcta.org/blogs/transportation-authority-board-approves-15-million-muni-forward-quick-build-improvements |
| `[new: sfcta-great-highway-evaluation-2021-07]` | Great Highway Concepts Evaluation Report, Final Report | SFCTA | 2021-07-13 | https://www.sfcta.org/sites/default/files/2021-07/SFCTA_Great-Highway-Evaluation-Report_2021-07-13_FINAL.pdf |
| `[new: sfcta-d4-mobility-study-2021-09]` | District 4 Mobility Study, Final Report | SFCTA | 2021-09-17 | https://www.sfcta.org/sites/default/files/2021-09/SFCTA-D4_Mobility_Study_Report_2021-09-17_FINAL.pdf |
| `[new: sfmta-muni-forward-update-2023-11-21]` | Muni Forward Update, SFMTA Board of Directors (slides) | SFMTA | 2023-11-21 | https://www.sfmta.com/sites/default/files/reports-and-documents/2023/11/11-21-23_mtab_item_12_muni_forward_update_-_slide_presentation.pdf |
| `[new: sfmta-muni-forward-page]` | Muni Forward (project page) | SFMTA | undated | https://www.sfmta.com/projects/muni-forward |

- **Definition** (Oct 8, 2024 packet): "a set of high-ridership corridors with capacity to support
  combined five-minute headways or better, that serve major regional destinations and transit
  hubs". SFMTA's page: "ConnectSF defines a Five-Minute Network where service would be most
  frequent." `[new: sfmta-muni-forward-page]`
- **Group 1 and Group 2** (Oct 22, 2024 memo): "This project will focus on the 1 California, 22
  Fillmore, T Third surface route, and 28 19th Avenue, with additional corridors if there are cost
  savings to support this. Group 2 corridors include: 7 Haight-Noriega, 8 Bayshore, 9 San Bruno, 14
  Mission, 30 Stockton, 43 Masonic and 44 O'Shaughnessy." Also: "Scope for all corridors is to be
  determined during this planning and outreach process."
- **The January 2024 list** has "Group 2 corridors (potential additional corridors if funding
  allows)", including "14 Mission (south of Randall Street)". It doesn't have the 43 or the 44
  *(paraphrase)*.
  - One result read the 2024 allocation form as putting the 9, 14, 30, 43 and 44 in Group 1, with
    the 43 and 44 as "key connector routes". That conflicts with the memo and is unconfirmed.
- **Quick-build, February 2026** (packet): "This project includes approximately 10-15 intersections
  on each of the four project corridors identified as priorities in the sales tax funded Muni
  Forward Five-Minute Network Corridor work." $1,549,000 of Prop L. The blog: "The Transportation
  Authority Board gave final approval at the February 24 meeting." Open for use by December 2028
  *(paraphrase)*.
- **Segments, the only street-by-street wording found in this gap:**

| Corridor | As worded | Seen | Drawable from the words |
|---|---|---|---|
| 28 19th Avenue | "28 19th Avenue (Lincoln Avenue to Junipero Serra Boulevard)" (blog); another result wrote "Lincoln Way" | Twice | **Yes:** along 19th Ave, or today's 28 shape in GTFS, between the two cross streets. Check the cross street's name against the centerlines |
| 22 Fillmore | Fillmore Street between Marina Boulevard and Herman Street *(paraphrase)* | Once; an exact-phrase check found nothing | **Yes, if confirmed** |
| T Third (surface) | From Townsend to the Bayshore terminal *(paraphrase)* | Once | **Partly:** "the Bayshore terminal" isn't a cross street |
| 1 California | The full route *(paraphrase)* | Once | **Yes:** today's route in GTFS |
| Group 2 | Route numbers only; the 14 Mission "south of Randall Street" | — | Only along today's routes in GTFS; just one end is given for the 14 |

These are transit-priority projects on today's routes, not new lines.

### Status

- **No adoption vote was found** *(open)*. The SFMTA Board heard "ConnectSF Investment Strategies"
  as Item 18 on July 20, 2021, and its minutes say it was continued to a future date *(paraphrase)*
  `[new: sfmta-board-2021-07-20-item-18]` [srch]. The minutes link the tool gave was
  https://www.sfmta.com/media/27823/download.
- **Dates.** The draft was released in April 2021 (SFMTA blog, *paraphrase*). The final was
  "published in December 2021" *(paraphrase; SFMTA's Central Subway FAQ, which says the strategy
  identifies a Geary/19th Ave subway route to study, possibly connecting to Link21)*
  `[new: sfmta-central-subway-faq]` [srch].
- **Not to be confused:** the earlier ConnectSF *Vision* was approved by the SFMTA Board, the SFCTA
  Board and the Planning Commission in April 2018 *(paraphrase)* [srch].

**Geometry:** no rail item in any ConnectSF text seen is worded by street. They name corridors.

## 2. The Muni Subway Vision (2017): chapter 4 and Figure 15

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[sfcta-subway-vision-2017]` | Subway Vision: Shaping our City's Transportation Future | SFCTA, SFMTA, SF Planning | 2017-06-09 | https://sfcta.org/sites/default/files/2019-02/2016%20Subway%20Vision.pdf |
| `[sfmta-subway-vision-slides-2016-10-18]` | San Francisco Subway Vision (slides, SFMTA Board item 12) | SFMTA | 2016-10-18 | https://www.sfmta.com/sites/default/files/agendaitems/2016/10-18-16%20Item%2012%20Subway%20Vision%20-%20slide%20presentation.pdf |
| `[new: sfmta-subway-vision-emsc-slides-2016-10-26]` | San Francisco Subway Vision (slides, EMSC) | SFMTA | 2016-10-26 | https://www.sfmta.com/sites/default/files/agendaitems/2016/10-26-16%20EMSC%20Subway%20Vision%20-%20slide%20presentation.pdf |

### What was found (all [srch])

- **The report's structure** `[sfcta-subway-vision-2017]`:
  - Chapter 4, "Candidate Projects and Analysis" *(the title as paraphrased)*, has sections "4.1
    Corridor Development", which starts on page 22 *(paraphrase)*, and "4.2 Network Development".
  - The figure list: "Figure 15: Initial Corridor Concepts; Figure 16: Subway Network Comparison;
    Figure 17: Travel Time Savings with Network B". So the two networks seem to be labeled, and
    at least one is "Network B". A "Network A" wasn't seen by name.
  - The method: staff identified existing bus and light rail lines with high ridership, and where
    faster and more reliable service would help most *(paraphrase)*.
- **The string from the first pass was seen a second time,** again tied to the report: "need for a
  subway along the Geary corridor, some sort of Central Subway extension, a 19th Avenue. subway,
  and north-south connections spanning from Van Ness Avenue to Divisadero Street." Its context, a
  needs statement or public input, is still unknown.
- **The October 2016 slides' corridor headings.** Under "Corridors for Evaluation" the extracted text
  reads only "Cross Town – Connectors - Demand Based". The tool gave the Oct 26, 2016 EMSC deck's
  URL. The corridor names are probably in the slides' images *(the tool's guess)*.
  `[new: sfmta-subway-vision-emsc-slides-2016-10-26]`
- **Not found in seven searches:** the candidate corridor names, and what Network A and Network B
  contain *(open)*.
- **Don't mix up the lists.** One result offered the corridor list from Muni's older "A Vision for
  Rapid Transit in San Francisco": Third Street-Chinatown, Geary, Van Ness-Mission, Market Street,
  Chinatown-North Beach-Marina, Fillmore-16th Street, Geneva-Ocean, and 19th Avenue-Park Presidio
  *(paraphrase)* [srch]. That is not the Subway Vision's list.

**Geometry:** none. The report itself says it gives "the general orientation of potential subway
corridors" (first pass).

## 3. SPUR, *The Bigger Picture: Nine Ideas for a Connected San Francisco* (2021)

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[spur-nine-ideas-connected-sf-2021]` | The Bigger Picture: Nine Ideas for a Connected San Francisco | SPUR | 2021-10-06 | https://www.spur.org/publications/spur-report/2021-10-06/bigger-picture-nine-ideas-connected-san-francisco |
| `[spur-regional-strategy-reports-library]` | Reports Library | SPUR | undated | https://www.spur.org/featured-project/spur-regional-strategy/reports-library |
| `[new: spur-bigger-picture-series-2021]` | The Bigger Picture (series page) | SPUR | 2021-02-18 | https://www.spur.org/publications/spur-report/2021-02-18/bigger-picture |

### What was found (all [srch])

- **Subtitle,** in the reports library: "How better transportation can link San Francisco
  neighborhoods to each other and the region".
- **The problem it states,** on the report page:
  - "Many neighborhoods have poor access to regional transit service — and to each other."
  - "the areas furthest away from downtown lack rapid and express cross-town routes, reducing local
    and regional job access for the people who live there".
  - Neighborhoods along Market and Mission streets have easy BART access to the East Bay and South
    Bay *(paraphrase)*.
- **The series.** It is the fourth Bigger Picture report, made with AECOM *(paraphrase)*. The series
  page: "these ideas are not policy prescriptions but possibilities"
  `[new: spur-bigger-picture-series-2021]`.
- **The nine ideas weren't found** in seven searches, and no PDF URL appeared *(open)*. The report
  seems to be indexed only by its landing page.
- **A discrepancy to check.** One result says the *Oakland* report's "Idea 9" proposes a new rail
  tunnel through downtown Oakland that could connect to a West Side San Francisco subway via Geary
  and 19th Avenue *(paraphrase)* [srch]. `spur-seamless.md` (S3) cites that route as Idea 2.

**Geometry:** none found.

## 4. Seamless Bay Area's Vision Map

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[new: seamless-vision-map-overview]` | Vision Map (overview page) | Seamless Bay Area | undated | https://www.seamlessbayarea.org/vision-map-overview |
| `[seamless-vision-map-background]` | Background - Vision Map | Seamless Bay Area | undated | https://www.seamlessbayarea.org/background-vision-map |
| `[seamless-vision-map]` | Vision Map | Seamless Bay Area | undated | https://www.seamlessbayarea.org/vision-map |

### What was found (all [srch])

- **The overview page:** the map "builds on numerous existing transportation plans and input from
  stakeholders, but is also highly aspirational". It shows what transport could be like if the Bay
  Area planned and ran transit as one network *(paraphrase)*.
- **The background page:**
  - The map's primary purpose is to be a communication tool, a picture of regional transit planned
    from a network and customer perspective *(paraphrase)*.
  - Specific projects would still need to be assessed for priority and phasing *(paraphrase)*.
  - "Only rapid and regional lines are shown on this map" (first pass, seen again).
- **No line names or endpoints** appear in the text of any Seamless Bay Area page, across five
  searches. Its layers are named only by type: metro, regional express rail, rapid bus, and
  regional express bus *(open)*.

**Geometry:** none from the text. The lines exist only in the map image.

## 5. Link21: Concepts A, B, E and F, and the 2024 Representative Concepts

### Documents

All are drafts unless noted, and all are `official`.

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[link21-pbc-appendix-c-2024-05]` | Draft Preliminary Business Case Report, Appendix C: Draft Concept Development | Link21 (BART, CCJPA) | 2024-05 | https://link21program.org/en/media/624/download |
| `[link21-environmental-input-concepts-2023]` | Environmental Input to Link21 Concepts (executive summary) | Link21 | 2023-12-08 | https://link21program.org/sites/default/files/2024-02/03_2-ENVI-PH1-Env_Input_Link21_Concepts_508_ES_ONLY_120823.pdf |
| `[link21-preliminary-business-case-2024-08]` | Preliminary Business Case Report, draft final | Link21 | 2024-08 | https://link21program.org/sites/default/files/2-BUSC-PH1-Prelim_BUSC_Preliminary_Business_Case_Report_v0.10_clean.pdf |
| `[link21-eac-input-report-2024-06]` | Draft Stage Gate 2 Equity Advisory Council Input Report | Link21 | 2024-06 | https://link21program.org/en/media/645/download?inline= |
| `[link21-concepts-page]` | Concepts | Link21 | undated | https://link21program.org/en/program/concepts |
| `[link21-example-concepts]` | Example Concepts | Link21 | undated | https://link21program.org/en/program/example-concepts |
| `[new: link21-concepts-memo-kornblatt]` | Draft memorandum from Helene Kornblatt (PMC) to Don Dean (BART), on concepts under consideration | Link21 | undated | https://link21program.org/en/media/625/download?inline= |
| `[new: link21-document-library]` | Document Library | Link21 | undated | https://link21program.org/en/about/document-library |

### Round 1: Concepts A, B, E and F (all [srch])

- **The wording repeats across concepts.** Appendix C, again: "Concept A: RR JLS – Regional Rail STC
  to Jack London District via Alameda. Concept A would be a new Regional Rail crossing from the STC
  to Hercules via. Alameda plus a grade separation at JLS, and it would end at the Coliseum
  Station." `[link21-pbc-appendix-c-2024-05]`
  - The same sentence was returned for Concept F, which another document says runs to Oakland City
    Center. The tool read it as a copying error.
  - So "STC to Hercules via Alameda" may be wording shared by the Regional Rail concepts, not a
    separate Hercules terminus for A and B *(inference)*.
  - The same appendix: "During peak periods, an average of 10.5 tph would operate through the new
    crossing", with BART transfers at the STC, West Oakland, Richmond and Coliseum *(the transfer
    list is paraphrase)*.
- **Concept B (via the Port of Oakland).**
  - It favors a shorter East Bay–San Francisco trip over more stops in Oakland, and has a West
    Oakland transfer to BART *(paraphrase)* `[link21-concepts-page]`.
  - It tunnels straight from San Francisco to West Oakland *(paraphrase)*, with "a potential wye box
    just south of the potential new West Oakland Station" `[link21-environmental-input-concepts-2023]`.
- **Concept E (to MacArthur).** Only its figure name was seen, "Concept E: RR MacArthur Map", and
  its title, "Regional Rail STC to MacArthur via Alameda" *(open)*.
- **Concept F (to Oakland City Center).** "a Regional Rail transbay crossing that would connect the
  Salesforce Transit Center in San Francisco to Oakland City Center via an alignment through
  Alameda". It has BART transfers at 12th St./Oakland City Center, Coliseum and Richmond, and its
  Regional Rail work runs north to Richmond and south to Coliseum *(paraphrase)*
  `[new: link21-concepts-memo-kornblatt]`.
- **The shared sections:** "The RR concepts have two common sections: (1) from 19th Avenue in Oakland
  (in the San Antonio neighborhood) to the existing Oakland Coliseum Station and (2) from south of a
  potential modified Emeryville Station north to the potential new Hercules Station."
  `[link21-environmental-input-concepts-2023]`

### Do A and B end at Hercules? Hercules was tested, then dropped (all [srch])

- **Hercules was a test, not a terminus.** Appendix C tested two minimum crossing concepts and two
  incremental pieces: "Extension north (Emeryville/Richmond/Hercules)" and "Extension south (San
  Antonio/Coliseum)" *(framing paraphrase)*. It recommended building at least to Richmond and testing
  San Pablo or Hercules *(paraphrase)* `[link21-pbc-appendix-c-2024-05]`.
- **It was then dropped.** The draft memo says ridership forecasts didn't support Regional Rail
  infrastructure north of Richmond to Hercules, which might also need a turnaround and a storage
  yard. Pinole was likewise not supported. Both *(paraphrase)* `[new: link21-concepts-memo-kornblatt]`.
  - In its words, Link21 "would not preclude the planned intercity service station in Hercules or
    future infrastructure improvements to support Urban | Metro service as separate projects by
    others".
  - A later response: "this Hercules station is planned to be implemented by the City of Hercules
    through a separate, nearer-term project and served by Capitol Corridor trains".
- **The memo is undated.** The Round 2 Regional Rail concepts terminate in San Pablo (below), not
  Hercules.

### Round 2: the Representative Concepts (all [srch])

- **What they are** `[link21-preliminary-business-case-2024-08]`:
  - "The purpose of the Preliminary Business Case is not to define the exact details of a future
    Crossing Project, like station locations or alignments, but to inform the strategic decision of
    which technology is best suited to meeting Link21's goals and objectives."
  - "Each Representative Concept is a conceptual representation of a technology option, including a
    service plan, alignment, and infrastructure requirements."
- **How many?** The Environmental Input document describes three: two Regional Rail and one BART.
  Appendix C and the business case speak of one per technology. Both are *(paraphrase)*.
- **The BART Representative Concept:** "The BART Representative Concept begins at a potential new
  Downtown San Francisco Station (near STC)... The concept tunnels under the San Francisco Bay to a
  potential new station at Alameda. In Oakland, there would be potential stations in Jack London
  Square and downtown Oakland leading to the existing MacArthur Station. An aboveground alignment
  would travel southeast to the San Antonio neighborhood."
  - It also runs south through new stations at 4th & Townsend and Mission Bay before the tunnel
    *(paraphrase)* `[link21-preliminary-business-case-2024-08]`.
  - It is `superseded` by BART's June 2025 decision (first pass).
- **The Regional Rail Representative Concepts:** "The two RR Representative Concepts begin at the
  STC and tunnel under the San Francisco Bay to a potential new station in Alameda. They then
  continue to Oakland with transfer service at the potential station 12th Street/Oakland City
  Center Station and then continues south to the existing Oakland Coliseum Station. In the north,
  the concepts would use a potential modified station at Emeryville, the existing Berkeley Station,
  and a potential modified Richmond Station, terminating in San Pablo."
  - Figure ES-7 is labeled "RR to STC Representative Concept: RR STC to Oakland City Center via
    Alameda". That matches Concept F's name, though the document doesn't say it derives from F.
  - All `[link21-environmental-input-concepts-2023]`.
- **The second Regional Rail concept, "RR to Millbrae,"** has all the first one's features plus
  improvements from 4th and King to Millbrae: "the planned Pennsylvania Avenue Extension", platform
  extensions, a four-track section and four grade separations *(paraphrase, apart from the quoted
  words)* `[link21-environmental-input-concepts-2023]`.
- **Service:** "16 transbay trains per peak hour per direction (i.e., a train every 3.75 minutes, on
  average)", with room to grow to 24, against 24 for BART. Off-peak, 10 Regional Rail trains an hour
  *(paraphrase)* `[link21-eac-input-report-2024-06]`, `[link21-preliminary-business-case-2024-08]`.
- **Land and right of way:** "Since targeted coordination has not begun with the host railroad Union
  Pacific Railroad (UPRR), the Link21 Team conservatively assumed in the Regional Rail
  Representative Concept that work would require widening the existing right-of-way throughout the
  East Bay extents." It runs on the Capitol Corridor alignment, including the Jack London and
  Coliseum corridors *(paraphrase)*. The tool attributed these to the business case or its
  appendix.
- **San Francisco stations for the evaluation:** "Assumed stations for downtown San Francisco are the
  Salesforce Transit Center (for a Regional Rail crossing) or BART Montgomery St. Station (for the
  Baseline)." `[link21-preliminary-business-case-2024-08]`

### Maps

- **The Concepts page has example maps.** They show new tracks as thick lines, existing tracks as thin
  lines, and transfer points and potential stations *(paraphrase)*. The BART examples run "MacArthur
  to 1st & Howard" and "MacArthur to Mission Bay" *(paraphrase)* `[link21-concepts-page]`,
  `[link21-example-concepts]`.
- **The Document Library** `[new: link21-document-library]`:
  - It has "Appendix C Environmental Constraints and Opportunities Mapbooks" by subarea (such as
    Transbay Crossing, Oakland to Richmond and San Jose to Gilroy). These map environmental
    constraints, and belong to a different Appendix C from the business case's.
  - It also lists a "Stage Gate 2 Summary Report", whose text wasn't seen *(open)*.

**Geometry:** still no path for the tube. The East Bay legs are named stations in sequence
(Coliseum; 12th St/Oakland City Center; Emeryville, Berkeley, Richmond, San Pablo), and so are the
two common sections. How they run between those stations isn't worded beyond "the Capitol Corridor
alignment" *(paraphrase)*, and 12th St/Oakland City Center is a BART station off that alignment.
The route between the Alameda station and the existing tracks isn't worded at all. **Not drawable
from the words.**

## 6. The Pennsylvania Avenue Extension (PAX): portals

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[sfcta-pax-project-page]` | Pennsylvania Avenue Extension (project page) | SFCTA | undated | https://www.sfcta.org/projects/pennsylvania-avenue-extension |
| `[sfcta-pax-initiation-report-2022]` | PAX Project Initiation Report, Resolution R23-05 | SFCTA | 2022-07 | https://www.sfcta.org/sites/default/files/2022-08/R23-05%20PAX%20Project%20Initiation%20Report%20Signed.pdf |
| `[new: sfcta-pax-pir-memo-2022-07-12]` | PAX Project Initiation Report (Board memo and draft resolution) | SFCTA | 2022-07-12 | https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportMEMO_2022-07-12.pdf |
| `[new: sfcta-pax-pir-presentation-2022-07-12]` | Pennsylvania Avenue Extension (PAX) Project Initiation Report, Agenda Item 8 (presentation) | SFCTA | 2022-07-12 | https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPRESENTATION_2022-07-12.pdf |
| `[new: sfcta-pax-pir-public-comment-2022-07-12]` | Public comment on the PAX Project Initiation Report | Members of the public, in an SFCTA packet | 2022-07-12 | https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPUBLICCOMMENT_2022-07-12.pdf |
| `[sfcta-annual-report-2025]` | 2025 Annual Report | SFCTA | 2026-01-27 | https://www.sfcta.org/sites/default/files/2026-01/SFCTA_Board_Item6_AnnualReportREPORT_2026-01-27_0.pdf |
| `[sfcta-budget-work-program-memo-2025-04]` | Proposed Annual Budget and Work Program, FY 2025/26 (memo) | SFCTA | 2025-04-24 | https://www.sfcta.org/sites/default/files/2025-05/SFCTA_CAC_ITEM6_ProposedAnnualBudgetandWorkProgramMEMO_2025-05-28.pdf |
| `[sfcta-portal-fy2026-memo-2026-01]` | TJPA Portal project FY2026 memo (CAC item 9) | SFCTA | 2026-01-23 | https://www.sfcta.org/sites/default/files/2026-01/SFCTA_CAC_Item9_TJPAPortalProjectFiscalYear2026MEMO_2026-01-28.pdf |
| `[new: sfcta-comments-pba2050-2021-07-20]` | Comments on the Draft Plan Bay Area 2050 (letter to Matt Maloney, MTC) | SFCTA | 2021-07-20 | https://files.mtc.ca.gov/pdf/pba_comments/2021/San_Francisco_County_Transportation_Authority_7-20-21.pdf |
| `[new: mtc-bil-regional-endorsement-list-2023]` | Agenda Item 3b: Regional Endorsement List (Bipartisan Infrastructure Law) | MTC | 2023 | https://mtc.ca.gov/sites/default/files/meetings/attachments/5837/11b_23_1324_Regional_Endorsement_List_4.pdf |

### Each alternative's ends and portals, as SFCTA words them (all [srch])

"The three alignment alternatives are long, mid-length, and short, and some can be built by using
either one tunnel or two." `[sfcta-pax-project-page]`

| Alternative | South end and portal | North end | Length | Drawable from the words |
|---|---|---|---|---|
| **Long** | "This alternative would provide a tunneled rail alignment (either single bore or twin bores) from the Downtown Rail Extension to a point immediately north of Cesar Chavez Street." "The long tunnel alignment alternatives completely bypass the existing 22nd Street Station and would result in its decommissioning." `[sfcta-pax-initiation-report-2022]` | The DTX, in "a cut-and-cover structure built as part of DTX" at the 4th and King railyard (said of PAX generally; *paraphrase, apart from the quoted words*) `[new: sfcta-pax-pir-memo-2022-07-12]` | About 7,800 ft *(paraphrase)* `[new: sfcta-pax-pir-presentation-2022-07-12]` | **Nearly.** 7th St and Pennsylvania Ave are named; the south end is named (just north of Cesar Chavez St); the north end is The Portal's structure in the railyard (layer A). The turn from 7th St into Pennsylvania Ave isn't worded, and the short alternative's bore curves "under private property" (below). Check the centerlines |
| **Mid-length** (B1 single bore, B2 twin bores) | "This alternative would provide a tunneled rail alignment (either single bore or twin bores) from the Downtown Rail Extension to a point immediately north of the existing 22nd Street Caltrain Station." B2's southbound drive "curves southeast under private property to a termination point at or near a new portal adjacent to the existing southern portal of Caltrain Tunnel 1, just north of the 22nd Street Station." B1: "This alternative would allow continued use of the 22nd Street Station, with some modifications." `[sfcta-pax-initiation-report-2022]` | As the long alternative | About 6,300 ft *(paraphrase)* | **Partly.** It ends at a station and a tunnel portal (both on today's track in OSM and GTFS), not at a cross street |
| **Short** (C) | Northbound stays in the existing Caltrain corridor *(paraphrase)*. "The 26-foot-OD southbound (westerly) tunnel would be excavated by a single TBM from north to south along 7th Street and Pennsylvania Avenue, curving under private property and terminating at a new portal near the existing Caltrain Tunnel 1 south portal" `[sfcta-pax-initiation-report-2022]` | As above | About 5,600 ft *(paraphrase)* | **Partly**, as the mid-length one |

**Conflicting portal wording, unattributed to a variant** (all *(paraphrase)* unless quoted):
- New portals "near the existing Caltrain Tunnel 2 portals just north of Cesar Chavez", for the
  mid-length and short options.
- Another short-option description has northbound trains in the active Tunnel 2 and southbound in a
  rehabilitated abandoned Tunnel 2, tying in "near Cesar Chavez Street just south of the existing
  portals".
- Trains "routed into a new tunnel portal near 25th Street and Pennsylvania Avenue, and then stay in
  that new tunnel to the Fourth and Townsend station". The configuration this belongs to isn't
  clear.
- A northbound tie-in at Tunnel 1's north portal "near Mariposa Street", from one draft.
- The recommended alignment from the earlier Rail Alignment and Benefits study runs about 1.6 miles
  from the railyard "down 7th Street and Pennsylvania Avenue" to the surface tracks near Cesar
  Chavez. The signed report calls it a single bore and the memo a twin tunnel.

**Public comment, not official** `[new: sfcta-pax-pir-public-comment-2022-07-12]`: an "Alternative B3"
would tie into existing tracks north of the Jerrold bridge with a 23rd Street portal
*(paraphrase)*, "flaring the abandoned tunnel entering the PAX twin-bore tunnels immediately north
of the 23rd street overpass".

### Status and plans since the first pass (all [srch])

- **Bridging Study:** "In October 2025, we initiated the procurement process to identify a planning
  and engineering team to lead the study." `[sfcta-annual-report-2025]` It had been delayed "to
  enable the study to build on other rail planning efforts, including the Railyards Preliminary
  Business Case" `[sfcta-budget-work-program-memo-2025-04]`. No 2026 report or schedule was seen.
- **Funding line:** Prop L has a "Caltrain Downtown Extension and Pennsylvania Avenue Alignment"
  5YPP *(the name as seen; the January 2026 memo reprograms within it for The Portal)*
  `[sfcta-portal-fy2026-memo-2026-01]`.
- **In regional documents:**
  - SFCTA's 2021 letter on the draft Plan Bay Area 2050: "This future project, known as the
    Pennsylvania Avenue Extension, will avoid conflicts with 16th Street, a major east-west travel
    corridor serving Mission Bay." `[new: sfcta-comments-pba2050-2021-07-20]`
  - MTC's 2023 endorsement list names "Pennsylvania Avenue Extension Grade Separation (City and
    County of San Francisco)" `[new: mtc-bil-regional-endorsement-list-2023]`.
  - No PAX line item was seen in Plan Bay Area 2050+. Its regional grade-separation program,
    25-T11-174 ($5.8 billion), covers future urban-core grade separations that also connect
    high-speed rail; whether PAX falls under it isn't stated *(paraphrase)*
    `[pba2050plus-project-list-2026-03]`.
- **Link21's "RR to Millbrae" concept** includes "the planned Pennsylvania Avenue Extension"
  (section 5).

## 7. SFTP 2050+: adopted in 2026?

### Documents

| Id | Title | Publisher | Date | URL |
|---|---|---|---|---|
| `[new: sfcta-sftp-project-page]` | San Francisco Transportation Plan (project page) | SFCTA | undated | https://www.sfcta.org/projects/san-francisco-transportation-plan |
| `[new: sfcta-blog-sftp-feedback-2026-04]` | Give Your Feedback on the Future of Transportation in San Francisco | SFCTA | 2026-04 | https://www.sfcta.org/blogs/give-your-feedback-future-transportation-san-francisco |
| `[new: sfcta-cac-2026-04-22]` | SFCTA Community Advisory Committee (meeting page) | SFCTA | 2026-04-22 (the tool's match) | https://www.sfcta.org/events/sfcta-community-advisory-committee-24 |
| `[new: sfcta-board-packet-2026-05-19]` | Transportation Authority Board packet | SFCTA | 2026-05-19 | https://www.sfcta.org/sites/default/files/2026-05/SFCTA_Board_PACKET_2026-05-19.pdf |
| `[new: sfcta-events-listing]` | Meetings, Agendas & Events | SFCTA | undated (seen 2026-10-17) | https://www.sfcta.org/events |
| `[sfcta-sftp-2050-plus-board-2025-05-20]` | San Francisco Transportation Plan 2050+ (Board item 9 presentation) | SFCTA | 2025-05-20 | https://www.sfcta.org/sites/default/files/2025-05/SFCTA_Board_ITEM9_SanFranciscoTransportationPlan2050+UpdatePRESENTATION_2025-05-20v2_0.pdf |
| `[sfcta-annual-report-2025]` | 2025 Annual Report | SFCTA | 2026-01-27 | as in section 6 |

### Findings (all [srch])

- **No adoption was found** in about ten searches. No Board agenda item, resolution or blog post adopting
  SFTP 2050+ appeared. *(open)*
- **The latest schedule** `[new: sfcta-sftp-project-page]`: Spring 2026, the second round of outreach;
  "Summer 2026 Draft Plan"; "Fall 2026 Final Plan". It also lists an "April 14, 2026 Transportation
  Authority Board Presentation (PDF)", whose content wasn't seen.
  - Earlier targets have slipped. They were "early 2026" or spring 2026 (the 2025 annual report) and
    "Summer 2026" adoption (the April 2025 budget memo) *(paraphrase)*.
  - The update "incorporates PBA 2050+ revisions to projected population growth and reduced
    revenues and updates modeling to incorporate post-pandemic travel behaviors".
- **Round 2, April 2026** `[new: sfcta-blog-sftp-feedback-2026-04]`:
  - "This phase shares initial findings from the financially constrained long-range transportation
    Investment Plan and a proposed Vision Plan, which includes investments enabled by any new
    revenues generated in the future."
  - The Investment Plan puts transit operations and state of good repair first, and some earlier
    priorities moved to the Vision Plan because of lower revenues *(paraphrase)*.
  - Town halls were on April 18 and 23, 2026 *(paraphrase)*.
- **Committee:** the CAC agenda carried "San Francisco Transportation Plan 2050+ and West Side Network
  Study Update - INFORMATION", with presentations dated 2026-04-22 `[new: sfcta-cac-2026-04-22]`.
- **A next edition is budgeted.** The May 19, 2026 Board packet's budget table has an "SFTP 2055"
  line of $700,000, "Programmed", beside an "SFTP 2050+" line of $700,000, "Appropriated"
  *(paraphrase, apart from the quoted words)* `[new: sfcta-board-packet-2026-05-19]`.
- **The Board's October calendar:** "Transportation Authority Board. (Canceled). Tuesday, October 27."
  `[new: sfcta-events-listing]`
  - An undated SFCTA blog post, "San Francisco's Transportation Plan," says "The Transportation
    Authority will consider adopting the San Francisco Transportation Plan later this year", next to
    an October 6 virtual town hall. Its year wasn't seen, so it isn't used here.
- **The major transit project list.** Nothing newer was seen than the May 2025 list in
  `san-francisco.md`: The Portal, BART/Muni Core Capacity, Muni Reliability and Efficiency,
  Geary/19th Subway, Central Subway Extension `[sfcta-sftp-2050-plus-board-2025-05-20]`.
  - That deck also gives SFTP 2050's Major Transit Projects as $10.37 billion *(paraphrase)*.
  - The 2025 annual report: "advancing The Portal, Geary/19th Subway and Regional Connections Study,
    and planning for a Bayview Caltrain station" `[sfcta-annual-report-2025]`.

## Seen in passing

- **The Central Subway North Beach Extension Study (2026).** One result read SFMTA's project page
  as saying the study will compare a one-station extension with a multi-station extension to
  Fisherman's Wharf and beyond, without deciding stations or alignments *(paraphrase)*
  `[sfmta-central-subway-extension]` [srch]. `san-francisco.md` describes it as a one-station study.
  Check the page.

## For Matthew: what still needs a browser

1. **The ConnectSF Transit Strategy PDF** (connectsf.org/studies/, about 28 MB): the 13 corridors,
   any Five-Minute Network route list, and the rail concepts' maps.
2. **The Subway Vision report**, from page 22 on, and Figures 15-17 (Network A and Network B).
3. **SPUR's *Nine Ideas* report**, from its landing page: the nine ideas and any map. Also check the
   Oakland report's numbering (Idea 2 or Idea 9).
4. **Seamless Bay Area's Vision Map image:** tracing it is still the only way to get its lines (and
   the license question from `spur-seamless.md` still applies).
5. **Link21:** the Stage Gate 2 Summary Report and the Concepts page's example maps, from the
   Document Library.
6. **The PAX Project Initiation Report's figures,** to settle which portal goes with which
   variant, and how the bore passes from 7th St to Pennsylvania Ave.
7. **The SFCTA Board's agendas from November 2026,** for an SFTP 2050+ adoption item.
8. **The February 24, 2026 SFCTA packet,** to confirm the 22 Fillmore and T Third segments.

## Proposed `data/sources.json` entries

Every id and URL below was checked against `data/sources.json` on 2026-10-17, and none is there.
Quotes that this pass adds to documents already in `data/sources.json` are cited above by their
existing ids. Those entries' notes could be extended by hand; this file doesn't touch them.

```json
[
  {"id": "sfcta-connectsf-project-page", "title": "ConnectSF (project page)", "publisher": "San Francisco County Transportation Authority", "type": "official", "url": "https://www.sfcta.org/projects/connectsf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Undated. The Transit Strategy's four recommendations: \"Make the system work better with aggressive maintenance and restoration.\", \"Deliver a five-minute network for reliable transit service citywide.\", \"Increase speed, reliability, and capacity for a modern rail system.\", \"Build rail where bus service is not sufficient to meet demand.\" Links interactive maps for the 2050 Statement of Needs (paraphrase)."},
  {"id": "sfcta-blog-transit-investment-strategy-feedback-2021", "title": "Give feedback on San Francisco's Transit Investment Strategy", "publisher": "San Francisco County Transportation Authority", "date": "2021", "type": "official", "url": "https://www.sfcta.org/blogs/give-feedback-san-franciscos-transit-investment-strategy", "accessed": "2026-10-17", "notes": "Seen in web search results only. Feedback due Friday, May 7 (paraphrase). \"Deliver a five-minute network for reliable transit service citywide.\"; \"Increase speed, reliability, and capacity for a modern rail system.\""},
  {"id": "sfcta-board-minutes-2021-04-27", "title": "Draft minutes, Transportation Authority Board meeting of April 27, 2021", "publisher": "San Francisco County Transportation Authority", "date": "2021-04-27", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2021-05/04%20April%2027%20Mins.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Item: ConnectSF Transit Strategy Update (information). \"no decisions have been made on which routes will be in the 5-minute network\"; connector routes \"not as frequent as the 5-minute network, but still very frequent, likely 10 minutes or better\"; \"the next step on the westside subway is a more focused planning study\"."},
  {"id": "sfcta-connectsf-transit-slides-2021-03-23", "title": "Statement of Needs: Challenges to Making the ConnectSF Vision a Reality (ConnectSF transit slides to the Transportation Authority Board)", "publisher": "San Francisco County Transportation Authority", "date": "2021-03-23", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2021-03/Transit%20Slides%20to%20TA%20Board%202021%200323%20v6.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only; date from the file name. The rail piece is framed as renewing aging infrastructure and expanding the systems that keep trains moving (paraphrase). The same title appears on the April 27, 2021 presentation (https://www.sfcta.org/sites/default/files/2021-04/Item%2011%20-%20Connect%20SF%20%20Transit%20PRESENTATION.pdf)."},
  {"id": "sfplanning-cpc-connectsf-transit-packet", "title": "Statement of Needs: Challenges to Making the ConnectSF Vision a Reality (Planning Commission packet, item 11)", "publisher": "San Francisco Planning", "type": "official", "url": "https://commissions.sfplanning.org/cpcpackets/11.ConnectSF.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. Its recommendations are the Five-Minute Network and Rail Expansion; Five-Minute Network corridors would likely include Rapid Network routes, other routes with enough demand for frequent service, and routes where transit growth is expected (both paraphrase)."},
  {"id": "sfmta-board-workshop-2021-reference", "title": "2021 Board of Directors Workshop Reference Materials", "publisher": "San Francisco Municipal Transportation Agency", "date": "2021", "type": "official", "url": "https://www.sfmta.com/about-us/sfmta-board-directors/2021-board-directors-workshop", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"Recommended investments include: 1) bus priority investments across the City to improve speeds and reliability while reducing operating costs; 2) improvements to existing surface rail and subway infrastructure ... and 3) in the few locations where surface transit cannot provide enough capacity, new underground rail such as a Geary subway, linking to regional investments such as a future new transbay rail crossing.\""},
  {"id": "sfmta-board-2021-07-20-item-18", "title": "7-20-21 MTAB Item 18 ConnectSF Investment Strategies", "publisher": "San Francisco Municipal Transportation Agency", "date": "2021-07-20", "type": "official", "url": "https://www.sfmta.com/reports/7-20-21-mtab-item-18-connectsf-investment-strategies", "accessed": "2026-10-17", "notes": "Seen in web search results only; the slides' content wasn't seen. The minutes (https://www.sfmta.com/media/27823/download, per the search tool) record the item as continued to a future date (paraphrase)."},
  {"id": "sfmta-central-subway-faq", "title": "Central Subway Project Frequently Asked Questions", "publisher": "San Francisco Municipal Transportation Agency", "type": "official", "url": "https://www.sfmta.com/project-updates/central-subway-project-frequently-asked-questions", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. The ConnectSF Transit Strategy, published in December 2021, identifies a future subway route to be studied along the Geary/19th Ave corridor, which could connect to Link21 (paraphrase)."},
  {"id": "sfcta-sftp-2050-appendix-a", "title": "SFTP 2050 Appendix A: SFTP 2050 Investment Plan Development", "publisher": "San Francisco County Transportation Authority", "date": "2022-12-01", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-12/SFCTA_SFTP-2050_Appendix-A-Plan-Development-Process_2022-12-01.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"The TCS conducted a comparative analysis of representative transit concepts to understand the benefits that might be achieved through alternative major investments in each of the 13 ConnectSF transportation corridors\"; the concepts \"were intended to direct the commencement of corridor planning studies, rather than as formal project proposals\". The 13 corridor names weren't seen."},
  {"id": "sfcta-prop-l-5ypp-cac-2024-01-24", "title": "Adopt Four Prop L 5YPPs and Amend Strategic Plan Baseline (CAC presentation)", "publisher": "San Francisco County Transportation Authority", "date": "2024-01-24", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-01/SFCTA_CAC_2023PropL5YPPPRESENTATION_2024-01-24.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Muni Forward Five-Minute Network corridors: \"Group 2 corridors (potential additional corridors if funding allows)\", including the 7, 8, 9 and 30 and \"14 Mission (south of Randall Street)\" (list partly paraphrase)."},
  {"id": "sfcta-board-packet-2024-10-08", "title": "Transportation Authority Board packet, October 8, 2024", "publisher": "San Francisco County Transportation Authority", "date": "2024-10-08", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-10/SFCTA_Board_PACKET_2024-10-08_1.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Five-Minute Network: \"a set of high-ridership corridors with capacity to support combined five-minute headways or better, that serve major regional destinations and transit hubs\"."},
  {"id": "sfcta-prop-l-allocations-memo-2024-10-22", "title": "Prop L Allocations Memo (Board item 6)", "publisher": "San Francisco County Transportation Authority", "date": "2024-10-22", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-10/SFCTA_Board_Item6_PropLAllocationsMEMO_2024-10-22.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"This project will focus on the 1 California, 22 Fillmore, T Third surface route, and 28 19th Avenue, with additional corridors if there are cost savings to support this. Group 2 corridors include: 7 Haight-Noriega, 8 Bayshore, 9 San Bruno, 14 Mission, 30 Stockton, 43 Masonic and 44 O'Shaughnessy.\" \"Scope for all corridors is to be determined during this planning and outreach process.\""},
  {"id": "sfcta-board-packet-2026-02-24", "title": "Transportation Authority Board packet, February 24, 2026", "publisher": "San Francisco County Transportation Authority", "date": "2026-02-24", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2026-02/SFCTA_Board_PACKET_2026-02-24.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Muni Forward Five-Minute Network Corridor Quick-Build, $1,549,000 of Prop L: \"This project includes approximately 10-15 intersections on each of the four project corridors identified as priorities in the sales tax funded Muni Forward Five-Minute Network Corridor work.\" Segments seen once (paraphrase): 22 Fillmore, Fillmore Street between Marina Boulevard and Herman Street; T Third, Townsend to the Bayshore terminal; 1 California, full route."},
  {"id": "sfcta-blog-muni-forward-quick-build-2026", "title": "Transportation Authority Board Approves $1.5 Million for Muni Forward Quick-Build Improvements", "publisher": "San Francisco County Transportation Authority", "date": "2026-02", "type": "official", "url": "https://www.sfcta.org/blogs/transportation-authority-board-approves-15-million-muni-forward-quick-build-improvements", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"28 19th Avenue (Lincoln Avenue to Junipero Serra Boulevard)\" (another result wrote Lincoln Way); \"The Transportation Authority Board gave final approval at the February 24 meeting.\" Open for use by December 2028 (paraphrase)."},
  {"id": "sfcta-great-highway-evaluation-2021-07", "title": "Great Highway Concepts Evaluation Report, Final Report", "publisher": "San Francisco County Transportation Authority", "date": "2021-07-13", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2021-07/SFCTA_Great-Highway-Evaluation-Report_2021-07-13_FINAL.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"For ConnectSF, both Sunset Blvd and 19th Ave are part of the proposed 5-Minute network, which is intended to provide fast, frequent, and prioritized transit service\"."},
  {"id": "sfcta-d4-mobility-study-2021-09", "title": "District 4 Mobility Study, Final Report", "publisher": "San Francisco County Transportation Authority", "date": "2021-09-17", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2021-09/SFCTA-D4_Mobility_Study_Report_2021-09-17_FINAL.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Same sentence as the Great Highway report: Sunset Blvd and 19th Ave \"are part of the proposed 5-Minute network\", which \"is intended to provide fast, frequent, and prioritized transit service, with pedestrian safety and access enhancements\"."},
  {"id": "sfmta-muni-forward-update-2023-11-21", "title": "Muni Forward Update, SFMTA Board of Directors (slides)", "publisher": "San Francisco Municipal Transportation Agency", "date": "2023-11-21", "type": "official", "url": "https://www.sfmta.com/sites/default/files/reports-and-documents/2023/11/11-21-23_mtab_item_12_muni_forward_update_-_slide_presentation.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only, as fragmented text. An exact-phrase search for \"about a dozen corridors that carry two-thirds of all Muni ridership\" matched this deck; another result attributed similar words to an SFCTA memo. No list of the corridors seen."},
  {"id": "sfmta-muni-forward-page", "title": "Muni Forward (project page)", "publisher": "San Francisco Municipal Transportation Agency", "type": "official", "url": "https://www.sfmta.com/projects/muni-forward", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. \"Our work focuses on the busiest lines that carry over 80% of Muni riders.\" \"ConnectSF defines a Five-Minute Network where service would be most frequent.\""},
  {"id": "sfmta-subway-vision-emsc-slides-2016-10-26", "title": "San Francisco Subway Vision (slides, EMSC)", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016-10-26", "type": "official", "url": "https://www.sfmta.com/sites/default/files/agendaitems/2016/10-26-16%20EMSC%20Subway%20Vision%20-%20slide%20presentation.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Under \"Corridors for Evaluation\" the extracted text reads only \"Cross Town – Connectors - Demand Based\"; corridor names not in the text."},
  {"id": "spur-bigger-picture-series-2021", "title": "The Bigger Picture (series page)", "publisher": "SPUR", "date": "2021-02-18", "type": "primary_document", "url": "https://www.spur.org/publications/spur-report/2021-02-18/bigger-picture", "accessed": "2026-10-17", "notes": "Seen in web search results only. \"these ideas are not policy prescriptions but possibilities\"; SPUR partnered with AECOM (paraphrase). Series includes Nine Ideas for a Connected San Francisco (2021-10-06)."},
  {"id": "seamless-vision-map-overview", "title": "Vision Map (overview page)", "publisher": "Seamless Bay Area", "type": "primary_document", "url": "https://www.seamlessbayarea.org/vision-map-overview", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. The map \"builds on numerous existing transportation plans and input from stakeholders, but is also highly aspirational\"; it shows transit planned and operated as a unified network (paraphrase). No line names in the text."},
  {"id": "link21-concepts-memo-kornblatt", "title": "Draft memorandum from Helene Kornblatt (PMC) to Don Dean (BART) on Link21 concepts under consideration", "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)", "type": "official", "url": "https://link21program.org/en/media/625/download?inline=", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated draft. Concept F: \"a Regional Rail transbay crossing that would connect the Salesforce Transit Center in San Francisco to Oakland City Center via an alignment through Alameda\". Ridership did not support Regional Rail infrastructure north of Richmond to Hercules (paraphrase); Link21 \"would not preclude the planned intercity service station in Hercules or future infrastructure improvements to support Urban | Metro service as separate projects by others\"."},
  {"id": "link21-document-library", "title": "Document Library", "publisher": "Link21 Program (BART and Capitol Corridor Joint Powers Authority)", "type": "official", "url": "https://link21program.org/en/about/document-library", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. Lists \"Appendix C Environmental Constraints and Opportunities Mapbooks\" by subarea (Transbay Crossing, Oakland to Richmond, San Jose to Gilroy, among others) and a \"Stage Gate 2 Summary Report\" (content not seen)."},
  {"id": "sfcta-pax-pir-memo-2022-07-12", "title": "Pennsylvania Avenue Extension Project Initiation Report (Board memo and draft resolution)", "publisher": "San Francisco County Transportation Authority", "date": "2022-07-12", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportMEMO_2022-07-12.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. PAX connects to the DTX in \"a cut-and-cover structure built as part of DTX\" at the 4th and King railyard (paraphrase around the quote); the recommended alignment is a 1.6-mile twin tunnel, where the signed report says single bore (paraphrase)."},
  {"id": "sfcta-pax-pir-presentation-2022-07-12", "title": "Pennsylvania Avenue Extension (PAX) Project Initiation Report, Agenda Item 8 (presentation)", "publisher": "San Francisco County Transportation Authority", "date": "2022-07-12", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPRESENTATION_2022-07-12.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Tunnel lengths about 7,800 ft (long), 6,300 ft (mid-length) and 5,600 ft (short, Alternative C) (paraphrase)."},
  {"id": "sfcta-pax-pir-public-comment-2022-07-12", "title": "Public comment on the PAX Project Initiation Report (Board item)", "publisher": "Members of the public, published in an SFCTA packet", "date": "2022-07-12", "type": "primary_document", "url": "https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPUBLICCOMMENT_2022-07-12.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Not an official finding. Proposes an Alternative B3 tying into existing tracks north of the Jerrold bridge with a 23rd Street portal (paraphrase), \"flaring the abandoned tunnel entering the PAX twin-bore tunnels immediately north of the 23rd street overpass\"."},
  {"id": "sfcta-comments-pba2050-2021-07-20", "title": "Comments on the Draft Plan Bay Area 2050 (letter to Matt Maloney, MTC)", "publisher": "San Francisco County Transportation Authority", "date": "2021-07-20", "type": "official", "url": "https://files.mtc.ca.gov/pdf/pba_comments/2021/San_Francisco_County_Transportation_Authority_7-20-21.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only; hosted by MTC. \"This future project, known as the Pennsylvania Avenue Extension, will avoid conflicts with 16th Street, a major east-west travel corridor serving Mission Bay.\""},
  {"id": "mtc-bil-regional-endorsement-list-2023", "title": "Agenda Item 3b: Regional Endorsement List (Bipartisan Infrastructure Law)", "publisher": "Metropolitan Transportation Commission", "date": "2023", "type": "official", "url": "https://mtc.ca.gov/sites/default/files/meetings/attachments/5837/11b_23_1324_Regional_Endorsement_List_4.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only; year as the search tool gave it. Lists \"Pennsylvania Avenue Extension Grade Separation (City and County of San Francisco)\", not on the CPUC grade-separation priority list but \"met other criteria and still provides a safety benefit\"."},
  {"id": "sfcta-sftp-project-page", "title": "San Francisco Transportation Plan (project page)", "publisher": "San Francisco County Transportation Authority", "type": "official", "url": "https://www.sfcta.org/projects/san-francisco-transportation-plan", "accessed": "2026-10-17", "notes": "Seen in web search results only; undated. SFTP 2050+ timeline: Spring 2026 Round 2 outreach, \"Summer 2026 Draft Plan\", \"Fall 2026 Final Plan\"; lists an \"April 14, 2026 Transportation Authority Board Presentation (PDF)\". The update \"incorporates PBA 2050+ revisions to projected population growth and reduced revenues and updates modeling to incorporate post-pandemic travel behaviors\". No adoption seen."},
  {"id": "sfcta-blog-sftp-feedback-2026-04", "title": "Give Your Feedback on the Future of Transportation in San Francisco", "publisher": "San Francisco County Transportation Authority", "date": "2026-04", "type": "official", "url": "https://www.sfcta.org/blogs/give-your-feedback-future-transportation-san-francisco", "accessed": "2026-10-17", "notes": "Seen in web search results only. Round 2 outreach for SFTP 2050+ launched April 14, 2026: \"This phase shares initial findings from the financially constrained long-range transportation Investment Plan and a proposed Vision Plan, which includes investments enabled by any new revenues generated in the future.\" Some priorities moved to the Vision Plan because of lower revenues (paraphrase)."},
  {"id": "sfcta-cac-2026-04-22", "title": "SFCTA Community Advisory Committee (meeting page)", "publisher": "San Francisco County Transportation Authority", "date": "2026-04-22", "type": "official", "url": "https://www.sfcta.org/events/sfcta-community-advisory-committee-24", "accessed": "2026-10-17", "notes": "Seen in web search results only; the match of this page to the April 22, 2026 meeting is the search tool's. Agenda item \"San Francisco Transportation Plan 2050+ and West Side Network Study Update - INFORMATION\"."},
  {"id": "sfcta-board-packet-2026-05-19", "title": "Transportation Authority Board packet, May 19, 2026", "publisher": "San Francisco County Transportation Authority", "date": "2026-05-19", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2026-05/SFCTA_Board_PACKET_2026-05-19.pdf", "accessed": "2026-10-17", "notes": "Seen in web search results only. Budget table: \"SFTP 2055\", $700,000, \"Programmed\"; \"SFTP 2050+\", $700,000, \"Appropriated\" (layout paraphrase)."},
  {"id": "sfcta-events-listing", "title": "Meetings, Agendas & Events", "publisher": "San Francisco County Transportation Authority", "type": "official", "url": "https://www.sfcta.org/events", "accessed": "2026-10-17", "notes": "Seen in web search results only; a live listing. \"Transportation Authority Board. (Canceled). Tuesday, October 27.\" (2026)."}
]
```
