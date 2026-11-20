"use client";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/registry/ui/input-group";

export default function InputGroupDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 380 }}>
      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput placeholder="grep components" aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="dotgrain" aria-label="Subdomain" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.space</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
