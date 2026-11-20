"use client";

import { toast } from "sonner";
import { Button } from "@/registry/ui/button";
import { Toaster } from "@/registry/ui/sonner";

export default function SonnerDemo() {
  return (
    <>
      <Button variant="outline" onClick={() => toast.success("Palette saved", { description: "Synthwave is now the default." })}>
        Show toast
      </Button>
      <Toaster />
    </>
  );
}
