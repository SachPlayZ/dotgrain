import type { ComponentMeta } from "./types.ts";

export default {
  name: "textarea",
  title: "Textarea",
  description: "A native textarea on the palette with a dithered underline that fills while focused.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/textarea.tsx"],
  props: [
    {"name": "rows", "type": "number", "description": "Visible lines; every textarea attribute passes through.", "default": "3"},
    {"name": "className", "type": "string", "description": "Goes to the outer box; ref goes to the textarea."},
  ],
  example: {"props": {"placeholder": "Type your message", "aria-label": "Message"}},
  knobs: [
    { name: "disabled", kind: "boolean", default: false },
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
