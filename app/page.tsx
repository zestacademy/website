"use client"

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedLinksSlider } from "@/components/home/FeaturedLinksSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedLinksSlider />
    </div>
  );
}
