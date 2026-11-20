import type { ComponentMeta } from "./types.ts";

export default {
  name: "spinner",
  title: "Spinner",
  description: "shadcn's small inline spinner, as a dithered Loader ring.",
  category: "feedback",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/spinner.tsx"],
  registryDependencies: ["loader"],
  props: [
    {"name": "size", "type": "number", "description": "Width and height in CSS pixels.", "default": "16"},
    {"name": "label", "type": "string", "description": "Announced to screen readers; not shown.", "default": "\"Loading\""},
  ],
  example: {"props": {}, "code": "import { Spinner } from \"@/components/ui/spinner\";\n\n<Spinner />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
