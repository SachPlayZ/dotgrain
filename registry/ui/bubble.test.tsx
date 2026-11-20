// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Bubble, BubbleContent, BubbleReactions } from "./bubble";

afterEach(cleanup);

describe("Bubble", () => {
  it("renders text with its variant, alignment and reactions", () => {
    render(
      <Bubble variant="outline" align="end">
        <BubbleContent>Hello</BubbleContent>
        <BubbleReactions aria-label="Reactions">🔥</BubbleReactions>
      </Bubble>,
    );
    const bubble = screen.getByText("Hello").closest("[data-variant]")!;
    expect(bubble.getAttribute("data-variant")).toBe("outline");
    expect(bubble.getAttribute("data-align")).toBe("end");
    expect(screen.getByLabelText("Reactions").getAttribute("data-side")).toBe("bottom");
  });
});
