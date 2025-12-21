import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-background border-t pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white p-1 rounded-md">
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
                            <span className="font-bold text-xl tracking-tight">Zest Academy</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Empowering learners worldwide with accessible, high-quality education from industry experts.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Community</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Team Plans</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Refer a Friend</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Scholarships</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Free Classes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Teaching</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Become an Instructor</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Teacher Rules</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Teaching Academy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2024 Zest Academy Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
