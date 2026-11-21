"use client";

import { AsciiVideo } from "@/registry/ui/ascii-video";
import { DitherImage } from "@/registry/ui/dither-image";
import { DitherReveal } from "@/registry/ui/dither-reveal";
import { Reveal } from "./motion";
import { Section } from "./section";

const caption = "font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground";

/** Stills and video through the same engine: a dithered image and a live ASCII clip. */
export function Media() {
  return (
    <Section n="03" title="Images and video," italic="quantized live." lede="Point DitherImage at a picture, or AsciiVideo at a clip or a webcam. Frames are quantized on the GPU, and paused when offscreen.">
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Reveal>
        <figure className="flex flex-col gap-3">
          <DitherImage src="/examples/landscape.svg" alt="A sun setting behind mountains over the sea" width={1200} height={800} cell={3} style={{ width: "100%", height: "auto" }} />
          <figcaption className={caption}>fig. 1 · DitherImage · bayer, 3px cells</figcaption>
        </figure>
        </Reveal>
        <div className="flex flex-col justify-between gap-6">
          <Reveal delay={150}>
          <figure className="flex flex-col gap-3">
            <AsciiVideo src="/examples/clip.webm" label="A looping test pattern" width={640} height={360} style={{ width: "100%", height: "auto" }} />
            <figcaption className={caption}>fig. 2 · AsciiVideo · glyph ramp</figcaption>
          </figure>
          </Reveal>
          <DitherReveal as="p" trigger="inView" duration={1400} className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] italic leading-tight">
            The text stays text. The canvas is only ever decoration.
          </DitherReveal>
        </div>
      </div>
    </Section>
  );
}
