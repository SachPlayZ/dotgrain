"use client";

import { Badge } from "@/registry/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/registry/ui/table";

const invoices = [
  { id: "INV001", status: "Paid", method: "Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Card", amount: "$450.00" },
];

export default function TableDemo() {
  return (
    <div style={{ width: "min(520px, 100%)" }}>
      <Table>
        <TableCaption>Recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((i) => (
            <TableRow key={i.id}>
              <TableCell style={{ fontWeight: 500 }}>{i.id}</TableCell>
              <TableCell>
                <Badge variant={i.status === "Paid" ? "default" : "outline"}>{i.status}</Badge>
              </TableCell>
              <TableCell>{i.method}</TableCell>
              <TableCell style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{i.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell style={{ textAlign: "right" }}>$1,200.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
