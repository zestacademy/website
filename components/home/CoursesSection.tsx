import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const courses = [
    {
        title: "Complete Python Bootcamp: From Zero to Hero",
        instructor: "Dr. Angela Yu",
        rating: 4.8,
        students: 12500,
        price: "$19.99",
        image: "",
        category: "Development",
        tag: "Bestseller"
    },
    {
        title: "UI/UX Design Masterclass 2024",
        instructor: "Gary Simon",
        rating: 4.9,
        students: 8500,
        price: "$24.99",
        image: "",
        category: "Design",
        tag: "New"
    },
    {
        title: "Machine Learning A-Z: Hands-On Python",
        instructor: "Kirill Eremenko",
        rating: 4.7,
        students: 22000,
        price: "$14.99",
        image: "",
        category: "Data Science"
    },
    {
        title: "The Ultimate Digital Marketing Strategy",
        instructor: "Seth Godin",
        rating: 4.6,
        students: 5400,
        price: "$29.99",
        image: "",
        category: "Marketing"
    },
]

export function CoursesSection() {
    return (
        <section className="container mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Popular Courses</h2>
                <Button variant="ghost" className="hidden md:flex gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    View all courses <ArrowRight className="h-4 w-4" />
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
