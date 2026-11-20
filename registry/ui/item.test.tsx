// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./item";

afterEach(cleanup);

describe("Item", () => {
  it("groups items as a list and keeps variant and size", () => {
    render(
      <ItemGroup>
        <Item role="listitem" variant="outline" size="sm">
          <ItemContent>
            <ItemTitle>Title</ItemTitle>
            <ItemDescription>Desc</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>,
    );
    expect(screen.getByRole("list")).toBeTruthy();
    const item = screen.getByRole("listitem");
    expect(item.getAttribute("data-variant")).toBe("outline");
    expect(item.getAttribute("data-size")).toBe("sm");
  });
});
