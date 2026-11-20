"use client";

import { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

/** A rule drawn in box glyphs (─ or │); it stretches to its container without adding to its size. */
export function Separator({ orientation = "horizontal", decorative = true, style, ...props }: ComponentProps<typeof SeparatorPrimitive.Root>) {
  const vertical = orientation === "vertical";
  return (
    <SeparatorPrimitive.Root
      {...props}
      orientation={orientation}
      decorative={decorative}
      style={{ position: "relative", flexShrink: 0, alignSelf: "stretch", ...(vertical ? { width: "1ch" } : { height: "1lh" }), fontFamily: "monospace", lineHeight: 1, opacity: 0.6, ...style }}
    >
      {/* Absolute, so the glyph run is clipped to the box instead of sizing it. */}
      <span aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", whiteSpace: vertical ? "normal" : "nowrap", wordBreak: "break-all" }}>
        {(vertical ? "│" : "─").repeat(200)}
      </span>
    </SeparatorPrimitive.Root>
  );
}
