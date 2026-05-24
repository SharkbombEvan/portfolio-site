import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";
export const revalidate = 0;
export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Admin</h1>
        <LogoutButton />
      </div>
      <Link href="/admin/new">+ New Project</Link>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.title} — <Link href={`/admin/${p.id}/edit`}>Edit</Link>
            <DeleteButton id={p.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
