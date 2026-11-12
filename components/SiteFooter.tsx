import { CONTACT, emailFor } from "@/lib/site";

type Mode = "general" | "audio";

export default function SiteFooter({ mode = "general" }: { mode?: Mode }) {
  const year = new Date().getFullYear();
  const links =
    mode === "audio"
      ? [
          { label: "Email", href: `mailto:${emailFor("audio")}` },
          { label: "Reverb", href: CONTACT.reverb },
          { label: "Instagram", href: CONTACT.instagram },
        ]
      : [
          { label: "Email", href: `mailto:${emailFor("general")}` },
          { label: "GitHub", href: CONTACT.github },
          { label: "LinkedIn", href: CONTACT.linkedin },
        ];
  return (
    <footer className="on-panel" style={{ background: "var(--panel)", color: "var(--panel-ink)" }}>
      <div className="wrap site-footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, paddingTop: 36, paddingBottom: 36, fontSize: 14 }}>
        <span style={{ color: "var(--panel-muted)" }}>
          © {year} Evan Demsey{mode === "audio" ? ", Sharkbomb Audio" : ""}
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="link"
              {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
