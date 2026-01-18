"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, ShieldAlert } from "lucide-react"

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [authLoading, setAuthLoading] = useState(true)

    // Check authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setAuthLoading(false)
        })
        return () => unsubscribe()
    }, [])

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchUsers()
        }
    }, [currentUser])

    if (authLoading || loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const ADMIN_EMAIL = "zestacademyonline@gmail.com"

    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md border-destructive/50">
                    <CardHeader className="flex flex-row items-center gap-2 text-destructive">
                        <ShieldAlert className="h-6 w-6" />
                        <CardTitle>Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You do not have permission to view this page.</p>
                        {currentUser && <p className="mt-2 text-sm text-muted-foreground">Logged in as: {currentUser.email}</p>}
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.uid}>
                                            <TableCell className="font-mono text-xs">{user.uid}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {user.photoURL && <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />}
                                                    {user.displayName || "N/A"}
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email || "N/A"}</TableCell>
                                            <TableCell>
                                                <div className="text-xs">
                                                    <div>Created: {user.creationTime ? new Date(user.creationTime).toLocaleDateString() : "N/A"}</div>
                                                    <div className="text-muted-foreground">Last Login: {user.lastSignInTime ? new Date(user.lastSignInTime).toLocaleDateString() : "Never"}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.disabled ?
                                                    <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs">Disabled</span> :
                                                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">Active</span>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
