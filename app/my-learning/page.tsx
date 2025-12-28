"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, onAuthStateChanged, updateProfile } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, PlayCircle, Clock, History, Save, User as UserIcon, Loader2 } from "lucide-react"

export default function MyLearningPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form State
    const [displayName, setDisplayName] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setDisplayName(currentUser.displayName || "")
                setPhotoURL(currentUser.photoURL || "")

                // Fetch additional user data from Firestore
                try {
                    const docRef = doc(db, "users", currentUser.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setBio(data.bio || "")
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            } else {
                router.push("/login")
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [router])

    const handleUpdateProfile = async () => {
        if (!user) return
        setSaving(true)
        try {
            // Update Auth Profile
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL
            })

            // Update Firestore Profile
            await setDoc(doc(db, "users", user.uid), {
                bio: bio,
                email: user.email, // Keep email in sync just in case
                updatedAt: new Date().toISOString()
            }, { merge: true })

            alert("Profile updated successfully!")
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Failed to update profile.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header Section */}
            <div className="bg-muted/30 border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                            <AvatarImage src={user.photoURL || photoURL} />
                            <AvatarFallback className="text-2xl">{displayName?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold">{displayName || "Learning Enthusiast"}</h1>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                        <TabsTrigger value="profile">Profile Details</TabsTrigger>
                        <TabsTrigger value="history">Learning History</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and public profile information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Display Name</Label>
                                        <Input
                                            id="name"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="Your User Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={user.email || ""}
                                            disabled
                                            className="bg-muted"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="photo">Avatar URL</Label>
                                    <Input
                                        id="photo"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Link to a publicly accessible image.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us a little about yourself and your learning goals..."
                                        className="min-h-[100px]"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        This will be displayed on your public profile.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button onClick={handleUpdateProfile} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Learning History Tab */}
                    <TabsContent value="history" className="space-y-8">
                        {/* Recent Articles */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                    Recently Read Articles
                                </h2>
                                <Button variant="ghost" size="sm">View All</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Placeholder for no history logic yet */}
                                <div className="col-span-full text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                                    <h3 className="text-lg font-medium">No reading history yet</h3>
                                    <p className="text-muted-foreground mb-4">Start exploring articles to build your learning path.</p>
                                    <Button variant="outline" onClick={() => router.push('/articles')}>Explore Articles</Button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Courses */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <PlayCircle className="h-5 w-5 text-primary" />
                                    Recent Courses
                                </h2>
                                <Button variant="ghost" size="sm">View All</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Placeholder for no courses logic yet */}
                                <div className="col-span-full text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                                    <h3 className="text-lg font-medium">No course history yet</h3>
                                    <p className="text-muted-foreground mb-4">Jump into a course and start learning today.</p>
                                    <Button variant="outline" onClick={() => router.push('/courses')}>Browse Courses</Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
