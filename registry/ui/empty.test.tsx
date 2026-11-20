// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";

afterEach(cleanup);

describe("Empty", () => {
  it("renders title and description as text", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">∅</EmptyMedia>
          <EmptyTitle>Nothing</EmptyTitle>
          <EmptyDescription>Create one.</EmptyDescription>
        </EmptyHeader>
      </Empty>,
    );
    expect(screen.getByText("Nothing")).toBeTruthy();
    expect(screen.getByText("∅").closest("[data-variant]")?.getAttribute("data-variant")).toBe("icon");
  });
});
