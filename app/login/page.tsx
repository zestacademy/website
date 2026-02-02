"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSSO } from "@/contexts/SSOContext"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"

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

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login, isAuthenticated, isLoading: authLoading } = useSSO()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
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
        } catch (e) {
            console.error(e)
            const error = e as Error
            setError(error.message || "Failed to initiate login. Please try again.")
            setShowErrorDialog(true)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleGoogleLogin() {
        setIsGoogleLoading(true)
        setError(null)

        try {
            if (!auth) {
                throw new Error("Firebase authentication is not initialized")
            }
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            // Redirect to home page after successful login
            router.push("/")
        } catch (e) {
            console.error("Google sign-in error:", e)
            const error = e as Error
            setError(error.message || "Failed to sign in with Google. Please try again.")
            setShowErrorDialog(true)
        } finally {
            setIsGoogleLoading(false)
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
                            <div className="space-y-3">
                                <Button 
                                    disabled={isLoading || authLoading || isGoogleLoading} 
                                    className="w-full h-12 text-base"
                                    onClick={handleLogin}
                                >
                                    {(isLoading || authLoading) && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Login with ZestAcademy
                                </Button>
                                
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <Button 
                                    disabled={isLoading || authLoading || isGoogleLoading}
                                    variant="outline"
                                    className="w-full h-12 text-base"
                                    onClick={handleGoogleLogin}
                                >
                                    {isGoogleLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </Button>
                            </div>
                            <p className="mt-4 text-xs text-center text-muted-foreground">
                                Secure authentication powered by ZestAcademy SSO and Google
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

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <LoginContent />
        </Suspense>
    )
}
