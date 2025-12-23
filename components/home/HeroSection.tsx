import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Code2 } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-white overflow-hidden">
            {/* Engineering grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `
                    linear-gradient(to right, white 1px, transparent 1px),
                    linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>
            
            {/* Circuit-like decorative elements */}
            <div className="absolute top-20 right-10 w-32 h-32 border-2 border-white/10 rounded-lg rotate-12 hidden lg:block"></div>
            <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-white/10 rounded-full hidden lg:block"></div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Engineering Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <Code2 className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium">For Engineering Learners</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                        Master Engineering Fundamentals.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                            Ace Technical Interviews.
                        </span>
                    </h1>
                    
                    <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl leading-relaxed">
                        Structured learning paths for engineering students and professionals. <br className="hidden sm:inline" />
                        Build core skills, solve real problems, and prepare for interviews with confidence.
                    </p>

                    <div className="mx-auto mt-8 max-w-2xl relative">
                        <div className="relative flex items-center w-full shadow-2xl rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search skills, topics, or interview questions..."
                                className="h-14 w-full border-0 bg-transparent pl-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 text-base"
                            />
                            <Button className="h-14 rounded-none px-8 text-base font-semibold bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] text-white transition-all">
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/roadmaps">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Start with a Roadmap
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 backdrop-blur-sm">
                                Explore Skills
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-blue-200">
                        <span>Popular Skills:</span>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Data Structures", "System Design", "DSA", "React", "Node.js", "SQL"].map((topic) => (
                                <button key={topic} className="hover:text-amber-400 transition-colors underline decoration-blue-400/50 hover:decoration-amber-400 underline-offset-4">
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
