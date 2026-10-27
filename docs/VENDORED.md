# Code vendored from BAM

These files are copied from [matthew6113/BAM](https://github.com/matthew6113/BAM) at commit
`9600699ae10affa5787c1a73374c34a5fa8e4b41` (Oct 12, 2026). Keep BAM's names and layer ids so the two
maps can merge by moving files rather than rewriting them. When BAM changes one of these files, port
the change here and update the commit above.

| Here | BAM | Changes |
|---|---|---|
| `src/basemap/basemap.ts` | `src/map/style.ts` (basemap half) | Split out as `buildBasemapStyle(theme, opts)`. **Should be backported to BAM.** It has `under` and `over` slots for the caller's layers (BAM's `project-selection-fill` sat in `under`). `layers.context` is split into `contextRoads`, `contextRail` and `contextFerry`, and context rail can be freight-only. The 3D context buildings follow the 2D/3D mode only; BAM also turns them on while a project is open. A constant `state` block is optional. |
| `src/basemap/config.ts` | `src/map/config.ts` | No `projects.json` import. `HOME_BOUNDS` is a fixed frame of the rail network, not BAM's project centers. |
| `src/basemap/region.json` | `src/generated/region.json` | Unchanged. |
| `src/basemap/router.ts` | `src/router.ts` | `/l/{line-id}` replaces `/p/{project-id}`; there is no about page yet. Adds `setQuery` for era and year. |
| `src/basemap/flight.ts` | `src/projects/flight.ts` | BAM's panel padding, reduced-motion dip and interruption handling are kept. The changes: a 1.2–2.5 s flight scaled by distance (BAM's is 4.5 s); the current pitch is kept (BAM lands at 58°); the line draws end to end in the selection color, with the drawing kept in the style; there is no massing rise; on desktop the line is fitted between the title column on the left and the panel, while at least 420 px of map stay free. |
| `src/basemap/geometry.ts` | `src/projects/data.ts` (`metres`, `ringPrefix`) | `routePrefix` draws pieces one after another; BAM's `linePrefix` grows every piece at once. |
| `src/theme/theme.ts`, `variables.ts` | same paths | The stage, massing and land-use groups are replaced by `transit` (modes, widths, eras, status, and from Phase 4 proposals). The CSS variables are `--mode-*`, not `--stage-*` and `--landuse-*`, plus `--transit-proposal-neutral` (Phase 4, the legend's neutral proposal style). Contrast checks cover the mode colors and the selection, and (Phase 5) field outlines at 3:1 on the panel. |
| `src/theme/theme.json` | same path | `colors`, `opacity` (basemap keys), `type` and `map` are identical to BAM's; a test checks this. `transit` is new. `layers.context` is split in three. Phase 5 adds `colors.controlBorder` (`#949494`) from BAM at `bbc4fd4`, which outlines fields and filter chips. |
| `src/ui/StylePanel.tsx` | same path, at `bbc4fd4` (Oct 17, 2026) | Phase 5. The same fields, contrast check, export, import and reset; storage key `transit.theme.v1`. BAM's stage colors, site fills, massing and presets give way to mode colors and widths, the eras, future status and proposals. Opens only with `?style=1` (BAM also opens it in development), so the review screenshots stay clean. |
| `src/map/MapView.tsx` | same path | Same setup. Hover is feature-state on the whole line; BAM shows a tooltip only. Adds the shared-track chooser and `onAfterSync`, which reapplies feature-state. The chooser's Escape listener is attached in a layout effect (Phase 5), so a key pressed as it opens isn't lost. |
| `src/ui/Controls.tsx` | same path | Unchanged. |
| `src/ui/Credits.tsx` | same path | This map's credit text. |
| `src/styles.css` (base, title, controls, credits, tooltip, panel, dip, breakpoints) | `src/styles.css` | `.project-panel` is renamed `.line-panel`; the index and about panel rules are dropped. The era bar, year slider, index, legend and chooser rules are new, as is the draft note under the title (`.transit-draft-note`). The style panel rules came back in Phase 5 (from `bbc4fd4`), with BAM's `--color-control-border` on fields and filter chips. |
| `scripts/siteMeta.ts` | same path | Icon dot in the interurban color. The share card (Phase 5): `og:image` and a large Twitter card from `public/share-card.jpg`, which `npm run share-card` draws from the map; BAM has none. |
| `scripts/linePages.ts` | `scripts/projectPages.ts` | One page per line in `data/app/catalog.json`, plus `404.html`. |
| `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `package-lock.json` | same paths | Same versions. Vite proxies `/generated` to BAM without a local snapshot. Playwright gains an opt-in WebKit project (`PW_WEBKIT=1`). |
| `pipeline/transit_pipeline/common.py` (`fetch`, `sha256`) | `pipeline/bam_pipeline/trace.py` (`fetch_document`) | Simplified. Phase 2 brings in BAM's `trace.py` georeferencing tools for digitizing historic maps. |
