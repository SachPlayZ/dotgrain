// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerViewport } from "./message-scroller";

afterEach(cleanup);

const box = (el: HTMLElement, scrollHeight: number, clientHeight: number) => {
  Object.defineProperty(el, "scrollHeight", { configurable: true, value: scrollHeight });
  Object.defineProperty(el, "clientHeight", { configurable: true, value: clientHeight });
};

describe("MessageScroller", () => {
  // jsdom has no element scrolling.
  Element.prototype.scrollTo = () => {};

  it("starts at the end and shows the jump button once you scroll up", () => {
    render(
      <MessageScroller>
        <MessageScrollerViewport data-testid="vp">
          <MessageScrollerContent>
            <p>one</p>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>,
    );
    const vp = screen.getByTestId("vp");
    const button = screen.getByText("Scroll to end").closest("button")!;
    expect(button.getAttribute("data-active")).toBe("false");
    expect(button.tabIndex).toBe(-1);
    box(vp, 1000, 200);
    vp.scrollTop = 100;
    fireEvent.scroll(vp);
    expect(button.getAttribute("data-active")).toBe("true");
    vp.scrollTo = vi.fn();
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    fireEvent.click(button);
    expect(vp.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "auto" });
    vi.unstubAllGlobals();
  });
});
