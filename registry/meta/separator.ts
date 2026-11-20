import type { ComponentMeta } from "./types.ts";

export default {
  name: "separator",
  title: "Separator",
  description: "A Radix separator drawn in box glyphs, horizontal or vertical.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/separator.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "Direction of the rule.", "default": "\"horizontal\""},
    {"name": "decorative", "type": "boolean", "description": "Hide it from assistive tech; set false for a semantic separator.", "default": "true"},
  ],
  example: {"props": {}, "code": "import { Separator } from \"@/components/ui/separator\";\n\n<Separator />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
