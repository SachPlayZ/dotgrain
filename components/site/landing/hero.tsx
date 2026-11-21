"use client";

import type { CSSProperties } from "react";
import { toast } from "sonner";
import { useSiteTheme, useSiteTokens } from "@/components/site/site-style";
import { THEMES } from "@/lib/themes";
import { DitherField } from "@/registry/ui/dither-field";
import { Kbd } from "@/registry/ui/kbd";
import { ScrambleText } from "@/registry/ui/scramble-text";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";
import { GrainLink } from "./grain-link";

const INSTALL = "npx shadcn@latest add @dotgrain/button";
// The field thins out toward the bottom-left where the copy sits, so text reads with no box behind it.
const FADE = "radial-gradient(ellipse 85% 95% at 100% 0%, #000 30%, rgb(0 0 0 / 0.35) 62%, transparent 88%)";
const rise = (d: number) => ({ "--d": `${d}ms` }) as CSSProperties;

export function Hero({ count }: { count: number }) {
  const { theme, setTheme } = useSiteTheme();
  const { tokens, setTokens } = useSiteTokens();
  const mode = tokens.mode ?? "dither";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      toast.success("Copied", { description: INSTALL });
    } catch {
      toast.error("Copy failed", { description: "Select the command and copy it by hand." });
    }
  };
  return (
    <section className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col justify-between gap-10 overflow-hidden border-b px-4 py-6 sm:px-8">
      <DitherField field="noise" params={{ scale: 2.4 }} cell={tokens.cell ?? (mode === "ascii" ? 12 : 5)} contrast={0.7} cursorRadius={260} className="!absolute inset-0 -z-10 max-sm:opacity-45" style={{ maskImage: FADE, WebkitMaskImage: FADE }} />

      <div className="dg-rise flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.2em]">
        <span className="text-fd-primary">§00 · dotgrain</span>
        <span className="text-fd-muted-foreground">{count} components · MIT · shadcn registry</span>
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="flex flex-col items-start font-mono text-[clamp(3rem,12vw,11rem)] font-bold uppercase leading-[0.88] tracking-[-0.06em]">
          <span className="dg-rise" style={rise(80)}>
            <ScrambleText duration={1100}>Every pixel</ScrambleText>
          </span>{" "}
          <span style={rise(220)} className={`dg-rise font-serif font-normal normal-case tracking-[-0.03em] text-fd-primary`}>
            <ScrambleText duration={1500}>on or off.</ScrambleText>
          </span>
        </h1>
        <p style={rise(380)} className="dg-rise max-w-xl text-lg leading-relaxed text-fd-muted-foreground">
          Every shadcn component, rebuilt so every visual is dither or ASCII. Real DOM text, one tiny WebGL2 engine, installed with the shadcn CLI.
        </p>
        <div style={rise(520)} className="dg-rise flex flex-wrap items-center gap-3">
          <GrainLink href="/docs">Get started →</GrainLink>
          <GrainLink href="/gallery" variant="outline">
            Browse {count}
          </GrainLink>
          <button type="button" onClick={copy} className="px-2 py-2 font-mono text-sm transition-colors hover:text-fd-primary" aria-label={`Copy install command: ${INSTALL}`}>
            $ {INSTALL} <Kbd>copy</Kbd>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <fieldset style={rise(680)} className="dg-rise flex flex-col gap-2">
          <legend className="sr-only">Site theme</legend>
          <span aria-hidden="true" className="font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground">
            Recolour everything
          </span>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t.name}
                type="button"
                aria-pressed={theme.name === t.name}
                onClick={() => setTheme(t.name)}
                className="group flex w-[4.5rem] flex-col transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 items-center gap-1 font-mono text-[11px] uppercase"
              >
                <DitherField
                  field="linear"
                  params={{ angle: 45 }}
                  palette={t.palette}
                  mode="dither"
                  cell={3}
                  interactive={false}
                  className={`size-12 outline-offset-2 group-hover:outline group-aria-pressed:outline-2 group-aria-pressed:outline-fd-primary ${theme.name === t.name ? "outline" : ""}`}
                />
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div style={rise(800)} className="dg-rise flex flex-col gap-2">
          <span id="hero-mode" className="font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground">
            Render as
          </span>
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(v) => v && setTokens({ ...tokens, mode: v as "dither" | "ascii", cell: undefined })}
            aria-labelledby="hero-mode"
          >
            <ToggleGroupItem value="dither">Dither</ToggleGroupItem>
            <ToggleGroupItem value="ascii">ASCII</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </section>
  );
}
