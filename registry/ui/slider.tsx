"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type SliderProps = Omit<ComponentProps<typeof SliderPrimitive.Root>, keyof DitherTokens> & Partial<Omit<DitherTokens, "mode" | "glyphs">>;

/** A Radix slider: the selected range is dithered, thumbs are solid squares. */
export function Slider({ value, defaultValue, min = 0, disabled, style, ...props }: SliderProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const thumbs = (value ?? defaultValue ?? [min]).length;
  return (
    <SliderPrimitive.Root
      {...rest}
      value={value}
      defaultValue={defaultValue}
      min={min}
      disabled={disabled}
      style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", height: 20, touchAction: "none", userSelect: "none", opacity: disabled ? 0.5 : undefined, ...style }}
    >
      <SliderPrimitive.Track style={{ position: "relative", flexGrow: 1, height: 10, border: `1px solid ${fg}`, background: bg, overflow: "hidden" }}>
        <SliderPrimitive.Range style={{ position: "absolute", height: "100%" }}>
          <Grain {...tokens} mode="dither" params={{ value: 1.4, softness: 0.6 }} />
        </SliderPrimitive.Range>
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          style={{ display: "block", width: 16, height: 16, background: fg, border: `2px solid ${bg}`, outlineColor: fg, outlineOffset: 2, cursor: disabled ? "not-allowed" : "grab" }}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
