"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { useState, type ComponentProps, type CSSProperties } from "react";
import { Grain, splitTokens, useDataAttr, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type NavigationMenuProps = Omit<ComponentProps<typeof NavigationMenuPrimitive.Root>, keyof DitherTokens> &
  Partial<DitherTokens> & {
    /** Render the shared viewport that hosts every item's content (shadcn's default). */
    viewport?: boolean;
  };

/** The menu bar; its tokens reach every part, and open content shows in one dither-framed viewport. */
export function NavigationMenu({ viewport = true, children, style, ...props }: NavigationMenuProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <NavigationMenuPrimitive.Root {...rest} style={{ position: "relative", display: "flex", ...style }}>
      <DitherProvider {...tokens}>
        {children}
        {viewport && <NavigationMenuViewport />}
      </DitherProvider>
    </NavigationMenuPrimitive.Root>
  );
}

export const NavigationMenuList = ({ style, ...props }: ComponentProps<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List {...props} style={{ display: "flex", alignItems: "center", gap: 4, margin: 0, padding: 0, listStyle: "none", ...style }} />
);

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

/** Style for a top-level link that should look like a trigger: `<NavigationMenuLink style={navigationMenuTriggerStyle()}>`. */
export const navigationMenuTriggerStyle = (): CSSProperties => ({ position: "relative", display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", border: 0, background: "transparent", color: "inherit", font: "inherit", fontSize: 14, textDecoration: "none", cursor: "pointer" });

/** Opens an item's content; a dithered underline fills while it is open. */
export function NavigationMenuTrigger({ children, style, ref, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const { bg, fg } = useInk({});
  const [state, own] = useDataAttr<HTMLButtonElement>("data-state", ref);
  const open = state === "open";
  return (
    <NavigationMenuPrimitive.Trigger {...props} ref={own} style={{ ...navigationMenuTriggerStyle(), background: bg, color: fg, ...style }}>
      {children}
      <span aria-hidden="true" style={{ fontFamily: "monospace" }}>{open ? "▴" : "▾"}</span>
      <Grain params={{ value: open ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 3 }} />
    </NavigationMenuPrimitive.Trigger>
  );
}

export const NavigationMenuContent = ({ style, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Content>) => (
  <NavigationMenuPrimitive.Content {...props} style={{ position: "absolute", top: 0, left: 0, padding: 12, ...style }} />
);

/** Hosts open content under the bar inside a dithered frame, sized by Radix to the active content. */
export function NavigationMenuViewport({ style, ref, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  const { bg, fg } = useInk({});
  // Radix mounts the viewport only while a panel is open; draw the frame only then.
  const [shown, own] = useDataAttr<HTMLDivElement>("data-state", ref);
  return (
    // The wrapper paints the panel and is the stacking context, so the frame (-1) sits between it and the content.
    <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, marginTop: 6, background: bg, color: fg }}>
      {shown === "open" && <Grain field="frame" params={{ border: 2, fill: 0 }} style={{ zIndex: -1 }} />}
      <NavigationMenuPrimitive.Viewport
        {...props}
        ref={own}
        style={{ position: "relative", overflow: "hidden", width: "var(--radix-navigation-menu-viewport-width)", height: "var(--radix-navigation-menu-viewport-height)", ...style }}
      />
    </div>
  );
}

/** A link; hovering or focusing it dithers a wash behind a solid chip. */
export function NavigationMenuLink({ children, style, onPointerEnter, onPointerLeave, onFocus, onBlur, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  const { bg, fg } = useInk({});
  const [on, setOn] = useState(false);
  const enter = () => setOn(true);
  const leave = () => setOn(false);
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      onPointerEnter={(e) => (enter(), onPointerEnter?.(e))}
      onPointerLeave={(e) => (leave(), onPointerLeave?.(e))}
      onFocus={(e) => (enter(), onFocus?.(e))}
      onBlur={(e) => (leave(), onBlur?.(e))}
      style={{ position: "relative", display: "block", padding: 8, color: fg, textDecoration: "none", outline: "none", ...style }}
    >
      <Grain params={{ value: on ? 0.9 : -0.5, softness: 0.35 }} />
      <span style={{ position: "relative", display: "block", padding: "0 0.25em", background: on ? fg : bg, color: on ? bg : fg }}>{children}</span>
    </NavigationMenuPrimitive.Link>
  );
}

export const NavigationMenuIndicator = NavigationMenuPrimitive.Indicator;
