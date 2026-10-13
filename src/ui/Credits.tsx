// After BAM's src/ui/Credits.tsx (9600699): the same collapsing credit line, with this map's data.
// Every dataset, its license and its gaps are in DATA_LOG.md.
import { useEffect, useState } from 'preact/hooks';
import { OVERTURE_RELEASE } from '../basemap/config';

export function MapDataCredits() {
  return (
    <>
      Base map from <a href="https://matthew6113.github.io/BAM/">Bay Area megaprojects</a>: map data{' '}
      <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a> and{' '}
      <a href="https://overturemaps.org">Overture Maps Foundation</a> (release {OVERTURE_RELEASE}, ODbL); building
      footprints from OpenStreetMap, Microsoft and Esri Community Maps contributors. Today's BART lines from{' '}
      <a href="https://www.bart.gov/schedules/developers/developer-license-agreement">BART's GTFS feed</a>. Future
      lines as researched for Bay Area megaprojects from official sources: VTA GIS, TJPA, Valley Link, SMART and the
      County of Sonoma (CC BY-SA 3.0 US), and the U.S. DOT National Transportation Atlas (BTS). Sources for every line
      are in its panel.
    </>
  );
}

interface Props {
  /** Collapse once the viewer starts using the map (OSM attribution guidelines allow this). */
  collapse: boolean;
}

export function Credits({ collapse }: Props) {
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
        <MapDataCredits />
      </p>
      <button type="button" class="credits-toggle" aria-expanded={open} aria-controls="credits-body"
        onClick={() => setOpen(!open)}>
        {open ? 'Hide credits' : '© OpenStreetMap contributors, Overture Maps · Credits'}
      </button>
    </footer>
  );
}
