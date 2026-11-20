"use client";

import { createContext, use, useEffect, useId, useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

type SidebarState = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void; id: string };
const SidebarContext = createContext<SidebarState | null>(null);

/** Open state and toggle for the nearest SidebarProvider. */
export function useSidebar(): SidebarState {
  const value = use(SidebarContext);
  if (!value) throw new Error("useSidebar must be used inside a SidebarProvider.");
  return value;
}

export type SidebarProviderProps = ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void };

/** Holds the open state, toggles it on ⌘B / Ctrl+B, and lays the sidebar beside the inset. */
export function SidebarProvider({ defaultOpen = true, open: controlled, onOpenChange, style, ...props }: SidebarProviderProps) {
  const [own, setOwn] = useState(defaultOpen);
  const open = controlled ?? own;
  const setOpen = (next: boolean) => (setOwn(next), onOpenChange?.(next));
  const toggle = () => setOpen(!open);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) (e.preventDefault(), toggle());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <SidebarContext value={{ open, setOpen, toggle, id: useId() }}>
      <div {...props} style={{ display: "flex", width: "100%", minHeight: "100svh", ...style }} />
    </SidebarContext>
  );
}

export type SidebarProps = Omit<ComponentProps<"div">, keyof DitherTokens> &
  Partial<DitherTokens> & {
    side?: "left" | "right";
    /** offcanvas slides away when closed; none is always shown. */
    collapsible?: "offcanvas" | "none";
    /** Width when open, any CSS length. */
    width?: string;
  };

/** The panel, edged by a dithered rail; its tokens reach every part inside. */
export function Sidebar({ side = "left", collapsible = "offcanvas", width = "16rem", children, style, ...props }: SidebarProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const { open, id } = useSidebar();
  const shown = open || collapsible === "none";
  return (
    <div
      id={id}
      data-state={shown ? "expanded" : "collapsed"}
      inert={!shown}
      {...rest}
      style={{ position: "sticky", top: 0, order: side === "right" ? 1 : 0, flexShrink: 0, width: shown ? width : 0, maxHeight: "100svh", overflow: "hidden", transition: "width 200ms ease", background: bg, color: fg, ...style }}
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", width, height: "100%" }}>
        <Grain {...tokens} params={{ value: 1.6, softness: 0.5 }} style={side === "left" ? { left: "auto", width: 3 } : { right: "auto", width: 3 }} />
        <DitherProvider {...tokens}>{children}</DitherProvider>
      </div>
    </div>
  );
}

/** Toggles the sidebar; announces whether it is expanded. */
export function SidebarTrigger({ onClick, style, children, ...props }: ComponentProps<"button">) {
  const { open, toggle, id } = useSidebar();
  const { bg, fg } = useInk({});
  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      aria-expanded={open}
      aria-controls={id}
      {...props}
      onClick={(e) => (toggle(), onClick?.(e))}
      style={{ padding: "4px 8px", border: `1px solid ${fg}`, background: bg, color: fg, font: "inherit", fontFamily: "monospace", cursor: "pointer", ...style }}
    >
      {children ?? "☰"}
    </button>
  );
}

export const SidebarInset = ({ style, ...props }: ComponentProps<"main">) => <main {...props} style={{ flex: 1, minWidth: 0, ...style }} />;

const column = (gap: number) => ({ display: "flex", flexDirection: "column", gap, padding: 8 }) as const;

export const SidebarHeader = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column(8), ...style }} />;
export const SidebarFooter = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column(8), ...style }} />;
export const SidebarContent = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column(8), flex: 1, minHeight: 0, overflowY: "auto", ...style }} />;
export const SidebarGroup = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column(4), padding: 0, ...style }} />;
export const SidebarGroupLabel = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ padding: "0 8px", fontSize: 12, opacity: 0.7, ...style }} />;
export const SidebarGroupContent = (props: ComponentProps<"div">) => <div {...props} />;
export const SidebarMenu = ({ style, ...props }: ComponentProps<"ul">) => <ul {...props} style={{ ...column(2), padding: 0, margin: 0, listStyle: "none", ...style }} />;
export const SidebarMenuItem = ({ style, ...props }: ComponentProps<"li">) => <li {...props} style={{ position: "relative", ...style }} />;

export type SidebarMenuButtonProps = Omit<ComponentProps<"button"> & ComponentProps<"a">, keyof DitherTokens> & Partial<DitherTokens> & { isActive?: boolean; href?: string };

/** A nav entry: a link when given `href`, else a button. Active is dithered full; hover hints. */
export function SidebarMenuButton({ isActive, href, children, style, onPointerEnter, onPointerLeave, ...props }: SidebarMenuButtonProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const [hover, setHover] = useState(false);
  // Both tags take the same props here; typing as "a" avoids a ref-union mismatch.
  const Tag = (href ? "a" : "button") as "a";
  return (
    <Tag
      {...(rest as ComponentProps<"a">)}
      href={href}
      aria-current={isActive ? "page" : undefined}
      onPointerEnter={(e: React.PointerEvent<never>) => (setHover(true), onPointerEnter?.(e))}
      onPointerLeave={(e: React.PointerEvent<never>) => (setHover(false), onPointerLeave?.(e))}
      style={{ position: "relative", display: "flex", width: "100%", alignItems: "center", gap: 8, padding: "6px 28px 6px 8px", border: 0, background: bg, color: fg, font: "inherit", fontSize: 14, textAlign: "left", textDecoration: "none", cursor: "pointer", ...style }}
    >
      <Grain {...tokens} params={{ value: isActive ? 0.9 : hover ? 0.2 : -0.5, softness: 0.35 }} />
      <span style={{ position: "relative", display: "flex", flex: 1, alignItems: "center", gap: 8, padding: "0 0.25em", background: isActive ? fg : bg, color: isActive ? bg : fg }}>{children}</span>
    </Tag>
  );
}

export const SidebarMenuBadge = ({ style, ...props }: ComponentProps<"span">) => (
  <span {...props} style={{ position: "absolute", right: 8, top: "50%", translate: "0 -50%", fontSize: 12, fontVariantNumeric: "tabular-nums", pointerEvents: "none", ...style }} />
);

export const SidebarSeparator = ({ style, ...props }: ComponentProps<"div">) => (
  <div role="separator" {...props} style={{ width: 0, minWidth: "100%", overflow: "hidden", whiteSpace: "nowrap", opacity: 0.6, ...style }}>
    {"─".repeat(80)}
  </div>
);
