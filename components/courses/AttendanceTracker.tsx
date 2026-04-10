"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users } from "lucide-react"
import { LMSService } from "@/services/lms-service"
import { LiveSession, AttendanceRecord } from "@/types/lms"
import { useAuth } from "@/hooks/useAuth"

interface AttendanceTrackerProps {
    sessionId: string
    courseId: string
}

export default function AttendanceTracker({ sessionId, courseId }: AttendanceTrackerProps) {
    const { user } = useAuth()
    const [session, setSession] = useState<LiveSession | null>(null)
    const [attendance, setAttendance] = useState<AttendanceRecord | null>(null)
    const [loading, setLoading] = useState(true)
    const [joining, setJoining] = useState(false)

    useEffect(() => {
        loadSessionData()
    }, [sessionId])

    const loadSessionData = async () => {
        try {
            // Get session details
            const sessionDoc = await LMSService.getLiveSessionsByCourse(courseId)
            const currentSession = sessionDoc.find(s => s.id === sessionId)
            setSession(currentSession || null)

            // Check if user already has attendance record
            if (user?.uid) {
                const userAttendance = await LMSService.getUserAttendance(user.uid, courseId)
                const sessionAttendance = userAttendance.find(a => a.sessionId === sessionId)
                setAttendance(sessionAttendance || null)
            }
        } catch (error) {
            console.error("Error loading session data:", error)
        } finally {
            setLoading(false)
        }
    }

    const joinSession = async () => {
        if (!user?.uid || !session) return

        setJoining(true)
        try {
            // Record attendance when joining
            const attendanceData = {
                userId: user.uid,
                courseId,
                sessionId,
                joinedAt: new Date().toISOString(),
                duration: 0, // Will be updated when leaving
                status: 'present' as const
            }

            const attendanceId = await LMSService.recordAttendance(attendanceData)
            if (attendanceId) {
                setAttendance({ id: attendanceId, ...attendanceData })

                // Open meeting link in new tab
                if (session.meetingLink) {
                    window.open(session.meetingLink, '_blank')
                }
            }
        } catch (error) {
            console.error("Error recording attendance:", error)
        } finally {
            setJoining(false)
        }
    }

    const getSessionStatus = () => {
        if (!session) return { status: 'unknown', color: 'gray' }

        const now = new Date()
        const sessionStart = new Date(session.scheduledAt)
        const sessionEnd = new Date(sessionStart.getTime() + session.duration * 60000)

        if (session.status === 'completed') {
            return { status: 'Completed', color: 'green' }
        } else if (session.status === 'cancelled') {
            return { status: 'Cancelled', color: 'red' }
        } else if (now < sessionStart) {
            return { status: 'Scheduled', color: 'blue' }
        } else if (now >= sessionStart && now <= sessionEnd) {
            return { status: 'Live Now', color: 'green' }
        } else {
            return { status: 'Ended', color: 'gray' }
        }
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!session) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Session not found</p>
                </CardContent>
            </Card>
        )
    }

    const sessionStatus = getSessionStatus()
    const canJoin = sessionStatus.status === 'Live Now' && !attendance
    const hasJoined = !!attendance

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Live Session Attendance
                        </CardTitle>
                        <CardDescription>
                            Track your attendance for this live session
                        </CardDescription>
                    </div>
                    <Badge variant={sessionStatus.color as any}>
                        {sessionStatus.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Session Details</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{new Date(session.scheduledAt).toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="font-medium">Duration:</span> {session.duration} minutes
                            </div>
                            <div>
                                <span className="font-medium">Attendees:</span> {session.attendees.length}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Your Attendance</h4>
                        {hasJoined ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="text-sm font-medium">Attendance Recorded</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Joined at: {new Date(attendance.joinedAt).toLocaleString()}
                                </div>
                                {attendance.status === 'present' && (
                                    <Badge variant="secondary">Present</Badge>
                                )}
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                Not yet joined
                            </div>
                        )}
                    </div>
                </div>

                {canJoin && (
                    <div className="pt-4 border-t">
                        <Button
                            onClick={joinSession}
                            disabled={joining}
                            className="w-full"
                        >
                            {joining ? "Joining..." : "Join Live Session"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Clicking this button will record your attendance and open the meeting link
                        </p>
                    </div>
                )}

                {hasJoined && sessionStatus.status === 'Live Now' && (
                    <div className="pt-4 border-t">
                        <Button
                            onClick={() => window.open(session.meetingLink, '_blank')}
                            variant="outline"
                            className="w-full"
                        >
                            Rejoin Session
                        </Button>
                    </div>
                )}

                {sessionStatus.status === 'Scheduled' && (
                    <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground text-center">
                            Session starts at {new Date(session.scheduledAt).toLocaleString()}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}