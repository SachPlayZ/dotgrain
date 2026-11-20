import type { ComponentMeta } from "./types.ts";

export default {
  name: "attachment",
  title: "Attachment",
  description: "A file chip in a dithered frame that shimmers while it uploads.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/attachment.tsx"],
  props: [
    {"name": "state", "type": "\"idle\" | \"uploading\" | \"processing\" | \"error\" | \"done\"", "description": "Attachment: faint frame, bottom shimmer, double frame, or plain.", "default": "\"done\""},
    {"name": "size", "type": "\"default\" | \"sm\" | \"xs\"", "description": "Attachment: padding, text and media size.", "default": "\"default\""},
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "Attachment: a row, or a card with the media on top.", "default": "\"horizontal\""},
    {"name": "variant", "type": "\"icon\" | \"image\"", "description": "AttachmentMedia: an icon on a faint dither, or a thumbnail dimmed until done.", "default": "\"icon\""},
  ],
  example: {"props": {}, "code": "import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from \"@/components/ui/attachment\";\n\n<Attachment state=\"uploading\">\n  <AttachmentMedia>▤</AttachmentMedia>\n  <AttachmentContent>\n    <AttachmentTitle>brief.pdf</AttachmentTitle>\n    <AttachmentDescription>Uploading…</AttachmentDescription>\n  </AttachmentContent>\n</Attachment>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
