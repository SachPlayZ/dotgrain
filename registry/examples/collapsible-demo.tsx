"use client";

import { Button } from "@/registry/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen style={{ display: "grid", gap: 8, width: 320 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>3 palettes</strong>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <div>ink</div>
      <CollapsibleContent>
        <div>synthwave</div>
        <div>ocean</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
