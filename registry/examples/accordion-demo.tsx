"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="install" style={{ width: 380 }}>
      <AccordionItem value="install">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>Run the shadcn CLI with the component name; the engine comes along once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="webgl">
        <AccordionTrigger>What if WebGL is missing?</AccordionTrigger>
        <AccordionContent>A Canvas2D fallback renders the same frame on the CPU.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="motion">
        <AccordionTrigger>Does it respect reduced motion?</AccordionTrigger>
        <AccordionContent>Yes. Animation freezes on a static frame.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
