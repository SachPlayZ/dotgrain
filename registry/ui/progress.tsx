"use client";

import { DitherProgress, type DitherProgressProps } from "@/components/ui/dither-progress";

export type ProgressProps = Omit<DitherProgressProps, "value"> & { value?: number | null };

/** shadcn's name for DitherProgress: a bar whose dithered edge eases to `value` (0–100). */
export function Progress({ value, label = "Progress", ...props }: ProgressProps) {
  return <DitherProgress value={value ?? 0} label={label} {...props} />;
}
