// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Kbd, KbdGroup } from "./kbd";

afterEach(cleanup);

describe("Kbd", () => {
  it("renders keys as kbd elements", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(screen.getByText("K").closest("kbd")).toBeTruthy();
    expect(document.querySelectorAll("kbd")).toHaveLength(3);
  });
});
