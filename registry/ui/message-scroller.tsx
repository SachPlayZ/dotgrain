"use client";

import { createContext, use, useCallback, useRef, useState, type ComponentProps, type RefObject } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

type Edge = "start" | "end";
type Ctx = {
  viewport: HTMLDivElement | null;
  setViewport: (el: HTMLDivElement | null) => void;
  edges: Record<Edge, boolean>;
  sync: () => void;
  stick: RefObject<boolean>;
  scrollTo: (edge: Edge) => void;
  tokens: Partial<DitherTokens>;
};
const ScrollerContext = createContext<Ctx | null>(null);
const useScroller = () => {
  const ctx = use(ScrollerContext);
  if (!ctx) throw new Error("MessageScroller parts must be inside <MessageScroller>");
  return ctx;
};

// Within this many pixels of an edge counts as at it, so sub-pixel scroll positions don't flicker the buttons.
const SLOP = 8;

export type MessageScrollerProps = Omit<ComponentProps<"div">, keyof DitherTokens> & Partial<DitherTokens>;

/**
 * A chat log that follows new content while you are at the bottom, and stops following once you scroll up.
 * It starts at the end. Its tokens reach the scroll buttons.
 */
export function MessageScroller({ style, ...props }: MessageScrollerProps) {
  const [tokens, rest] = splitTokens(props);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const stick = useRef(true);
  const sync = useCallback(() => {
    if (!viewport) return;
    const { scrollTop, scrollHeight, clientHeight } = viewport;
    const next = { start: scrollTop < SLOP, end: scrollHeight - scrollTop - clientHeight < SLOP };
    stick.current = next.end;
    setEdges((e) => (e.start === next.start && e.end === next.end ? e : next));
  }, [viewport]);
  const scrollTo = (edge: Edge) => {
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport?.scrollTo({ top: edge === "end" ? viewport.scrollHeight : 0, behavior: smooth ? "smooth" : "auto" });
  };
  return (
    <ScrollerContext value={{ viewport, setViewport, edges, sync, stick, scrollTo, tokens }}>
      <div {...rest} style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", minHeight: 0, overflow: "hidden", ...style }} />
    </ScrollerContext>
  );
}

/** The scrolling box. */
export function MessageScrollerViewport({ onScroll, style, ...props }: ComponentProps<"div">) {
  const { setViewport, sync } = useScroller();
  return <div {...props} ref={setViewport} onScroll={(e) => (sync(), onScroll?.(e))} style={{ height: "100%", minHeight: 0, overflowY: "auto", overscrollBehavior: "contain", ...style }} />;
}

/** The message column; when it grows (a new message, a streaming reply) the viewport follows if it was at the end. */
export function MessageScrollerContent({ style, ...props }: ComponentProps<"div">) {
  const { viewport, stick, sync } = useScroller();
  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !viewport) return;
      const follow = () => {
        if (stick.current) viewport.scrollTo({ top: viewport.scrollHeight });
        sync();
      };
      follow();
      if (typeof ResizeObserver === "undefined") return;
      const observer = new ResizeObserver(follow);
      observer.observe(el);
      return () => observer.disconnect();
    },
    [viewport, stick, sync],
  );
  return <div {...props} ref={ref} style={{ display: "flex", flexDirection: "column", gap: 32, minHeight: "100%", ...style }} />;
}

/** One message; the browser skips laying it out while it is far offscreen. */
export const MessageScrollerItem = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ flexShrink: 0, minWidth: 0, contentVisibility: "auto", containIntrinsicSize: "auto 10rem", ...style }} />
);

const srOnly = { position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" } as const;

export type MessageScrollerButtonProps = ComponentProps<"button"> & { direction?: Edge };

/** Jumps to the end (or start); it slides in only while you are away from that edge. */
export function MessageScrollerButton({ direction = "end", children, onClick, style, ...props }: MessageScrollerButtonProps) {
  const { edges, scrollTo, tokens } = useScroller();
  const { bg, fg } = useInk(tokens);
  const active = !edges[direction];
  const end = direction === "end";
  return (
    <button
      type="button"
      data-direction={direction}
      data-active={active}
      aria-hidden={!active || undefined}
      tabIndex={active ? undefined : -1}
      {...props}
      onClick={(e) => (scrollTo(direction), onClick?.(e))}
      style={{
        position: "absolute", left: "50%", [end ? "bottom" : "top"]: 16, zIndex: 1,
        transform: `translate(-50%, ${active ? "0" : end ? "100%" : "-100%"})`, opacity: active ? 1 : 0, pointerEvents: active ? undefined : "none",
        transition: "opacity 200ms ease, transform 200ms ease",
        display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, padding: 0, border: 0, background: bg, color: fg, font: "inherit", cursor: "pointer",
        ...style,
      }}
    >
      <Grain {...tokens} field="frame" params={{ border: 1, fill: 0 }} />
      <span style={{ position: "relative", fontFamily: "monospace" }}>
        {children ?? (
          <>
            <span aria-hidden="true">{end ? "↓" : "↑"}</span>
            <span style={srOnly}>{end ? "Scroll to end" : "Scroll to start"}</span>
          </>
        )}
      </span>
    </button>
  );
}

/** Scroll state and controls, for your own buttons or a "new messages" pill. Use inside <MessageScroller>. */
export function useMessageScroller() {
  const { edges, scrollTo } = useScroller();
  return { atStart: edges.start, atEnd: edges.end, scrollToStart: () => scrollTo("start"), scrollToEnd: () => scrollTo("end") };
}
