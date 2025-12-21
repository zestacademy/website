import { Code2, Palette, BarChart3, Megaphone, Monitor, Camera, Music, HeartPulse } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
    { name: "Development", icon: Code2, count: "120 Courses", color: "text-blue-500", badge: "Popular" },
    { name: "Design", icon: Palette, count: "85 Courses", color: "text-pink-500", badge: "New" },
    { name: "Business", icon: BarChart3, count: "50 Courses", color: "text-yellow-500" },
    { name: "Marketing", icon: Megaphone, count: "42 Courses", color: "text-red-500" },
    { name: "IT & Software", icon: Monitor, count: "92 Courses", color: "text-indigo-500" },
    { name: "Photography", icon: Camera, count: "36 Courses", color: "text-orange-500" },
    { name: "Music", icon: Music, count: "28 Courses", color: "text-cyan-500" },
    { name: "Health & Fitness", icon: HeartPulse, count: "55 Courses", color: "text-green-500" },
]

export function CategoriesSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Browse by Category</h2>
                    <p className="text-muted-foreground">Explore our top categories and find your passion</p>
                </div>
                <a href="#" className="hidden md:block text-sm font-medium text-blue-600 hover:underline">View all categories</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card key={cat.name} className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group border-muted bg-card">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-background shadow-sm ${cat.color}`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            {cat.badge && (
                                <Badge variant="secondary" className="text-xs font-normal">
                                    {cat.badge}
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">{cat.count}</p>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center md:hidden">
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View all categories</a>
            </div>
        </section>
    )
}
