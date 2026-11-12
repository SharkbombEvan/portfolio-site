import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { CONTACT, emailFor, modeFromParam } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Evan Demsey",
  description: "Get in touch about engineering opportunities, or about custom audio builds, modifications, and repairs.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const mode = modeFromParam((await searchParams).from);
  const isAudio = mode === "audio";

  const rows = [
    { label: "GitHub", href: CONTACT.github, text: "github.com/SharkbombEvan" },
    { label: "LinkedIn", href: CONTACT.linkedin, text: "linkedin.com/in/evandemsey" },
    ...(isAudio
      ? [
          { label: "Instagram", href: CONTACT.instagram, text: "instagram.com/SharkbombAudio" },
          { label: "Reverb shop", href: CONTACT.reverb, text: "reverb.com/shop/sharkbombaudio" },
        ]
      : []),
  ];

  return (
    <main data-mode={mode}>
      <MobileNav mode={mode} activePage="/contact" />
      <PageHeader
        title={isAudio ? "Start a build or repair" : "Contact"}
        intro={
          isAudio
            ? "Tell me about your project. Whether you have a specific piece of gear in mind or just want to talk through what's possible, email me directly."
            : "I'm happy to talk about internships, projects and engineering roles. Email is the quickest way to reach me."
        }
      />
      <section className="wrap" style={{ paddingBottom: 96 }}>
        <a href={`mailto:${emailFor(mode)}`} className="display link" style={{ fontSize: "clamp(28px, 6vw, 72px)", textUnderlineOffset: 10, textDecorationThickness: 2, wordBreak: "break-word" }}>
          {emailFor(mode)}
        </a>
        <dl style={{ margin: "64px 0 0", maxWidth: 640 }}>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", padding: "18px 0", borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--rule)" }}>
              <dt style={{ color: "var(--muted)", fontSize: 16 }}>{r.label}</dt>
              <dd style={{ margin: 0, fontSize: 16 }}>
                <a href={r.href} target="_blank" rel="noreferrer" className="link">{r.text}</a>
              </dd>
            </div>
          ))}
        </dl>
        <p style={{ marginTop: 40, fontSize: 16, color: "var(--muted)" }}>
          {isAudio ? (
            <>Looking to hire me instead? <Link href="/contact" className="link">Contact me about engineering work</Link>.</>
          ) : (
            <>Need custom audio gear or a repair? <Link href="/contact?from=audio" className="link">Contact Sharkbomb Audio</Link>.</>
          )}
        </p>
      </section>
      <SiteFooter mode={mode} />
    </main>
  );
}
