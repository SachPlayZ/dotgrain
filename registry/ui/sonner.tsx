"use client";

import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { useColorScheme } from "@/lib/dotgrain/provider";
import type { DitherTokens, FieldName } from "@/lib/dotgrain/types";

export type ToasterProps = Omit<ComponentProps<typeof Sonner>, keyof DitherTokens> & Partial<DitherTokens>;

/** A small dithered tile per toast type: rings fill for success, a spinner while loading. */
function Mark({ field, params, tokens }: { field: FieldName; params?: Record<string, number>; tokens: Partial<DitherTokens> }) {
  return (
    <span aria-hidden="true" style={{ position: "relative", display: "block", width: 16, height: 16 }}>
      <Grain {...tokens} mode="dither" field={field} params={params} />
    </span>
  );
}

/** Sonner's toaster in palette colours with dithered status marks. Call `toast()` from "sonner" as usual. */
export function Toaster({ toastOptions, style, ...props }: ToasterProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <Sonner
      theme={useColorScheme().scheme}
      icons={{
        success: <Mark tokens={tokens} field="radial" params={{ radius: 0.7 }} />,
        info: <Mark tokens={tokens} field="frame" params={{ border: 1, fill: 0.5 }} />,
        warning: <Mark tokens={tokens} field="linear" params={{ angle: 45 }} />,
        error: <Mark tokens={tokens} field="frame" params={{ border: 0, fill: 1 }} />,
        loading: <Mark tokens={tokens} field="spin" />,
      }}
      {...rest}
      style={style}
      toastOptions={{
        ...toastOptions,
        unstyled: true,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "var(--width)",
          padding: "12px 14px",
          background: bg,
          color: fg,
          border: `1px solid ${fg}`,
          boxShadow: `4px 4px 0 ${fg}`,
          font: "inherit",
          fontSize: 14,
          ...toastOptions?.style,
        },
      }}
    />
  );
}
