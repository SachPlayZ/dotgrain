import type { ComponentMeta } from "./types.ts";

export default {
  name: "resizable",
  title: "Resizable",
  description: "Resizable panel groups split by dithered handles that thicken while dragged.",
  category: "surface",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/resizable.tsx"],
  dependencies: ["react-resizable-panels"],
  props: [
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "ResizablePanelGroup: lay panels side by side or stacked.", "default": "\"horizontal\""},
    {"name": "defaultSize", "type": "number | string", "description": "ResizablePanel: starting size, e.g. \"50%\"."},
    {"name": "minSize", "type": "number | string", "description": "ResizablePanel: smallest size."},
    {"name": "withHandle", "type": "boolean", "description": "ResizableHandle: show a grip glyph.", "default": "false"},
  ],
  example: {"props": {}, "code": "import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from \"@/components/ui/resizable\";\n\n<ResizablePanelGroup orientation=\"horizontal\">\n  <ResizablePanel defaultSize=\"50%\">One</ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel defaultSize=\"50%\">Two</ResizablePanel>\n</ResizablePanelGroup>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
