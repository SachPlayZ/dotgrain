import type { ComponentMeta } from "./types.ts";

export default {
  name: "calendar",
  title: "Calendar",
  description: "A react-day-picker calendar where selected days fill with dither and range middles go halftone.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/calendar.tsx"],
  dependencies: ["react-day-picker"],
  props: [
    {"name": "mode", "type": "\"single\" | \"multiple\" | \"range\"", "description": "How many days can be picked (react-day-picker's mode, not the dither mode)."},
    {"name": "selected", "type": "Date | Date[] | DateRange", "description": "Controlled selection."},
    {"name": "onSelect", "type": "(value) => void", "description": "Called with the new selection."},
    {"name": "showOutsideDays", "type": "boolean", "description": "Show days from the neighbouring months.", "default": "true"},
    {"name": "captionLayout", "type": "\"label\" | \"dropdown\"", "description": "Month caption, or month and year dropdowns.", "default": "\"label\""},
  ],
  example: {"props": {}, "code": "import { Calendar } from \"@/components/ui/calendar\";\n\nconst [date, setDate] = useState<Date>();\n\n<Calendar mode=\"single\" selected={date} onSelect={setDate} />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
