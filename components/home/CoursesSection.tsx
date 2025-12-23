import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

const courses = [
    {
        title: "Master Data Structures & Algorithms",
        instructor: "Dr. Sarah Kumar",
        rating: 4.9,
        students: 8500,
        price: "$29.99",
        image: "",
        category: "DSA",
        level: "Intermediate",
        tag: "Interview Focus",
        difficulty: "Medium",
        duration: "12 weeks"
    },
    {
        title: "System Design Fundamentals",
        instructor: "Alex Chen",
        rating: 4.8,
        students: 3200,
        price: "$49.99",
        image: "",
        category: "System Design",
        level: "Advanced",
        tag: "High Demand",
        difficulty: "Hard",
        duration: "8 weeks"
    },
    {
        title: "Complete React & Node.js Stack",
        instructor: "David Martinez",
        rating: 4.7,
        students: 5400,
        price: "$39.99",
        image: "",
        category: "Web Development",
        level: "Beginner",
        difficulty: "Easy",
        duration: "10 weeks"
    },
    {
        title: "SQL & Database Design Mastery",
        instructor: "Emily Roberts",
        rating: 4.9,
        students: 4100,
        price: "Free",
        image: "",
        category: "Database",
        level: "Intermediate",
        difficulty: "Medium",
        duration: "6 weeks"
    },
]

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
