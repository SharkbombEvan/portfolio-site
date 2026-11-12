import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import { prisma } from "@/lib/prisma";
import { cardInclude } from "@/lib/projects";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Products — Sharkbomb Audio",
  description: "Hand-built guitar pedals and audio equipment, designed, built, and tested by Sharkbomb Audio.",
};

export default async function AudioProductsPage() {
  const products = await prisma.project.findMany({
    where: { isProduct: true },
    orderBy: { createdAt: "desc" },
    include: cardInclude,
  });

  return (
    <main data-mode="audio">
      <MobileNav mode="audio" activePage="/audio/products" />
      <PageHeader title="Products" intro="Hand-built audio gear for sale. Each piece is designed, built and tested by me." />
      <section className="wrap" style={{ paddingBottom: 112 }}>
        <ProjectList projects={products} mode="audio" emptyText="No products listed right now." />
      </section>
      <SiteFooter mode="audio" />
    </main>
  );
}
