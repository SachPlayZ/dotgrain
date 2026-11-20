"use client";

import { Switch } from "@/registry/ui/switch";

export default function SwitchDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Switch defaultChecked /> Notifications
      </label>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Switch /> Sound
      </label>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Switch size={32} disabled /> Disabled
      </label>
    </div>
  );
}
