// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRef } from "react";
import { Input } from "./input";

afterEach(cleanup);

describe("Input", () => {
  it("is a native input with a decorative canvas; ref goes to the input, className to the box", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<Input ref={ref} aria-label="Email" className="box" type="email" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(ref.current).toBe(input);
    expect(input.getAttribute("type")).toBe("email");
    expect(container.firstElementChild!.className).toBe("box");
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("passes events and disabled through", () => {
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Ada" } });
    expect(onChange).toHaveBeenCalledOnce();
    cleanup();
    render(<Input aria-label="Off" disabled />);
    expect((screen.getByRole("textbox") as HTMLInputElement).disabled).toBe(true);
  });
});
