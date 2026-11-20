// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

afterEach(cleanup);

describe("Tooltip", () => {
  it("renders its label as a tooltip when open", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip").textContent).toBe("Add to library");
  });
});
