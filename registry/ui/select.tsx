"use client";

import { Select as SelectPrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<DitherTokens>;

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export type SelectTriggerProps = Omit<ComponentProps<typeof SelectPrimitive.Trigger>, keyof DitherTokens> & Tokens;

/** The closed select: palette box, ASCII chevron, dithered underline while focused or open. */
export function SelectTrigger({ children, style, onFocus, onBlur, ...props }: SelectTriggerProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [focus, setFocus] = useState(false);
  return (
    <SelectPrimitive.Trigger
      {...rest}
      onFocus={(e) => (setFocus(true), onFocus?.(e))}
      onBlur={(e) => (setFocus(false), onBlur?.(e))}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 8, minWidth: 160, padding: "8px 10px 12px", border: `1px solid ${fg}`, background: bg, color: fg, font: "inherit", outline: "none", cursor: "pointer", ...style }}
    >
      {children}
      <SelectPrimitive.Icon aria-hidden="true">▾</SelectPrimitive.Icon>
      <Grain {...tokens} params={{ value: focus ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
    </SelectPrimitive.Trigger>
  );
}

export type SelectContentProps = Omit<ComponentProps<typeof SelectPrimitive.Content>, keyof DitherTokens> & Tokens;

/** The open list, in a portal, framed by a dithered border. */
export function SelectContent({ children, position = "popper", sideOffset = 4, style, ...props }: SelectContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        {...rest}
        position={position}
        sideOffset={sideOffset}
        style={{ position: "relative", zIndex: 50, minWidth: "var(--radix-select-trigger-width)", maxHeight: "var(--radix-select-content-available-height)", overflow: "hidden", background: bg, color: fg, ...style }}
      >
        <Grain {...tokens} field="frame" params={{ border: 2, fill: 0 }} />
        <SelectPrimitive.ScrollUpButton style={{ display: "flex", justifyContent: "center", position: "relative" }}>▴</SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport style={{ position: "relative", padding: 8 }}>{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton style={{ display: "flex", justifyContent: "center", position: "relative" }}>▾</SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export type SelectItemProps = Omit<ComponentProps<typeof SelectPrimitive.Item>, keyof DitherTokens> & Tokens;

/** An option; the highlighted one gets a dithered wash behind a solid label chip. */
export function SelectItem({ children, style, onFocus, onBlur, ...props }: SelectItemProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [active, setActive] = useState(false);
  return (
    <SelectPrimitive.Item
      {...rest}
      onFocus={(e) => (setActive(true), onFocus?.(e))}
      onBlur={(e) => (setActive(false), onBlur?.(e))}
      style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 6px 24px", outline: "none", cursor: "pointer", opacity: rest.disabled ? 0.5 : undefined, ...style }}
    >
      {active && <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} />}
      <SelectPrimitive.ItemIndicator style={{ position: "absolute", left: 8 }}>✓</SelectPrimitive.ItemIndicator>
      <span style={{ position: "relative", padding: "0 0.25em", background: active ? fg : "transparent", color: active ? bg : fg }}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
    </SelectPrimitive.Item>
  );
}

export const SelectLabel = ({ style, ...props }: ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label {...props} style={{ padding: "6px 8px", fontSize: 12, opacity: 0.7, ...style }} />
);

export const SelectSeparator = ({ style, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator {...props} style={{ width: 0, minWidth: "100%", margin: "4px 0", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.6, ...style }}>
    {"─".repeat(80)}
  </SelectPrimitive.Separator>
);

export const SelectScrollUpButton = SelectPrimitive.ScrollUpButton;
export const SelectScrollDownButton = SelectPrimitive.ScrollDownButton;
