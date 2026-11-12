import { existsSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Résumé — Evan Demsey",
  description:
    "Electrical engineering at UVA. Audio electronics contractor for PRS Guitars, research intern at the U.S. Army Research Laboratory, production intern at EarthQuaker Devices.",
};

type Item = { title: string; org?: string; when: string; notes?: string[]; points?: string[] };
type Group = { heading: string; items: Item[] };

const GROUPS: Group[] = [
  {
    heading: "Education",
    items: [
      {
        title: "B.S. Electrical Engineering",
        org: "University of Virginia, School of Engineering and Applied Science, Charlottesville, VA",
        when: "May 2029",
        notes: [
          "GPA 3.6, ECE GPA 3.9",
          "Relevant coursework: AI Hardware, Solid State Devices, Introduction to VLSI Design, AI for Electronic Design",
        ],
      },
    ],
  },
  {
    heading: "Work experience",
    items: [
      {
        title: "Teaching assistant",
        when: "Fall 2026 to present",
        points: [
          "Collaborate with professors of signals and systems, digital logic design, and applied circuits classes to improve teaching methods and grading standards.",
          "Support instruction of fundamental electrical engineering topics to 225 students across 4 class periods.",
        ],
      },
      {
        title: "Production intern",
        org: "EarthQuaker Devices",
        when: "Summer 2026",
        points: [
          "Assembled hundreds of commercial products across 3 production stages in accordance with strict, documented manufacturing and quality-control standards.",
          "Provided feedback and resources to product managers to improve future product designs and build processes.",
        ],
      },
      {
        title: "Audio electronics design and repair contractor",
        org: "Paul Reed Smith Guitars",
        when: "Summer 2023 to present",
        points: [
          "Selected by PRS founder and CEO Paul Smith to design, assemble, and repair studio equipment through an ongoing contract relationship from age 16.",
          "Apply results of reverse engineering, SPICE simulations, mathematical analysis, iterative prototyping, and bench measurements to inform design decisions.",
          "Translate customer performance goals into circuit designs and component selections.",
          "Troubleshoot product failures to diagnose weaknesses and develop general solutions to address them.",
        ],
      },
      {
        title: "Research intern",
        org: "U.S. Army Research Laboratory",
        when: "Summer 2025",
        points: [
          "Designed a 4-layer carrier PCB in KiCad for a 1 mm-pitch BGA for use in an experimental research platform.",
          "Translated electrical and mechanical requirements into schematic, footprint, routing, and fabrication files.",
        ],
      },
    ],
  },
  {
    heading: "Relevant projects",
    items: [
      {
        title: "Independent audio equipment design, assembly, and repair",
        org: "Sharkbomb Audio",
        when: "Spring 2022 to present",
        points: [
          "Design and build audio equipment, including 20+ guitar pedals, 6 guitar amplifiers, and various studio equipment on commission for use by professional touring musicians.",
          "Diagnose and repair commercial audio equipment for 3 music stores around the Washington, DC metro area (50+ repairs completed).",
          "Reverse-engineer audio equipment circuitry to inform the design decisions of future products.",
        ],
      },
    ],
  },
  {
    heading: "Leadership and involvement",
    items: [
      {
        title: "Founder and president",
        org: "Birding at UVA Club",
        when: "Fall 2025 to present",
        points: [
          "Founded a 350-person club from the ground up with no prior bird club existing on the UVA campus.",
          "Secure and maintain recognition as an official Audubon on Campus chapter through collaboration with the National Audubon Society.",
          "Organize and lead educational field trips across Charlottesville and surrounding areas.",
        ],
      },
    ],
  },
];

const SKILLS = [
  { label: "Circuit and PCB", value: "Analog circuit design, SPICE, KiCad, schematic capture, PCB layout, electronics troubleshooting" },
  { label: "Embedded and digital", value: "C++, Python, MATLAB, VHDL, Verilog, ESP32, Daisy Seed DSP, digital logic design" },
  { label: "Laboratory", value: "Oscilloscope and function generator, soldering, rework, signal tracing, circuit characterization" },
  { label: "Mechanical and manufacturing", value: "Fusion 360, sheet metal chassis design, 3D printing, DFM" },
];

export default function ResumePage() {
  // The download button appears when public/resume.pdf exists.
  const hasPdf = existsSync(join(process.cwd(), "public", "resume.pdf"));

  return (
    <main data-mode="general">
      <MobileNav mode="general" activePage="/resume" />
      <PageHeader title="Résumé">
        {hasPdf && (
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
            Download the PDF
          </a>
        )}
      </PageHeader>

      <section className="wrap" style={{ paddingBottom: 112 }}>
        {GROUPS.map((group) => (
          <div key={group.heading} className="split" style={{ padding: "48px 0", borderTop: "1px solid var(--rule)" }}>
            <h2 className="display" style={{ fontSize: 32, margin: 0 }}>{group.heading}</h2>
            <div style={{ display: "grid", gap: 48 }}>
              {group.items.map((item) => (
                <div key={item.title + (item.org ?? "")}>
                  <p className="mono" style={{ color: "var(--muted)", margin: "0 0 6px" }}>{item.when}</p>
                  <h3 className="display" style={{ fontSize: 26, margin: "0 0 4px" }}>{item.title}</h3>
                  {item.org && <p style={{ fontSize: 16, fontWeight: 500, margin: "0 0 12px" }}>{item.org}</p>}
                  {item.notes?.map((n) => (
                    <p key={n} style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 6px", maxWidth: "58ch" }}>{n}</p>
                  ))}
                  {item.points && (
                    <ul style={{ margin: 0, paddingLeft: 20, listStyle: "disc", fontSize: 17, lineHeight: 1.7, color: "var(--muted)", maxWidth: "62ch" }}>
                      {item.points.map((pt) => (
                        <li key={pt} style={{ marginTop: 6 }}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="split" style={{ padding: "48px 0 0", borderTop: "1px solid var(--rule)" }}>
          <h2 className="display" style={{ fontSize: 32, margin: 0 }}>Skills</h2>
          <dl style={{ margin: 0 }}>
            {SKILLS.map((s, i) => (
              <div key={s.label} style={{ padding: "18px 0", borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--rule)" }}>
                <dt style={{ fontSize: 14, color: "var(--muted)", marginBottom: 4 }}>{s.label}</dt>
                <dd style={{ margin: 0, fontSize: 17, lineHeight: 1.6, maxWidth: "58ch" }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter mode="general" />
    </main>
  );
}
