# Research: Phase 4, the ideal network

Oct 16, 2026. Phase 4 builds the future era's layer B (`docs/SPEC.md`, phase 4): a reference layer of
serious proposals, a tradeoffs page for Matthew, and (4b) an in-browser editor for his own network.
Nothing of Matthew's network is drawn: that's his (CLAUDE.md). Screenshots are in
`docs/screenshots/p4/`.

## What changed

- **The reference layer, `data/ideal/<proposal>/`:** segments and lines like the other eras, with
  each line's proposer, document, year and `proposal_status` (`docs/SCHEMA.md`, "Ideal network").
  `make ideal` builds each proposal's corridors from its recipe, along today's streets (Overture) or
  another era's track. In the future era, "Show proposals" (`?proposals=1`) draws them thinner and
  lists them apart, and a proposal's panel says who proposed it, where, and how far it has gone.
- **Drawn (five lines, four proposals):**

  | Proposal | Status | Drawn | Left out (the words don't place it) |
  |---|---|---|---|
  | Geary/19th Avenue subway (SFCTA, 2026) | Under study | Geary St and Geary Blvd, Market St to Masonic Ave; 19th Ave, Lincoln Way to Junipero Serra Blvd | The turn south (between Masonic and Park Presidio) through Golden Gate Park; the Howard St downtown option; the Daly City end; stations |
  | Central Subway extension (SFMTA, 2015) | Under study | Columbus Ave and Powell St, Union St to Beach St, as two lines | The link from today's tunnel to Washington Square; the loop concept |
  | Dumbarton rail shuttle (SamTrans, 2017) | Superseded | The Dumbarton Cutoff, Redwood Junction to Newark | Redwood City station; Union City |
  | Reimagine Dumbarton busway (SamTrans, 2025-27) | In an adopted plan (Plan Bay Area 2050+) | The rail corridor, Middlefield Rd to University Ave | Its two street links into Redwood City; stations |

- **The tradeoffs page, `docs/ideal/tradeoffs.md`:** every proposal, drawn or not, grouped by the
  choice it poses (a second crossing; the west side; North Beach; Caltrain south of The Portal;
  Dumbarton; regional rail), with the costs, riders and tradeoffs their documents state, and the
  questions only Matthew can answer. It recommends nothing.
- **The editor (Phase 4b), `?edit=1`:** draw, edit and delete lines over the map, with name, mode,
  the proposals each is based on, notes and author; points snap to lines on the map. It exports
  `data/ideal/network.geojson`, which `npm test` validates. A draft stays in the browser. It loads
  only for `?edit=1`, as its own chunk.
- **Research:** three passes, in `docs/research/ideal/` (`link21-dumbarton-express-rail.md`,
  `san-francisco.md`, `spur-seamless.md`); 152 sources added.

## How it was researched, and its limits

- **Every publisher's site is refused from the build container:** SFMTA, SFCTA, ConnectSF, MTC and
  Plan Bay Area, SamTrans, Link21, BART, Caltrain, Capitol Corridor, Caltrans, SPUR, Seamless Bay
  Area, and web.archive.org; so are the GIS portals (ArcGIS Online, MTC's open data, DataSF). Every
  fact comes from web search limited to the publisher's own domain, and is marked so.
- **A shared limit of 200 searches ran out** in all three passes. Not reached: the ConnectSF
  Transit Strategy PDF, the Subway Vision's corridor list, SPUR's *Nine Ideas for a Connected San
  Francisco*, Seamless Bay Area's map, Link21's concept maps, the State Rail Plan's Bay Area figures.
- **No map was traced.** Every map that would give a path (the Geary/19th strategic case's Figures
  3-1 to 3-3, the Subway Vision's Figure 15, the T-Third concept study, Link21's Appendix C) needs a
  browser, and its license is open.

## The look: a placeholder

Proposals draw in their mode's hue, at 0.6 of the width and 0.85 opacity (`theme.transit.proposals`),
dashed where approximate (most of them), and only when "Show proposals" is on. Options for Matthew,
not built yet: on by default; a single neutral hue for every proposal, so mode is read from the
panel; or proposals stepping back like today's network (0.4) once his own network is drawn. One
thing the screenshots show: a proposal on track that exists (the Dumbarton rail shuttle, on the
surveyed Dumbarton Cutoff) draws solid, and reads almost like a running line; a proposal-only
encoding (a lighter tint, say) would separate them without borrowing the dash, which means
approximate.

## For Matthew

New from this phase:

- **Network access:** to read the documents themselves, allow these hosts in the environment's
  network settings: `sfmta.com`, `sfcta.org`, `connectsf.org`, `mtc.ca.gov`, `planbayarea.org`,
  `samtrans.com`, `link21program.org`, `bart.gov`, `caltrain.com`, `capitolcorridor.org`,
  `dot.ca.gov`, `spur.org`, `seamlessbayarea.org` (and `web.archive.org`). Or open the documents
  listed in each research file in a browser.
- **Your picks:** read `docs/ideal/tradeoffs.md` and draw them with `?edit=1`; the seven questions at
  its end are the ones the proposals leave open.
- **How your network should look** once it has lines: full strength over everything, its own toggle,
  or in place of the proposals.
- **The proposals' look** (above).
- **Statuses to confirm:** the Geary/19th subway as "under study" (it is named in SFTP 2050 and Plan
  Bay Area 2050+, but only for studies; a literal reading would make it "in an adopted plan"); the
  busway as "in an adopted plan" (Plan Bay Area 2050+ carries it, while SamTrans still studies it).
- **The layer-A question it raises:** the busway, the Eastridge light rail extension and others
  (`future-status-2026-10.md`) are projects in adopted plans; whether they belong in layer A (being
  built) or stay reference proposals.
- **Tracing licenses:** whether lines may be traced from SFCTA's, SFMTA's, SPUR's and Seamless Bay
  Area's maps with credit.
- **More research:** a follow-up pass with network access, for the documents above.

Still open from Phases 2 and 3: the lists in `phase-2d.md` and `phase-3.md` ("For Matthew"),
including the solidity option and the future statuses' next check, due Jan 14, 2027.
