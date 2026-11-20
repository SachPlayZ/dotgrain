"use client";

import { HoverCard as HoverCardPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export type HoverCardContentProps = Omit<ComponentProps<typeof HoverCardPrimitive.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** A preview card on hover or focus; a dithered frame materialises around it. */
export function HoverCardContent({ children, align = "center", sideOffset = 6, style, ...props }: HoverCardContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        {...rest}
        align={align}
        sideOffset={sideOffset}
        style={{ position: "relative", zIndex: 50, width: 256, padding: 16, background: bg, color: fg, outline: "none", ...style }}
      >
        {/* Behind every child: the panel is a stacking context (positioned + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}
