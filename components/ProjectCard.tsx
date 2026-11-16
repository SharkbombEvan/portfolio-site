import Link from "next/link";
import { areaLabel } from "@/lib/areas";
import { withMode, type SiteMode } from "@/lib/site";

export type CardProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  audioSummary?: string | null;
  tech: string[];
  areas: string[];
  context: string | null;
  year: string | null;
  coverImage: string | null;
  isProduct: boolean;
  price: string | null;
  images: { url: string }[];
};

const FOR_SALE = /^for[\s_-]?sale$/i;

// The portfolio side doesn't read as a store: drop "for sale" tags there.
export function visibleTech(tech: string[], mode: SiteMode): string[] {
  return mode === "audio" ? tech : tech.filter((t) => !FOR_SALE.test(t.trim()));
}

// Audio side prefers its own product-brief copy; falls back to the portfolio summary.
export function summaryFor(p: Pick<CardProject, "summary" | "audioSummary">, mode: SiteMode): string {
  return (mode === "audio" && p.audioSummary?.trim()) || p.summary;
}

export function metaFor(p: CardProject): string {
  const first = p.context ?? (p.areas[0] ? areaLabel(p.areas[0]) : "");
  return [first, p.year].filter(Boolean).join(", ");
}

export default function ProjectCard({
  project,
  mode = "general",
  featured = false,
}: {
  project: CardProject;
  mode?: SiteMode;
  featured?: boolean;
}) {
  const thumb = project.images[0]?.url ?? project.coverImage;
  const meta = metaFor(project);
  const tech = visibleTech(project.tech ?? [], mode);
  return (
    <Link href={withMode(`/projects/${project.slug}`, mode)} className="card">
      <div className="media" style={{ aspectRatio: featured ? "1/1" : "4/3", marginBottom: 18 }}>
        {thumb ? (
          <img src={thumb} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 14 }}>
            No photo yet
          </div>
        )}
      </div>
      {meta && <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 6 }}>{meta}</p>}
      <h3 className="display" style={{ fontSize: featured ? 34 : 24, margin: "0 0 8px", display: "inline" }}>
        <span className="title">{project.title}</span>
      </h3>
      {mode === "audio" && project.isProduct && project.price && (
        <p style={{ fontSize: 16, fontWeight: 500, margin: "10px 0 0" }}>{project.price}</p>
      )}
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)", margin: "10px 0 0", maxWidth: "52ch" }}>{summaryFor(project, mode)}</p>
      {tech.length > 0 && (
        <p className="mono" style={{ color: "var(--muted)", margin: "12px 0 0" }}>
          {tech.slice(0, 4).join(", ")}
        </p>
      )}
    </Link>
  );
}
