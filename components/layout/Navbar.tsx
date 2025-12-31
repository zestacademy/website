"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserProfile } from "@/components/layout/UserProfile"
import { cn } from "@/lib/utils"

export function Navbar() {
    const { setTheme } = useTheme()
    const pathname = usePathname()

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/roadmaps", label: "Roadmaps" },
        { href: "/explore", label: "Skills" },
        { href: "/my-learning", label: "My Learning" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 justify-between">
                <Link href="/" className="flex items-center space-x-2 mr-8">
                    <div className="relative h-10 w-10 mr-1">
                        <Image
                            src="/logo.png"
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

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-primary",
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="hidden lg:block relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-9 h-9 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                    </div>

                    <UserProfile />

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
