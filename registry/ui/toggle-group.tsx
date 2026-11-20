"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { createContext, use, useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Style = { variant?: "default" | "outline"; size?: "sm" | "default" | "lg" };
const Group = createContext<Style & { pressed: string[] }>({ pressed: [] });
const SIZES = { sm: { padding: "4px 8px", fontSize: 13 }, default: { padding: "6px 12px", fontSize: 14 }, lg: { padding: "10px 16px", fontSize: 16 } };

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & Style;

/** A Radix toggle group; it tracks the value so each item knows when to dither full. */
export function ToggleGroup({ variant, size, style, ...props }: ToggleGroupProps) {
  const initial = props.value ?? props.defaultValue ?? [];
  const [own, setOwn] = useState<string | string[]>(initial);
  const current = props.value ?? own;
  const pressed = Array.isArray(current) ? current : current ? [current] : [];
  // Radix types single and multiple groups separately; both hand back what they hold.
  const onValueChange = (next: string | string[]) => (setOwn(next), (props.onValueChange as ((v: string | string[]) => void) | undefined)?.(next));
  return (
    <Group value={{ variant, size, pressed }}>
      <ToggleGroupPrimitive.Root {...props} onValueChange={onValueChange as never} style={{ display: "inline-flex", gap: 4, ...style }} />
    </Group>
  );
}

export type ToggleGroupItemProps = Omit<ComponentProps<typeof ToggleGroupPrimitive.Item>, keyof DitherTokens> & Partial<DitherTokens> & Style;

/** A press button inside a ToggleGroup; pressed items dither full, like Toggle. */
export function ToggleGroupItem({ variant, size, disabled, children, style, onPointerEnter, onPointerLeave, ...props }: ToggleGroupItemProps) {
  const [tokens, rest] = splitTokens(props);
  const group = use(Group);
  const { bg, fg } = useInk(tokens);
  const [hover, setHover] = useState(false);
  const on = group.pressed.includes(rest.value);
  const fill = on ? 1.6 : hover && !disabled ? 0.35 : -0.5;
  return (
    <ToggleGroupPrimitive.Item
      {...rest}
      disabled={disabled}
      onPointerEnter={(e) => (setHover(true), onPointerEnter?.(e))}
      onPointerLeave={(e) => (setHover(false), onPointerLeave?.(e))}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${(variant ?? group.variant) === "outline" || on ? fg : "transparent"}`,
        background: bg,
        font: "inherit",
        lineHeight: 1.2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        ...SIZES[size ?? group.size ?? "default"],
        ...style,
      }}
    >
      <Grain {...tokens} params={{ value: fill, softness: 0.5 }} />
      <span style={{ position: "relative", padding: "0 0.25em", background: on ? fg : bg, color: on ? bg : fg }}>{children}</span>
    </ToggleGroupPrimitive.Item>
  );
}
