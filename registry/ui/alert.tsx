"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type AlertProps = Omit<ComponentProps<"div">, keyof DitherTokens> & Partial<DitherTokens> & { variant?: "default" | "destructive" };

/** A callout in a dithered frame; destructive ones get a heavier frame and a ✖ mark. An icon placed first takes its own column; give it a right margin. */
export function Alert({ variant = "default", children, style, ...props }: AlertProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const destructive = variant === "destructive";
  return (
    <div
      role="alert"
      data-variant={variant}
      {...rest}
      style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 1fr", rowGap: 2, alignItems: "start", padding: destructive ? "14px 18px" : "12px 16px", background: bg, color: fg, fontSize: 14, ...style }}
    >
      <Grain {...tokens} field="frame" params={{ border: destructive ? 4 : 2, fill: 0 }} />
      {destructive && (
        <span aria-hidden="true" style={{ position: "relative", gridRow: "span 2", paddingRight: 12, fontFamily: "monospace" }}>
          ✖
        </span>
      )}
      {children}
    </div>
  );
}

// Title and description sit in the second column, so a leading icon (or the ✖) gets the first.
export const AlertTitle = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ position: "relative", gridColumn: 2, fontWeight: 600, lineHeight: 1.4, ...style }} />
);

export const AlertDescription = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ position: "relative", gridColumn: 2, opacity: 0.8, lineHeight: 1.5, ...style }} />
);
