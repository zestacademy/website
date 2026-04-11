"use client"

import { useEffect, useState, use } from "react"
import { LMSService } from "@/services/lms-service"
import { notFound, useRouter } from "next/navigation"
import LessonUI from "@/components/courses/LessonUI"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, Lock } from "lucide-react"
import Link from "next/link"
import { Course, Lesson, Enrollment } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface PageProps {
    params: Promise<{
        courseId: string
        lessonId: string
    }>
}

export default function LessonPage({ params }: PageProps) {
    const { courseId, lessonId } = use(params)
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    
    const [course, setCourse] = useState<Course | null>(null)
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
    const [nextLessonId, setNextLessonId] = useState<string | null>(null)
    const [prevLessonId, setPrevLessonId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (authLoading) return

            if (!user) {
                router.push(`/login?redirect=/courses/${courseId}/learn/${lessonId}`)
                return
            }

            try {
                const fetchedCourse = await LMSService.getCourseById(courseId)
                if (!fetchedCourse) {
                    setLoading(false)
                    return
                }
                setCourse(fetchedCourse)

                const userEnrollment = await LMSService.getEnrollment(user.uid, courseId)
                setEnrollment(userEnrollment)

                const allLessons = fetchedCourse.modules.flatMap((m: any) => m.lessons || [])
                const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId)

                if (currentIndex !== -1) {
                    setLesson(allLessons[currentIndex])
                    if (currentIndex < allLessons.length - 1) {
                        setNextLessonId(allLessons[currentIndex + 1].id)
                    }
                    if (currentIndex > 0) {
                        setPrevLessonId(allLessons[currentIndex - 1].id)
                    }
                }
            } catch (error) {
                console.error("Error fetching lesson data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user, authLoading, courseId, lessonId])

    if (loading || authLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        )
    }

    if (!course || !lesson) {
        notFound()
    }

    if (!enrollment && !lesson.isFree) {
        return (
            <div className="max-w-4xl mx-auto p-6 md:p-10 text-center space-y-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30">
                    <Lock className="h-10 w-10 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You must be enrolled in this course to view this lesson.</p>
                <Link href={`/courses/${courseId}`}>
                    <Button>Return to Course Page</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-32">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            <LessonUI lesson={lesson} courseId={courseId} />

            <div className="flex items-center justify-between pt-8 border-t mt-12">
                <div>
                    {prevLessonId && (
                        <Link href={`/courses/${course.id}/learn/${prevLessonId}`}>
                            <Button variant="outline">Previous Lesson</Button>
                        </Link>
                    )}
                </div>
                <div>
                    {nextLessonId ? (
                        <Link href={`/courses/${course.id}/learn/${nextLessonId}`}>
                            <Button className="gap-2">
                                Next Lesson <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href={`/courses/${course.id}`}>
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
