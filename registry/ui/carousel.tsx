"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { createContext, use, useCallback, useEffect, useState, type ComponentProps, type KeyboardEvent } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { DitherProvider } from "@/lib/dotgrain/provider";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type CarouselApi = UseEmblaCarouselType[1];
type Options = Parameters<typeof useEmblaCarousel>[0];
type Plugins = Parameters<typeof useEmblaCarousel>[1];

type State = { ref: UseEmblaCarouselType[0]; api: CarouselApi; vertical: boolean; canPrev: boolean; canNext: boolean };
const CarouselContext = createContext<State | null>(null);

/** The nearest Carousel's Embla API and scroll state. */
export function useCarousel(): State {
  const value = use(CarouselContext);
  if (!value) throw new Error("useCarousel must be used inside a Carousel.");
  return value;
}

export type CarouselProps = Omit<ComponentProps<"div">, keyof DitherTokens> &
  Partial<DitherTokens> & { opts?: Options; plugins?: Plugins; orientation?: "horizontal" | "vertical"; setApi?: (api: CarouselApi) => void };

/** An Embla carousel; a dithered rule underneath fills as you scroll through it. Arrow keys move between slides. */
export function Carousel({ opts, plugins, orientation = "horizontal", setApi, children, style, onKeyDownCapture, ...props }: CarouselProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const vertical = orientation === "vertical";
  const [ref, api] = useEmblaCarousel({ ...opts, axis: vertical ? "y" : "x" }, plugins);
  const [state, setState] = useState({ canPrev: false, canNext: false, progress: 0 });
  const read = useCallback((a: NonNullable<CarouselApi>) => setState({ canPrev: a.canScrollPrev(), canNext: a.canScrollNext(), progress: a.scrollProgress() }), []);
  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    // Embla is already initialised here, so take the first reading on the next frame.
    const id = requestAnimationFrame(() => read(api));
    api.on("reInit", read).on("select", read).on("scroll", read);
    return () => (cancelAnimationFrame(id), void api.off("reInit", read).off("select", read).off("scroll", read));
  }, [api, setApi, read]);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const [back, forward] = vertical ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    if (e.key === back) (e.preventDefault(), api?.scrollPrev());
    if (e.key === forward) (e.preventDefault(), api?.scrollNext());
    onKeyDownCapture?.(e);
  };
  return (
    <CarouselContext value={{ ref, api, vertical, canPrev: state.canPrev, canNext: state.canNext }}>
      <div role="region" aria-roledescription="carousel" {...rest} onKeyDownCapture={onKey} style={{ position: "relative", paddingBottom: 10, background: bg, color: fg, ...style }}>
        <DitherProvider {...tokens}>{children}</DitherProvider>
        {/* A stub at the first slide, full at the last; softness keeps the leading edge dithered. */}
        <Grain {...tokens} params={{ value: 0.15 + state.progress * 0.95, softness: 0.1 }} style={{ top: "auto", height: 3 }} />
      </div>
    </CarouselContext>
  );
}

export function CarouselContent({ style, ...props }: ComponentProps<"div">) {
  const { ref, vertical } = useCarousel();
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <div {...props} style={{ display: "flex", flexDirection: vertical ? "column" : "row", ...(vertical ? { marginTop: -16 } : { marginLeft: -16 }), ...style }} />
    </div>
  );
}

/** One slide; set `flexBasis` (e.g. "50%") to show several at once. */
export function CarouselItem({ style, ...props }: ComponentProps<"div">) {
  const { vertical } = useCarousel();
  return <div role="group" aria-roledescription="slide" {...props} style={{ minWidth: 0, flexShrink: 0, flexGrow: 0, flexBasis: "100%", ...(vertical ? { paddingTop: 16 } : { paddingLeft: 16 }), ...style }} />;
}

function Arrow({ prev, style, onClick, ...props }: ButtonProps & { prev: boolean }) {
  const { api, vertical, canPrev, canNext } = useCarousel();
  const side = vertical ? { left: "50%", translate: "-50% 0", [prev ? "top" : "bottom"]: -44 } : { top: "50%", translate: "0 -50%", [prev ? "left" : "right"]: -48 };
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={prev ? "Previous slide" : "Next slide"}
      disabled={prev ? !canPrev : !canNext}
      {...props}
      onClick={(e) => (prev ? api?.scrollPrev() : api?.scrollNext(), onClick?.(e))}
      style={{ position: "absolute", width: 32, height: 32, padding: 0, fontFamily: "monospace", ...side, ...style }}
    >
      {vertical ? (prev ? "↑" : "↓") : prev ? "←" : "→"}
    </Button>
  );
}

export const CarouselPrevious = (props: ButtonProps) => <Arrow prev {...props} />;
export const CarouselNext = (props: ButtonProps) => <Arrow prev={false} {...props} />;
