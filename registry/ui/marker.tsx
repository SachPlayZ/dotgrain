"use client";

import type { ComponentProps, CSSProperties } from "react";

export type MarkerProps = ComponentProps<"div"> & { variant?: "default" | "separator" | "border" };

const glyph: CSSProperties = { fontFamily: "monospace", lineHeight: 1, opacity: 0.6, overflow: "hidden", whiteSpace: "nowrap" };

/** A box-glyph rule that fills the space it is given. */
const Rule = ({ style }: { style?: CSSProperties }) => (
  <span aria-hidden="true" style={{ ...glyph, flex: "1 1 0", minWidth: 0, ...style }}>
    {"─".repeat(200)}
  </span>
);

/**
 * An inline status line in a feed: "Edited 2 min ago", "Today". separator draws ─ rules either side;
 * border underlines it with one.
 */
export function Marker({ variant = "default", children, style, ...props }: MarkerProps) {
  const separator = variant === "separator";
  return (
    <div
      data-variant={variant}
      {...props}
      style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, width: "100%", minHeight: 16, fontSize: 14, opacity: 0.85, paddingBottom: variant === "border" ? 12 : undefined, ...style }}
    >
      {separator && <Rule style={{ marginRight: 4 }} />}
      {children}
      {separator && <Rule style={{ marginLeft: 4 }} />}
      {variant === "border" && <Rule style={{ position: "absolute", left: 0, right: 0, bottom: 0 }} />}
    </div>
  );
}

export const MarkerIcon = ({ style, ...props }: ComponentProps<"span">) => (
  <span aria-hidden="true" {...props} style={{ display: "inline-flex", flexShrink: 0, width: 16, height: 16, alignItems: "center", justifyContent: "center", ...style }} />
);

export const MarkerContent = ({ style, ...props }: ComponentProps<"span">) => <span {...props} style={{ minWidth: 0, overflowWrap: "anywhere", ...style }} />;
