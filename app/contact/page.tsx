import Link from "next/link";

export default function ContactPage() {
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
        <Link href="/" style={{ fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 18, letterSpacing: "0.05em", textDecoration: "none", color: "#1a1a1a" }}>
          SHARKBOMB AUDIO
        </Link>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
          <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
          <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
          <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}>CONTACT</Link>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "80px 48px 64px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 24 }}>
          Contact
        </p>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}>
          Get In Touch
        </h1>
      </section>

      {/* CONTACT CONTENT */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>
              Reach Out
            </p>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#444", marginBottom: 16 }}>
              Interested in a custom build, modification, or repair? I'd love to hear about your project.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#444", marginBottom: 48 }}>
              Whether you have a specific piece of gear in mind or just want to talk through what's possible, feel free to reach out directly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* EMAIL */}
              <div style={{ borderTop: "1px solid #ddd", paddingTop: 24 }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                  Email
                </p>
                <a
                  href="mailto:evan@sharkbomb.net"
                  style={{ fontSize: 18, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                >
                 evan@sharkbomb.net
                </a>
              </div>

              {/* GITHUB */}
              <div style={{ borderTop: "1px solid #ddd", paddingTop: 24 }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                  GitHub
                </p>
                <a
                  href="https://github.com/SharkbombEvan"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 18, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                >
                  https://github.com/SharkbombEvan
                </a>
              </div>

              {/* LINKEDIN */}
              <div style={{ borderTop: "1px solid #ddd", paddingTop: 24 }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                  LinkedIn
                </p>
                <a
                  href="https://linkedin.com/in/EvanDemsey"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 18, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                >
                  linkedin.com/in/EvanDemsey
                </a>
              </div>

              {/* Instagram placeholder — uncomment and add URL when ready:
              <div style={{ borderTop: "1px solid #ddd", paddingTop: 24 }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                  Instagram
                </p>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 18, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                >
                  instagram.com/yourusername
                </a>
              </div>
              */}

            </div>
          </div>
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
