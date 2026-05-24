"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function MobileNav({ activePage }: { activePage?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#f8f6f1" }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px",
        borderBottom: open ? "none" : "1px solid #ddd",
      }} className="site-nav">
        <Link href="/" style={{
          fontFamily: "'Georgia', serif",
          fontWeight: "bold",
          fontSize: 18,
          letterSpacing: "0.05em",
          textDecoration: "none",
          color: "#1a1a1a",
        }}>
          SHARKBOMB AUDIO
        </Link>

        {/* Desktop links — hidden on mobile via CSS */}
        <div className="nav-links" style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                color: "#1a1a1a",
                ...(activePage === href
                  ? { borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }
                  : {}),
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — shown on mobile via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            width: 28,
            height: 28,
          }}
        >
          {/* Bar 1 */}
          <span style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#1a1a1a",
            transition: "transform 0.2s ease",
            transform: open ? "translateY(7px) rotate(45deg)" : "none",
            transformOrigin: "center",
          }} />
          {/* Bar 2 */}
          <span style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#1a1a1a",
            transition: "opacity 0.2s ease",
            opacity: open ? 0 : 1,
          }} />
          {/* Bar 3 */}
          <span style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#1a1a1a",
            transition: "transform 0.2s ease",
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            transformOrigin: "center",
          }} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div style={{ background: "#f8f6f1", borderBottom: "1px solid #ddd" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                textDecoration: "none",
                color: "#1a1a1a",
                fontSize: 14,
                letterSpacing: "0.12em",
                padding: "16px 24px",
                borderBottom: "1px solid #eee",
                fontFamily: "'Georgia', serif",
                ...(activePage === href ? { fontWeight: "bold" } : {}),
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
