"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Globe } from "lucide-react"



import { useEffect, useState } from "react"
import { getNews, NewsItem } from "@/app/community/actions"

export function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchNews() {
            try {
                const data = await getNews()
                if (data.length > 0) {
                    setNews(data)
                }
            } catch (error) {
                console.error("Failed to load news", error)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    if (loading) {
        return (
            <section className="py-8">
                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-80 bg-muted animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </section>
        )
    }

    if (news.length === 0) return null

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
                    <p className="text-muted-foreground">Tech & Education updates from India and the World.</p>
                </div>
                <Button variant="outline" className="hidden sm:flex" asChild>
                    <a href="#">View All News</a>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map((news) => (
                    <Card key={news.id} className="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden group border-muted/60">
                        <div className="h-40 w-full overflow-hidden relative">
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs border-0">
                                    {news.category}
                                </Badge>
                                {(news.region === "India") && (
                                    <Badge className="bg-orange-500 text-white border-0 text-xs">
                                        India
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                                <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {news.source}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {news.date}</span>
                            </div>
                            <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                <a href={news.url} className="hover:underline underline-offset-4">
                                    {news.title}
                                </a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex-grow">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {news.summary}
                            </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button variant="ghost" size="sm" className="w-full group/btn" asChild>
                                <a href={news.url}>
                                    Read Full Story
                                    <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
                <Button variant="outline" className="w-full" asChild>
                    <a href="#">View All News</a>
                </Button>
            </div>
        </section>
    )
}
