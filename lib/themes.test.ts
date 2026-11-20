import { describe, expect, it } from "vitest";
import { PALETTES } from "@/lib/dotgrain/palettes";
import { THEMES, themeCss } from "./themes";

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("site themes", () => {
  it("every theme maps to an engine palette and emits css", () => {
    for (const t of THEMES) expect(PALETTES[t.palette]).toBeDefined();
    expect(themeCss()).toContain('html.dark[data-dg-theme="synthwave"]');
  });

  it("text, muted text and primary buttons meet WCAG AA (4.5:1)", () => {
    for (const t of THEMES) {
      for (const c of [t.light, t.dark]) {
        if (!c) continue;
        expect(contrast(c.foreground, c.background), `${t.name} fg`).toBeGreaterThanOrEqual(4.5);
        expect(contrast(c.mutedForeground, c.background), `${t.name} muted`).toBeGreaterThanOrEqual(4.5);
        expect(contrast(c.primaryForeground, c.primary), `${t.name} primary`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
