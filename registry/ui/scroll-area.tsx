"use client";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type ScrollAreaProps = Omit<ComponentProps<typeof ScrollAreaPrimitive.Root>, keyof DitherTokens> & Partial<DitherTokens>;

/** Native scrolling with custom dithered scrollbars; its tokens reach the bars. */
export function ScrollArea({ children, style, ...props }: ScrollAreaProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <ScrollAreaPrimitive.Root {...rest} style={{ position: "relative", overflow: "hidden", background: bg, color: fg, ...style }}>
      <ScrollAreaPrimitive.Viewport style={{ width: "100%", height: "100%", borderRadius: "inherit" }}>{children}</ScrollAreaPrimitive.Viewport>
      <DitherProvider {...tokens}>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </DitherProvider>
    </ScrollAreaPrimitive.Root>
  );
}

/** A bar on a faint dithered track with a solid dithered thumb. Add an extra `orientation="horizontal"` one for sideways scroll. */
export function ScrollBar({ orientation = "vertical", style, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  const vertical = orientation === "vertical";
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      orientation={orientation}
      style={{ display: "flex", padding: 1, userSelect: "none", touchAction: "none", ...(vertical ? { width: 8, height: "100%" } : { height: 8, flexDirection: "column" }), ...style }}
    >
      <Grain field="frame" params={{ border: 0, fill: 0.15 }} />
      <ScrollAreaPrimitive.Thumb style={{ position: "relative", flex: 1 }}>
        <Grain field="frame" params={{ border: 0, fill: 1 }} />
      </ScrollAreaPrimitive.Thumb>
    </ScrollAreaPrimitive.Scrollbar>
  );
}
