import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FileQuestion, Home, Compass } from "lucide-react"

export default function NotFound() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24 text-center relative overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="space-y-8 relative z-10 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-5">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20 rounded-full" />
                    <FileQuestion className="h-32 w-32 text-accent relative z-10 mx-auto" strokeWidth={1.5} />
                </div>

                <div className="space-y-4 max-w-lg mx-auto px-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Oops! The page you're looking for seems to have vanished into the digital void. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Button asChild size="lg" className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Return Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 border-2 hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all hover:scale-105">
                        <Link href="/explore">
                            <Compass className="h-4 w-4" />
                            Explore Articles
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
