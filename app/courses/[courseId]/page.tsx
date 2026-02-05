
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { LMSService } from "@/services/lms-service"
import CourseLanding from "@/components/courses/CourseLanding"

interface PageProps {
    params: Promise<{
        courseId: string
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { courseId } = await params
    const course = await LMSService.getCourseById(courseId)

    if (!course) {
        return {
            title: "Course Not Found | ZestAcademy",
        }
    }

    return {
        title: `${course.title} | ZestAcademy`,
        description: course.description,
    }
}

export default async function CoursePage({ params }: PageProps) {
    const { courseId } = await params
    const course = await LMSService.getCourseById(courseId)

    if (!course) {
        notFound()
    }

    return <CourseLanding course={course} />
}
