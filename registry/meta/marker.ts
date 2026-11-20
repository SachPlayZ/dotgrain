import type { ComponentMeta } from "./types.ts";

export default {
  name: "marker",
  title: "Marker",
  description: "An inline status line in a feed, plain, between box-glyph rules or underlined.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/marker.tsx"],
  props: [
    {"name": "variant", "type": "\"default\" | \"separator\" | \"border\"", "description": "Plain, ─ rules either side, or a ─ rule under it.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { Marker, MarkerContent } from \"@/components/ui/marker\";\n\n<Marker variant=\"separator\">\n  <MarkerContent>Today</MarkerContent>\n</Marker>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
