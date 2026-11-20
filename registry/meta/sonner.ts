import type { ComponentMeta } from "./types.ts";

export default {
  name: "sonner",
  title: "Sonner",
  description: "Sonner toasts in palette colours with dithered status marks.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/sonner.tsx"],
  dependencies: ["sonner"],
  props: [
    {"name": "position", "type": "\"top-left\" | \"top-center\" | \"top-right\" | \"bottom-left\" | \"bottom-center\" | \"bottom-right\"", "description": "Toaster: where toasts stack.", "default": "\"bottom-right\""},
    {"name": "richColors", "type": "boolean", "description": "Toaster: Sonner's coloured types (overrides the palette)."},
    {"name": "toastOptions", "type": "ToastOptions", "description": "Toaster: defaults for every toast; `style` merges over the palette style."},
  ],
  example: {"props": {}, "code": "import { toast } from \"sonner\";\nimport { Toaster } from \"@/components/ui/sonner\";\n\n// once, in your root layout\n<Toaster />\n\n// anywhere\ntoast.success(\"Palette saved\");"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
