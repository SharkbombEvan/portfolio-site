"use client";

import { useState } from "react";
import { btnGhost } from "@/components/admin/ui";

type Img = { url: string; alt?: string };

const small = { ...btnGhost, padding: "4px 10px", fontSize: 13 };

export default function ProjectImagesField({
  value,
  onChange,
}: {
  value: Img[];
  onChange: (next: Img[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const newImgs: Img[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Upload failed");
        const data = (await res.json()) as { url: string };
        newImgs.push({ url: data.url });
      }
      onChange([...value, ...newImgs]);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} style={{ fontSize: 14 }} />
        {uploading && <span style={{ fontSize: 14, color: "var(--muted)" }}>Uploading...</span>}
      </div>
      {error && <p role="alert" style={{ color: "#9b2c2c", fontSize: 14, margin: "0 0 12px" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {value.map((img, idx) => (
          <div key={img.url} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: 8, background: "var(--paper)" }}>
            <img src={img.url} alt={img.alt ?? ""} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 3, display: "block", marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 6 }}>
              <button type="button" onClick={() => move(idx, -1)} aria-label="Move earlier" className="admin-btn" style={small}>↑</button>
              <button type="button" onClick={() => move(idx, 1)} aria-label="Move later" className="admin-btn" style={small}>↓</button>
              <button type="button" onClick={() => remove(idx)} className="admin-btn admin-danger" style={{ ...small, marginLeft: "auto" }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
