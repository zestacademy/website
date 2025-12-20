import { CheckCircle2, Circle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
    {
        id: 1,
        title: "Foundations",
        description: "Learn the basics of HTML, CSS, and JavaScript. Build simple static websites.",
        status: "completed",
        color: "bg-green-500",
    },
    {
        id: 2,
        title: "Frontend Mastery",
        description: "Master React, Tailwind CSS, and Next.js. Create dynamic, responsive applications.",
        status: "current",
        color: "bg-blue-600",
    },
    {
        id: 3,
        title: "Backend Integration",
        description: "Connect to databases, handle authentication, and build robust APIs with Node.js.",
        status: "upcoming",
        color: "bg-yellow-500",
    },
    {
        id: 4,
        title: "Career Ready",
        description: "Build a portfolio, contribute to open source, and prepare for technical interviews.",
        status: "upcoming",
        color: "bg-red-500",
    },
]

export function RoadmapSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Your Learning Journey</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Follow our proven step-by-step roadmap to go from beginner to professional developer.
                </p>
            </div>

            <div className="relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-muted -z-10" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative flex flex-col items-center text-center md:text-left md:items-start group">
                            {/* Connector Line (Mobile) */}
                            {index !== steps.length - 1 && (
                                <div className="md:hidden absolute top-8 left-1/2 w-1 h-full bg-muted -translate-x-1/2 -z-10" />
                            )}

                            <div className={`
                flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-background shadow-sm mb-4 bg-background z-10
                ${step.status === 'completed' ? 'text-green-500' : ''}
                ${step.status === 'current' ? 'text-blue-600 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-background' : 'text-muted-foreground'}
              `}>
                                {step.status === 'completed' ? (
                                    <CheckCircle2 className="w-6 h-6 fill-green-100 dark:fill-green-900" />
                                ) : (
                                    <Circle className="w-6 h-6 fill-current" />
                                )}
                            </div>

                            <div className="bg-card border rounded-xl p-6 w-full shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${step.color}`} />
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {step.description}
                                </p>
                                <div className="flex justify-between items-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    <span>Step 0{step.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20">
                        Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
