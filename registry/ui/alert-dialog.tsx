"use client";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useEntered, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Tokens = Partial<DitherTokens>;

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export type AlertDialogOverlayProps = Omit<ComponentProps<typeof AlertDialogPrimitive.Overlay>, keyof DitherTokens> & Tokens;

/** A screen-door scrim: an ordered-dither level that eases in over the page. */
export function AlertDialogOverlay({ style, ...props }: AlertDialogOverlayProps) {
  const [tokens, rest] = splitTokens(props);
  const entered = useEntered();
  return (
    <AlertDialogPrimitive.Overlay {...rest} style={{ position: "fixed", inset: 0, zIndex: 50, ...style }}>
      <Grain {...tokens} mode="dither" field="frame" params={{ border: 0, fill: entered ? 0.45 : 0 }} style={{ opacity: 0.9 }} />
    </AlertDialogPrimitive.Overlay>
  );
}

export type AlertDialogContentProps = Omit<ComponentProps<typeof AlertDialogPrimitive.Content>, keyof DitherTokens> & Tokens;

/** The confirmation panel; a heavier frame than Dialog, and no close button: the user must choose. */
export function AlertDialogContent({ children, style, ...props }: AlertDialogContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay {...tokens} />
      <AlertDialogPrimitive.Content
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
          maxWidth: 440,
          padding: 24,
          background: bg,
          color: fg,
          outline: "none",
          ...style,
        }}
      >
        {/* Behind every child: the panel is a stacking context (fixed + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 3, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

export const AlertDialogHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ display: "grid", gap: 6, ...style }} />;

export const AlertDialogFooter = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, ...style }} />
);

export const AlertDialogTitle = ({ style, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title {...props} style={{ margin: 0, fontSize: 18, fontWeight: 600, ...style }} />
);

export const AlertDialogDescription = ({ style, ...props }: ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description {...props} style={{ margin: 0, opacity: 0.75, ...style }} />
);

type ChoiceProps = Omit<ComponentProps<typeof AlertDialogPrimitive.Action>, keyof DitherTokens> & Tokens;

/** A button face like dotgrain's Button: a dithered fill that reaches further on hover, behind a solid label chip. */
function choice(Part: typeof AlertDialogPrimitive.Action, solid: boolean) {
  return function Choice({ children, style, onPointerEnter, onPointerLeave, ...props }: ChoiceProps) {
    const [tokens, rest] = splitTokens(props);
    const { bg, fg } = useInk(tokens);
    const [hover, setHover] = useState(false);
    const fill = solid ? (hover ? 1.6 : 0.8) : hover ? 0.6 : -0.5;
    return (
      <Part
        {...rest}
        onPointerEnter={(e) => (setHover(true), onPointerEnter?.(e))}
        onPointerLeave={(e) => (setHover(false), onPointerLeave?.(e))}
        style={{ position: "relative", padding: "8px 16px", border: `1px solid ${fg}`, background: bg, color: fg, font: "inherit", fontSize: 14, lineHeight: 1.2, cursor: "pointer", ...style }}
      >
        <Grain {...tokens} params={{ value: fill, softness: 0.5 }} />
        <span style={{ position: "relative", padding: "0 0.25em", background: solid ? fg : bg, color: solid ? bg : fg }}>{children}</span>
      </Part>
    );
  };
}

/** Confirms; a solid dithered button. */
export const AlertDialogAction = choice(AlertDialogPrimitive.Action, true);

/** Dismisses; an outline dithered button, focused first by Radix. */
export const AlertDialogCancel = choice(AlertDialogPrimitive.Cancel, false);
