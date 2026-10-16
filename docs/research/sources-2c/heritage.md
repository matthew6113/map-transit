# Heritage railways carrying the public today, nine Bay Area counties (present era)

Research for the map's `heritage` mode (docs/SPEC.md: "Heritage railways", off by default;
docs/SCHEMA.md modes table: Niles Canyon, Napa Valley Wine Train, Western Railway Museum).
Used for `data/present/heritage/`. Date of research: 2026-10-16.

## Access in this session (what could and could not be read)

| Host | Result |
|---|---|
| Operators' sites (ncry.org, winetrain.com, wrm.org, spcrr.org, ggrm.org, redwoodvalleyrailway.com, ggls.org, traintown.com, bjwrr.org, ctrc.org, historysanjose.org) | **Unreachable** (proxy 403; WebFetch DNS failure). Seen only as WebSearch result summaries, tagged [srch]: the search tool's wording, which may not be verbatim. |
| Public agencies (ebparks.org, docs.cpuc.ca.gov, www.cpuc.ca.gov, stb.gov, fra/railroads.dot.gov, countyofnapa.org, acgov.org, solanocounty.gov) | **Unreachable.** CPUC decisions seen only as [srch]. |
| files.cpuc.ca.gov | **Reachable.** CPUC Rail Crossings and Engineering Branch GO 88-B letters downloaded and read [pdf]/[img]. |
| archive.org (metadata, full text, page images, full-text search) | **Reachable.** Lending-library books give only full-text-search snippets [snip]; open items read in OCR text [txt] or on the page image [img]. |
| Overpass API, openstreetmap.org, Wikipedia, web.archive.org | **Unreachable.** OSM geometry and way names were read instead from Overture Maps' transportation theme (release 2026-09-23.1, the repo's release), which carries the OSM `name` and OSM way ids (ODbL). OSM's raw `railway=`/`usage=`/`gauge=` tags are not visible that way. |

**Tags.** Source type: [O] official (public agency, adopted plan, regulatory filing; the operator's own
site counts as primary for its own operations), [P] primary periodical, directory or book, [W]
Wikipedia, a pointer only. How read: [img] on the page image myself; [pdf] in the PDF/its text myself;
[txt] in archive.org OCR text myself, page image not checked; [snip] archive.org full-text-search
snippet only (lending item, page not seen); [srch] WebSearch summary only (page not opened); [ds]
computed from the Overture/OSM dataset myself.

The pass's downloads and scripts were not kept; the URLs and archive.org ids below reopen each source.

---

## 1. Niles Canyon Railway (Sunol – Niles), Alameda County

**Summary.** Full-size, standard gauge. Operated by the Pacific Locomotive Association (PLA) on a
right-of-way owned by Alameda County. Public trains run on select weekends, March–October, plus the
Train of Lights in Nov–Dec, boarding at Sunol. It runs on the Southern Pacific's ex-1869 (Western
Pacific / Central Pacific) transcontinental main line through Niles Canyon, where SP's service ended in 1984.
The first public trains ran on **May 21, 1988** (Sunol–Brightside).

| Fact | Source | Where | Quote (≤40 words) | Tags |
|---|---|---|---|---|
| Operator PLA; county owns the right-of-way; few excursion trains | CPUC RCEB, GO 88-B letter G.10-06-014, July 22, 2010 (SR 84 Rosewarnes and Farwell underpasses) | https://files.cpuc.ca.gov/rail/RCEB/GO88/2010/G1006014%20SR84%20Niles%20Canyon%20-%20Alameda%20Co%20(Caltrans).pdf, p. 1 | "under track of the Pacific Locomotive Association, Inc. (PLA) … The railroad right-of-way is owned by the County … A few tourist/excursion trains per week operate along the track at 10 MPH or less." | [O][pdf] |
| Operator; line name; track reaches east of Sunol into Pleasanton (MP 38.30), 6 trains/yr there | CPUC RCEB, XREQ 2016030011, Apr 11, 2016 (Pleasanton-Sunol Road, CPUC No. 091-38.30) | https://files.cpuc.ca.gov/rail/RCEB/GO88/2016/XREQ2016030011_SunolPleasantonRd_Pleasanton.pdf, p. 1 | "the Niles Canyon Railway track in the City of Pleasanton … Pacific Locomotives Association operates the Niles Canyon Railway on this line … Six trains pass through the crossing per year at a maximum speed of 15 miles per hour." | [O][img] |
| Mileposts: Kilkare Rd (Sunol) MP 35.60; Fremont (Niles) MP 29.60; PLA operator; county owns ROW | CPUC D.23-06-009 (June 8, 2023), A.22-12-003 (EBRPD trail crossing) | https://docs.cpuc.ca.gov/PublishedDocs/Published/G000/M511/K123/511123918.PDF | "…over one Niles Canyon Railway track near milepost 29.60 in the City of Fremont … the Kilkare Road crossing located on mile post 35.60 of the Niles Canyon Railway." | [O][srch], **not read** |
| First public train, May 21, 1988; SP ended service 1984; county took title; 7 miles Niles–Sunol | Elrond Lawrence, "Recreating the SP aura", *Classic Trains*, Spring 2009 | archive.org `classic-trains-spring-2009-images`, p. 69 | "SP ended service on its historic route in 1984. Alameda County took title to the right of way" and "On May 21, 1988, California Western railbus M200 rolled into Sunol, and the Niles Canyon Railway was born." | [P][img] |
| Length then; both ends board | same | p. 69 | "It has expanded to nearly 10 miles … Passengers can now board at either Niles or Sunol." | [P][img] |
| East end in 2009 | same | p. 70 | "East of Sunol, PLA's grand plan is to rebuild the SP line to Pleasanton, extending its track another 3 miles. Currently, the line ends just beyond a connection with the UP at Hearst siding." | [P][img] |
| Not yet running in 1988; first route Sunol–Brightside | Drury, *Guide to Tourist Railroads and Railroad Museums* (Kalmbach, 1988) | archive.org `guidetotouristra0000drur_u6q2` | "in 1986 the group established the Niles Canyon Railway. It had not begun operations at press time. A route from Sunol to Brightside and back (2 miles each way) is ex[pected]…" | [P][snip] |
| 1990: Sunol–Brightside, 2 miles | same, 1990 ed. | `guidetotouristra0000drur` | "through a rustic, winding river canyon between Sunol and Brightside, 2 miles." | [P][snip] |
| 1995: Sunol–Niles, 6 miles | same, 1995 ed. | `guidetotouristra04eddrur` | "through a rustic, winding river canyon between Sunol and Niles, 6 miles." | [P][snip] |
| 1999: operates Sunol–Niles | *Journal* (Albany, CA), July 22, 1999 | `journal07221999` | "The PLA, founded in 1961 and organized as a non-profit corporation in 1965, operates the Niles Canyon Railway between Sunol and Niles" | [P][txt] |
| Start of passenger service per operator | Niles Canyon Railway, "About" | https://www.ncry.org/about/ | Search summary: return of passenger service to Niles Canyon dated May 21, 1988; first section Sunol–Brightside took "over a year". | [O-operator][srch] |
| 2026 schedule | NCRy, "2026 Train Rides" and events calendar | https://www.ncry.org/?p=7206 ; https://www.ncry.org/events/list | "Ride through Niles Canyon behind diesel & steam power on select weekends scheduled from March through October 2026. Two departures on each day: 10:30 AM and 1:00PM." "Public trains depart ONLY from our Sunol Depot unless noted" | [O-operator][srch] |
| Rails reached downtown Niles Sept 19, 1998 | Wikipedia, "Pacific Locomotive Association" | https://en.wikipedia.org/wiki/Pacific_Locomotive_Association | (pointer only) | [W][srch] |

**Geometry (OSM via Overture 2026-09-23.1) [ds].** 19 OSM ways named **"Niles Canyon Railway"**,
Overture class `standard_gauge`, 16.97 km of track in all; the longest path through them runs
16.19 km (10.06 mi), from 37.57827,-121.98161 (Niles, west end) to 37.63708,-121.88604 (east of
Sunol, toward Pleasanton). Way ids: w115033963 w115033964 w224543856 w231842937 w231842939 w231842941
w23998297 w23998355 w23998356 w23998436 w23998442 w27091022 w27091053 w37843919 w37843920 w460715204
w6337096 w6337596 w900447706. From Brightside (Overture place "Niles Canyon Railway Museum", 5550 Niles
Canyon Rd) to the west end it is 7.76 km (4.82 mi) along these ways.
**Former main line:** yes. It is the 1869 Western Pacific (Central Pacific/SP) line through Niles
Canyon (Classic Trains p. 69 [img]; the repo's past segment `cp-niles-livermore` already notes "the
Niles Canyon Railway runs on part of it today"). The CPUC uses railroad line number 091.

**Conflicts.**
- Founding: "in 1986 the group established" (Drury 1988, 1995) against first public trains on
  May 21, 1988 (Classic Trains; operator). The 1987 county agreement is [srch] only. The time taken to build
  the first section is "over a year" (About page) or "two years" (2018 PLA bulletin), both [srch].
- Length Sunol–Niles: 6 mi (Drury 1995); 7 mi (Classic Trains 2009); the CPUC mileposts 35.60 − 29.60 = 6.0
  ([srch]); OSM gives about 6.8 mi (Brightside–west end 4.82 mi, plus Sunol–Brightside "2 miles",
  Drury 1988).
- **Unsourced:** the date trains first reached Niles (1998 is [W] only); the ICC/STB abandonment
  docket for SP in 1984 (stb.gov unreachable).

---

## 2. Napa Valley Wine Train (Napa – St. Helena), Napa County

**Summary.** Full-size, standard gauge. Operated by Napa Valley Wine Train, Inc. over the Napa Valley
Railroad Co. (NVRR) track, the former SP Napa Valley branch, bought from SP in 1987. Dining trains run
daily (four passenger trains a day through Soscol Ave per the CPUC, 2020–21) from the McKinstry St
station in Napa to St. Helena and back, 36 miles round trip. The first passenger run was **September 16,
1989**, after CPUC approval on August 23, 1989.

| Fact | Source | Where | Quote | Tags |
|---|---|---|---|---|
| Railroad/operator names, crossing ids | CPUC RCEB, XREQ 2015040007, May 27, 2015 (SR 29 at Whitehall Lane, CPUC No. 087-84.80) | https://files.cpuc.ca.gov/rail/RCEB/GO88/2015/XREQ2015040007_WhitehallLane_%20Napa.pdf, p. 1 | "crossing … of the Napa Valley Railroad track which operates the Napa Valley Wine Train, Inc. (NVWT) in Napa County … The NVWT assumes maintenance responsibilities and operating rights at the crossing." | [O][pdf] |
| Frequency, speed (Napa) | CPUC RCEB, XREQ 2021060004, June 28, 2021 (Soscol Ave, CPUC No. 087-69.90) | https://files.cpuc.ca.gov/rail/RCEB/GO88/2021/XREQ2021060004_SoscolAvenue_Napa.pdf, p. 1 | "The NVRR operates four passenger trains per day at a maximum speed of 25 miles per hour through the crossing." | [O][pdf] |
| Same in 2020; 2010 | XREQ 2020070008 (July 28, 2020); G.10-08-009 (Sept 17, 2010, Yajome St, 087-70.60) | files.cpuc.ca.gov/rail/RCEB/GO88/2020/…, …/2010/G1008009… | 2020: "NVRR operates four passenger trains per day at a maximum speed of 25 miles per hour." 2010: "NVRR currently operates approximately 4 trains per day at 10 mph over this line." | [O][pdf] |
| Still the operator in 2023 | XREQ 2023060004, June 30, 2023 (Redwood Rd, 087-71.80) | https://files.cpuc.ca.gov/rail/RCEB/GO88/2023/XREQ2023060004_Redwood%20Rd_Napa_NVRR.pdf | "the Redwood Road rail crossing (crossing) of the Napa Valley Wine Train (NVRR) track(s), in the City of Napa" | [O][pdf] |
| CPUC approval Aug 23, 1989; service to begin Sept 16; 36-mile round trip | *Railfan & Railroad*, Nov. 1989, "Railnews: Napa Valley" | archive.org `railfan-railroad-nov-1989-images`, p. 46 | "On August 23, 1989, the California Public Utilities Commission gave the highball to the Napa Valley Wine Train for tourist operations on the Napa Valley Railroad" and "will begin service as early as September 16" | [P][img] |
| Same item: trip | same, p. 46 | | "Tickets for the 36-mile, three-hour round trips cost $25.00" | [P][img] |
| Purchase 1987; inaugurated Sept 16, 1989 | *Railways of Australia NETWORK*, Oct–Dec 1990 (vol. 27 no. 4), "Tracks" | archive.org `network_australian_railways_journal-vol_027-no_04`, p. 50 | "In 1987, acquisition of 125 acres of right-of-way and 20 miles of Southern Pacific track between Napa and Calistoga was bought by the Napa Valley Wine Train Inc." and "on 16 September 1989 … a round-trip daily service (except Monday) was inaugurated between Napa and St. Helena." Same page: "luncheon run (58 kilometres at an average speed of 18 km/h)". | [P][img] |
| Operator's own date and route | Napa Valley Wine Train, "Our Story" / "About" | https://www.winetrain.com/about-the-wine-train/our-story/ | "September 16, 1989, marked the inaugural passenger voyage of the Napa Valley Wine Train." Route: "36-mile round trip, from the train station near Downtown Napa at the Oxbow Commons to St. Helena and back" | [O-operator][srch] |
| 1990s service (city document) | City of Napa, *Envision Napa 2020, Background Report* (adopted 12/1/1998) | archive.org `C124920986`, p. 3-15 | "the Wine Train makes three round trips per day between Napa and St. Helena. The only terminal is in Napa on McKinistry Street north of First Street just west of the Napa River." | [O][txt] |
| Running in 2026 | Wine Industry Advisor, Aug 31 and Sept 8, 2026 (event announcements) | https://wineindustryadvisor.com/2026/09/08/… | Search summary: a "Love Line" trip "three hours round trip from Downtown Napa to St. Helena", launching February 2027. | [P][srch] |
| Public-utility disputes | CPUC D.01-06-034, D.03-01-042, D.03-10-024 (City of St. Helena et al. v. Napa Valley Wine Train) | https://docs.cpuc.ca.gov/published/Final_decision/22943.htm | Search summary only: 2001 decision found the excursion service not a public utility; reversed on rehearing in 2003. | [O][srch], **not read** |
| FRA filing names NVRR | *Federal Register* 77:242, Dec 17, 2012 (FRA waiver petition) | archive.org `sim_federal-register-find_2012-12-17_77_242` | "Napa Valley Railroad/Napa Valley Wine Train (NVRR) has petitioned the Federal Railroad [Administration]" | [O][snip] |
| CEQA case | *Napa Valley Wine Train, Inc. v. Public Utilities Com.* (1990) 50 Cal.3d 370 | cited in archive.org `guidetocaliforni00mich` | "exempted from CEQA review the so-called 'Wine Train' project, which would transport tourists" | [P][snip], case not read |

**Geometry [ds].** 27 OSM ways named **"Napa Valley Railroad"**, class `standard_gauge`,
32.76 km (20.36 mi), from 38.28043,-122.28109 (south Napa, where OSM's "Napa Subdivision" continues
south) to 38.51910,-122.48259 (north of St. Helena). From the station (Overture place "Napa Valley Wine
Train", 1275 McKinstry St, 38.30246,-122.28366) to the Overture place "Napa Valley Wine Train – St.
Helena Station" (38.50769,-122.47146) it is 28.67 km (**17.82 mi**) along these ways, which agrees with
the 36-mile round trip. Way ids: w1125214414 w1125214415 w1128433150–3 w1128435263 w1128435264
w1436294288 w1436294289 w239373239 w239373240 w26212737 w288259410 w288263035 w288263036 w322381609
w331004028 w765292116 w765292117 w87448676 w87448689 w87450794 w87450795 w87472427 w87476761 w87503616.
**Former main line?** No. It is a branch: the Napa Valley Railroad of 1865–68, then California Pacific,
Central Pacific and SP. The repo's past segments `calp-napa-junction-yountville` and
`calp-yountville-st-helena` already draw this track from Overture; the latter's notes say "today the
Napa Valley Wine Train runs here".

**Conflicts.** R&R (Nov 1989) gives Sept 16 only as a planned date; the operator ([srch]) and *Network*
([img]) give it as the actual inaugural date. *Network* says SP's Napa Valley services "were abandoned in
1984". That conflicts with the repo's sources (no regular passenger trains after 1929) and probably means
freight; it is unverified. "20 miles … between Napa and Calistoga" (*Network*) against the OSM named track, which ends
north of St. Helena (20.36 mi from south Napa).
**Unsourced:** the CPUC decision number of August 23, 1989 (pre-1995 decisions aren't online; CPUC
library); the ICC/STB file for SP's 1987 sale.

---

## 3. Western Railway Museum (Rio Vista Junction, south on the ex-Sacramento Northern), Solano County

**Summary.** Full-size, standard-gauge electric interurban and streetcar museum of the Bay Area Electric
Railroad Association (BAERA), 5848 State Hwy 12. It is open weekends, with a 50-minute ride south on the
former Sacramento Northern Oakland–Sacramento main line, an 11-mile round trip (10 miles in earlier
descriptions). The museum has run public rides on its own track since at least 1968 (Trains); it was "operating every
weekend" in 1980–82 (US Army Corps document). It operated an 8-mile stretch of the SN main line by 1989, and the UP
gave it 22 miles of right-of-way in 1993. **The start of today's electrified main-line excursion is unsourced.**

| Fact | Source | Where | Quote | Tags |
|---|---|---|---|---|
| Weekend operation, 1980 | US Army Corps of Engineers public notice 12950-58, *North Bay Aqueduct (Phase II)*, May 1982, §5.9.2.1 (citing a June 1980 communication from the museum) | archive.org `DTIC_ADA116061` | "Other sections of Sacramento Northern track are used only occasionally. The California Railway Museum has its own track at Rio Vista Junction operating every weekend." | [O][txt] |
| Public rides by 1968 | *Trains*, 1968 (events listing) | archive.org `trainsmagazineof28unse_5` | "California Railway Museum operates streetcar, interurban, and … takes place Sundays and holidays. Location is Rio Vista Junction on state Highway 12, 10 miles east of Fairfield" | [P][snip] |
| Established 1960 | Drury, *Guide to Tourist Railroads…* 1987 and 1995 | `guidetotouristra0000drur_o3k6`, `guidetotouristra04eddrur` | "Established in 1960, the Western Railway Museum is operated by…" | [P][snip] |
| 1989: own 1½ mi under wire plus 8 mi of SN main line | *Railfan & Railroad*, March 1989, "Railnews: The Western Railway Museum" | archive.org `railfan-railroad-mar-1989-images`, p. 30 | "In addition to 1½ miles of its own trackage under wire, WRM operates an eight-mile segment of the former Sacramento Northern Oakland-Sacramento main line (now an unused UP branch)." | [P][img] |
| 1992: rides north to Dozier | AAA *TourBook California/Nevada* 1992 | `aaatourbookcalif00amer` | "Rides from Rio Vista Junction to Dozier available Mar.-Apr. and Sept.-Oct." | [P][snip] |
| 1993 UP gift of 22 miles | WRM, history page | https://www.wrm.org/ (history) | "during 1993, the Union Pacific Railroad made a gift of 22 miles of right-of-way to our museum." | [O-operator][srch] |
| Current ride | WRM, "Plan your visit" | https://www.wrm.org/visit/plan-your-visit | "a 50-minute ride on a historic Interurban train down the old Sacramento Northern Railway Line"; trains "every weekend"; group materials: "11-mile round trip". 2012 extension to Birds Landing Rd ([srch], page not identified). | [O-operator][srch] |
| 2026 | WRM, "Santa Trains" | https://www.wrm.org/item/200-santatrains | Santa Trains "returning for the 2026 holiday season", Saturdays and Sundays. | [O-operator][srch] |

**Geometry [ds].** 23 OSM ways named **"Western Railway Museum"**, class `standard_gauge`, 10.41 km of
track in all; the longest path runs 9.25 km (5.75 mi) from 38.20571,-121.87546 (north end at the
museum; Overture place "Western Railway Museum" 38.20367,-121.87445) to 38.12741,-121.87703 (south
end, where OSM's "Dozier to Pittsburg" ways continue, flagged abandoned/disused). Museum to south end
is 9.01 km (5.60 mi), which agrees with the 11-mile round trip. North of the museum the ex-SN toward Dozier
is "Dozier to Pittsburg" (partly disused/abandoned in OSM). Way ids: w1251725682 w323745121 w413056596
w460689974 w56247936 w56247958 w56247961–7 w56247969–74 w56247980 w56247984 w56247998 w668785469.
OHM also has 19 "Western Railway Museum" ways, which the repo skips (`docs/checks/ohm.md`).
**Former main line:** yes, the Sacramento Northern's Oakland–Sacramento main line (R&R 1989 [img]);
the repo's past segment `sn-chipps-county-line` covers it.

**Conflicts.** Ride direction changed: north to Dozier in 1992 (AAA), south today. Round trip 10 mi
(earlier museum page and Heritage Rail 2019, [srch]) or 11 mi (current, [srch]). One blog says the museum
"purchased" the 22 miles; the museum's page says it was a gift ([srch]).

---

## 4. The Railroad Museum at Ardenwood (SPCRR), Fremont, Alameda County

**Summary.** **Narrow gauge (3 ft), full-size equipment**, in Ardenwood Historic Farm (East Bay Regional Park
District). Run by the Society for the Preservation of Carter Railroad Resources. It re-creates the South
Pacific Coast's horse-drawn Centerville branch on new track (not the original alignment). It is
seasonal, from the first weekend of April to Thanksgiving week, round trips from Ardenwood Station, about
25 minutes, now mostly behind small diesels, with horse-drawn days. Track is about 1 mile.

| Fact | Source | Where | Quote | Tags |
|---|---|---|---|---|
| Gauge 36 in; train ride | *Guide to Tourist Railroads and Museums*, 34th ed. (Empire State Railway Museum, 1999) | `guidetotouristra0000terr` | "SOCIETY FOR THE PRESERVATION OF CARTER RAILROAD RESOURCES Train ride 36" gauge" | [P][snip] |
| Horse-drawn, scheduled; re-creation | *31st Annual Steam Passenger Service Directory* (1996) | `31stannualsteamp0000kalm` | "Horse, scheduled … the line is a re-creation of the nearby Centerville Branch of the South Pacific Coast Railroad" | [P][snip] |
| Current operation | SPCRR, "Visit Us" | https://spcrr.org/visit | Rides "roundtrip only from Ardenwood Station … approximately 25 minutes … pulled by one of our diesel switch locomotives"; season "first weekend of April through Thanksgiving week in November". | [O-operator][srch] |
| Horse-drawn service began 1985; extension 2022 | Wikipedia, SPCRR infobox | https://en.wikipedia.org/wiki/Society_for_the_Preservation_of_Carter_Railroad_Resources | (pointer only) | [W][srch] |

**Geometry [ds].** 8 OSM ways named **"Railroad Museum at Ardenwood"**, class `narrow_gauge`, 2.64 km
of track in all; the longest path is 1.53 km (0.95 mi), from 37.55694,-122.04996 to 37.56160,-122.04203. Way ids:
w1447582916 w236324548 w236344873 w236344874 w236344875 w567601949 w567601950 w567601951.
**Unsourced:** the year public rides began at Ardenwood (1985 is [W] only); confirmation of the 2026 season.

---

## 5. Golden Gate Railroad Museum (GGRM): no line of its own; no regular public trips found

- Based in Schellville, Sonoma County, since a move begun in March 2020 ([W] and [srch] of ggrm.org). It
  previously stored equipment at the Niles Canyon Railway (Brightside), where its SP 4-6-2 No. 2472 ran
  excursions (e.g. "No. 2472 made an extended visit to the Niles Canyon Railway in 2008", *Steam Power*
  2015, `steampower0000bria` [P][snip]).
- Its last public excursions found (2472 between Schellville and the Napa River, on the former NWP track
  that SMART owns) predate 2025 ([srch], Railfan.com/Trains.com, undated in results). 2472 is due a 15-year
  overhaul. The museum also runs the Russian River Rail Bikes in Cloverdale (pedal rail bikes, not
  trains) ([srch], ggrm.org).
- **Status:** no regular public trips in 2025–26 found. Unconfirmed, because ggrm.org is unreachable.
- **Recommendation:** leave off the layer. Mention it in the Niles Canyon / NWP panels if wanted.

---

## 6. Miniature and park railways (gauge under 3 ft, scale equipment)

| Railway | County | Gauge (source) | Operator / status 2025–26 | Since | OSM (via Overture) |
|---|---|---|---|---|---|
| Redwood Valley Railway (Tilden Park) | Contra Costa (Overture county polygon; Tilden straddles Alameda/CC) | 15 in ([srch]; [W] says it began at 12 in, re-gauged) | Redwood Valley Railway (Thomsen family), EBRPD concession; open weekends and daily from June 1, 2026 (EBRPD "Tilden Attractions" spring 2026 PDF [O][srch]). **Lease dispute:** lease expired 2019, month-to-month; the owner threatened closure in Nov 2025; talks unresolved as of Mar 6, 2026 (Berkeleyside [srch]) | 1952 ([srch]/[W]) | 9 ways "Redwood Valley Railway", class unknown, 1.22 km (longest path 0.89 km); route 1.25 mi per [srch] |
| Golden Gate Live Steamers (Tilden) | Contra Costa (same) | 7.5 in, plus 4.75 in dual gauge (club site [srch]) | Club, free rides Sundays ([srch]; Berkeleyside 2023) | Club 1936 ([srch]); in Tilden date unsourced | Unnamed; 15 ways next to the RVR (e.g. w1046354990–6, w1190153478–9), 2.09 km |
| Sonoma TrainTown Railroad | Sonoma | 15 in ([W]/[srch]) | Frank family; open Sat–Sun 10–4, Aug 17, 2026 – June 12, 2027 (traintown.com [srch]) | Public 1968 ([W]); site begun 1958 ([srch]) | Unnamed; ways w555004221, w555004223, w625451668…, 1.33 km |
| Billy Jones Wildcat Railroad (Oak Meadow Park, Los Gatos) | Santa Clara | 18 in, one-third scale (bjwrr.org history [srch]; [W]) | Billy Jones Wildcat Railroad, Inc. (non-profit); weekends year-round, daily in summer ([W]) | July 24, 1970 ([W]); "July 1970" (Ride the Rails [srch]) | 15 ways "Billy Jones Wildcat Railroad" (0.58 km) plus adjoining "Squirrel Hill" (7 ways, 0.81 km) and "Redwood Grade" (1 way), all class unknown, probably the same loop (unverified) |

Recommendation: **leave these off the heritage layer** (the brief allows it). They are scale railways in
parks, under 1.5 km, and would read as dots at regional zoom. If Matthew wants them, show them as points
with a "miniature" note, not as lines.

---

## 7. Other things found, recommended out of scope

- **History Park trolley, San José (Santa Clara Co.).** Full-size heritage streetcars of the
  California Trolley and Railroad Corporation (founded 1982; Trolley Barn 1984, [srch]). They run on
  museum track in History Park and along Senter Rd. History San José lists weekend rides, noon–3:15 pm
  ([srch]). OSM: 6 ways **"History Park Trolley"**, class `tram`, 1.36 km (longest path 1.19 km / 0.74
  mi). Gauge unsourced here. **Borderline:** a real heritage streetcar but a museum loop. Offer it as an
  option (line or point).
- **VTA "Holly Trolley".** Vintage CTRC cars on VTA light-rail track downtown: began Nov 18, 1988; now
  holiday-season only, with gaps ([srch], [W]). No separate track; it is already in the present VTA
  network. Leave off, or mention in the VTA panel.
- **Kiddie, zoo and amusement-park trains** (OSM names in brackets): Kennedy Park, Hayward ("Kennedy Park
  Train", 0.72 km); Howarth Park, Santa Rosa ("Howarth Park Kiddie Railroad"); SF Zoo ("Little Puffer Steam
  Train"); Oakland Zoo ("Outback Express Adventure Train"); Children's Fairyland ("Jolly Trolly"); Pixieland,
  Concord ("Pixieland Express"); Gilroy Gardens ("Coyote & Redwood Railroad", OSM narrow_gauge); Six Flags
  Discovery Kingdom, Vallejo ("Seaside Railway"; "Shoreline Express" abandoned); Nut Tree Plaza, Vacaville
  (unnamed, about 0.7 km; the No. 5 train, running in 2025 per [srch]); Kelley Park Express, San José (OSM
  disused). Amusement rides, not heritage. Not researched further.
- **Private railways:** "Justi Creek Railway" (Sonoma Co., OSM narrow_gauge, 2.43 km), private, at the
  Lasseter Family Winery ([srch]/[W]). "Casa de Choo Choo" and "Woodside Subdivision" (OSM, private
  look). An unnamed 3.2 km cluster near Portola Valley (37.336,-122.190; possibly the Portola Valley &
  Alpine Railroad, [srch], unconfirmed). There are no public trips. Leave off.
- **Outside the nine counties** (skipped): Roaring Camp and Santa Cruz Big Trees & Pacific (Santa Cruz),
  Sacramento Southern (Sacramento), Skunk Train (Mendocino).
- **Past-era lead:** the PLA's earlier **Castro Point Railway** at Richmond, 1969 to about 1985 (Drury 1988:
  "began operating the Castro Point Railway in 1969. Its lease for the land … was not extended after
  1985" [P][snip]).

---

## Summary table

| Railway | County | Gauge class | Public endpoints (length) | Current public operation began (source) | OSM way name | Heritage layer? |
|---|---|---|---|---|---|---|
| Niles Canyon Railway | Alameda | Full-size, standard | Sunol Depot (Kilkare Rd, CPUC MP 35.60) – Niles (MP 29.60): about 6–7 mi; track continues east to Pleasanton-Sunol Rd (MP 38.30), about 10 mi in all | **May 21, 1988**, Sunol–Brightside (*Classic Trains* Spring 2009 p. 69 [P][img]; operator [srch]); to Niles by 1995 (Drury [snip]) | "Niles Canyon Railway" (19 ways) | **Yes.** Draw Sunol–Niles as the public route. The track east of Sunol (6 trains/yr, CPUC 2016 [O]) can be drawn lighter or left off. Former SP main line (abandoned 1984). |
| Napa Valley Wine Train | Napa | Full-size, standard | Napa (1275 McKinstry St) – St. Helena: 17.8 mi along OSM; 36 mi round trip | **Sept 16, 1989** (operator [srch]; *NETWORK* Oct–Dec 1990 p. 50 [img]); CPUC approval Aug 23, 1989 (R&R Nov 1989 p. 46 [img]) | "Napa Valley Railroad" (27 ways) | **Yes.** Ex-SP Napa Valley branch (not a main line); shares track with the past era's California Pacific line. |
| Western Railway Museum | Solano | Full-size, standard (electric) | Museum at Rio Vista Junction (Hwy 12) – south end near Birds Landing Rd: 5.6 mi along OSM; 11 mi round trip | Public rides by 1968 (*Trains* [snip]); weekend operation 1980 (US Army Corps 1982 [O][txt]); SN main line by 1989 (R&R Mar 1989 p. 30 [img]); today's southward electrified run: **unsourced** | "Western Railway Museum" (23 ways) | **Yes.** Ex-Sacramento Northern main line. |
| Railroad Museum at Ardenwood (SPCRR) | Alameda | Full-size, narrow (3 ft) | Ardenwood Station loop in Ardenwood Historic Farm: about 1 mi | 1985 ([W] only), by 1996 scheduled (directory [snip]) | "Railroad Museum at Ardenwood" (8 ways) | **Optional.** Real narrow gauge, but a short re-created line inside a park. Show options; Matthew's call. |
| History Park trolley (CTRC) | Santa Clara | Full-size streetcar (gauge unsourced) | History Park and Senter Rd: about 0.7 mi | Unsourced (CTRC 1982, barn 1984 [srch]) | "History Park Trolley" (6 ways, tram) | **Optional, lean no.** Museum loop. |
| Golden Gate Railroad Museum | Sonoma (Schellville) | Full-size, standard | None of its own; occasional trips on SMART-owned ex-NWP track and formerly on the NCRy | n/a; no regular trips found for 2025–26 | n/a | **No.** |
| Redwood Valley Railway | Contra Costa | Miniature, 15 in | Tilden Park loop, about 1.25 mi | 1952 ([srch]/[W]); lease dispute 2025–26 | "Redwood Valley Railway" | **No** (miniature) |
| Golden Gate Live Steamers | Contra Costa | Miniature, 7.5/4.75 in | Tilden Park layout | Club 1936; Tilden date unsourced | Unnamed | **No** (miniature) |
| Sonoma TrainTown | Sonoma | Miniature, 15 in | Park loop, 20-min ride | 1968 ([W]) | Unnamed | **No** (miniature) |
| Billy Jones Wildcat Railroad | Santa Clara | Miniature, 18 in | Oak Meadow/Vasona park loop | July 24, 1970 ([W]) | "Billy Jones Wildcat Railroad" (+ "Squirrel Hill", "Redwood Grade") | **No** (miniature) |

## For Matthew (manual work)

1. Confirm the operators' own pages, which were unreachable here. Each gives a date or fact cited above only
   from search summaries:
   - ncry.org/about (May 21, 1988; 1987 county agreement; when trains reached Niles);
   - winetrain.com "Our Story" (Sept 16, 1989);
   - wrm.org history (1993 UP gift; 2012 extension to Birds Landing Rd; when the electrified southward
     run began);
   - spcrr.org (first Ardenwood rides; 3 ft gauge).
2. The CPUC's 1989 Wine Train decision (Aug 23, 1989) is pre-online. It needs the CPUC library or a decision
   index for its number. D.23-06-009 (Niles Canyon mileposts) is online at docs.cpuc.ca.gov, which this
   session couldn't reach.
3. ICC/STB records: SP's 1984 abandonment of Niles Canyon and SP's 1987 sale of the Napa Valley line.
4. Design choice (show options):
   - whether to draw the NCRy east of Sunol (rarely used);
   - whether Ardenwood and History Park go in as short lines, as points, or not at all.
5. Data note for the pipeline: Overture's `rails.py` boxes cover Napa (`napa`) but not Niles Canyon or
   Rio Vista Junction. Heritage geometry can come from Overture rail filtered by the names above
   (`geometry_confidence: surveyed`, `geometry_method` "Overture 2026-09-23.1 rail, OSM ways named …").
   Napa and Niles Canyon share track with existing past segments (`calp-*`, `cp-niles-livermore`), so
   decision 13's shared-track handling applies.
