// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

afterEach(cleanup);

describe("Checkbox", () => {
  it("toggles, reports changes and has a decorative canvas", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Checkbox aria-label="Terms" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole("checkbox", { name: "Terms" });
    expect(box.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(box);
    expect(box.getAttribute("aria-checked")).toBe("true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("supports indeterminate and disabled", () => {
    render(<Checkbox aria-label="Some" defaultChecked="indeterminate" disabled />);
    const box = screen.getByRole("checkbox") as HTMLButtonElement;
    expect(box.getAttribute("aria-checked")).toBe("mixed");
    expect(box.disabled).toBe(true);
  });
});
