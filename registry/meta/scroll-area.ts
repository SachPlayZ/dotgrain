import type { ComponentMeta } from "./types.ts";

export default {
  name: "scroll-area",
  title: "Scroll Area",
  description: "Native scrolling inside a Radix scroll area with a dithered track and thumb.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/scroll-area.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "type", "type": "\"auto\" | \"always\" | \"scroll\" | \"hover\"", "description": "ScrollArea: when the bars show.", "default": "\"hover\""},
    {"name": "orientation", "type": "\"vertical\" | \"horizontal\"", "description": "ScrollBar: add a horizontal one for sideways scroll.", "default": "\"vertical\""},
  ],
  example: {"props": {}, "code": "import { ScrollArea } from \"@/components/ui/scroll-area\";\n\n<ScrollArea style={{ height: 200 }}>\u2026</ScrollArea>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
