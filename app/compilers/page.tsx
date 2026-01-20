"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, Code, Terminal, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const COMPILERS = [
    {
        id: "python",
        title: "Python Compiler",
        description: "Practice Python instantly with our fully working online compiler.",
        icon: Terminal,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: "web",
        title: "Web Playground",
        description: "Build websites with HTML, CSS & JavaScript in real-time.",
        icon: Code,
        color: "text-cyan-500",
        bg: "bg-cyan-100 dark:bg-cyan-900/20"
    },
    {
        id: "sql",
        title: "SQL Practice Lab",
        description: "Learn SQL queries with in-memory SQLite database.",
        icon: MessageSquare,
        color: "text-indigo-500",
        bg: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
        id: "c",
        title: "C Programming Compiler",
        description: "Compile and run C programs with GCC compiler online.",
        icon: Terminal,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-900/20"
    }
]

export default function CompilersPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Online Compilers & Playgrounds</h1>
                    <p className="text-lg text-muted-foreground">Practice coding instantly in your browser with our built-in tools.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COMPILERS.map((compiler) => (
                        <Card key={compiler.id} className="hover:border-primary/50 transition-all cursor-pointer group" onClick={() => router.push(`/compilers/${compiler.id}`)}>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${compiler.bg}`}>
                                        <compiler.icon className={`h-6 w-6 ${compiler.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl mb-2 flex items-center justify-between">
                                            {compiler.title}
                                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </CardTitle>
                                        <CardDescription className="text-md">
                                            {compiler.description}
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
