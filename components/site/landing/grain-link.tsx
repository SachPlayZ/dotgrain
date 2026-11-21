"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";
import { Grain, useInk } from "@/lib/dotgrain/grain";

// Button's fill levels (rest, hover), on a real link: these CTAs navigate, so they must be <a>.
const FILL = { solid: [0.8, 1.6], outline: [-0.5, 0.6] };

export function GrainLink({ variant = "solid", children, className = "", ...props }: ComponentProps<typeof Link> & { variant?: "solid" | "outline" }) {
  const [hover, setHover] = useState(0);
  const { bg, fg } = useInk({});
  const solid = variant === "solid";
  return (
    <Link
      {...props}
      onPointerEnter={() => setHover(1)}
      onPointerLeave={() => setHover(0)}
      onFocus={() => setHover(1)}
      onBlur={() => setHover(0)}
      className={`relative inline-flex items-center px-6 py-3 font-mono text-sm uppercase tracking-widest ${className}`}
      style={{ border: `1px solid ${fg}`, background: bg }}
    >
      <Grain params={{ value: FILL[variant][hover], softness: 0.5 }} />
      <span className="relative px-1" style={{ background: solid ? fg : bg, color: solid ? bg : fg }}>
        {children}
      </span>
    </Link>
  );
}
