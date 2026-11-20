import type { ComponentMeta } from "./types.ts";

export default {
  name: "pagination",
  title: "Pagination",
  description: "Page links where the current page is a solid dithered chip.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/pagination.tsx"],
  props: [
    {"name": "isActive", "type": "boolean", "description": "PaginationLink: marks the current page (aria-current).", "default": "false"},
    {"name": "href", "type": "string", "description": "PaginationLink / Previous / Next: target page."},
  ],
  example: {"props": {}, "code": "import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from \"@/components/ui/pagination\";\n\n<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious href=\"#\" /></PaginationItem>\n    <PaginationItem><PaginationLink href=\"#\" isActive>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href=\"#\" /></PaginationItem>\n  </PaginationContent>\n</Pagination>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
