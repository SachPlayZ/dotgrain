"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/registry/ui/select";

export default function SelectDemo() {
  return (
    <Select defaultValue="synthwave">
      <SelectTrigger aria-label="Palette">
        <SelectValue placeholder="Palette" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colour</SelectLabel>
          <SelectItem value="synthwave">Synthwave</SelectItem>
          <SelectItem value="sunset">Sunset</SelectItem>
          <SelectItem value="ocean">Ocean</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="ink">Ink</SelectItem>
      </SelectContent>
    </Select>
  );
}
