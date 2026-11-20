import type { ComponentMeta } from "./types.ts";

export default {
  name: "popover",
  title: "Popover",
  description: "A Radix popover whose dithered frame materialises beside its trigger.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/popover.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "open", "type": "boolean", "description": "Controlled open state."},
    {"name": "align", "type": "\"start\" | \"center\" | \"end\"", "description": "PopoverContent: alignment against the trigger.", "default": "\"center\""},
    {"name": "sideOffset", "type": "number", "description": "PopoverContent: gap from the trigger in pixels.", "default": "6"},
  ],
  example: {"props": {}, "code": "import { Popover, PopoverContent, PopoverTrigger } from \"@/components/ui/popover\";\n\n<Popover>\n  <PopoverTrigger>Open</PopoverTrigger>\n  <PopoverContent>Place content here.</PopoverContent>\n</Popover>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
