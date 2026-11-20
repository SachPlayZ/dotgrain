"use client";

import { Direction } from "radix-ui";
import type { ComponentProps } from "react";

type Dir = ComponentProps<typeof Direction.DirectionProvider>["dir"];

export type DirectionProviderProps = Omit<ComponentProps<typeof Direction.DirectionProvider>, "dir"> & {
  dir?: Dir;
  /** Alias of `dir`, matching shadcn. */
  direction?: Dir;
};

/** Sets reading direction (ltr or rtl) for every Radix-based component inside, so sliders, menus and tabs flip. */
export function DirectionProvider({ dir, direction, children }: DirectionProviderProps) {
  return <Direction.DirectionProvider dir={direction ?? dir ?? "ltr"}>{children}</Direction.DirectionProvider>;
}

export const useDirection = Direction.useDirection;
