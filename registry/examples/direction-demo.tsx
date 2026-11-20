"use client";

import { DirectionProvider } from "@/registry/ui/direction";
import { Slider } from "@/registry/ui/slider";

export default function DirectionDemo() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" style={{ display: "grid", gap: 16, width: "min(320px, 100%)", fontSize: 14 }}>
        <span>Right to left: the range fills from the right.</span>
        <Slider defaultValue={[35]} aria-label="Volume" />
      </div>
    </DirectionProvider>
  );
}
