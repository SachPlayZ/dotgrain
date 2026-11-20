"use client";

import { ScrollArea } from "@/registry/ui/scroll-area";
import { Separator } from "@/registry/ui/separator";

const tags = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea type="always" style={{ width: 200, height: 220 }}>
      <div style={{ padding: 12, fontSize: 14 }}>
        <div style={{ marginBottom: 12, fontWeight: 500 }}>Tags</div>
        {tags.map((t) => (
          <div key={t}>
            {t}
            <Separator style={{ margin: "6px 0" }} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
