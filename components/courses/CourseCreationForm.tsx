"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { Course, CourseStatus } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface CourseFormData {
    title: string
    subtitle: string
    description: string
    thumbnail: string
    category: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    duration: string
    startDate: string
    tags: string[]
    price: number
    certificateAvailable: boolean
}

export default function CourseCreationForm() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const [formData, setFormData] = useState<CourseFormData>({
        title: "",
        subtitle: "",
        description: "",
        thumbnail: "",
        category: "Technology",
        level: "Beginner",
        duration: "",
        startDate: "",
        tags: [],
        price: 0,
        certificateAvailable: true
    })

    const handleInputChange = (field: keyof CourseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user?.uid || user.role !== 'instructor') {
            alert("Only instructors can create courses")
            return
        }

        setLoading(true)
        try {
            const courseData = {
                ...formData,
                instructorId: user.uid,
                instructorName: user.displayName || user.email || "Unknown Instructor",
                status: "draft" as CourseStatus,
                modules: [], 
                totalEnrollments: 0
            }

            const courseId = await LMSService.createCourse(courseData)

            if (courseId) {
                alert("Course created successfully!")
                router.push(`/courses/${courseId}/edit`)
            } else {
                alert("Failed to create course. Please try again.")
            }
        } catch (error) {
            console.error("Error creating course:", error)
            alert("An error occurred while creating the course.")
        } finally {
            setLoading(false)
        }
    }

    if (!user || user.role !== 'instructor') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only instructors can create courses. Please contact an admin to upgrade your account.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Course</CardTitle>
                    <CardDescription>
                        Fill in the details below to create your course. You can add modules and lessons after creation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="e.g., AI Foundation"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    placeholder="e.g., Technology, Business, Design"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Course Subtitle</Label>
                            <Input
                                id="subtitle"
                                value={formData.subtitle}
                                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                                placeholder="A brief subtitle for your course"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Course Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Describe what students will learn in this course..."
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
                                    onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                                    placeholder="https://example.com/thumbnail.jpg"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="level">Difficulty Level</Label>
                                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration *</Label>
                                <Input
                                    id="duration"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange("duration", e.target.value)}
                                    placeholder="e.g., 20 Hours, 30 Days"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                                    placeholder="e.g., Oct 15, 2024"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                                    placeholder="0 for free"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add a tag..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                />
                                <Button type="button" onClick={addTag} variant="outline">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => removeTag(tag)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="certificate"
                                checked={formData.certificateAvailable}
                                onChange={(e) => handleInputChange("certificateAvailable", e.target.checked)}
                            />
                            <Label htmlFor="certificate">Certificate Available</Label>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Creating Course..." : "Create Course"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
