"use client";

import { useCallback, useEffect, useState, type CSSProperties, type Ref } from "react";
import { paletteColors } from "./palettes";
import { useColorScheme, useDitherTokens, useReducedMotion } from "./provider";
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

/**
 * Style for content that would otherwise pop in (an opened panel, a switched tab): it fades and slides `offset`
 * pixels into place on mount. Spread it before the caller's style. Nothing under reduced motion.
 */
export function useRise(offset = 4): CSSProperties {
  const entered = useEntered();
  if (useReducedMotion()) return {};
  return {
    opacity: entered ? 1 : 0,
    transform: entered ? "none" : `translateY(${offset}px)`,
    transition: "opacity 180ms ease-out, transform 260ms cubic-bezier(0.2, 0.7, 0, 1)",
  };
}

const WASH_SOFTNESS = 0.25;

/**
 * A highlight wash fitted to its label: solid behind the label's content, dithering out after it, so the label
 * reads in the background colour without a hard block behind it. Put the ref on the label (a child of the row
 * the Grain fills) and give the Grain these params with mode="dither" (dense glyphs would bury the label).
 * `off` is the level when not highlighted.
 */
export function useWash(on: boolean, off = -0.5): [(el: HTMLElement | null) => (() => void) | undefined, Record<string, number>] {
  const [end, setEnd] = useState(0.6);
  const ref = useCallback(
    (el: HTMLElement | null) => {
      const row = el?.offsetParent;
      if (!el || !row) return;
      // The content's own box, not the label's: labels often stretch (flex: 1) to push a shortcut right.
      const measure = () => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const box = row.getBoundingClientRect();
        if (box.width) setEnd(Math.min(1, (range.getBoundingClientRect().right - box.left) / box.width));
      };
      measure();
      if (typeof ResizeObserver === "undefined") return;
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      observer.observe(row);
      return () => observer.disconnect();
    },
    // Re-measure whenever the highlight turns on: the label may have changed while it was off.
    [on], // eslint-disable-line react-hooks/exhaustive-deps
  );
  // Level is 1 up to value − softness: the solid part ends a hair past the label, then fades over a quarter row.
  return [ref, { value: on ? end + 0.04 + WASH_SOFTNESS : off, softness: WASH_SOFTNESS }];
}

/** The screen-door scrim behind modal overlays: a dimmed, softly blurred page under a faint grey dither. */
export function Scrim({ entered, ...tokens }: Partial<DitherTokens> & { entered: boolean }) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "rgb(0 0 0 / 0.5)", backdropFilter: "blur(2px)", opacity: entered ? 1 : 0, transition: "opacity 200ms ease" }} />
      {/* Ink, not the active palette: a coloured screen-door over the page reads as noise, a grey one as shade. */}
      <Grain {...tokens} palette="ink" mode="dither" field="frame" params={{ border: 0, fill: entered ? 0.3 : 0 }} style={{ opacity: 0.18 }} />
    </>
  );
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
