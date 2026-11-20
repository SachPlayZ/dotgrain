"use client";

import { DatePicker } from "@/registry/ui/date-picker";

export default function DatePickerDemo() {
  return <DatePicker aria-label="Due date" defaultValue={new Date(2026, 10, 12)} />;
}
