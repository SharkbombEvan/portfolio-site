import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";


export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!project) return notFound();

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link href="/projects">← Back to Projects</Link>

      <h1 style={{ marginTop: 16 }}>{project.title}</h1>
      <p style={{ opacity: 0.8 }}>{project.summary}</p>

      {/* Show the carousel if there are gallery images, otherwise fall back to coverImage */}
      {project.images.length > 0 ? (
        <ImageGallery images={project.images} />
      ) : project.coverImage ? (
        <img
          src={project.coverImage}
          alt={`${project.title} cover`}
          style={{ width: "100%", borderRadius: 12, marginTop: 16 }}
        />
      ) : null}

      {project.tech?.length ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                border: "1px solid #ddd",
                borderRadius: 999,
                padding: "4px 10px",
                fontSize: 12,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : null}
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            GitHub Repo
          </a>
        ) : null}
      </div>

      <hr style={{ margin: "24px 0" }} />

      {project.content ? (
        <article style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
          {project.content}
        </article>
      ) : (
        <p style={{ opacity: 0.7 }}>No content yet.</p>
      )}
    </main>
  );
}
