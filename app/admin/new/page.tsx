"use client";

import { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import ProjectImagesField from "@/components/admin/ProjectImagesField";
import { useRouter } from "next/navigation";

type Img = { url: string; alt?: string };

const fieldStyle: React.CSSProperties = { marginBottom: 20 };
const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  fontSize: 13,
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "8px 10px",
  border: "1px solid #ccc",
  fontSize: 14,
  fontFamily: "inherit",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: "vertical" };

export default function NewProjectPage() {
  const router = useRouter();
  const [isProduct, setIsProduct] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [tech, setTech] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [images, setImages] = useState<Img[]>([]);
  const [saving, setSaving] = useState(false);

  const imagesInputRef = useRef<HTMLInputElement | null>(null);

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
          shopUrl: shopUrl || null,
          isProduct,
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
    <main style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ marginBottom: 24 }}>New Project</h1>

      <div style={fieldStyle}>
        <label style={labelStyle}>Title</label>
        <input
          value={title}
          onChange={(e) => {
            const t = e.target.value;
            setTitle(t);
            if (!slugManuallyEdited) {
              setSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
            }
          }}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Slug</label>
        <input
          value={slug}
          onChange={(e) => { setSlugManuallyEdited(true); setSlug(e.target.value); }}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          style={textareaStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Tech (comma-separated)</label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="Analog, PCB, Through-hole"
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Cover Image URL</label>
        <input
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://..."
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Demo URL (YouTube)</label>
        <input
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Repo URL</label>
        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/..."
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Shop URL (Reverb)</label>
        <input
          value={shopUrl}
          onChange={(e) => setShopUrl(e.target.value)}
          placeholder="https://reverb.com/item/..."
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={isProduct}
            onChange={(e) => setIsProduct(e.target.checked)}
          />
          <span style={{ fontWeight: 600, fontSize: 13 }}>List as a Product</span>
        </label>
      </div>

      <input ref={imagesInputRef} type="hidden" defaultValue="[]" />

      <div style={{ marginBottom: 24 }}>
        <p style={labelStyle}>Gallery Images</p>
        <ProjectImagesField value={images} onChange={setImages} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <p style={labelStyle}>Content</p>
        <div data-color-mode="light">
          <MDEditor
            value={contentMd}
            onChange={(v) => setContentMd(v ?? "")}
            height={500}
          />
        </div>
      </div>

      <button
        disabled={saving}
        onClick={saveProject}
        style={{ padding: "10px 24px", fontSize: 14, cursor: saving ? "not-allowed" : "pointer" }}
      >
        {saving ? "Saving…" : "Save Project"}
      </button>
    </main>
  );
}
