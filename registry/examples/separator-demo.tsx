"use client";

import { Separator } from "@/registry/ui/separator";

export default function SeparatorDemo() {
  return (
    <div style={{ width: "min(320px, 100%)", fontSize: 14 }}>
      <div style={{ fontWeight: 500 }}>dotgrain</div>
      <div style={{ opacity: 0.75 }}>Components drawn in dither and glyphs.</div>
      <Separator style={{ margin: "12px 0" }} />
      <div style={{ display: "flex", gap: 12, height: 20, alignItems: "center" }}>
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Blog</span>
      </div>
    </div>
  );
}
