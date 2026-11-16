import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import ReactMarkdown from "react-markdown";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import { areaLabel } from "@/lib/areas";
import { CONTACT, modeFromParam, withMode } from "@/lib/site";
import { visibleTech, summaryFor } from "@/components/ProjectCard";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mode = modeFromParam((await searchParams).from);
  const project = await prisma.project.findUnique({ where: { slug }, select: { title: true, summary: true, audioSummary: true } });
  if (!project) return {};
  return { title: `${project.title} — Evan Demsey`, description: summaryFor(project, mode) };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const mode = modeFromParam((await searchParams).from);

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

  const isAudio = mode === "audio";
  const summary = summaryFor(project, mode);
  const content = (isAudio && project.audioContent?.trim()) || project.content;
  const tags = visibleTech(project.tech, mode);
  const backHref = isAudio ? (project.isProduct ? "/audio/products" : "/audio/projects") : "/projects";
  const backLabel = isAudio ? (project.isProduct ? "Back to products" : "Back to audio projects") : "Back to work";
  const activePage = isAudio ? (project.isProduct ? "/audio/products" : "/audio/projects") : "/projects";

  // Prev / next within the current view (audio-only on the audio side)
  const scope = isAudio ? { areas: { has: "audio" } } : {};
  const [newer, older] = await Promise.all([
    prisma.project.findFirst({ where: { ...scope, createdAt: { gt: project.createdAt } }, orderBy: { createdAt: "asc" }, select: { slug: true, title: true } }),
    prisma.project.findFirst({ where: { ...scope, createdAt: { lt: project.createdAt } }, orderBy: { createdAt: "desc" }, select: { slug: true, title: true } }),
  ]);

  const metaItems = [
    project.role && { label: "Role", value: project.role },
    project.year && { label: "Year", value: project.year },
    project.context && { label: "Context", value: project.context },
    project.areas.length > 0 && { label: "Area", value: project.areas.map(areaLabel).join(" · ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const youtubeId = project.demoUrl ? extractYouTubeId(project.demoUrl) : null;
  const showExternalDemoLink = project.demoUrl && !youtubeId;
  const hasMedia = project.images.length > 0 || project.coverImage || youtubeId;

  return (
    <main data-mode={mode}>
      <MobileNav mode={mode} activePage={activePage} />

      {/* HEADER */}
      <header className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Link href={backHref} className="link" style={{ fontSize: 15, color: "var(--muted)", display: "inline-block", marginBottom: 40 }}>
          {backLabel}
        </Link>
        <h1 className="display" style={{ fontSize: "clamp(40px, 7.4vw, 96px)", margin: 0, maxWidth: "16ch" }}>
          {project.title}
        </h1>
        <p className="measure" style={{ fontSize: 21, lineHeight: 1.55, color: "var(--muted)", margin: "28px 0 0", maxWidth: "50ch" }}>
          {summary}
        </p>
        {project.isProduct && project.price && (
          <p className="display" style={{ fontSize: 34, margin: "28px 0 0" }}>{project.price}</p>
        )}
      </header>

      {/* SPECS: structured facts about the project */}
      {(metaItems.length > 0 || tags.length > 0 || showExternalDemoLink || project.repoUrl) && (
        <section className="wrap" style={{ paddingBottom: 56 }}>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, borderTop: "2px solid var(--ink)" }}>
            {metaItems.map((m) => (
              <div key={m.label} style={{ padding: "18px 24px 18px 0", borderBottom: "1px solid var(--rule)" }}>
                <dt style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>{m.label}</dt>
                <dd style={{ margin: 0, fontSize: 17 }}>{m.value}</dd>
              </div>
            ))}
            {tags.length > 0 && (
              <div style={{ padding: "18px 24px 18px 0", borderBottom: "1px solid var(--rule)" }}>
                <dt style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>Tags</dt>
                <dd className="mono" style={{ margin: 0, fontSize: 14 }}>{tags.join(", ")}</dd>
              </div>
            )}
            {(showExternalDemoLink || project.repoUrl) && (
              <div style={{ padding: "18px 24px 18px 0", borderBottom: "1px solid var(--rule)" }}>
                <dt style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>Links</dt>
                <dd style={{ margin: 0, fontSize: 17, display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {showExternalDemoLink && <a href={project.demoUrl!} target="_blank" rel="noreferrer" className="link">Demo video</a>}
                  {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="link">Source on GitHub</a>}
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {project.highlights.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 56 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 16, maxWidth: "60ch" }}>
            {project.highlights.map((h) => (
              <li key={h} style={{ fontSize: 20, lineHeight: 1.5, paddingLeft: 32, position: "relative" }}>
                <span aria-hidden style={{ position: "absolute", left: 0, top: "0.5em", width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 3px var(--panel)" }} />
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* IMAGES + VIDEO */}
      {hasMedia && (
        <section className="wrap" style={{ paddingBottom: 72 }}>
          {project.images.length > 0 || youtubeId ? (
            <ImageGallery images={project.images} videoUrl={project.demoUrl} />
          ) : project.coverImage ? (
            <img src={project.coverImage} alt={`${project.title} cover`} style={{ width: "100%", maxWidth: 900, objectFit: "cover", display: "block" }} />
          ) : null}
        </section>
      )}

      {/* WRITE-UP */}
      <section className="wrap" style={{ paddingBottom: 96 }}>
        {content ? (
          <article className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        ) : (
          <p style={{ color: "var(--muted)", fontSize: 16 }}>The write-up for this project is coming soon.</p>
        )}
      </section>

      {/* PURCHASE */}
      {project.shopUrl && (
        <section className="on-panel" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
          <div className="wrap" style={{ paddingTop: 72, paddingBottom: 72, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <div>
              <h2 className="display" style={{ fontSize: "clamp(30px, 4.6vw, 52px)", margin: "0 0 12px" }}>Buy this pedal</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "var(--panel-muted)", maxWidth: "46ch" }}>
                It&apos;s listed on Reverb. You can also email me at{" "}
                <a href={`mailto:${CONTACT.emailAudio}`} className="link" style={{ color: "var(--panel-ink)" }}>{CONTACT.emailAudio}</a>.
              </p>
            </div>
            <a href={project.shopUrl} target="_blank" rel="noreferrer" className="btn">Buy on Reverb</a>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      {(newer || older) && (
        <nav aria-label="More projects" className="wrap" style={{ paddingTop: 48, paddingBottom: 48, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          {older ? (
            <Link href={withMode(`/projects/${older.slug}`, mode)} className="link" style={{ textDecoration: "none" }}>
              <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>Previous project</span>
              <span className="display" style={{ fontSize: 22 }}>{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link href={withMode(`/projects/${newer.slug}`, mode)} className="link" style={{ textDecoration: "none", textAlign: "right" }}>
              <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>Next project</span>
              <span className="display" style={{ fontSize: 22 }}>{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
      )}

      <SiteFooter mode={mode} />
    </main>
  );
}
