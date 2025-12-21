import { CourseCard } from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"

const trendingCourses = [
    {
        title: "Mastering UI Design",
        instructor: "Sarah Jenkins",
        rating: 4.9,
        students: 2300,
        price: "Best Seller",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=600",
        category: "Design",
        level: "Beginner",
        tag: "Best Seller"
    },
    {
        title: "Python for Everyone",
        instructor: "David Malan",
        rating: 4.8,
        students: 15400,
        price: "Updated",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600",
        category: "Programming",
        level: "All Levels",
        tag: "Updated"
    },
    {
        title: "Marketing Basics",
        instructor: "Gary Vee",
        rating: 4.7,
        students: 800,
        price: "Popular",
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=600",
        category: "Marketing",
        level: "Intermediate",
        tag: "Popular"
    },
    {
        title: "Pro Photography",
        instructor: "Peter McKinnon",
        rating: 4.9,
        students: 1200,
        price: "Hot",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
        category: "Photography",
        level: "Advanced",
        tag: "Hot"
    },
]

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
