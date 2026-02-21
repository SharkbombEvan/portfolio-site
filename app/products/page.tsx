import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await prisma.project.findMany({
    where: { isProduct: true },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a1a" }}>

      {/* NAV */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        borderBottom: "1px solid #ddd",
        background: "#f8f6f1",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{ fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 18, letterSpacing: "0.05em", textDecoration: "none", color: "#1a1a1a" }}>
          SHARKBOMB AUDIO
        </Link>
        <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
          <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
          <Link href="/products" style={{ textDecoration: "none", color: "#1a1a1a", borderBottom: "1px solid #1a1a1a", paddingBottom: 2 }}>PRODUCTS</Link>
          <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
          <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a" }}>CONTACT</Link>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "80px 48px 64px", maxWidth: 1100, margin: "0 auto", borderBottom: "1px solid #ddd" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: 24 }}>
          Available Now
        </p>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontFamily: "'Georgia', serif",
          fontWeight: "normal",
          lineHeight: 1.1,
          margin: "0 0 24px",
          letterSpacing: "-0.02em",
        }}>
          Products
        </h1>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 480, lineHeight: 1.7 }}>
          Hand-built audio equipment available for purchase. Each piece is designed, built, and tested by Sharkbomb Audio.
        </p>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ padding: "64px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
        {products.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>No products listed yet.</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 40,
          }}>
            {products.map((product) => {
              const thumb = product.images[0]?.url ?? product.coverImage;
              return (
                <Link
                  key={product.id}
                  href={`/projects/${product.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  {/* IMAGE */}
                  <div style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: "#ede9e3",
                    overflow: "hidden",
                    marginBottom: 16,
                  }}>
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>
                    Sharkbomb Audio
                  </p>
                  <h2 style={{ fontSize: 18, fontWeight: "normal", fontFamily: "'Georgia', serif", marginBottom: 8 }}>
                    {product.title}
                  </h2>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>
                    {product.summary}
                  </p>
                  {product.tech?.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {product.tech.map((t) => (
                        <span key={t} style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", border: "1px solid #ccc", padding: "2px 7px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ marginTop: 16, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid #1a1a1a", display: "inline-block", paddingBottom: 2 }}>
                    View Details →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
        <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
        <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
      </footer>

    </main>
  );
}
