"use client";

import { Popover as PopoverPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useEntered, useInk, useRise } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export type PopoverContentProps = Omit<ComponentProps<typeof PopoverPrimitive.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** A floating panel beside its trigger, in a portal; its dithered frame materialises as it opens. */
export function PopoverContent({ children, align = "center", sideOffset = 6, style, ...props }: PopoverContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...rest}
        align={align}
        sideOffset={sideOffset}
        style={{ position: "relative", zIndex: 50, width: 288, padding: 16, background: bg, color: fg, outline: "none", ...useRise(), ...style }}
      >
        {/* Behind every child: the panel is a stacking context (positioned + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
