"use client";

import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/ui/sheet";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Tune the grain for this project.</SheetDescription>
        </SheetHeader>
        <Label style={{ display: "grid", gap: 6 }}>
          Cell size
          <Input type="number" defaultValue={4} />
        </Label>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
