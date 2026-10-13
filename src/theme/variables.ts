/**
 * The theme as CSS custom properties. The app sets them at runtime (applyCssVariables in theme.ts);
 * the build writes the default theme's into the page (scripts/siteMeta.ts), so the title in
 * index.html paints in the right type and colors before any script runs. No JSON imports here:
 * the build loads this file in Node.
 *
 * Vendored from BAM (src/theme/variables.ts at 9600699); BAM's stage and land-use variables are
 * replaced by --mode-* (docs/VENDORED.md).
 */
export interface ThemeVariables {
  colors: Record<string, string>;
  transit: { modes: Record<string, string> };
  type: { ui: string; text: string };
}

/** A color value, or a reference to a color role ("@buildings"). */
export function themeColor(colors: Record<string, string>, value: string): string {
  return value.startsWith('@') ? (colors[value.slice(1)] ?? '#ff00ff') : value;
}

const kebab = (s: string) => s.replace(/[A-Z_]/g, (m) => (m === '_' ? '-' : `-${m.toLowerCase()}`));

export function cssVariables(theme: ThemeVariables): [string, string][] {
  return [
    ...Object.entries(theme.colors).map(([role, color]): [string, string] => [`--color-${kebab(role)}`, color]),
    ...Object.entries(theme.transit.modes).map(([mode, v]): [string, string] => [`--mode-${kebab(mode)}`, themeColor(theme.colors, v)]),
    ['--font-ui', `'${theme.type.ui}', system-ui, sans-serif`],
    ['--font-text', `'${theme.type.text}', Georgia, serif`],
  ];
}
