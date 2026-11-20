"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { createContext, use, useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<Omit<DitherTokens, "mode" | "glyphs">>;
const Selected = createContext<string | undefined>(undefined);

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

/** A Radix radio group; it tracks the value so each item knows when to dither in. */
export function RadioGroup({ value, defaultValue, onValueChange, style, ...props }: RadioGroupProps) {
  const [own, setOwn] = useState(defaultValue);
  return (
    <Selected value={value ?? own}>
      <RadioGroupPrimitive.Root
        {...props}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => (setOwn(next), onValueChange?.(next))}
        style={{ display: "grid", gap: 12, ...style }}
      />
    </Selected>
  );
}

export type RadioGroupItemProps = Omit<ComponentProps<typeof RadioGroupPrimitive.Item>, keyof DitherTokens> & Tokens & { size?: number };

/** A round radio whose centre dithers outward when selected. */
export function RadioGroupItem({ size = 18, disabled, style, ...props }: RadioGroupItemProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const on = use(Selected) === rest.value;
  return (
    <RadioGroupPrimitive.Item
      {...rest}
      disabled={disabled}
      style={{
        position: "relative",
        flexShrink: 0,
        width: size,
        height: size,
        padding: 0,
        borderRadius: "50%",
        overflow: "hidden",
        border: `1px solid ${fg}`,
        background: bg,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        outlineColor: fg,
        outlineOffset: 2,
        ...style,
      }}
    >
      <Grain {...tokens} mode="dither" field="radial" params={{ radius: on ? 0.75 : 0 }} />
    </RadioGroupPrimitive.Item>
  );
}
