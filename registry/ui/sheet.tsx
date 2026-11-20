"use client";

import { Dialog as SheetPrimitive } from "radix-ui";
import type { ComponentProps, CSSProperties } from "react";
import { Grain, Scrim, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<DitherTokens>;
type Side = "top" | "right" | "bottom" | "left";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

const EDGE: Record<Side, CSSProperties> = {
  top: { top: 0, left: 0, right: 0 },
  bottom: { bottom: 0, left: 0, right: 0 },
  left: { top: 0, bottom: 0, left: 0, width: "75%", maxWidth: 384 },
  right: { top: 0, bottom: 0, right: 0, width: "75%", maxWidth: 384 },
};

export type SheetOverlayProps = Omit<ComponentProps<typeof SheetPrimitive.Overlay>, keyof DitherTokens> & Tokens;

/** A dimmed, blurred page under a faint grey screen-door dither, easing in. */
export function SheetOverlay({ style, ...props }: SheetOverlayProps) {
  const [tokens, rest] = splitTokens(props);
  const entered = useEntered();
  return (
    <SheetPrimitive.Overlay {...rest} style={{ position: "fixed", inset: 0, zIndex: 50, ...style }}>
      <Scrim {...tokens} entered={entered} />
    </SheetPrimitive.Overlay>
  );
}

export type SheetContentProps = Omit<ComponentProps<typeof SheetPrimitive.Content>, keyof DitherTokens> &
  Tokens & {
    side?: Side;
    /** Render the ✕ button in the corner. */
    showCloseButton?: boolean;
  };

/** A panel docked to one edge; its dithered frame materialises as it opens. */
export function SheetContent({ side = "right", showCloseButton = true, children, style, ...props }: SheetContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <SheetPortal>
      <SheetOverlay {...tokens} />
      <SheetPrimitive.Content
        {...rest}
        style={{ position: "fixed", zIndex: 50, display: "flex", flexDirection: "column", gap: 16, padding: 24, background: bg, color: fg, outline: "none", overflowY: "auto", ...EDGE[side], ...style }}
      >
        {/* Behind every child: the panel is a stacking context (fixed + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close aria-label="Close" style={{ position: "absolute", top: 10, right: 12, border: 0, background: bg, color: fg, font: "inherit", cursor: "pointer" }}>
            ✕
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

export const SheetHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ display: "grid", gap: 6, ...style }} />;

export const SheetFooter = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "grid", gap: 8, marginTop: "auto", ...style }} />
);

export const SheetTitle = ({ style, ...props }: ComponentProps<typeof SheetPrimitive.Title>) => (
  <SheetPrimitive.Title {...props} style={{ margin: 0, fontSize: 18, fontWeight: 600, ...style }} />
);

export const SheetDescription = ({ style, ...props }: ComponentProps<typeof SheetPrimitive.Description>) => (
  <SheetPrimitive.Description {...props} style={{ margin: 0, opacity: 0.75, ...style }} />
);
