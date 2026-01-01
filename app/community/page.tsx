"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, Code, Briefcase, Coffee, ArrowRight, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

const FORUMS = [
    {
        id: "general",
        title: "General Discussion",
        description: "Talk about anything related to tech, learning, or life.",
        icon: Coffee,
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
        id: "python-help",
        title: "Python Help",
        description: "Stuck on a Python problem? Ask for help here.",
        icon: Code,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: "projects",
        title: "Project Showcase",
        description: "Show off what you've built and get feedback.",
        icon: Rocket,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
        id: "career",
        title: "Career Advice",
        description: "Resumes, interviews, and job hunting tips.",
        icon: Briefcase,
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/20"
    }
]

export default function CommunityPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Community Forums</h1>
                    <p className="text-lg text-muted-foreground">Connect with other learners, ask questions, and share your journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FORUMS.map((forum) => (
                        <Card key={forum.id} className="hover:border-primary/50 transition-all cursor-pointer group" onClick={() => router.push(`/community/${forum.id}`)}>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${forum.bg}`}>
                                        <forum.icon className={`h-6 w-6 ${forum.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl mb-2 flex items-center justify-between">
                                            {forum.title}
                                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </CardTitle>
                                        <CardDescription className="text-md">
                                            {forum.description}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
