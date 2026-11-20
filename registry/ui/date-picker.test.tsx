// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

afterEach(cleanup);

describe("DatePicker", () => {
  it("opens a calendar, picks a day and shows it on the trigger", () => {
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Due date" defaultValue={new Date(2026, 10, 12)} onValueChange={onValueChange} format={(d) => `day ${d.getDate()}`} />);
    const trigger = screen.getByRole("button", { name: "Due date" });
    expect(trigger.textContent).toContain("day 12");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: /November 20/ }));
    expect((onValueChange.mock.calls[0][0] as Date).getDate()).toBe(20);
    expect(screen.queryByRole("grid")).toBeNull();
    expect(trigger.textContent).toContain("day 20");
  });
});
