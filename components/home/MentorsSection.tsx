import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mentors: any[] = []

export function MentorsSection() {
    return (
        <section className="container mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Top Mentors</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-8 md:gap-12">
                {mentors.map((mentor) => (
                    <div key={mentor.name} className="flex flex-col items-center group cursor-pointer">
                        <div className="relative p-1 rounded-full border-2 border-transparent group-hover:border-primary transition-all duration-300">
                            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-background shadow-lg group-hover:scale-105 transition-transform">
                                <AvatarImage src={mentor.image} alt={mentor.name} />
                                <AvatarFallback className="text-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-300">
                                    {mentor.initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="mt-4 font-bold text-lg group-hover:text-primary transition-colors">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.role}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
