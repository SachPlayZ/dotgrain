"use client";

import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";

export default function AlertDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "min(440px, 100%)" }}>
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components with the shadcn CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check your card details and try again.</AlertDescription>
      </Alert>
    </div>
  );
}
