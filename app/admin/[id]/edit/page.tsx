import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { parseProjectForm } from "@/lib/admin-form";
import * as ui from "@/components/admin/ui";

async function updateProject(id: string, formData: FormData) {
  "use server";

  const { data, images } = parseProjectForm(formData);
  if (!data.title || !data.slug) return { error: "Title and slug are required." };

  const clash = await prisma.project.findFirst({ where: { slug: data.slug, NOT: { id } }, select: { id: true } });
  if (clash) return { error: `Another project already uses the slug "${data.slug}".` };

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      // Replace-all strategy for gallery images:
      images: {
        deleteMany: {},
        create: images.map((img, i) => ({ url: img.url, alt: img.alt ?? null, order: i })),
      },
    },
  });

  redirect("/admin");
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!project) return notFound();

  return (
    <main style={ui.adminPage}>
      <Link href="/admin" className="link" style={{ fontSize: 15, color: "var(--muted)" }}>Back to projects</Link>
      <h1 className="display" style={{ fontSize: 36, margin: "16px 0 28px" }}>Edit project</h1>
      <ProjectForm
        submitLabel="Save changes"
        action={updateProject.bind(null, project.id)}
        initial={{
          title: project.title,
          slug: project.slug,
          summary: project.summary ?? "",
          content: project.content ?? "",
          audioSummary: project.audioSummary ?? "",
          audioContent: project.audioContent ?? "",
          tech: project.tech ?? [],
          coverImage: project.coverImage ?? "",
          demoUrl: project.demoUrl ?? "",
          repoUrl: project.repoUrl ?? "",
          shopUrl: project.shopUrl ?? "",
          price: project.price ?? "",
          isProduct: project.isProduct ?? false,
          areas: project.areas ?? [],
          featured: project.featured,
          featuredOrder: project.featuredOrder != null ? String(project.featuredOrder) : "",
          audioFeatured: project.audioFeatured,
          role: project.role ?? "",
          year: project.year ?? "",
          context: project.context ?? "",
          highlights: project.highlights ?? [],
          images: project.images.map((img) => ({ url: img.url, alt: img.alt ?? undefined })),
        }}
      />
    </main>
  );
}
