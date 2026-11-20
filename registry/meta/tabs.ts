import type { ComponentMeta } from "./types.ts";

export default {
  name: "tabs",
  title: "Tabs",
  description: "Radix tabs over a dithered rule; the active tab is a solid dithered chip.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/tabs.tsx"],
  dependencies: ["radix-ui"],
  props: [
    {"name": "defaultValue", "type": "string", "description": "Tabs: the tab open at first."},
    {"name": "value", "type": "string", "description": "Tabs: controlled active tab."},
    {"name": "orientation", "type": "\"horizontal\" | \"vertical\"", "description": "Tabs: list direction and arrow keys.", "default": "\"horizontal\""},
  ],
  example: {"props": {}, "code": "import { Tabs, TabsContent, TabsList, TabsTrigger } from \"@/components/ui/tabs\";\n\n<Tabs defaultValue=\"a\">\n  <TabsList>\n    <TabsTrigger value=\"a\">Account</TabsTrigger>\n    <TabsTrigger value=\"b\">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value=\"a\">Account settings.</TabsContent>\n  <TabsContent value=\"b\">Password settings.</TabsContent>\n</Tabs>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
