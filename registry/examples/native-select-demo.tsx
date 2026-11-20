"use client";

import { NativeSelect, NativeSelectOption } from "@/registry/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect aria-label="Fruit" defaultValue="pear">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="pear">Pear</NativeSelectOption>
      <NativeSelectOption value="plum">Plum</NativeSelectOption>
    </NativeSelect>
  );
}
