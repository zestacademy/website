"use client"

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp, deleteDoc, doc, collectionGroup } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Trash2, MessageSquare, Mail, AlertTriangle } from 'lucide-react';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: Timestamp;
}

interface Comment {
    id: string;
    content: string;
    author: string;
    timestamp: Timestamp;
    // Ref path is needed to delete
    refPath: string;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    const router = useRouter();
    const auth = getAuth();
    const ADMIN_EMAIL = "zestacademy@rsmk.co.in";

    useEffect(() => {
        let unsubscribeMsgs: (() => void) | null = null;
        let unsubscribeComments: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            // Cleanup existing listeners on auth change
            if (unsubscribeMsgs) unsubscribeMsgs();
            if (unsubscribeComments) unsubscribeComments();

            if (!user) {
                router.push('/login');
                return;
            }

            if (user.email !== ADMIN_EMAIL) {
                setIsUnauthorized(true);
                setLoading(false);
                return;
            }

            // If Admin, start fetching data
            setIsUnauthorized(false);

            // 1. Fetch Contact Messages
            const msgQuery = query(collection(db, "contact_messages"), orderBy("timestamp", "desc"));
            unsubscribeMsgs = onSnapshot(msgQuery, (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as ContactMessage[]);
            }, (error) => {
                // Ignore permission errors that happen during logout/auth-switch
                if (error.code !== 'permission-denied') {
                    console.error("Error fetching messages:", error);
                }
            });

            // 2. Fetch All Comments
            const commentsQuery = query(collectionGroup(db, "comments"), orderBy("timestamp", "desc"));
            unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    refPath: doc.ref.path,
                    ...doc.data()
                })) as Comment[]);
                setLoading(false);
            }, (error) => {
                if (error.code !== 'permission-denied') {
                    console.error("Error fetching comments:", error);
                }
                setLoading(false);
            });
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeMsgs) unsubscribeMsgs();
            if (unsubscribeComments) unsubscribeComments();
        }
    }, [auth, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isUnauthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md shadow-lg border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center text-destructive flex flex-col items-center gap-2">
                            <AlertTriangle className="h-10 w-10" />
                            Access Denied
                        </CardTitle>
                        <CardDescription className="text-center">
                            You are signed in as <strong>{auth.currentUser?.email}</strong>.
                            <br />
                            This account does not have administrator privileges.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button variant="outline" onClick={() => router.push('/')}>
                            Return to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await deleteDoc(doc(db, "contact_messages", id));
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Failed to delete message");
        }
    };

    const handleDeleteComment = async (refPath: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            // refPath is like "articles/articleId/comments/commentId"
            // We need to create a doc reference from the path
            // The db instance is the root, so we can pass the path segments or parse it.
            // Simplest is to just use the path string if the SDK supports it, or split it.
            // However, doc(db, path) works.
            await deleteDoc(doc(db, refPath));
        } catch (error: any) {
            console.error("Error deleting comment:", error);
            alert(`Failed to delete comment: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage content, messages, and community safety.</p>
                    </div>
                </div>

                <Tabs defaultValue="messages" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="messages" className="px-6 gap-2">
                            <Mail className="h-4 w-4" /> Messages
                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{messages.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="px-6 gap-2">
                            <MessageSquare className="h-4 w-4" /> Discussion Moderation
                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{comments.length}</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* MESSAGES TAB */}
                    <TabsContent value="messages">
                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle className="text-xl">Contact Form Submissions</CardTitle>
                                <CardDescription>View and manage inquiries from the contact page.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Date</th>
                                                <th className="px-6 py-4 font-semibold">Sender</th>
                                                <th className="px-6 py-4 font-semibold">Content</th>
                                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {messages.map((msg) => (
                                                <tr key={msg.id} className="bg-card hover:bg-muted/30 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground align-top w-[180px]">
                                                        {msg.timestamp?.toDate().toLocaleString(undefined, {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 align-top w-[220px]">
                                                        <div className="font-medium text-foreground">{msg.name}</div>
                                                        <div className="text-xs text-muted-foreground mt-0.5">{msg.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="font-medium mb-1">{msg.subject}</div>
                                                        <div className="text-muted-foreground whitespace-pre-wrap">{msg.message}</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {messages.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                        No new messages.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* COMMENTS TAB */}
                    <TabsContent value="comments">
                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle className="text-xl">Global Comment Moderation</CardTitle>
                                <CardDescription>Monitor and remove inappropriate comments from all articles and courses.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Date</th>
                                                <th className="px-6 py-4 font-semibold">Author</th>
                                                <th className="px-6 py-4 font-semibold">Comment</th>
                                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {comments.map((comment) => (
                                                <tr key={comment.id} className="bg-card hover:bg-muted/30 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground align-top w-[180px]">
                                                        {comment.timestamp?.toDate().toLocaleString(undefined, {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 align-top w-[200px]">
                                                        <div className="font-medium text-foreground">{comment.author}</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="text-foreground">{comment.content}</div>
                                                        <div className="text-xs text-muted-foreground mt-1 font-mono">{comment.refPath}</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => handleDeleteComment(comment.refPath)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {comments.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                        No comments found across the platform.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
