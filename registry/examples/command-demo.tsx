"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/registry/ui/command";

export default function CommandDemo() {
  return (
    <Command style={{ width: 360 }}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>New canvas</CommandItem>
          <CommandItem>Import image</CommandItem>
          <CommandItem>Switch to ASCII</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            Palette<CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Preferences<CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
