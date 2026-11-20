"use client";

import { useState } from "react";
import { Button } from "@/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export default function DropdownMenuDemo() {
  const [grid, setGrid] = useState(true);
  const [mode, setMode] = useState("dither");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Canvas</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            New layer<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>PNG</DropdownMenuItem>
              <DropdownMenuItem>Plain text</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
          Show grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>
          <DropdownMenuRadioItem value="dither">Dither</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ascii">ASCII</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
