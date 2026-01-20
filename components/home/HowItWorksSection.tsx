import { Map, BookOpen, Code, Briefcase, CheckCircle } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Choose a Course",
        description: "Select a structured learning path tailored to your engineering goals and skill level.",
        icon: Map,
        color: "text-blue-600 dark:text-blue-400"
    },
    {
        number: "02",
        title: "Learn Structured Topics",
        description: "Follow a carefully sequenced curriculum covering theory, concepts, and best practices.",
        icon: BookOpen,
        color: "text-purple-600 dark:text-purple-400"
    },
    {
        number: "03",
        title: "Practice & Test Knowledge",
        description: "Solve problems, write code, and validate your understanding with hands-on exercises.",
        icon: Code,
        color: "text-green-600 dark:text-green-400"
    },
    {
        number: "04",
        title: "Prepare for Interviews",
        description: "Master common interview patterns and build confidence for technical discussions.",
        icon: Briefcase,
        color: "text-amber-600 dark:text-amber-400"
    },
]

export function HowItWorksSection() {
    return (
        <section className="container mx-auto py-20 px-4 bg-background">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight mb-3">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A proven, structured approach to mastering engineering fundamentals
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connecting line - hidden on mobile, shown on larger screens */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-muted"></div>
                            )}

                            <div className="relative flex flex-col items-center text-center space-y-4">
                                {/* Icon container */}
                                <div className={`relative p-6 rounded-2xl bg-muted/50 ${step.color} group-hover:scale-110 transition-transform`}>
                                    <step.icon className="h-10 w-10" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                                        {step.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Trusted by thousands of engineering students and professionals</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
