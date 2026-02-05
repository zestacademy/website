"use client"

import { useState, useEffect } from "react"
import { User } from "firebase/auth"

export function useAuth() {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribe: (() => void) | undefined

        const initAuth = async () => {
            // Dynamic import to avoid SSR issues with Firebase
            const { auth } = await import("@/lib/firebase")
            if (!auth) {
                setLoading(false)
                return
            }
            unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
                if (currentUser) {
                    // Fetch extended user profile including Zest ID
                    // We import Firestore dynamically as well
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
                setLoading(false)
            })
        }

        initAuth()

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    return { user, loading }
}
