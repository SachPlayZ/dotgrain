"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/registry/ui/sidebar";

const items = [
  ["Canvas", 0],
  ["Layers", 4],
  ["Palettes", 0],
  ["Exports", 2],
] as const;

export default function SidebarDemo() {
  return (
    <SidebarProvider style={{ minHeight: 320, width: "min(560px, 100%)", border: "1px solid currentColor" }}>
      <Sidebar width="12rem">
        <SidebarHeader>
          <strong>dotgrain</strong>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Studio</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(([label, count], i) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton isActive={i === 0}>{label}</SidebarMenuButton>
                    {count > 0 && <SidebarMenuBadge>{count}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>@grain</SidebarFooter>
      </Sidebar>
      <SidebarInset style={{ padding: 16 }}>
        <SidebarTrigger />
        <p>Press ⌘B or the button to toggle.</p>
      </SidebarInset>
    </SidebarProvider>
  );
}
