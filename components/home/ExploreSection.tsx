import { Button } from "@/components/ui/button"
import { Code2, Database, Layers, Terminal, GitBranch, Cloud, Lock } from "lucide-react"

export function ExploreSection() {
    return (
        <section className="container mx-auto py-8 px-4 border-b">
            <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                    <Code2 className="mr-2 h-4 w-4" /> All Skills
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Database className="mr-2 h-4 w-4" /> DSA
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Layers className="mr-2 h-4 w-4" /> System Design
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Terminal className="mr-2 h-4 w-4" /> Backend
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <GitBranch className="mr-2 h-4 w-4" /> Frontend
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Cloud className="mr-2 h-4 w-4" /> DevOps
                </Button>
                <Button variant="outline" className="rounded-full px-6 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors">
                    <Lock className="mr-2 h-4 w-4" /> Security
                </Button>
            </div>
        </section>
    )
}
