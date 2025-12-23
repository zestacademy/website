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
    difficulty?: string
    duration?: string
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
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide">
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

                {/* Difficulty and Duration */}
                {(course.difficulty || course.duration) && (
                    <div className="flex items-center gap-3 text-xs">
                        {course.difficulty && (
                            <span className={`px-2 py-1 rounded-md font-medium ${
                                course.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                course.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {course.difficulty}
                            </span>
                        )}
                        {course.duration && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {course.duration}
                            </span>
                        )}
                    </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t mt-1">
                    <span className="text-xl font-bold text-foreground">{course.price}</span>
                    <Button size="sm" className="px-6 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-colors">
                        Enroll
                    </Button>
                </div>
            </div>
        </Card>
    )
}
