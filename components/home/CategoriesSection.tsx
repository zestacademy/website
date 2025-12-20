import { Badge } from "@/components/ui/badge"

const categories = [
    { name: "Web Development", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
    { name: "Data Science", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
    { name: "Mobile Apps", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" },
    { name: "Design", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100" },
    { name: "Marketing", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
    { name: "Cybersecurity", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
    { name: "Cloud Computing", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100" },
    { name: "AI & ML", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100" },
]

export function CategoriesSection() {
    return (
        <section className="container mx-auto py-12 px-4 bg-muted/30 round-xl my-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
                <p className="text-muted-foreground">Find the perfect course for your career path</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                    <Badge
                        key={cat.name}
                        variant="outline"
                        className={`px-4 py-2 text-sm cursor-pointer hover:opacity-80 transition-opacity border-none ${cat.color}`}
                    >
                        {cat.name}
                    </Badge>
                ))}
            </div>
        </section>
    )
}
