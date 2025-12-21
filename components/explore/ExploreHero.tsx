import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function ExploreHero() {
    return (
        <section className="py-16 md:py-24 bg-background dark:bg-[#0f1117] text-center border-b border-white/5">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                    Explore Your Next Skill
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                    Browse our extensive catalog of courses designed to take you further. From coding to design, find the path that fits you.
                </p>

                <div className="max-w-xl mx-auto relative flex items-center">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search for Python, SEO, UX..."
                            className="w-full pl-12 h-12 bg-muted/40 border-muted-foreground/20 focus-visible:ring-primary rounded-r-none border-r-0"
                        />
                    </div>
                    <Button className="h-12 rounded-l-none px-8 font-semibold">
                        Search
                    </Button>
                </div>
            </div>
        </section>
    )
}
