"use client";

import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type NativeSelectProps = Omit<ComponentProps<"select">, keyof DitherTokens | "size"> & Partial<DitherTokens>;

/** A native select on the palette, with an ASCII chevron and a dithered underline that fills while focused. */
export function NativeSelect({ className, style, disabled, onFocus, onBlur, ...props }: NativeSelectProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [focus, setFocus] = useState(false);
  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-flex", border: `1px solid ${fg}`, background: bg, opacity: disabled ? 0.5 : undefined, ...style }}
    >
      <select
        {...rest}
        disabled={disabled}
        onFocus={(e) => (setFocus(true), onFocus?.(e))}
        onBlur={(e) => (setFocus(false), onBlur?.(e))}
        style={{ flex: 1, minWidth: 0, appearance: "none", padding: "8px 32px 12px 10px", border: 0, outline: "none", background: "transparent", color: fg, font: "inherit", colorScheme: "dark light" }}
      />
      <span aria-hidden="true" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-60%)", color: fg, pointerEvents: "none" }}>
        ▾
      </span>
      <Grain {...tokens} params={{ value: focus ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
    </span>
  );
}

export const NativeSelectOption = (props: ComponentProps<"option">) => <option {...props} />;
export const NativeSelectOptGroup = (props: ComponentProps<"optgroup">) => <optgroup {...props} />;
