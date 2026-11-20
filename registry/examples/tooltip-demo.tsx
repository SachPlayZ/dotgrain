"use client";

import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  );
}
