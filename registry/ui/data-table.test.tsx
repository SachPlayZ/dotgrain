// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./data-table";

afterEach(cleanup);

type Row = { id: string; name: string; n: number };
const data: Row[] = [
  { id: "a", name: "Cleo", n: 3 },
  { id: "b", name: "Ada", n: 1 },
  { id: "c", name: "Bo", n: 2 },
];
const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "n", header: "N", sortable: true },
];
const names = () => screen.getAllByRole("row").slice(1).map((r) => within(r).getAllByRole("cell").at(-2)?.textContent);

describe("DataTable", () => {
  it("sorts ascending, descending, then back to the original order", () => {
    render(<DataTable label="People" columns={columns} data={data} rowId={(r) => r.id} selectable />);
    const sort = screen.getByRole("button", { name: /Name/ });
    fireEvent.click(sort);
    expect(names()).toEqual(["Ada", "Bo", "Cleo"]);
    expect(screen.getByRole("columnheader", { name: /Name/ }).getAttribute("aria-sort")).toBe("ascending");
    fireEvent.click(sort);
    expect(names()).toEqual(["Cleo", "Bo", "Ada"]);
    fireEvent.click(sort);
    expect(names()).toEqual(["Cleo", "Ada", "Bo"]);
  });

  it("filters, selects and pages", () => {
    const onSelectionChange = vi.fn();
    render(<DataTable label="People" columns={columns} data={data} rowId={(r) => r.id} filterKey="name" selectable onSelectionChange={onSelectionChange} pageSize={2} />);
    expect(screen.getByText("Page 1 of 2")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 2")).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ad" } });
    expect(screen.getByText("Page 1 of 1")).toBeTruthy();
    expect(screen.getAllByRole("row")).toHaveLength(2);
    fireEvent.click(screen.getByRole("checkbox", { name: "Select page" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["b"]);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "zz" } });
    expect(screen.getByText("No results.")).toBeTruthy();
  });
});
