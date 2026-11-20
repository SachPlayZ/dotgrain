// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "./toggle";

afterEach(cleanup);

describe("Toggle", () => {
  it("is a press button named by its label, with a decorative canvas", () => {
    const { container } = render(<Toggle>Bold</Toggle>);
    const b = screen.getByRole("button", { name: "Bold" });
    expect(b.getAttribute("aria-pressed")).toBe("false");
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("toggles pressed and reports changes", () => {
    const onPressedChange = vi.fn();
    render(<Toggle defaultPressed onPressedChange={onPressedChange}>B</Toggle>);
    const b = screen.getByRole("button", { name: "B" });
    expect(b.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(b);
    expect(b.getAttribute("aria-pressed")).toBe("false");
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it("respects disabled and forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Toggle ref={ref} disabled>I</Toggle>);
    expect(ref.current).toBe(screen.getByRole("button", { name: "I" }));
    expect(ref.current!.disabled).toBe(true);
  });
});
