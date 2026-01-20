"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, Code, Briefcase, Coffee, ArrowRight, Rocket, Terminal } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaderboard } from "@/components/Leaderboard"

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
        id: "compiler",
        title: "Python Compiler",
        description: "Practice Python instantly with our fully working online compiler.",
        icon: Terminal,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: "web-playground",
        title: "Web Playground",
        description: "Build websites with HTML, CSS & JavaScript in real-time.",
        icon: Code,
        color: "text-cyan-500",
        bg: "bg-cyan-100 dark:bg-cyan-900/20"
    },
    {
        id: "sql-practice",
        title: "SQL Practice Lab",
        description: "Learn SQL queries with in-memory SQLite database.",
        icon: MessageSquare,
        color: "text-indigo-500",
        bg: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
        id: "c-compiler",
        title: "C Programming Compiler",
        description: "Compile and run C programs with GCC compiler online.",
        icon: Terminal,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-900/20"
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

                <div className="mt-16 border-t pt-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-3">🏆 Community Leaderboard</h2>
                        <p className="text-muted-foreground">See who's leading the charts in our learning paths.</p>
                    </div>

                    <Tabs defaultValue="iot" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="iot">Internet of Things</TabsTrigger>
                            <TabsTrigger value="python">Python Basics</TabsTrigger>
                        </TabsList>
                        <TabsContent value="iot" className="mt-6">
                            <Leaderboard courseId="internet-of-things" title="IoT Course" />
                        </TabsContent>
                        <TabsContent value="python" className="mt-6">
                            <Leaderboard courseId="python-basics" title="Python Basics" />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
