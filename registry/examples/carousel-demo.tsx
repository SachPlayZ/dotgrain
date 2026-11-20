"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel";

export default function CarouselDemo() {
  return (
    <div style={{ padding: "0 56px" }}>
      <Carousel aria-label="Numbers" style={{ width: "min(240px, 60vw)" }}>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              {/* Plain boxes: off-screen slides pause their canvases until scrolled in. */}
              <div style={{ display: "grid", placeItems: "center", aspectRatio: "1", border: "1px solid currentColor", fontSize: 40, fontWeight: 600 }}>{i + 1}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
