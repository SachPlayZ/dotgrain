"use client";

import { Badge } from "@/registry/ui/badge";

export default function BadgeDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
