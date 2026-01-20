
"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Crown, Loader2 } from "lucide-react"

interface LeaderboardEntry {
    userId: string
    displayName: string
    photoURL: string
    totalScore: number
    maxPossibleScore: number
}

interface LeaderboardProps {
    courseId: string
    title: string
}

export function Leaderboard({ courseId, title }: LeaderboardProps) {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true)
            try {
                const q = query(
                    collection(db, "leaderboards", courseId, "users"),
                    orderBy("totalScore", "desc"),
                    limit(20)
                )

                const snapshot = await getDocs(q)
                const data = snapshot.docs.map(doc => doc.data() as LeaderboardEntry)
                setEntries(data)
            } catch (error) {
                console.error("Error fetching leaderboard:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [courseId])

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Crown className="h-5 w-5 text-yellow-500" />
            case 1: return <Medal className="h-5 w-5 text-gray-400" />
            case 2: return <Medal className="h-5 w-5 text-amber-600" />
            default: return <span className="text-muted-foreground font-medium w-5 text-center">{index + 1}</span>
        }
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold">{title} Top Scorers</h2>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : entries.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">No scores yet. Be the first to top the leaderboard!</p>
                </div>
            ) : (
                <div className="rounded-md border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                            <tr>
                                <th className="h-12 px-4 w-[80px]">Rank</th>
                                <th className="hidden md:table-cell h-12 px-4">Learner</th>
                                <th className="md:hidden h-12 px-4">User</th>
                                <th className="h-12 px-4 text-right">Score</th>
                                <th className="hidden sm:table-cell h-12 px-4 text-right">Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => {
                                const accuracy = entry.maxPossibleScore > 0
                                    ? Math.round((entry.totalScore / entry.maxPossibleScore) * 100)
                                    : 0

                                return (
                                    <tr key={entry.userId} className={`border-b last:border-0 hover:bg-muted/50 transition-colors ${index < 3 ? "bg-muted/30" : ""}`}>
                                        <td className="p-4 font-medium">
                                            <div className="flex justify-center">
                                                {getRankIcon(index)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={entry.photoURL} />
                                                    <AvatarFallback>{entry.displayName?.[0] || "?"}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium truncate max-w-[120px] sm:max-w-none">{entry.displayName || "Anonymous"}</span>
                                                {index === 0 && <Badge className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-[10px] hidden sm:inline-flex">Champion</Badge>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-bold">
                                            {entry.totalScore} <span className="text-muted-foreground text-xs font-normal text-nowrap">/ {entry.maxPossibleScore}</span>
                                        </td>
                                        <td className="hidden sm:table-cell p-4 text-right">
                                            <Badge variant={accuracy >= 80 ? "default" : "secondary"}>
                                                {accuracy}%
                                            </Badge>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
