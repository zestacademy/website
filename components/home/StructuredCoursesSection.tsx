import { ArrowRight, Code2, Layers, Network, Database, Trophy, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const paths: any[] = []

export function CourseSection() {
    return (
        <section className="container mx-auto py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-semibold">Signature Feature</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-3">Structured Learning Courses</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Follow proven paths designed by engineers, for engineers. Each course takes you from fundamentals to interview readiness.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {paths.map((path, index) => (
                    <div key={index} className="flex flex-col gap-6 p-8 rounded-2xl bg-card border-2 border-muted hover:border-primary/40 hover:shadow-xl transition-all group">
                        <div className="flex items-start gap-6">
                            <div className={`p-4 rounded-xl h-fit ${path.color} group-hover:scale-105 transition-transform`}>
                                <path.icon className="h-8 w-8" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{path.title}</h3>
                                    <Badge className="bg-accent text-accent-foreground border-0 font-medium">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        {path.outcome}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{path.description}</p>

                                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-medium">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{path.weeks} weeks</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Code2 className="h-4 w-4" />
                                        <span>{path.topics} topics</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary">
                                        <Target className="h-4 w-4" />
                                        <span>{path.level}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent font-semibold group/btn">
                                        Start Learning Path
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                {/* Progress indicator */}
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out bg-gradient-to-r from-primary to-accent`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Button size="lg" variant="outline" className="font-semibold">
                    View All Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}
