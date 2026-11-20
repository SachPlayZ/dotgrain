import type { ComponentMeta } from "./types.ts";

export default {
  name: "checkbox",
  title: "Checkbox",
  description: "A Radix checkbox whose box dithers full when checked and half when indeterminate.",
  category: "form",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/checkbox.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "checked", "type": "boolean | \"indeterminate\"", "description": "Controlled state; pair with onCheckedChange."},
    {"name": "defaultChecked", "type": "boolean | \"indeterminate\"", "description": "Initial state when uncontrolled."},
    {"name": "onCheckedChange", "type": "(checked: boolean | \"indeterminate\") => void", "description": "Called when the state changes."},
    {"name": "size", "type": "number", "description": "Box size in CSS pixels.", "default": "18"},
  ],
  example: {"props": {"defaultChecked": true, "aria-label": "Accept terms"}},
  knobs: [
    { name: "size", kind: "range", min: 12, max: 32, step: 2, default: 18 },
    { name: "disabled", kind: "boolean", default: false },
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
