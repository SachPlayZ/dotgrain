// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

afterEach(cleanup);

describe("HoverCard", () => {
  it("shows its card when open, with a hidden canvas frame", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger href="#">@dotgrain</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>,
    );
    const body = screen.getByText("Card body");
    expect(body.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });
});
