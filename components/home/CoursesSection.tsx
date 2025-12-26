import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

const courses: any[] = []

export function CoursesSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Featured Topics</h2>
                        <p className="text-sm text-muted-foreground mt-1">High-impact skills for engineering success</p>
                    </div>
                </div>
                <Button variant="ghost" className="hidden md:flex gap-2 text-primary hover:text-primary/80 hover:bg-primary/10">
                    View All <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <Button variant="outline" className="w-full">View all topics</Button>
            </div>
        </section>
    )
}
