"use client";

import { useState } from "react";

type Img = { url: string; alt?: string };

export default function ProjectImagesField({
  value,
  onChange,
}: {
  value: Img[];
  onChange: (next: Img[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const newImgs: Img[] = [];

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);

const res = await fetch("/api/upload", { method: "POST", body: fd });
if (!res.ok) throw new Error("Upload failed");
const data = (await res.json()) as { url: string };
console.log("UPLOAD RESPONSE:", data);

newImgs.push({ url: data.url });
      }

      onChange([...value, ...newImgs]);
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
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading && <span className="text-sm">Uploading…</span>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {value.map((img, idx) => (
          <div key={img.url} className="border rounded-lg p-2 space-y-2">
            {/* Use next/image on the public page; for admin previews img is fine */}
            <img src={img.url} alt={img.alt ?? ""} className="w-full rounded" />
            <div className="flex gap-2">
              <button type="button" onClick={() => move(idx, -1)} className="text-sm border px-2 py-1 rounded">
                ↑
              </button>
              <button type="button" onClick={() => move(idx, 1)} className="text-sm border px-2 py-1 rounded">
                ↓
              </button>
              <button type="button" onClick={() => remove(idx)} className="text-sm border px-2 py-1 rounded ml-auto">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
