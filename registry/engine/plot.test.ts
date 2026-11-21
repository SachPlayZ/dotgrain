import { describe, expect, it } from "vitest";
import { plotValues } from "./plot";

const grid = (v: Float32Array, cols: number) => Array.from({ length: v.length / cols }, (_, r) => Array.from(v.slice(r * cols, r * cols + cols)));

describe("plotValues", () => {
  it("fills bars from the bottom with a fractional top mark", () => {
    const rows = grid(plotValues([1, 0.5, 0.25], "bar", 3, 4), 3);
    expect(rows.map((r) => r[0])).toEqual([1, 1, 1, 1]);
    expect(rows.map((r) => r[1])).toEqual([0, 0, 1, 1]);
    expect(rows.map((r) => r[2])).toEqual([0, 0, 0, 1]);
    expect(grid(plotValues([1, 0.6], "bar", 2, 1), 2)[0][1]).toBeCloseTo(0.6);
  });

  it("draws a continuous line between points", () => {
    const rows = grid(plotValues([0, 1], "line", 4, 4), 4);
    // Each column has at least one lit mark, rising left to right.
    const heights = [0, 1, 2, 3].map((x) => rows.findIndex((r) => r[x] === 1));
    expect(heights.every((h) => h >= 0)).toBe(true);
    expect(heights[3]).toBeLessThan(heights[0]);
  });

  it("keeps peaks that fall inside a column", () => {
    // 3 points over 4 columns: the peak at index 1 sits mid-column; the line must still reach the top row.
    expect(grid(plotValues([0, 1, 0], "line", 4, 4), 4)[0].some((v) => v === 1)).toBe(true);
  });

  it("caches by series and size", () => {
    const s = [1, 2, 3];
    expect(plotValues(s, "line", 5, 5)).toBe(plotValues(s, "line", 5, 5));
    expect(plotValues(s, "line", 6, 5)).not.toBe(plotValues(s, "line", 5, 5));
    expect(plotValues([], "bar", 3, 3).every((v) => v === 0)).toBe(true);
  });
});

describe("plotValues with several series", () => {
  it("splits bar slots into lanes, one level per series", () => {
    // 1 slot, 2 series, 4 columns: lanes 0–1 belong to the first series (level 1), 2–3 to the second (0.5).
    const rows = grid(plotValues([[1], [1]], "bar", 4, 1), 4);
    expect(rows[0]).toEqual([1, 1, 0.5, 0.5]);
  });

  it("overlays lines on a shared scale, first series on top", () => {
    const rows = grid(plotValues([[0, 0], [1, 1]], "line", 2, 2), 2);
    expect(rows[0]).toEqual([0.5, 0.5]);
    expect(rows[1]).toEqual([1, 1]);
  });

  it("grows bars in left to right and draws lines across", () => {
    const sum = (v: Float32Array, from: number, to: number, cols: number) => {
      let t = 0;
      for (let i = 0; i < v.length; i++) if (i % cols >= from && i % cols < to) t += v[i];
      return t;
    };
    const none = plotValues([1, 1], "bar", 2, 4, 0);
    expect(sum(none, 0, 2, 2)).toBe(0);
    // Partway: the first bar is ahead of the second.
    const mid = plotValues([1, 1], "bar", 2, 4, 0.5);
    expect(sum(mid, 0, 1, 2)).toBeGreaterThan(sum(mid, 1, 2, 2));
    expect(sum(plotValues([1, 1], "bar", 2, 4, 1), 0, 2, 2)).toBe(8);
    const line = plotValues([0, 1], "line", 4, 4, 0.5);
    expect(sum(line, 2, 4, 4)).toBe(0);
    expect(sum(line, 0, 2, 4)).toBeGreaterThan(0);
  });
});

