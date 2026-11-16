import type { CSSProperties } from "react";

// Shared inline styles for the admin screens (tokens come from globals.css).
export const adminPage: CSSProperties = { maxWidth: 980, margin: "0 auto", padding: "32px 24px 96px" };

export const card: CSSProperties = {
  background: "#fff",
  border: "1px solid var(--rule)",
  borderRadius: 6,
  padding: "24px 24px 8px",
  marginBottom: 20,
  boxShadow: "0 1px 2px rgba(27,28,29,0.05), 0 8px 24px -12px rgba(27,28,29,0.10)",
};
export const cardTitle: CSSProperties = { fontSize: 18, margin: "0 0 2px" };
export const cardHint: CSSProperties = { fontSize: 14, color: "var(--muted)", margin: "0 0 20px", lineHeight: 1.5 };

export const field: CSSProperties = { marginBottom: 20 };
export const label: CSSProperties = { display: "block", fontWeight: 600, fontSize: 14, marginBottom: 6 };
export const help: CSSProperties = { fontSize: 13, color: "var(--muted)", margin: "6px 0 0" };
export const input: CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid var(--rule)",
  borderRadius: 4,
  background: "var(--paper)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "inherit",
};
export const textarea: CSSProperties = { ...input, resize: "vertical", lineHeight: 1.5 };
export const checkRow: CSSProperties = { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 15 };
export const grid2: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0 20px" };

export const btnPrimary: CSSProperties = {
  padding: "11px 22px",
  fontSize: 15,
  fontWeight: 500,
  fontFamily: "inherit",
  background: "var(--ink)",
  color: "var(--paper)",
  border: "1px solid var(--ink)",
  borderRadius: 4,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};
export const btnGhost: CSSProperties = {
  ...btnPrimary,
  background: "transparent",
  color: "var(--ink)",
  border: "1px solid var(--rule)",
};
