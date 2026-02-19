"use client";

import { useState, useEffect, useCallback } from "react";

type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
};

type Props = {
  images: ProjectImage[];
};

export default function ImageGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* THUMBNAIL GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        marginTop: 24,
      }}>
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(idx)}
            aria-label={img.alt ?? `Open image ${idx + 1}`}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              overflow: "hidden",
              aspectRatio: "4/3",
              display: "block",
            }}
          >
            <img
              src={img.url}
              alt={img.alt ?? `Image ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.2s ease, filter 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)";
              }}
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && activeIndex !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Prevent click on image/controls from closing */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", display: "flex", alignItems: "center" }}
          >
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].alt ?? `Image ${activeIndex + 1}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* Counter */}
            <div style={{
              position: "absolute",
              bottom: -36,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#aaa",
              fontSize: 13,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}>
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{
                position: "fixed",
                left: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                fontSize: 28,
                width: 52,
                height: 52,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
              }}
            >
              ‹
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{
                position: "fixed",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                fontSize: 28,
                width: 52,
                height: 52,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
              }}
            >
              ›
            </button>
          )}

          {/* Escape hint */}
          <p style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#666",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 1001,
          }}>
            Click outside or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
