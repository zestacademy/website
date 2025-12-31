"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Code2 } from "lucide-react"
import Link from "next/link"

const QUOTES = [
    "Precision in Learning. Power in Execution",
    "From Fundamentals to Future-Ready",
    "Where Equations Meet Execution",
    "From Circuits to Cities — We Build What Matters",
    "Design the Impossible. Engineer the Inevitable"
]

export function HeroSection() {
    const [text, setText] = useState("")
    const [quoteIndex, setQuoteIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

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

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                        Master Engineering Fundamentals.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                            Ace Technical Interviews.
                        </span>
                    </h1>

                    <div className="mx-auto max-w-3xl h-20 flex items-center justify-center">
                        <p className="text-lg text-blue-100 sm:text-2xl font-medium leading-relaxed font-mono">
                            {text}
                            <span className="animate-pulse ml-1 inline-block bg-amber-400 w-2 h-6 align-middle"></span>
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl relative">
                        <div className="relative flex items-center w-full shadow-2xl rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search skills, topics, or interview questions..."
                                className="h-14 w-full border-0 bg-transparent pl-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 text-base"
                            />
                            <Button className="h-14 rounded-none px-8 text-base font-semibold bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] text-white transition-all">
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/roadmaps">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Start with a Roadmap
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 backdrop-blur-sm">
                                Explore Skills
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-blue-200">
                        <span>Popular Skills:</span>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Data Structures", "System Design", "DSA", "React", "Node.js", "SQL"].map((topic) => (
                                <button key={topic} className="hover:text-amber-400 transition-colors underline decoration-blue-400/50 hover:decoration-amber-400 underline-offset-4">
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
