//app/(auth)/layout.tsx

import type { Metadata } from "next";
import final1 from "@/../public/carousel/1final.jpg";
import final2 from "@/../public/carousel/2final.jpg";
import final3 from "@/../public/carousel/3final.jpg";
import ImageSlider, { type Slide } from "@/components/auth/image-slider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Auth Pages",
  description: "Authentication Pages of My App",
};

const slides: Slide[] = [
  { src: final1, alt: "Analyst Working on his project" },
  { src: final2, alt: "Minimalist Programmer Setup" },
  { src: final3, alt: "Ai Abstract Art" },
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
            "bg-background flex w-full max-w-md flex-col rounded-xl p-6",
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
