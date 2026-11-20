"use client";

import { Badge } from "@/registry/ui/badge";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/registry/ui/item";

export default function ItemDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "min(440px, 100%)" }}>
      <Item variant="outline">
        <ItemMedia variant="icon">◆</ItemMedia>
        <ItemContent>
          <ItemTitle>Security alert</ItemTitle>
          <ItemDescription>New sign-in from an unknown device.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="outline">New</Badge>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Your profile is verified</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
