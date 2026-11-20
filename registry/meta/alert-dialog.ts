import type { ComponentMeta } from "./types.ts";

export default {
  name: "alert-dialog",
  title: "Alert Dialog",
  description: "A Radix confirmation dialog with a heavy dithered frame and dithered buttons.",
  category: "overlay",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/alert-dialog.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "open", "type": "boolean", "description": "Controlled open state."},
    {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Called when it opens or closes."},
  ],
  example: {"props": {}, "code": "import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from \"@/components/ui/alert-dialog\";\n\n<AlertDialog>\n  <AlertDialogTrigger>Delete</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete this palette?</AlertDialogTitle>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
