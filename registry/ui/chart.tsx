"use client";

import { useMemo, useState, type ComponentProps, type CSSProperties } from "react";
import { Grain, splitTokens, useInk } from "@/lib/dotgrain/grain";
import { seriesLevel } from "@/lib/dotgrain/plot";
import { DitherProvider } from "@/lib/dotgrain/provider";
import { Quantize } from "@/lib/dotgrain/quantize";
import type { DitherTokens } from "@/lib/dotgrain/types";

/** The series to draw, keyed by field in `data`, in draw order; the first is drawn solid. */
export type ChartConfig = Record<string, { label: string }>;

export type ChartProps = Omit<ComponentProps<"div">, keyof DitherTokens | "children"> &
  Partial<DitherTokens> & {
    data: Record<string, string | number>[];
    config: ChartConfig;
    /** Field in `data` that labels the x axis, e.g. "month". */
    index: string;
    type?: "bar" | "line";
    /** What the chart shows; captions the hidden table screen readers get. */
    label: string;
    /** Plot height in CSS pixels. */
    height?: number;
    /** Show the legend; defaults to on with more than one series. */
    legend?: boolean;
  };

const hidden: CSSProperties = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" };
const fmt = (v: number) => v.toLocaleString();

/** Bar or line chart in dither or glyphs: series step down in level, so each takes its own colour or density. Hover for values. */
export function Chart({ data, config, index, type = "bar", label, height = 200, legend, style, ...props }: ChartProps) {
  const [tokens, rest] = splitTokens(props);
  const { bg, fg } = useInk(tokens);
  const keys = Object.keys(config);
  // Keyed by the series names, not the config object, which callers often rebuild every render.
  const names = keys.join("\n");
  const series = useMemo(() => names.split("\n").map((k) => data.map((d) => Number(d[k]) || 0)), [data, names]);
  const max = Math.max(0, ...series.flat());
  const min = Math.min(0, ...series.flat());
  const [hover, setHover] = useState<number | null>(null);
  const n = data.length;
  // Few points: label each; many: first, middle and last.
  const ticks = n <= 12 ? data.map((_, i) => i) : [0, Math.floor((n - 1) / 2), n - 1];
  const at = (i: number) => (type === "bar" ? (i + 0.5) / n : n > 1 ? i / (n - 1) : 0.5);
  return (
    <div {...rest} style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 8px", background: bg, color: fg, fontSize: 12, ...style }}>
      <DitherProvider {...tokens}>
        {(legend ?? keys.length > 1) && (
          <div aria-hidden="true" style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {keys.map((k, i) => (
              <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ position: "relative", width: 12, height: 12 }}>
                  <Grain field="frame" params={{ border: 0, fill: seriesLevel(i, keys.length) }} />
                </span>
                {config[k].label}
              </span>
            ))}
          </div>
        )}
        <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", opacity: 0.7, fontVariantNumeric: "tabular-nums" }}>
          <span>{fmt(max)}</span>
          <span>{fmt(min)}</span>
        </div>
        <div
          style={{ position: "relative", height }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            setHover(Math.max(0, Math.min(n - 1, type === "bar" ? Math.floor(x * n) : Math.round(x * (n - 1)))));
          }}
          onPointerLeave={() => setHover(null)}
        >
          <Quantize source={{ kind: "plot", series, type }} style={{ position: "absolute", inset: 0 }} />
          {hover !== null && (
            <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: `${at(hover) * 100}%`, borderLeft: `1px dashed ${fg}`, pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: 4, [at(hover) > 0.6 ? "right" : "left"]: 6, padding: "6px 8px", background: bg, border: `1px solid ${fg}`, whiteSpace: "nowrap" }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{data[hover][index]}</div>
                {keys.map((k, i) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span>{config[k].label}</span>
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(series[i][hover])}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div aria-hidden="true" style={{ gridColumn: 2, position: "relative", height: "1.4em", opacity: 0.7 }}>
          {ticks.map((i) => (
            <span key={i} style={{ position: "absolute", left: `${at(i) * 100}%`, translate: i === 0 && type === "line" ? "0" : i === n - 1 && type === "line" ? "-100%" : "-50%", whiteSpace: "nowrap" }}>
              {data[i][index]}
            </span>
          ))}
        </div>
      </DitherProvider>
      <table style={hidden}>
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">{index}</th>
            {keys.map((k) => <th key={k} scope="col">{config[k].label}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((d, r) => (
            <tr key={r}>
              <th scope="row">{d[index]}</th>
              {series.map((s, i) => <td key={keys[i]}>{s[r]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
