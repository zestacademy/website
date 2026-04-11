
"use client"

import { useEffect, useState } from "react"
import { LMSService } from "@/services/lms-service"
import { notFound } from "next/navigation"
import SidebarClient from "@/components/courses/SidebarClient"
import { Course } from "@/types/lms"
import { Loader2 } from "lucide-react"

export default function LearningLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ courseId: string }>
}) {
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            const { courseId } = await params
            const fetchedCourse = await LMSService.getCourseById(courseId)
            setCourse(fetchedCourse)
            setLoading(false)
        }
        fetchCourse()
    }, [params])

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        )
    }

    if (!course) {
        notFound()
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex w-80 flex-col border-r bg-card z-20">
                <SidebarClient course={course} />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Mobile Header could go here */}
                <div className="md:hidden p-4 border-b flex items-center justify-between">
                    <span className="font-bold truncate">{course.title}</span>
                </div>
                {children}
            </main>
        </div>
    )
}
