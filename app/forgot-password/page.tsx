"use client"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Loader2, ArrowLeft } from "lucide-react"

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

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        if (!email) {
            setError("Please enter your email address.")
            return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            setShowSuccessDialog(true)
        } catch (e: any) {
            console.error(e)
            setError(e.message || "Failed to send reset email. Please check the email address.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-primary/90" />
                <div className="relative z-20 flex items-center text-lg font-medium">
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
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This platform has completely transformed how I approach learning technical skills. The interactive courses are a game changer.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 relative">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Reset Password
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>
                    <Card className="border-none shadow-none">
                        <CardContent className="p-0">
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
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
                                    {error && (
                                        <div className="text-sm text-destructive text-center">
                                            {error}
                                        </div>
                                    )}
                                    <Button disabled={isLoading} className="w-full">
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Send Reset Link
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 p-0 mt-6 text-center text-sm text-muted-foreground">
                            <Link
                                href="/login"
                                className="flex items-center hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Check your email</DialogTitle>
                        <DialogDescription>
                            We have sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Link href="/login" passHref>
                            <Button onClick={() => setShowSuccessDialog(false)}>
                                Return to Login
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
