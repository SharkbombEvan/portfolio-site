"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const url = `/admin/${id}/delete`;

    try {
      const res = await fetch(url, { method: "POST" });

      const contentType = res.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

        if (!id) {
         alert("DeleteButton received no id");
        return;
}

      if (!res.ok) {
        console.error("Delete failed:", res.status, body);
        alert(
          typeof body === "string"
            ? `Delete failed (${res.status})`
            : body?.error || `Delete failed (${res.status})`
        );
        return;
      }

      router.refresh();
    } catch (e) {
      console.error("Delete request crashed:", e);
      alert("Delete request crashed. Check console.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded ml-2"
    >
      Delete
    </button>
  );
}