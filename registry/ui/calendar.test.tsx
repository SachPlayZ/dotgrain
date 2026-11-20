// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

afterEach(cleanup);

describe("Calendar", () => {
  it("renders the month grid and reports a picked day", () => {
    const onSelect = vi.fn();
    render(<Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} onSelect={onSelect} />);
    expect(screen.getByRole("grid")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /November 12/ }));
    expect((onSelect.mock.calls[0][0] as Date).getDate()).toBe(12);
  });

  it("marks the selected day", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} selected={new Date(2026, 10, 12)} />);
    expect(screen.getByRole("gridcell", { selected: true }).textContent).toBe("12");
  });
});
