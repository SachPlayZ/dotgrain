"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/ui/attachment";

export default function AttachmentDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 12, width: "min(520px, 100%)" }}>
      <Attachment>
        <AttachmentMedia>▤</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>brief.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove brief.pdf">✕</AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>!</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>clip.mov</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry clip.mov">↻</AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="idle" size="sm">
        <AttachmentMedia>+</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a file</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
      <Attachment orientation="vertical">
        <AttachmentMedia variant="image">
          {/* eslint-disable-next-line @next/next/no-img-element -- a plain thumbnail, as users would pass */}
          <img src="/examples/avatar.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>portrait.svg</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
