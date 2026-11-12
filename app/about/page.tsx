import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { emailFor, modeFromParam } from "@/lib/site";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const mode = modeFromParam((await searchParams).from);
  const isAudio = mode === "audio";

  const skills = isAudio
    ? [
        { title: "Custom builds", desc: "Pedals, amplifiers and studio equipment designed around your performance goals, then simulated, prototyped and measured on the bench." },
        { title: "Modifications", desc: "Changes to gear you already own that improve its tone or performance, informed by reverse-engineering the original circuit." },
        { title: "Repair", desc: "Diagnosis and repair of commercial audio equipment. 50+ repairs completed for three music stores around Washington, DC." },
      ]
    : [
        { title: "Circuit and PCB", desc: "Analog circuit design, SPICE, KiCad, schematic capture, PCB layout, electronics troubleshooting." },
        { title: "Embedded and digital", desc: "C++, Python, MATLAB, VHDL, Verilog, ESP32, Daisy Seed DSP, digital logic design." },
        { title: "Laboratory", desc: "Oscilloscope and function generator, soldering, rework, signal tracing, circuit characterization." },
        { title: "Mechanical and manufacturing", desc: "Fusion 360, sheet metal chassis design, 3D printing, DFM." },
      ];

  return (
    <main data-mode={mode}>
      <MobileNav mode={mode} activePage="/about" />
      <PageHeader title={isAudio ? "About Sharkbomb Audio" : "About"} />

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="split">
          {isAudio ? (
            <h2 className="display" style={{ fontSize: 32, margin: 0 }}>Background</h2>
          ) : (
            <img
              src="/headshot.jpg"
              alt="Evan Demsey"
              width={800}
              height={800}
              style={{ width: "100%", maxWidth: 340, aspectRatio: "1/1", objectFit: "cover", objectPosition: "50% 20%", display: "block", background: "var(--paper-2)", borderRadius: 2 }}
            />
          )}
          <div className="prose">
            <p>
              My name is Evan Demsey. I&apos;m an electrical engineering student at the University of Virginia. My path to choosing electrical engineering is quite unique: audio. In 2020, I learned about the mythical &quot;Klon Centaur&quot; guitar pedal, which drove me to learn the basics of pedal building and audio design. I started making pedals for myself, to mimic the sound of some of my favorite guitarists. I began selling them to friends and taking repair jobs from friends and local used music stores, working under the name Sharkbomb Audio. Since then I&apos;ve designed and built 20+ guitar pedals and 6 guitar amplifiers for amateur and professional musicians, and repaired more than 50 pieces of gear for three music stores around Washington, DC.
            </p>
            <p>
              In 2023 I reached out to Paul Smith, the founder and CEO of PRS Guitars. He selected me to design, build and repair equipment for his studio. I still work with Paul closely in my free time, helping translate his audio needs into physical equipment. Since then I designed a 4-layer BGA carrier board as an intern at the U.S. Army Research Laboratory, and spent summer 2026 on the production line at EarthQuaker Devices.
            </p>
            <p>
              At UVA, I enjoy teaching other students about fundamental electrical engineering topics as a teaching assistant for 225 students across 4 periods of signals and systems, applied circuits, and digital logic design. Outside of engineering, my love for music continues! I&apos;m a member of UVA&apos;s Cavalier Marching Band and Athletic Band. I also founded the Birding at UVA Club, which now has 350 members and has sparked a partnership with the National Audubon Society, and of course I still love spending time designing and building audio equipment. If any of this piques your interest, please reach out. I&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-2)" }}>
        <div className="wrap section">
          <div className="split">
            <h2 className="display" style={{ fontSize: 32, margin: 0 }}>{isAudio ? "What I take on" : "Skills"}</h2>
            <dl style={{ margin: 0 }}>
              {skills.map((c, i) => (
                <div key={c.title} style={{ padding: "22px 0", borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--rule)" }}>
                  <dt className="display" style={{ fontSize: 24, marginBottom: 6 }}>{c.title}</dt>
                  <dd style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: "54ch" }}>{c.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="split">
          <h2 className="display" style={{ fontSize: 32, margin: 0 }}>Contact</h2>
          <div>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 20px", maxWidth: "50ch" }}>
              {isAudio
                ? "Interested in a custom build, modification, or repair? I'd love to chat."
                : "Interested in working together, or just want to talk hardware? I'd love to chat."}
            </p>
            <a href={`mailto:${emailFor(mode)}`} className="display link" style={{ fontSize: "clamp(24px, 4vw, 44px)", textUnderlineOffset: 8 }}>
              {emailFor(mode)}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter mode={mode} />
    </main>
  );
}
