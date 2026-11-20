"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type BadgeProps = Omit<ComponentProps<"span">, keyof DitherTokens> &
  Partial<DitherTokens> & { variant?: "default" | "secondary" | "destructive" | "outline" };

// The frame field with no border is a flat level: fill sets how dense the dots are.
const FIELD = {
  default: { border: 0, fill: 1 },
  secondary: { border: 0, fill: 0.35 },
  destructive: { border: 0, fill: 1 },
  outline: { border: 1, fill: 0 },
} as const;

/** A small label on a dithered chip; the text sits on a solid patch so it always reads. */
export function Badge({ variant = "default", children, style, ...props }: BadgeProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const solid = variant === "default" || variant === "destructive";
  return (
    <span
      data-variant={variant}
      {...rest}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", padding: "3px 6px", fontSize: 12, fontWeight: 500, lineHeight: 1.2, whiteSpace: "nowrap", color: fg, ...style }}
    >
      <Grain {...tokens} field="frame" params={FIELD[variant]} />
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 4, padding: "0 0.25em", background: solid ? fg : bg, color: solid ? bg : fg }}>
        {variant === "destructive" && <span aria-hidden="true">✖</span>}
        {children}
      </span>
    </span>
  );
}
