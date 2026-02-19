"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import MDEditor from "@uiw/react-md-editor";
import ProjectImagesField from "@/components/admin/ProjectImagesField";
import { useRouter } from "next/navigation";

type Img = { url: string; alt?: string };

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState<string>("");
  const [tech, setTech] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [images, setImages] = useState<Img[]>([]);
  const imagesInputRef = useRef<HTMLInputElement | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (imagesInputRef.current) {
      imagesInputRef.current.value = JSON.stringify(images);
    }
  }, [images]);

  async function saveProject() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          summary,
          contentMd,
          tech: tech.split(",").map((s) => s.trim()).filter(Boolean),
          coverImage: coverImage || null,
          demoUrl: demoUrl || null,
          repoUrl: repoUrl || null,
          images,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");

      router.push("/admin");
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
          if (!slugManuallyEdited) {
            setSlug(
              t.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
            );
          }
        }}

        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Slug</label>
      <input
        value={slug}
        onChange={(e) => {
        setSlugManuallyEdited(true);
         setSlug(e.target.value);
}}
      />

      <label>Summary</label>
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Tech (comma-separated)</label>
      <input
        value={tech}
        onChange={(e) => setTech(e.target.value)}
        placeholder="React, TypeScript, Prisma"
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Cover Image URL</label>
      <input
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        placeholder="https://..."
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Demo URL</label>
      <input
        value={demoUrl}
        onChange={(e) => setDemoUrl(e.target.value)}
        placeholder="https://..."
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <label>Repo URL</label>
      <input
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="https://github.com/..."
        style={{ display: "block", width: "100%", marginBottom: 12 }}
      />

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Gallery Images</h3>
        <ProjectImagesField value={images} onChange={setImages} />
      </div>

      <div data-color-mode="light" style={{ marginBottom: 16 }}>
        <label>Content</label>
        <MDEditor value={contentMd} onChange={(v) => setContentMd(v || "")} />
      </div>

      <button disabled={saving} onClick={saveProject}>
        {saving ? "Saving…" : "Save Project"}
      </button>
    </main>
  );
}
