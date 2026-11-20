import type { ComponentMeta } from "./types.ts";

export default {
  name: "hover-card",
  title: "Hover Card",
  description: "A Radix hover card that previews a link inside a dithered frame.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/hover-card.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "openDelay", "type": "number", "description": "HoverCard: delay before opening in milliseconds.", "default": "700"},
    {"name": "closeDelay", "type": "number", "description": "HoverCard: delay before closing in milliseconds.", "default": "300"},
    {"name": "align", "type": "\"start\" | \"center\" | \"end\"", "description": "HoverCardContent: alignment against the trigger.", "default": "\"center\""},
  ],
  example: {"props": {}, "code": "import { HoverCard, HoverCardContent, HoverCardTrigger } from \"@/components/ui/hover-card\";\n\n<HoverCard>\n  <HoverCardTrigger href=\"https://dotgrain.space\">@dotgrain</HoverCardTrigger>\n  <HoverCardContent>Dither and ASCII components.</HoverCardContent>\n</HoverCard>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
