"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="bg-background border-t py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8">
                        <Image
                            src="/logo.png"
                            alt="Zest Academy Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight">
                        Zest Academy
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <a href="mailto:zestacademyonline@gmail.com" className="hover:text-primary transition-colors">
                        zestacademyonline@gmail.com
                    </a>
                    <Link href="/about-us" className="hover:text-primary transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                        Contact
                    </Link>
                    <Link href="/developers" className="hover:text-primary transition-colors">
                        Developers
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-conditions" className="hover:text-primary transition-colors">
                        Terms and Conditions
                    </Link>
                    <Link href="/cookie-policy" className="hover:text-primary transition-colors">
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
}
