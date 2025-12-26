import { Monitor, PenTool, TrendingUp, Megaphone, Camera, Music, Heart, Star, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const categories: any[] = []

export function CategoryGrid() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold">Browse by Category</h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button variant="default" className="rounded-full bg-blue-600 hover:bg-blue-700">All</Button>
                        <Button variant="outline" className="rounded-full">Development</Button>
                        <Button variant="outline" className="rounded-full">Design</Button>
                        <Button variant="outline" className="rounded-full">Business</Button>
                        <Button variant="outline" className="rounded-full">Marketing</Button>
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
                                    {cat.courses} Courses
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
