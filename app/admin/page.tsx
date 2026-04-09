"use client"

// Force dynamic rendering to avoid SSR Firebase initialization issues
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Settings, Users, MessageSquare, BarChart3, Shield } from 'lucide-react';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');

    const router = useRouter();
    const ADMIN_EMAILS = ["zestacademyonline@gmail.com", "zestacademy@rsmk.co.in"];

    useEffect(() => {
        const auth = getAuth(app!);

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
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

            // Admin access granted
            setIsUnauthorized(false);
            setLoading(false);
        });

        return () => unsubscribeAuth();
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

    return (
        <div className="min-h-screen bg-background py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome to the administration panel. Choose a section to manage.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        Admin Access
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">—</div>
                            <p className="text-xs text-muted-foreground">Coming soon</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">—</div>
                            <p className="text-xs text-muted-foreground">Coming soon</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Messages</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">—</div>
                            <p className="text-xs text-muted-foreground">Coming soon</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Status</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Online</div>
                            <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Quick Actions */}
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">Quick Actions</CardTitle>
                            <CardDescription>Common administrative tasks and shortcuts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" disabled>
                                    <Users className="h-6 w-6" />
                                    <span className="text-sm">Manage Users</span>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" disabled>
                                    <MessageSquare className="h-6 w-6" />
                                    <span className="text-sm">View Messages</span>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" disabled>
                                    <BarChart3 className="h-6 w-6" />
                                    <span className="text-sm">Analytics</span>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" disabled>
                                    <Settings className="h-6 w-6" />
                                    <span className="text-sm">Settings</span>
                                </Button>
                            </div>
                            <div className="pt-4 border-t">
                                <p className="text-sm text-muted-foreground text-center">
                                    Admin features are being rebuilt. Check back soon!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column - Recent Activity */}
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">Recent Activity</CardTitle>
                            <CardDescription>Latest administrative actions and system events.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Admin dashboard initialized</p>
                                        <p className="text-xs text-muted-foreground">Just now</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">System check completed</p>
                                        <p className="text-xs text-muted-foreground">Today</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t mt-4">
                                <p className="text-sm text-muted-foreground text-center">
                                    Activity monitoring coming soon
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t">
                    <p className="text-sm text-muted-foreground">
                        ZestAcademy Admin Panel • Version 2.0 (Under Development)
                    </p>
                </div>
            </div>
        </div>
    );
}
