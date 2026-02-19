import Link from "next/link";
import { prisma } from "@/lib/prisma";
export const revalidate = 0;
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Projects</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {projects.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
            <h2 style={{ margin: 0 }}>
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </h2>
            <p style={{ marginTop: 8 }}>{p.summary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}