import { RoadmapHero } from "@/components/roadmaps/RoadmapHero"
import { ResumeLearning } from "@/components/roadmaps/ResumeLearning"
import { AllRoadmaps } from "@/components/roadmaps/AllRoadmaps"

export default function RoadmapsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <RoadmapHero />
            <ResumeLearning />
            <AllRoadmaps />
        </div>
    )
}
