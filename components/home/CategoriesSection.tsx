import { Code2, Database, Cpu, Globe, Cloud, Lock, Smartphone, GitBranch } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories: any[] = []

export function CategoriesSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Engineering Domains</h2>
                    <p className="text-muted-foreground">Master core computer science and engineering fundamentals</p>
                </div>
                <a href="#" className="hidden md:block text-sm font-medium text-primary hover:underline">View all domains</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card key={cat.name} className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group border-muted bg-card hover:border-primary/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-muted shadow-sm ${cat.color} group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            {cat.badge && (
                                <Badge variant="secondary" className="text-xs font-normal bg-accent/10 text-accent-foreground border-accent/20">
                                    {cat.badge}
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors leading-snug">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">{cat.count}</p>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center md:hidden">
                <a href="#" className="text-sm font-medium text-primary hover:underline">View all domains</a>
            </div>
        </section>
    )
}
