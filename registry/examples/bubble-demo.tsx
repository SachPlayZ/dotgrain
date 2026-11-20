"use client";

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/registry/ui/bubble";

export default function BubbleDemo() {
  return (
    <BubbleGroup style={{ width: "min(440px, 100%)", gap: 14 }}>
      <Bubble variant="muted">
        <BubbleContent>Can the hero use the synthwave palette?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, and it recolours live.</BubbleContent>
        <BubbleReactions aria-label="Reactions: fire">🔥</BubbleReactions>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline for quoted text.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>Secondary sits on a halftone mat.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Message failed to send.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
