// Single source of truth for project domain tags.
// Used by the admin forms (checkboxes) and the public /projects filter chips.
export const AREAS = [
  { value: "audio", label: "Audio" },
  { value: "embedded", label: "Embedded" },
  { value: "power", label: "Power" },
  { value: "rf", label: "RF" },
  { value: "pcb", label: "PCB Design" },
  { value: "software", label: "Software" },
  { value: "research", label: "Research" },
  { value: "coursework", label: "Coursework" },
] as const;

export type AreaValue = (typeof AREAS)[number]["value"];

export function areaLabel(value: string): string {
  return AREAS.find((a) => a.value === value)?.label ?? value;
}

export function isArea(value: string | undefined): value is AreaValue {
  return !!value && AREAS.some((a) => a.value === value);
}
