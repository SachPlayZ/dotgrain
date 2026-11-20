// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Textarea } from "./textarea";

afterEach(cleanup);

describe("Textarea", () => {
  it("is a native textarea with a decorative canvas", () => {
    const onChange = vi.fn();
    const { container } = render(<Textarea aria-label="Message" onChange={onChange} />);
    const el = screen.getByRole("textbox", { name: "Message" });
    expect(el.tagName).toBe("TEXTAREA");
    fireEvent.change(el, { target: { value: "hi" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });
});
