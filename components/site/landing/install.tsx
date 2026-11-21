"use client";

import Link from "next/link";
import { AsciiRain } from "@/registry/ui/ascii-rain";
import { Terminal } from "@/registry/ui/terminal";
import { GrainLink } from "./grain-link";
import { Italic } from "./section";

const LINES = [
  "$ npx shadcn@latest add @dotgrain/button @dotgrain/dialog",
  "✔ Installed engine → lib/dotgrain/",
  "✔ Installed 2 components → components/ui/",
  "$ ",
];

/** Closing install block over falling glyphs, then the footer. */
export function Install() {
  return (
    <AsciiRain className="border-t">
      <section className="grid gap-10 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <span className="bg-fd-background px-3 font-mono text-xs uppercase tracking-[0.2em] text-fd-primary">§05 · install</span>
          <h2 className="flex flex-col items-start font-mono text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
            <span className="bg-fd-background px-3">Copy it in.</span>
            <span className="bg-fd-background px-3"><Italic>Own every line.</Italic></span>
          </h2>
          <p className="max-w-md bg-fd-background px-3 py-2 text-lg">No package to update. The shadcn CLI copies the engine and the components into your repo, MIT licensed.</p>
          <div className="flex flex-wrap gap-3">
            <GrainLink href="/docs">Read the docs →</GrainLink>
            <GrainLink href="/convert" variant="outline">Convert an image</GrainLink>
          </div>
        </div>
        <Terminal lines={LINES} typing style={{ minWidth: 0 }} />
      </section>
      <footer className="flex flex-wrap justify-between gap-4 px-4 pb-8 font-mono text-xs uppercase tracking-[0.2em] sm:px-8">
        <span className="bg-fd-background px-3">dotgrain · MIT</span>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/docs" className="bg-fd-background px-3 hover:text-fd-primary">Docs</Link>
          <Link href="/gallery" className="bg-fd-background px-3 hover:text-fd-primary">Gallery</Link>
          <a href="https://github.com/SachPlayZ/dotgrain" className="bg-fd-background px-3 hover:text-fd-primary">GitHub</a>
        </nav>
      </footer>
    </AsciiRain>
  );
}
