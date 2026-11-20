// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Separator } from "./separator";

afterEach(cleanup);

describe("Separator", () => {
  it("is decorative by default and semantic when asked", () => {
    const { container } = render(<Separator />);
    expect(screen.queryByRole("separator")).toBeNull();
    expect(container.textContent).toContain("─");
    cleanup();
    render(<Separator orientation="vertical" decorative={false} />);
    expect(screen.getByRole("separator").getAttribute("aria-orientation")).toBe("vertical");
  });
});
