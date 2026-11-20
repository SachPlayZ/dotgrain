import { expect, test, type Page } from "@playwright/test";
import { PALETTES } from "../registry/engine/palettes";
import { examples } from "../registry/examples";
import { components } from "../registry/meta";

// Backgrounds sweep every palette; other components sample mono, a 4-colour light and a 4-colour dark one.
const backgrounds = components.filter((c) => c.category === "background").map((c) => c.name);
const palettesFor = (example: string) => (backgrounds.some((n) => example.startsWith(n)) ? Object.keys(PALETTES) : ["ink", "riso", "synthwave"]);

for (const example of Object.keys(examples)) {
  for (const palette of palettesFor(example)) {
    for (const mode of ["dither", "ascii"]) {
      test(`${example} · ${palette} · ${mode}`, async ({ page }) => {
        await page.goto(`/visual/${example}?palette=${palette}&mode=${mode}`);
        // Every canvas has drawn a frame once it is no longer the default 300×150 surface.
        await page.waitForFunction(() =>
          [...document.querySelectorAll("canvas")].every((c) => c.width !== 300 || c.height !== 150),
        );
        // Glyph atlases depend on fonts; wait so the first frame isn't drawn with a fallback.
        await page.evaluate(() => document.fonts.ready);
        const name = mode === "dither" ? `${example}-${palette}` : `${example}-${palette}-ascii`;
        await expect(page.locator("#visual")).toHaveScreenshot(`${name}.png`);
      });
    }
  }
}

// Every component's main demo on the Canvas2D path and with animation frozen; each still renders a full frame.
for (const { name, modes } of components) {
  const example = `${name}-demo`;
  for (const mode of modes) {
    for (const variant of ["cpu", "reduced-motion"]) {
      test(`${example} · ${mode} · ${variant}`, async ({ page }) => {
        if (variant === "reduced-motion") await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/visual/${example}?palette=ink&mode=${mode}${variant === "cpu" ? "&cpu=1" : ""}`);
        await page.waitForFunction(() =>
          [...document.querySelectorAll("canvas")].every((c) => c.width !== 300 || c.height !== 150),
        );
        await page.evaluate(() => document.fonts.ready);
        // CPU ASCII blits one glyph per cell; slow under emulated amd64.
        await expect(page.locator("#visual")).toHaveScreenshot(`${example}-${mode}-${variant}.png`, { timeout: 20_000 });
      });
    }
  }
}

// Overlays render closed in their demos; open each (as a user would) and capture the viewport.
const trigger = "#visual button";
const OPEN: Record<string, { open: (page: Page) => Promise<unknown>; shown: string }> = {
  "dialog-demo": { open: (p) => p.click(trigger), shown: "[role=dialog]" },
  "alert-dialog-demo": { open: (p) => p.click(trigger), shown: "[role=alertdialog]" },
  "sheet-demo": { open: (p) => p.click(trigger), shown: "[role=dialog]" },
  "drawer-demo": { open: (p) => p.click(trigger), shown: "[role=dialog]" },
  "popover-demo": { open: (p) => p.click(trigger), shown: "[role=dialog]" },
  "tooltip-demo": { open: (p) => p.focus(trigger), shown: "[role=tooltip]" },
  "hover-card-demo": { open: (p) => p.hover("#visual a"), shown: "[data-radix-popper-content-wrapper]" },
  "dropdown-menu-demo": { open: (p) => p.click(trigger).then(() => p.keyboard.press("ArrowDown")), shown: "[role=menu]" },
  "context-menu-demo": { open: (p) => p.click("#visual [data-state]", { button: "right", position: { x: 4, y: 4 } }).then(() => p.keyboard.press("ArrowDown")), shown: "[role=menu]" },
  // Hovering the toast pauses its timer, so it stays for the screenshot.
  "sonner-demo": { open: (p) => p.click(trigger).then(() => p.hover("[data-sonner-toast]")), shown: "[data-sonner-toast]" },
};

for (const [example, { open, shown }] of Object.entries(OPEN)) {
  for (const mode of ["dither", "ascii"]) {
    test(`${example} · open · ${mode}`, async ({ page }) => {
      await page.goto(`/visual/${example}?palette=synthwave&mode=${mode}`);
      await page.evaluate(() => document.fonts.ready);
      // Full-viewport shots would catch Next's dev badge (a next-themes script warning); it isn't ours.
      await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
      await open(page);
      await page.locator(shown).first().waitFor();
      await page.waitForFunction(() =>
        [...document.querySelectorAll("canvas")].every((c) => c.width !== 300 || c.height !== 150),
      );
      await expect(page).toHaveScreenshot(`${example}-open-${mode}.png`);
    });
  }
}
