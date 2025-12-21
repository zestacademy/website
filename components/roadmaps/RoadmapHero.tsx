import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function RoadmapHero() {
    return (
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-700 to-blue-900 text-white overflow-hidden text-center">
            {/* Background Mesh/Gradient */}
            <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />

            <div className="container mx-auto px-4 z-10 relative">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Chart Your Career Course
                </h1>
                <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                    Don't just learn random skills. Follow our curated, step-by-step roadmaps
                    designed by industry experts to take you from beginner to professional efficiently.
                </p>

                <div className="max-w-xl mx-auto relative flex items-center">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Find your path (e.g. Python, Design, DevOps)"
                            className="w-full pl-12 h-12 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-300 rounded-r-none border-0 shadow-lg"
                        />
                    </div>
                    <Button className="h-12 rounded-l-none px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-0 shadow-lg">
                        Search
                    </Button>
                </div>
            </div>
        </section>
    )
}
