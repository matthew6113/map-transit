# Research: San Francisco's own rail proposals (ConnectSF, the Subway Vision, the Geary/19th Avenue subway)

Oct 16, 2026. This is research for the Phase 4 reference layer (`docs/SPEC.md`, phase 4;
`docs/SCHEMA.md`, "Ideal network"). It covers the proposals San Francisco's own agencies have made.
It edits no data and recommends nothing, because the ideal network is Matthew's to design.

## How the pass worked, and its limits

- **No agency page was opened.** From this container sfcta.org, connectsf.org and sfmta.com time out
  (checked again today), and web.archive.org is refused.
- **Every fact comes from WebSearch,** limited to the publisher's own domains: sfcta.org,
  connectsf.org, sfmta.com, planbayarea.org, mtc.ca.gov and sfbos.archive.sf.gov. Every row is
  therefore `[srch]`, meaning it is what the search tool's summary said about a page, not a reading
  of the page.
  - Words in quotation marks are strings that the summary presented as the page's own text. Quote
    boundaries aren't always marked, so a quote may be lightly trimmed.
  - Anything else is the summary's paraphrase and is marked *(paraphrase)*.
  - Which URL a statement came from is the tool's attribution. Where the attribution was unclear,
    the row says so.
- **Statement dates** are the dates the documents carry. Pages without a date are marked "undated".
- **The search budget ran out.** The pass reached the limit of 200 searches that every agent in this
  turn shares. The following were not reached and are marked *open*:
  - the ConnectSF Transit Strategy's own project list, corridor list and maps;
  - the Subway Vision's list of candidate corridors (its chapter 4);
  - the SFTP 2050 project tables;
  - whether SFTP 2050+ has been adopted.
- **Two strings were seen once and not found again** by a later search. Each is flagged where it's
  used.
- **Geometry.** Anything rebuilt from text would be `geometry_confidence: approximate`, drawn
  dashed. "Rebuildable" below means the text names a street and the points where the line starts and
  ends on it. "Corridor only" means the text names an area or a street but not where the line runs.

## At a glance

| Proposal | Who and when | Proposed `proposal_status` | Geometry from the text |
|---|---|---|---|
| ConnectSF: the Transit Strategy and SFTP 2050 | SFCTA, SFMTA and SF Planning. The Transit Strategy is dated Dec 2021 and SFTP 2050 Dec 2022 | `adopted` for SFTP 2050 (Dec 13, 2022). No vote adopting the Transit Strategy itself was found | Rail items are named, but only as corridors. The routes in the Five-Minute Network weren't seen |
| Muni Subway Vision, with its follow-on, the Muni Subway Expansion Project | SFCTA, SFMTA and SF Planning. Outreach in 2016; report dated June 9, 2017 | `superseded` | The Vision gives only a "general orientation". The M Ocean View subway is described as running "under the middle of 19th Avenue" |
| Geary/19th Avenue subway | SFCTA, with SFMTA and SF Planning. Strategic Case dated May 2026; the Board adopted the study report in June 2026 | `study`. Adopted plans fund it only as studies | A corridor along Geary Blvd and 19th Ave, part of which can be rebuilt. The turn south, the downtown routing and the stations are all open |
| Central Subway extension | SFMTA: a concept study in 2014-15 and a North Beach study in 2026 | `study` | Columbus Ave, Powell St and Beach St are named, but where the line leaves the tunnel isn't in the text |
| Pennsylvania Avenue Extension (PAX) | SFCTA: a project initiation report in 2022 | `study` | The text says "along Seventh Street and Pennsylvania Avenue" but gives no portal locations |
| Muni Metro Capacity Study and core capacity | SFMTA; final report Dec 2, 2025 | `study` (SFTP 2050 funds the modernization program) | No new line, except infrastructure for a J Church extension to Stonestown, which is a corridor only |
| New Bayview Caltrain station | SFCTA; recommendation in 2026 | `study` | A point at Oakdale Ave on today's Caltrain line |

Suggested `proposal_id`s for `ideal/reference/`:

- `connectsf-transit-strategy` (2021)
- `sf-subway-vision` (2017)
- `sfcta-geary-19th-subway` (2026)
- `sfmta-central-subway-extension` (2015 and 2026)
- `sfcta-pax` (2022)
- `sfmta-muni-metro-capacity` (2025)
- `sfcta-bayview-caltrain-station` (2026)

## 1. ConnectSF: the Transit Strategy (2021) and the San Francisco Transportation Plan 2050 (2022)

### Documents

| Title | Publisher | Date | URL | `type` | How seen |
|---|---|---|---|---|---|
| Transit Strategy (listed on the "Resources and Media" page) | ConnectSF (SFCTA, SFMTA, SF Planning) | Dec 2021 | https://connectsf.org/about/resources-and-media/. The download is on https://connectsf.org/studies/ (about 28 MB); the file's own URL wasn't shown | official | [srch], the listing only. The PDF wasn't reached |
| "Investing in San Francisco's Transit" (the Transit Strategy's page) | ConnectSF | undated | https://connectsf.org/transit-strategy/ | official | [srch] |
| "San Francisco Transportation Plan" | ConnectSF | undated | https://connectsf.org/san-francisco-transportation-plan/ | official | [srch] |
| "Connect SF - A Shared Vision for Transit in San Francisco" (blog) | SFMTA | undated (around the 2021 launch) | https://www.sfmta.com/blog/connect-sf-shared-vision-transit-san-francisco | official | [srch] |
| "Fast and Convenient Transit" | SFMTA | undated | https://www.sfmta.com/fast-and-convenient-transit | official | [srch] |
| "The SFMTA and ConnectSF Unveil Bold Vision for San Francisco Transit" (press release) | SFMTA | 2021-04-19 | https://www.sfmta.com/press-releases/sfmta-and-connectsf-unveil-bold-vision-san-francisco-transit | official | [srch] |
| San Francisco Transportation Plan 2050, final report | SFCTA | Dec 2022 (file dated 2022-12-13) | https://www.sfcta.org/sites/default/files/2023-01/SFCTA_SFTP-2050-Report-FINAL_2022-12-13_0.pdf | official | [srch] |
| "Board Adopts San Francisco Transportation Plan 2050" (blog) | SFCTA | Dec 2022 | https://www.sfcta.org/blogs/board-adopts-san-francisco-transportation-plan-2050 | official | [srch] |
| SFTP 2050, Appendix C: SF-CHAMP analysis methodology memo | SFCTA | 2022-12-01 | https://www.sfcta.org/sites/default/files/2022-12/SFCTA_SFTP-2050_Appendix-C-SF-CHAMP-Analysis-Methodology-Memo_2022-12-01.pdf | official | [srch] |
| San Francisco Transportation Plan 2050+ (Board item 9 presentation) | SFCTA | 2025-05-20 | https://www.sfcta.org/sites/default/files/2025-05/SFCTA_Board_ITEM9_SanFranciscoTransportationPlan2050+UpdatePRESENTATION_2025-05-20v2_0.pdf | official | [srch] |
| Congestion Management Program 2025 | SFCTA | 2025 | https://www.sfcta.org/reports/congestion-management-program-2025 | official | [srch] |
| 2025 Annual Report (Board item 6) | SFCTA | 2026-01-27 | https://www.sfcta.org/sites/default/files/2026-01/SFCTA_Board_Item6_AnnualReportREPORT_2026-01-27_0.pdf | official | [srch] |

### Status

**Proposed: `adopted` for SFTP 2050.** The Transit Strategy's own status is *open*.

- **SFTP 2050 was adopted.** The SFCTA blog (Dec 2022) says "the Transportation Authority Board
  adopted the San Francisco Transportation Plan, the blueprint for the city's transportation system
  development and investment over the next 30 years" [srch].
  - The Board's Dec 13, 2022 agenda lists "Adopt the San Francisco Transportation Plan 2050" as
    Resolution R23-23 [srch]. The tool linked https://www.sfcta.org/events/transportation-authority-board-58
    for it, so the mapping to that page is the tool's.
  - The 2025 annual report repeats it: "In December 2022, the Transportation Authority Board adopted
    the San Francisco Transportation Plan 2050 (SFTP 2050), consistent with the MTC's Plan Bay Area
    2050" [srch].
- **No vote adopting the Transit Strategy was found** *(open)*. SFMTA Board actions that rely on it
  were found, including an October 2021 resolution approving consultant contracts for projects that
  "ConnectSF's Transit Investment Strategy" prioritized *(paraphrase)* [srch].
- **SFTP 2050 carries the strategy forward.** ConnectSF's page: "The SFTP draws from previous phases
  of ConnectSF, including the Transit Strategy and Streets and Freeways Strategy, community input,
  San Francisco's 2021 Climate Action Plan, and multiple neighborhood, citywide, and regional
  transportation plans" [srch].
- **SFTP 2050+, the update, may not be adopted yet.**
  - It "will be published in Summer 2026" (Congestion Management Program 2025) [srch], and it is "a
    limited and focused update that will incorporate PBA 2050+ revisions to revenues, including
    strategies to address the transit fiscal cliff" [srch]. The tool placed that phrase among the 2025
    Congestion Management Program and the 2025 annual report.
  - The 2025 annual report expected the final report to reach the Board in early or spring 2026
    *(paraphrase; the snippet was fragmentary)* [srch].
  - No adoption was found *(open)*.
- **The regional plan, Plan Bay Area 2050+, was adopted in March 2026.** See section 5.

### What it would build

The Transit Strategy's four goals were seen in these forms:

- **On ConnectSF's page:** "Make the system work better. Deliver a five-minute network. Renew and
  modernize our rail system, and Build more rail to San Francisco's busiest places" [srch]. This was
  seen once; a later search on the page's title didn't find it again.
- **In SFMTA's blog:** "With targeted investments in our street infrastructure, we will deliver a
  Five-Minute Network" and "By renewing and modernizing our rail system" [srch].
- **On ConnectSF's studies page:** "The Transit Strategy lays the groundwork for building major, high
  capacity transit projects in San Francisco. It develops and prioritizes initial concepts for
  subways, bus rapid transit lines, and other improvements to create a rapid, reliable transit
  network." [srch]
- **On SFMTA's "Fast and Convenient Transit" page:** "Build new rail projects in places where no
  amount of bus improvements will be able to meet the demand" (an exact-phrase match) [srch].

| Element | Mode | As the documents word it | Can the path be rebuilt? |
|---|---|---|---|
| Geary/19th Avenue subway | Subway; the technology is open | "This includes a new subway along Geary and 19th Avenue, an extension of the Central Subway, and a new Caltrain station in the Bayview." (SFMTA blog) [srch]. The "Fast and Convenient Transit" page names Geary Boulevard and 19th Avenue under the rail heading quoted above *(paraphrase)* [srch] | Corridor only in ConnectSF's texts. For the 2026 study's wording, see section 3 |
| Central Subway extension | Muni Metro subway | "an extension of the Central Subway" (SFMTA blog). The "Fast and Convenient Transit" page names an extension "to Fisherman's Wharf" *(paraphrase)* [srch] | Corridor only. See section 4 |
| New Caltrain station in the Bayview | Caltrain station | "a new Caltrain station in the Bayview" (SFMTA blog) [srch] | A point. See section 4 |
| Five-Minute Network | Bus and rail, with surface transit priority | "Create a fast, frequent network of bus and rail routes that ensure riders never have to wait more than 5 minutes" ("Fast and Convenient Transit") [srch] | The routes weren't seen *(open)*. They are in the Transit Strategy PDF |
| Muni Metro modernization and capacity | Light rail | The strategy "prioritized the need to modernize and expand the capacity of Muni Metro as one of four critical investment areas" *(paraphrase, from the Muni Metro Capacity Study FAQ)*. It recommends a federal Core Capacity grant program *(paraphrase, from the study's page)* [srch] | No new route. See section 4 |
| Not prioritized: putting the M Ocean View underground from West Portal to Parkmerced | | See section 2 | |

SFTP 2050 itself:

- **Its categories.** "Major Transit Projects - capital improvements to improve reliability, speed and
  capacity of local and regional transit systems". "The Investment Plan funds the SFMTA's Muni Metro
  Modernization/ Subway Modernization Program and BART's Core Capacity Program". Both [srch].
- **Regional projects.** "Most are in the early stage of development, with only preliminary cost,
  schedule, scope details, and significant funding gaps. This includes major projects such as
  Link21, which will include a new transbay passenger rail crossing between Oakland and San
  Francisco" [srch].
- **What it funds.** The Investment Plan fully funds the Caltrain Downtown Rail Extension (The Portal)
  *(paraphrase)*. Its "next generation transit" line funds preliminary planning, with room to
  implement projects including the Geary/19th Avenue subway *(paraphrase; the tool cited pages 3-27
  and 3-28)* [srch].
- **A model assumption** (Appendix C): "Muni Rail Core Capacity: Extend N and M Parkmerced Muni Metro
  routes to 3-car train lengths" [srch].
- **How many major projects.** The Geary study counts the subway as one of five major rail and transit
  projects in the Transit Strategy and SFTP 2050. Some SFCTA Board papers call it one of four
  long-term priorities. Both are *(paraphrase)* [srch], and the count is unresolved.

SFTP 2050+ (the presentation of 2025-05-20) lists: "Major Transit Projects: The Portal (Downtown Rail
Extension), BART/Muni Core Capacity Improvements, Muni Reliability and Efficiency Improvements,
Geary/19th Subway, Central Subway Extension" [srch].

**Geometry:** none of the ConnectSF texts seen gives a path for any rail item. They name corridors.

### Maps

- **The Transit Strategy PDF** (about 28 MB, on https://connectsf.org/studies/) wasn't reached.
  Whether it maps the rail items, and on which pages, is *open*.
- **The 2021 StoryMap**, according to the press release, "details improvements we could see in the
  not-too-distant future: a five-minute network, new rail lines across the city, and critical
  infrastructure improvements" [srch]. It is interactive and wasn't seen.
- **The SFTP 2050 final report:** no maps were seen.

### Costs and benefits

- **Revenue.** SFTP 2050's Investment Plan has about $80 billion of expected revenue to 2050
  *(paraphrase)*. Its other tier is "A Vision Plan to guide the allocation of an additional $15
  billion potential new transportation revenues through 2050" [srch].
- **Commitments.** "Most of this revenue (about 85%) is already committed" [srch]. The figures are in
  2020 dollars *(paraphrase)* [srch].
- **Per-item costs.** None were seen in ConnectSF's own documents. For the Geary/19th subway see
  section 3, and for the Central Subway extension see section 4.

### Drawbacks, risks and overlaps

- **Funding.** SFMTA director Jeffrey Tumlin: "Muni's current funding base is broken" (press release,
  Apr 2021) [srch]. SFTP 2050+ is to address "the transit fiscal cliff" (quoted above).
- **Rail against bus.** The strategy reserves new rail for places "where no amount of bus improvements
  will be able to meet the demand". The overlap with Geary bus improvements is in section 3.

## 2. The Muni Subway Vision (2016-17)

### Documents

| Title | Publisher | Date | URL | `type` | How seen |
|---|---|---|---|---|---|
| Ordinance No. 202-15 (File No. 150873), the Subway Master Plan | SF Board of Supervisors | 2015-11 | https://sfbos.archive.sf.gov/ftp/uploadedfiles/bdsupvrs/ordinances15/o0202-15.pdf | official | [srch] |
| "Subway Vision" (project page) | SFCTA | undated | https://www.sfcta.org/projects/subway-vision | official | [srch] |
| *Subway Vision: Shaping our City's Transportation Future* (the report) | SFCTA, SFMTA and SF Planning (ConnectSF) | cover dated 6/9/2017, though the file is named "2016 Subway Vision" | https://sfcta.org/sites/default/files/2019-02/2016%20Subway%20Vision.pdf (copy: https://connectsf.org/wp-content/uploads/2016-Subway-Vision.pdf) | official | [srch] |
| Subway Vision fact sheet | ConnectSF | 2016 | https://connectsf.org/wp-content/uploads/2016/10/Subway.Vision.Fact_.Sheetrev4bd.pdf | official | [srch] |
| "Draw Your Dream Map to Help Shape the Future of Subways in SF" (blog) | SFMTA | 2016-08-18 | https://www.sfmta.com/blog/draw-your-dream-map-help-shape-future-subways-sf | official | [srch] |
| "Visualizing More Subways for San Francisco" (blog, by Bradley Dunn) | SFMTA | 2016-10-18 | https://www.sfmta.com/blog/visualizing-more-subways-san-francisco | official | [srch] |
| "San Francisco Subway Vision", slides (SFMTA Board item 12) | SFMTA | 2016-10-18 | https://www.sfmta.com/sites/default/files/agendaitems/2016/10-18-16%20Item%2012%20Subway%20Vision%20-%20slide%20presentation.pdf | official | [srch] |
| "Subways, Subways & More Subways?" (blog) | SFMTA | 2015-09-08 | https://www.sfmta.com/blog/subways-subways-more-subways | official | [srch] |
| "Muni Subway Expansion Project" (project page) | SFMTA | undated | https://www.sfmta.com/projects/muni-subway-expansion-project | official | [srch] |
| "Muni Subway Expansion Project Summer 2016" | SFMTA | 2016 | https://www.sfmta.com/media/2365/download | official | [srch] |
| 19th Avenue / M Ocean View station board, "Station 2 Rail" | SFMTA | 2016 | https://www.sfmta.com/sites/default/files/projects/2016/Station%202%20Rail.pdf | official | [srch], title only |
| 19th Avenue Transit Study (feasibility of relocating the M Ocean View) | SFCTA | 2014 (Feb) | https://www.sfcta.org/sites/default/files/content/Executive/Meetings/pnp/2014/03/19thave_final_report_v23_low_res.pdf | official | [srch] |
| Prop K sales tax allocation request forms, March 2022 Board action (includes the Muni Metro Core Capacity Study) | SFCTA | 2022-03-08 | https://www.sfcta.org/sites/default/files/2022-03/SFCTA_Board_GroupedAllocationsENCLOSURE_2022-03-08_0.pdf | official | [srch] |

### How it was produced

- **The mandate.** The SFCTA page says "the Board of Supervisors unanimously passed an ordinance
  drafted by former Supervisor Scott Wiener requiring the City to create a framework for subway
  expansion throughout San Francisco" [srch]. The ordinance makes it City policy to develop a Subway
  Master Plan within 12 months and to update it every four years *(paraphrase)* [srch].
  - Wiener's 2015 list, as SFMTA's blog relayed it: "the Central Subway project and a possible
    extension of that to Fisherman's Wharf, the downtown extension of Caltrain and high-speed rail, a
    second transbay tube, subway service to the city's west side and to southeastern SF" [srch].
- **Public input, August to September 2016.** Staff "deployed an online tool that allowed users to
  draw desired subway lines and stations and complemented these findings with in-person pop-up events
  in three neighborhoods" [srch]. The tool attributed this to the Subway Vision materials, without
  saying whether it was the report or the fact sheet.
  - SFMTA's blog: "At pop up workshops and online, more than 2,600 unique ideas were submitted through
    our online mapping tool." [srch]
  - The launch post offered example ideas: "extending the Central Subway to Fisherman's Wharf,
    building a second Transbay Tube for BART into Mission Bay or extending the Market Street subway
    across the city to allow for longer trains" [srch].
- **From ideas to corridors.**
  - Submissions were grouped into corridors for "convenience" and for "density" *(paraphrase)*. The
    fact sheet: "These corridors will be grouped, combined, and further studied to maximize benefits
    of any future subway networks." [srch]
  - Staff from SFMTA, SFCTA, Planning and BART set and reviewed the corridors and networks in two
    workshops *(paraphrase)* [srch].
  - Demand counted today's transit riders plus trips by any mode that could move to a subway
    *(paraphrase)* [srch].
- **The review of earlier plans:** "Common themes in the prior plan review include additional
  Transbay service, the conversion of the M-Ocean to a full subway and extending it to Daly City, a
  subway to serve the Geary corridor, and the extension of Caltrain and high-speed rail to downtown
  San Francisco." [srch]

### Status

**Proposed: `superseded`.**

- **SFMTA has dropped its follow-on.** The Muni Subway Expansion Project page says the project is "no
  longer active. Please refer to the ConnectSF Transit Strategy for San Francisco's transit expansion
  priorities." [srch] The page still shows a "Current Phase or Stage" of Planning, a stale label.
- **ConnectSF dropped the M Ocean View subway.** SFCTA's March 2022 Prop K form says the earlier vision
  "envisioned undergrounding the M-Ocean View line between West Portal and Parkmerced". It wasn't
  prioritized in ConnectSF *(paraphrase)*, which chose "aggressive surface optimization to provide
  subway-like service on the surface of the M-Ocean View line" [srch]. $965,948 of Prop K funds was
  deobligated from "Muni Subway Expansion Project Development" [srch].
- **Two corridors carried forward.** The Geary/19th subway and the Central Subway extension went into
  the Transit Strategy (section 1).
- **No four-year update** of the Vision was found *(open)*.

### What it proposed

- **A general orientation only.** "The document provides the general orientation of potential subway
  corridors, without specifying detailed locations for subway lines and stations." [srch] One
  summary went on: "Those decisions will be made through more extensive planning processes." [srch]
- **The candidate corridor list wasn't reached** *(open)*. It is in chapter 4, which "presents
  candidate corridors and discusses two approaches for combining corridors into networks"
  *(paraphrase)*, and in Figure 15, "Initial Corridor Concepts" [srch].
- **One string was seen once.** A summary gave it as the report's words: "need for a subway along the
  Geary corridor, some sort of Central Subway extension, a 19th Avenue. subway, and north-south
  connections spanning from Van Ness Avenue to Divisadero Street." An exact-phrase search didn't find
  it again, and its context (public input, or the needs assessment) is unknown.
- **The brief's examples weren't found.** No result names Van Ness/Lombard, Bayshore or Third Street
  as Subway Vision corridors. A search for Lombard found only the Lombard Street Vision Zero safety
  project.

| Corridor | As worded | Can the path be rebuilt? |
|---|---|---|
| Geary | "a subway to serve the Geary corridor" (the prior plans); "a subway along the Geary corridor" (the string seen once) | Corridor only |
| 19th Avenue | "a 19th Avenue. subway" (seen once) | Corridor only |
| Central Subway extension | "some sort of Central Subway extension" (seen once) | Corridor only |
| North-south, Van Ness to Divisadero | "north-south connections spanning from Van Ness Avenue to Divisadero Street" (seen once) | No path: a band between two streets |
| M Ocean View as a full subway, extended to Daly City | the prior plans | Corridor only |
| More Transbay service; Caltrain and high-speed rail downtown | the prior plans | Out of scope here; covered by Link21 and The Portal |

**The Muni Subway Expansion Project** was SFMTA's follow-on of 2016-17. It is now dropped.

- **The proposal.** It "proposes a full subway from West Portal to Parkmerced built under the middle of
  19th Avenue", and was "developed in 2015 as part of the Pre-Environmental Study" [srch]. It picked
  the M Ocean View as its "spine" *(paraphrase)*.
- **Stations.** SF State (a transfer to the J), Stonestown and Parkmerced, with platforms for four-car
  trains. An Ocean Avenue station was also studied *(paraphrase)* [srch]. A later summary adds the K
  running underground along West Portal Ave *(paraphrase)*.
- **Cost:** $2.5-3 billion *(paraphrase)* [srch].
- **Geometry:** the 19th Avenue part follows a named street. The text seen gives no cross streets for
  the stations, and doesn't say where the line meets or leaves 19th Ave at its West Portal and
  Parkmerced ends. The "Station 2 Rail" board, whose title reads like map labels (Diaz Ave, Banbury
  Drive, Parkmerced), is the drawing to trace.

**An earlier option, the SFCTA's 19th Avenue Transit Study (2014),** looked at grade-separating the M
where it crosses 19th Avenue.

- It found the "Longer Subway and Bridge" option gave the greatest benefits, at $520 million (2013
  dollars, with a range of $420-780 million). A variation would run fully underground through
  Parkmerced. All *(paraphrase)* [srch].

### Maps

All are in the Subway Vision report; page numbers weren't seen.

- Figure 6, "Key Transit Corridors in San Francisco" (existing service).
- Figure 7, "Online Response Heat Map".
- Figure 15, "Initial Corridor Concepts", the one to trace [srch].

The slides of 2016-10-18 also have heat map and corridor sections, but their images weren't seen.

### Costs, benefits and context

- **No cost per corridor** was seen. The slides weighed delivery timeline, capital cost and station
  spacing *(paraphrase)* [srch].
- **Context figures from the report:** "Muni Metro System operates at capacity during weekday morning
  and evening peak periods". The "38 and 38-Rapid buses on Geary Boulevard carry approximately
  51,000 daily passengers". "the highest ridership corridor in San Francisco encompasses the core of
  the light rail lines in San Francisco, connecting travelers between Embarcadero and West Portal
  Station". All [srch].

### Drawbacks and overlaps

- **The M Ocean View subway** was set aside for surface optimization (see Status).
- **Opposition to Geary rail in the past:** "early efforts to advance Geary rail in the 1950's and
  again in the 1980's were met with neighborhood opposition" (SFMTA's Geary Rapid FAQ) [srch].

## 3. The Geary/19th Avenue subway (SFCTA, 2022-26)

### Documents

| Title | Publisher | Date | URL | `type` | How seen |
|---|---|---|---|---|---|
| *Geary/19th Ave Subway and Regional Connections Study: Strategic Case* (Community Advisory Committee item 12 enclosure) | SFCTA, with SFMTA and SF Planning | May 2026 (CAC meeting of 2026-05-27) | https://www.sfcta.org/sites/default/files/2026-05/SFCTA_CAC_Item12_Geary-19thSubwayStudyFinalReportENCLOSURE_2026-05-27.pdf | official | [srch] |
| Strategic Case (report page) | SFCTA | The page says "Final Report: July 2026" and "Draft Report: May 2026" | https://www.sfcta.org/reports/geary19th-ave-subway-and-regional-connections-study-strategic-case | official | [srch] |
| Geary/19th Avenue Subway and Regional Connections Study (project page) | SFCTA | undated (its timeline runs to June 2026) | https://www.sfcta.org/projects/geary19th-avenue-subway-and-regional-connections-study | official | [srch] |
| Study update (CAC item 8 presentation) | SFCTA | 2026-02-25 | https://www.sfcta.org/sites/default/files/2026-02/SFCTA_CAC_Item8_Geary19thAveSubwayandRegionalConnectionsStudyUpdatePRESENTATION_2026-02-25.pdf | official | [srch] |
| "Geary/19th Avenue Subway Study Virtual Town Hall Recap" (blog) | SFCTA | 2026-03-12 | https://www.sfcta.org/blogs/geary19th-avenue-subway-study-virtual-town-hall-recap | official | [srch] |
| "Learn More About the Potential of a Geary/19th Subway" (blog) | SFCTA | 2024 (around the July 2024 town halls; exact date not seen) | https://www.sfcta.org/blogs/learn-more-about-potential-geary19th-subway | official | [srch] |
| Virtual town hall slides | SFCTA | 2024-07 | https://www.sfcta.org/sites/default/files/2024-07/Geary-19th%20Virtual%20Town%20Hall%20Deck.pdf | official | [srch] |
| Transportation Authority Board meeting (the agenda of June 9, 2026, by the tool's attribution) | SFCTA | 2026-06-09 | https://www.sfcta.org/events/transportation-authority-board-131 | official | [srch] |
| SFCTA blog listing (the approval statements) | SFCTA | June 2026 | https://www.sfcta.org/blog | official | [srch] |
| Prop L project information form: EP13 Geary/19th Ave Subway placeholder (draft) | SFCTA | 2024-06 | https://www.sfcta.org/sites/default/files/2024-06/EP13%20Geary%2019th%20Ave%20Subway%20Placeholder%20PIF%20DRAFT.pdf | official | [srch], title and category only |
| Geary Boulevard Improvement Project FAQs | SFMTA | undated (updated after the summer 2026 study) | https://www.sfmta.com/geary-boulevard-improvement-project-frequently-asked-questions-faqs | official | [srch] |
| Geary Boulevard Improvement Project (project page) | SFMTA | undated | https://www.sfmta.com/projects/geary-boulevard-improvement-project | official | [srch] |
| Geary Rapid Project: FAQs | SFMTA | undated | https://www.sfmta.com/project-updates/geary-rapid-project-faqs | official | [srch] |
| Public comments on the final report (CAC item 12) | Members of the public, in the SFCTA packet | 2026-05-27 | https://www.sfcta.org/sites/default/files/2026-05/SFCTA_CAC_Item12_Geary-19thSubwayStudyFinalReportPUBLICCOMMENT_2026-05-27_0.pdf | primary_document | [srch]. Not an official finding |

### Status

**Proposed: `study`.**

- **No alignment was chosen.** The report page says the study "did not select a preferred
  alternative or advance planning/design beyond a pre-feasibility level" [srch].
- **The Board adopted the report as a study.**
  - The June 9 agenda item: "Adopt the Geary/19th Ave Subway and Regional Connections Study Final
    Report - ACTION" [srch].
  - The SFCTA blog: "The Transportation Authority Board approved the Geary/19th Avenue Subway and
    Regional Connections Study Final Report at the June 9 meeting" and "The Board gave final approval
    at the June 23 meeting." [srch]
  - Adopting a study report is not adopting a project.
- **Adopted plans fund it only as a study.**
  - In Plan Bay Area 2050+, it is under "studies and project development" (section 5).
  - In SFTP 2050, it is in the "next generation transit" planning line *(paraphrase)*.
  - The 2024 blog says it was recommended in the SFCTA's San Francisco Transportation Plan
    *(paraphrase)* [srch].
  - Reading the vocabulary's "in an adopted plan" literally would make it `adopted`. Matthew should
    choose; this file proposes `study`.
- **History.**
  - Board Vice Chair Myrna Melgar asked for the study *(paraphrase)* [srch].
  - In 2022, SFCTA moved $801,716 of Prop K funds from the "Geary-19th Avenue Corridor Rail
    Strategy and Planning (West Side Rail)" placeholder to the Strategic Case *(paraphrase)* [srch].
  - Town halls were held on July 17 and 20, 2024, and on March 5 and 7, 2026 [srch].

### What it would build

**The concept.**

- "The Geary/19th Ave Subway is envisioned as a rail rapid transit subway oriented under Geary Blvd and
  19th Ave in San Francisco." [srch]
- "dual-track subway approximately 10 miles in length, with approximately 5 – 6 stations" [srch].
  **The stations are not named or located.**

**The corridor.**

- It begins downtown near the Salesforce Transit Center *(paraphrase)*. It "continues west through
  the Western Addition extending potentially as far west as the Inner Richmond, connecting these
  neighborhoods with regional high-capacity rail. It turns south through Golden Gate Park and
  continues beneath 19th Avenue connecting the Sunset, Ingleside, Parkmerced, and other nearby
  neighborhoods." [srch] It runs on into northwestern San Mateo County, "terminating roughly near the
  existing Daly City Bay Area Rapid Transit (BART) station" [srch].
- **Study area** (Figure 1-2): "the Geary/19th Ave Corridor encompasses the neighborhoods and
  destinations approximately ½ mile from Geary Blvd and 19th Avenue in San Francisco, excluding
  portions of the downtown area" [srch]. The downtown part, east of Van Ness, is treated as an
  interface with Link21 *(paraphrase)* [srch].
- **The turn south.**
  - It falls somewhere between Masonic and Park Presidio. A turn near Masonic serves Japantown, the
    Western Addition, Kaiser, USF and UCSF more directly. A turn farther west serves the Richmond.
  - Earlier ConnectSF work tested alignments "as far west as Sunset" (as summarized). Demand is weaker
    west of 19th Ave, and without a regional connection it is hard to site a train yard.
  - All *(paraphrase)* [srch].
- **The south end.**
  - It is "likely that both through running and transfer options for the Geary/19th Subway would need
    to surface and transition to an elevated alignment near the 19th Ave / I-280 freeway interchange"
    [srch].
  - A transfer at Colma instead: "the costs of this approach may be prohibitive, including potential
    impacts to BART's storage and maintenance yard at the Colma station" [srch].
  - The February 2026 slides list "Where to Terminate/Integrate at/near Daly City" as an open question
    [srch].

**Downtown, two options.**

- **Option A: Mission Bay, 3rd St and Geary Blvd** (Figure 3-1). "If a new transbay rail connection is
  routed via Mission Bay and 3rd Street terminating near Market Street, as shown in Link21's
  representative concept for BART technology, the Geary/19th Ave Subway would likely continue straight
  west under Geary Blvd towards Van Ness, the Western Addition and Japantown." [srch]
  - Riders would transfer to the Market Street subway at Powell/Union Square or Montgomery
    *(paraphrase)*.
  - It "would likely require the construction of additional underground platforms at or near the
    Salesforce Transit Center" [srch].
- **Option B: Howard St and the Salesforce Transit Center** (Figure 3-2). "This option would provide
  a slightly longer travel time than the Mission Bay / 3rd St / Geary Blvd alignment described above,
  but would enable direct service to the concentration of residents and jobs near Civic Center."
  [srch]
  - The required depth and tunnel turn radii would route it through the Civic Center station area
    before it turns toward the Salesforce Transit Center. There it would connect with the Market Street
    subway and Van Ness BRT. Both *(paraphrase)* [srch].

**Technology.**

- Four options were identified: BART (broad gauge), electrified standard-gauge regional rail, Muni
  Metro light rail, and automated light rail (ALRT). BART and standard gauge were studied most
  closely, because Link21 recommended standard gauge for the new Bay crossing in June 2025. All
  *(paraphrase)* [srch].
- **BART** allows through-running south to SFO/Millbrae, but needs longer platforms and costs more to
  build.
- **Standard gauge** needs a transfer near Daly City or Colma. It could run through to the East Bay,
  but not into San Mateo County without large added cost.
- **Muni Metro** can't interoperate with regional services. **ALRT** allows smaller stations but needs
  its own maintenance facility.
- These four points are all *(paraphrase)* [srch].
- **Vehicle layout:** "a single level, high capacity, multiple door layout" [srch].

**Still open:** "project termini, specific routing in Downtown San Francisco and in the transition
between Geary Blvd and 19th Ave, and rail technology" [srch].

| Piece | As worded | Can the path be rebuilt from the text along today's streets? |
|---|---|---|
| Geary, downtown to the turn | Option A runs "straight west under Geary Blvd towards Van Ness, the Western Addition and Japantown"; the turn is "between Masonic and Park Presidio" *(paraphrase)* | **Yes, approximately, under option A:** Geary St and Geary Blvd from Market St west to Masonic Ave. From Masonic Ave to Park Presidio Blvd is a range, not a path. Option B's junction with Geary isn't stated |
| Option A's downtown leg | The Link21 BART concept runs "via Mission Bay and 3rd Street terminating near Market Street" | 3rd St, from Mission Bay to Market St, belongs to Link21's concept, not to this subway |
| Option B's downtown leg | Howard St and the Salesforce Transit Center, routed through Civic Center | **Corridor only.** No path is given between the Transit Center, Civic Center and Geary |
| Golden Gate Park | "turns south through Golden Gate Park" | **No.** The street it turns on is still open |
| 19th Avenue | "continues beneath 19th Avenue", surfacing "near the 19th Ave / I-280 freeway interchange" | **Yes, approximately:** 19th Ave from the park's south edge (Lincoln Way on today's grid; to be checked against the centerlines) to the I-280 interchange |
| The Daly City end | Elevated, "terminating roughly near the existing Daly City BART station" | **No path** from the interchange to the station |
| Stations | 5-6, unnamed | **None** |

### Maps

All are in the Strategic Case. The front matter lists them, but their pages and images weren't seen.

- Figure 1-1: the project development process.
- Figure 1-2: Project Study Area Map.
- Figure 3-1: the Mission Bay / 3rd St / Geary Blvd alignment, drawn with Link21's BART concept. Its
  key: "green representing the Geary/19th Ave Subway using BART technology and Blue representing
  Link21 BART technology subway" [srch].
- Figure 3-2: the Howard Street / Salesforce Transit Center option.
- Figure 3-3: a route-area map.

The May 2026 enclosure and the July 2026 final may paginate differently.

### Costs, ridership, travel times and other benefits

| Measure | Value | Source (all [srch]) |
|---|---|---|
| Capital cost | "a capital cost estimated in the range of $20B – $30B"; "approximately $20B – $30B in 2026 dollars" | Strategic Case |
| What drives the cost | "tunneling and station construction drive the majority of costs" | Town hall recap, 2026-03-12 |
| Lifecycle cost, regional plan draft | $15.2 billion (2019 dollars), rated "even" in performance *(paraphrase)* | MTC draft project performance table, 2024-07 (section 5) |
| Daily riders, San Francisco only | "would serve up to 182,000 daily riders, of which up to 71,000 are net new trips". The table range is 162,000-182,000 *(paraphrase)* | Strategic Case |
| Daily riders, with the East Bay | "approximately 76,000 (using regional rail alignments in the East Bay) or 131,000 (using existing BART alignments in the East Bay) additional daily riders over a San Francisco only subway (a 42% and 74% increase respectively)". Of those, 16,000 and 34,000 are new transit trips *(paraphrase)* | Strategic Case |
| Daily riders, with the South and East Bay via BART | 310,000-314,000 boardings *(paraphrase)* | Strategic Case |
| Daily riders, with San Mateo County only | About 8,000 more users, mostly moved from other transit *(paraphrase)* | Strategic Case |
| The finding on regional links | "the inclusion of connections to East Bay has the most significant impact on project performance and could nearly double ridership compared to a San Francisco only subway" | Strategic Case |
| An earlier ridership figure | "expected future Geary/19th Ave Subway ridership is 300,000 per day" | Town hall slides, 2024-07 |
| Service | 24 trains an hour each way *(paraphrase)*; "end to end travel times from Daly City to Downtown San Francisco of 16 to 19 minutes" | Strategic Case |
| Time saved | Up to 20.4 minutes from UCSF Parnassus to the Salesforce Transit Center, San Francisco only (Table 4-3) *(paraphrase)* | Strategic Case |
| Jobs within reach | 45,000-70,000 more jobs within 45 minutes by transit for an average San Francisco household, about 6%, or about 9% with regional links *(paraphrase)* | The tool's attribution was unclear: the Strategic Case or the Feb 2026 slides |
| Other benefits | Lower greenhouse gas emissions, larger gains for Equity Priority Communities, less crowding, lower vehicle miles traveled *(paraphrase)* | Town hall recap; 2024 blog |
| The conclusion | "a grade separated, high capacity rapid transit investment is both needed and viable in the Geary Boulevard and 19th Avenue corridors in Western San Francisco" | Strategic Case |
| Schedule | Construction is at least 15 years away. The project page puts implementation 15+ years out *(paraphrase)*. SFMTA: "would take more than a decade to deliver at minimum" | 2024 blog; project page; SFMTA FAQ |
| The next phase | About $1.5 million of programmed sales-tax funds, up to $3 million with regional grants, for prioritized Alternatives Analysis tasks. Prioritization comes in SFTP 2060, which starts in 2027 *(paraphrase)* | Strategic Case and project page |

### Drawbacks and risks (official sources)

- **Funding.** "existing funding sources are not enough to deliver the project, and continuing to
  advance this work will require a mix of new and existing funding sources, from all levels of
  government, with opportunities for leveraging public-private partnerships" (recap) [srch]. The
  possible sources named include new state and local sources, land value capture, congestion pricing
  and federal Capital Investment Grants *(paraphrase)* [srch].
- **Shutting today's subways.** "Both BART and Muni Metro subway service would be taken offline for at
  least 1 – 2 years" [srch]. The summary tied this to building a connection or tie-in with the
  existing subways; check the context in the report.
- **Stations.** "Each station comes with significant cost to construct" [srch]. Displacement around
  stations is a risk to manage *(paraphrase)* [srch].
- **A train yard.** "Available sites for this facility — estimated to require 10 – 20 acres of level
  ground accessible from the subway — are extremely limited" [srch].
- **Downtown platforms** at the Salesforce Transit Center, and **the elevated south end** near
  19th Ave and I-280, are both quoted above.
- **Being locked in by other projects.**
  - Technology choices made by other projects may constrain this one *(paraphrase)* [srch].
  - "the Link21 Program evaluated the viability of a rail connection between the existing Market Street
    Subway and a potential new branch line, and determined options which include this element to be
    infeasible" [srch].
  - Running standard-gauge trains through into San Mateo County would be costly and disruptive
    *(paraphrase)* [srch].
- **SFMTA.** "major obstacles to Geary rail include the high capital cost, a scarcity of funding
  sources, and the scale of disruption during construction" (Geary Rapid FAQ) [srch]. Neighborhood
  opposition in the 1950s and 1980s is quoted in section 2.

### Overlaps and conflicts

- **Geary's buses.**
  - Geary Rapid is complete. The Geary Boulevard Improvement Project is under construction from
    Stanyan St to 34th Ave, costs $48 million and serves the 38 and 38R. Its utility work began in late
    2024 and runs about three years *(paraphrase)* [srch].
  - SFMTA: "The ConnectSF Transit Investment Strategy calls for investment in a Geary-19th Avenue
    subway to provide fast, high-capacity service and improve regional access, but would take more than
    a decade to deliver at minimum." [srch] The subway's alignment and stations aren't set and aren't
    expected to cover the whole corridor, so the bus remains a link to future rail *(paraphrase)*
    [srch].
  - SFCTA: "the subway is intended to complement, not replace, existing bus service on Geary Boulevard.
    Currently, the concept is that the 38 and 38R lines would continue to serve surface-level trips."
    [srch]
- **Link21, the second Transbay crossing.**
  - Option A depends on Link21's BART concept via Mission Bay and 3rd St.
  - Link21 found a branch off the Market Street subway infeasible, and recommended standard gauge in
    June 2025.
  - The study's East Bay ridership depends on which technology and alignment Link21 chooses
    *(paraphrase)* [srch].
- **The Portal.** Coordination with the Downtown Rail Extension is a named dependency *(paraphrase)*
  [srch]. Option B serves the Salesforce Transit Center.
- **The M Ocean View on 19th Avenue.** The subway would run beneath 19th Ave, where the M runs today
  (the M's route comes from present-era GTFS). The Muni Metro Capacity Study plans three-car M trains
  to SF State and infrastructure for a J extension to Stonestown (section 4). No source seen says how
  these interact *(open)*.
- **Public comment, not official.** Commenters objected to the left turn in the concept drawings and
  suggested a station in the Presidio area, near the VA Medical Center and the Legion of Honor. They
  cited about 47,000 weekday boardings on the 38 and 38R in April 2026. All *(paraphrase)* [srch].

## 4. Other San Francisco rail proposals these documents name

### The Central Subway extension (SFMTA)

**Documents:**

- "Central Subway Extension" (project page, undated): https://www.sfmta.com/projects/central-subway-extension
- *T-Third Phase 3 Concept Study*, final report (2015-01-08): https://www.sfmta.com/sites/default/files/feature-location-pdf/1._t-third_phase_3_concept_study_-_final_report_1-8-15.pdf
- "Central Subway Extension - Looking to the North and West" (blog, undated): https://www.sfmta.com/blog/central-subway-extension-looking-north-and-west
- Kickoff presentation boards (2018-10): https://www.sfmta.com/sites/default/files/reports-and-documents/2018/10/central_subway_extension_kickoff_presentation_boards.pdf

All are `official` and [srch].

**Proposed status: `study`.**

- **The 2026 study.** The study relaunched in 2026 as the "Central Subway North Beach Extension
  Study". It looks at a one-station extension into North Beach through the existing unfinished
  tunnels, with a rough cost estimate. It is not to decide station locations or alignments, and is
  due between mid-2026 and mid-2028. All *(paraphrase)* [srch].
- **The 2026 hearing.** "in January 2026, District 3 Supervisor Danny Sauter convened a hearing on a
  variety of topics related to the T Third" [srch].
- **In the plans.** It is in Plan Bay Area 2050+'s studies list and in SFTP 2050+'s list of major
  transit projects.

**Routes as worded (2015).**

- Four general alignments: two-way on Columbus Avenue, two-way on Powell Street, Powell and Beach
  Streets, and a one-way loop *(paraphrase)*.
- "A station in North Beach at or near Washington Square is present in all concept alignments."
- The Fisherman's Wharf ends: near Kirkland Yard at Powell and Beach Streets, at Conrad Square near
  Columbus Avenue and Beach Street, or both *(paraphrase)*.
- "This study will not recommend a best concept alignment."

All [srch].

**In 2018**, the alternatives study looked at North Beach, Fisherman's Wharf, the Marina, Cow Hollow
and the Presidio. A survey favored North Beach first and going underground to the Wharf. The study
was paused during the pandemic. All *(paraphrase)* [srch].

**Geometry.**

- **Columbus Ave** from Washington Square to Beach St, and **Powell St** to Beach St, have named streets
  and named ends, so they could be drawn approximately along today's streets.
- **The link** from the tunnel end, north of Chinatown station, to Washington Square isn't described in
  the text seen. The loop has no path. Both need the report's maps.

**Cost.**

- 2014: "from a low of $367 million (subway and surface to Kirkland), to a high of $1.400 billion
  (subway connecting all three locations) in 2014 dollars" [srch].
- Regional plan draft: a lifecycle cost of $1.2 billion (2019 dollars), rated "advancing"
  *(paraphrase)* [srch].
- A public comment estimates $1.4 billion for phase 3 and $1.8 billion for phase 4. That is an
  advocate's figure, not the agency's.

**Maps:** the 2015 report and its appendices, and the 2018 boards. Neither was seen.

### The Pennsylvania Avenue Extension, PAX (SFCTA)

**Documents:**

- Project page (undated): https://www.sfcta.org/projects/pennsylvania-avenue-extension
- Project Initiation Report, Resolution R23-05 (2022): https://www.sfcta.org/sites/default/files/2022-08/R23-05%20PAX%20Project%20Initiation%20Report%20Signed.pdf
- Its presentation (2022-07-12): https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPRESENTATION_2022-07-12.pdf
- Budget and work program memo (2025-04-24): https://www.sfcta.org/sites/default/files/2025-05/SFCTA_CAC_ITEM6_ProposedAnnualBudgetandWorkProgramMEMO_2025-05-28.pdf

All are `official` and [srch].

**Proposed status: `study`.**

- "PAX is in the planning stage and is not yet environmentally cleared." [srch]
- "We will advance the PAX Bridging Study in FY 2025/26." [srch]

**The route as worded.**

- "The Transportation Authority is studying potential tunnel alignments that will have trains running
  underground along Seventh Street and Pennsylvania Avenue." [srch]
- It would remove the street-level crossings at Mission Bay Drive and 16th Street *(paraphrase)*.
- There are three alternatives: long, middle and short. The long one ends near Cesar Chavez Street and
  "requires replacement of the existing 22nd Street Caltrain Station". The short one "would have a
  more significant impact on Caltrain operations during construction". And "all PAX alternatives
  would require some level of re-design/reconfiguration or relocation of the existing 22nd Street
  station." All [srch].

**Geometry:** a corridor along 7th St and Pennsylvania Ave. The portals, and where it joins the
railyard and The Portal, aren't in the text. The long option ends "near Cesar Chavez Street".

**Cost and timing.**

- "approximately $2.0-2.5 billion, excluding potential costs to replace the 22nd Street Station".
- "The earliest anticipated timeline for completion of PAX is mid to late 2030s."
- "The PAX project will require, at minimum, an additional 15 years to plan, approve, and construct."

All [srch].

**Overlaps:** it extends The Portal's line south, as Caltrain and future high-speed rail
*(paraphrase)*. Whether it is in SFTP 2050 or Plan Bay Area 2050+ wasn't seen *(open)*.

### The Muni Metro Capacity Study and core capacity (SFMTA)

**Documents:**

- Project page: https://www.sfmta.com/projects/muni-metro-capacity-study
- FAQ: https://www.sfmta.com/project-updates/muni-metro-capacity-study-frequently-asked-questions
- SFMTA Citizens' Advisory Council slides (2025-11-06): https://sfmta.com/media/43793/download?inline=
- SFMTA Board item 13 (2025-12-02): https://www.sfmta.com/reports/12-2-25-mtab-item-13-muni-metro-capacity-study
- SFCTA, Prop L five-year prioritization program for Muni Rail Core Capacity (2024-02-27): https://www.sfcta.org/sites/default/files/2024-02/SFCTA_Board_PropL5-YearPrioritizationProgramsENCLOSURE2MuniCoreCapacity_2024-02-27.pdf

All are `official` and [srch].

**Proposed status: `study`.**

- "On December 2, 2025, the SFMTA Board of Directors unanimously approved the Muni Metro Capacity Study
  final report." [srch]
- Accepting it commits SFMTA to build nothing *(paraphrase)*.
- The modernization program is funded in SFTP 2050 (section 1). Prop L's Muni Rail Core Capacity
  line: "Total Funding: $720M; EP: $57M" [srch].

**What it would build** (a program of 10-15 years):

- "Capacity-enhancing upgrades to old infrastructure such as new light rail track, overhead wires,
  and traction power" [srch].
- Transit priority adding up to 20% capacity *(paraphrase)*.
- Three-car trains on the N Judah, and on the M Ocean View between downtown and SF State
  *(paraphrase)*.
- "In addition to the current plan for Parkmerced to provide a terminal for 3-car M service, the Muni
  Metro Capacity Study recommends providing infrastructure to enable the J Church to be extended to
  Stonestown." (slides, 2025-11-06) [srch]
- Route restructuring was not recommended: "even in our highest future ridership forecast, we do not
  need to use this strategy of removing lines from the Market Street subway within the 10–15-year
  program" [srch].
- It targets up to $1 billion in a federal Capital Investment Grant *(paraphrase)* [srch].

**Geometry:** the J Church extension has endpoints only, today's J terminal (from GTFS) and
Stonestown, with no path.

**Earlier:** SFCTA's 2022 Prop K request of $1,150,000 for the Muni Metro Core Capacity Study aimed at
four-car trains from Embarcadero to SF State, with surface concepts from West Portal to SF State
*(paraphrase)* [srch].

### A new Bayview Caltrain station (SFCTA)

**Documents:**

- "Bayview Caltrain Station Location Study" (page, undated): https://www.sfcta.org/bayview-caltrain
- Prop L five-year prioritization program, EP 11 Bayview Caltrain Station (approved 2023-10-24): https://www.sfcta.org/sites/default/files/2023-12/EP%2011%20Bayview%20Caltrain%20Station%20Prop%20L%202023%205YPP%20Approved%2010.24.23%20with%20links.pdf

Both are `official` and [srch].

**Proposed status: `study`.**

- The study "recommends a site at Oakdale Avenue, adjacent to the former Southeast Community Facility
  at 1800 Oakdale, as the preferred location" [srch].
- Its timeline: "July - August 2026 Recommendation and outreach", then "Fall 2026 Final Report" [srch].
- The Prop L program carries $100 million, assuming Oakdale, with 35% design and environmental
  clearance in summer 2026 as a milestone *(paraphrase)* [srch].

**Geometry:** a point on today's Caltrain line at Oakdale Ave.

### Seen in passing, not researched

- **SFCTA's Westside Network Study,** part of SFTP 2050+, which lists a "Fall 2026 Final Report":
  https://www.sfcta.org/projects/westside-network-study
- **Muni's "A Vision for Rapid Transit in San Francisco,"** date not seen:
  https://archives.sfmta.com/cms/rprinit/vision.htm. It is an older, phased vision: light rail on
  Geary, partly in subway; light rail on Van Ness; and light rail on Geneva and Ocean *(paraphrase)*
  [srch].
- **SFCTA's 2017 SFTP update** (October 2017) listed a Central Subway extension and an M line / 19th
  Avenue grade separation as possible long-term investments *(paraphrase)* [srch]:
  https://www.sfcta.org/sites/default/files/2020-09/SFTP_final_report_10.24.17.pdf

## 5. Plan Bay Area 2050+, the regional plan that carries these

- **Adopted.** The plan was "adopted ... on March 19, 2026 followed by the Metropolitan Transportation
  Commission (MTC) on March 25, 2026" (planbayarea.org) [srch]. MTC: "MTC adopted Plan Bay Area 2050+
  and certified the plan's associated Environmental Impact Report, giving final approval to the
  region's long-range plan." [srch] The resolutions are MTC 4750 and ABAG Executive Board 2-2026
  *(paraphrase)* [srch].
- **Funded as studies only.** The final transportation project list (March 2026) funds "studies and
  project development" for Diridon Station, the Geary/19th Ave Subway, the Central Subway Extension,
  the San Jose Airport Connector, SMART to Suisun City, Link21 and a San Mateo Bridge express bus
  *(paraphrase)* [srch].
  - The October 2025 draft defines that line: "transit studies and project development activities,
    including alternatives and/or business case analyses; design, technical, and planning analyses;
    and initiating environmental analyses and review" [srch].
- **Draft performance, July 2024.** Geary/19th Avenue subway: lifecycle cost $15.2 billion, "even".
  Central Subway extension: $1.2 billion, "advancing". Both in 2019 dollars and *(paraphrase)*
  [srch].

| Document | Publisher | Date | URL | `type` |
|---|---|---|---|---|
| "MTC, ABAG Adopt Final Plan Bay Area 2050+ and Environmental Impact Report" | MTC | 2026-03-25 | https://mtc.ca.gov/news/mtc-abag-adopt-final-plan-bay-area-2050-and-environmental-impact-report | official |
| Plan Bay Area 2050+, final plan page | MTC and ABAG | undated | https://planbayarea.org/finalplan | official |
| Plan Bay Area 2050+, Transportation Project List Report (final) | MTC and ABAG | March 2026 | https://planbayarea.org/sites/default/files/documents/2026-04/Final_Plan_Bay_Area_2050_Plus_Transportation_Project_List_Report.pdf | official |
| Draft Transportation Project List Report | MTC and ABAG | October 2025 | https://planbayarea.org/sites/default/files/documents/Draft_Transportation_Project_List_Report.pdf | official |
| Draft project performance assessment summary table | MTC | 2024-07 | https://mtc.ca.gov/sites/default/files/documents/2024-07/3bii_24-0707_Draft%20Project%20Performance%20Assessment%20Summary%20Table.pdf | official |

## For Matthew: what needs doing by hand

1. **Read the ConnectSF Transit Strategy in a browser.** It is on https://connectsf.org/studies/
   ("Download Transit Strategy", about 28 MB). It has the full project list, the Five-Minute Network's
   routes and any maps. This pass never reached it.
2. **Subway Vision report** (June 9, 2017). Read chapter 4, and trace Figure 15, "Initial Corridor
   Concepts". Figure 7, the heat map, is optional. Check:
   - whether Van Ness/Lombard, Bayshore or Third Street are among its corridors (not confirmed here);
   - the string seen only once, "north-south connections spanning from Van Ness Avenue to Divisadero
     Street".
3. **The Geary/19th Strategic Case** (use the July 2026 final if it differs from the May
   enclosure).
   - Trace Figures 1-2, 3-1, 3-2 and 3-3.
   - Note the page numbers.
   - Check the context of the "taken offline for at least 1 – 2 years" statement.
   - Confirm that no station is located anywhere in it.
4. **The T-Third Phase 3 Concept Study** (2015) and the 2018 boards. These have the Central Subway
   extension's alignments, and the start of the tunnel north of Chinatown station.
5. **The PAX Project Initiation Report** and its July 2022 presentation, for the portal locations of
   each alternative.
6. **The M Ocean View subway board** ("Station 2 Rail", 2016), if the dropped 19th Avenue subway is
   wanted in the reference layer.
7. **Decisions.**
   - The Geary/19th subway's status: `study`, as proposed, or `adopted` on a literal reading. It is
     named in SFTP 2050 and Plan Bay Area 2050+, but only for studies.
   - Whether SFTP 2050+ was adopted after spring 2026.
8. **Licensing.** No license statement was seen for the figures in these agency reports. Tracing a
   corridor from them for the reference layer is a question for Matthew.
9. **A follow-up search pass,** since this one ran out of searches.

## Proposed `data/sources.json` entries

None of these ids is in `data/sources.json` today (checked on 2026-10-16). One, `pba2050plus-project-list-2026-03`, is also proposed for the same document in `link21-dumbarton-express-rail.md`, which sits beside this file, so the two entries' notes should be merged.

```json
[
  {"id": "connectsf-resources-media", "title": "Resources and Media (ConnectSF)", "publisher": "ConnectSF (SFCTA, SFMTA, San Francisco Planning)", "date": null, "type": "official", "url": "https://connectsf.org/about/resources-and-media/", "accessed": "2026-10-16", "notes": "Seen in web search results only; the page wasn't opened. Undated page. Lists the Transit Strategy: \"The Transit Strategy describes the major capital projects and programs that will help our city's transit system meet the existing and future travel needs of residents, workers, and visitors. | December 2021\"."},
  {"id": "connectsf-studies-page", "title": "Developing Street, Freeway and Transit Concepts (ConnectSF studies page)", "publisher": "ConnectSF (SFCTA, SFMTA, San Francisco Planning)", "date": null, "type": "official", "url": "https://connectsf.org/studies/", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. Offers the Transit Strategy PDF (about 28 MB; file URL not seen): \"The Transit Strategy lays the groundwork for building major, high capacity transit projects in San Francisco. It develops and prioritizes initial concepts for subways, bus rapid transit lines, and other improvements to create a rapid, reliable transit network.\""},
  {"id": "connectsf-transit-strategy-page", "title": "Investing in San Francisco's Transit (ConnectSF Transit Strategy page)", "publisher": "ConnectSF (SFCTA, SFMTA, San Francisco Planning)", "date": null, "type": "official", "url": "https://connectsf.org/transit-strategy/", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. Four goals, seen once (not found again by a later search): \"Make the system work better. Deliver a five-minute network. Renew and modernize our rail system, and Build more rail to San Francisco's busiest places\"."},
  {"id": "connectsf-sftp-page", "title": "San Francisco Transportation Plan (ConnectSF page)", "publisher": "ConnectSF (SFCTA, SFMTA, San Francisco Planning)", "date": null, "type": "official", "url": "https://connectsf.org/san-francisco-transportation-plan/", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"The SFTP draws from previous phases of ConnectSF, including the Transit Strategy and Streets and Freeways Strategy, community input, San Francisco's 2021 Climate Action Plan, and multiple neighborhood, citywide, and regional transportation plans.\""},
  {"id": "sfmta-blog-connectsf-shared-vision", "title": "Connect SF - A Shared Vision for Transit in San Francisco", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/blog/connect-sf-shared-vision-transit-san-francisco", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated blog post (2021 Transit Strategy rollout). \"This includes a new subway along Geary and 19th Avenue, an extension of the Central Subway, and a new Caltrain station in the Bayview.\" Also \"With targeted investments in our street infrastructure, we will deliver a Five-Minute Network\"."},
  {"id": "sfmta-fast-convenient-transit", "title": "Fast and Convenient Transit", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/fast-and-convenient-transit", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"Build new rail projects in places where no amount of bus improvements will be able to meet the demand\" (exact-phrase match), naming Geary Boulevard, 19th Avenue and a Central Subway extension to Fisherman's Wharf (paraphrase); \"Create a fast, frequent network of bus and rail routes that ensure riders never have to wait more than 5 minutes\"."},
  {"id": "sfmta-press-connectsf-2021-04-19", "title": "The SFMTA and ConnectSF Unveil Bold Vision for San Francisco Transit", "publisher": "San Francisco Municipal Transportation Agency", "date": "2021-04-19", "type": "official", "url": "https://www.sfmta.com/press-releases/sfmta-and-connectsf-unveil-bold-vision-san-francisco-transit", "accessed": "2026-10-16", "notes": "Seen in web search results only. The StoryMap \"details improvements we could see in the not-too-distant future: a five-minute network, new rail lines across the city, and critical infrastructure improvements\"; Jeffrey Tumlin: \"Muni's current funding base is broken\"."},
  {"id": "sfcta-sftp-2050-final-2022-12", "title": "San Francisco Transportation Plan 2050, Final Report (December 2022)", "publisher": "San Francisco County Transportation Authority", "date": "2022-12-13", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2023-01/SFCTA_SFTP-2050-Report-FINAL_2022-12-13_0.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only; the PDF wasn't opened. Investment Plan about $80 billion (paraphrase); \"A Vision Plan to guide the allocation of an additional $15 billion potential new transportation revenues through 2050\"; \"Most of this revenue (about 85%) is already committed\"; \"The Investment Plan funds the SFMTA's Muni Metro Modernization/ Subway Modernization Program and BART's Core Capacity Program\"; Link21 among projects \"in the early stage of development\". Geary/19th subway in the 'next generation transit' planning line (paraphrase, pp. 3-27 to 3-28 per the tool)."},
  {"id": "sfcta-blog-sftp-2050-adopted", "title": "Board Adopts San Francisco Transportation Plan 2050", "publisher": "San Francisco County Transportation Authority", "date": "2022-12", "type": "official", "url": "https://www.sfcta.org/blogs/board-adopts-san-francisco-transportation-plan-2050", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"the Transportation Authority Board adopted the San Francisco Transportation Plan, the blueprint for the city's transportation system development and investment over the next 30 years\". The Board agenda of 2022-12-13 lists \"Adopt the San Francisco Transportation Plan 2050\" (Resolution R23-23)."},
  {"id": "sfcta-sftp-2050-appendix-c", "title": "SFTP 2050 Appendix C: SF-CHAMP Analysis Methodology Memo", "publisher": "San Francisco County Transportation Authority", "date": "2022-12-01", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-12/SFCTA_SFTP-2050_Appendix-C-SF-CHAMP-Analysis-Methodology-Memo_2022-12-01.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"Muni Rail Core Capacity: Extend N and M Parkmerced Muni Metro routes to 3-car train lengths\"."},
  {"id": "sfcta-sftp-2050-plus-board-2025-05-20", "title": "San Francisco Transportation Plan 2050+ (Board item 9 presentation)", "publisher": "San Francisco County Transportation Authority", "date": "2025-05-20", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2025-05/SFCTA_Board_ITEM9_SanFranciscoTransportationPlan2050+UpdatePRESENTATION_2025-05-20v2_0.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"Major Transit Projects: The Portal (Downtown Rail Extension), BART/Muni Core Capacity Improvements, Muni Reliability and Efficiency Improvements, Geary/19th Subway, Central Subway Extension\". Adoption of SFTP 2050+ not confirmed."},
  {"id": "sfcta-cmp-2025", "title": "Congestion Management Program 2025", "publisher": "San Francisco County Transportation Authority", "date": "2025", "type": "official", "url": "https://www.sfcta.org/reports/congestion-management-program-2025", "accessed": "2026-10-16", "notes": "Seen in web search results only. SFTP 2050+, \"a minor update to SFTP 2050, will be published in Summer 2026\"."},
  {"id": "sfcta-annual-report-2025", "title": "2025 Annual Report (Board item 6, draft report January 2026)", "publisher": "San Francisco County Transportation Authority", "date": "2026-01-27", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2026-01/SFCTA_Board_Item6_AnnualReportREPORT_2026-01-27_0.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"In December 2022, the Transportation Authority Board adopted the San Francisco Transportation Plan 2050 (SFTP 2050), consistent with the MTC's Plan Bay Area 2050.\""},
  {"id": "sfbos-ordinance-202-15", "title": "Ordinance No. 202-15 (File No. 150873): Subway Master Plan", "publisher": "San Francisco Board of Supervisors", "date": "2015-11", "type": "official", "url": "https://sfbos.archive.sf.gov/ftp/uploadedfiles/bdsupvrs/ordinances15/o0202-15.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Passed November 17, 2015, per the search (paraphrase); makes it City policy to develop a Subway Master Plan within 12 months and update it every four years (paraphrase)."},
  {"id": "sfcta-subway-vision-page", "title": "Subway Vision (project page)", "publisher": "San Francisco County Transportation Authority", "date": null, "type": "official", "url": "https://www.sfcta.org/projects/subway-vision", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"the Board of Supervisors unanimously passed an ordinance drafted by former Supervisor Scott Wiener requiring the City to create a framework for subway expansion throughout San Francisco\"."},
  {"id": "sfcta-subway-vision-2017", "title": "Subway Vision: Shaping our City's Transportation Future", "publisher": "San Francisco County Transportation Authority, SFMTA and San Francisco Planning (ConnectSF)", "date": "2017-06-09", "type": "official", "url": "https://sfcta.org/sites/default/files/2019-02/2016%20Subway%20Vision.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only; the PDF wasn't opened (copy at https://connectsf.org/wp-content/uploads/2016-Subway-Vision.pdf). \"The document provides the general orientation of potential subway corridors, without specifying detailed locations for subway lines and stations.\" \"Common themes in the prior plan review include additional Transbay service, the conversion of the M-Ocean to a full subway and extending it to Daly City, a subway to serve the Geary corridor, and the extension of Caltrain and high-speed rail to downtown San Francisco.\" Figures 6, 7 and 15 (\"Initial Corridor Concepts\"); chapter 4's corridor list not seen."},
  {"id": "connectsf-subway-vision-fact-sheet", "title": "Subway Vision (fact sheet)", "publisher": "ConnectSF (SFCTA, SFMTA, San Francisco Planning)", "date": "2016", "type": "official", "url": "https://connectsf.org/wp-content/uploads/2016/10/Subway.Vision.Fact_.Sheetrev4bd.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Corridor groups for convenience and density (paraphrase); \"These corridors will be grouped, combined, and further studied to maximize benefits of any future subway networks.\""},
  {"id": "sfmta-blog-dream-map-2016", "title": "Draw Your Dream Map to Help Shape the Future of Subways in SF", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016-08-18", "type": "official", "url": "https://www.sfmta.com/blog/draw-your-dream-map-help-shape-future-subways-sf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Example ideas: \"extending the Central Subway to Fisherman's Wharf, building a second Transbay Tube for BART into Mission Bay or extending the Market Street subway across the city to allow for longer trains\"."},
  {"id": "sfmta-blog-visualizing-subways-2016", "title": "Visualizing More Subways for San Francisco", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016-10-18", "type": "official", "url": "https://www.sfmta.com/blog/visualizing-more-subways-san-francisco", "accessed": "2026-10-16", "notes": "Seen in web search results only. By Bradley Dunn. \"At pop up workshops and online, more than 2,600 unique ideas were submitted through our online mapping tool.\""},
  {"id": "sfmta-subway-vision-slides-2016-10-18", "title": "San Francisco Subway Vision (SFMTA Board item 12 slides)", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016-10-18", "type": "official", "url": "https://www.sfmta.com/sites/default/files/agendaitems/2016/10-18-16%20Item%2012%20Subway%20Vision%20-%20slide%20presentation.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Sections on outreach, the heat map, a needs assessment, corridors for evaluation, policy guidance and tradeoffs (delivery timeline, capital cost, station spacing) (paraphrase); images not seen."},
  {"id": "sfmta-blog-subways-2015-09-08", "title": "Subways, Subways & More Subways?", "publisher": "San Francisco Municipal Transportation Agency", "date": "2015-09-08", "type": "official", "url": "https://www.sfmta.com/blog/subways-subways-more-subways", "accessed": "2026-10-16", "notes": "Seen in web search results only. Wiener's list: \"the Central Subway project and a possible extension of that to Fisherman's Wharf, the downtown extension of Caltrain and high-speed rail, a second transbay tube, subway service to the city's west side and to southeastern SF\"."},
  {"id": "sfmta-muni-subway-expansion-project", "title": "Muni Subway Expansion Project (project page)", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/projects/muni-subway-expansion-project", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"no longer active. Please refer to the ConnectSF Transit Strategy for San Francisco's transit expansion priorities.\" Earlier proposal (paraphrase): M Ocean View subway West Portal to Parkmerced, $2.5-3 billion."},
  {"id": "sfmta-muni-subway-expansion-2016", "title": "Muni Subway Expansion Project, Summer 2016", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016", "type": "official", "url": "https://www.sfmta.com/media/2365/download", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"proposes a full subway from West Portal to Parkmerced built under the middle of 19th Avenue\"; stations SF State, Stonestown and Parkmerced, possible Ocean Avenue station (paraphrase)."},
  {"id": "sfmta-m-ocean-view-station-board-2016", "title": "19th Avenue / M Ocean View project, station 2 board (rail)", "publisher": "San Francisco Municipal Transportation Agency", "date": "2016", "type": "official", "url": "https://www.sfmta.com/sites/default/files/projects/2016/Station%202%20Rail.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only: title text \"SAN FRANCISCO STATE UNIVERSITY PARKMERCED DIAZ AVE BANBURY DRIVE PARKMERCED\", apparently map labels. Content not seen; a drawing to trace if wanted."},
  {"id": "sfcta-19th-ave-transit-study-2014", "title": "19th Avenue Transit Study: feasibility study of relocating the Muni M-Ocean View", "publisher": "San Francisco County Transportation Authority", "date": "2014-02", "type": "official", "url": "https://www.sfcta.org/sites/default/files/content/Executive/Meetings/pnp/2014/03/19thave_final_report_v23_low_res.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. The \"Longer Subway and Bridge\" option gave the greatest benefits; $520 million (2013 dollars), range $420-780 million (paraphrase)."},
  {"id": "sfcta-prop-k-allocations-2022-03-08", "title": "Prop K Sales Tax Allocation Request Forms, March 2022 Board Action", "publisher": "San Francisco County Transportation Authority", "date": "2022-03-08", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-03/SFCTA_Board_GroupedAllocationsENCLOSURE_2022-03-08_0.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. The earlier vision \"envisioned undergrounding the M-Ocean View line between West Portal and Parkmerced\", not prioritized in ConnectSF (paraphrase), which chose \"aggressive surface optimization to provide subway-like service on the surface of the M-Ocean View line\"; $965,948 deobligated from \"Muni Subway Expansion Project Development\"."},
  {"id": "sfcta-geary-19th-strategic-case-2026", "title": "Geary/19th Ave Subway and Regional Connections Study: Strategic Case (CAC item 12 enclosure)", "publisher": "San Francisco County Transportation Authority", "date": "2026-05", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2026-05/SFCTA_CAC_Item12_Geary-19thSubwayStudyFinalReportENCLOSURE_2026-05-27.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only; the PDF wasn't opened. \"dual-track subway approximately 10 miles in length, with approximately 5 – 6 stations\"; \"approximately $20B – $30B in 2026 dollars\"; \"would serve up to 182,000 daily riders, of which up to 71,000 are net new trips\"; \"end to end travel times from Daly City to Downtown San Francisco of 16 to 19 minutes\"; \"terminating roughly near the existing Daly City Bay Area Rapid Transit (BART) station\"; \"a grade separated, high capacity rapid transit investment is both needed and viable\". Figures 1-2, 3-1, 3-2 and 3-3 are maps."},
  {"id": "sfcta-geary-19th-strategic-case-page", "title": "Geary/19th Ave Subway and Regional Connections Study Strategic Case (report page)", "publisher": "San Francisco County Transportation Authority", "date": "2026-07", "type": "official", "url": "https://www.sfcta.org/reports/geary19th-ave-subway-and-regional-connections-study-strategic-case", "accessed": "2026-10-16", "notes": "Seen in web search results only. Page dates: \"Final Report: July 2026\", \"Draft Report: May 2026\". The study \"did not select a preferred alternative or advance planning/design beyond a pre-feasibility level\"."},
  {"id": "sfcta-geary-19th-project-page", "title": "Geary/19th Avenue Subway and Regional Connections Study (project page)", "publisher": "San Francisco County Transportation Authority", "date": null, "type": "official", "url": "https://www.sfcta.org/projects/geary19th-avenue-subway-and-regional-connections-study", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. Timeline to a June 2026 final report and a June 9, 2026 Board presentation; phases from strategic planning to implementation on a 15+ year horizon (paraphrase)."},
  {"id": "sfcta-geary-19th-cac-2026-02-25", "title": "Geary/19th Ave Subway & Regional Connections Study (CAC item 8 update presentation)", "publisher": "San Francisco County Transportation Authority", "date": "2026-02-25", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2026-02/SFCTA_CAC_Item8_Geary19thAveSubwayandRegionalConnectionsStudyUpdatePRESENTATION_2026-02-25.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"initial planning-level cost estimate in range of $20 billion to $30 billion\"; open question \"Where to Terminate/Integrate at/near Daly City\"."},
  {"id": "sfcta-geary-19th-town-hall-recap-2026", "title": "Geary/19th Avenue Subway Study Virtual Town Hall Recap", "publisher": "San Francisco County Transportation Authority", "date": "2026-03-12", "type": "official", "url": "https://www.sfcta.org/blogs/geary19th-avenue-subway-study-virtual-town-hall-recap", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"the subway is intended to complement, not replace, existing bus service on Geary Boulevard\"; \"tunneling and station construction drive the majority of costs\"; \"existing funding sources are not enough to deliver the project\"."},
  {"id": "sfcta-blog-geary-19th-potential-2024", "title": "Learn More About the Potential of a Geary/19th Subway", "publisher": "San Francisco County Transportation Authority", "date": "2024", "type": "official", "url": "https://www.sfcta.org/blogs/learn-more-about-potential-geary19th-subway", "accessed": "2026-10-16", "notes": "Seen in web search results only; exact date not seen (around the July 17 and 20, 2024 town halls). Requested by Board Vice Chair Myrna Melgar; recommended in the San Francisco Transportation Plan; construction at least 15 years away (all paraphrase)."},
  {"id": "sfcta-geary-19th-town-hall-deck-2024", "title": "Geary/19th Ave Subway & Regional Connections Study (virtual town hall slides)", "publisher": "San Francisco County Transportation Authority", "date": "2024-07", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-07/Geary-19th%20Virtual%20Town%20Hall%20Deck.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"expected future Geary/19th Ave Subway ridership is 300,000 per day\"."},
  {"id": "sfcta-board-2026-06-09", "title": "Transportation Authority Board meeting, June 9, 2026 (agenda)", "publisher": "San Francisco County Transportation Authority", "date": "2026-06-09", "type": "official", "url": "https://www.sfcta.org/events/transportation-authority-board-131", "accessed": "2026-10-16", "notes": "Seen in web search results only; the match of this page to the June 9, 2026 meeting is the search tool's. \"Adopt the Geary/19th Ave Subway and Regional Connections Study Final Report - ACTION\"."},
  {"id": "sfcta-blog-listing-2026-06", "title": "SFCTA blog (listing), June 2026 posts on the Geary/19th study", "publisher": "San Francisco County Transportation Authority", "date": "2026-06", "type": "official", "url": "https://www.sfcta.org/blog", "accessed": "2026-10-16", "notes": "Seen in web search results only; the post's own URL wasn't shown. \"The Transportation Authority Board approved the Geary/19th Avenue Subway and Regional Connections Study Final Report at the June 9 meeting\"; \"The Board gave final approval at the June 23 meeting.\""},
  {"id": "sfcta-geary-19th-public-comment-2026-05", "title": "Public comments on the Geary/19th Subway Study final report (CAC item 12)", "publisher": "Members of the public, published in an SFCTA packet", "date": "2026-05-27", "type": "primary_document", "url": "https://www.sfcta.org/sites/default/files/2026-05/SFCTA_CAC_Item12_Geary-19thSubwayStudyFinalReportPUBLICCOMMENT_2026-05-27_0.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Not an official finding: objections to the left turn in the concept drawings, a suggested Presidio-area station, and about 47,000 weekday 38/38R boardings in April 2026 (all paraphrase)."},
  {"id": "sfcta-prop-l-ep13-geary-pif-2024", "title": "Prop L Project Information Form: EP13 Geary 19th Ave Subway Placeholder (draft)", "publisher": "San Francisco County Transportation Authority", "date": "2024-06", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-06/EP13%20Geary%2019th%20Ave%20Subway%20Placeholder%20PIF%20DRAFT.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only: title only, and the Prop L category \"13- Next Generation Transit Investments\". Amount not seen."},
  {"id": "sfmta-geary-bip-faq", "title": "Geary Boulevard Improvement Project Frequently Asked Questions (FAQs)", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/geary-boulevard-improvement-project-frequently-asked-questions-faqs", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated (updated after the summer 2026 study). \"The ConnectSF Transit Investment Strategy calls for investment in a Geary-19th Avenue subway to provide fast, high-capacity service and improve regional access, but would take more than a decade to deliver at minimum.\""},
  {"id": "sfmta-geary-bip-project", "title": "Geary Boulevard Improvement Project (project page)", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/projects/geary-boulevard-improvement-project", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. In construction, Stanyan Street to 34th Avenue, $48 million, 38 and 38R; utility work from late 2024, about three years (all paraphrase)."},
  {"id": "sfmta-geary-rapid-faq", "title": "Geary Rapid Project: FAQs", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/project-updates/geary-rapid-project-faqs", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"major obstacles to Geary rail include the high capital cost, a scarcity of funding sources, and the scale of disruption during construction\"; \"early efforts to advance Geary rail in the 1950's and again in the 1980's were met with neighborhood opposition\"."},
  {"id": "sfmta-central-subway-extension", "title": "Central Subway Extension (project page)", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/projects/central-subway-extension", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated (2026 content). Relaunched in 2026 as the Central Subway North Beach Extension Study, a one-station extension through the unfinished tunnels, completion mid-2026 to mid-2028 (paraphrase); \"in January 2026, District 3 Supervisor Danny Sauter convened a hearing on a variety of topics related to the T Third\"."},
  {"id": "sfmta-t-third-phase-3-study-2015", "title": "T-Third Phase 3 Concept Study, Final Report", "publisher": "San Francisco Municipal Transportation Agency", "date": "2015-01-08", "type": "official", "url": "https://www.sfmta.com/sites/default/files/feature-location-pdf/1._t-third_phase_3_concept_study_-_final_report_1-8-15.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"A station in North Beach at or near Washington Square is present in all concept alignments.\" \"from a low of $367 million (subway and surface to Kirkland), to a high of $1.400 billion (subway connecting all three locations) in 2014 dollars\". \"This study will not recommend a best concept alignment.\""},
  {"id": "sfmta-blog-central-subway-north-west", "title": "Central Subway Extension - Looking to the North and West", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/blog/central-subway-extension-looking-north-and-west", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated (2018 alternatives study). Destinations studied: North Beach, Fisherman's Wharf, the Marina, Cow Hollow and the Presidio (paraphrase)."},
  {"id": "sfmta-central-subway-extension-boards-2018", "title": "Central Subway Extension Alternatives Study, kickoff presentation boards", "publisher": "San Francisco Municipal Transportation Agency", "date": "2018-10", "type": "official", "url": "https://www.sfmta.com/sites/default/files/reports-and-documents/2018/10/central_subway_extension_kickoff_presentation_boards.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only: title only. Possible maps to trace."},
  {"id": "sfcta-pax-project-page", "title": "Pennsylvania Avenue Extension (project page)", "publisher": "San Francisco County Transportation Authority", "date": null, "type": "official", "url": "https://www.sfcta.org/projects/pennsylvania-avenue-extension", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"The Transportation Authority is studying potential tunnel alignments that will have trains running underground along Seventh Street and Pennsylvania Avenue.\" The long alternative \"requires replacement of the existing 22nd Street Caltrain Station\"."},
  {"id": "sfcta-pax-initiation-report-2022", "title": "Pennsylvania Avenue Extension (PAX) Project Initiation Report, Resolution R23-05", "publisher": "San Francisco County Transportation Authority", "date": "2022-07", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2022-08/R23-05%20PAX%20Project%20Initiation%20Report%20Signed.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"approximately $2.0-2.5 billion, excluding potential costs to replace the 22nd Street Station\"; \"PAX is in the planning stage and is not yet environmentally cleared.\" Presentation of 2022-07-12: https://www.sfcta.org/sites/default/files/2022-07/SFCTA_Board_PAXProjectInitiationReportPRESENTATION_2022-07-12.pdf"},
  {"id": "sfcta-budget-work-program-memo-2025-04", "title": "Proposed Annual Budget and Work Program, FY 2025/26 (CAC item 6 memorandum)", "publisher": "San Francisco County Transportation Authority", "date": "2025-04-24", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2025-05/SFCTA_CAC_ITEM6_ProposedAnnualBudgetandWorkProgramMEMO_2025-05-28.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"We will advance the PAX Bridging Study in FY 2025/26.\""},
  {"id": "sfmta-muni-metro-capacity-study", "title": "Muni Metro Capacity Study (project page)", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/projects/muni-metro-capacity-study", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"On December 2, 2025, the SFMTA Board of Directors unanimously approved the Muni Metro Capacity Study final report.\" \"even in our highest future ridership forecast, we do not need to use this strategy of removing lines from the Market Street subway within the 10–15-year program\"."},
  {"id": "sfmta-muni-metro-capacity-cac-2025-11-06", "title": "Muni Metro Capacity Study (SFMTA CAC presentation)", "publisher": "San Francisco Municipal Transportation Agency", "date": "2025-11-06", "type": "official", "url": "https://sfmta.com/media/43793/download?inline=", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"In addition to the current plan for Parkmerced to provide a terminal for 3-car M service, the Muni Metro Capacity Study recommends providing infrastructure to enable the J Church to be extended to Stonestown.\""},
  {"id": "sfmta-muni-metro-capacity-faq", "title": "Muni Metro Capacity Study: Frequently Asked Questions", "publisher": "San Francisco Municipal Transportation Agency", "date": null, "type": "official", "url": "https://www.sfmta.com/project-updates/muni-metro-capacity-study-frequently-asked-questions", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. The ConnectSF Transit Strategy prioritized modernizing and expanding Muni Metro's capacity as one of four critical investment areas (paraphrase); \"That makes us the fourth busiest light-rail system in the nation.\""},
  {"id": "sfcta-prop-l-5ypp-muni-core-capacity-2024", "title": "Prop L 5YPP: Muni Rail Core Capacity", "publisher": "San Francisco County Transportation Authority", "date": "2024-02-27", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2024-02/SFCTA_Board_PropL5-YearPrioritizationProgramsENCLOSURE2MuniCoreCapacity_2024-02-27.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"Total Funding: $720M; EP: $57M\"."},
  {"id": "sfcta-bayview-caltrain-study", "title": "Bayview Caltrain Station Location Study", "publisher": "San Francisco County Transportation Authority", "date": null, "type": "official", "url": "https://www.sfcta.org/bayview-caltrain", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. \"recommends a site at Oakdale Avenue, adjacent to the former Southeast Community Facility at 1800 Oakdale, as the preferred location\"; timeline \"July - August 2026 Recommendation and outreach\", \"Fall 2026 Final Report\"."},
  {"id": "sfcta-prop-l-ep11-bayview-5ypp-2023", "title": "Prop L 2023 5YPP: EP 11 Bayview Caltrain Station (approved 10.24.23)", "publisher": "San Francisco County Transportation Authority", "date": "2023-10-24", "type": "official", "url": "https://www.sfcta.org/sites/default/files/2023-12/EP%2011%20Bayview%20Caltrain%20Station%20Prop%20L%202023%205YPP%20Approved%2010.24.23%20with%20links.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Cost estimate $100M assuming an Oakdale location; milestone of 35% design and environmental clearance in summer 2026 (paraphrase)."},
  {"id": "mtc-pba-2050-plus-adopted-2026-03-25", "title": "MTC, ABAG Adopt Final Plan Bay Area 2050+ and Environmental Impact Report", "publisher": "Metropolitan Transportation Commission", "date": "2026-03-25", "type": "official", "url": "https://mtc.ca.gov/news/mtc-abag-adopt-final-plan-bay-area-2050-and-environmental-impact-report", "accessed": "2026-10-16", "notes": "Seen in web search results only. \"MTC adopted Plan Bay Area 2050+ and certified the plan's associated Environmental Impact Report, giving final approval to the region's long-range plan.\" planbayarea.org/finalplan gives ABAG's adoption on March 19, 2026."},
  {"id": "planbayarea-2050-plus-final-plan", "title": "Plan Bay Area 2050+ (final plan page)", "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments", "date": null, "type": "official", "url": "https://planbayarea.org/finalplan", "accessed": "2026-10-16", "notes": "Seen in web search results only. Undated. ABAG \"adopted the plan on March 19, 2026 followed by the Metropolitan Transportation Commission (MTC) on March 25, 2026\"."},
  {"id": "pba2050plus-project-list-2026-03", "title": "Plan Bay Area 2050+ Transportation Project List Report (final)", "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments", "date": "2026-03", "type": "official", "url": "https://planbayarea.org/sites/default/files/documents/2026-04/Final_Plan_Bay_Area_2050_Plus_Transportation_Project_List_Report.pdf", "accessed": "2026-10-16", "notes": "Same id as proposed in docs/research/ideal/link21-dumbarton-express-rail.md for this document; merge the notes. Seen in web search results only. Studies and project development funding for Diridon Station, the Geary/19th Ave Subway, the Central Subway Extension, the San Jose Airport Connector, SMART to Suisun City, Link21 and a San Mateo Bridge express bus (paraphrase); line-item amounts not seen."},
  {"id": "mtc-pba-2050-plus-draft-project-list-2025-10", "title": "Plan Bay Area 2050+ Draft Transportation Project List Report", "publisher": "Metropolitan Transportation Commission and Association of Bay Area Governments", "date": "2025-10", "type": "official", "url": "https://planbayarea.org/sites/default/files/documents/Draft_Transportation_Project_List_Report.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. The studies line covers \"transit studies and project development activities, including alternatives and/or business case analyses; design, technical, and planning analyses; and initiating environmental analyses and review\", with the Geary/19th Ave Subway and the Central Subway Extension as examples (paraphrase)."},
  {"id": "mtc-pba-2050-plus-project-performance-2024-07", "title": "Draft Project Performance Assessment Summary Table (Plan Bay Area 2050+)", "publisher": "Metropolitan Transportation Commission", "date": "2024-07", "type": "official", "url": "https://mtc.ca.gov/sites/default/files/documents/2024-07/3bii_24-0707_Draft%20Project%20Performance%20Assessment%20Summary%20Table.pdf", "accessed": "2026-10-16", "notes": "Seen in web search results only. Geary/19th Avenue Subway, lifecycle cost $15.2 billion (2019 dollars), rated even; Central Subway Extension $1.2 billion, rated advancing (paraphrase)."}
]
```
