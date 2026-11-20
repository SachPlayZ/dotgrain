"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Breadcrumb = (props: ComponentProps<"nav">) => <nav aria-label="breadcrumb" {...props} />;

export const BreadcrumbList = ({ style, ...props }: ComponentProps<"ol">) => (
  <ol {...props} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, margin: 0, padding: 0, listStyle: "none", fontSize: 14, ...style }} />
);

export const BreadcrumbItem = ({ style, ...props }: ComponentProps<"li">) => (
  <li {...props} style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }} />
);

export const BreadcrumbLink = ({ style, ...props }: ComponentProps<"a">) => (
  <a {...props} style={{ color: "inherit", opacity: 0.75, textDecoration: "none", ...style }} />
);

export type BreadcrumbPageProps = Omit<ComponentProps<"span">, keyof DitherTokens> & Partial<DitherTokens>;

/** The current page, underlined with dither. */
export function BreadcrumbPage({ children, style, ...props }: BreadcrumbPageProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <span role="link" aria-disabled="true" aria-current="page" {...rest} style={{ position: "relative", paddingBottom: 4, ...style }}>
      {children}
      <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={{ top: "auto", height: 2 }} />
    </span>
  );
}

/** A glyph between items; pass children to swap the default ›. */
export const BreadcrumbSeparator = ({ children, style, ...props }: ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" {...props} style={{ fontFamily: "monospace", opacity: 0.6, ...style }}>
    {children ?? "›"}
  </li>
);

export const BreadcrumbEllipsis = ({ style, ...props }: ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" {...props} style={{ fontFamily: "monospace", ...style }}>
    …
  </span>
);
