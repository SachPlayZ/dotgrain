"use client";

import { Marker, MarkerContent, MarkerIcon } from "@/registry/ui/marker";

export default function MarkerDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: "min(400px, 100%)" }}>
      <Marker>
        <MarkerIcon>✎</MarkerIcon>
        <MarkerContent>Ada edited the brief</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>◷</MarkerIcon>
        <MarkerContent>Thought for 12 seconds</MarkerContent>
      </Marker>
    </div>
  );
}
