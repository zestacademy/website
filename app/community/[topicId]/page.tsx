"use client"

import { useParams } from "next/navigation"
import { CommentsSection } from "@/components/comments-section"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TopicPage() {
    const params = useParams()
    const router = useRouter()
    const topicId = params?.topicId as string

    // Helper map for better titles (optional)
    const getTopicTitle = (id: string) => {
        if (!id) return "Discussion"
        if (id === "python-help") return "Python Help"
        if (id === "projects") return "Project Showcase"
        if (id === "career") return "Career Advice"
        if (id === "general") return "General Discussion"

        return id.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forums
                </Button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{getTopicTitle(topicId)}</h1>
                    <p className="text-muted-foreground">Join the conversation.</p>
                </div>

                <div className="bg-card rounded-xl border p-2">
                    <CommentsSection courseId={`forum-${topicId}`} />
                </div>
            </div>
        </div>
    )
}
