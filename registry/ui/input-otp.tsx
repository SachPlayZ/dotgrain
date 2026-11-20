"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { use, type ComponentProps } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export type InputOTPProps = ComponentProps<typeof OTPInput>;

/** A one-time-code input (input-otp): one real input, drawn as separate slots. */
export const InputOTP = OTPInput;

export function InputOTPGroup({ style, ...props }: ComponentProps<"div">) {
  return <div {...props} style={{ display: "flex", alignItems: "center", gap: 6, ...style }} />;
}

export type InputOTPSlotProps = ComponentProps<"div"> & Partial<DitherTokens> & { index: number };

/** One character slot; the active slot's underline dithers full and shows a caret. */
export function InputOTPSlot({ index, style, ...props }: InputOTPSlotProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const slot = use(OTPInputContext).slots[index];
  return (
    <div
      {...rest}
      style={{ position: "relative", display: "grid", placeItems: "center", width: 40, height: 44, paddingBottom: 4, border: `1px solid ${fg}`, background: bg, color: fg, fontSize: 18, ...style }}
    >
      {slot?.char ?? (slot?.hasFakeCaret ? <span aria-hidden="true">▏</span> : null)}
      <Grain {...tokens} params={{ value: slot?.isActive ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
    </div>
  );
}

export function InputOTPSeparator(props: ComponentProps<"div">) {
  return (
    <div role="separator" {...props}>
      ·
    </div>
  );
}
