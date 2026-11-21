"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import { useState, type ComponentProps } from "react";
import { Grain, splitTokens, useInk, useRise } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import { Quantize } from "@/lib/dotgrain/quantize";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type AvatarProps = Omit<ComponentProps<typeof AvatarPrimitive.Root>, keyof DitherTokens> & Partial<DitherTokens>;

/** A round avatar; its tokens reach the image and fallback inside. */
export function Avatar({ children, style, ...props }: AvatarProps) {
  const [tokens, rest] = splitTokens(props);
  return (
    <AvatarPrimitive.Root
      {...rest}
      style={{ position: "relative", display: "inline-flex", flexShrink: 0, width: 32, height: 32, overflow: "hidden", borderRadius: "50%", verticalAlign: "middle", ...style }}
    >
      <DitherProvider {...tokens}>{children}</DitherProvider>
    </AvatarPrimitive.Root>
  );
}

/** The picture, dithered once it loads; the real img stays for screen readers. Until then the fallback shows. */
export function AvatarImage({ src, onLoadingStatusChange, style, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  const [loaded, setLoaded] = useState(false);
  // If the pixels can't be read (CORS), show the plain image: content never disappears.
  const [failed, setFailed] = useState(false);
  const hidden = { position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" } as const;
  return (
    <>
      <AvatarPrimitive.Image
        {...props}
        src={src}
        onLoadingStatusChange={(s) => (setLoaded(s === "loaded"), onLoadingStatusChange?.(s))}
        style={{ ...(failed ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : hidden), ...style }}
      />
      {loaded && typeof src === "string" && !failed && <Picture src={src} crossOrigin={props.crossOrigin === "anonymous" ? "anonymous" : undefined} onError={() => setFailed(true)} />}
    </>
  );
}

// Mounted once the image has loaded, so it fades in over the fallback rather than replacing it in one frame.
function Picture({ src, crossOrigin, onError }: { src: string; crossOrigin?: "anonymous"; onError: () => void }) {
  return <Quantize source={{ kind: "image", src, crossOrigin }} onError={onError} style={{ position: "absolute", inset: 0, ...useRise(0) }} />;
}

/** Shown until the image loads (or if it fails): initials on a light dither. */
export function AvatarFallback({ children, style, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const { bg, fg } = useInk({});
  return (
    <AvatarPrimitive.Fallback
      {...props}
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: bg, color: fg, fontSize: 12, fontWeight: 600, ...style }}
    >
      <Grain field="frame" params={{ border: 0, fill: 0.3 }} />
      <span style={{ position: "relative", padding: "0 0.2em", background: bg }}>{children}</span>
    </AvatarPrimitive.Fallback>
  );
}
