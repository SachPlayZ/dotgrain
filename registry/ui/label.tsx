"use client";

import { Label as LabelPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

/** A Radix label: real text, no canvas, so it pairs with any dotgrain control. */
export function Label({ style, ...props }: LabelProps) {
  return <LabelPrimitive.Root {...props} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, lineHeight: 1, userSelect: "none", ...style }} />;
}
