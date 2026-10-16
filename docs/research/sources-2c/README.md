# Phase 2c research passes, with the sources opened

Five research passes ran on Oct 15, 2026, after the network allowed archive.org,
files.cpuc.ca.gov and www.loc.gov. Unlike `../leads-2c/`, these read the sources themselves:

- **Commission decisions** (files.cpuc.ca.gov) were read as PDFs, in the text layer (`[ocr]`) or on
  the rendered page image (`[img]`), as each entry says.
- **archive.org books, reports and journals** were read in the OCR text only (`[ocr]`): this
  environment can't open archive.org's page images. Every such quote is to be re-read on the page.
- `[W]` marks a pointer only (Wikipedia, railfan pages), never a source for the map.

The passes stopped at the account's usage limit, so some sections end early (marked *pending*). The
map's data cites the sources themselves, in `data/sources.json`; where it rests on a reading here
(an aligned date column, a page number taken from a running head), its source note says so.

| File | Covers | Used for |
|---|---|---|
| `sf-urr.md` | Manley's 1909 and O'Shaughnessy's 1929 route lists, line by line | `data/past/sf-msry/` (decision 20) |
| `sf-a.md` | Ferries & Cliff House, Sutro, Park & Ocean, the San Mateo interurban, Ocean Shore | not drawn yet |
| `eastbay.md` | The Railroad Commission's and CPUC's East Bay streetcar orders, 1931–48 | `data/past/eb-streetcars/` |
| `railroads.md` | County histories, the Railroad Commissioners' reports, *Poor's Manual*: openings and ends of the steam railroads | not drawn yet |
| `ferries-northbay.md` | Bay and Carquinez ferries, North Bay railways, freight belt lines | `data/past/ferries/` |
| `dumbarton-cn.md` | The Dumbarton Cutoff's passenger trains, the end of the Oakland-Newark-San José trains (1960), the California & Nevada (pass of Oct 16, page images read) | `data/past/sp-dumbarton/` |
| `northbay-streetcars.md` | The Santa Rosa and Petaluma horsecars, and San Rafael's lack of any (pass of Oct 16, page images read) | `data/past/north-bay-horsecars/` |
| `steamers.md` | The Petaluma River steamers and the Vallejo-Mare Island ferry (pass of Oct 16, page images read) | `data/past/ferries/` (`psr-steamers`, `mare-island-ferry`) |
| `heritage.md` | The heritage railways carrying the public today, with the miniature and park railways left out (pass of Oct 16) | `data/present/heritage/` |
