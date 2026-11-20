"use client";

import { useEffect, useRef, useState, type ComponentProps, type CSSProperties } from "react";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { Grain, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

// DayPicker's own `mode` (single, range…) wins; the dither mode comes from the provider.
type Tokens = Partial<Omit<DitherTokens, "mode">>;
export type CalendarProps = ComponentProps<typeof DayPicker> & Tokens;

const cell = 32;
const button: CSSProperties = { position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: cell, height: cell, padding: 0, border: 0, background: "transparent", color: "inherit", font: "inherit", cursor: "pointer" };

/** react-day-picker, styled inline: selected days fill with dither, range middles go halftone, today gets a thin frame. */
export function Calendar({ showOutsideDays = true, styles, components, style, pattern, cell, palette, glyphs, speed, contrast, threshold, ...rest }: CalendarProps) {
  const tokens: Tokens = { pattern, cell, palette, glyphs, speed, contrast, threshold };
  const { bg, fg } = useInk(tokens);
  return (
    <DitherProvider {...tokens}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        {...(rest as ComponentProps<typeof DayPicker>)}
        style={{ display: "inline-block", padding: 12, background: bg, color: fg, fontSize: 14, ...style }}
        styles={{
          months: { position: "relative", display: "flex", flexWrap: "wrap", gap: 16 },
          month: { display: "flex", flexDirection: "column", gap: 12 },
          nav: { position: "absolute", insetInline: 0, top: 0, display: "flex", justifyContent: "space-between", pointerEvents: "none" },
          button_previous: { ...button, pointerEvents: "auto" },
          button_next: { ...button, pointerEvents: "auto" },
          month_caption: { display: "flex", alignItems: "center", justifyContent: "center", height: cell, fontWeight: 500 },
          dropdowns: { display: "flex", gap: 6 },
          dropdown_root: { position: "relative" },
          dropdown: { position: "absolute", inset: 0, opacity: 0, cursor: "pointer" },
          month_grid: { borderCollapse: "collapse" },
          weekday: { width: cell, padding: "0 0 6px", fontSize: 12, fontWeight: 400, opacity: 0.6 },
          day: { padding: 1, textAlign: "center" },
          outside: { opacity: 0.45 },
          disabled: { opacity: 0.35 },
          hidden: { visibility: "hidden" },
          ...styles,
        }}
        components={{
          Chevron: ({ orientation }) => <span aria-hidden="true" style={{ fontFamily: "monospace" }}>{orientation === "left" ? "‹" : orientation === "right" ? "›" : "▾"}</span>,
          DayButton: CalendarDayButton,
          ...components,
        }}
      />
    </DitherProvider>
  );
}

/** A day: solid dither when selected or a range end, halftone inside a range, a thin frame for today, a faint wash on hover. */
export function CalendarDayButton({ day, modifiers, style, onPointerEnter, onPointerLeave, children, ...props }: DayButtonProps) {
  const { bg, fg } = useInk({});
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  // react-day-picker moves focus by flagging the day; the default button focuses itself, so this one must too.
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const solid = (modifiers.selected && !modifiers.range_middle) || modifiers.range_start || modifiers.range_end;
  const params = solid ? { border: 0, fill: 1 } : modifiers.range_middle ? { border: 0, fill: 0.3 } : modifiers.today ? { border: 1, fill: 0 } : hover ? { border: 0, fill: 0.15 } : null;
  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      {...props}
      onPointerEnter={(e) => (setHover(true), onPointerEnter?.(e))}
      onPointerLeave={(e) => (setHover(false), onPointerLeave?.(e))}
      style={{ ...button, ...style }}
    >
      {/* Plain days draw nothing, so a month mounts a handful of canvases, not 42. */}
      {params && <Grain field="frame" params={params} />}
      <span style={{ position: "relative", padding: "0 0.2em", background: solid ? fg : modifiers.range_middle ? bg : "transparent", color: solid ? bg : fg, fontVariantNumeric: "tabular-nums" }}>{children}</span>
    </button>
  );
}
