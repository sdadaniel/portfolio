"use client";

import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSwiperProps {
  images: { src: string; alt: string }[];
}

export default function ImageSwiper({ images }: ImageSwiperProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const close = useCallback(() => setModalIndex(null), []);
  const prev = useCallback(
    () => setModalIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () =>
      setModalIndex((i) =>
        i !== null && i < images.length - 1 ? i + 1 : i,
      ),
    [images.length],
  );

  useEffect(() => {
    if (modalIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalIndex, close, prev, next]);

  return (
    <>
      <div className="not-prose my-6">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          style={{ paddingBottom: 32 }}
          className="rounded-lg [&_.swiper-button-next]:!text-gray-400 [&_.swiper-button-prev]:!text-gray-400 [&_.swiper-button-next]:after:!text-xs [&_.swiper-button-prev]:after:!text-xs [&_.swiper-button-next]:!scale-40 [&_.swiper-button-prev]:!scale-40 [&_.swiper-pagination]:!-bottom-0 [&_.swiper-pagination-bullet-active]:!bg-gray-600 [&_.swiper-pagination-bullet]:!bg-gray-300"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-lg object-contain cursor-pointer hover:opacity-80 transition-opacity"
                style={{ height: 500 }}
                onClick={() => setModalIndex(i)}
              />
              {img.alt && (
                <p className="text-center text-xs text-gray-400 mt-2">
                  {img.alt}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none cursor-pointer"
          >
            &times;
          </button>

          {modalIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer"
            >
              &#8249;
            </button>
          )}

          {modalIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer"
            >
              &#8250;
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[modalIndex].src}
            alt={images[modalIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-6 text-white/70 text-sm">
            {images[modalIndex].alt} ({modalIndex + 1}/{images.length})
          </p>
        </div>
      )}
    </>
  );
}
