import type { ComponentMeta } from "./types.ts";

export default {
  name: "table",
  title: "Table",
  description: "A plain table whose header cells sit on a dithered rule.",
  category: "data",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/table.tsx"],
  props: [
    {"name": "children", "type": "ReactNode", "description": "Table: TableCaption, TableHeader, TableBody and TableFooter."},
  ],
  example: {"props": {}, "code": "import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from \"@/components/ui/table\";\n\n<Table>\n  <TableHeader>\n    <TableRow><TableHead>Invoice</TableHead><TableHead>Amount</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow><TableCell>INV001</TableCell><TableCell>$250.00</TableCell></TableRow>\n  </TableBody>\n</Table>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
