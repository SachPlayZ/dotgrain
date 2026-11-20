"use client";

import { Button } from "@/registry/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/ui/drawer";
import { Slider } from "@/registry/ui/slider";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Set contrast</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 360, margin: "0 auto" }}>
          <DrawerHeader>
            <DrawerTitle>Contrast</DrawerTitle>
            <DrawerDescription>Drag the handle down to dismiss.</DrawerDescription>
          </DrawerHeader>
          <Slider defaultValue={[60]} aria-label="Contrast" />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Apply</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
