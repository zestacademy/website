"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { LiveSession } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface LiveSessionFormProps {
    courseId: string
    onSessionCreated?: (sessionId: string) => void
}

export default function LiveSessionForm({ courseId, onSessionCreated }: LiveSessionFormProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        scheduledAt: "",
        duration: 60, // default 60 minutes
        meetingLink: ""
    })

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user?.uid || user.role !== 'instructor') {
            alert("Only instructors can create live sessions")
            return
        }

        // Validate scheduled time is in the future
        const scheduledTime = new Date(formData.scheduledAt)
        if (scheduledTime <= new Date()) {
            alert("Session must be scheduled for a future time")
            return
        }

        setLoading(true)
        try {
            const sessionData = {
                courseId,
                title: formData.title,
                description: formData.description,
                scheduledAt: formData.scheduledAt,
                duration: formData.duration,
                meetingLink: formData.meetingLink,
                instructorId: user.uid,
                status: 'scheduled' as const
            }

            const sessionId = await LMSService.createLiveSession(sessionData)

            if (sessionId) {
                alert("Live session created successfully!")
                onSessionCreated?.(sessionId)

                // Reset form
                setFormData({
                    title: "",
                    description: "",
                    scheduledAt: "",
                    duration: 60,
                    meetingLink: ""
                })
            } else {
                alert("Failed to create live session. Please try again.")
            }
        } catch (error) {
            console.error("Error creating live session:", error)
            alert("An error occurred while creating the live session.")
        } finally {
            setLoading(false)
        }
    }

    if (!user || user.role !== 'instructor') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>
                        Only instructors can create live sessions.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule Live Session
                </CardTitle>
                <CardDescription>
                    Create a live session for your course. Students will receive notifications and can join via the meeting link.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Session Title *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="e.g., Introduction to Python Variables"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Session Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Describe what will be covered in this session..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="scheduledAt" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Scheduled Date & Time *
                            </Label>
                            <Input
                                id="scheduledAt"
                                type="datetime-local"
                                value={formData.scheduledAt}
                                onChange={(e) => handleInputChange("scheduledAt", e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes) *</Label>
                            <Input
                                id="duration"
                                type="number"
                                min="15"
                                max="480"
                                value={formData.duration}
                                onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 60)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="meetingLink">Meeting Link *</Label>
                        <Input
                            id="meetingLink"
                            type="url"
                            value={formData.meetingLink}
                            onChange={(e) => handleInputChange("meetingLink", e.target.value)}
                            placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Provide the Zoom, Google Meet, or other meeting platform link for students to join.
                        </p>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Creating Session..." : "Schedule Live Session"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}