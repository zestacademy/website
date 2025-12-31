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
import { BookOpen, PlayCircle, Clock, History, Save, User as UserIcon, Loader2, Trophy, Flame, Settings } from "lucide-react"

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
        <div className="min-h-screen bg-background pb-20">
            {/* Banner Section */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row items-end gap-6 mb-8 group">
                    <div className="relative">
                        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-2xl ring-4 ring-background/50">
                            <AvatarImage src={user.photoURL || photoURL} className="object-cover" />
                            <AvatarFallback className="text-4xl font-bold bg-muted text-muted-foreground">{displayName?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-background" title="Online"></div>
                    </div>

                    <div className="flex-1 pb-2 text-center md:text-left space-y-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground drop-shadow-sm">{displayName || "Learning Enthusiast"}</h1>
                        <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
                            {user.email} <span className="text-muted-foreground/40">•</span> Joined 2024
                        </p>
                    </div>

                    <div className="flex gap-3 pb-4 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none shadow-lg">
                            Share Profile
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </Button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar / Stats */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-none shadow-md bg-gradient-to-br from-card to-muted/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-yellow-500" />
                                    Learning Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-3 bg-background rounded-lg border shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Articles Read</p>
                                            <p className="text-xl font-bold">12</p>
                                        </div>
                                    </div>
                                    <div className="h-1 w-12 bg-blue-500/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[60%]"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-background rounded-lg border shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                                            <PlayCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                                            <p className="text-xl font-bold">4</p>
                                        </div>
                                    </div>
                                    <div className="h-1 w-12 bg-purple-500/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[30%]"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-background rounded-lg border shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600">
                                            <Flame className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Streak</p>
                                            <p className="text-xl font-bold">7 Days</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">About Me</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground text-sm leading-relaxed">
                                {bio || "No bio added yet. Tell us about yourself!"}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-6">
                                <TabsTrigger
                                    value="overview"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="profile"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-3"
                                >
                                    Edit Profile
                                </TabsTrigger>
                            </TabsList>

                            {/* Overview / History Tab */}
                            <TabsContent value="overview" className="space-y-8 animate-in float-up duration-500 fade-in-0 slide-in-from-bottom-2">
                                {/* Recent Activity */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <History className="h-5 w-5 text-primary" />
                                        Recent Activity
                                    </h2>

                                    {/* Placeholder Activity List */}
                                    <div className="flex flex-col gap-4">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card hover:bg-accent/5 transition-colors cursor-pointer group">
                                                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Introduction to AI Tools</h3>
                                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Article</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">Explore the top 84 AI tools transforming the industry in 2025.</p>
                                                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 mins read</span>
                                                        <span>•</span>
                                                        <span>Completed 2 days ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="rounded-xl border border-dashed p-8 text-center bg-muted/10 space-y-3">
                                            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                                <PlayCircle className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <h3 className="font-medium">No courses in progress</h3>
                                            <p className="text-sm text-muted-foreground">Browse our catalog to start learning.</p>
                                            <Button variant="outline" size="sm" onClick={() => router.push('/courses')}>Browse Courses</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Edit Profile Tab */}
                            <TabsContent value="profile" className="animate-in fade-in-0 zoom-in-95">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Edit Profile</CardTitle>
                                        <CardDescription>
                                            Update your personal details and public profile information.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Display Name</Label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        value={displayName}
                                                        onChange={(e) => setDisplayName(e.target.value)}
                                                        placeholder="Your User Name"
                                                        className="pl-9"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    value={user.email || ""}
                                                    disabled
                                                    className="bg-muted opacity-70"
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
                                            <p className="text-[0.8rem] text-muted-foreground">
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
                                                className="min-h-[120px] resize-none"
                                            />
                                            <p className="text-[0.8rem] text-muted-foreground">
                                                Brief description for your profile.
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between border-t bg-muted/10 p-6">
                                        <Button variant="ghost" onClick={() => setDisplayName(user.displayName || "")}>Reset</Button>
                                        <Button onClick={handleUpdateProfile} disabled={saving} className="bg-primary hover:bg-primary/90">
                                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {saving ? "Saving Changes..." : "Save Changes"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
