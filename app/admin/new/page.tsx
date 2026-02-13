import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createProject(formData: FormData) {
  "use server";

  const techRaw = (formData.get("tech") as string) || "";
  const tech = techRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      summary: (formData.get("summary") as string) || "",
      content: (formData.get("content") as string) || null,
      tech,
      coverImage: (formData.get("coverImage") as string) || null,
      demoUrl: (formData.get("demoUrl") as string) || null,
      repoUrl: (formData.get("repoUrl") as string) || null,
    },
  });

  redirect("/admin");
}

export default function NewProjectPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>New Project</h1>

      <form action={createProject} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Title
          <input name="title" required />
        </label>

        <label>
          Slug
          <input name="slug" required />
        </label>

        <label>
          Summary
          <textarea name="summary" rows={3} />
        </label>

        <label>
          Tech (comma-separated)
          <input name="tech" placeholder="KiCad, DSP, Daisy Seed" />
        </label>

        <label>
          Cover Image URL
          <input name="coverImage" placeholder="https://..." />
        </label>

        <label>
          Demo URL
          <input name="demoUrl" placeholder="https://..." />
        </label>

        <label>
          Repo URL
          <input name="repoUrl" placeholder="https://..." />
        </label>

        <label>
          Content
          <textarea name="content" rows={12} placeholder="Write markdown here for now..." />
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit">Create</button>
          <a href="/admin" style={{ alignSelf: "center" }}>Cancel</a>
        </div>
      </form>
    </main>
  );
}