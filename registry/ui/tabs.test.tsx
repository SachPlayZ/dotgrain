// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

afterEach(cleanup);

describe("Tabs", () => {
  it("shows the active panel and switches on activation", () => {
    render(
      <Tabs defaultValue="a" activationMode="manual">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tabpanel").textContent).toBe("Panel A");
    fireEvent.mouseDown(screen.getByRole("tab", { name: "B" }), { button: 0 });
    expect(screen.getByRole("tab", { name: "B" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toBe("Panel B");
  });
});
