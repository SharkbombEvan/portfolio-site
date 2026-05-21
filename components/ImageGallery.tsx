"use client";

import { useState, useEffect, useCallback } from "react";

type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
};

type MediaItem =
  | { type: "image"; id: string; url: string; alt: string | null }
  | { type: "video"; id: string; videoId: string };

type Props = {
  images: ProjectImage[];
  videoUrl?: string | null;
};

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function ImageGallery({ images, videoUrl }: Props) {
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;

  const mediaItems: MediaItem[] = [
    ...images.map((img) => ({ type: "image" as const, id: img.id, url: img.url, alt: img.alt })),
    ...(videoId ? [{ type: "video" as const, id: "video", videoId }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const total = mediaItems.length;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex((i) => i === null ? null : (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((i) => i === null ? null : (i + 1) % total), [total]);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (mediaItems.length === 0) return null;

  const activeItem = activeIndex !== null ? mediaItems[activeIndex] : null;

  return (
    <>
      {/* THUMBNAIL GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        marginTop: 24,
      }}>
        {mediaItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            aria-label={item.type === "video" ? "Play demo video" : (item.type === "image" ? (item.alt ?? `Open image ${idx + 1}`) : `Open image ${idx + 1}`)}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              cursor: "pointer",
              overflow: "hidden",
              aspectRatio: "4/3",
              display: "block",
              position: "relative",
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.alt ?? `Image ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.filter = "brightness(0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              />
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                  alt="Demo video"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.filter = "brightness(0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                />
                {/* Play button overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.65)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "18px solid #fff",
                      marginLeft: 5,
                    }} />
                  </div>
                </div>
                {/* "Demo Video" label */}
                <div style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "rgba(0,0,0,0.55)",
                  padding: "3px 8px",
                  pointerEvents: "none",
                }}>
                  Demo Video
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && activeItem && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", display: "flex", alignItems: "center" }}
          >
            {activeItem.type === "image" ? (
              <img
                src={activeItem.url}
                alt={activeItem.alt ?? ""}
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", display: "block" }}
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${activeItem.videoId}?autoplay=1`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  width: "min(80vw, 960px)",
                  aspectRatio: "16/9",
                  border: "none",
                  display: "block",
                }}
                title="Demo video"
              />
            )}

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
              {activeIndex! + 1} / {total}
            </div>
          </div>

          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 28, width: 52, height: 52, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001 }}
            >‹</button>
          )}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 28, width: 52, height: 52, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001 }}
            >›</button>
          )}

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
