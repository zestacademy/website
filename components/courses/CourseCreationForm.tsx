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
import { Course, CourseStatus, Module, Lesson, ContentType } from "@/types/lms"
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
    modules: Module[]
}

export default function CourseCreationForm() {
    const { user } = useAuth()
    const router = useRouter()
    const normalizedRole = String(user?.role || '').toLowerCase()
    const isAdmin = normalizedRole === 'admin' || user?.email?.toLowerCase().includes('admin') || user?.email?.endsWith('@zestacademy.tech') || user?.email?.endsWith('@zestacademy.com');
    const hasAccess = normalizedRole === 'instructor' || isAdmin;
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
        certificateAvailable: true,
        modules: []
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

    const addModule = () => {
        setFormData(prev => ({
            ...prev,
            modules: [
                ...prev.modules,
                {
                    id: crypto.randomUUID(),
                    title: `Day ${prev.modules.length + 1}`,
                    lessons: [],
                    order: prev.modules.length
                }
            ]
        }))
    }

    const removeModule = (moduleId: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.filter(m => m.id !== moduleId).map((m, index) => ({ 
                ...m, 
                order: index, 
                title: m.title.startsWith('Day ') ? `Day ${index + 1}` : m.title 
            }))
        }))
    }

    const updateModuleTitle = (moduleId: string, title: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => m.id === moduleId ? { ...m, title } : m)
        }))
    }

    const addLesson = (moduleId: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: [
                            ...m.lessons,
                            {
                                id: crypto.randomUUID(),
                                title: "",
                                type: "text" as ContentType,
                                content: { type: "text" as ContentType }
                            }
                        ]
                    }
                }
                return m
            })
        }))
    }

    const removeLesson = (moduleId: string, lessonId: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: m.lessons.filter(l => l.id !== lessonId)
                    }
                }
                return m
            })
        }))
    }

    const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: m.lessons.map(l => l.id === lessonId ? { ...l, title } : l)
                    }
                }
                return m
            })
        }))
    }

    const updateLessonType = (moduleId: string, lessonId: string, type: ContentType) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: m.lessons.map(l => l.id === lessonId ? { 
                            ...l, 
                            type, 
                            content: { ...l.content, type } 
                        } : l)
                    }
                }
                return m
            })
        }))
    }

    const updateLessonUrl = (moduleId: string, lessonId: string, url: string) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: m.lessons.map(l => {
                            if (l.id === lessonId) {
                                if (l.type === 'video') {
                                    return { ...l, content: { ...l.content, videoId: url } }
                                } else {
                                    return { ...l, content: { ...l.content, resources: [{ title: 'Document', url, type: 'link' }] } }
                                }
                            }
                            return l
                        })
                    }
                }
                return m
            })
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user?.uid || !hasAccess) {
            alert("Only instructors and admins can create courses")
            return
        }

        setLoading(true)
        try {
            const courseData = {
                ...formData,
                instructorId: user.uid,
                instructorName: user.displayName || user.email || "Unknown Instructor",
                status: "draft" as CourseStatus,
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

    if (!user || !hasAccess) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            Only instructors and admins can create courses. Please contact support to upgrade your account.
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

                        <div className="space-y-4 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-lg font-semibold">Course Structure</Label>
                                    <p className="text-sm text-muted-foreground">Add days and content titles so students can easily see the syllabus.</p>
                                </div>
                                <Button type="button" onClick={addModule} variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Day
                                </Button>
                            </div>
                            
                            {formData.modules.map((module) => (
                                <Card key={module.id} className="p-4 border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4 gap-4">
                                        <Input 
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                                            className="font-semibold text-lg flex-1"
                                            placeholder="e.g., Day 1: Introduction"
                                        />
                                        <div className="flex gap-2 shrink-0">
                                            <Button type="button" onClick={() => addLesson(module.id)} variant="secondary" size="sm">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Content
                                            </Button>
                                            <Button type="button" onClick={() => removeModule(module.id)} variant="destructive" size="sm">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                                        {module.lessons.map((lesson) => (
                                            <div key={lesson.id} className="flex flex-col gap-2 p-3 bg-muted/50 rounded-md border border-border">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-primary/60 shrink-0" />
                                                    <Input 
                                                        value={lesson.title}
                                                        onChange={(e) => updateLessonTitle(module.id, lesson.id, e.target.value)}
                                                        className="flex-1 h-9"
                                                        placeholder="Topic Title (e.g., What is Quantum Computing?)"
                                                    />
                                                    <Button type="button" onClick={() => removeLesson(module.id, lesson.id)} variant="ghost" size="sm">
                                                        <X className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-2 pl-4">
                                                    <Select value={lesson.type} onValueChange={(value: ContentType) => updateLessonType(module.id, lesson.id, value)}>
                                                        <SelectTrigger className="w-[180px] h-9">
                                                            <SelectValue placeholder="Content Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="video">Video</SelectItem>
                                                            <SelectItem value="pdf">Document (PDF/Link)</SelectItem>
                                                            <SelectItem value="text">Article / Text</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input 
                                                        value={lesson.type === 'video' ? lesson.content?.videoId || '' : lesson.content?.resources?.[0]?.url || ''}
                                                        onChange={(e) => updateLessonUrl(module.id, lesson.id, e.target.value)}
                                                        className="flex-1 h-9"
                                                        placeholder={lesson.type === 'video' ? "Video URL (YouTube, Vimeo, etc.)" : lesson.type === 'pdf' ? "Document Link (Google Drive, PDF URL, etc.)" : "Content Link (Optional)"}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {module.lessons.length === 0 && (
                                            <p className="text-sm text-gray-500 italic py-2">No content added yet. Click "Add Content" to add topics for this day.</p>
                                        )}
                                    </div>
                                </Card>
                            ))}
                            {formData.modules.length === 0 && (
                                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                                    <p className="text-muted-foreground">No days added. Click "Add Day" to structure your course.</p>
                                </div>
                            )}
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
