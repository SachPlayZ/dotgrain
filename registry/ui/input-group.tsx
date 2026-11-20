"use client";

import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";
import { Button, type ButtonProps } from "@/components/ui/button";

export type InputGroupProps = Omit<ComponentProps<"div">, keyof DitherTokens> & Partial<DitherTokens>;

/** One bordered box for an input plus addons; its dithered underline fills while anything inside has focus. */
export function InputGroup({ style, onFocus, onBlur, children, ...props }: InputGroupProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [focus, setFocus] = useState(false);
  return (
    <div
      role="group"
      {...rest}
      onFocus={(e) => (setFocus(true), onFocus?.(e))}
      onBlur={(e) => (setFocus(false), onBlur?.(e))}
      style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", paddingBottom: 4, border: `1px solid ${fg}`, background: bg, color: fg, ...style }}
    >
      {children}
      <Grain {...tokens} params={{ value: focus ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
    </div>
  );
}

export type InputGroupAddonProps = ComponentProps<"div"> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end" };

/** Icons, text or buttons beside the input; clicking it focuses the input. */
export function InputGroupAddon({ align = "inline-start", style, onClick, ...props }: InputGroupAddonProps) {
  const block = align.startsWith("block");
  return (
    <div
      {...props}
      onClick={(e) => (e.currentTarget.parentElement?.querySelector<HTMLElement>("input, textarea")?.focus(), onClick?.(e))}
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 10px", order: align.endsWith("end") ? 1 : 0, width: block ? "100%" : undefined, paddingBlock: block ? 6 : undefined, ...style }}
    />
  );
}

export const InputGroupText = ({ style, ...props }: ComponentProps<"span">) => <span {...props} style={{ opacity: 0.75, ...style }} />;

const bare = { flex: 1, minWidth: 0, padding: "8px 10px", border: 0, outline: "none", background: "transparent", color: "inherit", font: "inherit" } as const;
export const InputGroupInput = ({ style, ...props }: ComponentProps<"input">) => <input {...props} style={{ ...bare, ...style }} />;
export const InputGroupTextarea = ({ style, ...props }: ComponentProps<"textarea">) => <textarea rows={3} {...props} style={{ ...bare, resize: "vertical", ...style }} />;

/** A small dotgrain Button for actions inside the group. */
export const InputGroupButton = ({ size = "sm", variant = "outline", ...props }: ButtonProps) => <Button size={size} variant={variant} {...props} />;
