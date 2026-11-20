import type { ComponentMeta } from "./types.ts";

export default {
  name: "alert",
  title: "Alert",
  description: "A callout in a dithered frame, with a heavier frame and \u2716 mark for destructive alerts.",
  category: "feedback",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/alert.tsx"],
  props: [
    {"name": "variant", "type": "\"default\" | \"destructive\"", "description": "Alert: destructive thickens the frame and adds a \u2716 mark.", "default": "\"default\""},
  ],
  example: {"props": {}, "code": "import { Alert, AlertDescription, AlertTitle } from \"@/components/ui/alert\";\n\n<Alert>\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>You can add components with the shadcn CLI.</AlertDescription>\n</Alert>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
