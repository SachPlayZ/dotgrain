"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useDataAttr, useInk, useRise } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Tabs = ({ style, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root {...props} style={{ display: "flex", flexDirection: props.orientation === "vertical" ? "row" : "column", gap: 8, ...style }} />
);

export type TabsListProps = Omit<ComponentProps<typeof TabsPrimitive.List>, keyof DitherTokens> & Partial<DitherTokens>;

/** The tab strip, on a dithered rule. Its tokens reach every trigger through the provider. */
export function TabsList({ children, style, ...props }: TabsListProps) {
  const [tokens, rest] = splitTokens(props);
  const { fg } = useInk(tokens);
  return (
    <TabsPrimitive.List {...rest} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 4, paddingBottom: 4, color: fg, ...style }}>
      <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={{ top: "auto", height: 2 }} />
      {children}
    </TabsPrimitive.List>
  );
}

export type TabsTriggerProps = Omit<ComponentProps<typeof TabsPrimitive.Trigger>, keyof DitherTokens> & Partial<DitherTokens>;

/** A tab; the active one fills with dither behind a solid label chip. */
export function TabsTrigger({ children, style, ref, ...props }: TabsTriggerProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [state, own] = useDataAttr<HTMLButtonElement>("data-state", ref);
  const on = state === "active";
  return (
    <TabsPrimitive.Trigger
      {...rest}
      ref={own}
      style={{ position: "relative", padding: "6px 12px", border: 0, background: bg, color: fg, font: "inherit", fontSize: 14, cursor: rest.disabled ? "not-allowed" : "pointer", opacity: rest.disabled ? 0.5 : undefined, ...style }}
    >
      <Grain {...tokens} params={{ value: on ? 1.6 : -0.5, softness: 0.5 }} />
      <span style={{ position: "relative", padding: "0 0.25em", background: on ? fg : bg, color: on ? bg : fg }}>{children}</span>
    </TabsPrimitive.Trigger>
  );
}

/** A panel; it rises in each time its tab is chosen (Radix mounts the active panel only). */
export function TabsContent({ style, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content {...props} style={{ flex: 1, outline: "none", ...useRise(6), ...style }} />;
}
