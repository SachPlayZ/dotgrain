export type PlotType = "line" | "bar";

/** One series, or several drawn together (grouped bars, overlaid lines). */
export type PlotSeries = readonly number[] | readonly (readonly number[])[];

// How far behind the first bar the last one starts rising, as a share of the grow.
const STAGGER = 0.6;

const cache = new WeakMap<object, { key: string; values: Float32Array }>();

/** Level series k of n draws at: the first full, the rest stepping down, so palettes tell them apart. */
export const seriesLevel = (k: number, n: number) => 1 - k / n;

/**
 * Per-mark levels (row-major, top row first) for series drawn into cols × rows marks.
 * Bars fill up to each value with a fractional top mark, so a ramp draws partial heights; lines join the points.
 * With several series, bars split each slot side by side and lines overlay; all share one scale.
 */
export function plotValues(series: PlotSeries, type: PlotType, cols: number, rows: number, grow = 1): Float32Array {
  const all = (series.length && Array.isArray(series[0]) ? series : [series]) as readonly (readonly number[])[];
  const key = `${type}|${cols}x${rows}|${grow}|${all.map((s) => s.join()).join("|")}`;
  const hit = cache.get(series);
  if (hit?.key === key) return hit.values;
  const values = new Float32Array(cols * rows);
  const flat = all.flat();
  const lo = Math.min(0, ...flat), span = Math.max(...flat) - lo || 1;
  const m = all.length;
  all.forEach((s, k) => {
    const n = s.length, level = seriesLevel(k, m);
    // Height in marks at fractional index i, interpolated between points.
    const at = (i: number) => {
      const a = Math.min(n - 1, Math.floor(i)), b = Math.min(n - 1, a + 1);
      return ((s[a] + (s[b] - s[a]) * (i - a) - lo) / span) * rows;
    };
    for (let x = 0; n && x < cols; x++) {
      const slot = ((x + 0.5) / cols) * n;
      // Grouped bars: each slot is split into m lanes; this series owns lane k.
      const lane = Math.floor((slot % 1) * m);
      if (type === "bar" && lane !== k) continue;
      // Growing: each bar rises over its own window of `grow`, later bars starting later; lines reveal by column.
      const rise = Math.min(1, Math.max(0, grow * (1 + STAGGER) - (STAGGER * Math.floor(slot)) / n));
      if (type === "line" && x >= grow * cols) continue;
      const bar = type === "bar" ? at(Math.floor(slot)) * rise : 0;
      // The line's extent across this column: both edges plus any data point (peak or trough) inside it.
      const i0 = (x / cols) * (n - 1), i1 = ((x + 1) / cols) * (n - 1);
      const ys = [at(i0), at(i1)];
      for (let j = Math.ceil(i0); j <= i1; j++) ys.push(at(j));
      const y0 = Math.min(...ys) - 0.5, y1 = Math.max(...ys) + 0.5;
      for (let b = 0; b < rows; b++) {
        const c = b + 0.5;
        const v = type === "bar" ? Math.min(1, Math.max(0, bar - b)) : c >= y0 && c <= y1 ? 1 : 0;
        const i = (rows - 1 - b) * cols + x;
        values[i] = Math.max(values[i], v * level);
      }
    }
  });
  cache.set(series, { key, values });
  return values;
}
