"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, MessageSquare } from "lucide-react"

interface Comment {
    id: string
    author: string
    avatar?: string
    content: string
    date: string
}

export function CommentsSection({ courseId }: { courseId: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        // Load comments from localStorage
        const stored = localStorage.getItem(`comments-${courseId}`)
        if (stored) {
            setComments(JSON.parse(stored))
        } else {
            // Default dummy comments
            setComments([
                {
                    id: "1",
                    author: "Alex Johnson",
                    content: "This content was incredibly helpful! It simplified complex topics in a way that was easy to understand.",
                    date: "2 days ago",
                },
                {
                    id: "2",
                    author: "Sarah Chen",
                    content: "Great detailed explanation. Would love more examples on the practical applications section.",
                    date: "1 week ago"
                },
                {
                    id: "3",
                    author: "Michael Brown",
                    content: "The breakdown of core technologies was exactly what I needed. Thanks for putting this together!",
                    date: "2 weeks ago"
                }
            ])
        }
    }, [courseId])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            author: "Guest User", // In a real app, get from auth
            content: newComment,
            date: "Just now",
        }

        const updated = [comment, ...comments]
        setComments(updated)
        localStorage.setItem(`comments-${courseId}`, JSON.stringify(updated))
        setNewComment("")
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
                                <Button type="submit" size="icon" disabled={!newComment.trim()}>
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
