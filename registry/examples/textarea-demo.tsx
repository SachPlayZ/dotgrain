"use client";

import { Textarea } from "@/registry/ui/textarea";

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message" aria-label="Message" style={{ maxWidth: 360 }} />;
}
