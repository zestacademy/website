import { ExploreHero } from "@/components/explore/ExploreHero"
import { CategoryGrid } from "@/components/explore/CategoryGrid"
import { TrendingCourses } from "@/components/explore/TrendingCourses"
import { RoadmapSection } from "@/components/home/RoadmapSection" // Reuse or create specific if different

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <ExploreHero />
            <CategoryGrid />
            <TrendingCourses />
            <div className="bg-muted/30">
                <RoadmapSection />
            </div>
        </div>
    )
}
