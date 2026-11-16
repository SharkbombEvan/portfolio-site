// Shared FormData parsing for the admin create/edit forms.
type Img = { url: string; alt?: string };

const str = (fd: FormData, key: string) => ((fd.get(key) as string) ?? "").trim();
const strOrNull = (fd: FormData, key: string) => str(fd, key) || null;

export function parseProjectForm(fd: FormData) {
  const tech = str(fd, "tech").split(",").map((s) => s.trim()).filter(Boolean);
  const areas = (fd.getAll("areas") as string[]).filter(Boolean);
  const highlights = ((fd.get("highlights") as string) || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const orderRaw = parseInt(str(fd, "featuredOrder"), 10);

  let images: Img[] = [];
  try {
    const parsed = JSON.parse((fd.get("images") as string) || "[]");
    if (Array.isArray(parsed)) {
      images = parsed
        .filter((x) => x && typeof x.url === "string" && x.url.length > 0)
        .map((x) => ({ url: x.url, alt: typeof x.alt === "string" ? x.alt : undefined }));
    }
  } catch {
    images = [];
  }

  return {
    data: {
      title: str(fd, "title"),
      slug: str(fd, "slug"),
      summary: (fd.get("summary") as string) || "",
      content: strOrNull(fd, "content"),
      audioSummary: strOrNull(fd, "audioSummary"),
      audioContent: strOrNull(fd, "audioContent"),
      isProduct: fd.get("isProduct") === "true",
      coverImage: strOrNull(fd, "coverImage"),
      demoUrl: strOrNull(fd, "demoUrl"),
      repoUrl: strOrNull(fd, "repoUrl"),
      shopUrl: strOrNull(fd, "shopUrl"),
      price: strOrNull(fd, "price"),
      tech,
      areas,
      featured: fd.get("featured") === "true",
      featuredOrder: Number.isNaN(orderRaw) ? null : orderRaw,
      audioFeatured: fd.get("audioFeatured") === "true",
      role: strOrNull(fd, "role"),
      year: strOrNull(fd, "year"),
      context: strOrNull(fd, "context"),
      highlights,
    },
    images,
  };
}
