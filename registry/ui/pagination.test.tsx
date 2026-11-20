// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";

afterEach(cleanup);

describe("Pagination", () => {
  it("marks the active page and labels previous and next", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "2" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Go to previous page" }).getAttribute("href")).toBe("#1");
    expect(screen.getByRole("link", { name: "Go to next page" })).toBeTruthy();
  });
});
