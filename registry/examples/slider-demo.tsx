"use client";

import { Slider } from "@/registry/ui/slider";

export default function SliderDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 360 }}>
      <Slider defaultValue={[40]} aria-label="Volume" />
      <Slider defaultValue={[20, 70]} aria-label="Price range" />
    </div>
  );
}
