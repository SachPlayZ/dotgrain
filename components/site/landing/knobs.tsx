"use client";

import { PATTERNS, useSiteTokens } from "@/components/site/site-style";
import type { DitherTokens } from "@/lib/dotgrain/types";
import { AsciiChart } from "@/registry/ui/ascii-chart";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Card } from "@/registry/ui/card";
import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";
import { Progress } from "@/registry/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select";
import { Slider } from "@/registry/ui/slider";
import { Spinner } from "@/registry/ui/spinner";
import { Switch } from "@/registry/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";
import { Italic, Section } from "./section";

const label = "font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground";

/** Site-wide token controls built from our own controls, beside a specimen sheet that follows them. */
export function Knobs() {
  const { tokens, setTokens } = useSiteTokens();
  const mode = tokens.mode ?? "dither";
  const cell = tokens.cell ?? (mode === "ascii" ? 10 : 3);
  const set = (next: Partial<DitherTokens>) => setTokens({ ...tokens, ...next });
  return (
    <Section n="01" title={<>One provider. <Italic>Every pixel follows.</Italic></>} lede="Mode, pattern, cell and palette are tokens on one provider. Turn a knob here and the whole page re-renders: this sheet, the hero, the wall below.">
      <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div className="flex flex-col gap-6 self-start lg:sticky lg:top-20">
          <div className="flex flex-col gap-2">
            <span id="knob-mode" className={label}>mode</span>
            <ToggleGroup type="single" value={mode} onValueChange={(v) => v && set({ mode: v as DitherTokens["mode"], cell: undefined })} aria-labelledby="knob-mode">
              <ToggleGroupItem value="dither">Dither</ToggleGroupItem>
              <ToggleGroupItem value="ascii">ASCII</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>pattern</span>
            <Select value={tokens.pattern ?? "bayer4"} onValueChange={(v) => set({ pattern: v as DitherTokens["pattern"] })}>
              <SelectTrigger aria-label="Pattern">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PATTERNS.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <span className={label}>cell · {cell}px</span>
            <Slider min={1} max={24} value={[cell]} onValueChange={([v]) => set({ cell: v })} aria-label="Cell size" />
          </div>
          <Button variant="outline" size="sm" onClick={() => setTokens({})} style={{ alignSelf: "flex-start" }}>
            Reset
          </Button>
        </div>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
          <Card border={1} style={{ padding: 20 }}>
            <div className="grid gap-4">
            <span className={label}>deploys / week</span>
            <AsciiChart type="bar" data={[3, 5, 4, 8, 6, 9, 12, 10]} label="Deploys per week, rising from 3 to 12" style={{ height: 120 }} />
            </div>
          </Card>
          <Card border={1} style={{ padding: 20 }}>
            <div className="grid gap-4">
            <span className={label}>controls</span>
            <Label><Switch defaultChecked /> Live preview</Label>
            <Label><Checkbox defaultChecked /> Reduced motion aware</Label>
            <Slider defaultValue={[30, 70]} aria-label="Range" />
            </div>
          </Card>
          <Card border={1} style={{ padding: 20 }}>
            <div className="grid gap-4">
            <span className={label}>status</span>
            <div className="flex flex-wrap gap-2">
              <Badge>shipped</Badge>
              <Badge variant="secondary">queued</Badge>
              <Badge variant="outline">draft</Badge>
              <Badge variant="destructive">failed</Badge>
            </div>
            <Progress value={72} label="Build progress" />
            <span className="flex items-center gap-3 text-sm"><Spinner /> Quantizing…</span>
            </div>
          </Card>
          <Card border={1} style={{ padding: 20 }}>
            <div className="grid gap-4">
            <span className={label}>actions</span>
            <div className="flex flex-wrap gap-3">
              <Button>Ship it</Button>
              <Button variant="outline">Preview</Button>
            </div>
            <Button size="lg" style={{ width: "100%" }}>Install the registry</Button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
