// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";

afterEach(cleanup);

describe("InputOTP", () => {
  it("is one real input whose characters show in the slots", () => {
    const { container } = render(
      <InputOTP maxLength={3} defaultValue="12" aria-label="Code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>,
    );
    expect(container.querySelectorAll("input")).toHaveLength(1);
    expect(container.textContent).toContain("12");
  });
});
