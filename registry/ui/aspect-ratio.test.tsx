// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

afterEach(cleanup);

describe("AspectRatio", () => {
  it("reserves the ratio as bottom padding", () => {
    const { container } = render(<AspectRatio ratio={2}>x</AspectRatio>);
    expect((container.firstElementChild as HTMLElement).style.paddingBottom).toBe("50%");
  });
});
