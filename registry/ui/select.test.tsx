// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

afterEach(cleanup);
// Radix Select uses pointer capture and scrollIntoView, which jsdom lacks.
Object.assign(Element.prototype, { hasPointerCapture: () => false, releasePointerCapture() {}, scrollIntoView() {} });

describe("Select", () => {
  it("shows the value, opens a listbox and picks an option", () => {
    const onValueChange = vi.fn();
    render(
      <Select defaultValue="a" onValueChange={onValueChange}>
        <SelectTrigger aria-label="Letter">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Letter" });
    expect(trigger.textContent).toContain("Alpha");
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.click(screen.getByRole("option", { name: "Beta" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});
