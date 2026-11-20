"use client";

import { Input } from "@/registry/ui/input";

export default function InputDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Input placeholder="Disabled" aria-label="Disabled" disabled />
    </div>
  );
}
