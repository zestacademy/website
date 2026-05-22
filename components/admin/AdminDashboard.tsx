"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
    Users, 
    Mail, 
    MessageSquare, 
    Search, 
    ShieldCheck, 
    UserMinus, 
    UserPlus, 
    AlertTriangle, 
    RotateCcw,
    Shield,
    GraduationCap,
    UserCheck,
    Loader2,
    Lock
} from "lucide-react"

// UI Imports
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Simulated fallback data when Firebase is not connected or empty
const MOCK_USERS = [
    {
        uid: "mock-1",
        displayName: "Jane Doe",
        email: "jane.doe@example.com",
        zestId: "ZEST-2026-0041",
        role: "student",
        status: "active",
        createdAt: { toDate: () => new Date("2026-01-15T08:00:00Z") }
    },
    {
        uid: "mock-2",
        displayName: "Prof. John Smith",
        email: "j.smith@zestacademy.org",
        zestId: "ZEST-2026-0012",
        role: "instructor",
        status: "active",
        createdAt: { toDate: () => new Date("2025-12-05T14:30:00Z") }
    },
    {
        uid: "mock-3",
        displayName: "Sarah Jenkins",
        email: "sarah.admin@zestacademy.org",
        zestId: "ZEST-2026-0001",
        role: "admin",
        status: "active",
        createdAt: { toDate: () => new Date("2025-11-01T09:00:00Z") }
    },
    {
        uid: "mock-4",
        displayName: "Marcus Vance",
        email: "marcus.v@example.com",
        zestId: "ZEST-2026-0098",
        role: "student",
        status: "suspended",
        createdAt: { toDate: () => new Date("2026-02-28T18:15:00Z") }
    }
]

export default function AdminDashboard() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [currentUser, setCurrentUser] = useState<any | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    
    // Firestore-loaded data states
    const [users, setUsers] = useState<any[]>([])
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalLeads: 0,
        totalNewsletter: 0
    })
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    
    // Success/error toasts & alerts
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
    const [isSimulated, setIsSimulated] = useState(false)

    // Wait for client mount to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Auth monitor
    useEffect(() => {
        if (!mounted) return

        let unsubscribe = () => {}

        const initAuth = async () => {
            try {
                const { auth, db } = await import("@/lib/firebase")
                if (!auth) {
                    setLoadingAuth(false)
                    setUseSimulatedFallback()
                    return
                }

                unsubscribe = auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        setCurrentUser(user)
                        
                        // Check if user has admin role in firestore
                        if (db) {
                            const { doc, getDoc } = await import("firebase/firestore")
                            try {
                                const userDocRef = doc(db, "users", user.uid)
                                const userSnapshot = await getDoc(userDocRef)
                                if (userSnapshot.exists()) {
                                    const data = userSnapshot.data()
                                    if (data.role === "admin") {
                                        setIsAdmin(true)
                                        // Load operational dashboard data
                                        loadDashboardData(db)
                                    } else {
                                        setIsAdmin(false)
                                    }
                                } else {
                                    setIsAdmin(false)
                                }
                            } catch (err) {
                                console.error("Error checking admin privilege, using mockup mode:", err)
                                setIsAdmin(true) // For local development or mock environments
                                setUseSimulatedFallback()
                            }
                        } else {
                            setIsAdmin(false)
                        }
                    } else {
                        setCurrentUser(null)
                        setIsAdmin(false)
                    }
                    setLoadingAuth(false)
                })
            } catch (err) {
                console.error("Failed to initialize Firebase Auth:", err)
                setLoadingAuth(false)
                setUseSimulatedFallback()
            }
        }

        initAuth()
        return () => unsubscribe()
    }, [mounted])

    const setUseSimulatedFallback = () => {
        setIsSimulated(true)
        setIsAdmin(true) // Grant admin view in mockup fallback mode
        setUsers(MOCK_USERS)
        setStats({
            totalUsers: 142,
            totalLeads: 24,
            totalNewsletter: 389
        })
    }

    const loadDashboardData = async (db: any) => {
        setLoadingData(true)
        try {
            const { collection, getDocs } = await import("firebase/firestore")
            
            // 1. Fetch Users
            const usersColRef = collection(db, "users")
            const usersSnapshot = await getDocs(usersColRef)
            const loadedUsers: any[] = []
            
            usersSnapshot.forEach((doc) => {
                loadedUsers.push({
                    uid: doc.id,
                    ...doc.data()
                })
            })
            
            // Sort by creation or update timestamp if available
            loadedUsers.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0)
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0)
                return dateB - dateA
            })
            
            setUsers(loadedUsers)

            // 2. Fetch Leads Count
            const leadsColRef = collection(db, "leads")
            const leadsSnapshot = await getDocs(leadsColRef)
            
            // 3. Fetch Newsletter Subscribers Count
            const newsletterColRef = collection(db, "newsletterSubscribers")
            const newsletterSnapshot = await getDocs(newsletterColRef)

            setStats({
                totalUsers: loadedUsers.length,
                totalLeads: leadsSnapshot.size,
                totalNewsletter: newsletterSnapshot.size
            })
            
            setIsSimulated(false)
        } catch (err: any) {
            console.error("Error loading Firestore collections, falling back to simulated data:", err)
            setUseSimulatedFallback()
            triggerAlert("error", "Failed to fetch from live database. Using offline simulated mode.")
        } finally {
            setLoadingData(false)
        }
    }

    const triggerAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message })
        setTimeout(() => setAlert(null), 5000)
    }

    // Mutate User Role
    const handleRoleChange = async (userId: string, newRole: string) => {
        const originalUsers = [...users]
        
        // Optimistic update
        setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u))
        
        if (isSimulated) {
            triggerAlert("success", `Simulated: User role updated to '${newRole}' successfully.`)
            return
        }

        try {
            const { db } = await import("@/lib/firebase")
            if (db) {
                const { doc, updateDoc } = await import("firebase/firestore")
                const userRef = doc(db, "users", userId)
                await updateDoc(userRef, { role: newRole })
                triggerAlert("success", "User role updated successfully in database.")
            } else {
                throw new Error("Firestore not initialized")
            }
        } catch (err) {
            console.error("Error updating user role:", err)
            setUsers(originalUsers)
            triggerAlert("error", "Failed to update user role in live database.")
        }
    }

    // Toggle User Suspension
    const handleToggleStatus = async (userId: string, currentStatus: string) => {
        const nextStatus = currentStatus === "suspended" ? "active" : "suspended"
        const originalUsers = [...users]
        
        // Optimistic update
        setUsers(users.map(u => u.uid === userId ? { ...u, status: nextStatus } : u))

        if (isSimulated) {
            triggerAlert("success", `Simulated: User status set to '${nextStatus}' successfully.`)
            return
        }

        try {
            const { db } = await import("@/lib/firebase")
            if (db) {
                const { doc, updateDoc } = await import("firebase/firestore")
                const userRef = doc(db, "users", userId)
                await updateDoc(userRef, { status: nextStatus })
                triggerAlert("success", `User account ${nextStatus === "suspended" ? "suspended" : "reactivated"} successfully.`)
            } else {
                throw new Error("Firestore not initialized")
            }
        } catch (err) {
            console.error("Error updating user status:", err)
            setUsers(originalUsers)
            triggerAlert("error", "Failed to update user status in live database.")
        }
    }

    // Refresh Data
    const handleRefresh = async () => {
        const { db } = await import("@/lib/firebase")
        if (db && !isSimulated) {
            await loadDashboardData(db)
            triggerAlert("success", "Dashboard data reloaded from database.")
        } else {
            setUseSimulatedFallback()
            triggerAlert("success", "Simulated data reset to default values.")
        }
    }

    // Filtering logic
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            (user.displayName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.zestId || "").toLowerCase().includes(searchQuery.toLowerCase())
            
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter
        
        return matchesSearch && matchesRole && matchesStatus
    })

    if (!mounted) return null

    // Loading State
    if (loadingAuth) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-muted-foreground font-medium animate-pulse">Verifying credentials and security guidelines...</p>
            </div>
        )
    }

    // Access Denied State
    if (!currentUser || !isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 max-w-md mx-auto text-center">
                <div className="bg-destructive/10 p-4 rounded-full mb-6 border border-destructive/20 animate-pulse">
                    <Lock className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">Unauthorized Access</h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    You do not have administrative privileges to view the Zest Academy system console. Please log in with a certified administrator profile.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => router.push("/login")} className="bg-primary hover:bg-primary/90 text-white shadow-sm font-semibold">
                        Log In As Admin
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/")} className="hover:bg-accent">
                        Back To Home
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-border">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-6 w-6 text-primary dark:text-sky-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-sky-400">
                            Zest Management Console
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Platform Administration</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Monitor platform metrics, assign operational user roles, and manage user suspensions safely.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {isSimulated && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1 font-medium text-xs rounded-full">
                            Simulated Offline Mode
                        </Badge>
                    )}
                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loadingData} className="border border-border bg-card hover:bg-muted text-sm shadow-sm gap-2">
                        <RotateCcw className={`h-4 w-4 ${loadingData ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Banner/Toasts */}
            {alert && (
                <div className={`p-4 rounded-xl mb-8 flex items-start gap-3 border shadow-sm animate-slideUp ${
                    alert.type === "success" 
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400" 
                        : "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20"
                }`}>
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold leading-relaxed">{alert.message}</p>
                </div>
            )}

            {/* Dashboard Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <Card className="bg-card border border-border shadow-sm rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Total Profiles</CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold tracking-tight">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground mt-1">Registered learner & admin accounts</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-sm rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Inquiries & Leads</CardTitle>
                        <MessageSquare className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold tracking-tight">{stats.totalLeads}</div>
                        <p className="text-xs text-muted-foreground mt-1">Contact form and placement requests</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-sm rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Newsletter Subscribers</CardTitle>
                        <Mail className="h-5 w-5 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold tracking-tight">{stats.totalNewsletter}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active tech newsletter subscriptions</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Section */}
            <Card className="mb-8 border border-border bg-card shadow-sm rounded-2xl">
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search Input */}
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or Zest ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                            />
                        </div>

                        {/* Filter Selects */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-xs font-semibold text-muted-foreground shrink-0">Role:</span>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full sm:w-40 px-3 py-2 bg-background border border-input rounded-xl text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors cursor-pointer"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor/Educator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-xs font-semibold text-muted-foreground shrink-0">Status:</span>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-40 px-3 py-2 bg-background border border-input rounded-xl text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors cursor-pointer"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="px-6 py-5 border-b border-border bg-muted/20">
                    <CardTitle className="text-base font-bold">User Directory ({filteredUsers.length} matches)</CardTitle>
                    <CardDescription className="text-xs">
                        Review profiles and modify database flags. All modifications are logged and active instantly.
                    </CardDescription>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/10 hover:bg-transparent">
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">User details</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Zest ID</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Assigned Role</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Account Status</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Date Joined</TableHead>
                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                                        No registered accounts match the selected filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => {
                                    const dateString = user.createdAt?.toDate 
                                        ? user.createdAt.toDate().toLocaleDateString(undefined, { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                          })
                                        : "N/A"

                                    return (
                                        <TableRow key={user.uid} className="hover:bg-muted/30 border-b border-border transition-colors">
                                            {/* Details */}
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-foreground">{user.displayName || "Anonymous Learner"}</span>
                                                    <span className="text-xs text-muted-foreground mt-0.5">{user.email}</span>
                                                    <span className="text-[10px] font-mono text-muted-foreground/60 mt-1 select-all">{user.uid}</span>
                                                </div>
                                            </TableCell>
                                            
                                            {/* Zest ID */}
                                            <TableCell className="py-4">
                                                {user.zestId ? (
                                                    <code className="text-xs font-mono font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-400 px-2 py-1 rounded">
                                                        {user.zestId}
                                                    </code>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground italic">Not Assigned</span>
                                                )}
                                            </TableCell>
                                            
                                            {/* Role Selector */}
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.role === "admin" && <Shield className="h-3.5 w-3.5 text-purple-500 shrink-0" />}
                                                    {user.role === "instructor" && <GraduationCap className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                                                    {(!user.role || user.role === "student") && <UserCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                                                    
                                                    <select
                                                        value={user.role || "student"}
                                                        onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                                                        className="px-2 py-1 bg-background border border-input rounded-lg text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                                                    >
                                                        <option value="student">Student</option>
                                                        <option value="instructor">Instructor</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                            </TableCell>
                                            
                                            {/* Account Status Badge */}
                                            <TableCell className="py-4">
                                                {user.status === "suspended" ? (
                                                    <Badge variant="destructive" className="px-2.5 py-0.5 text-[10px] font-bold rounded-full">
                                                        Suspended
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold rounded-full dark:text-emerald-400">
                                                        Active
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            
                                            {/* Date Joined */}
                                            <TableCell className="py-4 text-xs font-medium text-muted-foreground">
                                                {dateString}
                                            </TableCell>
                                            
                                            {/* Actions Suspension Button */}
                                            <TableCell className="py-4 text-right">
                                                <Button
                                                    variant={user.status === "suspended" ? "outline" : "destructive"}
                                                    size="sm"
                                                    onClick={() => handleToggleStatus(user.uid, user.status)}
                                                    className="h-8 text-xs font-semibold px-3 shadow-sm border border-border"
                                                >
                                                    {user.status === "suspended" ? (
                                                        <>
                                                            <UserPlus className="h-3.5 w-3.5 mr-1" />
                                                            Reinstate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserMinus className="h-3.5 w-3.5 mr-1" />
                                                            Suspend
                                                        </>
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}
