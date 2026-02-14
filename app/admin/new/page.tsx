"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      setImages((prev) => [...prev, data.url]);

      // Optional: auto-insert into markdown at the end
      setContentMd((prev) => `${prev}\n\n![${file.name}](${data.url})\n`);
    } finally {
      setUploading(false);
    }
  }

  async function saveProject() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, summary, contentMd, images }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");

      alert("Saved!");
      // optionally redirect to edit page
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 1000 }}>
      <h1>New Project</h1>

      <label>Title</label>
      <input
        value={title}
        onChange={(e) => {
          const t = e.target.value;
          setTitle(t);
          setSlug(
            slug ||
              t
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
          );
        }}
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Slug</label>
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Summary</label>
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <div style={{ margin: "16px 0" }}>
        <label>Upload image</label>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadImage(f);
          }}
        />
        {uploading && <p>Uploading…</p>}
      </div>

      <div data-color-mode="light">
        <MDEditor value={contentMd} onChange={(v) => setContentMd(v || "")} />
      </div>

      <h3>Images</h3>
      <ul>
        {images.map((url) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer">{url}</a>
          </li>
        ))}
      </ul>

      <button disabled={saving} onClick={saveProject}>
        {saving ? "Saving…" : "Save Project"}
      </button>
    </main>
  );
}