// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DirectionProvider, useDirection } from "./direction";

afterEach(cleanup);

const Probe = () => <span>{useDirection(undefined)}</span>;

describe("DirectionProvider", () => {
  it("passes the direction (or its dir alias) down", () => {
    render(
      <DirectionProvider direction="rtl">
        <Probe />
      </DirectionProvider>,
    );
    expect(screen.getByText("rtl")).toBeTruthy();
    cleanup();
    render(
      <DirectionProvider dir="ltr">
        <Probe />
      </DirectionProvider>,
    );
    expect(screen.getByText("ltr")).toBeTruthy();
  });
});
