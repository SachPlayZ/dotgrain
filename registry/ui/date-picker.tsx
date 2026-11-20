"use client";

import { useState, type CSSProperties } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Grain, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type DatePickerProps = Partial<Omit<DitherTokens, "mode">> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** Formats the picked date for the trigger; defaults to the user's locale, e.g. "21 Nov 2026". */
  format?: (date: Date) => string;
  /** Names the trigger for assistive tech when no visible label points at it. */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
};

const byLocale = (d: Date) => d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

/** shadcn's date-picker recipe as one component: a button that opens a Calendar in a Popover. */
export function DatePicker({ value, defaultValue, onValueChange, placeholder = "Pick a date", format = byLocale, className, style, "aria-label": label, ...tokens }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [own, setOwn] = useState(defaultValue);
  const current = value ?? own;
  const { bg, fg } = useInk(tokens);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={label}
        className={className}
        style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 8, minWidth: 200, padding: "8px 10px 12px", border: `1px solid ${fg}`, background: bg, color: fg, font: "inherit", cursor: "pointer", ...style }}
      >
        <span style={{ opacity: current ? 1 : 0.6 }}>{current ? format(current) : placeholder}</span>
        <span aria-hidden="true" style={{ fontFamily: "monospace" }}>▦</span>
        <Grain {...tokens} params={{ value: open ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
      </PopoverTrigger>
      {/* Skip Radix's focus-first-button so the calendar can focus the picked day (or today) instead. */}
      <PopoverContent {...tokens} align="start" onOpenAutoFocus={(e) => e.preventDefault()} style={{ width: "auto", padding: 0 }}>
        <Calendar
          {...tokens}
          autoFocus
          mode="single"
          selected={current}
          defaultMonth={current}
          onSelect={(d: Date | undefined) => (setOwn(d), onValueChange?.(d), setOpen(false))}
          style={{ background: "transparent" }}
        />
      </PopoverContent>
    </Popover>
  );
}
