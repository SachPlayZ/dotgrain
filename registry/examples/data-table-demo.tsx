"use client";

import { Badge } from "@/registry/ui/badge";
import { DataTable, type DataTableColumn } from "@/registry/ui/data-table";

type Payment = { id: string; status: "success" | "processing" | "failed"; email: string; amount: number };

const data: Payment[] = [
  { id: "m5gr84i9", status: "success", email: "ken99@example.com", amount: 316 },
  { id: "3u1reuv4", status: "success", email: "abe45@example.com", amount: 242 },
  { id: "derv1ws0", status: "processing", email: "monserrat44@example.com", amount: 837 },
  { id: "5kma53ae", status: "success", email: "silas22@example.com", amount: 874 },
  { id: "bhqecj4p", status: "failed", email: "carmella@example.com", amount: 721 },
  { id: "p2x9qk1z", status: "processing", email: "olive@example.com", amount: 129 },
];

const columns: DataTableColumn<Payment>[] = [
  { key: "status", header: "Status", cell: (r) => <Badge variant={r.status === "success" ? "default" : r.status === "failed" ? "destructive" : "outline"}>{r.status}</Badge> },
  { key: "email", header: "Email", sortable: true },
  { key: "amount", header: "Amount", sortable: true, align: "right", cell: (r) => `$${r.amount.toFixed(2)}` },
];

export default function DataTableDemo() {
  return <DataTable label="Payments" columns={columns} data={data} rowId={(r) => r.id} filterKey="email" filterPlaceholder="Filter emails…" selectable pageSize={5} style={{ width: "min(560px, 100%)" }} />;
}
