"use client";

import type { ComponentProps } from "react";
import { splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type ButtonGroupProps = ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" };

/** Groups related dotgrain buttons into one row or column. */
export function ButtonGroup({ orientation = "horizontal", style, ...props }: ButtonGroupProps) {
  return <div role="group" {...props} style={{ display: "inline-flex", flexDirection: orientation === "vertical" ? "column" : "row", alignItems: "stretch", gap: 4, ...style }} />;
}

export type ButtonGroupTextProps = Omit<ComponentProps<"span">, keyof DitherTokens> & Partial<DitherTokens>;

/** A non-interactive label cell in the group, on the palette. */
export function ButtonGroupText({ style, ...props }: ButtonGroupTextProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return <span {...rest} style={{ display: "inline-flex", alignItems: "center", padding: "0 12px", border: `1px solid ${fg}`, background: bg, color: fg, fontSize: 14, ...style }} />;
}

/** A dotted rule between buttons. */
export function ButtonGroupSeparator({ orientation = "vertical", style, ...props }: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return <div role="separator" aria-orientation={orientation} {...props} style={{ alignSelf: "stretch", [orientation === "vertical" ? "borderLeft" : "borderTop"]: "1px dotted currentColor", opacity: 0.6, ...style }} />;
}
