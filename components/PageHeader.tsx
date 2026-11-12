export default function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="wrap" style={{ paddingTop: 72, paddingBottom: 48 }}>
      <h1 className="display" style={{ fontSize: "clamp(44px, 8vw, 96px)", margin: 0 }}>
        {title}
      </h1>
      {intro && (
        <p className="measure" style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", margin: "24px 0 0" }}>
          {intro}
        </p>
      )}
      {children && <div style={{ marginTop: 36 }}>{children}</div>}
    </header>
  );
}
