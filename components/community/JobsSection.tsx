"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react"



import { useEffect, useState } from "react"
import { getJobs, JobItem } from "@/app/community/actions"

export function JobsSection() {
    const [jobs, setJobs] = useState<JobItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getJobs()
                if (data.length > 0) {
                    setJobs(data)
                }
            } catch (error) {
                console.error("Failed to load jobs", error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    if (loading) {
        return (
            <section className="py-8 border-t">
                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6"></div>
                <div className="flex flex-col gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 bg-muted animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </section>
        )
    }

    if (jobs.length === 0) return null

    return (
        <section className="py-8 border-t">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Job Search</h2>
                    <p className="text-muted-foreground">Explore the latest job openings in India.</p>
                </div>
                <Button variant="outline" className="hidden sm:flex" asChild>
                    <a href="#">See All Jobs</a>
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <Card key={job.id} className="group hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Building2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                                            {job.company}
                                            <CheckCircle2 className="h-3 w-3 text-blue-500" />
                                        </p>
                                    </div>
                                </div>
                                <Badge variant={job.mode === "Remote" ? "secondary" : "outline"}>
                                    {job.mode}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.tags.map((tag) => (
                                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md font-medium text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed">
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="h-3 w-3" /> {job.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {job.posted}
                                    </span>
                                </div>
                                <Button size="sm" asChild>
                                    <a href={job.applyLink}>Apply Now</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
                <Button variant="outline" className="w-full" asChild>
                    <a href="#">See All Jobs</a>
                </Button>
            </div>
        </section>
    )
}
