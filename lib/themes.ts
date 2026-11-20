import type { PaletteName } from "@/lib/dotgrain/types";

interface Colors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  border: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
}

export interface SiteTheme {
  name: string;
  label: string;
  /** Engine palette every canvas uses under this theme. */
  palette: PaletteName;
  /** Omitted for mono: it keeps Fumadocs' neutral colours. */
  light?: Colors;
  dark?: Colors;
}

export const THEMES: SiteTheme[] = [
  {
    name: "synthwave",
    label: "Synthwave",
    palette: "synthwave",
    dark: {
      background: "#120a22", foreground: "#f5e9ff", muted: "#1d1033", mutedForeground: "#bba6dc", card: "#180c2c",
      border: "rgba(255, 62, 165, 0.28)", primary: "#ff3ea5", primaryForeground: "#120a22", accent: "rgba(63, 244, 255, 0.14)", accentForeground: "#3ff4ff",
    },
    light: {
      background: "#fff4fb", foreground: "#2a0f45", muted: "#fbe3f3", mutedForeground: "#6e4483", card: "#fdeaf6",
      border: "rgba(214, 21, 126, 0.25)", primary: "#c8106f", primaryForeground: "#ffffff", accent: "rgba(0, 150, 170, 0.12)", accentForeground: "#005f6b",
    },
  },
  {
    name: "sunset",
    label: "Sunset",
    palette: "sunset",
    dark: {
      background: "#1c0b1d", foreground: "#ffeedd", muted: "#2c1328", mutedForeground: "#e3ad94", card: "#241023",
      border: "rgba(255, 122, 61, 0.28)", primary: "#ff7a3d", primaryForeground: "#1c0b1d", accent: "rgba(255, 213, 107, 0.14)", accentForeground: "#ffd56b",
    },
    light: {
      background: "#fff6ec", foreground: "#3a1020", muted: "#ffe6d2", mutedForeground: "#7f4334", card: "#ffeedd",
      border: "rgba(194, 36, 92, 0.22)", primary: "#b81f55", primaryForeground: "#ffffff", accent: "rgba(255, 122, 61, 0.16)", accentForeground: "#8a330c",
    },
  },
  {
    name: "ocean",
    label: "Ocean",
    palette: "ocean",
    dark: {
      background: "#04141f", foreground: "#dffcff", muted: "#0a2433", mutedForeground: "#8fc3cf", card: "#071c2a",
      border: "rgba(31, 181, 201, 0.28)", primary: "#3fe0d0", primaryForeground: "#04141f", accent: "rgba(63, 224, 208, 0.14)", accentForeground: "#9ffff3",
    },
    light: {
      background: "#effbfd", foreground: "#06283a", muted: "#d8f1f6", mutedForeground: "#3a6572", card: "#e4f6f9",
      border: "rgba(11, 93, 138, 0.2)", primary: "#0b6894", primaryForeground: "#ffffff", accent: "rgba(31, 181, 201, 0.15)", accentForeground: "#065463",
    },
  },
  {
    name: "riso",
    label: "Riso",
    palette: "riso",
    dark: {
      background: "#16141a", foreground: "#f2efe6", muted: "#221f27", mutedForeground: "#b8b2a3", card: "#1d1a22",
      border: "rgba(255, 72, 176, 0.28)", primary: "#ff48b0", primaryForeground: "#16141a", accent: "rgba(0, 120, 191, 0.28)", accentForeground: "#7ccbff",
    },
    light: {
      background: "#f2efe6", foreground: "#1a1a1a", muted: "#e8e3d4", mutedForeground: "#56524a", card: "#ebe6d8",
      border: "rgba(0, 120, 191, 0.25)", primary: "#0068a6", primaryForeground: "#ffffff", accent: "rgba(255, 72, 176, 0.16)", accentForeground: "#a3005e",
    },
  },
  {
    name: "phosphor",
    label: "Phosphor",
    palette: "phosphor",
    dark: {
      background: "#020d06", foreground: "#b6ffc8", muted: "#06190d", mutedForeground: "#63c47e", card: "#041309",
      border: "rgba(51, 255, 102, 0.24)", primary: "#33ff66", primaryForeground: "#020d06", accent: "rgba(51, 255, 102, 0.12)", accentForeground: "#33ff66",
    },
    light: {
      background: "#f0fff3", foreground: "#04220f", muted: "#dcf7e3", mutedForeground: "#3a6646", card: "#e6fbeb",
      border: "rgba(0, 140, 50, 0.22)", primary: "#007a29", primaryForeground: "#ffffff", accent: "rgba(0, 180, 60, 0.12)", accentForeground: "#005c1d",
    },
  },
  { name: "mono", label: "Mono", palette: "ink" },
];

export const DEFAULT_THEME = THEMES[0].name;
export const THEME_KEY = "dg-theme";

const vars = (c: Colors) =>
  Object.entries({
    background: c.background, foreground: c.foreground, muted: c.muted, "muted-foreground": c.mutedForeground,
    popover: c.card, "popover-foreground": c.foreground, card: c.card, "card-foreground": c.foreground, border: c.border,
    primary: c.primary, "primary-foreground": c.primaryForeground, secondary: c.muted, "secondary-foreground": c.foreground,
    accent: c.accent, "accent-foreground": c.accentForeground, ring: c.primary,
  })
    .map(([k, v]) => `--color-fd-${k}:${v};`)
    .join("");

/** One CSS block per theme and scheme, keyed on `data-dg-theme` on <html>. */
export function themeCss(): string {
  return THEMES.flatMap((t) => [
    t.light ? `html[data-dg-theme="${t.name}"]{${vars(t.light)}}` : "",
    // Fumadocs greys the dark sidebar by id, so the theme has to reach it too.
    t.dark ? `html.dark[data-dg-theme="${t.name}"],html.dark[data-dg-theme="${t.name}"] #nd-sidebar{${vars(t.dark)}}` : "",
  ]).join("");
}

/** Runs before paint so the stored theme never flashes the default. */
export const themeInit = `try{var t=localStorage.getItem("${THEME_KEY}");if(t)document.documentElement.dataset.dgTheme=t}catch(e){}`;
