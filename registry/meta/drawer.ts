import type { ComponentMeta } from "./types.ts";

export default {
  name: "drawer",
  title: "Drawer",
  description: "A Vaul bottom drawer with a dithered drag handle, scrim and frame.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/drawer.tsx"],
  dependencies: ["vaul"],
  props: [
    {"name": "open", "type": "boolean", "description": "Controlled open state."},
    {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Called when it opens or closes."},
    {"name": "shouldScaleBackground", "type": "boolean", "description": "Scale the page behind while open (needs a `vaul-drawer-wrapper`)."},
  ],
  example: {"props": {}, "code": "import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from \"@/components/ui/drawer\";\n\n<Drawer>\n  <DrawerTrigger>Open</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Contrast</DrawerTitle>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
