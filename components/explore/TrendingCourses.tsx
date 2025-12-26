import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"

const trendingCourses: any[] = []

export function TrendingCourses() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-red-500">🔥</span>
                        <h2 className="text-2xl font-bold">Trending Now</h2>
                    </div>
                    <Button variant="link" className="text-blue-500 hover:text-blue-600">View All</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingCourses.map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                    ))}
                </div>
            </div>
        </section>
    )
}
