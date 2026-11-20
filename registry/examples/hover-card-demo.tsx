"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger href="https://dotgrain.space" style={{ color: "inherit" }}>
        @dotgrain
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "grid", gap: 4 }}>
          <strong>@dotgrain</strong>
          <span>Every pixel on or off. React components rendered as dither or ASCII.</span>
          <span style={{ fontSize: 12, opacity: 0.7 }}>shadcn registry · MIT</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
