import { useState, useEffect } from "react"
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

export interface EnrollmentData {
    userId: string
    roadmapId: string
    startedAt: string
    completedDays: number[]
    totalDays: number
    status: "in-progress" | "completed"
    lastAccessed: string
}

export function useRoadmapProgress(roadmapId: string) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState<EnrollmentData | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (!currentUser) {
                setLoading(false)
                setProgress(null)
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!user || !roadmapId) return

        const enrollmentId = `${user.uid}_${roadmapId}`
        const docRef = doc(db, "enrollments", enrollmentId)

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setProgress(docSnap.data() as EnrollmentData)
            } else {
                setProgress(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user, roadmapId])

    const startRoadmap = async (totalDays: number) => {
        if (!user) return
        const enrollmentId = `${user.uid}_${roadmapId}`
        const initialData: EnrollmentData = {
            userId: user.uid,
            roadmapId,
            startedAt: new Date().toISOString(),
            completedDays: [],
            totalDays,
            status: "in-progress",
            lastAccessed: new Date().toISOString()
        }
        await setDoc(doc(db, "enrollments", enrollmentId), initialData)
    }

    const toggleDayCompletion = async (day: number) => {
        if (!user || !progress) return

        const enrollmentId = `${user.uid}_${roadmapId}`
        const isCompleted = progress.completedDays.includes(day)
        const docRef = doc(db, "enrollments", enrollmentId)

        if (isCompleted) {
            await updateDoc(docRef, {
                completedDays: arrayRemove(day),
                lastAccessed: new Date().toISOString()
            })
        } else {
            await updateDoc(docRef, {
                completedDays: arrayUnion(day),
                lastAccessed: new Date().toISOString()
            })
        }
    }

    return { user, loading, progress, startRoadmap, toggleDayCompletion }
}
