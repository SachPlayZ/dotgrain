// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Message, MessageContent, MessageHeader } from "./message";

afterEach(cleanup);

describe("Message", () => {
  it("mirrors an end-aligned turn and pushes its content to the end", () => {
    render(
      <Message align="end">
        <MessageContent>
          <MessageHeader>You</MessageHeader>
        </MessageContent>
      </Message>,
    );
    const header = screen.getByText("You");
    const content = header.parentElement!;
    const message = content.parentElement!;
    expect(message.getAttribute("data-align")).toBe("end");
    expect(message.style.flexDirection).toBe("row-reverse");
    expect(content.style.alignItems).toBe("flex-end");
    expect(header.style.justifyContent).toBe("flex-end");
  });
});
