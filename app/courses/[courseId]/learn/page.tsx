
import { LMSService } from "@/services/lms-service"
import { notFound, redirect } from "next/navigation"

interface PageProps {
    params: Promise<{
        courseId: string
    }>
}

export default async function LearnRedirectPage({ params }: PageProps) {
    const { courseId } = await params
    const course = await LMSService.getCourseById(courseId)

    if (!course) notFound()

    // Logic to find last accessed or first lesson
    // In a real app, fetch UserProgress here. 
    // For now, default to first lesson.

    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        redirect(`/courses/${courseId}/learn/${course.modules[0].lessons[0].id}`)
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">No content available for this course yet.</h1>
        </div>
    )
}
