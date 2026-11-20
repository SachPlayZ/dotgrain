"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu";

const links = [
  ["Dither Field", "A live value field, quantised to pixels."],
  ["Dither Image", "Any image, ordered or diffused."],
  ["ASCII Video", "Video or webcam as glyphs."],
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul style={{ display: "grid", gap: 4, width: 300, margin: 0, padding: 0, listStyle: "none" }}>
              {links.map(([title, text]) => (
                <li key={title}>
                  <NavigationMenuLink href="#">
                    <strong style={{ display: "block" }}>{title}</strong>
                    <span style={{ fontSize: 13, opacity: 0.75 }}>{text}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" style={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
