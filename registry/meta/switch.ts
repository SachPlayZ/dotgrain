import type { ComponentMeta } from "./types.ts";

export default {
  name: "switch",
  title: "Switch",
  description: "An on/off switch on Radix with a dithered track that eases between off and on.",
  category: "control",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/switch.tsx"],
  dependencies: ["radix-ui"],
  props: [
    { name: "checked", type: "boolean", description: "Controlled state; pair with onCheckedChange." },
    { name: "defaultChecked", type: "boolean", description: "Initial state when uncontrolled." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the state changes." },
    { name: "size", type: "number", default: "24", description: "Track height in CSS pixels; the width is twice that." },
    { name: "name", type: "string", description: "Submits with forms like a checkbox; every Radix Switch prop passes through." },
  ],
  example: { props: { defaultChecked: true, "aria-label": "Notifications" } },
  knobs: [
    { name: "size", kind: "range", min: 16, max: 48, step: 2, default: 24 },
    { name: "disabled", kind: "boolean", default: false },
    "pattern",
    "palette",
    "cell",
    "contrast",
    "threshold",
  ],
} satisfies ComponentMeta;
