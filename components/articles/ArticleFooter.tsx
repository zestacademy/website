"use client"

import Image from "next/image"
import Link from "next/link"
import { GraduationCap, BookOpen, Users } from "lucide-react"

export function ArticleFooter() {
    return (
        <div className="mt-12 pt-8 border-t bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Branding Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="relative h-12 w-12">
                            <Image
                                src="/logo.png"
                                alt="Zest Academy Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Zest Academy</h3>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                        Master Engineering Fundamentals & Ace Interviews. Structured learning paths for engineering students with expert-crafted courses.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border">
                        <GraduationCap className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-semibold mb-2">Expert Learning Paths</h4>
                        <p className="text-sm text-muted-foreground">
                            Curated courses designed by industry experts
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border">
                        <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-semibold mb-2">Comprehensive Resources</h4>
                        <p className="text-sm text-muted-foreground">
                            In-depth articles and tutorials for all levels
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border">
                        <Users className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-semibold mb-2">Active Community</h4>
                        <p className="text-sm text-muted-foreground">
                            Join thousands of learners on their journey
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-6 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white mb-8">
                    <h3 className="text-xl font-bold mb-2">Ready to Level Up Your Skills?</h3>
                    <p className="text-sm mb-4 opacity-90">
                        Explore our comprehensive courses and learning resources
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/courses"
                            className="px-6 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/explore"
                            className="px-6 py-2 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-colors border border-white/20"
                        >
                            Browse Skills
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-muted-foreground pb-6">
                    <p>© {new Date().getFullYear()} Zest Academy. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
