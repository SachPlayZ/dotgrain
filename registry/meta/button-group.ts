import type { ComponentMeta } from "./types.ts";

export default {
  name: "button-group",
  title: "Button Group",
  description: "Groups related dotgrain buttons into one row or column with text cells and separators.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/button-group.tsx"],
  registryDependencies: ["button"],
  props: [
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "Row or column.", "default": "\"horizontal\""},
    {"name": "ButtonGroupText", "type": "span props", "description": "A label cell on the palette."},
    {"name": "ButtonGroupSeparator", "type": "div props", "description": "A dotted rule between buttons."},
  ],
  example: {"props": {}, "code": "import { ButtonGroup } from \"@/components/ui/button-group\";\nimport { Button } from \"@/components/ui/button\";\n\n<ButtonGroup>\n  <Button variant=\"outline\">Archive</Button>\n  <Button variant=\"outline\">Report</Button>\n</ButtonGroup>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
