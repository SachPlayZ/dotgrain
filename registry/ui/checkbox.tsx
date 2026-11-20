"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type CheckboxProps = Omit<ComponentProps<typeof CheckboxPrimitive.Root>, keyof DitherTokens> &
  Partial<Omit<DitherTokens, "mode" | "glyphs">> & {
    /** Box size in CSS pixels. */
    size?: number;
  };

/** A Radix checkbox whose box dithers full when checked (half when indeterminate). */
export function Checkbox({ size = 18, checked, defaultChecked, onCheckedChange, disabled, style, ...props }: CheckboxProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [own, setOwn] = useState(defaultChecked ?? false);
  const state = checked ?? own;
  return (
    <CheckboxPrimitive.Root
      {...rest}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next) => (setOwn(next), onCheckedChange?.(next))}
      disabled={disabled}
      style={{
        position: "relative",
        flexShrink: 0,
        width: size,
        height: size,
        padding: 0,
        border: `1px solid ${fg}`,
        background: bg,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        outlineColor: fg,
        outlineOffset: 2,
        ...style,
      }}
    >
      <Grain {...tokens} mode="dither" params={{ value: state === true ? 1.3 : state === "indeterminate" ? 0.5 : -0.3, softness: 0.3 }} />
      <CheckboxPrimitive.Indicator
        style={{ position: "absolute", inset: 3, display: "grid", placeItems: "center", background: fg, color: bg, fontSize: size * 0.6, lineHeight: 1 }}
      >
        {state === "indeterminate" ? "–" : "✓"}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
