"use client";

import { Label } from "@/registry/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <Label><RadioGroupItem value="default" /> Default</Label>
      <Label><RadioGroupItem value="comfortable" /> Comfortable</Label>
      <Label><RadioGroupItem value="compact" /> Compact</Label>
    </RadioGroup>
  );
}
