import type { ComponentMeta } from "./types.ts";

export default {
  name: "label",
  title: "Label",
  description: "An accessible Radix label in plain DOM text that pairs with any dotgrain control.",
  category: "form",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/label.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "htmlFor", "type": "string", "description": "The id of the control it names."},
    {"name": "children", "type": "ReactNode", "description": "The label text."},
  ],
  example: {"props": {"htmlFor": "email"}, "children": "Email"},
  knobs: [],
} satisfies ComponentMeta;
