import type { ComponentMeta } from "./types.ts";

export default {
  name: "input-group",
  title: "Input Group",
  description: "An input with addons, text and buttons in one box whose underline dithers while focused.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/input-group.tsx"],
  registryDependencies: ["button"],
  props: [
    {"name": "align", "type": "\"inline-start\" | \"inline-end\" | \"block-start\" | \"block-end\"", "description": "InputGroupAddon: where it sits.", "default": "\"inline-start\""},
    {"name": "InputGroupButton", "type": "ButtonProps", "description": "A small dotgrain Button."},
  ],
  example: {"props": {}, "code": "import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from \"@/components/ui/input-group\";\n\n<InputGroup>\n  <InputGroupAddon>$</InputGroupAddon>\n  <InputGroupInput placeholder=\"grep components\" />\n  <InputGroupAddon align=\"inline-end\"><InputGroupButton>Search</InputGroupButton></InputGroupAddon>\n</InputGroup>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
