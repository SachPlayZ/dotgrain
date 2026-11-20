"use client";

import { Group, Panel, Separator, useParentGroup } from "react-resizable-panels";
import type { ComponentProps } from "react";
import { Grain, splitTokens, useDataAttr, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type ResizablePanelGroupProps = Omit<ComponentProps<typeof Group>, keyof DitherTokens> & Partial<DitherTokens>;

/** Panels split by draggable handles; its tokens reach every handle. */
export function ResizablePanelGroup({ children, style, ...props }: ResizablePanelGroupProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  return (
    <Group {...rest} style={{ background: bg, color: fg, ...style }}>
      <DitherProvider {...tokens}>{children}</DitherProvider>
    </Group>
  );
}

export const ResizablePanel = Panel;

export type ResizableHandleProps = ComponentProps<typeof Separator> & {
  /** Show a grip glyph in the middle of the handle. */
  withHandle?: boolean;
};

/** The draggable divider: a thin dithered line that thickens while hovered, focused or dragged. */
export function ResizableHandle({ withHandle, elementRef, style, ...props }: ResizableHandleProps) {
  const { bg, fg } = useInk({});
  const [state, own] = useDataAttr<HTMLDivElement>("data-separator", elementRef);
  // Side-by-side panels (a horizontal group) are split by a vertical line.
  const vertical = useParentGroup()?.orientation !== "vertical";
  const live = state === "hover" || state === "active" || state === "focus";
  return (
    <Separator
      {...props}
      elementRef={own}
      style={{ position: "relative", display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center", outline: "none", ...(vertical ? { width: 9 } : { height: 9 }), ...style }}
    >
      <Grain
        field="frame"
        params={{ border: 0, fill: live ? 1 : 0.6 }}
        style={vertical ? { left: live ? 3 : 4, width: live ? 3 : 1 } : { top: live ? 3 : 4, height: live ? 3 : 1 }}
      />
      {withHandle && (
        <span aria-hidden="true" style={{ position: "relative", padding: "2px 0", background: bg, color: fg, fontFamily: "monospace", fontSize: 12, lineHeight: 1 }}>
          {vertical ? "⋮" : "⋯"}
        </span>
      )}
    </Separator>
  );
}
