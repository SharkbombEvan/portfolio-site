import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import { getAudioFeatured } from "@/lib/projects";
import { emailFor } from "@/lib/site";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sharkbomb Audio — Custom Pedals, Mods & Repair",
  description:
    "Sharkbomb Audio designs, modifies, and repairs audio equipment — hand-built guitar pedals, amplifier work, and vintage restorations by Evan Demsey.",
};

const SERVICES = [
  { title: "Custom builds", desc: "Pedals, amplifiers and studio equipment designed around your performance goals. I choose the components, simulate the circuit, prototype it and measure it on the bench." },
  { title: "Modifications", desc: "Changes to gear you already own that improve its tone or performance, informed by reverse-engineering the original circuit." },
  { title: "Repair", desc: "Diagnosis and repair of commercial audio equipment. I've completed 50+ repairs for three music stores around Washington, DC." },
];

export default async function AudioHomePage() {
  const featured = await getAudioFeatured(3);

  return (
    <main data-mode="audio">
      <MobileNav mode="audio" activePage="/audio" />

      {/* HERO */}
      <section className="on-panel" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
        <div className="wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
          <h1 className="display" style={{ fontSize: "clamp(42px, 7.6vw, 104px)", margin: 0, maxWidth: "15ch" }}>
            Guitar pedals and amplifiers, built for touring musicians.
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40, flexWrap: "wrap", marginTop: 48 }}>
            <p style={{ fontSize: 20, lineHeight: 1.6, margin: 0, maxWidth: "50ch" }}>
              I&apos;ve built 20+ pedals and 6 amplifiers on commission and repaired 50+ pieces of gear for three music stores in the Washington, DC area. I also design studio equipment for PRS Guitars.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/audio/products" className="btn">Shop pedals</Link>
              <Link href="/contact?from=audio" className="btn btn-ghost">Ask about a build or repair</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="wrap section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: 0 }}>Recent builds</h2>
          {featured.length > 0 && <Link href="/audio/projects" className="link" style={{ fontSize: 16 }}>See all audio projects</Link>}
        </div>
        {featured.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No projects yet.</p>
        ) : (
          <div className="work-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} mode="audio" featured={i === 0 && featured.length > 1} />
            ))}
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="wrap section">
          <div className="split">
            <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: 0 }}>Work I take on</h2>
            <dl style={{ margin: 0 }}>
              {SERVICES.map((s, i) => (
                <div key={s.title} style={{ padding: "24px 0", borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <dt className="display" style={{ fontSize: 26, marginBottom: 8 }}>{s.title}</dt>
                  <dd style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: "52ch" }}>{s.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="wrap section">
        <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 20px", maxWidth: "52ch" }}>
          Tell me what you play and what you want changed, built or fixed.
        </p>
        <a href={`mailto:${emailFor("audio")}`} className="display link" style={{ fontSize: "clamp(30px, 6.4vw, 84px)", textUnderlineOffset: 10, textDecorationThickness: 2, wordBreak: "break-word" }}>
          {emailFor("audio")}
        </a>
      </section>

      <SiteFooter mode="audio" />
    </main>
  );
}
