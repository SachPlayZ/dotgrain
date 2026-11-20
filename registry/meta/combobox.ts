import type { ComponentMeta } from "./types.ts";

export default {
  name: "combobox",
  title: "Combobox",
  description: "A searchable select: a Popover holding a Command list, as in shadcn's recipe.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/combobox.tsx"],
  registryDependencies: ["popover", "command"],
  props: [
    {"name": "options", "type": "{ value: string; label: string }[]", "description": "The choices."},
    {"name": "value", "type": "string", "description": "Controlled selected value."},
    {"name": "defaultValue", "type": "string", "description": "Selected at first.", "default": "\"\""},
    {"name": "onValueChange", "type": "(value: string) => void", "description": "Called with the new value."},
    {"name": "placeholder", "type": "string", "description": "Trigger text with nothing selected.", "default": "\"Select\u2026\""},
    {"name": "searchPlaceholder", "type": "string", "description": "Search input placeholder.", "default": "\"Search\u2026\""},
    {"name": "emptyText", "type": "string", "description": "Shown when nothing matches.", "default": "\"Nothing found.\""},
  ],
  example: {"props": {}, "code": "import { Combobox } from \"@/components/ui/combobox\";\n\n<Combobox\n  aria-label=\"Framework\"\n  options={[{ value: \"next\", label: \"Next.js\" }, { value: \"remix\", label: \"Remix\" }]}\n/>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
