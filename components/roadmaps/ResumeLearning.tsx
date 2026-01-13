"use client"

import { Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUserEnrollments } from "@/lib/hooks/useUserEnrollments"
import { getRoadmapById } from "@/lib/roadmaps"
import { useRouter } from "next/navigation"

export function ResumeLearning() {
    const { user, loading, enrollments } = useUserEnrollments()
    const router = useRouter()

    if (loading) {
        return <div className="py-8 text-center">Loading progress...</div>
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
                        const roadmap = getRoadmapById(enrollment.roadmapId)
                        if (!roadmap) return null

                        const percentComplete = Math.round((enrollment.completedDays.length / enrollment.totalDays) * 100) || 0

                        return (
                            <div key={enrollment.roadmapId} className="bg-card border border-border/40 shadow-sm rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden relative shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={roadmap.image}
                                        alt={roadmap.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-1">{roadmap.title}</h3>
                                            <p className="text-muted-foreground text-sm">{roadmap.description}</p>
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
                                            <span>{enrollment.completedDays.length}/{enrollment.totalDays} {roadmap.duration.toLowerCase().includes('weeks') ? 'Weeks' : 'Days'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button
                                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700"
                                            onClick={() => router.push(roadmap.link)}
                                        >
                                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                                            <Share2 className="mr-2 h-4 w-4" /> Share
                                        </Button>
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
