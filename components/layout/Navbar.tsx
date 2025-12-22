"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Sun, Moon } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function Navbar() {
    const { setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 justify-between">
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <div className="relative h-10 w-10 mr-1">
                        <Image
                            src="/logo.jpg"
                            alt="Zest Academy Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        Zest Academy
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                    <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                    <Link href="/roadmaps" className="hover:text-primary transition-colors">Roadmaps</Link>
                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                    <Link href="/my-learning" className="hover:text-primary transition-colors">My Learning</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="hidden lg:block relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-9 h-9 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                            Log In
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm">
                            Sign Up
                        </Button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-1">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
