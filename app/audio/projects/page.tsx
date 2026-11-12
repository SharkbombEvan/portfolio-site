import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import { prisma } from "@/lib/prisma";
import { cardInclude } from "@/lib/projects";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Audio Projects — Sharkbomb Audio",
  description: "Custom pedals, amplifier builds, modifications, and restorations by Sharkbomb Audio.",
};

export default async function AudioProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { areas: { has: "audio" } },
    orderBy: { createdAt: "desc" },
    include: cardInclude,
  });

  return (
    <main data-mode="audio">
      <MobileNav mode="audio" activePage="/audio/projects" />
      <PageHeader title="Projects" intro="Pedals, amplifier builds, modifications and restorations." />
      <section className="wrap" style={{ paddingBottom: 112 }}>
        <ProjectList projects={projects} mode="audio" />
      </section>
      <SiteFooter mode="audio" />
    </main>
  );
}
