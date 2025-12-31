"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Facebook } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-2 rounded-lg shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                                Zest Academy
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Master the skills that matter. Interactive roadmaps, expert-curated courses, and a community of learners building the future.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted hover:text-primary transition-all">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted hover:text-blue-400 transition-all">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted hover:text-blue-600 transition-all">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Resources */}
                    <div>
                        <h3 className="font-semibold mb-6 text-foreground">Resources</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="/roadmaps" className="hover:text-primary hover:translate-x-1 transition-all inline-block">
                                    Learning Roadmaps
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore" className="hover:text-primary hover:translate-x-1 transition-all inline-block">
                                    Browse Skills
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="hover:text-primary hover:translate-x-1 transition-all inline-block">
                                    Technical Articles
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="font-semibold mb-6 text-foreground">Company</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Partners</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter/Updates (New addition for 'redesign') */}
                    <div>
                        <h3 className="font-semibold mb-6 text-foreground">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to our newsletter for the latest tech trends and course updates.
                        </p>
                        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-muted px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2025 Zest Academy. Built for learners.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
