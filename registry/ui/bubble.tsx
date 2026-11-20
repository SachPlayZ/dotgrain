"use client";

import { createContext, use, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Variant = "default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive";
const BubbleContext = createContext<{ variant: Variant; tokens: Partial<DitherTokens> }>({ variant: "default", tokens: {} });

// A dithered mat around a solid pane: fill sets how dense the mat is, border frames it. Fills are dithered
// even in ASCII mode, since glyphs that dense would just be noise around the text.
const MAT = {
  default: { border: 0, fill: 1 },
  secondary: { border: 0, fill: 0.35 },
  muted: { border: 0, fill: 0.12 },
  tinted: { border: 0, fill: 0.6 },
  outline: { border: 1, fill: 0 },
  destructive: { border: 2, fill: 0.2 },
} as const;

export type BubbleProps = Omit<ComponentProps<"div">, keyof DitherTokens> & Partial<DitherTokens> & { variant?: Variant; align?: "start" | "end" };

export const BubbleGroup = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0, ...style }} />;

/** A chat bubble; its variant and tokens reach the BubbleContent and BubbleReactions inside. */
export function Bubble({ variant = "default", align = "start", style, ...props }: BubbleProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <BubbleContext value={{ variant, tokens }}>
      <div
        data-variant={variant}
        data-align={align}
        {...rest}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: align === "end" ? "flex-end" : "flex-start", alignSelf: align === "end" ? "flex-end" : undefined, gap: 4, width: "fit-content", minWidth: 0, maxWidth: variant === "ghost" ? "100%" : "80%", ...style }}
      />
    </BubbleContext>
  );
}

/** The message text on a solid pane, set in a dithered mat that carries the variant. */
export function BubbleContent({ children, style, ...props }: ComponentProps<"div">) {
  const { variant, tokens } = use(BubbleContext);
  const { bg, fg } = useInk(tokens);
  const ghost = variant === "ghost";
  const solid = variant === "default";
  return (
    <div {...props} style={{ position: "relative", maxWidth: "100%", minWidth: 0, padding: ghost ? 0 : 4, fontSize: 14, lineHeight: 1.6, overflowWrap: "anywhere", ...style }}>
      {!ghost && <Grain {...tokens} mode={variant === "outline" ? tokens.mode : "dither"} field="frame" params={MAT[variant]} />}
      <div style={{ position: "relative", padding: ghost ? 0 : "6px 10px", background: ghost ? undefined : solid ? fg : bg, color: ghost ? undefined : solid ? bg : fg }}>{children}</div>
    </div>
  );
}

export type BubbleReactionsProps = ComponentProps<"div"> & { side?: "top" | "bottom"; align?: "start" | "end" };

/** Reaction chips pinned to the bubble's top or bottom edge, in a small dithered frame. */
export function BubbleReactions({ side = "bottom", align = "end", children, style, ...props }: BubbleReactionsProps) {
  const { tokens } = use(BubbleContext);
  const { bg, fg } = useInk(tokens);
  return (
    <div
      data-side={side}
      data-align={align}
      {...props}
      style={{ position: "absolute", zIndex: 1, [side]: 0, [align === "end" ? "right" : "left"]: 12, transform: `translateY(${side === "top" ? "-75%" : "75%"})`, display: "flex", alignItems: "center", gap: 4, padding: "2px 6px", fontSize: 13, background: bg, color: fg, ...style }}
    >
      {/* Dithered even in ASCII: a glyph frame would bury a chip this small. */}
      <Grain {...tokens} mode="dither" field="frame" params={{ border: 1, fill: 0 }} />
      <span style={{ position: "relative", display: "flex", gap: 4 }}>{children}</span>
    </div>
  );
}
