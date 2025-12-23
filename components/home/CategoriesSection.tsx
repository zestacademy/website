import { Code2, Database, Cpu, Globe, Cloud, Lock, Smartphone, GitBranch } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
    { name: "Data Structures & Algorithms", icon: Code2, count: "150+ Problems", color: "text-blue-600 dark:text-blue-400", badge: "Core" },
    { name: "System Design", icon: Cpu, count: "45 Patterns", color: "text-purple-600 dark:text-purple-400", badge: "Interview Focus" },
    { name: "Web Development", icon: Globe, count: "120 Topics", color: "text-green-600 dark:text-green-400" },
    { name: "Database Engineering", icon: Database, count: "65 Concepts", color: "text-indigo-600 dark:text-indigo-400" },
    { name: "DevOps & Cloud", icon: Cloud, count: "80 Skills", color: "text-sky-600 dark:text-sky-400", badge: "High Demand" },
    { name: "Security & Networking", icon: Lock, count: "50 Topics", color: "text-red-600 dark:text-red-400" },
    { name: "Mobile Development", icon: Smartphone, count: "70 Lessons", color: "text-orange-600 dark:text-orange-400" },
    { name: "Version Control & Git", icon: GitBranch, count: "40 Commands", color: "text-amber-600 dark:text-amber-400" },
]

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
