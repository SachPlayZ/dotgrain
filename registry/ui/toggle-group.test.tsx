// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

afterEach(cleanup);

describe("ToggleGroup", () => {
  it("presses multiple items independently", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" defaultValue={["b"]} onValueChange={onValueChange}>
        <ToggleGroupItem value="b">Bold</ToggleGroupItem>
        <ToggleGroupItem value="i">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(onValueChange).toHaveBeenCalledWith(["b", "i"]);
    expect(screen.getByRole("button", { name: "Italic" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("single groups behave as radios", () => {
    render(
      <ToggleGroup type="single" defaultValue="l">
        <ToggleGroupItem value="l">Left</ToggleGroupItem>
        <ToggleGroupItem value="r">Right</ToggleGroupItem>
      </ToggleGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Right" }));
    expect(screen.getByRole("radio", { name: "Right" }).getAttribute("aria-checked")).toBe("true");
  });
});
