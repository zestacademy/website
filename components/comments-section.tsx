"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, MessageSquare } from "lucide-react"
import { db, auth } from "@/lib/firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

interface Comment {
    id: string
    author: string
    authorId?: string
    avatar?: string
    content: string
    date: string
    timestamp?: unknown
}

export function CommentsSection({ courseId }: { courseId: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")
    const [currentUser, setCurrentUser] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        // Set up real-time listener for comments
        const commentsRef = collection(db, "articles", courseId, "comments")
        const q = query(commentsRef, orderBy("timestamp", "desc"))
        
        const unsubscribeComments = onSnapshot(q, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    author: data.author || "Anonymous",
                    authorId: data.authorId,
                    avatar: data.avatar,
                    content: data.content,
                    date: formatDate(data.timestamp),
                    timestamp: data.timestamp
                }
            })
            setComments(fetchedComments)
        }, (error) => {
            console.error("Error fetching comments:", error)
        })

        return () => {
            unsubscribeAuth()
            unsubscribeComments()
        }
    }, [courseId])

    const formatDate = (timestamp: unknown) => {
        if (!timestamp) return "Just now"
        
        const date = (timestamp as { toDate?: () => Date }).toDate ? (timestamp as { toDate: () => Date }).toDate() : new Date(timestamp as string | number | Date)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
        
        if (diffInSeconds < 60) return "Just now"
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
        return date.toLocaleDateString()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim() || isLoading) return

        setIsLoading(true)
        
        try {
            const commentsRef = collection(db, "articles", courseId, "comments")
            const user = currentUser as { displayName?: string; email?: string; uid?: string; photoURL?: string } | null
            await addDoc(commentsRef, {
                content: newComment.trim(),
                author: user?.displayName || user?.email || "Guest User",
                authorId: user?.uid || null,
                avatar: user?.photoURL || null,
                timestamp: serverTimestamp()
            })
            
            setNewComment("")
        } catch (error) {
            console.error("Error adding comment:", error)
            alert("Failed to post comment. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="py-8 mt-8 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
                <Card className="bg-background/60 backdrop-blur-sm border-muted">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            Community Discussion ({comments.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">ME</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                                <Input
                                    placeholder="Share your thoughts or ask a question..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="flex-1 bg-background/50"
                                />
                                <Button type="submit" size="icon" disabled={!newComment.trim() || isLoading}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>

                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <Avatar className="h-10 w-10 border border-border">
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback className="bg-muted text-muted-foreground">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm text-foreground">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg rounded-tl-none">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
