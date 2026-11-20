import type { ComponentMeta } from "./types.ts";

export default {
  name: "avatar",
  title: "Avatar",
  description: "A round Radix avatar whose image is dithered once it loads, with dithered initials as the fallback.",
  category: "media",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/avatar.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "src", "type": "string", "description": "AvatarImage: the picture."},
    {"name": "alt", "type": "string", "description": "AvatarImage: kept on the real img for screen readers."},
    {"name": "delayMs", "type": "number", "description": "AvatarFallback: wait before showing, to avoid a flash."},
  ],
  example: {"props": {}, "code": "import { Avatar, AvatarFallback, AvatarImage } from \"@/components/ui/avatar\";\n\n<Avatar>\n  <AvatarImage src=\"/me.png\" alt=\"Ada\" />\n  <AvatarFallback>AL</AvatarFallback>\n</Avatar>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
