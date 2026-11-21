"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/dotgrain/provider";

/** True once the element has scrolled into view; stays true. */
export function useSeen(): [(el: Element | null) => (() => void) | undefined, boolean] {
  const [seen, setSeen] = useState(false);
  const ref = useCallback((el: Element | null) => {
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return void setSeen(true);
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && (setSeen(true), observer.disconnect()), { rootMargin: "0px 0px -12% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, seen];
}

/** Rises and unblurs into place the first time it scrolls into view (CSS in global.css; instant under reduced motion). */
export function Reveal({ delay = 0, className = "", style, children }: { delay?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const [ref, seen] = useSeen();
  return (
    <div ref={ref} data-seen={seen} className={`dg-reveal ${className}`} style={{ "--d": `${delay}ms`, ...style } as CSSProperties}>
      {children}
    </div>
  );
}

/** A counter that ticks every `ms`, for demo data that keeps moving. Frozen at 0 under reduced motion. */
export function useTick(ms: number): number {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => !document.hidden && setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms, reduced]);
  return reduced ? 0 : tick;
}
