import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function HomePage() {
  const featuredProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
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
        <span style={{ fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 18, letterSpacing: "0.05em" }}>
          SHARKBOMB AUDIO
        </span>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
         <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
  <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
  <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
  <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
  <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a" }}>CONTACT</Link>
</div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "120px 48px 100px",
        maxWidth: 900,
        margin: "0 auto",
        borderBottom: "1px solid #ddd",
      }}>
        <p style={{
          fontSize: 13,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#888",
          marginBottom: 24,
        }}>
          Electrical Engineering · Audio Equipment
        </p>
        <h1 style={{
          fontSize: "clamp(42px, 7vw, 80px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: "0 0 32px",
          letterSpacing: "-0.02em",
        }}>
          Building the gear<br />
          <em>that shapes the sound.</em>
        </h1>
        <p style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: "#444",
          maxWidth: 560,
          marginBottom: 40,
        }}>
          Sharkbomb Audio specializes in the design, modification, and repair
          of audio equipment — from custom builds to vintage restorations.
        </p>
        <Link href="/projects" style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "#1a1a1a",
          color: "#f8f6f1",
          textDecoration: "none",
          fontSize: 13,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          View Projects
        </Link>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          Featured Work
        </p>
        <div style={{ display: "grid", gap: 48 }}>
          {featuredProjects.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>No projects yet.</p>
          ) : (
            featuredProjects.map((project, i) => {
              const thumb = project.images[0]?.url ?? project.coverImage;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: thumb ? "1fr 1fr" : "1fr", gap: 32, alignItems: "center" }}
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
                    <p style={{ color: "#555", lineHeight: 1.6, fontSize: 15 }}>{project.summary}</p>
                    {project.tech?.length > 0 && (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                        {project.tech.map((t) => (
                          <span key={t} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", border: "1px solid #ccc", padding: "3px 8px" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p style={{ marginTop: 20, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid #1a1a1a", display: "inline-block", paddingBottom: 2 }}>
                      View Project →
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        {featuredProjects.length > 0 && (
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/projects" style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}>
              All Projects →
            </Link>
          </div>
        )}
      </section>

      {/* SKILLS */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          Capabilities
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {[
            { title: "Custom Builds", desc: "Designing audio equipment from the ground up — amplifiers, preamps, and more." },
            { title: "Modifications", desc: "Upgrading and modifying existing equipment to improve performance and tone." },
            { title: "Repair & Restoration", desc: "Bringing vintage and modern audio gear back to life." },
            { title: "Circuit Design", desc: "Analog and mixed-signal circuit design for audio applications." },
          ].map((skill) => (
            <div key={skill.title}>
              <h3 style={{ fontSize: 16, fontWeight: "normal", fontFamily: "'Georgia', serif", marginBottom: 12, borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
                {skill.title}
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT BLURB */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          About
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "normal", fontFamily: "'Georgia', serif", lineHeight: 1.2, margin: 0 }}>
            Precision engineering<br />
            <em>for serious sound.</em>
          </h2>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", marginBottom: 16 }}>
              Sharkbomb Audio was founded on the belief that great audio equipment should be built to last — and when it doesn't, it should be fixable.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", marginBottom: 24 }}>
              From hand-wired tube amplifiers to precision solid-state designs, every project is approached with the same care and technical rigor.
            </p>
            <Link href="/about" style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}>
              More About Sharkbomb →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          Get In Touch
        </p>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href="mailto:Evan@sharkbomb.net"
            style={{ fontSize: 15, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2, letterSpacing: "0.02em" }}
          >
            Evan@sharkbomb.net
          </a>
          <a
            href="https://github.com/SharkbombEvan"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/evandemsey/"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
          >
            LinkedIn
          </a>
          {/* Instagram placeholder — uncomment and add URL when ready:
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
          >
            Instagram
          </a>
          */}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
        <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
        <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
      </footer>

    </main>
  );
}
