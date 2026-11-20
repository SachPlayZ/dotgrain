// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NativeSelect, NativeSelectOption } from "./native-select";

afterEach(cleanup);

describe("NativeSelect", () => {
  it("is a native select with options and a decorative canvas", () => {
    const onChange = vi.fn();
    const { container } = render(
      <NativeSelect aria-label="Fruit" defaultValue="pear" onChange={onChange}>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="pear">Pear</NativeSelectOption>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "Fruit" }) as HTMLSelectElement;
    expect(select.value).toBe("pear");
    fireEvent.change(select, { target: { value: "apple" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(container.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });
});
