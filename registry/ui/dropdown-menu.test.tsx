// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { vi } from "vitest";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "./dropdown-menu";

afterEach(cleanup);

describe("DropdownMenu", () => {
  it("opens a menu whose items select and whose checkbox items toggle", () => {
    const onSelect = vi.fn();
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>
            Copy<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Snap
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    fireEvent.pointerDown(screen.getByText("Open"), { button: 0, pointerType: "mouse" });
    expect(screen.getByRole("menu")).toBeTruthy();
    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "Snap" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("runs an item's onSelect", () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Copy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    fireEvent.pointerDown(screen.getByText("Open"), { button: 0, pointerType: "mouse" });
    fireEvent.click(screen.getByRole("menuitem", { name: "Copy" }));
    expect(onSelect).toHaveBeenCalled();
  });
});
