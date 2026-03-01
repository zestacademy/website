"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
    BookOpen,
    Code2,
    Briefcase,
    Cpu,
    Users,
    GraduationCap,
    Layers,
    Zap,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Play,
    Star,
    ExternalLink,
    Flame,
    Sparkles,
    Trophy,
} from "lucide-react"

/* ─────────────────────────── HERO SLIDES ─────────────────────────── */

const HERO_SLIDES = [
    {
        id: "compilers",
        title: "Zest Compilers",
        tagline: "Code. Compile. Conquer.",
        description:
            "Write and run Python, C, Java, SQL & HTML directly in your browser — zero setup, instant results. The fastest way to test and learn engineering concepts.",
        href: "https://compilers.zestacademy.tech/",
        external: true,
        gradient: "from-cyan-600 via-blue-700 to-indigo-800",
        blob1: "bg-cyan-400/20",
        blob2: "bg-indigo-500/20",
        accentBar: "from-cyan-400 via-blue-400 to-indigo-400",
        badge: "Live Now",
        badgeDot: "bg-cyan-300",
        taglineColor: "text-cyan-200",
        icon: Code2,
        cta: "Try Now",
        stats: [
            { label: "Languages", value: "5" },
            { label: "No installs", value: "100%" },
            { label: "Avg response", value: "<1s" },
        ],
    },
    {
        id: "zestfolio",
        title: "Zestfolio",
        tagline: "Your Engineering Story, Told Beautifully.",
        description:
            "Build a stunning portfolio to showcase your projects, skills, and achievements. Stand out to recruiters and collaborators.",
        href: "https://zestfolio.zestacademy.tech/",
        external: true,
        gradient: "from-amber-500 via-orange-600 to-red-700",
        blob1: "bg-amber-400/20",
        blob2: "bg-red-500/20",
        accentBar: "from-amber-400 via-orange-400 to-red-400",
        badge: "Live",
        badgeDot: "bg-amber-300",
        taglineColor: "text-amber-200",
        icon: Briefcase,
        cta: "Build Portfolio",
        stats: [
            { label: "Templates", value: "10+" },
            { label: "Free to use", value: "100%" },
            { label: "Deploy time", value: "<1min" },
        ],
    },
    {
        id: "articles",
        title: "Articles",
        tagline: "Learn. Explore. Engineer.",
        description:
            "Dive into in-depth tutorials, concept guides, and project walkthroughs written by engineering experts specifically for students and professionals.",
        href: "/explore",
        external: false,
        gradient: "from-violet-600 via-purple-700 to-indigo-800",
        blob1: "bg-violet-400/20",
        blob2: "bg-indigo-500/20",
        accentBar: "from-violet-400 via-purple-400 to-indigo-400",
        badge: "New",
        badgeDot: "bg-violet-300",
        taglineColor: "text-violet-200",
        icon: BookOpen,
        cta: "Read Articles",
        stats: [
            { label: "Topics", value: "20+" },
            { label: "Free access", value: "100%" },
            { label: "Updated", value: "Weekly" },
        ],
    },
    {
        id: "courses",
        title: "Courses",
        tagline: "Structured Paths. Real Skills.",
        description:
            "Follow curated learning paths from fundamentals to advanced topics — Python, IoT, Embedded Systems, Data Structures, and more.",
        href: "/courses",
        external: false,
        gradient: "from-emerald-600 via-teal-700 to-cyan-800",
        blob1: "bg-emerald-400/20",
        blob2: "bg-cyan-500/20",
        accentBar: "from-emerald-400 via-teal-400 to-cyan-400",
        badge: "Popular",
        badgeDot: "bg-emerald-300",
        taglineColor: "text-emerald-200",
        icon: GraduationCap,
        cta: "Browse Courses",
        stats: [
            { label: "Courses", value: "10+" },
            { label: "Hands-on", value: "100%" },
            { label: "Difficulty", value: "All levels" },
        ],
    },
    {
        id: "community",
        title: "Community",
        tagline: "Connect. Collaborate. Grow.",
        description:
            "Join a thriving community of engineering learners. Share projects, ask questions, find collaborators, and grow together.",
        href: "/community",
        external: false,
        gradient: "from-indigo-600 via-violet-700 to-purple-800",
        blob1: "bg-indigo-400/20",
        blob2: "bg-purple-500/20",
        accentBar: "from-indigo-400 via-violet-400 to-purple-400",
        badge: "Active",
        badgeDot: "bg-indigo-300",
        taglineColor: "text-indigo-200",
        icon: Users,
        cta: "Join Community",
        stats: [
            { label: "Members", value: "500+" },
            { label: "Discussions", value: "Daily" },
            { label: "Open to all", value: "Free" },
        ],
    },
]

/* ─────────────────────────── ROW DATA ─────────────────────────── */

const ROWS = [
    {
        id: "trending",
        title: "🔥 Trending on Zest",
        icon: Flame,
        cards: [
            {
                id: "articles",
                label: "Articles",
                sub: "In-depth tutorials & guides",
                href: "/explore",
                gradient: "from-violet-600 to-purple-800",
                icon: BookOpen,
                badge: "New",
                wide: true,
            },
            {
                id: "iot",
                label: "IoT & Embedded",
                sub: "ESP32, Arduino & real-world systems",
                href: "/courses/internet-of-things",
                gradient: "from-rose-500 to-pink-700",
                icon: Cpu,
                badge: "Hot",
                wide: false,
            },
            {
                id: "quick-learn",
                label: "Quick Learn",
                sub: "Bite-sized flashcards for revision",
                href: "/explore",
                gradient: "from-lime-500 to-green-700",
                icon: Zap,
                badge: "",
                wide: false,
            },
            {
                id: "community",
                label: "Community",
                sub: "Connect with 500+ learners",
                href: "/community",
                gradient: "from-indigo-500 to-violet-700",
                icon: Users,
                badge: "",
                wide: false,
            },
        ],
    },
    {
        id: "tools",
        title: "⚙️ Zest Ecosystem",
        icon: Sparkles,
        cards: [
            {
                id: "compilers",
                label: "Zest Compilers",
                sub: "Python · C · Java · SQL · HTML",
                href: "https://compilers.zestacademy.tech/",
                gradient: "from-cyan-500 to-blue-700",
                icon: Code2,
                badge: "Live",
                wide: false,
                external: true,
            },
            {
                id: "zestfolio",
                label: "Zestfolio",
                sub: "Build your engineering portfolio",
                href: "https://zestfolio.zestacademy.tech/",
                gradient: "from-amber-400 to-orange-600",
                icon: Briefcase,
                badge: "Live",
                wide: true,
                external: true,
            },
            {
                id: "projects",
                label: "Projects Hub",
                sub: "150+ curated project ideas",
                href: "/explore",
                gradient: "from-orange-500 to-red-700",
                icon: Layers,
                badge: "150+",
                wide: false,
            },
            {
                id: "collaborate",
                label: "Let's Collaborate",
                sub: "Join the Zest developer team",
                href: "/developers/workwithus",
                gradient: "from-teal-500 to-cyan-700",
                icon: Users,
                badge: "Hiring",
                wide: false,
            },
        ],
    },
    {
        id: "courses",
        title: "🎓 Top Courses",
        icon: Trophy,
        cards: [
            {
                id: "course-python",
                label: "Python Mastery",
                sub: "From basics to advanced scripting",
                href: "/courses/python-basics",
                gradient: "from-yellow-500 to-amber-600",
                icon: GraduationCap,
                badge: "Popular",
                wide: false,
            },
            {
                id: "course-iot",
                label: "Internet of Things",
                sub: "Sensors, microcontrollers & cloud",
                href: "/courses/internet-of-things",
                gradient: "from-emerald-500 to-teal-700",
                icon: Cpu,
                badge: "Bestseller",
                wide: true,
            },
            {
                id: "course-ds",
                label: "Data Structures",
                sub: "Algorithms for coding interviews",
                href: "/courses",
                gradient: "from-sky-500 to-indigo-700",
                icon: Layers,
                badge: "",
                wide: false,
            },
            {
                id: "course-embedded",
                label: "Embedded C",
                sub: "Low-level programming for MCUs",
                href: "/courses",
                gradient: "from-fuchsia-500 to-purple-700",
                icon: Code2,
                badge: "",
                wide: false,
            },
        ],
    },
]

/* ─────────────────────────── HERO CAROUSEL ─────────────────────────── */

function HeroCarousel() {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const [animating, setAnimating] = useState(false)
    const total = HERO_SLIDES.length

    const goTo = useCallback(
        (index: number) => {
            if (animating) return
            setAnimating(true)
            setCurrent((index + total) % total)
            setTimeout(() => setAnimating(false), 500)
        },
        [animating, total]
    )

    const prev = () => goTo(current - 1)
    const next = useCallback(() => goTo(current + 1), [current, goTo])

    // Auto-advance every 5 seconds
    useEffect(() => {
        if (paused) return
        const id = setInterval(next, 5000)
        return () => clearInterval(id)
    }, [paused, next])

    const slide = HERO_SLIDES[current]
    const Icon = slide.icon
    const Wrapper = slide.external ? "a" : Link
    const wrapperProps = slide.external
        ? { href: slide.href, target: "_blank", rel: "noopener noreferrer" }
        : { href: slide.href }

    return (
        <div
            className="relative mx-4 md:mx-8 mb-10 rounded-3xl overflow-hidden"
            style={{ minHeight: "300px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slide layer — animated on change */}
            <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: animating ? 0 : 1 }}
            >
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

                {/* Animated blobs */}
                <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${slide.blob1} blur-3xl animate-pulse`} />
                <div className={`absolute -bottom-16 -left-16 w-64 h-64 rounded-full ${slide.blob2} blur-3xl animate-pulse [animation-delay:1s]`} />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)`,
                        backgroundSize: "32px 32px",
                    }}
                />

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${slide.accentBar}`} />
            </div>

            {/* Clickable content */}
            {/* @ts-ignore */}
            <Wrapper
                {...wrapperProps}
                className="group relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-10 block"
                style={{ minHeight: "300px" }}
            >
                {/* Left: text content */}
                <div className="flex-1 max-w-xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-4">
                        <span className={`h-1.5 w-1.5 rounded-full ${slide.badgeDot} animate-pulse`} />
                        <span className="text-white text-xs font-semibold uppercase tracking-widest">
                            {slide.badge}
                        </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm">
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                            {slide.title}
                        </h2>
                    </div>

                    <p className={`${slide.taglineColor} text-base font-medium mb-3`}>{slide.tagline}</p>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">{slide.description}</p>

                    {/* CTA */}
                    <div className="mt-5 flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-sm shadow-lg group-hover:scale-105 transition-all duration-200">
                            <Play className="h-4 w-4 fill-gray-900" />
                            {slide.cta}
                        </span>
                        {slide.external && (
                            <span className="text-white/60 text-sm flex items-center gap-1 group-hover:text-white/90 transition-colors">
                                Opens in new tab <ExternalLink className="h-3.5 w-3.5" />
                            </span>
                        )}
                    </div>
                </div>

                {/* Right: stats */}
                <div className="flex md:flex-col gap-4 md:gap-6 md:items-end">
                    {slide.stats.map((s) => (
                        <div key={s.label} className="text-right">
                            <p className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">{s.value}</p>
                            <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
                        </div>
                    ))}
                </div>
            </Wrapper>

            {/* ── Controls overlay ── */}
            {/* Prev / Next arrows */}
            <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {HERO_SLIDES.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={(e) => { e.stopPropagation(); goTo(i) }}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === current
                                ? "w-6 h-2 bg-white"
                                : "w-2 h-2 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            {!paused && (
                <div className="absolute bottom-0 left-0 right-0 h-1 z-20">
                    <div
                        key={`${current}-progress`}
                        className="h-full bg-white/40 origin-left"
                        style={{
                            animation: "progressBar 5s linear forwards",
                        }}
                    />
                </div>
            )}
        </div>
    )
}

/* ─────────────────────────── SCROLL ROW ─────────────────────────── */

function ScrollRow({ row }: { row: (typeof ROWS)[number] }) {
    const ref = useRef<HTMLDivElement>(null)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const onScroll = () => {
        if (!ref.current) return
        setAtStart(ref.current.scrollLeft <= 4)
        setAtEnd(ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 4)
    }

    const scroll = (dir: "left" | "right") => {
        ref.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" })
    }

    return (
        <div className="mb-10">
            {/* Row header */}
            <div className="flex items-center justify-between px-4 md:px-8 mb-3">
                <h2 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                    {row.title}
                </h2>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => scroll("left")}
                        disabled={atStart}
                        aria-label="Scroll left"
                        className="p-1.5 rounded-full border border-border bg-background shadow-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={atEnd}
                        aria-label="Scroll right"
                        className="p-1.5 rounded-full border border-border bg-background shadow-sm transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Cards strip */}
            <div className="relative">
                {!atStart && (
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-background to-transparent z-10" />
                )}
                {!atEnd && (
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-background to-transparent z-10" />
                )}

                <div
                    ref={ref}
                    onScroll={onScroll}
                    className="flex gap-3 overflow-x-auto no-scrollbar px-4 md:px-8 pb-2"
                >
                    {row.cards.map((card) => {
                        const Icon = card.icon
                        const isWide = card.wide
                        const Wrapper = (card as any).external ? "a" : Link
                        const wrapperProps = (card as any).external
                            ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
                            : { href: card.href }

                        return (
                            // @ts-ignore
                            <Wrapper
                                key={card.id}
                                {...wrapperProps}
                                className={`
                                    group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                                    transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:z-10
                                    ${isWide ? "w-72 md:w-96 h-44" : "w-44 md:w-56 h-44"}
                                `}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                                <div
                                    className="absolute inset-0 opacity-[0.08]"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                        backgroundSize: "128px",
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                                {card.badge && (
                                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider">
                                        {card.badge}
                                    </div>
                                )}
                                {(card as any).external && (
                                    <div className="absolute top-3 left-3">
                                        <ExternalLink className="h-3.5 w-3.5 text-white/60" />
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                                                    <Icon className="h-3.5 w-3.5 text-white" />
                                                </div>
                                                <span className="text-white font-bold text-sm md:text-base leading-tight drop-shadow">
                                                    {card.label}
                                                </span>
                                            </div>
                                            <p className="text-white/70 text-[11px] leading-snug line-clamp-1 max-w-[160px]">
                                                {card.sub}
                                            </p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                                            <div className="p-1.5 rounded-full bg-white/25 backdrop-blur-sm">
                                                <ArrowRight className="h-3.5 w-3.5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Wrapper>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/* ─────────────────────────── MAIN EXPORT ─────────────────────────── */

export function FeaturedLinksSlider() {
    return (
        <section className="py-10 bg-background">
            {/* Section label */}
            <div className="px-4 md:px-8 mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    Explore Zest Academy
                </p>
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <p className="text-muted-foreground text-sm">Personalised for engineering learners</p>
                </div>
            </div>

            {/* Auto-sliding hero carousel */}
            <HeroCarousel />

            {/* Row-based card sections */}
            {ROWS.map((row) => (
                <ScrollRow key={row.id} row={row} />
            ))}

            {/* Progress bar keyframe */}
            <style>{`
                @keyframes progressBar {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>
        </section>
    )
}
