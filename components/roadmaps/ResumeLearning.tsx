import { Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ResumeLearning() {
    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-blue-500">▶</span>
                    <h2 className="text-xl font-bold">Resume Learning</h2>
                </div>

                <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop"
                            alt="Coding"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 w-full space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">Full Stack Web Development</h3>
                                <p className="text-muted-foreground text-sm">Module 4: React Advanced Patterns</p>
                            </div>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-500/20 bg-yellow-500/10">In Progress</Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-[35%] bg-blue-600 rounded-full" />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>35% Completed</span>
                                <span>Est. 12 hours remaining</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700">
                                Continue <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
