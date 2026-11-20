import { describe, expect, it } from "vitest";
import { components } from "./index";

// Only the primitives shadcn itself uses (see CLAUDE.md); anything else needs a maintainer decision.
const ALLOWED = ["radix-ui", "cmdk", "vaul", "sonner", "embla-carousel-react", "react-day-picker", "input-otp", "react-resizable-panels"];

describe("registry meta", () => {
  it("components depend only on shadcn's own primitives", () => {
    for (const c of components) for (const d of c.dependencies ?? []) expect(ALLOWED, `${c.name} → ${d}`).toContain(d);
  });

  it("names are unique", () => {
    expect(new Set(components.map((c) => c.name)).size).toBe(components.length);
  });
  it("prop names are identifiers, one prop per row", () => {
    for (const c of components) for (const p of c.props) expect(p.name, c.name).toMatch(/^\w+$/);
  });
});
