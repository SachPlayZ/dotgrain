"use client";

import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function LabelDemo() {
  return (
    <Label>
      <Checkbox defaultChecked /> Accept terms and conditions
    </Label>
  );
}
