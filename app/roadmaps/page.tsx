"use client"
import { useState, useEffect } from "react"
import { RoadmapHero } from "@/components/roadmaps/RoadmapHero"
import { ResumeLearning } from "@/components/roadmaps/ResumeLearning"
import { AllRoadmaps } from "@/components/roadmaps/AllRoadmaps"
import { FeatureSpotlight } from "@/components/ui/feature-spotlight"
import { useUserEnrollments } from "@/lib/hooks/useUserEnrollments"
import { Button } from "@/components/ui/button"

export default function RoadmapsPage() {
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
            <RoadmapHero />
            <ResumeLearning />
            <AllRoadmaps />

            {showSpotlight && (
                <FeatureSpotlight
                    title="Interactive Learning"
                    description="Click on any roadmap to track your progress and earn certificates."
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
