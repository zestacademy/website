import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen, Heart } from "lucide-react"

interface CourseProps {
    title: string
    instructor: string
    rating: number
    students: number
    price: string
    image: string
    category: string
    level?: string
    tag?: string
}

export function CourseCard({ course }: { course: CourseProps }) {
    return (
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card">
            <div className="relative aspect-video overflow-hidden bg-muted">
                {/* Placeholder gradient/image */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-slate-900 ${course.image ? 'opacity-0' : 'opacity-100'}`} />
                {course.image && <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}

                <div className="absolute top-3 left-3 z-10">
                    <Badge variant="secondary" className="bg-white/90 text-black dark:bg-black/60 dark:text-white backdrop-blur-md shadow-sm border-none font-medium">
                        {course.level || "Beginner"}
                    </Badge>
                </div>
                <div className="absolute top-3 right-3 z-10">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white dark:bg-black/60 dark:text-gray-300 backdrop-blur-md shadow-sm">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Overlay content on hover if needed */}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {course.category}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-muted-foreground font-normal">({course.students > 1000 ? (course.students / 1000).toFixed(1) + 'k' : course.students})</span>
                    </div>
                </div>

                <h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-1">
                    By <span className="text-foreground font-medium">{course.instructor}</span>
                </p>

                <div className="pt-2 flex items-center justify-between border-t mt-1">
                    <span className="text-xl font-bold text-foreground">{course.price}</span>
                    <Button size="sm" className="px-6 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60 font-semibold transition-colors">
                        Enroll
                    </Button>
                </div>
            </div>
        </Card>
    )
}
