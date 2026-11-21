"use client";

import { useEffect } from "react";
import { DitherProvider } from "@/lib/dotgrain/provider";
import { getScheduler } from "@/lib/dotgrain/scheduler";
import type { Mode, PaletteName } from "@/lib/dotgrain/types";
import { examples } from "@/registry/examples";

/** One example frozen at time 0 in a given palette and mode, for screenshots. */
export function VisualExample({ name, palette, mode }: { name: string; palette?: PaletteName; mode?: Mode }) {
  const Example = examples[name];
  // Lets the screenshot test wait for eased mount animations to finish, not just for a quiet pair of frames.
  useEffect(() => {
    (window as Window & { dgBusy?: () => boolean }).dgBusy = () => getScheduler().busy();
  }, []);
  return (
    <div id="visual" style={{ width: 800, padding: 16 }}>
      <DitherProvider palette={palette} mode={mode} speed={0} colorScheme="dark">
        <Example />
      </DitherProvider>
    </div>
  );
}
