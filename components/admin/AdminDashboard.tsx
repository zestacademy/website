"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, BookOpen, TrendingUp, Settings, Plus, UserPlus } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { User, Course, UserRole } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc, Timestamp, onSnapshot, query, collection } from "firebase/firestore"

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth()
    const normalizedRole = String(user?.role || '').toLowerCase()
    const [users, setUsers] = useState<User[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalEnrollments: 0,
        totalRevenue: 0
    })
    const [suspendingUserId, setSuspendingUserId] = useState<string | null>(null)
    const [totalEnrollmentsCount, setTotalEnrollmentsCount] = useState(0)

    // Instructor creation state
    const [showCreateInstructor, setShowCreateInstructor] = useState(false)
    const [creatingInstructor, setCreatingInstructor] = useState(false)
    const [instructorForm, setInstructorForm] = useState({
        email: "",
        displayName: "",
        bio: "",
        sendInvitation: true
    })

    useEffect(() => {
        if (normalizedRole === 'admin') {
            loadDashboardData()
        }
    }, [normalizedRole])

    // Subscribe to real-time enrollments
    useEffect(() => {
        if (normalizedRole !== 'admin') return

        const unsubscribe = LMSService.subscribeToAllEnrollments((count) => {
            setTotalEnrollmentsCount(count)
            setStats(prev => ({ ...prev, totalEnrollments: count }))
        })

        return () => unsubscribe()
    }, [normalizedRole])

    if (authLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!user || normalizedRole !== 'admin') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only administrators can access this dashboard. Please contact support if you believe this is an error.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const loadDashboardData = async () => {
        setLoading(true)
        try {
            // Load users
            const [students, instructors] = await Promise.all([
                LMSService.getUsersByRole('student'),
                LMSService.getUsersByRole('instructor')
            ])
            setUsers([...students, ...instructors])

            // Load courses
            const allCourses = await LMSService.getAllCourses()
            setCourses(allCourses)

            // Calculate stats - enrollments will be updated via subscription
            setStats(prev => ({
                totalUsers: students.length + instructors.length,
                totalCourses: allCourses.length,
                totalEnrollments: prev.totalEnrollments,
                totalRevenue: allCourses.reduce((sum, course) => sum + (course.price * (course.totalEnrollments || 0)), 0)
            }))
        } catch (error) {
            console.error("Error loading dashboard data:", error)
        } finally {
            setLoading(false)
        }
    }

    const createInstructor = async () => {
        if (!instructorForm.email || !instructorForm.displayName) {
            alert("Please fill in all required fields")
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(instructorForm.email)) {
            alert("Please enter a valid email address")
            return
        }

        setCreatingInstructor(true)
        try {
            // Generate a more secure temporary password
            const tempPassword = crypto.randomUUID().slice(0, 10) + "Temp!24"

            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                instructorForm.email,
                tempPassword
            )

            // Create user profile in Firestore
            const userData = {
                uid: userCredential.user.uid,
                email: instructorForm.email,
                displayName: instructorForm.displayName,
                role: 'instructor' as UserRole,
                bio: instructorForm.bio || "",
                zestId: `ZEST-${userCredential.user.uid.slice(0, 8).toUpperCase()}`,
                profilePicture: "",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            }

            await setDoc(doc(db, "users", userCredential.user.uid), userData)

            // Send password reset email if requested
            if (instructorForm.sendInvitation) {
                await sendPasswordResetEmail(auth, instructorForm.email)
                alert(`Instructor account created successfully!\n\nEmail: ${instructorForm.email}\nZest ID: ${userData.zestId}\n\nA password reset email has been sent to the instructor.`)
            } else {
                alert(`Instructor account created successfully!\n\nEmail: ${instructorForm.email}\nZest ID: ${userData.zestId}\nTemporary Password: ${tempPassword}\n\nPlease share these credentials securely with the instructor.`)
            }

            // Reset form and reload data
            setInstructorForm({
                email: "",
                displayName: "",
                bio: "",
                sendInvitation: true
            })
            setShowCreateInstructor(false)
            await loadDashboardData()

        } catch (error: any) {
            console.error("Error creating instructor:", error)
            if (error.code === 'auth/email-already-in-use') {
                alert("An account with this email already exists.")
            } else if (error.code === 'auth/weak-password') {
                alert("Password is too weak. Please try again.")
            } else if (error.code === 'auth/invalid-email') {
                alert("Invalid email address.")
            } else {
                alert("Failed to create instructor account. Please try again.")
            }
        } finally {
            setCreatingInstructor(false)
        }
    }

    const resetInstructorPassword = async (email: string) => {
        if (!confirm(`Send password reset email to ${email}?`)) return

        try {
            await sendPasswordResetEmail(auth, email)
            alert(`Password reset email sent to ${email}`)
        } catch (error) {
            console.error("Error sending password reset:", error)
            alert("Failed to send password reset email. Please try again.")
        }
    }

    const updateUserRole = async (userId: string, newRole: UserRole) => {
        try {
            const success = await LMSService.updateUserRole(userId, newRole)
            if (success) {
                // Reload users
                await loadDashboardData()
                alert("User role updated successfully!")
            } else {
                alert("Failed to update user role.")
            }
        } catch (error) {
            console.error("Error updating user role:", error)
            alert("An error occurred while updating the user role.")
        }
    }

    const toggleUserSuspension = async (userId: string, shouldSuspend: boolean) => {
        if (!confirm(`${shouldSuspend ? 'Suspend' : 'Reinstate'} this user account?`)) return
        setSuspendingUserId(userId)
        try {
            const success = await LMSService.suspendUser(userId, shouldSuspend)
            if (success) {
                await loadDashboardData()
                alert(`User has been ${shouldSuspend ? 'suspended' : 'reinstated'} successfully.`)
            } else {
                alert('Unable to update user suspension state.')
            }
        } catch (error) {
            console.error('Error toggling user suspension:', error)
            alert('Failed to update suspension state. Please try again.')
        } finally {
            setSuspendingUserId(null)
        }
    }

    if (!user || normalizedRole !== 'admin') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only administrators can access this dashboard.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage users, courses, and platform analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                                <p className="text-2xl font-bold">{stats.totalCourses}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                                <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <Settings className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Instructor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Instructors</p>
                                <p className="text-2xl font-bold">{users.filter(u => u.role === 'instructor').length}</p>
                            </div>
                            <UserPlus className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                                <p className="text-2xl font-bold">{courses.filter(c => c.status === 'published').length}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Draft Courses</p>
                                <p className="text-2xl font-bold">{courses.filter(c => c.status === 'draft').length}</p>
                            </div>
                            <Settings className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                Manage user roles and permissions
                            </CardDescription>
                        </div>
                        <Dialog open={showCreateInstructor} onOpenChange={setShowCreateInstructor}>
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add Instructor
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create New Instructor</DialogTitle>
                                    <DialogDescription>
                                        Add a new instructor to the platform. They will receive login credentials via email.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={instructorForm.email}
                                            onChange={(e) => setInstructorForm(prev => ({ ...prev, email: e.target.value }))}
                                            className="col-span-3"
                                            placeholder="instructor@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="displayName" className="text-right">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="displayName"
                                            value={instructorForm.displayName}
                                            onChange={(e) => setInstructorForm(prev => ({ ...prev, displayName: e.target.value }))}
                                            className="col-span-3"
                                            placeholder="Dr. John Smith"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="bio" className="text-right">
                                            Bio
                                        </Label>
                                        <Input
                                            id="bio"
                                            value={instructorForm.bio}
                                            onChange={(e) => setInstructorForm(prev => ({ ...prev, bio: e.target.value }))}
                                            className="col-span-3"
                                            placeholder="Experienced Python developer with 10+ years..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">Send Invitation</Label>
                                        <div className="col-span-3 flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="sendInvitation"
                                                checked={instructorForm.sendInvitation}
                                                onChange={(e) => setInstructorForm(prev => ({ ...prev, sendInvitation: e.target.checked }))}
                                            />
                                            <Label htmlFor="sendInvitation" className="text-sm">
                                                Send password reset email to instructor
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowCreateInstructor(false)}
                                        disabled={creatingInstructor}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={createInstructor}
                                        disabled={creatingInstructor}
                                    >
                                        {creatingInstructor ? "Creating..." : "Create Instructor"}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Zest ID</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.uid}>
                                    <TableCell className="font-medium">{user.displayName || 'N/A'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={String(user.role || '').toLowerCase() === 'admin' ? 'default' : String(user.role || '').toLowerCase() === 'instructor' ? 'secondary' : 'outline'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.suspended ? 'destructive' : 'outline'}>
                                            {user.suspended ? 'Suspended' : 'Active'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{user.zestId || 'N/A'}</TableCell>
                                    <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            <Select
                                                value={user.role}
                                                onValueChange={(newRole: UserRole) => updateUserRole(user.uid, newRole)}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="student">Student</SelectItem>
                                                    <SelectItem value="instructor">Instructor</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {String(user.role || '').toLowerCase() === 'instructor' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => resetInstructorPassword(user.email)}
                                                >
                                                    Reset Password
                                                </Button>
                                            )}
                                            <Button
                                                variant={user.suspended ? 'secondary' : 'destructive'}
                                                size="sm"
                                                onClick={() => toggleUserSuspension(user.uid, !user.suspended)}
                                                disabled={suspendingUserId === user.uid}
                                            >
                                                {user.suspended ? 'Reinstate' : 'Suspend'}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Courses Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Courses Overview</CardTitle>
                    <CardDescription>
                        Monitor course performance and enrollment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Title</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Enrollments</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.instructorName}</TableCell>
                                    <TableCell>{course.totalEnrollments}</TableCell>
                                    <TableCell>₹{course.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                                            {course.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}