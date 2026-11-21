"use client";

import { createContext, use, type ComponentProps } from "react";
import { useRise } from "@/lib/dotgrain/grain";

type Align = "start" | "end";
const AlignContext = createContext<Align>("start");

const column = { display: "flex", flexDirection: "column", minWidth: 0 } as const;

export type MessageProps = ComponentProps<"div"> & { align?: Align };

export const MessageGroup = ({ style, ...props }: ComponentProps<"div">) => <div {...props} style={{ ...column, gap: 8, ...style }} />;

/** One turn in a conversation: avatar and content side by side; align="end" mirrors it for the sender. */
export function Message({ align = "start", style, ...props }: MessageProps) {
  return (
    <AlignContext value={align}>
      <div data-align={align} {...props} style={{ position: "relative", display: "flex", flexDirection: align === "end" ? "row-reverse" : "row", gap: 8, width: "100%", minWidth: 0, fontSize: 14, ...useRise(8), ...style }} />
    </AlignContext>
  );
}

export const MessageAvatar = ({ style, ...props }: ComponentProps<"div">) => (
  <div {...props} style={{ display: "flex", flexShrink: 0, alignSelf: "flex-end", alignItems: "center", justifyContent: "center", minWidth: 32, ...style }} />
);

/** Bubbles, attachments and markers stacked; in an end-aligned message they hug the end edge. */
export function MessageContent({ style, ...props }: ComponentProps<"div">) {
  const end = use(AlignContext) === "end";
  return <div {...props} style={{ ...column, flex: 1, alignItems: end ? "flex-end" : "flex-start", gap: 10, overflowWrap: "anywhere", ...style }} />;
}

function Meta({ style, ...props }: ComponentProps<"div">) {
  const end = use(AlignContext) === "end";
  return <div {...props} style={{ display: "flex", alignItems: "center", justifyContent: end ? "flex-end" : undefined, minWidth: 0, padding: "0 12px", fontSize: 12, fontWeight: 500, opacity: 0.7, ...style }} />;
}

export const MessageHeader = Meta;
export const MessageFooter = Meta;
