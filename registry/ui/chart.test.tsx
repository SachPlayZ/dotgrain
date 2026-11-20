// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Chart } from "./chart";

afterEach(cleanup);

const data = [
  { month: "Jan", desktop: 10, mobile: 4 },
  { month: "Feb", desktop: 30, mobile: 8 },
];

describe("Chart", () => {
  it("gives screen readers a captioned table of every series", () => {
    render(<Chart data={data} config={{ desktop: { label: "Desktop" }, mobile: { label: "Mobile" } }} index="month" label="Visitors" />);
    const table = screen.getByRole("table", { name: "Visitors" });
    expect([...table.querySelectorAll("thead th")].map((th) => th.textContent)).toEqual(["month", "Desktop", "Mobile"]);
    expect([...table.querySelectorAll("tbody tr")].map((tr) => tr.textContent)).toEqual(["Jan104", "Feb308"]);
  });

  it("shows the value range on the axis", () => {
    const { container } = render(<Chart data={data} config={{ desktop: { label: "Desktop" } }} index="month" label="Visitors" />);
    expect(container.textContent).toContain("30");
    expect(container.textContent).toContain("Jan");
  });
});
