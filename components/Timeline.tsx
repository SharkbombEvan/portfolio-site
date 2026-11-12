// Chronological, so a trace-and-pad timeline carries real information.
// Horizontal on desktop (oldest to newest), a compact vertical trace on mobile.
export type TimelineEntry = { when: string; title: string; org: string };

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="hx">
      {entries.map((e) => (
        <li key={e.title + e.org}>
          <p className="mono" style={{ color: "var(--muted)", margin: "0 0 8px" }}>{e.when}</p>
          <h3 className="display" style={{ fontSize: 20, margin: "0 0 4px" }}>{e.title}</h3>
          <p style={{ fontSize: 15, margin: 0, color: "var(--muted)" }}>{e.org}</p>
        </li>
      ))}
    </ol>
  );
}
