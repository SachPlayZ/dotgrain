"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const TooltipProvider = ({ delayDuration = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);

/** A tooltip with its own provider, as in shadcn; wrap many in one TooltipProvider to share delays. */
export const Tooltip = (props: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipProvider>
    <TooltipPrimitive.Root {...props} />
  </TooltipProvider>
);

export const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = Omit<ComponentProps<typeof TooltipPrimitive.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** A small label with a one-mark dithered rim that flashes in. */
export function TooltipContent({ children, sideOffset = 4, style, ...props }: TooltipContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...rest}
        sideOffset={sideOffset}
        style={{ position: "relative", zIndex: 50, padding: "6px 10px", fontSize: 13, lineHeight: 1.3, background: bg, color: fg, ...style }}
      >
        {/* Behind every child: the panel is a stacking context (positioned + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 1, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
