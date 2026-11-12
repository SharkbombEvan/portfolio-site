import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import AreaFilter from "@/components/AreaFilter";
import { prisma } from "@/lib/prisma";
import { cardInclude } from "@/lib/projects";
import { areaLabel, isArea } from "@/lib/areas";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Work — Evan Demsey",
  description: "Selected engineering projects by Evan Demsey: analog circuits, audio hardware, and more.",
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ area?: string }> }) {
  const { area } = await searchParams;
  const active = isArea(area) ? area : undefined;

  const [projects, allAreas] = await Promise.all([
    prisma.project.findMany({
      where: active ? { areas: { has: active } } : undefined,
      orderBy: { createdAt: "desc" },
      include: cardInclude,
    }),
    prisma.project.findMany({ select: { areas: true } }),
  ]);
  const available = Array.from(new Set(allAreas.flatMap((p) => p.areas)));

  return (
    <main data-mode="general">
      <MobileNav mode="general" activePage="/projects" />
      <PageHeader title={active ? areaLabel(active) : "Work"}>
        {available.length > 1 && <AreaFilter active={active} available={available} />}
      </PageHeader>
      <section className="wrap" style={{ paddingBottom: 112 }}>
        <ProjectList projects={projects} mode="general" emptyText="Nothing in this area yet." />
      </section>
      <SiteFooter mode="general" />
    </main>
  );
}
