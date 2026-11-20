"use client";

import { AspectRatio } from "@/registry/ui/aspect-ratio";
import { DitherImage } from "@/registry/ui/dither-image";

export default function AspectRatioDemo() {
  return (
    <div style={{ width: "min(420px, 100%)" }}>
      <AspectRatio ratio={16 / 9}>
        <DitherImage src="/examples/landscape.svg" alt="A sun setting behind mountains over the sea" style={{ width: "100%", height: "100%" }} />
      </AspectRatio>
    </div>
  );
}
