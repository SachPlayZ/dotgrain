import type { ComponentMeta } from "./types.ts";

export default {
  name: "collapsible",
  title: "Collapsible",
  description: "A Radix collapsible whose content hangs off a dithered rail.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/collapsible.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "open", "type": "boolean", "description": "Collapsible: controlled open state."},
    {"name": "defaultOpen", "type": "boolean", "description": "Collapsible: open at first.", "default": "false"},
    {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Collapsible: called when it opens or closes."},
  ],
  example: {"props": {}, "code": "import { Collapsible, CollapsibleContent, CollapsibleTrigger } from \"@/components/ui/collapsible\";\n\n<Collapsible>\n  <CollapsibleTrigger>Show more</CollapsibleTrigger>\n  <CollapsibleContent>Hidden content.</CollapsibleContent>\n</Collapsible>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
