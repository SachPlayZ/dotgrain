import type { ComponentMeta } from "./types.ts";

export default {
  name: "input-otp",
  title: "Input OTP",
  description: "A one-time-code input drawn as slots whose active underline dithers full.",
  category: "form",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/input-otp.tsx"],
  dependencies: ["input-otp"],
  props: [
    {"name": "maxLength", "type": "number", "description": "Number of characters."},
    {"name": "value", "type": "string", "description": "Controlled value."},
    {"name": "onChange", "type": "(value: string) => void", "description": "Called with the new value."},
    {"name": "index", "type": "number", "description": "InputOTPSlot: which character the slot shows."},
  ],
  example: {"props": {}, "code": "import { InputOTP, InputOTPGroup, InputOTPSlot } from \"@/components/ui/input-otp\";\n\n<InputOTP maxLength={4}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n    <InputOTPSlot index={3} />\n  </InputOTPGroup>\n</InputOTP>"},
  knobs: [
    "mode",
    "pattern",
    "palette",
    "cell",
  ],
} satisfies ComponentMeta;
