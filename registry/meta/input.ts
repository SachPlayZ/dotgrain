import type { ComponentMeta } from "./types.ts";

export default {
  name: "input",
  title: "Input",
  description: "A native text input on the palette with a dithered underline that fills while focused.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/input.tsx"],
  props: [
    {"name": "type", "type": "string", "description": "Any native input type; every input attribute passes through.", "default": "\"text\""},
    {"name": "className", "type": "string", "description": "Goes to the outer box; ref goes to the input."},
  ],
  example: {"props": {"placeholder": "you@example.com", "aria-label": "Email"}},
  knobs: [
    { name: "disabled", kind: "boolean", default: false },
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
