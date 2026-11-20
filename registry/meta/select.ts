import type { ComponentMeta } from "./types.ts";

export default {
  name: "select",
  title: "Select",
  description: "A Radix select with a palette trigger and a dither-framed option list.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/select.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "value", "type": "string", "description": "Selected option."},
    {"name": "defaultValue", "type": "string", "description": "Initial value, uncontrolled."},
    {"name": "onValueChange", "type": "(value: string) => void", "description": "Called when an option is chosen."},
    {"name": "position", "type": "\"popper\" | \"item-aligned\"", "description": "SelectContent: where the list opens.", "default": "\"popper\""},
  ],
  example: {"props": {}, "code": "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";\n\n<Select>\n  <SelectTrigger aria-label=\"Theme\"><SelectValue placeholder=\"Theme\" /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value=\"light\">Light</SelectItem>\n    <SelectItem value=\"dark\">Dark</SelectItem>\n  </SelectContent>\n</Select>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
