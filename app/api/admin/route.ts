import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, summary, contentMd, images } = body;

  if (!title || !slug || !contentMd) {
    return NextResponse.json(
      { error: "title, slug, and contentMd are required" },
      { status: 400 }
    );
  }

  const created = await prisma.project.create({
    data: {
      title,
      slug,
      summary: summary || null,
      contentMd,
      images: Array.isArray(images) ? images : [],
    },
  });

  return NextResponse.json({ project: created });
}
