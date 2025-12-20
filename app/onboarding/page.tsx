"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OnboardingPage() {
    const { user } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleOnboarding = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate saving user data
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Redirect to home/dashboard
        router.push('/')
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/20">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName || "Learner"}!</CardTitle>
                    <CardDescription>Let's personalize your learning experience.</CardDescription>
                </CardHeader>
                <form onSubmit={handleOnboarding}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input id="fullname" placeholder="John Doe" defaultValue={user?.fullName || ""} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="class">Current Class / Status</Label>
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grade-9">Grade 9</SelectItem>
                                    <SelectItem value="grade-10">Grade 10</SelectItem>
                                    <SelectItem value="grade-11">Grade 11</SelectItem>
                                    <SelectItem value="grade-12">Grade 12</SelectItem>
                                    <SelectItem value="undergrad">Undergraduate</SelectItem>
                                    <SelectItem value="graduate">Graduate</SelectItem>
                                    <SelectItem value="professional">Working Professional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skill">What do you want to learn?</Label>
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a primary interest" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="coding">Coding & Development</SelectItem>
                                    <SelectItem value="design">Design & Creative</SelectItem>
                                    <SelectItem value="business">Business & Marketing</SelectItem>
                                    <SelectItem value="data">Data Science & AI</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
                            {loading ? "Getting Started..." : "Complete Setup"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
