// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./command";

afterEach(cleanup);
// jsdom has no layout; cmdk scrolls the selected item into view.
Element.prototype.scrollIntoView = () => {};

describe("Command", () => {
  it("filters items as you type and selects with Enter", () => {
    const onSelect = vi.fn();
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>None</CommandEmpty>
          <CommandItem onSelect={onSelect}>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandList>
      </Command>,
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "cal" } });
    expect(screen.queryByText("Settings")).toBeNull();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("Calendar");
    fireEvent.change(input, { target: { value: "zzz" } });
    expect(screen.getByText("None")).toBeTruthy();
  });
});
