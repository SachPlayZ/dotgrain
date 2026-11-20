import type { ComponentMeta } from "./types.ts";

export default {
  name: "toggle",
  title: "Toggle",
  description: "A two-state press button on Radix whose face dithers full when pressed.",
  category: "control",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/toggle.tsx"],
  dependencies: ["radix-ui"],
  props: [
    { name: "pressed", type: "boolean", description: "Controlled state; pair with onPressedChange." },
    { name: "defaultPressed", type: "boolean", description: "Initial state when uncontrolled." },
    { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Called when the state changes." },
    { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Default is borderless until pressed; outline is always bordered." },
    { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Padding and font size." },
    { name: "children", type: "ReactNode", description: "The label, as real DOM text." },
  ],
  example: { props: { "aria-label": "Toggle bold" }, children: "Bold" },
  knobs: [
    { name: "variant", kind: "select", options: ["default", "outline"], default: "default" },
    { name: "size", kind: "select", options: ["sm", "default", "lg"], default: "default" },
    { name: "disabled", kind: "boolean", default: false },
    "mode",
    "pattern",
    "palette",
    "glyphs",
    "cell",
  ],
} satisfies ComponentMeta;
