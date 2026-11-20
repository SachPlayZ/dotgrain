import type { ComponentMeta } from "./types.ts";

export default {
  name: "tooltip",
  title: "Tooltip",
  description: "A Radix tooltip: a small label with a one-mark dithered rim.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/tooltip.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "delayDuration", "type": "number", "description": "Tooltip / TooltipProvider: hover delay in milliseconds.", "default": "0"},
    {"name": "side", "type": "\"top\" | \"right\" | \"bottom\" | \"left\"", "description": "TooltipContent: preferred side.", "default": "\"top\""},
    {"name": "sideOffset", "type": "number", "description": "TooltipContent: gap from the trigger in pixels.", "default": "4"},
  ],
  example: {"props": {}, "code": "import { Tooltip, TooltipContent, TooltipTrigger } from \"@/components/ui/tooltip\";\n\n<Tooltip>\n  <TooltipTrigger>Hover</TooltipTrigger>\n  <TooltipContent>Add to library</TooltipContent>\n</Tooltip>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
