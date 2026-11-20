import type { ComponentMeta } from "./types.ts";

export default {
  name: "message",
  title: "Message",
  description: "Layout for one chat turn: avatar, header, bubbles and footer, mirrored for the sender.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/message.tsx"],
  props: [
    {"name": "align", "type": "\"start\" | \"end\"", "description": "Message: end mirrors it and pushes content to the end edge.", "default": "\"start\""},
  ],
  example: {"props": {}, "code": "import { Message, MessageContent, MessageHeader } from \"@/components/ui/message\";\n\n<Message align=\"end\">\n  <MessageContent>\n    <MessageHeader>You</MessageHeader>\n    …\n  </MessageContent>\n</Message>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
