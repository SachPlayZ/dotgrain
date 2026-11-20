"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";

export default function ContextMenuDemo() {
  const [snap, setSnap] = useState(true);
  return (
    <ContextMenu>
      <ContextMenuTrigger style={{ display: "grid", placeItems: "center", width: 300, height: 140, border: "1px dashed currentColor", fontSize: 14 }}>
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Selection</ContextMenuLabel>
        <ContextMenuItem>
          Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste<ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={snap} onCheckedChange={setSnap}>
          Snap to cells
        </ContextMenuCheckboxItem>
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
