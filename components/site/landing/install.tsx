"use client";

import Link from "next/link";
import { AsciiRain } from "@/registry/ui/ascii-rain";
import { Terminal } from "@/registry/ui/terminal";
import { GrainLink } from "./grain-link";
import { Reveal, useSeen } from "./motion";
import { Italic } from "./section";
import { ScrambleText } from "@/registry/ui/scramble-text";

const LINES = [
  "$ npx shadcn@latest add @dotgrain/button @dotgrain/dialog",
  "✔ Installed engine → lib/dotgrain/",
  "✔ Installed 2 components → components/ui/",
  "$ ",
];

// Rain falls on the right, behind the terminal, and thins out before it reaches the copy.
const FADE = "linear-gradient(100deg, transparent 25%, rgb(0 0 0 / 0.5) 50%, #000 75%)";

/** Closing install block over falling glyphs, then the footer. The terminal types once it scrolls into view. */
export function Install() {
  const [ref, seen] = useSeen();
  return (
    <div className="border-t">
      <section ref={ref} className="relative isolate grid gap-10 overflow-hidden px-4 py-28 sm:px-8 lg:grid-cols-2 lg:items-center">
        <AsciiRain className="!absolute inset-0 -z-10" style={{ maskImage: FADE, WebkitMaskImage: FADE }} />
        <Reveal className="flex flex-col items-start gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fd-primary">§05 · install</span>
          <h2 className="flex flex-col items-start font-mono text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
            <ScrambleText trigger="inView" duration={1000}>Copy it in.</ScrambleText>{" "}
            <Italic>
              <ScrambleText trigger="inView" duration={1400}>Own every line.</ScrambleText>
            </Italic>
          </h2>
          <p className="max-w-md text-lg text-fd-muted-foreground">No package to update. The shadcn CLI copies the engine and the components into your repo, MIT licensed.</p>
          <div className="flex flex-wrap gap-3">
            <GrainLink href="/docs">Read the docs →</GrainLink>
            <GrainLink href="/convert" variant="outline">Convert an image</GrainLink>
          </div>
        </Reveal>
        {/* Mounted on first sight, so the typing plays where someone can watch it. Same height before, no jump. */}
        <Reveal delay={200} className="min-h-48">{seen && <Terminal lines={LINES} typing style={{ minWidth: 0 }} />}</Reveal>
      </section>
      <footer className="flex flex-wrap justify-between gap-4 border-t px-4 py-8 font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground sm:px-8">
        <span>dotgrain · MIT</span>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/docs" className="transition-colors hover:text-fd-primary">Docs</Link>
          <Link href="/gallery" className="transition-colors hover:text-fd-primary">Gallery</Link>
          <a href="https://github.com/SachPlayZ/dotgrain" className="transition-colors hover:text-fd-primary">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
