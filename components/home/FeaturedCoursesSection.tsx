"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"


interface BaseItem {
    id: string
    title: string
    description: string
    imageGradient: string
    slug: string
    type: 'course' | 'article' | 'tool'
}

interface CourseItem extends BaseItem {
    type: 'course'
    level: "Beginner" | "Intermediate" | "Advanced"
}

interface ArticleItem extends BaseItem {
    type: 'article'
    readTime: string
    category: string
}

interface ToolItem extends BaseItem {
    type: 'tool'
    category: string
    buttonText: string
}

type FeaturedItem = CourseItem | ArticleItem | ToolItem

const FEATURED_ITEMS: FeaturedItem[] = [
    {
        id: "zestcompilers",
        type: "tool",
        title: "Zest Compilers",
        description: "Run code instantly in your browser. Support for multiple languages.",
        category: "Developer Tool",
        buttonText: "Open Compiler",
        imageGradient: "from-slate-800 to-gray-700",
        slug: "https://compilers.zestacademy.tech"
    },
    {
        id: "python-basics",
        type: "course",
        title: "Python Basics",
        description: "Complete 20-day Python journey from basics to advanced. Build real projects.",
        level: "Beginner",
        imageGradient: "from-yellow-500 to-blue-500",
        slug: "/courses/python-basics"
    },
    {
        id: "zestfolio",
        type: "tool",
        title: "ZestFolio",
        description: "Build your professional portfolio in minutes with zero coding knowledge required.",
        category: "Portfolio Builder",
        buttonText: "Create Portfolio",
        imageGradient: "from-indigo-600 to-pink-500",
        slug: "https://zestfolio.zestacademy.tech"
    },
    {
        id: "internet-of-things",
        type: "course",
        title: "Internet of Things",
        description: "Master IoT from sensor networks to cloud computing.",
        level: "Intermediate",
        imageGradient: "from-purple-600 to-teal-500",
        slug: "/courses/internet-of-things"
    },
    {
        id: "resistor-guide",
        type: "article",
        title: "Resistor Guide",
        description: "Master resistors from basic principles to advanced applications.",
        readTime: "20 min",
        category: "Electronics",
        imageGradient: "from-orange-500 to-red-600",
        slug: "/articles/resistor-guide"
    },
    {
        id: "digital-electronics-interview-questions",
        type: "article",
        title: "Digital Electronics",
        description: "Prepare with 254 digital electronics interview questions.",
        readTime: "30 min",
        category: "Interview Prep",
        imageGradient: "from-cyan-500 to-blue-600",
        slug: "/articles/digital-electronics-interview-questions"
    }
]

export function FeaturedCoursesSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const startX = useRef(0)
    const scrollLeft = useRef(0)
    const isDown = useRef(false)
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null)
    const isHovering = useRef(false)

    const isProgrammaticScroll = useRef(false)

    // Scroll to a specific index with deterministic math
    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current

            // Constants based on current CSS
            const isDesktop = window.innerWidth >= 768
            const gap = 16
            const smallWidth = isDesktop ? 260 : 200
            const largeWidth = isDesktop ? 700 : window.innerWidth * 0.90

            // Formula: Center(index) = PaddingLeft + PrecedingCardsWidth + ActiveCardHalfWidth
            // Since padding matches viewport center, scrollLeft simply equals the distance from content start
            // Distance = (Index * (SmallWidth + Gap)) + (LargeWidth / 2)
            const scrollPos = (index * (smallWidth + gap)) + (largeWidth / 2)

            isProgrammaticScroll.current = true
            container.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            })

            // Reset the flag after animation helps prevent fighting
            setTimeout(() => {
                isProgrammaticScroll.current = false
            }, 800)

            setActiveIndex(index)
        }
    }

    const scroll = (direction: "left" | "right") => {
        let newIndex = direction === "right" ? activeIndex + 1 : activeIndex - 1

        // Loop functionality
        if (newIndex >= FEATURED_ITEMS.length) newIndex = 0
        if (newIndex < 0) newIndex = FEATURED_ITEMS.length - 1

        scrollToIndex(newIndex)
    }

    // Auto-scroll logic
    useEffect(() => {
        const startAutoScroll = () => {
            // Clear any existing timer
            if (autoScrollTimer.current) clearInterval(autoScrollTimer.current)

            autoScrollTimer.current = setInterval(() => {
                if (!isHovering.current && !isDown.current) {
                    // Calculate next index
                    setActiveIndex((prev) => {
                        const next = (prev + 1) % FEATURED_ITEMS.length
                        scrollToIndex(next)
                        return next
                    })
                }
            }, 5000)
        }

        startAutoScroll()

        return () => {
            if (autoScrollTimer.current) clearInterval(autoScrollTimer.current)
        }
    }, [])

    // Smooth manual scroll handling
    const handleScroll = () => {
        // Skip update if we are programmatically scrolling or currently dragging
        if (isProgrammaticScroll.current || isDown.current) return

        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            // We reverse the math to find the closest index
            // scrollLeft = index * (small + gap) + large/2
            // index = (scrollLeft - large/2) / (small + gap)

            const isDesktop = window.innerWidth >= 768
            const gap = 16
            const smallWidth = isDesktop ? 260 : 200
            const largeWidth = isDesktop ? 700 : window.innerWidth * 0.90

            const rawIndex = (container.scrollLeft - (largeWidth / 2)) / (smallWidth + gap)
            const closestIndex = Math.round(rawIndex)

            // Clamp index to bounds
            const clampedIndex = Math.max(0, Math.min(closestIndex, FEATURED_ITEMS.length - 1))

            if (clampedIndex !== activeIndex) {
                setActiveIndex(clampedIndex)
            }
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown.current = true
        startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
        scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0
        if (autoScrollTimer.current) clearInterval(autoScrollTimer.current)
    }

    const handleMouseLeave = () => {
        isDown.current = false
        setIsDragging(false)
        isHovering.current = false
    }

    const handleMouseEnter = () => {
        isHovering.current = true
    }

    const handleMouseUp = () => {
        isDown.current = false
        setTimeout(() => setIsDragging(false), 0)

        // Snap on release
        if (scrollContainerRef.current) {
            const isDesktop = window.innerWidth >= 768
            const gap = 16
            const smallWidth = isDesktop ? 260 : 200
            const largeWidth = isDesktop ? 700 : window.innerWidth * 0.90

            const rawIndex = (scrollContainerRef.current.scrollLeft - (largeWidth / 2)) / (smallWidth + gap)
            const closestIndex = Math.max(0, Math.min(Math.round(rawIndex), FEATURED_ITEMS.length - 1))

            scrollToIndex(closestIndex)
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current) return
        e.preventDefault()
        const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
        const walk = (x - startX.current) * 2
        if (Math.abs(walk) > 5 && !isDragging) setIsDragging(true)
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
        }
    }

    return (
        <section className="py-12 bg-background relative overflow-hidden select-none">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 mx-auto space-y-8 px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Featured & Latest</h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium">Top courses and insights to accelerate your career</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollContainerRef}
                    className={cn(
                        "flex items-center overflow-x-auto gap-4 py-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none cursor-grab active:cursor-grabbing h-[500px]",
                        !isDragging && "snap-x snap-mandatory"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onScroll={handleScroll}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        paddingLeft: '50%', // Start padding to center first item
                        paddingRight: '50%' // End padding to center last item
                    }}
                >
                    {/* Spacer to correct the center alignment offsets logic in React if needed, but padding works better */}
                    <div className="w-[0px] shrink-0" /> {/* Hack to ensure padding is respected */}

                    {FEATURED_ITEMS.map((item, index) => {
                        const isActive = index === activeIndex
                        return (
                            <div
                                key={item.id}
                                className={cn(
                                    "relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl overflow-hidden shrink-0 snap-center shadow-2xl",
                                    isActive
                                        // Active: Expanding to "cover" more space, almost full width on mobile
                                        ? "w-[90vw] md:w-[700px] h-[450px] z-20 opacity-100 scale-100 ring-2 ring-primary/20"
                                        // Inactive: Shrinking significantly to create depth
                                        : "w-[200px] md:w-[260px] h-[350px] z-0 opacity-40 scale-90 grayscale-[0.8] blur-[1px]",
                                    isDragging && "pointer-events-none"
                                )}
                                style={{
                                    transformOrigin: 'center center'
                                }}
                            >
                                <Link href={item.slug} className="block h-full w-full" draggable={false}>
                                    {/* Living Gradient Background */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br animate-gradient transition-all duration-1000",
                                        item.imageGradient,
                                        isActive ? "opacity-100" : "opacity-80"
                                    )} style={{ backgroundSize: '200% 200%' }} />

                                    {/* Content Overlay */}
                                    <div className={cn(
                                        "absolute inset-0 bg-black/30 transition-colors duration-500",
                                        isActive ? "bg-black/20" : "bg-black/60"
                                    )} />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className={cn(
                                            "transition-all duration-700 delay-100",
                                            isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 hidden"
                                        )}>
                                            {/* Tag */}
                                            <div className="flex items-center gap-2 mb-4">
                                                {item.type === 'course' ? (
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 bg-white/20 text-white">
                                                        {item.level}
                                                    </span>
                                                ) : item.type === 'article' ? (
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 bg-amber-500/90 text-white">
                                                            {item.category}
                                                        </span>
                                                        <span className="text-white/80 text-sm font-medium">{item.readTime} read</span>
                                                    </div>
                                                ) : (
                                                    // Tool Tag
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 bg-emerald-500/90 text-white">
                                                        {item.category}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                                                {item.title}
                                            </h3>

                                            <p className="text-lg text-blue-50/90 max-w-xl mb-6 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <div className="bg-white text-primary hover:bg-white/90 font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                                    <span>
                                                        {item.type === 'course' ? 'Start Learning' :
                                                            item.type === 'article' ? 'Read Now' :
                                                                item.buttonText}
                                                    </span>
                                                    <PlayCircle className="w-5 h-5 fill-current" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Minimal State for Inactive Cards */}
                                        <div className={cn(
                                            "absolute bottom-8 left-8 transition-all duration-500",
                                            isActive ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                                        )}>
                                            <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}

                    {/* View All Card - Hidden from main flow but accessible at end */}
                    <div className="relative group shrink-0 w-[150px] h-[350px] snap-center rounded-2xl overflow-hidden flex items-center justify-center bg-muted/30 border-2 border-dashed border-muted hover:border-primary/50 transition-colors cursor-pointer ml-8">
                        <Link href="/explore" className="flex flex-col items-center gap-3 text-center p-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <ChevronRight className="h-5 w-5" />
                            </div>
                            <span className="font-semibold text-xs text-foreground">View All</span>
                        </Link>
                    </div>
                    <div className="w-[0px] shrink-0" />
                </div>
            </div>
        </section>
    )
}
