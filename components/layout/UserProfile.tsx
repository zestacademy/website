"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User as UserIcon, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfile() {
    const router = useRouter()
    const [user, setUser] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Dynamic import to avoid SSR issues with Firebase
        import("@/lib/firebase").then(({ auth }) => {
            if (!auth) {
                setIsLoading(false)
                return
            }
            const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
                if (currentUser) {
                    // Fetch extended user profile including Zest ID
                    const { doc, getDoc } = await import("firebase/firestore")
                    const { db } = await import("@/lib/firebase")

                    if (db) {
                        try {
                            const userDocRef = doc(db, "users", currentUser.uid)
                            const userDoc = await getDoc(userDocRef)
                            if (userDoc.exists()) {
                                setUser({ ...currentUser, ...userDoc.data() })
                            } else {
                                setUser(currentUser)
                            }
                        } catch (err) {
                            console.error("Error fetching user profile:", err)
                            setUser(currentUser)
                        }
                    } else {
                        setUser(currentUser)
                    }
                } else {
                    setUser(null)
                }
                setIsLoading(false)
            })
            return () => unsubscribe()
        })
    }, [])

    const handleSignOut = async () => {
        try {
            const { auth } = await import("@/lib/firebase")
            if (auth) {
                await auth.signOut()
            }
            router.push("/")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    if (isLoading) {
        return <div className="h-9 w-9 bg-muted animate-pulse rounded-full" />
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Log In
                    </Button>
                </Link>
                <Link href="/register">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm">
                        Sign Up
                    </Button>
                </Link>
            </div>
        )
    }

    // Get initials for avatar fallback
    const initials = user.displayName
        ? user.displayName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                        {user.zestId && (
                            <p className="text-xs font-mono text-primary bg-primary/10 px-1 py-0.5 rounded w-fit">
                                ID: {user.zestId}
                            </p>
                        )}
                        <p className="text-xs leading-none text-muted-foreground mb-1">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/my-learning">
                        <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/my-learning">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
