import type { ComponentMeta } from "./types.ts";

export default {
  name: "accordion",
  title: "Accordion",
  description: "Radix accordion with glyph chevrons and dithered rules between items.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/accordion.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "type", "type": "\"single\" | \"multiple\"", "description": "Accordion: one or many items open at once."},
    {"name": "collapsible", "type": "boolean", "description": "Accordion (single): lets the open item close.", "default": "false"},
    {"name": "defaultValue", "type": "string | string[]", "description": "Accordion: items open at first."},
  ],
  example: {"props": {}, "code": "import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from \"@/components/ui/accordion\";\n\n<Accordion type=\"single\" collapsible>\n  <AccordionItem value=\"a\">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>\n  </AccordionItem>\n</Accordion>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
