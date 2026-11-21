"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { Grain, splitTokens, useDataAttr, useInk, useRise, useWash } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = Omit<ComponentProps<typeof AccordionPrimitive.Item>, keyof DitherTokens> & Partial<DitherTokens>;

/** One section, closed off by a dithered rule. */
export function AccordionItem({ children, style, ...props }: AccordionItemProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <AccordionPrimitive.Item {...rest} style={{ position: "relative", paddingBottom: 2, ...style }}>
      {children}
      <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={{ top: "auto", height: 2 }} />
    </AccordionPrimitive.Item>
  );
}

export type AccordionTriggerProps = Omit<ComponentProps<typeof AccordionPrimitive.Trigger>, keyof DitherTokens> & Partial<DitherTokens>;

/** The heading button; ▸ turns ▾ and a wash sweeps in while open: solid behind the title, dithering out after it. */
export function AccordionTrigger({ children, style, ref, ...props }: AccordionTriggerProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [state, own] = useDataAttr<HTMLButtonElement>("data-state", ref);
  const open = state === "open";
  const [label, wash] = useWash(open);
  return (
    <AccordionPrimitive.Header style={{ margin: 0, display: "flex" }}>
      <AccordionPrimitive.Trigger
        {...rest}
        ref={own}
        style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 4px", border: 0, background: bg, color: fg, font: "inherit", fontWeight: 500, textAlign: "left", cursor: "pointer", ...style }}
      >
        <Grain {...tokens} mode="dither" params={wash} />
        <span ref={label} style={{ position: "relative", padding: "0 0.25em", color: open ? bg : fg }}>{children}</span>
        <span aria-hidden="true" style={{ position: "relative", fontFamily: "monospace", background: bg }}>{open ? "▾" : "▸"}</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export const AccordionContent = ({ children, style, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content {...props} style={{ overflow: "hidden", fontSize: 14, ...style }}>
    <Rise>{children}</Rise>
  </AccordionPrimitive.Content>
);

// A component of its own so the rise restarts each time Radix mounts the opened content.
function Rise({ children }: { children: ReactNode }) {
  return <div style={{ padding: "0 4px 12px", ...useRise(6) }}>{children}</div>;
}
