"use client";

import type { ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type TableProps = Omit<ComponentProps<"table">, keyof DitherTokens> & Partial<DitherTokens>;

/** A plain table in a scrolling wrapper; header cells sit on a dithered rule and its tokens reach every part. */
export function Table({ style, ...props }: TableProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
      <DitherProvider {...tokens}>
        <table {...rest} style={{ width: "100%", borderCollapse: "collapse", captionSide: "bottom", background: bg, color: fg, fontSize: 14, ...style }} />
      </DitherProvider>
    </div>
  );
}

export const TableHeader = (props: ComponentProps<"thead">) => <thead {...props} />;
export const TableBody = (props: ComponentProps<"tbody">) => <tbody {...props} />;

export const TableFooter = ({ style, ...props }: ComponentProps<"tfoot">) => <tfoot {...props} style={{ fontWeight: 500, ...style }} />;

// Rows separate with a faint dotted line; a canvas per row would cost too much on long tables.
export const TableRow = ({ style, ...props }: ComponentProps<"tr">) => (
  <tr {...props} style={{ borderBottom: "1px dotted color-mix(in srgb, currentColor 35%, transparent)", ...style }} />
);

const cell = { padding: "8px 10px", textAlign: "left", verticalAlign: "middle", whiteSpace: "nowrap" } as const;

/** A header cell; the dithered rule under it spans the header row cell by cell. */
export function TableHead({ children, style, ...props }: ComponentProps<"th">) {
  return (
    <th {...props} style={{ ...cell, position: "relative", height: 40, fontWeight: 500, ...style }}>
      {children}
      <Grain params={{ value: 1.6, softness: 0.5 }} style={{ top: "auto", height: 2 }} />
    </th>
  );
}

export const TableCell = ({ style, ...props }: ComponentProps<"td">) => <td {...props} style={{ ...cell, ...style }} />;

export const TableCaption = ({ style, ...props }: ComponentProps<"caption">) => <caption {...props} style={{ marginTop: 12, fontSize: 13, opacity: 0.7, ...style }} />;
