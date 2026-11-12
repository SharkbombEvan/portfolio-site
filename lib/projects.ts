import { prisma } from "@/lib/prisma";

export const cardInclude = {
  images: { orderBy: { order: "asc" as const }, take: 1 },
};

const featuredOrderBy = [
  { featuredOrder: { sort: "asc" as const, nulls: "last" as const } },
  { createdAt: "desc" as const },
];

// Home page: hand-picked projects (any area), falling back to the newest few.
export async function getFeatured(limit = 6) {
  const picked = await prisma.project.findMany({
    where: { featured: true },
    orderBy: featuredOrderBy,
    take: limit,
    include: cardInclude,
  });
  if (picked.length > 0) return picked;
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: cardInclude,
  });
}

// /audio landing: hand-picked audio projects, falling back to the newest audio ones.
export async function getAudioFeatured(limit = 3) {
  const picked = await prisma.project.findMany({
    where: { audioFeatured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: cardInclude,
  });
  if (picked.length > 0) return picked;
  return prisma.project.findMany({
    where: { areas: { has: "audio" } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: cardInclude,
  });
}
