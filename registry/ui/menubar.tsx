"use client";

import { Menubar as Menu } from "radix-ui";
import { useState, type ComponentProps, type CSSProperties, type FocusEvent } from "react";
import { Grain, splitTokens, useDataAttr, useEntered, useInk, useWash } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type MenubarProps = Omit<ComponentProps<typeof Menu.Root>, keyof DitherTokens> & Partial<DitherTokens>;

/** The bar of menus, on a dithered rule; its tokens reach every menu and item inside. */
export function Menubar({ children, style, ...props }: MenubarProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <Menu.Root {...rest} style={{ position: "relative", display: "flex", alignItems: "center", gap: 2, padding: "4px 4px 6px", background: bg, color: fg, ...style }}>
      <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={{ top: "auto", height: 2 }} />
      <DitherProvider {...tokens}>{children}</DitherProvider>
    </Menu.Root>
  );
}

export const MenubarMenu = Menu.Menu;

/** A menu's button; it dithers full while its menu is open. */
export function MenubarTrigger({ children, style, ref, ...props }: ComponentProps<typeof Menu.Trigger>) {
  const { bg, fg } = useInk({});
  const [state, own] = useDataAttr<HTMLButtonElement>("data-state", ref);
  const open = state === "open";
  return (
    <Menu.Trigger {...props} ref={own} style={{ position: "relative", padding: "4px 10px", border: 0, background: bg, color: fg, font: "inherit", fontSize: 14, outline: "none", cursor: "pointer", ...style }}>
      <Grain params={{ value: open ? 1.6 : -0.5, softness: 0.5 }} />
      <span style={{ position: "relative", padding: "0 0.25em", background: open ? fg : bg, color: open ? bg : fg }}>{children}</span>
    </Menu.Trigger>
  );
}

export const MenubarPortal = Menu.Portal;
export const MenubarGroup = Menu.Group;
export const MenubarSub = Menu.Sub;
export const MenubarRadioGroup = Menu.RadioGroup;

const panel = (bg: string, fg: string): CSSProperties => ({ position: "relative", zIndex: 50, minWidth: 192, padding: 6, background: bg, color: fg, outline: "none" });

export type MenubarContentProps = Omit<ComponentProps<typeof Menu.Content>, keyof DitherTokens> & Partial<DitherTokens>;

/** A menu panel under its trigger; a dithered frame materialises around it, and its tokens flow to every item inside. */
export function MenubarContent({ children, sideOffset = 8, align = "start", style, ...props }: MenubarContentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const entered = useEntered();
  return (
    <Menu.Portal>
      <Menu.Content {...rest} sideOffset={sideOffset} align={align} style={{ ...panel(bg, fg), ...style }}>
        {/* Behind every child: the panel is a stacking context (positioned + z-index), so -1 sits above its background. */}
        <Grain {...tokens} field="frame" params={{ border: 2, fill: entered ? 0 : 1 }} style={{ zIndex: -1 }} />
        <DitherProvider {...tokens}>{children}</DitherProvider>
      </Menu.Content>
    </Menu.Portal>
  );
}

export function MenubarSubContent({ children, style, ...props }: ComponentProps<typeof Menu.SubContent>) {
  const { bg, fg } = useInk({});
  const entered = useEntered();
  return (
    <Menu.Portal>
      <Menu.SubContent {...props} style={{ ...panel(bg, fg), ...style }}>
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

export type MenubarItemProps = ComponentProps<typeof Menu.Item> & { inset?: boolean; variant?: "default" | "destructive" };

/** An action; the highlighted one sits on a dithered wash that fades out after its label. Destructive items read ✖. */
export function MenubarItem({ inset, variant = "default", children, style, ...props }: MenubarItemProps) {
  const [h, label] = useHighlight(props, inset || variant === "destructive");
  return (
    <Menu.Item {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      {variant === "destructive" && <span aria-hidden="true" style={h.mark}>✖</span>}
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.Item>
  );
}

export function MenubarCheckboxItem({ children, style, ...props }: ComponentProps<typeof Menu.CheckboxItem>) {
  const [h, label] = useHighlight(props, true);
  return (
    <Menu.CheckboxItem {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      <Menu.ItemIndicator style={h.mark}>✓</Menu.ItemIndicator>
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.CheckboxItem>
  );
}

export function MenubarRadioItem({ children, style, ...props }: ComponentProps<typeof Menu.RadioItem>) {
  const [h, label] = useHighlight(props, true);
  return (
    <Menu.RadioItem {...props} {...h.handlers} style={{ ...h.style, ...style }}>
      {h.on && h.wash}
      <Menu.ItemIndicator style={h.mark}>●</Menu.ItemIndicator>
      <span ref={label} style={h.chip}>{children}</span>
    </Menu.RadioItem>
  );
}

export function MenubarSubTrigger({ inset, children, style, ...props }: ComponentProps<typeof Menu.SubTrigger> & { inset?: boolean }) {
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

export const MenubarLabel = ({ inset, style, ...props }: ComponentProps<typeof Menu.Label> & { inset?: boolean }) => (
  <Menu.Label {...props} style={{ padding: `6px 8px 6px ${inset ? 28 : 8}px`, fontSize: 12, opacity: 0.7, ...style }} />
);

export const MenubarSeparator = ({ style, ...props }: ComponentProps<typeof Menu.Separator>) => (
  <Menu.Separator {...props} style={{ width: 0, minWidth: "100%", margin: "4px 0", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.6, ...style }}>
    {"─".repeat(80)}
  </Menu.Separator>
);

export const MenubarShortcut = ({ style, ...props }: ComponentProps<"span">) => (
  <span {...props} style={{ position: "relative", marginLeft: "auto", paddingLeft: 16, fontSize: 12, opacity: 0.6, ...style }} />
);
