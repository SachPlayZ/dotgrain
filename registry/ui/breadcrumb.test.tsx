// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";

afterEach(cleanup);

describe("Breadcrumb", () => {
  it("labels the trail, hides separators and marks the current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Docs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeTruthy();
    expect(screen.getByText("Docs").closest("[aria-current]")?.getAttribute("aria-current")).toBe("page");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
