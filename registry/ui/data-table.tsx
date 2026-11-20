"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DitherTokens } from "@/lib/dotgrain/types";

export interface DataTableColumn<T> {
  /** Field the column reads, sorts and filters by. */
  key: keyof T & string;
  header: string;
  /** Custom cell; defaults to the field's value. */
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: "left" | "right";
}

export type DataTableProps<T> = Partial<DitherTokens> & {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Unique id per row, for selection and React keys. */
  rowId: (row: T) => string;
  /** Field the search box filters on; omit for no search box. */
  filterKey?: keyof T & string;
  filterPlaceholder?: string;
  /** Show a checkbox column; selection is reported through onSelectionChange. */
  selectable?: boolean;
  onSelectionChange?: (ids: string[]) => void;
  pageSize?: number;
  /** Names the table for assistive tech. */
  label: string;
  className?: string;
  style?: CSSProperties;
};

type Sort = { key: string; dir: 1 | -1 } | null;
const compare = (a: unknown, b: unknown) => (typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b)));

/** shadcn's data-table recipe without TanStack: sort, filter, select and page a Table. Header buttons announce the sort. */
export function DataTable<T>({ columns, data, rowId, filterKey, filterPlaceholder = "Filter…", selectable, onSelectionChange, pageSize = 10, label, className, style, ...tokens }: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const kept = filterKey && q ? data.filter((r) => String(r[filterKey]).toLowerCase().includes(q)) : data;
    return sort ? [...kept].sort((a, b) => sort.dir * compare(a[sort.key as keyof T], b[sort.key as keyof T])) : kept;
  }, [data, filterKey, query, sort]);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages - 1);
  const shown = rows.slice(current * pageSize, (current + 1) * pageSize);
  const select = (next: Set<string>) => (setSelected(next), onSelectionChange?.([...next]));
  const allShown = shown.length > 0 && shown.every((r) => selected.has(rowId(r)));
  const someShown = shown.some((r) => selected.has(rowId(r)));
  const toggleSort = (key: string) => setSort((s) => (s?.key !== key ? { key, dir: 1 } : s.dir === 1 ? { key, dir: -1 } : null));
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>
      {filterKey && <Input {...tokens} aria-label={filterPlaceholder} placeholder={filterPlaceholder} value={query} onChange={(e) => (setQuery(e.target.value), setPage(0))} style={{ maxWidth: 280 }} />}
      <Table {...tokens} aria-label={label}>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead style={{ width: 32 }}>
                <Checkbox aria-label="Select page" size={16} checked={allShown ? true : someShown ? "indeterminate" : false} onCheckedChange={(on) => select(new Set([...selected].filter((id) => !shown.some((r) => rowId(r) === id)).concat(on === true ? shown.map(rowId) : [])))} />
              </TableHead>
            )}
            {columns.map((c) => (
              <TableHead key={c.key} aria-sort={sort?.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : undefined} style={{ textAlign: c.align }}>
                {c.sortable ? (
                  <button type="button" onClick={() => toggleSort(c.key)} style={{ padding: 0, border: 0, background: "none", color: "inherit", font: "inherit", cursor: "pointer" }}>
                    {c.header} <span aria-hidden="true" style={{ fontFamily: "monospace", opacity: sort?.key === c.key ? 1 : 0.4 }}>{sort?.key !== c.key ? "↕" : sort.dir === 1 ? "↑" : "↓"}</span>
                  </button>
                ) : (
                  c.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {shown.map((r) => {
            const id = rowId(r);
            return (
              <TableRow key={id} aria-selected={selectable ? selected.has(id) : undefined}>
                {selectable && (
                  <TableCell>
                    <Checkbox aria-label="Select row" size={16} checked={selected.has(id)} onCheckedChange={(on) => { const next = new Set(selected); if (on === true) next.add(id); else next.delete(id); select(next); }} />
                  </TableCell>
                )}
                {columns.map((c) => <TableCell key={c.key} style={{ textAlign: c.align }}>{c.cell ? c.cell(r) : String(r[c.key] ?? "")}</TableCell>)}
              </TableRow>
            );
          })}
          {shown.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + (selectable ? 1 : 0)} style={{ height: 64, textAlign: "center", opacity: 0.7 }}>No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 13 }}>
        <span style={{ opacity: 0.7 }}>{selectable ? `${selected.size} of ${data.length} selected` : `${rows.length} rows`}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span aria-live="polite">Page {current + 1} of {pages}</span>
          <Button {...tokens} variant="outline" size="sm" disabled={current === 0} onClick={() => setPage(current - 1)}>Previous</Button>
          <Button {...tokens} variant="outline" size="sm" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}>Next</Button>
        </span>
      </div>
    </div>
  );
}
