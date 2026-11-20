// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

afterEach(cleanup);

describe("Spinner", () => {
  it("is a 16px status announced as Loading", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status.textContent).toBe("Loading");
    expect(status.style.width).toBe("16px");
  });
});
