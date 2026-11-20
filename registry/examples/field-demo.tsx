"use client";

import { Checkbox } from "@/registry/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/registry/ui/field";
import { Input } from "@/registry/ui/input";

export default function FieldDemo() {
  return (
    <FieldSet style={{ maxWidth: 380 }}>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
          <FieldDescription>Shown on your profile.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="field-handle">Handle</FieldLabel>
          <Input id="field-handle" defaultValue="ada!" aria-invalid />
          <FieldError errors={[{ message: "Letters, numbers and dashes only." }]} />
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-anon" />
          <FieldLabel htmlFor="field-anon">Stay anonymous</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
