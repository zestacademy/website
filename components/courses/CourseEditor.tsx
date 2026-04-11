"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, ArrowLeft, Loader2 } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { Course, CourseStatus } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface Props {
    courseId: string
}

interface CourseFormData {
    title: string
    subtitle: string
    description: string
    thumbnail: string
    level: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    tags: string[]
    price: number
    certificateAvailable: boolean
    status: CourseStatus
}

export default function CourseEditor({ courseId }: Props) {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const [course, setCourse] = useState<Course | null>(null)
    const [formData, setFormData] = useState<CourseFormData>({
        title: "",
        subtitle: "",
        description: "",
        thumbnail: "",
        level: "Beginner",
        duration: "",
        tags: [],
        price: 0,
        certificateAvailable: true,
        status: "draft",
    })

    // Load course data
    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await LMSService.getCourseById(courseId)
                if (data) {
                    setCourse(data)
                    setFormData({
                        title: data.title,
                        subtitle: data.subtitle ?? "",
                        description: data.description,
                        thumbnail: data.thumbnail,
                        level: data.level,
                        duration: data.duration,
                        tags: data.tags ?? [],
                        price: data.price,
                        certificateAvailable: data.certificateAvailable,
                        status: data.status,
                    })
                }
            } catch (err) {
                console.error("Error loading course:", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [courseId])

    // Auth guard
    const normalizedRole = String(user?.role || "").toLowerCase()
    if (!loading && (!user || (normalizedRole !== "instructor" && normalizedRole !== "admin"))) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only instructors and admins can edit courses.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const handleInputChange = (field: keyof CourseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!course) return
        setSaving(true)
        try {
            const success = await LMSService.updateCourse(courseId, {
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                thumbnail: formData.thumbnail,
                level: formData.level,
                duration: formData.duration,
                tags: formData.tags,
                price: formData.price,
                certificateAvailable: formData.certificateAvailable,
                status: formData.status,
            })
            if (success) {
                alert("Course updated successfully!")
                router.push("/instructor")
            } else {
                alert("Failed to update course. Please try again.")
            }
        } catch (err) {
            console.error("Error updating course:", err)
            alert("An error occurred while saving changes.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="animate-spin" size={20} /> Loading course…
            </div>
        )
    }

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Not Found</CardTitle>
                        <CardDescription>
                            The course you are trying to edit does not exist.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.push("/instructor")}>
                <ArrowLeft size={16} /> Back to Dashboard
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Edit Course</CardTitle>
                    <CardDescription>Update your course details. Add/manage modules from the Instructor Dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={e => handleInputChange("title", e.target.value)}
                                    placeholder="e.g., Complete Python Programming"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={e => handleInputChange("subtitle", e.target.value)}
                                    placeholder="A brief subtitle"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Course Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={e => handleInputChange("description", e.target.value)}
                                placeholder="Describe what students will learn..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                                <Input
                                    id="thumbnail"
                                    type="url"
                                    value={formData.thumbnail}
                                    onChange={e => handleInputChange("thumbnail", e.target.value)}
                                    placeholder="https://example.com/thumbnail.jpg"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Difficulty Level</Label>
                                <Select value={formData.level} onValueChange={v => handleInputChange("level", v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration *</Label>
                                <Input
                                    id="duration"
                                    value={formData.duration}
                                    onChange={e => handleInputChange("duration", e.target.value)}
                                    placeholder="e.g., 20 Hours, 30 Days"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    value={formData.price}
                                    onChange={e => handleInputChange("price", parseFloat(e.target.value) || 0)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    placeholder="Add a tag…"
                                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                                />
                                <Button type="button" onClick={addTag} variant="outline"><Plus className="h-4 w-4" /></Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="certificate"
                                    checked={formData.certificateAvailable}
                                    onChange={e => handleInputChange("certificateAvailable", e.target.checked)}
                                />
                                <Label htmlFor="certificate">Certificate Available</Label>
                            </div>
                            <div className="space-y-2">
                                <Label>Publication Status</Label>
                                <Select value={formData.status} onValueChange={v => handleInputChange("status", v as CourseStatus)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={() => router.push("/instructor")} className="flex-1">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={saving} className="flex-1">
                                {saving ? <><Loader2 className="animate-spin h-4 w-4 mr-2" />Saving…</> : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
