"use client";

import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "grid", gap: 12 }}>
          <strong>Dimensions</strong>
          <Label style={{ display: "grid", gap: 6 }}>
            Width
            <Input defaultValue="100%" />
          </Label>
          <Label style={{ display: "grid", gap: 6 }}>
            Height
            <Input defaultValue="25px" />
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  );
}
