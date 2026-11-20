"use client";

import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export type CollapsibleContentProps = Omit<ComponentProps<typeof CollapsiblePrimitive.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** The revealed region, hung off a dithered rail on its leading edge. */
export function CollapsibleContent({ children, style, ...props }: CollapsibleContentProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <CollapsiblePrimitive.Content {...rest} style={{ position: "relative", paddingInlineStart: 14, ...style }}>
      <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={{ right: "auto", width: 4 }} />
      {children}
    </CollapsiblePrimitive.Content>
  );
}
