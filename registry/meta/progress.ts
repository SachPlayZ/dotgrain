import type { ComponentMeta } from "./types.ts";

export default {
  name: "progress",
  title: "Progress",
  description: "shadcn's progress bar, as a DitherProgress whose dithered edge eases to the value.",
  category: "feedback",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/progress.tsx"],
  registryDependencies: ["dither-progress"],
  props: [
    {"name": "value", "type": "number | null", "description": "Progress from 0 to 100.", "default": "0"},
    {"name": "label", "type": "string", "description": "Accessible name.", "default": "\"Progress\""},
  ],
  example: {"props": {}, "code": "import { Progress } from \"@/components/ui/progress\";\n\n<Progress value={33} />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
