import type { ComponentMeta } from "./types.ts";

export default {
  name: "date-picker",
  title: "Date Picker",
  description: "shadcn's date-picker recipe as one component: a button that opens a dithered Calendar in a Popover.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/date-picker.tsx"],
  registryDependencies: ["popover", "calendar"],
  props: [
    {"name": "value", "type": "Date", "description": "Controlled date."},
    {"name": "defaultValue", "type": "Date", "description": "Date picked at first."},
    {"name": "onValueChange", "type": "(date: Date | undefined) => void", "description": "Called with the new date, or undefined when cleared."},
    {"name": "placeholder", "type": "string", "description": "Trigger text with no date.", "default": "\"Pick a date\""},
    {"name": "format", "type": "(date: Date) => string", "description": "Formats the date on the trigger; defaults to the user's locale."},
  ],
  example: {"props": {}, "code": "import { DatePicker } from \"@/components/ui/date-picker\";\n\n<DatePicker aria-label=\"Due date\" onValueChange={setDate} />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
