"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/ui/menubar";

export default function MenubarDemo() {
  const [grid, setGrid] = useState(true);
  const [mode, setMode] = useState("dither");
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New canvas<MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PNG</MenubarItem>
              <MenubarItem>Plain text</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print<MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
            Show grid
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={mode} onValueChange={setMode}>
            <MenubarRadioItem value="dither">Dither</MenubarRadioItem>
            <MenubarRadioItem value="ascii">ASCII</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
