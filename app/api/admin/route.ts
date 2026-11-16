import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Img = { url: string; alt?: string };

export async function POST(req: Request) {
  const body = await req.json();
  const {
    title,
    slug,
    summary,
    audioSummary,
    audioContent,
    contentMd,
    tech,
    coverImage,
    demoUrl,
    repoUrl,
    shopUrl,
    price,
    isProduct,
    images,
    areas,
    featured,
    featuredOrder,
    audioFeatured,
    role,
    year,
    context,
    highlights,
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
      audioSummary: audioSummary || null,
      audioContent: audioContent || null,
      tech: tech || [],
      coverImage: coverImage || null,
      demoUrl: demoUrl || null,
      repoUrl: repoUrl || null,
      shopUrl: shopUrl || null,
      price: price || null,
      isProduct: isProduct ?? false,
      areas: Array.isArray(areas) ? areas : [],
      featured: featured ?? false,
      featuredOrder: Number.isInteger(featuredOrder) ? featuredOrder : null,
      audioFeatured: audioFeatured ?? false,
      role: role || null,
      year: year || null,
      context: context || null,
      highlights: Array.isArray(highlights) ? highlights : [],
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
