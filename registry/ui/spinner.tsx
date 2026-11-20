"use client";

import { Loader, type LoaderProps } from "@/components/ui/loader";
import { useDitherTokens } from "@/lib/dotgrain/provider";

export type SpinnerProps = LoaderProps;

/** shadcn's name for a small inline Loader: a dithered ring, announced as "Loading". */
export function Spinner({ size = 16, style, ...props }: SpinnerProps) {
  // A ring needs about 8 cells across to read, so small spinners use finer cells than the provider's.
  const cell = Math.min(useDitherTokens({ cell: props.cell }).cell, Math.max(1, Math.floor(size / 8)));
  return <Loader size={size} {...props} cell={cell} style={{ verticalAlign: "middle", ...style }} />;
}
