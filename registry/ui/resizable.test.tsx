// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable";

afterEach(cleanup);

describe("Resizable", () => {
  it("renders panels split by a focusable separator", () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="50%">One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const handle = screen.getByRole("separator");
    expect(handle.tabIndex).toBe(0);
    expect(handle.textContent).toBe("⋮");
    expect(screen.getByText("One")).toBeTruthy();
  });
});
