"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "6px 14px",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        background: "transparent",
        border: "1px solid #ddd",
        color: "#888",
        cursor: "pointer",
        fontFamily: "'Georgia', serif",
        transition: "border-color 0.15s ease, color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1a1a1a";
        e.currentTarget.style.color = "#1a1a1a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ddd";
        e.currentTarget.style.color = "#888";
      }}
    >
      Log out
    </button>
  );
}
