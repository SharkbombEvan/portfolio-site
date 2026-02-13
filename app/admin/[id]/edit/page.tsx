import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

async function updateProject(id: string, formData: FormData) {
  "use server";

  const techRaw = (formData.get("tech") as string) || "";
  const tech = techRaw.split(",").map(s => s.trim()).filter(Boolean);

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      summary: (formData.get("summary") as string) || "",
      content: (formData.get("content") as string) || null,
      coverImage: (formData.get("coverImage") as string) || null,
      demoUrl: (formData.get("demoUrl") as string) || null,
      repoUrl: (formData.get("repoUrl") as string) || null,
      tech,
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
  });

  if (!project) return notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Edit Project</h1>
      <form action={action} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>Title <input name="title" defaultValue={project.title} required /></label>
        <label>Slug <input name="slug" defaultValue={project.slug} required /></label>
        <label>Summary <textarea name="summary" defaultValue={project.summary} rows={3} /></label>
        <label>Tech <input name="tech" defaultValue={(project.tech || []).join(", ")} /></label>
        <label>Content <textarea name="content" defaultValue={project.content ?? ""} rows={12} /></label>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}