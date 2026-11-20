import type { ComponentMeta } from "./types.ts";

export default {
  name: "aspect-ratio",
  title: "Aspect Ratio",
  description: "Radix's box that holds a width-to-height ratio, for dithered images and fields.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/aspect-ratio.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "ratio", "type": "number", "description": "Width divided by height, e.g. 16 / 9.", "default": "1"},
  ],
  example: {"props": {}, "code": "import { AspectRatio } from \"@/components/ui/aspect-ratio\";\n\n<AspectRatio ratio={16 / 9}>\n  <DitherImage src=\"/hero.jpg\" alt=\"\u2026\" style={{ width: \"100%\", height: \"100%\" }} />\n</AspectRatio>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
