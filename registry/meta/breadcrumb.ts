import type { ComponentMeta } from "./types.ts";

export default {
  name: "breadcrumb",
  title: "Breadcrumb",
  description: "A breadcrumb trail with glyph separators and a dithered underline on the current page.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/breadcrumb.tsx"],
  props: [
    {"name": "href", "type": "string", "description": "BreadcrumbLink: where the crumb goes."},
    {"name": "children", "type": "ReactNode", "description": "BreadcrumbSeparator: replaces the \u203a glyph.", "default": "\"\u203a\""},
  ],
  example: {"props": {}, "code": "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from \"@/components/ui/breadcrumb\";\n\n<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href=\"/\">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Docs</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
