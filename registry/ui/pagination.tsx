"use client";

import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const Pagination = ({ style, ...props }: ComponentProps<"nav">) => (
  <nav aria-label="pagination" {...props} style={{ display: "flex", justifyContent: "center", ...style }} />
);

export const PaginationContent = ({ style, ...props }: ComponentProps<"ul">) => (
  <ul {...props} style={{ display: "flex", alignItems: "center", gap: 4, margin: 0, padding: 0, listStyle: "none", ...style }} />
);

export const PaginationItem = (props: ComponentProps<"li">) => <li {...props} />;

export type PaginationLinkProps = Omit<ComponentProps<"a">, keyof DitherTokens> & Partial<DitherTokens> & { isActive?: boolean };

/** A page link; the current page is dithered full behind a solid chip, others hint on hover. */
export function PaginationLink({ isActive, children, style, onPointerEnter, onPointerLeave, ...props }: PaginationLinkProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [hover, setHover] = useState(false);
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      {...rest}
      onPointerEnter={(e) => (setHover(true), onPointerEnter?.(e))}
      onPointerLeave={(e) => (setHover(false), onPointerLeave?.(e))}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, minWidth: 36, height: 36, padding: "0 8px", border: `1px solid ${isActive ? fg : "transparent"}`, background: bg, color: fg, fontSize: 14, textDecoration: "none", ...style }}
    >
      <Grain {...tokens} params={{ value: isActive ? 1.6 : hover ? 0.35 : -0.5, softness: 0.5 }} />
      <span style={{ position: "relative", padding: "0 0.25em", background: isActive ? fg : bg, color: isActive ? bg : fg }}>{children}</span>
    </a>
  );
}

export const PaginationPrevious = ({ children = "Previous", ...props }: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to previous page" {...props}>
    ‹ {children}
  </PaginationLink>
);

export const PaginationNext = ({ children = "Next", ...props }: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to next page" {...props}>
    {children} ›
  </PaginationLink>
);

export const PaginationEllipsis = ({ style, ...props }: ComponentProps<"span">) => (
  <span aria-hidden="true" {...props} style={{ display: "inline-flex", width: 36, justifyContent: "center", fontFamily: "monospace", ...style }}>
    …
  </span>
);
