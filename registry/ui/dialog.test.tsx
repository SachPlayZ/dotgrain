// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";

afterEach(cleanup);

describe("Dialog", () => {
  it("opens a labelled modal with hidden canvases, and the close button closes it", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Body</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Title" });
    expect(dialog.querySelectorAll("canvas[aria-hidden=true]").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("can drop the close button", () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false} aria-describedby={undefined}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });
});
