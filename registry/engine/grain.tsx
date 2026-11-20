"use client";

import type { CSSProperties } from "react";
import { paletteColors } from "./palettes";
import { useColorScheme, useDitherTokens } from "./provider";
import { Quantize } from "./quantize";
import type { DitherTokens, FieldName } from "./types";

const TOKEN_KEYS = ["mode", "pattern", "cell", "palette", "glyphs", "speed", "contrast", "threshold"] as const;

/** Splits token props from the rest, so components can forward the rest to their element. */
export function splitTokens<P extends Partial<DitherTokens>>(props: P): [Partial<DitherTokens>, Omit<P, keyof DitherTokens>] {
  const tokens: Partial<DitherTokens> = {};
  const rest = { ...props };
  for (const key of TOKEN_KEYS) {
    if (key in rest) {
      (tokens as Record<string, unknown>)[key] = rest[key];
      delete rest[key];
    }
  }
  return [tokens, rest];
}

/** Background and foreground of the resolved palette, for DOM chrome that sits next to a canvas. */
export function useInk(tokens: Partial<DitherTokens>): { bg: string; fg: string } {
  const { scheme } = useColorScheme();
  const colors = paletteColors(useDitherTokens(tokens).palette, scheme);
  return { bg: colors[0], fg: colors[colors.length - 1] };
}

export type GrainProps = Partial<DitherTokens> & {
  field?: FieldName;
  params?: Record<string, number>;
  style?: CSSProperties;
};

/** A decorative field layer filling its positioned parent; params ease, so it animates between states. */
export function Grain({ field = "progress", params, style, ...tokens }: GrainProps) {
  return <Quantize source={{ kind: "field", field, params }} ease {...tokens} style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }} />;
}
