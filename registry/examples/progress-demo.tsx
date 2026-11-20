"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/registry/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = useState(13);
  useEffect(() => {
    const id = setTimeout(() => setValue(66), 500);
    return () => clearTimeout(id);
  }, []);
  return <Progress value={value} style={{ width: "min(360px, 100%)" }} />;
}
