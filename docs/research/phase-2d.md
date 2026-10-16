# Research: Phase 2d, the backlog pass

Oct 16, 2026. After the Phase 2c checkpoint, this pass drew what the sources and OpenHistoricalMap
(OHM) allowed without Matthew's input: the lines OHM's ways made drawable, and the freight belt
lines (decision 15). It also checked Blue & Gold Fleet for today's network. Five research passes read
the sources (`sources-2c/belt-lines.md`, `san-quentin-sn-freight.md`, `sp-tracy-los-altos.md`,
`ocean-shore.md`, with `dumbarton-cn.md` and `western-pacific.md` from Phase 2c), nearly every quote
on the page image. `phase-2c.md` still lists everything else not drawn; what this pass drew is
marked there.

## Drawn in Phase 2d

| System | What | Dates from | Geometry from |
|---|---|---|---|
| California & Nevada | Emery by Fortieth St and San Pablo Ave, Berkeley, Albany and San Pablo, up San Pablo Creek to Orinda Park and Bryant | Running October 1889 to December 1897 (decision 20): *Oakland Tribune* 1889, 1896, 1897; the company's 1892 answer in the Railroad Commissioners' thirteenth report; *Poor's* 1891-96 | OHM's ways from the 1895 and 1897 sheets; from Russell St, Berkeley, north they lie on the Santa Fe's later track on the 1949 sheets; Emery to Russell St is `geometry_unverified` |
| Western Pacific, San José branch | Niles Junction by Irvington, Warm Springs, Milpitas and Berryessa to East San José | First train August 23, 1922 (*Oakland Tribune*); trains replaced by a bus in July 1931 (CRC D23837, D24234) | OHM's ways, checked on the 1953 Niles and Milpitas and the 1943 San Jose sheets |
| San Rafael & San Quentin (North Pacific Coast) | Trains, Point San Quentin to San Rafael; the San Quentin ferry from the Davis St wharf; the branch's freight years | Trains 1870-03-21 (Marin history) to 1913 (Borden, *Western Railroader* 1949, one railfan source); ferry running by April 1867, to April 1884 (*Argonaut* timetables); freight to its last timetable, 1933-09-17 (NWP employee timetables) | OHM's ways from the 1897 and 1895 sheets, joined to the San Rafael branch, checked on the 1941 Tamalpais and 1899 San Francisco sheets; the ferry over water |
| Sacramento Northern, freight | 40th St and Shafter Ave by the Oakland hills tunnel and Moraga to West Lafayette, freight only after the passenger trains | 1941-06-30 to 1957-03-01 (*Orinda Sun*, April 5, 1957; ICC Finance Docket 19124, granted July 3, 1956) | The SN's own segments, now drawn in the railroad mode for those years |
| Southern Pacific, Tracy line | Oakland by Martinez, Port Chicago, Pittsburg, Antioch, Brentwood and Byron to the San Joaquin County line | Opened for public use 1878-09-03 (the railroad's returns; the 1882 county history's first train through Antioch, September 9, `conflicting_sources`); the San Joaquin Daylight's last run 1971-04-30 (*SP Bulletin*) | The Capitol Corridor's track to Martinez (decision 13); today's Union Pacific Tracy Subdivision beyond, clipped at the county line (decision 16) |
| Southern Pacific, Los Altos branch | Mayfield (California Ave) by Los Altos, Loyola, Monta Vista and Congress Junction to Vasona Junction | First timetable 1908-04-19; drawn to its last timetable with a train, 1963-09-01 (decision 20): the end conflicts (no train from October 27, 1963; the ICC's abandonment effective December 26; a local history's January 27, 1964) | OHM's ways, on the line on the 1953 Palo Alto and San Jose West sheets |
| Alameda Belt Line | Clement Ave, Broadway to Grand St | First freight 1918-05-27 (*Oakland Tribune*); drawn to 1941-09-28, the SP employee timetable's crossings rule (decision 20); abandoned 2012 (STB AB 1090X) | Today's Clement Ave |
| Oakland Terminal Railway | Its freight over the Key System's 40th St track (1943-07-01 to April 1957) and on Louise and Poplar Sts (1953-57); the Union St line (April 1957) | *Railway Age* 1943; CRC D36427; CPUC D49307, D53801, D55545 | The Key System's segments; Union St along today's street, straight to the WP's track at Chestnut Junction |
| Ocean Shore Railroad | Daly City by the Mussel Rock bluffs, Pedro Valley, Devil's Slide, Montara and Moss Beach to North Granada | October 1907 (Callwell) to August 15, 1920 (Callwell; *Oakland Tribune*; CRC D8071, D8216); stretches from October 1907, May 1908 and July 1908 (*Railroad Gazette*, *Railroad Age Gazette*) | OHM's way, which lies on the coast on the 1949-50 sheets (no fit needed); not yet drawn: San Francisco's street and steam track, and Granada to Tunitas, which no map of its years covers |

## Checked, not drawn

- **Blue & Gold Fleet** (`docs/SPEC.md`, "Present"): 511 has no feed for it; the only feed with its
  own route is Trillium's of 2021. Its Tiburon and Angel Island runs passed to Golden Gate Ferry in
  2021-22 (drawn from 511), and its Sausalito run is reported suspended since May 3, 2026, by
  secondary sources only (`DATA_LOG.md`, "Other candidates").

## Pipeline

- A fresh container refetched OHM; every past segment rebuilt to the geometry already committed.
  `past.py` now carries a hand-cited OHM way (one compared against, not drawn from) to the snapshot
  in the cache, so a refetch no longer breaks `make app-data`.
- The basemap snapshot was restored from this repo's release asset (`basemap-c58e3ba99831`) for the
  screenshots; GitHub Pages is blocked from the container.

## OpenHistoricalMap: what's left

`docs/checks/ohm.md` now lists 227 unused ways, down from 365 in the survey of Oct 15: later groups
drew from 92 more, and this pass recorded 48 as duplicates of track drawn here and skipped 13
(today's track traced from misregistered sheets, and Camp Fremont's military railway). What the rest
are, as far as their tags and places show:

- **Santa Clara County's street railways and the Peninsular Railway** (San José's horsecar and
  electric lines from 1868, the interurbans to Los Gatos, Saratoga and Palo Alto): a system the
  coverage list in `docs/SPEC.md` doesn't name and nothing here draws yet.
- **The San Francisco & San Mateo's 1892 route** (ways 200016954, 200016955), from Steuart St by
  Harrison, 14th and Guerrero Sts and San Jose Ave; its opening is sourced (Callwell), but not when
  No. 40 moved to Mission St.
- **San Francisco's ocean shore** (ways along the Great Highway, 1892-1956): the Park & Ocean's beach
  line and the later streetcars' tracks, to sort out.
- **The Southern Pacific in San José**: its Fourth St line (1869-1935, ended December 30, 1935 by
  the *SP Bulletin*) and the Coast line south toward Gilroy, which no line here draws.
- **The San Ramon branch's extension** south from San Ramon toward Pleasanton (ways 200452955,
  200452956), opened about 1909; whether passengers used it isn't sourced.
- **Freight and industrial track**: San Francisco's southeast waterfront (1920-60), spurs at Redwood
  City, Palo Alto, South San Francisco, Milpitas and Berryessa, the Sacramento Northern's Pittsburg
  branch and its Solano County realignment of about 1950.
- **The Russian River** around Monte Rio and Guerneville (1892-1935).

## For Matthew

New from this pass:

- **The California & Nevada:** `phase-2c.md` left drawing it to you ("if you want its few public
  trains drawn"); OHM's ways made the geometry possible, so it is drawn under decision 20. Say if it
  should come off. Spot-check Emery to Russell St, which no later sheet confirms.
- **Copyright, facts only:** *Traffic World* (1925-56), the *I.C.C. Practitioners' Journal* (1956),
  *Railway Age* (1943) and the *Campbell Press* (1963) are cited for facts only, as decision 19 does
  for *The Western Railroader*, the *Orinda Sun* and the CSRM timetables. Confirm the rule covers them.
- **Ends resting on one source, or none:**
  - San Quentin's passenger trains, 1913: Borden alone. The *Sausalito News* or *Marin Journal*
    (CDNC, blocked here) would settle it.
  - The SN's last freight day (pointers say February 28, 1957): the *Oakland Tribune* of late
    February 1957.
  - The Los Altos branch: borrow *Los Altos Reminiscences* (1973) for the January 27, 1964 page;
    local papers of October 1963 to January 1964; the ICC's Finance Docket for the Vasona Branch.
  - The Alameda Belt Line's last train (1998 by pointers); until then it is drawn only to 1941. The
    2012 notice says no traffic for two years before; your call whether that bounds it.
- **Maps:** the Alameda Belt Line's 1926-27 extensions (the Commission's drawings T-6-105 and 285-E),
  and the Oakland Terminal's Outer Harbor, mole and Emeryville tracks (a Port of Oakland or railroad
  map), aren't placed by any text.
- **Blue & Gold:** confirm nothing to add, or allowlist `blueandgoldfleet.com` and `goldengate.org`.
- **Coverage:** whether Santa Clara County's street railways and the Peninsular Railway join Phase 2.

Still open from `phase-2c.md` ("For Matthew"): the page-image questions, the maps to georeference
(Land's End, Westbrae, the Webster St bridge, the Muir Woods branch, Cazadero), the San Francisco,
Napa & Calistoga choice, the Petaluma & Santa Rosa date conflicts, the SF street names, the North Bay
horsecars, the Mare Island ferry's last day, the Petaluma steamers' berths, the heritage railways,
and the Santa Fe's Oakland line south of Russell St.

**Phase 3 timing:** the six future lines were last verified October 7-8, so `npm test` fails from
about January 5, 2027 unless they are re-verified.
