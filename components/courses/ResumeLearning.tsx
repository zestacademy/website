"use client"

import { Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUserEnrollments } from "@/lib/hooks/useUserEnrollments"
import { CourseCardSkeleton } from "@/components/ui/skeleton"
import { Tooltip } from "@/components/ui/tooltip"
import { LMSService } from "@/services/lms-service"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Course } from "@/types/lms"

export function ResumeLearning() {
    const { user, loading, enrollments } = useUserEnrollments()
    const router = useRouter()
    const [coursesMap, setCoursesMap] = useState<Record<string, Course>>({})
    const [loadingCourses, setLoadingCourses] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            if (enrollments.length === 0) return
            setLoadingCourses(true)
            const map: Record<string, Course> = {}
            for (const enc of enrollments) {
                if (!coursesMap[enc.courseId]) {
                    const c = await LMSService.getCourseById(enc.courseId)
                    if (c) map[enc.courseId] = c
                }
            }
            setCoursesMap(prev => ({ ...prev, ...map }))
            setLoadingCourses(false)
        }
        fetchCourses()
    }, [enrollments])

    if (loading || loadingCourses) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-4">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
            </div>
        )
    }

    if (!user || enrollments.length === 0) {
        return null
    }

    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-blue-500">▶</span>
                    <h2 className="text-xl font-bold">Resume Learning ({enrollments.length})</h2>
                </div>

                <div className="space-y-6">
                    {enrollments.map((enrollment) => {
                        const course = coursesMap[enrollment.courseId]
                        if (!course) return null

                        const percentComplete = Math.round((enrollment.completedDays?.length / enrollment.totalDays) * 100) || 0

                        return (
                            <div key={enrollment.courseId} className="bg-card border border-border/40 shadow-sm rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden relative shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-1">{course.title}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-1">{course.description}</p>
                                        </div>
                                        <Badge variant="outline" className="text-yellow-600 border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20">
                                            In Progress
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                                style={{ width: `${percentComplete}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>{percentComplete}% Completed</span>
                                            <span>{enrollment.completedDays?.length || 0}/{enrollment.totalDays || 1} {String(course.duration).toLowerCase().includes('weeks') ? 'Weeks' : 'Days'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button
                                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700"
                                            onClick={() => router.push(`/courses/${course.slug || course.id}/learn`)}
                                        >
                                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                        <Tooltip content="Share your progress">
                                            <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                                                <Share2 className="mr-2 h-4 w-4" /> Share
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
