"use client";

import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Text style">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="center" variant="outline" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
