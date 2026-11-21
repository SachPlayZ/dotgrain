"use client";

import { useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { AsciiChart } from "@/registry/ui/ascii-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Card } from "@/registry/ui/card";
import { Chart, type ChartConfig } from "@/registry/ui/chart";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/registry/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";
import { Reveal } from "./motion";
import { Section } from "./section";
import { ScrambleText } from "@/registry/ui/scramble-text";

const NAV = [["Overview", 0], ["Deploys", 3], ["Palettes", 0], ["Settings", 0]] as const;
const STATS = [
  { label: "Frames", value: "1.2M", data: [4, 6, 5, 8, 7, 9, 11, 10, 13] },
  { label: "p95 ms", value: "0.8", data: [9, 8, 8, 6, 7, 5, 4, 4, 3] },
  { label: "Installs", value: "4,812", data: [2, 3, 5, 4, 7, 8, 9, 12, 14] },
];
const TRAFFIC = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => ({ day, dither: [120, 180, 150, 240, 210, 260][i], ascii: [80, 90, 140, 120, 170, 190][i] }));
const config = { dither: { label: "Dither" }, ascii: { label: "ASCII" } } satisfies ChartConfig;
const DEPLOYS = [
  ["hero-field", "shipped", "2m"],
  ["ascii-rain", "queued", "6m"],
  ["palette/sunset", "shipped", "1h"],
  ["cpu-fallback", "failed", "3h"],
] as const;
const VARIANT = { shipped: "default", queued: "secondary", failed: "destructive" } as const;

const NARROW = "(max-width: 767px)";
const subscribeNarrow = (onChange: () => void) => {
  const query = matchMedia(NARROW);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** A whole app screen, nothing but dotgrain components, all of it live. */
export function Showcase() {
  // Phones get the content, not the nav: collapsed below md until toggled; the trigger still opens it.
  const narrow = useSyncExternalStore(subscribeNarrow, () => matchMedia(NARROW).matches, () => false);
  const [toggled, setOpen] = useState<boolean | null>(null);
  const open = toggled ?? !narrow;
  return (
    <Section n="02" title="Built with dotgrain," italic="start to finish." lede="A full app screen: sidebar, tabs, charts, table, dialog, toasts. Every pixel below is one of our components, and every control works.">
      <Reveal>
      <SidebarProvider open={open} onOpenChange={setOpen} style={{ minHeight: 560, border: "1px solid var(--color-fd-border)" }} className="bg-fd-card">
        <Sidebar width="13rem">
          <SidebarHeader>
            <strong className="font-mono uppercase tracking-widest">▚ grainops</strong>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map(([item, count], i) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton isActive={i === 0}>{item}</SidebarMenuButton>
                      {count > 0 && <SidebarMenuBadge>{count}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset style={{ padding: 20, display: "grid", gap: 20, alignContent: "start", minWidth: 0 }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h3 className="font-mono text-lg font-bold uppercase tracking-wider">Overview</h3>
              <Badge variant="outline">prod</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Invite</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite a teammate</DialogTitle>
                    <DialogDescription>They get access to every palette in this workspace.</DialogDescription>
                  </DialogHeader>
                  <Label style={{ display: "grid", gap: 6 }}>
                    Email
                    <Input type="email" placeholder="ada@example.com" />
                  </Label>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => toast.success("Invite sent", { description: "They'll get an email shortly." })}>Send invite</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Avatar style={{ width: 32, height: 32 }}>
                <AvatarImage src="/examples/avatar.svg" alt="Your avatar" />
                <AvatarFallback>DG</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
              <Card border={1} style={{ padding: 18 }}>
                <div className="grid gap-2">
                <span className="font-mono text-xs uppercase tracking-widest opacity-70">{s.label}</span>
                <strong className="font-mono text-3xl">
                  <ScrambleText trigger="inView" duration={1200}>{s.value}</ScrambleText>
                </strong>
                <AsciiChart type="sparkline" data={s.data} label={`${s.label} trend`} />
                </div>
              </Card>
              </Reveal>
            ))}
          </div>

          <Tabs defaultValue="traffic">
            <TabsList>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="deploys">Deploys</TabsTrigger>
            </TabsList>
            <TabsContent value="traffic" style={{ paddingTop: 16 }}>
              <Chart data={TRAFFIC} config={config} index="day" label="Renders by mode, Monday to Saturday" height={220} legend />
            </TabsContent>
            <TabsContent value="deploys" style={{ paddingTop: 16, overflowX: "auto" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>When</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEPLOYS.map(([branch, status, when]) => (
                    <TableRow key={branch}>
                      <TableCell className="font-mono">{branch}</TableCell>
                      <TableCell><Badge variant={VARIANT[status]}>{status}</Badge></TableCell>
                      <TableCell>{when} ago</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => toast(`Redeploying ${branch}`)}>Redeploy</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </SidebarInset>
      </SidebarProvider>
      </Reveal>
    </Section>
  );
}
