"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";
import { Separator } from "@/components/ui/separator";

export type ItemProps = Omit<ComponentProps<"div">, keyof DitherTokens> &
  Partial<DitherTokens> & { variant?: "default" | "outline" | "muted"; size?: "default" | "sm" };

const FIELD = { outline: { border: 1, fill: 0 }, muted: { border: 0, fill: 0.06 } } as const;

/** A row of media, text and actions. outline draws a dithered frame; muted lays a faint dither under it. */
export function Item({ variant = "default", size = "default", children, style, ...props }: ItemProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <div
      data-variant={variant}
      data-size={size}
      {...rest}
      style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", gap: size === "sm" ? 10 : 16, padding: size === "sm" ? "10px 14px" : "14px 16px", background: bg, color: fg, fontSize: 14, ...style }}
    >
      {variant !== "default" && <Grain {...tokens} field="frame" params={FIELD[variant]} />}
      {children}
    </div>
  );
}

export const ItemGroup = ({ style, ...props }: ComponentProps<"div">) => <div role="list" {...props} style={{ display: "flex", flexDirection: "column", ...style }} />;

export const ItemSeparator = (props: ComponentProps<typeof Separator>) => <Separator orientation="horizontal" {...props} />;

export type ItemMediaProps = ComponentProps<"div"> & { variant?: "default" | "icon" | "image" };

/** Leading media. icon sits on a small dithered tile; image clips to a square. */
export function ItemMedia({ variant = "default", children, style, ...props }: ItemMediaProps) {
  const box = variant === "default" ? {} : { width: variant === "icon" ? 32 : 40, height: variant === "icon" ? 32 : 40, overflow: "hidden" };
  return (
    <div data-variant={variant} {...props} style={{ position: "relative", display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center", ...box, ...style }}>
      {variant === "icon" && <Grain field="frame" params={{ border: 1, fill: 0 }} />}
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</span>
    </div>
  );
}

const relative = { position: "relative" } as const;
export const ItemContent = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, display: "flex", flex: 1, flexDirection: "column", gap: 4, ...style }} />;
export const ItemTitle = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, display: "flex", alignItems: "center", gap: 8, fontWeight: 500, lineHeight: 1.3, ...style }} />;
export const ItemDescription = ({ style, ...props }: ComponentProps<"p">) => <p {...props} style={{ ...relative, margin: 0, opacity: 0.75, lineHeight: 1.5, ...style }} />;
export const ItemActions = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, display: "flex", alignItems: "center", gap: 8, ...style }} />;
export const ItemHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, display: "flex", flexBasis: "100%", alignItems: "center", justifyContent: "space-between", gap: 8, ...style }} />;
export const ItemFooter = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, display: "flex", flexBasis: "100%", alignItems: "center", justifyContent: "space-between", gap: 8, ...style }} />;
