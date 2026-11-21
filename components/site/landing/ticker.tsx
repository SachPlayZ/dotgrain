import { components } from "@/registry/meta";

/** Every component name, scrolling. Decorative: the wall below lists them as links. */
export function Ticker() {
  const names = components.map((c) => c.name).join("  ▪  ");
  return (
    <div aria-hidden="true" className="overflow-hidden border-b bg-fd-primary py-3 font-mono text-sm uppercase tracking-[0.2em] text-fd-primary-foreground">
      <div className="dg-marquee flex w-max whitespace-pre">
        <span>{names}  ▪  </span>
        <span>{names}  ▪  </span>
      </div>
    </div>
  );
}
