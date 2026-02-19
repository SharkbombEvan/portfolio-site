"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
};

type Props = {
  images: ProjectImage[];
};

export default function ImageCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images || images.length === 0) return null;

  // If there's only one image, just render it without carousel controls
  if (images.length === 1) {
    return (
      <img
        src={images[0].url}
        alt={images[0].alt ?? "Project image"}
        style={{ width: "100%", borderRadius: 12, marginTop: 16 }}
      />
    );
  }

  return (
    <div style={{ position: "relative", marginTop: 16 }}>
      {/* Embla viewport */}
      <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: 12 }}>
        <div style={{ display: "flex" }}>
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                flex: "0 0 100%",
                minWidth: 0,
              }}
            >
              <img
                src={img.url}
                alt={img.alt ?? "Project image"}
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        style={{
          position: "absolute",
          top: "50%",
          left: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        aria-label="Next image"
        style={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 10,
        }}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              background: "#aaa",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
