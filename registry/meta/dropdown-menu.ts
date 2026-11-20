import type { ComponentMeta } from "./types.ts";

export default {
  name: "dropdown-menu",
  title: "Dropdown Menu",
  description: "A Radix menu in a dithered frame; the highlighted item gets a dithered wash.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/dropdown-menu.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "inset", "type": "boolean", "description": "Item / Label / SubTrigger: indent to line up with checkable items."},
    {"name": "variant", "type": "\"default\" | \"destructive\"", "description": "DropdownMenuItem: destructive items get a ✖ mark.", "default": "\"default\""},
    {"name": "align", "type": "\"start\" | \"center\" | \"end\"", "description": "DropdownMenuContent: alignment against the trigger.", "default": "\"center\""},
  ],
  example: {"props": {}, "code": "import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from \"@/components/ui/dropdown-menu\";\n\n<DropdownMenu>\n  <DropdownMenuTrigger>Options</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Settings</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
