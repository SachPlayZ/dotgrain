"use client";

import { createContext, use, type ComponentProps } from "react";
import { Grain, splitTokens, useInk, useRise } from "@/lib/dotgrain/grain";
import { useDitherTokens } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

type State = "idle" | "uploading" | "processing" | "error" | "done";
type Size = "default" | "sm" | "xs";
type Ctx = { state: State; size: Size; vertical: boolean; tokens: Partial<DitherTokens> };
const AttachmentContext = createContext<Ctx>({ state: "done", size: "default", vertical: false, tokens: {} });

const PAD = { default: 8, sm: 6, xs: 4 };
const MEDIA = { default: 40, sm: 32, xs: 28 };

export type AttachmentProps = Omit<ComponentProps<"div">, keyof DitherTokens> &
  Partial<DitherTokens> & { state?: State; size?: Size; orientation?: "horizontal" | "vertical" };

/**
 * A file chip in a dithered frame. idle frames it faintly, error doubles the frame, and uploading or
 * processing run a shimmer along the bottom edge.
 */
export function Attachment({ state = "done", size = "default", orientation = "horizontal", children, style, ...props }: AttachmentProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const vertical = orientation === "vertical";
  const busy = state === "uploading" || state === "processing";
  // The error frame is a cell thicker; pad by a cell so it never runs into the text.
  const { cell } = useDitherTokens(tokens);
  const rise = useRise();
  const pad = PAD[size] + (state === "error" ? cell : 0);
  return (
    <AttachmentContext value={{ state, size, vertical, tokens }}>
      <div
        data-state={state}
        data-size={size}
        data-orientation={orientation}
        aria-busy={busy || undefined}
        {...rest}
        style={{ position: "relative", display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "stretch" : "center", flexShrink: 0, gap: 8, width: vertical ? 120 : "fit-content", minWidth: vertical ? undefined : 160, maxWidth: "100%", padding: pad, background: bg, color: fg, fontSize: size === "default" ? 14 : 12, ...rise, ...style }}
      >
        <Grain {...tokens} field="frame" params={{ border: state === "error" ? 2 : 1, fill: 0 }} style={{ opacity: state === "idle" ? 0.5 : 1 }} />
        {busy && <Grain {...tokens} mode="dither" field="shimmer" style={{ top: "auto", height: 3 }} />}
        {children}
      </div>
    </AttachmentContext>
  );
}

export type AttachmentMediaProps = ComponentProps<"div"> & { variant?: "icon" | "image" };

/** A square tile for an icon (on a faint dither) or an image thumbnail (dimmed until the upload is done). */
export function AttachmentMedia({ variant = "icon", children, style, ...props }: AttachmentMediaProps) {
  const { state, size, vertical, tokens } = use(AttachmentContext);
  const side = vertical ? "100%" : MEDIA[size];
  const dim = variant === "image" && state !== "done" && state !== "idle";
  return (
    <div data-variant={variant} {...props} style={{ position: "relative", display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center", width: side, aspectRatio: "1", overflow: "hidden", opacity: dim ? 0.6 : undefined, ...style }}>
      {variant === "icon" && <Grain {...tokens} mode="dither" field="frame" params={{ border: 0, fill: 0.12 }} />}
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{children}</span>
    </div>
  );
}

const relative = { position: "relative" } as const;
const truncate = { display: "block", maxWidth: "100%", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

export const AttachmentContent = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...relative, flex: 1, minWidth: 0, lineHeight: 1.25, ...style }} />;
export const AttachmentTitle = ({ style, ...props }: ComponentProps<"span">) => <span {...props} style={{ ...relative, ...truncate, fontWeight: 500, ...style }} />;
export const AttachmentDescription = ({ style, ...props }: ComponentProps<"span">) => <span {...props} style={{ ...relative, ...truncate, marginTop: 2, fontSize: 12, opacity: 0.7, ...style }} />;

/** Buttons beside the content; in a vertical attachment they float over the media's top corner. */
export function AttachmentActions({ style, ...props }: ComponentProps<"div">) {
  const { vertical } = use(AttachmentContext);
  return <div {...props} style={{ position: vertical ? "absolute" : "relative", top: vertical ? 12 : undefined, right: vertical ? 12 : undefined, zIndex: 2, display: "flex", flexShrink: 0, alignItems: "center", gap: 4, ...style }} />;
}

/** A small ghost button, e.g. remove (✕) or retry (↻). Give it an aria-label. */
export function AttachmentAction({ style, ...props }: ComponentProps<"button">) {
  const { bg, fg } = useInk(use(AttachmentContext).tokens);
  return <button type="button" {...props} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, border: 0, background: bg, color: fg, font: "inherit", fontFamily: "monospace", cursor: "pointer", ...style }} />;
}

/** Makes the whole attachment clickable (open, preview) while actions stay on top. */
export const AttachmentTrigger = ({ style, ...props }: ComponentProps<"button">) => (
  <button type="button" {...props} style={{ position: "absolute", inset: 0, zIndex: 1, padding: 0, border: 0, background: "transparent", cursor: "pointer", ...style }} />
);

/** A row of attachments that scrolls sideways, snapping to each one. */
export const AttachmentGroup = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "flex", gap: 12, minWidth: 0, padding: "4px 0", overflowX: "auto", overscrollBehaviorX: "contain", scrollSnapType: "x mandatory", scrollbarWidth: "none", ...style }} />
);
