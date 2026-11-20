// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./sheet";

afterEach(cleanup);

describe("Sheet", () => {
  it("docks to the chosen edge", () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Tune it.</SheetDescription>
        </SheetContent>
      </Sheet>,
    );
    const sheet = screen.getByRole("dialog", { name: "Settings" });
    expect(sheet.style.left).toBe("0px");
    expect(sheet.style.right).toBe("");
  });
});
