import type { ComponentMeta } from "./types.ts";

export default {
  name: "bubble",
  title: "Bubble",
  description: "A chat bubble: a solid pane of text set in a dithered mat.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/bubble.tsx"],
  props: [
    {"name": "variant", "type": "\"default\" | \"secondary\" | \"muted\" | \"tinted\" | \"outline\" | \"ghost\" | \"destructive\"", "description": "Bubble: the mat, from solid through halftone to a frame, or none.", "default": "\"default\""},
    {"name": "align", "type": "\"start\" | \"end\"", "description": "Bubble: which edge it hugs.", "default": "\"start\""},
    {"name": "side", "type": "\"top\" | \"bottom\"", "description": "BubbleReactions: the edge it is pinned to.", "default": "\"bottom\""},
  ],
  example: {"props": {}, "code": "import { Bubble, BubbleContent } from \"@/components/ui/bubble\";\n\n<Bubble align=\"end\">\n  <BubbleContent>Yes, and it recolours live.</BubbleContent>\n</Bubble>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
