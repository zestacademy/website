"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showVerifyDialog, setShowVerifyDialog] = useState(false)
    const [showExistsDialog, setShowExistsDialog] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && !showVerifyDialog) {
                // Only redirect if we are NOT showing the verification dialog.
                // This prevents premature redirect before the user sees the message if auto-login happens on signup.
                // However, createUserWithEmailAndPassword signs in automatically.
                // We need to handle the flow carefully.
                // If the dialog is open, we wait for user interaction.
                // If user visits the page appearing logged in, we redirect.
                router.push("/")
            }
        })
        return () => unsubscribe()
    }, [router, showVerifyDialog])

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (name) {
                await updateProfile(userCredential.user, {
                    displayName: name
                })
            }
            await sendEmailVerification(userCredential.user)
            setShowVerifyDialog(true)
            // Do NOT router.push("/") here. Wait for dialog.
        } catch (e: any) {
            console.error(e)
            if (e.code === 'auth/email-already-in-use') {
                setShowExistsDialog(true)
            } else {
                setError(e.message || "Failed to create account. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // ... handleGoogleLogin ... (omitted from replacement for brevity if not changing, but wait, replace_file_content replaces range)
    // Actually, I need to be careful with replace_file_content range.
    // The "useEffect" logic I wrote above might conflict with the existing one if I don't replace it carefully.
    // The existing useEffect redirects simply if user exists.
    // When createUserWithEmailAndPassword succeeds, auth state changes to "logged in".
    // The useEffect will trigger and redirect to "/", potentially BEFORE the dialog is seen or immediately closing it?
    // userCredential creates the user and signs them in.
    // So the state change listener WILL fire.
    // I should modify the useEffect to ignore the redirect if we just signed up (maybe check showVerifyDialog?)
    // Yes, added !showVerifyDialog check in the replacement above.

    // Let's carry on with the rest of the component structure.

    async function handleGoogleLogin() {
        setIsLoading(true)
        setError(null)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            router.push("/")
        } catch (e: any) {
            console.error(e)
            setError(e.message || "Failed to sign up with Google.")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleZestLogin() {
        setIsLoading(true)
        setError(null)
        try {
            await signIn("zest-auth", { callbackUrl: "/" })
        } catch (e: any) {
            console.error(e)
            setError(e.message || "Failed to sign up with Zest ID.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* ... Left Side ... */}
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
                    <div className="absolute inset-0 bg-black/20" />
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
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <Card className="border-none shadow-none">
                        <CardContent className="p-0">
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            type="text"
                                            autoCapitalize="words"
                                            autoComplete="name"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                autoCapitalize="none"
                                                autoComplete="new-password"
                                                disabled={isLoading}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-sm text-destructive text-center">
                                            {error}
                                        </div>
                                    )}
                                    <Button disabled={isLoading} className="w-full">
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Create Account
                                    </Button>
                                </div>
                            </form>
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" disabled={isLoading} onClick={() => handleZestLogin()} className="w-full">
                                    <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                                    </svg>
                                    Zest ID
                                </Button>
                                <Button variant="outline" disabled={isLoading} onClick={handleGoogleLogin} className="w-full">
                                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                    Google
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 p-0 mt-6 text-center text-sm text-muted-foreground">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Login
                                </Link>
                            </p>

                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify your email</DialogTitle>
                        <DialogDescription>
                            Account created successfully! We&apos;ve sent a verification email to <strong>{email}</strong>.
                            Please verify your email address to access all features.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => router.push("/")}>
                            Continue to Dashboard
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showExistsDialog} onOpenChange={setShowExistsDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Account Already Exists</DialogTitle>
                        <DialogDescription>
                            It looks like there is already an account associated with <strong>{email}</strong>.
                            Would you like to log in instead?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExistsDialog(false)}>
                            Cancel
                        </Button>
                        <Link href="/login" passHref>
                            <Button onClick={() => setShowExistsDialog(false)}>
                                Log In
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
