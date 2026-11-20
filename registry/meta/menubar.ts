import type { ComponentMeta } from "./types.ts";

export default {
  name: "menubar",
  title: "Menubar",
  description: "A Radix desktop-style menubar; menus open in dithered frames.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/menubar.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "inset", "type": "boolean", "description": "Item / Label / SubTrigger: indent to line up with checkable items."},
    {"name": "variant", "type": "\"default\" | \"destructive\"", "description": "MenubarItem: destructive items get a \u2716 mark.", "default": "\"default\""},
    {"name": "align", "type": "\"start\" | \"center\" | \"end\"", "description": "MenubarContent: alignment against the trigger.", "default": "\"start\""},
  ],
  example: {"props": {}, "code": "import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from \"@/components/ui/menubar\";\n\n<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
