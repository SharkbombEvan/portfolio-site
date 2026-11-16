import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { EMPTY_PROJECT } from "@/components/admin/projectFormValues";
import { parseProjectForm } from "@/lib/admin-form";
import * as ui from "@/components/admin/ui";

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

async function createProject(formData: FormData) {
  "use server";

  const { data, images } = parseProjectForm(formData);
  if (!data.title || !data.slug) return { error: "Title and slug are required." };

  const clash = await prisma.project.findUnique({ where: { slug: data.slug }, select: { id: true } });
  if (clash) return { error: `Another project already uses the slug "${data.slug}".` };

  await prisma.project.create({
    data: {
      ...data,
      images: { create: images.map((img, i) => ({ url: img.url, alt: img.alt ?? null, order: i })) },
    },
  });

  redirect("/admin");
}

export default function NewProjectPage() {
  return (
    <main style={ui.adminPage}>
      <Link href="/admin" className="link" style={{ fontSize: 15, color: "var(--muted)" }}>Back to projects</Link>
      <h1 className="display" style={{ fontSize: 36, margin: "16px 0 28px" }}>New project</h1>
      <ProjectForm
        isNew
        submitLabel="Create project"
        action={createProject}
        initial={{ ...EMPTY_PROJECT, content: CASE_STUDY_TEMPLATE }}
      />
    </main>
  );
}
