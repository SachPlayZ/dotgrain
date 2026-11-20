import type { ComponentMeta } from "./types.ts";

export default {
  name: "dialog",
  title: "Dialog",
  description: "A Radix modal over a dithered screen-door scrim, its frame materialising as it opens.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/dialog.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "open", "type": "boolean", "description": "Controlled open state."},
    {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Called when it opens or closes."},
    {"name": "showCloseButton", "type": "boolean", "description": "DialogContent: render the ✕ button.", "default": "true"},
  ],
  example: {"props": {}, "code": "import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from \"@/components/ui/dialog\";\n\n<Dialog>\n  <DialogTrigger>Open</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Are you sure?</DialogTitle>\n      <DialogDescription>This changes every preview.</DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
