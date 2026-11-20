// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "./badge";

afterEach(cleanup);

describe("Badge", () => {
  it("renders its label and marks destructive with a hidden glyph", () => {
    render(<Badge variant="destructive">Failed</Badge>);
    const badge = screen.getByText("Failed").closest("[data-variant]")!;
    expect(badge.getAttribute("data-variant")).toBe("destructive");
    expect(screen.getByText("✖").getAttribute("aria-hidden")).toBe("true");
  });
});
