// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Label } from "./label";

afterEach(cleanup);

describe("Label", () => {
  it("names its control", () => {
    render(
      <>
        <Label htmlFor="e">Email</Label>
        <input id="e" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeTruthy();
  });
});
