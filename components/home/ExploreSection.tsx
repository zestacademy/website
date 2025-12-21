import { Button } from "@/components/ui/button"
import { LayoutGrid, PenTool, Code2, Briefcase, Megaphone, Camera, BarChart3 } from "lucide-react"

export function ExploreSection() {
    return (
        <section className="container mx-auto py-8 px-4 border-b">
            <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                    <LayoutGrid className="mr-2 h-4 w-4" /> All Topics
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <PenTool className="mr-2 h-4 w-4" /> Design
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Code2 className="mr-2 h-4 w-4" /> Programming
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Briefcase className="mr-2 h-4 w-4" /> Business
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Megaphone className="mr-2 h-4 w-4" /> Marketing
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Camera className="mr-2 h-4 w-4" /> Photography
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <BarChart3 className="mr-2 h-4 w-4" /> Data Science
                </Button>
            </div>
        </section>
    )
}
