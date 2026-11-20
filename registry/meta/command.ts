import type { ComponentMeta } from "./types.ts";

export default {
  name: "command",
  title: "Command",
  description: "A cmdk command palette in a dithered frame; the selected item gets a dithered wash.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/command.tsx"],
  registryDependencies: ["dialog"],
  dependencies: ["cmdk"],
  props: [
    {"name": "frame", "type": "boolean", "description": "Command: draw the dithered frame.", "default": "true"},
    {"name": "open", "type": "boolean", "description": "CommandDialog: controlled open state."},
    {"name": "heading", "type": "ReactNode", "description": "CommandGroup: group label."},
  ],
  example: {"props": {}, "code": "import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from \"@/components/ui/command\";\n\n<Command>\n  <CommandInput placeholder=\"Search…\" />\n  <CommandList>\n    <CommandEmpty>No results.</CommandEmpty>\n    <CommandGroup heading=\"Suggestions\">\n      <CommandItem>Calendar</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
