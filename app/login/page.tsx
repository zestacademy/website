"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSSO } from "@/contexts/SSOContext"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Force dynamic rendering since we use useSearchParams
export const dynamic = 'force-dynamic'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login, isAuthenticated, isLoading: authLoading } = useSSO()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [showErrorDialog, setShowErrorDialog] = useState(false)

    // Check for error parameters from OAuth callback
    useEffect(() => {
        const errorParam = searchParams.get('error')
        if (errorParam) {
            const errorMessages: Record<string, string> = {
                'invalid_callback': 'Invalid authentication callback. Please try again.',
                'state_mismatch': 'Security check failed. Please try logging in again.',
                'missing_verifier': 'Authentication verification failed. Please try again.',
                'token_exchange_failed': 'Failed to complete authentication. Please try again.',
                'server_error': 'Server error occurred. Please try again later.',
            }
            setError(errorMessages[errorParam] || 'An error occurred during login. Please try again.')
            setShowErrorDialog(true)
        }
    }, [searchParams])

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            router.push("/")
        }
    }, [isAuthenticated, authLoading, router])

    async function handleLogin() {
        setIsLoading(true)
        setError(null)

        try {
            await login()
        } catch (e: any) {
            console.error(e)
            setError(e.message || "Failed to initiate login. Please try again.")
            setShowErrorDialog(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="absolute inset-0 z-10">
                    <Image
                        src="/auth-hero-desktop-hq.jpg"
                        alt="Authentication Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text contrast */}
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium p-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Zest Academy
                </div>
            </div>
            <div className="lg:p-8 relative">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                    {/* Mobile Hero Image */}
                    <div className="relative w-full aspect-square lg:hidden mb-4">
                        <Image
                            src="/auth-hero-mobile.png"
                            alt="Authentication Hero"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome to ZestAcademy
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in with your ZestAcademy account
                        </p>
                    </div>
                    <Card className="border-none shadow-none">
                        <CardContent className="p-0">
                            {error && (
                                <div className="mb-4 text-sm text-destructive text-center p-3 bg-destructive/10 rounded-md">
                                    {error}
                                </div>
                            )}
                            <Button 
                                disabled={isLoading || authLoading} 
                                className="w-full h-12 text-base"
                                onClick={handleLogin}
                            >
                                {(isLoading || authLoading) && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Login with ZestAcademy
                            </Button>
                            <p className="mt-4 text-xs text-center text-muted-foreground">
                                Secure authentication powered by ZestAcademy SSO
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 p-0 mt-6 text-center text-sm text-muted-foreground">
                            <p>
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Sign up
                                </Link>
                            </p>

                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Authentication Error</DialogTitle>
                        <DialogDescription>
                            {error || 'An error occurred during authentication. Please try again.'}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
