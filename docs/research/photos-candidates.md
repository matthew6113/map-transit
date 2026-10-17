# Research: public-domain photo candidates from the Library of Congress

Candidates for each line's panel photo (`photo` in `docs/SCHEMA.md`). Gathered on Oct 17, 2026, from
the Library of Congress's JSON API only (`www.loc.gov/photos/`, `www.loc.gov/collections/…`,
`www.loc.gov/item/<id>/?fo=json`).

## Read this first

- **No image was looked at.** The image server (`tile.loc.gov`) and the handle server
  (`hdl.loc.gov`, which hosts the LOC's rights pages) are blocked here. Everything below rests on the
  item records: title, date, creator, notes, subjects, call number, rights statement and file list.
  Every candidate needs a look at the image before it is used.
- **A record naming a line is not proof the photo shows it.** A title like "Oakland Ferry and Goat
  Island from tower of Union Ferry Deposit" says what the photographer pointed at, not how big the
  boat is in the frame.
- **Nothing here is drawn from Wikimedia Commons, Calisphere, OAC or SFPL**, which were blocked. Those
  hold far more Bay Area transit photos (Key System, Sacramento Northern, Market Street Railway)
  than the LOC does, but their PD status would need the same check.
- No web search was used.

## What the map draws (the lines photos are for)

- **Past:** 148 lines in 28 system files under `data/past/` (Central Pacific and Southern Pacific
  main lines, SP East Bay electrics, Key System, East Bay streetcars, SF cable lines, Market Street
  Railway, early Muni, the ferries, Sacramento Northern, Northwestern Pacific and its predecessors,
  Petaluma & Santa Rosa, Ocean Shore, Mt. Tamalpais, Santa Fe, Western Pacific and others).
  `bay-bridge/lines.json` has no lines of its own.
- **Present:** 47 lines in 15 systems (BART, Muni Metro, cable cars and the F line, Caltrain, SMART,
  VTA, ACE, Amtrak, the ferries, three BRT lines, three heritage lines, SFO AirTrain).
- **Future (BAM's 6 lines) and ideal (Matthew's) were not searched.** Future facts come from official
  sources, and the ideal network is Matthew's.

## What the rights statements mean here

| Statement as recorded | Where | Public domain when |
|---|---|---|
| "No known restrictions on publication." | Stereographs, Detroit Publishing, Lawrence & Houseworth, some postcards, Highsmith | Published before 1931 (`PD-US-expired`), or Highsmith (below). The statement alone isn't proof; the date is. |
| "No known restrictions on images made by the U.S. Government; images copied from other sources may be restricted." | All HABS, HAER and HALS surveys | Photos by federal staff (Jet Lowe of HAER, Jack E. Boucher of HABS) are US government works (`public-domain`). Copies of older photos are PD only by their own age. Photos made by contractors for a state sponsor are flagged below. |
| "No known restrictions." | FSA/OWI | US government work (`public-domain`). |
| "Rights status not evaluated." | Most of the postcard filing series | Not PD on this record. Left out unless the date proves publication before 1931. |
| No rights statement at all | Some older catalog items (`99400683`, `99472361`) | PD only by date: these carry a copyright notice of 1906 and 1895, so they were published then. |

Two date rules decide most cases. **Published in the US before 1931** means `PD-US-expired` in 2026.
**Never published** means life + 70 years, or **120 years from creation** for anonymous and corporate
works, so an unpublished railroad-company photo made before 1906 is PD in 2026.

Three LOC rights pages that the records point to couldn't be read here (they redirect to
`hdl.loc.gov`): `114_habs.html` (HABS/HAER/HALS), the Highsmith rights page, and `res.102.det`
(Detroit Publishing). **Highsmith:** every record reads "No known restrictions on publication.", and
she gave the photos to the Library for public use. Confirm on the Highsmith rights page that they are
dedicated to the public domain before using `license: "public-domain"`.

### Contractor photos in HABS, HAER and HALS

Some surveys were not made by federal staff:

- **HALS CA-164** (Market Street): Caltrans is the recorded sponsor and ICF the contractor; the
  photographer is Stephen D. Schafer.
- **HAER CA-32's 1998 addendum** (the Bay Bridge): Caltrans is the sponsor, with four contractors;
  the photographers are Dennis Hill and Frank Deras Jr.
- **HABS CA-2805** (16th Street Station) and **HABS CA-2342** (the Santa Fe depot at Richmond): no
  photographer is recorded, and no federal staff are listed. Treat them like the others until their
  caption pages say otherwise.

The HABS/HAER/HALS program takes documentation only without copyright restrictions. But the LOC's
statement covers "images made by the U.S. Government", and these weren't. They are probably PD, but
less certain than the federal staff photos. They are marked **[contractor]** below.

## About the `photo` field

*Updated after this research:* the schema now takes non-Commons photos (`docs/SCHEMA.md`, "Extras"),
so an LOC photo is entered like this, in the line's `lines.json`:

```json
"photo": {
  "image_url": "https://tile.loc.gov/storage-services/service/pnp/stereo/1s10000/1s10000/1s10400/1s10445v.jpg",
  "crop": [0, 0, 0.5, 1],
  "caption": "A Mt. Tamalpais Railway train on the double bow-knot, about 1907.",
  "author": "Underwood & Underwood",
  "date": "c1907",
  "license": "PD-US-expired",
  "source_url": "https://www.loc.gov/item/2018645466/"
}
```

`image_url` is the image itself (a JPEG, or the master TIFF); `crop` keeps one half of a
stereograph, as fractions [left, top, right, bottom]; `caption` says what the photo shows and is
also its alt text, so it can only be written once someone has seen the image. `make photos`
downloads it and writes a resized copy to `public/photos/`. A photo cited for facts can also carry a
`sources.json` id as `source`. (The address above is an example of the form, not checked.)

## File sizes

- **Highsmith** records list IIIF JPEGs at 6.25 %, 12.5 %, 25 % and 50 % of the original. The 25 %
  file (about 1,150–1,850 px wide) is given below.
- **Everything else** offers a `v.jpg` at most 1,024 px on its long side (sometimes only an `r.jpg` of
  640 px), plus the master TIFF (`u.tif`). For 1,000–2,000 px, the build should download the TIFF and
  downscale it.
- **Stereographs:** the 1,024 px file is the whole card, so each half is only about 500 px. Use the
  TIFF and crop one half.

---

## Past era: candidates by line

### `mt-tamalpais-railway`: Mount Tamalpais railway, Mill Valley to the summit

**A1. The "double bow-knot" (strong)**
- Item: https://www.loc.gov/item/2018645466/ (LCCN 2018645466; LC-DIG-stereo-1s10445)
- Title: *The "double bow-knot" in Mt. Tamalpais railway, - looking S.E. to San Francisco Bay, Cal.*
- Date: c1907. Creator: Underwood & Underwood ("New York ; London ; Toronto-Canada ; Ottawa-Kansas :
  Underwood & Underwood, Publishers, c1907."), no. 9767. A stereograph.
- Rights: "No known restrictions on publication." **PD-US-expired**: published with a copyright
  notice in 1907.
- Line: the title names the Mt. Tamalpais railway and its double bow-knot.
- Files: https://tile.loc.gov/storage-services/service/pnp/stereo/1s10000/1s10000/1s10400/1s10445v.jpg
  (1,024 × 537, the whole card); TIFF
  https://tile.loc.gov/storage-services/master/pnp/stereo/1s10000/1s10000/1s10400/1s10445u.tif
- Check: whether a train is on the loop; crop one half.

**Not recommended (rights not evaluated):** four postcards titled with the "Mt. Tamalpais & Muir Woods
Ry.", all "[between 1900 and 1940]" with "Rights status not evaluated":
- "Gravity ride…" (2024686546)
- "In the clouds…" (2024686545)
- "Muir Woods…" (2024686801)
- "Aero view Mt. Tamalpais…" (2024686789)

The railway closed in 1930, but that doesn't prove the cards were published before 1931. Each card's
back is digitized (for example
https://tile.loc.gov/storage-services/service/pnp/pcrd/2d00000/2d00000/2d00200/2d00268v.jpg). A
postmark or printed date before 1931 would make one usable.

### `cp-oakland-sacramento-niles`: Central Pacific trains by Niles and the Altamont Pass

**A2. Alameda Cañon (strong)**
- Item: https://www.loc.gov/item/2003653087/ (LCCN 2003653087; LC-USZ62-133178)
- Title: *Central Pacific Railroad. Looking up Alameda Cañon, from the bridge*
- Date: ca. 1870 ("San Francisco : Thomas Houseworth & Co., [ca. 1870]"). Creator: Thomas Houseworth
  & Co., publisher, no. 1519. A stereograph.
- Rights: "No known restrictions on publication." **PD-US-expired**: published about 1870.
- Line: the title names the Central Pacific in Alameda Cañon. The project's sources (Halley 1876, in
  `docs/research/sources-2c/western-pacific.md` and `leads-2c/railroads.md`) put "Alameda Cañon"
  above Vallejo's Mills (Niles), now Niles Canyon, on this line's route.
- Files: https://tile.loc.gov/storage-services/service/pnp/cph/3c30000/3c33000/3c33100/3c33178v.jpg
  (1,024 px, from a copy negative); TIFF
  https://tile.loc.gov/storage-services/master/pnp/cph/3c30000/3c33000/3c33100/3c33178u.tif
- Check: whether the track or a train is in view; the subject heading is "Bodies of water", so it may
  be mostly creek.

**A3. The pier the first train used (alternative)**
- HABS CA-1888, Southern Pacific Mole & Pier, photo 2:
  https://www.loc.gov/resource/hhh.ca0018.photos.010831p (survey https://www.loc.gov/item/ca0018/)
- Caption: "Historic American Buildings Survey Southern Pacific RR Coll. About 1869 Oakland Point Pier
  - Used by First Central Pacific Train to Enter Oakland -- November 8, 1869"
- Date: about 1869. Creator: unknown (Southern Pacific Railroad collection, copied by HABS).
- Rights: the HABS statement quoted above. **PD-US-expired**: made about 1869, so PD whether or not it
  was published.
- Line: the line's `opened` is 1869-11-08, the first through train from Oakland Point; the caption
  gives the same day.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca0000/ca0018/photos/010831pv.jpg
  (732 × 1,024); TIFF …/ca0018/photos/010831pu.tif

### `cp-oakland-sacramento-benicia`: Central Pacific trains by the Benicia ferry

**A4. The Overland Limited at 16th Street (probable; route to confirm)**
- Item: https://www.loc.gov/item/99400683/ (LC-USZ62-89508)
- Title: *The Overland Limited leaving Sixteenth Street Station, Oakland, California*
- Date: c1906. Creator: none recorded. Call number "SSF - Railroads--Companies--Southern
  Pacific--1906".
- Rights: none recorded. **PD-US-expired**: the record's "c1906" is a copyright notice, so it was
  published in 1906.
- Line: the map draws only this line and `sp-oakland-tracy` through Sixteenth Street, and the
  Overland Limited was a Sacramento train. **The record doesn't say it ran by Benicia in 1906**, so a
  source for its route is needed before assigning it.
- Files: https://tile.loc.gov/storage-services/service/pnp/cph/3b30000/3b35000/3b35800/3b35880r.jpg
  (640 px only); TIFF
  https://tile.loc.gov/storage-services/master/pnp/cph/3b30000/3b35000/3b35800/3b35880u.tif

### `sp-oakland-pier-ferry`: Oakland ferry (Oakland Pier)

**A5. The Oakland ferry from the Ferry Building tower (good)**
- Item: https://www.loc.gov/item/2018645389/ (LC-DIG-stereo-1s10570)
- Title: *Oakland Ferry and Goat Island from tower of Union Ferry Deposit, San Francisco, California*
  ("Deposit" sic)
- Date: c1906 Mar 12. Creator: Universal View Co.; "Copyright 1906 by E.W. Kelley."; no. 6786. A
  stereograph.
- Rights: "No known restrictions on publication." **PD-US-expired** (published 1906).
- Line: the title names the Oakland ferry.
- Files: https://tile.loc.gov/storage-services/service/pnp/stereo/1s10000/1s10000/1s10500/1s10570v.jpg
  (1,024 px, whole card); TIFF …/1s10500/1s10570u.tif
- Check: how large the boat is in the frame.

**A6. The ferry slip at the Oakland Mole, 1887 (alternative)**
- HABS CA-1888, photo 10: https://www.loc.gov/resource/hhh.ca0018.photos.010839p
- Caption: "Historic American Buildings Survey Southern Pacific Railroad Coll. Photograph of 1887
  Ferry Slip - Oakland Mole"
- Date: 1887. Creator: unknown (SP collection).
- Rights: the HABS statement. **PD-US-expired**: made 1887, PD whether or not it was published.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca0000/ca0018/photos/010839pv.jpg
  (1,024 × 739); TIFF …/photos/010839pu.tif

**Other leads, weaker**
- **HABS CA-1888, photo 11**, "About 1900 Oakland Mole -- Looking West"
  (https://www.loc.gov/resource/hhh.ca0018.photos.010840p). PD only if it was made before 1906 or
  published before 1931; "about 1900" leaves a little doubt.
- **https://www.loc.gov/item/2023636401/**, *Loading flour and provisions on steamer at Oakland Pier,
  San Francisco disaster, U.S.A.* (1906, H.C. White Co., PD-US-expired). The boat isn't identified as
  a ferry.
- **https://www.loc.gov/item/99472361/**, *Looking east from Hopkins' Art Association showing Goat
  Island and terminus S.P.R.R. and ferry boat* (c1895, no rights statement, PD-US-expired). A
  distant view from Nob Hill.

### `sp-oakland-pier-ferry` or `sp-creek-route`: unassigned

**A7. The steamer Washoe, 1866**
- Item: https://www.loc.gov/item/2002723550/ (LC-USZ62-27493)
- Title: *Oakland Ferry--Steamer WASHOE, San Francisco*
- Date: published 1866. Creator: Lawrence & Houseworth, publisher; "Gems of California scenery,
  no. 303". Half of a stereograph.
- Rights: "No known restrictions on publication." **PD-US-expired**.
- Line: the record says "Oakland Ferry" but not which route. The map has two Oakland ferry lines:
  `sp-oakland-pier-ferry`, opened 1863-09-02, and `sp-creek-route`, which the project's research
  (Halley 1876) has "re-opened" on 1876-07-01. **Needs a source** for the Washoe's route in 1866
  before it can go on either line.
- Files: https://tile.loc.gov/storage-services/service/pnp/cph/3a20000/3a28000/3a28200/3a28283r.jpg
  (640 px); TIFF …/3a28200/3a28283u.tif

### `atsf-ferry`: Santa Fe ferry, Ferry Point to San Francisco

**A8. The view from a Point Richmond ferry boat (weak)**
- Item: https://www.loc.gov/item/2023636304/ (LC-DIG-stereo-1s48824)
- Title: *Looking West, from a Point Richmond Ferry boat, during the San Francisco conflagration,
  California*
- Date: 1906. Creator: International Stereograph Co., publisher; "Copyright 1906 by C.L. Wasson.";
  no. 20649.
- Rights: "No known restrictions on publication." **PD-US-expired**.
- Line: the title names the Point Richmond ferry. But it is a view **from** the boat toward the
  burning city, so it may show little of the boat.
- Files: https://tile.loc.gov/storage-services/service/pnp/stereo/1s40000/1s48000/1s48800/1s48824v.jpg;
  TIFF …/1s48800/1s48824u.tif

### `atsf-stockton-ferry-point`: Santa Fe trains, Stockton to Richmond and Ferry Point

**A9. The Santa Fe depot at Richmond (station only) [contractor?]**
- HABS CA-2342, Santa Fe Railroad Depot, 101 Garrard Boulevard, Richmond:
  https://www.loc.gov/resource/hhh.ca1753.photos.322760p (survey
  https://www.loc.gov/item/ca1753/)
- Caption: "VIEW OF NORTH FRONT AND WEST SIDE OF SANTA FE RAILROAD DEPOT, FACING EAST"
- Date: not recorded (survey "compiled after 1933"). Creator: not recorded; transmitter David Maul.
  The record says the depot was built in 1910 "to serve as a combination passenger depot, freight
  warehouse, and administrative office to serve the Santa Fe Railway facilities."
- Rights: the HABS statement. Probably PD as HABS documentation; the photographer and date are in the
  caption pages (https://tile.loc.gov/storage-services/master/pnp/habshaer/ca/ca1700/ca1753/data/ca1753cap.pdf,
  unreadable here).
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca1700/ca1753/photos/322760pv.jpg
  (1,024 × 817); TIFF …/photos/322760pu.tif

### `sp-peninsula`: Peninsula trains, San Francisco to San José

**A10. The San Francisco & San Jose station at Menlo Park (station only)**
- HABS CA-1994, photo 1: https://www.loc.gov/resource/hhh.ca0819.photos.017477p (survey
  https://www.loc.gov/item/ca0819/)
- Caption: "NORTHEAST (TRACK) SIDE - San Francisco & San Jose Railroad Station, 1100 Merrill Street,
  Menlo Park, San Mateo County, CA"
- Date and photographer: not recorded (see the caption pages, …/ca0819/data/ca0819cap.pdf). The
  record's significance note says "built in 1867 by the first incorporated railroad line in the
  state."
- Rights: the HABS statement. The photographer isn't recorded and no contractor or sponsor is listed,
  so it is probably HABS's own work; confirm in the caption pages.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca0800/ca0819/photos/017477pv.jpg
  (1,024 × 727); TIFF …/photos/017477pu.tif
- Alternative: HABS CA-2120, the 1894 Burlingame station, "TRACK SIDE, LOOKING SOUTHEAST"
  (https://www.loc.gov/resource/hhh.ca0857.photos.017355p, …/ca0857/photos/017355pv.jpg).

### Ferry terminals shared by many past lines (not assigned)

These show the San Francisco terminal used by most past ferry lines. They suit a ferry system panel
rather than one line.
- **HABS CA-1749**, Union Depot & Ferry House, "Wells Fargo Bank Historical Museum, S.F. 1887 WEST
  ELEVATION". HABS CA-1910 says this wooden depot was finished in 1877 and replaced by the Ferry
  Building. https://www.loc.gov/resource/hhh.ca0739.photos.016902p, file
  …/ca0700/ca0739/photos/016902pv.jpg. Made 1887, so PD.
- ***The Union Ferry Depot where all passengers land, San Francisco, U.S.A.*** (c1905, H.C. White Co.,
  stereo): https://www.loc.gov/item/2018645394/
- ***Ferry Building, San Francisco, Cal.*** (c1906, Detroit Publishing Co., glass negative):
  https://www.loc.gov/item/2016794999/, file
  https://tile.loc.gov/storage-services/service/pnp/det/4a10000/4a13000/4a13200/4a13250v.jpg
- ***Ferry Building -- Terminal for San Francisco's ferry traffic*** (c1918, Keystone View Co.,
  stereo): https://www.loc.gov/item/2018646751/

All three are "No known restrictions on publication." and PD-US-expired.

### `ggf-hyde-sausalito`: possible, needs a look

- **https://www.loc.gov/item/2025662796/**, *Golden Gate Ferry, San Francisco, Calif.*, postcard,
  "[between 1913 and 1927]", Pacific Novelty Co.
- Rights: "No known restrictions on publication." PD-US-expired (published by 1927).
- Line: the Golden Gate Ferry company's Hyde Street–Sausalito route opened 1922-05-28 (the line's
  `opened`). The card's date range starts earlier, so "Golden Gate Ferry" may not mean that company.
  Assign it only if the image shows that company's boat or slip.
- File: https://tile.loc.gov/storage-services/service/pnp/pcrd/1a00000/1a01000/1a01100/1a01176v.jpg

### Leads that were left out

- **Key System, from HAER CA-32 (1998):** "VIEW OF LOWER DECK AND KEY SYSTEM STATION CANOPY, YERBA
  BUENA EAST VIADUCT" by Dennis Hill (https://www.loc.gov/resource/hhh.ca1352.photos.383203p). A
  structure 40 years after the trains, with no train. HAER CA-237 (the Key Pier Substation) is the
  same kind of photo.
- **Interurban Electric Railway, from HAER CA-164:** photo 17 is a 1939 photo showing "An Interurban
  Electric Railway car, with power supply pantograph raised"
  (https://www.loc.gov/resource/hhh.ca2002.photos.042519p). It is a copy of a print held by the Bay
  Bridge maintenance office; unpublished, state-made and from 1939, so **not clearly PD**.
- **SF cable lines, Market Street:** ***Market St.***, I. W. Taber, "[between 1885 and 1900]"
  (https://www.loc.gov/item/2015651519/, subject "Cable railroads"). PD: Taber died in 1912. But
  several cable lines shared Market Street, and the record doesn't name one.
- **California Street cable cars in 1906:** ***Burned cable cars--looking E. on California St.…***
  (2023635419) and ***San Francisco earthquake, 1906: Burned cable cars - looking north up Nob Hill,
  on California St.*** (2005675885). Both are on the surviving stretch east of Van Ness, so they fit
  the present `muni-cable-california-street`, not `sf-california-st-west`.
- **Clay Street Hill Railroad:** HAER CA-12 photo 1 is a photocopy of a c. 1880 engraving of street
  profiles, including the Clay Street Hill Railroad's. It is a diagram, not a photo.
- **Generic streetcars:** ***Reading war news aboard streetcar. San Francisco, California*** (John
  Collier Jr., Dec 1941, FSA/OWI; https://www.loc.gov/item/2017821657/) is public domain but names no
  line. Many 1906 stereographs of Market Street likewise name no line.
- **Sausalito ferry:** ***Alcatraz Island from Sausalito Ferry…*** (c1901, Keystone;
  https://www.loc.gov/item/2017652018/). The map draws no Sausalito ferry line.
- **Not ferries on a mapped line:** ***The SACRAMENTO and OAKLAND steamers, San Francisco*** (1866,
  2002723498) are river stern-wheelers by their subject heading. The FSA/OWI shipyard ferries of 1943
  don't run on a mapped line.
- **Copyrighted or restricted:**
  - the 1946 Zan Stark cable car postcards (2024686866–68): registered copyrights, renewal unknown;
  - the Moulin Studios ***Cable cars on California Street*** of 1950 (92521947): access-restricted;
  - ***Southern Pacific ferry boat plying between San Francisco and Oakland*** (92512114): no digital
    file online.

---

## Present era: candidates by line

### `muni-cable-powell-hyde`: Powell-Hyde cable car

**B1. Carol Highsmith, 2012 (strong)**
- Item: https://www.loc.gov/item/2013630203/ (LC-DIG-highsm-20775)
- Title: *Cable car on Hyde Street, San Francisco, California*
- Date: 2012. Creator: Carol M. Highsmith (Jon B. Lovelace Collection of California Photographs).
- Rights: "No known restrictions on publication." **public-domain** (confirm on the Highsmith rights
  page).
- Line: the Powell-Hyde is the only cable line on Hyde Street.
- File: https://tile.loc.gov/image-services/iiif/service:pnp:highsm:20700:20775/full/pct:25/0/default.jpg
  (1,536 px wide)

**Alternatives**
- **Highsmith 2012, same title:** https://www.loc.gov/item/2013630202/, file …:20774/full/pct:25/…
  (1,174 px).
- **Highsmith, earlier:** ***Cable car nears the top of Hyde Street, San Francisco, California***,
  "[between 1980 and 2006]": https://www.loc.gov/item/2011633069/, file
  https://tile.loc.gov/image-services/iiif/service:pnp:highsm:14800:14875/full/pct:25/0/default.jpg
  (1,632 px).
- **HAER CA-12, photo 3 by Jet Lowe:** "HYDE STREET HILL: View to north looking down the Hyde Street
  hill from Lombard Street. … Credit JL." (https://www.loc.gov/resource/hhh.ca1237.photos.016236p).
  Federal work, public-domain; it may show no car.

### `muni-cable-powell-mason`: Powell-Mason cable car

**B2. The Bay & Taylor turntable, HAER (strong)**
- HAER CA-12, San Francisco Cable Railway, photo 20:
  https://www.loc.gov/resource/hhh.ca1237.photos.016253p (survey https://www.loc.gov/item/ca1237/)
- Caption: "TURNTABLE WITH CABLE CAR - BAY & TAYLOR: View to northwest of the Bay and Taylor
  turntable. The gripman and conductor are turning the car around. Credit JL."
- Date: not in the record (HAER CA-12; caption pages at
  https://tile.loc.gov/storage-services/master/pnp/habshaer/ca/ca1200/ca1237/data/ca1237cap.pdf).
  Creator: Jet Lowe; the survey lists "Lowe, Jet, photographer".
- Rights: the HABS/HAER statement. **public-domain**: Jet Lowe was HAER's staff photographer, so this
  is a federal work.
- Line: the Powell-Mason's GTFS geometry in `data/present/muni/segments.geojson` ends at
  −122.4153, 37.8054, Taylor and Bay.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca1200/ca1237/photos/016253pv.jpg
  (1,024 × 814); TIFF …/photos/016253pu.tif

### `muni-cable-california-street`: California Street cable car

**B3. California Street, HAER (good, if a car is in view)**
- HAER CA-12, photo 4: https://www.loc.gov/resource/hhh.ca1237.photos.016237p
- Caption: "VIEW EAST ON CALIFORNIA STREET. Credit JL."
- Date: not in the record. Creator: Jet Lowe.
- Rights: as for B2, **public-domain**.
- Line: California Street is this line's street. The caption doesn't mention a car.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca1200/ca1237/photos/016237pv.jpg
  (820 × 1,024); TIFF …/photos/016237pu.tif

**Alternative, historic**
- ***California Street hill, San Francisco***, c1901, "Photograph by the Detroit Publishing Co.",
  no. 14033: https://www.loc.gov/item/2004671816/
- The caption card's tracings include "Street railways".
- Rights: "No known restrictions on publication. For information see "Detroit Publishing Company
  Rights and Restrictions Information," https://hdl.loc.gov/loc.pnp/res.102.det". PD-US-expired.
- Files: 640 px r.jpg, or TIFF
  https://tile.loc.gov/storage-services/master/pnp/cph/3b10000/3b16000/3b16600/3b16638u.tif

### `muni-f`: F Market & Wharves

**B4. Carol Highsmith (strong)**
- Item: https://www.loc.gov/item/2011631779/ (LC-HS503-2544)
- Title: *Refurbished F-line trolleys, purchased from Philadelphia, run out Market Street to the
  Castro neighborhood in San Francisco, California*
- Date: "[between 1980 and 2006]". Creator: Carol M. Highsmith.
- Rights: "No known restrictions on publication." **public-domain** (as B1).
- Line: the title names the F line.
- File: https://tile.loc.gov/image-services/iiif/service:pnp:highsm:13500:13585/full/pct:25/0/default.jpg
  (1,740 px)

**Alternatives**
- **Highsmith:** ***Driver of an F-Line trolley poses near his car at the end of the line in the
  Castro District, San Francisco, California*** (https://www.loc.gov/item/2011636236/, file
  …:18000:18042/full/pct:25/…, 1,549 px).
- **HALS CA-164, color photo 205 [contractor]:** "Muni platform with F-line Muni historic Birmingham
  (Alabama) Electric Company streetcar No. 1077"
  (https://www.loc.gov/resource/hhh.ca4485.color.404571c, file
  …/ca4485/color/404571cv.jpg, 1,024 × 819).
- **HALS CA-164, color photo 206 [contractor]:** "With F-line Muni historic Los Angeles Railway
  streetcar No. 1052", seen from the Hobart Building
  (https://www.loc.gov/resource/hhh.ca4485.color.404572c). The other 203 photos of that survey are
  not online.

### `napa-valley-wine-train`: Napa Valley Wine Train

**B5. Carol Highsmith, 2012 (strong)**
- Item: https://www.loc.gov/item/2013633078/ (LC-DIG-highsm-22621)
- Title: *The Napa Valley Wine Train, a privately operated excursion train that runs between Napa and
  St. Helena, California*
- Date: 2012. Creator: Carol M. Highsmith (Lovelace collection).
- Rights: "No known restrictions on publication." **public-domain** (as B1).
- File: https://tile.loc.gov/image-services/iiif/service:pnp:highsm:22600:22621/full/pct:25/0/default.jpg
  (1,255 px)
- Alternatives:
  - the same title, https://www.loc.gov/item/2013633079/ (1,413 px);
  - three titled "The Napa County wine train offers lunch…": 2013630821, 2013630822, 2013630802.

### `amtrak-coast-starlight`: Coast Starlight

**B6. The Coast Starlight at 16th Street Station (good) [contractor?]**
- HABS CA-2805, Southern Pacific Railroad Sixteenth Street Station:
  https://www.loc.gov/resource/hhh.ca3618.photos.389491p (survey https://www.loc.gov/item/ca3618/)
- Caption: "Oblique view of north end and west side of station, view to south from operator's room of
  Sixteenth Street Tower (HAER CA-2264); train in station is southbound Coast Starlight, AMTRAK Train
  Number 11"
- Date and photographer: not in the record (caption pages …/ca3600/ca3618/data/ca3618cap.pdf).
- Rights: the HABS statement. Probably PD as HABS documentation, but not federal-made.
- Line: the caption names the Coast Starlight.
- Files: https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca3600/ca3618/photos/389491pv.jpg
  (1,024 × 818); TIFF …/photos/389491pu.tif

### `niles-canyon-railway`: Niles Canyon Railway (historic stand-in only)

- The 1870 ***Central Pacific Railroad. Looking up Alameda Cañon, from the bridge*** (A2) shows the
  Central Pacific in the canyon the heritage line runs through, Niles to Sunol. Whether the heritage
  line runs on the same track isn't sourced here (the line's notes don't say).
- It could stand in until a present-day public-domain photo is found. It is the same file as A2.

### Shared terminals and lines that can't be told apart yet

- **The Ferry Building:**
  - ***The San Francisco Ferry Building, a terminal for ferries, a marketplace, and offices is located
    on The Embarcadero in San Francisco, California*** (Highsmith 2012,
    https://www.loc.gov/item/2013630062/, file
    https://tile.loc.gov/image-services/iiif/service:pnp:highsm:20600:20634/full/pct:25/0/default.jpg);
  - more Highsmith views: 2013630063, 2013630362–64;
  - the HABS 1960 view by Jack E. Boucher, "EMBARCADERO ELEVATION"
    (https://www.loc.gov/resource/hhh.ca0641.photos.017003p, federal).

  In this project's GTFS stops (`points.geojson`) it is the San Francisco terminal of ten present
  lines:
  - five Golden Gate Ferry lines: Angel Island, Larkspur, Sausalito, Tiburon, Triangle;
  - five San Francisco Bay Ferry lines: Alameda Seaplane, Harbor Bay, Oakland & Alameda, Richmond,
    Vallejo.

  None of the boats is named, so it suits a ferry system panel.
- **Muni Metro, line not named:**
  - ***[Muni light rail transit car at Embarcadero, with Bay Bridge in background. San Francisco,
    California]*** (Highsmith 2012, https://www.loc.gov/item/2013630365/, file
    …:20900:20937/full/pct:25/…, 1,840 px);
  - ***Muni Transit station near the AT&T ball park in San Francisco, California***
    (https://www.loc.gov/item/2013630209/).

  The records don't name a line, and several lines share those tracks. In today's GTFS the K, L, M
  and N all pass the Embarcadero near Folsom, and the routes in 2012 aren't sourced here. The car's
  destination sign has to decide it.
- **Cable cars, line not named:** Highsmith ***Cable car turnaround*** (2011630099), ***Cable car
  ascends hill*** (2011630941) and ***Cable car in historic Chinatown*** (2013631881–83) don't name
  the line.
- **Caltrain, fallback only:** HABS CA-2120's Burlingame station (A10's alternative) is a station
  Caltrain still serves. The photo's date is unknown, so it may predate Caltrain.

---

## Best candidate per line

Licenses use the schema's enum. "Contractor" means probably PD but less certain (see above).

| Line | Best candidate | License | Confidence that it shows the line |
|---|---|---|---|
| `mt-tamalpais-railway` | [2018645466](https://www.loc.gov/item/2018645466/), "double bow-knot", Underwood & Underwood, c1907 | PD-US-expired | High (title names the railway) |
| `cp-oakland-sacramento-niles` | [2003653087](https://www.loc.gov/item/2003653087/), Alameda Cañon, Houseworth, ca. 1870 | PD-US-expired | High (title names the CP; canyon on the route) |
| `cp-oakland-sacramento-benicia` | [99400683](https://www.loc.gov/item/99400683/), Overland Limited at 16th Street, c1906 | PD-US-expired | Medium: needs a source for the Overland's 1906 route |
| `sp-oakland-pier-ferry` | [2018645389](https://www.loc.gov/item/2018645389/), Oakland Ferry from the Ferry Building tower, c1906 | PD-US-expired | Medium-high (title names the Oakland ferry) |
| `atsf-ferry` | [2023636304](https://www.loc.gov/item/2023636304/), from a Point Richmond ferry boat, 1906 | PD-US-expired | Low-medium (view from the boat) |
| `atsf-stockton-ferry-point` | [HABS CA-2342](https://www.loc.gov/resource/hhh.ca1753.photos.322760p), Santa Fe depot, Richmond | public-domain (contractor) | Medium (its depot, no train) |
| `sp-peninsula` | [HABS CA-1994](https://www.loc.gov/resource/hhh.ca0819.photos.017477p), SF & San Jose station, Menlo Park | public-domain (photographer to confirm) | Medium (its 1867 station, no train) |
| `muni-cable-powell-hyde` | [2013630203](https://www.loc.gov/item/2013630203/), Highsmith, 2012 | public-domain | High |
| `muni-cable-powell-mason` | [HAER CA-12 photo 20](https://www.loc.gov/resource/hhh.ca1237.photos.016253p), Bay & Taylor turntable, Jet Lowe | public-domain | High |
| `muni-cable-california-street` | [HAER CA-12 photo 4](https://www.loc.gov/resource/hhh.ca1237.photos.016237p), view east on California St, Jet Lowe | public-domain | Medium (check a car is in view) |
| `muni-f` | [2011631779](https://www.loc.gov/item/2011631779/), Highsmith, F-line trolleys on Market St | public-domain | High |
| `napa-valley-wine-train` | [2013633078](https://www.loc.gov/item/2013633078/), Highsmith, 2012 | public-domain | High |
| `amtrak-coast-starlight` | [HABS CA-2805](https://www.loc.gov/resource/hhh.ca3618.photos.389491p), Coast Starlight at 16th Street | public-domain (contractor) | High (caption names the train) |
| `niles-canyon-railway` | [2003653087](https://www.loc.gov/item/2003653087/) (as `cp-oakland-sacramento-niles`), 1870 | PD-US-expired | Stand-in: the same canyon in 1870, not the heritage trains |

## Lines with no clear public-domain candidate here

- **Past, by system:**
  - Key System (all 7, including `key-ferry`);
  - SP East Bay electrics and `sp-oakland-san-jose-elmhurst`;
  - Sacramento Northern;
  - Northwestern Pacific electrics, North Pacific Coast and San Francisco & North Pacific;
  - Petaluma & Santa Rosa, and `psr-steamers`;
  - Ocean Shore;
  - Western Pacific;
  - South Pacific Coast, Dumbarton, San Ramon, Sonoma Valley and California Pacific;
  - Alameda Belt Line, Oakland Terminal, California & Nevada;
  - `cp-niles-san-jose-trains` and `sp-oakland-tracy`;
  - `sp-ocean-view` and `sp-los-altos-branch`;
  - all 14 past SF cable lines and the steam dummy;
  - Market Street Railway (all), early Muni (all 7), East Bay streetcars (all) and the North Bay
    horsecars;
  - the other past ferries.

  The ferries have only the shared Ferry Building and Union Depot photos. `ggf-hyde-sausalito` has a
  possible postcard (above).
- **Present:**
  - BART (all 6 lines, including the Oakland Airport line);
  - Caltrain (only the Burlingame station as a fallback);
  - Muni Metro J, K, L, M, N and T (two unassigned leads above);
  - VTA (all 3), SMART, ACE, Capitol Corridor, California Zephyr, Gold Runner;
  - SFO AirTrain;
  - the three BRT lines;
  - Western Railway Museum;
  - Angel Island–Tiburon and Treasure Island ferries;
  - all other present ferries (only the shared Ferry Building photo).

  The LOC holds almost nothing of these. HAER CA-2316 (Haystack Landing bridge, for SMART) has no
  photos online. Highsmith's California set has no BART, Caltrain or VTA titles.

## What Matthew needs to do by hand

1. **Look at every candidate image.** The LOC item page shows it. Confirm that the train, car or boat
   is actually in the frame. For stereographs, pick a half and crop it from the TIFF.
2. **Confirm Highsmith's public-domain dedication** on the LOC's Highsmith rights page, which couldn't
   be read here.
3. **Read the HABS/HAER/HALS caption pages** for photo dates and photographers:
   - CA-12 (`ca1237cap.pdf`), for the Jet Lowe photos;
   - CA-2805 (`ca3618cap.pdf`);
   - CA-2342 (`ca1753cap.pdf`);
   - CA-1994 (`ca0819cap.pdf`).

   Then decide whether the contractor-made ones are acceptable.
4. **Source two line assignments:**
   - whether the Overland Limited ran by Benicia in 1906 (A4);
   - which company ran the steamer Washoe as the Oakland ferry in 1866 (A7).
5. **Optional, for the Mt. Tamalpais postcards:** check each card's back for a pre-1931 postmark or
   date. One would turn the "Gravity ride" card into a usable alternative.
6. **For each photo chosen,** write its caption from the image and send the record (or the item
   number and the half to keep); `make photos` does the rest.
