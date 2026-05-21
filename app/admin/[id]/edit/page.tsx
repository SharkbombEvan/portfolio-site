import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditProjectForm from "@/components/admin/EditProjectForm";

type Img = { url: string; alt?: string };

async function updateProject(id: string, formData: FormData) {
  "use server";

  // Tech (comma-separated string -> string[])
  const techRaw = (formData.get("tech") as string) || "";
  const tech = techRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Images (JSON string -> array)
  const imagesRaw = (formData.get("images") as string) || "[]";
  let images: Img[] = [];
  try {
    const parsed = JSON.parse(imagesRaw);
    if (Array.isArray(parsed)) {
      images = parsed
        .filter((x) => x && typeof x.url === "string" && x.url.length > 0)
        .map((x) => ({ url: x.url, alt: typeof x.alt === "string" ? x.alt : undefined }));
    }
  } catch {
    images = [];
  }

  await prisma.project.update({
    where: { id },
    data: {
      title: (formData.get("title") as string) ?? "",
      slug: (formData.get("slug") as string) ?? "",
      summary: (formData.get("summary") as string) || "",
      content: (formData.get("content") as string) || null,
      // Keep these since you already have them in your model update:
      isProduct: formData.get("isProduct") === "true",
      coverImage: (formData.get("coverImage") as string) || null,
      demoUrl: (formData.get("demoUrl") as string) || null,
      repoUrl: (formData.get("repoUrl") as string) || null,
      shopUrl: (formData.get("shopUrl") as string) || null,

      tech,

      // Replace-all strategy for gallery images:
      images: {
        deleteMany: {},
        create: images.map((img, i) => ({
          url: img.url,
          alt: img.alt ?? null,
          order: i,
        })),
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

  const action = updateProject.bind(null, project.id);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Edit Project</h1>
      <EditProjectForm
        project={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          summary: project.summary ?? "",
          tech: project.tech ?? [],
          content: project.content ?? "",
          coverImage: project.coverImage ?? "",
          demoUrl: project.demoUrl ?? "",
          repoUrl: project.repoUrl ?? "",
          shopUrl: project.shopUrl ?? "",
          isProduct: project.isProduct ?? false,
          images: project.images.map((img) => ({ url: img.url, alt: img.alt ?? undefined })),
        }}
        action={action}
      />
    </main>
  );
}
