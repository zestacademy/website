"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Code2 } from "lucide-react"
import Link from "next/link"
import { InstantSearch } from "@/components/ui/instant-search"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const QUOTES = [
    "Precision in Learning. Power in Execution",
    "From Fundamentals to Future-Ready",
    "Where Equations Meet Execution",
    "From Circuits to Cities — We Build What Matters",
    "Design the Impossible. Engineer the Inevitable"
]

const QUOTE_COLORS = [
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-green-500",
    "from-purple-400 to-pink-500",
    "from-rose-400 to-red-500"
]

export function HeroSection() {
    const [text, setText] = useState("")
    const [quoteIndex, setQuoteIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        // Dynamic import to avoid SSR issues
        import("@/lib/firebase").then(({ auth }) => {
            if (!auth) return
            const unsubscribe = auth.onAuthStateChanged((u) => {
                setUser(u)
            })
            return () => unsubscribe()
        })
    }, [])

    useEffect(() => {
        const currentQuote = QUOTES[quoteIndex]

        if (isTyping) {
            if (text.length < currentQuote.length) {
                const timeout = setTimeout(() => {
                    setText(currentQuote.slice(0, text.length + 1))
                }, 50) // Typing speed
                return () => clearTimeout(timeout)
            } else {
                // Finished typing, wait for 10 seconds (minus typing time approx, but simpler to just wait)
                const timeout = setTimeout(() => {
                    setIsTyping(false)
                }, 10000)
                return () => clearTimeout(timeout)
            }
        } else {
            // Deleting (or just switching? "stays for 10 seconds" implies static. 
            // I'll effectively clear it instantly or delete quickly to switch?
            // User just said "stays for 10 seconds". Usually typewriter implies deleting too.
            // I will implement a quick delete or just a fade out/in effect? 
            // "Typewriter animation" usually means typing and deleting.
            // Let's delete faster.
            if (text.length > 0) {
                const timeout = setTimeout(() => {
                    setText(text.slice(0, -1))
                }, 30) // Delete speed
                return () => clearTimeout(timeout)
            } else {
                setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
                setIsTyping(true)
            }
        }
    }, [text, isTyping, quoteIndex])

    return (
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-white overflow-hidden">
            {/* Engineering grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `
                    linear-gradient(to right, white 1px, transparent 1px),
                    linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Circuit-like decorative elements */}
            <div className="absolute top-20 right-10 w-32 h-32 border-2 border-white/10 rounded-lg rotate-12 hidden lg:block"></div>
            <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-white/10 rounded-full hidden lg:block"></div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Engineering Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <Code2 className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium">For Engineering Learners</span>
                    </div>

                    <div className="min-h-[10rem] sm:min-h-[8rem] lg:min-h-[10rem] flex items-center justify-center py-2">
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r ${QUOTE_COLORS[quoteIndex]}`}>
                            {text}
                            <span className="animate-pulse ml-1 inline-block bg-white w-1.5 h-8 md:w-2 md:h-12 lg:h-16 align-middle"></span>
                        </h1>
                    </div>

                    <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl leading-relaxed">
                        Structured learning paths for engineering students and professionals. <br className="hidden sm:inline" />
                        Build core skills, solve real problems, and prepare for interviews with confidence.
                    </p>

                    <div className="mx-auto mt-8 max-w-2xl relative">
                        <InstantSearch
                            placeholder="Search skills, topics, or interviews..."
                            onSearch={async (query) => {
                                await new Promise(resolve => setTimeout(resolve, 300))
                                const items = [
                                    { id: '/courses/python-basics', title: 'Python Basics', description: 'Master Python programming', category: 'Course' },
                                    { id: '/courses/internet-of-things', title: 'Internet of Things', description: 'Learn IoT & Embedded Systems', category: 'Course' },
                                    { id: '/explore', title: 'Explore Skills', description: 'Browse all available skills', category: 'Page' },
                                ]
                                return items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()))
                            }}
                            onSelect={(result) => window.location.href = result.id}
                            className="w-full text-foreground"
                        />
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        {!user ? (
                            <>
                                <Link href="/register">
                                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
                                        <TrendingUp className="mr-2 h-5 w-5" />
                                        Sign Up (Pro)
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 backdrop-blur-sm">
                                        Login
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href="/my-learning">
                                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 mt-10">
                        <div className="text-center">
                            <p className="text-3xl font-bold"><AnimatedCounter value={5000} />+</p>
                            <p className="text-sm text-blue-200">Learners</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold"><AnimatedCounter value={42} /></p>
                            <p className="text-sm text-blue-200">Courses</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold"><AnimatedCounter value={150} />+</p>
                            <p className="text-sm text-blue-200">Projects</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold"><AnimatedCounter value={98} />%</p>
                            <p className="text-sm text-blue-200">Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
