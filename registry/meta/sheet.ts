import type { ComponentMeta } from "./types.ts";

export default {
  name: "sheet",
  title: "Sheet",
  description: "A Radix dialog docked to a screen edge, with a dithered scrim and frame.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/sheet.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "side", "type": "\"top\" | \"right\" | \"bottom\" | \"left\"", "description": "SheetContent: the edge it docks to.", "default": "\"right\""},
    {"name": "showCloseButton", "type": "boolean", "description": "SheetContent: render the ✕ button.", "default": "true"},
    {"name": "open", "type": "boolean", "description": "Controlled open state."},
  ],
  example: {"props": {}, "code": "import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from \"@/components/ui/sheet\";\n\n<Sheet>\n  <SheetTrigger>Open</SheetTrigger>\n  <SheetContent side=\"left\">\n    <SheetHeader>\n      <SheetTitle>Settings</SheetTitle>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
