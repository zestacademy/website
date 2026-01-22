"use client"

import { HeroSection } from "@/components/home/HeroSection";
import { ExploreSection } from "@/components/home/ExploreSection";
import { CourseSection } from "@/components/home/StructuredCoursesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CoursesSection } from "@/components/home/CoursesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExploreSection />
      <CourseSection />
      <HowItWorksSection />
      <CategoriesSection />
      <CoursesSection />
    </div>
  );
}
