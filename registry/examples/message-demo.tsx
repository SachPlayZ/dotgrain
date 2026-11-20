"use client";

import { Avatar, AvatarFallback } from "@/registry/ui/avatar";
import { Bubble, BubbleContent } from "@/registry/ui/bubble";
import { Marker, MarkerContent } from "@/registry/ui/marker";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/registry/ui/message";

export default function MessageDemo() {
  return (
    <MessageGroup style={{ width: "min(460px, 100%)", gap: 16 }}>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Ada</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Shipped the overlays batch. Want a look?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>On it. The scrim reads much calmer now.</BubbleContent>
          </Bubble>
          <MessageFooter>Read 09:41</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
