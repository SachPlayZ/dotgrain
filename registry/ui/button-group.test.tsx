// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";

afterEach(cleanup);

describe("ButtonGroup", () => {
  it("is a named group with text cells and separators", () => {
    render(
      <ButtonGroup aria-label="Actions" orientation="vertical">
        <ButtonGroupText>Inbox</ButtonGroupText>
        <ButtonGroupSeparator />
        <button>Go</button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Actions" });
    expect(group.style.flexDirection).toBe("column");
    expect(screen.getByRole("separator")).toBeTruthy();
  });
});
