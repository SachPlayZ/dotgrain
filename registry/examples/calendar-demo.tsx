"use client";

import { useState } from "react";
import { Calendar } from "@/registry/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 12));
  return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 10, 1)} today={new Date(2026, 10, 21)} />;
}
