import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export default async function AdminPage() {
  const projects: Project[] = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin</h1>
      <Link href="/admin/new">+ New Project</Link>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.title} — <Link href={`/admin/${p.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}