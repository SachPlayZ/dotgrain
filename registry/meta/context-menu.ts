import type { ComponentMeta } from "./types.ts";

export default {
  name: "context-menu",
  title: "Context Menu",
  description: "A Radix right-click menu in a dithered frame, with dithered item highlights.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/context-menu.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "inset", "type": "boolean", "description": "Item / Label / SubTrigger: indent to line up with checkable items."},
    {"name": "variant", "type": "\"default\" | \"destructive\"", "description": "ContextMenuItem: destructive items get a ✖ mark.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from \"@/components/ui/context-menu\";\n\n<ContextMenu>\n  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Copy</ContextMenuItem>\n    <ContextMenuItem>Paste</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
