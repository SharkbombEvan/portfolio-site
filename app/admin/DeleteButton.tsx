"use client";

import { useRouter } from "next/navigation";
import { btnGhost } from "@/components/admin/ui";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;

    try {
      const res = await fetch(`/admin/${id}/delete`, { method: "POST" });
      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        const body = contentType.includes("application/json") ? await res.json() : null;
        window.alert(body?.error || `Delete failed (${res.status})`);
        return;
      }
      router.refresh();
    } catch (e) {
      console.error("Delete request crashed:", e);
      window.alert("Delete request crashed. Check the console.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="admin-btn admin-danger"
      style={{ ...btnGhost, padding: "7px 14px", fontSize: 14, color: "var(--muted)" }}
    >
      Delete
    </button>
  );
}
