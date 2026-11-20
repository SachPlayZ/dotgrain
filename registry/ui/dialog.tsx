"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<DitherTokens>;

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = Omit<ComponentProps<typeof DialogPrimitive.Overlay>, keyof DitherTokens> & Tokens;

/** A screen-door scrim: an ordered-dither level that eases in over the page. */
export function DialogOverlay({ style, ...props }: DialogOverlayProps) {
  const [tokens, rest] = splitTokens(props);
  const entered = useEntered();
  return (
    <DialogPrimitive.Overlay {...rest} style={{ position: "fixed", inset: 0, zIndex: 50, ...style }}>
      <Grain {...tokens} mode="dither" field="frame" params={{ border: 0, fill: entered ? 0.35 : 0 }} style={{ opacity: 0.9 }} />
    </DialogPrimitive.Overlay>
  );
}

export type DialogContentProps = Omit<ComponentProps<typeof DialogPrimitive.Content>, keyof DitherTokens> &
  Tokens & {
    /** Render the ✕ button in the corner. */
    showCloseButton?: boolean;
  };

/** The modal panel, centred over the scrim; its dithered frame materialises as it opens. */
export function DialogContent({ children, showCloseButton = true, style, ...props }: DialogContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <DialogPortal>
      <DialogOverlay {...tokens} />
      <DialogPrimitive.Content
        {...rest}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          display: "grid",
          gap: 16,
          width: "calc(100% - 32px)",
          maxWidth: 480,
          padding: 24,
          background: bg,
          color: fg,
          outline: "none",
          ...style,
        }}
      >
        {/* Behind every child: the panel is a stacking context (fixed + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close aria-label="Close" style={{ position: "absolute", top: 10, right: 12, border: 0, background: bg, color: fg, font: "inherit", cursor: "pointer" }}>
            ✕
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export const DialogHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ display: "grid", gap: 6, ...style }} />;

export const DialogFooter = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, ...style }} />
);

export const DialogTitle = ({ style, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title {...props} style={{ margin: 0, fontSize: 18, fontWeight: 600, ...style }} />
);

export const DialogDescription = ({ style, ...props }: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description {...props} style={{ margin: 0, opacity: 0.75, ...style }} />
);
