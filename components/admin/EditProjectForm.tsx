"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectImagesField from "@/components/admin/ProjectImagesField";

type Img = { url: string; alt?: string };

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
    isProduct: boolean;
    images: Img[];
  };
  action: (formData: FormData) => Promise<void>;
}) {
  const initialImages = useMemo(() => project.images ?? [], [project.images]);
  const [images, setImages] = useState<Img[]>(initialImages);

  const imagesInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imagesInputRef.current) {
      imagesInputRef.current.value = JSON.stringify(images);
    }
  }, [images]);

  return (
    <form action={action} style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <label>
        Title <input name="title" defaultValue={project.title} required />
      </label>

      <label>
        Slug <input name="slug" defaultValue={project.slug} required />
      </label>

      <label>
        Summary <textarea name="summary" defaultValue={project.summary} rows={3} />
      </label>

      <label>
        Tech <input name="tech" defaultValue={(project.tech || []).join(", ")} />
      </label>

      <label>
        Cover Image URL{" "}
        <input name="coverImage" defaultValue={project.coverImage || ""} placeholder="https://..." />
      </label>

      <label>
        Demo URL{" "}
        <input name="demoUrl" defaultValue={project.demoUrl || ""} placeholder="https://..." />
      </label>

      <label>
        Repo URL{" "}
        <input name="repoUrl" defaultValue={project.repoUrl || ""} placeholder="https://github.com/..." />
      </label>

      <label>
        Shop URL (Reverb){" "}
        <input name="shopUrl" defaultValue={project.shopUrl || ""} placeholder="https://reverb.com/item/..." />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          name="isProduct"
          defaultChecked={project.isProduct}
          value="true"
        />
        List as a Product
      </label>

      {/* Hidden JSON field that carries the gallery images to the server action */}
      <input ref={imagesInputRef} type="hidden" name="images" defaultValue={JSON.stringify(images)} />

      <div style={{ marginTop: 8 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Gallery Images</h3>
        <ProjectImagesField value={images} onChange={setImages} />
      </div>

      <label>
        Content <textarea name="content" defaultValue={project.content ?? ""} rows={12} />
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
