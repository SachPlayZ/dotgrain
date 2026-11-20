import type { ComponentMeta } from "./types.ts";

export default {
  name: "native-select",
  title: "Native Select",
  description: "A native select on the palette with an ASCII chevron and a dithered focus underline.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/native-select.tsx"],
  props: [
    {"name": "children", "type": "ReactNode", "description": "NativeSelectOption and NativeSelectOptGroup elements."},
    {"name": "className", "type": "string", "description": "Goes to the outer box; ref goes to the select."},
  ],
  example: {"props": {"aria-label": "Fruit"}, "code": "import { NativeSelect, NativeSelectOption } from \"@/components/ui/native-select\";\n\n<NativeSelect aria-label=\"Fruit\">\n  <NativeSelectOption value=\"apple\">Apple</NativeSelectOption>\n  <NativeSelectOption value=\"pear\">Pear</NativeSelectOption>\n</NativeSelect>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
