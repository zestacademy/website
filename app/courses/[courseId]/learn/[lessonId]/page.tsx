
import { LMSService } from "@/services/lms-service"
import { notFound, redirect } from "next/navigation"
import LessonUI from "@/components/courses/LessonUI"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface PageProps {
    params: Promise<{
        courseId: string
        lessonId: string
    }>
}

export default async function LessonPage({ params }: PageProps) {
    const { courseId, lessonId } = await params
    const course = await LMSService.getCourseById(courseId)

    if (!course) notFound()

    // Find the lesson
    let lesson = null
    let nextLessonId = null
    let prevLessonId = null

    // Flatten lessons to find current, next, prev
    const allLessons = course.modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === lessonId)

    if (currentIndex !== -1) {
        lesson = allLessons[currentIndex]
        if (currentIndex < allLessons.length - 1) {
            nextLessonId = allLessons[currentIndex + 1].id
        }
        if (currentIndex > 0) {
            prevLessonId = allLessons[currentIndex - 1].id
        }
    }

    if (!lesson) notFound()

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-32">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
            </div>

            <LessonUI lesson={lesson} />

            <div className="flex items-center justify-between pt-8 border-t mt-12">
                <div>
                    {prevLessonId && (
                        <Link href={`/courses/${courseId}/learn/${prevLessonId}`}>
                            <Button variant="outline">Previous Lesson</Button>
                        </Link>
                    )}
                </div>
                <div>
                    {nextLessonId ? (
                        <Link href={`/courses/${courseId}/learn/${nextLessonId}`}>
                            <Button className="gap-2">
                                Next Lesson <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href={`/courses/${courseId}`}>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                Complete Course
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
