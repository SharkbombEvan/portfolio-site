import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import Timeline, { type TimelineEntry } from "@/components/Timeline";
import { getFeatured } from "@/lib/projects";
import { emailFor } from "@/lib/site";

export const revalidate = 0;

// Oldest to newest, left to right. Full detail lives on /resume.
const TIMELINE: TimelineEntry[] = [
  { when: "Spring 2022 to now", title: "Independent design and repair", org: "Sharkbomb Audio" },
  { when: "Summer 2023 to now", title: "Audio design and repair contractor", org: "PRS Guitars" },
  { when: "Summer 2025", title: "Research intern", org: "U.S. Army Research Laboratory" },
  { when: "Summer 2026", title: "Production intern", org: "EarthQuaker Devices" },
  { when: "Fall 2026 to now", title: "Teaching assistant", org: "University of Virginia" },
];

export default async function HomePage() {
  const featured = await getFeatured(6);

  return (
    <main data-mode="general">
      <MobileNav mode="general" activePage="/" />

      {/* HERO */}
      <section className="on-panel" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
        <div className="wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
          <h1 className="display" style={{ fontSize: "clamp(42px, 7.6vw, 104px)", margin: 0, maxWidth: "15ch" }}>
            Audio got me into electrical engineering.
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40, flexWrap: "wrap", marginTop: 48 }}>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "var(--panel-ink)", margin: 0, maxWidth: "50ch" }}>
              Now I study it at UVA. It started with audio gear, and I still build, modify, and repair it through Sharkbomb Audio, including design and repair work for PRS Guitars. I&apos;ve also done work with the Army Research Laboratory and production work at EarthQuaker Devices.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/projects" className="btn">See my work</Link>
              <Link href="/resume" className="btn btn-ghost">Read my résumé</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="wrap section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: 0 }}>Selected work</h2>
          {featured.length > 0 && (
            <Link href="/projects" className="link" style={{ fontSize: 16 }}>See all work</Link>
          )}
        </div>
        {featured.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No projects yet.</p>
        ) : (
          <div className="work-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} mode="general" featured={i === 0 && featured.length > 1} />
            ))}
          </div>
        )}
      </section>

      {/* EXPERIENCE */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
            <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>Experience</h2>
            <Link href="/resume" className="link" style={{ fontSize: 16 }}>Read the full résumé</Link>
          </div>
          <Timeline entries={TIMELINE} />
        </div>
      </section>

      {/* AUDIO DOORWAY: previews the audio palette */}
      <section data-mode="audio" className="on-panel" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
        <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: "0 0 16px", maxWidth: "16ch" }}>
              Need a custom pedal, mod or repair?
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "var(--panel-muted)", maxWidth: "44ch" }}>
              Sharkbomb Audio is where I take commissions. So far that is 20+ pedals, 6 amplifiers and 50+ repairs, with pedals you can buy today.
            </p>
          </div>
          <Link href="/audio" className="btn">Go to Sharkbomb Audio</Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="wrap section">
        <p className="measure" style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 20px" }}>
          For internships, projects or a question about hardware, email is the fastest way to reach me.
        </p>
        <a href={`mailto:${emailFor("general")}`} className="display link" style={{ fontSize: "clamp(30px, 6.4vw, 84px)", textUnderlineOffset: 10, textDecorationThickness: 2, wordBreak: "break-word" }}>
          {emailFor("general")}
        </a>
      </section>

      <SiteFooter mode="general" />
    </main>
  );
}
