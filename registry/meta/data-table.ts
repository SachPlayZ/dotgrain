import type { ComponentMeta } from "./types.ts";

export default {
  name: "data-table",
  title: "Data Table",
  description: "A sortable, filterable, selectable and paged table built on the dotgrain Table, without TanStack.",
  category: "data",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/data-table.tsx"],
  registryDependencies: ["table", "checkbox", "input", "button"],
  props: [
    {"name": "columns", "type": "DataTableColumn<T>[]", "description": "key, header, optional cell renderer, sortable and align."},
    {"name": "data", "type": "T[]", "description": "The rows."},
    {"name": "rowId", "type": "(row: T) => string", "description": "Unique id per row."},
    {"name": "filterKey", "type": "keyof T", "description": "Field the search box filters; omit for no search box."},
    {"name": "selectable", "type": "boolean", "description": "Add a checkbox column.", "default": "false"},
    {"name": "onSelectionChange", "type": "(ids: string[]) => void", "description": "Called with the selected row ids."},
    {"name": "pageSize", "type": "number", "description": "Rows per page.", "default": "10"},
    {"name": "label", "type": "string", "description": "Names the table for assistive tech."},
  ],
  example: {"props": {}, "code": "import { DataTable, type DataTableColumn } from \"@/components/ui/data-table\";\n\nconst columns: DataTableColumn<Payment>[] = [\n  { key: \"email\", header: \"Email\", sortable: true },\n  { key: \"amount\", header: \"Amount\", sortable: true, align: \"right\" },\n];\n\n<DataTable label=\"Payments\" columns={columns} data={payments} rowId={(r) => r.id} filterKey=\"email\" selectable />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
