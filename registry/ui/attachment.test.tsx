// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentTitle } from "./attachment";

afterEach(cleanup);

describe("Attachment", () => {
  it("marks busy states and keeps actions clickable", () => {
    const onClick = vi.fn();
    render(
      <Attachment state="uploading">
        <AttachmentContent>
          <AttachmentTitle>brief.pdf</AttachmentTitle>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove" onClick={onClick}>✕</AttachmentAction>
        </AttachmentActions>
      </Attachment>,
    );
    const root = screen.getByText("brief.pdf").closest("[data-state]")!;
    expect(root.getAttribute("data-state")).toBe("uploading");
    expect(root.getAttribute("aria-busy")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onClick).toHaveBeenCalled();
  });
});
