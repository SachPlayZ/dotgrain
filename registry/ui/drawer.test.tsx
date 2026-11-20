// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "./drawer";

afterEach(cleanup);

describe("Drawer", () => {
  it("opens a labelled dialog from its trigger", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Contrast</DrawerTitle>
          <DrawerDescription>Drag to dismiss.</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Contrast" })).toBeTruthy();
  });
});
