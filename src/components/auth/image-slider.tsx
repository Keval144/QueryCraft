// components/common/Carousel.tsx
"use client";
import Image, { type StaticImageData } from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

export interface Slide {
  src: StaticImageData | string;
  alt: string;
}

export interface CarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const ImageSlider: React.FC<CarouselProps> = ({
  slides,
  autoSlide = false,
  autoSlideInterval = 7000,
}) => {
  const [current, setCurrent] = useState(0);

  const _prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    [slides.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const id = setInterval(next, autoSlideInterval);
    return () => clearInterval(id);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {slides.map(({ src, alt }, idx) => (
        <div
          key={typeof src === "string" ? src : src.src}
          className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            idx === current ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            className="object-cover"
            priority={idx === 0}
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
