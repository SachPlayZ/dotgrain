"use client";

import { Toggle } from "@/registry/ui/toggle";

export default function ToggleDemo() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <Toggle defaultPressed aria-label="Toggle bold">Bold</Toggle>
      <Toggle aria-label="Toggle italic">Italic</Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">Underline</Toggle>
      <Toggle disabled aria-label="Toggle strike">Strike</Toggle>
    </div>
  );
}
