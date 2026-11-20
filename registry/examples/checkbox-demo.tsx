"use client";

import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function CheckboxDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Label><Checkbox defaultChecked /> Email me updates</Label>
      <Label><Checkbox /> Text me updates</Label>
      <Label><Checkbox defaultChecked="indeterminate" /> Some notifications</Label>
      <Label><Checkbox disabled /> Disabled</Label>
    </div>
  );
}
