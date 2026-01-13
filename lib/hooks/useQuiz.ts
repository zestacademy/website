
import { useState, useEffect } from "react"
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

export interface QuizResult {
    score: number
    total: number
    passed: boolean
    timestamp: string
}

export function useQuiz(roadmapId: string) {
    const [user, setUser] = useState<User | null>(null)
    const [quizScores, setQuizScores] = useState<Record<number, QuizResult>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (!currentUser) {
                setQuizScores({})
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!user || !roadmapId) return

        const fetchScores = async () => {
            try {
                const enrollmentId = `${user.uid}_${roadmapId}`
                const quizRef = collection(db, "enrollments", enrollmentId, "quiz_attempts")
                const snapshot = await getDocs(quizRef)

                const scores: Record<number, QuizResult> = {}
                snapshot.forEach(doc => {
                    scores[parseInt(doc.id)] = doc.data() as QuizResult
                })
                setQuizScores(scores)
            } catch (error) {
                console.error("Error fetching quiz scores:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchScores()
    }, [user, roadmapId])

    const saveScore = async (weekNumber: number, score: number, total: number) => {
        if (!user) return

        const enrollmentId = `${user.uid}_${roadmapId}`
        const result: QuizResult = {
            score,
            total,
            passed: score / total >= 0.6, // 60% passing
            timestamp: new Date().toISOString()
        }

        // 1. Save individual quiz result
        const quizDocRef = doc(db, "enrollments", enrollmentId, "quiz_attempts", weekNumber.toString())
        await setDoc(quizDocRef, result)

        // 2. Update local state
        setQuizScores(prev => ({
            ...prev,
            [weekNumber]: result
        }))

        // 3. Update total score in enrollment and leaderboard
        await updateTotalScore(enrollmentId, user)
    }

    const updateTotalScore = async (enrollmentId: string, currentUser: User) => {
        // Recalculate total score
        const quizRef = collection(db, "enrollments", enrollmentId, "quiz_attempts")
        const snapshot = await getDocs(quizRef)
        let totalScore = 0
        let maxPossibleScore = 0

        snapshot.forEach(doc => {
            const data = doc.data() as QuizResult
            totalScore += data.score
            maxPossibleScore += data.total
        })

        // Update enrollment
        await updateDoc(doc(db, "enrollments", enrollmentId), {
            totalScore,
            maxPossibleScore
        })

        // Update Leaderboard
        const leaderboardRef = doc(db, "leaderboards", roadmapId, "users", currentUser.uid)
        await setDoc(leaderboardRef, {
            userId: currentUser.uid,
            displayName: currentUser.displayName || "Anonymous",
            photoURL: currentUser.photoURL || "",
            totalScore,
            maxPossibleScore,
            lastUpdated: new Date().toISOString()
        })
    }

    return { params: { user, loading, quizScores }, saveScore }
}
