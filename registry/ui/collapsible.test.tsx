// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

afterEach(cleanup);

describe("Collapsible", () => {
  it("toggles its content", () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>More</CollapsibleTrigger>
        <CollapsibleContent>Hidden</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Hidden")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Hidden")).toBeTruthy();
  });
});
