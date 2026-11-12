"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "general" | "audio";
type NavLink = { key: string; href: string; label: string };

const GENERAL_LINKS: NavLink[] = [
  { key: "/projects", href: "/projects", label: "Work" },
  { key: "/about", href: "/about", label: "About" },
  { key: "/resume", href: "/resume", label: "Résumé" },
  { key: "/contact", href: "/contact", label: "Contact" },
];

const AUDIO_LINKS: NavLink[] = [
  { key: "/audio/projects", href: "/audio/projects", label: "Projects" },
  { key: "/audio/products", href: "/audio/products", label: "Products" },
  { key: "/about", href: "/about?from=audio", label: "About" },
  { key: "/contact", href: "/contact?from=audio", label: "Contact" },
];

function ModeSwitch({ mode, onNavigate }: { mode: Mode; onNavigate?: () => void }) {
  const seg = (active: boolean): React.CSSProperties => ({
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    padding: "7px 14px",
    borderRadius: 999,
    whiteSpace: "nowrap",
    background: active ? "var(--ink)" : "transparent",
    color: active ? "var(--paper)" : "var(--ink)",
  });
  return (
    <div
      className="switch"
      role="group"
      aria-label="Switch portfolio view"
      style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--rule)", background: "var(--paper-2)" }}
    >
      <Link href="/" onClick={onNavigate} aria-current={mode === "general" ? "page" : undefined} style={seg(mode === "general")}>
        All work
      </Link>
      <Link href="/audio" onClick={onNavigate} aria-current={mode === "audio" ? "page" : undefined} style={seg(mode === "audio")}>
        Sharkbomb Audio
      </Link>
    </div>
  );
}

export default function MobileNav({ activePage, mode = "general" }: { activePage?: string; mode?: Mode }) {
  const [open, setOpen] = useState(false);
  const links = mode === "audio" ? AUDIO_LINKS : GENERAL_LINKS;

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
      <nav className="site-nav wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 68 }}>
        <Link
          href={mode === "audio" ? "/audio" : "/"}
          className="display"
          style={{ fontSize: 21, fontWeight: 700, textDecoration: "none", color: "var(--ink)" }}
        >
          {mode === "audio" ? "Sharkbomb Audio" : "Evan Demsey"}
        </Link>

        <div className="nav-links" style={{ alignItems: "center", gap: 32, fontSize: 15 }}>
          {links.map(({ key, href, label }) => (
            <Link key={key} href={href} className="nav-link" aria-current={activePage === key ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <ModeSwitch mode={mode} />
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px 0", flexDirection: "column", justifyContent: "center", gap: 5, width: 28, height: 28 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)", transition: "transform 0.2s ease", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)", transition: "opacity 0.2s ease", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)", transition: "transform 0.2s ease", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {open && (
        <div style={{ background: "var(--paper)", borderTop: "1px solid var(--rule)" }}>
          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setOpen(false)}
              className="display"
              style={{ display: "block", textDecoration: "none", color: "var(--ink)", fontSize: 26, padding: "14px 20px", borderBottom: "1px solid var(--rule)", fontWeight: activePage === key ? 700 : 500 }}
            >
              {label}
            </Link>
          ))}
          <div style={{ padding: "18px 20px 22px" }}>
            <ModeSwitch mode={mode} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
