"use client";

import { Progress } from "@/registry/ui/progress";

export default function ProgressDemo() {
  return <Progress value={66} style={{ width: "min(360px, 100%)" }} />;
}
