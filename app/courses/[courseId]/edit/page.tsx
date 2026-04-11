"use client"

import React from "react"
import CourseEditor from "@/components/courses/CourseEditor"

interface PageProps {
    params: Promise<{ courseId: string }>
}

export default function CourseEditPage({ params }: PageProps) {
    const resolvedParams = React.use(params)
    return <CourseEditor courseId={resolvedParams.courseId} />
}
