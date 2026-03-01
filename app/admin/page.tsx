"use client"

// Force dynamic rendering to avoid SSR Firebase initialization issues
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react';
import { db, database, app } from '@/lib/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { collection, query, orderBy, onSnapshot, Timestamp, deleteDoc, doc, collectionGroup } from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Trash2, MessageSquare, Mail, AlertTriangle, Bell, Send, UserCheck, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface Application {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    college?: string;
    educationLevel: string;
    currentDesignation?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    roles: string[];
    skills: string[];
    interests: string[];
    whyJoin: string;
    experience?: string;
    availability?: string;
    hearAboutUs?: string;
    status: string;
    timestamp: Timestamp;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [expandedApp, setExpandedApp] = useState<string | null>(null);
    const [notifTitle, setNotifTitle] = useState('');
    const [notifBody, setNotifBody] = useState('');
    const [notifLink, setNotifLink] = useState('');
    const [sendingNotif, setSendingNotif] = useState(false);

    const [loading, setLoading] = useState(true);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');

    const router = useRouter();
    const ADMIN_EMAILS = ["zestacademyonline@gmail.com", "zestacademy@rsmk.co.in"];

    useEffect(() => {
        // Get auth only on client side
        const auth = getAuth(app!);

        let unsubscribeMsgs: (() => void) | null = null;
        let unsubscribeComments: (() => void) | null = null;
        let unsubscribeApps: (() => void) | null = null;


        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            // Cleanup existing listeners on auth change
            if (unsubscribeMsgs) unsubscribeMsgs();
            if (unsubscribeComments) unsubscribeComments();
            if (unsubscribeApps) unsubscribeApps();


            if (!user) {
                router.push('/login');
                return;
            }

            if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
                setUserEmail(user.email || '');
                setIsUnauthorized(true);
                setLoading(false);
                return;
            }

            // If Admin, start fetching data
            setIsUnauthorized(false);

            // 1. Fetch Contact Messages
            const msgQuery = query(collection(db!, "contact_messages"), orderBy("timestamp", "desc"));
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
            const commentsQuery = query(collectionGroup(db!, "comments"), orderBy("timestamp", "desc"));
            unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    refPath: doc.ref.path,
                    ...doc.data()
                })) as Comment[]);
            }, (error) => {
                if (error.code !== 'permission-denied') {
                    console.error("Error fetching comments:", error);
                }
            });

            // 3. Fetch Developer Applications
            const appsQuery = query(collection(db!, 'developer_applications'), orderBy('timestamp', 'desc'));
            unsubscribeApps = onSnapshot(appsQuery, (snapshot) => {
                setApplications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Application[]);
            }, (error) => {
                if (error.code !== 'permission-denied') {
                    console.error('Error fetching applications:', error);
                }
            });

            // Set loading to false after setting up all listeners for admin
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeMsgs) unsubscribeMsgs();
            if (unsubscribeComments) unsubscribeComments();
            if (unsubscribeApps) unsubscribeApps();
        }
    }, [router]);

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
                            You are signed in as <strong>{userEmail}</strong>.
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
            await deleteDoc(doc(db!, "contact_messages", id));
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Failed to delete message");
        }
    };

    const handleDeleteComment = async (refPath: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            await deleteDoc(doc(db!, refPath));
        } catch (error: any) {
            console.error("Error deleting comment:", error);
            alert(`Failed to delete comment: ${error.message || "Unknown error"}`);
        }
    };

    const handleDeleteApplication = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        try {
            await deleteDoc(doc(db!, 'developer_applications', id));
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Failed to delete application');
        }
    };

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!notifTitle || !notifBody) {
            alert("Title and Body are required");
            return;
        }

        setSendingNotif(true);
        try {
            const functions = getFunctions(app);
            const sendFn = httpsCallable(functions, 'sendAdminNotification');
            await sendFn({
                title: notifTitle,
                body: notifBody,
                link: notifLink
            });
            alert("Notification sent successfully to all subscribed users!");
            setNotifTitle('');
            setNotifBody('');
            setNotifLink('');
        } catch (error: any) {
            console.error("Error sending notification:", error);
            const msg = error.details?.message || error.message || "Unknown error";
            alert(`Failed to send notification: ${msg}`);
        } finally {
            setSendingNotif(false);
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

                <Tabs defaultValue="applications" className="w-full">
                    <TabsList className="mb-4 flex-wrap h-auto gap-1">
                        <TabsTrigger value="applications" className="px-6 gap-2">
                            <UserCheck className="h-4 w-4" /> Applications
                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{applications.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="messages" className="px-6 gap-2">
                            <Mail className="h-4 w-4" /> Messages
                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{messages.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="px-6 gap-2">
                            <MessageSquare className="h-4 w-4" /> Discussion Moderation
                            <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{comments.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="px-6 gap-2">
                            <Bell className="h-4 w-4" /> Push Notifications
                        </TabsTrigger>
                    </TabsList>

                    {/* APPLICATIONS TAB */}
                    <TabsContent value="applications">
                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <UserCheck className="h-5 w-5 text-primary" />
                                    Developer Applications
                                </CardTitle>
                                <CardDescription>Team join requests submitted via the Developers page.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                {applications.length === 0 ? (
                                    <div className="py-16 text-center text-muted-foreground">
                                        No applications received yet.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border">
                                        {applications.map((app) => {
                                            const isExpanded = expandedApp === app.id;
                                            return (
                                                <div key={app.id} className="bg-card hover:bg-muted/20 transition-colors">
                                                    {/* Row Summary */}
                                                    <div className="flex items-center gap-4 px-6 py-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3 flex-wrap">
                                                                <span className="font-semibold text-foreground">{app.fullName}</span>
                                                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${app.status === 'pending'
                                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                                    }`}>
                                                                    {app.status}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground mt-0.5">{app.email}</div>
                                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                                {app.roles.map(r => (
                                                                    <span key={r} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                                                                        {r.replace(/_/g, ' ')}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
                                                            {app.timestamp?.toDate().toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                                                                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                                                                aria-label="Toggle details"
                                                            >
                                                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                            </button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                onClick={() => handleDeleteApplication(app.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Details */}
                                                    {isExpanded && (
                                                        <div className="px-6 pb-6 pt-2 bg-muted/10 border-t border-border space-y-5">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Education Level</p>
                                                                    <p className="text-foreground">{app.educationLevel || '—'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">College / University</p>
                                                                    <p className="text-foreground">{app.college || '—'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Current Role / Title</p>
                                                                    <p className="text-foreground">{app.currentDesignation || '—'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Phone</p>
                                                                    <p className="text-foreground">{app.phone || '—'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Availability</p>
                                                                    <p className="text-foreground">{app.availability || '—'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Heard About Us</p>
                                                                    <p className="text-foreground">{app.hearAboutUs || '—'}</p>
                                                                </div>
                                                            </div>

                                                            {/* Links */}
                                                            {(app.linkedinUrl || app.githubUrl || app.portfolioUrl) && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Profile Links</p>
                                                                    <div className="flex flex-wrap gap-3">
                                                                        {app.linkedinUrl && (
                                                                            <a href={app.linkedinUrl.startsWith('http') ? app.linkedinUrl : `https://${app.linkedinUrl}`} target="_blank" rel="noopener noreferrer"
                                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors text-blue-600">
                                                                                <ExternalLink className="h-3.5 w-3.5" /> LinkedIn
                                                                            </a>
                                                                        )}
                                                                        {app.githubUrl && (
                                                                            <a href={app.githubUrl.startsWith('http') ? app.githubUrl : `https://${app.githubUrl}`} target="_blank" rel="noopener noreferrer"
                                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors">
                                                                                <ExternalLink className="h-3.5 w-3.5" /> GitHub
                                                                            </a>
                                                                        )}
                                                                        {app.portfolioUrl && (
                                                                            <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noopener noreferrer"
                                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors text-emerald-600">
                                                                                <ExternalLink className="h-3.5 w-3.5" /> Portfolio
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Skills & Interests */}
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Skills</p>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {app.skills.length > 0 ? app.skills.map(s => (
                                                                            <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">{s}</span>
                                                                        )) : <span className="text-muted-foreground text-sm">—</span>}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Interests</p>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {app.interests.length > 0 ? app.interests.map(i => (
                                                                            <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">{i}</span>
                                                                        )) : <span className="text-muted-foreground text-sm">—</span>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Why Join */}
                                                            <div>
                                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Why they want to join</p>
                                                                <p className="text-sm text-foreground whitespace-pre-wrap bg-background rounded-lg p-3 border border-border">{app.whyJoin}</p>
                                                            </div>

                                                            {/* Experience */}
                                                            {app.experience && (
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Experience / Projects</p>
                                                                    <p className="text-sm text-foreground whitespace-pre-wrap bg-background rounded-lg p-3 border border-border">{app.experience}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

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

                    {/* NOTIFICATIONS TAB */}
                    <TabsContent value="notifications">
                        <Card className="border-none shadow-md max-w-2xl mx-auto">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" />
                                    Send Global Push Notification
                                </CardTitle>
                                <CardDescription>
                                    Send a notification to all users who have subscribed to daily updates.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={handleSendNotification} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Notification Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., New Course Available: React Mastery"
                                            value={notifTitle}
                                            onChange={(e: { target: { value: any; }; }) => setNotifTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="body">Message Body</Label>
                                        <Textarea
                                            id="body"
                                            placeholder="Briefly describe the update..."
                                            value={notifBody}
                                            onChange={(e: { target: { value: any; }; }) => setNotifBody(e.target.value)}
                                            required
                                            rows={4}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="link">Click Action Link (Optional)</Label>
                                        <Input
                                            id="link"
                                            placeholder="https://zestacademy.com/courses/react-mastery"
                                            value={notifLink}
                                            onChange={(e: { target: { value: any; }; }) => setNotifLink(e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">URL to open when user clicks the notification.</p>
                                    </div>
                                    <div className="pt-4">
                                        <Button type="submit" className="w-full" disabled={sendingNotif}>
                                            {sendingNotif ? (
                                                <>Sending...</>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Send className="h-4 w-4" />
                                                    Send to All Users
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
