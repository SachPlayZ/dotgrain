import type { ComponentMeta } from "./types.ts";

export default {
  name: "slider",
  title: "Slider",
  description: "A Radix slider whose selected range is dithered, with solid square thumbs.",
  category: "form",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/slider.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "value", "type": "number[]", "description": "One value per thumb; two values make a range."},
    {"name": "defaultValue", "type": "number[]", "description": "Initial value, uncontrolled."},
    {"name": "onValueChange", "type": "(value: number[]) => void", "description": "Called while dragging."},
    {"name": "min", "type": "number", "description": "Lowest value.", "default": "0"},
    {"name": "max", "type": "number", "description": "Highest value.", "default": "100"},
    {"name": "step", "type": "number", "description": "Step between values.", "default": "1"},
  ],
  example: {"props": {"defaultValue": [40], "aria-label": "Volume"}},
  knobs: [
    { name: "disabled", kind: "boolean", default: false },
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
