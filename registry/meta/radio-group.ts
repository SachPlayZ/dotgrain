import type { ComponentMeta } from "./types.ts";

export default {
  name: "radio-group",
  title: "Radio Group",
  description: "Radix radio buttons whose centres dither outward when selected.",
  category: "form",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/radio-group.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "value", "type": "string", "description": "Selected item."},
    {"name": "defaultValue", "type": "string", "description": "Initial value, uncontrolled."},
    {"name": "onValueChange", "type": "(value: string) => void", "description": "Called when the selection changes."},
    {"name": "size", "type": "number", "description": "RadioGroupItem: item diameter in CSS pixels.", "default": "18"},
  ],
  example: {"props": {}, "code": "import { RadioGroup, RadioGroupItem } from \"@/components/ui/radio-group\";\nimport { Label } from \"@/components/ui/label\";\n\n<RadioGroup defaultValue=\"comfortable\">\n  <Label><RadioGroupItem value=\"default\" /> Default</Label>\n  <Label><RadioGroupItem value=\"comfortable\" /> Comfortable</Label>\n</RadioGroup>"},
  knobs: [
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
