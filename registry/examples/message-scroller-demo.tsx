"use client";

import { useState } from "react";
import { Bubble, BubbleContent } from "@/registry/ui/bubble";
import { Button } from "@/registry/ui/button";
import { Message, MessageContent } from "@/registry/ui/message";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerViewport } from "@/registry/ui/message-scroller";

const seed = Array.from({ length: 12 }, (_, i) => `Message ${i + 1}: ${i % 2 ? "reply from the model" : "a question from you"}`);

export default function MessageScrollerDemo() {
  const [log, setLog] = useState(seed);
  return (
    <div style={{ display: "grid", gap: 12, width: "min(420px, 100%)" }}>
      <div style={{ height: 260 }}>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent style={{ gap: 12, padding: 8 }}>
              {log.map((text, i) => (
                <MessageScrollerItem key={i}>
                  <Message align={i % 2 ? "start" : "end"}>
                    <MessageContent>
                      {/* Ghost: plain text, so items far offscreen hold no canvas. */}
                      <Bubble variant="ghost">
                        <BubbleContent>{text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
      <Button size="sm" onClick={() => setLog((l) => [...l, `Message ${l.length + 1}: streamed in`])}>
        Add message
      </Button>
    </div>
  );
}
