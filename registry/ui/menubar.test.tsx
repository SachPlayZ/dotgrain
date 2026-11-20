// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./menubar";

afterEach(cleanup);

describe("Menubar", () => {
  it("opens a menu whose items select", () => {
    const onSelect = vi.fn();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onSelect}>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    expect(screen.getByRole("menubar")).toBeTruthy();
    fireEvent.pointerDown(screen.getByRole("menuitem", { name: "File" }), { button: 0, pointerType: "mouse" });
    fireEvent.click(screen.getByRole("menuitem", { name: "New" }));
    expect(onSelect).toHaveBeenCalled();
  });
});
