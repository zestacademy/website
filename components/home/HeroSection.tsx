import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900 text-white">
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        Master New Skills with <br className="hidden sm:inline" />
                        <span className="text-yellow-300">Industry Experts</span>
                    </h1>
                    <p className="max-w-[600px] text-lg text-blue-100 sm:text-xl md:text-2xl">
                        Unlock your potential with our curated courses. Learn, practice, and grow your career today.
                    </p>
                    <div className="relative w-full max-w-lg mt-4">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="What do you want to learn?"
                            className="h-12 w-full rounded-full bg-white pl-12 text-black shadow-lg focus-visible:ring-blue-300"
                        />
                        <Button className="absolute right-1 top-1 h-10 rounded-full bg-blue-600 px-6 hover:bg-blue-700">
                            Search
                        </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-blue-100">
                        <span>Popular:</span>
                        <div className="flex gap-2">
                            {["React", "Python", "Design", "AI"].map((tag) => (
                                <span key={tag} className="rounded-full bg-white/20 px-3 py-1 hover:bg-white/30 cursor-pointer backdrop-blur-sm transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </section>
    )
}
