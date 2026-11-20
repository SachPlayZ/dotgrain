"use client";

import { Kbd, KbdGroup } from "@/registry/ui/kbd";

export default function KbdDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, fontSize: 14 }}>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <span>
        Press <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd> to toggle the sidebar.
      </span>
    </div>
  );
}
