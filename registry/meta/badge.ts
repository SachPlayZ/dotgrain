import type { ComponentMeta } from "./types.ts";

export default {
  name: "badge",
  title: "Badge",
  description: "A small label on a dithered chip: solid, halftone or framed.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/badge.tsx"],
  props: [
    {"name": "variant", "type": "\"default\" | \"secondary\" | \"destructive\" | \"outline\"", "description": "Solid, halftone, solid with a \u2716 mark, or a thin frame.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { Badge } from \"@/components/ui/badge\";\n\n<Badge variant=\"outline\">New</Badge>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
