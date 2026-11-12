"use client";

import { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import ProjectImagesField from "@/components/admin/ProjectImagesField";
import { useRouter } from "next/navigation";
import { AREAS } from "@/lib/areas";

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

const CASE_STUDY_TEMPLATE = `## Problem

What needed to be solved, and why it mattered.

## Approach

How you broke it down and the options you considered.

## Design details

Key circuit / system decisions, with schematics or photos.

## Results

What it did, measured if possible.

## What I'd do differently

`;

export default function NewProjectPage() {
  const router = useRouter();
  const [isProduct, setIsProduct] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState(CASE_STUDY_TEMPLATE);
  const [areas, setAreas] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState("");
  const [audioFeatured, setAudioFeatured] = useState(false);
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [context, setContext] = useState("");
  const [highlights, setHighlights] = useState("");
  const [tech, setTech] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [price, setPrice] = useState("");
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
          price: price || null,
          isProduct,
          images,
          areas,
          featured,
          featuredOrder: featuredOrder ? parseInt(featuredOrder, 10) : null,
          audioFeatured,
          role: role || null,
          year: year || null,
          context: context || null,
          highlights: highlights.split("\n").map((l) => l.trim()).filter(Boolean),
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

      <fieldset style={{ ...fieldStyle, border: "1px solid #ddd", padding: "12px 14px" }}>
        <legend style={{ ...labelStyle, padding: "0 6px" }}>Areas (filters on /projects; "Audio" also lists it on the Sharkbomb Audio side)</legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          {AREAS.map((a) => (
            <label key={a.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14 }}>
              <input
                type="checkbox"
                checked={areas.includes(a.value)}
                onChange={(e) =>
                  setAreas((prev) => (e.target.checked ? [...prev, a.value] : prev.filter((v) => v !== a.value)))
                }
              />
              {a.label}
            </label>
          ))}
        </div>
      </fieldset>

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Designer & builder" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Year</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Context</label>
          <input value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g. PRS internship, UVA ECE course, client commission" style={inputStyle} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Highlights (one per line — outcomes & metrics)</label>
        <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} placeholder={"Reduced noise floor by 12 dB\nShipped 30 units"} style={textareaStyle} />
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

      <div style={fieldStyle}>
        <label style={labelStyle}>Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. $249"
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

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 28px", marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>Feature on home page</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Order</span>
          <input type="number" min={1} value={featuredOrder} onChange={(e) => setFeaturedOrder(e.target.value)} placeholder="1" style={{ ...inputStyle, width: 70 }} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={audioFeatured} onChange={(e) => setAudioFeatured(e.target.checked)} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>Feature on Sharkbomb Audio page</span>
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
