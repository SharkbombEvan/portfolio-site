import Link from "next/link";
import { AREAS } from "@/lib/areas";

// Linkable filter tabs driven by ?area=. Only areas that have projects are shown.
export default function AreaFilter({
  active,
  available,
  basePath = "/projects",
}: {
  active?: string;
  available: string[];
  basePath?: string;
}) {
  const tabs = [
    { value: "", label: "All" },
    ...AREAS.filter((a) => available.includes(a.value)).map((a) => ({ value: a.value, label: a.label })),
  ];
  return (
    <nav aria-label="Filter projects by area" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
      {tabs.map((t) => (
        <Link
          key={t.value || "all"}
          href={t.value ? `${basePath}?area=${t.value}` : basePath}
          aria-current={(active ?? "") === t.value ? "page" : undefined}
          className="tab"
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
