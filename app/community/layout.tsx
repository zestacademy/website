"use client"

import { useAuth } from "@/hooks/useAuth"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommunityLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="relative min-h-screen">
                <div className="filter blur-sm pointer-events-none select-none h-full" aria-hidden="true">
                    {children}
                </div>

                <Dialog open={true}>
                    <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Join Our Community</DialogTitle>
                            <DialogDescription>
                                Connect with fellow learners, share your projects, and ask questions. Please log in to participate in the discussion.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" className="w-full">
                                    <Button className="w-full">Log In</Button>
                                </Link>
                                <Link href="/register" className="w-full">
                                    <Button variant="outline" className="w-full">Sign Up</Button>
                                </Link>
                            </div>
                            <Link href="/" className="w-full">
                                <Button variant="ghost" className="w-full">Back to Home</Button>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    return <>{children}</>
}
