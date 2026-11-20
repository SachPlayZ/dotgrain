"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type EmptyProps = Omit<ComponentProps<"div">, keyof DitherTokens> & Partial<DitherTokens>;

/** An empty state: centred media, title, description and actions. Its tokens reach the media glow. */
export function Empty({ children, style, ...props }: EmptyProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <div
      {...rest}
      style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minWidth: 0, padding: 32, textAlign: "center", background: bg, color: fg, ...style }}
    >
      <DitherProvider {...tokens}>{children}</DitherProvider>
    </div>
  );
}

const column = { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, maxWidth: 384 } as const;
export const EmptyHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column, ...style }} />;

export type EmptyMediaProps = ComponentProps<"div"> & { variant?: "default" | "icon" };

/** The picture above the title; icon sets it in a dithered radial glow. */
export function EmptyMedia({ variant = "default", children, style, ...props }: EmptyMediaProps) {
  const icon = variant === "icon";
  return (
    <div data-variant={variant} {...props} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, ...(icon && { width: 56, height: 56 }), ...style }}>
      {icon && <Grain field="radial" params={{ radius: 0.5 }} />}
      <span style={{ position: "relative", display: "flex" }}>{children}</span>
    </div>
  );
}

export const EmptyTitle = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ fontSize: 18, fontWeight: 600, ...style }} />;
export const EmptyDescription = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5, ...style }} />;
export const EmptyContent = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column, gap: 16, width: "100%", fontSize: 14, ...style }} />;
