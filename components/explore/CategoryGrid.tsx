import { Cpu, Terminal, Sparkles, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const categories = [
    {
        title: "Electronics & Embedded",
        description: "Master resistors, digital electronics, and embedded systems prototyping.",
        articlesCount: 3,
        icon: Cpu,
        color: "bg-blue-600",
        tag: "Core Engineering",
        tagColor: "text-blue-400"
    },
    {
        title: "Emerging Tech & AI",
        description: "Explore AI tools, quantum computing, and future tech landscapes.",
        articlesCount: 3,
        icon: Sparkles,
        color: "bg-pink-600",
        tag: "Latest Insights",
        tagColor: "text-pink-400"
    },
    {
        title: "Interview & Placement Prep",
        description: "Prepare with extensive question banks and placement-oriented guides.",
        articlesCount: 2,
        icon: Terminal,
        color: "bg-amber-600",
        tag: "Career Ready",
        tagColor: "text-amber-400"
    },
    {
        title: "Professional Growth",
        description: "Dive into entrepreneurship, microhabits, and modern APIs.",
        articlesCount: 3,
        icon: Briefcase,
        color: "bg-purple-600",
        tag: "Success Mindset",
        tagColor: "text-purple-400"
    }
]

export function CategoryGrid() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold">Browse by Category</h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button variant="default" className="rounded-full bg-blue-600 hover:bg-blue-700">All</Button>
                        <Button variant="outline" className="rounded-full">Electronics</Button>
                        <Button variant="outline" className="rounded-full">Emerging Tech</Button>
                        <Button variant="outline" className="rounded-full">Career Prep</Button>
                        <Button variant="outline" className="rounded-full">Growth</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="group relative p-6 bg-card rounded-xl border border-border hover:border-blue-500/50 transition-all hover:shadow-lg cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${cat.color} bg-opacity-10 text-white`}>
                                    <div className={`p-2 rounded-md ${cat.color}`}>
                                        <cat.icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                    {cat.articlesCount} Articles
                                </Badge>
                            </div>

                            <h3 className="text-lg font-bold mb-1 group-hover:text-blue-500 transition-colors">{cat.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>

                            <div className="flex items-center gap-2 text-xs font-medium">
                                <span className={`h-1.5 w-1.5 rounded-full ${cat.tagColor.replace('text-', 'bg-')}`}></span>
                                <span className={cat.tagColor}>{cat.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
