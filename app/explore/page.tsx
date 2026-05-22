import { ExploreHero } from "@/components/explore/ExploreHero"
import { CategoryGrid } from "@/components/explore/CategoryGrid"
import { FeaturedArticles } from "@/components/explore/FeaturedArticles"

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <ExploreHero />
            <CategoryGrid />
            <FeaturedArticles />
        </div>
    )
}
