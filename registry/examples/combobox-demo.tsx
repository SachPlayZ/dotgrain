"use client";

import { Combobox } from "@/registry/ui/combobox";

const palettes = ["ink", "synthwave", "sunset", "ocean", "toxic", "bubblegum"].map((value) => ({ value, label: value }));

export default function ComboboxDemo() {
  return <Combobox options={palettes} placeholder="Pick a palette…" aria-label="Palette" style={{ width: 220 }} />;
}
