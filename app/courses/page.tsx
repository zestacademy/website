"use client"

import { CourseHero } from "@/components/courses/CourseHero"
import { ResumeLearning } from "@/components/courses/ResumeLearning"
import { AllCourses } from "@/components/courses/AllCourses"

export default function CoursesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <CourseHero />
            <ResumeLearning />
            <AllCourses />
        </div>
    )
}
