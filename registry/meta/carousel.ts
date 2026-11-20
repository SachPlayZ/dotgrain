import type { ComponentMeta } from "./types.ts";

export default {
  name: "carousel",
  title: "Carousel",
  description: "An Embla carousel whose dithered rule fills as you scroll, with dithered previous and next buttons.",
  category: "media",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/carousel.tsx"],
  registryDependencies: ["button"],
  dependencies: ["embla-carousel-react"],
  props: [
    {"name": "opts", "type": "EmblaOptionsType", "description": "Carousel: Embla options, e.g. { loop: true }."},
    {"name": "plugins", "type": "EmblaPluginType[]", "description": "Carousel: Embla plugins, e.g. autoplay."},
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "Carousel: scroll direction and arrow keys.", "default": "\"horizontal\""},
    {"name": "setApi", "type": "(api: CarouselApi) => void", "description": "Carousel: receives the Embla API."},
  ],
  example: {"props": {}, "code": "import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from \"@/components/ui/carousel\";\n\n<Carousel>\n  <CarouselContent>\n    <CarouselItem>…</CarouselItem>\n    <CarouselItem>…</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
