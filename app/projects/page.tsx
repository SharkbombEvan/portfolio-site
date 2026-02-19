import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a1a" }}>

      {/* NAV */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        borderBottom: "1px solid #ddd",
        background: "#f8f6f1",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{ fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 18, letterSpacing: "0.05em", textDecoration: "none", color: "#1a1a1a" }}>
          SHARKBOMB AUDIO
        </Link>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
          <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
  <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
  <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
  <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
  <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a" }}>CONTACT</Link>
</div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "80px 48px 64px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 24 }}>
          Portfolio
        </p>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}>
          All Projects
        </h1>
      </section>

      {/* PROJECTS LIST */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto" }}>
        {projects.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>No projects yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 64 }}>
            {projects.map((project, i) => {
              const thumb = project.images[0]?.url ?? project.coverImage;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "grid",
                    gridTemplateColumns: thumb ? "1fr 1fr" : "1fr",
                    gap: 40,
                    alignItems: "center",
                    paddingBottom: 64,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {thumb && (
                    <img
                      src={thumb}
                      alt={project.title}
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",
                        objectFit: "cover",
                        filter: "grayscale(20%)",
                        order: i % 2 === 0 ? 0 : 1,
                      }}
                    />
                  )}
                  <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                    <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 style={{ fontSize: 28, fontWeight: "normal", marginBottom: 12, fontFamily: "'Georgia', serif" }}>
                      {project.title}
                    </h2>
                    <p style={{ color: "#555", lineHeight: 1.6, fontSize: 15, marginBottom: 16 }}>
                      {project.summary}
                    </p>
                    {project.tech?.length > 0 && (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {project.tech.map((t) => (
                          <span key={t} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", border: "1px solid #ccc", padding: "3px 8px" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid #1a1a1a", display: "inline-block", paddingBottom: 2 }}>
                      View Project →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
        <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
        <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
      </footer>

    </main>
  );
}
