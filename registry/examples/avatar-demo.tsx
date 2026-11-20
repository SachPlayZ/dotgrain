"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";

export default function AvatarDemo() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar style={{ width: 48, height: 48 }}>
        <AvatarImage src="/examples/avatar.svg" alt="A silhouette" />
        <AvatarFallback>DG</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: 48, height: 48 }}>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
