import type { ComponentMeta } from "./types.ts";

export default {
  name: "navigation-menu",
  title: "Navigation Menu",
  description: "A Radix site navigation whose dropdown panel sits in a dithered frame.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/navigation-menu.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "viewport", "type": "boolean", "description": "NavigationMenu: render content in the shared framed viewport.", "default": "true"},
    {"name": "delayDuration", "type": "number", "description": "NavigationMenu: hover delay before opening, in ms.", "default": "200"},
  ],
  example: {"props": {}, "code": "import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from \"@/components/ui/navigation-menu\";\n\n<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Components</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href=\"/docs\">Docs</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
