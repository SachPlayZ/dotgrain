// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

afterEach(cleanup);

describe("Avatar", () => {
  it("shows the fallback until the image loads", () => {
    render(
      <Avatar>
        <AvatarImage src="/a.png" alt="Ada" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    // jsdom never loads images, so Radix keeps the fallback.
    expect(screen.getByText("AL")).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
