import { CategoryGrid } from "@/components/explore/CategoryGrid"
import { ExploreHero } from "@/components/explore/ExploreHero"

// Categories page can essentially reuse the Explore page structure or just focus on the grid
// but usually "Categories" implies a full list. 
// For now, I will reuse the CategoryGrid component but wrapped in a page layout.

export default function CategoriesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-background border-b">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Course Categories</h1>
                    <p className="text-muted-foreground w-full max-w-2xl mx-auto">
                        Dive deep into our specific categories to find exactly what you need to advance your career.
                    </p>
                </div>
            </section>
            <CategoryGrid />
        </div>
    )
}
