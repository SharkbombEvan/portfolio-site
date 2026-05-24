import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import ReactMarkdown from "react-markdown";
import MobileNav from "@/components/MobileNav";

export const revalidate = 0;

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

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

  const backHref = project.isProduct ? "/products" : "/projects";
  const backLabel = project.isProduct ? "← Back to Products" : "← Back to Projects";
  const activeSection = project.isProduct ? "products" : "projects";

  const youtubeId = project.demoUrl ? extractYouTubeId(project.demoUrl) : null;
  const showExternalDemoLink = project.demoUrl && !youtubeId;
  const hasMedia = project.images.length > 0 || project.coverImage || youtubeId;

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a1a" }}>

      <MobileNav activePage={activeSection === "products" ? "/products" : "/projects"} />

      {/* HEADER */}
      <section className="mobile-pad" style={{ padding: "80px 48px 64px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <Link
          href={backHref}
          style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", textDecoration: "none", display: "inline-block", marginBottom: 40 }}
        >
          {backLabel}
        </Link>
        {project.isProduct && (
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>
            Available Now
          </p>
        )}
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: "0 0 24px",
          letterSpacing: "-0.02em",
        }}>
          {project.title}
        </h1>
        {project.isProduct && project.price && (
          <p style={{ fontSize: 22, fontFamily: "'Georgia', serif", color: "#1a1a1a", marginBottom: 16 }}>
            {project.price}
          </p>
        )}
        <p style={{ fontSize: 17, color: "#555", maxWidth: 620, lineHeight: 1.7, marginBottom: 0 }}>
          {project.summary}
        </p>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28 }}>
            {project.tech.map((t) => (
              <span key={t} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", border: "1px solid #ccc", padding: "3px 8px" }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* External links — only show demoUrl here if it's NOT a YouTube URL */}
        {(showExternalDemoLink || project.repoUrl) && (
          <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
            {showExternalDemoLink && (
              <a
                href={project.demoUrl!}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}
              >
                Demo Video →
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}
              >
                GitHub Repo →
              </a>
            )}
          </div>
        )}
      </section>

      {/* IMAGES + VIDEO */}
      {hasMedia && (
        <section className="mobile-pad" style={{ padding: "64px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
          {project.images.length > 0 || youtubeId ? (
            <ImageGallery images={project.images} videoUrl={project.demoUrl} />
          ) : project.coverImage ? (
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              style={{ width: "100%", objectFit: "cover", display: "block" }}
            />
          ) : null}
        </section>
      )}

      {/* CONTENT */}
      <section className="mobile-pad" style={{ padding: "64px 48px", maxWidth: 900, margin: "0 auto", borderBottom: project.shopUrl ? "1px solid #ddd" : "none" }}>
        {project.content ? (
          <article style={{
            maxWidth: 700,
            lineHeight: 1.8,
            fontSize: 16,
            color: "#333",
          }}>
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </article>
        ) : (
          <p style={{ color: "#aaa", fontStyle: "italic", fontSize: 15 }}>No content yet.</p>
        )}
      </section>

      {/* SHOP ON REVERB */}
      {project.shopUrl && (
        <section className="mobile-pad" style={{ padding: "64px 48px 80px", maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 20 }}>
            Purchase
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 8, maxWidth: 480 }}>
            This item is available for purchase on Reverb.
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
            Alternatively, contact me via email about this product at{" "}
            <a href="mailto:evan@sharkbomb.net" style={{ color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 1 }}>
              evan@sharkbomb.net
            </a>
          </p>
          <a
            href={project.shopUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: "#1a1a1a",
              color: "#f8f6f1",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Shop on Reverb →
          </a>
        </section>
      )}

      {/* FOOTER */}
      <footer className="mobile-footer" style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
        <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
        <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
      </footer>

    </main>
  );
}
