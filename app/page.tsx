import { HeroSection } from "@/components/home/HeroSection";
import { ExploreSection } from "@/components/home/ExploreSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { MentorsSection } from "@/components/home/MentorsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ExploreSection />
      <CoursesSection />
      <CategoriesSection />
      <RoadmapSection />
      <MentorsSection />
    </div>
  );
}
