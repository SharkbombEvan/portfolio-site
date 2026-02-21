import Link from "next/link";

export default function AboutPage() {
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
          <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
  <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
  <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
  <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
  <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a" }}>CONTACT</Link>
</div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "80px 48px 64px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 24 }}>
          About
        </p>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}>
          Sharkbomb Audio
        </h1>
      </section>

      {/* BIO SECTION */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 0 }}>
              Background
            </p>
          </div>
          <div>
            {/* REPLACE THIS PARAGRAPH WITH YOUR BIO */}
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#333", marginBottom: 24}}>
              My name is Evan Demsey. I am currently an electrical engineering student at the University of Virginia. I got into electrical engineering and audio equipment design in 2020, when I learned about the mythical “Klon Centaur” pedal. I learned some of the basics of pedal building and audio design, and the rest followed after.
            </p>
            {/* REPLACE THIS PARAGRAPH WITH MORE OF YOUR STORY */}
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#333", marginBottom: 24 }}>
              I officially started branding my work under the name Sharkbomb Audio once I knew that this was a hobby I wanted to pursue. I started off making pedals for myself to mimic the sound of some of my favorite guitarists. I eventually started selling pedals to friends and accepting repair jobs from both friends and local used music stores. 

              My journey stepped up to the next level in 2023, when I reached out to Paul of Paul Reed Smith guitars, who accepted me as an intern. During my internship at PRS, I built, modified, and designed several pieces of equipment for Paul’s personal studio, as well as assisted with amplifier repairs in the factory. 
            </p>
            {/* REPLACE THIS PARAGRAPH WITH YOUR PHILOSOPHY */}
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#333"}}>
              Now I am primarily a student; however, I still build guitar pedals in my lab space and on breaks when I go home. I love learning new skills to inform my designs and working on new projects. 

              I believe that a better understanding on what your pedal is doing internally allows you to better connect with your gear. If you ever have questions on how my gear works, feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>
              Capabilities
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {[
              { title: "Custom Builds", desc: "Making your original equipment dreams come true! Building amplifiers, effects, and more from the ground up." },
              { title: "Modifications", desc: "Upgrading and modifying existing equipment to improve performance and tone." },
              { title: "Repair & Restoration", desc: "Bringing vintage and modern audio gear back to life." },
              { title: "Circuit Design", desc: "Analog and mixed-signal circuit design for audio applications." },
            ].map((skill) => (
              <div key={skill.title}>
                <h3 style={{ fontSize: 15, fontWeight: "normal", fontFamily: "'Georgia', serif", marginBottom: 10, borderTop: "1px solid #1a1a1a", paddingTop: 14 }}>
                  {skill.title}
                </h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888" }}>
              Contact
            </p>
          </div>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", marginBottom: 32 }}>
              Interested in a custom build, modification, or repair? I'd love to chat! Get in touch.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a
                href="mailto:Evan@sharkbomb.net"
                style={{ fontSize: 15, color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2, display: "inline-block" }}
              >
                evan@sharkbomb.net
              </a>
              <div style={{ display: "flex", gap: 32 }}>
                <a
                  href="https://github.com/SharkbombEvan"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/EvanDemsey"
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
