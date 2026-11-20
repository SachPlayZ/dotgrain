// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Marker, MarkerContent, MarkerIcon } from "./marker";

afterEach(cleanup);

describe("Marker", () => {
  it("draws hidden glyph rules either side of the separator variant", () => {
    const { container } = render(
      <Marker variant="separator">
        <MarkerIcon>✎</MarkerIcon>
        <MarkerContent>Today</MarkerContent>
      </Marker>,
    );
    expect(screen.getByText("Today")).toBeTruthy();
    expect(screen.getByText("✎").getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelectorAll("[aria-hidden=true]")).toHaveLength(3);
  });
});
