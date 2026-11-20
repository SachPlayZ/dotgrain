// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";

afterEach(cleanup);

describe("Slider", () => {
  it("renders one thumb per value with slider semantics", () => {
    render(<Slider defaultValue={[20, 70]} aria-label="Range" />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs.map((t) => t.getAttribute("aria-valuenow"))).toEqual(["20", "70"]);
  });

  it("moves with the keyboard", () => {
    const onValueChange = vi.fn();
    render(<Slider defaultValue={[40]} onValueChange={onValueChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith([41]);
  });
});
