# Research: Phase 3, future layer A

Oct 16, 2026. Phase 3 re-verified the six future lines from BAM against official sources, set up the
90-day re-verification routine, and drew three ways to show future status for Matthew to choose
from (`docs/SPEC.md`, phase 3). The research is in `future-status-2026-10.md`.

## The six lines

| Line | Status | As of | Expected opening | From |
|---|---|---|---|---|
| BART Silicon Valley Phase II | under construction | Sep 1, 2026 | Q1 2039 (VTA's target: Q2 2037) | VTA's May 2026 executive report; its September 2026 post on early works |
| The Portal | environmental | Jun 10, 2026 | May 2036 | MTC's June 2026 RM3 report; FTA's FY2027 report; TJPA's March 2026 deck and February 2026 status report |
| CAHSR San Francisco to San José | environmental | Jun 1, 2026 | none stated | The Authority's 2026 Business Plan and Northern California page |
| Valley Link | environmental | Jun 10, 2026 | 2032 (Phase 1A, Dublin/Pleasanton to Vasco Road) | MTC's June 2026 RM3 report; Valley Link's project page |
| SMART Healdsburg | funded | Sep 16, 2026 | December 2028 | SMART's project page and September 2026 board items |
| SMART Cloverdale | environmental | Sep 16, 2026 | none stated | SMART's Geyserville page; CEQAnet's exemption of August 2026; MTC's TIRCP endorsements |

No status changed from BAM's translation of Oct 7-8. Four lines gained a cited expected opening.

- **How it was checked.** The agencies' sites (vta.org, tjpa.org, hsr.ca.gov, sfcta.org,
  transit.dot.gov, sonomamarintrain.org and others) time out or are refused from the build container,
  and web.archive.org is blocked. So every fact comes from web search restricted to the agencies' own
  domains. No page or PDF was opened, and each source's notes in `data/sources.json` say so.
  CLAUDE.md asks for re-verification "with web searches at build time"; opening the key documents in a
  browser would still be worth doing once.
- **Changed since early October:** the High-Speed Rail Authority's Notice of Preparation of Oct 13-14
  for a new environmental review of Gilroy to the Central Valley Wye, which is cited on the CAHSR line
  as context. It doesn't change San Francisco to San José.
- **Pending this month:** the state's TIRCP Cycle 8 awards, expected in October, which include $750
  million asked for The Portal and parts of SMART Cloverdale; and the California Transportation
  Commission's Oct 15-16 meeting, whose SMART Healdsburg item BAM cites but this pass couldn't see.

## The re-verification routine

- `data/future/verified.json` is hand-kept: each line's status, `status_as_of`, `expected_opening`,
  `last_verified`, citations and notes. `make future-sync` applies it over BAM's translated stages
  (`pipeline/transit_pipeline/bam_sync.py`); a line it doesn't list keeps BAM's.
- `make checklists` writes `docs/checks/future.md`: each line with its last check and the day the
  90-day test fails it. All six are due again by **Jan 14, 2027**. The steps are in that file and in
  `docs/SCHEMA.md`, "Future lines".

## Solidity: three options

`?solidity=` previews each. The screenshots are in `docs/screenshots/p3/` (`future-<option>-regional`,
`-sf`, `-south-bay` and `-north-bay`). The legend follows the option shown. Nothing is picked:
`opacity` stays the default until Matthew chooses.

| Option | How it draws status | For | Against |
|---|---|---|---|
| `opacity` | The ladder in `theme.transit.status` (planned 0.5 up to opening 1) as opacity | BAM's approach; the five steps all show | Overlapping strokes darken where lines cross; pale lines show the buildings through them |
| `tint` | The same ladder as an opaque tint of the mode color toward the paper | Same five steps, clean overlaps, buildings stay hidden under the stroke | Steps close together (0.8 against 0.95) are hard to tell apart |
| `committed` | Two steps: pale and thinner while planned or in review, full once funded | One question answered at a glance: is the money there? | Funded, under construction and opening look the same; the panel says which |

Today's six lines span only three statuses (under construction, funded, environmental), so the
difference between `opacity` and `tint` shows mostly on Valley Link, The Portal and CAHSR.

## Second list: projects not drawn yet

From `future-status-2026-10.md`, unranked; each needs Matthew's word (here, or added to BAM first).

- **Under construction:** VTA's Eastridge to BART Regional Connector (light rail, early 2028); SFMTA's
  Geary Boulevard Improvement Project (whether it counts as BRT is his call).
- **Environmental:** Capitol Corridor South Bay Connect; BART's Irvington station (late 2031, subject
  to funding); Alameda CTC's San Pablo Avenue bus lanes; CAHSR San José to Gilroy and Gilroy to the
  Central Valley Wye.
- **Earlier than environmental review:** Link21, SamTrans's Dumbarton busway, the San José airport
  connector, the Pennsylvania Avenue Extension and the Hercules station. These belong to Phase 4's
  reference layer rather than layer A.

## For Matthew

- **Solidity:** pick `opacity`, `tint` or `committed`, or ask for another; then the palette validator
  runs again if the status values change (`docs/DECISIONS.md`).
- **CAHSR's opening:** the plan states none for San Francisco to San José. The nearest wording is
  "deliver SF-B by 2039" (the San Francisco–Bakersfield scenario, funding-dependent). It is left null;
  say if the panel should carry that wording.
- **SMART Healdsburg:** kept `funded` on SMART's schedule (construction from January 2027). Utility
  potholing began in April 2026, and the City of Healdsburg's calendar lists a groundbreaking
  celebration on May 8, 2026. Say if those count as early works, which would make it
  `under_construction`.
- **The Portal:** flagged `conflicting_sources` for the project page's 2035 against TJPA's 2026
  schedule documents' May 2036. Say if the flag should come off.
- **Search-only verification:** confirm that statuses read from agency-domain search results meet the
  official-sources rule, or open the key documents named in `future-status-2026-10.md` yourself.
- **The second list:** which projects, if any, to add here, or to BAM first so the maps stay in step.
- **Re-verification:** optionally, a scheduled task to re-run the check before Jan 14, 2027.
