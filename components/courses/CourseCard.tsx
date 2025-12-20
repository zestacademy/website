import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen } from "lucide-react"

interface CourseProps {
    title: string
    instructor: string
    rating: number
    students: number
    price: string
    image: string
    category: string
    tag?: string
}

export function CourseCard({ course }: { course: CourseProps }) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted">
            <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse group-hover:animate-none" />
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <Badge variant="secondary" className="mb-2 backdrop-blur-md bg-white/20 text-white border-none">
                        {course.category}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {course.title}
                    </h3>
                </div>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>20h 15m</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>12 Lessons</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-lg font-bold">{course.price}</span>
                <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">Enroll</Button>
            </CardFooter>
        </Card>
    )
}
