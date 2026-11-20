import type { ComponentMeta } from "./types.ts";

export default {
  name: "sidebar",
  title: "Sidebar",
  description: "A collapsible app sidebar edged by a dithered rail, toggled with \u2318B.",
  category: "navigation",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/sidebar.tsx"],
  props: [
    {"name": "defaultOpen", "type": "boolean", "description": "SidebarProvider: open at first.", "default": "true"},
    {"name": "open", "type": "boolean", "description": "SidebarProvider: controlled open state."},
    {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "SidebarProvider: called on toggle."},
    {"name": "side", "type": "\"left\" | \"right\"", "description": "Sidebar: which edge it sits on.", "default": "\"left\""},
    {"name": "collapsible", "type": "\"offcanvas\" | \"none\"", "description": "Sidebar: slide away when closed, or always show.", "default": "\"offcanvas\""},
    {"name": "width", "type": "string", "description": "Sidebar: open width, any CSS length.", "default": "\"16rem\""},
    {"name": "isActive", "type": "boolean", "description": "SidebarMenuButton: marks the current page.", "default": "false"},
    {"name": "href", "type": "string", "description": "SidebarMenuButton: renders a link instead of a button."},
  ],
  example: {"props": {}, "code": "import { Sidebar, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from \"@/components/ui/sidebar\";\n\n<SidebarProvider>\n  <Sidebar>\n    <SidebarContent>\n      <SidebarMenu>\n        <SidebarMenuItem><SidebarMenuButton isActive>Home</SidebarMenuButton></SidebarMenuItem>\n      </SidebarMenu>\n    </SidebarContent>\n  </Sidebar>\n  <SidebarInset><SidebarTrigger /></SidebarInset>\n</SidebarProvider>"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
