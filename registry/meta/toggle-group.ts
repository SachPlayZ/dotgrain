import type { ComponentMeta } from "./types.ts";

export default {
  name: "toggle-group",
  title: "Toggle Group",
  description: "A Radix group of press buttons where pressed items dither full.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/toggle-group.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "type", "type": "\"single\" | \"multiple\"", "description": "One or many pressed at once."},
    {"name": "value", "type": "string | string[]", "description": "Pressed item(s)."},
    {"name": "defaultValue", "type": "string | string[]", "description": "Initial value, uncontrolled."},
    {"name": "variant", "type": "\"default\" | \"outline\"", "description": "Item style.", "default": "\"default\""},
    {"name": "size", "type": "\"sm\" | \"default\" | \"lg\"", "description": "Item size.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { ToggleGroup, ToggleGroupItem } from \"@/components/ui/toggle-group\";\n\n<ToggleGroup type=\"multiple\" defaultValue={[\"bold\"]}>\n  <ToggleGroupItem value=\"bold\">B</ToggleGroupItem>\n  <ToggleGroupItem value=\"italic\">I</ToggleGroupItem>\n</ToggleGroup>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
