"use client";

import type { ComponentProps, ReactNode } from "react";
import { Label } from "@/components/ui/label";

type Div = ComponentProps<"div">;

/** Layout for forms: a field set, groups, and label/control/description/error rows. No canvas of its own. */
export const FieldSet = ({ style, ...props }: ComponentProps<"fieldset">) => (
  <fieldset {...props} style={{ display: "grid", gap: 16, margin: 0, padding: 0, border: 0, minWidth: 0, ...style }} />
);

export const FieldLegend = ({ variant = "legend", style, ...props }: ComponentProps<"legend"> & { variant?: "legend" | "label" }) => (
  <legend {...props} style={{ padding: 0, marginBottom: 4, fontWeight: 600, fontSize: variant === "legend" ? 16 : 14, ...style }} />
);

export const FieldGroup = ({ style, ...props }: Div) => <div {...props} style={{ display: "grid", gap: 24, ...style }} />;

export type FieldProps = Div & { orientation?: "vertical" | "horizontal" };

export const Field = ({ orientation = "vertical", style, ...props }: FieldProps) => (
  <div
    role="group"
    data-orientation={orientation}
    {...props}
    style={{ display: "flex", flexDirection: orientation === "horizontal" ? "row" : "column", alignItems: orientation === "horizontal" ? "center" : "stretch", gap: orientation === "horizontal" ? 12 : 8, ...style }}
  />
);

export const FieldContent = ({ style, ...props }: Div) => <div {...props} style={{ display: "grid", gap: 4, flex: 1, ...style }} />;
export const FieldLabel = Label;
export const FieldTitle = ({ style, ...props }: Div) => <div {...props} style={{ fontSize: 14, fontWeight: 500, ...style }} />;
export const FieldDescription = ({ style, ...props }: ComponentProps<"p">) => <p {...props} style={{ margin: 0, fontSize: 13, opacity: 0.7, ...style }} />;

/** An ASCII rule, optionally with a label in the middle ("── or ──"). */
export function FieldSeparator({ children, style, ...props }: Div) {
  return (
    <div role="separator" {...props} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, overflow: "hidden", whiteSpace: "nowrap", ...style }}>
      <span aria-hidden="true" style={{ flex: 1, overflow: "hidden" }}>{"─".repeat(120)}</span>
      {children}
      {children ? <span aria-hidden="true" style={{ flex: 1, overflow: "hidden" }}>{"─".repeat(120)}</span> : null}
    </div>
  );
}

export type FieldErrorProps = Div & { errors?: Array<{ message?: string } | undefined> };

/** Validation messages, announced as an alert; pass children or `errors` (e.g. from react-hook-form). */
export function FieldError({ errors, children, style, ...props }: FieldErrorProps) {
  const messages = [...new Set(errors?.map((e) => e?.message).filter(Boolean))];
  const content: ReactNode = children ?? (messages.length > 1 ? <ul style={{ margin: 0, paddingLeft: 16 }}>{messages.map((m) => <li key={m}>{m}</li>)}</ul> : messages[0]);
  if (!content) return null;
  return (
    <div role="alert" {...props} style={{ fontSize: 13, ...style }}>
      <span aria-hidden="true">! </span>
      {content}
    </div>
  );
}
