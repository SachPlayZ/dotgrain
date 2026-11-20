// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { useDataAttr } from "./grain";

afterEach(cleanup);

function Probe({ forward }: { forward?: React.Ref<HTMLDivElement> }) {
  const [state, ref] = useDataAttr<HTMLDivElement>("data-state", forward);
  return <div ref={ref} data-testid="probe" data-state="closed">{state}</div>;
}

describe("useDataAttr", () => {
  it("follows the attribute and forwards the ref", async () => {
    const forward = createRef<HTMLDivElement>();
    render(<Probe forward={forward} />);
    const el = screen.getByTestId("probe");
    expect(forward.current).toBe(el);
    expect(el.textContent).toBe("closed");
    await act(async () => el.setAttribute("data-state", "open"));
    expect(el.textContent).toBe("open");
  });
});
