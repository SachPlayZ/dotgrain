"use client";

import { Chart, type ChartConfig } from "@/registry/ui/chart";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = { desktop: { label: "Desktop" }, mobile: { label: "Mobile" } } satisfies ChartConfig;

export default function ChartDemo() {
  return <Chart data={data} config={config} index="month" label="Visitors by device, January to June" style={{ width: "min(520px, 100%)" }} />;
}
