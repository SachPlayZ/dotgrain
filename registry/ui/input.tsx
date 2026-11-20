"use client";

import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type InputProps = Omit<ComponentProps<"input">, keyof DitherTokens> & Partial<DitherTokens>;

/** A native input on the palette, with a dithered underline that fills while focused. */
export function Input({ className, style, disabled, onFocus, onBlur, ...props }: InputProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [focus, setFocus] = useState(false);
  return (
    <span
      className={className}
      style={{ position: "relative", display: "flex", border: `1px solid ${fg}`, background: bg, opacity: disabled ? 0.5 : undefined, ...style }}
    >
      <input
        {...rest}
        disabled={disabled}
        onFocus={(e) => (setFocus(true), onFocus?.(e))}
        onBlur={(e) => (setFocus(false), onBlur?.(e))}
        style={{ flex: 1, minWidth: 0, padding: "8px 10px 12px", border: 0, outline: "none", background: "transparent", color: fg, font: "inherit" }}
      />
      <Grain {...tokens} params={{ value: focus ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
    </span>
  );
}
