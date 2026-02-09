import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evan Demsey — Portfolio",
  description: "Projects, writing, and engineering work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: "1px solid #e5e5e5" }}>
          <nav
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href="/" style={{ fontWeight: 700, textDecoration: "none" }}>
              Evan Demsey
            </Link>

            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
            </div>
          </nav>
        </header>

        <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px" }}>
          {children}
        </main>

        <footer style={{ borderTop: "1px solid #e5e5e5", marginTop: 40 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 24px" }}>
            <small>© {new Date().getFullYear()} Evan Demsey</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
