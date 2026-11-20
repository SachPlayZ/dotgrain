// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Combobox } from "./combobox";

afterEach(cleanup);
// jsdom has no layout; cmdk scrolls the selected item into view.
Element.prototype.scrollIntoView = () => {};

describe("Combobox", () => {
  it("opens, picks an option and shows it on the trigger", () => {
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Fruit" options={[{ value: "apple", label: "Apple" }, { value: "pear", label: "Pear" }]} onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(screen.getByRole("option", { name: /Pear/ }));
    expect(onValueChange).toHaveBeenCalledWith("pear");
    expect(trigger.textContent).toContain("Pear");
  });
});
