//app/(auth)/layout.tsx
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import ImageSlider, { type Slide } from "@/components/auth/image-slider";

export const metadata: Metadata = {
  title: "Auth Pages",
  description: "Authentication Pages of My App",
};

const slides: Slide[] = [
  //   { src: "https://picsum.photos/800/600?random=1", alt: "Slide 1" },
  //   { src: "https://picsum.photos/800/600?random=2", alt: "Slide 2" },
  //   { src: "https://picsum.photos/800/600?random=3", alt: "Slide 3" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-dvh flex-col lg:flex-row">
      {/* Left: Carousel */}
      <div className="hidden lg:block lg:w-2/3">
        <ImageSlider slides={slides} autoSlide />
      </div>

      {/* Right: Auth Card */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/3">
        <div
          className={cn(
            "bg-background flex w-full max-w-md flex-col rounded-xl p-6"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
