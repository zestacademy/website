"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { UserProfile } from "@/components/layout/UserProfile"
import { NotificationToggle } from "@/components/layout/NotificationToggle"
import { cn } from "@/lib/utils"

export function Navbar() {
    const { setTheme } = useTheme()
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/explore", label: "Skills" },
        { href: "https://zestacademycompilers.vercel.app", label: "Compilers" },
        { href: "/community", label: "Community" },
        { href: "/my-learning", label: "My Learning" },
    ]

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b transition-all duration-300",
            scrolled
                ? "bg-background/80 backdrop-blur-lg shadow-sm"
                : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}>
            <div className="container flex h-16 items-center mx-auto px-4 justify-between">
                <Link href="/" className="flex items-center space-x-2 mr-8 transition-transform hover:scale-105 duration-200">
                    <div className="relative h-10 w-10 mr-1">
                        <Image
                            src="/logo.png"
                            alt="Zest Academy Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        Zest Academy
                    </span>
                    <span className="font-bold text-xl tracking-tight sm:hidden">
                        Zest
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isExternal = link.href.startsWith("http");
                        const isActive = link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href) && !isExternal;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative transition-colors hover:text-primary py-1",
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full animate-in slide-in-from-bottom-1 duration-300" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center space-x-2 lg:space-x-4">
                    <div className="hidden lg:block relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-9 h-9 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary transition-all duration-200 focus-visible:bg-background"
                        />
                    </div>

                    <UserProfile />

                    <NotificationToggle />

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

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <div className="relative h-8 w-8">
                                        <Image
                                            src="/logo.png"
                                            alt="Zest Academy"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    Zest Academy
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="relative w-full">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search topics..."
                                        className="pl-9"
                                    />
                                </div>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => {
                                        const isExternal = link.href.startsWith("http");
                                        const isActive = link.href === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(link.href) && !isExternal;

                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "text-lg font-medium transition-colors hover:text-primary",
                                                    isActive ? "text-primary" : "text-muted-foreground"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
