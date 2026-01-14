import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Brain, CircuitBoard, Network, Zap, Cpu, Layers } from "lucide-react"

export function FeaturedArticles() {
    return (
        <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Featured Articles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/articles/what-is-api" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-blue-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/20 dark:to-blue-950/20 rounded-t-xl flex items-center justify-center">
                                <Network className="h-16 w-16 text-purple-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                        Web Development
                                    </span>
                                    <span className="text-xs text-muted-foreground">10 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-blue-600 transition-colors">
                                    What Is an API?
                                </CardTitle>
                                <CardDescription>
                                    Learn how APIs enable seamless communication between software applications and power modern digital experiences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/placement-interview-questions" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-blue-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-blue-100 dark:bg-blue-950/20 rounded-t-xl flex items-center justify-center">
                                <BookOpen className="h-16 w-16 text-blue-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                        Interview Prep
                                    </span>
                                    <span className="text-xs text-muted-foreground">15 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-blue-600 transition-colors">
                                    Master Your Placement Interview
                                </CardTitle>
                                <CardDescription>
                                    Top 50 common interview questions and expert answers to help you ace your next job interview.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/comprehensive-guide-to-ai" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-blue-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-blue-100 dark:bg-blue-950/20 rounded-t-xl flex items-center justify-center">
                                <Brain className="h-16 w-16 text-blue-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                        Artificial Intelligence
                                    </span>
                                    <span className="text-xs text-muted-foreground">20 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-blue-600 transition-colors">
                                    Comprehensive Guide to AI
                                </CardTitle>
                                <CardDescription>
                                    Explore the complete journey of AI—from basic concepts to cutting-edge applications.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/ai-tools-guide" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-purple-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-purple-100 dark:bg-purple-950/20 rounded-t-xl flex items-center justify-center">
                                <Zap className="h-16 w-16 text-purple-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                        Productivity
                                    </span>
                                    <span className="text-xs text-muted-foreground">25 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-purple-600 transition-colors">
                                    The Ultimate Guide to AI Tools
                                </CardTitle>
                                <CardDescription>
                                    Supercharge your workflow with 84 powerful AI tools across 8 essential categories.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/resistor-guide" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-orange-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-orange-100 dark:bg-orange-950/20 rounded-t-xl flex items-center justify-center">
                                <CircuitBoard className="h-16 w-16 text-orange-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                                        Electronics
                                    </span>
                                    <span className="text-xs text-muted-foreground">20 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-orange-600 transition-colors">
                                    Complete Guide to Resistors
                                </CardTitle>
                                <CardDescription>
                                    Master resistors from basic principles to advanced applications in modern circuit design.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/digital-electronics-interview-questions" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-cyan-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-cyan-100 dark:bg-cyan-950/20 rounded-t-xl flex items-center justify-center">
                                <Cpu className="h-16 w-16 text-cyan-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                                        Interview Prep
                                    </span>
                                    <span className="text-xs text-muted-foreground">30 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-cyan-600 transition-colors">
                                    Digital Electronics Interview Questions
                                </CardTitle>
                                <CardDescription>
                                    Prepare with 254 digital electronics questions, answers, and circuit diagrams covering logic gates and more.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/articles/electronics-to-embedded-mastery" className="group">
                        <Card className="h-full transition-all hover:shadow-lg hover:border-indigo-500/50 cursor-pointer">
                            <div className="h-48 w-full bg-indigo-100 dark:bg-indigo-950/20 rounded-t-xl flex items-center justify-center">
                                <Layers className="h-16 w-16 text-indigo-500 opacity-50" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                        Embedded Systems
                                    </span>
                                    <span className="text-xs text-muted-foreground">25 min read</span>
                                </div>
                                <CardTitle className="group-hover:text-indigo-600 transition-colors">
                                    From Electronics to Embedded Mastery
                                </CardTitle>
                                <CardDescription>
                                    A comprehensive skill stack for modern engineers—from foundational theory to embedded systems expertise.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </section>
    )
}
