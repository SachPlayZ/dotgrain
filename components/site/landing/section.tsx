import type { ReactNode } from "react";

/** Numbered section header: the landing reads like a print run, §00 to §05. */
export function Section({ n, title, lede, children, className = "" }: { n: string; title: ReactNode; lede?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`border-b px-4 py-20 sm:px-8 ${className}`}>
      <header className="mb-12 grid gap-4 md:grid-cols-[10rem_1fr]">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fd-primary">§{n}</span>
        <div className="flex flex-col gap-3">
          <h2 className="max-w-4xl font-mono text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">{title}</h2>
          {lede && <p className="max-w-2xl text-lg text-fd-muted-foreground">{lede}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

export const Italic = ({ children }: { children: ReactNode }) => <span className="font-serif font-normal normal-case tracking-[-0.02em] text-fd-primary">{children}</span>;
