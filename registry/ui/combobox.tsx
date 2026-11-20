"use client";

import { useState, type CSSProperties } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Grain, useInk } from "@/lib/dotgrain/grain";
import type { DitherTokens } from "@/lib/dotgrain/types";

export interface ComboboxOption {
  value: string;
  label: string;
}

export type ComboboxProps = Partial<DitherTokens> & {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Names the trigger for assistive tech when no visible label points at it. */
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
};

/** shadcn's combobox recipe as one component: a Popover holding a searchable Command list. */
export function Combobox({ options, value, defaultValue = "", onValueChange, placeholder = "Select…", searchPlaceholder = "Search…", emptyText = "Nothing found.", className, style, "aria-label": label, ...tokens }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [own, setOwn] = useState(defaultValue);
  const current = value ?? own;
  const { bg, fg } = useInk(tokens);
  const picked = options.find((o) => o.value === current);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        aria-label={label}
        className={className}
        style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 8, minWidth: 200, padding: "8px 10px 12px", border: `1px solid ${fg}`, background: bg, color: fg, font: "inherit", cursor: "pointer", ...style }}
      >
        <span style={{ opacity: picked ? 1 : 0.6 }}>{picked?.label ?? placeholder}</span>
        <span aria-hidden="true" style={{ fontFamily: "monospace" }}>⇅</span>
        <Grain {...tokens} params={{ value: open ? 1.3 : -0.3, softness: 0.3 }} style={{ top: "auto", height: 4 }} />
      </PopoverTrigger>
      <PopoverContent {...tokens} align="start" style={{ width: "var(--radix-popover-trigger-width)", minWidth: 200, padding: 0 }}>
        <Command {...tokens} frame={false} style={{ background: "transparent" }}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.label}
                  onSelect={() => {
                    const next = o.value === current ? "" : o.value;
                    setOwn(next);
                    onValueChange?.(next);
                    setOpen(false);
                  }}
                >
                  <span aria-hidden="true" style={{ width: "1em" }}>{o.value === current ? "✓" : ""}</span>
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
