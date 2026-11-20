"use client";

import { Button } from "@/registry/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/registry/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Message actions">
      <ButtonGroupText>Inbox</ButtonGroupText>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <ButtonGroupSeparator />
      <Button>Reply</Button>
    </ButtonGroup>
  );
}
