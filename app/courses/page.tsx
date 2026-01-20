"use client"
import { useState, useEffect } from "react"
import { CourseHero } from "@/components/courses/CourseHero"
import { ResumeLearning } from "@/components/courses/ResumeLearning"
import { AllCourses } from "@/components/courses/AllCourses"
import { FeatureSpotlight } from "@/components/ui/feature-spotlight"
import { useUserEnrollments } from "@/lib/hooks/useUserEnrollments"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
    const [showSpotlight, setShowSpotlight] = useState(false)
    const { user, loading } = useUserEnrollments()

    useEffect(() => {
        if (user && !loading) {
            const timer = setTimeout(() => {
                setShowSpotlight(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [user, loading])

    return (
        <div className="flex flex-col min-h-screen">
            <CourseHero />
            <ResumeLearning />
            <AllCourses />

            {showSpotlight && (
                <FeatureSpotlight
                    title="Interactive Learning"
                    description="Click on any course to track your progress and earn certificates."
                    position="bottom"
                    onClose={() => setShowSpotlight(false)}
                >
                    <Button onClick={() => setShowSpotlight(false)}>
                        Got it!
                    </Button>
                </FeatureSpotlight>
            )}
        </div>
    )
}
