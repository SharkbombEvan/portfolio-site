import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MobileNav from "@/components/MobileNav";

export const revalidate = 0;

export default async function HomePage() {
  const featuredProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a1a" }}>

      <MobileNav activePage="/" />

      {/* HERO */}
      <section className="mobile-pad" style={{
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
      <section className="mobile-pad" style={{ padding: "80px 48px", maxWidth: 1100, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          Featured Work
        </p>
        {featuredProjects.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>No projects yet.</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 40,
          }}>
            {featuredProjects.map((project) => {
              const thumb = project.images[0]?.url ?? project.coverImage;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: "#ede9e3",
                    overflow: "hidden",
                    marginBottom: 16,
                  }}>
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>No Image</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>
                    Sharkbomb Audio
                  </p>
                  <h2 style={{ fontSize: 18, fontWeight: "normal", fontFamily: "'Georgia', serif", marginBottom: 6 }}>
                    {project.title}
                  </h2>
                  {project.isProduct && project.price && (
                    <p style={{ fontSize: 15, fontFamily: "'Georgia', serif", color: "#1a1a1a", marginBottom: 8 }}>
                      {project.price}
                    </p>
                  )}
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>
                    {project.summary}
                  </p>
                  {project.tech?.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                      {project.tech.map((t) => (
                        <span key={t} style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", border: "1px solid #ccc", padding: "2px 7px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid #1a1a1a", display: "inline-block", paddingBottom: 2 }}>
                    View Details →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
        {featuredProjects.length > 0 && (
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/projects" style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}>
              All Projects →
            </Link>
          </div>
        )}
      </section>

      {/* SKILLS */}
      <section className="mobile-pad" style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
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
      <section className="mobile-pad" style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 48 }}>
          About
        </p>
        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
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
      <section className="mobile-pad" style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto" }}>
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
      <footer className="mobile-footer" style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
        <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
        <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
      </footer>

    </main>
  );
}
