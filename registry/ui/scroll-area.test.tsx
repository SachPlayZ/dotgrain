// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

afterEach(cleanup);

describe("ScrollArea", () => {
  it("renders its content in a scrollable viewport", () => {
    render(<ScrollArea style={{ height: 100 }}>Content</ScrollArea>);
    const viewport = screen.getByText("Content").closest("[data-radix-scroll-area-viewport]");
    expect(viewport).toBeTruthy();
  });
});
