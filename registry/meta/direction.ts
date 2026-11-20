import type { ComponentMeta } from "./types.ts";

export default {
  name: "direction",
  title: "Direction",
  description: "Sets left-to-right or right-to-left reading for every Radix-based component inside.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/direction.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "direction", "type": "\"ltr\" | \"rtl\"", "description": "Reading direction; `dir` works too."},
  ],
  example: {"props": {}, "code": "import { DirectionProvider } from \"@/components/ui/direction\";\n\n<DirectionProvider direction=\"rtl\">\n  <div dir=\"rtl\">…</div>\n</DirectionProvider>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
