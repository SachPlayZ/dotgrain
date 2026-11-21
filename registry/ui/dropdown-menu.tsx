"use client";

import { DropdownMenu as Menu } from "radix-ui";
import { useState, type ComponentProps, type CSSProperties, type FocusEvent } from "react";
import { Grain, splitTokens, useEntered, useInk, useRise, useWash } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuPortal = Menu.Portal;
export const DropdownMenuGroup = Menu.Group;
export const DropdownMenuSub = Menu.Sub;
export const DropdownMenuRadioGroup = Menu.RadioGroup;

const panel = (bg: string, fg: string): CSSProperties => ({ position: "relative", zIndex: 50, minWidth: 192, padding: 6, background: bg, color: fg, outline: "none" });

export type DropdownMenuContentProps = Omit<ComponentProps<typeof Menu.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** The menu panel; a dithered frame materialises around it, and its tokens flow to every item inside. */
export function DropdownMenuContent({ children, sideOffset = 4, style, ...props }: DropdownMenuContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  const rise = useRise();
  return (
    <Menu.Portal>
      <Menu.Content {...rest} sideOffset={sideOffset} style={{ ...panel(bg, fg), ...rise, ...style }}>
        {/* Behind every child: the panel is a stacking context (positioned + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        <DitherProvider {...tokens}>{children}</DitherProvider>
      </Menu.Content>
    </Menu.Portal>
  );
}

export function DropdownMenuSubContent({ children, style, ...props }: ComponentProps<typeof Menu.SubContent>) {
  const { bg, fg } = useInk({});
  const entered = useEntered();
  const rise = useRise();
  return (
    <Menu.Portal>
      <Menu.SubContent {...props} style={{ ...panel(bg, fg), ...rise, ...style }}>
        <Grain field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        {children}
      </Menu.SubContent>
    </Menu.Portal>
  );
}

/** Radix focuses the highlighted item, so focus is the highlight. */
function useHighlight<E>(props: { onFocus?: (e: FocusEvent<E>) => void; onBlur?: (e: FocusEvent<E>) => void; disabled?: boolean }, inset?: boolean) {
  const { bg, fg } = useInk({});
  const [on, setOn] = useState(false);
  const [label, params] = useWash(on);
  return [{
    on,
    // Solid behind the label, dithering out after it; the label reads in the background colour on top.
    wash: <Grain mode="dither" params={params} />,
    chip: { position: "relative", display: "flex", flex: 1, alignItems: "center", padding: "0 0.25em", color: on ? bg : fg } as CSSProperties,
    mark: { ...mark, color: on ? bg : fg },
    handlers: { onFocus: (e: FocusEvent<E>) => (setOn(true), props.onFocus?.(e)), onBlur: (e: FocusEvent<E>) => (setOn(false), props.onBlur?.(e)) },
    style: { position: "relative", display: "flex", alignItems: "center", gap: 8, padding: `6px 28px 6px ${inset ? 28 : 8}px`, outline: "none", cursor: "pointer", userSelect: "none", opacity: props.disabled ? 0.5 : undefined } as CSSProperties,
  }, label] as const;
}

const mark: CSSProperties = { position: "absolute", left: 10 };

export type DropdownMenuItemProps = ComponentProps<typeof Menu.Item> & { inset?: boolean; variant?: "default" | "destructive" };

/** An action; the highlighted one sits on a dithered wash that fades out after its label. Destructive items read ✖. */
export function DropdownMenuItem({ inset, variant = "default", children, style, ...props }: DropdownMenuItemProps) {
  const [h, label] = useHighlight(props, inset || variant === "destructive");
  return (
    <Menu.Item {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      {variant === "destructive" && <span aria-hidden="true" style={h.mark}>✖</span>}
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.Item>
  );
}

export function DropdownMenuCheckboxItem({ children, style, ...props }: ComponentProps<typeof Menu.CheckboxItem>) {
  const [h, label] = useHighlight(props, true);
  return (
    <Menu.CheckboxItem {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      <Menu.ItemIndicator style={h.mark}>✓</Menu.ItemIndicator>
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({ children, style, ...props }: ComponentProps<typeof Menu.RadioItem>) {
  const [h, label] = useHighlight(props, true);
  return (
    <Menu.RadioItem {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      <Menu.ItemIndicator style={h.mark}>●</Menu.ItemIndicator>
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.RadioItem>
  );
}

export function DropdownMenuSubTrigger({ inset, children, style, ...props }: ComponentProps<typeof Menu.SubTrigger> & { inset?: boolean }) {
  const [h, label] = useHighlight(props, inset);
  return (
    <Menu.SubTrigger {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      <span ref={label} style={h.chip}>
        {children}
        <span aria-hidden="true" style={{ marginLeft: "auto", paddingLeft: 8 }}>›</span>
      </span>
    </Menu.SubTrigger>
  );
}

export const DropdownMenuLabel = ({ inset, style, ...props }: ComponentProps<typeof Menu.Label> & { inset?: boolean }) => (
  <Menu.Label {...props} style={{ padding: `6px 8px 6px ${inset ? 28 : 8}px`, fontSize: 12, opacity: 0.7, ...style }} />
);

export const DropdownMenuSeparator = ({ style, ...props }: ComponentProps<typeof Menu.Separator>) => (
  <Menu.Separator {...props} style={{ width: 0, minWidth: "100%", margin: "4px 0", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.6, ...style }}>
    {"─".repeat(80)}
  </Menu.Separator>
);

export const DropdownMenuShortcut = ({ style, ...props }: ComponentProps<"span">) => (
  <span {...props} style={{ position: "relative", marginLeft: "auto", paddingLeft: 16, fontSize: 12, opacity: 0.6, ...style }} />
);
