import type { ComponentMeta } from "./types.ts";

export default {
  name: "field",
  title: "Field",
  description: "Form layout parts: field sets, groups, labels, descriptions, ASCII separators and errors.",
  category: "form",
  modes: ["dither"],
  tier: "free",
  files: ["registry/ui/field.tsx"],
  registryDependencies: ["label"],
  props: [
    {"name": "orientation", "type": "\"vertical\" | \"horizontal\"", "description": "Field: label above or beside the control.", "default": "\"vertical\""},
    {"name": "errors", "type": "Array<{ message?: string }>", "description": "FieldError: messages to show, e.g. from react-hook-form; announced as an alert."},
    {"name": "children", "type": "ReactNode", "description": "FieldSeparator: optional text in the middle of the rule."},
  ],
  example: {"props": {}, "code": "import { Field, FieldDescription, FieldLabel } from \"@/components/ui/field\";\nimport { Input } from \"@/components/ui/input\";\n\n<Field>\n  <FieldLabel htmlFor=\"name\">Name</FieldLabel>\n  <Input id=\"name\" />\n  <FieldDescription>Shown on your profile.</FieldDescription>\n</Field>"},
  knobs: [],
} satisfies ComponentMeta;
