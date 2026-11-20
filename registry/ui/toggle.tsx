"use client";

import { Toggle as TogglePrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { paletteColors } from "@/lib/dotgrain/palettes";
import { useColorScheme, useDitherTokens } from "@/lib/dotgrain/provider";
import { Quantize } from "@/lib/dotgrain/quantize";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type ToggleProps = Omit<ComponentProps<typeof TogglePrimitive.Root>, keyof DitherTokens> &
  Partial<DitherTokens> & {
    /** Default: borderless until pressed. Outline: always bordered. */
    variant?: "default" | "outline";
    size?: "sm" | "default" | "lg";
  };

const SIZES = { sm: { padding: "4px 8px", fontSize: 13 }, default: { padding: "6px 12px", fontSize: 14 }, lg: { padding: "10px 16px", fontSize: 16 } };

/** A two-state press button; pressing dithers the face full. */
export function Toggle({
  variant = "default",
  size = "default",
  mode, pattern, cell, palette, glyphs, speed, contrast, threshold,
  pressed, defaultPressed, onPressedChange,
  disabled, children, style, onPointerEnter, onPointerLeave,
  ...props
}: ToggleProps) {
  const tokens = { mode, pattern, cell, palette, glyphs, speed, contrast, threshold };
  const [own, setOwn] = useState(!!defaultPressed);
  const [hover, setHover] = useState(false);
  const on = pressed ?? own;
  const { scheme } = useColorScheme();
  const colors = paletteColors(useDitherTokens(tokens).palette, scheme);
  const [bg, fg] = [colors[0], colors[colors.length - 1]];
  // Fill reach: empty at rest, a dithered hint on hover, full when pressed.
  const fill = on ? 1.6 : hover && !disabled ? 0.35 : -0.5;
  return (
    <TogglePrimitive.Root
      {...props}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={(next) => (setOwn(next), onPressedChange?.(next))}
      disabled={disabled}
      onPointerEnter={(e) => (setHover(true), onPointerEnter?.(e))}
      onPointerLeave={(e) => (setHover(false), onPointerLeave?.(e))}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        border: `1px solid ${variant === "outline" || on ? fg : "transparent"}`,
        background: bg,
        font: "inherit",
        lineHeight: 1.2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : undefined,
        ...SIZES[size],
        ...style,
      }}
    >
      <Quantize
        source={{ kind: "field", field: "progress", params: { value: fill, softness: 0.5 } }}
        ease
        {...tokens}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      {/* The label sits on a solid chip so it stays legible over any fill. */}
      <span style={{ position: "relative", padding: "0 0.25em", background: on ? fg : bg, color: on ? bg : fg }}>{children}</span>
    </TogglePrimitive.Root>
  );
}
