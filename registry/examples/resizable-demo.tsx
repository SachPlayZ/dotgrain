"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable";

const pane = { display: "flex", height: "100%", alignItems: "center", justifyContent: "center", padding: 16, fontWeight: 600 } as const;

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" style={{ width: "min(480px, 100%)", height: 220, border: "1px solid currentColor" }}>
      <ResizablePanel defaultSize="50%">
        <div style={pane}>One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="30%">
            <div style={pane}>Two</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="70%">
            <div style={pane}>Three</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
