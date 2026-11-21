"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type KbdProps = Omit<ComponentProps<"kbd">, keyof DitherTokens> & Partial<DitherTokens>;

/** A key cap: monospace text in a thin dithered frame. */
export function Kbd({ children, style, ...props }: KbdProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <kbd
      {...rest}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 22, height: 22, padding: "0 5px", background: bg, color: fg, fontFamily: "monospace", fontSize: 12, lineHeight: 1, ...style }}
    >
      {/* Dither even in ASCII: a one-glyph border would bury a 22px cap. */}
      <Grain {...tokens} mode="dither" field="frame" params={{ border: 1, fill: 0 }} />
      <span style={{ position: "relative" }}>{children}</span>
    </kbd>
  );
}

export const KbdGroup = ({ style, ...props }: ComponentProps<"kbd">) => <kbd {...props} style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "inherit", ...style }} />;
