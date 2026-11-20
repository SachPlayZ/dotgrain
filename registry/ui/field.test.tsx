// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Field, FieldError, FieldLabel, FieldLegend, FieldSet } from "./field";

afterEach(cleanup);

describe("Field", () => {
  it("labels controls and announces errors", () => {
    render(
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <Field>
          <FieldLabel htmlFor="n">Name</FieldLabel>
          <input id="n" aria-invalid />
          <FieldError errors={[{ message: "Required" }, { message: "Required" }]} />
        </Field>
      </FieldSet>,
    );
    expect(screen.getByRole("group", { name: "Profile" })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toBe("! Required");
  });

  it("renders nothing without errors", () => {
    const { container } = render(<FieldError errors={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
