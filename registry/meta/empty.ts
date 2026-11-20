import type { ComponentMeta } from "./types.ts";

export default {
  name: "empty",
  title: "Empty",
  description: "An empty state with centred media in a dithered glow, a title, description and actions.",
  category: "feedback",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/empty.tsx"],
  props: [
    {"name": "variant", "type": "\"default\" | \"icon\"", "description": "EmptyMedia: icon sets the media in a dithered radial glow.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from \"@/components/ui/empty\";\n\n<Empty>\n  <EmptyHeader>\n    <EmptyMedia variant=\"icon\">\u2205</EmptyMedia>\n    <EmptyTitle>No projects yet</EmptyTitle>\n    <EmptyDescription>Start by creating one.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent>\u2026</EmptyContent>\n</Empty>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
