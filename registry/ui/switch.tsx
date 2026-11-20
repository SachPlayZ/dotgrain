"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { paletteColors } from "@/lib/dotgrain/palettes";
import { useColorScheme, useDitherTokens, useReducedMotion } from "@/lib/dotgrain/provider";
import { Quantize } from "@/lib/dotgrain/quantize";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type SwitchProps = Omit<ComponentProps<typeof SwitchPrimitive.Root>, keyof DitherTokens> &
  Partial<Omit<DitherTokens, "mode" | "glyphs">> & {
    /** Track height in CSS pixels; the width is twice that. */
    size?: number;
  };

export function Switch({
  size = 24,
  pattern, cell, palette, speed, contrast, threshold,
  checked, defaultChecked, onCheckedChange,
  disabled, style, ...props
}: SwitchProps) {
  const tokens = { pattern, cell, palette, speed, contrast, threshold };
  const [own, setOwn] = useState(!!defaultChecked);
  const on = checked ?? own;
  const reduced = useReducedMotion();
  const { scheme } = useColorScheme();
  const colors = paletteColors(useDitherTokens({ ...tokens, mode: "dither" }).palette, scheme);
  const [bg, fg] = [colors[0], colors[colors.length - 1]];
  const thumb = size - 6;
  return (
    <SwitchPrimitive.Root
      {...props}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next) => (setOwn(next), onCheckedChange?.(next))}
      disabled={disabled}
      style={{
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
        width: size * 2,
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
      <Quantize
        source={{ kind: "field", field: "progress", params: { value: on ? 1.3 : -0.3, softness: 0.3 } }}
        ease
        {...tokens}
        mode="dither"
        style={{ position: "absolute", inset: 0 }}
      />
      <SwitchPrimitive.Thumb
        style={{
          position: "absolute",
          top: 2,
          left: on ? size * 2 - thumb - 4 : 2,
          width: thumb,
          height: thumb,
          background: on ? bg : fg,
          transition: reduced ? undefined : "left 150ms ease-out",
        }}
      />
    </SwitchPrimitive.Root>
  );
}
