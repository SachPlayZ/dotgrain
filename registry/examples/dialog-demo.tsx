"use client";

import { Button } from "@/registry/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Change your handle. Saved when you click save.</DialogDescription>
        </DialogHeader>
        <Label style={{ display: "grid", gap: 6 }}>
          Handle
          <Input defaultValue="@grain" />
        </Label>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
