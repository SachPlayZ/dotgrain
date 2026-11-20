"use client";

import { useCallback, useEffect, useState, type CSSProperties, type Ref } from "react";
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

/** False on the first paint, true from the next frame: lets an eased Grain animate in on mount. */
export function useEntered(): boolean {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return entered;
}

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

/**
 * Tracks a data attribute that a primitive sets on its own element (Radix `data-state`, cmdk `data-selected`),
 * so a Grain can follow it. Returns the value and a callback ref that also forwards to `forward`.
 */
export function useDataAttr<T extends HTMLElement>(name: string, forward?: Ref<T>): [string | null, (el: T | null) => () => void] {
  const [value, setValue] = useState<string | null>(null);
  const ref = useCallback(
    (el: T | null) => {
      const pass = (node: T | null) => assignRef(forward, node);
      pass(el);
      if (!el) return () => {};
      const read = () => setValue(el.getAttribute(name));
      read();
      const observer = new MutationObserver(read);
      observer.observe(el, { attributes: true, attributeFilter: [name] });
      // React 19 runs this instead of calling the ref with null, so clear the forwarded ref here too.
      return () => (observer.disconnect(), pass(null));
    },
    [name, forward],
  );
  return [value, ref];
}
