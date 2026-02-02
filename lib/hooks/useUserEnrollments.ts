import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { EnrollmentData } from "./useCourseProgress"

export function useUserEnrollments() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [enrollments, setEnrollments] = useState<EnrollmentData[]>([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth!, (currentUser) => {
            setUser(currentUser)
            if (!currentUser) {
                setLoading(false)
                setEnrollments([])
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!user) return

        const q = query(
            collection(db!, "enrollments"),
            where("userId", "==", user.uid)
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data: EnrollmentData[] = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as EnrollmentData)
            })
            setEnrollments(data)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { user, loading, enrollments }
}
