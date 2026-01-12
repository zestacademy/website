import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"

const roadmaps = [
    {
        title: "Python Basics",
        description: "Complete 20-day Python journey from basics to advanced. Build real projects and master Python fundamentals.",
        level: "Beginner",
        levelColor: "bg-green-500",
        duration: "20 Days",
        courses: 20,
        color: "from-yellow-500/20 to-blue-500/5",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop",
        link: "/roadmaps/python-basics"
    },
    {
        title: "Internet of Things",
        description: "Master IoT from sensor networks to cloud computing. Learn Arduino, Raspberry Pi, and build smart systems for real-world applications.",
        level: "Intermediate",
        levelColor: "bg-yellow-500",
        duration: "8 Weeks",
        courses: 39,
        color: "from-purple-500/20 to-teal-500/5",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        link: "/roadmaps/internet-of-things"
    }
]

export function AllRoadmaps() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold">Explore Roadmaps</h2>
                    <Button variant="link" className="text-blue-500">View All Paths</Button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">All Paths</Button>
                    <Button variant="outline" className="rounded-full">Web Development</Button>
                    <Button variant="outline" className="rounded-full">Data Science</Button>
                    <Button variant="outline" className="rounded-full">Cybersecurity</Button>
                    <Button variant="outline" className="rounded-full">Mobile Dev</Button>
                    <Button variant="outline" className="rounded-full">Design</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roadmaps.map((map, idx) => {
                        const CardContent = (
                            <>
                                <div className="h-40 relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${map.color} opacity-60 z-10 transition-opacity group-hover:opacity-80`} />
                                    <img src={map.image} alt={map.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <Badge className={`absolute top-4 left-4 z-20 text-white border-0 ${map.level === 'Beginner' ? 'bg-green-500' : map.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                        {map.level}
                                    </Badge>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{map.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">{map.description}</p>
                                    </div>

                                    {/* Progress dots or visual element */}
                                    <div className="flex gap-1 h-1.5 w-full">
                                        <div className="flex-1 bg-blue-600 rounded-full" />
                                        <div className="flex-1 bg-blue-600/50 rounded-full" />
                                        <div className="flex-1 bg-muted rounded-full" />
                                        <div className="flex-1 bg-muted rounded-full" />
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{map.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            <span>{map.courses} {map.duration.includes("Days") ? "Days" : map.duration.includes("Weeks") ? "Lectures" : "Courses"}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );

                        return map.link ? (
                            <Link key={idx} href={map.link} className="bg-card rounded-xl overflow-hidden border border-border group hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                                {CardContent}
                            </Link>
                        ) : (
                            <div key={idx} className="bg-card rounded-xl overflow-hidden border border-border group hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                                {CardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
