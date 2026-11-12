"use client";

import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import ProjectImagesField from "@/components/admin/ProjectImagesField";
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

export default function EditProjectForm({
  project,
  action,
}: {
  project: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    tech: string[];
    content: string;
    coverImage: string;
    demoUrl: string;
    repoUrl: string;
    shopUrl: string;
    price: string;
    isProduct: boolean;
    areas: string[];
    featured: boolean;
    featuredOrder: string;
    audioFeatured: boolean;
    role: string;
    year: string;
    context: string;
    highlights: string[];
    images: Img[];
  };
  action: (formData: FormData) => Promise<void>;
}) {
  const [images, setImages] = useState<Img[]>(project.images ?? []);
  const [contentMd, setContentMd] = useState(project.content ?? "");

  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imagesInputRef.current) {
      imagesInputRef.current.value = JSON.stringify(images);
    }
  }, [images]);

  useEffect(() => {
    if (contentInputRef.current) {
      contentInputRef.current.value = contentMd;
    }
  }, [contentMd]);

  return (
    <form action={action} style={{ marginTop: 16 }}>

      <div style={fieldStyle}>
        <label style={labelStyle}>Title</label>
        <input name="title" defaultValue={project.title} required style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Slug</label>
        <input name="slug" defaultValue={project.slug} required style={inputStyle} />
      </div>

      <fieldset style={{ ...fieldStyle, border: "1px solid #ddd", padding: "12px 14px" }}>
        <legend style={{ ...labelStyle, padding: "0 6px" }}>Areas (shown as filters on /projects; "Audio" also lists it on the Sharkbomb Audio side)</legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          {AREAS.map((a) => (
            <label key={a.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14 }}>
              <input type="checkbox" name="areas" value={a.value} defaultChecked={project.areas.includes(a.value)} />
              {a.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div style={fieldStyle}>
        <label style={labelStyle}>Summary</label>
        <textarea name="summary" defaultValue={project.summary} rows={3} style={textareaStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Tech (comma-separated)</label>
        <input name="tech" defaultValue={(project.tech || []).join(", ")} style={inputStyle} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Role</label>
          <input name="role" defaultValue={project.role} placeholder="e.g. Designer & builder" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Year</label>
          <input name="year" defaultValue={project.year} placeholder="e.g. 2024" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Context</label>
          <input name="context" defaultValue={project.context} placeholder="e.g. PRS internship, UVA ECE course, client commission" style={inputStyle} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Highlights (one per line — outcomes & metrics)</label>
        <textarea name="highlights" defaultValue={project.highlights.join("\n")} rows={4} placeholder={"Reduced noise floor by 12 dB\nShipped 30 units"} style={textareaStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Cover Image URL</label>
        <input name="coverImage" defaultValue={project.coverImage || ""} placeholder="https://..." style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Demo URL (YouTube)</label>
        <input name="demoUrl" defaultValue={project.demoUrl || ""} placeholder="https://youtube.com/watch?v=..." style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Repo URL</label>
        <input name="repoUrl" defaultValue={project.repoUrl || ""} placeholder="https://github.com/..." style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Shop URL (Reverb)</label>
        <input name="shopUrl" defaultValue={project.shopUrl || ""} placeholder="https://reverb.com/item/..." style={inputStyle} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Price</label>
        <input name="price" defaultValue={project.price || ""} placeholder="e.g. $249" style={inputStyle} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" name="isProduct" defaultChecked={project.isProduct} value="true" />
          <span style={{ fontWeight: 600, fontSize: 13 }}>List as a Product</span>
        </label>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 28px", marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" name="featured" value="true" defaultChecked={project.featured} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>Feature on home page</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Order</span>
          <input name="featuredOrder" type="number" min={1} defaultValue={project.featuredOrder} placeholder="1" style={{ ...inputStyle, width: 70 }} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" name="audioFeatured" value="true" defaultChecked={project.audioFeatured} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>Feature on Sharkbomb Audio page</span>
        </label>
      </div>

      {/* Hidden inputs synced from controlled state */}
      <input ref={imagesInputRef} type="hidden" name="images" defaultValue={JSON.stringify(images)} />
      <input ref={contentInputRef} type="hidden" name="content" defaultValue={project.content ?? ""} />

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

      <button type="submit" style={{ padding: "10px 24px", fontSize: 14, cursor: "pointer" }}>
        Save Changes
      </button>
    </form>
  );
}
