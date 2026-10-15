// After BAM's src/ui/Credits.tsx (9600699): the same collapsing credit line, with this map's data.
// Every dataset, its license and its gaps are in DATA_LOG.md.
import { useEffect, useState } from 'preact/hooks';
import { OVERTURE_RELEASE } from '../basemap/config';

/** 511's Data Disseminator Agreement (5.b): "data provided by 511.org", linked, near the data. */
export const Credit511 = () => <a href="http://www.511.org">Data provided by 511.org</a>;

export function MapDataCredits({ has511 = false }: { has511?: boolean }) {
  return (
    <>
      {has511 && <><Credit511 />. </>}
      Base map from <a href="https://matthew6113.github.io/BAM/">Bay Area megaprojects</a>: map data{' '}
      <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a> and{' '}
      <a href="https://overturemaps.org">Overture Maps Foundation</a> (release {OVERTURE_RELEASE}, ODbL); building
      footprints from OpenStreetMap, Microsoft and Esri Community Maps contributors. Today's lines from GTFS feeds:{' '}
      <a href="https://511.org/open-data/transit">511.org</a> (MTC),{' '}
      <a href="https://www.bart.gov/schedules/developers/developer-license-agreement">BART</a> and Amtrak; BRT lanes from{' '}
      <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> (ODbL); their opening dates from the
      records of BART, SFMTA, VTA, Caltrain, SMART, the ferry operators, ACE, the Capitol Corridor, Amtrak, AC Transit,
      MTC, SFCTA, Alameda CTC and the CPUC. Future
      lines as researched for Bay Area megaprojects from official sources: VTA GIS, TJPA, Valley Link, SMART and the
      County of Sonoma (CC BY-SA 3.0 US), and the U.S. DOT National Transportation Atlas (BTS). Past lines traced from
      the <a href="https://www.usgs.gov/programs/national-geospatial-program/historical-topographic-maps-preserving-past">USGS
      Historical Topographic Map Collection</a> (public domain), from{' '}
      <a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a> (CC0) and along today's street centerlines from
      Overture Maps (ODbL), with dates from California Railroad Commission decisions, period journals, newspapers and city
      directories, Muni's own chronology, San Francisco's street railway reports of 1909 and 1929, the county histories of
      1876–83, the state Board of Railroad Commissioners' reports and Poor's Manual of Railroads. Sources for every
      line are in its panel.
    </>
  );
}

interface Props {
  /** Collapse once the viewer starts using the map (OSM attribution guidelines allow this). */
  collapse: boolean;
  /** Any line on the map comes from 511's feed: its credit stays visible even when collapsed. */
  has511?: boolean;
}

export function Credits({ collapse, has511 = false }: Props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(false), 5000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (collapse) setOpen(false);
  }, [collapse]);

  return (
    <footer class={`credits ${open ? 'open' : ''}`}>
      <p id="credits-body" class="credits-body" hidden={!open}>
        <MapDataCredits has511={has511} />
      </p>
      {has511 && !open && <span class="credit-511"><Credit511 /> · </span>}
      <button type="button" class="credits-toggle" aria-expanded={open} aria-controls="credits-body"
        onClick={() => setOpen(!open)}>
        {open ? 'Hide credits' : '© OpenStreetMap contributors, Overture Maps · Credits'}
      </button>
    </footer>
  );
}
