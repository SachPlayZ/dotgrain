"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="dither" style={{ width: 360 }}>
      <TabsList>
        <TabsTrigger value="dither">Dither</TabsTrigger>
        <TabsTrigger value="ascii">ASCII</TabsTrigger>
        <TabsTrigger value="diffusion">Diffusion</TabsTrigger>
      </TabsList>
      <TabsContent value="dither">Pixels on or off, chosen by a Bayer threshold.</TabsContent>
      <TabsContent value="ascii">Each cell picks a glyph from a density ramp.</TabsContent>
      <TabsContent value="diffusion">Error spreads to the neighbours, for still images.</TabsContent>
    </Tabs>
  );
}
