import type { ComponentMeta } from "./types.ts";

export default {
  name: "item",
  title: "Item",
  description: "A row of media, title, description and actions, framed or on a faint dither.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/item.tsx"],
  registryDependencies: ["separator"],
  props: [
    {"name": "variant", "type": "\"default\" | \"outline\" | \"muted\"", "description": "Item: plain, a dithered frame, or a faint dither under it.", "default": "\"default\""},
    {"name": "size", "type": "\"default\" | \"sm\"", "description": "Item: padding and gap.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from \"@/components/ui/item\";\n\n<Item variant=\"outline\">\n  <ItemContent>\n    <ItemTitle>Security alert</ItemTitle>\n    <ItemDescription>New sign-in from an unknown device.</ItemDescription>\n  </ItemContent>\n  <ItemActions>\u2026</ItemActions>\n</Item>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
