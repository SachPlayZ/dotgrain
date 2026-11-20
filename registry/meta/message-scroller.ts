import type { ComponentMeta } from "./types.ts";

export default {
  name: "message-scroller",
  title: "Message Scroller",
  description: "A chat log that follows new messages at the bottom, with a dithered jump-to-end button.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/message-scroller.tsx"],
  props: [
    {"name": "direction", "type": "\"end\" | \"start\"", "description": "MessageScrollerButton: the edge it jumps to; it shows only while you are away from it.", "default": "\"end\""},
  ],
  example: {"props": {}, "code": "import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerViewport } from \"@/components/ui/message-scroller\";\n\n<MessageScroller>\n  <MessageScrollerViewport>\n    <MessageScrollerContent>\n      {messages.map((m) => <MessageScrollerItem key={m.id}>…</MessageScrollerItem>)}\n    </MessageScrollerContent>\n  </MessageScrollerViewport>\n  <MessageScrollerButton />\n</MessageScroller>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
