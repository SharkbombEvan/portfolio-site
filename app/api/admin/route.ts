import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Img = { url: string; alt?: string };

export async function POST(req: Request) {
  const body = await req.json();
  const {
    title,
    slug,
    summary,
    contentMd,
    tech,
    coverImage,
    demoUrl,
    repoUrl,
    images,
  } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "title and slug are required" },
      { status: 400 }
    );
  }

  const created = await prisma.project.create({
    data: {
      title,
      slug,
      summary: summary || "",
      content: contentMd || null,
      tech: tech || [],
      coverImage: coverImage || null,
      demoUrl: demoUrl || null,
      repoUrl: repoUrl || null,
      images: {
        create: (images as Img[] || []).map((img, i) => ({
          url: img.url,
          alt: img.alt ?? null,
          order: i,
        })),
      },
    },
  });

  return NextResponse.json({ project: created });
}
