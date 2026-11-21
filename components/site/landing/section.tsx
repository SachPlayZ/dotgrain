"use client";

import type { ReactNode } from "react";
import { ScrambleText } from "@/registry/ui/scramble-text";
import { Reveal } from "./motion";

/** Numbered section header: the landing reads like a print run, §00 to §05. Titles scramble in on scroll. */
export function Section({ n, title, italic, lede, children, className = "" }: { n: string; title: string; italic: string; lede?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`border-b px-4 py-24 sm:px-8 ${className}`}>
      <header className="mb-14 grid gap-4 md:grid-cols-[10rem_1fr]">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fd-primary">§{n}</span>
        </Reveal>
        <div className="flex flex-col gap-4">
          <h2 className="max-w-4xl font-mono text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
            <ScrambleText trigger="inView" duration={900}>{title}</ScrambleText>{" "}
            <Italic>
              <ScrambleText trigger="inView" duration={1300}>{italic}</ScrambleText>
            </Italic>
          </h2>
          {lede && (
            <Reveal delay={150}>
              <p className="max-w-2xl text-lg text-fd-muted-foreground">{lede}</p>
            </Reveal>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

export const Italic = ({ children }: { children: ReactNode }) => <span className="font-serif font-normal normal-case tracking-[-0.02em] text-fd-primary">{children}</span>;
