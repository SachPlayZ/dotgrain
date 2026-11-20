// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

afterEach(cleanup);

describe("Popover", () => {
  it("toggles its content from the trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("dialog").textContent).toContain("Panel");
  });
});
