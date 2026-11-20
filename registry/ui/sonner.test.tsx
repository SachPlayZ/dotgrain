// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import { toast } from "sonner";
import { afterEach, describe, expect, it } from "vitest";
import { Toaster } from "./sonner";

afterEach(cleanup);

describe("Toaster", () => {
  it("shows toasts in palette colours with a hidden dithered mark", async () => {
    render(<Toaster palette="synthwave" />);
    act(() => void toast.success("Saved"));
    const text = await screen.findByText("Saved");
    const item = text.closest("[data-sonner-toast]") as HTMLElement;
    expect(item.style.background).not.toBe("");
    expect(item.querySelector("canvas")?.getAttribute("aria-hidden")).toBe("true");
  });
});
