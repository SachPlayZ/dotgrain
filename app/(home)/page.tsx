import { Wall } from "@/components/site/wall";
import { Hero } from "@/components/site/landing/hero";
import { Install } from "@/components/site/landing/install";
import { Knobs } from "@/components/site/landing/knobs";
import { Media } from "@/components/site/landing/media";
import { Italic, Section } from "@/components/site/landing/section";
import { Showcase } from "@/components/site/landing/showcase";
import { Ticker } from "@/components/site/landing/ticker";
import { components } from "@/registry/meta";
import { Toaster } from "@/registry/ui/sonner";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col">
      <Hero count={components.length} />
      <Ticker />
      <Knobs />
      <Showcase />
      <Media />
      <Section n="04" title={<>Every component, <Italic>live.</Italic></>} lede="The whole registry, rendering through one shared WebGL2 context. Tiles offscreen sleep.">
        <Wall />
      </Section>
      <Install />
      <Toaster />
    </main>
  );
}
