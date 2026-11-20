// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

afterEach(cleanup);

describe("InputGroup", () => {
  it("is a group whose addon focuses the input", () => {
    render(
      <InputGroup aria-label="Search">
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput aria-label="Query" />
      </InputGroup>,
    );
    expect(screen.getByRole("group", { name: "Search" })).toBeTruthy();
    fireEvent.click(screen.getByText("$"));
    expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Query" }));
  });
});
