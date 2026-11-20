// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

afterEach(cleanup);
const sw = (name?: string) => screen.getByRole("switch", name ? { name } : undefined);

describe("Switch", () => {
  it("is a Radix switch named by its label, with a decorative canvas", () => {
    const { container } = render(
      <>
        <label htmlFor="wifi">Wi-Fi</label>
        <Switch id="wifi" />
      </>,
    );
    expect(sw("Wi-Fi").getAttribute("aria-checked")).toBe("false");
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("toggles uncontrolled from defaultChecked", () => {
    render(<Switch aria-label="Sound" defaultChecked />);
    expect(sw().getAttribute("aria-checked")).toBe("true");
    fireEvent.click(sw());
    expect(sw().getAttribute("aria-checked")).toBe("false");
  });

  it("follows a controlled value via onCheckedChange", () => {
    const onChange = vi.fn();
    function Controlled() {
      const [on, setOn] = useState(false);
      return <Switch aria-label="Dark" checked={on} onCheckedChange={(v) => (setOn(v), onChange(v))} />;
    }
    render(<Controlled />);
    fireEvent.click(sw("Dark"));
    expect(sw("Dark").getAttribute("aria-checked")).toBe("true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled and forwards ref and className", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} aria-label="Off" disabled className="t" />);
    expect(ref.current).toBe(sw());
    expect((sw() as HTMLButtonElement).disabled).toBe(true);
    expect(sw().className).toBe("t");
  });
});
