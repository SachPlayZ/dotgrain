"use client";

import type { ComponentProps } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { Grain, Scrim, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<DitherTokens>;

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

export type DrawerOverlayProps = Omit<ComponentProps<typeof DrawerPrimitive.Overlay>, keyof DitherTokens> & Tokens;

/** A dimmed, blurred page under a faint grey screen-door dither, easing in. */
export function DrawerOverlay({ style, ...props }: DrawerOverlayProps) {
  const [tokens, rest] = splitTokens(props);
  const entered = useEntered();
  return (
    <DrawerPrimitive.Overlay {...rest} style={{ position: "fixed", inset: 0, zIndex: 50, ...style }}>
      <Scrim {...tokens} entered={entered} />
    </DrawerPrimitive.Overlay>
  );
}

export type DrawerContentProps = Omit<ComponentProps<typeof DrawerPrimitive.Content>, keyof DitherTokens> & Tokens;

/** A Vaul bottom drawer you can drag shut by its dithered handle. */
export function DrawerContent({ children, style, ...props }: DrawerContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <DrawerPortal>
      <DrawerOverlay {...tokens} />
      <DrawerPrimitive.Content
        {...rest}
        style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50, display: "flex", flexDirection: "column", gap: 16, maxHeight: "80vh", padding: "12px 24px 24px", background: bg, color: fg, outline: "none", ...style }}
      >
        {/* Behind every child: the panel is a stacking context (fixed + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        <span aria-hidden="true" style={{ position: "relative", alignSelf: "center", width: 96, height: 8, flexShrink: 0 }}>
          <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} />
        </span>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

export const DrawerHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ display: "grid", gap: 6, ...style }} />;

export const DrawerFooter = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "grid", gap: 8, marginTop: "auto", ...style }} />
);

export const DrawerTitle = ({ style, ...props }: ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title {...props} style={{ margin: 0, fontSize: 18, fontWeight: 600, ...style }} />
);

export const DrawerDescription = ({ style, ...props }: ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description {...props} style={{ margin: 0, opacity: 0.75, ...style }} />
);
