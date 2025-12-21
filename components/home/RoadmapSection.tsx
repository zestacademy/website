import { ArrowRight, Layout, TrendingUp, ShieldCheck, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const paths = [
    {
        title: "Full Stack Developer",
        description: "Master Frontend, Backend, and Database technologies to build complete web apps.",
        courses: 8,
        hours: 48,
        icon: Layout,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
        popularity: "High"
    },
    {
        title: "Digital Marketing Expert",
        description: "Learn SEO, Social Media, and Email Marketing strategies to grow any business.",
        courses: 5,
        hours: 24,
        icon: TrendingUp,
        color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
        popularity: "Medium"
    },
    {
        title: "Cybersecurity Specialist",
        description: "Protect systems and networks from digital attacks. Learn ethical hacking.",
        courses: 6,
        hours: 32,
        icon: ShieldCheck,
        color: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
        popularity: "High"
    },
    {
        title: "Data Scientist",
        description: "Analyze complex data, build ML models, and drive business decisions.",
        courses: 7,
        hours: 56,
        icon: Database,
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
        popularity: "High"
    },
]

export function RoadmapSection() {
    return (
        <section className="container mx-auto py-16 px-4 bg-muted/20">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-600 rounded-lg">
                    <Layout className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Curated Learning Paths</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paths.map((path, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-card border hover:shadow-lg transition-all group">
                        <div className={`p-4 rounded-xl h-fit ${path.color}`}>
                            <path.icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{path.title}</h3>
                                <Badge variant="secondary" className="font-normal">{path.courses} Courses</Badge>
                            </div>
                            <p className="text-muted-foreground">{path.description}</p>

                            <div className="pt-2 flex items-center justify-between text-sm">
                                <span className="font-medium text-muted-foreground">{path.hours} Hours</span>
                                <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent font-medium group-hover:underline">                                    View Path <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>

                            {/* Progress bar simulation or decorative line */}
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2">
                                <div className={`h-full rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out bg-primary/80`}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
