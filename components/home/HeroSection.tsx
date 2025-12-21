import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-900 to-blue-700 dark:from-slate-900 dark:to-slate-800 text-white overflow-hidden">
            {/* Abstract Overlay/Pattern can go here if needed, keeping it clean for now */}
            <div className="absolute inset-0 bg-blue-900/20 pattern-grid-lg opacity-10"></div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-3xl space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Unlock Your Potential
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
                        Discover thousands of high-quality courses from expert instructors. <br className="hidden sm:inline" />
                        Learn at your own pace, anywhere, anytime.
                    </p>

                    <div className="mx-auto mt-8 max-w-2xl relative">
                        <div className="relative flex items-center w-full shadow-2xl rounded-lg overflow-hidden bg-white">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="What do you want to learn?"
                                className="h-14 w-full border-0 bg-transparent pl-12 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 text-base"
                            />
                            <Button className="h-14 rounded-none px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-blue-200">
                        <span>Trending:</span>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["UI/UX Design", "Python", "Marketing", "Data Science"].map((topic) => (
                                <button key={topic} className="hover:text-white transition-colors underline decoration-blue-400/50 hover:decoration-white underline-offset-4">
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
