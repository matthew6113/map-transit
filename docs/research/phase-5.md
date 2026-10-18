# Phase 5: polish

Oct 17, 2026. Phase 5 (`docs/SPEC.md`) covers several things: timeline and ghost tuning, photos and
the style panel, performance, an accessibility audit, the share card, and WebKit tests and deploy.
Screenshots are in `docs/screenshots/p5/`.

## What changed

- **Accessibility:**
  - `npm run a11y` runs axe-core (WCAG 2.1 A and AA) on eight views, the style panel among them. CI
    runs it in WebKit.
  - It found one problem: an off mode chip's text was under 4.5:1. That's fixed.
  - By hand, every control shows a focus ring and the tab order follows the page. Opening a line
    moves focus to its title, and Escape returns focus to the line in the list. Drawing in the
    editor needs a pointer. `docs/DECISIONS.md` has the details, under "Accessibility".
- **Performance:**
  - On the real past data (576 segments), a year step takes a median of 378 ms at the "Whole Bay"
    frame under software WebGL. The 10,000-feature spike took 1,055 ms.
  - The building print, not the lines, is the cost.
  - PMTiles aren't needed.
  - The catalog now lists each source once and lines cite it by id: 2.66 MB down to 2.07 MB, or
    255 KB gzipped.
  - Details are in `docs/DECISIONS.md`, under "Rendering spike".
- **The share card:**
  - `npm run share-card` draws the map at 1200 × 630 under a title band, in the theme's type and
    colors.
  - It is served as `og:image` and a large Twitter card on every page, line pages included, once
    the deploy sets `SITE_URL`.
- **The style panel** (`?style=1`, or Alt+Shift+S once it's open):
  - It is BAM's panel, vendored from `bbc4fd4`. It covers this map's mode colors and widths, the
    eras, future status, proposals, the shared basemap, type, 3D and layers.
  - Changes apply live and run through the contrast check, and the panel exports `theme.json`.
  - A theme saved in the browser shows only with `?style=1`.
  - BAM's newer `controlBorder` color came with it, so field and filter-chip outlines are now 3:1.
- **Photos:**
  - `make photos` downloads each line's public-domain photo, resizes it without metadata into
    `public/photos/` (committed) and never hotlinks it.
  - The catalog lists a photo only once it is downloaded. The panel shows it under the summary,
    with its caption, credit and license.
  - A photo can be a Commons file or a direct image address, cropped to part of the image (a
    halftone on a scanned page, one half of a stereograph).
  - **Twenty-four past lines have a photo** (added after the checkpoint), each a halftone from a journal
    published before 1931 and scanned by the Internet Archive, the one image host the container reaches.
    They are the Key Route's Berkeley line and ferry, the North Shore's Mill Valley and San Rafael
    lines, the Mt. Tamalpais railway, the Petaluma & Santa Rosa (at Sebastopol, and the 1905 crossing
    fight at Santa Rosa) and its steamers, the Key Route's Piedmont line (its pier terminal), the SP's
    Encinal Avenue, Seventh Street, Shattuck Avenue and Lincoln Avenue lines (the last two on the
    Oakland and Alameda moles), the SP's Peninsula trains (a Bay Shore cut-off tunnel), the San Mateo
    line, the Oakland, Antioch & Eastern (the Sacramento Northern), Muni's Geary line, route A, Muni's F
    line (a car at the exposition's Scott Street gate), the Ocean Shore, the Western Pacific's ferry,
    the Benicia train ferry, the Vallejo ferry and the Golden Gate Ferry's Sausalito and Berkeley runs
    (screenshots `past-line-*-photo`). Each page was read, so each caption follows the journal's own.
  - Some journal volumes on the Internet Archive are Google's scans, copied from HathiTrust, whose
    terms ask that the images not be re-hosted. None is used, though one holds the only exterior view
    found of the Golden Gate Ferry's first boat (*Marine Engineering*, October 1922).
  - Library of Congress candidates for 13 more lines are in `photos-candidates.md`. None is used:
    their images can't be viewed from the container, so no caption could be written.
- **Timeline and ghost:** two settings to choose from (below). WebKit runs the interaction, editor
  and accessibility tests in CI on every push. Deploy is pushing to `main`, so it happens when the
  pull request merges.

## Options

### The share card (`docs/screenshots/p5/share-card-*.jpg`)

| Option | For | Against |
|---|---|---|
| `past-1925` (current) | One vivid picture: the interurbans' heyday, the Key System's piers and San Francisco's streetcars | Says "past" more than "past, present, future" |
| `present` | Today's network, what most visitors know | Less to discover; BART dominates |
| `three-eras` | 1925, today and what's coming side by side: the site's whole idea | Each panel is narrow, and in the "Coming" panel today's network steps back, so it reads pale; the future lines sit outside this frame |

Change it with `SHARE_CARD=<option> npm run share-card` and commit `public/share-card.jpg`.

### The lost lines under today's network (`?ghoststyle=`; `present-ghost-*`)

| Option | For | Against |
|---|---|---|
| `hue` (current) | The same color as in the past era, so a line keeps its identity | Can read as a faint running line |
| `ink` | The past as print under today's color, in the spirit of BAM's "the present as print, the future in color" | Mode is lost; it blends into the building print |
| `dashed` | Plainly gone, and the mode stays | Dashes already mean "approximate" everywhere else |

All three are drawn at `theme.transit.eras.ghostOpacity`, 0.3. At 0.3 most lost lines nearly vanish
over the city's print: the Key System and the East Bay streetcars barely show in
`present-ghost-hue-east-bay`. The `-055-` shots show 0.55, where they read. The style panel's "Lost
lines underneath" slider tries any value.

### Play's pace (`?pace=`)

| Option | For | Against |
|---|---|---|
| `even` (current) | Every year takes the same time (about 0.11 s at 1×), so time reads as time | The quiet decades take as long as the busy ones: 1960-90 takes as long as 1900-30 |
| `busy` | A year takes longer the more lines open or close in it (by the square root of their number), from 0.05 s for a quiet year to 0.35 s for 1929, the busiest (34 lines), at 1×. Over the same 20 s: 1900-30 takes 4.6 s and 1930-60 4.5 s (3.4 s each when even); 1960-90 takes 2.5 s and 1990-2026 3.4 s | Time is uneven, and the slider's ticks no longer move at a steady rate |

`fadeOutYears` (2) sets how long a closed line fades. The style panel's "Fade out over" slider
tries other values.

## For Matthew

New from this phase:

- **Choices:**
  - the share card: `past-1925`, `present` or `three-eras`;
  - the ghost: `hue`, `ink` or `dashed`, and its opacity (0.3 or about 0.55);
  - the pace: `even` or `busy`.
- **Photos:**
  - look over the twenty-four in place (`past-line-*-photo`): keep, swap or drop any. Halftone scans show
    moiré;
  - look at the Library of Congress candidates in `photos-candidates.md`, which also lists what to
    check;
  - confirm Carol Highsmith's public-domain dedication on the Library of Congress's page;
  - decide on the contractor-made survey photos;
  - for each photo you choose, write a caption from the image.

  `make photos` needs the Library of Congress's and Wikimedia's image servers. They are blocked
  from this container, so run it locally, or allow `tile.loc.gov` and `upload.wikimedia.org`.
- **The palette:** the style panel is ready for your palette (`?style=1`; export, then commit as
  `src/theme/theme.json`). The basemap colors are BAM's, so a change there belongs in BAM too.
- **BAM's `controlBorder`:** field and filter-chip outlines now use BAM's `#949494`. That keeps the
  shared colors identical, and it changes the chips' look a little.
- **On a device:** the year slider's speed and Safari on an iPhone need a real phone. Headless
  WebGL here is software only.
- **Deploy:** merging the pull request publishes the site to GitHub Pages, with the share card.

Still open from Phases 2, 3 and 4: the lists in `phase-2d.md`, `phase-3.md` and `phase-4.md` ("For
Matthew"). Among them: the solidity and proposal looks, your picks for the ideal network, and the
future statuses' next check, due Jan 14, 2027.
