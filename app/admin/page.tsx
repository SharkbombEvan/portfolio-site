import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { areaLabel } from "@/lib/areas";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";
import * as ui from "@/components/admin/ui";

export const revalidate = 0;

const badge = {
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 999,
  background: "var(--paper-2)",
  color: "var(--muted)",
  whiteSpace: "nowrap" as const,
};

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <main style={ui.adminPage}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        <div>
          <h1 className="display" style={{ fontSize: 40, margin: 0 }}>Projects</h1>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 15 }}>
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" className="link" style={{ fontSize: 15, color: "var(--muted)" }}>View site</Link>
          <LogoutButton />
          <Link href="/admin/new" style={ui.btnPrimary} className="admin-btn">New project</Link>
        </div>
      </div>

      <div style={{ ...ui.card, padding: 0, overflow: "hidden" }}>
        {projects.length === 0 && (
          <p style={{ padding: 24, margin: 0, color: "var(--muted)" }}>No projects yet. Create the first one.</p>
        )}
        {projects.map((p, i) => {
          const thumb = p.images[0]?.url ?? p.coverImage;
          const hasAudioCopy = !!(p.audioSummary || p.audioContent);
          return (
            <div
              key={p.id}
              className="admin-row"
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}
            >
              <div style={{ width: 64, height: 48, flex: "none", background: "var(--paper-2)", borderRadius: 3, overflow: "hidden" }}>
                {thumb && <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="display" style={{ fontSize: 18, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                  {p.areas.map((a) => <span key={a} style={badge}>{areaLabel(a)}</span>)}
                  {p.isProduct && <span style={badge}>Product</span>}
                  {p.featured && <span style={badge}>On home page</span>}
                  {p.audioFeatured && <span style={badge}>On audio page</span>}
                  {p.areas.includes("audio") && !hasAudioCopy && <span style={{ ...badge, background: "transparent", boxShadow: "inset 0 0 0 1px var(--rule)" }}>No audio description</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "none" }}>
                <Link href={`/projects/${p.slug}`} className="link" style={{ fontSize: 14, color: "var(--muted)", marginRight: 4 }}>View</Link>
                <Link href={`/admin/${p.id}/edit`} style={{ ...ui.btnGhost, padding: "7px 14px", fontSize: 14 }} className="admin-btn">Edit</Link>
                <DeleteButton id={p.id} title={p.title} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
