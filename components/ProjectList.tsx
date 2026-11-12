import ProjectCard, { type CardProject } from "@/components/ProjectCard";
import type { SiteMode } from "@/lib/site";

export default function ProjectList({
  projects,
  mode = "general",
  emptyText = "No projects yet.",
}: {
  projects: CardProject[];
  mode?: SiteMode;
  emptyText?: string;
}) {
  if (projects.length === 0) {
    return <p style={{ color: "var(--muted)" }}>{emptyText}</p>;
  }
  return (
    <div className="index-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} mode={mode} />
      ))}
    </div>
  );
}
