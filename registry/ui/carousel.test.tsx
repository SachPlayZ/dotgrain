// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

afterEach(cleanup);

describe("Carousel", () => {
  it("exposes a named carousel region of slides with labelled arrows", () => {
    render(
      <Carousel aria-label="Numbers">
        <CarouselContent>
          <CarouselItem>1</CarouselItem>
          <CarouselItem>2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    expect(screen.getByRole("region", { name: "Numbers" }).getAttribute("aria-roledescription")).toBe("carousel");
    expect(screen.getAllByRole("group").map((g) => g.getAttribute("aria-roledescription"))).toEqual(["slide", "slide"]);
    // Before Embla measures anything, neither direction can scroll.
    expect((screen.getByRole("button", { name: "Previous slide" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("button", { name: "Next slide" })).toBeTruthy();
  });
});
