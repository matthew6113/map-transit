# Leads from Phase 2c (not citable yet)

Five research passes ran on Oct 15, 2026, one per group of systems still to draw. **None of them
could open a source page.** WebFetch failed with a DNS error on every host for the whole session
(archive.org, files.cpuc.ca.gov, loc.gov, sfmta.com, even example.com), the shell's own requests to
those hosts are refused by the network policy, and web search ran out of its shared budget partway
through.

So these files are reading plans, not research:

- Every new fact is tagged by how weakly it is known: `[srch]` or `[x]` (a search engine's extract
  or summary of a document, never seen on the page), `[snip]` (looks verbatim, page not seen),
  `[para]` (the search tool's paraphrase), `[lead]`, or `[W]` (Wikipedia or a railfan site, a pointer
  only). Facts carried over from the reviewed notes in `docs/research/` are tagged `[repo]` or `[r]`.
- **Nothing here goes into `data/sources.json` or onto the map until it is read in the source
  itself.** The map's Phase 2c data cites only sources read in Phase 2b (`docs/research/*.md`).
- What is solid: the file names and URLs of the Railroad Commission and CPUC decisions the search
  engine returned (each file's "Decision inventory" or "Sources" section), and the street checks
  against today's roads.

| File | Covers |
|---|---|
| `sf-a.md` | Market St cable lines, Sutro, Ferries & Cliff House, Park & Ocean, the San Mateo interurban, Muni's 1915 exposition lines, the Omnibus cable |
| `sf-urr.md` | United Railroads and Market Street Railway numbered lines: where the 1909 and 1929 route lists are, the decisions on their abandonments |
| `eastbay.md` | Key System streetcars 1928–48 (about 40 decisions located), East Shore & Suburban, Key E and G, the SP's 18th St, Webster St and Fruitvale lines |
| `railroads.md` | Central Pacific and the 1862 Western Pacific, SF & Oakland, SF & Alameda, California Pacific, NPC, SF & NP, Santa Fe at Point Richmond, SPC, C&N, SP branches |
| `ferries-northbay.md` | Creek Route, the mole ferries, Carquinez and Richmond–San Rafael ferries, North Bay street railways, the P&SR, the SF Napa & Calistoga, the freight belt lines |

`docs/research/phase-2c.md` says what Phase 2c drew and what each system needs next.
