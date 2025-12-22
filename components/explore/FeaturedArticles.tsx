import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"

export function FeaturedArticles() {
    return (
        <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Featured Articles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>
            </div>
        </section>
    )
}
