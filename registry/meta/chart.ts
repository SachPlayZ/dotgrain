import type { ComponentMeta } from "./types.ts";

export default {
  name: "chart",
  title: "Chart",
  description: "Bar and line charts for several series in dither or glyphs, with a legend, axis labels and a hover tooltip.",
  category: "data",
  modes: ["dither", "ascii"],
  tier: "free",
  files: ["registry/ui/chart.tsx"],
  props: [
    {"name": "data", "type": "Record<string, string | number>[]", "description": "One object per x value."},
    {"name": "config", "type": "ChartConfig", "description": "The series to draw, keyed by field, with labels; the first is drawn solid."},
    {"name": "index", "type": "string", "description": "Field that labels the x axis."},
    {"name": "type", "type": "\"bar\" | \"line\"", "description": "Grouped bars or overlaid lines.", "default": "\"bar\""},
    {"name": "label", "type": "string", "description": "What the chart shows; captions the hidden table."},
    {"name": "height", "type": "number", "description": "Plot height in CSS pixels.", "default": "200"},
    {"name": "legend", "type": "boolean", "description": "Show the legend; on by default with several series."},
  ],
  example: {"props": {}, "code": "import { Chart, type ChartConfig } from \"@/components/ui/chart\";\n\nconst config = { desktop: { label: \"Desktop\" }, mobile: { label: \"Mobile\" } } satisfies ChartConfig;\n\n<Chart data={data} config={config} index=\"month\" label=\"Visitors by device\" />"},
  knobs: ["mode", "pattern", "palette", "cell"],
} satisfies ComponentMeta;
