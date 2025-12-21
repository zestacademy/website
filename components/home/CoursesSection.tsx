import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const courses = [
    {
        title: "Complete Web Design: from Figma to Webflow",
        instructor: "Sarah Jenkins",
        rating: 4.8,
        students: 2100,
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=600",
        category: "Design",
        level: "Beginner",
        tag: "Bestseller"
    },
    {
        title: "Advanced React Patterns & Performance",
        instructor: "David Chen",
        rating: 4.9,
        students: 850,
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
        category: "Development",
        level: "Advanced",
        tag: "New"
    },
    {
        title: "Data Analysis for Business Intelligence with Excel",
        instructor: "Michael Scott",
        rating: 4.6,
        students: 1200,
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600",
        category: "Business",
        level: "Intermediate"
    },
    {
        title: "Digital Marketing Essentials 101",
        instructor: "Emily Blunt",
        rating: 4.7,
        students: 5400,
        price: "Free",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=600",
        category: "Marketing",
        level: "Beginner"
    },
]

export function CoursesSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-red-500">🔥</span>
                    <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
                </div>
                <Button variant="ghost" className="hidden md:flex gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    View All <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <Button variant="outline" className="w-full">View all courses</Button>
            </div>
        </section>
    )
}
