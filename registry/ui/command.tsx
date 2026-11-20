"use client";

import { Command as CommandPrimitive } from "cmdk";
import { useState, type ComponentProps } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Grain, splitTokens, useDataAttr, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type CommandProps = Omit<ComponentProps<typeof CommandPrimitive>, keyof DitherTokens> &
  Partial<DitherTokens> & {
    /** Draw the dithered frame; off when the palette already sits in a framed Dialog or Popover. */
    frame?: boolean;
  };

/** A cmdk palette in a dithered frame; its tokens reach the input and every item. */
export function Command({ frame = true, children, style, ...props }: CommandProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <CommandPrimitive {...rest} style={{ position: "relative", isolation: "isolate", display: "flex", flexDirection: "column", overflow: "hidden", padding: 4, background: bg, color: fg, ...style }}>
      {/* isolate makes this a stacking context, so the frame (-1) sits above the background and under the content. */}
      {frame && <Grain {...tokens} field="frame" params={{ border: 2, fill: 0 }} style={{ zIndex: -1 }} />}
      <DitherProvider {...tokens}>{children}</DitherProvider>
    </CommandPrimitive>
  );
}

export type CommandDialogProps = ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
};

/** The palette in a dotgrain Dialog, for ⌘K. Title and description are for screen readers. */
export function CommandDialog({ title = "Command palette", description = "Search for a command to run.", showCloseButton = false, children, ...props }: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent showCloseButton={showCloseButton} style={{ padding: 0, gap: 0, overflow: "hidden" }}>
        <DialogTitle style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{title}</DialogTitle>
        <DialogDescription style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{description}</DialogDescription>
        <Command frame={false} style={{ background: "transparent" }}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/** The search field: a › prompt and a dithered underline that fills while focused. */
export function CommandInput({ style, onFocus, onBlur, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 12px" }}>
      <span aria-hidden="true" style={{ fontFamily: "monospace" }}>›</span>
      <CommandPrimitive.Input
        {...props}
        onFocus={(e) => (setFocus(true), onFocus?.(e))}
        onBlur={(e) => (setFocus(false), onBlur?.(e))}
        style={{ flex: 1, minWidth: 0, border: 0, outline: "none", background: "transparent", color: "inherit", font: "inherit", fontSize: 14, ...style }}
      />
      <Grain params={{ value: focus ? 1.3 : 0.2, softness: 0.3 }} style={{ top: "auto", height: 3 }} />
    </div>
  );
}

export const CommandList = ({ style, ...props }: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List {...props} style={{ maxHeight: 300, overflowX: "hidden", overflowY: "auto", ...style }} />
);

export const CommandEmpty = ({ style, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty {...props} style={{ padding: "24px 0", textAlign: "center", fontSize: 14, opacity: 0.7, ...style }} />
);

export const CommandGroup = ({ style, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group {...props} style={{ padding: 4, fontSize: 14, ...style }} />
);

export const CommandSeparator = ({ style, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator {...props} style={{ width: 0, minWidth: "100%", margin: "4px 0", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.6, ...style }}>
    {"─".repeat(80)}
  </CommandPrimitive.Separator>
);

/** An option; the selected one (arrow keys or pointer) gets a solid chip with a dithered tail. */
export function CommandItem({ children, style, ref, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  const { bg, fg } = useInk({});
  const [selected, own] = useDataAttr<HTMLDivElement>("data-selected", ref);
  const on = selected === "true";
  return (
    <CommandPrimitive.Item
      {...props}
      ref={own}
      style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "6px 28px 6px 8px", cursor: "pointer", userSelect: "none", opacity: props.disabled ? 0.5 : undefined, ...style }}
    >
      {on && <Grain params={{ value: 0.9, softness: 0.35 }} />}
      <span style={{ position: "relative", display: "flex", flex: 1, alignItems: "center", gap: 8, padding: "0 0.25em", background: on ? fg : "transparent", color: on ? bg : fg }}>{children}</span>
    </CommandPrimitive.Item>
  );
}

export const CommandShortcut = ({ style, ...props }: ComponentProps<"span">) => (
  <span {...props} style={{ marginLeft: "auto", fontSize: 12, opacity: 0.6, ...style }} />
);
