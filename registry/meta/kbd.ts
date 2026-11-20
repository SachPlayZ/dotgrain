import type { ComponentMeta } from "./types.ts";

export default {
  name: "kbd",
  title: "Kbd",
  description: "A key cap: monospace text in a thin dithered frame, with a group for chords.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/kbd.tsx"],
  props: [
    {"name": "children", "type": "ReactNode", "description": "Kbd: the key's label."},
  ],
  example: {"props": {}, "code": "import { Kbd, KbdGroup } from \"@/components/ui/kbd\";\n\n<KbdGroup>\n  <Kbd>\u2318</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
