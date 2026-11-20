"use client";

import { Spinner } from "@/registry/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 14 }}>
      <Spinner />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <Spinner size={20} /> Processing payment…
      </span>
      <Spinner size={32} />
    </div>
  );
}
